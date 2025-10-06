import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import Receta from '../models/Receta.model.js';
import Trainer from '../models/Trainer.model.js';
import connectDB from '../config/db.js';

// Get __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load env vars from backend/.env
dotenv.config({ path: join(__dirname, '../../.env') });

// Mock recetas data para el trainer Core
const createMockRecetas = (trainerId) => {
  const recetas = [];

  // DESAYUNOS
  recetas.push({
    trainerId,
    nombre: 'Bowl de Açaí con Frutas Tropicales',
    descripcion: 'Un desayuno refrescante y nutritivo con açaí, frutas tropicales y granola casera. Perfecto para empezar el día con energía.',
    tipoComida: 'Desayuno',
    dificultad: 'Fácil',
    tiempoPreparacion: 10,
    tiempoCoccion: 0,
    porciones: 1,
    ingredientes: [
      { nombre: 'Açaí congelado', cantidad: 200, unidad: 'g' },
      { nombre: 'Plátano', cantidad: 1, unidad: 'unidad' },
      { nombre: 'Leche de coco', cantidad: 100, unidad: 'ml' },
      { nombre: 'Granola', cantidad: 50, unidad: 'g' },
      { nombre: 'Mango en cubos', cantidad: 50, unidad: 'g' },
      { nombre: 'Fresas', cantidad: 50, unidad: 'g' },
      { nombre: 'Coco rallado', cantidad: 10, unidad: 'g' },
      { nombre: 'Miel', cantidad: 1, unidad: 'cucharada' }
    ],
    pasos: [
      { orden: 1, descripcion: 'Licuar el açaí congelado con el plátano y la leche de coco hasta obtener una mezcla espesa', tiempoEstimado: 3 },
      { orden: 2, descripcion: 'Verter en un bowl', tiempoEstimado: 1 },
      { orden: 3, descripcion: 'Decorar con granola, mango, fresas y coco rallado', tiempoEstimado: 5 },
      { orden: 4, descripcion: 'Agregar un toque de miel al gusto', tiempoEstimado: 1 }
    ],
    valoresNutricionales: {
      calorias: 380,
      proteinas: 8,
      carbohidratos: 65,
      grasas: 12,
      fibra: 10,
      azucar: 35
    },
    restricciones: ['Vegano', 'Sin gluten'],
    etiquetas: ['saludable', 'energético', 'antioxidantes', 'tropical'],
    fotoUrl: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=400&h=300&fit=crop',
    tipsNotas: 'Congela el plátano la noche anterior para obtener una consistencia más cremosa. Puedes sustituir el mango por otras frutas tropicales como piña o maracuyá.',
    rating: 5,
    esFavorita: true,
    esDestacada: true,
    badge: 'Más Popular',
    esPublica: true
  });

  recetas.push({
    trainerId,
    nombre: 'Tostadas de Aguacate y Huevo Poché',
    descripcion: 'Desayuno completo con grasas saludables y proteínas de alta calidad. Una combinación clásica perfecta.',
    tipoComida: 'Desayuno',
    dificultad: 'Media',
    tiempoPreparacion: 10,
    tiempoCoccion: 5,
    porciones: 1,
    ingredientes: [
      { nombre: 'Pan integral', cantidad: 2, unidad: 'rebanadas' },
      { nombre: 'Aguacate maduro', cantidad: 1, unidad: 'unidad' },
      { nombre: 'Huevos', cantidad: 2, unidad: 'unidades' },
      { nombre: 'Tomates cherry', cantidad: 5, unidad: 'unidades' },
      { nombre: 'Aceite de oliva', cantidad: 1, unidad: 'cucharadita' },
      { nombre: 'Sal y pimienta', cantidad: 1, unidad: 'pizca' },
      { nombre: 'Semillas de chía', cantidad: 1, unidad: 'cucharadita' }
    ],
    pasos: [
      { orden: 1, descripcion: 'Tostar el pan integral hasta que esté dorado', tiempoEstimado: 3 },
      { orden: 2, descripcion: 'Preparar huevos poché en agua hirviendo con un poco de vinagre', tiempoEstimado: 5 },
      { orden: 3, descripcion: 'Machacar el aguacate y esparcir sobre las tostadas', tiempoEstimado: 3 },
      { orden: 4, descripcion: 'Colocar el huevo poché encima de cada tostada', tiempoEstimado: 1 },
      { orden: 5, descripcion: 'Decorar con tomates cherry cortados, semillas de chía, sal y pimienta', tiempoEstimado: 3 }
    ],
    valoresNutricionales: {
      calorias: 420,
      proteinas: 18,
      carbohidratos: 35,
      grasas: 24,
      fibra: 12
    },
    restricciones: ['Vegetariano'],
    etiquetas: ['proteínas', 'saludable', 'grasas saludables'],
    fotoUrl: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=400&h=300&fit=crop',
    tipsNotas: 'Para un huevo poché perfecto, usa huevos muy frescos y añade una cucharada de vinagre blanco al agua. Crea un remolino en el agua antes de añadir el huevo.',
    rating: 5,
    esFavorita: true,
    esDestacada: false,
    esPublica: true
  });

  recetas.push({
    trainerId,
    nombre: 'Pancakes de Avena y Plátano',
    descripcion: 'Pancakes saludables sin azúcar añadido, perfectos para un desayuno fitness. Solo 3 ingredientes principales.',
    tipoComida: 'Desayuno',
    dificultad: 'Fácil',
    tiempoPreparacion: 10,
    tiempoCoccion: 15,
    porciones: 2,
    ingredientes: [
      { nombre: 'Plátanos maduros', cantidad: 2, unidad: 'unidades' },
      { nombre: 'Avena', cantidad: 1, unidad: 'taza' },
      { nombre: 'Huevos', cantidad: 2, unidad: 'unidades' },
      { nombre: 'Canela', cantidad: 1, unidad: 'cucharadita' },
      { nombre: 'Miel', cantidad: 2, unidad: 'cucharadas' },
      { nombre: 'Arándanos frescos', cantidad: 50, unidad: 'g' }
    ],
    pasos: [
      { orden: 1, descripcion: 'Triturar los plátanos hasta obtener un puré suave', tiempoEstimado: 3 },
      { orden: 2, descripcion: 'Mezclar con avena, huevos y canela hasta integrar', tiempoEstimado: 3 },
      { orden: 3, descripcion: 'Cocinar pequeñas porciones en sartén antiadherente a fuego medio', tiempoEstimado: 12 },
      { orden: 4, descripcion: 'Servir con miel y arándanos frescos', tiempoEstimado: 2 }
    ],
    valoresNutricionales: {
      calorias: 340,
      proteinas: 14,
      carbohidratos: 52,
      grasas: 8,
      fibra: 8
    },
    restricciones: ['Vegetariano'],
    etiquetas: ['fitness', 'sin azúcar añadido', 'alto en fibra'],
    fotoUrl: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=300&fit=crop',
    tipsNotas: 'La clave está en usar plátanos bien maduros para un dulzor natural. Puedes añadir proteína en polvo para más proteínas.',
    rating: 4,
    esFavorita: false,
    esDestacada: false,
    esPublica: true
  });

  // ALMUERZOS
  recetas.push({
    trainerId,
    nombre: 'Poke Bowl de Atún con Quinoa',
    descripcion: 'Bowl hawaiano con atún fresco, quinoa y vegetales coloridos. Una comida completa y balanceada.',
    tipoComida: 'Almuerzo',
    dificultad: 'Media',
    tiempoPreparacion: 20,
    tiempoCoccion: 15,
    porciones: 2,
    ingredientes: [
      { nombre: 'Atún fresco', cantidad: 300, unidad: 'g' },
      { nombre: 'Quinoa', cantidad: 1, unidad: 'taza' },
      { nombre: 'Edamame', cantidad: 100, unidad: 'g' },
      { nombre: 'Aguacate', cantidad: 1, unidad: 'unidad' },
      { nombre: 'Pepino', cantidad: 1, unidad: 'unidad' },
      { nombre: 'Zanahoria', cantidad: 1, unidad: 'unidad' },
      { nombre: 'Alga nori', cantidad: 2, unidad: 'hojas' },
      { nombre: 'Salsa de soja', cantidad: 3, unidad: 'cucharadas' },
      { nombre: 'Aceite de sésamo', cantidad: 1, unidad: 'cucharadita' },
      { nombre: 'Semillas de sésamo', cantidad: 1, unidad: 'cucharada' }
    ],
    pasos: [
      { orden: 1, descripcion: 'Cocinar la quinoa según las instrucciones del paquete', tiempoEstimado: 15 },
      { orden: 2, descripcion: 'Cortar el atún en cubos de 2cm', tiempoEstimado: 5 },
      { orden: 3, descripcion: 'Preparar los vegetales: cortar pepino, aguacate y rallar zanahoria', tiempoEstimado: 8 },
      { orden: 4, descripcion: 'Marinar el atún con salsa de soja y aceite de sésamo por 5 minutos', tiempoEstimado: 5 },
      { orden: 5, descripcion: 'Montar el bowl: quinoa de base, atún marinado, vegetales y edamame', tiempoEstimado: 3 },
      { orden: 6, descripcion: 'Decorar con alga nori en tiras y semillas de sésamo', tiempoEstimado: 2 }
    ],
    valoresNutricionales: {
      calorias: 520,
      proteinas: 42,
      carbohidratos: 48,
      grasas: 18,
      fibra: 10
    },
    restricciones: ['Sin gluten', 'Sin lactosa'],
    etiquetas: ['alto proteína', 'omega-3', 'completo', 'hawaiano'],
    fotoUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop',
    videoUrl: 'https://example.com/poke-bowl-tutorial',
    tipsNotas: 'Usa atún de calidad sashimi para comer crudo. Si no encuentras atún fresco, puedes usar salmón. Ajusta la salsa de soja según tu tolerancia al sodio.',
    rating: 5,
    esFavorita: true,
    esDestacada: true,
    badge: "Chef's Choice",
    esPublica: true
  });

  recetas.push({
    trainerId,
    nombre: 'Ensalada César con Pollo a la Plancha',
    descripcion: 'Versión saludable de la clásica ensalada César con pollo grillado y aderezo casero bajo en grasas.',
    tipoComida: 'Almuerzo',
    dificultad: 'Fácil',
    tiempoPreparacion: 15,
    tiempoCoccion: 12,
    porciones: 2,
    ingredientes: [
      { nombre: 'Pechuga de pollo', cantidad: 300, unidad: 'g' },
      { nombre: 'Lechuga romana', cantidad: 1, unidad: 'cabeza' },
      { nombre: 'Queso parmesano', cantidad: 30, unidad: 'g' },
      { nombre: 'Crutones integrales', cantidad: 50, unidad: 'g' },
      { nombre: 'Yogurt griego', cantidad: 100, unidad: 'g' },
      { nombre: 'Jugo de limón', cantidad: 2, unidad: 'cucharadas' },
      { nombre: 'Ajo', cantidad: 1, unidad: 'diente' },
      { nombre: 'Mostaza Dijon', cantidad: 1, unidad: 'cucharadita' }
    ],
    pasos: [
      { orden: 1, descripcion: 'Sazonar y cocinar el pollo a la plancha hasta que esté dorado', tiempoEstimado: 12 },
      { orden: 2, descripcion: 'Lavar y cortar la lechuga romana en trozos medianos', tiempoEstimado: 5 },
      { orden: 3, descripcion: 'Preparar aderezo: mezclar yogurt, limón, ajo picado y mostaza', tiempoEstimado: 3 },
      { orden: 4, descripcion: 'Cortar el pollo en tiras', tiempoEstimado: 2 },
      { orden: 5, descripcion: 'Montar la ensalada: lechuga, pollo, parmesano y crutones', tiempoEstimado: 3 },
      { orden: 6, descripcion: 'Añadir el aderezo y mezclar justo antes de servir', tiempoEstimado: 2 }
    ],
    valoresNutricionales: {
      calorias: 380,
      proteinas: 42,
      carbohidratos: 22,
      grasas: 14,
      fibra: 4
    },
    restricciones: [],
    etiquetas: ['alto proteína', 'bajo carbos', 'clásico', 'versión saludable'],
    fotoUrl: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=300&fit=crop',
    tipsNotas: 'El aderezo con yogurt griego reduce significativamente las calorías comparado con la versión tradicional. Prepara el aderezo con anticipación para que los sabores se integren.',
    rating: 4,
    esFavorita: false,
    esDestacada: false,
    esPublica: true
  });

  recetas.push({
    trainerId,
    nombre: 'Salmón al Horno con Espárragos',
    descripcion: 'Plato rico en omega-3 y proteínas, perfecto para una comida saludable y nutritiva.',
    tipoComida: 'Almuerzo',
    dificultad: 'Fácil',
    tiempoPreparacion: 10,
    tiempoCoccion: 20,
    porciones: 2,
    ingredientes: [
      { nombre: 'Filete de salmón', cantidad: 400, unidad: 'g' },
      { nombre: 'Espárragos verdes', cantidad: 300, unidad: 'g' },
      { nombre: 'Limón', cantidad: 1, unidad: 'unidad' },
      { nombre: 'Aceite de oliva', cantidad: 2, unidad: 'cucharadas' },
      { nombre: 'Ajo en polvo', cantidad: 1, unidad: 'cucharadita' },
      { nombre: 'Eneldo fresco', cantidad: 2, unidad: 'cucharadas' },
      { nombre: 'Sal y pimienta', cantidad: 1, unidad: 'al gusto' }
    ],
    pasos: [
      { orden: 1, descripcion: 'Precalentar el horno a 200°C', tiempoEstimado: 5 },
      { orden: 2, descripcion: 'Colocar el salmón y los espárragos en una bandeja', tiempoEstimado: 2 },
      { orden: 3, descripcion: 'Rociar con aceite de oliva, jugo de limón, ajo, sal y pimienta', tiempoEstimado: 3 },
      { orden: 4, descripcion: 'Hornear durante 15-18 minutos hasta que el salmón esté cocido', tiempoEstimado: 18 },
      { orden: 5, descripcion: 'Espolvorear con eneldo fresco antes de servir', tiempoEstimado: 1 }
    ],
    valoresNutricionales: {
      calorias: 380,
      proteinas: 38,
      carbohidratos: 8,
      grasas: 22,
      fibra: 4
    },
    restricciones: ['Sin gluten', 'Sin lactosa', 'Paleo'],
    etiquetas: ['omega-3', 'antiinflamatorio', 'bajo carbos', 'keto'],
    fotoUrl: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop',
    tipsNotas: 'No sobre-cocines el salmón para mantenerlo jugoso. El punto perfecto es cuando el centro está ligeramente rosado. Los espárragos deben quedar al dente.',
    rating: 5,
    esFavorita: true,
    esDestacada: false,
    esPublica: true
  });

  // CENAS
  recetas.push({
    trainerId,
    nombre: 'Sopa de Lentejas con Verduras',
    descripcion: 'Sopa reconfortante rica en proteína vegetal y fibra. Perfecta para una cena ligera pero nutritiva.',
    tipoComida: 'Cena',
    dificultad: 'Fácil',
    tiempoPreparacion: 15,
    tiempoCoccion: 35,
    porciones: 4,
    ingredientes: [
      { nombre: 'Lentejas', cantidad: 250, unidad: 'g' },
      { nombre: 'Zanahoria', cantidad: 2, unidad: 'unidades' },
      { nombre: 'Apio', cantidad: 2, unidad: 'tallos' },
      { nombre: 'Cebolla', cantidad: 1, unidad: 'unidad' },
      { nombre: 'Ajo', cantidad: 3, unidad: 'dientes' },
      { nombre: 'Tomate triturado', cantidad: 200, unidad: 'g' },
      { nombre: 'Caldo de verduras', cantidad: 1.5, unidad: 'litros' },
      { nombre: 'Comino', cantidad: 1, unidad: 'cucharadita' },
      { nombre: 'Pimentón', cantidad: 1, unidad: 'cucharadita' },
      { nombre: 'Aceite de oliva', cantidad: 2, unidad: 'cucharadas' }
    ],
    pasos: [
      { orden: 1, descripcion: 'Picar finamente la cebolla, zanahoria, apio y ajo', tiempoEstimado: 8 },
      { orden: 2, descripcion: 'Sofreír la cebolla y el ajo en aceite de oliva', tiempoEstimado: 3 },
      { orden: 3, descripcion: 'Añadir zanahoria y apio, cocinar 5 minutos', tiempoEstimado: 5 },
      { orden: 4, descripcion: 'Agregar lentejas, tomate, especias y caldo', tiempoEstimado: 2 },
      { orden: 5, descripcion: 'Cocinar a fuego medio durante 30 minutos hasta que las lentejas estén tiernas', tiempoEstimado: 30 },
      { orden: 6, descripcion: 'Ajustar sal y pimienta al gusto', tiempoEstimado: 1 }
    ],
    valoresNutricionales: {
      calorias: 280,
      proteinas: 16,
      carbohidratos: 42,
      grasas: 6,
      fibra: 14,
      sodio: 450
    },
    restricciones: ['Vegano', 'Sin gluten'],
    etiquetas: ['proteína vegetal', 'reconfortante', 'alto fibra', 'económico'],
    fotoUrl: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop',
    tipsNotas: 'Puedes hacer una gran cantidad y congelar porciones. La sopa mejora al día siguiente. Añade un chorrito de vinagre al final para realzar los sabores.',
    rating: 4,
    esFavorita: false,
    esDestacada: false,
    esPublica: true
  });

  recetas.push({
    trainerId,
    nombre: 'Tortilla Española Light',
    descripcion: 'Versión saludable de la tortilla española clásica, horneada en lugar de frita para reducir grasas.',
    tipoComida: 'Cena',
    dificultad: 'Media',
    tiempoPreparacion: 15,
    tiempoCoccion: 25,
    porciones: 4,
    ingredientes: [
      { nombre: 'Patatas', cantidad: 500, unidad: 'g' },
      { nombre: 'Huevos', cantidad: 6, unidad: 'unidades' },
      { nombre: 'Cebolla', cantidad: 1, unidad: 'unidad' },
      { nombre: 'Aceite de oliva en spray', cantidad: 5, unidad: 'pulverizaciones' },
      { nombre: 'Sal', cantidad: 1, unidad: 'pizca' }
    ],
    pasos: [
      { orden: 1, descripcion: 'Precalentar el horno a 180°C', tiempoEstimado: 5 },
      { orden: 2, descripcion: 'Cortar las patatas en láminas finas y la cebolla en juliana', tiempoEstimado: 8 },
      { orden: 3, descripcion: 'Cocinar patatas y cebolla al microondas 5 minutos', tiempoEstimado: 5 },
      { orden: 4, descripcion: 'Batir los huevos y mezclar con las patatas y cebolla', tiempoEstimado: 3 },
      { orden: 5, descripcion: 'Verter en molde antiadherente con spray de aceite', tiempoEstimado: 2 },
      { orden: 6, descripcion: 'Hornear 20-25 minutos hasta que cuaje', tiempoEstimado: 25 }
    ],
    valoresNutricionales: {
      calorias: 220,
      proteinas: 12,
      carbohidratos: 28,
      grasas: 8,
      fibra: 3
    },
    restricciones: ['Vegetariano', 'Sin gluten'],
    etiquetas: ['versión saludable', 'español', 'horneado', 'bajo en grasas'],
    fotoUrl: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&h=300&fit=crop',
    tipsNotas: 'El truco para reducir aceite es cocinar las patatas al microondas primero. Queda igual de sabrosa que la versión tradicional pero mucho más ligera.',
    rating: 4,
    esFavorita: false,
    esDestacada: false,
    esPublica: false
  });

  // SNACKS
  recetas.push({
    trainerId,
    nombre: 'Energy Balls de Dátiles y Almendras',
    descripcion: 'Bolitas energéticas perfectas para pre-entreno o snack saludable. Sin azúcar añadido.',
    tipoComida: 'Snack',
    dificultad: 'Fácil',
    tiempoPreparacion: 15,
    tiempoCoccion: 0,
    porciones: 12,
    ingredientes: [
      { nombre: 'Dátiles sin hueso', cantidad: 200, unidad: 'g' },
      { nombre: 'Almendras', cantidad: 100, unidad: 'g' },
      { nombre: 'Cacao en polvo', cantidad: 2, unidad: 'cucharadas' },
      { nombre: 'Coco rallado', cantidad: 50, unidad: 'g' },
      { nombre: 'Proteína en polvo (opcional)', cantidad: 20, unidad: 'g' },
      { nombre: 'Vainilla', cantidad: 1, unidad: 'cucharadita' }
    ],
    pasos: [
      { orden: 1, descripcion: 'Remojar los dátiles en agua tibia por 5 minutos si están muy secos', tiempoEstimado: 5 },
      { orden: 2, descripcion: 'Procesar todos los ingredientes en procesadora hasta obtener una masa pegajosa', tiempoEstimado: 5 },
      { orden: 3, descripcion: 'Formar bolitas de unos 3cm de diámetro', tiempoEstimado: 8 },
      { orden: 4, descripcion: 'Opcional: rebozar en coco rallado o cacao', tiempoEstimado: 3 },
      { orden: 5, descripcion: 'Refrigerar 30 minutos antes de consumir', tiempoEstimado: 1 }
    ],
    valoresNutricionales: {
      calorias: 95,
      proteinas: 3,
      carbohidratos: 14,
      grasas: 4,
      fibra: 2
    },
    restricciones: ['Vegano', 'Sin gluten'],
    etiquetas: ['pre-entreno', 'energético', 'sin azúcar añadido', 'portable'],
    fotoUrl: 'https://images.unsplash.com/photo-1587241321921-91a834d6d191?w=400&h=300&fit=crop',
    tipsNotas: 'Se conservan en la nevera hasta 2 semanas. Son perfectas para llevar al gimnasio. Cada bolita tiene aproximadamente 100 kcal.',
    rating: 5,
    esFavorita: true,
    esDestacada: true,
    badge: 'Nuevo',
    esPublica: true
  });

  recetas.push({
    trainerId,
    nombre: 'Hummus de Garbanzos Casero',
    descripcion: 'Hummus cremoso tradicional, perfecto para acompañar con vegetales crudos o pan integral.',
    tipoComida: 'Snack',
    dificultad: 'Fácil',
    tiempoPreparacion: 10,
    tiempoCoccion: 0,
    porciones: 6,
    ingredientes: [
      { nombre: 'Garbanzos cocidos', cantidad: 400, unidad: 'g' },
      { nombre: 'Tahini (pasta de sésamo)', cantidad: 3, unidad: 'cucharadas' },
      { nombre: 'Jugo de limón', cantidad: 3, unidad: 'cucharadas' },
      { nombre: 'Ajo', cantidad: 2, unidad: 'dientes' },
      { nombre: 'Comino molido', cantidad: 1, unidad: 'cucharadita' },
      { nombre: 'Aceite de oliva', cantidad: 3, unidad: 'cucharadas' },
      { nombre: 'Agua', cantidad: 50, unidad: 'ml' },
      { nombre: 'Pimentón dulce', cantidad: 1, unidad: 'pizca' }
    ],
    pasos: [
      { orden: 1, descripcion: 'Procesar garbanzos, tahini, limón, ajo y comino en procesadora', tiempoEstimado: 3 },
      { orden: 2, descripcion: 'Añadir aceite de oliva mientras procesas', tiempoEstimado: 2 },
      { orden: 3, descripcion: 'Agregar agua poco a poco hasta conseguir la textura deseada', tiempoEstimado: 3 },
      { orden: 4, descripcion: 'Servir decorado con pimentón y un chorrito de aceite', tiempoEstimado: 2 }
    ],
    valoresNutricionales: {
      calorias: 180,
      proteinas: 7,
      carbohidratos: 18,
      grasas: 10,
      fibra: 5
    },
    restricciones: ['Vegano', 'Sin gluten'],
    etiquetas: ['proteína vegetal', 'mediterráneo', 'dip', 'versátil'],
    fotoUrl: 'https://images.unsplash.com/photo-1598511726623-d2e9996892f0?w=400&h=300&fit=crop',
    tipsNotas: 'Para un hummus extra cremoso, pela los garbanzos antes de procesarlos. Se conserva en la nevera hasta 5 días. Sírvelo con palitos de zanahoria, apio o pepino.',
    rating: 5,
    esFavorita: true,
    esDestacada: false,
    esPublica: true
  });

  // Recetas adicionales privadas del trainer
  recetas.push({
    trainerId,
    nombre: 'Batido Post-Entreno Personalizado',
    descripcion: 'Mi batido especial para recuperación muscular después del entrenamiento.',
    tipoComida: 'Snack',
    dificultad: 'Fácil',
    tiempoPreparacion: 5,
    tiempoCoccion: 0,
    porciones: 1,
    ingredientes: [
      { nombre: 'Proteína whey sabor chocolate', cantidad: 30, unidad: 'g' },
      { nombre: 'Plátano', cantidad: 1, unidad: 'unidad' },
      { nombre: 'Leche de almendras', cantidad: 300, unidad: 'ml' },
      { nombre: 'Mantequilla de cacahuete', cantidad: 1, unidad: 'cucharada' },
      { nombre: 'Avena', cantidad: 30, unidad: 'g' },
      { nombre: 'Hielo', cantidad: 5, unidad: 'cubos' }
    ],
    pasos: [
      { orden: 1, descripcion: 'Colocar todos los ingredientes en la licuadora', tiempoEstimado: 2 },
      { orden: 2, descripcion: 'Licuar a alta velocidad hasta obtener consistencia suave', tiempoEstimado: 2 },
      { orden: 3, descripcion: 'Servir inmediatamente después del entrenamiento', tiempoEstimado: 1 }
    ],
    valoresNutricionales: {
      calorias: 450,
      proteinas: 40,
      carbohidratos: 48,
      grasas: 12,
      fibra: 6
    },
    restricciones: [],
    etiquetas: ['post-entreno', 'recuperación', 'alto proteína', 'personal'],
    notasPersonales: 'Esta es mi receta personal que uso después de entrenamientos intensos. La proporción de carbos/proteína es ideal para mis clientes de volumen.',
    rating: 5,
    esFavorita: true,
    esDestacada: false,
    esPublica: false
  });

  recetas.push({
    trainerId,
    nombre: 'Pollo Teriyaki con Arroz Integral',
    descripcion: 'Versión saludable del clásico japonés con menos sodio y azúcar.',
    tipoComida: 'Almuerzo',
    dificultad: 'Media',
    tiempoPreparacion: 15,
    tiempoCoccion: 25,
    porciones: 3,
    ingredientes: [
      { nombre: 'Pechuga de pollo', cantidad: 500, unidad: 'g' },
      { nombre: 'Arroz integral', cantidad: 200, unidad: 'g' },
      { nombre: 'Brócoli', cantidad: 200, unidad: 'g' },
      { nombre: 'Zanahoria', cantidad: 1, unidad: 'unidad' },
      { nombre: 'Salsa de soja baja en sodio', cantidad: 4, unidad: 'cucharadas' },
      { nombre: 'Miel', cantidad: 2, unidad: 'cucharadas' },
      { nombre: 'Jengibre fresco rallado', cantidad: 1, unidad: 'cucharada' },
      { nombre: 'Ajo', cantidad: 2, unidad: 'dientes' },
      { nombre: 'Aceite de sésamo', cantidad: 1, unidad: 'cucharada' },
      { nombre: 'Semillas de sésamo', cantidad: 1, unidad: 'cucharadita' }
    ],
    pasos: [
      { orden: 1, descripcion: 'Cocinar el arroz integral según instrucciones', tiempoEstimado: 25 },
      { orden: 2, descripcion: 'Cortar el pollo en cubos medianos', tiempoEstimado: 5 },
      { orden: 3, descripcion: 'Preparar salsa teriyaki: mezclar soja, miel, jengibre y ajo', tiempoEstimado: 3 },
      { orden: 4, descripcion: 'Saltear el pollo en aceite de sésamo hasta dorar', tiempoEstimado: 8 },
      { orden: 5, descripcion: 'Añadir brócoli, zanahoria y salsa, cocinar 5 minutos', tiempoEstimado: 5 },
      { orden: 6, descripcion: 'Servir sobre arroz integral y decorar con sésamo', tiempoEstimado: 2 }
    ],
    valoresNutricionales: {
      calorias: 420,
      proteinas: 38,
      carbohidratos: 45,
      grasas: 10,
      fibra: 6,
      sodio: 650
    },
    restricciones: ['Sin lactosa'],
    etiquetas: ['asiático', 'completo', 'versión saludable', 'prep meal'],
    fotoUrl: 'https://images.unsplash.com/photo-1580822184713-fc5400e7fe10?w=400&h=300&fit=crop',
    tipsNotas: 'Perfecto para meal prep. Se conserva bien en la nevera 4 días. Usa salsa de soja baja en sodio para reducir el contenido de sal.',
    rating: 4,
    esFavorita: false,
    esDestacada: false,
    esPublica: true
  });

  return recetas;
};

