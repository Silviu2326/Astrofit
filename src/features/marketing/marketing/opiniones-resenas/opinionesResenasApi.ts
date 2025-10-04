export interface Review {
  id: string;
  clientName: string;
  rating: number;
  comment: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
  type: 'private' | 'public';
}

export interface TransformationStory {
  id: string;
  clientName: string;
  beforeImageUrl: string;
  afterImageUrl: string;
  story: string;
  date: string;
  approved: boolean;
}

// Mock data for reviews
const mockReviews: Review[] = [
  {
    id: '1',
    clientName: 'Ana García',
    rating: 5,
    comment: 'Excelente programa de entrenamiento, he visto resultados increíbles en poco tiempo. ¡Muy recomendado!',
    date: '2023-09-15',
    status: 'approved',
    type: 'public',
  },
  {
    id: '2',
    clientName: 'Carlos Ruiz',
    rating: 4,
    comment: 'El entrenador es muy profesional y atento. Me gustaría que hubiera más variedad en los ejercicios.',
    date: '2023-09-20',
    status: 'pending',
    type: 'private',
  },
  {
    id: '3',
    clientName: 'María López',
    rating: 5,
    comment: 'La planificación nutricional fue clave para mi transformación. ¡Gracias por todo el apoyo!',
    date: '2023-09-22',
    status: 'approved',
    type: 'public',
  },
  {
    id: '4',
    clientName: 'Pedro Martínez',
    rating: 3,
    comment: 'Buen inicio, pero tuve dificultades para seguir la rutina. Necesito más motivación.',
    date: '2023-09-25',
    status: 'pending',
    type: 'private',
  },
];

// Mock data for transformation stories
const mockTransformationStories: TransformationStory[] = [
  {
    id: 'ts1',
    clientName: 'Laura Fernández',
    beforeImageUrl: 'https://via.placeholder.com/150/FF0000/FFFFFF?text=Antes',
    afterImageUrl: 'https://via.placeholder.com/150/00FF00/FFFFFF?text=Después',
    story: 'Mi historia de transformación comenzó hace 6 meses. Con la guía del entrenador, logré perder 15kg y mejorar mi energía. ¡Me siento genial!',
    date: '2023-08-01',
    approved: true,
  },
  {
    id: 'ts2',
    clientName: 'Javier Pérez',
    beforeImageUrl: 'https://via.placeholder.com/150/FFFF00/000000?text=Antes',
    afterImageUrl: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=Después',
    story: 'Siempre quise aumentar mi masa muscular y con el plan personalizado lo conseguí. ¡Un cambio asombroso!',
    date: '2023-08-10',
    approved: true,
  },
];

export const getReviews = async (type?: 'private' | 'public', status?: 'pending' | 'approved' | 'rejected'): Promise<Review[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let filteredReviews = mockReviews;
      if (type) {
        filteredReviews = filteredReviews.filter(review => review.type === type);
      }
      if (status) {
        filteredReviews = filteredReviews.filter(review => review.status === status);
      }
      resolve(filteredReviews);
    }, 500);
  });
};

export const getTransformationStories = async (): Promise<TransformationStory[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockTransformationStories);
    }, 500);
  });
};

export const updateReviewStatus = async (id: string, status: 'approved' | 'rejected'): Promise<Review> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const reviewIndex = mockReviews.findIndex(review => review.id === id);
      if (reviewIndex > -1) {
        mockReviews[reviewIndex].status = status;
        resolve(mockReviews[reviewIndex]);
      } else {
        reject(new Error('Review not found'));
      }
    }, 300);
  });
};

export const requestReview = async (clientId: string): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Solicitud de reseña enviada al cliente ${clientId}`);
      resolve(true);
    }, 500);
  });
};

export const exportTestimonials = async (): Promise<any> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Exportando testimonios...');
      const data = JSON.stringify({ reviews: mockReviews.filter(r => r.type === 'public' && r.status === 'approved'), stories: mockTransformationStories.filter(s => s.approved) }, null, 2);
      console.log(data);
      resolve({ message: 'Testimonios exportados con éxito', data });
    }, 500);
  });
};
