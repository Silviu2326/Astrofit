import axios from 'axios';

export interface Articulo {
  id: string;
  titulo: string;
  imagen: string;
  extracto: string;
  contenido: string;
  categoria: string;
  fechaPublicacion: string;
}

const articulos: Articulo[] = [
  {
    id: '1',
    titulo: '10 Tips Fitness para Empezar el Año',
    imagen: 'https://via.placeholder.com/400x200?text=Fitness+Tips',
    extracto: 'Descubre cómo mantenerte en forma con estos sencillos consejos.',
    contenido: 'Contenido completo del artículo sobre tips fitness...',
    categoria: 'tips fitness',
    fechaPublicacion: '2023-01-05',
  },
  {
    id: '2',
    titulo: 'Nutrición Balanceada: Clave para una Vida Saludable',
    imagen: 'https://via.placeholder.com/400x200?text=Nutricion+Saludable',
    extracto: 'Aprende a comer de forma inteligente y mejora tu bienestar.',
    contenido: 'Contenido completo del artículo sobre nutrición balanceada...',
    categoria: 'nutrición',
    fechaPublicacion: '2023-02-10',
  },
  {
    id: '3',
    titulo: 'Nuevas Instalaciones en Nuestro Gimnasio',
    imagen: 'https://via.placeholder.com/400x200?text=Nuevas+Instalaciones',
    extracto: 'Estamos emocionados de anunciar nuestras nuevas y mejoradas instalaciones.',
    contenido: 'Contenido completo del artículo sobre las nuevas instalaciones...',
    categoria: 'noticias personales',
    fechaPublicacion: '2023-03-15',
  },
];

export const getArticulos = (categoria?: string, searchTerm?: string): Promise<Articulo[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let filteredArticulos = articulos;
      if (categoria && categoria !== 'Todas') {
        filteredArticulos = filteredArticulos.filter(articulo => articulo.categoria === categoria);
      }
      if (searchTerm) {
        filteredArticulos = filteredArticulos.filter(articulo =>
          articulo.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
          articulo.extracto.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      resolve(filteredArticulos);
    }, 500);
  });
};

export const getArticuloById = (id: string): Promise<Articulo | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(articulos.find(articulo => articulo.id === id));
    }, 300);
  });
};

export const getCategorias = (): Promise<string[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const categorias = Array.from(new Set(articulos.map(articulo => articulo.categoria)));
      resolve(['Todas', ...categorias]);
    }, 200);
  });
};
