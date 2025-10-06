
import React, { useState } from 'react';

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 py-4">
      <button
        className="flex justify-between items-center w-full text-left font-semibold text-lg text-gray-800 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        {question}
        <svg
          className={`w-6 h-6 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>
      {isOpen && (
        <div className="mt-2 text-gray-600">
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};

const FAQMemebresia: React.FC = () => {
  const faqs = [
    {
      question: '¿Cómo cancelo mi suscripción?',
      answer: 'Puedes cancelar tu suscripción en cualquier momento desde la sección de "Mi Cuenta" en tu perfil. No hay cargos por cancelación.',
    },
    {
      question: '¿Qué métodos de pago aceptan?',
      answer: 'Aceptamos tarjetas de crédito/débito (Visa, MasterCard, American Express) y PayPal.',
    },
    {
      question: '¿Hay un período de prueba gratuito?',
      answer: 'Actualmente no ofrecemos un período de prueba gratuito, pero estamos seguros de que te encantará el valor que ofrecemos.',
    },
    {
      question: '¿Puedo acceder al contenido desde cualquier dispositivo?',
      answer: 'Sí, nuestra plataforma es totalmente responsive y puedes acceder a todo el contenido desde tu ordenador, tablet o smartphone.',
    },
    {
      question: '¿Qué sucede si no estoy satisfecho con la membresía?',
      answer: 'Ofrecemos una garantía de satisfacción de 30 días. Si no estás contento, te devolvemos tu dinero sin preguntas.',
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Preguntas Frecuentes</h2>
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQMemebresia;
