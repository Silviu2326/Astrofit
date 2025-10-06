import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Cliente from '../models/Cliente.model.js';
import Trainer from '../models/Trainer.model.js';
import connectDB from '../config/db.js';

// Load env vars
dotenv.config();

// Mock clientes data for Core trainer
const mockClientes = [
  {
    nombre: 'María García',
    email: 'maria.garcia@email.com',
    telefono: '+34 612 345 678',
    estado: 'activo',
    etiquetas: ['premium', 'fitness'],
    fechaAlta: new Date('2024-01-15'),
    ultimaActividad: new Date('2024-03-08')
  },
  {
    nombre: 'Carlos Rodríguez',
    email: 'carlos.rodriguez@email.com',
    telefono: '+34 623 456 789',
    estado: 'activo',
    etiquetas: ['nutrición', 'pérdida-peso'],
    fechaAlta: new Date('2024-02-01'),
    ultimaActividad: new Date('2024-03-09')
  },
  {
    nombre: 'Ana Martínez',
    email: 'ana.martinez@email.com',
    telefono: '+34 634 567 890',
    estado: 'activo',
    etiquetas: ['fitness', 'online'],
    fechaAlta: new Date('2024-02-15'),
    ultimaActividad: new Date('2024-03-07')
  },
  {
    nombre: 'Juan López',
    email: 'juan.lopez@email.com',
    telefono: '+34 645 678 901',
    estado: 'activo',
    etiquetas: ['fuerza', 'premium'],
    fechaAlta: new Date('2024-01-20'),
    ultimaActividad: new Date('2024-03-10')
  },
  {
    nombre: 'Laura Fernández',
    email: 'laura.fernandez@email.com',
    telefono: '+34 656 789 012',
    estado: 'activo',
    etiquetas: ['yoga', 'flexibilidad'],
    fechaAlta: new Date('2024-02-10'),
    ultimaActividad: new Date('2024-03-06')
  },
  {
    nombre: 'Pedro Sánchez',
    email: 'pedro.sanchez@email.com',
    telefono: '+34 667 890 123',
    estado: 'inactivo',
    etiquetas: ['crossfit'],
    fechaAlta: new Date('2023-11-05'),
    ultimaActividad: new Date('2024-01-20')
  },
  {
    nombre: 'Carmen Ruiz',
    email: 'carmen.ruiz@email.com',
    telefono: '+34 678 901 234',
    estado: 'activo',
    etiquetas: ['pilates', 'premium'],
    fechaAlta: new Date('2024-01-25'),
    ultimaActividad: new Date('2024-03-09')
  },
  {
    nombre: 'Miguel Torres',
    email: 'miguel.torres@email.com',
    telefono: '+34 689 012 345',
    estado: 'activo',
    etiquetas: ['running', 'cardio'],
    fechaAlta: new Date('2024-02-20'),
    ultimaActividad: new Date('2024-03-08')
  },
  {
    nombre: 'Isabel Moreno',
    email: 'isabel.moreno@email.com',
    telefono: '+34 690 123 456',
    estado: 'activo',
    etiquetas: ['nutrición', 'online'],
    fechaAlta: new Date('2024-02-05'),
    ultimaActividad: new Date('2024-03-10')
  },
  {
    nombre: 'Roberto Jiménez',
    email: 'roberto.jimenez@email.com',
    telefono: '+34 601 234 567',
    estado: 'inactivo',
    etiquetas: ['fitness'],
    fechaAlta: new Date('2023-12-10'),
    ultimaActividad: new Date('2024-02-15')
  },
  {
    nombre: 'Sofía Navarro',
    email: 'sofia.navarro@email.com',
    telefono: '+34 612 345 890',
    estado: 'activo',
    etiquetas: ['premium', 'personal-training'],
    fechaAlta: new Date('2024-01-30'),
    ultimaActividad: new Date('2024-03-09')
  },
  {
    nombre: 'David Álvarez',
    email: 'david.alvarez@email.com',
    telefono: '+34 623 456 901',
    estado: 'activo',
    etiquetas: ['fuerza', 'hipertrofia'],
    fechaAlta: new Date('2024-02-12'),
    ultimaActividad: new Date('2024-03-07')
  },
  {
    nombre: 'Elena Castro',
    email: 'elena.castro@email.com',
    telefono: '+34 634 567 012',
    estado: 'activo',
    etiquetas: ['wellness', 'online'],
    fechaAlta: new Date('2024-02-18'),
    ultimaActividad: new Date('2024-03-10')
  },
  {
    nombre: 'Francisco Ramos',
    email: 'francisco.ramos@email.com',
    telefono: '+34 645 678 123',
    estado: 'activo',
    etiquetas: ['crossfit', 'premium'],
    fechaAlta: new Date('2024-01-22'),
    ultimaActividad: new Date('2024-03-08')
  },
  {
    nombre: 'Patricia Gil',
    email: 'patricia.gil@email.com',
    telefono: '+34 656 789 234',
    estado: 'inactivo',
    etiquetas: ['yoga'],
    fechaAlta: new Date('2023-10-15'),
    ultimaActividad: new Date('2024-01-10')
  }
];

