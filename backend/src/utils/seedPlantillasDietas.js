import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import PlantillaDieta from '../models/PlantillaDieta.model.js';
import Trainer from '../models/Trainer.model.js';
import connectDB from '../config/db.js';

// Get __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load env vars from backend/.env
dotenv.config({ path: join(__dirname, '../../.env') });

// Mock plantillas dietas data
const mockPlantillasDietas = [
  {
    name: 'Dieta Keto para Principiantes',
    description: 'Plan cetogénico equilibrado perfecto para iniciar tu transformación con bajo contenido en carbohidratos',
    objective: 'perdida_peso',
    dietType: 'keto',
    time_level: 'advanced',
    culinary_experience: 'intermediate',
    calories: 1800,
    macros: { protein: 100, carbs: 20, fat: 140 },
    duration_weeks: 4,
    is_favorite: false,
    is_public: true,
    restrictions: ['Sin gluten', 'Baja en carbohidratos'],
    allergens: ['Lácteos', 'Huevos'],
    rating: 4.8,
    uses: 1247,
    reviews: 89,
    estado: 'activa',
    weekly_menu: [
      {
        breakfast: { name: 'Huevos revueltos con aguacate', description: 'Cremoso y saciante', calories: 350, macros: { protein: 20, carbs: 5, fat: 28 }, foods: ['2 huevos', '1/2 aguacate', 'Sal marina', 'Pimienta'] },
        lunch: { name: 'Ensalada de pollo y espinacas', description: 'Rica en proteínas y grasas saludables', calories: 500, macros: { protein: 40, carbs: 10, fat: 35 }, foods: ['200g pechuga pollo', 'Espinacas frescas', '2 cdas aceite oliva', 'Nueces'] },
        dinner: { name: 'Salmón al horno con brócoli', description: 'Omega-3 y vegetales al vapor', calories: 600, macros: { protein: 45, carbs: 15, fat: 40 }, foods: ['180g salmón', 'Brócoli', 'Mantequilla', 'Limón'] }
      }
    ]
  },
  {
    name: 'Volumen Rápido y Efectivo',
    description: 'Maximiza tu ganancia muscular con recetas rápidas y alto contenido calórico',
    objective: 'ganancia_muscular',
    dietType: 'alta_proteina',
    time_level: 'quick',
    culinary_experience: 'beginner',
    calories: 2800,
    macros: { protein: 180, carbs: 300, fat: 100 },
    duration_weeks: 8,
    is_favorite: true,
    is_public: true,
    restrictions: [],
    allergens: ['Lácteos'],
    rating: 4.9,
    uses: 2341,
    reviews: 156,
    estado: 'activa',
    weekly_menu: [
      {
        breakfast: { name: 'Avena con proteína y plátano', description: 'Energía duradera para el día', calories: 600, macros: { protein: 40, carbs: 80, fat: 15 }, foods: ['80g avena', '1 scoop proteína', '1 plátano', 'Miel'] },
        lunch: { name: 'Arroz con pollo y verduras', description: 'Clásico del culturismo', calories: 800, macros: { protein: 60, carbs: 100, fat: 20 }, foods: ['150g arroz', '200g pollo', 'Verduras mixtas', 'Aceite'] },
        dinner: { name: 'Pasta integral con carne', description: 'Carbohidratos complejos y proteína', calories: 900, macros: { protein: 70, carbs: 120, fat: 25 }, foods: ['120g pasta', '180g carne picada', 'Salsa tomate', 'Queso'] }
      }
    ]
  },
  {
    name: 'Mantenimiento Sin Cocina',
    description: 'Alimentación equilibrada sin necesidad de cocinar, perfecta para profesionales ocupados',
    objective: 'mantenimiento',
    dietType: 'flexible',
    time_level: 'no_cook',
    culinary_experience: 'beginner',
    calories: 2200,
    macros: { protein: 120, carbs: 200, fat: 80 },
    duration_weeks: 12,
    is_favorite: false,
    is_public: true,
    restrictions: [],
    allergens: ['Lácteos', 'Frutos secos'],
    rating: 4.6,
    uses: 892,
    reviews: 67,
    estado: 'activa',
    weekly_menu: [
      {
        breakfast: { name: 'Yogur con frutas y frutos secos', description: 'Desayuno rápido y nutritivo', calories: 400, macros: { protein: 25, carbs: 40, fat: 15 }, foods: ['200g yogur griego', 'Bayas frescas', '30g nueces', 'Miel'] },
        lunch: { name: 'Ensalada de legumbres y atún', description: 'Proteína vegetal y animal', calories: 600, macros: { protein: 35, carbs: 60, fat: 20 }, foods: ['150g garbanzos', '1 lata atún', 'Verduras', 'Vinagreta'] },
        dinner: { name: 'Sándwich integral de pavo', description: 'Cena ligera y saciante', calories: 500, macros: { protein: 30, carbs: 50, fat: 18 }, foods: ['Pan integral', '100g pavo', 'Queso', 'Lechuga/tomate'] }
      }
    ]
  },
  {
    name: 'Mediterránea Saludable',
    description: 'La dieta más estudiada del mundo, rica en aceite de oliva y pescado',
    objective: 'salud_general',
    dietType: 'mediterranea',
    time_level: 'advanced',
    culinary_experience: 'intermediate',
    calories: 2100,
    macros: { protein: 110, carbs: 220, fat: 85 },
    duration_weeks: 16,
    is_favorite: true,
    is_public: true,
    restrictions: [],
    allergens: ['Pescado', 'Frutos secos'],
    rating: 4.9,
    uses: 3156,
    reviews: 234,
    estado: 'activa',
    weekly_menu: [
      {
        breakfast: { name: 'Tostadas con tomate y aceite', description: 'Desayuno mediterráneo tradicional', calories: 380, macros: { protein: 15, carbs: 50, fat: 18 }, foods: ['Pan integral', 'Tomate fresco', 'Aceite oliva virgen', 'Jamón'] },
        lunch: { name: 'Paella de mariscos', description: 'Arroz con productos del mar', calories: 650, macros: { protein: 45, carbs: 75, fat: 22 }, foods: ['Arroz', 'Mariscos variados', 'Azafrán', 'Verduras'] },
        dinner: { name: 'Merluza al horno con verduras', description: 'Pescado blanco con vegetales', calories: 520, macros: { protein: 40, carbs: 35, fat: 25 }, foods: ['200g merluza', 'Patatas', 'Pimientos', 'Aceite'] }
      }
    ]
  },
  {
    name: 'Vegana Alta en Proteína',
    description: 'Plan 100% vegetal optimizado para el desarrollo muscular',
    objective: 'ganancia_muscular',
    dietType: 'vegana',
    time_level: 'quick',
    culinary_experience: 'intermediate',
    calories: 2600,
    macros: { protein: 150, carbs: 320, fat: 75 },
    duration_weeks: 10,
    is_favorite: false,
    is_public: true,
    restrictions: ['Vegano', 'Sin productos animales'],
    allergens: ['Soja', 'Frutos secos'],
    rating: 4.7,
    uses: 1834,
    reviews: 142,
    estado: 'activa',
    weekly_menu: [
      {
        breakfast: { name: 'Bowl de proteína vegetal', description: 'Batido completo y nutritivo', calories: 550, macros: { protein: 35, carbs: 70, fat: 15 }, foods: ['Proteína de guisante', 'Avena', 'Plátano', 'Mantequilla almendras'] },
        lunch: { name: 'Buddha bowl de quinoa', description: 'Superalimento con proteína completa', calories: 700, macros: { protein: 40, carbs: 95, fat: 22 }, foods: ['150g quinoa', 'Garbanzos', 'Aguacate', 'Verduras'] },
        dinner: { name: 'Tofu salteado con arroz', description: 'Proteína de soja con vegetales', calories: 650, macros: { protein: 45, carbs: 80, fat: 20 }, foods: ['200g tofu firme', 'Arroz integral', 'Brócoli', 'Salsa soja'] }
      }
    ]
  },
  {
    name: 'Definición Extrema',
    description: 'Plan hipocalórico para pérdida de grasa manteniendo músculo',
    objective: 'definicion',
    dietType: 'baja_carbos',
    time_level: 'advanced',
    culinary_experience: 'expert',
    calories: 1600,
    macros: { protein: 140, carbs: 80, fat: 70 },
    duration_weeks: 6,
    is_favorite: true,
    is_public: true,
    restrictions: ['Baja en carbohidratos', 'Alta en proteína'],
    allergens: ['Huevos', 'Pescado'],
    rating: 4.8,
    uses: 1567,
    reviews: 98,
    estado: 'activa',
    weekly_menu: [
      {
        breakfast: { name: 'Claras de huevo con espinacas', description: 'Proteína pura para empezar', calories: 250, macros: { protein: 30, carbs: 8, fat: 12 }, foods: ['6 claras + 1 huevo', 'Espinacas', 'Champiñones', 'Sal'] },
        lunch: { name: 'Pechuga a la plancha con brócoli', description: 'Comida limpia y efectiva', calories: 450, macros: { protein: 55, carbs: 20, fat: 18 }, foods: ['250g pechuga', 'Brócoli al vapor', 'Limón', 'Especias'] },
        dinner: { name: 'Pescado blanco con ensalada', description: 'Cena ligera alta en proteína', calories: 380, macros: { protein: 45, carbs: 15, fat: 20 }, foods: ['200g pescado', 'Ensalada verde', 'Vinagre', 'Aceite oliva'] }
      }
    ]
  },
  {
    name: 'Ayuno Intermitente 16/8',
    description: 'Protocolo de alimentación limitada en el tiempo con 2 comidas principales',
    objective: 'perdida_peso',
    dietType: 'intermitente',
    time_level: 'quick',
    culinary_experience: 'beginner',
    calories: 1900,
    macros: { protein: 130, carbs: 150, fat: 85 },
    duration_weeks: 8,
    is_favorite: false,
    is_public: true,
    restrictions: ['Ayuno intermitente'],
    allergens: [],
    rating: 4.7,
    uses: 2103,
    reviews: 167,
    estado: 'activa',
    weekly_menu: [
      {
        breakfast: { name: 'No hay desayuno (ayuno)', description: 'Ventana de ayuno hasta las 13:00', calories: 0, macros: { protein: 0, carbs: 0, fat: 0 }, foods: ['Agua', 'Café negro', 'Té verde'] },
        lunch: { name: 'Primera comida - Bowl completo', description: 'Romper ayuno con nutrientes', calories: 900, macros: { protein: 60, carbs: 85, fat: 45 }, foods: ['Arroz', 'Pollo', 'Aguacate', 'Verduras'] },
        dinner: { name: 'Segunda comida - Salmón y batata', description: 'Última comida antes de las 21:00', calories: 750, macros: { protein: 50, carbs: 65, fat: 35 }, foods: ['180g salmón', 'Batata asada', 'Espárragos', 'Aceite'] }
      }
    ]
  },
  {
    name: 'Vegetariana Equilibrada',
    description: 'Nutrición completa sin carne pero con huevos y lácteos',
    objective: 'mantenimiento',
    dietType: 'vegetariana',
    time_level: 'advanced',
    culinary_experience: 'intermediate',
    calories: 2300,
    macros: { protein: 115, carbs: 260, fat: 90 },
    duration_weeks: 12,
    is_favorite: false,
    is_public: true,
    restrictions: ['Vegetariano'],
    allergens: ['Huevos', 'Lácteos', 'Frutos secos'],
    rating: 4.6,
    uses: 1456,
    reviews: 112,
    estado: 'activa',
    weekly_menu: [
      {
        breakfast: { name: 'Tortilla de verduras con queso', description: 'Desayuno proteico vegetariano', calories: 420, macros: { protein: 28, carbs: 35, fat: 22 }, foods: ['3 huevos', 'Verduras variadas', 'Queso feta', 'Pan integral'] },
        lunch: { name: 'Lentejas con arroz integral', description: 'Proteína vegetal completa', calories: 680, macros: { protein: 35, carbs: 95, fat: 24 }, foods: ['Lentejas', 'Arroz integral', 'Zanahoria', 'Cebolla'] },
        dinner: { name: 'Pizza vegetariana casera', description: 'Cena completa y sabrosa', calories: 720, macros: { protein: 32, carbs: 85, fat: 30 }, foods: ['Masa integral', 'Queso mozzarella', 'Verduras asadas', 'Salsa tomate'] }
      }
    ]
  },
  {
    name: 'Paleo Performance',
    description: 'Dieta ancestral para optimizar rendimiento y salud',
    objective: 'rendimiento',
    dietType: 'paleo',
    time_level: 'advanced',
    culinary_experience: 'expert',
    calories: 2400,
    macros: { protein: 140, carbs: 180, fat: 110 },
    duration_weeks: 8,
    is_favorite: true,
    is_public: true,
    restrictions: ['Sin granos', 'Sin lácteos', 'Sin legumbres'],
    allergens: ['Frutos secos', 'Huevos'],
    rating: 4.5,
    uses: 987,
    reviews: 76,
    estado: 'activa',
    weekly_menu: [
      {
        breakfast: { name: 'Huevos con batata y aguacate', description: 'Desayuno paleo energético', calories: 520, macros: { protein: 28, carbs: 45, fat: 30 }, foods: ['3 huevos', 'Batata', 'Aguacate', 'Ghee'] },
        lunch: { name: 'Pollo asado con vegetales', description: 'Comida paleo completa', calories: 750, macros: { protein: 65, carbs: 50, fat: 42 }, foods: ['250g pollo', 'Boniato', 'Brócoli', 'Aceite coco'] },
        dinner: { name: 'Bistec con ensalada grande', description: 'Proteína y vegetales', calories: 680, macros: { protein: 55, carbs: 35, fat: 40 }, foods: ['200g bistec', 'Ensalada mixta', 'Nueces', 'Vinagreta'] }
      }
    ]
  },
  {
    name: 'Volumen Limpio Premium',
    description: 'Gana masa muscular sin acumular grasa excesiva',
    objective: 'volumen_limpio',
    dietType: 'flexible',
    time_level: 'quick',
    culinary_experience: 'intermediate',
    calories: 3000,
    macros: { protein: 200, carbs: 350, fat: 100 },
    duration_weeks: 12,
    is_favorite: true,
    is_public: true,
    restrictions: [],
    allergens: ['Lácteos', 'Huevos'],
    rating: 4.9,
    uses: 2789,
    reviews: 201,
    estado: 'activa',
    weekly_menu: [
      {
        breakfast: { name: 'Pancakes proteicos con frutas', description: 'Desayuno anabólico delicioso', calories: 650, macros: { protein: 45, carbs: 80, fat: 20 }, foods: ['Claras de huevo', 'Avena', 'Proteína', 'Arándanos', 'Miel'] },
        lunch: { name: 'Arroz basmati con ternera', description: 'Comida de culturista', calories: 950, macros: { protein: 75, carbs: 110, fat: 32 }, foods: ['180g arroz', '220g ternera', 'Verduras', 'Aceite oliva'] },
        dinner: { name: 'Pasta con pavo y salsa', description: 'Carbohidratos y proteína magra', calories: 850, macros: { protein: 60, carbs: 105, fat: 28 }, foods: ['150g pasta', '200g pavo picado', 'Salsa tomate', 'Queso'] },
        snacks: [
          { name: 'Batido post-entreno', description: 'Recuperación muscular', calories: 350, macros: { protein: 40, carbs: 45, fat: 8 }, foods: ['2 scoops proteína', 'Plátano', 'Leche', 'Creatina'] }
        ]
      }
    ]
  },
  {
    name: 'Recomposición Corporal',
    description: 'Pierde grasa y gana músculo simultáneamente con macros optimizados',
    objective: 'recomposicion',
    dietType: 'flexible',
    time_level: 'advanced',
    culinary_experience: 'intermediate',
    calories: 2100,
    macros: { protein: 170, carbs: 180, fat: 75 },
    duration_weeks: 10,
    is_favorite: false,
    is_public: true,
    restrictions: [],
    allergens: ['Lácteos', 'Huevos'],
    rating: 4.7,
    uses: 1523,
    reviews: 134,
    estado: 'activa',
    weekly_menu: [
      {
        breakfast: { name: 'Tortilla de claras con avena', description: 'Proteína y carbos para empezar', calories: 450, macros: { protein: 35, carbs: 50, fat: 12 }, foods: ['5 claras + 1 huevo', '60g avena', 'Arándanos', 'Canela'] },
        lunch: { name: 'Pollo con quinoa y verduras', description: 'Comida balanceada', calories: 700, macros: { protein: 60, carbs: 70, fat: 22 }, foods: ['200g pollo', '100g quinoa', 'Verduras al vapor', 'Aceite oliva'] },
        dinner: { name: 'Pescado con boniato', description: 'Cena ligera pero nutritiva', calories: 550, macros: { protein: 50, carbs: 60, fat: 18 }, foods: ['180g pescado blanco', 'Boniato asado', 'Espárragos', 'Limón'] },
        snacks: [
          { name: 'Proteína y frutos secos', description: 'Snack proteico', calories: 250, macros: { protein: 30, carbs: 10, fat: 12 }, foods: ['1 scoop proteína', '20g almendras', 'Agua'] }
        ]
      }
    ]
  }
];

