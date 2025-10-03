import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X } from 'lucide-react';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'danger' | 'warning' | 'info';
  isLoading?: boolean;
}

function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  type = 'danger',
  isLoading = false,
}: ConfirmationModalProps) {
  const getTypeStyles = () => {
    switch (type) {
      case 'danger':
        return {
          icon: <AlertTriangle className="w-8 h-8 text-red-400" />,
          confirmButton: 'bg-red-500 hover:bg-red-600 text-white',
          border: 'border-red-500/30',
        };
      case 'warning':
        return {
          icon: <AlertTriangle className="w-8 h-8 text-yellow-400" />,
          confirmButton: 'bg-yellow-500 hover:bg-yellow-600 text-white',
          border: 'border-yellow-500/30',
        };
      case 'info':
        return {
          icon: <AlertTriangle className="w-8 h-8 text-blue-400" />,
          confirmButton: 'bg-blue-500 hover:bg-blue-600 text-white',
          border: 'border-blue-500/30',
        };
    }
  };

  const styles = getTypeStyles();

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
            className={`bg-slate-800 rounded-2xl border ${styles.border} p-8 max-w-md w-full`}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                {styles.icon}
                <h3 className="text-xl font-bold text-white">{title}</h3>
              </div>
              <button
                onClick={onClose}
                className="text-slate-400 hover:text-white transition-colors"
                disabled={isLoading}
              >
                <X size={24} />
              </button>
            </div>

            <p className="text-slate-300 mb-8 leading-relaxed">{message}</p>

            <div className="flex gap-3">
              <button
                onClick={onClose}
                disabled={isLoading}
                className="flex-1 bg-slate-700 text-white py-3 rounded-xl font-semibold hover:bg-slate-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {cancelText}
              </button>
              <button
                onClick={onConfirm}
                disabled={isLoading}
                className={`flex-1 ${styles.confirmButton} py-3 rounded-xl font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2`}
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

export default ConfirmationModal;