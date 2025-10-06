import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import PlantillaEntrenamiento from '../models/PlantillaEntrenamiento.model.js';
import Ejercicio from '../models/Ejercicio.model.js';
import Trainer from '../models/Trainer.model.js';
import connectDB from '../config/db.js';

// Get __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load env vars from backend/.env
dotenv.config({ path: join(__dirname, '../../.env') });

// Mock plantillas data
const mockPlantillas = [
  {
    nombre: 'Entrenamiento de Fuerza para Principiantes',
    descripcion: 'Programa diseñado para principiantes que quieren ganar fuerza y masa muscular. Incluye ejercicios básicos con barra y mancuernas.',
    objetivo: 'fuerza',
    nivel: 'principiante',
    modalidad: 'gym',
    duracionSemanas: 8,
    diasPorSemana: 3,
    duracionSesion: 60,
    equipamiento: ['Barra', 'Mancuernas', 'Banco', 'Rack'],
    gruposMusculares: ['pecho', 'espalda', 'piernas', 'hombros', 'brazos'],
    etiquetas: ['fuerza', 'hipertrofia', 'principiante', 'fullbody'],
    visibilidad: 'publica',
    estado: 'activa',
    esPlantillaSistema: true,
    diasEntrenamiento: [
      {
        dia: 1,
        nombre: 'Día 1 - Cuerpo Completo A',
        calentamiento: { duracion: 10, descripcion: '5 min cardio + movilidad articular' },
        ejercicios: [],
        enfriamiento: { duracion: 5, descripcion: 'Estiramientos estáticos' }
      },
      {
        dia: 3,
        nombre: 'Día 2 - Cuerpo Completo B',
        calentamiento: { duracion: 10, descripcion: '5 min cardio + movilidad articular' },
        ejercicios: [],
        enfriamiento: { duracion: 5, descripcion: 'Estiramientos estáticos' }
      },
      {
        dia: 5,
        nombre: 'Día 3 - Cuerpo Completo C',
        calentamiento: { duracion: 10, descripcion: '5 min cardio + movilidad articular' },
        ejercicios: [],
        enfriamiento: { duracion: 5, descripcion: 'Estiramientos estáticos' }
      }
    ]
  },
  {
    nombre: 'Plan de Pérdida de Peso HIIT',
    descripcion: 'Programa intensivo de alta intensidad para quemar grasa y mejorar la condición cardiovascular. Combina ejercicios de peso corporal y cardio.',
    objetivo: 'perdida-peso',
    nivel: 'intermedio',
    modalidad: 'casa',
    duracionSemanas: 6,
    diasPorSemana: 4,
    duracionSesion: 45,
    equipamiento: [],
    gruposMusculares: ['todo-cuerpo', 'core'],
    etiquetas: ['HIIT', 'cardio', 'quemar grasa', 'sin equipo'],
    visibilidad: 'publica',
    estado: 'activa',
    esPlantillaSistema: true,
    diasEntrenamiento: [
      {
        dia: 1,
        nombre: 'HIIT Total Body',
        calentamiento: { duracion: 5, descripcion: 'Movilidad dinámica' },
        ejercicios: [],
        enfriamiento: { duracion: 5, descripcion: 'Estiramientos y respiración' }
      },
      {
        dia: 3,
        nombre: 'HIIT Core & Cardio',
        calentamiento: { duracion: 5, descripcion: 'Activación core' },
        ejercicios: [],
        enfriamiento: { duracion: 5, descripcion: 'Estiramientos' }
      },
      {
        dia: 5,
        nombre: 'HIIT Lower Body',
        calentamiento: { duracion: 5, descripcion: 'Movilidad cadera' },
        ejercicios: [],
        enfriamiento: { duracion: 5, descripcion: 'Estiramientos piernas' }
      },
      {
        dia: 6,
        nombre: 'HIIT Full Body Circuit',
        calentamiento: { duracion: 5, descripcion: 'Cardio suave' },
        ejercicios: [],
        enfriamiento: { duracion: 5, descripcion: 'Estiramientos completos' }
      }
    ]
  },
  {
    nombre: 'Hipertrofia Push-Pull-Legs',
    descripcion: 'Rutina clásica de culturismo dividida en empuje, jalón y piernas. Ideal para ganancias musculares avanzadas.',
    objetivo: 'ganancia-musculo',
    nivel: 'avanzado',
    modalidad: 'gym',
    duracionSemanas: 12,
    diasPorSemana: 6,
    duracionSesion: 75,
    equipamiento: ['Barra', 'Mancuernas', 'Máquinas', 'Poleas', 'Banco'],
    gruposMusculares: ['pecho', 'espalda', 'piernas', 'hombros', 'brazos'],
    etiquetas: ['hipertrofia', 'avanzado', 'volumen', 'PPL'],
    visibilidad: 'publica',
    estado: 'activa',
    esPlantillaSistema: true,
    diasEntrenamiento: [
      {
        dia: 1,
        nombre: 'Push A - Pecho, Hombros, Tríceps',
        calentamiento: { duracion: 10, descripcion: 'Rotaciones de hombro y activación pectoral' },
        ejercicios: [],
        enfriamiento: { duracion: 5, descripcion: 'Estiramientos tren superior' }
      },
      {
        dia: 2,
        nombre: 'Pull A - Espalda, Bíceps',
        calentamiento: { duracion: 10, descripcion: 'Activación escápular y dorsales' },
        ejercicios: [],
        enfriamiento: { duracion: 5, descripcion: 'Estiramientos espalda' }
      },
      {
        dia: 3,
        nombre: 'Legs A - Cuádriceps, Glúteos',
        calentamiento: { duracion: 10, descripcion: 'Movilidad de cadera y activación glúteo' },
        ejercicios: [],
        enfriamiento: { duracion: 5, descripcion: 'Estiramientos piernas' }
      },
      {
        dia: 5,
        nombre: 'Push B - Énfasis Hombros',
        calentamiento: { duracion: 10, descripcion: 'Rotaciones y activación deltoides' },
        ejercicios: [],
        enfriamiento: { duracion: 5, descripcion: 'Estiramientos' }
      },
      {
        dia: 6,
        nombre: 'Pull B - Énfasis Grosor Espalda',
        calentamiento: { duracion: 10, descripcion: 'Activación trapecio y romboides' },
        ejercicios: [],
        enfriamiento: { duracion: 5, descripcion: 'Estiramientos dorsales' }
      },
      {
        dia: 7,
        nombre: 'Legs B - Isquios, Pantorrillas',
        calentamiento: { duracion: 10, descripcion: 'Movilidad tobillo y cadera' },
        ejercicios: [],
        enfriamiento: { duracion: 5, descripcion: 'Estiramientos completos' }
      }
    ]
  },
  {
    nombre: 'Entrenamiento Funcional en Casa',
    descripcion: 'Programa de entrenamiento funcional sin equipamiento. Mejora fuerza, movilidad y resistencia usando solo tu peso corporal.',
    objetivo: 'mantenimiento',
    nivel: 'intermedio',
    modalidad: 'casa',
    duracionSemanas: 8,
    diasPorSemana: 4,
    duracionSesion: 40,
    equipamiento: [],
    gruposMusculares: ['todo-cuerpo', 'core'],
    etiquetas: ['funcional', 'peso corporal', 'sin equipo', 'movilidad'],
    visibilidad: 'publica',
    estado: 'activa',
    esPlantillaSistema: true,
    diasEntrenamiento: [
      {
        dia: 1,
        nombre: 'Fuerza + Movilidad',
        calentamiento: { duracion: 5, descripcion: 'Movilidad articular completa' },
        ejercicios: [],
        enfriamiento: { duracion: 5, descripcion: 'Yoga flow suave' }
      },
      {
        dia: 3,
        nombre: 'Cardio + Core',
        calentamiento: { duracion: 5, descripcion: 'Activación cardiovascular' },
        ejercicios: [],
        enfriamiento: { duracion: 5, descripcion: 'Estiramientos dinámicos' }
      },
      {
        dia: 5,
        nombre: 'Lower Body + Balance',
        calentamiento: { duracion: 5, descripcion: 'Ejercicios de equilibrio' },
        ejercicios: [],
        enfriamiento: { duracion: 5, descripcion: 'Estiramientos piernas' }
      },
      {
        dia: 7,
        nombre: 'Full Body Circuit',
        calentamiento: { duracion: 5, descripcion: 'Calentamiento dinámico' },
        ejercicios: [],
        enfriamiento: { duracion: 5, descripcion: 'Estiramientos completos' }
      }
    ]
  },
  {
    nombre: 'Resistencia Cardiovascular Running',
    descripcion: 'Plan progresivo para mejorar tu resistencia cardiovascular. De 5K a 10K en 8 semanas.',
    objetivo: 'resistencia',
    nivel: 'principiante',
    modalidad: 'exterior',
    duracionSemanas: 8,
    diasPorSemana: 4,
    duracionSesion: 45,
    equipamiento: [],
    gruposMusculares: ['piernas', 'core'],
    etiquetas: ['running', 'cardio', 'resistencia', 'exterior'],
    visibilidad: 'publica',
    estado: 'activa',
    esPlantillaSistema: true,
    diasEntrenamiento: [
      {
        dia: 1,
        nombre: 'Easy Run',
        calentamiento: { duracion: 5, descripcion: 'Caminata rápida' },
        ejercicios: [],
        enfriamiento: { duracion: 5, descripcion: 'Caminata suave + estiramientos' }
      },
      {
        dia: 3,
        nombre: 'Intervalos',
        calentamiento: { duracion: 10, descripcion: 'Trote suave + drills' },
        ejercicios: [],
        enfriamiento: { duracion: 5, descripcion: 'Enfriamiento activo' }
      },
      {
        dia: 5,
        nombre: 'Tempo Run',
        calentamiento: { duracion: 10, descripcion: 'Calentamiento progresivo' },
        ejercicios: [],
        enfriamiento: { duracion: 5, descripcion: 'Trote suave' }
      },
      {
        dia: 7,
        nombre: 'Long Run',
        calentamiento: { duracion: 5, descripcion: 'Activación gradual' },
        ejercicios: [],
        enfriamiento: { duracion: 10, descripcion: 'Estiramientos completos' }
      }
    ]
  },
  {
    nombre: 'CrossFit para Principiantes',
    descripcion: 'Introducción al CrossFit con WODs adaptados para principiantes. Combina levantamiento, gimnasia y cardio.',
    objetivo: 'fuerza',
    nivel: 'principiante',
    modalidad: 'crossfit',
    duracionSemanas: 6,
    diasPorSemana: 3,
    duracionSesion: 60,
    equipamiento: ['Barra', 'Kettlebell', 'Caja', 'Cuerda'],
    gruposMusculares: ['todo-cuerpo'],
    etiquetas: ['crossfit', 'funcional', 'WOD', 'variado'],
    visibilidad: 'publica',
    estado: 'activa',
    esPlantillaSistema: true,
    diasEntrenamiento: [
      {
        dia: 1,
        nombre: 'WOD Strength Focus',
        calentamiento: { duracion: 15, descripcion: 'Movilidad + técnica de levantamientos' },
        ejercicios: [],
        enfriamiento: { duracion: 5, descripcion: 'Estiramientos y movilidad' }
      },
      {
        dia: 3,
        nombre: 'WOD Gymnastics Focus',
        calentamiento: { duracion: 15, descripcion: 'Activación + trabajo de habilidades' },
        ejercicios: [],
        enfriamiento: { duracion: 5, descripcion: 'Estiramientos' }
      },
      {
        dia: 5,
        nombre: 'WOD Metcon',
        calentamiento: { duracion: 15, descripcion: 'Preparación cardiovascular' },
        ejercicios: [],
        enfriamiento: { duracion: 5, descripcion: 'Recuperación activa' }
      }
    ]
  },
  {
    nombre: 'Yoga para Flexibilidad y Bienestar',
    descripcion: 'Secuencias de yoga diseñadas para mejorar flexibilidad, equilibrio y reducir el estrés.',
    objetivo: 'flexibilidad',
    nivel: 'principiante',
    modalidad: 'yoga',
    duracionSemanas: 4,
    diasPorSemana: 5,
    duracionSesion: 45,
    equipamiento: ['Esterilla'],
    gruposMusculares: ['todo-cuerpo', 'core'],
    etiquetas: ['yoga', 'flexibilidad', 'movilidad', 'mindfulness'],
    visibilidad: 'publica',
    estado: 'activa',
    esPlantillaSistema: true,
    diasEntrenamiento: [
      {
        dia: 1,
        nombre: 'Vinyasa Flow',
        calentamiento: { duracion: 5, descripcion: 'Respiración y centramiento' },
        ejercicios: [],
        enfriamiento: { duracion: 5, descripcion: 'Savasana' }
      },
      {
        dia: 2,
        nombre: 'Yin Yoga',
        calentamiento: { duracion: 5, descripcion: 'Respiración profunda' },
        ejercicios: [],
        enfriamiento: { duracion: 10, descripcion: 'Meditación' }
      },
      {
        dia: 4,
        nombre: 'Power Yoga',
        calentamiento: { duracion: 5, descripcion: 'Sun salutations' },
        ejercicios: [],
        enfriamiento: { duracion: 5, descripcion: 'Estiramientos finales' }
      },
      {
        dia: 6,
        nombre: 'Restorative Yoga',
        calentamiento: { duracion: 5, descripcion: 'Respiración guiada' },
        ejercicios: [],
        enfriamiento: { duracion: 10, descripcion: 'Relajación profunda' }
      },
      {
        dia: 7,
        nombre: 'Balance & Core',
        calentamiento: { duracion: 5, descripcion: 'Activación core' },
        ejercicios: [],
        enfriamiento: { duracion: 5, descripcion: 'Estiramientos' }
      }
    ]
  },
  {
    nombre: 'Rehabilitación Postural',
    descripcion: 'Programa de ejercicios correctivos y de fortalecimiento para mejorar la postura y prevenir lesiones.',
    objetivo: 'rehabilitacion',
    nivel: 'principiante',
    modalidad: 'casa',
    duracionSemanas: 6,
    diasPorSemana: 3,
    duracionSesion: 30,
    equipamiento: ['Banda elástica'],
    gruposMusculares: ['espalda', 'core', 'hombros'],
    etiquetas: ['rehabilitación', 'postura', 'preventivo', 'movilidad'],
    visibilidad: 'publica',
    estado: 'activa',
    esPlantillaSistema: true,
    diasEntrenamiento: [
      {
        dia: 1,
        nombre: 'Espalda y Core',
        calentamiento: { duracion: 5, descripcion: 'Movilidad espinal' },
        ejercicios: [],
        enfriamiento: { duracion: 5, descripcion: 'Estiramientos suaves' }
      },
      {
        dia: 3,
        nombre: 'Hombros y Escápulas',
        calentamiento: { duracion: 5, descripcion: 'Rotaciones escapulares' },
        ejercicios: [],
        enfriamiento: { duracion: 5, descripcion: 'Estiramientos hombros' }
      },
      {
        dia: 5,
        nombre: 'Caderas y Glúteos',
        calentamiento: { duracion: 5, descripcion: 'Movilidad de cadera' },
        ejercicios: [],
        enfriamiento: { duracion: 5, descripcion: 'Estiramientos completos' }
      }
    ]
  }
];

