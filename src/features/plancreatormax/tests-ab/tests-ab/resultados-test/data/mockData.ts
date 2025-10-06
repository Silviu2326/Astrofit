export interface Variant {
  id: string;
  name: string;
  visitors: number;
  conversions: number;
  conversionRate: number;
  revenue: number;
  trafficShare: number;
  significance: number;
  isControl: boolean;
  confidenceInterval: [number, number];
}

export interface TimeSeriesDataPoint {
  day: string;
  [key: string]: number | string;
}

export interface Recommendation {
  type: 'success' | 'warning' | 'info';
  title: string;
  description: string;
  action?: string;
}

export interface Experiment {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'completed';
  duration: number;
  totalTraffic: number;
  confidence: number;
  pValue: number;
  requiredSampleSize: number;
  variants: Variant[];
  timeSeriesData: TimeSeriesDataPoint[];
  recommendations: Recommendation[];
}

export interface SegmentData {
  device: {
    mobile: { [key: string]: number };
    desktop: { [key: string]: number };
    tablet: { [key: string]: number };
  };
  location: {
    [country: string]: { [key: string]: number };
  };
  timeOfDay: {
    [hour: string]: { [key: string]: number };
  };
  dayOfWeek: {
    [day: string]: { [key: string]: number };
  };
  trafficSource: {
    [source: string]: { [key: string]: number };
  };
}

// Experimento 1: Alta significancia - Ganador claro
export const experiment1: Experiment = {
  id: 'exp-001',
  name: 'CTA Button Color Test',
  description: 'Comparación de colores de botón principal',
  status: 'completed',
  duration: 21,
  totalTraffic: 45000,
  confidence: 98,
  pValue: 0.008,
  requiredSampleSize: 40000,
  variants: [
    {
      id: 'var-001-a',
      name: 'Control (Azul)',
      visitors: 15000,
      conversions: 1350,
      conversionRate: 9.0,
      revenue: 135000,
      trafficShare: 33.3,
      significance: 0,
      isControl: true,
      confidenceInterval: [8.5, 9.5]
    },
    {
      id: 'var-001-b',
      name: 'Variante A (Verde)',
      visitors: 15000,
      conversions: 1650,
      conversionRate: 11.0,
      revenue: 165000,
      trafficShare: 33.3,
      significance: 98,
      isControl: false,
      confidenceInterval: [10.4, 11.6]
    },
    {
      id: 'var-001-c',
      name: 'Variante B (Rojo)',
      visitors: 15000,
      conversions: 1425,
      conversionRate: 9.5,
      revenue: 142500,
      trafficShare: 33.4,
      significance: 65,
      isControl: false,
      confidenceInterval: [8.9, 10.1]
    }
  ],
  timeSeriesData: [
    { day: 'Día 1', 'Control (Azul)': 8.5, 'Variante A (Verde)': 9.2, 'Variante B (Rojo)': 9.0 },
    { day: 'Día 3', 'Control (Azul)': 8.8, 'Variante A (Verde)': 9.8, 'Variante B (Rojo)': 9.3 },
    { day: 'Día 5', 'Control (Azul)': 8.9, 'Variante A (Verde)': 10.2, 'Variante B (Rojo)': 9.4 },
    { day: 'Día 7', 'Control (Azul)': 9.0, 'Variante A (Verde)': 10.5, 'Variante B (Rojo)': 9.5 },
    { day: 'Día 10', 'Control (Azul)': 9.0, 'Variante A (Verde)': 10.8, 'Variante B (Rojo)': 9.5 },
    { day: 'Día 14', 'Control (Azul)': 9.0, 'Variante A (Verde)': 11.0, 'Variante B (Rojo)': 9.5 },
    { day: 'Día 21', 'Control (Azul)': 9.0, 'Variante A (Verde)': 11.0, 'Variante B (Rojo)': 9.5 }
  ],
  recommendations: [
    {
      type: 'success',
      title: '✅ Variante A ganando con 98% confianza',
      description: 'La Variante A (Verde) muestra una mejora de +22% en conversión. Los resultados son estadísticamente significativos.',
      action: 'Implementar Ahora'
    },
    {
      type: 'info',
      title: '💰 Proyección de impacto',
      description: 'Implementar Variante A generaría aproximadamente $30,000 adicionales en revenue mensual.',
      action: 'Ver Calculadora'
    }
  ]
};

