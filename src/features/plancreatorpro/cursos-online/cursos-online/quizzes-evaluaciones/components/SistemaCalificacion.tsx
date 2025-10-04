import React from 'react';

interface SistemaCalificacionProps {
  score: number;
  totalQuestions: number;
  feedback: string;
  passed: boolean;
}

const SistemaCalificacion: React.FC<SistemaCalificacionProps> = ({ score, totalQuestions, feedback, passed }) => {
  const percentage = (score / totalQuestions) * 100;

  return (
    <div className="p-4 border rounded-lg shadow-md mt-4">
      <h2 className="text-xl font-semibold mb-2">Resultados de la Evaluaci??n</h2>
      <p className="text-lg">Puntuaci??n: <span className="font-bold">{score} / {totalQuestions}</span></p>
      <p className="text-lg">Porcentaje: <span className="font-bold">{percentage.toFixed(2)}%</span></p>
      <p className={`text-lg ${passed ? 'text-green-600' : 'text-red-600'}`}>
        Estado: <span className="font-bold">{passed ? 'Aprobado' : 'Reprobado'}</span>
      </p>
      <p className="mt-2 text-gray-700">Feedback: {feedback}</p>
    </div>
  );
};

export default SistemaCalificacion;
