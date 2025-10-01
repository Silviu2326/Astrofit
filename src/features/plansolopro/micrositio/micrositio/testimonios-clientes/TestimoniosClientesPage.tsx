import React, { useState } from 'react';
import { GaleriaTestimonios } from './components/GaleriaTestimonios';
import { FiltrosTestimonios } from './components/FiltrosTestimonios';
import { CarruselPrincipal } from './components/CarruselPrincipal';
import { Testimonio } from './testimoniosClientesApi';

const mockTestimonios: Testimonio[] = [
  {
    id: '1',
    author: 'Ana G.',
    comment: '¡Excelente servicio! Mi negocio ha crecido exponencialmente gracias a ellos.',
    rating: 5,
    serviceType: 'Marketing Digital',
    photo: 'https://via.placeholder.com/150/FF5733/FFFFFF?text=Ana',
    highlighted: true,
  },
  {
    id: '2',
    author: 'Carlos R.',
    comment: 'Profesionales y muy atentos. Recomiendo sus servicios al 100%.',
    rating: 4,
    serviceType: 'Desarrollo Web',
    photo: 'https://via.placeholder.com/150/33FF57/FFFFFF?text=Carlos',
    highlighted: false,
  },
  {
    id: '3',
    author: 'Marta P.',
    comment: 'Me encantó el diseño de mi nueva web. Superaron mis expectativas.',
    rating: 5,
    serviceType: 'Diseño Gráfico',
    photo: 'https://via.placeholder.com/150/3357FF/FFFFFF?text=Marta',
    highlighted: true,
  },
  {
    id: '4',
    author: 'Javier S.',
    comment: 'Muy buen soporte técnico y resultados visibles en poco tiempo.',
    rating: 4,
    serviceType: 'Marketing Digital',
    photo: 'https://via.placeholder.com/150/FFFF33/000000?text=Javier',
    highlighted: false,
  },
  {
    id: '5',
    author: 'Laura M.',
    comment: 'Una experiencia fantástica, el equipo es muy creativo y eficiente.',
    rating: 5,
    serviceType: 'Desarrollo Web',
    photo: 'https://via.placeholder.com/150/FF33FF/FFFFFF?text=Laura',
    highlighted: false,
  },
];

const TestimoniosClientesPage: React.FC = () => {
  const [filteredTestimonios, setFilteredTestimonios] = useState<Testimonio[]>(mockTestimonios);
  const [filters, setFilters] = useState<{ serviceType: string; rating: number | null }>({
    serviceType: 'Todos',
    rating: null,
  });

  const handleFilterChange = (newFilters: { serviceType?: string; rating?: number | null }) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);

    let tempTestimonios = mockTestimonios;

    if (updatedFilters.serviceType && updatedFilters.serviceType !== 'Todos') {
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
