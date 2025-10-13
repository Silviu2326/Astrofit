import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Video, 
  Plus,
  Edit3,
  Trash2,
  CheckCircle,
  XCircle,
  AlertCircle,
  Bell,
  MessageCircle,
  Phone,
  Camera
} from 'lucide-react';
import { Cliente } from '../clienteDetalleApi';

interface ClienteAgendaProps {
  cliente: Cliente;
}

interface Cita {
  id: string;
  titulo: string;
  tipo: 'Entrenamiento' | 'Consulta' | 'Evaluación' | 'Seguimiento';
  fecha: string;
  hora: string;
  duracion: number;
  modalidad: 'Presencial' | 'Virtual' | 'Híbrida';
  ubicacion?: string;
  link?: string;
  estado: 'Programada' | 'Confirmada' | 'En Progreso' | 'Completada' | 'Cancelada';
  descripcion?: string;
  recordatorios: Recordatorio[];
  notas?: string;
}

interface Recordatorio {
  id: string;
  tipo: 'Email' | 'SMS' | 'Push' | 'WhatsApp';
  tiempoAntes: number; // en minutos
  enviado: boolean;
}

const ClienteAgenda: React.FC<ClienteAgendaProps> = ({ cliente }) => {
  const [activeView, setActiveView] = useState<'calendario' | 'lista' | 'proximas' | 'historial'>('calendario');
  const [showAddCita, setShowAddCita] = useState(false);
  const [fechaSeleccionada, setFechaSeleccionada] = useState(new Date());

  // Datos mock para demostración
  const citas: Cita[] = [
    {
      id: '1',
      titulo: 'Sesión de Fuerza',
      tipo: 'Entrenamiento',
      fecha: '2024-01-20',
      hora: '10:00',
      duracion: 60,
      modalidad: 'Presencial',
      ubicacion: 'Gimnasio Principal',
      estado: 'Programada',
      descripcion: 'Enfoque en ejercicios compuestos',
      recordatorios: [
        { id: '1', tipo: 'Email', tiempoAntes: 1440, enviado: false }, // 24h antes
        { id: '2', tipo: 'SMS', tiempoAntes: 60, enviado: false } // 1h antes
      ]
    },
    {
      id: '2',
      titulo: 'Evaluación de Progreso',
      tipo: 'Evaluación',
      fecha: '2024-01-22',
      hora: '16:00',
      duracion: 45,
      modalidad: 'Virtual',
      link: 'https://meet.google.com/abc-def-ghi',
      estado: 'Confirmada',
      descripcion: 'Revisión de medidas y objetivos',
      recordatorios: [
        { id: '3', tipo: 'Email', tiempoAntes: 1440, enviado: true },
        { id: '4', tipo: 'Push', tiempoAntes: 30, enviado: false }
      ]
    },
    {
      id: '3',
      titulo: 'Consulta Nutricional',
      tipo: 'Consulta',
      fecha: '2024-01-18',
      hora: '14:00',
      duracion: 30,
      modalidad: 'Presencial',
      ubicacion: 'Oficina',
      estado: 'Completada',
      descripcion: 'Ajuste del plan alimentario',
      notas: 'Cliente muy comprometido con el plan'
    }
  ];

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'Completada': return 'bg-green-100 text-green-800';
      case 'En Progreso': return 'bg-blue-100 text-blue-800';
      case 'Confirmada': return 'bg-indigo-100 text-indigo-800';
      case 'Programada': return 'bg-yellow-100 text-yellow-800';
      case 'Cancelada': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case 'Entrenamiento': return 'bg-orange-100 text-orange-800';
      case 'Consulta': return 'bg-blue-100 text-blue-800';
      case 'Evaluación': return 'bg-purple-100 text-purple-800';
      case 'Seguimiento': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getModalidadIcon = (modalidad: string) => {
    switch (modalidad) {
      case 'Presencial': return <MapPin className="w-4 h-4" />;
      case 'Virtual': return <Video className="w-4 h-4" />;
      case 'Híbrida': return <Users className="w-4 h-4" />;
      default: return <Calendar className="w-4 h-4" />;
    }
  };

  const CalendarioView = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Calendario de Citas</h3>
        <button
          onClick={() => setShowAddCita(true)}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Nueva Cita
        </button>
      </div>

      {/* Mini calendario */}
      <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
        <div className="grid grid-cols-7 gap-2 mb-4">
          {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map((dia) => (
            <div key={dia} className="text-center text-sm font-medium text-gray-500 py-2">
              {dia}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: 31 }, (_, i) => i + 1).map((dia) => {
            const tieneCita = citas.some(cita => 
              new Date(cita.fecha).getDate() === dia
            );
            return (
              <button
                key={dia}
                className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
                  tieneCita
                    ? 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {dia}
              </button>
            );
          })}
        </div>
      </div>

      {/* Citas del día seleccionado */}
      <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Citas de Hoy</h4>
        <div className="space-y-4">
          {citas.filter(cita => cita.fecha === new Date().toISOString().split('T')[0]).map((cita) => (
            <div key={cita.id} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h5 className="font-medium text-gray-900">{cita.titulo}</h5>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getEstadoColor(cita.estado)}`}>
                  {cita.estado}
                </span>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {cita.hora}
                </span>
                <span className="flex items-center gap-1">
                  {getModalidadIcon(cita.modalidad)}
                  {cita.modalidad}
                </span>
                {cita.ubicacion && (
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {cita.ubicacion}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const ListaView = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Todas las Citas</h3>
        <button
          onClick={() => setShowAddCita(true)}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Nueva Cita
        </button>
      </div>

      <div className="space-y-4">
        {citas.map((cita) => (
          <motion.div
            key={cita.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-indigo-100 rounded-xl">
                  <Calendar className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">{cita.titulo}</h4>
                  <p className="text-sm text-gray-600 flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {new Date(cita.fecha).toLocaleDateString('es-ES', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })} a las {cita.hora}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getEstadoColor(cita.estado)}`}>
                  {cita.estado}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTipoColor(cita.tipo)}`}>
                  {cita.tipo}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  {getModalidadIcon(cita.modalidad)}
                  <span>{cita.modalidad}</span>
                </div>
                {cita.ubicacion && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{cita.ubicacion}</span>
                  </div>
                )}
                {cita.link && (
                  <div className="flex items-center gap-2 text-sm text-blue-600">
                    <Video className="w-4 h-4" />
                    <a href={cita.link} target="_blank" rel="noopener noreferrer" className="hover:underline">
                      Unirse a la reunión
                    </a>
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>Duración: {cita.duracion} minutos</span>
                </div>
                {cita.descripcion && (
                  <p className="text-sm text-gray-600">{cita.descripcion}</p>
                )}
              </div>
            </div>

            {cita.recordatorios && cita.recordatorios.length > 0 && (
              <div className="mb-4">
                <h5 className="text-sm font-medium text-gray-700 mb-2">Recordatorios</h5>
                <div className="flex flex-wrap gap-2">
                  {cita.recordatorios.map((recordatorio) => (
                    <span
                      key={recordatorio.id}
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                        recordatorio.enviado
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      <Bell className="w-3 h-3" />
                      {recordatorio.tipo} - {recordatorio.tiempoAntes}min antes
                    </span>
                  ))}
                </div>
              </div>
            )}

            {cita.notas && (
              <div className="p-3 bg-blue-50 rounded-lg mb-4">
                <p className="text-sm text-blue-800">
                  <strong>Notas:</strong> {cita.notas}
                </p>
              </div>
            )}

            <div className="flex items-center justify-end gap-2">
              <button className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                <MessageCircle className="w-4 h-4" />
              </button>
              <button className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                <Phone className="w-4 h-4" />
              </button>
              <button className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                <Edit3 className="w-4 h-4" />
              </button>
              <button className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const ProximasView = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Próximas Citas</h3>
      
      {/* Métricas rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600">Esta Semana</p>
              <p className="text-2xl font-bold text-blue-900">3</p>
              <p className="text-xs text-blue-600">citas programadas</p>
            </div>
            <Calendar className="w-8 h-8 text-blue-600" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl border border-green-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600">Confirmadas</p>
              <p className="text-2xl font-bold text-green-900">2</p>
              <p className="text-xs text-green-600">de 3 citas</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-xl border border-orange-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-orange-600">Próxima</p>
              <p className="text-2xl font-bold text-orange-900">2h</p>
              <p className="text-xs text-orange-600">en 2 horas</p>
            </div>
            <Clock className="w-8 h-8 text-orange-600" />
          </div>
        </motion.div>
      </div>

      {/* Lista de próximas citas */}
      <div className="space-y-4">
        {citas.filter(cita => new Date(cita.fecha) >= new Date()).map((cita) => (
          <motion.div
            key={cita.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-indigo-100 rounded-xl">
                  <Calendar className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">{cita.titulo}</h4>
                  <p className="text-sm text-gray-600">
                    {new Date(cita.fecha).toLocaleDateString('es-ES', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })} a las {cita.hora}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getEstadoColor(cita.estado)}`}>
                  {cita.estado}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTipoColor(cita.tipo)}`}>
                  {cita.tipo}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  {getModalidadIcon(cita.modalidad)}
                  {cita.modalidad}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {cita.duracion} minutos
                </span>
                {cita.ubicacion && (
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {cita.ubicacion}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm">
                  Ver Detalles
                </button>
                <button className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                  <Edit3 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Navegación de vistas */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        {[
          { id: 'calendario', label: 'Calendario', icon: Calendar },
          { id: 'lista', label: 'Lista', icon: Clock },
          { id: 'proximas', label: 'Próximas', icon: AlertCircle },
          { id: 'historial', label: 'Historial', icon: CheckCircle },
        ].map((view) => (
          <button
            key={view.id}
            onClick={() => setActiveView(view.id as any)}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeView === view.id
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <view.icon className="w-4 h-4" />
            {view.label}
          </button>
        ))}
      </div>

      {/* Contenido de la vista activa */}
      {activeView === 'calendario' && <CalendarioView />}
      {activeView === 'lista' && <ListaView />}
      {activeView === 'proximas' && <ProximasView />}
      {activeView === 'historial' && <div>Vista de Historial (en desarrollo)</div>}
    </div>
  );
};

export default ClienteAgenda;

