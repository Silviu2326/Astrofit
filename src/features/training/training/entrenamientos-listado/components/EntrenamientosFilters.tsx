import React from 'react';

interface EntrenamientosFiltersProps {
  filters: {
    estado: string;
    cliente: string;
    fechaCreacion: string;
    tipoEntrenamiento: string;
    busqueda: string;
  };
  setFilters: React.Dispatch<React.SetStateAction<{
    estado: string;
    cliente: string;
    fechaCreacion: string;
    tipoEntrenamiento: string;
    busqueda: string;
  }>>;
}

const EntrenamientosFilters: React.FC<EntrenamientosFiltersProps> = ({ filters, setFilters }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  return (
    <div className="flex flex-wrap gap-4 items-center">
      <div className="flex-grow">
        <input
          type="text"
          name="busqueda"
          placeholder="Buscar por cliente o programa..."
          className="p-2 border rounded w-full"
          value={filters.busqueda}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="estado" className="sr-only">Estado</label>
        <select
          id="estado"
          name="estado"
          className="p-2 border rounded"
          value={filters.estado}
          onChange={handleChange}
        >
          <option value="">Todos los estados</option>
          <option value="activo">Activo</option>
          <option value="borrador">Borrador</option>
          <option value="finalizado">Finalizado</option>
          <option value="pausado">Pausado</option>
        </select>
      </div>

      <div>
        <label htmlFor="cliente" className="sr-only">Cliente</label>
        <input
          type="text"
          id="cliente"
          name="cliente"
          placeholder="Filtrar por cliente..."
          className="p-2 border rounded"
          value={filters.cliente}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="fechaCreacion" className="sr-only">Fecha de Creación</label>
        <input
          type="date"
          id="fechaCreacion"
          name="fechaCreacion"
          className="p-2 border rounded"
          value={filters.fechaCreacion}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="tipoEntrenamiento" className="sr-only">Tipo de Entrenamiento</label>
        <select
          id="tipoEntrenamiento"
          name="tipoEntrenamiento"
          className="p-2 border rounded"
          value={filters.tipoEntrenamiento}
          onChange={handleChange}
        >
          <option value="">Todos los tipos</option>
          <option value="fuerza">Fuerza</option>
          <option value="resistencia">Resistencia</option>
          <option value="flexibilidad">Flexibilidad</option>
          <option value="peso">Pérdida de Peso</option>
          <option value="hipertrofia">Hipertrofia</option>
        </select>
      </div>
    </div>
  );
};

export default EntrenamientosFilters;
