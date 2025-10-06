import React from 'react';
import { motion } from 'framer-motion';

interface StatisticsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  gradient: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export const StatisticsCard: React.FC<StatisticsCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  gradient,
  trend
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="relative overflow-hidden rounded-xl bg-white shadow-sm border border-gray-200"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-5`} />

      <div className="relative p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="text-gray-600 text-sm font-medium">{title}</div>
          {icon && (
            <div className={`p-2 rounded-lg bg-gradient-to-br ${gradient} text-white`}>
              {icon}
            </div>
          )}
        </div>

        <div className="flex items-end justify-between">
          <div>
            <div className="text-3xl font-bold text-gray-900">{value}</div>
            {subtitle && (
              <div className="text-sm text-gray-500 mt-1">{subtitle}</div>
            )}
          </div>

          {trend && (
            <div className={`text-sm font-semibold ${
              trend.isPositive ? 'text-green-600' : 'text-red-600'
            }`}>
              {trend.isPositive ? '+' : ''}{trend.value.toFixed(1)}%
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
