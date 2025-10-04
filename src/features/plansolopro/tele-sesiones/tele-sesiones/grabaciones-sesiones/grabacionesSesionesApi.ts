export interface VideoRecording {
  id: string;
  title: string;
  thumbnail: string;
  date: string;
  type: string;
  duration: string;
  size: string;
  url: string;
  clientId?: string; // Optional, for permission system
}

export const fetchVideoRecordings = async (): Promise<VideoRecording[]> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: '1', title: 'Sesión 1', thumbnail: 'https://via.placeholder.com/150', date: '2023-01-15', type: 'Consulta', duration: '30:00', size: '50MB', url: 'https://www.w3schools.com/html/mov_bbb.mp4' },
        { id: '2', title: 'Sesión 2', thumbnail: 'https://via.placeholder.com/150', date: '2023-02-20', type: 'Terapia', duration: '45:00', size: '75MB', url: 'https://www.w3schools.com/html/mov_bbb.mp4' },
        { id: '3', title: 'Sesión 3', thumbnail: 'https://via.placeholder.com/150', date: '2023-03-10', type: 'Seguimiento', duration: '20:00', size: '30MB', url: 'https://www.w3schools.com/html/mov_bbb.mp4' },
      ]);
    }, 500);
  });
};

export const updateVideoPermissions = async (videoId: string, clientId: string, hasAccess: boolean): Promise<boolean> => {
  // Simulate API call to update permissions
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Updating permissions for video ${videoId} for client ${clientId}: ${hasAccess}`);
      resolve(true);
    }, 300);
  });
};
