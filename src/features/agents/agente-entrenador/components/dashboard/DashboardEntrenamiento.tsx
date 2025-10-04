
import React from 'react';

const DashboardEntrenamiento: React.FC = () => {
  return (
    <div className="p-4 md:p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Dashboard de Entrenamiento</h1>

      {/* Cards de Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Volumen Semanal</h2>
          <p className="text-3xl font-bold text-blue-600">12,500 kg</p>
          <p className="text-sm text-gray-500">+10% vs semana anterior</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Intensidad Promedio</h2>
          <p className="text-3xl font-bold text-green-600">75% 1RM</p>
          <p className="text-sm text-gray-500">Estable</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Frecuencia</h2>
          <p className="text-3xl font-bold text-purple-600">4 Días</p>
          <p className="text-sm text-gray-500">Objetivo: 5 Días</p>
        </div>
      </div>

      {/* Gráficos de Barras para Volumen Semanal por Grupo Muscular */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Volumen Semanal por Grupo Muscular</h2>
        {/* Placeholder para gráfico de barras */}
        <div className="h-48 bg-gray-200 flex items-center justify-center text-gray-500">
          Gráfico de Barras aquí (e.g., con Chart.js o Recharts)
        </div>
      </div>

      {/* Indicadores de Progreso y Comparativas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Progreso hacia Objetivos de Fuerza</h2>
          {/* Placeholder para indicadores de progreso */}
          <ul className="list-disc list-inside text-gray-600">
            <li>Sentadilla: 120kg (80% del objetivo)</li>
            <li>Press Banca: 80kg (75% del objetivo)</li>
          </ul>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Comparativa de Rendimiento (Microciclos)</h2>
          {/* Placeholder para comparativas */}
          <div className="h-32 bg-gray-200 flex items-center justify-center text-gray-500">
            Gráfico de Comparativa aquí
          </div>
        </div>
      </div>

      {/* Heat Map de Intensidad */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Heat Map de Intensidad por Día</h2>
        {/* Placeholder para heat map */}
        <div className="h-48 bg-gray-200 flex items-center justify-center text-gray-500">
          Heat Map aquí
        </div>
      </div>

      {/* Herramientas Integradas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Cronómetro de Descanso</h2>
          {/* Placeholder para cronómetro */}
          <div className="text-center">
            <p className="text-5xl font-bold text-red-500 mb-4">00:45</p>
            <button className="bg-blue-500 text-white px-6 py-2 rounded-lg mr-2">Iniciar</button>
            <button className="bg-gray-300 text-gray-800 px-6 py-2 rounded-lg">Reset</button>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Calculadora 1RM</h2>
          {/* Placeholder para calculadora */}
          <p className="text-gray-600">Peso: <input type="number" className="border rounded p-1 w-20" /> kg</p>
          <p className="text-gray-600">Reps: <input type="number" className="border rounded p-1 w-20" /></p>
          <p className="text-xl font-bold mt-2">1RM Estimado: 150 kg</p>
        </div>
      </div>

      {/* Notificaciones de Récords Personales */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Notificaciones</h2>
        <ul className="list-disc list-inside text-gray-600">
          <li>¡Nuevo Récord Personal! Press Banca: 85kg x 1</li>
          <li>¡Felicidades! Superaste tu volumen semanal objetivo.</li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardEntrenamiento;
