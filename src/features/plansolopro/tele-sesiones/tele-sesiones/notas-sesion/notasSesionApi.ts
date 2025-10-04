// src/features/tele-sesiones/notas-sesion/notasSesionApi.ts
// Simulamos una API para la gestión de notas de sesión

interface Nota {
  id: string;
  clienteId: string;
  entrenadorId: string;
  fecha: string;
  contenido: string;
  categoria: string; // Ejemplo: "Técnica", "Progreso", "Actitud"
}

let notas: Nota[] = [];

export const getNotasByCliente = async (clienteId: string): Promise<Nota[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(notas.filter(nota => nota.clienteId === clienteId));
    }, 500);
  });
};

export const addNota = async (nota: Omit<Nota, 'id'>): Promise<Nota> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newNota = { ...nota, id: Date.now().toString() };
      notas.push(newNota);
      resolve(newNota);
    }, 500);
  });
};

export const updateNota = async (updatedNota: Nota): Promise<Nota> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = notas.findIndex(nota => nota.id === updatedNota.id);
      if (index !== -1) {
        notas[index] = updatedNota;
        resolve(updatedNota);
      } else {
        reject(new Error('Nota no encontrada'));
      }
    }, 500);
  });
};

export const deleteNota = async (notaId: string): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      notas = notas.filter(nota => nota.id !== notaId);
      resolve();
    }, 500);
  });
};
