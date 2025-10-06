import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import Entrenamiento from '../models/Entrenamiento.model.js';
import Ejercicio from '../models/Ejercicio.model.js';
import Cliente from '../models/Cliente.model.js';
import Trainer from '../models/Trainer.model.js';
import connectDB from '../config/db.js';

// Get __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load env vars from backend/.env
dotenv.config({ path: join(__dirname, '../../.env') });

const seedEntrenamientos = async () => {
  try {
    // Connect to database
    await connectDB();

    console.log('🔍 Buscando trainers y clientes...');
    const trainers = await Trainer.find({});

    if (trainers.length === 0) {
      console.log('⚠️  No hay trainers en la base de datos.');
      console.log('💡 Ejecuta primero: npm run seed:trainers');
      process.exit(1);
    }

    console.log(`✅ ${trainers.length} trainers encontrados\n`);

    console.log('🗑️  Eliminando entrenamientos existentes...');
    await Entrenamiento.deleteMany({});

    console.log('📝 Creando entrenamientos para cada trainer...\n');

    let totalCreated = 0;

    for (const trainer of trainers) {
      console.log(`\n📋 Procesando trainer: ${trainer.name}`);

      // Get clients for this trainer
      const clientes = await Cliente.find({ trainerId: trainer._id, isDeleted: false }).limit(5);

      if (clientes.length === 0) {
        console.log(`   ⚠️  No hay clientes para este trainer, saltando...`);
        continue;
      }

      console.log(`   ✅ ${clientes.length} clientes encontrados`);

      // Get exercises for this trainer
      const ejercicios = await Ejercicio.find({ trainerId: trainer._id, isDeleted: false });

      if (ejercicios.length === 0) {
        console.log(`   ⚠️  No hay ejercicios para este trainer, saltando...`);
        continue;
      }

      console.log(`   ✅ ${ejercicios.length} ejercicios encontrados`);

      // Create 2-3 entrenamientos per client
      for (const cliente of clientes) {
        // Entrenamiento 1: Fuerza (Activo)
        const fechaInicio1 = new Date();
        fechaInicio1.setDate(fechaInicio1.getDate() - 14); // Empezó hace 2 semanas

        const sesiones1 = [];
        for (let semana = 0; semana < 4; semana++) {
          for (let dia = 0; dia < 3; dia++) {
            const fecha = new Date(fechaInicio1);
            fecha.setDate(fecha.getDate() + (semana * 7) + (dia * 2));

            const ejerciciosSeleccionados = ejercicios
              .filter(e => ['pecho', 'espalda', 'piernas'].includes(e.grupoMuscular))
              .slice(0, 5)
              .map((ej, index) => ({
                ejercicioId: ej._id,
                series: 3 + Math.floor(Math.random() * 2),
                repeticiones: `${8 + Math.floor(Math.random() * 5)}-${12 + Math.floor(Math.random() * 4)}`,
                descanso: 60 + Math.floor(Math.random() * 30),
                orden: index + 1,
                completado: fecha < new Date() ? Math.random() > 0.2 : false
              }));

            sesiones1.push({
              fecha,
              hora: '09:00',
              duracion: 60,
              estado: fecha < new Date() ? (Math.random() > 0.2 ? 'completado' : 'cancelado') : 'pendiente',
              ejercicios: ejerciciosSeleccionados,
              notasEntrenador: fecha < new Date() ? 'Buen progreso en los pesos' : '',
              valoracionCliente: fecha < new Date() && Math.random() > 0.3 ? Math.ceil(Math.random() * 5) : undefined,
              sensacionEsfuerzo: fecha < new Date() && Math.random() > 0.3 ? Math.ceil(Math.random() * 10) : undefined
            });
          }
        }

        const entrenamiento1 = await Entrenamiento.create({
          trainerId: trainer._id,
          clienteId: cliente._id,
          titulo: 'Programa de Fuerza General',
          descripcion: 'Entrenamiento enfocado en ganancia de fuerza en los ejercicios básicos',
          tipo: 'Fuerza',
          objetivo: 'Ganar Masa',
          nivel: 'Intermedio',
          estado: 'activo',
          fechaInicio: fechaInicio1,
          totalSemanas: 8,
          diasPorSemana: 3,
          sesiones: sesiones1,
          notasEntrenador: 'Cliente muestra buena técnica y compromiso',
          conSeguimiento: true
        });

        totalCreated++;
        console.log(`   ✅ Creado: ${entrenamiento1.titulo} para ${cliente.nombre}`);

        // Entrenamiento 2: HIIT (Solo algunos clientes)
        if (Math.random() > 0.5) {
          const fechaInicio2 = new Date();
          fechaInicio2.setDate(fechaInicio2.getDate() - 7); // Empezó hace 1 semana

          const sesiones2 = [];
          for (let semana = 0; semana < 4; semana++) {
            for (let dia = 0; dia < 4; dia++) {
              const fecha = new Date(fechaInicio2);
              fecha.setDate(fecha.getDate() + (semana * 7) + (dia * 2));

              const ejerciciosCardio = ejercicios
                .filter(e => ['cardio', 'todo-cuerpo'].includes(e.categoria))
                .slice(0, 4)
                .map((ej, index) => ({
                  ejercicioId: ej._id,
                  series: 4,
                  repeticiones: '30s',
                  descanso: 30,
                  orden: index + 1,
                  completado: fecha < new Date() ? Math.random() > 0.3 : false
                }));

              sesiones2.push({
                fecha,
                hora: '18:00',
                duracion: 45,
                estado: fecha < new Date() ? (Math.random() > 0.3 ? 'completado' : 'pendiente') : 'pendiente',
                ejercicios: ejerciciosCardio,
                valoracionCliente: fecha < new Date() && Math.random() > 0.5 ? Math.ceil(Math.random() * 5) : undefined
              });
            }
          }

          const entrenamiento2 = await Entrenamiento.create({
            trainerId: trainer._id,
            clienteId: cliente._id,
            titulo: 'HIIT Quema Grasa',
            descripcion: 'Entrenamiento de alta intensidad para pérdida de grasa',
            tipo: 'HIIT',
            objetivo: 'Perder Grasa',
            nivel: 'Intermedio',
            estado: 'activo',
            fechaInicio: fechaInicio2,
            totalSemanas: 6,
            diasPorSemana: 4,
            sesiones: sesiones2,
            conSeguimiento: true
          });

          totalCreated++;
          console.log(`   ✅ Creado: ${entrenamiento2.titulo} para ${cliente.nombre}`);
        }

        // Entrenamiento 3: Completado (Solo algunos clientes)
        if (Math.random() > 0.6) {
          const fechaInicio3 = new Date();
          fechaInicio3.setMonth(fechaInicio3.getMonth() - 3); // Empezó hace 3 meses
          const fechaFin3 = new Date();
          fechaFin3.setMonth(fechaFin3.getMonth() - 1); // Terminó hace 1 mes

          const sesiones3 = [];
          for (let i = 0; i < 12; i++) {
            const fecha = new Date(fechaInicio3);
            fecha.setDate(fecha.getDate() + (i * 3));

            const ejerciciosHipertrofia = ejercicios
              .slice(0, 6)
              .map((ej, index) => ({
                ejercicioId: ej._id,
                series: 4,
                repeticiones: '8-12',
                descanso: 90,
                orden: index + 1,
                completado: true
              }));

            sesiones3.push({
              fecha,
              hora: '10:00',
              duracion: 75,
              estado: 'completado',
              ejercicios: ejerciciosHipertrofia,
              notasEntrenador: 'Sesión completada con éxito',
              valoracionCliente: Math.ceil(Math.random() * 2) + 3, // 3-5 estrellas
              sensacionEsfuerzo: Math.ceil(Math.random() * 3) + 6 // 6-9 RPE
            });
          }

          const entrenamiento3 = await Entrenamiento.create({
            trainerId: trainer._id,
            clienteId: cliente._id,
            titulo: 'Programa de Hipertrofia',
            descripcion: 'Entrenamiento completado enfocado en ganancia muscular',
            tipo: 'Hipertrofia',
            objetivo: 'Ganar Masa',
            nivel: 'Avanzado',
            estado: 'completado',
            fechaInicio: fechaInicio3,
            fechaFin: fechaFin3,
            totalSemanas: 12,
            diasPorSemana: 4,
            sesiones: sesiones3,
            notasEntrenador: 'Excelentes resultados, cliente muy comprometido',
            conSeguimiento: false
          });

          totalCreated++;
          console.log(`   ✅ Creado: ${entrenamiento3.titulo} para ${cliente.nombre}`);
        }
      }
    }

    console.log('\n═══════════════════════════════════════════════════════');
    console.log(`🎉 Seed completado exitosamente!`);
    console.log(`📊 Total de entrenamientos creados: ${totalCreated}`);
    console.log(`👥 Para ${trainers.length} trainers`);
    console.log('═══════════════════════════════════════════════════════\n');

    // Show some stats
    const activos = await Entrenamiento.countDocuments({ estado: 'activo' });
    const completados = await Entrenamiento.countDocuments({ estado: 'completado' });
    const pausados = await Entrenamiento.countDocuments({ estado: 'pausado' });

    console.log('📊 Distribución por estado:');
    console.log(`   Activos: ${activos} entrenamientos`);
    console.log(`   Completados: ${completados} entrenamientos`);
    console.log(`   Pausados: ${pausados} entrenamientos`);

    // Show by type
    const porTipo = await Entrenamiento.aggregate([
      { $group: { _id: '$tipo', count: { $sum: 1 } } }
    ]);

    console.log('\n📊 Distribución por tipo:');
    porTipo.forEach(({ _id, count }) => {
      console.log(`   ${_id}: ${count} entrenamientos`);
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Error al crear entrenamientos:', error.message);
    console.error(error);
    process.exit(1);
  }
};

// Run seeder
seedEntrenamientos();
