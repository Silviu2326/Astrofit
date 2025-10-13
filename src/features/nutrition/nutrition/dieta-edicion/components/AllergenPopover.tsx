import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';
import { Alergeno } from '../types';

interface AllergenPopoverProps {
  alergenos: Alergeno[];
}

export const AllergenPopover: React.FC<AllergenPopoverProps> = ({ alergenos }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (alergenos.length === 0) return null;

  const principal = alergenos[0];
  const resto = alergenos.slice(1);

  return (
    <div className="relative">
      <button
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        className="px-1.5 py-0.5 bg-red-100 text-red-700 text-xs font-semibold rounded-full flex items-center gap-0.5 hover:bg-red-200 transition-colors"
      >
        <AlertTriangle className="w-2.5 h-2.5" />
        {principal.icono}
        {resto.length > 0 && (
          <span className="ml-0.5">+{resto.length}</span>
        )}
      </button>

      {/* Popover */}
      <AnimatePresence>
        {isOpen && alergenos.length > 1 && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-gray-900 text-white px-3 py-2 rounded-lg shadow-xl z-50 whitespace-nowrap"
          >
            <div className="text-xs font-semibold mb-1">Alérgenos:</div>
            <div className="space-y-1">
              {alergenos.map((alergeno, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs">
                  <span>{alergeno.icono}</span>
                  <span>{alergeno.nombre}</span>
                </div>
              ))}
            </div>
            {/* Flecha */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 w-2 h-2 bg-gray-900 rotate-45"></div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
