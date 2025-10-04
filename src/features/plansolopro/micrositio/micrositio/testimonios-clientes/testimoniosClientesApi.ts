export interface Testimonio {
  id: string;
  author: string;
  comment: string;
  rating: number;
  serviceType: string;
  photo: string;
  highlighted?: boolean;
}

// En un proyecto real, aquí irían funciones para interactuar con una API
// Por ejemplo:
// export const fetchTestimonios = async (): Promise<Testimonio[]> => {
//   const response = await fetch('/api/testimonios');
//   if (!response.ok) {
//     throw new Error('Error al cargar testimonios');
//   }
//   return response.json();
// };
