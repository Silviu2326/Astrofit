import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Gasto from '../models/Gasto.model.js';
import Trainer from '../models/Trainer.model.js';
import connectDB from '../config/db.js';

// Load env vars
dotenv.config();

const seedGastos = async () => {
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

    console.log('🗑️  Eliminando gastos existentes del trainer...');
    await Gasto.deleteMany({ trainer: trainer._id });

    console.log('📝 Creando gastos...');

    const gastos = [];
    const categorias = [
      'nomina', 'alquiler', 'suministros', 'marketing', 'software',
      'equipamiento', 'impuestos', 'seguros', 'mantenimiento', 'otros'
    ];

    const proveedores = {
      nomina: ['Nóminas Internas'],
      alquiler: ['Inmobiliaria García', 'Propiedades Centro', 'Alquileres Madrid'],
      suministros: ['Telefónica', 'Iberdrola', 'Canal de Isabel II', 'Gas Natural'],
      marketing: ['Google Ads', 'Meta Ads', 'SEO Masters', 'Estudio Creativo Plus', 'Imprenta Rápida'],
      software: ['Amazon Web Services', 'Microsoft', 'Adobe', 'DigitalOcean', 'Stripe'],
      equipamiento: ['Office Depot', 'Apple Store', 'Amazon', 'MediaMarkt'],
      impuestos: ['Hacienda Pública', 'Agencia Tributaria'],
      seguros: ['Mapfre Seguros', 'AXA', 'Allianz'],
      mantenimiento: ['Mantenimientos Rápidos SL', 'TechFix', 'Limpiezas Express'],
      otros: ['Udemy Business', 'Makro', 'Parkings Centro', 'Restaurante El Buen Gusto', 'El País', 'Bufete Martínez']
    };

    const metodosPago = ['Transferencia', 'Tarjeta', 'Efectivo', 'Domiciliación'];
    const estados = ['Pagado', 'Pendiente', 'Aprobado'];

    // Crear gastos para los últimos 6 meses
    const mesesAtras = 6;
    const fechaInicio = new Date();
    fechaInicio.setMonth(fechaInicio.getMonth() - mesesAtras);

    // Gastos recurrentes mensuales (se repiten cada mes)
    const gastosRecurrentes = [
      {
        concepto: 'Nómina empleados',
        categoria: 'nomina',
        proveedor: 'Nóminas Internas',
        monto: 18500,
        metodoPago: 'Transferencia',
        esRecurrente: true,
        frecuencia: 'Mensual',
        tieneFactura: false,
        dia: 30
      },
      {
        concepto: 'Alquiler Local',
        categoria: 'alquiler',
        proveedor: 'Inmobiliaria García',
        monto: 2000,
        metodoPago: 'Transferencia',
        esRecurrente: true,
        frecuencia: 'Mensual',
        tieneFactura: true,
        referencia: 'ALQ-',
        dia: 1
      },
      {
        concepto: 'Factura Internet y Teléfono',
        categoria: 'suministros',
        proveedor: 'Telefónica',
        monto: 450,
        metodoPago: 'Domiciliación',
        esRecurrente: true,
        frecuencia: 'Mensual',
        tieneFactura: true,
        dia: 20
      },
      {
        concepto: 'Factura Electricidad',
        categoria: 'suministros',
        proveedor: 'Iberdrola',
        monto: () => Math.floor(Math.random() * 100) + 350, // 350-450
        metodoPago: 'Domiciliación',
        esRecurrente: true,
        frecuencia: 'Mensual',
        tieneFactura: true,
        dia: 15
      },
      {
        concepto: 'AWS Cloud Services',
        categoria: 'software',
        proveedor: 'Amazon Web Services',
        monto: () => Math.floor(Math.random() * 100) + 700, // 700-800
        metodoPago: 'Tarjeta',
        esRecurrente: true,
        frecuencia: 'Mensual',
        tieneFactura: true,
        dia: 25
      },
      {
        concepto: 'Microsoft 365 Business',
        categoria: 'software',
        proveedor: 'Microsoft',
        monto: 600,
        metodoPago: 'Tarjeta',
        esRecurrente: true,
        frecuencia: 'Mensual',
        tieneFactura: true,
        dia: 22
      },
      {
        concepto: 'Parking Mensual',
        categoria: 'otros',
        proveedor: 'Parkings Centro',
        monto: 120,
        metodoPago: 'Domiciliación',
        esRecurrente: true,
        frecuencia: 'Mensual',
        tieneFactura: false,
        dia: 8
      }
    ];

    // Crear gastos recurrentes para cada mes
    for (let mes = 0; mes < mesesAtras; mes++) {
      for (const gasto of gastosRecurrentes) {
        const fecha = new Date();
        fecha.setMonth(fecha.getMonth() - mes);
        fecha.setDate(gasto.dia);

        const monto = typeof gasto.monto === 'function' ? gasto.monto() : gasto.monto;

        gastos.push({
          trainer: trainer._id,
          fecha,
          concepto: `${gasto.concepto} ${fecha.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}`,
          descripcion: gasto.descripcion || '',
          categoria: gasto.categoria,
          proveedor: gasto.proveedor,
          monto,
          metodoPago: gasto.metodoPago,
          estado: mes === 0 && gasto.dia > new Date().getDate() ? 'Pendiente' : 'Pagado',
          referencia: gasto.referencia ? `${gasto.referencia}${fecha.getMonth() + 1}${fecha.getFullYear()}` : '',
          esRecurrente: gasto.esRecurrente,
          frecuencia: gasto.frecuencia,
          tieneFactura: gasto.tieneFactura
        });
      }
    }

    // Gastos no recurrentes aleatorios
    const gastosNoRecurrentes = [
      // Marketing
      {
        concepto: 'Campaña Google Ads',
        categoria: 'marketing',
        proveedor: 'Google Ads',
        montoMin: 800,
        montoMax: 1500,
        metodoPago: 'Tarjeta',
        tieneFactura: true,
        probabilidad: 0.8
      },
      {
        concepto: 'Campaña Meta Ads',
        categoria: 'marketing',
        proveedor: 'Meta Ads',
        montoMin: 600,
        montoMax: 1200,
        metodoPago: 'Tarjeta',
        tieneFactura: true,
        probabilidad: 0.8
      },
      {
        concepto: 'Diseño Gráfico',
        categoria: 'marketing',
        proveedor: 'Estudio Creativo Plus',
        montoMin: 400,
        montoMax: 800,
        metodoPago: 'Transferencia',
        tieneFactura: true,
        probabilidad: 0.4
      },
      {
        concepto: 'Material Promocional',
        categoria: 'marketing',
        proveedor: 'Imprenta Rápida',
        montoMin: 200,
        montoMax: 500,
        metodoPago: 'Transferencia',
        tieneFactura: true,
        probabilidad: 0.3
      },
      // Equipamiento
      {
        concepto: 'Material de Oficina',
        categoria: 'equipamiento',
        proveedor: 'Office Depot',
        montoMin: 150,
        montoMax: 400,
        metodoPago: 'Tarjeta',
        tieneFactura: true,
        probabilidad: 0.6
      },
      // Software
      {
        concepto: 'Adobe Creative Cloud',
        categoria: 'software',
        proveedor: 'Adobe',
        montoMin: 250,
        montoMax: 300,
        metodoPago: 'Tarjeta',
        tieneFactura: true,
        probabilidad: 0.7
      },
      // Mantenimiento
      {
        concepto: 'Mantenimiento Aire Acondicionado',
        categoria: 'mantenimiento',
        proveedor: 'Mantenimientos Rápidos SL',
        montoMin: 200,
        montoMax: 400,
        metodoPago: 'Transferencia',
        tieneFactura: true,
        probabilidad: 0.2
      },
      {
        concepto: 'Reparación Impresora',
        categoria: 'mantenimiento',
        proveedor: 'TechFix',
        montoMin: 80,
        montoMax: 200,
        metodoPago: 'Efectivo',
        tieneFactura: false,
        probabilidad: 0.3
      },
      {
        concepto: 'Limpieza Oficina',
        categoria: 'mantenimiento',
        proveedor: 'Limpiezas Express',
        montoMin: 100,
        montoMax: 200,
        metodoPago: 'Transferencia',
        tieneFactura: true,
        probabilidad: 0.4
      },
      // Otros
      {
        concepto: 'Formación Empleados',
        categoria: 'otros',
        proveedor: 'Udemy Business',
        montoMin: 200,
        montoMax: 500,
        metodoPago: 'Tarjeta',
        tieneFactura: true,
        probabilidad: 0.3
      },
      {
        concepto: 'Cafetería y Suministros',
        categoria: 'otros',
        proveedor: 'Makro',
        montoMin: 100,
        montoMax: 250,
        metodoPago: 'Tarjeta',
        tieneFactura: true,
        probabilidad: 0.5
      },
      {
        concepto: 'Comida Equipo',
        categoria: 'otros',
        proveedor: 'Restaurante El Buen Gusto',
        montoMin: 200,
        montoMax: 500,
        metodoPago: 'Tarjeta',
        tieneFactura: true,
        probabilidad: 0.2
      }
    ];

    // Crear gastos no recurrentes para cada mes
    for (let mes = 0; mes < mesesAtras; mes++) {
      for (const gasto of gastosNoRecurrentes) {
        // Probabilidad de que ocurra este gasto en este mes
        if (Math.random() < gasto.probabilidad) {
          const fecha = new Date();
          fecha.setMonth(fecha.getMonth() - mes);
          fecha.setDate(Math.floor(Math.random() * 28) + 1);

          const monto = Math.floor(Math.random() * (gasto.montoMax - gasto.montoMin + 1)) + gasto.montoMin;

          gastos.push({
            trainer: trainer._id,
            fecha,
            concepto: `${gasto.concepto} ${fecha.toLocaleDateString('es-ES', { month: 'long' })}`,
            descripcion: gasto.descripcion || '',
            categoria: gasto.categoria,
            proveedor: gasto.proveedor,
            monto,
            metodoPago: gasto.metodoPago,
            estado: fecha > new Date() ? 'Pendiente' : 'Pagado',
            esRecurrente: false,
            tieneFactura: gasto.tieneFactura
          });
        }
      }
    }

    // Gastos trimestrales (impuestos y seguros)
    const gastosTrimestrales = [
      {
        concepto: 'IVA Trimestral',
        categoria: 'impuestos',
        proveedor: 'Hacienda Pública',
        montoMin: 2000,
        montoMax: 3500,
        metodoPago: 'Transferencia',
        tieneFactura: false,
        mes: [3, 6, 9, 12] // Trimestres
      },
      {
        concepto: 'Seguro RC Profesional',
        categoria: 'seguros',
        proveedor: 'Mapfre Seguros',
        monto: 420,
        metodoPago: 'Domiciliación',
        tieneFactura: true,
        mes: [3, 6, 9, 12],
        esRecurrente: true,
        frecuencia: 'Trimestral'
      }
    ];

    for (const gasto of gastosTrimestrales) {
      const mesActual = new Date().getMonth() + 1;
      const añoActual = new Date().getFullYear();

      for (const mesTrimestre of gasto.mes) {
        // Solo crear si está dentro del rango de los últimos 6 meses
        const fecha = new Date(añoActual, mesTrimestre - 1, 5);
        const diferenciaMeses = Math.floor((new Date() - fecha) / (1000 * 60 * 60 * 24 * 30));

        if (diferenciaMeses >= 0 && diferenciaMeses < mesesAtras) {
          const monto = gasto.monto || Math.floor(Math.random() * (gasto.montoMax - gasto.montoMin + 1)) + gasto.montoMin;

          gastos.push({
            trainer: trainer._id,
            fecha,
            concepto: `${gasto.concepto} ${Math.ceil(mesTrimestre / 3)}T ${añoActual}`,
            descripcion: '',
            categoria: gasto.categoria,
            proveedor: gasto.proveedor,
            monto,
            metodoPago: gasto.metodoPago,
            estado: 'Pagado',
            referencia: gasto.categoria === 'impuestos' ? `${gasto.concepto.split(' ')[0]}-${Math.ceil(mesTrimestre / 3)}T${añoActual}` : '',
            esRecurrente: gasto.esRecurrente || false,
            frecuencia: gasto.frecuencia || null,
            tieneFactura: gasto.tieneFactura
          });
        }
      }
    }

    // Gastos especiales puntuales
    const gastosEspeciales = [
      {
        concepto: 'Ordenador Portátil',
        descripcion: 'MacBook Pro para diseño',
        categoria: 'equipamiento',
        proveedor: 'Apple Store',
        monto: 2100,
        metodoPago: 'Transferencia',
        estado: 'Pagado',
        referencia: 'MAC-2025',
        tieneFactura: true,
        fecha: new Date(2025, 7, 20) // Agosto
      },
      {
        concepto: 'Monitor 4K',
        descripcion: 'Pantalla profesional',
        categoria: 'equipamiento',
        proveedor: 'Amazon',
        monto: 450,
        metodoPago: 'Tarjeta',
        estado: 'Pagado',
        tieneFactura: true,
        fecha: new Date(2025, 6, 25) // Julio
      },
      {
        concepto: 'Mobiliario Oficina',
        descripcion: '2 sillas ergonómicas',
        categoria: 'equipamiento',
        proveedor: 'Office Depot',
        monto: 580,
        metodoPago: 'Transferencia',
        estado: 'Pagado',
        tieneFactura: true,
        fecha: new Date(2025, 8, 12) // Septiembre
      },
      {
        concepto: 'Consultoría Legal',
        descripcion: 'Asesoría contratos',
        categoria: 'otros',
        proveedor: 'Bufete Martínez',
        monto: 850,
        metodoPago: 'Transferencia',
        estado: 'Pendiente',
        referencia: 'LEG-2025-09',
        tieneFactura: true,
        fecha: new Date(2025, 8, 29) // Septiembre
      }
    ];

    // Agregar gastos especiales si están en el rango de fechas
    for (const gasto of gastosEspeciales) {
      const diferenciaMeses = Math.floor((new Date() - gasto.fecha) / (1000 * 60 * 60 * 24 * 30));
      if (diferenciaMeses >= 0 && diferenciaMeses < mesesAtras) {
        gastos.push({
          trainer: trainer._id,
          ...gasto
        });
      }
    }

    // Crear todos los gastos en la base de datos
    const gastosCreados = await Gasto.insertMany(gastos);

    console.log(`✅ ${gastosCreados.length} gastos creados exitosamente`);

    // Calcular estadísticas
    const totalPagado = gastosCreados
      .filter(g => g.estado === 'Pagado')
      .reduce((sum, g) => sum + g.monto, 0);

    const totalPendiente = gastosCreados
      .filter(g => g.estado === 'Pendiente')
      .reduce((sum, g) => sum + g.monto, 0);

    const recurrentes = gastosCreados.filter(g => g.esRecurrente).length;

    const porCategoria = {};
    gastosCreados.forEach(g => {
      if (!porCategoria[g.categoria]) {
        porCategoria[g.categoria] = { count: 0, total: 0 };
      }
      porCategoria[g.categoria].count++;
      porCategoria[g.categoria].total += g.monto;
    });

    console.log('\n📊 Estadísticas de gastos creados:');
    console.log('════════════════════════════════════════════════════════');
    console.log(`Total gastos: ${gastosCreados.length}`);
    console.log(`Pagados: ${gastosCreados.filter(g => g.estado === 'Pagado').length}`);
    console.log(`Pendientes: ${gastosCreados.filter(g => g.estado === 'Pendiente').length}`);
    console.log(`Recurrentes: ${recurrentes}`);
    console.log(`\nTotal pagado: €${totalPagado.toFixed(2)}`);
    console.log(`Total pendiente: €${totalPendiente.toFixed(2)}`);
    console.log(`Total general: €${(totalPagado + totalPendiente).toFixed(2)}`);

    console.log('\n📋 Gastos por categoría:');
    for (const [categoria, data] of Object.entries(porCategoria)) {
      console.log(`  ${categoria}: ${data.count} gastos - €${data.total.toFixed(2)}`);
    }

    console.log('\n💰 Ejemplos de gastos creados:');
    const ejemplos = gastosCreados.slice(0, 5);
    for (const gasto of ejemplos) {
      console.log(`\n  ${gasto.concepto}`);
      console.log(`    Categoría: ${gasto.categoria}`);
      console.log(`    Proveedor: ${gasto.proveedor}`);
      console.log(`    Fecha: ${gasto.fecha.toLocaleDateString('es-ES')}`);
      console.log(`    Estado: ${gasto.estado}`);
      console.log(`    Monto: €${gasto.monto.toFixed(2)}`);
      console.log(`    Recurrente: ${gasto.esRecurrente ? 'Sí (' + gasto.frecuencia + ')' : 'No'}`);
    }

    console.log('\n🎉 Seed de gastos completado exitosamente!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error al crear gastos:', error.message);
    console.error(error);
    process.exit(1);
  }
};

// Run seeder
seedGastos();
