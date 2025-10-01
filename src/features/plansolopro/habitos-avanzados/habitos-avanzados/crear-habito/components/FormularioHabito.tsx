import React from 'react';

const FormularioHabito: React.FC = () => {
  // TODO: Implement form fields for habit name, description, etc.
  // TODO: Implement form validation using a library like react-hook-form or similar

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-4">Define tu Hábito</h2>
      <form>
        <div className="mb-4">
          <label htmlFor="nombreHabito" className="block text-gray-700 text-sm font-bold mb-2">
            Nombre del Hábito
          </label>
          <input
            type="text"
            id="nombreHabito"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Ej: Beber 2L agua"
          />
          {/* TODO: Add validation error message here */}
        </div>
        <div className="mb-4">
          <label htmlFor="descripcionHabito" className="block text-gray-700 text-sm font-bold mb-2">
            Descripción (opcional)
          </label>
          <textarea
            id="descripcionHabito"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Describe tu hábito en detalle"
            rows={3}
          ></textarea>
        </div>
        {/* TODO: Add predefined habit templates selection */}
      </form>
    </div>
  );
};

export default FormularioHabito;
