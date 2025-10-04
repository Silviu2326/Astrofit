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
          portadaUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjRkY2MzQ3Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iI0ZGRkZGRiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPlJlYWN0PC90ZXh0Pjwvc3ZnPg==',
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
          portadaUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMTA5NjYzIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iI0ZGRkZGRiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPlRhaWx3aW5kPC90ZXh0Pjwvc3ZnPg==',
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
