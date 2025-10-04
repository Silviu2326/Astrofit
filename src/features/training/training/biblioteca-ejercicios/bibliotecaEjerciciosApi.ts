import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export interface Ejercicio {
  _id?: string;
  id: string;
  name: string;
  description: string;
  videoUrl: string;
  imageUrl?: string;
  category: 'piernas' | 'torso' | 'core' | 'brazos' | 'espalda' | 'cardio' | 'flexibilidad' | 'funcional';
  material: 'mancuernas' | 'gomas' | 'barra' | 'peso corporal' | 'maquina' | 'kettlebell' | 'trx' | 'bosu' | 'fitball';
  difficulty: 'principiante' | 'intermedio' | 'avanzado';
  isFavorite: boolean;
  popularity: number; // 1-100
  usageFrequency: number; // number of times used
  muscleGroups: string[];
  instructions: string[];
  tips: string[];
  variations: string[];
  rating: number; // 1-5 stars
  isNew?: boolean;
  isTrending?: boolean;
}

// Backend API types
interface BackendEjercicio {
  _id: string;
  nombre: string;
  descripcion: string;
  categoria: string;
  grupoMuscular: string;
  gruposSecundarios: string[];
  nivel: string;
  equipamiento: string[];
  instrucciones: { orden: number; descripcion: string }[];
  video: string;
  imagenes: string[];
  consejos: string;
  precauciones: string;
  variaciones: { nombre: string; descripcion: string }[];
  musculosPrincipales: string[];
  musculosSecundarios: string[];
  etiquetas: string[];
  estado: string;
  tipo: string;
  vecesUtilizado: number;
  ultimoUso: Date | null;
  createdAt: string;
  updatedAt: string;
}

