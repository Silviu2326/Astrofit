import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, ArrowRight } from 'lucide-react';

export const GuaranteeSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="max-w-5xl mx-auto px-4 mb-20">
      <div className="bg-gradient-to-br from-green-900/40 to-blue-900/40 border-2 border-green-500 rounded-2xl p-12 text-center transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-green-500/20">
        <Shield className="w-20 h-20 mx-auto mb-6 text-green-400 animate-pulse" />
        <h2 className="text-3xl md:text-4xl font-black mb-6">Garantía de 60 Días</h2>
        <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
          Prueba TrainerPro durante 60 días. Si no te ahorra mínimo 10 horas al mes o no aumenta tus ingresos,
          <span className="text-green-400 font-bold"> te devolvemos cada centavo</span>.
        </p>
        <p className="text-gray-400 mb-8">
          Sin preguntas estúpidas. Sin dramas. Un email y listo.<br />
          Asumimos el riesgo, no tú. Así debe ser.
        </p>
        <button
          onClick={() => navigate('/login')}
          className="px-12 py-5 bg-green-600 hover:bg-green-700 text-white rounded-lg font-bold text-xl transition-all duration-300 hover:scale-110 hover:shadow-lg"
        >
          Solicitar Demo Ahora <ArrowRight className="inline ml-2" />
        </button>
        <p className="text-gray-500 text-sm mt-4">14 días gratis. Sin tarjeta de crédito. Serio.</p>
      </div>
    </section>
  );
};
