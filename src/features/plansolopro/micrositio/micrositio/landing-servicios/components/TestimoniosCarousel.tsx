
import React, { useState } from 'react';
import { mockTestimonios, Testimonio } from '../landingServiciosApi';

interface TestimoniosCarouselProps {
  brandColors: { primary: string; secondary: string; accent: string };
}

const TestimoniosCarousel: React.FC<TestimoniosCarouselProps> = ({ brandColors }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonio = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % mockTestimonios.length);
  };

  const prevTestimonio = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? mockTestimonios.length - 1 : prevIndex - 1
    );
  };

  const currentTestimonio = mockTestimonios[currentIndex];

  return (
    <section className="py-16 bg-gray-100">
      <h2 className={`text-4xl font-bold text-center mb-12 ${brandColors.secondary}`}>Lo que dicen mis clientes</h2>
      <div className="relative max-w-3xl mx-auto bg-white rounded-lg shadow-xl p-8 md:p-12">
        <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left">
          <img
            src={currentTestimonio.photoUrl}
            alt={currentTestimonio.name}
            className="w-24 h-24 rounded-full object-cover mb-6 md:mb-0 md:mr-8 border-4 border-blue-300"
          />
          <div>
            <div className="flex justify-center md:justify-start mb-3">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-5 h-5 ${i < currentTestimonio.stars ? brandColors.accent.replace('bg-', 'text-') : 'text-gray-300'}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.929 8.72c-.783-.57-.381-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-gray-700 text-lg italic mb-4">{currentTestimonio.comment}</p>
            <p className={`font-semibold text-lg ${brandColors.secondary}`}>{currentTestimonio.name}</p>
          </div>
        </div>
        <button
          onClick={prevTestimonio}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 hover:bg-gray-300 p-2 rounded-full ml-4 focus:outline-none"
        >
          &lt;
        </button>
        <button
          onClick={nextTestimonio}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 hover:bg-gray-300 p-2 rounded-full mr-4 focus:outline-none"
        >
          &gt;
        </button>
      </div>
    </section>
  );
};

export default TestimoniosCarousel;
