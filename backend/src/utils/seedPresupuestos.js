import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Presupuesto from '../models/Presupuesto.model.js';
import Trainer from '../models/Trainer.model.js';
import connectDB from '../config/db.js';

// Load env vars
dotenv.config();

const seedPresupuestos = async () => {
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

    console.log('🗑️  Eliminando presupuestos existentes del trainer...');
    await Presupuesto.deleteMany({ trainer: trainer._id });

    console.log('📝 Creando presupuestos...');

    const presupuestos = [];
    const añoActual = 2025;

    // Presupuestos mensuales para el año actual (últimos 6 meses + próximos 6 meses)
    const presupuestosMensuales = [
      { categoria: 'nomina', limite: 20000 },
      { categoria: 'alquiler', limite: 2200 },
      { categoria: 'suministros', limite: 1500 },
      { categoria: 'marketing', limite: 3500 },
      { categoria: 'software', limite: 2000 },
      { categoria: 'equipamiento', limite: 3000 },
      { categoria: 'impuestos', limite: 3000 },
      { categoria: 'seguros', limite: 1200 },
      { categoria: 'mantenimiento', limite: 800 },
      { categoria: 'otros', limite: 1500 },
    ];

    // Crear presupuestos mensuales para todo el año 2025
    for (let mes = 1; mes <= 12; mes++) {
      for (const presupuesto of presupuestosMensuales) {
        presupuestos.push({
          trainer: trainer._id,
          categoria: presupuesto.categoria,
          periodo: 'Mensual',
          limitePresupuesto: presupuesto.limite,
          gastoActual: 0, // Se actualizará después
          año: añoActual,
          mes: mes,
          alertaActivada: true,
          umbralAlerta: 80,
          notas: mes === new Date().getMonth() + 1 ? 'Mes actual - Monitorear de cerca' : ''
        });
      }
    }

    // Presupuestos trimestrales para 2025
    const presupuestosTrimestrales = [
      { categoria: 'marketing', limite: 10000 },
      { categoria: 'equipamiento', limite: 8000 },
      { categoria: 'software', limite: 6000 },
      { categoria: 'impuestos', limite: 9000 },
    ];

    for (let trimestre = 1; trimestre <= 4; trimestre++) {
      for (const presupuesto of presupuestosTrimestrales) {
        presupuestos.push({
          trainer: trainer._id,
          categoria: presupuesto.categoria,
          periodo: 'Trimestral',
          limitePresupuesto: presupuesto.limite,
          gastoActual: 0,
          año: añoActual,
          trimestre: trimestre,
          alertaActivada: true,
          umbralAlerta: 85,
          notas: `Presupuesto trimestral Q${trimestre}`
        });
      }
    }

    // Presupuestos anuales para 2025
    const presupuestosAnuales = [
      { categoria: 'nomina', limite: 230000, notas: 'Incluye pagas extras y bonificaciones' },
      { categoria: 'alquiler', limite: 25000, notas: 'Alquiler local + gastos de comunidad' },
      { categoria: 'marketing', limite: 40000, notas: 'Presupuesto anual marketing digital' },
      { categoria: 'software', limite: 22000, notas: 'Licencias y servicios cloud' },
      { categoria: 'equipamiento', limite: 35000, notas: 'Renovación equipamiento' },
      { categoria: 'impuestos', limite: 35000, notas: 'Impuestos anuales estimados' },
      { categoria: 'seguros', limite: 4800, notas: 'Seguros RC y local' },
      { categoria: 'mantenimiento', limite: 10000, notas: 'Mantenimiento preventivo y correctivo' },
      { categoria: 'suministros', limite: 18000, notas: 'Luz, agua, internet, teléfono' },
      { categoria: 'otros', limite: 18000, notas: 'Gastos varios y emergencias' },
    ];

    for (const presupuesto of presupuestosAnuales) {
      presupuestos.push({
        trainer: trainer._id,
        categoria: presupuesto.categoria,
        periodo: 'Anual',
        limitePresupuesto: presupuesto.limite,
        gastoActual: 0,
        año: añoActual,
        alertaActivada: true,
        umbralAlerta: 90,
        notas: presupuesto.notas
      });
    }

    // Crear presupuestos en la base de datos
    const presupuestosCreados = await Presupuesto.insertMany(presupuestos);

    console.log(`✅ ${presupuestosCreados.length} presupuestos creados exitosamente`);

    // Actualizar gastos actuales basados en gastos reales
    console.log('\n🔄 Actualizando gastos actuales basados en datos reales...');
    let actualizados = 0;
    for (const presupuesto of presupuestosCreados) {
      try {
        await presupuesto.actualizarGastoActual();
        await presupuesto.save();
        actualizados++;
      } catch (error) {
        console.warn(`⚠️  No se pudo actualizar presupuesto ${presupuesto._id}:`, error.message);
      }
    }
    console.log(`✅ ${actualizados} presupuestos actualizados con gastos reales`);

    // Recargar presupuestos actualizados para mostrar estadísticas
    const presupuestosActualizados = await Presupuesto.find({ trainer: trainer._id });

    // Calcular estadísticas
    const stats = {
      total: presupuestosActualizados.length,
      mensuales: presupuestosActualizados.filter(p => p.periodo === 'Mensual').length,
      trimestrales: presupuestosActualizados.filter(p => p.periodo === 'Trimestral').length,
      anuales: presupuestosActualizados.filter(p => p.periodo === 'Anual').length,
      excedidos: presupuestosActualizados.filter(p => p.excedido).length,
      conAlertas: presupuestosActualizados.filter(p => p.debeAlertar).length,
      totalPresupuestado: 0,
      totalGastado: 0
    };

    // Solo contar presupuestos mensuales del mes actual para totales
    const mesActual = new Date().getMonth() + 1;
    const presupuestosMesActual = presupuestosActualizados.filter(
      p => p.periodo === 'Mensual' && p.mes === mesActual
    );

    presupuestosMesActual.forEach(p => {
      stats.totalPresupuestado += p.limitePresupuesto;
      stats.totalGastado += p.gastoActual;
    });

    console.log('\n📊 Estadísticas de presupuestos creados:');
    console.log('════════════════════════════════════════════════════════');
    console.log(`Total presupuestos: ${stats.total}`);
    console.log(`  - Mensuales: ${stats.mensuales}`);
    console.log(`  - Trimestrales: ${stats.trimestrales}`);
    console.log(`  - Anuales: ${stats.anuales}`);
    console.log(`\nEstado:`);
    console.log(`  - Excedidos: ${stats.excedidos}`);
    console.log(`  - Con alertas: ${stats.conAlertas}`);
    console.log(`\nMes actual (${mesActual}/${añoActual}):`);
    console.log(`  - Total presupuestado: €${stats.totalPresupuestado.toFixed(2)}`);
    console.log(`  - Total gastado: €${stats.totalGastado.toFixed(2)}`);
    console.log(`  - Disponible: €${(stats.totalPresupuestado - stats.totalGastado).toFixed(2)}`);
    if (stats.totalPresupuestado > 0) {
      const porcentaje = (stats.totalGastado / stats.totalPresupuestado) * 100;
      console.log(`  - Porcentaje usado: ${porcentaje.toFixed(1)}%`);
    }
    console.log('════════════════════════════════════════════════════════');

    // Mostrar ejemplos de presupuestos
    console.log('\n💰 Ejemplos de presupuestos del mes actual:');
    const ejemplos = presupuestosMesActual.slice(0, 5);
    for (const presupuesto of ejemplos) {
      const porcentaje = presupuesto.porcentajeUsado;
      const estado = presupuesto.excedido ? '❌ EXCEDIDO' : presupuesto.debeAlertar ? '⚠️  ALERTA' : '✅ OK';

      console.log(`\n  ${presupuesto.categoria.toUpperCase()}`);
      console.log(`    Estado: ${estado}`);
      console.log(`    Límite: €${presupuesto.limitePresupuesto.toFixed(2)}`);
      console.log(`    Gastado: €${presupuesto.gastoActual.toFixed(2)} (${porcentaje.toFixed(1)}%)`);
      console.log(`    Disponible: €${presupuesto.montoDisponible.toFixed(2)}`);
    }

    // Mostrar presupuestos excedidos o con alertas
    const problemáticos = presupuestosActualizados.filter(p => p.excedido || p.debeAlertar);
    if (problemáticos.length > 0) {
      console.log('\n⚠️  Presupuestos que requieren atención:');
      problemáticos.slice(0, 5).forEach(p => {
        const tipo = p.periodo === 'Mensual' ? `${p.mes}/${p.año}`
                   : p.periodo === 'Trimestral' ? `Q${p.trimestre}/${p.año}`
                   : `${p.año}`;
        const estado = p.excedido ? 'EXCEDIDO' : 'ALERTA';
        console.log(`  - ${p.categoria} (${p.periodo} ${tipo}): ${estado} - ${p.porcentajeUsado.toFixed(1)}% usado`);
      });
    }

    console.log('\n🎉 Seed de presupuestos completado exitosamente!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error al crear presupuestos:', error.message);
    console.error(error);
    process.exit(1);
  }
};

// Run seeder
seedPresupuestos();
