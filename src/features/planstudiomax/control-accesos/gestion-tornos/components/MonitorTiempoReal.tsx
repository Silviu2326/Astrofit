import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Activity, User, CreditCard, CheckCircle, XCircle,
  Clock, MapPin, AlertCircle, Play, Pause, Volume2, VolumeX
} from 'lucide-react';

interface AccesoEnTiempoReal {
  id: string;
  timestamp: string;
  torno: string;
  ubicacion: string;
  socio: {
    nombre: string;
    foto: string;
    id: string;
  };
  tarjeta: string;
  resultado: 'permitido' | 'denegado';
  motivo?: string;
}

const MonitorTiempoReal: React.FC = () => {
  const [accesos, setAccesos] = useState<AccesoEnTiempoReal[]>([]);
  const [isPaused, setIsPaused] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [contador, setContador] = useState(0);

  // Datos mockeados para simular accesos
  const sociosMock = [
    { nombre: 'Juan Pérez', foto: '👨', id: 'S-001' },
    { nombre: 'María González', foto: '👩', id: 'S-002' },
    { nombre: 'Carlos Rodríguez', foto: '👨‍💼', id: 'S-003' },
    { nombre: 'Ana Martínez', foto: '👩‍💼', id: 'S-004' },
    { nombre: 'Luis Fernández', foto: '🧑', id: 'S-005' },
    { nombre: 'Laura Sánchez', foto: '👧', id: 'S-006' },
    { nombre: 'Pedro López', foto: '👦', id: 'S-007' },
    { nombre: 'Sofia Ramírez', foto: '👱‍♀️', id: 'S-008' },
    { nombre: 'Diego Torres', foto: '🧔', id: 'S-009' },
    { nombre: 'Carmen Ruiz', foto: '👩‍🦰', id: 'S-010' },
  ];

  const tornosMock = [
    { nombre: 'Torno Principal Entrada', ubicacion: 'Entrada Principal' },
    { nombre: 'Puerta Automática Gym', ubicacion: 'Área Gimnasio' },
    { nombre: 'Molinete Vestuario Hombres', ubicacion: 'Vestuario Masculino' },
    { nombre: 'Molinete Vestuario Mujeres', ubicacion: 'Vestuario Femenino' },
    { nombre: 'Puerta VIP Spa', ubicacion: 'Área Spa VIP' },
    { nombre: 'Puerta Cafetería', ubicacion: 'Cafetería' },
    { nombre: 'Molinete Clases Grupales', ubicacion: 'Sala de Clases' },
  ];

  const motivosDenegacion = [
    'Membresía vencida',
    'Tarjeta no autorizada',
    'Horario no permitido',
    'Acceso restringido',
    'Tarjeta bloqueada',
  ];

  // Simulador de accesos en tiempo real
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      const randomSocio = sociosMock[Math.floor(Math.random() * sociosMock.length)];
      const randomTorno = tornosMock[Math.floor(Math.random() * tornosMock.length)];
      const resultado = Math.random() > 0.15 ? 'permitido' : 'denegado'; // 85% permitido, 15% denegado
      const motivo = resultado === 'denegado'
        ? motivosDenegacion[Math.floor(Math.random() * motivosDenegacion.length)]
        : undefined;

      const nuevoAcceso: AccesoEnTiempoReal = {
        id: `acceso-${Date.now()}-${Math.random()}`,
        timestamp: new Date().toLocaleTimeString('es-ES'),
        torno: randomTorno.nombre,
        ubicacion: randomTorno.ubicacion,
        socio: randomSocio,
        tarjeta: `****${Math.floor(1000 + Math.random() * 9000)}`,
        resultado,
        motivo
      };

      setAccesos(prev => {
        const nuevosAccesos = [nuevoAcceso, ...prev];
        // Mantener solo los últimos 100 accesos
        return nuevosAccesos.slice(0, 100);
      });

      setContador(prev => prev + 1);

      // Reproducir sonido si está habilitado
      if (soundEnabled) {
        // En producción aquí iría un audio real
        console.log('🔊', resultado === 'permitido' ? 'Beep ✓' : 'Beep ✗');
      }
    }, 2000); // Nuevo acceso cada 2 segundos

    return () => clearInterval(interval);
  }, [isPaused, soundEnabled]);

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50">
      {/* Header con gradiente */}
      <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 p-6 relative overflow-hidden">
        {/* Pattern de fondo */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        <div className="relative z-10 flex items-center justify-between flex-wrap gap-4">
          <div>
            <h3 className="text-2xl font-bold text-white flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                <Activity className="w-6 h-6" />
              </div>
              Monitoreo en Tiempo Real
            </h3>
            <p className="text-purple-50 mt-2">Stream de accesos en vivo</p>
          </div>

          {/* Controles */}
          <div className="flex items-center gap-3">
            {/* Badge de contador */}
            <div className="px-4 py-2 bg-white/20 backdrop-blur-md rounded-full border border-white/20">
              <span className="text-sm font-bold text-white">{accesos.length} accesos</span>
            </div>

            {/* Botón Play/Pause */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsPaused(!isPaused)}
              className="p-3 bg-white/20 hover:bg-white/30 rounded-xl backdrop-blur-sm transition-colors"
              title={isPaused ? 'Reanudar' : 'Pausar'}
            >
              {isPaused ? (
                <Play className="w-5 h-5 text-white" />
              ) : (
                <Pause className="w-5 h-5 text-white" />
              )}
            </motion.button>

            {/* Botón Sonido */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-3 bg-white/20 hover:bg-white/30 rounded-xl backdrop-blur-sm transition-colors"
              title={soundEnabled ? 'Silenciar' : 'Activar sonido'}
            >
              {soundEnabled ? (
                <Volume2 className="w-5 h-5 text-white" />
              ) : (
                <VolumeX className="w-5 h-5 text-white" />
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Indicador de estado */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 px-6 py-3 border-b border-gray-200">
        <div className="flex items-center gap-2">
          {!isPaused ? (
            <>
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-bold text-gray-700">Sistema activo - Auto-refresh cada 2 segundos</span>
            </>
          ) : (
            <>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span className="text-sm font-bold text-gray-700">Sistema pausado</span>
            </>
          )}
        </div>
      </div>

      {/* Stream de accesos */}
      <div className="p-6 max-h-[600px] overflow-y-auto">
        <AnimatePresence mode="popLayout">
          {accesos.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-12"
            >
              <Activity className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 font-medium">
                {isPaused ? 'Sistema pausado' : 'Esperando accesos...'}
              </p>
            </motion.div>
          ) : (
            <div className="space-y-3">
              {accesos.map((acceso, index) => (
                <motion.div
                  key={acceso.id}
                  initial={{ opacity: 0, x: -50, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 50, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className={`relative p-4 rounded-2xl border-2 transition-all duration-300 ${
                    acceso.resultado === 'permitido'
                      ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 hover:border-green-300'
                      : 'bg-gradient-to-r from-red-50 to-pink-50 border-red-200 hover:border-red-300'
                  } ${index === 0 ? 'ring-4 ring-purple-200 ring-opacity-50' : ''}`}
                >
                  {/* Indicador de nuevo */}
                  {index === 0 && (
                    <div className="absolute -top-2 -right-2">
                      <span className="px-3 py-1 bg-purple-500 text-white text-xs font-bold rounded-full shadow-lg animate-pulse">
                        NUEVO
                      </span>
                    </div>
                  )}

                  <div className="flex items-center gap-4">
                    {/* Avatar del socio */}
                    <div className="flex-shrink-0">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-3xl shadow-lg">
                        {acceso.socio.foto}
                      </div>
                    </div>

                    {/* Información del acceso */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div>
                          <h4 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                            {acceso.socio.nombre}
                            {acceso.resultado === 'permitido' ? (
                              <CheckCircle className="w-5 h-5 text-green-600" />
                            ) : (
                              <XCircle className="w-5 h-5 text-red-600" />
                            )}
                          </h4>
                          <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                            <User className="w-3 h-3" />
                            <span className="font-mono">{acceso.socio.id}</span>
                            <span className="text-gray-400">•</span>
                            <CreditCard className="w-3 h-3" />
                            <span className="font-mono">{acceso.tarjeta}</span>
                          </div>
                        </div>

                        {/* Badge de resultado */}
                        <div className={`px-3 py-1.5 rounded-xl font-bold text-sm shadow-md ${
                          acceso.resultado === 'permitido'
                            ? 'bg-green-500 text-white'
                            : 'bg-red-500 text-white'
                        }`}>
                          {acceso.resultado === 'permitido' ? 'PERMITIDO' : 'DENEGADO'}
                        </div>
                      </div>

                      {/* Información del torno */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-2">
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <div>
                            <span className="font-bold text-gray-900">{acceso.torno}</span>
                            <p className="text-xs text-gray-500">{acceso.ubicacion}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span className="font-mono text-gray-700">{acceso.timestamp}</span>
                        </div>
                      </div>

                      {/* Motivo de denegación */}
                      {acceso.motivo && (
                        <div className="flex items-center gap-2 px-3 py-2 bg-red-100 rounded-lg border border-red-200">
                          <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
                          <span className="text-sm font-bold text-red-700">{acceso.motivo}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Barra decorativa inferior */}
                  <div className={`absolute bottom-0 left-0 right-0 h-1 ${
                    acceso.resultado === 'permitido'
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500'
                      : 'bg-gradient-to-r from-red-500 to-pink-500'
                  }`}></div>
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer con estadísticas rápidas */}
      {accesos.length > 0 && (
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-t border-gray-200">
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-sm text-gray-600 font-semibold mb-1">Total</p>
              <p className="text-2xl font-bold text-gray-900">{accesos.length}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600 font-semibold mb-1">Permitidos</p>
              <p className="text-2xl font-bold text-green-600">
                {accesos.filter(a => a.resultado === 'permitido').length}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600 font-semibold mb-1">Denegados</p>
              <p className="text-2xl font-bold text-red-600">
                {accesos.filter(a => a.resultado === 'denegado').length}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MonitorTiempoReal;
