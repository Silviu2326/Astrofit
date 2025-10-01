import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface DietaWizardProps {
  currentStep: number;
  totalSteps: number;
  stepLabels: string[];
}

const DietaWizard: React.FC<DietaWizardProps> = ({ currentStep, totalSteps, stepLabels }) => {
  return (
    <div className="w-full mb-8">
      {/* Progress bar animado */}
      <div className="w-full bg-amber-200 rounded-full h-3 overflow-hidden shadow-inner mb-6">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 rounded-full relative"
        >
          <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
        </motion.div>
      </div>

      {/* Stepper horizontal con círculos */}
      <div className="flex items-start justify-between relative">
        {/* Línea conectora de fondo */}
        <div className="absolute top-6 left-0 right-0 h-1 bg-gradient-to-r from-amber-200 via-orange-200 to-red-200 -z-10"
             style={{ marginLeft: '2rem', marginRight: '2rem' }}></div>

        {stepLabels.map((label, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;
          const isUpcoming = index > currentStep;

          return (
            <div key={index} className="flex flex-col items-center flex-1 relative">
              {/* Círculo del paso */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                className={`
                  w-12 h-12 rounded-full flex items-center justify-center text-white font-bold shadow-xl relative z-10
                  ${isCompleted ? 'bg-gradient-to-br from-emerald-500 to-teal-600' : ''}
                  ${isCurrent ? 'bg-gradient-to-br from-amber-500 to-orange-600 ring-4 ring-orange-200' : ''}
                  ${isUpcoming ? 'bg-gradient-to-br from-gray-300 to-gray-400' : ''}
                `}
              >
                {isCompleted ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <Check className="w-6 h-6" />
                  </motion.div>
                ) : (
                  <span className="text-lg">{index + 1}</span>
                )}

                {/* Efecto de brillo para paso actual */}
                {isCurrent && (
                  <div className="absolute inset-0 rounded-full bg-orange-400 blur-xl opacity-50 animate-pulse"></div>
                )}
              </motion.div>

              {/* Label del paso */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.2, duration: 0.4 }}
                className={`
                  mt-3 text-xs md:text-sm font-semibold text-center max-w-[80px] md:max-w-none
                  ${isCurrent ? 'text-orange-600' : 'text-gray-600'}
                `}
              >
                {label}
              </motion.p>

              {/* Indicador "actual" */}
              {isCurrent && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mt-1 px-2 py-0.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] font-bold rounded-full"
                >
                  ACTUAL
                </motion.div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DietaWizard;
