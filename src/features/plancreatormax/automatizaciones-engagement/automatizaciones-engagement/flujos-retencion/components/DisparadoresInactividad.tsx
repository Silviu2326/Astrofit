
import React, { useState } from 'react';
import toast from 'react-hot-toast';

interface DisparadoresInactividadProps {
  onAddTriggerRequest?: () => void;
}

const DisparadoresInactividad: React.FC<DisparadoresInactividadProps> = ({ onAddTriggerRequest }) => {
  const [inactivityDays, setInactivityDays] = useState<number>(30);

  const handleAddTrigger = () => {
    console.log('🔍 [DEBUG] DisparadoresInactividad handleAddTrigger called');
    console.log('🔍 [DEBUG] inactivityDays:', inactivityDays);
    
    if (!inactivityDays || inactivityDays <= 0) {
      toast.error('⚠️ Ingresa un número válido de días', {
        duration: 3000,
        style: {
          borderRadius: '12px',
          background: 'linear-gradient(135deg, #f59e0b, #d97706)',
          color: '#fff',
          fontWeight: '600',
          boxShadow: '0 8px 32px rgba(245, 158, 11, 0.3)',
          border: '2px solid rgba(255, 255, 255, 0.2)'
        }
      });
      return;
    }

    toast.success(`✅ Disparador configurado para ${inactivityDays} días`, {
      icon: '🎯',
      duration: 3000,
      style: {
        borderRadius: '12px',
        background: 'linear-gradient(135deg, #10b981, #059669)',
        color: '#fff',
        fontWeight: '600',
        boxShadow: '0 8px 32px rgba(16, 185, 129, 0.4)',
        border: '2px solid rgba(255, 255, 255, 0.2)'
      }
    });

    // Si hay callback del padre, lo llamamos
    if (onAddTriggerRequest) {
      console.log('🔍 [DEBUG] Calling parent onAddTriggerRequest');
      onAddTriggerRequest();
    }
  };

  return (
    <div className="border border-gray-200 p-6 rounded-lg bg-white">
      <h3 className="text-xl font-semibold text-gray-700 mb-4">Configuración de Disparadores por Inactividad</h3>
      <p className="text-gray-600 mb-4">
        Establece las condiciones que activarán los flujos de retención basados en el comportamiento del usuario.
      </p>
      <ul className="list-disc list-inside text-gray-600">
        <li>30 días sin iniciar sesión: Activar secuencia "Te echamos de menos".</li>
        <li>60 días sin compras: Ofrecer descuento especial.</li>
        <li>90 días sin interacción: Considerar como cliente inactivo profundo.</li>
      </ul>
      {/* Interfaz para añadir/editar disparadores */}
      <div className="mt-4">
        <label htmlFor="inactivityDays" className="block text-sm font-medium text-gray-700">Días de inactividad:</label>
        <input
          type="number"
          id="inactivityDays"
          value={inactivityDays}
          onChange={(e) => setInactivityDays(Number(e.target.value))}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          placeholder="Ej: 30"
          min="1"
          max="365"
        />
        <button 
          onClick={handleAddTrigger}
          className="mt-3 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-all duration-200 hover:scale-105"
        >
          Añadir Disparador
        </button>
      </div>
    </div>
  );
};

export default DisparadoresInactividad;
