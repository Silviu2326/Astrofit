export const getSessionDetails = async (sessionId: string) => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: sessionId,
        title: 'Sesión de Coaching Personal',
        trainer: 'Juan Pérez',
        attendees: [
          { id: '1', name: 'Ana García', isMuted: false, isVideoOff: false },
          { id: '2', name: 'Luis Martínez', isMuted: true, isVideoOff: false },
          { id: '3', name: 'María López', isMuted: false, isVideoOff: true },
        ],
        chatMessages: [
          { id: '1', sender: 'Ana García', message: 'Hola a todos!', timestamp: '10:00 AM' },
          { id: '2', sender: 'Juan Pérez', message: 'Bienvenidos a la sesión.', timestamp: '10:01 AM' },
        ],
      });
    }, 500);
  });
};

export const sendMessage = async (sessionId: string, sender: string, message: string) => {
  // Simulate API call for sending a message
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, message: 'Message sent' });
    }, 200);
  });
};

export const toggleMute = async (participantId: string, isMuted: boolean) => {
  // Simulate API call to toggle mute status
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, participantId, isMuted });
    }, 100);
  });
};

export const toggleVideo = async (participantId: string, isVideoOff: boolean) => {
  // Simulate API call to toggle video status
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, participantId, isVideoOff });
    }, 100);
  });
};
