import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import Dieta from '../models/Dieta.model.js';
import Cliente from '../models/Cliente.model.js';
import Trainer from '../models/Trainer.model.js';
import PlantillaDieta from '../models/PlantillaDieta.model.js';
import connectDB from '../config/db.js';

// Get __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load env vars from backend/.env
dotenv.config({ path: join(__dirname, '../../.env') });

// Función para generar seguimientos aleatorios
const generarSeguimientos = (fechaInicio, duracion, adherenciaBase) => {
  const seguimientos = [];
  const diasSeguimiento = Math.min(Math.floor(duracion * 0.8), 60); // Máximo 60 días de seguimiento

  for (let i = 0; i < diasSeguimiento; i++) {
    const fecha = new Date(fechaInicio);
    fecha.setDate(fecha.getDate() + i);

    // Variar la adherencia de forma realista
    const variacion = Math.random() * 20 - 10; // -10 a +10
    const adherencia_dia = Math.max(0, Math.min(100, adherenciaBase + variacion));

    seguimientos.push({
      fecha,
      peso: null, // Se agregará solo algunos días
      calorias_consumidas: Math.floor(1800 + Math.random() * 400),
      macros_consumidos: {
        proteinas: Math.floor(100 + Math.random() * 50),
        carbohidratos: Math.floor(150 + Math.random() * 100),
        grasas: Math.floor(50 + Math.random() * 40)
      },
      adherencia_dia: Math.round(adherencia_dia),
      notas: i % 7 === 0 ? 'Cheat meal controlado' : ''
    });
  }

  return seguimientos;
};

