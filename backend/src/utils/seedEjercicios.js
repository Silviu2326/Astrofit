import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import Ejercicio from '../models/Ejercicio.model.js';
import Trainer from '../models/Trainer.model.js';
import connectDB from '../config/db.js';

// Get __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load env vars from backend/.env
dotenv.config({ path: join(__dirname, '../../.env') });

// Mock ejercicios data
const mockEjercicios = [
  // PECHO
  {
    nombre: 'Press de Banca con Barra',
    descripcion: 'Ejercicio fundamental para el desarrollo del pecho, también trabaja tríceps y hombros.',
    categoria: 'fuerza',
    grupoMuscular: 'pecho',
    gruposSecundarios: ['hombros', 'brazos'],
    nivel: 'intermedio',
    equipamiento: ['Barra', 'Banco plano', 'Discos'],
    instrucciones: [
      { orden: 1, descripcion: 'Acuéstate en el banco plano con los pies firmemente apoyados en el suelo' },
      { orden: 2, descripcion: 'Agarra la barra con las manos a una anchura ligeramente mayor que los hombros' },
      { orden: 3, descripcion: 'Baja la barra de forma controlada hasta que toque tu pecho' },
      { orden: 4, descripcion: 'Empuja la barra hacia arriba hasta la posición inicial' }
    ],
    consejos: 'Mantén los omóplatos juntos y el pecho hacia arriba durante todo el movimiento. Controla la bajada y sé explosivo en la subida.',
    precauciones: 'No rebotes la barra en el pecho. Usa un spotter si trabajas con peso máximo.',
    musculosPrincipales: ['Pectoral mayor', 'Pectoral menor'],
    musculosSecundarios: ['Deltoides anterior', 'Tríceps'],
    etiquetas: ['pecho', 'fuerza', 'compuesto', 'básico'],
    tipo: 'compuesto',
    estado: 'activo'
  },
  {
    nombre: 'Aperturas con Mancuernas',
    descripcion: 'Ejercicio de aislamiento para el pecho que enfatiza el estiramiento y la contracción muscular.',
    categoria: 'fuerza',
    grupoMuscular: 'pecho',
    gruposSecundarios: ['hombros'],
    nivel: 'intermedio',
    equipamiento: ['Mancuernas', 'Banco plano'],
    instrucciones: [
      { orden: 1, descripcion: 'Acuéstate en el banco con una mancuerna en cada mano, brazos extendidos sobre el pecho' },
      { orden: 2, descripcion: 'Con una ligera flexión en los codos, baja las mancuernas en arco hacia los lados' },
      { orden: 3, descripcion: 'Estira el pecho hasta sentir un estiramiento controlado' },
      { orden: 4, descripcion: 'Contrae el pecho para volver a la posición inicial' }
    ],
    consejos: 'Mantén una ligera flexión en los codos constante. Enfócate en sentir el estiramiento y la contracción.',
    precauciones: 'No uses peso excesivo. El movimiento debe ser controlado para evitar lesiones en los hombros.',
    musculosPrincipales: ['Pectoral mayor'],
    musculosSecundarios: ['Deltoides anterior'],
    etiquetas: ['pecho', 'aislamiento', 'mancuernas'],
    tipo: 'aislamiento',
    estado: 'activo'
  },
  {
    nombre: 'Flexiones',
    descripcion: 'Ejercicio clásico de peso corporal para desarrollar pecho, tríceps y hombros.',
    categoria: 'fuerza',
    grupoMuscular: 'pecho',
    gruposSecundarios: ['brazos', 'hombros', 'core'],
    nivel: 'principiante',
    equipamiento: [],
    instrucciones: [
      { orden: 1, descripcion: 'Colócate en posición de plancha con las manos ligeramente más anchas que los hombros' },
      { orden: 2, descripcion: 'Mantén el cuerpo recto desde la cabeza hasta los talones' },
      { orden: 3, descripcion: 'Baja el cuerpo hasta que el pecho casi toque el suelo' },
      { orden: 4, descripcion: 'Empuja hacia arriba hasta la posición inicial' }
    ],
    consejos: 'Mantén el core activado y el cuerpo recto. No dejes que las caderas se hundan.',
    precauciones: 'Evita arquear la espalda baja. Si es muy difícil, apoya las rodillas.',
    variaciones: [
      { nombre: 'Flexiones con rodillas', descripcion: 'Para principiantes, apoyando las rodillas' },
      { nombre: 'Flexiones diamante', descripcion: 'Con las manos juntas para enfatizar tríceps' },
      { nombre: 'Flexiones declinadas', descripcion: 'Con los pies elevados para mayor dificultad' }
    ],
    musculosPrincipales: ['Pectoral mayor'],
    musculosSecundarios: ['Tríceps', 'Deltoides anterior', 'Core'],
    etiquetas: ['pecho', 'peso corporal', 'sin equipo', 'básico'],
    tipo: 'compuesto',
    estado: 'activo'
  },

  // ESPALDA
  {
    nombre: 'Dominadas',
    descripcion: 'Ejercicio fundamental para desarrollar la espalda, especialmente el dorsal ancho.',
    categoria: 'fuerza',
    grupoMuscular: 'espalda',
    gruposSecundarios: ['brazos', 'hombros'],
    nivel: 'intermedio',
    equipamiento: ['Barra de dominadas'],
    instrucciones: [
      { orden: 1, descripcion: 'Agarra la barra con las palmas hacia adelante, manos ligeramente más anchas que los hombros' },
      { orden: 2, descripcion: 'Cuélgate con los brazos completamente extendidos' },
      { orden: 3, descripcion: 'Tira hacia arriba hasta que tu barbilla supere la barra' },
      { orden: 4, descripcion: 'Baja de forma controlada hasta la posición inicial' }
    ],
    consejos: 'Tira con los codos hacia abajo y atrás. Evita balancearte usando el impulso.',
    precauciones: 'Si eres principiante, usa una banda de asistencia o una máquina de dominadas asistidas.',
    variaciones: [
      { nombre: 'Dominadas supinas', descripcion: 'Con las palmas hacia ti, enfatiza los bíceps' },
      { nombre: 'Dominadas neutras', descripcion: 'Con agarre neutral' },
      { nombre: 'Dominadas lastradas', descripcion: 'Con peso adicional para avanzados' }
    ],
    musculosPrincipales: ['Dorsal ancho', 'Trapecio'],
    musculosSecundarios: ['Bíceps', 'Deltoides posterior', 'Romboides'],
    etiquetas: ['espalda', 'peso corporal', 'tirar', 'básico'],
    tipo: 'compuesto',
    estado: 'activo'
  },
  {
    nombre: 'Remo con Barra',
    descripcion: 'Ejercicio compuesto excelente para desarrollar grosor en la espalda.',
    categoria: 'fuerza',
    grupoMuscular: 'espalda',
    gruposSecundarios: ['brazos', 'hombros'],
    nivel: 'intermedio',
    equipamiento: ['Barra', 'Discos'],
    instrucciones: [
      { orden: 1, descripcion: 'Agarra la barra con un agarre pronado, manos al ancho de los hombros' },
      { orden: 2, descripcion: 'Inclínate hacia adelante con la espalda recta, rodillas ligeramente flexionadas' },
      { orden: 3, descripcion: 'Tira de la barra hacia tu abdomen, llevando los codos hacia atrás' },
      { orden: 4, descripcion: 'Baja la barra de forma controlada' }
    ],
    consejos: 'Mantén la espalda recta y el core activado. Tira con los codos, no con las manos.',
    precauciones: 'No arquees la espalda. Empieza con peso moderado para dominar la técnica.',
    musculosPrincipales: ['Dorsal ancho', 'Trapecio medio', 'Romboides'],
    musculosSecundarios: ['Bíceps', 'Deltoides posterior', 'Erector espinal'],
    etiquetas: ['espalda', 'fuerza', 'tirar', 'básico'],
    tipo: 'compuesto',
    estado: 'activo'
  },
  {
    nombre: 'Peso Muerto',
    descripcion: 'Uno de los ejercicios más completos, trabaja toda la cadena posterior.',
    categoria: 'fuerza',
    grupoMuscular: 'espalda',
    gruposSecundarios: ['piernas', 'gluteos', 'core'],
    nivel: 'avanzado',
    equipamiento: ['Barra', 'Discos'],
    instrucciones: [
      { orden: 1, descripcion: 'Coloca la barra sobre tus pies, cerca de las espinillas' },
      { orden: 2, descripcion: 'Agarra la barra con las manos al ancho de los hombros' },
      { orden: 3, descripcion: 'Mantén la espalda recta, pecho arriba, y levanta empujando con las piernas' },
      { orden: 4, descripcion: 'Extiende completamente caderas y rodillas al final del movimiento' },
      { orden: 5, descripcion: 'Baja la barra de forma controlada siguiendo el mismo patrón' }
    ],
    consejos: 'Mantén la barra cerca del cuerpo. La espalda debe estar recta en todo momento.',
    precauciones: 'Ejercicio técnicamente exigente. Aprende la técnica con poco peso. No redondees la espalda.',
    musculosPrincipales: ['Erector espinal', 'Glúteos', 'Isquiotibiales'],
    musculosSecundarios: ['Trapecio', 'Cuádriceps', 'Core', 'Antebrazos'],
    etiquetas: ['espalda', 'piernas', 'fuerza', 'compuesto', 'básico'],
    tipo: 'compuesto',
    estado: 'activo'
  },

  // PIERNAS
  {
    nombre: 'Sentadilla con Barra',
    descripcion: 'El rey de los ejercicios para piernas, trabaja todo el tren inferior.',
    categoria: 'fuerza',
    grupoMuscular: 'piernas',
    gruposSecundarios: ['gluteos', 'core'],
    nivel: 'intermedio',
    equipamiento: ['Barra', 'Rack', 'Discos'],
    instrucciones: [
      { orden: 1, descripcion: 'Coloca la barra sobre tus trapecios, no sobre el cuello' },
      { orden: 2, descripcion: 'Pies al ancho de los hombros, dedos ligeramente hacia afuera' },
      { orden: 3, descripcion: 'Baja controladamente flexionando rodillas y caderas' },
      { orden: 4, descripcion: 'Desciende hasta que los muslos estén paralelos al suelo o más' },
      { orden: 5, descripcion: 'Empuja con los talones para volver a la posición inicial' }
    ],
    consejos: 'Mantén el pecho arriba y la espalda recta. Empuja con los talones, no con las puntas.',
    precauciones: 'No dejes que las rodillas sobrepasen las puntas de los pies. Usa spotter con cargas pesadas.',
    musculosPrincipales: ['Cuádriceps', 'Glúteos', 'Isquiotibiales'],
    musculosSecundarios: ['Core', 'Erector espinal'],
    etiquetas: ['piernas', 'fuerza', 'compuesto', 'básico'],
    tipo: 'compuesto',
    estado: 'activo'
  },
  {
    nombre: 'Zancadas con Mancuernas',
    descripcion: 'Ejercicio unilateral excelente para piernas y glúteos.',
    categoria: 'fuerza',
    grupoMuscular: 'piernas',
    gruposSecundarios: ['gluteos', 'core'],
    nivel: 'intermedio',
    equipamiento: ['Mancuernas'],
    instrucciones: [
      { orden: 1, descripcion: 'De pie con una mancuerna en cada mano a los lados' },
      { orden: 2, descripcion: 'Da un paso largo hacia adelante con una pierna' },
      { orden: 3, descripcion: 'Baja la rodilla trasera hacia el suelo' },
      { orden: 4, descripcion: 'Ambas rodillas deben formar ángulos de 90 grados' },
      { orden: 5, descripcion: 'Empuja con el talón delantero para volver a la posición inicial' }
    ],
    consejos: 'Mantén el torso erguido. El paso debe ser lo suficientemente largo.',
    precauciones: 'No dejes que la rodilla delantera sobrepase la punta del pie.',
    musculosPrincipales: ['Cuádriceps', 'Glúteos'],
    musculosSecundarios: ['Isquiotibiales', 'Core'],
    etiquetas: ['piernas', 'unilateral', 'equilibrio', 'mancuernas'],
    tipo: 'compuesto',
    estado: 'activo'
  },
  {
    nombre: 'Extensión de Cuádriceps',
    descripcion: 'Ejercicio de aislamiento para los cuádriceps.',
    categoria: 'fuerza',
    grupoMuscular: 'piernas',
    nivel: 'principiante',
    equipamiento: ['Máquina de extensión de piernas'],
    instrucciones: [
      { orden: 1, descripcion: 'Siéntate en la máquina con la espalda bien apoyada' },
      { orden: 2, descripcion: 'Coloca los tobillos bajo el rodillo acolchado' },
      { orden: 3, descripcion: 'Extiende las piernas hasta que estén rectas' },
      { orden: 4, descripcion: 'Baja de forma controlada a la posición inicial' }
    ],
    consejos: 'Controla el movimiento en todo momento. Evita usar impulso.',
    precauciones: 'No uses peso excesivo que pueda estresar las rodillas.',
    musculosPrincipales: ['Cuádriceps'],
    musculosSecundarios: [],
    etiquetas: ['piernas', 'aislamiento', 'máquina', 'cuádriceps'],
    tipo: 'aislamiento',
    estado: 'activo'
  },

  // HOMBROS
  {
    nombre: 'Press Militar con Barra',
    descripcion: 'Ejercicio fundamental para desarrollar los hombros.',
    categoria: 'fuerza',
    grupoMuscular: 'hombros',
    gruposSecundarios: ['brazos', 'core'],
    nivel: 'intermedio',
    equipamiento: ['Barra', 'Discos'],
    instrucciones: [
      { orden: 1, descripcion: 'De pie, sujeta la barra a la altura de los hombros' },
      { orden: 2, descripcion: 'Manos ligeramente más anchas que los hombros' },
      { orden: 3, descripcion: 'Empuja la barra hacia arriba hasta extensión completa' },
      { orden: 4, descripcion: 'Baja de forma controlada hasta la posición inicial' }
    ],
    consejos: 'Mantén el core activado. No arquees la espalda baja.',
    precauciones: 'Evita bloquear completamente los codos en la parte superior.',
    musculosPrincipales: ['Deltoides anterior', 'Deltoides medio'],
    musculosSecundarios: ['Tríceps', 'Deltoides posterior', 'Core'],
    etiquetas: ['hombros', 'fuerza', 'empujar', 'básico'],
    tipo: 'compuesto',
    estado: 'activo'
  },
  {
    nombre: 'Elevaciones Laterales',
    descripcion: 'Ejercicio de aislamiento para el deltoides medio.',
    categoria: 'fuerza',
    grupoMuscular: 'hombros',
    nivel: 'principiante',
    equipamiento: ['Mancuernas'],
    instrucciones: [
      { orden: 1, descripcion: 'De pie con una mancuerna en cada mano a los lados' },
      { orden: 2, descripcion: 'Levanta los brazos hacia los lados con una ligera flexión en los codos' },
      { orden: 3, descripcion: 'Sube hasta que los brazos estén paralelos al suelo' },
      { orden: 4, descripcion: 'Baja de forma controlada' }
    ],
    consejos: 'Evita usar impulso. El movimiento debe ser controlado y enfocado en el deltoides.',
    precauciones: 'No subas los hombros hacia las orejas. Usa peso moderado.',
    musculosPrincipales: ['Deltoides medio'],
    musculosSecundarios: ['Deltoides anterior', 'Trapecio'],
    etiquetas: ['hombros', 'aislamiento', 'mancuernas', 'deltoides'],
    tipo: 'aislamiento',
    estado: 'activo'
  },

  // BRAZOS
  {
    nombre: 'Curl de Bíceps con Barra',
    descripcion: 'Ejercicio clásico para desarrollar los bíceps.',
    categoria: 'fuerza',
    grupoMuscular: 'brazos',
    nivel: 'principiante',
    equipamiento: ['Barra', 'Discos'],
    instrucciones: [
      { orden: 1, descripcion: 'De pie, agarra la barra con las palmas hacia arriba' },
      { orden: 2, descripcion: 'Manos al ancho de los hombros, codos pegados al cuerpo' },
      { orden: 3, descripcion: 'Flexiona los codos llevando la barra hacia los hombros' },
      { orden: 4, descripcion: 'Baja de forma controlada a la posición inicial' }
    ],
    consejos: 'Mantén los codos fijos. No uses impulso con la espalda.',
    precauciones: 'Evita balancear el cuerpo para levantar el peso.',
    musculosPrincipales: ['Bíceps braquial'],
    musculosSecundarios: ['Braquial anterior', 'Antebrazos'],
    etiquetas: ['brazos', 'bíceps', 'aislamiento'],
    tipo: 'aislamiento',
    estado: 'activo'
  },
  {
    nombre: 'Fondos en Paralelas',
    descripcion: 'Ejercicio compuesto excelente para tríceps y pecho inferior.',
    categoria: 'fuerza',
    grupoMuscular: 'brazos',
    gruposSecundarios: ['pecho', 'hombros'],
    nivel: 'intermedio',
    equipamiento: ['Barras paralelas'],
    instrucciones: [
      { orden: 1, descripcion: 'Sujétate en las paralelas con los brazos extendidos' },
      { orden: 2, descripcion: 'Inclínate ligeramente hacia adelante' },
      { orden: 3, descripcion: 'Baja el cuerpo flexionando los codos hasta 90 grados' },
      { orden: 4, descripcion: 'Empuja hacia arriba hasta la posición inicial' }
    ],
    consejos: 'Más vertical = más tríceps. Más inclinado = más pecho.',
    precauciones: 'No bajes demasiado si tienes problemas en los hombros.',
    musculosPrincipales: ['Tríceps'],
    musculosSecundarios: ['Pectoral inferior', 'Deltoides anterior'],
    etiquetas: ['brazos', 'tríceps', 'peso corporal', 'compuesto'],
    tipo: 'compuesto',
    estado: 'activo'
  },
  {
    nombre: 'Press Francés',
    descripcion: 'Ejercicio de aislamiento efectivo para los tríceps.',
    categoria: 'fuerza',
    grupoMuscular: 'brazos',
    nivel: 'intermedio',
    equipamiento: ['Barra Z', 'Banco plano'],
    instrucciones: [
      { orden: 1, descripcion: 'Acuéstate en el banco con la barra extendida sobre tu cabeza' },
      { orden: 2, descripcion: 'Baja la barra flexionando solo los codos hacia la frente' },
      { orden: 3, descripcion: 'Mantén los codos fijos apuntando al techo' },
      { orden: 4, descripcion: 'Extiende los brazos a la posición inicial' }
    ],
    consejos: 'Mantén los codos quietos. Solo se mueven los antebrazos.',
    precauciones: 'Usa peso controlable. Puede estresar los codos si usas mucho peso.',
    musculosPrincipales: ['Tríceps'],
    musculosSecundarios: [],
    etiquetas: ['brazos', 'tríceps', 'aislamiento'],
    tipo: 'aislamiento',
    estado: 'activo'
  },

  // CORE
  {
    nombre: 'Plancha Frontal',
    descripcion: 'Ejercicio isométrico fundamental para fortalecer el core.',
    categoria: 'fuerza',
    grupoMuscular: 'core',
    nivel: 'principiante',
    equipamiento: [],
    instrucciones: [
      { orden: 1, descripcion: 'Apóyate sobre los antebrazos y las puntas de los pies' },
      { orden: 2, descripcion: 'Mantén el cuerpo recto desde la cabeza hasta los talones' },
      { orden: 3, descripcion: 'Activa el core y mantén la posición' },
      { orden: 4, descripcion: 'Respira normalmente durante el ejercicio' }
    ],
    consejos: 'No dejes caer las caderas. Mantén el cuerpo en línea recta.',
    precauciones: 'Si sientes dolor en la espalda baja, revisa tu postura.',
    musculosPrincipales: ['Recto abdominal', 'Transverso abdominal'],
    musculosSecundarios: ['Oblicuos', 'Hombros', 'Glúteos'],
    etiquetas: ['core', 'isométrico', 'peso corporal', 'sin equipo'],
    tipo: 'estatico',
    estado: 'activo'
  },
  {
    nombre: 'Abdominales Crunch',
    descripcion: 'Ejercicio clásico para trabajar el recto abdominal.',
    categoria: 'fuerza',
    grupoMuscular: 'core',
    nivel: 'principiante',
    equipamiento: [],
    instrucciones: [
      { orden: 1, descripcion: 'Acuéstate boca arriba con las rodillas flexionadas' },
      { orden: 2, descripcion: 'Manos detrás de la cabeza o cruzadas sobre el pecho' },
      { orden: 3, descripcion: 'Contrae el abdomen levantando los hombros del suelo' },
      { orden: 4, descripcion: 'Baja de forma controlada' }
    ],
    consejos: 'No jales el cuello con las manos. El movimiento viene del abdomen.',
    precauciones: 'Evita usar impulso. El movimiento debe ser controlado.',
    musculosPrincipales: ['Recto abdominal'],
    musculosSecundarios: ['Oblicuos'],
    etiquetas: ['core', 'abdominales', 'peso corporal', 'sin equipo'],
    tipo: 'aislamiento',
    estado: 'activo'
  },

  // CARDIO
  {
    nombre: 'Burpees',
    descripcion: 'Ejercicio de cuerpo completo que combina fuerza y cardio.',
    categoria: 'cardio',
    grupoMuscular: 'todo-cuerpo',
    gruposSecundarios: ['piernas', 'pecho', 'core'],
    nivel: 'intermedio',
    equipamiento: [],
    instrucciones: [
      { orden: 1, descripcion: 'Desde posición de pie, baja a posición de cuclillas' },
      { orden: 2, descripcion: 'Coloca las manos en el suelo y lleva los pies atrás a posición de plancha' },
      { orden: 3, descripcion: 'Haz una flexión' },
      { orden: 4, descripcion: 'Lleva los pies de vuelta hacia las manos' },
      { orden: 5, descripcion: 'Salta explosivamente hacia arriba con los brazos extendidos' }
    ],
    consejos: 'Mantén un ritmo constante. Es normal que sean difíciles.',
    precauciones: 'Modifica eliminando el salto si tienes problemas articulares.',
    musculosPrincipales: ['Todo el cuerpo'],
    musculosSecundarios: [],
    etiquetas: ['cardio', 'todo-cuerpo', 'HIIT', 'sin equipo', 'funcional'],
    tipo: 'compuesto',
    estado: 'activo'
  },
  {
    nombre: 'Mountain Climbers',
    descripcion: 'Ejercicio dinámico que trabaja core y mejora la resistencia cardiovascular.',
    categoria: 'cardio',
    grupoMuscular: 'core',
    gruposSecundarios: ['piernas', 'hombros'],
    nivel: 'intermedio',
    equipamiento: [],
    instrucciones: [
      { orden: 1, descripcion: 'Comienza en posición de plancha alta' },
      { orden: 2, descripcion: 'Lleva una rodilla hacia el pecho' },
      { orden: 3, descripcion: 'Alterna rápidamente las piernas como si estuvieras corriendo' },
      { orden: 4, descripcion: 'Mantén las caderas bajas y el core activado' }
    ],
    consejos: 'Mantén un ritmo rápido pero controlado. Las caderas deben permanecer bajas.',
    precauciones: 'Si eres principiante, hazlo más lento para dominar la técnica.',
    musculosPrincipales: ['Core', 'Flexores de cadera'],
    musculosSecundarios: ['Hombros', 'Cuádriceps'],
    etiquetas: ['cardio', 'core', 'HIIT', 'sin equipo', 'funcional'],
    tipo: 'compuesto',
    estado: 'activo'
  }
];

