import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HeroSection } from './components/HeroSection';
import { QuickStats } from './components/QuickStats';
import { AffiliatesTable } from './components/AffiliatesTable';
import { AffiliateProfileModal } from './components/AffiliateProfileModal';
import { PendingApplications } from './components/PendingApplications';
import { Leaderboard } from './components/Leaderboard';
import { MarketingMaterials } from './components/MarketingMaterials';
import { PerformanceDashboard } from './components/PerformanceDashboard';
import { Affiliate } from './data/mockData';

const ListadoAfiliadosPage: React.FC = () => {
  const [selectedAffiliate, setSelectedAffiliate] = useState<Affiliate | null>(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const handleViewProfile = (affiliate: Affiliate) => {
    setSelectedAffiliate(affiliate);
    setIsProfileModalOpen(true);
  };

  const handleCloseProfile = () => {
    setIsProfileModalOpen(false);
    setTimeout(() => setSelectedAffiliate(null), 300);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 p-4 md:p-8">
      <div className="max-w-[1600px] mx-auto space-y-8">
        {/* Hero Section */}
        <HeroSection />

        {/* Estadísticas Rápidas */}
        <QuickStats />

        {/* Grid principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Columna principal - 2/3 */}
          <div className="lg:col-span-2 space-y-8">
            {/* Tabla de Afiliados */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <AffiliatesTable onViewProfile={handleViewProfile} />
            </motion.div>

            {/* Dashboard de Análisis */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <PerformanceDashboard />
            </motion.div>

            {/* Materiales de Marketing */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <MarketingMaterials />
            </motion.div>
          </div>

          {/* Columna lateral - 1/3 */}
          <div className="space-y-8">
            {/* Solicitudes Pendientes */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <PendingApplications />
            </motion.div>

            {/* Leaderboard */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <Leaderboard />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Modal de Perfil */}
      <AffiliateProfileModal
        affiliate={selectedAffiliate}
        isOpen={isProfileModalOpen}
        onClose={handleCloseProfile}
      />
    </div>
  );
};

export default ListadoAfiliadosPage;