// Map backend exercise to frontend format
const mapBackendToFrontend = (backend: BackendEjercicio): Ejercicio => {
  // Map categories
  const categoryMap: Record<string, Ejercicio['category']> = {
    'fuerza': 'torso',
    'cardio': 'cardio',
    'flexibilidad': 'flexibilidad',
    'equilibrio': 'funcional',
    'funcional': 'funcional',
    'deportivo': 'funcional'
  };

  // Map muscle groups to categories
  const muscleGroupMap: Record<string, Ejercicio['category']> = {
    'pecho': 'torso',
    'espalda': 'espalda',
    'hombros': 'torso',
    'brazos': 'brazos',
    'piernas': 'piernas',
    'core': 'core',
    'gluteos': 'piernas',
    'pantorrillas': 'piernas',
    'todo-cuerpo': 'funcional'
  };

  const category = muscleGroupMap[backend.grupoMuscular] || categoryMap[backend.categoria] || 'funcional';

  // Map equipment
  const materialMap: Record<string, Ejercicio['material']> = {
    'Barra': 'barra',
    'Mancuernas': 'mancuernas',
    'Kettlebell': 'kettlebell',
    'TRX': 'trx',
    'Bandas': 'gomas',
    'Máquina': 'maquina',
    'Sin equipo': 'peso corporal'
  };

  const material = backend.equipamiento.length > 0
    ? (materialMap[backend.equipamiento[0]] || 'peso corporal')
    : 'peso corporal';

  // Map difficulty
  const difficultyMap: Record<string, Ejercicio['difficulty']> = {
    'principiante': 'principiante',
    'intermedio': 'intermedio',
    'avanzado': 'avanzado'
  };

  return {
    _id: backend._id,
    id: backend._id,
    name: backend.nombre,
    description: backend.descripcion || '',
    videoUrl: backend.video || '',
    imageUrl: backend.imagenes?.[0] || undefined,
    category,
    material,
    difficulty: difficultyMap[backend.nivel] || 'intermedio',
    isFavorite: false, // Can be enhanced with user preferences
    popularity: Math.min(100, backend.vecesUtilizado || 0),
    usageFrequency: backend.vecesUtilizado || 0,
    muscleGroups: [
      ...backend.musculosPrincipales,
      ...backend.musculosSecundarios
    ],
    instructions: backend.instrucciones
      ?.sort((a, b) => a.orden - b.orden)
      .map(i => i.descripcion) || [],
    tips: backend.consejos ? [backend.consejos] : [],
    variations: backend.variaciones?.map(v => v.nombre || v.descripcion) || [],
    rating: 4.5, // Default rating, can be enhanced with reviews
    isNew: backend.createdAt
      ? new Date(backend.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      : false,
    isTrending: backend.vecesUtilizado > 50
  };
};

const mockEjercicios: Ejercicio[] = [
  // PECHO - 12 ejercicios
  {
    id: '1',
    name: 'Press Banca Plano',
    description: 'Ejercicio fundamental para desarrollar el pecho, hombros y tríceps en banco plano.',
    videoUrl: 'https://www.youtube.com/embed/rT7DgCr-3pg',
    imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800',
    category: 'torso',
    material: 'barra',
    difficulty: 'intermedio',
    isFavorite: true,
    popularity: 95,
    usageFrequency: 245,
    muscleGroups: ['pectoral mayor', 'deltoides anterior', 'tríceps'],
    instructions: ['Acuéstate en banco plano', 'Agarra barra a anchura de hombros', 'Baja controlado al pecho', 'Empuja explosivamente'],
    tips: ['Mantén escápulas retraídas', 'Pies firmes en el suelo', 'No rebotes la barra'],
    variations: ['Press inclinado', 'Press declinado', 'Press cerrado'],
    rating: 4.8,
    isTrending: true
  },
  {
    id: '2',
    name: 'Flexiones de Pecho',
    description: 'Ejercicio de peso corporal clásico para pecho, hombros y tríceps.',
    videoUrl: 'https://www.youtube.com/embed/IODxDxX7oi4',
    imageUrl: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=800',
    category: 'torso',
    material: 'peso corporal',
    difficulty: 'principiante',
    isFavorite: true,
    popularity: 92,
    usageFrequency: 350,
    muscleGroups: ['pectoral', 'deltoides', 'tríceps'],
    instructions: ['Posición de plancha', 'Baja hasta casi tocar suelo', 'Empuja hacia arriba', 'Mantén core activado'],
    tips: ['Codos a 45° del cuerpo', 'Cuerpo en línea recta', 'Respiración controlada'],
    variations: ['Flexiones diamante', 'Flexiones declinadas', 'Flexiones archer'],
    rating: 4.9,
    isTrending: true
  },
  {
    id: '3',
    name: 'Press Inclinado con Mancuernas',
    description: 'Ejercicio para enfatizar el pecho superior usando banco inclinado.',
    videoUrl: 'https://www.youtube.com/embed/8iPEnn-ltC8',
    category: 'torso',
    material: 'mancuernas',
    difficulty: 'intermedio',
    isFavorite: false,
    popularity: 88,
    usageFrequency: 180,
    muscleGroups: ['pectoral superior', 'deltoides', 'tríceps'],
    instructions: ['Banco a 30-45°', 'Mancuernas a altura pecho', 'Empuja hacia arriba', 'Baja controlado'],
    tips: ['No arquees la espalda', 'Mantén muñecas neutras', 'Rango completo de movimiento'],
    variations: ['Press con barra', 'Press con agarre neutro', 'Press alternado'],
    rating: 4.6
  },
  {
    id: '4',
    name: 'Fondos en Paralelas',
    description: 'Ejercicio compuesto excelente para pecho inferior y tríceps.',
    videoUrl: 'https://www.youtube.com/embed/2z8JmcrW-As',
    category: 'torso',
    material: 'maquina',
    difficulty: 'intermedio',
    isFavorite: false,
    popularity: 85,
    usageFrequency: 140,
    muscleGroups: ['pectoral inferior', 'tríceps', 'deltoides'],
    instructions: ['Agarra paralelas', 'Inclínate adelante', 'Baja hasta 90°', 'Empuja hacia arriba'],
    tips: ['Inclínate más para enfatizar pecho', 'Controla el descenso', 'No balancees'],
    variations: ['Fondos asistidos', 'Fondos lastrados', 'Fondos en anillas'],
    rating: 4.7
  },
  {
    id: '5',
    name: 'Aperturas con Mancuernas',
    description: 'Ejercicio de aislamiento para el pecho con énfasis en el estiramiento.',
    videoUrl: 'https://www.youtube.com/embed/eozdVDA78K0',
    category: 'torso',
    material: 'mancuernas',
    difficulty: 'intermedio',
    isFavorite: false,
    popularity: 82,
    usageFrequency: 125,
    muscleGroups: ['pectoral mayor', 'deltoides anterior'],
    instructions: ['Acostado en banco', 'Brazos extendidos arriba', 'Abre en arco amplio', 'Vuelve al centro'],
    tips: ['Ligera flexión en codos', 'Movimiento controlado', 'Siente el estiramiento'],
    variations: ['Aperturas inclinadas', 'Aperturas en cable', 'Aperturas con fitball'],
    rating: 4.5
  },
  {
    id: '6',
    name: 'Crossover en Poleas',
    description: 'Ejercicio con cables para trabajar pecho con tensión constante.',
    videoUrl: 'https://www.youtube.com/embed/taI4XduLpTk',
    category: 'torso',
    material: 'maquina',
    difficulty: 'intermedio',
    isFavorite: true,
    popularity: 80,
    usageFrequency: 110,
    muscleGroups: ['pectoral', 'deltoides anterior'],
    instructions: ['Poleas altas', 'Paso adelante', 'Cruza brazos al frente', 'Controla vuelta'],
    tips: ['Mantén postura estable', 'No uses momentum', 'Aprieta en contracción'],
    variations: ['Poleas bajas', 'Poleas medias', 'Unilateral'],
    rating: 4.4
  },

  // ESPALDA - 12 ejercicios
  {
    id: '7',
    name: 'Dominadas',
    description: 'Ejercicio rey para desarrollar toda la musculatura de la espalda.',
    videoUrl: 'https://www.youtube.com/embed/eGo4IYlbE5g',
    imageUrl: 'https://images.unsplash.com/photo-1534368420009-621bfb5b2f8c?w=800',
    category: 'espalda',
    material: 'peso corporal',
    difficulty: 'avanzado',
    isFavorite: true,
    popularity: 94,
    usageFrequency: 220,
    muscleGroups: ['dorsales', 'bíceps', 'trapecios', 'romboides'],
    instructions: ['Agarre pronado', 'Cuelga con brazos extendidos', 'Tira hasta barbilla sobre barra', 'Baja controlado'],
    tips: ['Escápulas hacia abajo y atrás', 'No balancees', 'Pecho hacia barra'],
    variations: ['Dominadas supinas', 'Dominadas neutras', 'Dominadas lastradas'],
    rating: 4.9,
    isTrending: true
  },
  {
    id: '8',
    name: 'Remo con Barra',
    description: 'Ejercicio compuesto fundamental para grosor de espalda.',
    videoUrl: 'https://www.youtube.com/embed/FWJR5Ve8bnQ',
    category: 'espalda',
    material: 'barra',
    difficulty: 'intermedio',
    isFavorite: true,
    popularity: 90,
    usageFrequency: 200,
    muscleGroups: ['dorsales', 'trapecios', 'romboides', 'bíceps'],
    instructions: ['Posición bisagra de cadera', 'Agarre pronado', 'Tira barra al abdomen', 'Baja controlado'],
    tips: ['Espalda recta siempre', 'Codos pegados', 'Aprieta escápulas arriba'],
    variations: ['Remo supino', 'Remo Pendlay', 'Remo T-bar'],
    rating: 4.7
  },
  {
    id: '9',
    name: 'Peso Muerto',
    description: 'Ejercicio multiarticular para espalda baja, glúteos y piernas.',
    videoUrl: 'https://www.youtube.com/embed/op9kVnSso6Q',
    category: 'espalda',
    material: 'barra',
    difficulty: 'avanzado',
    isFavorite: true,
    popularity: 93,
    usageFrequency: 185,
    muscleGroups: ['erectores espinales', 'glúteos', 'isquiotibiales', 'trapecios'],
    instructions: ['Pies bajo barra', 'Agarre fuerte', 'Levanta con piernas', 'Extiende caderas arriba'],
    tips: ['Espalda neutral siempre', 'Core activado', 'Barra cerca del cuerpo'],
    variations: ['Peso muerto sumo', 'Peso muerto rumano', 'Peso muerto con déficit'],
    rating: 4.8,
    isTrending: true
  },
  {
    id: '10',
    name: 'Remo con Mancuerna a Una Mano',
    description: 'Ejercicio unilateral para trabajar cada lado de la espalda independientemente.',
    videoUrl: 'https://www.youtube.com/embed/roCP6wCXPqo',
    category: 'espalda',
    material: 'mancuernas',
    difficulty: 'intermedio',
    isFavorite: false,
    popularity: 87,
    usageFrequency: 165,
    muscleGroups: ['dorsales', 'trapecios', 'romboides'],
    instructions: ['Rodilla y mano en banco', 'Mancuerna colgando', 'Tira hacia cadera', 'Baja controlado'],
    tips: ['No rotar torso', 'Codo cerca del cuerpo', 'Rango completo'],
    variations: ['Remo Kroc', 'Remo en banco inclinado', 'Remo meadows'],
    rating: 4.6
  },
  {
    id: '11',
    name: 'Jalones al Pecho',
    description: 'Ejercicio en polea para desarrollar amplitud de espalda.',
    videoUrl: 'https://www.youtube.com/embed/CAwf7n6Luuc',
    category: 'espalda',
    material: 'maquina',
    difficulty: 'principiante',
    isFavorite: false,
    popularity: 85,
    usageFrequency: 240,
    muscleGroups: ['dorsales', 'bíceps', 'trapecios'],
    instructions: ['Agarre ancho', 'Siéntate firme', 'Tira barra al pecho', 'Extiende arriba'],
    tips: ['Pecho hacia arriba', 'Codos hacia abajo y atrás', 'No te inclines atrás'],
    variations: ['Jalón agarre cerrado', 'Jalón neutro', 'Jalón unilateral'],
    rating: 4.5
  },
  {
    id: '12',
    name: 'Face Pulls',
    description: 'Ejercicio para deltoides posteriores y salud del hombro.',
    videoUrl: 'https://www.youtube.com/embed/rep-qVOkqgk',
    category: 'espalda',
    material: 'maquina',
    difficulty: 'principiante',
    isFavorite: false,
    popularity: 78,
    usageFrequency: 150,
    muscleGroups: ['deltoides posterior', 'trapecios medios', 'romboides'],
    instructions: ['Polea alta con cuerda', 'Tira hacia cara', 'Separa manos al final', 'Aprieta escápulas'],
    tips: ['Codos altos', 'Movimiento controlado', 'Siente deltoides posterior'],
    variations: ['Face pulls bajos', 'Con banda', 'Unilateral'],
    rating: 4.4
  },

  // PIERNAS - 12 ejercicios
  {
    id: '13',
    name: 'Sentadilla Trasera',
    description: 'Rey de los ejercicios de piernas, desarrollo completo de tren inferior.',
    videoUrl: 'https://www.youtube.com/embed/ultWZbUMPL8',
    imageUrl: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=800',
    category: 'piernas',
    material: 'barra',
    difficulty: 'intermedio',
    isFavorite: true,
    popularity: 96,
    usageFrequency: 280,
    muscleGroups: ['cuádriceps', 'glúteos', 'isquiotibiales', 'core'],
    instructions: ['Barra en trapecios', 'Pies anchura hombros', 'Baja hasta paralelo', 'Empuja con talones'],
    tips: ['Rodillas en línea con pies', 'Espalda recta', 'Core activado siempre'],
    variations: ['Sentadilla frontal', 'Sentadilla búlgara', 'Sentadilla goblet'],
    rating: 4.9,
    isTrending: true
  },
  {
    id: '14',
    name: 'Zancadas con Mancuernas',
    description: 'Ejercicio unilateral excelente para piernas y equilibrio.',
    videoUrl: 'https://www.youtube.com/embed/D7KaRcUTQeE',
    category: 'piernas',
    material: 'mancuernas',
    difficulty: 'intermedio',
    isFavorite: false,
    popularity: 84,
    usageFrequency: 175,
    muscleGroups: ['cuádriceps', 'glúteos', 'isquiotibiales'],
    instructions: ['Mancuernas a lados', 'Paso largo adelante', 'Baja hasta rodilla toca', 'Vuelve posición inicial'],
    tips: ['Rodilla no pasa del pie', 'Torso erguido', 'Paso lo suficientemente largo'],
    variations: ['Zancadas caminando', 'Zancadas inversas', 'Zancadas laterales'],
    rating: 4.5
  },
  {
    id: '15',
    name: 'Prensa de Piernas',
    description: 'Ejercicio en máquina para cuádriceps con menos demanda técnica.',
    videoUrl: 'https://www.youtube.com/embed/IZxyjW7MPJQ',
    category: 'piernas',
    material: 'maquina',
    difficulty: 'principiante',
    isFavorite: false,
    popularity: 82,
    usageFrequency: 190,
    muscleGroups: ['cuádriceps', 'glúteos', 'isquiotibiales'],
    instructions: ['Pies en plataforma', 'Espalda contra respaldo', 'Baja controlado', 'Empuja con toda planta'],
    tips: ['No despegues espalda baja', 'Rodillas en línea', 'Rango completo seguro'],
    variations: ['Pies altos', 'Pies bajos', 'Pies juntos'],
    rating: 4.4
  },
  {
    id: '16',
    name: 'Peso Muerto Rumano',
    description: 'Variante enfocada en isquiotibiales y glúteos.',
    videoUrl: 'https://www.youtube.com/embed/2SHsk9AzdjA',
    category: 'piernas',
    material: 'barra',
    difficulty: 'intermedio',
    isFavorite: true,
    popularity: 88,
    usageFrequency: 160,
    muscleGroups: ['isquiotibiales', 'glúteos', 'erectores'],
    instructions: ['Barra a muslos', 'Bisagra de cadera', 'Baja barra a tibias', 'Extiende caderas'],
    tips: ['Piernas casi rectas', 'Barra cerca cuerpo', 'Siente estiramiento isquios'],
    variations: ['RDL con mancuernas', 'RDL unilateral', 'RDL con déficit'],
    rating: 4.7
  },
  {
    id: '17',
    name: 'Extensiones de Cuádriceps',
    description: 'Ejercicio de aislamiento para cuádriceps en máquina.',
    videoUrl: 'https://www.youtube.com/embed/YyvSfVjQeL0',
    category: 'piernas',
    material: 'maquina',
    difficulty: 'principiante',
    isFavorite: false,
    popularity: 75,
    usageFrequency: 145,
    muscleGroups: ['cuádriceps'],
    instructions: ['Siéntate en máquina', 'Pies bajo rodillo', 'Extiende piernas', 'Baja controlado'],
    tips: ['No hiperextiendas rodillas', 'Movimiento controlado', 'Aprieta arriba'],
    variations: ['Unilateral', 'Con pausa arriba', 'Tempo lento'],
    rating: 4.2
  },
  {
    id: '18',
    name: 'Curl Femoral',
    description: 'Ejercicio de aislamiento para isquiotibiales.',
    videoUrl: 'https://www.youtube.com/embed/ELOCsoDSmrg',
    category: 'piernas',
    material: 'maquina',
    difficulty: 'principiante',
    isFavorite: false,
    popularity: 74,
    usageFrequency: 140,
    muscleGroups: ['isquiotibiales'],
    instructions: ['Acostado en máquina', 'Talones bajo rodillo', 'Flexiona piernas', 'Extiende controlado'],
    tips: ['Caderas en banco', 'Rango completo', 'No arquees espalda'],
    variations: ['Curl sentado', 'Curl de pie', 'Curl nórdico'],
    rating: 4.3
  },

  // HOMBROS - 10 ejercicios
  {
    id: '19',
    name: 'Press Militar',
    description: 'Ejercicio fundamental para desarrollo de hombros con barra.',
    videoUrl: 'https://www.youtube.com/embed/2yjwXTZQDDI',
    category: 'torso',
    material: 'barra',
    difficulty: 'intermedio',
    isFavorite: true,
    popularity: 89,
    usageFrequency: 195,
    muscleGroups: ['deltoides', 'tríceps', 'trapecio superior'],
    instructions: ['Barra a hombros', 'Pies anchura cadera', 'Empuja arriba', 'Baja a hombros'],
    tips: ['Core activado', 'No arquees espalda', 'Codos ligeramente adelante'],
    variations: ['Press sentado', 'Press con mancuernas', 'Push press'],
    rating: 4.7,
    isTrending: true
  },
  {
    id: '20',
    name: 'Elevaciones Laterales',
    description: 'Ejercicio de aislamiento para deltoides medios.',
    videoUrl: 'https://www.youtube.com/embed/3VcKaXpzqRo',
    category: 'torso',
    material: 'mancuernas',
    difficulty: 'principiante',
    isFavorite: false,
    popularity: 83,
    usageFrequency: 210,
    muscleGroups: ['deltoides medio'],
    instructions: ['Mancuernas a lados', 'Eleva hasta hombros', 'Baja controlado', 'Mantén ligera flexión codos'],
    tips: ['No uses momentum', 'Lidera con codos', 'Siente deltoides medio'],
    variations: ['Con cables', 'Sentado', 'En banco inclinado'],
    rating: 4.4
  },
  {
    id: '21',
    name: 'Elevaciones Frontales',
    description: 'Ejercicio para deltoides anterior con mancuernas o barra.',
    videoUrl: 'https://www.youtube.com/embed/qzSDdl0e5KY',
    category: 'torso',
    material: 'mancuernas',
    difficulty: 'principiante',
    isFavorite: false,
    popularity: 76,
    usageFrequency: 130,
    muscleGroups: ['deltoides anterior'],
    instructions: ['Mancuernas al frente muslos', 'Eleva brazos al frente', 'Hasta altura hombros', 'Baja controlado'],
    tips: ['No balancees', 'Brazos casi rectos', 'Control en bajada'],
    variations: ['Alternadas', 'Con disco', 'Con barra'],
    rating: 4.3
  },
  {
    id: '22',
    name: 'Pájaros',
    description: 'Ejercicio para deltoides posteriores inclinado.',
    videoUrl: 'https://www.youtube.com/embed/ttvfGg9d76c',
    category: 'espalda',
    material: 'mancuernas',
    difficulty: 'intermedio',
    isFavorite: false,
    popularity: 79,
    usageFrequency: 125,
    muscleGroups: ['deltoides posterior', 'trapecios medios'],
    instructions: ['Inclínate 45°', 'Brazos colgando', 'Abre brazos a lados', 'Aprieta escápulas'],
    tips: ['Espalda recta', 'Codos ligeramente flexionados', 'No uses mucho peso'],
    variations: ['En banco inclinado', 'De pie con cable', 'Unilateral'],
    rating: 4.5
  },
  {
    id: '23',
    name: 'Remo al Cuello',
    description: 'Ejercicio compuesto para trapecios y deltoides.',
    videoUrl: 'https://www.youtube.com/embed/qzSDl0e5KY',
    category: 'espalda',
    material: 'barra',
    difficulty: 'intermedio',
    isFavorite: false,
    popularity: 72,
    usageFrequency: 105,
    muscleGroups: ['trapecios', 'deltoides medio'],
    instructions: ['Agarre estrecho', 'Tira barra a barbilla', 'Codos arriba y afuera', 'Baja controlado'],
    tips: ['No subas más de barbilla', 'Mantén barra cerca', 'Mueve codos no hombros'],
    variations: ['Agarre ancho', 'Con mancuernas', 'En polea'],
    rating: 4.1
  },

  // BRAZOS - 10 ejercicios
  {
    id: '24',
    name: 'Curl de Bíceps con Barra',
    description: 'Ejercicio básico para desarrollo de bíceps.',
    videoUrl: 'https://www.youtube.com/embed/ykJmrZ5v0Oo',
    category: 'brazos',
    material: 'barra',
    difficulty: 'principiante',
    isFavorite: true,
    popularity: 86,
    usageFrequency: 220,
    muscleGroups: ['bíceps', 'braquial'],
    instructions: ['Agarre supino', 'Codos junto al cuerpo', 'Flexiona antebrazos', 'Baja controlado'],
    tips: ['No balancees', 'Codos fijos', 'Rango completo'],
    variations: ['Barra Z', 'Curl 21s', 'Curl cerrado'],
    rating: 4.6
  },
  {
    id: '25',
    name: 'Curl Martillo',
    description: 'Variante de curl para bíceps y antebrazo con agarre neutro.',
    videoUrl: 'https://www.youtube.com/embed/zC3nLlEvin4',
    category: 'brazos',
    material: 'mancuernas',
    difficulty: 'principiante',
    isFavorite: false,
    popularity: 81,
    usageFrequency: 185,
    muscleGroups: ['bíceps', 'braquial', 'braquiorradial'],
    instructions: ['Agarre neutro', 'Mancuernas a lados', 'Flexiona manteniendo agarre', 'Baja controlado'],
    tips: ['Codos fijos', 'Movimiento controlado', 'No rotar muñecas'],
    variations: ['Alternado', 'Cross body', 'En banco predicador'],
    rating: 4.5
  },
  {
    id: '26',
    name: 'Extensiones de Tríceps con Polea',
    description: 'Ejercicio para tríceps con tensión constante.',
    videoUrl: 'https://www.youtube.com/embed/2-LAMcpzODU',
    category: 'brazos',
    material: 'maquina',
    difficulty: 'principiante',
    isFavorite: false,
    popularity: 84,
    usageFrequency: 200,
    muscleGroups: ['tríceps'],
    instructions: ['Polea alta con cuerda', 'Codos junto al cuerpo', 'Extiende brazos abajo', 'Vuelve controlado'],
    tips: ['Codos fijos', 'Extiende completamente', 'Aprieta tríceps abajo'],
    variations: ['Con barra', 'Con agarre invertido', 'Unilateral'],
    rating: 4.4
  },
  {
    id: '27',
    name: 'Fondos para Tríceps',
    description: 'Ejercicio de peso corporal para tríceps.',
    videoUrl: 'https://www.youtube.com/embed/6kALZikXxLc',
    category: 'brazos',
    material: 'peso corporal',
    difficulty: 'intermedio',
    isFavorite: false,
    popularity: 82,
    usageFrequency: 165,
    muscleGroups: ['tríceps', 'pecho inferior'],
    instructions: ['Paralelas con cuerpo vertical', 'Baja flexionando codos', 'Mantén cuerpo recto', 'Empuja hasta extender'],
    tips: ['No te inclines adelante', 'Codos cerca del cuerpo', 'Baja hasta 90°'],
    variations: ['Asistidos', 'Lastrados', 'En banco'],
    rating: 4.5
  },
  {
    id: '28',
    name: 'Press Francés',
    description: 'Ejercicio de tríceps acostado con barra o mancuernas.',
    videoUrl: 'https://www.youtube.com/embed/d_KZxkY_0cM',
    category: 'brazos',
    material: 'barra',
    difficulty: 'intermedio',
    isFavorite: false,
    popularity: 79,
    usageFrequency: 140,
    muscleGroups: ['tríceps'],
    instructions: ['Acostado, barra arriba', 'Baja a frente', 'Flexiona solo codos', 'Extiende brazos'],
    tips: ['Codos hacia dentro', 'No muevas hombros', 'Control en bajada'],
    variations: ['Con mancuernas', 'Con barra Z', 'Con cable'],
    rating: 4.3
  },

  // CORE - 8 ejercicios
  {
    id: '29',
    name: 'Plancha Abdominal',
    description: 'Ejercicio isométrico fundamental para core.',
    videoUrl: 'https://www.youtube.com/embed/pSHjTRCQxIw',
    category: 'core',
    material: 'peso corporal',
    difficulty: 'principiante',
    isFavorite: true,
    popularity: 90,
    usageFrequency: 310,
    muscleGroups: ['abdominales', 'oblicuos', 'erectores'],
    instructions: ['Antebrazos en suelo', 'Cuerpo en línea recta', 'Mantén posición', 'Respira normal'],
    tips: ['No subas cadera', 'Aprieta glúteos', 'Mira al suelo'],
    variations: ['Plancha lateral', 'Plancha con elevación', 'Plancha con movimiento'],
    rating: 4.8,
    isTrending: true
  },
  {
    id: '30',
    name: 'Crunch Abdominal',
    description: 'Ejercicio clásico para abdominales superiores.',
    videoUrl: 'https://www.youtube.com/embed/Xyd_fa5zoEU',
    category: 'core',
    material: 'peso corporal',
    difficulty: 'principiante',
    isFavorite: false,
    popularity: 85,
    usageFrequency: 270,
    muscleGroups: ['recto abdominal'],
    instructions: ['Acostado, rodillas flexionadas', 'Manos en pecho o cabeza', 'Eleva torso superior', 'Baja controlado'],
    tips: ['No tires del cuello', 'Contrae abdominales', 'Movimiento corto'],
    variations: ['Crunch en polea', 'Crunch en fitball', 'Crunch bicicleta'],
    rating: 4.4
  },
  {
    id: '31',
    name: 'Elevación de Piernas',
    description: 'Ejercicio para abdominales inferiores.',
    videoUrl: 'https://www.youtube.com/embed/JB2oyawG9KI',
    category: 'core',
    material: 'peso corporal',
    difficulty: 'intermedio',
    isFavorite: false,
    popularity: 83,
    usageFrequency: 190,
    muscleGroups: ['abdominales inferiores', 'hip flexors'],
    instructions: ['Acostado, piernas extendidas', 'Eleva piernas juntas', 'Hasta 90°', 'Baja sin tocar'],
    tips: ['Espalda baja pegada', 'Movimiento controlado', 'No uses momentum'],
    variations: ['Piernas alternadas', 'Con peso', 'En barra'],
    rating: 4.5
  },
  {
    id: '32',
    name: 'Russian Twist',
    description: 'Ejercicio rotacional para oblicuos.',
    videoUrl: 'https://www.youtube.com/embed/wkD8rjkodUI',
    category: 'core',
    material: 'peso corporal',
    difficulty: 'intermedio',
    isFavorite: false,
    popularity: 81,
    usageFrequency: 175,
    muscleGroups: ['oblicuos', 'abdominales'],
    instructions: ['Sentado, tronco inclinado', 'Pies elevados', 'Rota torso a lados', 'Toca suelo cada lado'],
    tips: ['Mantén equilibrio', 'Rotación desde core', 'Respira constante'],
    variations: ['Con disco', 'Con balón medicinal', 'Pies en suelo'],
    rating: 4.3
  },
  {
    id: '33',
    name: 'Mountain Climbers',
    description: 'Ejercicio dinámico de core y cardio.',
    videoUrl: 'https://www.youtube.com/embed/nmwgirgXLYM',
    category: 'core',
    material: 'peso corporal',
    difficulty: 'intermedio',
    isFavorite: true,
    popularity: 87,
    usageFrequency: 240,
    muscleGroups: ['core completo', 'hombros'],
    instructions: ['Posición plancha alta', 'Lleva rodilla al pecho', 'Alterna rápido', 'Mantén cadera baja'],
    tips: ['Movimiento rápido', 'Core activado', 'No subas cadera'],
    variations: ['Lentos', 'Cruzados', 'Con salto'],
    rating: 4.6,
    isTrending: true
  },

  // CARDIO - 6 ejercicios
  {
    id: '34',
    name: 'Burpees',
    description: 'Ejercicio de cuerpo completo de alta intensidad.',
    videoUrl: 'https://www.youtube.com/embed/TU8QYVW0gDU',
    category: 'cardio',
    material: 'peso corporal',
    difficulty: 'intermedio',
    isFavorite: true,
    popularity: 88,
    usageFrequency: 205,
    muscleGroups: ['cuerpo completo'],
    instructions: ['De pie a plancha', 'Flexión', 'Salta pies adelante', 'Salto vertical con palmada'],
    tips: ['Mantén ritmo constante', 'Respira bien', 'Modifica si necesario'],
    variations: ['Sin flexión', 'Sin salto', 'Con peso'],
    rating: 4.5,
    isNew: true
  },
  {
    id: '35',
    name: 'Jumping Jacks',
    description: 'Ejercicio cardiovascular clásico de calentamiento.',
    videoUrl: 'https://www.youtube.com/embed/c4DAnQ6DtF8',
    category: 'cardio',
    material: 'peso corporal',
    difficulty: 'principiante',
    isFavorite: false,
    popularity: 78,
    usageFrequency: 280,
    muscleGroups: ['cuerpo completo'],
    instructions: ['Pies juntos, brazos abajo', 'Salta abriendo piernas', 'Brazos arriba simultáneo', 'Vuelve posición inicial'],
    tips: ['Mantén ritmo constante', 'Aterriza suave', 'Respira natural'],
    variations: ['Medio impacto', 'Con sentadilla', 'Cruzados'],
    rating: 4.3
  },
  {
    id: '36',
    name: 'Sprint en Sitio',
    description: 'Ejercicio de cardio de alta intensidad estático.',
    videoUrl: 'https://www.youtube.com/embed/5jFfH3bRyQs',
    category: 'cardio',
    material: 'peso corporal',
    difficulty: 'intermedio',
    isFavorite: false,
    popularity: 75,
    usageFrequency: 160,
    muscleGroups: ['piernas', 'core'],
    instructions: ['Corre en el sitio', 'Rodillas altas', 'Brazos bombeando', 'Máxima velocidad'],
    tips: ['Mantén core activado', 'Respira fuerte', 'Intervalos de 20-30s'],
    variations: ['Rodillas altas', 'Talones a glúteos', 'Con cambios dirección'],
    rating: 4.4
  },

  // FUNCIONAL - 4 ejercicios
  {
    id: '37',
    name: 'Sentadilla con Kettlebell',
    description: 'Ejercicio funcional de piernas con kettlebell.',
    videoUrl: 'https://www.youtube.com/embed/YYWhkctnP2o',
    category: 'funcional',
    material: 'kettlebell',
    difficulty: 'intermedio',
    isFavorite: false,
    popularity: 80,
    usageFrequency: 135,
    muscleGroups: ['cuádriceps', 'glúteos', 'core'],
    instructions: ['Kettlebell al pecho', 'Pies anchura hombros', 'Sentadilla profunda', 'Sube con explosividad'],
    tips: ['Codos bajo kettlebell', 'Espalda recta', 'Peso en talones'],
    variations: ['Sentadilla overhead', 'Sentadilla unilateral', 'Con dos kettlebells'],
    rating: 4.5
  },
  {
    id: '38',
    name: 'Turkish Get-Up',
    description: 'Movimiento funcional complejo con kettlebell o mancuerna.',
    videoUrl: 'https://www.youtube.com/embed/5mJxCIqYMCo',
    category: 'funcional',
    material: 'kettlebell',
    difficulty: 'avanzado',
    isFavorite: false,
    popularity: 72,
    usageFrequency: 85,
    muscleGroups: ['cuerpo completo'],
    instructions: ['Acostado con peso arriba', 'Serie de movimientos', 'De acostado a de pie', 'Mantén brazo extendido siempre'],
    tips: ['Aprende sin peso primero', 'Movimiento lento', 'Mira el peso siempre'],
    variations: ['Medio get-up', 'Con mancuerna', 'Con barra'],
    rating: 4.7,
    isNew: true
  },

  // FLEXIBILIDAD - 4 ejercicios
  {
    id: '39',
    name: 'Estiramiento de Isquiotibiales',
    description: 'Estiramiento estático para parte posterior de piernas.',
    videoUrl: 'https://www.youtube.com/embed/g_tea8ZNk5A',
    category: 'flexibilidad',
    material: 'peso corporal',
    difficulty: 'principiante',
    isFavorite: false,
    popularity: 70,
    usageFrequency: 195,
    muscleGroups: ['isquiotibiales'],
    instructions: ['Sentado, piernas extendidas', 'Inclínate hacia adelante', 'Mantén espalda recta', 'Respira profundo'],
    tips: ['No rebotes', 'Siente estiramiento suave', 'Mantén 30 segundos'],
    variations: ['De pie', 'Con banda', 'Unilateral'],
    rating: 4.2
  },
  {
    id: '40',
    name: 'Estiramiento de Cuádriceps',
    description: 'Estiramiento para parte frontal de muslos.',
    videoUrl: 'https://www.youtube.com/embed/wbDB6oTYWk0',
    category: 'flexibilidad',
    material: 'peso corporal',
    difficulty: 'principiante',
    isFavorite: false,
    popularity: 68,
    usageFrequency: 180,
    muscleGroups: ['cuádriceps'],
    instructions: ['De pie, agarra un pie', 'Lleva talón a glúteo', 'Mantén rodillas juntas', 'Mantén equilibrio'],
    tips: ['No arquees espalda', 'Empuja cadera adelante', 'Alterna piernas'],
    variations: ['Acostado de lado', 'Con apoyo', 'Dinámico'],
    rating: 4.1
  }
];

// Fetch exercises from backend API
export const fetchEjercicios = async (): Promise<Ejercicio[]> => {
  try {
    const token = localStorage.getItem('token');

    if (!token) {
      console.warn('No authentication token found, using mock data');
      return mockEjercicios;
    }

    const response = await axios.get(`${API_URL}/ejercicios`, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      params: {
        pageSize: 100 // Get all exercises
      }
    });

    if (response.data.success && response.data.data) {
      const backendEjercicios = response.data.data as BackendEjercicio[];
      return backendEjercicios.map(mapBackendToFrontend);
    }

    return mockEjercicios;
  } catch (error) {
    console.error('Error fetching ejercicios from backend:', error);
    // Fallback to mock data on error
    return mockEjercicios;
  }
};

// Create new exercise
export const createEjercicio = async (data: Partial<BackendEjercicio>): Promise<Ejercicio> => {
  const token = localStorage.getItem('token');

  const response = await axios.post(`${API_URL}/ejercicios`, data, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });

  if (response.data.success && response.data.data) {
    return mapBackendToFrontend(response.data.data);
  }

  throw new Error('Failed to create exercise');
};

// Update exercise
export const updateEjercicio = async (id: string, data: Partial<BackendEjercicio>): Promise<Ejercicio> => {
  const token = localStorage.getItem('token');

  const response = await axios.put(`${API_URL}/ejercicios/${id}`, data, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });

  if (response.data.success && response.data.data) {
    return mapBackendToFrontend(response.data.data);
  }

  throw new Error('Failed to update exercise');
};

// Delete exercise
export const deleteEjercicio = async (id: string): Promise<void> => {
  const token = localStorage.getItem('token');

  await axios.delete(`${API_URL}/ejercicios/${id}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
};

// Increment exercise usage
export const incrementEjercicioUso = async (id: string): Promise<void> => {
  const token = localStorage.getItem('token');

  await axios.patch(`${API_URL}/ejercicios/${id}/increment-uso`, {}, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
};