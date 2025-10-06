import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Lead from '../models/Lead.model.js';
import Trainer from '../models/Trainer.model.js';
import connectDB from '../config/db.js';

// Load env vars
dotenv.config();

// Mock leads data for Core trainer
const mockLeads = [
  {
    nombre: 'Carlos Méndez',
    email: 'carlos.mendez@email.com',
    telefono: '+34 611 234 567',
    estado: 'nuevo',
    prioridad: 'alta',
    fuente: 'web',
    etiquetas: ['entrenamiento-personal', 'premium'],
    interes: 'Entrenamiento personalizado para competición',
    presupuesto: 150,
    notas: 'Interesado en preparación para maratón. Disponibilidad mañanas.',
    proximoSeguimiento: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000) // En 2 días
  },
  {
    nombre: 'Lucía Ramírez',
    email: 'lucia.ramirez@email.com',
    telefono: '+34 622 345 678',
    estado: 'contactado',
    prioridad: 'media',
    fuente: 'redes-sociales',
    etiquetas: ['nutrición', 'pérdida-peso'],
    interes: 'Plan de nutrición y entrenamiento',
    presupuesto: 80,
    notas: 'Ya contactada por teléfono. Pendiente enviar presupuesto.',
    fechaContacto: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // Hace 3 días
    proximoSeguimiento: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000) // Mañana
  },
  {
    nombre: 'Antonio Jiménez',
    email: 'antonio.jimenez@email.com',
    telefono: '+34 633 456 789',
    estado: 'interesado',
    prioridad: 'alta',
    fuente: 'referido',
    etiquetas: ['crossfit', 'premium'],
    interes: 'Entrenamiento funcional y CrossFit',
    presupuesto: 120,
    notas: 'Referido por Juan López. Muy motivado. Cita agendada para el lunes.',
    fechaContacto: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    proximoSeguimiento: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000) // En 4 días
  },
  {
    nombre: 'Beatriz Santos',
    email: 'beatriz.santos@email.com',
    telefono: '+34 644 567 890',
    estado: 'nuevo',
    prioridad: 'media',
    fuente: 'web',
    etiquetas: ['yoga', 'bienestar'],
    interes: 'Clases de yoga y pilates',
    presupuesto: 60,
    notas: 'Formulario web completado. Interesada en clases grupales.',
    proximoSeguimiento: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000)
  },
  {
    nombre: 'Diego Vargas',
    email: 'diego.vargas@email.com',
    telefono: '+34 655 678 901',
    estado: 'contactado',
    prioridad: 'alta',
    fuente: 'evento',
    etiquetas: ['fuerza', 'hipertrofia'],
    interes: 'Programa de hipertrofia muscular',
    presupuesto: 100,
    notas: 'Conocido en evento de fitness. Experiencia previa en gimnasio.',
    fechaContacto: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    proximoSeguimiento: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
  },
  {
    nombre: 'Elena Morales',
    email: 'elena.morales@email.com',
    telefono: '+34 666 789 012',
    estado: 'perdido',
    prioridad: 'baja',
    fuente: 'publicidad',
    etiquetas: ['running'],
    interes: 'Entrenamiento para 10K',
    presupuesto: 50,
    notas: 'No respondió a 3 llamadas. Email rebotado. Marcar como perdido.',
    fechaContacto: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000)
  },
  {
    nombre: 'Fernando Castro',
    email: 'fernando.castro@email.com',
    telefono: '+34 677 890 123',
    estado: 'interesado',
    prioridad: 'media',
    fuente: 'redes-sociales',
    etiquetas: ['online', 'flexibilidad'],
    interes: 'Entrenamiento online personalizado',
    presupuesto: 70,
    notas: 'Prefiere sesiones virtuales. Horario flexible tardes.',
    fechaContacto: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
    proximoSeguimiento: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
  },
  {
    nombre: 'Gloria Ruiz',
    email: 'gloria.ruiz@email.com',
    telefono: '+34 688 901 234',
    estado: 'nuevo',
    prioridad: 'alta',
    fuente: 'referido',
    etiquetas: ['premium', 'rehabilitación'],
    interes: 'Entrenamiento post-lesión',
    presupuesto: 130,
    notas: 'Recuperación de lesión de rodilla. Necesita plan adaptado.',
    proximoSeguimiento: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000)
  },
  {
    nombre: 'Héctor Navarro',
    email: 'hector.navarro@email.com',
    telefono: '+34 699 012 345',
    estado: 'contactado',
    prioridad: 'media',
    fuente: 'web',
    etiquetas: ['cardio', 'pérdida-peso'],
    interes: 'Programa de adelgazamiento',
    presupuesto: 75,
    notas: 'Contactado por email. Pendiente llamada de seguimiento.',
    fechaContacto: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    proximoSeguimiento: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
  },
  {
    nombre: 'Irene López',
    email: 'irene.lopez@email.com',
    telefono: '+34 610 123 456',
    estado: 'interesado',
    prioridad: 'alta',
    fuente: 'evento',
    etiquetas: ['premium', 'competición'],
    interes: 'Preparación para competición de CrossFit',
    presupuesto: 180,
    notas: 'Atleta experimentada. Busca coach especializado. Gran potencial.',
    fechaContacto: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
    proximoSeguimiento: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000)
  },
  {
    nombre: 'Jorge Parra',
    email: 'jorge.parra@email.com',
    telefono: '+34 621 234 567',
    estado: 'nuevo',
    prioridad: 'baja',
    fuente: 'web',
    etiquetas: ['fitness'],
    interes: 'Información general sobre servicios',
    presupuesto: 40,
    notas: 'Solo solicitó información. No muestra urgencia.',
    proximoSeguimiento: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // En 1 semana
  },
  {
    nombre: 'Karen Silva',
    email: 'karen.silva@email.com',
    telefono: '+34 632 345 678',
    estado: 'contactado',
    prioridad: 'media',
    fuente: 'redes-sociales',
    etiquetas: ['bienestar', 'wellness'],
    interes: 'Programa de bienestar integral',
    presupuesto: 90,
    notas: 'Interesada en combinar entrenamiento, nutrición y mindfulness.',
    fechaContacto: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    proximoSeguimiento: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
  }
];

