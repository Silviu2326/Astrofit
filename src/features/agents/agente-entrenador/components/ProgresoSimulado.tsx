import React, { useState } from 'react';

interface SimulatedProgressionData {
  week: number;
  simulatedLoad: number;
}

const ProgresoSimulado: React.FC = () => {
  const [initialLoad, setInitialLoad] = useState<number>(100);
  const [weeklyIncrease, setWeeklyIncrease] = useState<number>(2.5);
  const [weeksToSimulate, setWeeksToSimulate] = useState<number>(12);

  const generateSimulatedData = (): SimulatedProgressionData[] => {
    const data: SimulatedProgressionData[] = [];
    for (let i = 0; i < weeksToSimulate; i++) {
      data.push({
        week: i + 1,
        simulatedLoad: initialLoad + (weeklyIncrease * i),
      });
    }
    return data;
  };

  const simulatedData = generateSimulatedData();
  const maxLoad = Math.max(...simulatedData.map(d => d.simulatedLoad));

  return (
    <div className="bg-white shadow rounded-lg p-4">
      <h3 className="text-lg font-medium mb-3">Progreso Simulado de Carga</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <label htmlFor="initialLoad" className="block text-sm font-medium text-gray-700">Carga Inicial (kg):</label>
          <input
            type="number"
            id="initialLoad"
            value={initialLoad}
            onChange={(e) => setInitialLoad(Number(e.target.value))}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="weeklyIncrease" className="block text-sm font-medium text-gray-700">Incremento Semanal (kg):</label>
          <input
            type="number"
            id="weeklyIncrease"
            value={weeklyIncrease}
            onChange={(e) => setWeeklyIncrease(Number(e.target.value))}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="weeksToSimulate" className="block text-sm font-medium text-gray-700">Semanas a Simular:</label>
          <input
            type="number"
            id="weeksToSimulate"
            value={weeksToSimulate}
            onChange={(e) => setWeeksToSimulate(Number(e.target.value))}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
      </div>

      {/* Simple bar chart using CSS */}
      <div className="h-64 border border-gray-200 rounded-lg p-4 bg-gray-50">
        <div className="h-full flex items-end justify-between">
          {simulatedData.map((data, index) => (
            <div key={data.week} className="flex flex-col items-center space-y-1">
              <div className="text-xs text-gray-600 font-medium">
                {data.simulatedLoad.toFixed(1)}kg
              </div>
              <div
                className="bg-indigo-500 w-6 rounded-t transition-all duration-300 hover:bg-indigo-600"
                style={{
                  height: `${(data.simulatedLoad / maxLoad) * 100}%`,
                  minHeight: '8px'
                }}
              ></div>
              <div className="text-xs text-gray-500">S{data.week}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 flex justify-between text-xs text-gray-500">
        <span>Semana</span>
        <span>Carga Simulada (kg)</span>
      </div>

      <p className="mt-4 text-sm text-gray-600">* Vea cómo evoluciona la carga si se siguen las progresiones.</p>
      <p className="text-sm text-red-600 mt-2">Alerta: Posible sobreentrenamiento si el incremento es demasiado agresivo.</p>
    </div>
  );
};

export default ProgresoSimulado;
