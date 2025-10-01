
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { UtensilsCrossed, Users, Heart, Star, TrendingUp, Plus, Sparkles } from 'lucide-react';
import PlantillasGrid from './components/PlantillasGrid';
import PlantillasFilters from './components/PlantillasFilters';
import PlantillaPreview from './components/PlantillaPreview';

interface Meal {
  name: string;
  description: string;
  calories: number;
  macros: { protein: number; carbs: number; fat: number };
  foods: string[];
}

interface DayMenu {
  breakfast: Meal;
  lunch: Meal;
  dinner: Meal;
  snacks?: Meal[];
}

export interface PlantillaDieta {
  id: string;
  name: string;
  description: string;
  author: {
    name: string;
    avatar: string;
  };
  objective: 'perdida_peso' | 'ganancia_muscular' | 'mantenimiento' | 'definicion' | 'volumen_limpio' | 'rendimiento' | 'salud_general' | 'recomposicion';
  dietType: 'mediterranea' | 'keto' | 'vegana' | 'vegetariana' | 'paleo' | 'flexible' | 'intermitente' | 'baja_carbos' | 'alta_proteina';
  time_level: 'quick' | 'advanced' | 'no_cook';
  culinary_experience: 'beginner' | 'intermediate' | 'expert';
  calories: number;
  macros: { protein: number; carbs: number; fat: number };
  duration_weeks: number;
  is_favorite: boolean;
  is_public: boolean;
  restrictions: string[];
  allergens: string[];
  rating: number;
  uses: number;
  reviews: number;
  weekly_menu: DayMenu[];
}