const seedClientes = async () => {
  try {
    // Connect to database
    await connectDB();

    console.log('🔍 Buscando trainer con plan Core...');
    const coreTrainer = await Trainer.findOne({ email: 'core@trainerpro.com' });

    if (!coreTrainer) {
      console.error('❌ No se encontró el trainer Core. Ejecuta primero: npm run seed:trainers');
      process.exit(1);
    }

    console.log(`✅ Trainer encontrado: ${coreTrainer.name} (${coreTrainer.email})`);
    console.log(`   ID: ${coreTrainer._id}`);

    console.log('\n🗑️  Eliminando clientes existentes del trainer Core...');
    const deleted = await Cliente.deleteMany({ trainerId: coreTrainer._id });
    console.log(`   ${deleted.deletedCount} clientes eliminados`);

    console.log('\n📝 Creando clientes para el trainer Core...');

    // Add trainerId to all clients
    const clientesWithTrainer = mockClientes.map(cliente => ({
      ...cliente,
      trainerId: coreTrainer._id
    }));

    const clientes = await Cliente.create(clientesWithTrainer);

    console.log(`\n✅ ${clientes.length} clientes creados exitosamente:`);

    // Group by status
    const activos = clientes.filter(c => c.estado === 'activo').length;
    const inactivos = clientes.filter(c => c.estado === 'inactivo').length;

    console.log(`\n📊 Estadísticas:`);
    console.log(`   Total: ${clientes.length}`);
    console.log(`   Activos: ${activos}`);
    console.log(`   Inactivos: ${inactivos}`);

    // Show some examples
    console.log(`\n👥 Ejemplos de clientes creados:`);
    console.log('════════════════════════════════════════════════════════');
    clientes.slice(0, 5).forEach((cliente, index) => {
      console.log(`\n${index + 1}. ${cliente.nombre}`);
      console.log(`   Email: ${cliente.email}`);
      console.log(`   Teléfono: ${cliente.telefono}`);
      console.log(`   Estado: ${cliente.estado}`);
      console.log(`   Etiquetas: ${cliente.etiquetas.join(', ')}`);
      console.log(`   Fecha alta: ${cliente.fechaAlta.toLocaleDateString()}`);
      console.log(`   Última actividad: ${cliente.ultimaActividad.toLocaleDateString()}`);
    });
    console.log(`\n   ... y ${clientes.length - 5} clientes más`);
    console.log('════════════════════════════════════════════════════════');

    console.log('\n🎉 Seed de clientes completado exitosamente!');
    console.log('\n💡 Ahora puedes iniciar sesión con:');
    console.log('   Email: core@trainerpro.com');
    console.log('   Password: core123');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error al crear clientes:', error.message);
    if (error.errors) {
      console.error('Detalles de validación:', error.errors);
    }
    process.exit(1);
  }
};

// Run seeder
seedClientes();
