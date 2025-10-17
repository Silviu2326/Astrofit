import React, { useState, useEffect } from 'react';
import { EventoAdverso, FlujoPausado, eventosAdversosApi } from './eventosAdversosApi';
import { FormularioEventoAdverso } from './components/FormularioEventoAdverso';
import { ListaEventosAdversos } from './components/ListaEventosAdversos';
import { ConfiguracionPausaAutomatica } from './components/ConfiguracionPausaAutomatica';
import { 
  AlertTriangle, 
  Plus, 
  Settings, 
  Activity, 
  Users, 
  BarChart3,
  Bell,
  Zap,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

export const EventosAdversosPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'eventos' | 'configuracion' | 'flujos-pausados'>('eventos');
  const [showFormulario, setShowFormulario] = useState(false);
  const [clienteSeleccionado, setClienteSeleccionado] = useState<string>('');
  const [eventos, setEventos] = useState<EventoAdverso[]>([]);
  const [flujosPausados, setFlujosPausados] = useState<FlujoPausado[]>([]);
  const [loading, setLoading] = useState(true);
  const [estadisticas, setEstadisticas] = useState({
    totalEventos: 0,
    eventosActivos: 0,
    flujosPausados: 0,
    eventosResueltos: 0
  });

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      setLoading(true);
      
      // Cargar eventos de todos los clientes (simulado)
      const todosEventos = JSON.parse(localStorage.getItem('eventosAdversos') || '[]');
      setEventos(todosEventos);
      
      // Cargar flujos pausados
      const flujos = await eventosAdversosApi.obtenerFlujosPausados();
      setFlujosPausados(flujos);
      
      // Calcular estadísticas
      const stats = {
        totalEventos: todosEventos.length,
        eventosActivos: todosEventos.filter((e: EventoAdverso) => e.estado === 'activo').length,
        flujosPausados: flujos.filter((f: FlujoPausado) => f.estado === 'pausado').length,
        eventosResueltos: todosEventos.filter((e: EventoAdverso) => e.estado === 'resuelto').length
      };
      setEstadisticas(stats);
      
    } catch (error) {
      console.error('Error al cargar datos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEventoCreado = async (evento: EventoAdverso) => {
    setEventos(prev => [...prev, evento]);
    setShowFormulario(false);
    setClienteSeleccionado('');
    await cargarDatos();
  };

  const handleEventoSeleccionado = (evento: EventoAdverso) => {
    // Aquí se podría mostrar un modal con detalles del evento
    console.log('Evento seleccionado:', evento);
  };

  const tabs = [
    { id: 'eventos', label: 'Eventos Adversos', icon: AlertTriangle },
    { id: 'configuracion', label: 'Configuración', icon: Settings },
    { id: 'flujos-pausados', label: 'Flujos Pausados', icon: Activity }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-red-200 border-t-red-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Cargando eventos adversos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-800">Gestión de Eventos Adversos</h1>
                <p className="text-sm text-gray-600">Monitoreo y control de eventos adversos</p>
              </div>
            </div>
            <button
              onClick={() => setShowFormulario(true)}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Nuevo Evento</span>
            </button>
          </div>
        </div>
      </div>

      {/* Estadísticas */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Eventos</p>
                <p className="text-2xl font-semibold text-gray-900">{estadisticas.totalEventos}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Activity className="w-6 h-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Eventos Activos</p>
                <p className="text-2xl font-semibold text-gray-900">{estadisticas.eventosActivos}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Zap className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Flujos Pausados</p>
                <p className="text-2xl font-semibold text-gray-900">{estadisticas.flujosPausados}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Eventos Resueltos</p>
                <p className="text-2xl font-semibold text-gray-900">{estadisticas.eventosResueltos}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? 'border-red-500 text-red-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'eventos' && (
              <div className="space-y-6">
                {showFormulario ? (
                  <FormularioEventoAdverso
                    clienteId={clienteSeleccionado || 'cliente_demo'}
                    onEventoCreado={handleEventoCreado}
                    onCancelar={() => setShowFormulario(false)}
                  />
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium text-gray-800">Eventos Registrados</h3>
                      <div className="flex items-center space-x-3">
                        <input
                          type="text"
                          placeholder="Buscar por cliente..."
                          value={clienteSeleccionado}
                          onChange={(e) => setClienteSeleccionado(e.target.value)}
                          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        />
                        <button
                          onClick={() => setShowFormulario(true)}
                          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
                        >
                          <Plus className="w-4 h-4" />
                          <span>Nuevo Evento</span>
                        </button>
                      </div>
                    </div>
                    
                    {clienteSeleccionado ? (
                      <ListaEventosAdversos
                        clienteId={clienteSeleccionado}
                        onEventoSeleccionado={handleEventoSeleccionado}
                      />
                    ) : (
                      <div className="text-center py-12">
                        <AlertTriangle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-800 mb-2">
                          Selecciona un cliente
                        </h3>
                        <p className="text-gray-600">
                          Ingresa un ID de cliente para ver sus eventos adversos o crea un nuevo evento.
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'configuracion' && (
              <ConfiguracionPausaAutomatica />
            )}

            {activeTab === 'flujos-pausados' && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-800">Flujos Pausados por Eventos Adversos</h3>
                {flujosPausados.length === 0 ? (
                  <div className="text-center py-12">
                    <Activity className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-800 mb-2">
                      No hay flujos pausados
                    </h3>
                    <p className="text-gray-600">
                      No se han pausado flujos por eventos adversos.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {flujosPausados.map((flujo) => (
                      <div key={flujo.flujoId} className="p-4 bg-white border border-gray-200 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-gray-800">{flujo.nombre}</h4>
                            <p className="text-sm text-gray-600">
                              Pausado el {new Date(flujo.fechaPausa).toLocaleDateString()}
                            </p>
                            <p className="text-sm text-gray-500">{flujo.motivo}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              flujo.estado === 'pausado' 
                                ? 'bg-orange-100 text-orange-600' 
                                : 'bg-green-100 text-green-600'
                            }`}>
                              {flujo.estado === 'pausado' ? 'Pausado' : 'Reanudado'}
                            </span>
                            {flujo.estado === 'pausado' && (
                              <button className="px-3 py-1 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors">
                                Reanudar
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};