// Mock dietas data para el trainer Core
const createMockDietas = (trainerId, clientes, plantillas) => {
  const dietas = [];

  // Calcular adherencia promedio de los seguimientos
  const calcularAdherencia = (seguimientos) => {
    if (!seguimientos || seguimientos.length === 0) return 0;
    const total = seguimientos.reduce((sum, seg) => sum + (seg.adherencia_dia || 0), 0);
    return Math.round(total / seguimientos.length);
  };

  // Dieta 1: María García - Keto activa
  if (clientes[0] && plantillas[0]) {
    const fechaInicio = new Date('2024-02-01');
    const duracion = 90;
    const seguimientos = generarSeguimientos(fechaInicio, duracion, 88);

    // Agregar pesos cada 7 días
    for (let i = 0; i < seguimientos.length; i += 7) {
      seguimientos[i].peso = 68 - (i / 7) * 0.5; // Pérdida progresiva
    }

    dietas.push({
      trainerId,
      clienteId: clientes[0]._id,
      plantillaDietaId: plantillas[0]._id,
      nombre: 'Plan Keto - Pérdida de Peso',
      descripcion: 'Dieta cetogénica personalizada para María con enfoque en pérdida de grasa',
      objetivo: 'perdida_peso',
      tipoDieta: 'keto',
      fechaInicio,
      duracion,
      calorias_objetivo: 1800,
      macros_objetivo: {
        proteinas: 100,
        carbohidratos: 20,
        grasas: 140
      },
      restricciones: ['Gluten', 'Azúcar'],
      alergenos: [],
      peso_inicial: 68,
      peso_actual: 64,
      peso_objetivo: 60,
      estado: 'activo',
      adherencia: calcularAdherencia(seguimientos),
      progreso: 65,
      nutricionista: {
        nombre: 'Dra. Laura Gómez'
      },
      seguimientos,
      notas: 'Cliente muy comprometida, excelente progreso'
    });
  }

  // Dieta 2: Carlos Rodríguez - Alta proteína activa
  if (clientes[1] && plantillas[1]) {
    const fechaInicio = new Date('2024-01-15');
    const duracion = 120;
    const seguimientos = generarSeguimientos(fechaInicio, duracion, 92);

    for (let i = 0; i < seguimientos.length; i += 7) {
      seguimientos[i].peso = 75 + (i / 7) * 0.3; // Ganancia progresiva
    }

    dietas.push({
      trainerId,
      clienteId: clientes[1]._id,
      plantillaDietaId: plantillas[1]._id,
      nombre: 'Plan Volumen Muscular',
      descripcion: 'Dieta alta en proteínas para ganancia muscular limpia',
      objetivo: 'ganancia_muscular',
      tipoDieta: 'alta_proteina',
      fechaInicio,
      duracion,
      calorias_objetivo: 2800,
      macros_objetivo: {
        proteinas: 180,
        carbohidratos: 300,
        grasas: 100
      },
      restricciones: [],
      alergenos: ['Lácteos'],
      peso_inicial: 75,
      peso_actual: 80,
      peso_objetivo: 82,
      estado: 'activo',
      adherencia: calcularAdherencia(seguimientos),
      progreso: 70,
      nutricionista: {
        nombre: 'Dr. Carlos Ruiz'
      },
      seguimientos,
      notas: 'Excelente adherencia al plan, ganancia muscular constante'
    });
  }

  // Dieta 3: Ana Martínez - Mantenimiento activa
  if (clientes[2] && plantillas[2]) {
    const fechaInicio = new Date('2024-02-20');
    const duracion = 90;
    const seguimientos = generarSeguimientos(fechaInicio, duracion, 85);

    for (let i = 0; i < seguimientos.length; i += 7) {
      seguimientos[i].peso = 62 - (i / 7) * 0.2;
    }

    dietas.push({
      trainerId,
      clienteId: clientes[2]._id,
      plantillaDietaId: plantillas[2]._id,
      nombre: 'Plan Mantenimiento Sin Cocina',
      descripcion: 'Dieta equilibrada para profesionales ocupados',
      objetivo: 'mantenimiento',
      tipoDieta: 'flexible',
      fechaInicio,
      duracion,
      calorias_objetivo: 2200,
      macros_objetivo: {
        proteinas: 120,
        carbohidratos: 200,
        grasas: 80
      },
      restricciones: [],
      alergenos: [],
      peso_inicial: 62,
      peso_actual: 61,
      peso_objetivo: 60,
      estado: 'activo',
      adherencia: calcularAdherencia(seguimientos),
      progreso: 55,
      nutricionista: {
        nombre: 'Lic. Sofia Torres'
      },
      seguimientos,
      notas: 'Cliente con poco tiempo para cocinar, se adapta bien al plan'
    });
  }

  // Dieta 4: Juan López - Definición activa
  if (clientes[3]) {
    const fechaInicio = new Date('2024-03-01');
    const duracion = 60;
    const seguimientos = generarSeguimientos(fechaInicio, duracion, 90);

    for (let i = 0; i < seguimientos.length; i += 7) {
      seguimientos[i].peso = 82 - (i / 7) * 0.4;
    }

    dietas.push({
      trainerId,
      clienteId: clientes[3]._id,
      plantillaDietaId: null,
      nombre: 'Plan Definición Personalizado',
      descripcion: 'Dieta baja en carbohidratos para definición muscular',
      objetivo: 'definicion',
      tipoDieta: 'baja_carbos',
      fechaInicio,
      duracion,
      calorias_objetivo: 2100,
      macros_objetivo: {
        proteinas: 160,
        carbohidratos: 150,
        grasas: 80
      },
      restricciones: ['Azúcar refinado'],
      alergenos: [],
      peso_inicial: 82,
      peso_actual: 79,
      peso_objetivo: 76,
      estado: 'activo',
      adherencia: calcularAdherencia(seguimientos),
      progreso: 40,
      nutricionista: {
        nombre: 'Dra. Laura Gómez'
      },
      seguimientos,
      notas: 'Cliente competidor, muy disciplinado'
    });
  }

  // Dieta 5: Laura Fernández - Dieta pausada
  if (clientes[4]) {
    const fechaInicio = new Date('2024-01-10');
    const duracion = 90;
    const seguimientos = generarSeguimientos(fechaInicio, duracion, 75).slice(0, 30); // Solo 30 días

    for (let i = 0; i < seguimientos.length; i += 7) {
      seguimientos[i].peso = 70 - (i / 7) * 0.3;
    }

    dietas.push({
      trainerId,
      clienteId: clientes[4]._id,
      plantillaDietaId: null,
      nombre: 'Plan Mediterráneo',
      descripcion: 'Dieta mediterránea para salud cardiovascular',
      objetivo: 'salud_general',
      tipoDieta: 'mediterranea',
      fechaInicio,
      duracion,
      calorias_objetivo: 2000,
      macros_objetivo: {
        proteinas: 120,
        carbohidratos: 240,
        grasas: 70
      },
      restricciones: [],
      alergenos: [],
      peso_inicial: 70,
      peso_actual: 69,
      peso_objetivo: 65,
      estado: 'en pausa',
      adherencia: calcularAdherencia(seguimientos),
      progreso: 35,
      nutricionista: {
        nombre: 'Lic. Sofia Torres'
      },
      seguimientos,
      notas: 'Pausado temporalmente por viaje de trabajo'
    });
  }

  // Dieta 6: Pedro Sánchez - Vegetariana activa
  if (clientes[5]) {
    const fechaInicio = new Date('2024-02-15');
    const duracion = 120;
    const seguimientos = generarSeguimientos(fechaInicio, duracion, 87);

    for (let i = 0; i < seguimientos.length; i += 7) {
      seguimientos[i].peso = 72;
    }

    dietas.push({
      trainerId,
      clienteId: clientes[5]._id,
      plantillaDietaId: null,
      nombre: 'Plan Vegetariano Equilibrado',
      descripcion: 'Dieta vegetariana completa con fuentes proteicas variadas',
      objetivo: 'mantenimiento',
      tipoDieta: 'vegetariana',
      fechaInicio,
      duracion,
      calorias_objetivo: 2200,
      macros_objetivo: {
        proteinas: 110,
        carbohidratos: 280,
        grasas: 70
      },
      restricciones: ['Carnes', 'Pescado'],
      alergenos: [],
      peso_inicial: 72,
      peso_actual: 72,
      peso_objetivo: 72,
      estado: 'activo',
      adherencia: calcularAdherencia(seguimientos),
      progreso: 45,
      nutricionista: {
        nombre: 'Dra. Laura Gómez'
      },
      seguimientos,
      notas: 'Cliente vegetariano de larga data, muy educado en nutrición'
    });
  }

  // Dieta 7: Roberto Díaz - Completada
  if (clientes[6]) {
    const fechaInicio = new Date('2023-11-01');
    const duracion = 90;
    const seguimientos = generarSeguimientos(fechaInicio, duracion, 94);

    for (let i = 0; i < seguimientos.length; i += 7) {
      seguimientos[i].peso = 95 - (i / 7) * 0.8;
    }

    dietas.push({
      trainerId,
      clienteId: clientes[6]._id,
      plantillaDietaId: null,
      nombre: 'Plan Pérdida de Peso Intensivo',
      descripcion: 'Dieta cetogénica para pérdida de peso rápida y efectiva',
      objetivo: 'perdida_peso',
      tipoDieta: 'cetogenica',
      fechaInicio,
      duracion,
      calorias_objetivo: 1900,
      macros_objetivo: {
        proteinas: 150,
        carbohidratos: 40,
        grasas: 135
      },
      restricciones: ['Azúcar', 'Harinas'],
      alergenos: [],
      peso_inicial: 95,
      peso_actual: 85,
      peso_objetivo: 85,
      estado: 'completado',
      adherencia: calcularAdherencia(seguimientos),
      progreso: 100,
      nutricionista: {
        nombre: 'Dr. Carlos Ruiz'
      },
      seguimientos,
      notas: '¡Objetivo alcanzado! Pérdida de 10kg en 12 semanas'
    });
  }

  // Dieta 8: Elena Morales - Vegana activa
  if (clientes[7]) {
    const fechaInicio = new Date('2024-03-05');
    const duracion = 75;
    const seguimientos = generarSeguimientos(fechaInicio, duracion, 89);

    for (let i = 0; i < seguimientos.length; i += 7) {
      seguimientos[i].peso = 65 - (i / 7) * 0.3;
    }

    dietas.push({
      trainerId,
      clienteId: clientes[7]._id,
      plantillaDietaId: null,
      nombre: 'Plan Vegano Alto en Proteína',
      descripcion: 'Dieta vegana optimizada para pérdida de grasa',
      objetivo: 'perdida_peso',
      tipoDieta: 'vegana',
      fechaInicio,
      duracion,
      calorias_objetivo: 1700,
      macros_objetivo: {
        proteinas: 105,
        carbohidratos: 220,
        grasas: 50
      },
      restricciones: ['Todos los productos animales'],
      alergenos: [],
      peso_inicial: 65,
      peso_actual: 63,
      peso_objetivo: 60,
      estado: 'activo',
      adherencia: calcularAdherencia(seguimientos),
      progreso: 30,
      nutricionista: {
        nombre: 'Dra. Laura Gómez'
      },
      seguimientos,
      notas: 'Cliente vegana muy comprometida con su alimentación'
    });
  }

  // Dieta 9: Miguel Castro - Recomposición activa
  if (clientes[8]) {
    const fechaInicio = new Date('2024-01-20');
    const duracion = 120;
    const seguimientos = generarSeguimientos(fechaInicio, duracion, 91);

    for (let i = 0; i < seguimientos.length; i += 7) {
      seguimientos[i].peso = 78 - (i / 7) * 0.2;
    }

    dietas.push({
      trainerId,
      clienteId: clientes[8]._id,
      plantillaDietaId: null,
      nombre: 'Plan Recomposición Corporal',
      descripcion: 'Dieta flexible para perder grasa y ganar músculo simultáneamente',
      objetivo: 'recomposicion',
      tipoDieta: 'flexible',
      fechaInicio,
      duracion,
      calorias_objetivo: 2400,
      macros_objetivo: {
        proteinas: 180,
        carbohidratos: 260,
        grasas: 75
      },
      restricciones: [],
      alergenos: [],
      peso_inicial: 78,
      peso_actual: 77,
      peso_objetivo: 76,
      estado: 'activo',
      adherencia: calcularAdherencia(seguimientos),
      progreso: 60,
      nutricionista: {
        nombre: 'Dr. Carlos Ruiz'
      },
      seguimientos,
      notas: 'Progreso excelente en composición corporal, fuerza en aumento'
    });
  }

  // Dieta 10: Isabel Romero - DASH activa
  if (clientes[9]) {
    const fechaInicio = new Date('2024-02-10');
    const duracion = 90;
    const seguimientos = generarSeguimientos(fechaInicio, duracion, 93);

    for (let i = 0; i < seguimientos.length; i += 7) {
      seguimientos[i].peso = 74 - (i / 7) * 0.4;
    }

    dietas.push({
      trainerId,
      clienteId: clientes[9]._id,
      plantillaDietaId: null,
      nombre: 'Plan DASH para Hipertensión',
      descripcion: 'Dieta DASH personalizada para control de presión arterial',
      objetivo: 'salud_general',
      tipoDieta: 'dash',
      fechaInicio,
      duracion,
      calorias_objetivo: 2000,
      macros_objetivo: {
        proteinas: 120,
        carbohidratos: 270,
        grasas: 60
      },
      restricciones: ['Sodio alto', 'Procesados'],
      alergenos: [],
      peso_inicial: 74,
      peso_actual: 71,
      peso_objetivo: 68,
      estado: 'activo',
      adherencia: calcularAdherencia(seguimientos),
      progreso: 50,
      nutricionista: {
        nombre: 'Lic. Sofia Torres'
      },
      seguimientos,
      notas: 'Cliente con hipertensión, mejora notable en valores de presión'
    });
  }

  return dietas;
};

