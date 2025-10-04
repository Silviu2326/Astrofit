import React, { useState } from 'react';

const CreadorQuiz: React.FC = () => {
  const [quizTitle, setQuizTitle] = useState('');
  const [questions, setQuestions] = useState<any[]>([]);

  const handleAddQuestion = () => {
    setQuestions([...questions, { id: Date.now(), text: '', options: ['', ''], correctAnswer: '' }]);
  };

  const handleSubmitQuiz = () => {
    console.log('Quiz Creado:', { quizTitle, questions });
    // L??gica para guardar el quiz a trav??s de la API
  };

  return (
    <div className="p-4 border rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Crear Nuevo Quiz</h2>
      <div className="mb-4">
        <label htmlFor="quizTitle" className="block text-sm font-medium text-gray-700">T??tulo del Quiz</label>
        <input
          type="text"
          id="quizTitle"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          value={quizTitle}
          onChange={(e) => setQuizTitle(e.target.value)}
        />
      </div>

      <h3 className="text-lg font-medium mb-2">Preguntas</h3>
      {questions.map((q, qIndex) => (
        <div key={q.id} className="mb-4 p-3 border rounded-md bg-gray-50">
          <label htmlFor={`question-${q.id}`} className="block text-sm font-medium text-gray-700">Pregunta {qIndex + 1}</label>
          <input
            type="text"
            id={`question-${q.id}`}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            value={q.text}
            onChange={(e) => {
              const newQuestions = [...questions];
              newQuestions[qIndex].text = e.target.value;
              setQuestions(newQuestions);
            }}
          />
          <div className="mt-2">
            <h4 className="text-md font-medium mb-1">Opciones:</h4>
            {q.options.map((option: string, oIndex: number) => (
              <div key={oIndex} className="flex items-center mb-2">
                <input
                  type="text"
                  className="block w-full border border-gray-300 rounded-md shadow-sm p-2 mr-2"
                  value={option}
                  onChange={(e) => {
                    const newQuestions = [...questions];
                    newQuestions[qIndex].options[oIndex] = e.target.value;
                    setQuestions(newQuestions);
                  }}
                />
                <input
                  type="radio"
                  name={`correctAnswer-${q.id}`}
                  checked={q.correctAnswer === option}
                  onChange={() => {
                    const newQuestions = [...questions];
                    newQuestions[qIndex].correctAnswer = option;
                    setQuestions(newQuestions);
                  }}
                />
                <label className="ml-1 text-sm text-gray-600">Correcta</label>
              </div>
            ))}
          </div>
        </div>
      ))}

      <button
        onClick={handleAddQuestion}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 mr-2"
      >
        A??adir Pregunta
      </button>
      <button
        onClick={handleSubmitQuiz}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4"
      >
        Guardar Quiz
      </button>
    </div>
  );
};

export default CreadorQuiz;
