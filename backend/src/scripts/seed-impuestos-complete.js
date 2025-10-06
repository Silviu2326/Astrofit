import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import Trainer from '../models/Trainer.model.js';
import HistorialImpuesto from '../models/HistorialImpuesto.model.js';
import ExencionImpuesto from '../models/ExencionImpuesto.model.js';
import OtroImpuesto from '../models/OtroImpuesto.model.js';
import DeclaracionTrimestral from '../models/DeclaracionTrimestral.model.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = path.join(__dirname, '../../../backend/.env');
dotenv.config({ path: envPath });

const TRAINER_ID = '68e085f877ba9b76d7f9815e';

const seedImpuestosComplete = async () => {
  try {
    console.log('🔍 Conectando a MongoDB...');
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/astrofit';
    await mongoose.connect(mongoUri);
    console.log('✅ MongoDB Connected...\n');

    const trainer = await Trainer.findById(TRAINER_ID);
    if (!trainer) {
      console.error(`❌ No se encontró el trainer con ID: ${TRAINER_ID}`);
      process.exit(1);
    }

    console.log(`✅ Trainer: ${trainer.name} (${trainer.email})\n`);

    // EXENCIONES
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📋 Creando exenciones de impuesto...');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    await ExencionImpuesto.deleteMany({ trainer: TRAINER_ID });

    const exenciones = await ExencionImpuesto.insertMany([
      {
        trainer: TRAINER_ID,
        nombre: 'Exención Exportaciones',
        descripcion: 'Exención de IVA para exportaciones de bienes y servicios fuera de la UE',
        tipoExencion: 'IVA',
        criterio: 'transaction_type:export',
        codigo: 'E1',
        porcentajeExencion: 100,
        aplicacionAutomatica: true,
        baseLegal: 'Ley 37/1992 del IVA',
        articulo: 'Artículo 21',
        fechaInicio: new Date('2024-01-01')
      },
      {
        trainer: TRAINER_ID,
        nombre: 'Exención Servicios Educativos',
        descripcion: 'Exención de IVA para servicios de formación y enseñanza',
        tipoExencion: 'IVA',
        criterio: 'service_type:education',
        codigo: 'E2',
        porcentajeExencion: 100,
        aplicacionAutomatica: false,
        baseLegal: 'Ley 37/1992 del IVA',
        articulo: 'Artículo 20.1.9',
        fechaInicio: new Date('2024-01-01')
      },
      {
        trainer: TRAINER_ID,
        nombre: 'Reducción IRPF Nuevos Autónomos',
        descripcion: 'Reducción del 30% en retención IRPF para profesionales durante los 3 primeros años',
        tipoExencion: 'IRPF',
        criterio: 'años_actividad:<=3',
        codigo: 'R1',
        porcentajeExencion: 30,
        aplicacionAutomatica: false,
        baseLegal: 'Real Decreto 2003/1982',
        articulo: 'Artículo 101',
        fechaInicio: new Date('2024-01-01')
      }
    ]);

    console.log(`✅ ${exenciones.length} exenciones creadas\n`);

    // OTROS IMPUESTOS
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📋 Creando otros impuestos...');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    await OtroImpuesto.deleteMany({ trainer: TRAINER_ID });

    const otrosImpuestos = await OtroImpuesto.insertMany([
      {
        trainer: TRAINER_ID,
        nombre: 'IAE - Actividad Profesional',
        descripcion: 'Impuesto sobre Actividades Económicas para actividad profesional',
        categoria: 'IAE',
        importeAnual: 850,
        importePagado: 850,
        importePendiente: 0,
        frecuencia: 'Anual',
        proximoVencimiento: new Date('2026-09-30'),
        ultimoPago: new Date('2025-09-15'),
        estado: 'pagado',
        añoFiscal: 2025,
        organismoGestor: 'Ayuntamiento de Madrid',
        numeroReferencia: 'IAE-2025-001',
        pagos: [{
          fecha: new Date('2025-09-15'),
          importe: 850,
          metodoPago: 'Domiciliación',
          numeroJustificante: 'DOM-2025-0915'
        }]
      },
      {
        trainer: TRAINER_ID,
        nombre: 'Seguridad Social Autónomo',
        descripcion: 'Cuota mensual de Seguridad Social régimen autónomos',
        categoria: 'Seguridad Social',
        importeAnual: 3840,
        importePagado: 960,
        importePendiente: 2880,
        frecuencia: 'Mensual',
        proximoVencimiento: new Date('2025-05-30'),
        ultimoPago: new Date('2025-03-30'),
        estado: 'parcial',
        añoFiscal: 2025,
        organismoGestor: 'Tesorería General de la Seguridad Social',
        numeroReferencia: 'SS-12345678',
        esRecurrente: true,
        pagos: [
          {
            fecha: new Date('2025-01-30'),
            importe: 320,
            metodoPago: 'Domiciliación',
            numeroJustificante: 'SS-2025-01'
          },
          {
            fecha: new Date('2025-02-28'),
            importe: 320,
            metodoPago: 'Domiciliación',
            numeroJustificante: 'SS-2025-02'
          },
          {
            fecha: new Date('2025-03-30'),
            importe: 320,
            metodoPago: 'Domiciliación',
            numeroJustificante: 'SS-2025-03'
          }
        ]
      },
      {
        trainer: TRAINER_ID,
        nombre: 'Tasa Basura Municipal',
        descripcion: 'Tasa municipal de recogida de basuras',
        categoria: 'Tasa Municipal',
        importeAnual: 240,
        importePagado: 0,
        importePendiente: 240,
        frecuencia: 'Anual',
        proximoVencimiento: new Date('2025-06-30'),
        estado: 'pendiente',
        añoFiscal: 2025,
        organismoGestor: 'Ayuntamiento de Madrid',
        numeroReferencia: 'TM-2025-BASURA'
      }
    ]);

    console.log(`✅ ${otrosImpuestos.length} otros impuestos creados\n`);

    // HISTORIAL
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📋 Creando historial de impuestos...');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    await HistorialImpuesto.deleteMany({ trainer: TRAINER_ID });

    const declaracionQ1 = await DeclaracionTrimestral.findOne({
      trainer: TRAINER_ID,
      año: 2025,
      trimestre: 1
    });

    const historial = [];

    if (declaracionQ1) {
      historial.push({
        trainer: TRAINER_ID,
        periodo: 'Q1-2025',
        trimestre: 1,
        año: 2025,
        tipoImpuesto: 'IVA',
        modelo: '303',
        totalRetenido: declaracionQ1.ivaRepercutido,
        totalPagado: declaracionQ1.resultado,
        saldo: 0,
        declaracionId: declaracionQ1._id,
        declaracionModel: 'DeclaracionTrimestral',
        fechaRegistro: new Date('2025-04-10'),
        fechaPago: new Date('2025-04-15'),
        fechaLimite: new Date('2025-04-20'),
        estado: 'pagado',
        metodoPago: 'Domiciliación',
        numeroJustificante: 'IVA-Q1-2025-12345',
        concepto: 'Pago IVA Trimestre 1 2025',
        categoria: 'trimestral'
      });
    }

    historial.push({
      trainer: TRAINER_ID,
      periodo: 'Q2-2025',
      trimestre: 2,
      año: 2025,
      tipoImpuesto: 'IVA',
      modelo: '303',
      totalRetenido: 0,
      totalPagado: 0,
      saldo: 0,
      fechaRegistro: new Date('2025-07-01'),
      fechaLimite: new Date('2025-07-20'),
      estado: 'pendiente',
      concepto: 'IVA Trimestre 2 2025 - Pendiente de declaración',
      categoria: 'trimestral'
    });

    const historialCreado = await HistorialImpuesto.insertMany(historial);
    console.log(`✅ ${historialCreado.length} registros de historial creados\n`);

    // RESUMEN
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📊 RESUMEN DE DATOS CREADOS');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    console.log(`🔒 Exenciones de Impuesto: ${exenciones.length}`);
    exenciones.forEach(e => console.log(`   • ${e.nombre} (${e.codigo}) - ${e.tipoExencion}`));

    console.log(`\n💰 Otros Impuestos: ${otrosImpuestos.length}`);
    const totalOtrosAnual = otrosImpuestos.reduce((sum, i) => sum + i.importeAnual, 0);
    const totalOtrosPagado = otrosImpuestos.reduce((sum, i) => sum + i.importePagado, 0);
    otrosImpuestos.forEach(i => {
      console.log(`   • ${i.nombre} - ${i.importeAnual}€ (${i.estado})`);
    });
    console.log(`   Total anual: ${totalOtrosAnual}€`);
    console.log(`   Total pagado: ${totalOtrosPagado}€`);

    console.log(`\n📜 Historial de Impuestos: ${historialCreado.length} registros`);

    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('✨ Seed completo de impuestos finalizado!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error al ejecutar el seed:', error);
    process.exit(1);
  }
};

seedImpuestosComplete();
