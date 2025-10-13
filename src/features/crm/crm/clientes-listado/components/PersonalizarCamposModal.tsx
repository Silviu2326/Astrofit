import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Settings, 
  X, 
  Check, 
  Eye, 
  EyeOff, 
  GripVertical, 
  ArrowUp, 
  ArrowDown,
  RotateCcw,
  Save
} from 'lucide-react';

interface CampoPersonalizable {
  id: string;
  nombre: string;
  visible: boolean;
  orden: number;
  ancho?: 'auto' | 'sm' | 'md' | 'lg' | 'xl';
  alineacion?: 'left' | 'center' | 'right';
}

interface PersonalizarCamposModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (campos: CampoPersonalizable[]) => void;
  camposIniciales: CampoPersonalizable[];
}

const PersonalizarCamposModal: React.FC<PersonalizarCamposModalProps> = ({
  isOpen,
  onClose,
  onSave,
  camposIniciales
}) => {
  const [campos, setCampos] = useState<CampoPersonalizable[]>(camposIniciales);
  const [camposOriginales] = useState<CampoPersonalizable[]>(camposIniciales);

  const handleToggleVisibilidad = (id: string) => {
    setCampos(prev => prev.map(campo => 
      campo.id === id ? { ...campo, visible: !campo.visible } : campo
    ));
  };

  const handleMoverArriba = (index: number) => {
    if (index > 0) {
      const nuevosCampos = [...campos];
      [nuevosCampos[index], nuevosCampos[index - 1]] = [nuevosCampos[index - 1], nuevosCampos[index]];
      setCampos(nuevosCampos.map((campo, i) => ({ ...campo, orden: i })));
    }
  };

  const handleMoverAbajo = (index: number) => {
    if (index < campos.length - 1) {
      const nuevosCampos = [...campos];
      [nuevosCampos[index], nuevosCampos[index + 1]] = [nuevosCampos[index + 1], nuevosCampos[index]];
      setCampos(nuevosCampos.map((campo, i) => ({ ...campo, orden: i })));
    }
  };

  const handleCambiarAncho = (id: string, ancho: CampoPersonalizable['ancho']) => {
    setCampos(prev => prev.map(campo => 
      campo.id === id ? { ...campo, ancho } : campo
    ));
  };

  const handleCambiarAlineacion = (id: string, alineacion: CampoPersonalizable['alineacion']) => {
    setCampos(prev => prev.map(campo => 
      campo.id === id ? { ...campo, alineacion } : campo
    ));
  };

  const handleReset = () => {
    setCampos(camposOriginales);
  };

  const handleSave = () => {
    onSave(campos);
    onClose();
  };

  const camposVisibles = campos.filter(c => c.visible).length;
  const totalCampos = campos.length;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-100 rounded-lg">
                  <Settings className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Personalizar Campos de la Tabla</h3>
                  <p className="text-sm text-gray-600">
                    Configura qué campos mostrar y en qué orden
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Contenido */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
              {/* Resumen */}
              <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-blue-900">Resumen de Configuración</h4>
                    <p className="text-sm text-blue-700">
                      {camposVisibles} de {totalCampos} campos visibles
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleReset}
                      className="flex items-center gap-2 px-3 py-2 text-sm text-blue-700 hover:text-blue-900 hover:bg-blue-100 rounded-lg transition-colors"
                    >
                      <RotateCcw className="w-4 h-4" />
                      Restaurar
                    </button>
                  </div>
                </div>
              </div>

              {/* Lista de campos */}
              <div className="space-y-3">
                {campos
                  .sort((a, b) => a.orden - b.orden)
                  .map((campo, index) => (
                    <motion.div
                      key={campo.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
                    >
                      {/* Drag handle */}
                      <div className="text-gray-400 cursor-move">
                        <GripVertical className="w-4 h-4" />
                      </div>

                      {/* Checkbox de visibilidad */}
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={campo.visible}
                          onChange={() => handleToggleVisibilidad(campo.id)}
                          className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                        />
                      </div>

                      {/* Nombre del campo */}
                      <div className="flex-1">
                        <h5 className="font-medium text-gray-900">{campo.nombre}</h5>
                        <p className="text-sm text-gray-600">Campo de la tabla</p>
                      </div>

                      {/* Controles de orden */}
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleMoverArriba(index)}
                          disabled={index === 0}
                          className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                        >
                          <ArrowUp className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleMoverAbajo(index)}
                          disabled={index === campos.length - 1}
                          className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                        >
                          <ArrowDown className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Ancho */}
                      <div className="w-32">
                        <select
                          value={campo.ancho || 'auto'}
                          onChange={(e) => handleCambiarAncho(campo.id, e.target.value as CampoPersonalizable['ancho'])}
                          className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        >
                          <option value="auto">Automático</option>
                          <option value="sm">Pequeño</option>
                          <option value="md">Mediano</option>
                          <option value="lg">Grande</option>
                          <option value="xl">Extra Grande</option>
                        </select>
                      </div>

                      {/* Alineación */}
                      <div className="w-24">
                        <select
                          value={campo.alineacion || 'left'}
                          onChange={(e) => handleCambiarAlineacion(campo.id, e.target.value as CampoPersonalizable['alineacion'])}
                          className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        >
                          <option value="left">Izquierda</option>
                          <option value="center">Centro</option>
                          <option value="right">Derecha</option>
                        </select>
                      </div>

                      {/* Estado visual */}
                      <div className="flex items-center">
                        {campo.visible ? (
                          <Eye className="w-4 h-4 text-green-600" />
                        ) : (
                          <EyeOff className="w-4 h-4 text-gray-400" />
                        )}
                      </div>
                    </motion.div>
                  ))}
              </div>

              {/* Vista previa */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-3">Vista Previa</h4>
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                  <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="w-8">#</span>
                      {campos
                        .filter(c => c.visible)
                        .sort((a, b) => a.orden - b.orden)
                        .map(campo => (
                          <span key={campo.id} className="flex-1 text-center">
                            {campo.nombre}
                          </span>
                        ))}
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <span className="w-8">1</span>
                      {campos
                        .filter(c => c.visible)
                        .sort((a, b) => a.orden - b.orden)
                        .map(campo => (
                          <span key={campo.id} className="flex-1 text-center">
                            Ejemplo
                          </span>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
              <div className="text-sm text-gray-600">
                Los cambios se aplicarán inmediatamente
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  <Save className="w-4 h-4" />
                  Guardar Cambios
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PersonalizarCamposModal;

