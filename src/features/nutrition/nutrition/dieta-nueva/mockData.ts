// Mock data para la aplicación de Nueva Dieta

export interface Cliente {
  id: string;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  edad: number;
  peso: number;
  altura: number;
  sexo: 'M' | 'F';
  objetivoFitness: string;
  restriccionesAlimentarias: string[];
  avatar?: string;
}

export interface Alimento {
  id: string;
  nombre: string;
  categoria: string;
  porcion: string;
  calorias: number;
  proteinas: number;
  carbohidratos: number;
  grasas: number;
  fibra?: number;
}

export interface ObjetivoPreset {
  id: string;
  nombre: string;
  descripcion: string;
  icono: string;
  distribucionMacros: {
    proteinas: number;
    carbohidratos: number;
    grasas: number;
  };
}

export const mockClientes: Cliente[] = [
  {
    id: '1',
    nombre: 'Juan',
    apellido: 'Pérez',
    email: 'juan.perez@email.com',
    telefono: '+34 600 123 456',
    edad: 28,
    peso: 75,
    altura: 175,
    sexo: 'M',
    objetivoFitness: 'Pérdida de peso',
    restriccionesAlimentarias: ['Lactosa'],
    avatar: '👨'
  },
  {
    id: '2',
    nombre: 'María',
    apellido: 'García',
    email: 'maria.garcia@email.com',
    telefono: '+34 600 234 567',
    edad: 32,
    peso: 62,
    altura: 165,
    sexo: 'F',
    objetivoFitness: 'Mantenimiento',
    restriccionesAlimentarias: [],
    avatar: '👩'
  },
  {
    id: '3',
    nombre: 'Carlos',
    apellido: 'López',
    email: 'carlos.lopez@email.com',
    telefono: '+34 600 345 678',
    edad: 25,
    peso: 80,
    altura: 180,
    sexo: 'M',
    objetivoFitness: 'Ganancia muscular',
    restriccionesAlimentarias: [],
    avatar: '🧑'
  },
  {
    id: '4',
    nombre: 'Ana',
    apellido: 'Martínez',
    email: 'ana.martinez@email.com',
    telefono: '+34 600 456 789',
    edad: 29,
    peso: 58,
    altura: 160,
    sexo: 'F',
    objetivoFitness: 'Recomposición corporal',
    restriccionesAlimentarias: ['Gluten', 'Frutos secos'],
    avatar: '👧'
  },
  {
    id: '5',
    nombre: 'Pedro',
    apellido: 'Sánchez',
    email: 'pedro.sanchez@email.com',
    telefono: '+34 600 567 890',
    edad: 35,
    peso: 90,
    altura: 185,
    sexo: 'M',
    objetivoFitness: 'Pérdida de peso',
    restriccionesAlimentarias: ['Azúcar refinada'],
    avatar: '🧔'
  },
  {
    id: '6',
    nombre: 'Laura',
    apellido: 'Fernández',
    email: 'laura.fernandez@email.com',
    telefono: '+34 600 678 901',
    edad: 26,
    peso: 55,
    altura: 158,
    sexo: 'F',
    objetivoFitness: 'Ganancia muscular',
    restriccionesAlimentarias: [],
    avatar: '👱‍♀️'
  },
  {
    id: '7',
    nombre: 'Miguel',
    apellido: 'Rodríguez',
    email: 'miguel.rodriguez@email.com',
    telefono: '+34 600 789 012',
    edad: 40,
    peso: 85,
    altura: 178,
    sexo: 'M',
    objetivoFitness: 'Mantenimiento',
    restriccionesAlimentarias: ['Mariscos'],
    avatar: '👨‍🦰'
  },
  {
    id: '8',
    nombre: 'Sofía',
    apellido: 'González',
    email: 'sofia.gonzalez@email.com',
    telefono: '+34 600 890 123',
    edad: 27,
    peso: 60,
    altura: 168,
    sexo: 'F',
    objetivoFitness: 'Pérdida de peso',
    restriccionesAlimentarias: ['Vegetariana'],
    avatar: '👩‍🦱'
  },
  {
    id: '9',
    nombre: 'Javier',
    apellido: 'Ruiz',
    email: 'javier.ruiz@email.com',
    telefono: '+34 600 901 234',
    edad: 31,
    peso: 78,
    altura: 172,
    sexo: 'M',
    objetivoFitness: 'Recomposición corporal',
    restriccionesAlimentarias: [],
    avatar: '🧑‍🦲'
  },
  {
    id: '10',
    nombre: 'Carmen',
    apellido: 'Díaz',
    email: 'carmen.diaz@email.com',
    telefono: '+34 600 012 345',
    edad: 33,
    peso: 67,
    altura: 170,
    sexo: 'F',
    objetivoFitness: 'Mantenimiento',
    restriccionesAlimentarias: ['Vegana'],
    avatar: '👩‍🦳'
  },
  {
    id: '11',
    nombre: 'Antonio',
    apellido: 'Moreno',
    email: 'antonio.moreno@email.com',
    telefono: '+34 600 123 456',
    edad: 45,
    peso: 95,
    altura: 182,
    sexo: 'M',
    objetivoFitness: 'Pérdida de peso',
    restriccionesAlimentarias: ['Gluten'],
    avatar: '👴'
  },
  {
    id: '12',
    nombre: 'Isabel',
    apellido: 'Jiménez',
    email: 'isabel.jimenez@email.com',
    telefono: '+34 600 234 567',
    edad: 24,
    peso: 52,
    altura: 155,
    sexo: 'F',
    objetivoFitness: 'Ganancia muscular',
    restriccionesAlimentarias: [],
    avatar: '👧'
  },
  {
    id: '13',
    nombre: 'Francisco',
    apellido: 'Álvarez',
    email: 'francisco.alvarez@email.com',
    telefono: '+34 600 345 678',
    edad: 38,
    peso: 88,
    altura: 176,
    sexo: 'M',
    objetivoFitness: 'Recomposición corporal',
    restriccionesAlimentarias: ['Lactosa', 'Gluten'],
    avatar: '🧔‍♂️'
  },
  {
    id: '14',
    nombre: 'Elena',
    apellido: 'Torres',
    email: 'elena.torres@email.com',
    telefono: '+34 600 456 789',
    edad: 30,
    peso: 64,
    altura: 167,
    sexo: 'F',
    objetivoFitness: 'Mantenimiento',
    restriccionesAlimentarias: [],
    avatar: '👩‍🦰'
  },
  {
    id: '15',
    nombre: 'Roberto',
    apellido: 'Navarro',
    email: 'roberto.navarro@email.com',
    telefono: '+34 600 567 890',
    edad: 42,
    peso: 82,
    altura: 174,
    sexo: 'M',
    objetivoFitness: 'Pérdida de peso',
    restriccionesAlimentarias: ['Frutos secos'],
    avatar: '👨‍🦳'
  },
  {
    id: '16',
    nombre: 'Patricia',
    apellido: 'Serrano',
    email: 'patricia.serrano@email.com',
    telefono: '+34 600 678 901',
    edad: 28,
    peso: 59,
    altura: 163,
    sexo: 'F',
    objetivoFitness: 'Ganancia muscular',
    restriccionesAlimentarias: ['Vegetariana'],
    avatar: '👱‍♀️'
  },
  {
    id: '17',
    nombre: 'Raúl',
    apellido: 'Castro',
    email: 'raul.castro@email.com',
    telefono: '+34 600 789 012',
    edad: 36,
    peso: 77,
    altura: 171,
    sexo: 'M',
    objetivoFitness: 'Mantenimiento',
    restriccionesAlimentarias: [],
    avatar: '🧑‍🦱'
  },
  {
    id: '18',
    nombre: 'Beatriz',
    apellido: 'Romero',
    email: 'beatriz.romero@email.com',
    telefono: '+34 600 890 123',
    edad: 34,
    peso: 70,
    altura: 172,
    sexo: 'F',
    objetivoFitness: 'Pérdida de peso',
    restriccionesAlimentarias: ['Lactosa'],
    avatar: '👩'
  },
  {
    id: '19',
    nombre: 'David',
    apellido: 'Hernández',
    email: 'david.hernandez@email.com',
    telefono: '+34 600 901 234',
    edad: 27,
    peso: 73,
    altura: 177,
    sexo: 'M',
    objetivoFitness: 'Recomposición corporal',
    restriccionesAlimentarias: [],
    avatar: '🧑'
  },
  {
    id: '20',
    nombre: 'Cristina',
    apellido: 'Vázquez',
    email: 'cristina.vazquez@email.com',
    telefono: '+34 600 012 345',
    edad: 31,
    peso: 61,
    altura: 164,
    sexo: 'F',
    objetivoFitness: 'Mantenimiento',
    restriccionesAlimentarias: ['Vegana'],
    avatar: '👩‍🦳'
  }
];

