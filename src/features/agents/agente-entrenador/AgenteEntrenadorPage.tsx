import React from 'react';
import ConstructorVisual from './components/ConstructorVisual';
import TimelineProgresion from './components/TimelineProgresion';
import BancoVariantes from './components/BancoVariantes';
import IndicadoresEquilibrio from './components/IndicadoresEquilibrio';
import ProgresoSimulado from './components/ProgresoSimulado';
import { Dumbbell, LayoutGrid, TrendingUp, Scale, Clock, BarChart3, Home } from 'lucide-react'; // Importar iconos de Lucide React

const AgenteEntrenadorPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white font-sans">
      {/* Header */}
      <header className="bg-gradient-to-r from-red-600 to-orange-500 p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-extrabold tracking-tight">Agente Entrenador</h1>
          <nav className="space-x-4">
            <a href="#" className="text-white hover:text-gray-200 transition duration-300 flex items-center">
              <Home className="h-5 w-5 mr-1" /> Inicio
            </a>
            <a href="#" className="text-white hover:text-gray-200 transition duration-300 flex items-center">
              <Dumbbell className="h-5 w-5 mr-1" /> Entrenamientos
            </a>
            <a href="#" className="text-white hover:text-gray-200 transition duration-300 flex items-center">
              <BarChart3 className="h-5 w-5 mr-1" /> Métricas
            </a>
          </nav>
        </div>
      </header>

      {/* Breadcrumbs */}
      <div className="container mx-auto px-4 py-3 text-sm text-gray-300">
        <span className="flex items-center">
          <Home className="h-4 w-4 mr-1" />
          <a href="#" className="hover:text-red-400">Inicio</a>
          <span className="mx-2">/</span>
          <Dumbbell className="h-4 w-4 mr-1" />
          <a href="#" className="hover:text-red-400">Agente Entrenador</a>
          <span className="mx-2">/</span>
          <span className="text-red-400">Construir Entrenamiento</span>
        </span>
      </div>

      <main className="container mx-auto p-4 space-y-10">
        {/* Dashboard de Métricas en Tiempo Real */}
        <section className="bg-gray-800 rounded-xl shadow-2xl p-6 animate-fade-in-up">
          <h2 className="text-3xl font-bold text-red-500 mb-6 flex items-center">
            <BarChart3 className="h-7 w-7 mr-3" /> Dashboard de Métricas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-700 p-5 rounded-lg flex flex-col items-center justify-center transform hover:scale-105 transition duration-300">
              <Dumbbell className="h-10 w-10 text-orange-400 mb-3" />
              <p className="text-lg font-semibold">Volumen Total</p>
              <p className="text-4xl font-extrabold text-white">12,500 kg</p>
            </div>
            <div className="bg-gray-700 p-5 rounded-lg flex flex-col items-center justify-center transform hover:scale-105 transition duration-300">
              <Clock className="h-10 w-10 text-blue-400 mb-3" />
              <p className="text-lg font-semibold">Tiempo Activo</p>
              <p className="text-4xl font-extrabold text-white">90 min</p>
            </div>
            <div className="bg-gray-700 p-5 rounded-lg flex flex-col items-center justify-center transform hover:scale-105 transition duration-300">
              <TrendingUp className="h-10 w-10 text-green-400 mb-3" />
              <p className="text-lg font-semibold">Progreso Semanal</p>
              <p className="text-4xl font-extrabold text-white">+5%</p>
            </div>
          </div>
        </section>

        {/* Constructor Visual de Entrenos - Grid Adaptativo */}
        <section className="bg-gray-800 rounded-xl shadow-2xl p-6 animate-fade-in-up delay-100">
          <h2 className="text-3xl font-bold text-red-500 mb-6 flex items-center">
            <LayoutGrid className="h-7 w-7 mr-3" /> Constructor Visual de Entrenos
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-gray-700 p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                <Dumbbell className="h-6 w-6 mr-2 text-orange-400" /> Diseña tu Rutina
              </h3>
              <ConstructorVisual />
            </div>
            <div className="bg-gray-700 p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                <TrendingUp className="h-6 w-6 mr-2 text-blue-400" /> Progresión y Metas
              </h3>
              <TimelineProgresion />
            </div>
          </div>
        </section>

        {/* Banco de Variantes */}
        <section className="bg-gray-800 rounded-xl shadow-2xl p-6 animate-fade-in-up delay-200">
          <h2 className="text-3xl font-bold text-red-500 mb-6 flex items-center">
            <Scale className="h-7 w-7 mr-3" /> Banco de Variantes
          </h2>
          <div className="bg-gray-700 p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300">
            <BancoVariantes />
          </div>
        </section>

        {/* Indicadores de Equilibrio Muscular */}
        <section className="bg-gray-800 rounded-xl shadow-2xl p-6 animate-fade-in-up delay-300">
          <h2 className="text-3xl font-bold text-red-500 mb-6 flex items-center">
            <Scale className="h-7 w-7 mr-3" /> Indicadores de Equilibrio Muscular
          </h2>
          <div className="bg-gray-700 p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300">
            <IndicadoresEquilibrio />
          </div>
        </section>

        {/* Progreso Simulado */}
        <section className="bg-gray-800 rounded-xl shadow-2xl p-6 animate-fade-in-up delay-400">
          <h2 className="text-3xl font-bold text-red-500 mb-6 flex items-center">
            <Clock className="h-7 w-7 mr-3" /> Progreso Simulado
          </h2>
          <div className="bg-gray-700 p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300">
            <ProgresoSimulado />
          </div>
        </section>
      </main>

      {/* Animaciones CSS (Tailwind JIT/Custom CSS) */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
      `}</style>
    </div>
  );
};

export default AgenteEntrenadorPage;