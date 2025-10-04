import React, { useState } from 'react';
import { GaleriaTestimonios } from './components/GaleriaTestimonios';
import { FiltrosTestimonios } from './components/FiltrosTestimonios';
import { CarruselPrincipal } from './components/CarruselPrincipal';
import { Testimonio } from './testimoniosClientesApi';
import { PlaceholderImages } from '../../../../../utils/placeholderImages';

const mockTestimonios: Testimonio[] = [
  {
    id: '1',
    author: 'Ana G.',
    comment: '¡Excelente servicio! Mi negocio ha crecido exponencialmente gracias a ellos.',
    rating: 5,
    serviceType: 'Marketing Digital',
    photo: PlaceholderImages.client('AG'),
    highlighted: true,
  },
  {
    id: '2',
    author: 'Carlos R.',
    comment: 'Profesionales y muy atentos. Recomiendo sus servicios al 100%.',
    rating: 4,
    serviceType: 'Desarrollo Web',
    photo: PlaceholderImages.client('CR'),
  },
  {
    id: '3',
    author: 'Marta L.',
    comment: 'Increíble experiencia. El equipo es muy profesional y los resultados son excelentes.',
    rating: 5,
    serviceType: 'Consultoría',
    photo: PlaceholderImages.client('ML'),
  },
  {
    id: '4',
    author: 'Javier M.',
    comment: 'Servicio de primera calidad. Muy recomendable para cualquier empresa.',
    rating: 4,
    serviceType: 'Marketing Digital',
    photo: PlaceholderImages.client('JM'),
  },
  {
    id: '5',
    author: 'Laura S.',
    comment: 'Excelente atención al cliente y resultados que superaron nuestras expectativas.',
    rating: 5,
    serviceType: 'Desarrollo Web',
    photo: PlaceholderImages.client('LS'),
  },
];

const TestimoniosClientesPage: React.FC = () => {
  const [filters, setFilters] = useState({
    serviceType: 'Todos',
    rating: null as number | null,
  });
  const [filteredTestimonios, setFilteredTestimonios] = useState<Testimonio[]>(mockTestimonios);

  const handleFilterChange = (updatedFilters: any) => {
    setFilters(updatedFilters);
    
    let tempTestimonios = [...mockTestimonios];
    
    if (updatedFilters.serviceType !== 'Todos') {
      tempTestimonios = tempTestimonios.filter(t => t.serviceType === updatedFilters.serviceType);
    }

    if (updatedFilters.rating !== null) {
      tempTestimonios = tempTestimonios.filter(t => t.rating >= updatedFilters.rating!);
    }

    setFilteredTestimonios(tempTestimonios);
  };

  const highlightedTestimonios = mockTestimonios.filter(t => t.highlighted);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-8">Lo que dicen nuestros clientes</h1>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-6">Testimonios Destacados</h2>
        <CarruselPrincipal testimonios={highlightedTestimonios} />
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-6">Explora todas las reseñas</h2>
        <FiltrosTestimonios onFilterChange={handleFilterChange} currentFilters={filters} />
        <GaleriaTestimonios testimonios={filteredTestimonios} />
      </section>
    </div>
  );
};

export default TestimoniosClientesPage;
