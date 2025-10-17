
import React, { useState } from 'react';
import toast from 'react-hot-toast';

interface AccionesFidelizacionProps {
  onSaveActionsRequest?: () => void;
}

const AccionesFidelizacion: React.FC<AccionesFidelizacionProps> = ({ onSaveActionsRequest }) => {
  const [actions, setActions] = useState({
    email: false,
    push: false,
    discount: false,
    call: false
  });

  const handleActionChange = (action: keyof typeof actions) => {
    setActions(prev => ({
      ...prev,
      [action]: !prev[action]
    }));
  };

  const handleSaveActions = () => {
    console.log('🔍 [DEBUG] AccionesFidelizacion handleSaveActions called');
    console.log('🔍 [DEBUG] Selected actions:', actions);
    
    const selectedActions = Object.entries(actions)
      .filter(([_, isSelected]) => isSelected)
      .map(([action, _]) => action);

    if (selectedActions.length === 0) {
      toast.error('⚠️ Selecciona al menos una acción', {
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

    toast.success(`✅ Acciones guardadas: ${selectedActions.join(', ')}`, {
      icon: '💾',
      duration: 3000,
      style: {
        borderRadius: '12px',
        background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
        color: '#fff',
        fontWeight: '600',
        boxShadow: '0 8px 32px rgba(139, 92, 246, 0.4)',
        border: '2px solid rgba(255, 255, 255, 0.2)'
      }
    });

    // Si hay callback del padre, lo llamamos
    if (onSaveActionsRequest) {
      console.log('🔍 [DEBUG] Calling parent onSaveActionsRequest');
      onSaveActionsRequest();
    }
  };

  return (
    <div className="border border-gray-200 p-6 rounded-lg bg-white">
      <h3 className="text-xl font-semibold text-gray-700 mb-4">Definición de Acciones de Fidelización</h3>
      <p className="text-gray-600 mb-4">
        Configura las acciones que se ejecutarán como parte de tus flujos de retención.
      </p>
      <div className="space-y-3">
        <label className="flex items-center">
          <input 
            type="checkbox" 
            checked={actions.email}
            onChange={() => handleActionChange('email')}
            className="form-checkbox text-blue-600 rounded focus:ring-blue-500" 
          />
          <span className="ml-2 text-gray-700">Enviar Email</span>
        </label>
        <label className="flex items-center">
          <input 
            type="checkbox" 
            checked={actions.push}
            onChange={() => handleActionChange('push')}
            className="form-checkbox text-blue-600 rounded focus:ring-blue-500" 
          />
          <span className="ml-2 text-gray-700">Enviar Notificación Push</span>
        </label>
        <label className="flex items-center">
          <input 
            type="checkbox" 
            checked={actions.discount}
            onChange={() => handleActionChange('discount')}
            className="form-checkbox text-blue-600 rounded focus:ring-blue-500" 
          />
          <span className="ml-2 text-gray-700">Ofrecer Descuento</span>
        </label>
        <label className="flex items-center">
          <input 
            type="checkbox" 
            checked={actions.call}
            onChange={() => handleActionChange('call')}
            className="form-checkbox text-blue-600 rounded focus:ring-blue-500" 
          />
          <span className="ml-2 text-gray-700">Programar Llamada</span>
        </label>
        {/* Más opciones de acciones */}
      </div>
      <button 
        onClick={handleSaveActions}
        className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 transition-all duration-200 hover:scale-105"
      >
        Guardar Acciones
      </button>
    </div>
  );
};

export default AccionesFidelizacion;
