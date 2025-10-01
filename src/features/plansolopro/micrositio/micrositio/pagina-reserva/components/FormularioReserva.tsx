import React from 'react';

interface FormularioReservaProps {
  children: React.ReactNode;
}

const FormularioReserva: React.FC<FormularioReservaProps> = ({ children }) => {
  return (
    <div className="space-y-6">
      {children}
    </div>
  );
};

export default FormularioReserva;
