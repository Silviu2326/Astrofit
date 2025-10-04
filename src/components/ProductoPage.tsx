import React, { useState } from 'react';
import {
  ProductoHeader,
  ProductoHero,
  CategorySelector,
  ModulesSection,
  PlansComparisonTable,
  CostAnalysisSection,
  ProductoFooter
} from './producto';

export const ProductoPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'solo' | 'creator' | 'studio' | 'teams'>('solo');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <ProductoHeader />
      <ProductoHero />
      <CategorySelector
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
      <ModulesSection selectedCategory={selectedCategory} />
      <PlansComparisonTable />
      <CostAnalysisSection />
      <ProductoFooter />
    </div>
  );
};
