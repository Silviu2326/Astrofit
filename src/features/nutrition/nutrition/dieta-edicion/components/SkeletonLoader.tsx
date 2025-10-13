import React from 'react';
import { motion } from 'framer-motion';

export const RecetaCardSkeleton: React.FC = () => (
  <div className="bg-white border border-gray-200 rounded-xl p-2.5 animate-pulse">
    <div className="flex items-start gap-2.5 mb-2 pl-5">
      <div className="w-10 h-10 rounded-lg bg-gray-200"></div>
      <div className="flex-1">
        <div className="h-3 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-2 bg-gray-200 rounded w-1/2"></div>
      </div>
    </div>
    <div className="grid grid-cols-4 gap-1 mb-2">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="bg-gray-100 rounded p-1">
          <div className="h-3 bg-gray-200 rounded mb-1"></div>
          <div className="h-2 bg-gray-200 rounded"></div>
        </div>
      ))}
    </div>
    <div className="h-2 bg-gray-200 rounded w-full"></div>
  </div>
);

export const TotalesPanelSkeleton: React.FC = () => (
  <div className="p-6 space-y-6 animate-pulse">
    <div className="h-6 bg-gray-200 rounded w-1/2"></div>
    <div className="flex gap-2 bg-gray-100 rounded-lg p-1">
      <div className="flex-1 h-10 bg-gray-200 rounded"></div>
      <div className="flex-1 h-10 bg-gray-200 rounded"></div>
    </div>
    <div className="space-y-4">
      {[1, 2, 3, 4].map((i) => (
        <div key={i}>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-full"></div>
        </div>
      ))}
    </div>
  </div>
);

export const GridSlotSkeleton: React.FC = () => (
  <div className="min-h-[120px] bg-white rounded-xl border-2 border-gray-200 p-3 animate-pulse">
    <div className="h-24 bg-gray-100 rounded-lg"></div>
  </div>
);
