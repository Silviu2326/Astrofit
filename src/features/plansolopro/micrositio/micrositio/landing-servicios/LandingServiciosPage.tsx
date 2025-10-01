
import React from 'react';
import HeroSection from './components/HeroSection';
import ServiciosGrid from './components/ServiciosGrid';
import TestimoniosCarousel from './components/TestimoniosCarousel';
import CTAReservar from './components/CTAReservar';

const LandingServiciosPage: React.FC = () => {
  // Colores personalizables para la marca personal
  const brandColors = {
    primary: 'bg-blue-600',
    secondary: 'text-blue-800',
    accent: 'bg-yellow-400',
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans antialiased">
      <HeroSection
        trainerName="Juan Pérez"
        specialty="Entrenador Personal & Nutricionista"
        photoUrl="https://via.placeholder.com/400" // Placeholder image
        brandColors={brandColors}
      />
      <main className="container mx-auto px-4 py-12">
        <ServiciosGrid brandColors={brandColors} />
        <TestimoniosCarousel brandColors={brandColors} />
        <CTAReservar brandColors={brandColors} />
      </main>
    </div>
  );
};

export default LandingServiciosPage;
