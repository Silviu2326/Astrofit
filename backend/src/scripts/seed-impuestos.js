import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import TasaImpuesto from '../models/TasaImpuesto.model.js';
import Trainer from '../models/Trainer.model.js';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env vars from backend directory
const envPath = path.join(__dirname, '../../../backend/.env');
dotenv.config({ path: envPath });

const seedImpuestos = async () => {
  try {
    console.log('🔍 Buscando archivo .env en:', envPath);
    console.log('🔗 MongoDB URI:', process.env.MONGODB_URI || 'NO ENCONTRADA');

    // Connect to MongoDB
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/astrofit';
    await mongoose.connect(mongoUri);
    console.log('✅ MongoDB Connected...');

    // Find trainer with email core@trainerpro.com
    const trainer = await Trainer.findOne({ email: 'core@trainerpro.com' });

    if (!trainer) {
      console.error('❌ No se encontró el trainer con email core@trainerpro.com');
      console.log('💡 Asegúrate de que el trainer existe en la base de datos');
      process.exit(1);
    }

    console.log(`✅ Trainer encontrado: ${trainer.name} (${trainer.email})`);
    console.log(`📝 Trainer ID: ${trainer._id}`);

    // Delete existing tasas for this trainer
    await TasaImpuesto.deleteMany({ trainer: trainer._id });
    console.log('🗑️  Tasas de impuesto anteriores eliminadas');

    // Tasas de IVA (España)
    const tasasIVA = [
      {
        trainer: trainer._id,
        nombre: 'IVA General',
        tipo: 'IVA',
        porcentaje: 21,
        aplicaA: 'ambos',
        codigo: 'IVA_GENERAL',
        activo: true,
        descripcion: 'Tipo general de IVA aplicable a la mayoría de servicios y productos'
      },
      {
        trainer: trainer._id,
        nombre: 'IVA Reducido',
        tipo: 'IVA',
        porcentaje: 10,
        aplicaA: 'ambos',
        codigo: 'IVA_REDUCIDO',
        activo: true,
        descripcion: 'Tipo reducido de IVA para determinados productos y servicios'
      },
      {
        trainer: trainer._id,
        nombre: 'IVA Superreducido',
        tipo: 'IVA',
        porcentaje: 4,
        aplicaA: 'productos',
        codigo: 'IVA_SUPERREDUCIDO',
        activo: true,
        descripcion: 'Tipo superreducido de IVA para productos de primera necesidad'
      }
    ];

    // Retenciones IRPF
    const retencionesIRPF = [
      {
        trainer: trainer._id,
        nombre: 'Retención IRPF Profesional',
        tipo: 'IRPF',
        porcentaje: 15,
        aplicaA: 'servicios',
        codigo: 'IRPF_15',
        activo: true,
        descripcion: 'Retención estándar para profesionales'
      },
      {
        trainer: trainer._id,
        nombre: 'Retención IRPF Reducida',
        tipo: 'IRPF',
        porcentaje: 7,
        aplicaA: 'servicios',
        codigo: 'IRPF_7',
        activo: true,
        descripcion: 'Retención reducida para profesionales en los primeros años de actividad'
      }
    ];

    // Otros impuestos
    const otrosImpuestos = [
      {
        trainer: trainer._id,
        nombre: 'Impuesto Servicios Digitales',
        tipo: 'OTRO',
        porcentaje: 3,
        aplicaA: 'servicios',
        codigo: 'ISD_3',
        activo: false,
        descripcion: 'Impuesto sobre servicios digitales (solo si aplica)'
      }
    ];

    // Combine all tasas
    const todasLasTasas = [
      ...tasasIVA,
      ...retencionesIRPF,
      ...otrosImpuestos
    ];

    // Insert tasas
    const tasasCreadas = await TasaImpuesto.insertMany(todasLasTasas);

    console.log('\n✅ Tasas de impuesto creadas exitosamente:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

    tasasCreadas.forEach((tasa) => {
      const estado = tasa.activo ? '🟢' : '🔴';
      console.log(`${estado} ${tasa.nombre} (${tasa.tipo}) - ${tasa.porcentaje}%`);
      console.log(`   Código: ${tasa.codigo}`);
      console.log(`   Aplica a: ${tasa.aplicaA}`);
      console.log(`   ${tasa.descripcion}`);
      console.log('');
    });

    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`\n📊 Total de tasas creadas: ${tasasCreadas.length}`);
    console.log(`   - IVA: ${tasasIVA.length}`);
    console.log(`   - IRPF: ${retencionesIRPF.length}`);
    console.log(`   - Otros: ${otrosImpuestos.length}`);
    console.log('\n✨ Seed de impuestos completado exitosamente!');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error al ejecutar el seed:', error);
    process.exit(1);
  }
};

// Run seeder
seedImpuestos();
