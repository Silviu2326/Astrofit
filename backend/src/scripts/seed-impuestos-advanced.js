import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import Trainer from '../models/Trainer.model.js';
import Cliente from '../models/Cliente.model.js';
import Factura from '../models/Factura.model.js';
import Gasto from '../models/Gasto.model.js';
import DeclaracionTrimestral from '../models/DeclaracionTrimestral.model.js';
import RetencionIRPF from '../models/RetencionIRPF.model.js';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env vars from backend directory
const envPath = path.join(__dirname, '../../../backend/.env');
dotenv.config({ path: envPath });

const TRAINER_ID = '68e085f877ba9b76d7f9815e';

const seedImpuestosAdvanced = async () => {
  try {
    console.log('🔍 Conectando a MongoDB...');
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/astrofit';
    await mongoose.connect(mongoUri);
    console.log('✅ MongoDB Connected...\n');

    // Verificar que el trainer existe
    const trainer = await Trainer.findById(TRAINER_ID);
    if (!trainer) {
      console.error(`❌ No se encontró el trainer con ID: ${TRAINER_ID}`);
      process.exit(1);
    }

    console.log(`✅ Trainer encontrado: ${trainer.name} (${trainer.email})`);
    console.log(`📝 Trainer ID: ${trainer._id}\n`);

    // ==================================================================
    // PASO 1: Crear Clientes
    // ==================================================================
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📋 PASO 1: Creando clientes...');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    // Eliminar clientes anteriores
    await Cliente.deleteMany({ trainerId: TRAINER_ID });

    const clientes = await Cliente.insertMany([
      {
        trainerId: TRAINER_ID,
        nombre: 'Empresa Alpha SL',
        email: 'contacto@alpha.com',
        telefono: '+34 911 222 333',
        nif: 'B12345678',
        direccion: {
          calle: 'Calle Mayor 123',
          ciudad: 'Madrid',
          codigoPostal: '28001',
          pais: 'España'
        },
        estado: 'activo'
      },
      {
        trainerId: TRAINER_ID,
        nombre: 'Corporación Beta SA',
        email: 'info@beta.com',
        telefono: '+34 922 333 444',
        nif: 'A87654321',
        direccion: {
          calle: 'Avenida Principal 456',
          ciudad: 'Barcelona',
          codigoPostal: '08001',
          pais: 'España'
        },
        estado: 'activo'
      },
      {
        trainerId: TRAINER_ID,
        nombre: 'Servicios Gamma SL',
        email: 'hola@gamma.es',
        telefono: '+34 933 444 555',
        nif: 'B11223344',
        direccion: {
          calle: 'Plaza Central 789',
          ciudad: 'Valencia',
          codigoPostal: '46001',
          pais: 'España'
        },
        estado: 'activo'
      }
    ]);

    console.log(`✅ ${clientes.length} clientes creados\n`);

    // ==================================================================
    // PASO 2: Crear Facturas del Trimestre 1 (2025)
    // ==================================================================
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📋 PASO 2: Creando facturas Q1 2025...');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    // Eliminar facturas anteriores
    await Factura.deleteMany({ trainerId: TRAINER_ID });

    const facturasQ1 = [];
    let numeroFactura = 1;

    // Facturas Enero
    facturasQ1.push({
      trainerId: TRAINER_ID,
      clienteId: clientes[0]._id,
      numeroFactura: `F-2025-${String(numeroFactura++).padStart(3, '0')}`,
      fecha: new Date('2025-01-15'),
      fechaVencimiento: new Date('2025-02-15'),
      estado: 'Pagada',
      items: [{
        descripcion: 'Servicios de consultoría enero',
        cantidad: 1,
        precioUnitario: 5000,
        subtotal: 5000
      }],
      subtotal: 5000,
      descuento: 0,
      impuestos: 1050, // IVA 21%
      montoTotal: 6050,
      metodoPago: 'Transferencia',
      fechaPago: new Date('2025-01-20')
    });

    facturasQ1.push({
      trainerId: TRAINER_ID,
      clienteId: clientes[1]._id,
      numeroFactura: `F-2025-${String(numeroFactura++).padStart(3, '0')}`,
      fecha: new Date('2025-01-25'),
      fechaVencimiento: new Date('2025-02-25'),
      estado: 'Pagada',
      items: [{
        descripcion: 'Desarrollo de software',
        cantidad: 1,
        precioUnitario: 8000,
        subtotal: 8000
      }],
      subtotal: 8000,
      descuento: 0,
      impuestos: 1680, // IVA 21%
      montoTotal: 9680,
      metodoPago: 'Transferencia',
      fechaPago: new Date('2025-01-28')
    });

    // Facturas Febrero
    facturasQ1.push({
      trainerId: TRAINER_ID,
      clienteId: clientes[2]._id,
      numeroFactura: `F-2025-${String(numeroFactura++).padStart(3, '0')}`,
      fecha: new Date('2025-02-10'),
      fechaVencimiento: new Date('2025-03-10'),
      estado: 'Pagada',
      items: [{
        descripcion: 'Formación empresarial',
        cantidad: 1,
        precioUnitario: 3500,
        subtotal: 3500
      }],
      subtotal: 3500,
      descuento: 0,
      impuestos: 735, // IVA 21%
      montoTotal: 4235,
      metodoPago: 'Tarjeta',
      fechaPago: new Date('2025-02-12')
    });

    facturasQ1.push({
      trainerId: TRAINER_ID,
      clienteId: clientes[0]._id,
      numeroFactura: `F-2025-${String(numeroFactura++).padStart(3, '0')}`,
      fecha: new Date('2025-02-20'),
      fechaVencimiento: new Date('2025-03-20'),
      estado: 'Pagada',
      items: [{
        descripcion: 'Auditoría de procesos',
        cantidad: 1,
        precioUnitario: 6000,
        subtotal: 6000
      }],
      subtotal: 6000,
      descuento: 0,
      impuestos: 1260, // IVA 21%
      montoTotal: 7260,
      metodoPago: 'Transferencia',
      fechaPago: new Date('2025-02-25')
    });

    // Facturas Marzo
    facturasQ1.push({
      trainerId: TRAINER_ID,
      clienteId: clientes[1]._id,
      numeroFactura: `F-2025-${String(numeroFactura++).padStart(3, '0')}`,
      fecha: new Date('2025-03-05'),
      fechaVencimiento: new Date('2025-04-05'),
      estado: 'Pagada',
      items: [{
        descripcion: 'Mantenimiento sistemas marzo',
        cantidad: 1,
        precioUnitario: 4500,
        subtotal: 4500
      }],
      subtotal: 4500,
      descuento: 0,
      impuestos: 945, // IVA 21%
      montoTotal: 5445,
      metodoPago: 'Transferencia',
      fechaPago: new Date('2025-03-10')
    });

    const facturas = await Factura.insertMany(facturasQ1);
    console.log(`✅ ${facturas.length} facturas creadas para Q1 2025\n`);

    // ==================================================================
    // PASO 3: Crear Gastos del Trimestre 1 (2025)
    // ==================================================================
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📋 PASO 3: Creando gastos Q1 2025...');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    // Eliminar gastos anteriores
    await Gasto.deleteMany({ trainer: TRAINER_ID });

    const gastosQ1 = [
      {
        trainer: TRAINER_ID,
        fecha: new Date('2025-01-10'),
        concepto: 'Alquiler oficina enero',
        categoria: 'alquiler',
        proveedor: 'Inmobiliaria Madrid Centro',
        monto: 1200,
        metodoPago: 'Domiciliación',
        estado: 'Pagado'
      },
      {
        trainer: TRAINER_ID,
        fecha: new Date('2025-01-15'),
        concepto: 'Material de oficina',
        categoria: 'suministros',
        proveedor: 'Suministros Office SL',
        monto: 450,
        metodoPago: 'Tarjeta',
        estado: 'Pagado'
      },
      {
        trainer: TRAINER_ID,
        fecha: new Date('2025-02-10'),
        concepto: 'Alquiler oficina febrero',
        categoria: 'alquiler',
        proveedor: 'Inmobiliaria Madrid Centro',
        monto: 1200,
        metodoPago: 'Domiciliación',
        estado: 'Pagado'
      },
      {
        trainer: TRAINER_ID,
        fecha: new Date('2025-02-20'),
        concepto: 'Software SaaS - Licencia anual',
        categoria: 'software',
        proveedor: 'Software Pro Inc',
        monto: 800,
        metodoPago: 'Tarjeta',
        estado: 'Pagado'
      },
      {
        trainer: TRAINER_ID,
        fecha: new Date('2025-03-10'),
        concepto: 'Alquiler oficina marzo',
        categoria: 'alquiler',
        proveedor: 'Inmobiliaria Madrid Centro',
        monto: 1200,
        metodoPago: 'Domiciliación',
        estado: 'Pagado'
      }
    ];

    const gastos = await Gasto.insertMany(gastosQ1);
    console.log(`✅ ${gastos.length} gastos creados para Q1 2025\n`);

    // ==================================================================
    // PASO 4: Crear Retenciones IRPF
    // ==================================================================
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📋 PASO 4: Creando retenciones IRPF...');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    // Eliminar retenciones anteriores
    await RetencionIRPF.deleteMany({ trainer: TRAINER_ID });

    const retenciones = [];

    for (const factura of facturas) {
      const fecha = new Date(factura.fecha);
      const mes = fecha.getMonth() + 1;
      const trimestre = Math.ceil(mes / 3);
      const año = fecha.getFullYear();

      const baseRetencion = factura.subtotal;
      const porcentaje = 15;
      const importeRetenido = baseRetencion * (porcentaje / 100);

      const retencion = {
        trainer: TRAINER_ID,
        factura: factura._id,
        cliente: factura.clienteId,
        baseRetencion,
        porcentaje,
        importeRetenido,
        fecha: factura.fecha,
        trimestre,
        año,
        periodo: `${año}-Q${trimestre}`,
        numeroFactura: factura.numeroFactura,
        fechaFactura: factura.fecha,
        estado: 'declarado',
        certificadoEmitido: true,
        fechaEmisionCertificado: new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate() + 5)
      };

      // Obtener datos del cliente
      const cliente = await Cliente.findById(factura.clienteId);
      if (cliente) {
        const direccionCompleta = cliente.direccion
          ? `${cliente.direccion.calle}, ${cliente.direccion.ciudad}`
          : '';
        retencion.datosCliente = {
          nombre: cliente.nombre,
          nif: cliente.nif,
          direccion: direccionCompleta
        };
      }

      retenciones.push(retencion);
    }

    const retencionesCreadas = await RetencionIRPF.insertMany(retenciones);
    console.log(`✅ ${retencionesCreadas.length} retenciones IRPF creadas\n`);

    // ==================================================================
    // PASO 5: Crear Declaración Trimestral Q1 2025
    // ==================================================================
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📋 PASO 5: Creando declaración trimestral Q1 2025...');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    // Eliminar declaraciones anteriores
    await DeclaracionTrimestral.deleteMany({ trainer: TRAINER_ID });

    // Crear declaración
    const declaracion = await DeclaracionTrimestral.crearDesdeFacturas(
      TRAINER_ID,
      2025,
      1,
      facturas,
      gastos
    );

    declaracion.estado = 'presentado';
    declaracion.fechaPresentacion = new Date('2025-04-15');
    declaracion.numeroReferencia = '2025Q1-123456789';

    await declaracion.save();

    console.log('✅ Declaración trimestral Q1 2025 creada\n');

    // ==================================================================
    // RESUMEN FINAL
    // ==================================================================
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📊 RESUMEN DE DATOS CREADOS');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    console.log(`👥 Clientes: ${clientes.length}`);
    clientes.forEach(c => {
      console.log(`   • ${c.nombre} (${c.nif})`);
    });

    console.log(`\n📄 Facturas Q1 2025: ${facturas.length}`);
    const totalFacturado = facturas.reduce((sum, f) => sum + f.subtotal, 0);
    const totalIVA = facturas.reduce((sum, f) => sum + f.impuestos, 0);
    console.log(`   • Total facturado (sin IVA): ${totalFacturado.toFixed(2)}€`);
    console.log(`   • Total IVA repercutido: ${totalIVA.toFixed(2)}€`);

    console.log(`\n💰 Gastos Q1 2025: ${gastos.length}`);
    const totalGastos = gastos.reduce((sum, g) => sum + g.monto, 0);
    const ivaGastos = totalGastos * 0.21; // Asumiendo 21% IVA
    console.log(`   • Total gastos: ${totalGastos.toFixed(2)}€`);
    console.log(`   • IVA soportado (estimado): ${ivaGastos.toFixed(2)}€`);

    console.log(`\n📋 Retenciones IRPF: ${retencionesCreadas.length}`);
    const totalRetenciones = retencionesCreadas.reduce((sum, r) => sum + r.importeRetenido, 0);
    console.log(`   • Total retenido: ${totalRetenciones.toFixed(2)}€`);

    console.log(`\n📊 Declaración Trimestral Q1 2025:`);
    console.log(`   • Estado: ${declaracion.estado}`);
    console.log(`   • IVA repercutido: ${declaracion.ivaRepercutido.toFixed(2)}€`);
    console.log(`   • IVA soportado: ${declaracion.ivaSoportado.toFixed(2)}€`);
    console.log(`   • Resultado: ${declaracion.resultado.toFixed(2)}€`);
    console.log(`   • Fecha presentación: ${declaracion.fechaPresentacion?.toLocaleDateString('es-ES')}`);
    console.log(`   • Número referencia: ${declaracion.numeroReferencia}`);

    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('✨ Seed de impuestos avanzados completado!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error al ejecutar el seed:', error);
    process.exit(1);
  }
};

// Run seeder
seedImpuestosAdvanced();
