import React from 'react';

interface ContadorEjecucionesProps {
  count: number;
}

export const ContadorEjecuciones: React.FC<ContadorEjecucionesProps> = ({ count }) => {
  return (
    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
      {count}
    </span>
  );
};
