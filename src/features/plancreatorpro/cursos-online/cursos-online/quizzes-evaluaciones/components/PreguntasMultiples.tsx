import React, { useState } from 'react';

interface PreguntasMultiplesProps {
  question: {
    id: string;
    text: string;
    options: string[];
  };
  onAnswer: (questionId: string, answer: string) => void;
  selectedAnswer?: string;
}

const PreguntasMultiples: React.FC<PreguntasMultiplesProps> = ({ question, onAnswer, selectedAnswer }) => {
  return (
    <div className="mb-4 p-3 border rounded-md shadow-sm">
      <p className="font-medium mb-2">{question.text}</p>
      <div className="space-y-2">
        {question.options.map((option) => (
          <label key={option} className="flex items-center">
            <input
              type="radio"
              name={`question-${question.id}`}
              value={option}
              checked={selectedAnswer === option}
              onChange={() => onAnswer(question.id, option)}
              className="form-radio h-4 w-4 text-blue-600"
            />
            <span className="ml-2 text-gray-700">{option}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default PreguntasMultiples;