const seedEjercicios = async () => {
  try {
    // Connect to database
    await connectDB();

    console.log('🔍 Buscando trainers existentes...');
    const trainers = await Trainer.find({});

    if (trainers.length === 0) {
      console.log('⚠️  No hay trainers en la base de datos.');
      console.log('💡 Ejecuta primero: npm run seed:trainers');
      process.exit(1);
    }

    console.log(`✅ ${trainers.length} trainers encontrados\n`);

    console.log('🗑️  Eliminando ejercicios existentes...');
    await Ejercicio.deleteMany({});

    console.log('📝 Creando ejercicios para cada trainer...\n');

    let totalCreated = 0;

    for (const trainer of trainers) {
      console.log(`\n📋 Creando ejercicios para: ${trainer.name} (${trainer.plan})`);

      // Add trainerId to each ejercicio
      const ejerciciosWithTrainer = mockEjercicios.map(ejercicio => ({
        ...ejercicio,
        trainerId: trainer._id
      }));

      const ejercicios = await Ejercicio.create(ejerciciosWithTrainer);
      totalCreated += ejercicios.length;

      console.log(`   ✅ ${ejercicios.length} ejercicios creados`);

      // Show some examples
      const byCategory = ejercicios.reduce((acc, ej) => {
        acc[ej.categoria] = (acc[ej.categoria] || 0) + 1;
        return acc;
      }, {});

      console.log(`   📊 Por categoría:`, byCategory);
    }

    console.log('\n═══════════════════════════════════════════════════════');
    console.log(`🎉 Seed completado exitosamente!`);
    console.log(`📊 Total de ejercicios creados: ${totalCreated}`);
    console.log(`👥 Para ${trainers.length} trainers`);
    console.log(`💪 ${mockEjercicios.length} ejercicios únicos por trainer`);
    console.log('═══════════════════════════════════════════════════════\n');

    // Show breakdown by muscle group
    const byMuscle = mockEjercicios.reduce((acc, ej) => {
      acc[ej.grupoMuscular] = (acc[ej.grupoMuscular] || 0) + 1;
      return acc;
    }, {});

    console.log('📊 Distribución por grupo muscular:');
    Object.entries(byMuscle).forEach(([muscle, count]) => {
      console.log(`   ${muscle}: ${count} ejercicios`);
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Error al crear ejercicios:', error.message);
    console.error(error);
    process.exit(1);
  }
};

// Run seeder
seedEjercicios();
