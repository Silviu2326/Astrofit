// API de Historial de Experimentos A/B
// Sistema de gestión de experimentos históricos para plataforma SaaS de fitness/nutrición

export interface Variante {
  id: string;
  nombre: string;
  descripcion: string;
  visitantes: number;
  conversiones: number;
  tasaConversion: number;
  ingresoPromedio?: number;
  tiempoPromedioPermanencia?: number;
}

export interface Experimento {
  id: string;
  nombre: string;
  tipo: 'headline' | 'cta' | 'precio' | 'imagen' | 'copy' | 'layout' | 'color';
  hipotesis: string;
  fechaInicio: string;
  fechaFin: string;
  duracionDias: number;
  variantes: Variante[];
  ganadora: string;
  mejora: number; // Porcentaje de mejora
  nivelConfianza: number; // Porcentaje
  estado: 'exitoso' | 'fallido' | 'inconcluso';
  implementacion: 'implementado' | 'pendiente' | 'descartado';
  aprendizajes: string[];
  impactoIngresos?: number;
  segmentoAudiencia?: string;
  metricaPrincipal: string;
  metricas?: {
    rebote?: number;
    tiempoEnPagina?: number;
    clicsBoton?: number;
    compartidos?: number;
  };
}

export interface EstadisticasGenerales {
  totalExperimentos: number;
  experimentosExitosos: number;
  experimentosFallidos: number;
  experimentosInconclusos: number;
  tasaExito: number;
  mejoraPromedio: number;
  ingresosTotalesGenerados: number;
  experimentosImplementados: number;
  experimentosPorTipo: {
    [key: string]: number;
  };
  tipoMasExitoso: string;
  duracionPromedio: number;
}

export interface InsightBiblioteca {
  categoria: string;
  patrones: {
    patron: string;
    efectividad: number;
    experimentos: string[];
    recomendacion: string;
  }[];
}

