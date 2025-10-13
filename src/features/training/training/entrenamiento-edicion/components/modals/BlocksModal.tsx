import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExerciseBlock } from '../../types/training.types';
import { MOCK_EXERCISES } from '../../constants/trainingData';

interface BlocksModalProps {
  show: boolean;
  blocks: ExerciseBlock[];
  onClose: () => void;
  onAddBlock: (blockId: string) => void;
}

const BlocksModal: React.FC<BlocksModalProps> = ({ show, blocks, onClose, onAddBlock }) => {
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
            className="bg-white rounded-2xl p-8 max-w-3xl w-full mx-4 max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-2xl font-black text-gray-900 mb-4">📦 Bloques de Ejercicios</h3>
            <p className="text-gray-600 mb-6">Inserta grupos de ejercicios pre-configurados</p>
            <div className="space-y-3">
              {blocks.map(block => (
                <div key={block.id} className="p-4 bg-gray-50 rounded-xl border-2 border-gray-200 hover:border-orange-300 transition-all">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900 mb-1">{block.name}</h4>
                      <p className="text-sm text-gray-600 mb-2">{block.description}</p>
                      <div className="flex gap-2 mb-2">
                        {block.tags.map(tag => (
                          <span key={tag} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full font-semibold">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="text-xs text-gray-500">
                        {block.exercises.length} ejercicios
                      </div>
                    </div>
                    <button
                      onClick={() => onAddBlock(block.id)}
                      className="px-4 py-2 bg-gradient-to-r from-orange-500 to-pink-600 text-white rounded-lg hover:shadow-lg transition-all font-bold text-sm ml-4"
                    >
                      Agregar
                    </button>
                  </div>
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <div className="space-y-1">
                      {block.exercises.map((ex, idx) => {
                        const exerciseData = MOCK_EXERCISES.find(e => e.id === ex.exerciseId);
                        return (
                          <div key={idx} className="text-xs text-gray-600 flex items-center gap-2">
                            <span>{exerciseData?.image}</span>
                            <span className="font-semibold">{exerciseData?.name}</span>
                            <span>-</span>
                            <span>{ex.sets}x{ex.reps}</span>
                          </div>
                        );
                      })}
                    </div>
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

export default BlocksModal;
