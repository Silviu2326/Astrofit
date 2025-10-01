import React from 'react';

interface Grade {
  studentName: string;
  quizTitle: string;
  score: number;
  totalQuestions: number;
  date: string;
}

interface TablaNotasProps {
  grades: Grade[];
}

const TablaNotas: React.FC<TablaNotasProps> = ({ grades }) => {
  return (
    <div className="p-4 border rounded-lg shadow-md mt-4">
      <h2 className="text-xl font-semibold mb-4">Tabla de Calificaciones</h2>
      {grades.length === 0 ? (
        <p className="text-gray-600">No hay calificaciones disponibles.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Alumno</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quiz</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Puntuaci??n</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {grades.map((grade, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{grade.studentName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{grade.quizTitle}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{grade.score} / {grade.totalQuestions}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{grade.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TablaNotas;
