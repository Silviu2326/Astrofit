
// This file would handle API calls related to membership data.
// For now, it's a placeholder.

export const fetchMembershipDetails = async (membershipId: string) => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: membershipId,
        name: 'Membresía Premium',
        description: 'Acceso total a todos nuestros cursos y entrenamientos exclusivos.',
        price: 29.99,
        periodicity: 'mensual',
        benefits: [
          'Acceso ilimitado a todos los cursos',
          'Entrenamientos exclusivos en vivo',
          'Soporte prioritario',
          'Comunidad privada',
        ],
        testimonials: [
          { id: 1, name: 'Ana G.', feedback: '¡Increíble valor! He aprendido muchísimo.' },
          { id: 2, name: 'Carlos R.', feedback: 'La mejor inversión para mi desarrollo profesional.' },
        ],
        faq: [
          { question: '¿Cómo cancelo mi suscripción?', answer: 'Puedes cancelar en cualquier momento desde tu perfil.' },
          { question: '¿Hay un período de prueba?', answer: 'Actualmente no ofrecemos un período de prueba.' },
        ],
      });
    }, 500);
  });
};
