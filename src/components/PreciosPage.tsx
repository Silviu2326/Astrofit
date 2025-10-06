import React, { useState } from 'react';
import {
  PreciosHeader,
  PreciosHero,
  PreciosCategorySelector,
  PlansGrid,
  AddonsSection,
  PreciosFAQ,
  GuaranteeSection,
  PreciosFooter,
} from './precios';

export const PreciosPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'solo' | 'creator' | 'studio' | 'teams'>('solo');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <PreciosHeader />
      <PreciosHero />
      <PreciosCategorySelector
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
      <PlansGrid selectedCategory={selectedCategory} />
      <AddonsSection />
      <PreciosFAQ />
      <GuaranteeSection />
      <PreciosFooter />
    </div>
  );
};
