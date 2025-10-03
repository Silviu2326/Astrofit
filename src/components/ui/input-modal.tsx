import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface InputModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (value: string) => void;
  title: string;
  message: string;
  placeholder?: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'text' | 'number' | 'email' | 'password';
  defaultValue?: string;
  isLoading?: boolean;
}

function InputModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  placeholder = '',
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  type = 'text',
  defaultValue = '',
  isLoading = false,
}: InputModalProps) {
  const [value, setValue] = useState(defaultValue);

  const handleConfirm = () => {
    if (value.trim()) {
      onConfirm(value.trim());
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && value.trim()) {
      handleConfirm();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-6"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-slate-800 rounded-2xl border border-slate-700 p-8 max-w-md w-full"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">{title}</h3>
              <button
                onClick={onClose}
                className="text-slate-400 hover:text-white transition-colors"
                disabled={isLoading}
              >
                <X size={24} />
              </button>
            </div>

            <p className="text-slate-300 mb-4">{message}</p>

            <input
              type={type}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={placeholder}
              className="w-full bg-slate-700 text-white px-4 py-3 rounded-xl border border-slate-600 focus:border-orange-500 focus:outline-none mb-6"
              autoFocus
              disabled={isLoading}
            />

            <div className="flex gap-3">
              <button
                onClick={onClose}
                disabled={isLoading}
                className="flex-1 bg-slate-700 text-white py-3 rounded-xl font-semibold hover:bg-slate-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {cancelText}
              </button>
              <button
                onClick={handleConfirm}
                disabled={isLoading || !value.trim()}
                className="flex-1 bg-orange-500 text-white py-3 rounded-xl font-semibold hover:bg-orange-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading && (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                )}
                {confirmText}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default InputModal;