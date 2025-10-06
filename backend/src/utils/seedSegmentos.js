import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Segmento from '../models/Segmento.model.js';
import Trainer from '../models/Trainer.model.js';
import Cliente from '../models/Cliente.model.js';

dotenv.config();

const seedSegmentos = async () => {
  try {
    // Conectar a MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('📦 Conectado a MongoDB');

    // Buscar el usuario CORE
    const coreTrainer = await Trainer.findOne({ email: 'core@trainerpro.com' });

    if (!coreTrainer) {
      console.error('❌ No se encontró el usuario CORE');
      process.exit(1);
    }

    console.log('✅ Usuario CORE encontrado:', coreTrainer.nombre);

    // Obtener algunos clientes del trainer para los segmentos manuales
    const clientes = await Cliente.find({
      trainer: coreTrainer._id,
      isDeleted: false
    }).limit(10);

    console.log(`📋 Encontrados ${clientes.length} clientes`);

    // Eliminar segmentos existentes del trainer CORE
    await Segmento.deleteMany({ trainerId: coreTrainer._id });
    console.log('🧹 Segmentos anteriores eliminados');

    // Crear segmentos de ejemplo
    const segmentos = [
      // Segmento automático 1
      {
        nombre: 'Clientes Activos',
        descripcion: 'Clientes que han tenido actividad en los últimos 30 días',
        trainerId: coreTrainer._id,
        tipoSegmento: 'automatico',
        reglas: [
          {
            id: 1,
            tipo: 'actividad',
            operador: 'mayor',
            valor: '30',
            combinador: 'AND'
          }
        ],
        activo: true
      },

      // Segmento automático 2
      {
        nombre: 'Clientes Inactivos',
        descripcion: 'Clientes sin actividad en los últimos 60 días',
        trainerId: coreTrainer._id,
        tipoSegmento: 'automatico',
        reglas: [
          {
            id: 1,
            tipo: 'actividad',
            operador: 'menor',
            valor: '60',
            combinador: 'AND'
          }
        ],
        activo: true
      },

      // Segmento automático 3
      {
        nombre: 'Clientes Premium',
        descripcion: 'Clientes con estado activo',
        trainerId: coreTrainer._id,
        tipoSegmento: 'automatico',
        reglas: [
          {
            id: 1,
            tipo: 'estado',
            operador: 'igual',
            valor: 'activo',
            combinador: 'AND'
          }
        ],
        activo: true
      },

      // Segmento manual 1
      {
        nombre: 'Grupo VIP',
        descripcion: 'Clientes seleccionados manualmente para atención especial',
        trainerId: coreTrainer._id,
        tipoSegmento: 'manual',
        clientesManualIds: clientes.slice(0, 3).map(c => c._id),
        reglas: [],
        activo: true
      },

      // Segmento manual 2
      {
        nombre: 'Clientes Nuevos del Mes',
        descripcion: 'Clientes que se unieron este mes',
        trainerId: coreTrainer._id,
        tipoSegmento: 'manual',
        clientesManualIds: clientes.slice(3, 6).map(c => c._id),
        reglas: [],
        activo: true
      },

      // Segmento híbrido 1
      {
        nombre: 'Seguimiento Especial',
        descripcion: 'Combinación de reglas automáticas y selección manual',
        trainerId: coreTrainer._id,
        tipoSegmento: 'hibrido',
        reglas: [
          {
            id: 1,
            tipo: 'estado',
            operador: 'igual',
            valor: 'activo',
            combinador: 'AND'
          }
        ],
        clientesManualIds: clientes.slice(6, 9).map(c => c._id),
        activo: true
      },

      // Segmento automático 4
      {
        nombre: 'Clientes para Reactivar',
        descripcion: 'Clientes inactivos que requieren seguimiento',
        trainerId: coreTrainer._id,
        tipoSegmento: 'automatico',
        reglas: [
          {
            id: 1,
            tipo: 'actividad',
            operador: 'menor',
            valor: '45',
            combinador: 'AND'
          }
        ],
        activo: false
      },

      // Segmento manual 3
      {
        nombre: 'Campaña de Marketing',
        descripcion: 'Lista de clientes para la próxima campaña',
        trainerId: coreTrainer._id,
        tipoSegmento: 'manual',
        clientesManualIds: clientes.slice(0, 5).map(c => c._id),
        reglas: [],
        activo: true
      }
    ];

    // Insertar segmentos
    const createdSegmentos = await Segmento.insertMany(segmentos);
    console.log(`✅ ${createdSegmentos.length} segmentos creados exitosamente`);

    // Mostrar resumen
    console.log('\n📋 RESUMEN DE SEGMENTOS CREADOS:');
    console.log('================================');

    const finalSegmentos = await Segmento.find({ trainerId: coreTrainer._id });

    for (const seg of finalSegmentos) {
      console.log(`\n📌 ${seg.nombre}`);
      console.log(`   Tipo: ${seg.tipoSegmento}`);
      console.log(`   Descripción: ${seg.descripcion}`);
      console.log(`   Activo: ${seg.activo ? '✅' : '❌'}`);
      if (seg.reglas && seg.reglas.length > 0) {
        console.log(`   Reglas: ${seg.reglas.length}`);
      }
      if (seg.clientesManualIds && seg.clientesManualIds.length > 0) {
        console.log(`   Clientes manuales: ${seg.clientesManualIds.length}`);
      }
    }

    console.log('\n✅ Seed de segmentos completado exitosamente!');
    process.exit(0);

  } catch (error) {
    console.error('❌ Error al crear segmentos:', error);
    process.exit(1);
  }
};

seedSegmentos();
