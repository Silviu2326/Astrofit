export interface Dieta {
  id: string;
  cliente: {
    nombre: string;
    avatar: string;
    iniciales: string;
  };
  plan: string;
  objetivo: string;
  calorias: {
    objetivo: number;
    consumidas: number;
  };
  macros: {
    proteinas: { objetivo: number; actual: number };
    carbohidratos: { objetivo: number; actual: number };
    grasas: { objetivo: number; actual: number };
  };
  fechaInicio: string;
  duracion: number; // días
  progreso: number; // porcentaje
  estado: 'activo' | 'pausado' | 'completado' | 'en pausa';
  adherencia: number;
  nutricionista: string;
  ultimaActualizacion: string;
  pesoInicial: number;
  pesoActual: number;
  restricciones: string[];
}

const mockDietas: Dieta[] = [
  {
    id: '1',
    cliente: { nombre: 'Juan Pérez', avatar: '👨', iniciales: 'JP' },
    plan: 'Dieta Mediterránea',
    objetivo: 'Pérdida de peso',
    calorias: { objetivo: 2000, consumidas: 1850 },
    macros: {
      proteinas: { objetivo: 150, actual: 145 },
      carbohidratos: { objetivo: 200, actual: 185 },
      grasas: { objetivo: 65, actual: 60 }
    },
    fechaInicio: '2024-01-15',
    duracion: 90,
    progreso: 65,
    estado: 'activo',
    adherencia: 88,
    nutricionista: 'Dra. Laura Gómez',
    ultimaActualizacion: '2024-09-28',
    pesoInicial: 92,
    pesoActual: 85,
    restricciones: ['Gluten', 'Lácteos']
  },
  {
    id: '2',
    cliente: { nombre: 'María García', avatar: '👩', iniciales: 'MG' },
    plan: 'Dieta Keto',
    objetivo: 'Definición muscular',
    calorias: { objetivo: 1800, consumidas: 1750 },
    macros: {
      proteinas: { objetivo: 140, actual: 138 },
      carbohidratos: { objetivo: 50, actual: 45 },
      grasas: { objetivo: 120, actual: 115 }
    },
    fechaInicio: '2024-03-01',
    duracion: 60,
    progreso: 80,
    estado: 'activo',
    adherencia: 92,
    nutricionista: 'Dr. Carlos Ruiz',
    ultimaActualizacion: '2024-09-29',
    pesoInicial: 68,
    pesoActual: 64,
    restricciones: ['Azúcar']
  },
  {
    id: '3',
    cliente: { nombre: 'Carlos López', avatar: '👨‍💼', iniciales: 'CL' },
    plan: 'Dieta Vegetariana',
    objetivo: 'Mantenimiento',
    calorias: { objetivo: 2200, consumidas: 2150 },
    macros: {
      proteinas: { objetivo: 120, actual: 118 },
      carbohidratos: { objetivo: 280, actual: 275 },
      grasas: { objetivo: 70, actual: 68 }
    },
    fechaInicio: '2024-02-20',
    duracion: 120,
    progreso: 55,
    estado: 'activo',
    adherencia: 85,
    nutricionista: 'Dra. Laura Gómez',
    ultimaActualizacion: '2024-09-27',
    pesoInicial: 75,
    pesoActual: 75,
    restricciones: ['Carnes', 'Pescados']
  },
  {
    id: '4',
    cliente: { nombre: 'Ana Martínez', avatar: '👩‍💻', iniciales: 'AM' },
    plan: 'Dieta Flexible IIFYM',
    objetivo: 'Pérdida de peso',
    calorias: { objetivo: 1700, consumidas: 1680 },
    macros: {
      proteinas: { objetivo: 130, actual: 128 },
      carbohidratos: { objetivo: 180, actual: 175 },
      grasas: { objetivo: 55, actual: 54 }
    },
    fechaInicio: '2024-04-10',
    duracion: 75,
    progreso: 70,
    estado: 'activo',
    adherencia: 90,
    nutricionista: 'Lic. Sofia Torres',
    ultimaActualizacion: '2024-09-30',
    pesoInicial: 78,
    pesoActual: 72,
    restricciones: []
  },
  {
    id: '5',
    cliente: { nombre: 'Pedro Sánchez', avatar: '🧑‍🦱', iniciales: 'PS' },
    plan: 'Dieta Hipercalórica',
    objetivo: 'Ganancia muscular',
    calorias: { objetivo: 3200, consumidas: 3100 },
    macros: {
      proteinas: { objetivo: 200, actual: 195 },
      carbohidratos: { objetivo: 400, actual: 390 },
      grasas: { objetivo: 90, actual: 88 }
    },
    fechaInicio: '2024-05-01',
    duracion: 90,
    progreso: 50,
    estado: 'activo',
    adherencia: 94,
    nutricionista: 'Dr. Carlos Ruiz',
    ultimaActualizacion: '2024-09-29',
    pesoInicial: 68,
    pesoActual: 72,
    restricciones: []
  },
  {
    id: '6',
    cliente: { nombre: 'Laura Fernández', avatar: '👩‍🎨', iniciales: 'LF' },
    plan: 'Dieta Paleo',
    objetivo: 'Salud digestiva',
    calorias: { objetivo: 1900, consumidas: 1820 },
    macros: {
      proteinas: { objetivo: 140, actual: 135 },
      carbohidratos: { objetivo: 150, actual: 145 },
      grasas: { objetivo: 80, actual: 75 }
    },
    fechaInicio: '2024-06-15',
    duracion: 60,
    progreso: 40,
    estado: 'activo',
    adherencia: 87,
    nutricionista: 'Dra. Laura Gómez',
    ultimaActualizacion: '2024-09-28',
    pesoInicial: 70,
    pesoActual: 68,
    restricciones: ['Gluten', 'Lácteos', 'Legumbres']
  },
  {
    id: '7',
    cliente: { nombre: 'Roberto Díaz', avatar: '👨‍🔬', iniciales: 'RD' },
    plan: 'Dieta Mediterránea',
    objetivo: 'Control colesterol',
    calorias: { objetivo: 2100, consumidas: 2050 },
    macros: {
      proteinas: { objetivo: 120, actual: 118 },
      carbohidratos: { objetivo: 250, actual: 245 },
      grasas: { objetivo: 75, actual: 73 }
    },
    fechaInicio: '2024-03-20',
    duracion: 120,
    progreso: 60,
    estado: 'activo',
    adherencia: 91,
    nutricionista: 'Lic. Sofia Torres',
    ultimaActualizacion: '2024-09-27',
    pesoInicial: 88,
    pesoActual: 84,
    restricciones: ['Grasas saturadas']
  },
  {
    id: '8',
    cliente: { nombre: 'Elena Morales', avatar: '👩‍🏫', iniciales: 'EM' },
    plan: 'Dieta Vegana',
    objetivo: 'Pérdida de peso',
    calorias: { objetivo: 1600, consumidas: 1550 },
    macros: {
      proteinas: { objetivo: 100, actual: 95 },
      carbohidratos: { objetivo: 220, actual: 215 },
      grasas: { objetivo: 50, actual: 48 }
    },
    fechaInicio: '2024-07-01',
    duracion: 90,
    progreso: 35,
    estado: 'activo',
    adherencia: 89,
    nutricionista: 'Dra. Laura Gómez',
    ultimaActualizacion: '2024-09-29',
    pesoInicial: 72,
    pesoActual: 69,
    restricciones: ['Todos los productos animales']
  },
  {
    id: '9',
    cliente: { nombre: 'Miguel Ángel Castro', avatar: '👨‍⚕️', iniciales: 'MC' },
    plan: 'Dieta Cetogénica',
    objetivo: 'Pérdida de peso',
    calorias: { objetivo: 1900, consumidas: 1850 },
    macros: {
      proteinas: { objetivo: 145, actual: 142 },
      carbohidratos: { objetivo: 40, actual: 38 },
      grasas: { objetivo: 130, actual: 125 }
    },
    fechaInicio: '2024-08-10',
    duracion: 60,
    progreso: 25,
    estado: 'activo',
    adherencia: 86,
    nutricionista: 'Dr. Carlos Ruiz',
    ultimaActualizacion: '2024-09-30',
    pesoInicial: 98,
    pesoActual: 94,
    restricciones: ['Azúcar', 'Harinas']
  },
  {
    id: '10',
    cliente: { nombre: 'Isabel Romero', avatar: '👩‍💼', iniciales: 'IR' },
    plan: 'Dieta Dash',
    objetivo: 'Control hipertensión',
    calorias: { objetivo: 2000, consumidas: 1980 },
    macros: {
      proteinas: { objetivo: 120, actual: 118 },
      carbohidratos: { objetivo: 270, actual: 265 },
      grasas: { objetivo: 60, actual: 58 }
    },
    fechaInicio: '2024-04-25',
    duracion: 90,
    progreso: 68,
    estado: 'activo',
    adherencia: 93,
    nutricionista: 'Lic. Sofia Torres',
    ultimaActualizacion: '2024-09-28',
    pesoInicial: 80,
    pesoActual: 76,
    restricciones: ['Sodio alto']
  },
  {
    id: '11',
    cliente: { nombre: 'Francisco Vargas', avatar: '👨‍🎓', iniciales: 'FV' },
    plan: 'Dieta Flexible',
    objetivo: 'Recomposición corporal',
    calorias: { objetivo: 2400, consumidas: 2350 },
    macros: {
      proteinas: { objetivo: 180, actual: 175 },
      carbohidratos: { objetivo: 260, actual: 255 },
      grasas: { objetivo: 75, actual: 73 }
    },
    fechaInicio: '2024-05-20',
    duracion: 120,
    progreso: 45,
    estado: 'activo',
    adherencia: 88,
    nutricionista: 'Dr. Carlos Ruiz',
    ultimaActualizacion: '2024-09-27',
    pesoInicial: 82,
    pesoActual: 80,
    restricciones: []
  },
  {
    id: '12',
    cliente: { nombre: 'Carmen Jiménez', avatar: '👩‍🔬', iniciales: 'CJ' },
    plan: 'Dieta Sin Gluten',
    objetivo: 'Celiaquía',
    calorias: { objetivo: 1800, consumidas: 1780 },
    macros: {
      proteinas: { objetivo: 110, actual: 108 },
      carbohidratos: { objetivo: 230, actual: 225 },
      grasas: { objetivo: 60, actual: 59 }
    },
    fechaInicio: '2024-06-05',
    duracion: 180,
    progreso: 52,
    estado: 'activo',
    adherencia: 95,
    nutricionista: 'Dra. Laura Gómez',
    ultimaActualizacion: '2024-09-29',
    pesoInicial: 65,
    pesoActual: 65,
    restricciones: ['Gluten']
  },
  {
    id: '13',
    cliente: { nombre: 'Alberto Navarro', avatar: '👨‍🏭', iniciales: 'AN' },
    plan: 'Dieta Alta en Proteínas',
    objetivo: 'Ganancia muscular',
    calorias: { objetivo: 2800, consumidas: 2750 },
    macros: {
      proteinas: { objetivo: 210, actual: 205 },
      carbohidratos: { objetivo: 300, actual: 295 },
      grasas: { objetivo: 80, actual: 78 }
    },
    fechaInicio: '2024-07-15',
    duracion: 90,
    progreso: 38,
    estado: 'activo',
    adherencia: 90,
    nutricionista: 'Dr. Carlos Ruiz',
    ultimaActualizacion: '2024-09-30',
    pesoInicial: 75,
    pesoActual: 78,
    restricciones: []
  },
  {
    id: '14',
    cliente: { nombre: 'Beatriz Herrera', avatar: '👩‍🎤', iniciales: 'BH' },
    plan: 'Dieta Intermitente 16/8',
    objetivo: 'Pérdida de grasa',
    calorias: { objetivo: 1650, consumidas: 1620 },
    macros: {
      proteinas: { objetivo: 125, actual: 122 },
      carbohidratos: { objetivo: 180, actual: 178 },
      grasas: { objetivo: 55, actual: 53 }
    },
    fechaInicio: '2024-08-01',
    duracion: 75,
    progreso: 30,
    estado: 'activo',
    adherencia: 92,
    nutricionista: 'Lic. Sofia Torres',
    ultimaActualizacion: '2024-09-28',
    pesoInicial: 69,
    pesoActual: 66,
    restricciones: []
  },
  {
    id: '15',
    cliente: { nombre: 'Daniel Ortiz', avatar: '👨‍🚀', iniciales: 'DO' },
    plan: 'Dieta Mediterránea',
    objetivo: 'Salud cardiovascular',
    calorias: { objetivo: 2300, consumidas: 2250 },
    macros: {
      proteinas: { objetivo: 140, actual: 138 },
      carbohidratos: { objetivo: 280, actual: 275 },
      grasas: { objetivo: 80, actual: 78 }
    },
    fechaInicio: '2024-02-10',
    duracion: 150,
    progreso: 75,
    estado: 'activo',
    adherencia: 89,
    nutricionista: 'Dra. Laura Gómez',
    ultimaActualizacion: '2024-09-27',
    pesoInicial: 90,
    pesoActual: 85,
    restricciones: []
  },
  {
    id: '16',
    cliente: { nombre: 'Patricia Vega', avatar: '👩‍🚒', iniciales: 'PV' },
    plan: 'Dieta Low Carb',
    objetivo: 'Pérdida de peso',
    calorias: { objetivo: 1750, consumidas: 1700 },
    macros: {
      proteinas: { objetivo: 135, actual: 132 },
      carbohidratos: { objetivo: 100, actual: 95 },
      grasas: { objetivo: 95, actual: 92 }
    },
    fechaInicio: '2024-06-20',
    duracion: 90,
    progreso: 42,
    estado: 'activo',
    adherencia: 87,
    nutricionista: 'Dr. Carlos Ruiz',
    ultimaActualizacion: '2024-09-29',
    pesoInicial: 85,
    pesoActual: 80,
    restricciones: ['Azúcar refinado']
  },
  {
    id: '17',
    cliente: { nombre: 'Jorge Mendoza', avatar: '👨‍✈️', iniciales: 'JM' },
    plan: 'Dieta Balanced Macros',
    objetivo: 'Mantenimiento',
    calorias: { objetivo: 2500, consumidas: 2480 },
    macros: {
      proteinas: { objetivo: 150, actual: 148 },
      carbohidratos: { objetivo: 310, actual: 305 },
      grasas: { objetivo: 85, actual: 83 }
    },
    fechaInicio: '2024-05-10',
    duracion: 120,
    progreso: 48,
    estado: 'activo',
    adherencia: 91,
    nutricionista: 'Lic. Sofia Torres',
    ultimaActualizacion: '2024-09-30',
    pesoInicial: 78,
    pesoActual: 78,
    restricciones: []
  },
  {
    id: '18',
    cliente: { nombre: 'Silvia Castro', avatar: '👩‍🌾', iniciales: 'SC' },
    plan: 'Dieta Antiinflamatoria',
    objetivo: 'Salud articular',
    calorias: { objetivo: 1900, consumidas: 1870 },
    macros: {
      proteinas: { objetivo: 120, actual: 118 },
      carbohidratos: { objetivo: 220, actual: 215 },
      grasas: { objetivo: 70, actual: 68 }
    },
    fechaInicio: '2024-07-25',
    duracion: 90,
    progreso: 32,
    estado: 'activo',
    adherencia: 88,
    nutricionista: 'Dra. Laura Gómez',
    ultimaActualizacion: '2024-09-28',
    pesoInicial: 74,
    pesoActual: 72,
    restricciones: ['Gluten', 'Azúcar', 'Alcohol']
  },
  {
    id: '19',
    cliente: { nombre: 'Raúl Domínguez', avatar: '👨‍🎨', iniciales: 'RD' },
    plan: 'Dieta Deportiva',
    objetivo: 'Rendimiento atlético',
    calorias: { objetivo: 3000, consumidas: 2950 },
    macros: {
      proteinas: { objetivo: 190, actual: 188 },
      carbohidratos: { objetivo: 380, actual: 375 },
      grasas: { objetivo: 90, actual: 88 }
    },
    fechaInicio: '2024-04-15',
    duracion: 120,
    progreso: 65,
    estado: 'activo',
    adherencia: 93,
    nutricionista: 'Dr. Carlos Ruiz',
    ultimaActualizacion: '2024-09-27',
    pesoInicial: 80,
    pesoActual: 82,
    restricciones: []
  },
  {
    id: '20',
    cliente: { nombre: 'Mónica Reyes', avatar: '👩‍🎓', iniciales: 'MR' },
    plan: 'Dieta Cetogénica Cíclica',
    objetivo: 'Definición muscular',
    calorias: { objetivo: 1850, consumidas: 1820 },
    macros: {
      proteinas: { objetivo: 140, actual: 138 },
      carbohidratos: { objetivo: 50, actual: 48 },
      grasas: { objetivo: 125, actual: 122 }
    },
    fechaInicio: '2024-08-20',
    duracion: 60,
    progreso: 20,
    estado: 'activo',
    adherencia: 85,
    nutricionista: 'Dr. Carlos Ruiz',
    ultimaActualizacion: '2024-09-29',
    pesoInicial: 66,
    pesoActual: 64,
    restricciones: ['Azúcar']
  },
  // Dietas pausadas
  {
    id: '21',
    cliente: { nombre: 'Andrés Flores', avatar: '👨‍🍳', iniciales: 'AF' },
    plan: 'Dieta Mediterránea',
    objetivo: 'Pérdida de peso',
    calorias: { objetivo: 2000, consumidas: 1950 },
    macros: {
      proteinas: { objetivo: 130, actual: 128 },
      carbohidratos: { objetivo: 240, actual: 235 },
      grasas: { objetivo: 70, actual: 68 }
    },
    fechaInicio: '2024-07-10',
    duracion: 90,
    progreso: 35,
    estado: 'en pausa',
    adherencia: 82,
    nutricionista: 'Lic. Sofia Torres',
    ultimaActualizacion: '2024-09-15',
    pesoInicial: 95,
    pesoActual: 92,
    restricciones: []
  },
  {
    id: '22',
    cliente: { nombre: 'Lucía Ramos', avatar: '👩‍⚖️', iniciales: 'LR' },
    plan: 'Dieta Vegetariana',
    objetivo: 'Mantenimiento',
    calorias: { objetivo: 1900, consumidas: 1850 },
    macros: {
      proteinas: { objetivo: 100, actual: 98 },
      carbohidratos: { objetivo: 260, actual: 255 },
      grasas: { objetivo: 65, actual: 63 }
    },
    fechaInicio: '2024-06-25',
    duracion: 90,
    progreso: 40,
    estado: 'en pausa',
    adherencia: 78,
    nutricionista: 'Dra. Laura Gómez',
    ultimaActualizacion: '2024-09-10',
    pesoInicial: 68,
    pesoActual: 68,
    restricciones: ['Carnes']
  },
  {
    id: '23',
    cliente: { nombre: 'Víctor Ortega', avatar: '👨‍🔧', iniciales: 'VO' },
    plan: 'Dieta Keto',
    objetivo: 'Pérdida de peso',
    calorias: { objetivo: 1950, consumidas: 1900 },
    macros: {
      proteinas: { objetivo: 145, actual: 142 },
      carbohidratos: { objetivo: 45, actual: 43 },
      grasas: { objetivo: 130, actual: 127 }
    },
    fechaInicio: '2024-08-05',
    duracion: 60,
    progreso: 28,
    estado: 'en pausa',
    adherencia: 75,
    nutricionista: 'Dr. Carlos Ruiz',
    ultimaActualizacion: '2024-09-20',
    pesoInicial: 102,
    pesoActual: 99,
    restricciones: ['Azúcar', 'Harinas']
  },
  // Dietas completadas
  {
    id: '24',
    cliente: { nombre: 'Rosa Medina', avatar: '👩‍🏭', iniciales: 'RM' },
    plan: 'Dieta Mediterránea',
    objetivo: 'Pérdida de peso',
    calorias: { objetivo: 1800, consumidas: 1800 },
    macros: {
      proteinas: { objetivo: 120, actual: 120 },
      carbohidratos: { objetivo: 220, actual: 220 },
      grasas: { objetivo: 60, actual: 60 }
    },
    fechaInicio: '2024-03-15',
    duracion: 120,
    progreso: 100,
    estado: 'completado',
    adherencia: 94,
    nutricionista: 'Dra. Laura Gómez',
    ultimaActualizacion: '2024-07-15',
    pesoInicial: 82,
    pesoActual: 72,
    restricciones: []
  },
  {
    id: '25',
    cliente: { nombre: 'Javier Torres', avatar: '👨‍💼', iniciales: 'JT' },
    plan: 'Dieta Hipercalórica',
    objetivo: 'Ganancia muscular',
    calorias: { objetivo: 3100, consumidas: 3100 },
    macros: {
      proteinas: { objetivo: 200, actual: 200 },
      carbohidratos: { objetivo: 390, actual: 390 },
      grasas: { objetivo: 90, actual: 90 }
    },
    fechaInicio: '2024-02-01',
    duracion: 90,
    progreso: 100,
    estado: 'completado',
    adherencia: 96,
    nutricionista: 'Dr. Carlos Ruiz',
    ultimaActualizacion: '2024-05-01',
    pesoInicial: 70,
    pesoActual: 76,
    restricciones: []
  },
  {
    id: '26',
    cliente: { nombre: 'Cristina Suárez', avatar: '👩‍⚕️', iniciales: 'CS' },
    plan: 'Dieta Dash',
    objetivo: 'Control hipertensión',
    calorias: { objetivo: 1900, consumidas: 1900 },
    macros: {
      proteinas: { objetivo: 115, actual: 115 },
      carbohidratos: { objetivo: 260, actual: 260 },
      grasas: { objetivo: 55, actual: 55 }
    },
    fechaInicio: '2024-01-20',
    duracion: 150,
    progreso: 100,
    estado: 'completado',
    adherencia: 92,
    nutricionista: 'Lic. Sofia Torres',
    ultimaActualizacion: '2024-06-20',
    pesoInicial: 78,
    pesoActual: 73,
    restricciones: ['Sodio alto']
  },
  {
    id: '27',
    cliente: { nombre: 'Sergio Gil', avatar: '👨‍🚒', iniciales: 'SG' },
    plan: 'Dieta Cetogénica',
    objetivo: 'Pérdida de peso',
    calorias: { objetivo: 2000, consumidas: 2000 },
    macros: {
      proteinas: { objetivo: 150, actual: 150 },
      carbohidratos: { objetivo: 40, actual: 40 },
      grasas: { objetivo: 135, actual: 135 }
    },
    fechaInicio: '2024-04-01',
    duracion: 60,
    progreso: 100,
    estado: 'completado',
    adherencia: 91,
    nutricionista: 'Dr. Carlos Ruiz',
    ultimaActualizacion: '2024-06-01',
    pesoInicial: 105,
    pesoActual: 95,
    restricciones: ['Azúcar', 'Harinas']
  },
  {
    id: '28',
    cliente: { nombre: 'Gloria Campos', avatar: '👩‍🚀', iniciales: 'GC' },
    plan: 'Dieta Vegana',
    objetivo: 'Pérdida de peso',
    calorias: { objetivo: 1650, consumidas: 1650 },
    macros: {
      proteinas: { objetivo: 105, actual: 105 },
      carbohidratos: { objetivo: 230, actual: 230 },
      grasas: { objetivo: 48, actual: 48 }
    },
    fechaInicio: '2024-03-10',
    duracion: 90,
    progreso: 100,
    estado: 'completado',
    adherencia: 89,
    nutricionista: 'Dra. Laura Gómez',
    ultimaActualizacion: '2024-06-10',
    pesoInicial: 76,
    pesoActual: 70,
    restricciones: ['Todos los productos animales']
  },
  {
    id: '29',
    cliente: { nombre: 'Tomás Ruiz', avatar: '👨‍🎤', iniciales: 'TR' },
    plan: 'Dieta Flexible',
    objetivo: 'Recomposición corporal',
    calorias: { objetivo: 2300, consumidas: 2300 },
    macros: {
      proteinas: { objetivo: 175, actual: 175 },
      carbohidratos: { objetivo: 250, actual: 250 },
      grasas: { objetivo: 75, actual: 75 }
    },
    fechaInicio: '2024-02-15',
    duracion: 120,
    progreso: 100,
    estado: 'completado',
    adherencia: 93,
    nutricionista: 'Dr. Carlos Ruiz',
    ultimaActualizacion: '2024-06-15',
    pesoInicial: 85,
    pesoActual: 82,
    restricciones: []
  },
  {
    id: '30',
    cliente: { nombre: 'Pilar Santos', avatar: '👩‍🏫', iniciales: 'PS' },
    plan: 'Dieta Mediterránea',
    objetivo: 'Salud cardiovascular',
    calorias: { objetivo: 2000, consumidas: 2000 },
    macros: {
      proteinas: { objetivo: 125, actual: 125 },
      carbohidratos: { objetivo: 260, actual: 260 },
      grasas: { objetivo: 70, actual: 70 }
    },
    fechaInicio: '2023-12-01',
    duracion: 180,
    progreso: 100,
    estado: 'completado',
    adherencia: 95,
    nutricionista: 'Dra. Laura Gómez',
    ultimaActualizacion: '2024-06-01',
    pesoInicial: 80,
    pesoActual: 75,
    restricciones: []
  },
  {
    id: '31',
    cliente: { nombre: 'Óscar Vidal', avatar: '👨‍🔬', iniciales: 'OV' },
    plan: 'Dieta Alta en Proteínas',
    objetivo: 'Ganancia muscular',
    calorias: { objetivo: 2900, consumidas: 2900 },
    macros: {
      proteinas: { objetivo: 215, actual: 215 },
      carbohidratos: { objetivo: 310, actual: 310 },
      grasas: { objetivo: 82, actual: 82 }
    },
    fechaInicio: '2024-01-10',
    duracion: 90,
    progreso: 100,
    estado: 'completado',
    adherencia: 97,
    nutricionista: 'Dr. Carlos Ruiz',
    ultimaActualizacion: '2024-04-10',
    pesoInicial: 72,
    pesoActual: 78,
    restricciones: []
  },
  {
    id: '32',
    cliente: { nombre: 'Nuria León', avatar: '👩‍🎨', iniciales: 'NL' },
    plan: 'Dieta Low Carb',
    objetivo: 'Pérdida de peso',
    calorias: { objetivo: 1700, consumidas: 1700 },
    macros: {
      proteinas: { objetivo: 130, actual: 130 },
      carbohidratos: { objetivo: 95, actual: 95 },
      grasas: { objetivo: 93, actual: 93 }
    },
    fechaInicio: '2024-03-25',
    duracion: 75,
    progreso: 100,
    estado: 'completado',
    adherencia: 90,
    nutricionista: 'Lic. Sofia Torres',
    ultimaActualizacion: '2024-06-10',
    pesoInicial: 87,
    pesoActual: 80,
    restricciones: ['Azúcar refinado']
  },
  {
    id: '33',
    cliente: { nombre: 'Hugo Blanco', avatar: '👨‍✈️', iniciales: 'HB' },
    plan: 'Dieta Paleo',
    objetivo: 'Salud digestiva',
    calorias: { objetivo: 2100, consumidas: 2100 },
    macros: {
      proteinas: { objetivo: 155, actual: 155 },
      carbohidratos: { objetivo: 180, actual: 180 },
      grasas: { objetivo: 85, actual: 85 }
    },
    fechaInicio: '2024-02-05',
    duracion: 120,
    progreso: 100,
    estado: 'completado',
    adherencia: 88,
    nutricionista: 'Dra. Laura Gómez',
    ultimaActualizacion: '2024-06-05',
    pesoInicial: 88,
    pesoActual: 83,
    restricciones: ['Gluten', 'Lácteos', 'Legumbres']
  },
];

export const getDietas = async (filters: {
  estado?: string;
  search?: string;
  objetivo?: string;
  nutricionista?: string;
  fechaInicio?: string;
}): Promise<Dieta[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let filteredDietas = mockDietas;

      if (filters.estado) {
        filteredDietas = filteredDietas.filter((dieta) => dieta.estado === filters.estado);
      }

      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        filteredDietas = filteredDietas.filter(
          (dieta) =>
            dieta.cliente.nombre.toLowerCase().includes(searchTerm) ||
            dieta.plan.toLowerCase().includes(searchTerm)
        );
      }

      if (filters.objetivo) {
        filteredDietas = filteredDietas.filter((dieta) => dieta.objetivo === filters.objetivo);
      }

      if (filters.nutricionista) {
        filteredDietas = filteredDietas.filter((dieta) => dieta.nutricionista === filters.nutricionista);
      }

      if (filters.fechaInicio) {
        filteredDietas = filteredDietas.filter((dieta) => dieta.fechaInicio >= filters.fechaInicio);
      }

      resolve(filteredDietas);
    }, 500);
  });
};
