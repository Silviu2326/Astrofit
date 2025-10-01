
export enum SocialMediaType {
  Facebook = 'Facebook',
  Instagram = 'Instagram',
  Twitter = 'Twitter',
  LinkedIn = 'LinkedIn',
  TikTok = 'TikTok',
  YouTube = 'YouTube',
}

export enum PostType {
  Image = 'Image',
  Video = 'Video',
  Text = 'Text',
  Carousel = 'Carousel',
  Story = 'Story',
}

export interface SocialMediaPost {
  id: string;
  platform: SocialMediaType;
  type: PostType;
  content: string; // Text, image URL, video URL
  caption: string;
  hashtags: string[];
  scheduledDate: Date;
  postedDate?: Date;
  likes?: number;
  comments?: number;
  shares?: number;
  views?: number;
  campaignId?: string; // Optional link to a campaign
}

export const mockSocialMediaPosts: SocialMediaPost[] = [
  {
    id: 'post-fb-001',
    platform: SocialMediaType.Facebook,
    type: PostType.Video,
    content: 'url_video_reto_fitness.mp4',
    caption: '¡Únete a nuestro Reto Fitness de 30 Días y transforma tu cuerpo! #RetoFitness #VidaSaludable',
    hashtags: ['RetoFitness', 'VidaSaludable', 'Entrenamiento'],
    scheduledDate: new Date('2025-10-01T09:00:00'),
    postedDate: new Date('2025-10-01T09:00:00'),
    likes: 120,
    comments: 15,
    shares: 30,
    views: 1500,
    campaignId: 'camp-001',
  },
  {
    id: 'post-ig-001',
    platform: SocialMediaType.Instagram,
    type: PostType.Carousel,
    content: 'url_carousel_ejercicios.jpg',
    caption: '5 ejercicios clave para un abdomen de acero. ¡Desliza para verlos! 💪 #Abs #FitnessMotivation',
    hashtags: ['Abs', 'FitnessMotivation', 'EjercicioEnCasa'],
    scheduledDate: new Date('2025-10-02T14:30:00'),
    postedDate: new Date('2025-10-02T14:30:00'),
    likes: 250,
    comments: 25,
    shares: 50,
    campaignId: 'camp-001',
  },
  {
    id: 'post-tw-001',
    platform: SocialMediaType.Twitter,
    type: PostType.Text,
    content: '¿Sabías que una buena hidratación es clave para tu rendimiento deportivo? ¡Bebe agua! #Hidratacion #Deporte',
    caption: '¿Sabías que una buena hidratación es clave para tu rendimiento deportivo? ¡Bebe agua! #Hidratacion #Deporte',
    hashtags: ['Hidratacion', 'Deporte', 'Salud'],
    scheduledDate: new Date('2025-10-03T11:00:00'),
    postedDate: new Date('2025-10-03T11:00:00'),
    likes: 45,
    comments: 5,
    shares: 10,
  },
];
