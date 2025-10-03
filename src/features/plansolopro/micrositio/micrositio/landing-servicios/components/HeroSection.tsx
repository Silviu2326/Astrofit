
import React from 'react';

interface HeroSectionProps {
  trainerName: string;
  specialty: string;
  photoUrl: string;
  brandColors: { primary: string; secondary: string; accent: string };
}

const HeroSection: React.FC<HeroSectionProps> = ({ trainerName, specialty, photoUrl, brandColors }) => {
  return (
    <section className={`${brandColors.primary} text-white py-20 md:py-32 relative overflow-hidden`}>
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between relative z-10">
        <div className="md:w-1/2 text-center md:text-left mb-10 md:mb-0">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4">
            {trainerName}
          </h1>
          <p className={`text-xl md:text-2xl mb-8 ${brandColors.secondary.replace('text-', 'text-opacity-90 ')}`}>
            {specialty}
          </p>
          <button
            onClick={() => {
              const event = new CustomEvent('app:navigate', { detail: { page: 'pagina-reserva' } });
              window.dispatchEvent(event);
            }}
            className={`${brandColors.accent} text-gray-900 font-bold py-3 px-8 rounded-full text-lg hover:opacity-90 transition duration-300`}
          >
            Reservar ahora
          </button>
        </div>
        <div className="md:w-1/2 flex justify-center md:justify-end">
          <img
            src={photoUrl}
            alt={trainerName}
            className="rounded-full w-64 h-64 md:w-80 md:h-80 object-cover shadow-lg border-4 border-white"
          />
        </div>
      </div>
      {/* Fondo abstracto o patrón */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" fill="currentColor" viewBox="0 0 100 100" preserveAspectRatio="none">
          <rect x="0" y="0" width="100" height="100" />
          <circle cx="20" cy="20" r="15" fill="url(#gradient1)" />
          <circle cx="80" cy="50" r="20" fill="url(#gradient2)" />
          <circle cx="40" cy="90" r="10" fill="url(#gradient3)" />
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.2)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </linearGradient>
            <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.2)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </linearGradient>
            <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.2)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