const seedPlantillasEntrenamiento = async () => {
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

    console.log('🗑️  Eliminando plantillas existentes...');
    await PlantillaEntrenamiento.deleteMany({});

    console.log('📝 Creando plantillas para cada trainer...\n');

    let totalCreated = 0;
    const firstTrainer = trainers[0];

    // Create system templates only for the first trainer
    console.log(`\n📋 Creando plantillas del sistema (${firstTrainer.name})`);

    const plantillasWithTrainer = mockPlantillas.map(plantilla => ({
      ...plantilla,
      trainerId: firstTrainer._id
    }));

    const plantillasSistema = await PlantillaEntrenamiento.create(plantillasWithTrainer);
    totalCreated += plantillasSistema.length;
    console.log(`   ✅ ${plantillasSistema.length} plantillas del sistema creadas`);

    // Create some private templates for each trainer
    for (const trainer of trainers) {
      console.log(`\n📋 Creando plantillas privadas para: ${trainer.name}`);

      const plantillasPrivadas = [
        {
          nombre: 'Mi Rutina Personalizada',
          descripcion: 'Rutina personalizada adaptada a mis objetivos específicos',
          objetivo: 'fuerza',
          nivel: 'intermedio',
          modalidad: 'gym',
          duracionSemanas: 4,
          diasPorSemana: 4,
          duracionSesion: 60,
          equipamiento: ['Barra', 'Mancuernas'],
          gruposMusculares: ['pecho', 'espalda', 'piernas'],
          etiquetas: ['personalizado', 'mi-rutina'],
          visibilidad: 'privada',
          estado: 'activa',
          trainerId: trainer._id,
          diasEntrenamiento: [
            {
              dia: 1,
              nombre: 'Día 1',
              ejercicios: []
            }
          ]
        },
        {
          nombre: 'Plan en Desarrollo',
          descripcion: 'Borrador de plan que estoy diseñando',
          objetivo: 'ganancia-musculo',
          nivel: 'avanzado',
          modalidad: 'gym',
          duracionSemanas: 8,
          diasPorSemana: 5,
          duracionSesion: 75,
          equipamiento: ['Barra', 'Mancuernas', 'Máquinas'],
          gruposMusculares: ['todo-cuerpo'],
          etiquetas: ['borrador', 'en-desarrollo'],
          visibilidad: 'privada',
          estado: 'borrador',
          trainerId: trainer._id,
          diasEntrenamiento: []
        }
      ];

      const plantillas = await PlantillaEntrenamiento.create(plantillasPrivadas);
      totalCreated += plantillas.length;
      console.log(`   ✅ ${plantillas.length} plantillas privadas creadas`);
    }

    console.log('\n═══════════════════════════════════════════════════════');
    console.log(`🎉 Seed completado exitosamente!`);
    console.log(`📊 Total de plantillas creadas: ${totalCreated}`);
    console.log(`🌍 Plantillas públicas del sistema: ${plantillasSistema.length}`);
    console.log(`🔒 Plantillas privadas: ${trainers.length * 2}`);
    console.log(`👥 Para ${trainers.length} trainers`);
    console.log('═══════════════════════════════════════════════════════\n');

    // Show breakdown by objetivo
    const byObjetivo = mockPlantillas.reduce((acc, p) => {
      acc[p.objetivo] = (acc[p.objetivo] || 0) + 1;
      return acc;
    }, {});

    console.log('📊 Distribución por objetivo (plantillas públicas):');
    Object.entries(byObjetivo).forEach(([objetivo, count]) => {
      console.log(`   ${objetivo}: ${count} plantillas`);
    });

    // Show breakdown by nivel
    const byNivel = mockPlantillas.reduce((acc, p) => {
      acc[p.nivel] = (acc[p.nivel] || 0) + 1;
      return acc;
    }, {});

    console.log('\n📊 Distribución por nivel (plantillas públicas):');
    Object.entries(byNivel).forEach(([nivel, count]) => {
      console.log(`   ${nivel}: ${count} plantillas`);
    });

    // Show breakdown by modalidad
    const byModalidad = mockPlantillas.reduce((acc, p) => {
      acc[p.modalidad] = (acc[p.modalidad] || 0) + 1;
      return acc;
    }, {});

    console.log('\n📊 Distribución por modalidad (plantillas públicas):');
    Object.entries(byModalidad).forEach(([modalidad, count]) => {
      console.log(`   ${modalidad}: ${count} plantillas`);
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Error al crear plantillas:', error.message);
    console.error(error);
    process.exit(1);
  }
};

// Run seeder
seedPlantillasEntrenamiento();
