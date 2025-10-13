import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DAYS_OF_WEEK } from '../../constants/trainingData';

interface AddDayModalProps {
  show: boolean;
  currentDays: string[];
  onClose: () => void;
  onAddDay: (dayId: string) => void;
}

const AddDayModal: React.FC<AddDayModalProps> = ({ show, currentDays, onClose, onAddDay }) => {
  const availableDays = DAYS_OF_WEEK.filter(day => !currentDays.includes(day.id));

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
            className="bg-white rounded-2xl p-8 max-w-md w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-2xl font-black text-gray-900 mb-4">Selecciona un Día</h3>
            <div className="space-y-2">
              {availableDays.map(day => (
                <button
                  key={day.id}
                  onClick={() => {
                    onAddDay(day.id);
                    onClose();
                  }}
                  className="w-full p-4 bg-gray-50 hover:bg-orange-50 rounded-xl text-left transition-all"
                >
                  <div className="font-bold text-gray-900">{day.label}</div>
                </button>
              ))}
            </div>
            <button
              onClick={onClose}
              className="mt-4 w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-all font-bold"
            >
              Cancelar
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AddDayModal;
