import { PlaceholderImages } from '../../../../utils/placeholderImages';

export interface Review {
  id: string;
  clientName: string;
  rating: number;
  comment: string;
  date: string;
  service: string;
  verified: boolean;
  helpful: number;
  status: 'pending' | 'approved' | 'rejected';
}

export interface TransformationStory {
  id: string;
  clientName: string;
  beforeImageUrl: string;
  afterImageUrl: string;
  weightLoss?: number;
  timeFrame: string;
  testimonial: string;
  approved: boolean;
}

export interface ReviewStats {
  totalReviews: number;
  averageRating: number;
  ratingDistribution: { [key: number]: number };
  recentReviews: Review[];
}

// Mock data for reviews
const mockReviews: Review[] = [
  {
    id: '1',
    clientName: 'Ana García',
    rating: 5,
    comment: 'Excelente servicio, muy profesional y resultados increíbles.',
    date: '2024-01-15',
    service: 'Entrenamiento Personal',
    verified: true,
    helpful: 12,
    status: 'approved',
  },
  {
    id: '2',
    clientName: 'Carlos López',
    rating: 4,
    comment: 'Buen gimnasio, instalaciones modernas y personal atento.',
    date: '2024-01-10',
    service: 'Membresía',
    verified: true,
    helpful: 8,
    status: 'approved',
  },
  {
    id: '3',
    clientName: 'María Rodríguez',
    rating: 5,
    comment: 'El mejor gimnasio de la ciudad, lo recomiendo 100%.',
    date: '2024-01-08',
    service: 'Clases Grupales',
    verified: true,
    helpful: 15,
    status: 'approved',
  },
  {
    id: '4',
    clientName: 'Pedro Martín',
    rating: 3,
    comment: 'Está bien, pero podría mejorar en algunos aspectos.',
    date: '2024-01-05',
    service: 'Entrenamiento Personal',
    verified: false,
    helpful: 3,
    status: 'approved',
  },
  {
    id: '5',
    clientName: 'Laura Fernández',
    rating: 5,
    comment: 'Transformación increíble, gracias al equipo por su apoyo.',
    date: '2024-01-03',
    service: 'Programa de Pérdida de Peso',
    verified: true,
    helpful: 20,
    status: 'approved',
  },
];

// Mock data for transformation stories
const mockTransformationStories: TransformationStory[] = [
  {
    id: 'ts1',
    clientName: 'Laura Fernández',
    beforeImageUrl: PlaceholderImages.generic(150, 150, 'Antes'),
    afterImageUrl: PlaceholderImages.generic(150, 150, 'Después'),
    weightLoss: 15,
    timeFrame: '6 meses',
    testimonial: 'Perdí 15 kg y gané mucha confianza. El programa fue perfecto para mí.',
    approved: true,
  },
  {
    id: 'ts2',
    clientName: 'Miguel Torres',
    beforeImageUrl: PlaceholderImages.generic(150, 150, 'Antes'),
    afterImageUrl: PlaceholderImages.generic(150, 150, 'Después'),
    weightLoss: 8,
    timeFrame: '4 meses',
    testimonial: 'Increíble transformación, me siento más fuerte y saludable.',
    approved: true,
  },
];

// API functions
export const fetchReviews = async (filters?: {
  rating?: number;
  service?: string;
  status?: string;
}): Promise<Review[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let filteredReviews = [...mockReviews];
      
      if (filters?.rating) {
        filteredReviews = filteredReviews.filter(r => r.rating === filters.rating);
      }
      
      if (filters?.service) {
        filteredReviews = filteredReviews.filter(r => r.service === filters.service);
      }
      
      if (filters?.status) {
        filteredReviews = filteredReviews.filter(r => r.status === filters.status);
      }
      
      resolve(filteredReviews);
    }, 500);
  });
};

export const fetchReviewStats = async (): Promise<ReviewStats> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const totalReviews = mockReviews.length;
      const averageRating = mockReviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews;
      
      const ratingDistribution = mockReviews.reduce((dist, r) => {
        dist[r.rating] = (dist[r.rating] || 0) + 1;
        return dist;
      }, {} as { [key: number]: number });
      
      const recentReviews = mockReviews
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 5);
      
      resolve({
        totalReviews,
        averageRating: Math.round(averageRating * 10) / 10,
        ratingDistribution,
        recentReviews,
      });
    }, 500);
  });
};

export const fetchTransformationStories = async (): Promise<TransformationStory[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockTransformationStories.filter(story => story.approved));
    }, 500);
  });
};

export const createReview = async (review: Omit<Review, 'id' | 'date' | 'helpful' | 'status'>): Promise<Review> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newReview: Review = {
        ...review,
        id: Date.now().toString(),
        date: new Date().toISOString().split('T')[0],
        helpful: 0,
        status: 'pending',
      };
      mockReviews.push(newReview);
      resolve(newReview);
    }, 500);
  });
};

export const updateReviewStatus = async (id: string, status: 'approved' | 'rejected'): Promise<Review> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const review = mockReviews.find(r => r.id === id);
      if (review) {
        review.status = status;
        resolve(review);
      } else {
        reject(new Error('Review not found'));
      }
    }, 500);
  });
};

export const markReviewHelpful = async (id: string): Promise<Review> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const review = mockReviews.find(r => r.id === id);
      if (review) {
        review.helpful += 1;
        resolve(review);
      } else {
        reject(new Error('Review not found'));
      }
    }, 500);
  });
};

export const createTransformationStory = async (story: Omit<TransformationStory, 'id' | 'approved'>): Promise<TransformationStory> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newStory: TransformationStory = {
        ...story,
        id: `ts${Date.now()}`,
        approved: false,
      };
      mockTransformationStories.push(newStory);
      resolve(newStory);
    }, 500);
  });
};

export const approveTransformationStory = async (id: string): Promise<TransformationStory> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const story = mockTransformationStories.find(s => s.id === id);
      if (story) {
        story.approved = true;
        resolve(story);
      } else {
        reject(new Error('Transformation story not found'));
      }
    }, 500);
  });
};

export const exportReviews = async (format: 'json' | 'csv'): Promise<{ message: string; data: any }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = {
        reviews: mockReviews.filter(r => r.status === 'approved'),
        stories: mockTransformationStories.filter(s => s.approved)
      };
      
      if (format === 'json') {
        resolve({ message: 'Testimonios exportados con éxito', data });
      } else {
        // In a real app, this would generate CSV
        resolve({ message: 'CSV generado con éxito', data });
      }
    }, 500);
  });
};