// Experimento 2: En progreso - Preliminar
export const experiment2: Experiment = {
  id: 'exp-002',
  name: 'Headline Copy Test',
  description: 'Prueba de diferentes titulares en landing page',
  status: 'active',
  duration: 10,
  totalTraffic: 18000,
  confidence: 87,
  pValue: 0.042,
  requiredSampleSize: 25000,
  variants: [
    {
      id: 'var-002-a',
      name: 'Control',
      visitors: 9000,
      conversions: 720,
      conversionRate: 8.0,
      revenue: 72000,
      trafficShare: 50,
      significance: 0,
      isControl: true,
      confidenceInterval: [7.4, 8.6]
    },
    {
      id: 'var-002-b',
      name: 'Variante Emocional',
      visitors: 9000,
      conversions: 828,
      conversionRate: 9.2,
      revenue: 82800,
      trafficShare: 50,
      significance: 87,
      isControl: false,
      confidenceInterval: [8.5, 9.9]
    }
  ],
  timeSeriesData: [
    { day: 'Día 1', 'Control': 7.8, 'Variante Emocional': 8.5 },
    { day: 'Día 3', 'Control': 7.9, 'Variante Emocional': 8.8 },
    { day: 'Día 5', 'Control': 8.0, 'Variante Emocional': 9.0 },
    { day: 'Día 7', 'Control': 8.0, 'Variante Emocional': 9.1 },
    { day: 'Día 10', 'Control': 8.0, 'Variante Emocional': 9.2 }
  ],
  recommendations: [
    {
      type: 'warning',
      title: '⚠️ Experimento necesita 7 días más para significancia',
      description: 'Actualmente en 87% de confianza. Se requieren ~7,000 visitantes más para alcanzar 95% de significancia estadística.',
      action: 'Extender Duración'
    },
    {
      type: 'info',
      title: '💡 Tendencia preliminar positiva',
      description: 'La Variante Emocional muestra +15% de mejora. Considerar aumentar tráfico para resultados más rápidos.',
      action: 'Aumentar Tráfico'
    }
  ]
};

// Experimento 3: No concluyente
export const experiment3: Experiment = {
  id: 'exp-003',
  name: 'Product Image Layout',
  description: 'Comparación de layouts de imágenes de producto',
  status: 'active',
  duration: 14,
  totalTraffic: 22000,
  confidence: 58,
  pValue: 0.18,
  requiredSampleSize: 50000,
  variants: [
    {
      id: 'var-003-a',
      name: 'Control (Grid)',
      visitors: 11000,
      conversions: 770,
      conversionRate: 7.0,
      revenue: 77000,
      trafficShare: 50,
      significance: 0,
      isControl: true,
      confidenceInterval: [6.4, 7.6]
    },
    {
      id: 'var-003-b',
      name: 'Variante (Carousel)',
      visitors: 11000,
      conversions: 792,
      conversionRate: 7.2,
      revenue: 79200,
      trafficShare: 50,
      significance: 58,
      isControl: false,
      confidenceInterval: [6.6, 7.8]
    }
  ],
  timeSeriesData: [
    { day: 'Día 1', 'Control (Grid)': 6.9, 'Variante (Carousel)': 7.0 },
    { day: 'Día 3', 'Control (Grid)': 7.0, 'Variante (Carousel)': 7.1 },
    { day: 'Día 7', 'Control (Grid)': 7.0, 'Variante (Carousel)': 7.2 },
    { day: 'Día 10', 'Control (Grid)': 7.0, 'Variante (Carousel)': 7.2 },
    { day: 'Día 14', 'Control (Grid)': 7.0, 'Variante (Carousel)': 7.2 }
  ],
  recommendations: [
    {
      type: 'warning',
      title: '📊 Sin diferencia significativa detectada',
      description: 'Después de 14 días, no hay diferencia estadísticamente significativa. Considerar probar variantes más extremas.',
      action: 'Crear Nuevo Test'
    },
    {
      type: 'info',
      title: '🔍 Analizar por segmento',
      description: 'Puede haber diferencias en segmentos específicos (móvil vs desktop). Revisar análisis por dispositivo.',
      action: 'Ver Segmentación'
    }
  ]
};

