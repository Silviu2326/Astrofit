import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Trainer from '../models/Trainer.model.js';
import connectDB from '../config/db.js';

// Load env vars
dotenv.config();

// Mock trainers data based on mockUsers.ts
const mockTrainers = [
  {
    name: 'Usuario Core',
    email: 'core@trainerpro.com',
    password: 'core123',
    plan: 'core',
    subscriptionStatus: 'active',
    subscriptionStartDate: new Date('2024-01-15')
  },
  {
    name: 'Usuario Solo Pro',
    email: 'solopro@trainerpro.com',
    password: 'solopro123',
    plan: 'plansolo-pro',
    subscriptionStatus: 'active',
    subscriptionStartDate: new Date('2024-02-10')
  },
  {
    name: 'Usuario Solo Max',
    email: 'solomax@trainerpro.com',
    password: 'solomax123',
    plan: 'plansolo-max',
    subscriptionStatus: 'active',
    subscriptionStartDate: new Date('2024-03-05')
  },
  {
    name: 'Usuario Creator Pro',
    email: 'creatorpro@trainerpro.com',
    password: 'creatorpro123',
    plan: 'plancreator-pro',
    subscriptionStatus: 'active',
    subscriptionStartDate: new Date('2024-04-12')
  },
  {
    name: 'Usuario Creator Max',
    email: 'creatormax@trainerpro.com',
    password: 'creatormax123',
    plan: 'plancreator-max',
    subscriptionStatus: 'active',
    subscriptionStartDate: new Date('2024-05-20')
  },
  {
    name: 'Usuario Studio Pro',
    email: 'studiopro@trainerpro.com',
    password: 'studiopro123',
    plan: 'planstudio-pro',
    subscriptionStatus: 'active',
    subscriptionStartDate: new Date('2024-06-08')
  },
  {
    name: 'Usuario Studio Max',
    email: 'studiomax@trainerpro.com',
    password: 'studiomax123',
    plan: 'planstudio-max',
    subscriptionStatus: 'active',
    subscriptionStartDate: new Date('2024-07-15')
  },
  {
    name: 'Usuario Teams Pro',
    email: 'teamspro@trainerpro.com',
    password: 'teamspro123',
    plan: 'planteams-pro',
    subscriptionStatus: 'active',
    subscriptionStartDate: new Date('2024-08-22')
  },
  {
    name: 'Usuario Teams Elite',
    email: 'teamselite@trainerpro.com',
    password: 'teamselite123',
    plan: 'planteams-elite',
    subscriptionStatus: 'active',
    subscriptionStartDate: new Date('2024-09-10')
  }
];

const seedTrainers = async () => {
  try {
    // Connect to database
    await connectDB();

    console.log('🗑️  Eliminando trainers existentes...');
    await Trainer.deleteMany({});

    console.log('📝 Creando trainers...');
    const trainers = await Trainer.create(mockTrainers);

    console.log(`✅ ${trainers.length} trainers creados exitosamente:`);

    trainers.forEach((trainer, index) => {
      console.log(`\n${index + 1}. ${trainer.name}`);
      console.log(`   Email: ${trainer.email}`);
      console.log(`   Plan: ${trainer.plan}`);
      console.log(`   Features: ${trainer.getFeatures().length} disponibles`);
    });

    console.log('\n🎉 Seed completado exitosamente!');
    console.log('\n📋 Credenciales de acceso:');
    console.log('════════════════════════════════════════════════════════');
    mockTrainers.forEach(trainer => {
      console.log(`\n${trainer.plan.toUpperCase()}`);
      console.log(`Email: ${trainer.email}`);
      console.log(`Password: ${trainer.password}`);
    });
    console.log('\n════════════════════════════════════════════════════════');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error al crear trainers:', error.message);
    process.exit(1);
  }
};

// Run seeder
seedTrainers();
