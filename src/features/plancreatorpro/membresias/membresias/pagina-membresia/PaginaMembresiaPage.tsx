
import React from 'react';
import { motion } from 'framer-motion';
import LandingMembresia from './components/LandingMembresia';
import ListaBeneficios from './components/ListaBeneficios';
import PrecioSuscripcion from './components/PrecioSuscripcion';
import BotonUnirse from './components/BotonUnirse';
import TestimoniosMiembros from './components/TestimoniosMiembros';
import FAQMemebresia from './components/FAQMemebresia';

const PaginaMembresiaPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/30">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <LandingMembresia />
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <ListaBeneficios />
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <PrecioSuscripcion />
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <TestimoniosMiembros />
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <FAQMemebresia />
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        <BotonUnirse />
      </motion.div>
    </div>
  );
};

export default PaginaMembresiaPage;