// Experimento 4: Multivariate - Alta complejidad
export const experiment4: Experiment = {
  id: 'exp-004',
  name: 'Checkout Flow Optimization',
  description: 'Optimización de flujo de checkout con 4 variantes',
  status: 'completed',
  duration: 28,
  totalTraffic: 68000,
  confidence: 99,
  pValue: 0.001,
  requiredSampleSize: 60000,
  variants: [
    {
      id: 'var-004-a',
      name: 'Control (3 pasos)',
      visitors: 17000,
      conversions: 1190,
      conversionRate: 7.0,
      revenue: 238000,
      trafficShare: 25,
      significance: 0,
      isControl: true,
      confidenceInterval: [6.5, 7.5]
    },
    {
      id: 'var-004-b',
      name: 'Single Page',
      visitors: 17000,
      conversions: 1632,
      conversionRate: 9.6,
      revenue: 326400,
      trafficShare: 25,
      significance: 99,
      isControl: false,
      confidenceInterval: [9.0, 10.2]
    },
    {
      id: 'var-004-c',
      name: 'Progress Bar',
      visitors: 17000,
      conversions: 1445,
      conversionRate: 8.5,
      revenue: 289000,
      trafficShare: 25,
      significance: 92,
      isControl: false,
      confidenceInterval: [7.9, 9.1]
    },
    {
      id: 'var-004-d',
      name: 'Guest Checkout',
      visitors: 17000,
      conversions: 1292,
      conversionRate: 7.6,
      revenue: 258400,
      trafficShare: 25,
      significance: 74,
      isControl: false,
      confidenceInterval: [7.0, 8.2]
    }
  ],
  timeSeriesData: [
    { day: 'Día 1', 'Control (3 pasos)': 6.8, 'Single Page': 8.9, 'Progress Bar': 8.0, 'Guest Checkout': 7.2 },
    { day: 'Día 7', 'Control (3 pasos)': 6.9, 'Single Page': 9.2, 'Progress Bar': 8.3, 'Guest Checkout': 7.4 },
    { day: 'Día 14', 'Control (3 pasos)': 7.0, 'Single Page': 9.4, 'Progress Bar': 8.4, 'Guest Checkout': 7.5 },
    { day: 'Día 21', 'Control (3 pasos)': 7.0, 'Single Page': 9.5, 'Progress Bar': 8.5, 'Guest Checkout': 7.6 },
    { day: 'Día 28', 'Control (3 pasos)': 7.0, 'Single Page': 9.6, 'Progress Bar': 8.5, 'Guest Checkout': 7.6 }
  ],
  recommendations: [
    {
      type: 'success',
      title: '🏆 Single Page ganador claro con 99% confianza',
      description: 'Single Page Checkout muestra +37% mejora en conversión. Implementación recomendada inmediata.',
      action: 'Declarar Ganador'
    },
    {
      type: 'info',
      title: '📱 Diferencia mayor en móvil',
      description: 'En dispositivos móviles, Single Page supera al Control en +45%. En desktop es +28%.',
      action: 'Ver Análisis'
    },
    {
      type: 'success',
      title: '💰 Impacto proyectado: +$88K/mes',
      description: 'Basado en tráfico actual, implementar Single Page generaría $88,400 adicionales mensuales.',
      action: 'Ver Proyección'
    }
  ]
};

// Experimento 5: Recién iniciado
export const experiment5: Experiment = {
  id: 'exp-005',
  name: 'Pricing Table Design',
  description: 'Nuevo diseño de tabla de precios',
  status: 'active',
  duration: 3,
  totalTraffic: 4500,
  confidence: 45,
  pValue: 0.32,
  requiredSampleSize: 35000,
  variants: [
    {
      id: 'var-005-a',
      name: 'Control',
      visitors: 2250,
      conversions: 112,
      conversionRate: 5.0,
      revenue: 22400,
      trafficShare: 50,
      significance: 0,
      isControl: true,
      confidenceInterval: [4.0, 6.0]
    },
    {
      id: 'var-005-b',
      name: 'Diseño Cards',
      visitors: 2250,
      conversions: 126,
      conversionRate: 5.6,
      revenue: 25200,
      trafficShare: 50,
      significance: 45,
      isControl: false,
      confidenceInterval: [4.5, 6.7]
    }
  ],
  timeSeriesData: [
    { day: 'Día 1', 'Control': 4.8, 'Diseño Cards': 5.2 },
    { day: 'Día 2', 'Control': 4.9, 'Diseño Cards': 5.4 },
    { day: 'Día 3', 'Control': 5.0, 'Diseño Cards': 5.6 }
  ],
  recommendations: [
    {
      type: 'info',
      title: '📊 Recolectando datos iniciales',
      description: 'El experimento tiene solo 3 días. Se necesitan al menos 30,500 visitantes más para alcanzar significancia.',
      action: 'Continuar Test'
    },
    {
      type: 'warning',
      title: '⏱️ Tráfico bajo detectado',
      description: 'Con el tráfico actual, tomará ~21 días más alcanzar el tamaño de muestra requerido. Considerar aumentar tráfico.',
      action: 'Aumentar Volumen'
    }
  ]
};

