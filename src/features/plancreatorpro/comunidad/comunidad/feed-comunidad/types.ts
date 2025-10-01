// Definiciones de tipos para el m??dulo de Comunidad

export interface User {
  id: string;
  name: string;
  avatar: string;
}

export interface Comment {
  id: string;
  author: User;
  content: string;
  timestamp: Date;
}

export interface Media {
  type: 'image' | 'video';
  url: string;
}

export interface PollOption {
  id: string;
  text: string;
  votes: number;
}

export interface Post {
  id: string;
  author: User;
  content: string;
  media: Media[];
  type: 'text' | 'image' | 'video' | 'poll';
  likes: string[]; // IDs de usuarios que dieron like
  comments: Comment[];
  shares: number;
  timestamp: Date;
  isPinned: boolean;
  pollOptions?: PollOption[];
}