export const mockAlimentos: Alimento[] = [
  // Proteínas
  { id: 'p1', nombre: 'Pechuga de pollo', categoria: 'Proteínas', porcion: '100g', calorias: 165, proteinas: 31, carbohidratos: 0, grasas: 3.6, fibra: 0 },
  { id: 'p2', nombre: 'Filete de ternera', categoria: 'Proteínas', porcion: '100g', calorias: 250, proteinas: 26, carbohidratos: 0, grasas: 17, fibra: 0 },
  { id: 'p3', nombre: 'Salmón', categoria: 'Proteínas', porcion: '100g', calorias: 208, proteinas: 20, carbohidratos: 0, grasas: 13, fibra: 0 },
  { id: 'p4', nombre: 'Atún en lata', categoria: 'Proteínas', porcion: '100g', calorias: 116, proteinas: 26, carbohidratos: 0, grasas: 0.8, fibra: 0 },
  { id: 'p5', nombre: 'Huevos', categoria: 'Proteínas', porcion: '2 unidades', calorias: 143, proteinas: 13, carbohidratos: 1.1, grasas: 9.5, fibra: 0 },
  { id: 'p6', nombre: 'Pavo', categoria: 'Proteínas', porcion: '100g', calorias: 135, proteinas: 30, carbohidratos: 0, grasas: 0.7, fibra: 0 },
  { id: 'p7', nombre: 'Merluza', categoria: 'Proteínas', porcion: '100g', calorias: 86, proteinas: 17, carbohidratos: 0, grasas: 1.3, fibra: 0 },
  { id: 'p8', nombre: 'Gambas', categoria: 'Proteínas', porcion: '100g', calorias: 99, proteinas: 24, carbohidratos: 0.2, grasas: 0.3, fibra: 0 },
  { id: 'p9', nombre: 'Queso cottage', categoria: 'Proteínas', porcion: '100g', calorias: 98, proteinas: 11, carbohidratos: 3.4, grasas: 4.3, fibra: 0 },
  { id: 'p10', nombre: 'Yogur griego', categoria: 'Proteínas', porcion: '100g', calorias: 97, proteinas: 9, carbohidratos: 3.6, grasas: 5, fibra: 0 },

  // Carbohidratos
  { id: 'c1', nombre: 'Arroz blanco', categoria: 'Carbohidratos', porcion: '100g cocido', calorias: 130, proteinas: 2.7, carbohidratos: 28, grasas: 0.3, fibra: 0.4 },
  { id: 'c2', nombre: 'Arroz integral', categoria: 'Carbohidratos', porcion: '100g cocido', calorias: 112, proteinas: 2.6, carbohidratos: 24, grasas: 0.9, fibra: 1.8 },
  { id: 'c3', nombre: 'Pasta integral', categoria: 'Carbohidratos', porcion: '100g cocida', calorias: 131, proteinas: 5, carbohidratos: 25, grasas: 1.1, fibra: 3.9 },
  { id: 'c4', nombre: 'Pan integral', categoria: 'Carbohidratos', porcion: '2 rebanadas', calorias: 138, proteinas: 5.6, carbohidratos: 24, grasas: 2.1, fibra: 3.8 },
  { id: 'c5', nombre: 'Avena', categoria: 'Carbohidratos', porcion: '50g', calorias: 190, proteinas: 6.7, carbohidratos: 34, grasas: 3.5, fibra: 5 },
  { id: 'c6', nombre: 'Batata', categoria: 'Carbohidratos', porcion: '100g', calorias: 86, proteinas: 1.6, carbohidratos: 20, grasas: 0.1, fibra: 3 },
  { id: 'c7', nombre: 'Patata', categoria: 'Carbohidratos', porcion: '100g', calorias: 77, proteinas: 2, carbohidratos: 17, grasas: 0.1, fibra: 2.1 },
  { id: 'c8', nombre: 'Quinoa', categoria: 'Carbohidratos', porcion: '100g cocida', calorias: 120, proteinas: 4.4, carbohidratos: 21, grasas: 1.9, fibra: 2.8 },
  { id: 'c9', nombre: 'Plátano', categoria: 'Carbohidratos', porcion: '1 unidad', calorias: 105, proteinas: 1.3, carbohidratos: 27, grasas: 0.4, fibra: 3.1 },
  { id: 'c10', nombre: 'Pan de centeno', categoria: 'Carbohidratos', porcion: '2 rebanadas', calorias: 165, proteinas: 5.5, carbohidratos: 33, grasas: 1.3, fibra: 5.8 },

  // Grasas saludables
  { id: 'g1', nombre: 'Aguacate', categoria: 'Grasas', porcion: '1/2 unidad', calorias: 160, proteinas: 2, carbohidratos: 8.5, grasas: 15, fibra: 6.7 },
  { id: 'g2', nombre: 'Aceite de oliva', categoria: 'Grasas', porcion: '1 cucharada', calorias: 119, proteinas: 0, carbohidratos: 0, grasas: 13.5, fibra: 0 },
  { id: 'g3', nombre: 'Almendras', categoria: 'Grasas', porcion: '30g', calorias: 170, proteinas: 6, carbohidratos: 6, grasas: 15, fibra: 3.5 },
  { id: 'g4', nombre: 'Nueces', categoria: 'Grasas', porcion: '30g', calorias: 196, proteinas: 4.6, carbohidratos: 4.1, grasas: 20, fibra: 2 },
  { id: 'g5', nombre: 'Mantequilla de cacahuete', categoria: 'Grasas', porcion: '2 cucharadas', calorias: 188, proteinas: 8, carbohidratos: 6, grasas: 16, fibra: 2 },
  { id: 'g6', nombre: 'Semillas de chía', categoria: 'Grasas', porcion: '1 cucharada', calorias: 69, proteinas: 2.5, carbohidratos: 6, grasas: 4.3, fibra: 5 },
  { id: 'g7', nombre: 'Aceitunas', categoria: 'Grasas', porcion: '10 unidades', calorias: 50, proteinas: 0.4, carbohidratos: 2.7, grasas: 4.6, fibra: 1.6 },
  { id: 'g8', nombre: 'Queso cheddar', categoria: 'Grasas', porcion: '30g', calorias: 120, proteinas: 7, carbohidratos: 0.4, grasas: 10, fibra: 0 },

  // Verduras
  { id: 'v1', nombre: 'Brócoli', categoria: 'Verduras', porcion: '100g', calorias: 34, proteinas: 2.8, carbohidratos: 7, grasas: 0.4, fibra: 2.6 },
  { id: 'v2', nombre: 'Espinacas', categoria: 'Verduras', porcion: '100g', calorias: 23, proteinas: 2.9, carbohidratos: 3.6, grasas: 0.4, fibra: 2.2 },
  { id: 'v3', nombre: 'Lechuga', categoria: 'Verduras', porcion: '100g', calorias: 15, proteinas: 1.4, carbohidratos: 2.9, grasas: 0.2, fibra: 1.3 },
  { id: 'v4', nombre: 'Tomate', categoria: 'Verduras', porcion: '1 unidad', calorias: 22, proteinas: 1.1, carbohidratos: 4.8, grasas: 0.2, fibra: 1.5 },
  { id: 'v5', nombre: 'Pimiento', categoria: 'Verduras', porcion: '100g', calorias: 31, proteinas: 1, carbohidratos: 6, grasas: 0.3, fibra: 2.1 },
  { id: 'v6', nombre: 'Zanahoria', categoria: 'Verduras', porcion: '100g', calorias: 41, proteinas: 0.9, carbohidratos: 10, grasas: 0.2, fibra: 2.8 },
  { id: 'v7', nombre: 'Calabacín', categoria: 'Verduras', porcion: '100g', calorias: 17, proteinas: 1.2, carbohidratos: 3.1, grasas: 0.3, fibra: 1 },
  { id: 'v8', nombre: 'Espárragos', categoria: 'Verduras', porcion: '100g', calorias: 20, proteinas: 2.2, carbohidratos: 3.9, grasas: 0.1, fibra: 2.1 },
  { id: 'v9', nombre: 'Pepino', categoria: 'Verduras', porcion: '100g', calorias: 15, proteinas: 0.7, carbohidratos: 3.6, grasas: 0.1, fibra: 0.5 },
  { id: 'v10', nombre: 'Coliflor', categoria: 'Verduras', porcion: '100g', calorias: 25, proteinas: 1.9, carbohidratos: 5, grasas: 0.3, fibra: 2 },

  // Legumbres
  { id: 'l1', nombre: 'Lentejas', categoria: 'Legumbres', porcion: '100g cocidas', calorias: 116, proteinas: 9, carbohidratos: 20, grasas: 0.4, fibra: 7.9 },
  { id: 'l2', nombre: 'Garbanzos', categoria: 'Legumbres', porcion: '100g cocidos', calorias: 164, proteinas: 8.9, carbohidratos: 27, grasas: 2.6, fibra: 7.6 },
  { id: 'l3', nombre: 'Alubias negras', categoria: 'Legumbres', porcion: '100g cocidas', calorias: 132, proteinas: 8.9, carbohidratos: 24, grasas: 0.5, fibra: 8.7 },
  { id: 'l4', nombre: 'Soja texturizada', categoria: 'Legumbres', porcion: '50g', calorias: 173, proteinas: 26, carbohidratos: 15, grasas: 0.5, fibra: 8 },

  // Frutas
  { id: 'f1', nombre: 'Manzana', categoria: 'Frutas', porcion: '1 unidad', calorias: 95, proteinas: 0.5, carbohidratos: 25, grasas: 0.3, fibra: 4.4 },
  { id: 'f2', nombre: 'Naranja', categoria: 'Frutas', porcion: '1 unidad', calorias: 62, proteinas: 1.2, carbohidratos: 15, grasas: 0.2, fibra: 3.1 },
  { id: 'f3', nombre: 'Fresas', categoria: 'Frutas', porcion: '100g', calorias: 32, proteinas: 0.7, carbohidratos: 7.7, grasas: 0.3, fibra: 2 },
  { id: 'f4', nombre: 'Arándanos', categoria: 'Frutas', porcion: '100g', calorias: 57, proteinas: 0.7, carbohidratos: 14, grasas: 0.3, fibra: 2.4 },
  { id: 'f5', nombre: 'Kiwi', categoria: 'Frutas', porcion: '1 unidad', calorias: 42, proteinas: 0.8, carbohidratos: 10, grasas: 0.4, fibra: 2.1 },
  { id: 'f6', nombre: 'Pera', categoria: 'Frutas', porcion: '1 unidad', calorias: 101, proteinas: 0.6, carbohidratos: 27, grasas: 0.2, fibra: 5.5 },
  { id: 'f7', nombre: 'Uvas', categoria: 'Frutas', porcion: '100g', calorias: 69, proteinas: 0.7, carbohidratos: 18, grasas: 0.2, fibra: 0.9 },
  { id: 'f8', nombre: 'Melón', categoria: 'Frutas', porcion: '100g', calorias: 34, proteinas: 0.8, carbohidratos: 8, grasas: 0.2, fibra: 0.9 },
  { id: 'f9', nombre: 'Sandía', categoria: 'Frutas', porcion: '100g', calorias: 30, proteinas: 0.6, carbohidratos: 8, grasas: 0.2, fibra: 0.4 },
  { id: 'f10', nombre: 'Piña', categoria: 'Frutas', porcion: '100g', calorias: 50, proteinas: 0.5, carbohidratos: 13, grasas: 0.1, fibra: 1.4 },

  // Lácteos
  { id: 'd1', nombre: 'Leche desnatada', categoria: 'Lácteos', porcion: '250ml', calorias: 83, proteinas: 8.3, carbohidratos: 12, grasas: 0.2, fibra: 0 },
  { id: 'd2', nombre: 'Leche entera', categoria: 'Lácteos', porcion: '250ml', calorias: 149, proteinas: 7.7, carbohidratos: 12, grasas: 8, fibra: 0 },
  { id: 'd3', nombre: 'Queso fresco', categoria: 'Lácteos', porcion: '100g', calorias: 174, proteinas: 13, carbohidratos: 4, grasas: 13, fibra: 0 },
  { id: 'd4', nombre: 'Yogur natural', categoria: 'Lácteos', porcion: '125g', calorias: 61, proteinas: 5.3, carbohidratos: 7, grasas: 1.6, fibra: 0 },

  // Snacks saludables
  { id: 's1', nombre: 'Tortitas de arroz', categoria: 'Snacks', porcion: '2 unidades', calorias: 70, proteinas: 1.5, carbohidratos: 15, grasas: 0.5, fibra: 0.6 },
  { id: 's2', nombre: 'Hummus', categoria: 'Snacks', porcion: '50g', calorias: 83, proteinas: 2.9, carbohidratos: 7, grasas: 5, fibra: 2.8 },
  { id: 's3', nombre: 'Barritas de proteína', categoria: 'Snacks', porcion: '1 unidad', calorias: 200, proteinas: 20, carbohidratos: 22, grasas: 6, fibra: 3 }
];

