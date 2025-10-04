import React, { useState } from 'react';
import { Curso } from '../../curso-detalle/cursoDetalleApi';

interface PestanasInfoProps {
  curso: Curso;
}

const PestanasInfo: React.FC<PestanasInfoProps> = ({ curso }) => {
  const [activeTab, setActiveTab] = useState('info');

  const renderContent = () => {
    switch (activeTab) {
      case 'info':
        return (
          <div>
            <h3 className="text-xl font-semibold mb-2">Descripción del Curso</h3>
            <p className="text-gray-700">{curso.descripcion}</p>
          </div>
        );
      case 'temario':
        return (
          <div>
            <h3 className="text-xl font-semibold mb-2">Temario Completo</h3>
            <ul>
              {curso.modulos.map((modulo) => (
                <li key={modulo.id} className="mb-2">
                  <h4 className="font-semibold">{modulo.titulo}</h4>
                  <ul className="ml-4 list-disc list-inside">
                    {modulo.lecciones.map((leccion) => (
                      <li key={leccion.id}>{leccion.titulo}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        );
      case 'alumnos':
        return (
          <div>
            <h3 className="text-xl font-semibold mb-2">Alumnos Inscritos</h3>
            <ul>
              {curso.alumnos.map((alumno) => (
                <li key={alumno.id} className="flex items-center mb-2">
                  <img src={alumno.avatar} alt={alumno.nombre} className="w-8 h-8 rounded-full mr-2" />
                  <span>{alumno.nombre}</span>
                </li>
              ))}
            </ul>
          </div>
        );
      case 'estadisticas':
        return (
          <div>
            <h3 className="text-xl font-semibold mb-2">Estadísticas del Curso</h3>
            <p>Progreso medio de finalización: {curso.progresoMedio}%</p>
            <p>Total de alumnos: {curso.alumnos.length}</p>
            {/* Add more statistics as needed */}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="border-b border-gray-200 mb-4">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          <button
            onClick={() => setActiveTab('info')}
            className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm ${activeTab === 'info' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
          >
            Info
          </button>
          <button
            onClick={() => setActiveTab('temario')}
            className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm ${activeTab === 'temario' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
          >
            Temario
          </button>
          <button
            onClick={() => setActiveTab('alumnos')}
            className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm ${activeTab === 'alumnos' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
          >
            Alumnos
          </button>
          <button
            onClick={() => setActiveTab('estadisticas')}
            className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm ${activeTab === 'estadisticas' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
          >
            Estadísticas
          </button>
        </nav>
      </div>
      <div>
        {renderContent()}
      </div>
    </div>
  );
};

export default PestanasInfo;
