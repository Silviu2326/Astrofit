import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingDown, ArrowRight } from 'lucide-react';

interface RealityCheckItem {
  myth: string;
  reality: string;
  pain: string;
}

interface RealityCheckSectionProps {
  realityCheck: RealityCheckItem[];
}

export const RealityCheckSection: React.FC<RealityCheckSectionProps> = ({ realityCheck }) => {
  const navigate = useNavigate();

  return (
    <section id="reality" className="py-20 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            Deja de mentirte a ti mismo
          </h2>
          <p className="text-xl text-gray-400 flex items-center justify-center gap-2">
            Estas son las excusas que te están hundiendo
            <TrendingDown className="w-6 h-6 text-red-500" />
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {realityCheck.map((item, idx) => (
            <div key={idx} className="bg-gray-800 border-2 border-red-500/30 rounded-2xl p-8 hover:border-red-500 transition-all duration-300 hover:scale-105 hover:shadow-2xl opacity-0 animate-fade-in-up" style={{ animationDelay: `${idx * 100}ms`, animationFillMode: 'forwards' }}>
              <div className="mb-4">
                <p className="text-2xl font-bold text-red-400 mb-3">{item.myth}</p>
                <p className="text-lg text-gray-300 leading-relaxed">{item.reality}</p>
              </div>
              <div className="pt-4 border-t border-gray-700">
                <p className="text-yellow-400 font-black text-lg">{item.pain}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-2xl md:text-3xl font-bold text-gray-300 mb-6">
            ¿Cuánto MÁS vas a esperar antes de ACTUAR de una puta vez?
          </p>
          <button
            onClick={() => navigate('/login')}
            className="group px-10 py-5 bg-red-600 hover:bg-red-700 text-white rounded-xl font-black text-xl transition-all duration-300 hover:scale-110 hover:shadow-2xl inline-flex items-center gap-2"
          >
            No quiero seguir perdiendo dinero
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }
      `}</style>
    </section>
  );
};