// Array de todos los experimentos
export const mockExperiments: Experiment[] = [
  experiment1,
  experiment2,
  experiment3,
  experiment4,
  experiment5
];

// Datos de segmentación (para experimento 1 como ejemplo)
export const mockSegmentData: SegmentData = {
  device: {
    mobile: {
      'Control (Azul)': 8.5,
      'Variante A (Verde)': 11.8,
      'Variante B (Rojo)': 9.2
    },
    desktop: {
      'Control (Azul)': 9.3,
      'Variante A (Verde)': 10.5,
      'Variante B (Rojo)': 9.6
    },
    tablet: {
      'Control (Azul)': 8.8,
      'Variante A (Verde)': 10.8,
      'Variante B (Rojo)': 9.4
    }
  },
  location: {
    'Estados Unidos': {
      'Control (Azul)': 9.2,
      'Variante A (Verde)': 11.3,
      'Variante B (Rojo)': 9.6
    },
    'Reino Unido': {
      'Control (Azul)': 8.8,
      'Variante A (Verde)': 10.8,
      'Variante B (Rojo)': 9.4
    },
    'Canadá': {
      'Control (Azul)': 9.0,
      'Variante A (Verde)': 11.0,
      'Variante B (Rojo)': 9.5
    },
    'Australia': {
      'Control (Azul)': 8.9,
      'Variante A (Verde)': 10.9,
      'Variante B (Rojo)': 9.3
    }
  },
  timeOfDay: {
    '00-06': {
      'Control (Azul)': 7.5,
      'Variante A (Verde)': 9.5,
      'Variante B (Rojo)': 8.0
    },
    '06-12': {
      'Control (Azul)': 9.5,
      'Variante A (Verde)': 11.8,
      'Variante B (Rojo)': 10.0
    },
    '12-18': {
      'Control (Azul)': 9.8,
      'Variante A (Verde)': 12.2,
      'Variante B (Rojo)': 10.3
    },
    '18-24': {
      'Control (Azul)': 8.8,
      'Variante A (Verde)': 10.5,
      'Variante B (Rojo)': 9.2
    }
  },
  dayOfWeek: {
    'Lunes': {
      'Control (Azul)': 9.2,
      'Variante A (Verde)': 11.5,
      'Variante B (Rojo)': 9.7
    },
    'Martes': {
      'Control (Azul)': 9.3,
      'Variante A (Verde)': 11.6,
      'Variante B (Rojo)': 9.8
    },
    'Miércoles': {
      'Control (Azul)': 9.1,
      'Variante A (Verde)': 11.3,
      'Variante B (Rojo)': 9.6
    },
    'Jueves': {
      'Control (Azul)': 9.0,
      'Variante A (Verde)': 11.2,
      'Variante B (Rojo)': 9.5
    },
    'Viernes': {
      'Control (Azul)': 8.8,
      'Variante A (Verde)': 10.8,
      'Variante B (Rojo)': 9.3
    },
    'Sábado': {
      'Control (Azul)': 8.5,
      'Variante A (Verde)': 10.2,
      'Variante B (Rojo)': 8.9
    },
    'Domingo': {
      'Control (Azul)': 8.6,
      'Variante A (Verde)': 10.4,
      'Variante B (Rojo)': 9.0
    }
  },
  trafficSource: {
    'Orgánico': {
      'Control (Azul)': 9.5,
      'Variante A (Verde)': 11.8,
      'Variante B (Rojo)': 10.0
    },
    'Paid': {
      'Control (Azul)': 8.8,
      'Variante A (Verde)': 10.8,
      'Variante B (Rojo)': 9.3
    },
    'Directo': {
      'Control (Azul)': 9.2,
      'Variante A (Verde)': 11.2,
      'Variante B (Rojo)': 9.6
    },
    'Social': {
      'Control (Azul)': 8.5,
      'Variante A (Verde)': 10.5,
      'Variante B (Rojo)': 8.9
    },
    'Email': {
      'Control (Azul)': 10.0,
      'Variante A (Verde)': 12.5,
      'Variante B (Rojo)': 10.5
    }
  }
};

// Helper function
export const getExperimentById = (id: string): Experiment | undefined => {
  return mockExperiments.find(exp => exp.id === id);
};
