export interface Ejercicio {
  id: string;
  nombre: string;
  grupoMuscular: string;
  tipoMovimiento: string;
  dificultad: 'Principiante' | 'Intermedio' | 'Avanzado';
  tempo: string;
  rangoRepeticiones: string;
  materialNecesario: string[];
  instrucciones: string;
  indicacionesTecnicas: string;
  erroresComunes: string;
  etiquetas: string[];
  mediaUrl?: string;
}

// Mock data para simular una API
const mockEjercicios: Ejercicio[] = [
  {
    id: '1',
    nombre: 'Sentadilla con Barra',
    grupoMuscular: 'Piernas',
    tipoMovimiento: 'Empuje',
    dificultad: 'Intermedio',
    tempo: '2-0-1-0',
    rangoRepeticiones: '8-12',
    materialNecesario: ['Barra', 'Discos'],
    instrucciones: '<p>Coloca la barra sobre tus trapecios. Desciende controladamente hasta que tus caderas estén por debajo de tus rodillas. Sube explosivamente.</p>',
    indicacionesTecnicas: 'Mantén la espalda recta y el core activado. Las rodillas deben seguir la línea de los pies.',
    erroresComunes: 'Redondear la espalda, levantar los talones, no bajar lo suficiente.',
    etiquetas: ['Fuerza', 'Compuesto', 'Piernas'],
    mediaUrl: 'https://www.youtube.com/watch?v=Dy28p4E_d_Q', // Ejemplo de URL de vídeo
  },
  {
    id: '2',
    nombre: 'Press de Banca',
    grupoMuscular: 'Pecho',
    tipoMovimiento: 'Empuje',
    dificultad: 'Intermedio',
    tempo: '2-0-1-0',
    rangoRepeticiones: '6-10',
    materialNecesario: ['Barra', 'Discos', 'Banco'],
    instrucciones: '<p>Acuéstate en el banco, agarra la barra con un ancho ligeramente superior al de tus hombros. Baja la barra controladamente hasta el pecho y empuja hacia arriba.</p>',
    indicacionesTecnicas: 'Retrae las escápulas, mantén los pies firmes en el suelo. La barra debe bajar a la altura del pezón.',
    erroresComunes: 'Rebotar la barra en el pecho, levantar la cadera, no controlar el movimiento.',
    etiquetas: ['Fuerza', 'Compuesto', 'Pecho'],
    mediaUrl: 'https://upload.wikimedia.org/wikipedia/commons/b/b7/Bench_press_with_barbell.gif', // Ejemplo de URL de imagen/gif
  },
];

export const editorEjercicioApi = {
  getEjercicios: async (): Promise<Ejercicio[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockEjercicios), 500);
    });
  },

  getEjercicioById: async (id: string): Promise<Ejercicio | undefined> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockEjercicios.find((ej) => ej.id === id)), 500);
    });
  },

  createEjercicio: async (ejercicio: Omit<Ejercicio, 'id'>): Promise<Ejercicio> => {
    return new Promise((resolve) => {
      const newEjercicio = { ...ejercicio, id: String(mockEjercicios.length + 1) };
      mockEjercicios.push(newEjercicio);
      setTimeout(() => resolve(newEjercicio), 500);
    });
  },

  updateEjercicio: async (ejercicio: Ejercicio): Promise<Ejercicio> => {
    return new Promise((resolve, reject) => {
      const index = mockEjercicios.findIndex((ej) => ej.id === ejercicio.id);
      if (index !== -1) {
        mockEjercicios[index] = ejercicio;
        setTimeout(() => resolve(ejercicio), 500);
      } else {
        reject(new Error('Ejercicio no encontrado'));
      }
    });
  },

  deleteEjercicio: async (id: string): Promise<void> => {
    return new Promise((resolve) => {
      const index = mockEjercicios.findIndex((ej) => ej.id === id);
      if (index !== -1) {
        mockEjercicios.splice(index, 1);
      }
      setTimeout(() => resolve(), 500);
    });
  },
};
