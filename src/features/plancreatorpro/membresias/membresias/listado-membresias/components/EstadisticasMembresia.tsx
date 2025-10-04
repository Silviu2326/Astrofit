import React from 'react';

const EstadisticaCard: React.FC<{ title: string; value: string | number; description: string }> = ({
  title,
  value,
  description,
}) => (
  <div className="bg-white rounded-lg shadow-md p-5 border border-gray-200">
    <h4 className="text-lg font-medium text-gray-500 truncate">{title}</h4>
    <div className="mt-1 flex items-baseline justify-between md:block lg:flex">
      <div className="flex items-baseline text-2xl font-semibold text-indigo-600">
        {value}
      </div>
      <p className="ml-2 text-sm font-medium text-gray-500">
        {description}
      </p>
    </div>
  </div>
);

const EstadisticasMembresia: React.FC = () => {
  // Datos dummy para las estadísticas
  const totalMiembros = 240;
  const ingresosTotales = 8800;
  const miembrosActivos = 210;

  return (
    <>
      <EstadisticaCard
        title="Total Miembros"
        value={totalMiembros}
        description="Todos los niveles"
      />
      <EstadisticaCard
        title="Ingresos Totales"
        value={`$${ingresosTotales.toFixed(2)}`}
        description="Generados por membresías"
      />
      <EstadisticaCard
        title="Miembros Activos"
        value={miembrosActivos}
        description="Actualmente con membresía"
      />
    </>
  );
};

export default EstadisticasMembresia;
