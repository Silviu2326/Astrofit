// chatSesionApi.ts

export const getMessages = async () => {
  // Simulación de una llamada API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, text: 'Hola, ¿cómo estás?', sender: 'other', timestamp: '10:00 AM' },
        { id: 2, text: '¡Hola! Estoy bien, ¿y tú?', sender: 'self', timestamp: '10:01 AM' },
      ]);
    }, 500);
  });
};

export const sendMessage = async (message: string) => {
  // Simulación de envío de mensaje
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id: Date.now(), text: message, sender: 'self', timestamp: new Date().toLocaleTimeString() });
    }, 200);
  });
};
