import React, { useState, useEffect } from 'react';
import { EventoAdverso, eventosAdversosApi } from '../eventosAdversosApi';
import { AlertTriangle, Calendar, User, Activity, CheckCircle, Clock, AlertCircle } from 'lucide-react';

interface ListaEventosAdversosProps {
  clienteId: string;
  onEventoSeleccionado: (evento: EventoAdverso) => void;
}

export const ListaEventosAdversos: React.FC<ListaEventosAdversosProps> = ({
  clienteId,
  onEventoSeleccionado
}) => {
  const [eventos, setEventos] = useState<EventoAdverso[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState<'todos' | 'activos' | 'resueltos'>('todos');

  useEffect(() => {
    cargarEventos();
  }, [clienteId]);

  const cargarEventos = async () => {
    try {
      setLoading(true);
      const eventosData = await eventosAdversosApi.obtenerEventosCliente(clienteId);
      setEventos(eventosData);
    } catch (error) {
      console.error('Error al cargar eventos:', error);
    } finally {
      setLoading(false);
    }
  };

  const eventosFiltrados = eventos.filter(evento => {
    switch (filtro) {
      case 'activos': return evento.estado === 'activo';
      case 'resueltos': return evento.estado === 'resuelto';
      default: return true;
    }
  });

  const getSeveridadInfo = (severidad: string) => {
    switch (severidad) {
      case 'leve':
        return { color: 'text-green-600 bg-green-50', icon: CheckCircle, label: 'Leve' };
      case 'moderada':
        return { color: 'text-yellow-600 bg-yellow-50', icon: Clock, label: 'Moderada' };
      case 'grave':
        return { color: 'text-orange-600 bg-orange-50', icon: AlertCircle, label: 'Grave' };
      case 'critica':
        return { color: 'text-red-600 bg-red-50', icon: AlertTriangle, label: 'Crítica' };
      default:
        return { color: 'text-gray-600 bg-gray-50', icon: AlertCircle, label: 'Desconocida' };
    }
  };

  const getEstadoInfo = (estado: string) => {
    switch (estado) {
      case 'activo':
        return { color: 'text-red-600 bg-red-50', icon: Activity, label: 'Activo' };
      case 'resuelto':
        return { color: 'text-green-600 bg-green-50', icon: CheckCircle, label: 'Resuelto' };
      case 'monitoreando':
        return { color: 'text-blue-600 bg-blue-50', icon: Clock, label: 'Monitoreando' };
      default:
        return { color: 'text-gray-600 bg-gray-50', icon: AlertCircle, label: 'Desconocido' };
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="w-8 h-8 border-4 border-red-200 border-t-red-600 rounded-full animate-spin" />
        <span className="ml-3 text-gray-600">Cargando eventos...</span>
      </div>
    );
  }

  if (eventosFiltrados.length === 0) {
    return (
      <div className="text-center py-12">
        <AlertTriangle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-800 mb-2">
          {filtro === 'todos' ? 'No hay eventos registrados' : `No hay eventos ${filtro}`}
        </h3>
        <p className="text-gray-600">
          {filtro === 'todos' 
            ? 'Este cliente no tiene eventos adversos registrados.'
            : `No se encontraron eventos en estado ${filtro}.`
          }
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Filtros */}
      <div className="flex space-x-2 mb-6">
        {(['todos', 'activos', 'resueltos'] as const).map((filtroOption) => (
          <button
            key={filtroOption}
            onClick={() => setFiltro(filtroOption)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filtro === filtroOption
                ? 'bg-red-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {filtroOption.charAt(0).toUpperCase() + filtroOption.slice(1)}
          </button>
        ))}
      </div>

      {/* Lista de Eventos */}
      <div className="space-y-3">
        {eventosFiltrados.map((evento) => {
          const severidadInfo = getSeveridadInfo(evento.severidad);
          const estadoInfo = getEstadoInfo(evento.estado);
          const SeveridadIcon = severidadInfo.icon;
          const EstadoIcon = estadoInfo.icon;

          return (
            <div
              key={evento.id}
              onClick={() => onEventoSeleccionado(evento)}
              className="p-4 bg-white border border-gray-200 rounded-lg hover:border-red-300 hover:shadow-md transition-all cursor-pointer"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800 capitalize">
                      {evento.tipo.replace('_', ' ')}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {evento.descripcion.length > 100 
                        ? `${evento.descripcion.substring(0, 100)}...`
                        : evento.descripcion
                      }
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${severidadInfo.color}`}>
                    <SeveridadIcon className="w-3 h-3 inline mr-1" />
                    {severidadInfo.label}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${estadoInfo.color}`}>
                    <EstadoIcon className="w-3 h-3 inline mr-1" />
                    {estadoInfo.label}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(evento.fecha).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <User className="w-4 h-4" />
                    <span>Cliente: {evento.clienteId}</span>
                  </div>
                </div>
                <div className="text-xs text-gray-400">
                  ID: {evento.id}
                </div>
              </div>

              {evento.flujosAfectados.length > 0 && (
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <div className="flex items-center space-x-2">
                    <Activity className="w-4 h-4 text-orange-500" />
                    <span className="text-sm text-gray-600">
                      {evento.flujosAfectados.length} flujo(s) pausado(s)
                    </span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};