// 30 Experimentos históricos completos
export const experimentosHistoricos: Experimento[] = [
  {
    id: 'exp-001',
    nombre: 'Titular Principal Homepage - Beneficio vs Característica',
    tipo: 'headline',
    hipotesis: 'Un titular enfocado en beneficios emocionales ("Transforma tu cuerpo en 90 días") generará más conversiones que uno enfocado en características ("Planes personalizados de fitness y nutrición")',
    fechaInicio: '2024-01-15',
    fechaFin: '2024-02-15',
    duracionDias: 31,
    variantes: [
      {
        id: 'var-001-a',
        nombre: 'Control - Características',
        descripcion: 'Planes personalizados de fitness y nutrición',
        visitantes: 12450,
        conversiones: 498,
        tasaConversion: 4.0,
        ingresoPromedio: 89.99,
        tiempoPromedioPermanencia: 125
      },
      {
        id: 'var-001-b',
        nombre: 'Variante - Beneficios',
        descripcion: 'Transforma tu cuerpo en 90 días',
        visitantes: 12380,
        conversiones: 669,
        tasaConversion: 5.4,
        ingresoPromedio: 94.50,
        tiempoPromedioPermanencia: 145
      }
    ],
    ganadora: 'var-001-b',
    mejora: 35.0,
    nivelConfianza: 98.5,
    estado: 'exitoso',
    implementacion: 'implementado',
    aprendizajes: [
      'Los usuarios responden mejor a promesas de transformación específicas con plazos definidos',
      'El lenguaje emocional supera al lenguaje técnico en conversión',
      'Los titulares con números concretos (90 días) generan más confianza'
    ],
    impactoIngresos: 15420.50,
    segmentoAudiencia: 'Usuarios nuevos',
    metricaPrincipal: 'Tasa de conversión a registro',
    metricas: {
      rebote: 42.3,
      tiempoEnPagina: 145,
      clicsBoton: 1854
    }
  },
  {
    id: 'exp-002',
    nombre: 'Color CTA Botón Principal - Verde vs Naranja',
    tipo: 'color',
    hipotesis: 'Un botón CTA naranja (color de energía y acción) generará más clics que el verde actual (asociado con salud pero menos urgencia)',
    fechaInicio: '2024-01-20',
    fechaFin: '2024-02-10',
    duracionDias: 21,
    variantes: [
      {
        id: 'var-002-a',
        nombre: 'Control - Verde',
        descripcion: 'Botón verde #28a745',
        visitantes: 8920,
        conversiones: 401,
        tasaConversion: 4.5,
        ingresoPromedio: 89.99
      },
      {
        id: 'var-002-b',
        nombre: 'Variante - Naranja',
        descripcion: 'Botón naranja #ff6b35',
        visitantes: 8845,
        conversiones: 584,
        tasaConversion: 6.6,
        ingresoPromedio: 89.99
      }
    ],
    ganadora: 'var-002-b',
    mejora: 46.7,
    nivelConfianza: 99.2,
    estado: 'exitoso',
    implementacion: 'implementado',
    aprendizajes: [
      'El naranja genera mayor sensación de urgencia y acción inmediata',
      'El contraste visual con el fondo blanco mejoró la visibilidad del CTA',
      'Los usuarios asocian el naranja con energía y motivación, alineado con fitness'
    ],
    impactoIngresos: 16468.17,
    segmentoAudiencia: 'Todos los usuarios',
    metricaPrincipal: 'Clics en CTA principal',
    metricas: {
      clicsBoton: 2234,
      tiempoEnPagina: 132
    }
  },
  {
    id: 'exp-003',
    nombre: 'Precio de Entrada - $49 vs $79 Plan Básico',
    tipo: 'precio',
    hipotesis: 'Reducir el precio del plan básico de $79 a $49 aumentará las conversiones lo suficiente para compensar el menor ingreso por usuario',
    fechaInicio: '2024-02-01',
    fechaFin: '2024-03-01',
    duracionDias: 29,
    variantes: [
      {
        id: 'var-003-a',
        nombre: 'Control - $79',
        descripcion: 'Plan básico a $79/mes',
        visitantes: 15230,
        conversiones: 762,
        tasaConversion: 5.0,
        ingresoPromedio: 79.00
      },
      {
        id: 'var-003-b',
        nombre: 'Variante - $49',
        descripcion: 'Plan básico a $49/mes',
        visitantes: 15180,
        conversiones: 1214,
        tasaConversion: 8.0,
        ingresoPromedio: 49.00
      }
    ],
    ganadora: 'var-003-b',
    mejora: 60.0,
    nivelConfianza: 99.5,
    estado: 'exitoso',
    implementacion: 'implementado',
    aprendizajes: [
      'El punto de precio $49 es percibido como más accesible para usuarios nuevos',
      'A pesar del menor ingreso por usuario, el volumen compensó con creces',
      'La barrera psicológica de $50 es real y significativa',
      'Ingreso total aumentó de $60,198 a $59,486 (mantener y monitorear lifetime value)'
    ],
    impactoIngresos: 59486.00,
    segmentoAudiencia: 'Usuarios nuevos sin prueba previa',
    metricaPrincipal: 'Conversión a suscripción pagada',
    metricas: {
      tiempoEnPagina: 185
    }
  },
  {
    id: 'exp-004',
    nombre: 'Imagen Hero - Persona Real vs Ilustración',
    tipo: 'imagen',
    hipotesis: 'Una fotografía de una persona real entrenando generará más conexión emocional que una ilustración abstracta',
    fechaInicio: '2024-02-10',
    fechaFin: '2024-03-05',
    duracionDias: 24,
    variantes: [
      {
        id: 'var-004-a',
        nombre: 'Control - Ilustración',
        descripcion: 'Ilustración vectorial de fitness',
        visitantes: 10550,
        conversiones: 527,
        tasaConversion: 5.0,
        ingresoPromedio: 89.99
      },
      {
        id: 'var-004-b',
        nombre: 'Variante - Foto Real',
        descripcion: 'Fotografía de mujer entrenando',
        visitantes: 10490,
        conversiones: 450,
        tasaConversion: 4.3,
        ingresoPromedio: 89.99
      }
    ],
    ganadora: 'var-004-a',
    mejora: -14.0,
    nivelConfianza: 94.2,
    estado: 'fallido',
    implementacion: 'descartado',
    aprendizajes: [
      'Las ilustraciones generan menor intimidación que fotos de personas muy fit',
      'Los usuarios se sienten más cómodos con representaciones abstractas al inicio',
      'Las fotos reales pueden crear comparaciones negativas en usuarios principiantes',
      'Considerar fotos de personas en diferentes etapas de su transformación'
    ],
    impactoIngresos: 0,
    segmentoAudiencia: 'Visitantes homepage',
    metricaPrincipal: 'Tasa de conversión',
    metricas: {
      rebote: 48.5,
      tiempoEnPagina: 98
    }
  },
  {
    id: 'exp-005',
    nombre: 'Copy CTA - "Empieza Gratis" vs "Comienza Tu Transformación"',
    tipo: 'cta',
    hipotesis: 'Un CTA más aspiracional ("Comienza Tu Transformación") convertirá mejor que uno enfocado en precio ("Empieza Gratis")',
    fechaInicio: '2024-02-15',
    fechaFin: '2024-03-10',
    duracionDias: 24,
    variantes: [
      {
        id: 'var-005-a',
        nombre: 'Control - Gratis',
        descripcion: 'Empieza Gratis',
        visitantes: 9870,
        conversiones: 641,
        tasaConversion: 6.5,
        ingresoPromedio: 89.99
      },
      {
        id: 'var-005-b',
        nombre: 'Variante - Transformación',
        descripcion: 'Comienza Tu Transformación',
        visitantes: 9820,
        conversiones: 589,
        tasaConversion: 6.0,
        ingresoPromedio: 89.99
      }
    ],
    ganadora: 'var-005-a',
    mejora: -7.7,
    nivelConfianza: 89.3,
    estado: 'fallido',
    implementacion: 'descartado',
    aprendizajes: [
      'El beneficio tangible "Gratis" supera a las promesas aspiracionales en la decisión inicial',
      'Los usuarios en etapa de consideración priorizan el riesgo cero',
      'Las palabras aspiracionales funcionan mejor en etapas posteriores del funnel',
      '"Gratis" reduce la fricción psicológica en el primer paso'
    ],
    impactoIngresos: 0,
    segmentoAudiencia: 'Visitantes página de pricing',
    metricaPrincipal: 'Clics en CTA',
    metricas: {
      clicsBoton: 1845
    }
  },
  {
    id: 'exp-006',
    nombre: 'Layout Página Planes - Grid 3 Columnas vs 4 Columnas',
    tipo: 'layout',
    hipotesis: 'Un layout de 3 columnas con planes claramente diferenciados convertirá mejor que 4 columnas (menos opciones, menos parálisis)',
    fechaInicio: '2024-03-01',
    fechaFin: '2024-03-22',
    duracionDias: 21,
    variantes: [
      {
        id: 'var-006-a',
        nombre: 'Control - 4 Columnas',
        descripcion: 'Grid con 4 planes (Básico, Estándar, Premium, Elite)',
        visitantes: 11240,
        conversiones: 562,
        tasaConversion: 5.0,
        ingresoPromedio: 95.50
      },
      {
        id: 'var-006-b',
        nombre: 'Variante - 3 Columnas',
        descripcion: 'Grid con 3 planes (Básico, Premium, Elite)',
        visitantes: 11190,
        conversiones: 727,
        tasaConversion: 6.5,
        ingresoPromedio: 102.30
      }
    ],
    ganadora: 'var-006-b',
    mejora: 30.0,
    nivelConfianza: 97.8,
    estado: 'exitoso',
    implementacion: 'implementado',
    aprendizajes: [
      'Menos opciones reducen la parálisis por análisis',
      'La eliminación del plan "Estándar" empujó a usuarios hacia Premium',
      'El contraste más claro entre opciones facilita la decisión',
      'Los usuarios gastaron más en promedio al eliminar la opción intermedia baja'
    ],
    impactoIngresos: 16872.90,
    segmentoAudiencia: 'Usuarios en página de pricing',
    metricaPrincipal: 'Conversión a cualquier plan',
    metricas: {
      tiempoEnPagina: 156
    }
  },
  {
    id: 'exp-007',
    nombre: 'Testimonios - Video vs Texto con Foto',
    tipo: 'copy',
    hipotesis: 'Testimonios en video generarán mayor confianza y conversión que testimonios de texto con foto',
    fechaInicio: '2024-03-05',
    fechaFin: '2024-03-26',
    duracionDias: 21,
    variantes: [
      {
        id: 'var-007-a',
        nombre: 'Control - Texto + Foto',
        descripcion: 'Testimonios escritos con foto del cliente',
        visitantes: 8950,
        conversiones: 537,
        tasaConversion: 6.0,
        ingresoPromedio: 89.99
      },
      {
        id: 'var-007-b',
        nombre: 'Variante - Videos',
        descripcion: 'Testimonios en video de 30-45 segundos',
        visitantes: 8890,
        conversiones: 676,
        tasaConversion: 7.6,
        ingresoPromedio: 94.50
      }
    ],
    ganadora: 'var-007-b',
    mejora: 26.7,
    nivelConfianza: 96.5,
    estado: 'exitoso',
    implementacion: 'implementado',
    aprendizajes: [
      'Los videos generan mayor autenticidad y confianza',
      'Ver emociones reales en video crea conexión más fuerte',
      'Los usuarios pasan más tiempo en la página con videos (aumentó 45 segundos)',
      'La inversión en producción de videos se justifica por el ROI'
    ],
    impactoIngresos: 13132.20,
    segmentoAudiencia: 'Visitantes página principal',
    metricaPrincipal: 'Conversión después de ver testimonios',
    metricas: {
      tiempoEnPagina: 198,
      compartidos: 124
    }
  },
  {
    id: 'exp-008',
    nombre: 'Headline Segmentado - Hombres vs Mujeres',
    tipo: 'headline',
    hipotesis: 'Titulares segmentados por género ("Planes de fitness para mujeres" vs genérico) aumentarán la relevancia y conversión',
    fechaInicio: '2024-03-10',
    fechaFin: '2024-04-05',
    duracionDias: 26,
    variantes: [
      {
        id: 'var-008-a',
        nombre: 'Control - Genérico',
        descripcion: 'Alcanza tus objetivos de fitness',
        visitantes: 14560,
        conversiones: 728,
        tasaConversion: 5.0,
        ingresoPromedio: 89.99
      },
      {
        id: 'var-008-b',
        nombre: 'Variante - Segmentado Mujeres',
        descripcion: 'Planes de fitness diseñados para mujeres',
        visitantes: 7280,
        conversiones: 510,
        tasaConversion: 7.0,
        ingresoPromedio: 94.50
      },
      {
        id: 'var-008-c',
        nombre: 'Variante - Segmentado Hombres',
        descripcion: 'Entrena como un atleta profesional',
        visitantes: 7240,
        conversiones: 471,
        tasaConversion: 6.5,
        ingresoPromedio: 99.00
      }
    ],
    ganadora: 'var-008-b',
    mejora: 40.0,
    nivelConfianza: 98.2,
    estado: 'exitoso',
    implementacion: 'implementado',
    aprendizajes: [
      'La segmentación por género aumenta significativamente la relevancia percibida',
      'Las mujeres responden mejor a mensajes de empoderamiento y diseño específico',
      'Los hombres responden a mensajes de rendimiento y competitividad',
      'La personalización vale la inversión técnica de implementación'
    ],
    impactoIngresos: 48195.00,
    segmentoAudiencia: 'Usuarios segmentados por género',
    metricaPrincipal: 'Tasa de conversión',
    metricas: {
      tiempoEnPagina: 167
    }
  },
  {
    id: 'exp-009',
    nombre: 'Precio Anclaje - Mostrar vs Ocultar Precio Anual',
    tipo: 'precio',
    hipotesis: 'Mostrar el precio anual con descuento prominentemente anclará la percepción de valor y aumentará conversiones al plan mensual',
    fechaInicio: '2024-03-15',
    fechaFin: '2024-04-10',
    duracionDias: 26,
    variantes: [
      {
        id: 'var-009-a',
        nombre: 'Control - Solo Mensual',
        descripcion: 'Mostrar solo precio mensual $89',
        visitantes: 10340,
        conversiones: 517,
        tasaConversion: 5.0,
        ingresoPromedio: 89.00
      },
      {
        id: 'var-009-b',
        nombre: 'Variante - Anclaje Anual',
        descripcion: 'Mostrar anual $890 (ahorra $178) + mensual $89',
        visitantes: 10280,
        conversiones: 679,
        tasaConversion: 6.6,
        ingresoPromedio: 156.50
      }
    ],
    ganadora: 'var-009-b',
    mejora: 32.0,
    nivelConfianza: 97.9,
    estado: 'exitoso',
    implementacion: 'implementado',
    aprendizajes: [
      'El anclaje de precio funciona: el plan anual hace que el mensual parezca razonable',
      'El 35% de conversiones eligió el plan anual (inesperadamente alto)',
      'Mostrar el ahorro en dólares ($178) es más efectivo que en porcentaje',
      'El ingreso promedio por usuario aumentó significativamente'
    ],
    impactoIngresos: 106265.50,
    segmentoAudiencia: 'Todos los usuarios',
    metricaPrincipal: 'Conversión total y ingreso promedio',
    metricas: {
      tiempoEnPagina: 145
    }
  },
  {
    id: 'exp-010',
    nombre: 'Copy Beneficios - Características vs Resultados',
    tipo: 'copy',
    hipotesis: 'Describir beneficios como resultados tangibles ("Pierde 5kg en 30 días") convertirá mejor que características ("Plan nutricional personalizado")',
    fechaInicio: '2024-03-20',
    fechaFin: '2024-04-15',
    duracionDias: 26,
    variantes: [
      {
        id: 'var-010-a',
        nombre: 'Control - Características',
        descripcion: 'Lista de características del servicio',
        visitantes: 9560,
        conversiones: 478,
        tasaConversion: 5.0,
        ingresoPromedio: 89.99
      },
      {
        id: 'var-010-b',
        nombre: 'Variante - Resultados',
        descripcion: 'Resultados esperados con plazos específicos',
        visitantes: 9520,
        conversiones: 610,
        tasaConversion: 6.4,
        ingresoPromedio: 94.50
      }
    ],
    ganadora: 'var-010-b',
    mejora: 28.0,
    nivelConfianza: 96.8,
    estado: 'exitoso',
    implementacion: 'implementado',
    aprendizajes: [
      'Los usuarios compran resultados, no características',
      'Los plazos específicos (30 días, 90 días) generan expectativas claras',
      'Las promesas medibles aumentan la confianza en el producto',
      'Combinar resultado + plazo es la fórmula ganadora'
    ],
    impactoIngresos: 12474.50,
    segmentoAudiencia: 'Landing page de adquisición',
    metricaPrincipal: 'Conversión a registro',
    metricas: {
      tiempoEnPagina: 178,
      clicsBoton: 1456
    }
  },
  {
    id: 'exp-011',
    nombre: 'CTA Urgencia - Con vs Sin Contador de Tiempo',
    tipo: 'cta',
    hipotesis: 'Agregar un contador de tiempo limitado (Oferta termina en 2 horas) aumentará la urgencia y conversiones inmediatas',
    fechaInicio: '2024-04-01',
    fechaFin: '2024-04-20',
    duracionDias: 19,
    variantes: [
      {
        id: 'var-011-a',
        nombre: 'Control - Sin Urgencia',
        descripcion: 'CTA estándar sin indicación de tiempo',
        visitantes: 11230,
        conversiones: 562,
        tasaConversion: 5.0,
        ingresoPromedio: 89.99
      },
      {
        id: 'var-011-b',
        nombre: 'Variante - Contador 2h',
        descripcion: 'CTA con contador de 2 horas',
        visitantes: 11180,
        conversiones: 503,
        tasaConversion: 4.5,
        ingresoPromedio: 89.99
      }
    ],
    ganadora: 'var-011-a',
    mejora: -10.0,
    nivelConfianza: 92.5,
    estado: 'fallido',
    implementacion: 'descartado',
    aprendizajes: [
      'La urgencia artificial puede percibirse como manipuladora y reducir confianza',
      'Los usuarios reportaron (en encuestas) sentirse presionados negativamente',
      'Las tácticas de escasez deben ser genuinas para ser efectivas',
      'Nuestro público prefiere tomar decisiones informadas sin presión'
    ],
    impactoIngresos: 0,
    segmentoAudiencia: 'Visitantes nuevos',
    metricaPrincipal: 'Conversión inmediata',
    metricas: {
      rebote: 52.3,
      tiempoEnPagina: 95
    }
  },
  {
    id: 'exp-012',
    nombre: 'Imagen Antes/Después - Mostrar vs No Mostrar',
    tipo: 'imagen',
    hipotesis: 'Mostrar transformaciones antes/después de clientes reales aumentará la credibilidad y conversiones',
    fechaInicio: '2024-04-05',
    fechaFin: '2024-04-28',
    duracionDias: 23,
    variantes: [
      {
        id: 'var-012-a',
        nombre: 'Control - Sin Transformaciones',
        descripcion: 'Homepage sin fotos de transformación',
        visitantes: 13450,
        conversiones: 672,
        tasaConversion: 5.0,
        ingresoPromedio: 89.99
      },
      {
        id: 'var-012-b',
        nombre: 'Variante - Antes/Después',
        descripcion: 'Galería de 6 transformaciones reales',
        visitantes: 13390,
        conversiones: 938,
        tasaConversion: 7.0,
        ingresoPromedio: 94.50
      }
    ],
    ganadora: 'var-012-b',
    mejora: 40.0,
    nivelConfianza: 99.1,
    estado: 'exitoso',
    implementacion: 'implementado',
    aprendizajes: [
      'Las transformaciones reales son la prueba social más poderosa',
      'Los usuarios necesitan ver que el programa funciona antes de comprometerse',
      'Incluir variedad de cuerpos y edades aumenta la identificación',
      'Las fotos con fechas y métricas específicas generan más confianza'
    ],
    impactoIngresos: 25137.00,
    segmentoAudiencia: 'Visitantes homepage',
    metricaPrincipal: 'Conversión a registro',
    metricas: {
      tiempoEnPagina: 214,
      compartidos: 387
    }
  },
  {
    id: 'exp-013',
    nombre: 'Headline Especificidad - Genérico vs Numérico',
    tipo: 'headline',
    hipotesis: 'Un titular con datos específicos ("Únete a 50,000+ usuarios") será más persuasivo que uno genérico ("Únete a nuestra comunidad")',
    fechaInicio: '2024-04-10',
    fechaFin: '2024-05-02',
    duracionDias: 22,
    variantes: [
      {
        id: 'var-013-a',
        nombre: 'Control - Genérico',
        descripcion: 'Únete a nuestra comunidad',
        visitantes: 10120,
        conversiones: 506,
        tasaConversion: 5.0,
        ingresoPromedio: 89.99
      },
      {
        id: 'var-013-b',
        nombre: 'Variante - Numérico',
        descripcion: 'Únete a 50,000+ usuarios transformándose',
        visitantes: 10080,
        conversiones: 655,
        tasaConversion: 6.5,
        ingresoPromedio: 94.50
      }
    ],
    ganadora: 'var-013-b',
    mejora: 30.0,
    nivelConfianza: 97.3,
    estado: 'exitoso',
    implementacion: 'implementado',
    aprendizajes: [
      'Los números específicos aumentan la credibilidad percibida',
      'La prueba social cuantificada es más persuasiva que las afirmaciones genéricas',
      'El signo "+" sugiere crecimiento continuo',
      'Combinar número + verbo de acción ("transformándose") es más efectivo'
    ],
    impactoIngresos: 14073.95,
    segmentoAudiencia: 'Sección de registro',
    metricaPrincipal: 'Conversión a registro',
    metricas: {
      clicsBoton: 1567
    }
  },
  {
    id: 'exp-014',
    nombre: 'Layout Formulario - 1 Paso vs Multi-paso',
    tipo: 'layout',
    hipotesis: 'Un formulario multi-paso (3 pasos) reducirá la fricción percibida y aumentará conversiones vs formulario de 1 solo paso largo',
    fechaInicio: '2024-04-15',
    fechaFin: '2024-05-08',
    duracionDias: 23,
    variantes: [
      {
        id: 'var-014-a',
        nombre: 'Control - 1 Paso',
        descripcion: 'Formulario largo en una sola página',
        visitantes: 8940,
        conversiones: 447,
        tasaConversion: 5.0,
        ingresoPromedio: 89.99
      },
      {
        id: 'var-014-b',
        nombre: 'Variante - 3 Pasos',
        descripcion: 'Formulario dividido en 3 pasos con barra de progreso',
        visitantes: 8890,
        conversiones: 631,
        tasaConversion: 7.1,
        ingresoPromedio: 89.99
      }
    ],
    ganadora: 'var-014-b',
    mejora: 42.0,
    nivelConfianza: 98.7,
    estado: 'exitoso',
    implementacion: 'implementado',
    aprendizajes: [
      'Los formularios multi-paso parecen menos intimidantes',
      'La barra de progreso da sensación de avance y reduce abandono',
      'Pedir información gradualmente aumenta el compromiso progresivo',
      'Los usuarios completaron más campos en promedio con el formato multi-paso'
    ],
    impactoIngresos: 16549.69,
    segmentoAudiencia: 'Usuarios en proceso de registro',
    metricaPrincipal: 'Completación de formulario',
    metricas: {
      tiempoEnPagina: 245
    }
  },
  {
    id: 'exp-015',
    nombre: 'Precio Psicológico - $89 vs $87',
    tipo: 'precio',
    hipotesis: 'El precio $87 (terminado en 7) será percibido como mejor oferta que $89 debido a sesgos de precio psicológico',
    fechaInicio: '2024-04-20',
    fechaFin: '2024-05-10',
    duracionDias: 20,
    variantes: [
      {
        id: 'var-015-a',
        nombre: 'Control - $89',
        descripcion: 'Precio estándar $89.00',
        visitantes: 12560,
        conversiones: 628,
        tasaConversion: 5.0,
        ingresoPromedio: 89.00
      },
      {
        id: 'var-015-b',
        nombre: 'Variante - $87',
        descripcion: 'Precio optimizado $87.00',
        visitantes: 12520,
        conversiones: 626,
        tasaConversion: 5.0,
        ingresoPromedio: 87.00
      }
    ],
    ganadora: 'var-015-a',
    mejora: 0.0,
    nivelConfianza: 45.2,
    estado: 'inconcluso',
    implementacion: 'descartado',
    aprendizajes: [
      'La diferencia de $2 no fue suficientemente significativa para afectar comportamiento',
      'El precio psicológico funciona mejor con diferencias mayores ($89 vs $79)',
      'Nuestro público no mostró sensibilidad a cambios de precio menores',
      'El nivel de confianza bajo indica que necesitaríamos mucho más tráfico para resultados concluyentes'
    ],
    impactoIngresos: 0,
    segmentoAudiencia: 'Todos los usuarios',
    metricaPrincipal: 'Conversión y percepción de valor',
    metricas: {
      tiempoEnPagina: 142
    }
  },
  {
    id: 'exp-016',
    nombre: 'Copy Garantía - 30 días vs 60 días',
    tipo: 'copy',
    hipotesis: 'Extender la garantía de devolución de 30 a 60 días aumentará la confianza y reducirá la fricción de compra',
    fechaInicio: '2024-05-01',
    fechaFin: '2024-05-25',
    duracionDias: 24,
    variantes: [
      {
        id: 'var-016-a',
        nombre: 'Control - 30 días',
        descripcion: 'Garantía de devolución 30 días',
        visitantes: 11340,
        conversiones: 567,
        tasaConversion: 5.0,
        ingresoPromedio: 89.99
      },
      {
        id: 'var-016-b',
        nombre: 'Variante - 60 días',
        descripcion: 'Garantía de devolución 60 días',
        visitantes: 11290,
        conversiones: 734,
        tasaConversion: 6.5,
        ingresoPromedio: 89.99
      }
    ],
    ganadora: 'var-016-b',
    mejora: 30.0,
    nivelConfianza: 97.5,
    estado: 'exitoso',
    implementacion: 'implementado',
    aprendizajes: [
      'Una garantía más larga señala mayor confianza en el producto',
      'Los usuarios se sienten más seguros con más tiempo para evaluar',
      'Las devoluciones reales solo aumentaron 0.8% (de 2.1% a 2.9%)',
      'El beneficio en conversiones superó ampliamente el costo de devoluciones adicionales'
    ],
    impactoIngresos: 15028.33,
    segmentoAudiencia: 'Usuarios en página de checkout',
    metricaPrincipal: 'Conversión final',
    metricas: {
      tiempoEnPagina: 167
    }
  },
  {
    id: 'exp-017',
    nombre: 'CTA Posicionamiento - Above Fold vs Below Fold',
    tipo: 'layout',
    hipotesis: 'Un CTA duplicado both above y below the fold aumentará conversiones vs solo above the fold',
    fechaInicio: '2024-05-05',
    fechaFin: '2024-05-27',
    duracionDias: 22,
    variantes: [
      {
        id: 'var-017-a',
        nombre: 'Control - Solo Above',
        descripcion: 'CTA solo en hero section',
        visitantes: 9870,
        conversiones: 494,
        tasaConversion: 5.0,
        ingresoPromedio: 89.99
      },
      {
        id: 'var-017-b',
        nombre: 'Variante - Duplicado',
        descripcion: 'CTA en hero + después de beneficios + footer',
        visitantes: 9830,
        conversiones: 688,
        tasaConversion: 7.0,
        ingresoPromedio: 89.99
      }
    ],
    ganadora: 'var-017-b',
    mejora: 40.0,
    nivelConfianza: 98.4,
    estado: 'exitoso',
    implementacion: 'implementado',
    aprendizajes: [
      'Los usuarios necesitan múltiples oportunidades para convertir',
      'Diferentes puntos de conversión capturan usuarios en diferentes estados de decisión',
      '38% de conversiones vinieron del CTA después de leer beneficios',
      'El CTA del footer capturó 15% de conversiones (usuarios más analíticos)'
    ],
    impactoIngresos: 17453.06,
    segmentoAudiencia: 'Todos los visitantes de landing',
    metricaPrincipal: 'Conversión total',
    metricas: {
      clicsBoton: 2134,
      tiempoEnPagina: 189
    }
  },
  {
    id: 'exp-018',
    nombre: 'Color Esquema - Azul Confianza vs Verde Salud',
    tipo: 'color',
    hipotesis: 'Un esquema de color verde (asociado con salud y naturaleza) convertirá mejor que el azul actual (asociado con confianza y tecnología)',
    fechaInicio: '2024-05-10',
    fechaFin: '2024-06-01',
    duracionDias: 22,
    variantes: [
      {
        id: 'var-018-a',
        nombre: 'Control - Azul',
        descripcion: 'Esquema azul #2563eb',
        visitantes: 14230,
        conversiones: 712,
        tasaConversion: 5.0,
        ingresoPromedio: 89.99
      },
      {
        id: 'var-018-b',
        nombre: 'Variante - Verde',
        descripcion: 'Esquema verde #059669',
        visitantes: 14180,
        conversiones: 638,
        tasaConversion: 4.5,
        ingresoPromedio: 89.99
      }
    ],
    ganadora: 'var-018-a',
    mejora: -10.0,
    nivelConfianza: 93.8,
    estado: 'fallido',
    implementacion: 'descartado',
    aprendizajes: [
      'El azul genera más confianza en contexto SaaS/tecnología',
      'Los usuarios están acostumbrados a ver azul en plataformas digitales',
      'El verde puede asociarse con "amateur" o menos profesional en este contexto',
      'La consistencia con expectativas de industria importa más que la asociación conceptual'
    ],
    impactoIngresos: 0,
    segmentoAudiencia: 'Todos los usuarios',
    metricaPrincipal: 'Conversión general',
    metricas: {
      rebote: 46.2,
      tiempoEnPagina: 138
    }
  },
  {
    id: 'exp-019',
    nombre: 'Headline Pregunta - Afirmación vs Pregunta',
    tipo: 'headline',
    hipotesis: 'Un titular en forma de pregunta ("¿Listo para transformar tu cuerpo?") generará más engagement que una afirmación',
    fechaInicio: '2024-05-15',
    fechaFin: '2024-06-06',
    duracionDias: 22,
    variantes: [
      {
        id: 'var-019-a',
        nombre: 'Control - Afirmación',
        descripcion: 'Transforma tu cuerpo en 90 días',
        visitantes: 10560,
        conversiones: 528,
        tasaConversion: 5.0,
        ingresoPromedio: 89.99
      },
      {
        id: 'var-019-b',
        nombre: 'Variante - Pregunta',
        descripcion: '¿Listo para transformar tu cuerpo en 90 días?',
        visitantes: 10520,
        conversiones: 484,
        tasaConversion: 4.6,
        ingresoPromedio: 89.99
      }
    ],
    ganadora: 'var-019-a',
    mejora: -8.0,
    nivelConfianza: 88.5,
    estado: 'fallido',
    implementacion: 'descartado',
    aprendizajes: [
      'Las afirmaciones directas son más persuasivas que preguntas en este contexto',
      'Las preguntas pueden crear duda en lugar de motivación',
      'Los usuarios prefieren promesas directas sobre cuestionamientos',
      'Las preguntas funcionan mejor en contenido educativo, no en ventas'
    ],
    impactoIngresos: 0,
    segmentoAudiencia: 'Hero section homepage',
    metricaPrincipal: 'Engagement y conversión',
    metricas: {
      tiempoEnPagina: 134,
      rebote: 44.7
    }
  },
  {
    id: 'exp-020',
    nombre: 'Imagen Social Proof - Logos vs Avatares',
    tipo: 'imagen',
    hipotesis: 'Mostrar avatares de usuarios reales generará más conexión que logos de empresas/medios',
    fechaInicio: '2024-05-20',
    fechaFin: '2024-06-12',
    duracionDias: 23,
    variantes: [
      {
        id: 'var-020-a',
        nombre: 'Control - Logos Medios',
        descripcion: 'Logos de Forbes, TechCrunch, etc.',
        visitantes: 11240,
        conversiones: 562,
        tasaConversion: 5.0,
        ingresoPromedio: 89.99
      },
      {
        id: 'var-020-b',
        nombre: 'Variante - Avatares Usuarios',
        descripcion: 'Grid de 50+ fotos de usuarios reales',
        visitantes: 11190,
        conversiones: 727,
        tasaConversion: 6.5,
        ingresoPromedio: 94.50
      }
    ],
    ganadora: 'var-020-b',
    mejora: 30.0,
    nivelConfianza: 97.6,
    estado: 'exitoso',
    implementacion: 'implementado',
    aprendizajes: [
      'Los usuarios reales generan más identificación que validación de medios',
      'Ver "gente como yo" es más persuasivo que reconocimiento corporativo',
      'La diversidad de avatares (edad, género, etnia) aumentó la inclusividad percibida',
      'Combinar ambos tipos de prueba social podría ser óptimo'
    ],
    impactoIngresos: 15593.55,
    segmentoAudiencia: 'Sección de prueba social',
    metricaPrincipal: 'Conversión',
    metricas: {
      tiempoEnPagina: 156,
      compartidos: 234
    }
  },
  {
    id: 'exp-021',
    nombre: 'CTA Wording - Primera vs Segunda Persona',
    tipo: 'cta',
    hipotesis: 'CTA en primera persona ("Quiero empezar ahora") convertirá mejor que segunda persona ("Empieza ahora") por mayor agencia',
    fechaInicio: '2024-05-25',
    fechaFin: '2024-06-16',
    duracionDias: 22,
    variantes: [
      {
        id: 'var-021-a',
        nombre: 'Control - Segunda Persona',
        descripcion: 'Empieza ahora',
        visitantes: 9680,
        conversiones: 484,
        tasaConversion: 5.0,
        ingresoPromedio: 89.99
      },
      {
        id: 'var-021-b',
        nombre: 'Variante - Primera Persona',
        descripcion: 'Quiero empezar ahora',
        visitantes: 9640,
        conversiones: 598,
        tasaConversion: 6.2,
        ingresoPromedio: 94.50
      }
    ],
    ganadora: 'var-021-b',
    mejora: 24.0,
    nivelConfianza: 96.2,
    estado: 'exitoso',
    implementacion: 'implementado',
    aprendizajes: [
      'La primera persona crea un compromiso psicológico más fuerte',
      'Los usuarios expresan su propia voluntad en lugar de seguir instrucciones',
      'El lenguaje en primera persona aumenta la sensación de control',
      'Funciona especialmente bien para decisiones de cambio personal'
    ],
    impactoIngresos: 10769.10,
    segmentoAudiencia: 'CTA principal',
    metricaPrincipal: 'Clics y conversión',
    metricas: {
      clicsBoton: 1789
    }
  },
  {
    id: 'exp-022',
    nombre: 'Layout Beneficios - Lista vs Grid Visual',
    tipo: 'layout',
    hipotesis: 'Presentar beneficios en grid visual con íconos será más efectivo que lista de texto simple',
    fechaInicio: '2024-06-01',
    fechaFin: '2024-06-24',
    duracionDias: 23,
    variantes: [
      {
        id: 'var-022-a',
        nombre: 'Control - Lista Texto',
        descripcion: 'Lista vertical con bullets de texto',
        visitantes: 12340,
        conversiones: 617,
        tasaConversion: 5.0,
        ingresoPromedio: 89.99
      },
      {
        id: 'var-022-b',
        nombre: 'Variante - Grid Visual',
        descripcion: 'Grid 3x2 con íconos y texto corto',
        visitantes: 12290,
        conversiones: 811,
        tasaConversion: 6.6,
        ingresoPromedio: 94.50
      }
    ],
    ganadora: 'var-022-b',
    mejora: 32.0,
    nivelConfianza: 98.0,
    estado: 'exitoso',
    implementacion: 'implementado',
    aprendizajes: [
      'Los elementos visuales mejoran la escaneabilidad y retención',
      'Los íconos comunican beneficios más rápidamente que solo texto',
      'El grid organizado reduce la carga cognitiva',
      'Los usuarios pasaron más tiempo explorando beneficios con formato visual'
    ],
    impactoIngresos: 18334.20,
    segmentoAudiencia: 'Sección de beneficios',
    metricaPrincipal: 'Conversión',
    metricas: {
      tiempoEnPagina: 198,
      clicsBoton: 1923
    }
  },
  {
    id: 'exp-023',
    nombre: 'Precio Descuento - Porcentaje vs Ahorro en Dólares',
    tipo: 'precio',
    hipotesis: 'Mostrar descuento en dólares ("Ahorra $30") será más efectivo que porcentaje ("Ahorra 25%") para plan premium',
    fechaInicio: '2024-06-05',
    fechaFin: '2024-06-27',
    duracionDias: 22,
    variantes: [
      {
        id: 'var-023-a',
        nombre: 'Control - Porcentaje',
        descripcion: 'Ahorra 25% en plan anual',
        visitantes: 8760,
        conversiones: 438,
        tasaConversion: 5.0,
        ingresoPromedio: 890.00
      },
      {
        id: 'var-023-b',
        nombre: 'Variante - Dólares',
        descripcion: 'Ahorra $267 en plan anual',
        visitantes: 8730,
        conversiones: 593,
        tasaConversion: 6.8,
        ingresoPromedio: 890.00
      }
    ],
    ganadora: 'var-023-b',
    mejora: 36.0,
    nivelConfianza: 98.3,
    estado: 'exitoso',
    implementacion: 'implementado',
    aprendizajes: [
      'Los dólares concretos tienen mayor impacto psicológico que porcentajes',
      'Los usuarios procesan mejor números absolutos que relativos',
      'Funciona especialmente bien con tickets altos donde el ahorro es significativo',
      'Para productos de bajo costo, los porcentajes pueden funcionar mejor'
    ],
    impactoIngresos: 137970.00,
    segmentoAudiencia: 'Usuarios considerando plan anual',
    metricaPrincipal: 'Conversión a plan anual',
    metricas: {
      tiempoEnPagina: 176
    }
  },
  {
    id: 'exp-024',
    nombre: 'Copy Email Bienvenida - Educacional vs Promocional',
    tipo: 'copy',
    hipotesis: 'Un email de bienvenida educacional (cómo empezar) activará más usuarios que uno promocional (descuentos)',
    fechaInicio: '2024-06-10',
    fechaFin: '2024-07-02',
    duracionDias: 22,
    variantes: [
      {
        id: 'var-024-a',
        nombre: 'Control - Promocional',
        descripcion: 'Email con oferta 20% descuento',
        visitantes: 5420,
        conversiones: 271,
        tasaConversion: 5.0,
        ingresoPromedio: 71.99
      },
      {
        id: 'var-024-b',
        nombre: 'Variante - Educacional',
        descripcion: 'Email con guía de primeros pasos',
        visitantes: 5390,
        conversiones: 377,
        tasaConversion: 7.0,
        ingresoPromedio: 89.99
      }
    ],
    ganadora: 'var-024-b',
    mejora: 40.0,
    nivelConfianza: 97.8,
    estado: 'exitoso',
    implementacion: 'implementado',
    aprendizajes: [
      'Los usuarios nuevos valoran más la orientación que los descuentos inmediatos',
      'Reducir fricción de onboarding es más efectivo que reducir precio',
      'El contenido educacional genera mayor engagement y retención',
      'Los usuarios activados correctamente tienen mayor LTV'
    ],
    impactoIngresos: 33916.23,
    segmentoAudiencia: 'Nuevos registros',
    metricaPrincipal: 'Activación dentro de 7 días',
    metricas: {
      tiempoEnPagina: 234
    }
  },
  {
    id: 'exp-025',
    nombre: 'Headline Emocional - Dolor vs Aspiración',
    tipo: 'headline',
    hipotesis: 'Un titular enfocado en dolor ("Cansado de dietas que no funcionan?") convertirá mejor que aspiración positiva',
    fechaInicio: '2024-06-15',
    fechaFin: '2024-07-07',
    duracionDias: 22,
    variantes: [
      {
        id: 'var-025-a',
        nombre: 'Control - Aspiración',
        descripcion: 'Alcanza el cuerpo que siempre soñaste',
        visitantes: 11450,
        conversiones: 573,
        tasaConversion: 5.0,
        ingresoPromedio: 89.99
      },
      {
        id: 'var-025-b',
        nombre: 'Variante - Dolor',
        descripcion: '¿Cansado de dietas que no funcionan?',
        visitantes: 11410,
        conversiones: 513,
        tasaConversion: 4.5,
        ingresoPromedio: 89.99
      }
    ],
    ganadora: 'var-025-a',
    mejora: -10.0,
    nivelConfianza: 91.7,
    estado: 'fallido',
    implementacion: 'descartado',
    aprendizajes: [
      'El mensaje aspiracional funciona mejor que enfocarse en dolor en este mercado',
      'Los usuarios buscan soluciones positivas, no recordatorios de fracasos',
      'El tono negativo puede alejar a usuarios en etapa de consideración',
      'La motivación positiva genera mejor engagement que el miedo o frustración'
    ],
    impactoIngresos: 0,
    segmentoAudiencia: 'Landing page adquisición',
    metricaPrincipal: 'Conversión',
    metricas: {
      rebote: 49.3,
      tiempoEnPagina: 112
    }
  },
  {
    id: 'exp-026',
    nombre: 'CTA Especificidad - Genérico vs Específico',
    tipo: 'cta',
    hipotesis: 'Un CTA específico ("Crea mi plan personalizado") convertirá mejor que genérico ("Registrarse")',
    fechaInicio: '2024-06-20',
    fechaFin: '2024-07-12',
    duracionDias: 22,
    variantes: [
      {
        id: 'var-026-a',
        nombre: 'Control - Genérico',
        descripcion: 'Registrarse',
        visitantes: 10230,
        conversiones: 512,
        tasaConversion: 5.0,
        ingresoPromedio: 89.99
      },
      {
        id: 'var-026-b',
        nombre: 'Variante - Específico',
        descripcion: 'Crea mi plan personalizado',
        visitantes: 10190,
        conversiones: 713,
        tasaConversion: 7.0,
        ingresoPromedio: 94.50
      }
    ],
    ganadora: 'var-026-b',
    mejora: 40.0,
    nivelConfianza: 98.6,
    estado: 'exitoso',
    implementacion: 'implementado',
    aprendizajes: [
      'Los CTAs específicos comunican valor inmediato',
      'Los usuarios entienden mejor qué van a recibir',
      'La palabra "personalizado" resuena fuertemente con nuestro público',
      'La especificidad reduce la incertidumbre y fricción'
    ],
    impactoIngresos: 18999.35,
    segmentoAudiencia: 'CTA principal de conversión',
    metricaPrincipal: 'Conversión',
    metricas: {
      clicsBoton: 2145,
      tiempoEnPagina: 167
    }
  },
  {
    id: 'exp-027',
    nombre: 'Layout Mobile - Hamburger Menu vs Bottom Nav',
    tipo: 'layout',
    hipotesis: 'Una navegación bottom bar en móvil será más accesible y aumentará engagement vs hamburger menu tradicional',
    fechaInicio: '2024-06-25',
    fechaFin: '2024-07-17',
    duracionDias: 22,
    variantes: [
      {
        id: 'var-027-a',
        nombre: 'Control - Hamburger',
        descripcion: 'Menú hamburguesa superior',
        visitantes: 18450,
        conversiones: 923,
        tasaConversion: 5.0,
        ingresoPromedio: 89.99
      },
      {
        id: 'var-027-b',
        nombre: 'Variante - Bottom Nav',
        descripcion: 'Barra de navegación inferior fija',
        visitantes: 18390,
        conversiones: 1267,
        tasaConversion: 6.9,
        ingresoPromedio: 94.50
      }
    ],
    ganadora: 'var-027-b',
    mejora: 38.0,
    nivelConfianza: 99.0,
    estado: 'exitoso',
    implementacion: 'implementado',
    aprendizajes: [
      'La navegación inferior es más accesible para pulgares en pantallas grandes',
      'Los usuarios móviles exploran más secciones con bottom nav (2.3 vs 1.6 páginas)',
      'La visibilidad constante de opciones reduce fricción de navegación',
      'El engagement móvil aumentó significativamente'
    ],
    impactoIngresos: 32541.15,
    segmentoAudiencia: 'Usuarios móviles (68% del tráfico)',
    metricaPrincipal: 'Conversión móvil',
    metricas: {
      tiempoEnPagina: 203,
      clicsBoton: 3456
    }
  },
  {
    id: 'exp-028',
    nombre: 'Imagen Video Explicativo - Con vs Sin',
    tipo: 'imagen',
    hipotesis: 'Agregar un video explicativo de 60 segundos aumentará comprensión del producto y conversiones',
    fechaInicio: '2024-07-01',
    fechaFin: '2024-07-23',
    duracionDias: 22,
    variantes: [
      {
        id: 'var-028-a',
        nombre: 'Control - Sin Video',
        descripcion: 'Homepage sin video explicativo',
        visitantes: 13560,
        conversiones: 678,
        tasaConversion: 5.0,
        ingresoPromedio: 89.99
      },
      {
        id: 'var-028-b',
        nombre: 'Variante - Con Video',
        descripcion: 'Video de 60seg explicando funcionamiento',
        visitantes: 13520,
        conversiones: 894,
        tasaConversion: 6.6,
        ingresoPromedio: 94.50
      }
    ],
    ganadora: 'var-028-b',
    mejora: 32.0,
    nivelConfianza: 98.1,
    estado: 'exitoso',
    implementacion: 'implementado',
    aprendizajes: [
      'El video aumentó el tiempo en página en promedio 90 segundos',
      '67% de visitantes vieron al menos 30 segundos del video',
      'Los usuarios que vieron el video completo convirtieron a 9.2%',
      'El video reduce preguntas frecuentes y mejora la comprensión del producto'
    ],
    impactoIngresos: 20412.00,
    segmentoAudiencia: 'Visitantes homepage',
    metricaPrincipal: 'Conversión',
    metricas: {
      tiempoEnPagina: 267,
      compartidos: 456
    }
  },
  {
    id: 'exp-029',
    nombre: 'Copy Propuesta Valor - Características vs Transformación',
    tipo: 'copy',
    hipotesis: 'Enfocarse en la transformación del usuario ("De sedentario a atleta en 6 meses") será más persuasivo que listar características',
    fechaInicio: '2024-07-05',
    fechaFin: '2024-07-27',
    duracionDias: 22,
    variantes: [
      {
        id: 'var-029-a',
        nombre: 'Control - Características',
        descripcion: 'Lista de features: planes, seguimiento, nutrición',
        visitantes: 10890,
        conversiones: 545,
        tasaConversion: 5.0,
        ingresoPromedio: 89.99
      },
      {
        id: 'var-029-b',
        nombre: 'Variante - Transformación',
        descripcion: 'Historia de transformación paso a paso',
        visitantes: 10850,
        conversiones: 759,
        tasaConversion: 7.0,
        ingresoPromedio: 99.00
      }
    ],
    ganadora: 'var-029-b',
    mejora: 40.0,
    nivelConfianza: 98.7,
    estado: 'exitoso',
    implementacion: 'implementado',
    aprendizajes: [
      'Los usuarios compran transformaciones, no características',
      'El storytelling de transformación genera conexión emocional más fuerte',
      'Mostrar el journey completo reduce incertidumbre sobre el proceso',
      'Los usuarios se visualizan a sí mismos en la historia de transformación'
    ],
    impactoIngresos: 75141.00,
    segmentoAudiencia: 'Sección de propuesta de valor',
    metricaPrincipal: 'Conversión',
    metricas: {
      tiempoEnPagina: 245,
      compartidos: 389
    }
  },
  {
    id: 'exp-030',
    nombre: 'Precio Plan Freemium - 7 días vs 14 días Trial',
    tipo: 'precio',
    hipotesis: 'Extender el trial gratuito de 7 a 14 días permitirá a usuarios experimentar más valor y aumentará conversiones a pago',
    fechaInicio: '2024-07-10',
    fechaFin: '2024-08-01',
    duracionDias: 22,
    variantes: [
      {
        id: 'var-030-a',
        nombre: 'Control - 7 días',
        descripcion: 'Trial gratuito de 7 días',
        visitantes: 15670,
        conversiones: 784,
        tasaConversion: 5.0,
        ingresoPromedio: 89.99
      },
      {
        id: 'var-030-b',
        nombre: 'Variante - 14 días',
        descripcion: 'Trial gratuito de 14 días',
        visitantes: 15630,
        conversiones: 1095,
        tasaConversion: 7.0,
        ingresoPromedio: 94.50
      }
    ],
    ganadora: 'var-030-b',
    mejora: 40.0,
    nivelConfianza: 99.3,
    estado: 'exitoso',
    implementacion: 'implementado',
    aprendizajes: [
      '14 días permite completar al menos 2 semanas de plan (ciclo mínimo significativo)',
      'Los usuarios experimentan resultados iniciales en 14 días, aumentando compromiso',
      'La tasa de conversión de trial a pago aumentó de 42% a 58%',
      'El tiempo adicional genera hábito y reduce fricción de cancelación'
    ],
    impactoIngresos: 103477.50,
    segmentoAudiencia: 'Nuevos usuarios registrados',
    metricaPrincipal: 'Conversión trial a pago',
    metricas: {
      tiempoEnPagina: 189
    }
  }
];

