
import React from 'react';
import WizardCurso from './components/WizardCurso';

const CrearCursoPage: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Crear Nuevo Curso</h1>
      <WizardCurso />
    </div>
  );
};

export default CrearCursoPage;
