import React from 'react';
import { Membresia } from '../listadoMembresiasApi';

const dummyMembresias: Membresia[] = [
  {
    id: '1',
    nivel: 'Bronce',
    miembrosActivos: 120,
    ingresosGenerados: 1200,
    estado: 'activo',
  },
  {
    id: '2',
    nivel: 'Plata',
    miembrosActivos: 80,
    ingresosGenerados: 2400,
    estado: 'activo',
  },
  {
    id: '3',
    nivel: 'Oro',
    miembrosActivos: 30,
    ingresosGenerados: 3000,
    estado: 'pausado',
  },
  {
    id: '4',
    nivel: 'Premium',
    miembrosActivos: 10,
    ingresosGenerados: 2000,
    estado: 'activo',
  },
];

const TarjetaMembresia: React.FC<{ membresia: Membresia }> = ({ membresia }) => {
  const estadoColor = membresia.estado === 'activo' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800';

  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between border border-gray-200">
      <div>
        <h3 className="text-2xl font-semibold text-gray-800 mb-3">Membresía {membresia.nivel}</h3>
        <p className="text-gray-600 mb-2">Miembros Activos: <span className="font-medium">{membresia.miembrosActivos}</span></p>
        <p className="text-gray-600 mb-4">Ingresos Generados: <span className="font-medium">${membresia.ingresosGenerados.toFixed(2)}</span></p>
        <span className={`inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium ${estadoColor}`}>
          {membresia.estado === 'activo' ? 'Activa' : 'Pausada'}
        </span>
      </div>
      <div className="mt-6 flex justify-end space-x-3">
        <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Editar
        </button>
        <button className="px-4 py-2 border border-red-300 rounded-md text-sm font-medium text-red-700 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
          Eliminar
        </button>
      </div>
    </div>
  );
};

const TarjetasMembresia: React.FC = () => {
  // En un caso real, aquí se usaría un hook para cargar las membresías de la API
  // const { data: membresias, isLoading, error } = useQuery('membresias', getMembresias);

  return (
    <>
      {dummyMembresias.map((membresia) => (
        <TarjetaMembresia key={membresia.id} membresia={membresia} />
      ))}
    </>
  );
};

export default TarjetasMembresia;
