import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Factura from '../models/Factura.model.js';
import Trainer from '../models/Trainer.model.js';
import Cliente from '../models/Cliente.model.js';
import connectDB from '../config/db.js';

// Load env vars
dotenv.config();

const seedFacturas = async () => {
  try {
    // Connect to database
    await connectDB();

    console.log('🔍 Buscando trainer core@trainerpro.com...');
    const trainer = await Trainer.findOne({ email: 'core@trainerpro.com' });

    if (!trainer) {
      console.error('❌ No se encontró el trainer core@trainerpro.com');
      console.log('💡 Por favor, ejecuta primero: npm run seed:trainers');
      process.exit(1);
    }

    console.log('✅ Trainer encontrado:', trainer.name);

    console.log('🔍 Buscando clientes del trainer...');
    const clientes = await Cliente.find({ trainerId: trainer._id, isDeleted: false });

    if (clientes.length === 0) {
      console.error('❌ No se encontraron clientes para este trainer');
      console.log('💡 Por favor, ejecuta primero: npm run seed:clientes');
      process.exit(1);
    }

    console.log(`✅ ${clientes.length} clientes encontrados`);

    console.log('🗑️  Eliminando facturas existentes del trainer...');
    await Factura.deleteMany({ trainerId: trainer._id });

    console.log('📝 Creando facturas...');

    const facturas = [];
    const estados = ['Pagada', 'Pendiente', 'Vencida', 'Anulada'];
    const metodosPago = ['Tarjeta', 'Transferencia', 'PayPal', 'Stripe', 'Efectivo'];

    // Crear facturas para los primeros 5 clientes
    const clientesParaFacturar = clientes.slice(0, Math.min(5, clientes.length));

    for (let i = 0; i < clientesParaFacturar.length; i++) {
      const cliente = clientesParaFacturar[i];

      // Crear 3-5 facturas por cliente
      const numFacturas = Math.floor(Math.random() * 3) + 3;

      for (let j = 0; j < numFacturas; j++) {
        const fecha = new Date();
        fecha.setMonth(fecha.getMonth() - Math.floor(Math.random() * 6)); // Últimos 6 meses
        fecha.setDate(Math.floor(Math.random() * 28) + 1);

        const fechaVencimiento = new Date(fecha);
        fechaVencimiento.setDate(fechaVencimiento.getDate() + 30);

        const estado = estados[Math.floor(Math.random() * estados.length)];
        const metodoPago = metodosPago[Math.floor(Math.random() * metodosPago.length)];

        // Items de la factura
        const items = [
          {
            descripcion: 'Plan Mensual de Entrenamiento Personalizado',
            cantidad: 1,
            precioUnitario: 150.00,
            subtotal: 150.00
          }
        ];

        // Agregar items adicionales aleatorios
        const itemsAdicionales = [
          { descripcion: 'Plan Nutricional', cantidad: 1, precioUnitario: 75.00 },
          { descripcion: 'Sesión de Valoración Inicial', cantidad: 1, precioUnitario: 50.00 },
          { descripcion: 'Pack de 4 Sesiones Presenciales', cantidad: 1, precioUnitario: 200.00 },
          { descripcion: 'Consulta de Seguimiento', cantidad: 1, precioUnitario: 40.00 },
          { descripcion: 'Análisis de Composición Corporal', cantidad: 1, precioUnitario: 35.00 }
        ];

        if (Math.random() > 0.5) {
          const itemAdicional = itemsAdicionales[Math.floor(Math.random() * itemsAdicionales.length)];
          itemAdicional.subtotal = itemAdicional.cantidad * itemAdicional.precioUnitario;
          items.push(itemAdicional);
        }

        const subtotal = items.reduce((sum, item) => sum + item.subtotal, 0);
        const descuento = Math.random() > 0.7 ? Math.floor(Math.random() * 30) + 10 : 0;
        const impuestos = subtotal * 0.21; // IVA 21%
        const montoTotal = subtotal - descuento + impuestos;

        const facturaData = {
          trainerId: trainer._id,
          clienteId: cliente._id,
          fecha,
          fechaVencimiento,
          estado,
          items,
          subtotal,
          descuento,
          impuestos,
          montoTotal,
          metodoPago,
          datosCliente: {
            nombre: cliente.nombre,
            email: cliente.email,
            telefono: cliente.telefono || '',
            nombreFiscal: cliente.facturacion?.nombreFiscal || cliente.nombre,
            nif: cliente.facturacion?.nif || '',
            direccionFiscal: cliente.facturacion?.direccionFiscal || ''
          },
          notas: j === 0 ? 'Primera factura del cliente' : '',
          recordatoriosEnviados: []
        };

        // Si está pagada, agregar fecha de pago y referencia
        if (estado === 'Pagada') {
          facturaData.fechaPago = new Date(fecha);
          facturaData.fechaPago.setDate(facturaData.fechaPago.getDate() + Math.floor(Math.random() * 15));
          facturaData.referenciaPago = `REF-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
        }

        // Si está vencida, ajustar fecha de vencimiento
        if (estado === 'Vencida') {
          facturaData.fechaVencimiento = new Date();
          facturaData.fechaVencimiento.setDate(facturaData.fechaVencimiento.getDate() - Math.floor(Math.random() * 30) - 1);

          // Agregar algunos recordatorios
          const numRecordatorios = Math.floor(Math.random() * 3) + 1;
          for (let r = 0; r < numRecordatorios; r++) {
            const fechaRecordatorio = new Date(facturaData.fechaVencimiento);
            fechaRecordatorio.setDate(fechaRecordatorio.getDate() + (r + 1) * 7);
            facturaData.recordatoriosEnviados.push({
              fecha: fechaRecordatorio,
              tipo: 'pago',
              canal: r % 2 === 0 ? 'email' : 'sms'
            });
          }
        }

        // Si está anulada, agregar nota interna
        if (estado === 'Anulada') {
          facturaData.notasInternas = 'Anulada por duplicado / Error en el importe / Cliente canceló servicio';
        }

        facturas.push(facturaData);
      }
    }

    // Crear facturas en la base de datos una por una para evitar duplicados en numeroFactura
    const facturasCreadas = [];
    for (const facturaData of facturas) {
      const factura = new Factura(facturaData);
      await factura.save();
      facturasCreadas.push(factura);
    }

    console.log(`✅ ${facturasCreadas.length} facturas creadas exitosamente`);

    // Mostrar estadísticas
    const stats = await Factura.getStatsByTrainer(trainer._id);

    console.log('\n📊 Estadísticas de facturas creadas:');
    console.log('════════════════════════════════════════════════════════');
    console.log(`Total facturas: ${stats.total}`);
    console.log(`Pagadas: ${stats.pagadas}`);
    console.log(`Pendientes: ${stats.pendientes}`);
    console.log(`Vencidas: ${stats.vencidas}`);
    console.log(`Anuladas: ${stats.anuladas}`);
    console.log(`\nTotal facturado: €${stats.totalFacturado.toFixed(2)}`);
    console.log(`Total cobrado: €${stats.totalCobrado.toFixed(2)}`);
    console.log(`Total pendiente: €${stats.totalPendiente.toFixed(2)}`);
    console.log('════════════════════════════════════════════════════════');

    console.log('\n📋 Ejemplos de facturas creadas:');
    const ejemplos = facturasCreadas.slice(0, 3);
    for (const factura of ejemplos) {
      console.log(`\n${factura.numeroFactura}`);
      console.log(`  Cliente: ${factura.datosCliente.nombre}`);
      console.log(`  Fecha: ${factura.fecha.toLocaleDateString('es-ES')}`);
      console.log(`  Estado: ${factura.estado}`);
      console.log(`  Total: €${factura.montoTotal.toFixed(2)}`);
      console.log(`  Items: ${factura.items.length}`);
    }

    console.log('\n🎉 Seed de facturas completado exitosamente!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error al crear facturas:', error.message);
    console.error(error);
    process.exit(1);
  }
};

// Run seeder
seedFacturas();