export const objetivosPresets: ObjetivoPreset[] = [
  {
    id: 'perdida-peso',
    nombre: 'Pérdida de Peso',
    descripcion: 'Déficit calórico moderado con alta proteína',
    icono: '📉',
    distribucionMacros: {
      proteinas: 40,
      carbohidratos: 30,
      grasas: 30
    }
  },
  {
    id: 'ganancia-muscular',
    nombre: 'Ganancia Muscular',
    descripcion: 'Superávit calórico con proteína elevada',
    icono: '💪',
    distribucionMacros: {
      proteinas: 30,
      carbohidratos: 50,
      grasas: 20
    }
  },
  {
    id: 'mantenimiento',
    nombre: 'Mantenimiento',
    descripcion: 'Balance calórico equilibrado',
    icono: '⚖️',
    distribucionMacros: {
      proteinas: 30,
      carbohidratos: 40,
      grasas: 30
    }
  },
  {
    id: 'recomposicion',
    nombre: 'Recomposición Corporal',
    descripcion: 'Proteína muy alta con carbos moderados',
    icono: '🔄',
    distribucionMacros: {
      proteinas: 40,
      carbohidratos: 35,
      grasas: 25
    }
  },
  {
    id: 'keto',
    nombre: 'Dieta Cetogénica',
    descripcion: 'Muy baja en carbohidratos, alta en grasas',
    icono: '🥓',
    distribucionMacros: {
      proteinas: 25,
      carbohidratos: 5,
      grasas: 70
    }
  },
  {
    id: 'alta-proteina',
    nombre: 'Alta Proteína',
    descripcion: 'Máxima proteína para atletas',
    icono: '🍗',
    distribucionMacros: {
      proteinas: 45,
      carbohidratos: 35,
      grasas: 20
    }
  }
];