const mockPlantillas: PlantillaDieta[] = [
  {
    id: '1',
    name: 'Dieta Keto para Principiantes',
    description: 'Plan cetogénico equilibrado perfecto para iniciar tu transformación con bajo contenido en carbohidratos',
    author: { name: 'Dra. María González', avatar: '👩‍⚕️' },
    objective: 'perdida_peso',
    dietType: 'keto',
    time_level: 'advanced',
    culinary_experience: 'intermediate',
    calories: 1800,
    macros: { protein: 100, carbs: 20, fat: 140 },
    duration_weeks: 4,
    is_favorite: false,
    is_public: true,
    restrictions: ['Sin gluten', 'Baja en carbohidratos'],
    allergens: ['Lácteos', 'Huevos'],
    rating: 4.8,
    uses: 1247,
    reviews: 89,
    weekly_menu: [
      {
        breakfast: { name: 'Huevos revueltos con aguacate', description: 'Cremoso y saciante', calories: 350, macros: { protein: 20, carbs: 5, fat: 28 }, foods: ['2 huevos', '1/2 aguacate', 'Sal marina', 'Pimienta'] },
        lunch: { name: 'Ensalada de pollo y espinacas', description: 'Rica en proteínas y grasas saludables', calories: 500, macros: { protein: 40, carbs: 10, fat: 35 }, foods: ['200g pechuga pollo', 'Espinacas frescas', '2 cdas aceite oliva', 'Nueces'] },
        dinner: { name: 'Salmón al horno con brócoli', description: 'Omega-3 y vegetales al vapor', calories: 600, macros: { protein: 45, carbs: 15, fat: 40 }, foods: ['180g salmón', 'Brócoli', 'Mantequilla', 'Limón'] },
      },
    ],
  },
  {
    id: '2',
    name: 'Volumen Rápido y Efectivo',
    description: 'Maximiza tu ganancia muscular con recetas rápidas y alto contenido calórico',
    author: { name: 'Carlos Fitness', avatar: '💪' },
    objective: 'ganancia_muscular',
    dietType: 'alta_proteina',
    time_level: 'quick',
    culinary_experience: 'beginner',
    calories: 2800,
    macros: { protein: 180, carbs: 300, fat: 100 },
    duration_weeks: 8,
    is_favorite: true,
    is_public: true,
    restrictions: [],
    allergens: ['Lácteos'],
    rating: 4.9,
    uses: 2341,
    reviews: 156,
    weekly_menu: [
      {
        breakfast: { name: 'Avena con proteína y plátano', description: 'Energía duradera para el día', calories: 600, macros: { protein: 40, carbs: 80, fat: 15 }, foods: ['80g avena', '1 scoop proteína', '1 plátano', 'Miel'] },
        lunch: { name: 'Arroz con pollo y verduras', description: 'Clásico del culturismo', calories: 800, macros: { protein: 60, carbs: 100, fat: 20 }, foods: ['150g arroz', '200g pollo', 'Verduras mixtas', 'Aceite'] },
        dinner: { name: 'Pasta integral con carne', description: 'Carbohidratos complejos y proteína', calories: 900, macros: { protein: 70, carbs: 120, fat: 25 }, foods: ['120g pasta', '180g carne picada', 'Salsa tomate', 'Queso'] },
      },
    ],
  },
  {
    id: '3',
    name: 'Mantenimiento Sin Cocina',
    description: 'Alimentación equilibrada sin necesidad de cocinar, perfecta para profesionales ocupados',
    author: { name: 'Laura Nutrición', avatar: '🥗' },
    objective: 'mantenimiento',
    dietType: 'flexible',
    time_level: 'no_cook',
    culinary_experience: 'beginner',
    calories: 2200,
    macros: { protein: 120, carbs: 200, fat: 80 },
    duration_weeks: 12,
    is_favorite: false,
    is_public: true,
    restrictions: [],
    allergens: ['Lácteos', 'Frutos secos'],
    rating: 4.6,
    uses: 892,
    reviews: 67,
    weekly_menu: [
      {
        breakfast: { name: 'Yogur con frutas y frutos secos', description: 'Desayuno rápido y nutritivo', calories: 400, macros: { protein: 25, carbs: 40, fat: 15 }, foods: ['200g yogur griego', 'Bayas frescas', '30g nueces', 'Miel'] },
        lunch: { name: 'Ensalada de legumbres y atún', description: 'Proteína vegetal y animal', calories: 600, macros: { protein: 35, carbs: 60, fat: 20 }, foods: ['150g garbanzos', '1 lata atún', 'Verduras', 'Vinagreta'] },
        dinner: { name: 'Sándwich integral de pavo', description: 'Cena ligera y saciante', calories: 500, macros: { protein: 30, carbs: 50, fat: 18 }, foods: ['Pan integral', '100g pavo', 'Queso', 'Lechuga/tomate'] },
      },
    ],
  },
  {
    id: '4',
    name: 'Mediterránea Saludable',
    description: 'La dieta más estudiada del mundo, rica en aceite de oliva y pescado',
    author: { name: 'Chef Antonio', avatar: '👨‍🍳' },
    objective: 'salud_general',
    dietType: 'mediterranea',
    time_level: 'advanced',
    culinary_experience: 'intermediate',
    calories: 2100,
    macros: { protein: 110, carbs: 220, fat: 85 },
    duration_weeks: 16,
    is_favorite: true,
    is_public: true,
    restrictions: [],
    allergens: ['Pescado', 'Frutos secos'],
    rating: 4.9,
    uses: 3156,
    reviews: 234,
    weekly_menu: [
      {
        breakfast: { name: 'Tostadas con tomate y aceite', description: 'Desayuno mediterráneo tradicional', calories: 380, macros: { protein: 15, carbs: 50, fat: 18 }, foods: ['Pan integral', 'Tomate fresco', 'Aceite oliva virgen', 'Jamón'] },
        lunch: { name: 'Paella de mariscos', description: 'Arroz con productos del mar', calories: 650, macros: { protein: 45, carbs: 75, fat: 22 }, foods: ['Arroz', 'Mariscos variados', 'Azafrán', 'Verduras'] },
        dinner: { name: 'Merluza al horno con verduras', description: 'Pescado blanco con vegetales', calories: 520, macros: { protein: 40, carbs: 35, fat: 25 }, foods: ['200g merluza', 'Patatas', 'Pimientos', 'Aceite'] },
      },
    ],
  },
  {
    id: '5',
    name: 'Vegana Alta en Proteína',
    description: 'Plan 100% vegetal optimizado para el desarrollo muscular',
    author: { name: 'Ana Plant-Based', avatar: '🌱' },
    objective: 'ganancia_muscular',
    dietType: 'vegana',
    time_level: 'quick',
    culinary_experience: 'intermediate',
    calories: 2600,
    macros: { protein: 150, carbs: 320, fat: 75 },
    duration_weeks: 10,
    is_favorite: false,
    is_public: true,
    restrictions: ['Vegano', 'Sin productos animales'],
    allergens: ['Soja', 'Frutos secos'],
    rating: 4.7,
    uses: 1834,
    reviews: 142,
    weekly_menu: [
      {
        breakfast: { name: 'Bowl de proteína vegetal', description: 'Batido completo y nutritivo', calories: 550, macros: { protein: 35, carbs: 70, fat: 15 }, foods: ['Proteína de guisante', 'Avena', 'Plátano', 'Mantequilla almendras'] },
        lunch: { name: 'Buddha bowl de quinoa', description: 'Superalimento con proteína completa', calories: 700, macros: { protein: 40, carbs: 95, fat: 22 }, foods: ['150g quinoa', 'Garbanzos', 'Aguacate', 'Verduras'] },
        dinner: { name: 'Tofu salteado con arroz', description: 'Proteína de soja con vegetales', calories: 650, macros: { protein: 45, carbs: 80, fat: 20 }, foods: ['200g tofu firme', 'Arroz integral', 'Brócoli', 'Salsa soja'] },
      },
    ],
  },
  {
    id: '6',
    name: 'Definición Extrema',
    description: 'Plan hipocalórico para pérdida de grasa manteniendo músculo',
    author: { name: 'Marcos Shredded', avatar: '🔥' },
    objective: 'definicion',
    dietType: 'baja_carbos',
    time_level: 'advanced',
    culinary_experience: 'expert',
    calories: 1600,
    macros: { protein: 140, carbs: 80, fat: 70 },
    duration_weeks: 6,
    is_favorite: true,
    is_public: true,
    restrictions: ['Baja en carbohidratos', 'Alta en proteína'],
    allergens: ['Huevos', 'Pescado'],
    rating: 4.8,
    uses: 1567,
    reviews: 98,
    weekly_menu: [
      {
        breakfast: { name: 'Claras de huevo con espinacas', description: 'Proteína pura para empezar', calories: 250, macros: { protein: 30, carbs: 8, fat: 12 }, foods: ['6 claras + 1 huevo', 'Espinacas', 'Champiñones', 'Sal'] },
        lunch: { name: 'Pechuga a la plancha con brócoli', description: 'Comida limpia y efectiva', calories: 450, macros: { protein: 55, carbs: 20, fat: 18 }, foods: ['250g pechuga', 'Brócoli al vapor', 'Limón', 'Especias'] },
        dinner: { name: 'Pescado blanco con ensalada', description: 'Cena ligera alta en proteína', calories: 380, macros: { protein: 45, carbs: 15, fat: 20 }, foods: ['200g pescado', 'Ensalada verde', 'Vinagre', 'Aceite oliva'] },
      },
    ],
  },
  {
    id: '7',
    name: 'Ayuno Intermitente 16/8',
    description: 'Protocolo de alimentación limitada en el tiempo con 2 comidas principales',
    author: { name: 'Dr. Roberto Fasting', avatar: '⏰' },
    objective: 'perdida_peso',
    dietType: 'intermitente',
    time_level: 'quick',
    culinary_experience: 'beginner',
    calories: 1900,
    macros: { protein: 130, carbs: 150, fat: 85 },
    duration_weeks: 8,
    is_favorite: false,
    is_public: true,
    restrictions: ['Ayuno intermitente'],
    allergens: [],
    rating: 4.7,
    uses: 2103,
    reviews: 167,
    weekly_menu: [
      {
        breakfast: { name: 'No hay desayuno (ayuno)', description: 'Ventana de ayuno hasta las 13:00', calories: 0, macros: { protein: 0, carbs: 0, fat: 0 }, foods: ['Agua', 'Café negro', 'Té verde'] },
        lunch: { name: 'Primera comida - Bowl completo', description: 'Romper ayuno con nutrientes', calories: 900, macros: { protein: 60, carbs: 85, fat: 45 }, foods: ['Arroz', 'Pollo', 'Aguacate', 'Verduras'] },
        dinner: { name: 'Segunda comida - Salmón y batata', description: 'Última comida antes de las 21:00', calories: 750, macros: { protein: 50, carbs: 65, fat: 35 }, foods: ['180g salmón', 'Batata asada', 'Espárragos', 'Aceite'] },
      },
    ],
  },
  {
    id: '8',
    name: 'Vegetariana Equilibrada',
    description: 'Nutrición completa sin carne pero con huevos y lácteos',
    author: { name: 'Sofia Veggie', avatar: '🥕' },
    objective: 'mantenimiento',
    dietType: 'vegetariana',
    time_level: 'advanced',
    culinary_experience: 'intermediate',
    calories: 2300,
    macros: { protein: 115, carbs: 260, fat: 90 },
    duration_weeks: 12,
    is_favorite: false,
    is_public: true,
    restrictions: ['Vegetariano'],
    allergens: ['Huevos', 'Lácteos', 'Frutos secos'],
    rating: 4.6,
    uses: 1456,
    reviews: 112,
    weekly_menu: [
      {
        breakfast: { name: 'Tortilla de verduras con queso', description: 'Desayuno proteico vegetariano', calories: 420, macros: { protein: 28, carbs: 35, fat: 22 }, foods: ['3 huevos', 'Verduras variadas', 'Queso feta', 'Pan integral'] },
        lunch: { name: 'Lentejas con arroz integral', description: 'Proteína vegetal completa', calories: 680, macros: { protein: 35, carbs: 95, fat: 24 }, foods: ['Lentejas', 'Arroz integral', 'Zanahoria', 'Cebolla'] },
        dinner: { name: 'Pizza vegetariana casera', description: 'Cena completa y sabrosa', calories: 720, macros: { protein: 32, carbs: 85, fat: 30 }, foods: ['Masa integral', 'Queso mozzarella', 'Verduras asadas', 'Salsa tomate'] },
      },
    ],
  },
  {
    id: '9',
    name: 'Paleo Performance',
    description: 'Dieta ancestral para optimizar rendimiento y salud',
    author: { name: 'Juan Caveman', avatar: '🦴' },
    objective: 'rendimiento',
    dietType: 'paleo',
    time_level: 'advanced',
    culinary_experience: 'expert',
    calories: 2400,
    macros: { protein: 140, carbs: 180, fat: 110 },
    duration_weeks: 8,
    is_favorite: true,
    is_public: true,
    restrictions: ['Sin granos', 'Sin lácteos', 'Sin legumbres'],
    allergens: ['Frutos secos', 'Huevos'],
    rating: 4.5,
    uses: 987,
    reviews: 76,
    weekly_menu: [
      {
        breakfast: { name: 'Huevos con batata y aguacate', description: 'Desayuno paleo energético', calories: 520, macros: { protein: 28, carbs: 45, fat: 30 }, foods: ['3 huevos', 'Batata', 'Aguacate', 'Ghee'] },
        lunch: { name: 'Pollo asado con vegetales', description: 'Comida paleo completa', calories: 750, macros: { protein: 65, carbs: 50, fat: 42 }, foods: ['250g pollo', 'Boniato', 'Brócoli', 'Aceite coco'] },
        dinner: { name: 'Bistec con ensalada grande', description: 'Proteína y vegetales', calories: 680, macros: { protein: 55, carbs: 35, fat: 40 }, foods: ['200g bistec', 'Ensalada mixta', 'Nueces', 'Vinagreta'] },
      },
    ],
  },
  {
    id: '10',
    name: 'Volumen Limpio Premium',
    description: 'Gana masa muscular sin acumular grasa excesiva',
    author: { name: 'Alex Gains', avatar: '💎' },
    objective: 'volumen_limpio',
    dietType: 'flexible',
    time_level: 'quick',
    culinary_experience: 'intermediate',
    calories: 3000,
    macros: { protein: 200, carbs: 350, fat: 100 },
    duration_weeks: 12,
    is_favorite: true,
    is_public: true,
    restrictions: [],
    allergens: ['Lácteos', 'Huevos'],
    rating: 4.9,
    uses: 2789,
    reviews: 201,
    weekly_menu: [
      {
        breakfast: { name: 'Pancakes proteicos con frutas', description: 'Desayuno anabólico delicioso', calories: 650, macros: { protein: 45, carbs: 80, fat: 20 }, foods: ['Claras de huevo', 'Avena', 'Proteína', 'Arándanos', 'Miel'] },
        lunch: { name: 'Arroz basmati con ternera', description: 'Comida de culturista', calories: 950, macros: { protein: 75, carbs: 110, fat: 32 }, foods: ['180g arroz', '220g ternera', 'Verduras', 'Aceite oliva'] },
        dinner: { name: 'Pasta con pavo y salsa', description: 'Carbohidratos y proteína magra', calories: 850, macros: { protein: 60, carbs: 105, fat: 28 }, foods: ['150g pasta', '200g pavo picado', 'Salsa tomate', 'Queso'] },
        snacks: [
          { name: 'Batido post-entreno', description: 'Recuperación muscular', calories: 350, macros: { protein: 40, carbs: 45, fat: 8 }, foods: ['2 scoops proteína', 'Plátano', 'Leche', 'Creatina'] },
        ],
      },
    ],
  },
];

