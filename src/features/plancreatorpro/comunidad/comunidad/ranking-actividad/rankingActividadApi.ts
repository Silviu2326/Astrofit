// src/features/comunidad/ranking-actividad/rankingActividadApi.ts

// Este archivo contendrá la lógica para interactuar con la API
// para obtener datos del ranking, medallas, puntos, etc.

export const fetchLeaderboardData = async () => {
  // Simulación de una llamada a la API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, name: 'UsuarioEjemplo1', posts: 120, comments: 300, points: 1500, avatar: 'https://via.placeholder.com/50' },
        { id: 2, name: 'UsuarioEjemplo2', posts: 100, comments: 250, points: 1200, avatar: 'https://via.placeholder.com/50' },
        { id: 3, name: 'UsuarioEjemplo3', posts: 90, comments: 200, points: 1000, avatar: 'https://via.placeholder.com/50' },
      ]);
    }, 500);
  });
};

export const fetchUserMedals = async (userId: number) => {
  // Simulación de una llamada a la API para obtener medallas de un usuario
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, name: 'Publicador Pro', icon: '🏅' },
        { id: 2, name: 'Comentarista Estrella', icon: '🌟' },
      ]);
    }, 500);
  });
};

// Aquí se pueden añadir más funciones para interactuar con la API
// como actualizar puntos, obtener detalles de medallas, etc.
