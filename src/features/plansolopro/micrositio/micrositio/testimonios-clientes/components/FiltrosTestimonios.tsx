import React from 'react';

interface FiltrosTestimoniosProps {
  onFilterChange: (filters: { serviceType?: string; rating?: number | null }) => void;
  currentFilters: { serviceType: string; rating: number | null };
}

export const FiltrosTestimonios: React.FC<FiltrosTestimoniosProps> = ({ onFilterChange, currentFilters }) => {
  const serviceTypes = ['Todos', 'Marketing Digital', 'Desarrollo Web', 'Diseño Gráfico'];
  const ratings = [null, 5, 4, 3, 2, 1]; // null para 'Todas las estrellas'

  const handleServiceTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({ serviceType: e.target.value });
  };

  const handleRatingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value === 'null' ? null : Number(e.target.value);
    onFilterChange({ rating: value });
  };

  return (
    <div className="flex flex-wrap gap-4 mb-8 p-4 bg-gray-100 rounded-lg shadow-sm">
      <div className="flex flex-col">
        <label htmlFor="serviceType" className="text-sm font-medium text-gray-700 mb-1">Tipo de Servicio:</label>
        <select
          id="serviceType"
          className="p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          value={currentFilters.serviceType}
          onChange={handleServiceTypeChange}
        >
          {serviceTypes.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      <div className="flex flex-col">
        <label htmlFor="rating" className="text-sm font-medium text-gray-700 mb-1">Rating mínimo:</label>
        <select
          id="rating"
          className="p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          value={currentFilters.rating === null ? 'null' : currentFilters.rating}
          onChange={handleRatingChange}
        >
          <option value="null">Todas las estrellas</option>
          {ratings.filter(r => r !== null).map(r => (
            <option key={r} value={r!}>{r} estrellas o más</option>
          ))}
        </select>
      </div>
    </div>
  );
};