// Función para calcular estadísticas generales
export function calcularEstadisticasGenerales(): EstadisticasGenerales {
  const total = experimentosHistoricos.length;
  const exitosos = experimentosHistoricos.filter(e => e.estado === 'exitoso').length;
  const fallidos = experimentosHistoricos.filter(e => e.estado === 'fallido').length;
  const inconclusos = experimentosHistoricos.filter(e => e.estado === 'inconcluso').length;

  const experimentosConMejora = experimentosHistoricos.filter(e => e.estado === 'exitoso');
  const mejoraPromedio = experimentosConMejora.length > 0
    ? experimentosConMejora.reduce((sum, e) => sum + e.mejora, 0) / experimentosConMejora.length
    : 0;

  const ingresosTotales = experimentosHistoricos
    .filter(e => e.impactoIngresos)
    .reduce((sum, e) => sum + (e.impactoIngresos || 0), 0);

  const implementados = experimentosHistoricos.filter(e => e.implementacion === 'implementado').length;

  const experimentosPorTipo = experimentosHistoricos.reduce((acc, exp) => {
    acc[exp.tipo] = (acc[exp.tipo] || 0) + 1;
    return acc;
  }, {} as { [key: string]: number });

  // Calcular tipo más exitoso
  const tiposExito = experimentosHistoricos
    .filter(e => e.estado === 'exitoso')
    .reduce((acc, exp) => {
      acc[exp.tipo] = (acc[exp.tipo] || 0) + 1;
      return acc;
    }, {} as { [key: string]: number });

  const tipoMasExitoso = Object.entries(tiposExito)
    .sort(([, a], [, b]) => b - a)[0]?.[0] || 'N/A';

  const duracionPromedio = experimentosHistoricos.reduce((sum, e) => sum + e.duracionDias, 0) / total;

  return {
    totalExperimentos: total,
    experimentosExitosos: exitosos,
    experimentosFallidos: fallidos,
    experimentosInconclusos: inconclusos,
    tasaExito: (exitosos / total) * 100,
    mejoraPromedio,
    ingresosTotalesGenerados: ingresosTotales,
    experimentosImplementados: implementados,
    experimentosPorTipo,
    tipoMasExitoso,
    duracionPromedio
  };
}

