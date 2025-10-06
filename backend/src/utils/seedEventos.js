import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Evento from '../models/Evento.model.js';
import Trainer from '../models/Trainer.model.js';
import Cliente from '../models/Cliente.model.js';

dotenv.config();

const seedEventos = async () => {
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

    // Obtener algunos clientes del trainer
    const clientes = await Cliente.find({
      trainer: coreTrainer._id,
      isDeleted: false
    }).limit(5);

    console.log(`📋 Encontrados ${clientes.length} clientes`);

    // Eliminar eventos existentes del trainer CORE
    await Evento.deleteMany({ trainer: coreTrainer._id });
    console.log('🧹 Eventos anteriores eliminados');

    // Función helper para crear fechas
    const createDate = (daysOffset, hour, minutes) => {
      const date = new Date();
      date.setDate(date.getDate() + daysOffset);
      date.setHours(hour, minutes, 0, 0);
      return date;
    };

    const createEndDate = (startDate, durationMinutes) => {
      const endDate = new Date(startDate);
      endDate.setMinutes(endDate.getMinutes() + durationMinutes);
      return endDate;
    };

    // Crear eventos de ejemplo
    const eventos = [
      // Eventos de hoy
      {
        titulo: 'Sesión de entrenamiento - María García',
        descripcion: 'Sesión de entrenamiento personalizado enfocada en fuerza',
        fechaInicio: createDate(0, 9, 0),
        fechaFin: createDate(0, 10, 0),
        tipo: 'clase',
        ubicacion: 'Gimnasio Principal - Sala 1',
        cliente: clientes[0]?._id,
        color: '#10b981',
        recordatorio: true,
        minutosAntes: 15,
        trainer: coreTrainer._id
      },

      {
        titulo: 'Consulta inicial - Nuevo Cliente',
        descripcion: 'Primera consulta para evaluación física y definición de objetivos',
        fechaInicio: createDate(0, 11, 30),
        fechaFin: createDate(0, 12, 30),
        tipo: 'cita',
        ubicacion: 'Oficina',
        color: '#3b82f6',
        recordatorio: true,
        minutosAntes: 30,
        trainer: coreTrainer._id
      },

      {
        titulo: 'Clase grupal de yoga',
        descripcion: 'Clase de yoga para grupo de 8 personas - Nivel intermedio',
        fechaInicio: createDate(0, 17, 0),
        fechaFin: createDate(0, 18, 0),
        tipo: 'clase',
        ubicacion: 'Sala de Yoga',
        participantes: ['Ana M.', 'Carlos R.', 'Laura F.', 'Juan L.'],
        color: '#10b981',
        recordatorio: true,
        minutosAntes: 15,
        trainer: coreTrainer._id
      },

      // Eventos de mañana
      {
        titulo: 'Reunión de planificación mensual',
        descripcion: 'Revisión de objetivos y planificación del próximo mes',
        fechaInicio: createDate(1, 10, 0),
        fechaFin: createDate(1, 11, 0),
        tipo: 'reunion',
        ubicacion: 'Sala de reuniones',
        color: '#8b5cf6',
        recordatorio: true,
        minutosAntes: 30,
        trainer: coreTrainer._id
      },

      {
        titulo: 'Entrenamiento funcional - Carlos Rodríguez',
        descripcion: 'Sesión de entrenamiento funcional y cardio',
        fechaInicio: createDate(1, 15, 0),
        fechaFin: createDate(1, 16, 0),
        tipo: 'clase',
        ubicacion: 'Área funcional',
        cliente: clientes[1]?._id,
        color: '#10b981',
        recordatorio: true,
        minutosAntes: 15,
        trainer: coreTrainer._id
      },

      {
        titulo: 'Evaluación física - Ana Martínez',
        descripcion: 'Evaluación física mensual: medidas, peso, composición corporal',
        fechaInicio: createDate(1, 18, 0),
        fechaFin: createDate(1, 19, 0),
        tipo: 'cita',
        ubicacion: 'Oficina',
        cliente: clientes[2]?._id,
        color: '#3b82f6',
        recordatorio: true,
        minutosAntes: 30,
        trainer: coreTrainer._id
      },

      // Eventos en 2 días
      {
        titulo: 'Clase de spinning',
        descripcion: 'Clase de spinning de alta intensidad',
        fechaInicio: createDate(2, 7, 0),
        fechaFin: createDate(2, 8, 0),
        tipo: 'clase',
        ubicacion: 'Sala de spinning',
        participantes: ['Grupo A - 12 personas'],
        color: '#10b981',
        recordatorio: true,
        minutosAntes: 15,
        trainer: coreTrainer._id
      },

      {
        titulo: 'Sesión de nutrición - Juan López',
        descripcion: 'Asesoría nutricional y revisión de plan alimenticio',
        fechaInicio: createDate(2, 12, 0),
        fechaFin: createDate(2, 13, 0),
        tipo: 'cita',
        ubicacion: 'Oficina',
        cliente: clientes[3]?._id,
        color: '#3b82f6',
        recordatorio: true,
        minutosAntes: 30,
        trainer: coreTrainer._id
      },

      // Eventos en 3 días
      {
        titulo: 'Workshop: Técnicas de levantamiento',
        descripcion: 'Taller sobre técnicas correctas de levantamiento de peso',
        fechaInicio: createDate(3, 16, 0),
        fechaFin: createDate(3, 18, 0),
        tipo: 'evento',
        ubicacion: 'Sala principal',
        participantes: ['Abierto a todos los clientes'],
        color: '#f59e0b',
        recordatorio: true,
        minutosAntes: 60,
        trainer: coreTrainer._id
      },

      // Eventos la próxima semana
      {
        titulo: 'Entrenamiento personal - Laura Fernández',
        descripcion: 'Sesión de entrenamiento de fuerza y tonificación',
        fechaInicio: createDate(5, 10, 0),
        fechaFin: createDate(5, 11, 0),
        tipo: 'clase',
        ubicacion: 'Gimnasio Principal - Sala 2',
        cliente: clientes[4]?._id,
        color: '#10b981',
        recordatorio: true,
        minutosAntes: 15,
        trainer: coreTrainer._id
      },

      {
        titulo: 'Reunión con proveedor de equipos',
        descripcion: 'Revisión de nuevos equipos de entrenamiento',
        fechaInicio: createDate(5, 14, 0),
        fechaFin: createDate(5, 15, 0),
        tipo: 'reunion',
        ubicacion: 'Oficina',
        color: '#8b5cf6',
        recordatorio: true,
        minutosAntes: 30,
        trainer: coreTrainer._id
      },

      {
        titulo: 'Clase de pilates',
        descripcion: 'Clase de pilates para grupo reducido',
        fechaInicio: createDate(6, 9, 0),
        fechaFin: createDate(6, 10, 0),
        tipo: 'clase',
        ubicacion: 'Sala de yoga',
        participantes: ['Grupo pilates - 6 personas'],
        color: '#10b981',
        recordatorio: true,
        minutosAntes: 15,
        trainer: coreTrainer._id
      },

      {
        titulo: 'Evento: Open Day',
        descripcion: 'Día de puertas abiertas para nuevos clientes potenciales',
        fechaInicio: createDate(7, 10, 0),
        fechaFin: createDate(7, 14, 0),
        tipo: 'evento',
        ubicacion: 'Todas las instalaciones',
        participantes: ['Público general'],
        color: '#f59e0b',
        recordatorio: true,
        minutosAntes: 1440,
        trainer: coreTrainer._id
      },

      // Evento pasado (completado)
      {
        titulo: 'Sesión completada - Entrenamiento matutino',
        descripcion: 'Sesión de entrenamiento matutino',
        fechaInicio: createDate(-1, 7, 0),
        fechaFin: createDate(-1, 8, 0),
        tipo: 'clase',
        ubicacion: 'Gimnasio Principal',
        color: '#10b981',
        completado: true,
        trainer: coreTrainer._id
      }
    ];

    // Insertar eventos
    const createdEventos = await Evento.insertMany(eventos);
    console.log(`✅ ${createdEventos.length} eventos creados exitosamente`);

    // Mostrar resumen
    console.log('\n📋 RESUMEN DE EVENTOS CREADOS:');
    console.log('================================');

    const finalEventos = await Evento.find({ trainer: coreTrainer._id })
      .populate('cliente', 'nombre')
      .sort({ fechaInicio: 1 });

    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    const eventosHoy = finalEventos.filter(e => {
      const fechaEvento = new Date(e.fechaInicio);
      fechaEvento.setHours(0, 0, 0, 0);
      return fechaEvento.getTime() === hoy.getTime();
    });

    const eventosFuturos = finalEventos.filter(e => new Date(e.fechaInicio) > new Date());
    const eventosPasados = finalEventos.filter(e => new Date(e.fechaInicio) < new Date());

    console.log(`\n📅 Eventos hoy: ${eventosHoy.length}`);
    console.log(`🔜 Eventos futuros: ${eventosFuturos.length}`);
    console.log(`✅ Eventos pasados: ${eventosPasados.length}`);

    console.log('\n📝 Eventos de hoy:');
    eventosHoy.forEach(evento => {
      const hora = new Date(evento.fechaInicio).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
      console.log(`   ${hora} - ${evento.titulo} (${evento.tipo})`);
    });

    console.log('\n🔜 Próximos eventos:');
    eventosFuturos.slice(0, 5).forEach(evento => {
      const fecha = new Date(evento.fechaInicio).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit' });
      const hora = new Date(evento.fechaInicio).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
      console.log(`   ${fecha} ${hora} - ${evento.titulo} (${evento.tipo})`);
    });

    console.log('\n✅ Seed de eventos completado exitosamente!');
    process.exit(0);

  } catch (error) {
    console.error('❌ Error al crear eventos:', error);
    process.exit(1);
  }
};

seedEventos();
