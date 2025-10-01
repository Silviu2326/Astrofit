import React from 'react';
import SistemaCalificacion from './SistemaCalificacion';

interface ResultadosInstantaneosProps {
  quizResult: {
    score: number;
    totalQuestions: number;
    feedback: string;
    passed: boolean;
  } | null;
}

const ResultadosInstantaneos: React.FC<ResultadosInstantaneosProps> = ({ quizResult }) => {
  if (!quizResult) {
    return <div className="p-4 mt-4 text-gray-600">Esperando resultados...</div>;
  }

  return (
    <div className="mt-4">
      <h2 className="text-xl font-semibold mb-2">Resultados Instant??neos</h2>
      <SistemaCalificacion
        score={quizResult.score}
        totalQuestions={quizResult.totalQuestions}
        feedback={quizResult.feedback}
        passed={quizResult.passed}
      />
    </div>
  );
};

export default ResultadosInstantaneos;
