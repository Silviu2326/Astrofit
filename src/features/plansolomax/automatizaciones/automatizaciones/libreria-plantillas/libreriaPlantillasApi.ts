// src/features/automatizaciones/libreria-plantillas/libreriaPlantillasApi.ts

export interface Plantilla {
  id: string;
  nombre: string;
  descripcion: string;
  categoria: string;
  flujo: any; // Representación del flujo de la automatización
}

export const fetchPlantillas = async (): Promise<Plantilla[]> => {
  // Simular una llamada a API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: '1',
          nombre: 'Bienvenida a nuevos usuarios',
          descripcion: 'Envía un correo de bienvenida y una serie de tutoriales.',
          categoria: 'Onboarding',
          flujo: { /* ... */ },
        },
        {
          id: '2',
          nombre: 'Recuperación de usuarios inactivos',
          descripcion: 'Identifica usuarios inactivos y les envía ofertas especiales.',
          categoria: 'Retención',
          flujo: { /* ... */ },
        },
        {
          id: '3',
          nombre: 'Felicitación de Cumpleaños',
          descripcion: 'Envía un mensaje de cumpleaños con un descuento exclusivo.',
          categoria: 'Engagement',
          flujo: { /* ... */ },
        },
      ]);
    }, 500);
  });
};

export const importPlantilla = async (plantillaId: string): Promise<boolean> => {
  console.log(`Importando plantilla con ID: ${plantillaId}`);
  // Simular la importación de la plantilla
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 500);
  });
};
