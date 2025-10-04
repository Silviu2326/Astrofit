import React, { useState, useEffect } from 'react';
import { Loader2, AlertCircle, ChevronDown } from 'lucide-react';
import { Service, getServices } from '../../pagina-reserva/paginaReservaApi';

interface SeleccionServicioProps {
  onNext: () => void;
  onDataChange: (data: any) => void;
}

const SeleccionServicio: React.FC<SeleccionServicioProps> = ({ onNext, onDataChange }) => {
  const [services, setServices] = useState<Service[]>([]);
  const [selectedServiceId, setSelectedServiceId] = useState<string | ''>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const fetchedServices = await getServices();
        setServices(fetchedServices);
        setLoading(false);
      } catch (err) {
        setError('Error al cargar los servicios.');
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  const handleServiceChange = (event: any) => {
    setSelectedServiceId(event.target.value as string);
  };

  const handleNextClick = () => {
    const selectedService = services.find(s => s.id === selectedServiceId);
    if (selectedService) {
      onDataChange({ service: selectedService });
      onNext();
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-48">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Cargando servicios...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-48">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-2">
          <AlertCircle className="h-5 w-5 text-red-600" />
          <span className="text-red-800">{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-700 mb-6">Selecciona un Servicio</h2>
      <div>
        <label htmlFor="service-select" className="block text-sm font-medium text-gray-700 mb-2">
          Servicio
        </label>
        <div className="relative">
          <select
            id="service-select"
            value={selectedServiceId}
            onChange={handleServiceChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors appearance-none bg-white pr-10"
          >
            <option value="">Selecciona un servicio</option>
            {services.map((service) => (
              <option key={service.id} value={service.id}>
                {service.name} - {service.price}€
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
        </div>
      </div>
      <div className="flex justify-end mt-8 pt-6 border-t border-gray-200">
        <button
          onClick={handleNextClick}
          disabled={!selectedServiceId}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default SeleccionServicio;
