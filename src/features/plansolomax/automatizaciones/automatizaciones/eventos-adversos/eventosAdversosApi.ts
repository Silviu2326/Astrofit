export interface EventoAdverso {
  id: string;
  clienteId: string;
  tipo: 'lesion' | 'problema_medico' | 'contraindicacion' | 'alergia' | 'intolerancia';
  severidad: 'leve' | 'moderada' | 'grave' | 'critica';
  fecha: Date;
  descripcion: string;
  flujosAfectados: string[];
  estado: 'activo' | 'resuelto' | 'monitoreando';
  fechaResolucion?: Date;
  notasMedicas?: string;
  recomendaciones?: string;
}

export interface FlujoPausado {
  flujoId: string;
  nombre: string;
  fechaPausa: Date;
  motivo: string;
  eventoAdversoId: string;
  fechaReanudacion?: Date;
  estado: 'pausado' | 'reanudado' | 'cancelado';
}

export interface ConfiguracionPausa {
  id: string;
  tipoEvento: string;
  severidadMinima: string;
  accionAutomatica: 'pausar_todos' | 'pausar_especificos' | 'notificar_solo';
  flujosEspecificos?: string[];
  notificaciones: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
  duracionPausa?: number; // en días
  reanudacionAutomatica: boolean;
}

// API para gestión de eventos adversos
export const eventosAdversosApi = {
  // Crear nuevo evento adverso
  async crearEventoAdverso(evento: Omit<EventoAdverso, 'id' | 'fecha'>): Promise<EventoAdverso> {
    const nuevoEvento: EventoAdverso = {
      ...evento,
      id: `evento_${Date.now()}`,
      fecha: new Date(),
      estado: 'activo'
    };

    // Simular llamada API
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Guardar en localStorage para persistencia
    const eventos = JSON.parse(localStorage.getItem('eventosAdversos') || '[]');
    eventos.push(nuevoEvento);
    localStorage.setItem('eventosAdversos', JSON.stringify(eventos));

    return nuevoEvento;
  },

  // Obtener eventos adversos de un cliente
  async obtenerEventosCliente(clienteId: string): Promise<EventoAdverso[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const eventos = JSON.parse(localStorage.getItem('eventosAdversos') || '[]');
    return eventos.filter((evento: EventoAdverso) => evento.clienteId === clienteId);
  },

  // Pausar flujos por evento adverso
  async pausarFlujosPorEvento(eventoId: string, flujosIds: string[]): Promise<FlujoPausado[]> {
    const flujosPausados: FlujoPausado[] = flujosIds.map(flujoId => ({
      flujoId,
      nombre: `Flujo ${flujoId}`,
      fechaPausa: new Date(),
      motivo: 'Evento adverso detectado',
      eventoAdversoId: eventoId,
      estado: 'pausado'
    }));

    // Guardar en localStorage
    const pausados = JSON.parse(localStorage.getItem('flujosPausados') || '[]');
    pausados.push(...flujosPausados);
    localStorage.setItem('flujosPausados', JSON.stringify(pausados));

    return flujosPausados;
  },

  // Reanudar flujos
  async reanudarFlujos(eventoId: string): Promise<void> {
    const pausados = JSON.parse(localStorage.getItem('flujosPausados') || '[]');
    const actualizados = pausados.map((flujo: FlujoPausado) => 
      flujo.eventoAdversoId === eventoId 
        ? { ...flujo, estado: 'reanudado', fechaReanudacion: new Date() }
        : flujo
    );
    localStorage.setItem('flujosPausados', JSON.stringify(actualizados));
  },

  // Obtener configuración de pausa
  async obtenerConfiguracionPausa(): Promise<ConfiguracionPausa[]> {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const configuraciones = JSON.parse(localStorage.getItem('configuracionPausa') || '[]');
    if (configuraciones.length === 0) {
      // Configuración por defecto
      const configDefault: ConfiguracionPausa[] = [
        {
          id: 'config_1',
          tipoEvento: 'lesion',
          severidadMinima: 'moderada',
          accionAutomatica: 'pausar_todos',
          notificaciones: { email: true, push: true, sms: false },
          reanudacionAutomatica: false
        },
        {
          id: 'config_2',
          tipoEvento: 'problema_medico',
          severidadMinima: 'leve',
          accionAutomatica: 'notificar_solo',
          notificaciones: { email: true, push: false, sms: false },
          reanudacionAutomatica: true,
          duracionPausa: 7
        }
      ];
      localStorage.setItem('configuracionPausa', JSON.stringify(configDefault));
      return configDefault;
    }
    
    return configuraciones;
  },

  // Actualizar configuración
  async actualizarConfiguracion(config: ConfiguracionPausa): Promise<void> {
    const configuraciones = JSON.parse(localStorage.getItem('configuracionPausa') || '[]');
    const index = configuraciones.findIndex((c: ConfiguracionPausa) => c.id === config.id);
    
    if (index >= 0) {
      configuraciones[index] = config;
    } else {
      configuraciones.push(config);
    }
    
    localStorage.setItem('configuracionPausa', JSON.stringify(configuraciones));
  },

  // Obtener flujos pausados
  async obtenerFlujosPausados(): Promise<FlujoPausado[]> {
    await new Promise(resolve => setTimeout(resolve, 200));
    return JSON.parse(localStorage.getItem('flujosPausados') || '[]');
  }
};






