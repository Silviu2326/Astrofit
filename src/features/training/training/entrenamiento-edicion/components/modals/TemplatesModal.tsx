import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SessionTemplate } from '../../types/training.types';

interface TemplatesModalProps {
  show: boolean;
  templates: SessionTemplate[];
  onClose: () => void;
  onApplyTemplate: (templateId: string) => void;
}

const TemplatesModal: React.FC<TemplatesModalProps> = ({ show, templates, onClose, onApplyTemplate }) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="bg-white rounded-2xl p-8 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-2xl font-black text-gray-900 mb-4">Plantillas de Sesiones</h3>
            <div className="space-y-3">
              {templates.map(template => (
                <div key={template.id} className="p-4 bg-gray-50 rounded-xl border-2 border-gray-200 hover:border-orange-300 transition-all">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-gray-900">{template.name}</h4>
                      <p className="text-sm text-gray-600">
                        {template.exercises.length} ejercicios · {template.duration} min
                      </p>
                    </div>
                    <button
                      onClick={() => onApplyTemplate(template.id)}
                      className="px-4 py-2 bg-gradient-to-r from-orange-500 to-pink-600 text-white rounded-lg hover:shadow-lg transition-all font-bold text-sm"
                    >
                      Aplicar
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={onClose}
              className="mt-6 w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-all font-bold"
            >
              Cerrar
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TemplatesModal;