const PlantillasDietasPage: React.FC = () => {
  const [selectedPlantilla, setSelectedPlantilla] = useState<PlantillaDieta | null>(null);
  const [activeTab, setActiveTab] = useState<'todas' | 'mis-plantillas' | 'favoritas' | 'publicas' | 'por-objetivo'>('todas');
  const [filters, setFilters] = useState({
    objective: '',
    dietType: '',
    time_level: '',
    culinary_experience: '',
    caloriesMin: '',
    caloriesMax: '',
    restrictions: [] as string[],
    search: '',
  });

  // Filtrar plantillas
  const filteredPlantillas = mockPlantillas.filter(plantilla => {
    // Filtro por tab
    if (activeTab === 'favoritas' && !plantilla.is_favorite) return false;
    if (activeTab === 'publicas' && !plantilla.is_public) return false;

    // Filtros de búsqueda
    const matchesObjective = filters.objective ? plantilla.objective === filters.objective : true;
    const matchesDietType = filters.dietType ? plantilla.dietType === filters.dietType : true;
    const matchesTimeLevel = filters.time_level ? plantilla.time_level === filters.time_level : true;
    const matchesCulinaryExperience = filters.culinary_experience ? plantilla.culinary_experience === filters.culinary_experience : true;

    const matchesCalories =
      (!filters.caloriesMin || plantilla.calories >= parseInt(filters.caloriesMin)) &&
      (!filters.caloriesMax || plantilla.calories <= parseInt(filters.caloriesMax));

    const matchesSearch = filters.search
      ? plantilla.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        plantilla.description.toLowerCase().includes(filters.search.toLowerCase()) ||
        plantilla.author.name.toLowerCase().includes(filters.search.toLowerCase())
      : true;

    return matchesObjective && matchesDietType && matchesTimeLevel && matchesCulinaryExperience && matchesCalories && matchesSearch;
  });

  // Estadísticas
  const stats = {
    total: mockPlantillas.length,
    miasPlantillas: mockPlantillas.filter(p => !p.is_public).length,
    usadas: mockPlantillas.reduce((acc, p) => acc + p.uses, 0),
    favoritas: mockPlantillas.filter(p => p.is_favorite).length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50/30 to-teal-50/30 pb-12">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 rounded-3xl shadow-2xl mb-8 p-8 md:p-12"
      >
        {/* Efectos de fondo animados */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        <div className="relative z-10">
          {/* Título con icono animado */}
          <div className="flex items-center gap-3 mb-4">
            <div className="relative">
              <UtensilsCrossed className="w-10 h-10 text-yellow-300 animate-pulse" />
              <div className="absolute inset-0 w-10 h-10 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Plantillas de <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Dietas</span>
            </h1>
          </div>

          {/* Descripción */}
          <p className="text-xl md:text-2xl text-emerald-100 max-w-3xl leading-relaxed mb-6">
            Marketplace de plantillas nutricionales. Crea, comparte y encuentra el plan perfecto para tus <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">objetivos</span>
          </p>

          {/* Indicadores pills */}
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Sparkles className="w-5 h-5 text-green-300" />
              <span className="text-sm font-semibold text-white">{stats.total} Plantillas Disponibles</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Users className="w-5 h-5 text-blue-300" />
              <span className="text-sm font-semibold text-white">{stats.usadas.toLocaleString()} Usos Totales</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Heart className="w-5 h-5 text-red-300" />
              <span className="text-sm font-semibold text-white">{stats.favoritas} Favoritas</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Estadísticas Rápidas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { icon: UtensilsCrossed, title: 'Plantillas Disponibles', value: stats.total, color: 'from-green-500 to-emerald-600', change: '+12' },
          { icon: Users, title: 'Tus Plantillas Creadas', value: stats.miasPlantillas, color: 'from-blue-500 to-indigo-600', change: '+3' },
          { icon: TrendingUp, title: 'Plantillas Usadas', value: stats.usadas.toLocaleString(), color: 'from-purple-500 to-pink-600', change: '+847' },
          { icon: Heart, title: 'Plantillas Compartidas', value: stats.favoritas, color: 'from-orange-500 to-red-600', change: '+2' },
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ scale: 1.03, y: -8 }}
            className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 border border-white/50 relative overflow-hidden group cursor-pointer"
          >
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>

            {/* Decoración de fondo */}
            <div className={`absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br ${stat.color} opacity-5 rounded-full blur-2xl`}></div>

            <div className="relative z-10">
              {/* Icono */}
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white mb-4 shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon className="w-8 h-8" />
              </div>

              {/* Título */}
              <p className="text-sm font-semibold text-gray-600 mb-2 tracking-wide uppercase">
                {stat.title}
              </p>

              {/* Valor */}
              <p className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 mb-3">
                {stat.value}
              </p>

              {/* Cambio */}
              <div className="flex items-center gap-2">
                <div className="p-1 bg-green-50 rounded-lg">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                </div>
                <span className="text-sm font-bold text-green-600">{stat.change}</span>
                <span className="text-xs text-gray-500 font-medium">este mes</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Navegación por Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-6"
      >
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-2 border border-white/50 inline-flex gap-2">
          {[
            { id: 'todas', label: 'Todas las Plantillas', icon: UtensilsCrossed },
            { id: 'mis-plantillas', label: 'Mis Plantillas', icon: Users },
            { id: 'favoritas', label: 'Favoritas', icon: Heart },
            { id: 'publicas', label: 'Públicas', icon: Star },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`
                flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold transition-all duration-300
                ${activeTab === tab.id
                  ? 'bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-gray-100'
                }
              `}
            >
              <tab.icon className="w-5 h-5" />
              <span className="hidden md:inline">{tab.label}</span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Contenido Principal: Filtros + Grid */}
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-1/4">
          <PlantillasFilters filters={filters} setFilters={setFilters} />
        </div>
        <div className="lg:w-3/4">
          <PlantillasGrid
            plantillas={filteredPlantillas}
            onSelectPlantilla={setSelectedPlantilla}
          />
        </div>
      </div>

      {/* Modal Preview */}
      {selectedPlantilla && (
        <PlantillaPreview
          plantilla={selectedPlantilla}
          onClose={() => setSelectedPlantilla(null)}
        />
      )}

      {/* Botón flotante Nueva Plantilla */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full shadow-2xl flex items-center justify-center text-white hover:shadow-green-500/50 transition-all duration-300 z-50 group"
      >
        <Plus className="w-8 h-8 group-hover:rotate-90 transition-transform duration-300" />
      </motion.button>
    </div>
  );
};

export default PlantillasDietasPage;
