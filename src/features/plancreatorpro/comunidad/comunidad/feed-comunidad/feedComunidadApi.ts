import { Post, User, Comment, Media, PollOption } from './types';

// Simulaci??n de datos de posts
let posts: Post[] = [
  {
    id: '1',
    author: { id: 'user1', name: 'Entrenador Juan', avatar: '🏋️‍♂️' },
    content: '??Emocionado de compartir mi nueva rutina de entrenamiento de fuerza! ?? #fitness #entrenamiento',
    media: [],
    type: 'text',
    likes: ['user2', 'user3'],
    comments: [
      { id: 'c1', author: { id: 'user2', name: 'Cliente Ana', avatar: '🥗' }, content: '??Me encanta! La probar?? ma??ana.', timestamp: new Date() },
    ],
    shares: 0,
    timestamp: new Date('2025-09-26T10:00:00Z'),
    isPinned: true,
  },
  {
    id: '2',
    author: { id: 'user2', name: 'Cliente Ana', avatar: '🥗' },
    content: 'Mi progreso de hoy. ??No hay excusas! #motivacion',
    media: [{ type: 'image', url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzM2NkZGIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyNCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj7wn5KIPC90ZXh0Pjwvc3ZnPg==' }],
    type: 'image',
    likes: ['user1'],
    comments: [],
    shares: 1,
    timestamp: new Date('2025-09-25T14:30:00Z'),
    isPinned: false,
  },
  {
    id: '3',
    author: { id: 'user1', name: 'Entrenador Juan', avatar: '🏋️‍♂️' },
    content: '??Qu?? tipo de entrenamiento prefieres?',
    media: [],
    type: 'poll',
    pollOptions: [
      { id: 'opt1', text: 'Fuerza', votes: 5 },
      { id: 'opt2', text: 'Cardio', votes: 8 },
      { id: 'opt3', text: 'Flexibilidad', votes: 3 },
    ],
    likes: [],
    comments: [],
    shares: 0,
    timestamp: new Date('2025-09-24T18:00:00Z'),
    isPinned: false,
  },
  {
    id: '4',
    author: { id: 'user3', name: 'Cliente Pedro', avatar: '💪' },
    content: 'Un video r??pido de mi sesi??n de yoga matutina.',
    media: [{ type: 'video', url: 'https://www.w3schools.com/html/mov_bbb.mp4' }], // Ejemplo de video
    type: 'video',
    likes: ['user1', 'user2'],
    comments: [],
    shares: 0,
    timestamp: new Date('2025-09-23T09:00:00Z'),
    isPinned: false,
  },
];

// Simulaci??n de API
export const feedComunidadApi = {
  getPosts: async (filter: string = 'all'): Promise<Post[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        let filteredPosts = posts;
        if (filter !== 'all') {
          filteredPosts = posts.filter(post => post.type === filter);
        }
        resolve(filteredPosts.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()));
      }, 500);
    });
  },

  getFixedPosts: async (): Promise<Post[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(posts.filter(post => post.isPinned).sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()));
      }, 300);
    });
  },

  createPost: async (newPost: Omit<Post, 'id' | 'timestamp' | 'likes' | 'comments' | 'shares' | 'isPinned'>): Promise<Post> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const post: Post = {
          ...newPost,
          id: `post-${Date.now()}`,
          timestamp: new Date(),
          likes: [],
          comments: [],
          shares: 0,
          isPinned: false,
        };
        posts.unshift(post); // Agrega al principio para simular el feed
        resolve(post);
      }, 500);
    });
  },

  toggleLike: async (postId: string, userId: string): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const postIndex = posts.findIndex(p => p.id === postId);
        if (postIndex > -1) {
          const post = posts[postIndex];
          const likeIndex = post.likes.indexOf(userId);
          if (likeIndex > -1) {
            post.likes.splice(likeIndex, 1);
          } else {
            post.likes.push(userId);
          }
          posts = [...posts]; // Trigger re-render if using state management
        }
        resolve();
      }, 200);
    });
  },

  addComment: async (postId: string, comment: Omit<Comment, 'id' | 'timestamp'>): Promise<Comment> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const postIndex = posts.findIndex(p => p.id === postId);
        if (postIndex > -1) {
          const newComment: Comment = {
            ...comment,
            id: `comment-${Date.now()}`,
            timestamp: new Date(),
          };
          posts[postIndex].comments.push(newComment);
          posts = [...posts];
          resolve(newComment);
        }
        resolve(null as any); // Should handle error properly
      }, 300);
    });
  },

  sharePost: async (postId: string): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const postIndex = posts.findIndex(p => p.id === postId);
        if (postIndex > -1) {
          posts[postIndex].shares++;
          posts = [...posts];
        }
        resolve();
      }, 200);
    });
  },

  voteOnPoll: async (postId: string, optionId: string, userId: string): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const post = posts.find(p => p.id === postId);
        if (post && post.type === 'poll' && post.pollOptions) {
          const option = post.pollOptions.find(opt => opt.id === optionId);
          if (option) {
            option.votes++;
            // In a real app, you'd track which user voted to prevent multiple votes
            posts = [...posts];
          }
        }
        resolve();
      }, 200);
    });
  },
};