const seedPlantillasDietas = async () => {
  try {
    // Connect to database
    await connectDB();

    console.log('🔍 Buscando trainers existentes...');
    const trainers = await Trainer.find({});

    if (trainers.length === 0) {
      console.log('⚠️  No hay trainers en la base de datos.');
      console.log('💡 Ejecuta primero: npm run seed:trainers');
      process.exit(1);
    }

    console.log(`✅ ${trainers.length} trainers encontrados\n`);

    console.log('🗑️  Eliminando plantillas de dietas existentes...');
    await PlantillaDieta.deleteMany({});

    console.log('📝 Creando plantillas de dietas para cada trainer...\n');

    let totalCreated = 0;
    const firstTrainer = trainers[0];

    // Create public templates only for the first trainer (Plan Core)
    console.log(`\n📋 Creando plantillas públicas de dietas (${firstTrainer.name} - ${firstTrainer.plan})`);

    const plantillasWithTrainer = mockPlantillasDietas.map(plantilla => ({
      ...plantilla,
      trainerId: firstTrainer._id,
      author: {
        name: firstTrainer.name,
        avatar: firstTrainer.avatar || ''
      }
    }));

    const plantillasPublicas = await PlantillaDieta.create(plantillasWithTrainer);
    totalCreated += plantillasPublicas.length;
    console.log(`   ✅ ${plantillasPublicas.length} plantillas públicas creadas`);

    // Create some private templates for each trainer
    for (const trainer of trainers) {
      console.log(`\n📋 Creando plantillas privadas para: ${trainer.name} (${trainer.plan})`);

      const plantillasPrivadas = [
        {
          name: 'Mi Plan Nutricional Personalizado',
          description: 'Plan de alimentación adaptado a mis necesidades y objetivos específicos',
          trainerId: trainer._id,
          author: {
            name: trainer.name,
            avatar: trainer.avatar || ''
          },
          objective: 'mantenimiento',
          dietType: 'flexible',
          time_level: 'quick',
          culinary_experience: 'intermediate',
          calories: 2200,
          macros: { protein: 130, carbs: 220, fat: 80 },
          duration_weeks: 8,
          is_public: false,
          is_favorite: true,
          restrictions: [],
          allergens: [],
          rating: 0,
          uses: 0,
          reviews: 0,
          estado: 'activa',
          weekly_menu: []
        },
        {
          name: 'Plan en Desarrollo - Borrador',
          description: 'Borrador de plan nutricional que estoy diseñando',
          trainerId: trainer._id,
          author: {
            name: trainer.name,
            avatar: trainer.avatar || ''
          },
          objective: 'ganancia_muscular',
          dietType: 'alta_proteina',
          time_level: 'advanced',
          culinary_experience: 'expert',
          calories: 2800,
          macros: { protein: 180, carbs: 300, fat: 95 },
          duration_weeks: 12,
          is_public: false,
          is_favorite: false,
          restrictions: [],
          allergens: [],
          rating: 0,
          uses: 0,
          reviews: 0,
          estado: 'borrador',
          weekly_menu: []
        }
      ];

      const plantillas = await PlantillaDieta.create(plantillasPrivadas);
      totalCreated += plantillas.length;
      console.log(`   ✅ ${plantillas.length} plantillas privadas creadas`);
    }

    console.log('\n═══════════════════════════════════════════════════════');
    console.log(`🎉 Seed de plantillas de dietas completado exitosamente!`);
    console.log(`📊 Total de plantillas creadas: ${totalCreated}`);
    console.log(`🌍 Plantillas públicas: ${plantillasPublicas.length}`);
    console.log(`🔒 Plantillas privadas: ${trainers.length * 2}`);
    console.log(`👥 Para ${trainers.length} trainers`);
    console.log('═══════════════════════════════════════════════════════\n');

    // Show breakdown by objetivo
    const byObjetivo = mockPlantillasDietas.reduce((acc, p) => {
      acc[p.objective] = (acc[p.objective] || 0) + 1;
      return acc;
    }, {});

    console.log('📊 Distribución por objetivo (plantillas públicas):');
    Object.entries(byObjetivo).forEach(([objetivo, count]) => {
      console.log(`   ${objetivo}: ${count} plantillas`);
    });

    // Show breakdown by dietType
    const byDietType = mockPlantillasDietas.reduce((acc, p) => {
      acc[p.dietType] = (acc[p.dietType] || 0) + 1;
      return acc;
    }, {});

    console.log('\n📊 Distribución por tipo de dieta (plantillas públicas):');
    Object.entries(byDietType).forEach(([tipo, count]) => {
      console.log(`   ${tipo}: ${count} plantillas`);
    });

    // Show breakdown by time_level
    const byTimeLevel = mockPlantillasDietas.reduce((acc, p) => {
      acc[p.time_level] = (acc[p.time_level] || 0) + 1;
      return acc;
    }, {});

    console.log('\n📊 Distribución por nivel de tiempo (plantillas públicas):');
    Object.entries(byTimeLevel).forEach(([nivel, count]) => {
      console.log(`   ${nivel}: ${count} plantillas`);
    });

    // Show breakdown by culinary_experience
    const byCulinaryExp = mockPlantillasDietas.reduce((acc, p) => {
      acc[p.culinary_experience] = (acc[p.culinary_experience] || 0) + 1;
      return acc;
    }, {});

    console.log('\n📊 Distribución por experiencia culinaria (plantillas públicas):');
    Object.entries(byCulinaryExp).forEach(([exp, count]) => {
      console.log(`   ${exp}: ${count} plantillas`);
    });

    // Show total calories range
    const caloriesRange = mockPlantillasDietas.reduce((acc, p) => {
      if (!acc.min || p.calories < acc.min) acc.min = p.calories;
      if (!acc.max || p.calories > acc.max) acc.max = p.calories;
      return acc;
    }, {});

    console.log('\n📊 Rango de calorías (plantillas públicas):');
    console.log(`   Mínimo: ${caloriesRange.min} kcal`);
    console.log(`   Máximo: ${caloriesRange.max} kcal`);

    // Show total uses and average rating
    const totalUses = mockPlantillasDietas.reduce((acc, p) => acc + p.uses, 0);
    const avgRating = mockPlantillasDietas.reduce((acc, p) => acc + p.rating, 0) / mockPlantillasDietas.length;

    console.log('\n📊 Estadísticas de uso (plantillas públicas):');
    console.log(`   Total de usos: ${totalUses.toLocaleString()}`);
    console.log(`   Calificación promedio: ${avgRating.toFixed(2)} / 5.0`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error al crear plantillas de dietas:', error.message);
    console.error(error);
    process.exit(1);
  }
};

// Run seeder
seedPlantillasDietas();
