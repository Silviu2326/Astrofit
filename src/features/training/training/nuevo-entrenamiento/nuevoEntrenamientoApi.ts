
// Mock data for API
export const mockClientes = [
  { id: '1', nombre: 'Juan P??rez' },
  { id: '2', nombre: 'Ana Garc??a' },
  { id: '3', nombre: 'Carlos Ru??z' },
];

export const mockEjercicios = [
  { id: 'e1', nombre: 'Press Banca', categoria: 'Fuerza' },
  { id: 'e2', nombre: 'Sentadilla', categoria: 'Fuerza' },
  { id: 'e3', nombre: 'Remo con Barra', categoria: 'Fuerza' },
  { id: 'e4', nombre: 'Carrera en Cinta', categoria: 'Cardio' },
  { id: 'e5', nombre: 'El??ptica', categoria: 'Cardio' },
  { id: 'e6', nombre: 'Estiramientos Din??micos', categoria: 'Movilidad' },
  { id: 'e7', nombre: 'Rotaciones Articulares', categoria: 'Calentamiento' },
];

export const saveNuevoEntrenamiento = async (entrenamiento: any) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Guardando entrenamiento:', entrenamiento);
      resolve({ success: true, message: 'Entrenamiento guardado exitosamente' });
    }, 1000);
  });
};
