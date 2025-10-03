import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  DoorOpen, MapPin, Wifi, WifiOff, Activity, Clock,
  Settings, RotateCw, Wrench, TestTube, X, CheckCircle,
  XCircle, AlertTriangle, Battery, Thermometer, TrendingUp,
  Eye, Filter, Search
} from 'lucide-react';
import { getTornos, updateTornoStatus, Torno } from '../gestionTornosApi';

// Interfaz extendida para dispositivos mockeados
interface DispositivoTorno {
  id: string;
  nombre: string;
  ubicacion: string;
  tipo: 'Torniquete' | 'Puerta' | 'Molinete';
  estado: 'online' | 'offline' | 'mantenimiento' | 'advertencia';
  ultimaActividad: string;
  accesosHoy: number;
  tasaError: number;
  ip: string;
  firmware: string;
  uptime: string;
  temperatura: number;
  bateria?: number;
  modelo: string;
  fabricante: string;
  numeroSerie: string;
  fechaInstalacion: string;
  ultimoMantenimiento: string;
  tiempoRespuesta: number;
}

const PanelTornos: React.FC = () => {
  const [tornos, setTornos] = useState<Torno[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDispositivo, setSelectedDispositivo] = useState<DispositivoTorno | null>(null);
  const [filtroEstado, setFiltroEstado] = useState<string>('todos');
  const [filtroTipo, setFiltroTipo] = useState<string>('todos');
  const [busqueda, setBusqueda] = useState<string>('');

  // Datos mockeados de dispositivos
  const [dispositivos] = useState<DispositivoTorno[]>([
    {
      id: '1',
      nombre: 'Torno Principal Entrada',
      ubicacion: 'Entrada Principal',
      tipo: 'Torniquete',
      estado: 'online',
      ultimaActividad: 'Hace 2 min',
      accesosHoy: 342,
      tasaError: 1.2,
      ip: '192.168.1.101',
      firmware: 'v2.4.1',
      uptime: '45d 12h',
      temperatura: 38,
      bateria: 95,
      modelo: 'TQ-3000 Pro',
      fabricante: 'SecureAccess',
      numeroSerie: 'TQ3000-2023-001',
      fechaInstalacion: '2023-01-15',
      ultimoMantenimiento: '2024-09-01',
      tiempoRespuesta: 42
    },
    {
      id: '2',
      nombre: 'Puerta Automática Gym',
      ubicacion: 'Área Gimnasio',
      tipo: 'Puerta',
      estado: 'online',
      ultimaActividad: 'Hace 5 min',
      accesosHoy: 218,
      tasaError: 0.8,
      ip: '192.168.1.102',
      firmware: 'v1.9.3',
      uptime: '30d 8h',
      temperatura: 35,
      modelo: 'AutoDoor 500',
      fabricante: 'DoorTech',
      numeroSerie: 'AD500-2023-012',
      fechaInstalacion: '2023-02-20',
      ultimoMantenimiento: '2024-08-15',
      tiempoRespuesta: 38
    },
    {
      id: '3',
      nombre: 'Molinete Vestuario Hombres',
      ubicacion: 'Vestuario Masculino',
      tipo: 'Molinete',
      estado: 'online',
      ultimaActividad: 'Hace 1 min',
      accesosHoy: 156,
      tasaError: 2.1,
      ip: '192.168.1.103',
      firmware: 'v3.1.0',
      uptime: '60d 3h',
      temperatura: 40,
      bateria: 88,
      modelo: 'ML-200 Smart',
      fabricante: 'AccessPro',
      numeroSerie: 'ML200-2022-045',
      fechaInstalacion: '2022-11-10',
      ultimoMantenimiento: '2024-07-20',
      tiempoRespuesta: 51
    },
    {
      id: '4',
      nombre: 'Molinete Vestuario Mujeres',
      ubicacion: 'Vestuario Femenino',
      tipo: 'Molinete',
      estado: 'online',
      ultimaActividad: 'Hace 3 min',
      accesosHoy: 178,
      tasaError: 1.5,
      ip: '192.168.1.104',
      firmware: 'v3.1.0',
      uptime: '60d 3h',
      temperatura: 39,
      bateria: 90,
      modelo: 'ML-200 Smart',
      fabricante: 'AccessPro',
      numeroSerie: 'ML200-2022-046',
      fechaInstalacion: '2022-11-10',
      ultimoMantenimiento: '2024-07-20',
      tiempoRespuesta: 49
    },
    {
      id: '5',
      nombre: 'Torniquete Salida Emergencia',
      ubicacion: 'Salida Este',
      tipo: 'Torniquete',
      estado: 'advertencia',
      ultimaActividad: 'Hace 45 min',
      accesosHoy: 23,
      tasaError: 8.7,
      ip: '192.168.1.105',
      firmware: 'v2.3.8',
      uptime: '15d 6h',
      temperatura: 45,
      bateria: 65,
      modelo: 'TQ-2500',
      fabricante: 'SecureAccess',
      numeroSerie: 'TQ2500-2023-089',
      fechaInstalacion: '2023-06-05',
      ultimoMantenimiento: '2024-06-10',
      tiempoRespuesta: 78
    },
    {
      id: '6',
      nombre: 'Puerta VIP Spa',
      ubicacion: 'Área Spa VIP',
      tipo: 'Puerta',
      estado: 'online',
      ultimaActividad: 'Hace 30 min',
      accesosHoy: 45,
      tasaError: 0.5,
      ip: '192.168.1.106',
      firmware: 'v2.0.1',
      uptime: '90d 15h',
      temperatura: 34,
      modelo: 'VIPAccess Pro',
      fabricante: 'DoorTech',
      numeroSerie: 'VIP-2023-003',
      fechaInstalacion: '2023-03-10',
      ultimoMantenimiento: '2024-09-05',
      tiempoRespuesta: 35
    },
    {
      id: '7',
      nombre: 'Torniquete Parking',
      ubicacion: 'Entrada Estacionamiento',
      tipo: 'Torniquete',
      estado: 'offline',
      ultimaActividad: 'Hace 2 horas',
      accesosHoy: 0,
      tasaError: 100,
      ip: '192.168.1.107',
      firmware: 'v2.4.1',
      uptime: '0d 0h',
      temperatura: 28,
      bateria: 15,
      modelo: 'TQ-3000 Pro',
      fabricante: 'SecureAccess',
      numeroSerie: 'TQ3000-2023-015',
      fechaInstalacion: '2023-04-20',
      ultimoMantenimiento: '2024-05-15',
      tiempoRespuesta: 0
    },
    {
      id: '8',
      nombre: 'Puerta Cafetería',
      ubicacion: 'Cafetería',
      tipo: 'Puerta',
      estado: 'online',
      ultimaActividad: 'Hace 10 min',
      accesosHoy: 285,
      tasaError: 1.1,
      ip: '192.168.1.108',
      firmware: 'v1.9.3',
      uptime: '22d 5h',
      temperatura: 36,
      modelo: 'AutoDoor 500',
      fabricante: 'DoorTech',
      numeroSerie: 'AD500-2023-024',
      fechaInstalacion: '2023-05-12',
      ultimoMantenimiento: '2024-08-22',
      tiempoRespuesta: 40
    },
    {
      id: '9',
      nombre: 'Torniquete Piscina',
      ubicacion: 'Acceso Piscina',
      tipo: 'Torniquete',
      estado: 'mantenimiento',
      ultimaActividad: 'Hace 6 horas',
      accesosHoy: 0,
      tasaError: 0,
      ip: '192.168.1.109',
      firmware: 'v2.3.9',
      uptime: '0d 0h',
      temperatura: 30,
      bateria: 100,
      modelo: 'TQ-WaterProof',
      fabricante: 'SecureAccess',
      numeroSerie: 'TQWP-2023-007',
      fechaInstalacion: '2023-07-01',
      ultimoMantenimiento: 'Hoy',
      tiempoRespuesta: 0
    },
    {
      id: '10',
      nombre: 'Molinete Clases Grupales',
      ubicacion: 'Sala de Clases',
      tipo: 'Molinete',
      estado: 'online',
      ultimaActividad: 'Ahora',
      accesosHoy: 312,
      tasaError: 1.8,
      ip: '192.168.1.110',
      firmware: 'v3.1.2',
      uptime: '38d 20h',
      temperatura: 37,
      bateria: 92,
      modelo: 'ML-300 Ultra',
      fabricante: 'AccessPro',
      numeroSerie: 'ML300-2023-019',
      fechaInstalacion: '2023-08-15',
      ultimoMantenimiento: '2024-09-10',
      tiempoRespuesta: 44
    }
  ]);

  useEffect(() => {
    fetchTornos();
  }, []);

  const fetchTornos = async () => {
    try {
      setLoading(true);
      const data = await getTornos();
      setTornos(data);
    } catch (err) {
      setError('Error al cargar los tornos.');
    } finally {
      setLoading(false);
    }
  };

  // Filtrar dispositivos
  const dispositivosFiltrados = dispositivos.filter(d => {
    const matchEstado = filtroEstado === 'todos' || d.estado === filtroEstado;
    const matchTipo = filtroTipo === 'todos' || d.tipo === filtroTipo;
    const matchBusqueda = d.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
                          d.ubicacion.toLowerCase().includes(busqueda.toLowerCase());
    return matchEstado && matchTipo && matchBusqueda;
  });

  const getEstadoBadge = (estado: string) => {
    const badges = {
      online: { bg: 'bg-green-100', text: 'text-green-700', icon: CheckCircle, label: 'Online' },
      offline: { bg: 'bg-red-100', text: 'text-red-700', icon: XCircle, label: 'Offline' },
      advertencia: { bg: 'bg-yellow-100', text: 'text-yellow-700', icon: AlertTriangle, label: 'Advertencia' },
      mantenimiento: { bg: 'bg-blue-100', text: 'text-blue-700', icon: Wrench, label: 'Mantenimiento' }
    };
    const badge = badges[estado as keyof typeof badges];
    const Icon = badge.icon;

    return (
      <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl ${badge.bg} ${badge.text}`}>
        <Icon className="w-4 h-4" />
        <span className="text-xs font-bold">{badge.label}</span>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-12 border border-white/50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <RotateCw className="w-12 h-12 text-cyan-600 animate-spin" />
          <p className="text-gray-600 font-medium">Cargando dispositivos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 backdrop-blur-xl rounded-3xl shadow-xl p-12 border border-red-200 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-center">
          <AlertTriangle className="w-12 h-12 text-red-600" />
          <p className="text-red-600 font-medium">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50">
        {/* Header con gradiente */}
        <div className="bg-gradient-to-r from-cyan-500 via-teal-500 to-green-500 p-6 relative overflow-hidden">
          {/* Pattern de fondo */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
              backgroundSize: '20px 20px'
            }}></div>
          </div>

          <h3 className="text-2xl font-bold text-white flex items-center gap-3 relative z-10">
            <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
              <DoorOpen className="w-6 h-6" />
            </div>
            Lista de Dispositivos
          </h3>
          <p className="text-cyan-50 mt-2 relative z-10">Monitoreo y control de puntos de acceso</p>
        </div>

        {/* Filtros y búsqueda */}
        <div className="p-6 bg-gradient-to-br from-cyan-50/50 to-teal-50/50 border-b border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Búsqueda */}
            <div className="md:col-span-2 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar por nombre o ubicación..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100 transition-all duration-300 outline-none bg-white"
              />
            </div>

            {/* Filtro Estado */}
            <select
              value={filtroEstado}
              onChange={(e) => setFiltroEstado(e.target.value)}
              className="px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100 transition-all duration-300 outline-none bg-white font-medium"
            >
              <option value="todos">Todos los estados</option>
              <option value="online">Online</option>
              <option value="offline">Offline</option>
              <option value="advertencia">Advertencia</option>
              <option value="mantenimiento">Mantenimiento</option>
            </select>

            {/* Filtro Tipo */}
            <select
              value={filtroTipo}
              onChange={(e) => setFiltroTipo(e.target.value)}
              className="px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100 transition-all duration-300 outline-none bg-white font-medium"
            >
              <option value="todos">Todos los tipos</option>
              <option value="Torniquete">Torniquete</option>
              <option value="Puerta">Puerta</option>
              <option value="Molinete">Molinete</option>
            </select>
          </div>
        </div>

        {/* Tabla de dispositivos */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">ID</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Nombre/Ubicación</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Tipo</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Estado</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Última Actividad</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Accesos Hoy</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Tasa Error</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">IP/Conexión</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Firmware</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {dispositivosFiltrados.map((dispositivo, index) => (
                <motion.tr
                  key={dispositivo.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03, duration: 0.3 }}
                  className="hover:bg-gradient-to-r hover:from-cyan-50 hover:to-teal-50 transition-all duration-200"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-bold text-gray-900">#{dispositivo.id}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-gray-900">{dispositivo.nombre}</span>
                      <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                        <MapPin className="w-3 h-3" />
                        {dispositivo.ubicacion}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-3 py-1 text-xs font-bold rounded-full bg-gradient-to-r from-cyan-100 to-teal-100 text-cyan-700">
                      {dispositivo.tipo}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getEstadoBadge(dispositivo.estado)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-700">{dispositivo.ultimaActividad}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-bold text-gray-900">{dispositivo.accesosHoy}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-sm font-bold ${dispositivo.tasaError > 5 ? 'text-red-600' : dispositivo.tasaError > 2 ? 'text-yellow-600' : 'text-green-600'}`}>
                      {dispositivo.tasaError}%
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      {dispositivo.estado === 'online' ? (
                        <Wifi className="w-4 h-4 text-green-600" />
                      ) : (
                        <WifiOff className="w-4 h-4 text-red-600" />
                      )}
                      <span className="text-xs font-mono text-gray-600">{dispositivo.ip}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-xs font-mono bg-gray-100 px-2 py-1 rounded text-gray-700">{dispositivo.firmware}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedDispositivo(dispositivo)}
                        className="p-2 bg-cyan-100 hover:bg-cyan-200 rounded-lg transition-colors group"
                        title="Ver detalles"
                      >
                        <Eye className="w-4 h-4 text-cyan-700 group-hover:text-cyan-900" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-2 bg-blue-100 hover:bg-blue-200 rounded-lg transition-colors group"
                        title="Configurar"
                      >
                        <Settings className="w-4 h-4 text-blue-700 group-hover:text-blue-900" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-2 bg-green-100 hover:bg-green-200 rounded-lg transition-colors group"
                        title="Reiniciar"
                        disabled={dispositivo.estado === 'offline'}
                      >
                        <RotateCw className="w-4 h-4 text-green-700 group-hover:text-green-900" />
                      </motion.button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>

          {dispositivosFiltrados.length === 0 && (
            <div className="p-12 text-center">
              <Filter className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 font-medium">No se encontraron dispositivos con los filtros aplicados</p>
            </div>
          )}
        </div>

        {/* Footer con resumen */}
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">
              Mostrando <span className="font-bold text-gray-900">{dispositivosFiltrados.length}</span> de <span className="font-bold text-gray-900">{dispositivos.length}</span> dispositivos
            </span>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-xs text-gray-600">{dispositivos.filter(d => d.estado === 'online').length} Online</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <span className="text-xs text-gray-600">{dispositivos.filter(d => d.estado === 'offline').length} Offline</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <span className="text-xs text-gray-600">{dispositivos.filter(d => d.estado === 'advertencia').length} Advertencia</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL DE DETALLE */}
      <AnimatePresence>
        {selectedDispositivo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedDispositivo(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              {/* Header del modal */}
              <div className="bg-gradient-to-r from-cyan-500 via-teal-500 to-green-500 p-6 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
                    backgroundSize: '20px 20px'
                  }}></div>
                </div>

                <div className="relative z-10 flex items-start justify-between">
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-2">{selectedDispositivo.nombre}</h2>
                    <div className="flex items-center gap-2 text-cyan-50">
                      <MapPin className="w-4 h-4" />
                      <span>{selectedDispositivo.ubicacion}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedDispositivo(null)}
                    className="p-2 bg-white/20 hover:bg-white/30 rounded-xl backdrop-blur-sm transition-colors"
                  >
                    <X className="w-6 h-6 text-white" />
                  </button>
                </div>
              </div>

              {/* Contenido del modal */}
              <div className="p-6 space-y-6">
                {/* Estado actual grande */}
                <div className="flex items-center justify-center py-6">
                  {getEstadoBadge(selectedDispositivo.estado)}
                </div>

                {/* Grid de información */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Información General */}
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <Activity className="w-5 h-5 text-blue-600" />
                      Información General
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <span className="text-xs font-semibold text-gray-600 uppercase">Modelo</span>
                        <p className="text-sm font-bold text-gray-900">{selectedDispositivo.modelo}</p>
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-gray-600 uppercase">Fabricante</span>
                        <p className="text-sm font-bold text-gray-900">{selectedDispositivo.fabricante}</p>
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-gray-600 uppercase">Número de Serie</span>
                        <p className="text-xs font-mono bg-white px-2 py-1 rounded text-gray-700">{selectedDispositivo.numeroSerie}</p>
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-gray-600 uppercase">Fecha de Instalación</span>
                        <p className="text-sm font-bold text-gray-900">{selectedDispositivo.fechaInstalacion}</p>
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-gray-600 uppercase">Último Mantenimiento</span>
                        <p className="text-sm font-bold text-gray-900">{selectedDispositivo.ultimoMantenimiento}</p>
                      </div>
                    </div>
                  </div>

                  {/* Estado Actual */}
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <Activity className="w-5 h-5 text-green-600" />
                      Estado Actual
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <span className="text-xs font-semibold text-gray-600 uppercase">Uptime</span>
                        <p className="text-sm font-bold text-gray-900">{selectedDispositivo.uptime}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Thermometer className="w-4 h-4 text-orange-600" />
                        <div className="flex-1">
                          <span className="text-xs font-semibold text-gray-600 uppercase">Temperatura</span>
                          <p className="text-sm font-bold text-gray-900">{selectedDispositivo.temperatura}°C</p>
                        </div>
                      </div>
                      {selectedDispositivo.bateria !== undefined && (
                        <div className="flex items-center gap-2">
                          <Battery className="w-4 h-4 text-green-600" />
                          <div className="flex-1">
                            <span className="text-xs font-semibold text-gray-600 uppercase">Batería</span>
                            <p className="text-sm font-bold text-gray-900">{selectedDispositivo.bateria}%</p>
                            <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                              <div
                                className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full"
                                style={{ width: `${selectedDispositivo.bateria}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Estadísticas */}
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-purple-600" />
                      Estadísticas
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <span className="text-xs font-semibold text-gray-600 uppercase">Accesos procesados hoy</span>
                        <p className="text-2xl font-bold text-purple-700">{selectedDispositivo.accesosHoy}</p>
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-gray-600 uppercase">Tasa de éxito</span>
                        <p className="text-lg font-bold text-green-600">{(100 - selectedDispositivo.tasaError).toFixed(1)}%</p>
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-gray-600 uppercase">Tiempo promedio de respuesta</span>
                        <p className="text-lg font-bold text-blue-600">{selectedDispositivo.tiempoRespuesta}ms</p>
                      </div>
                    </div>
                  </div>

                  {/* Configuración */}
                  <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl p-6 border border-orange-200">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <Settings className="w-5 h-5 text-orange-600" />
                      Configuración
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <span className="text-xs font-semibold text-gray-600 uppercase">Dirección IP</span>
                        <p className="text-sm font-mono bg-white px-2 py-1 rounded text-gray-700">{selectedDispositivo.ip}</p>
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-gray-600 uppercase">Versión de Firmware</span>
                        <p className="text-sm font-mono bg-white px-2 py-1 rounded text-gray-700">{selectedDispositivo.firmware}</p>
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-gray-600 uppercase">Tipo de Dispositivo</span>
                        <p className="text-sm font-bold text-gray-900">{selectedDispositivo.tipo}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Botones de acción */}
                <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-teal-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
                  >
                    <RotateCw className="w-5 h-5" />
                    Reiniciar Dispositivo
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
                  >
                    <Settings className="w-5 h-5" />
                    Configurar
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
                  >
                    <Wrench className="w-5 h-5" />
                    Modo Mantenimiento
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
                  >
                    <TestTube className="w-5 h-5" />
                    Test de Conectividad
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PanelTornos;
