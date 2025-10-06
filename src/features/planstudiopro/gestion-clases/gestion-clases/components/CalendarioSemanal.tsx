import React from 'react';
import TarjetaClase from './TarjetaClase';
import { Clase } from '../calendarioClasesApi';

interface CalendarioSemanalProps {
  clases: Clase[];
}

const diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

const CalendarioSemanal: React.FC<CalendarioSemanalProps> = ({ clases }) => {
  return (
    <div className="grid grid-cols-7 gap-4 mt-4">
      {diasSemana.map(dia => (
        <div key={dia} className="border p-2 rounded-lg">
          <h3 className="font-semibold text-center mb-2">{dia}</h3>
          <div className="space-y-2">
            {clases.filter(clase => clase.dia === dia).map(clase => (
              <TarjetaClase key={clase.id} clase={clase} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CalendarioSemanal;
