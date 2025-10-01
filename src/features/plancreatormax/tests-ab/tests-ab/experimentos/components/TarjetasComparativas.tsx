import React from 'react';
import { Experiment } from '../experimentosApi';

interface TarjetasComparativasProps {
  experiment: Experiment;
}

const TarjetasComparativas: React.FC<TarjetasComparativasProps> = ({ experiment }) => {
  return (
    <div className="grid grid-cols-2 gap-4 mt-3">
      <div className="bg-blue-50 p-3 rounded-md border border-blue-200">
        <span className="inline-flex items-center justify-center px-2 py-0.5 text-xs font-medium leading-5 text-blue-700 bg-blue-100 rounded-full">A</span>
        <p className="text-sm text-gray-700 mt-2">Tasa de Conversión: <span className="font-semibold">{(experiment.conversionRateA * 100).toFixed(2)}%</span></p>
      </div>
      <div className="bg-green-50 p-3 rounded-md border border-green-200">
        <span className="inline-flex items-center justify-center px-2 py-0.5 text-xs font-medium leading-5 text-green-700 bg-green-100 rounded-full">B</span>
        <p className="text-sm text-gray-700 mt-2">Tasa de Conversión: <span className="font-semibold">{(experiment.conversionRateB * 100).toFixed(2)}%</span></p>
      </div>
    </div>
  );
};

export default TarjetasComparativas;