const seedLeads = async () => {
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

    console.log('\n🗑️  Eliminando leads existentes del trainer Core...');
    const deleted = await Lead.deleteMany({ trainerId: coreTrainer._id });
    console.log(`   ${deleted.deletedCount} leads eliminados`);

    console.log('\n📝 Creando leads para el trainer Core...');

    // Add trainerId to all leads
    const leadsWithTrainer = mockLeads.map(lead => ({
      ...lead,
      trainerId: coreTrainer._id
    }));

    const leads = await Lead.create(leadsWithTrainer);

    console.log(`\n✅ ${leads.length} leads creados exitosamente:`);

    // Group by estado
    const estadoCounts = leads.reduce((acc, lead) => {
      acc[lead.estado] = (acc[lead.estado] || 0) + 1;
      return acc;
    }, {});

    console.log(`\n📊 Estadísticas por Estado:`);
    console.log(`   Nuevos: ${estadoCounts.nuevo || 0}`);
    console.log(`   Contactados: ${estadoCounts.contactado || 0}`);
    console.log(`   Interesados: ${estadoCounts.interesado || 0}`);
    console.log(`   Perdidos: ${estadoCounts.perdido || 0}`);

    // Group by prioridad
    const prioridadCounts = leads.reduce((acc, lead) => {
      acc[lead.prioridad] = (acc[lead.prioridad] || 0) + 1;
      return acc;
    }, {});

    console.log(`\n📊 Estadísticas por Prioridad:`);
    console.log(`   Alta: ${prioridadCounts.alta || 0}`);
    console.log(`   Media: ${prioridadCounts.media || 0}`);
    console.log(`   Baja: ${prioridadCounts.baja || 0}`);

    // Show some examples
    console.log(`\n👥 Ejemplos de leads creados:`);
    console.log('════════════════════════════════════════════════════════');
    leads.slice(0, 5).forEach((lead, index) => {
      console.log(`\n${index + 1}. ${lead.nombre}`);
      console.log(`   Email: ${lead.email}`);
      console.log(`   Teléfono: ${lead.telefono}`);
      console.log(`   Estado: ${lead.estado}`);
      console.log(`   Prioridad: ${lead.prioridad}`);
      console.log(`   Fuente: ${lead.fuente}`);
      console.log(`   Etiquetas: ${lead.etiquetas.join(', ')}`);
      console.log(`   Interés: ${lead.interes}`);
      console.log(`   Presupuesto: €${lead.presupuesto}/mes`);
    });
    console.log(`\n   ... y ${leads.length - 5} leads más`);
    console.log('════════════════════════════════════════════════════════');

    // Calculate stats
    const stats = await Lead.getStatsByTrainer(coreTrainer._id);
    console.log('\n📈 Estadísticas del Pipeline:');
    console.log(`   Total: ${stats.total}`);
    console.log(`   Tasa de conversión: ${stats.tasaConversion}%`);
    console.log(`   Alta prioridad: ${stats.altaPrioridad}`);

    console.log('\n🎉 Seed de leads completado exitosamente!');
    console.log('\n💡 Ahora puedes iniciar sesión con:');
    console.log('   Email: core@trainerpro.com');
    console.log('   Password: core123');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error al crear leads:', error.message);
    if (error.errors) {
      console.error('Detalles de validación:', error.errors);
    }
    process.exit(1);
  }
};

// Run seeder
seedLeads();
