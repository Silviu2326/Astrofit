import React from 'react';
import { Package, CheckCircle, FileText, Archive, AlertTriangle, TrendingUp } from 'lucide-react';
import type { ProductStats } from '../types/product.types';

interface ProductStatsCardsProps {
  stats: ProductStats;
}

export function ProductStatsCards({ stats }: ProductStatsCardsProps) {
  const cards = [
    {
      title: 'Total Productos',
      value: stats.totalProducts,
      icon: Package,
      gradient: 'from-blue-500 to-indigo-500',
      bgGradient: 'from-blue-50 to-indigo-50',
    },
    {
      title: 'Productos Activos',
      value: stats.activeProducts,
      icon: CheckCircle,
      gradient: 'from-indigo-500 to-purple-500',
      bgGradient: 'from-indigo-50 to-purple-50',
    },
    {
      title: 'Total Variantes',
      value: stats.totalVariants,
      icon: FileText,
      gradient: 'from-purple-500 to-blue-500',
      bgGradient: 'from-purple-50 to-blue-50',
    },
    {
      title: 'Stock Bajo',
      value: stats.lowStockVariants,
      icon: AlertTriangle,
      gradient: 'from-orange-500 to-red-500',
      bgGradient: 'from-orange-50 to-red-50',
      alert: stats.lowStockVariants > 0,
    },
    {
      title: 'Sin Stock',
      value: stats.outOfStockVariants,
      icon: Archive,
      gradient: 'from-red-500 to-pink-500',
      bgGradient: 'from-red-50 to-pink-50',
      alert: stats.outOfStockVariants > 0,
    },
    {
      title: 'Valor Inventario',
      value: `$${stats.totalInventoryValue.toLocaleString('es-ES', { minimumFractionDigits: 2 })}`,
      icon: TrendingUp,
      gradient: 'from-green-500 to-emerald-500',
      bgGradient: 'from-green-50 to-emerald-50',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.title}
            className={`relative overflow-hidden bg-gradient-to-br ${card.bgGradient} rounded-xl p-4 border border-gray-200 shadow-sm hover:shadow-md transition-all`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className={`p-2 rounded-lg bg-gradient-to-br ${card.gradient}`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              {card.alert && (
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              )}
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{card.value}</p>
              <p className="text-sm text-gray-600 mt-1">{card.title}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
