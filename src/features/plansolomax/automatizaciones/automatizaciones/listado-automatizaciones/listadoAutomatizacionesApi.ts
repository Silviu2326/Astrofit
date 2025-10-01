export interface FlujoAutomatizacion {
  id: string;
  nombre: string;
  tipo: 'email' | 'notificacion' | 'tarea';
  estado: 'activo' | 'pausado';
  ejecuciones: number;
}

// Simulación de una API para obtener flujos de automatización
export const listadoAutomatizacionesApi = {
  getFlujos: async (): Promise<FlujoAutomatizacion[]> => {
    // En un caso real, aquí harías una llamada HTTP a tu backend
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { id: '1', nombre: 'Bienvenida nuevo cliente', tipo: 'email', estado: 'activo', ejecuciones: 120 },
          { id: '2', nombre: 'Recordatorio pago', tipo: 'notificacion', estado: 'pausado', ejecuciones: 50 },
          { id: '3', nombre: 'Encuesta post-sesión', tipo: 'tarea', estado: 'activo', ejecuciones: 80 },
          { id: '4', nombre: 'Promoción de verano', tipo: 'email', estado: 'activo', ejecuciones: 200 },
          { id: '5', nombre: 'Seguimiento de leads', tipo: 'tarea', estado: 'pausado', ejecuciones: 30 },
        ]);
      }, 500);
    });
  },

  // Aquí podrías añadir funciones para activar/pausar/editar flujos
  toggleEstadoFlujo: async (id: string, estado: 'activo' | 'pausado'): Promise<boolean> => {
    console.log(`Cambiando estado del flujo ${id} a ${estado}`);
    return new Promise((resolve) => setTimeout(() => resolve(true), 300));
  },

  updateFlujo: async (flujo: FlujoAutomatizacion): Promise<boolean> => {
    console.log(`Actualizando flujo ${flujo.id}`);
    return new Promise((resolve) => setTimeout(() => resolve(true), 300));
  },
};
