export interface NutritionalValues {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber?: number;
  sodium?: number;
  sugar?: number;
}

export interface Receta {
  id: string;
  name: string;
  type: 'Desayuno' | 'Almuerzo' | 'Cena' | 'Snack';
  ingredients: string[];
  steps: string[];
  nutritionalValues: NutritionalValues;
  tags: string[];
  isFavorite: boolean;
  photoUrl?: string;
  personalNotes?: string;
  portions: number;
  prepTime: number; // en minutos
  cookTime: number; // en minutos
  difficulty: 'Fácil' | 'Media' | 'Difícil';
  rating: number; // 0-5
  videoUrl?: string;
  restrictions: string[]; // vegano, vegetariano, sin gluten, sin lactosa
  featured?: boolean; // Receta destacada
  badge?: 'Más Popular' | 'Nuevo' | "Chef's Choice"; // Badges especiales
}

// Datos mockeados completos (80-100 recetas)
const MOCK_RECETAS: Receta[] = [
  // Desayunos (20 recetas)
  {
    id: '1',
    name: 'Bowl de Açaí con Frutas Tropicales',
    type: 'Desayuno',
    ingredients: ['200g açaí congelado', '1 plátano', '100ml leche de coco', 'Granola', 'Mango en cubos', 'Fresas', 'Coco rallado', 'Miel'],
    steps: [
      'Licuar el açaí congelado con el plátano y la leche de coco hasta obtener una mezcla espesa.',
      'Verter en un bowl.',
      'Decorar con granola, mango, fresas y coco rallado.',
      'Agregar un toque de miel al gusto.',
    ],
    nutritionalValues: { calories: 380, protein: 8, carbs: 65, fat: 12, fiber: 10, sugar: 35 },
    tags: ['saludable', 'energético', 'antioxidantes'],
    isFavorite: false,
    photoUrl: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=400&h=300&fit=crop',
    portions: 1,
    prepTime: 10,
    cookTime: 0,
    difficulty: 'Fácil',
    rating: 5,
    restrictions: ['Vegano', 'Sin gluten'],
    featured: true,
    badge: 'Más Popular',
  },
  {
    id: '2',
    name: 'Tostadas de Aguacate y Huevo Poché',
    type: 'Desayuno',
    ingredients: ['2 rebanadas pan integral', '1 aguacate maduro', '2 huevos', 'Tomates cherry', 'Aceite de oliva', 'Sal y pimienta', 'Semillas de chía'],
    steps: [
      'Tostar el pan integral.',
      'Preparar huevos poché en agua hirviendo con vinagre.',
      'Machacar el aguacate y esparcir sobre las tostadas.',
      'Colocar el huevo poché encima.',
      'Decorar con tomates cherry cortados, semillas de chía, sal y pimienta.',
    ],
    nutritionalValues: { calories: 420, protein: 18, carbs: 35, fat: 24, fiber: 12 },
    tags: ['proteínas', 'saludable', 'grasas saludables'],
    isFavorite: true,
    photoUrl: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=400&h=300&fit=crop',
    portions: 1,
    prepTime: 10,
    cookTime: 5,
    difficulty: 'Media',
    rating: 5,
    restrictions: ['Vegetariano'],
  },
  {
    id: '3',
    name: 'Pancakes de Avena y Plátano',
    type: 'Desayuno',
    ingredients: ['2 plátanos maduros', '1 taza avena', '2 huevos', '1 cucharadita canela', 'Miel', 'Arándanos frescos'],
    steps: [
      'Triturar los plátanos hasta obtener un puré.',
      'Mezclar con avena, huevos y canela.',
      'Cocinar pequeñas porciones en sartén antiadherente.',
      'Servir con miel y arándanos.',
    ],
    nutritionalValues: { calories: 340, protein: 14, carbs: 52, fat: 8, fiber: 8 },
    tags: ['fitness', 'sin azúcar añadido', 'alto en fibra'],
    isFavorite: false,
    photoUrl: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=300&fit=crop',
    portions: 2,
    prepTime: 10,
    cookTime: 15,
    difficulty: 'Fácil',
    rating: 4,
    restrictions: ['Vegetariano'],
  },
  {
    id: '4',
    name: 'Smoothie Bowl Verde Detox',
    type: 'Desayuno',
    ingredients: ['2 tazas espinacas', '1 plátano congelado', '1/2 mango', '200ml agua de coco', 'Semillas de chía', 'Kiwi', 'Almendras'],
    steps: [
      'Licuar espinacas, plátano, mango y agua de coco.',
      'Verter en un bowl.',
      'Decorar con kiwi en rodajas, semillas de chía y almendras.',
    ],
    nutritionalValues: { calories: 280, protein: 7, carbs: 48, fat: 9, fiber: 11 },
    tags: ['detox', 'verde', 'vitaminas'],
    isFavorite: false,
    photoUrl: 'https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=400&h=300&fit=crop',
    portions: 1,
    prepTime: 8,
    cookTime: 0,
    difficulty: 'Fácil',
    rating: 4,
    restrictions: ['Vegano', 'Sin gluten'],
    featured: true,
  },
  {
    id: '5',
    name: 'Yogurt Griego con Granola Casera',
    type: 'Desayuno',
    ingredients: ['250g yogurt griego', 'Avena', 'Nueces', 'Almendras', 'Miel', 'Frambuesas', 'Arándanos'],
    steps: [
      'Mezclar avena con nueces picadas, almendras y miel.',
      'Hornear a 160°C por 20 minutos para hacer granola.',
      'Servir yogurt con la granola y frutas frescas encima.',
    ],
    nutritionalValues: { calories: 390, protein: 22, carbs: 42, fat: 16, fiber: 6 },
    tags: ['proteínas', 'probióticos', 'casero'],
    isFavorite: true,
    photoUrl: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=300&fit=crop',
    portions: 1,
    prepTime: 10,
    cookTime: 20,
    difficulty: 'Media',
    rating: 5,
    restrictions: ['Vegetariano', 'Sin gluten'],
  },
  // Continúan más recetas variadas...
  {
    id: '6',
    name: 'Omelette de Claras con Vegetales',
    type: 'Desayuno',
    ingredients: ['4 claras de huevo', 'Espinacas', 'Champiñones', 'Tomate', 'Cebolla', 'Pimiento rojo', 'Queso feta bajo en grasa'],
    steps: [
      'Batir las claras de huevo.',
      'Saltear los vegetales en sartén antiadherente.',
      'Verter las claras sobre los vegetales.',
      'Cocinar hasta que cuaje, agregar queso feta y doblar.',
    ],
    nutritionalValues: { calories: 180, protein: 24, carbs: 12, fat: 4, fiber: 3 },
    tags: ['alto proteína', 'bajo carbos', 'fitness'],
    isFavorite: false,
    photoUrl: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=300&fit=crop',
    portions: 1,
    prepTime: 10,
    cookTime: 10,
    difficulty: 'Fácil',
    rating: 4,
    restrictions: ['Vegetariano', 'Sin gluten'],
  },
  {
    id: '7',
    name: 'Porridge de Avena con Canela y Manzana',
    type: 'Desayuno',
    ingredients: ['1 taza avena', '300ml leche de almendras', '1 manzana', 'Canela', 'Nueces', 'Pasas', 'Miel'],
    steps: [
      'Cocinar la avena con la leche de almendras a fuego lento.',
      'Agregar canela al gusto.',
      'Cortar la manzana en cubos pequeños y agregar.',
      'Servir con nueces, pasas y un toque de miel.',
    ],
    nutritionalValues: { calories: 320, protein: 10, carbs: 54, fat: 9, fiber: 9 },
    tags: ['reconfortante', 'fibra', 'energía'],
    isFavorite: false,
    photoUrl: 'https://images.unsplash.com/photo-1517673132405-a56a62b18caf?w=400&h=300&fit=crop',
    portions: 1,
    prepTime: 5,
    cookTime: 10,
    difficulty: 'Fácil',
    rating: 4,
    restrictions: ['Vegano'],
  },
  {
    id: '8',
    name: 'Waffles Proteicos de Chocolate',
    type: 'Desayuno',
    ingredients: ['1 scoop proteína chocolate', '1 huevo', '1/2 taza avena', 'Leche de almendras', 'Cacao en polvo', 'Fresas', 'Yogurt griego'],
    steps: [
      'Mezclar todos los ingredientes secos.',
      'Agregar huevo y leche hasta formar masa.',
      'Cocinar en waflera caliente.',
      'Servir con fresas y yogurt griego.',
    ],
    nutritionalValues: { calories: 360, protein: 32, carbs: 38, fat: 8, fiber: 6 },
    tags: ['proteínas', 'fitness', 'post-entreno'],
    isFavorite: true,
    photoUrl: 'https://images.unsplash.com/photo-1562376552-0d160a2f238d?w=400&h=300&fit=crop',
    portions: 1,
    prepTime: 10,
    cookTime: 10,
    difficulty: 'Media',
    rating: 5,
    restrictions: ['Vegetariano'],
    videoUrl: 'https://example.com/waffles',
  },
  // Más desayunos...
  {
    id: '9',
    name: 'Burrito de Desayuno con Frijoles Negros',
    type: 'Desayuno',
    ingredients: ['Tortilla integral', 'Frijoles negros', '2 huevos revueltos', 'Aguacate', 'Queso cheddar bajo en grasa', 'Salsa pico de gallo', 'Cilantro'],
    steps: [
      'Calentar la tortilla.',
      'Colocar frijoles negros, huevos revueltos y aguacate.',
      'Agregar queso y salsa pico de gallo.',
      'Enrollar y disfrutar.',
    ],
    nutritionalValues: { calories: 450, protein: 24, carbs: 48, fat: 18, fiber: 12 },
    tags: ['completo', 'proteínas', 'mexicano'],
    isFavorite: false,
    photoUrl: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400&h=300&fit=crop',
    portions: 1,
    prepTime: 15,
    cookTime: 10,
    difficulty: 'Media',
    rating: 4,
    restrictions: ['Vegetariano'],
  },
  {
    id: '10',
    name: 'Batido de Proteína con Mantequilla de Maní',
    type: 'Desayuno',
    ingredients: ['1 scoop proteína vainilla', '1 plátano', '2 cucharadas mantequilla de maní', 'Leche de almendras', 'Hielo', 'Cacao nibs'],
    steps: [
      'Colocar todos los ingredientes en licuadora.',
      'Licuar hasta obtener consistencia cremosa.',
      'Servir con cacao nibs encima.',
    ],
    nutritionalValues: { calories: 420, protein: 35, carbs: 38, fat: 14, fiber: 5 },
    tags: ['proteínas', 'rápido', 'energético'],
    isFavorite: true,
    photoUrl: 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=400&h=300&fit=crop',
    portions: 1,
    prepTime: 5,
    cookTime: 0,
    difficulty: 'Fácil',
    rating: 5,
    restrictions: [],
    badge: "Chef's Choice",
  },
  // Continuamos con más tipos de comida...
];

