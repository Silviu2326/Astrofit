import React from 'react';
import { Zap, PhoneCall, Database, Globe, Headphones } from 'lucide-react';

interface Addon {
  name: string;
  description: string;
  worthIt: string;
  icon: React.ReactNode;
}

const addons: Addon[] = [
  {
    name: 'Onboarding 1-on-1',
    description: 'Llamada de 90 min para configurar TODO. Importamos tus datos, configuramos automatizaciones, te dejamos funcionando. Una sola vez.',
    worthIt: 'Vale cada puto centavo si no quieres perder 10 horas configurando.',
    icon: <PhoneCall className="w-6 h-6 text-blue-400" />
  },
  {
    name: 'Migración Completa',
    description: 'Migramos TODOS tus datos desde Trainerize, Excel, TrueCoach, etc. Lo hacemos nosotros. Tú solo apruebas.',
    worthIt: 'Imprescindible si vienes de otro sistema y tienes +100 clientes.',
    icon: <Database className="w-6 h-6 text-purple-400" />
  },
  {
    name: 'Dominio y Email Pro',
    description: 'Tu dominio propio (tuempresa.com) + emails profesionales (@tuempresa.com). No más @gmail.com como amateur.',
    worthIt: 'Básico si quieres verte profesional. Nadie confía en @gmail.com',
    icon: <Globe className="w-6 h-6 text-green-400" />
  },
  {
    name: 'Soporte Prioritario VIP',
    description: 'Línea directa por WhatsApp. Respuesta en <2 horas. Acceso a nuevas features antes que nadie.',
    worthIt: 'Para negocios que no pueden esperar 24h. Si facturas $20k+/mes, lo necesitas.',
    icon: <Headphones className="w-6 h-6 text-orange-400" />
  }
];

export const AddonsSection: React.FC = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 mb-20">
      <div className="text-center mb-12 animate-fade-in-up opacity-0 [animation-fill-mode:forwards]">
        <h2 className="text-3xl md:text-4xl font-black mb-4">Servicios Adicionales</h2>
        <p className="text-gray-400">Opcionales. No obligatorios. Pero útiles AF.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {addons.map((addon, i) => (
          <div
            key={i}
            className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-xl animate-fade-in-up opacity-0"
            style={{ animationDelay: `${(i + 1) * 100}ms`, animationFillMode: 'forwards' }}
          >
            <div className="mb-4 flex items-center space-x-3">
              <div className="transition-transform duration-300 hover:scale-110 hover:rotate-6">
                {addon.icon}
              </div>
              <h3 className="text-xl font-bold">{addon.name}</h3>
            </div>
            <p className="text-gray-400 text-sm mb-4">{addon.description}</p>
            <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-3 mb-4">
              <p className="text-blue-300 text-sm flex items-center">
                <Zap className="inline w-4 h-4 mr-2 text-yellow-400" />
                {addon.worthIt}
              </p>
            </div>
            <button className="w-full py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-bold transition-all duration-300 hover:scale-105">
              Consultar Disponibilidad
            </button>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(2.5rem);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out;
        }
      `}</style>
    </section>
  );
};
