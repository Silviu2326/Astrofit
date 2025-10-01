import React from 'react';

const SelectorFrecuencia: React.FC = () => {
  // TODO: Implement frequency selection logic (daily, 3x/week, etc.)
  // TODO: Use radio buttons or a custom selector component

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-4">Frecuencia</h2>
      <div>
        <label className="inline-flex items-center mr-4">
          <input type="radio" className="form-radio" name="frecuencia" value="diario" />
          <span className="ml-2">Diario</span>
        </label>
        <label className="inline-flex items-center mr-4">
          <input type="radio" className="form-radio" name="frecuencia" value="semanal" />
          <span className="ml-2">Semanal</span>
        </label>
        {/* TODO: Add more frequency options (e.g., custom days per week) */}
      </div>
      {/* TODO: Conditional rendering for custom frequency settings */}
    </div>
  );
};

export default SelectorFrecuencia;
