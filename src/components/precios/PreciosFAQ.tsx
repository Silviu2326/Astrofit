import React from 'react';
import { HelpCircle } from 'lucide-react';

interface FAQ {
  q: string;
  a: string;
}

const faqs: FAQ[] = [
  {
    q: '¿Puedo cambiar de plan después o me encadenan de por vida?',
    a: 'Sí. Upgrade instantáneo, downgrade al terminar tu ciclo actual. Sin letra chica ni penalizaciones. Somos humanos normales, no bancos.'
  },
  {
    q: '¿Cobran por cliente/usuario como otros?',
    a: 'NO. Precio fijo por plan. Si pasas los límites, upgrade o paga extra. Pero NUNCA te cobramos por cliente como Trainerize. Eso es robo.'
  },
  {
    q: '¿Hay permanencia mínima?',
    a: 'CERO. Cancela cuando quieras. Si el software no te sirve, no mereces pagar. Simple as that.'
  },
  {
    q: '¿Qué pasa con mis datos si cancelo?',
    a: 'Exporta TODO en cualquier momento. Tus datos son TUYOS, no nuestros. Exportas y te vas. Sin dramas. Sin rehenes.'
  },
  {
    q: '¿El precio sube después?',
    a: 'Tu precio queda congelado mientras no canceles. Los nuevos usuarios pueden pagar diferente, pero tu tarifa se respeta. Early adopter privilege.'
  },
  {
    q: '¿Aceptan pagos en [mi país]?',
    a: 'Stripe, PayPal, MercadoPago. Si tienes internet, puedes pagar. 190+ países soportados. No jodemos con eso.'
  },
  {
    q: '¿Tiene periodo de prueba?',
    a: '14 días gratis, sin tarjeta de crédito. Pruébalo de verdad. Si en 2 semanas no te enamoraste, no es para ti. No hay problema.'
  },
  {
    q: '¿Hay cargos ocultos?',
    a: 'CERO. Lo que ves es lo que pagas. No somos tu banco. Sin sorpresas, sin asteriscos, sin letra chica. Punto.'
  },
  {
    q: '¿Ofrecen garantía?',
    a: '60 días de garantía total. Si no funciona, devolución completa. Sin preguntas estúpidas. Asumimos el riesgo, no tú.'
  },
  {
    q: '¿Qué diferencia hay entre PRO y MAX?',
    a: 'PRO = herramientas esenciales para profesionalizarte. MAX = escalar sin límites (app propia, IA avanzada, automatizaciones, API). Si facturas +$10k/mes, MAX. Si no, PRO. Así de simple.'
  }
];

export const PreciosFAQ: React.FC = () => {
  return (
    <section className="max-w-4xl mx-auto px-4 mb-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-black mb-4">Preguntas que TODOS hacen</h2>
        <p className="text-gray-400">Respuestas directas. Sin marketing bullshit.</p>
      </div>

      <div className="space-y-6">
        {faqs.map((faq, i) => (
          <div
            key={i}
            className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 transition-all duration-300 hover:border-blue-500 hover:bg-gray-800/70 hover:shadow-xl animate-fade-in-up opacity-0"
            style={{ animationDelay: `${i * 50}ms`, animationFillMode: 'forwards' }}
          >
            <h3 className="text-lg font-bold mb-3 text-blue-400 flex items-center">
              <HelpCircle className="w-5 h-5 mr-2 flex-shrink-0" />
              {faq.q}
            </h3>
            <p className="text-gray-300">{faq.a}</p>
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
