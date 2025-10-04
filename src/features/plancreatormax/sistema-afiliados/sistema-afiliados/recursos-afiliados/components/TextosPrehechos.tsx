import React, { useEffect, useState } from 'react';
import { fetchPrewrittenTexts } from '../recursosAfiliadosApi';

interface PrewrittenText {
  id: string;
  title: string;
  content: string;
}

const TextosPrehechos: React.FC = () => {
  const [texts, setTexts] = useState<PrewrittenText[]>([]);

  useEffect(() => {
    const getTexts = async () => {
      const data = await fetchPrewrittenTexts();
      setTexts(data as PrewrittenText[]);
    };
    getTexts();
  }, []);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Texto copiado al portapapeles!');
  };

  return (
    <section className="mb-8">
      <h3 className="text-xl font-semibold mb-4">Textos Prehechos para Redes Sociales</h3>
      <p className="text-gray-700 mb-4">
        Copia y pega estos textos optimizados para tus publicaciones en redes sociales.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {texts.map((text) => (
          <div key={text.id} className="border rounded-lg p-4 shadow-sm">
            <h4 className="font-medium mb-2">{text.title}</h4>
            <p className="text-gray-800 text-sm mb-3">{text.content}</p>
            <button
              onClick={() => copyToClipboard(text.content)}
              className="bg-green-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-green-700"
            >
              Copiar Texto
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TextosPrehechos;
