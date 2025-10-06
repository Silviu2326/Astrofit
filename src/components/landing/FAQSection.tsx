import React from 'react';
import { HelpCircle } from 'lucide-react';

interface FAQ {
  q: string;
  a: string;
}

interface FAQSectionProps {
  faqs: FAQ[];
}

export const FAQSection: React.FC<FAQSectionProps> = ({ faqs }) => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            Preguntas que todos hacen
            <span className="block text-blue-600 mt-2">(y respuestas sin rodeos ni humo)</span>
          </h2>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-gray-50 border-2 border-gray-200 rounded-xl p-8 hover:border-blue-500 hover:bg-gray-100 transition-all duration-300 opacity-0 animate-fade-in-up hover:shadow-xl" style={{ animationDelay: `${idx * 50}ms`, animationFillMode: 'forwards' }}>
              <h3 className="text-xl font-black text-gray-900 mb-4 flex items-start gap-3">
                <HelpCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                <span>{faq.q}</span>
              </h3>
              <p className="text-gray-700 leading-relaxed ml-9">{faq.a}</p>
            </div>
          ))}
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
