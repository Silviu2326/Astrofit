import { Curso } from './ListadoCursosPage'; // Assuming Curso interface is exported from ListadoCursosPage

// This is a placeholder for API calls. In a real application,
// you would use a library like Axios or the native Fetch API.

export const fetchCursos = async (): Promise<Curso[]> => {
  // Simulate an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: '1',
          titulo: 'Introducción a React',
          alumnos: 120,
          estado: 'activo',
          precio: 49.99,
          duracion: '10 horas',
          inscritosActuales: 85,
          portadaUrl: 'https://via.placeholder.com/150/FF0000/FFFFFF?text=React',
          categoria: 'Desarrollo Web',
        },
        {
          id: '2',
          titulo: 'TailwindCSS desde cero',
          alumnos: 80,
          estado: 'pausado',
          precio: 29.99,
          duracion: '6 horas',
          inscritosActuales: 50,
          portadaUrl: 'https://via.placeholder.com/150/00FF00/FFFFFF?text=Tailwind',
          categoria: 'Diseño UI/UX',
        },
        // ... more dummy data
      ]);
    }, 500);
  });
};

export const updateCursoStatus = async (cursoId: string, newStatus: Curso['estado']): Promise<boolean> => {
  // Simulate an API call to update course status
  console.log(`Updating course ${cursoId} to status ${newStatus}`);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true); // Simulate success
    }, 300);
  });
};

export const deleteCurso = async (cursoId: string): Promise<boolean> => {
  // Simulate an API call to delete a course
  console.log(`Deleting course ${cursoId}`);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true); // Simulate success
    }, 300);
  });
};
