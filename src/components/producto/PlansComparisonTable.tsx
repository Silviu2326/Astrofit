import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Dumbbell, Users, Brain, DollarSign, MessageSquare, Zap, Globe, Target,
  CheckCircle2, ArrowRight, XCircle
} from 'lucide-react';

interface Plan {
  id: string;
  name: string;
  category: string;
}

interface Module {
  id: string;
  name: string;
  availableIn: string[];
}

export const PlansComparisonTable: React.FC = () => {
  const navigate = useNavigate();

  // Los 9 planes del sistema
  const allPlans: Plan[] = [
    { id: 'core', name: 'CORE', category: 'base' },
    { id: 'solo-pro', name: 'SOLO PRO', category: 'solo' },
    { id: 'solo-max', name: 'SOLO MAX', category: 'solo' },
    { id: 'creator-pro', name: 'CREATOR PRO', category: 'creator' },
    { id: 'creator-max', name: 'CREATOR MAX', category: 'creator' },
    { id: 'studio-pro', name: 'STUDIO PRO', category: 'studio' },
    { id: 'studio-max', name: 'STUDIO MAX', category: 'studio' },
    { id: 'teams-pro', name: 'TEAMS PRO', category: 'teams' },
    { id: 'teams-elite', name: 'TEAMS ELITE', category: 'teams' }
  ];

  // 8 Módulos principales del sistema
  const modules: Module[] = [
    {
      id: 'crm',
      name: 'CRM & Ventas',
      availableIn: ['core', 'solo-pro', 'solo-max', 'creator-pro', 'creator-max', 'studio-pro', 'studio-max', 'teams-pro', 'teams-elite']
    },
    {
      id: 'training',
      name: 'Training (Entrenamientos)',
      availableIn: ['core', 'solo-pro', 'solo-max', 'creator-pro', 'creator-max', 'studio-pro', 'studio-max', 'teams-pro', 'teams-elite']
    },
    {
      id: 'nutrition',
      name: 'Nutrition (Nutrición)',
      availableIn: ['core', 'solo-pro', 'solo-max', 'creator-pro', 'creator-max', 'studio-pro', 'studio-max', 'teams-pro', 'teams-elite']
    },
    {
      id: 'finance',
      name: 'Finance (Finanzas)',
      availableIn: ['core', 'solo-pro', 'solo-max', 'creator-pro', 'creator-max', 'studio-pro', 'studio-max', 'teams-pro', 'teams-elite']
    },
    {
      id: 'communication',
      name: 'Communication (Comunicaciones)',
      availableIn: ['solo-pro', 'solo-max', 'creator-pro', 'creator-max', 'studio-pro', 'studio-max', 'teams-pro', 'teams-elite']
    },
    {
      id: 'automation',
      name: 'Automation (Automatizaciones)',
      availableIn: ['solo-pro', 'solo-max', 'creator-pro', 'creator-max', 'studio-pro', 'studio-max', 'teams-pro', 'teams-elite']
    },
    {
      id: 'ia',
      name: 'IA (7 Agentes de Inteligencia Artificial)',
      availableIn: ['core', 'solo-pro', 'solo-max', 'creator-pro', 'creator-max', 'studio-pro', 'studio-max', 'teams-pro', 'teams-elite']
    },
    {
      id: 'online',
      name: 'Online (Cursos, Comunidad, App)',
      availableIn: ['solo-max', 'creator-pro', 'creator-max', 'studio-max']
    }
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 mb-20">
      <div className="text-center mb-12 animate-fade-in-up">
        <h2 className="text-4xl md:text-6xl font-black mb-6">
          Comparativa de los 9 Planes
        </h2>
        <p className="text-xl text-gray-400">
          Qué módulos tiene cada plan (sin letra chica)
        </p>
      </div>

      <div className="overflow-x-auto animate-fade-in-up" style={{ animationDelay: '200ms' }}>
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden border-2 border-gray-700 rounded-2xl">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-gray-900">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-black text-white sticky left-0 bg-gray-900 z-10">
                    MÓDULO / PLAN
                  </th>
                  <th className="px-4 py-4 text-center text-xs font-black text-gray-400">CORE</th>
                  <th className="px-4 py-4 text-center text-xs font-black text-blue-400">SOLO PRO</th>
                  <th className="px-4 py-4 text-center text-xs font-black text-blue-400">SOLO MAX</th>
                  <th className="px-4 py-4 text-center text-xs font-black text-purple-400">CREATOR PRO</th>
                  <th className="px-4 py-4 text-center text-xs font-black text-purple-400">CREATOR MAX</th>
                  <th className="px-4 py-4 text-center text-xs font-black text-orange-400">STUDIO PRO</th>
                  <th className="px-4 py-4 text-center text-xs font-black text-orange-400">STUDIO MAX</th>
                  <th className="px-4 py-4 text-center text-xs font-black text-green-400">TEAMS PRO</th>
                  <th className="px-4 py-4 text-center text-xs font-black text-green-400">TEAMS ELITE</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                {modules.map((module, idx) => (
                  <tr key={module.id} className={`transition-all duration-300 ${idx % 2 === 0 ? 'bg-gray-800/30' : 'bg-gray-800/50'} hover:bg-gray-700/50`}>
                    <td className="px-6 py-4 text-sm font-bold text-white sticky left-0 bg-gray-800 z-10">
                      {module.name}
                    </td>
                    {allPlans.map(plan => (
                      <td key={plan.id} className="px-4 py-4 text-center">
                        {module.availableIn.includes(plan.id) ? (
                          <CheckCircle2 className="w-6 h-6 text-green-500 mx-auto hover:scale-110 transition-transform duration-300" />
                        ) : (
                          <XCircle className="w-6 h-6 text-gray-600 mx-auto" />
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="text-center mt-10">
        <button
          onClick={() => navigate('/precios')}
          className="px-10 py-5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-black text-xl transition-all duration-300 hover:scale-110 hover:shadow-lg shadow-blue-500/50"
        >
          Ver Precios Completos <ArrowRight className="inline ml-2" />
        </button>
      </div>
    </section>
  );
};
