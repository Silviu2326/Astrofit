import React from 'react';
import { motion } from 'framer-motion';
import { Battery, Signal, Wifi } from 'lucide-react';

interface MockupInteractivoProps {
  children: React.ReactNode;
  platform: 'iOS' | 'Android';
  device?: string;
  orientation?: 'portrait' | 'landscape';
  zoom?: number;
}

const MockupInteractivo: React.FC<MockupInteractivoProps> = ({
  children,
  platform,
  device = 'iPhone 15 Pro Max',
  orientation = 'portrait',
  zoom = 100
}) => {
  const isIOS = platform === 'iOS';
  const isLandscape = orientation === 'landscape';
  const scale = zoom / 100;

  // Dimensiones base según el dispositivo
  const getDeviceDimensions = () => {
    if (isLandscape) {
      return { width: 'w-[700px]', height: 'h-[360px]' };
    }

    switch (device) {
      case 'iPad Pro':
        return { width: 'w-[450px]', height: 'h-[620px]' };
      case 'iPhone SE':
        return { width: 'w-[320px]', height: 'h-[580px]' };
      default:
        return { width: 'w-[380px]', height: 'h-[780px]' };
    }
  };

  const dimensions = getDeviceDimensions();

  // Clases del mockup con efecto 3D
  const mockupClasses = isIOS
    ? `relative ${dimensions.width} ${dimensions.height} bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-[50px] flex items-center justify-center overflow-hidden`
    : `relative ${dimensions.width} ${dimensions.height} bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 rounded-[30px] flex items-center justify-center overflow-hidden`;

  const screenClasses = isIOS
    ? 'w-[94%] h-[97%] rounded-[42px] bg-white overflow-hidden relative'
    : 'w-[96%] h-[97%] rounded-[22px] bg-white overflow-hidden relative';

  // Hora actual
  const currentTime = new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });

  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: scale, opacity: 1 }}
      transition={{ duration: 0.5, type: 'spring', stiffness: 100 }}
      className="relative my-8"
      style={{
        transformOrigin: 'center',
        filter: 'drop-shadow(0 25px 50px rgba(0, 0, 0, 0.25))'
      }}
    >
      {/* Sombra 3D del dispositivo */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-[50px] blur-3xl transform translate-y-8 scale-95"></div>

      <div className={mockupClasses}>
        {/* Marco metálico del dispositivo */}
        <div className="absolute inset-0 rounded-[50px] border-4 border-gray-600/50 pointer-events-none z-20"></div>

        {/* Botones laterales (iOS) */}
        {isIOS && !isLandscape && (
          <>
            {/* Botón de volumen */}
            <div className="absolute left-0 top-32 w-1 h-12 bg-gray-700 rounded-l-sm"></div>
            <div className="absolute left-0 top-48 w-1 h-12 bg-gray-700 rounded-l-sm"></div>
            {/* Botón de encendido */}
            <div className="absolute right-0 top-40 w-1 h-16 bg-gray-700 rounded-r-sm"></div>
          </>
        )}

        {/* Notch de iOS (Dynamic Island) */}
        {isIOS && !isLandscape && (
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-32 h-8 bg-black rounded-full z-30 flex items-center justify-center gap-2 px-4">
            <div className="w-2 h-2 bg-gray-800 rounded-full"></div>
            <div className="w-12 h-4 bg-gray-900 rounded-full"></div>
          </div>
        )}

        {/* Pantalla del dispositivo */}
        <div className={screenClasses}>
          {/* Status Bar - iOS */}
          {isIOS && (
            <div className="absolute top-0 left-0 right-0 h-14 bg-transparent px-6 flex items-center justify-between text-white z-40 pt-3">
              <div className="text-sm font-semibold">{currentTime}</div>
              <div className="flex items-center gap-1">
                <Signal className="w-4 h-4" />
                <Wifi className="w-4 h-4" />
                <Battery className="w-5 h-4" />
              </div>
            </div>
          )}

          {/* Status Bar - Android */}
          {!isIOS && (
            <div className="absolute top-0 left-0 right-0 h-10 bg-black/10 px-4 flex items-center justify-between text-gray-900 z-40">
              <div className="text-xs font-semibold">{currentTime}</div>
              <div className="flex items-center gap-1">
                <Signal className="w-3 h-3" />
                <Wifi className="w-3 h-3" />
                <Battery className="w-4 h-3" />
              </div>
            </div>
          )}

          {/* Contenido de la app */}
          <div className="absolute inset-0" style={{ top: isIOS ? '56px' : '40px', bottom: isIOS ? '34px' : '0' }}>
            {children}
          </div>

          {/* Indicador de gesto home (iOS moderno) */}
          {isIOS && !isLandscape && (
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-gray-800 rounded-full z-40"></div>
          )}

          {/* Navegación Android */}
          {!isIOS && !isLandscape && (
            <div className="absolute bottom-0 left-0 right-0 h-12 bg-black/5 flex justify-center items-center gap-12 z-40">
              <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
              <div className="w-8 h-8 border-2 border-gray-600 rounded-lg"></div>
              <div className="w-6 h-6 bg-gray-600 rounded-sm"></div>
            </div>
          )}
        </div>

        {/* Reflejo de luz en el marco */}
        <div className="absolute inset-0 rounded-[50px] bg-gradient-to-tr from-white/5 via-transparent to-transparent pointer-events-none"></div>
      </div>

      {/* Etiqueta del dispositivo */}
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur-sm px-4 py-1 rounded-full border border-gray-200">
        <p className="text-xs font-semibold text-gray-600">{device}</p>
      </div>
    </motion.div>
  );
};

export default MockupInteractivo;