const seedDietas = async () => {
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

    console.log('🔍 Buscando clientes del trainer Core...');
    const clientes = await Cliente.find({ trainerId: coreTrainer._id, isDeleted: false }).limit(10);

    if (clientes.length === 0) {
      console.error('❌ No se encontraron clientes. Ejecuta primero: npm run seed:clientes');
      process.exit(1);
    }

    console.log(`✅ ${clientes.length} clientes encontrados`);

    console.log('🔍 Buscando plantillas de dietas...');
    const plantillas = await PlantillaDieta.find({
      $or: [
        { trainerId: coreTrainer._id },
        { is_public: true, estado: 'activa' }
      ],
      isDeleted: false
    }).limit(5);

    console.log(`✅ ${plantillas.length} plantillas encontradas`);

    console.log('🗑️  Eliminando dietas existentes del trainer Core...');
    await Dieta.deleteMany({ trainerId: coreTrainer._id });

    console.log('📝 Creando dietas...');
    const dietasData = createMockDietas(coreTrainer._id, clientes, plantillas);
    const dietas = await Dieta.create(dietasData);

    console.log(`\n✅ ${dietas.length} dietas creadas exitosamente para el trainer Core:\n`);

    for (let i = 0; i < dietas.length; i++) {
      const dieta = dietas[i];
      await dieta.populate('clienteId', 'nombre email');
      await dieta.populate('plantillaDietaId', 'name');

      console.log(`${i + 1}. ${dieta.nombre}`);
      console.log(`   Cliente: ${dieta.clienteId.nombre}`);
      console.log(`   Objetivo: ${dieta.objetivo}`);
      console.log(`   Estado: ${dieta.estado}`);
      console.log(`   Adherencia: ${dieta.adherencia}%`);
      console.log(`   Progreso: ${dieta.progreso}%`);
      console.log(`   Seguimientos: ${dieta.seguimientos.length} días`);
      if (dieta.plantillaDietaId) {
        console.log(`   Plantilla: ${dieta.plantillaDietaId.name}`);
      }
      console.log('');
    }

    // Mostrar estadísticas
    const stats = await Dieta.getStatsByTrainer(coreTrainer._id);
    console.log('📊 Estadísticas generales:');
    console.log('════════════════════════════════════════════════════════');
    console.log(`Total de dietas: ${stats.total}`);
    console.log(`Activas: ${stats.activas}`);
    console.log(`Pausadas: ${stats.pausadas}`);
    console.log(`Completadas: ${stats.completadas}`);
    console.log(`Adherencia promedio: ${stats.adherenciaPromedio}%`);
    console.log('════════════════════════════════════════════════════════');

    console.log('\n🎉 Seed de dietas completado exitosamente!');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error al crear dietas:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
};

// Run seeder
seedDietas();