// Biblioteca de Insights - Patrones ganadores identificados
export const bibliotecaInsights: InsightBiblioteca[] = [
  {
    categoria: 'Headlines',
    patrones: [
      {
        patron: 'Beneficios emocionales con plazos específicos',
        efectividad: 95,
        experimentos: ['exp-001', 'exp-010', 'exp-029'],
        recomendacion: 'Usa promesas de transformación con números concretos (ej: "Transforma tu cuerpo en 90 días"). Evita lenguaje técnico.'
      },
      {
        patron: 'Datos numéricos y prueba social cuantificada',
        efectividad: 88,
        experimentos: ['exp-013'],
        recomendacion: 'Incluye números específicos de usuarios o resultados (ej: "Únete a 50,000+ usuarios"). El signo "+" sugiere crecimiento.'
      },
      {
        patron: 'Afirmaciones directas sobre preguntas',
        efectividad: 82,
        experimentos: ['exp-019'],
        recomendacion: 'Prefiere afirmaciones positivas sobre preguntas que puedan generar duda. Las promesas directas son más persuasivas.'
      },
      {
        patron: 'Mensajes aspiracionales sobre enfoque en dolor',
        efectividad: 85,
        experimentos: ['exp-025'],
        recomendacion: 'Enfócate en aspiraciones positivas en lugar de recordar fracasos o dolores. La motivación positiva genera mejor engagement.'
      }
    ]
  },
  {
    categoria: 'CTAs',
    patrones: [
      {
        patron: 'Especificidad sobre genericidad',
        efectividad: 93,
        experimentos: ['exp-026'],
        recomendacion: 'Usa CTAs específicos que comuniquen valor inmediato (ej: "Crea mi plan personalizado" vs "Registrarse").'
      },
      {
        patron: 'Primera persona sobre segunda persona',
        efectividad: 87,
        experimentos: ['exp-021'],
        recomendacion: 'Los CTAs en primera persona ("Quiero empezar") crean compromiso psicológico más fuerte que imperativos.'
      },
      {
        patron: 'Beneficio tangible sobre aspiracional en etapa temprana',
        efectividad: 84,
        experimentos: ['exp-005'],
        recomendacion: 'En etapa de consideración, "Gratis" supera a promesas aspiracionales. Usa beneficios tangibles para reducir fricción inicial.'
      },
      {
        patron: 'Evitar urgencia artificial',
        efectividad: 78,
        experimentos: ['exp-011'],
        recomendacion: 'Los contadores de tiempo pueden percibirse como manipuladores. Usa urgencia solo si es genuina.'
      },
      {
        patron: 'Múltiples puntos de conversión',
        efectividad: 91,
        experimentos: ['exp-017'],
        recomendacion: 'Coloca CTAs en múltiples ubicaciones (hero, después de beneficios, footer) para capturar usuarios en diferentes estados de decisión.'
      }
    ]
  },
  {
    categoria: 'Pricing',
    patrones: [
      {
        patron: 'Puntos de precio psicológicos significativos',
        efectividad: 94,
        experimentos: ['exp-003'],
        recomendacion: 'La barrera de $50 es real. Considera precios bajo $50 para planes de entrada ($49 vs $79 mostró 60% mejora).'
      },
      {
        patron: 'Anclaje de precio con planes anuales',
        efectividad: 89,
        experimentos: ['exp-009'],
        recomendacion: 'Muestra el plan anual con ahorro destacado para anclar percepción de valor. Aumenta conversiones y ticket promedio.'
      },
      {
        patron: 'Ahorro en dólares sobre porcentaje',
        efectividad: 92,
        experimentos: ['exp-023'],
        recomendacion: 'Para tickets altos, muestra ahorro en dólares ($267) en lugar de porcentaje (25%). Mayor impacto psicológico.'
      },
      {
        patron: 'Menos opciones, menos parálisis',
        efectividad: 88,
        experimentos: ['exp-006'],
        recomendacion: 'Reduce opciones de planes de 4 a 3. La eliminación de opciones intermedias empuja hacia planes premium.'
      },
      {
        patron: 'Trials extendidos para productos complejos',
        efectividad: 95,
        experimentos: ['exp-030'],
        recomendacion: 'Extiende trials de 7 a 14 días para permitir experimentar valor real. Aumenta conversión trial-a-pago significativamente.'
      }
    ]
  },
  {
    categoria: 'Visual y Design',
    patrones: [
      {
        patron: 'Transformaciones antes/después',
        efectividad: 96,
        experimentos: ['exp-012'],
        recomendacion: 'Muestra transformaciones reales de clientes con fechas y métricas. La prueba social más poderosa para fitness.'
      },
      {
        patron: 'Testimonios en video sobre texto',
        efectividad: 88,
        experimentos: ['exp-007'],
        recomendacion: 'Invierte en videos de testimonio de 30-45 segundos. Generan mayor autenticidad y conexión emocional.'
      },
      {
        patron: 'Ilustraciones sobre fotos intimidantes',
        efectividad: 81,
        experimentos: ['exp-004'],
        recomendacion: 'Para usuarios principiantes, las ilustraciones generan menos intimidación que fotos de personas muy fit.'
      },
      {
        patron: 'Avatares de usuarios sobre logos corporativos',
        efectividad: 88,
        experimentos: ['exp-020'],
        recomendacion: 'Muestra usuarios reales diversos en lugar de logos de medios. "Gente como yo" es más persuasivo.'
      },
      {
        patron: 'Videos explicativos de producto',
        efectividad: 89,
        experimentos: ['exp-028'],
        recomendacion: 'Agrega video de 60 segundos explicando funcionamiento. Aumenta comprensión y reduce fricción.'
      },
      {
        patron: 'Grid visual sobre listas de texto',
        efectividad: 89,
        experimentos: ['exp-022'],
        recomendacion: 'Presenta beneficios en grid con íconos. Mejora escaneabilidad y retención vs listas de texto.'
      }
    ]
  },
  {
    categoria: 'UX y Layout',
    patrones: [
      {
        patron: 'Formularios multi-paso sobre single-step',
        efectividad: 93,
        experimentos: ['exp-014'],
        recomendacion: 'Divide formularios largos en 3 pasos con barra de progreso. Reduce fricción percibida y aumenta completación.'
      },
      {
        patron: 'Navegación bottom bar en móvil',
        efectividad: 92,
        experimentos: ['exp-027'],
        recomendacion: 'Usa bottom navigation en móvil para mejor accesibilidad. Aumenta engagement y conversión móvil significativamente.'
      },
      {
        patron: 'Garantías extendidas',
        efectividad: 88,
        experimentos: ['exp-016'],
        recomendacion: 'Extiende garantías de 30 a 60 días. Señala confianza en producto con mínimo aumento en devoluciones reales.'
      }
    ]
  },
  {
    categoria: 'Copy y Messaging',
    patrones: [
      {
        patron: 'Resultados medibles sobre características',
        efectividad: 91,
        experimentos: ['exp-010'],
        recomendacion: 'Describe beneficios como resultados tangibles con plazos ("Pierde 5kg en 30 días") vs características técnicas.'
      },
      {
        patron: 'Transformación sobre características',
        efectividad: 94,
        experimentos: ['exp-029'],
        recomendacion: 'Cuenta historias de transformación paso a paso. Los usuarios compran transformaciones, no features.'
      },
      {
        patron: 'Contenido educacional sobre promocional en onboarding',
        efectividad: 91,
        experimentos: ['exp-024'],
        recomendacion: 'En emails de bienvenida, prioriza educación (cómo empezar) sobre descuentos. Aumenta activación y LTV.'
      },
      {
        patron: 'Segmentación por audiencia',
        efectividad: 93,
        experimentos: ['exp-008'],
        recomendacion: 'Personaliza mensajes por género/segmento cuando sea relevante. La relevancia aumenta conversión significativamente.'
      }
    ]
  },
  {
    categoria: 'Color',
    patrones: [
      {
        patron: 'Naranja para CTAs de acción',
        efectividad: 90,
        experimentos: ['exp-002'],
        recomendacion: 'Usa naranja (#ff6b35) para botones CTA. Genera urgencia y se alinea con energía/motivación de fitness.'
      },
      {
        patron: 'Azul para esquema general de confianza',
        efectividad: 85,
        experimentos: ['exp-018'],
        recomendacion: 'Mantén esquema azul para plataforma SaaS. Genera más confianza que verde en contexto tecnológico.'
      }
    ]
  }
];

// Exportar todo
export default {
  experimentosHistoricos,
  calcularEstadisticasGenerales,
  bibliotecaInsights
};
