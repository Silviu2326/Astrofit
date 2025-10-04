import React from 'react';

interface ConclusionesIAProps {
  conclusions: string[];
}

const ConclusionesIA: React.FC<ConclusionesIAProps> = ({ conclusions }) => {
  return (
    <div className="bg-blue-50 p-4 rounded shadow mb-4">
      <h2 className="text-xl font-semibold mb-2 text-blue-800">Conclusiones Generadas por IA</h2>
      <ul className="list-disc list-inside">
        {conclusions.map((conclusion, index) => (
          <li key={index} className="text-blue-700">{conclusion}</li>
        ))}
      </ul>
    </div>
  );
};

export default ConclusionesIA;