// Generar recetas adicionales programáticamente para llegar a 80-100
const generateAdditionalRecetas = (): Receta[] => {
  const types: Array<'Desayuno' | 'Almuerzo' | 'Cena' | 'Snack'> = ['Desayuno', 'Almuerzo', 'Cena', 'Snack'];
  const difficulties: Array<'Fácil' | 'Media' | 'Difícil'> = ['Fácil', 'Media', 'Difícil'];
  const restrictions = ['Vegano', 'Vegetariano', 'Sin gluten', 'Sin lactosa'];
  const tags = ['saludable', 'rápido', 'fitness', 'proteínas', 'bajo carbos', 'alto proteína', 'detox'];

  const recipeNames = {
    Desayuno: ['Crepes Integrales', 'Muffins de Zanahoria', 'Pudding de Chía', 'Tostadas Francesas', 'Shakshuka', 'Croissant de Almendras', 'Frittata de Verduras', 'Bagel con Salmón', 'Huevos Benedictinos', 'Quinoa Bowl'],
    Almuerzo: ['Poke Bowl de Atún', 'Ensalada César con Pollo', 'Wrap de Pavo y Aguacate', 'Buddha Bowl', 'Pasta Integral con Pesto', 'Salmón al Horno con Espárragos', 'Pollo Teriyaki', 'Tacos de Pescado', 'Quinoa con Vegetales Asados', 'Risotto de Champiñones', 'Pad Thai de Camarones', 'Hamburguesa de Lentejas', 'Sushi Bowl', 'Fajitas de Pollo', 'Lasaña de Berenjena', 'Curry de Garbanzos', 'Pechuga Rellena', 'Bowl Mediterráneo', 'Lomo Saltado', 'Bibimbap Coreano'],
    Cena: ['Sopa de Lentejas', 'Ensalada Caprese', 'Tortilla Española Light', 'Salmón a la Plancha', 'Pollo al Limón', 'Vegetales al Vapor', 'Crema de Calabaza', 'Filete de Pescado', 'Ensalada Griega', 'Brochetas de Pollo', 'Ratatouille', 'Gazpacho Andaluz', 'Merluza al Papillote', 'Coliflor Asada', 'Tofu Marinado', 'Calabacín Relleno', 'Sopa Miso', 'Ensalada de Atún', 'Champiñones Portobello', 'Pimientos Rellenos'],
    Snack: ['Energy Balls', 'Hummus con Vegetales', 'Palitos de Zanahoria', 'Chips de Kale', 'Rollitos de Pavo', 'Edamame', 'Barritas de Granola', 'Smoothie Verde', 'Yogurt con Miel', 'Nueces Mixtas', 'Apple Slices con Mantequilla de Almendra', 'Pepinos con Tzatziki', 'Mini Caprese Skewers', 'Guacamole con Chips', 'Queso Cottage con Frutas', 'Trail Mix Casero', 'Palomitas de Maíz Saludables', 'Huevo Duro', 'Proteína Shake', 'Rodajas de Manzana'],
  };

  const additionalRecetas: Receta[] = [];
  let idCounter = 11;

  types.forEach((type) => {
    const names = recipeNames[type];
    names.forEach((name, idx) => {
      const prepTime = [5, 10, 15, 20, 30, 45][idx % 6];
      const cookTime = [0, 10, 15, 20, 30, 45][idx % 6];
      const rating = ([3, 4, 4, 5, 5][idx % 5]) as 3 | 4 | 5;
      const difficulty = difficulties[idx % 3];
      const calories = type === 'Snack' ? 100 + (idx * 20) : 250 + (idx * 30);

      additionalRecetas.push({
        id: `${idCounter++}`,
        name: name,
        type: type,
        ingredients: ['Ingrediente 1', 'Ingrediente 2', 'Ingrediente 3', 'Ingrediente 4', 'Ingrediente 5'],
        steps: [
          'Preparar todos los ingredientes.',
          'Seguir las instrucciones de cocción apropiadas.',
          'Mezclar o cocinar según sea necesario.',
          'Servir y disfrutar.',
        ],
        nutritionalValues: {
          calories: calories,
          protein: 10 + (idx % 25),
          carbs: 20 + (idx % 35),
          fat: 5 + (idx % 20),
          fiber: 3 + (idx % 8),
        },
        tags: [tags[idx % tags.length], tags[(idx + 1) % tags.length]],
        isFavorite: idx % 8 === 0,
        photoUrl: `https://images.unsplash.com/photo-${1540189520 + idCounter}?w=400&h=300&fit=crop`,
        portions: (idx % 4) + 1,
        prepTime: prepTime,
        cookTime: cookTime,
        difficulty: difficulty,
        rating: rating,
        videoUrl: idx % 5 === 0 ? 'https://example.com/video' : undefined,
        restrictions: idx % 3 === 0 ? [restrictions[idx % restrictions.length]] : [],
        featured: idx % 10 === 0,
        badge: idx % 15 === 0 ? (['Más Popular', 'Nuevo', "Chef's Choice"][idx % 3] as any) : undefined,
      });
    });
  });

  return additionalRecetas;
};

const ALL_RECETAS = [...MOCK_RECETAS, ...generateAdditionalRecetas()];

// Mock API functions
export const fetchRecetas = async (): Promise<Receta[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(ALL_RECETAS);
    }, 500);
  });
};

export const updateReceta = async (receta: Receta): Promise<Receta> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Updating receta:', receta);
      resolve(receta);
    }, 300);
  });
};
