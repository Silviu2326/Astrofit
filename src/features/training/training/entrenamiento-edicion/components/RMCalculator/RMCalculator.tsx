import React, { useState } from 'react';
import { Calculator, X } from 'lucide-react';
import { calculate1RM, calculatePercentage1RM } from '../../utils/trainingCalculations';

interface RMCalculatorProps {
  show: boolean;
  onClose: () => void;
}

const RMCalculator: React.FC<RMCalculatorProps> = ({ show, onClose }) => {
  const [calcWeight, setCalcWeight] = useState<number>(100);
  const [calcReps, setCalcReps] = useState<number>(5);
  const [calcRPE, setCalcRPE] = useState<number>(8);

  const estimated1RM = calculate1RM(calcWeight, calcReps, calcRPE);

  if (!show) return null;

  return (
    <div className="col-span-3">
      <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-gray-900 flex items-center gap-2">
            <Calculator className="w-5 h-5" />
            Calculadora 1RM
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-1 block">Peso (kg)</label>
            <input
              type="number"
              value={calcWeight}
              onChange={(e) => setCalcWeight(parseFloat(e.target.value))}
              className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700 mb-1 block">Repeticiones</label>
            <input
              type="number"
              value={calcReps}
              onChange={(e) => setCalcReps(parseInt(e.target.value))}
              className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700 mb-1 block">RPE</label>
            <input
              type="number"
              min="1"
              max="10"
              value={calcRPE}
              onChange={(e) => setCalcRPE(parseInt(e.target.value))}
              className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none"
            />
            <div className="text-xs text-gray-500 mt-1">RIR: {10 - calcRPE}</div>
          </div>

          <div className="bg-gradient-to-br from-orange-500 to-pink-600 text-white rounded-xl p-4">
            <div className="text-sm font-semibold mb-1">1RM Estimado</div>
            <div className="text-3xl font-black">{estimated1RM.toFixed(1)} kg</div>
          </div>

          <div className="border-t pt-4 space-y-2">
            <h4 className="text-sm font-bold text-gray-700 mb-2">Porcentajes de 1RM</h4>
            {[50, 60, 70, 75, 80, 85, 90, 95].map(pct => (
              <div key={pct} className="flex items-center justify-between text-sm">
                <span className="text-gray-600">{pct}%</span>
                <span className="font-bold text-gray-900">
                  {calculatePercentage1RM(estimated1RM, pct).toFixed(1)} kg
                </span>
              </div>
            ))}
          </div>

          <div className="bg-blue-50 rounded-lg p-3 text-xs text-blue-800">
            <p className="font-semibold mb-1">💡 Referencia RPE:</p>
            <p>10 = Máximo esfuerzo (0 RIR)</p>
            <p>9 = 1 rep en reserva</p>
            <p>8 = 2-3 reps en reserva</p>
            <p>7 = 3-4 reps en reserva</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RMCalculator;