const seedRecetas = async () => {
  try {
    // Connect to database
    await connectDB();

    console.log('🔍 Buscando trainer Core...');
    const coreTrainer = await Trainer.findOne({ email: 'core@trainerpro.com' });

    if (!coreTrainer) {
      console.error('❌ No se encontró el trainer Core. Ejecuta primero: npm run seed:trainers');
      process.exit(1);
    }

    console.log(`✅ Trainer Core encontrado: ${coreTrainer.name} (${coreTrainer._id})`);

    console.log('🗑️  Eliminando recetas existentes del trainer Core...');
    await Receta.deleteMany({ trainerId: coreTrainer._id });

    console.log('📝 Creando recetas...');
    const recetasData = createMockRecetas(coreTrainer._id);
    const recetas = await Receta.create(recetasData);

    console.log(`\n✅ ${recetas.length} recetas creadas exitosamente para el trainer Core:\n`);

    // Agrupar por tipo de comida
    const porTipo = {};
    for (const receta of recetas) {
      if (!porTipo[receta.tipoComida]) {
        porTipo[receta.tipoComida] = [];
      }
      porTipo[receta.tipoComida].push(receta);
    }

    // Mostrar recetas agrupadas
    for (const [tipo, recetasTipo] of Object.entries(porTipo)) {
      console.log(`\n📌 ${tipo.toUpperCase()} (${recetasTipo.length}):`);
      console.log('═══════════════════════════════════════════════════');

      for (let i = 0; i < recetasTipo.length; i++) {
        const receta = recetasTipo[i];
        console.log(`${i + 1}. ${receta.nombre}`);
        console.log(`   Dificultad: ${receta.dificultad} | Tiempo: ${receta.tiempoPreparacion + receta.tiempoCoccion} min`);
        console.log(`   Calorías: ${receta.valoresNutricionales.calorias} | Porciones: ${receta.porciones}`);
        console.log(`   Rating: ${'⭐'.repeat(receta.rating)}`);
        if (receta.esFavorita) console.log(`   ❤️  Favorita`);
        if (receta.esDestacada) console.log(`   ⭐ Destacada`);
        if (receta.badge) console.log(`   🏆 ${receta.badge}`);
        if (receta.esPublica) console.log(`   🌐 Pública`);
        if (!receta.esPublica) console.log(`   🔒 Privada`);
        console.log('');
      }
    }

    // Mostrar estadísticas
    const stats = await Receta.getStatsByTrainer(coreTrainer._id);
    console.log('\n📊 Estadísticas generales:');
    console.log('════════════════════════════════════════════════════════');
    console.log(`Total de recetas: ${stats.total}`);
    console.log(`Favoritas: ${stats.favoritas}`);
    console.log(`Destacadas: ${stats.destacadas}`);
    console.log(`Públicas: ${stats.publicas}`);
    console.log(`Rating promedio: ${stats.ratingPromedio}⭐`);

    console.log('\nPor tipo de comida:');
    stats.porTipoComida.forEach(t => {
      console.log(`  - ${t._id}: ${t.count} recetas`);
    });

    console.log('\nPor dificultad:');
    stats.porDificultad.forEach(d => {
      console.log(`  - ${d._id}: ${d.count} recetas`);
    });

    console.log('\nMás usadas:');
    stats.masUsadas.forEach((r, idx) => {
      console.log(`  ${idx + 1}. ${r.nombre} (${r.contadorUsos} usos)`);
    });

    console.log('════════════════════════════════════════════════════════');

    console.log('\n🎉 Seed de recetas completado exitosamente!');
    console.log('\n💡 Tip: Usa el endpoint GET /api/recetas para ver todas las recetas');
    console.log('💡 Tip: Usa el endpoint GET /api/recetas/publicas para ver solo las públicas');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error al crear recetas:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
};

// Run seeder
seedRecetas();
