// Definiciones de tipos para el módulo de Comunidad

export type UserRole = 'Admin' | 'Moderador' | 'Miembro' | 'Entrenador' | 'Nutricionista' | 'Atleta';
export type PostPrivacy = 'Público' | 'Amigos' | 'Solo yo';
export type ReactionType = 'like' | 'love' | 'wow' | 'laugh' | 'sad' | 'angry';

export interface User {
  id: string;
  name: string;
  avatar: string;
  role?: UserRole;
  isFollowing?: boolean;
}

export interface Reaction {
  userId: string;
  type: ReactionType;
}

export interface Comment {
  id: string;
  author: User;
  content: string;
  timestamp: Date;
  likes: string[]; // IDs de usuarios que dieron like al comentario
  replies?: Comment[]; // Threading de comentarios
}

export interface Media {
  type: 'image' | 'video';
  url: string;
  thumbnail?: string;
}

export interface PollOption {
  id: string;
  text: string;
  votes: number;
  votedBy?: string[]; // IDs de usuarios que votaron por esta opción
}

export interface Post {
  id: string;
  author: User;
  content: string;
  media: Media[];
  type: 'text' | 'image' | 'video' | 'poll' | 'shared' | 'achievement';
  likes: string[]; // IDs de usuarios que dieron like
  reactions?: Reaction[]; // Reacciones avanzadas (opcional)
  comments: Comment[];
  shares: number;
  timestamp: Date;
  isPinned: boolean;
  pollOptions?: PollOption[];
  privacy?: PostPrivacy;
  link?: {
    url: string;
    title: string;
    description: string;
    image?: string;
  };
  sharedPost?: Post; // Post original si es un repost
  achievement?: {
    title: string;
    icon: string;
    description: string;
  };
  isEdited?: boolean;
  saves?: string[]; // IDs de usuarios que guardaron el post
}