export const nivelesActividad = [
  { id: 'sedentario', label: 'Sedentario', multiplicador: 1.2, descripcion: 'Poco o ningún ejercicio' },
  { id: 'ligero', label: 'Actividad Ligera', multiplicador: 1.375, descripcion: 'Ejercicio 1-3 días/semana' },
  { id: 'moderado', label: 'Actividad Moderada', multiplicador: 1.55, descripcion: 'Ejercicio 3-5 días/semana' },
  { id: 'intenso', label: 'Actividad Intensa', multiplicador: 1.725, descripcion: 'Ejercicio 6-7 días/semana' },
  { id: 'muy-intenso', label: 'Muy Intenso', multiplicador: 1.9, descripcion: 'Ejercicio 2 veces al día' }
];

export const velocidadesProgreso = [
  { id: 'lento', label: 'Lento', deficit: 250, superavit: 200, descripcion: '0.25-0.5kg/semana' },
  { id: 'moderado', label: 'Moderado', deficit: 500, superavit: 350, descripcion: '0.5-0.75kg/semana' },
  { id: 'rapido', label: 'Rápido', deficit: 750, superavit: 500, descripcion: '0.75-1kg/semana' }
];

export const tiposComida = [
  'Desayuno',
  'Media mañana',
  'Almuerzo',
  'Merienda',
  'Cena',
  'Post-entreno'
];

export const diasSemana = [
  'Lunes',
  'Martes',
  'Miércoles',
  'Jueves',
  'Viernes',
  'Sábado',
  'Domingo'
];
