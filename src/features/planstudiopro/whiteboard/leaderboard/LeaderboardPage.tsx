import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Trophy, Medal, Award, TrendingUp, Users, Calendar,
  Dumbbell, Target, Flame, Star, Crown, Zap,
  ChevronRight, Share2, Filter, X, BarChart3,
  Clock, CheckCircle, ArrowUpRight, ArrowDownRight,
  Play, Heart, MessageCircle, Eye, Camera
} from 'lucide-react';
import {
  LineChart, Line, BarChart, Bar, RadarChart, Radar,
  PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

// ==================== TIPOS Y DATOS MOCK ====================

interface Athlete {
  id: string;
  name: string;
  avatar: string;
  gender: 'M' | 'F';
  age: number;
  division: 'RX' | 'Scaled' | 'Beginner';
  weightClass?: string;
  badges: string[];
  results: {
    wodOfDay?: { score: string; time: number; isPR: boolean; date: string };
    benchmarks: { [key: string]: { score: string; time: number; date: string } };
    prs: {
      backSquat?: number;
      deadlift?: number;
      clean?: number;
      snatch?: number;
      benchPress?: number;
      pullUps?: number;
      row500m?: number;
    };
  };
  monthlyPoints: number;
  totalClasses: number;
  attendance: number;
  currentStreak: number;
  prCount: number;
}

// Generar atletas mock
const generateMockAthletes = (): Athlete[] => {
  const firstNames = [
    'Alex', 'Jordan', 'Casey', 'Morgan', 'Taylor', 'Riley', 'Jamie', 'Drew',
    'Chris', 'Sam', 'Pat', 'Avery', 'Quinn', 'Dakota', 'Skyler', 'Rowan',
    'Charlie', 'Blake', 'River', 'Phoenix', 'Sage', 'Ellis', 'Finley', 'Hayden',
    'Reese', 'Parker', 'Bailey', 'Emerson', 'Peyton', 'Cameron', 'Kendall', 'Ryan',
    'Logan', 'Dylan', 'Jesse', 'Kai', 'Lane', 'Micah', 'Nico', 'Oakley',
    'Rory', 'Shea', 'Tatum', 'Wren', 'Zion', 'Arden', 'Briar', 'Cory',
    'Eden', 'Harley', 'Jaden', 'Kendal', 'Lennon', 'Marley', 'Nico', 'Paris',
    'Rain', 'Sasha', 'Teo', 'Val', 'Winter', 'Yael', 'Zen', 'Ash',
    'Bay', 'Cedar', 'Dallas', 'Echo', 'Frost', 'Gray', 'Harbor', 'Indigo',
    'Jay', 'Kit', 'Lake', 'Merit', 'Nova', 'Ocean', 'Pine', 'Quest',
    'Raven', 'Scout', 'True', 'Unity', 'Vale', 'Wave', 'Xerxes', 'York',
    'Zephyr', 'Auden', 'Blue', 'Cove', 'Dove', 'Ever', 'Fox', 'Glen'
  ];

  const lastNames = [
    'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis',
    'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas',
    'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Thompson', 'White', 'Harris',
    'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson', 'Walker', 'Young', 'Allen',
    'King', 'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill', 'Flores', 'Green',
    'Adams', 'Nelson', 'Baker', 'Hall', 'Rivera', 'Campbell', 'Mitchell', 'Carter',
    'Roberts', 'Gomez', 'Phillips', 'Evans', 'Turner', 'Diaz', 'Parker', 'Cruz',
    'Edwards', 'Collins', 'Reyes', 'Stewart', 'Morris', 'Morales', 'Murphy', 'Cook',
    'Rogers', 'Gutierrez', 'Ortiz', 'Morgan', 'Cooper', 'Peterson', 'Bailey', 'Reed',
    'Kelly', 'Howard', 'Ramos', 'Kim', 'Cox', 'Ward', 'Richardson', 'Watson',
    'Brooks', 'Chavez', 'Wood', 'James', 'Bennett', 'Gray', 'Mendoza', 'Ruiz',
    'Hughes', 'Price', 'Alvarez', 'Castillo', 'Sanders', 'Patel', 'Myers', 'Long'
  ];

  const badges = [
    '100 Club', 'PR Machine', 'Benchmark Beast', 'Iron Person',
    'Early Bird', 'Murph Survivor', 'Consistency King', 'New Record',
    'First Place', 'Podium Finisher', 'Elite Athlete', 'Team Player'
  ];

  const benchmarkWods = ['Fran', 'Murph', 'Cindy', 'Diane', 'Grace', 'Helen', 'Isabel'];

  const athletes: Athlete[] = [];

  for (let i = 0; i < 80; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const gender = Math.random() > 0.5 ? 'M' : 'F';
    const age = Math.floor(Math.random() * 30) + 18;
    const divisions: ('RX' | 'Scaled' | 'Beginner')[] = ['RX', 'Scaled', 'Beginner'];
    const division = divisions[Math.floor(Math.random() * divisions.length)];

    // Generar tiempo del WOD (en segundos) con distribución normal
    const baseTime = 300 + (Math.random() - 0.5) * 200;
    const wodTime = Math.max(180, Math.min(600, baseTime));

    // Generar benchmarks
    const benchmarkResults: { [key: string]: { score: string; time: number; date: string } } = {};
    benchmarkWods.forEach(wod => {
      const time = Math.floor(180 + Math.random() * 400);
      benchmarkResults[wod] = {
        score: formatTime(time),
        time,
        date: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString()
      };
    });

    // Generar PRs
    const prs = {
      backSquat: Math.floor(100 + Math.random() * 200),
      deadlift: Math.floor(120 + Math.random() * 250),
      clean: Math.floor(80 + Math.random() * 150),
      snatch: Math.floor(60 + Math.random() * 120),
      benchPress: Math.floor(80 + Math.random() * 150),
      pullUps: Math.floor(5 + Math.random() * 45),
      row500m: Math.floor(90 + Math.random() * 60)
    };

    // Asignar badges aleatorios
    const athleteBadges: string[] = [];
    const badgeCount = Math.floor(Math.random() * 5);
    for (let j = 0; j < badgeCount; j++) {
      const badge = badges[Math.floor(Math.random() * badges.length)];
      if (!athleteBadges.includes(badge)) {
        athleteBadges.push(badge);
      }
    }

    athletes.push({
      id: `athlete-${i}`,
      name: `${firstName} ${lastName}`,
      avatar: `https://i.pravatar.cc/150?img=${i + 1}`,
      gender,
      age,
      division,
      weightClass: gender === 'M' ? '75kg' : '65kg',
      badges: athleteBadges,
      results: {
        wodOfDay: {
          score: formatTime(wodTime),
          time: wodTime,
          isPR: Math.random() > 0.8,
          date: new Date().toISOString()
        },
        benchmarks: benchmarkResults,
        prs
      },
      monthlyPoints: Math.floor(Math.random() * 500) + 100,
      totalClasses: Math.floor(Math.random() * 200) + 50,
      attendance: Math.floor(Math.random() * 30) + 70,
      currentStreak: Math.floor(Math.random() * 20),
      prCount: Math.floor(Math.random() * 15) + 3
    });
  }

  return athletes.sort((a, b) => (a.results.wodOfDay?.time || 0) - (b.results.wodOfDay?.time || 0));
};

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

const mockAthletes = generateMockAthletes();

// ==================== COMPONENTE PRINCIPAL ====================

const LeaderboardPage: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<'wod' | 'benchmarks' | 'prs' | 'monthly' | 'alltime'>('wod');
  const [selectedBenchmark, setSelectedBenchmark] = useState('Fran');
  const [genderFilter, setGenderFilter] = useState<'all' | 'M' | 'F'>('all');
  const [divisionFilter, setDivisionFilter] = useState<'all' | 'RX' | 'Scaled' | 'Beginner'>('all');
  const [ageFilter, setAgeFilter] = useState<'all' | '18-29' | '30-39' | '40+'>('all');
  const [selectedAthlete, setSelectedAthlete] = useState<Athlete | null>(null);
  const [compareMode, setCompareMode] = useState(false);
  const [compareAthletes, setCompareAthletes] = useState<Athlete[]>([]);
  const [showShareModal, setShowShareModal] = useState(false);

  // Filtrar atletas
  const filteredAthletes = useMemo(() => {
    return mockAthletes.filter(athlete => {
      if (genderFilter !== 'all' && athlete.gender !== genderFilter) return false;
      if (divisionFilter !== 'all' && athlete.division !== divisionFilter) return false;
      if (ageFilter !== 'all') {
        if (ageFilter === '18-29' && (athlete.age < 18 || athlete.age > 29)) return false;
        if (ageFilter === '30-39' && (athlete.age < 30 || athlete.age > 39)) return false;
        if (ageFilter === '40+' && athlete.age < 40) return false;
      }
      return true;
    });
  }, [genderFilter, divisionFilter, ageFilter]);

  // Ranking ordenado según tab seleccionado
  const rankedAthletes = useMemo(() => {
    let sorted = [...filteredAthletes];

    switch (selectedTab) {
      case 'wod':
        sorted.sort((a, b) => (a.results.wodOfDay?.time || 0) - (b.results.wodOfDay?.time || 0));
        break;
      case 'benchmarks':
        sorted.sort((a, b) => {
          const aTime = a.results.benchmarks[selectedBenchmark]?.time || 999999;
          const bTime = b.results.benchmarks[selectedBenchmark]?.time || 999999;
          return aTime - bTime;
        });
        break;
      case 'monthly':
        sorted.sort((a, b) => b.monthlyPoints - a.monthlyPoints);
        break;
      case 'prs':
        sorted.sort((a, b) => b.prCount - a.prCount);
        break;
      default:
        sorted.sort((a, b) => (a.results.wodOfDay?.time || 0) - (b.results.wodOfDay?.time || 0));
    }

    return sorted;
  }, [filteredAthletes, selectedTab, selectedBenchmark]);

  const top3 = rankedAthletes.slice(0, 3);
  const rest = rankedAthletes.slice(3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50/30 to-red-50/30 pb-12">

      {/* ==================== HERO SECTION ==================== */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 rounded-3xl shadow-2xl mb-8 p-8 md:p-12"
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
              <Trophy className="w-10 h-10 text-yellow-300 animate-pulse" />
              <div className="absolute inset-0 w-10 h-10 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Leaderboard
            </h1>
          </div>

          {/* Descripción */}
          <p className="text-xl md:text-2xl text-orange-100 max-w-3xl leading-relaxed">
            Compite, mejora y <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">celebra tus logros</span>
          </p>

          {/* Estadísticas rápidas */}
          <div className="mt-8 flex flex-wrap gap-4">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Users className="w-5 h-5 text-yellow-300" />
              <span className="text-sm font-semibold text-white">{mockAthletes.length} Atletas</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Flame className="w-5 h-5 text-orange-300" />
              <span className="text-sm font-semibold text-white">Actualizado hoy</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Star className="w-5 h-5 text-yellow-300" />
              <span className="text-sm font-semibold text-white">7 Benchmarks</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ==================== TABS SELECTOR ==================== */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="mb-8"
      >
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-2 border border-white/50">
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'wod', label: 'WOD del Día', icon: Target },
              { id: 'benchmarks', label: 'Benchmarks', icon: Dumbbell },
              { id: 'prs', label: 'PRs Personales', icon: TrendingUp },
              { id: 'monthly', label: 'Mes Actual', icon: Calendar },
              { id: 'alltime', label: 'All-Time', icon: Crown }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id as any)}
                className={`flex-1 min-w-[140px] px-4 py-3 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                  selectedTab === tab.id
                    ? 'bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 text-white shadow-lg'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ==================== FILTROS ==================== */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="mb-8"
      >
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50">
          <div className="flex items-center gap-3 mb-4">
            <Filter className="w-5 h-5 text-orange-600" />
            <h3 className="text-lg font-bold text-gray-900">Filtros</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Género */}
            <div>
              <label className="text-sm font-semibold text-gray-600 mb-2 block">Género</label>
              <select
                value={genderFilter}
                onChange={(e) => setGenderFilter(e.target.value as any)}
                className="w-full px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all duration-300 outline-none bg-white"
              >
                <option value="all">Todos</option>
                <option value="M">Masculino</option>
                <option value="F">Femenino</option>
              </select>
            </div>

            {/* División */}
            <div>
              <label className="text-sm font-semibold text-gray-600 mb-2 block">División</label>
              <select
                value={divisionFilter}
                onChange={(e) => setDivisionFilter(e.target.value as any)}
                className="w-full px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all duration-300 outline-none bg-white"
              >
                <option value="all">Todas</option>
                <option value="RX">RX</option>
                <option value="Scaled">Scaled</option>
                <option value="Beginner">Beginner</option>
              </select>
            </div>

            {/* Edad */}
            <div>
              <label className="text-sm font-semibold text-gray-600 mb-2 block">Edad</label>
              <select
                value={ageFilter}
                onChange={(e) => setAgeFilter(e.target.value as any)}
                className="w-full px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all duration-300 outline-none bg-white"
              >
                <option value="all">Todas</option>
                <option value="18-29">18-29</option>
                <option value="30-39">30-39</option>
                <option value="40+">40+</option>
              </select>
            </div>

            {/* Benchmark Selector (solo visible en tab benchmarks) */}
            {selectedTab === 'benchmarks' && (
              <div>
                <label className="text-sm font-semibold text-gray-600 mb-2 block">Benchmark</label>
                <select
                  value={selectedBenchmark}
                  onChange={(e) => setSelectedBenchmark(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all duration-300 outline-none bg-white"
                >
                  <option value="Fran">Fran</option>
                  <option value="Murph">Murph</option>
                  <option value="Cindy">Cindy</option>
                  <option value="Diane">Diane</option>
                  <option value="Grace">Grace</option>
                  <option value="Helen">Helen</option>
                  <option value="Isabel">Isabel</option>
                </select>
              </div>
            )}
          </div>

          {/* Resultados y botones de acción */}
          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Mostrando <span className="font-bold text-orange-600">{filteredAthletes.length}</span> atletas
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setGenderFilter('all');
                  setDivisionFilter('all');
                  setAgeFilter('all');
                }}
                className="px-4 py-2 text-sm font-semibold text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
              >
                Limpiar filtros
              </button>
              <button
                onClick={() => setCompareMode(!compareMode)}
                className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors ${
                  compareMode
                    ? 'bg-orange-500 text-white'
                    : 'bg-orange-50 text-orange-600 hover:bg-orange-100'
                }`}
              >
                {compareMode ? 'Salir de comparación' : 'Comparar atletas'}
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ==================== PODIO TOP 3 ==================== */}
      {rankedAthletes.length >= 3 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mb-8"
        >
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/50 relative overflow-hidden">
            {/* Decoración de fondo */}
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-gradient-to-br from-yellow-200 to-orange-200 rounded-full blur-3xl opacity-20"></div>

            <div className="relative z-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center flex items-center justify-center gap-2">
                <Crown className="w-7 h-7 text-yellow-500" />
                Top 3 del {selectedTab === 'wod' ? 'WOD' : selectedTab === 'benchmarks' ? selectedBenchmark : 'Ranking'}
              </h2>

              {/* Podio con escalones */}
              <div className="flex items-end justify-center gap-4 md:gap-8">
                {/* 2do Lugar */}
                <PodiumCard athlete={top3[1]} position={2} />

                {/* 1er Lugar */}
                <PodiumCard athlete={top3[0]} position={1} />

                {/* 3er Lugar */}
                <PodiumCard athlete={top3[2]} position={3} />
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ==================== TABLA COMPLETA (del 4to en adelante) ==================== */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50">
          <div className="p-6 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Trophy className="w-6 h-6" />
              Clasificación General
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 sticky top-0">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">#</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Atleta</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">División</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Resultado</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Diff vs #1</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Badges</th>
                  <th className="px-6 py-4 text-right text-xs font-bold text-gray-600 uppercase tracking-wider">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {rest.map((athlete, index) => {
                  const position = index + 4;
                  const isCurrentUser = index === 2; // Simular usuario actual
                  const firstPlaceTime = rankedAthletes[0]?.results.wodOfDay?.time || 0;
                  const athleteTime = athlete.results.wodOfDay?.time || 0;
                  const diff = athleteTime - firstPlaceTime;

                  return (
                    <motion.tr
                      key={athlete.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.02 }}
                      className={`hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 transition-all ${
                        isCurrentUser ? 'bg-yellow-50 border-l-4 border-yellow-500' : index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                      }`}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold text-gray-700">#{position}</span>
                          {isCurrentUser && (
                            <span className="px-2 py-1 bg-yellow-500 text-white text-xs font-bold rounded-full">TÚ</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={athlete.avatar}
                            alt={athlete.name}
                            className="w-10 h-10 rounded-full border-2 border-orange-200"
                          />
                          <div>
                            <p className="font-semibold text-gray-900">{athlete.name}</p>
                            <p className="text-xs text-gray-500">{athlete.age} años • {athlete.gender}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          athlete.division === 'RX' ? 'bg-purple-100 text-purple-700' :
                          athlete.division === 'Scaled' ? 'bg-blue-100 text-blue-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          {athlete.division}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold text-gray-900">
                            {athlete.results.wodOfDay?.score || 'N/A'}
                          </span>
                          {athlete.results.wodOfDay?.isPR && (
                            <span className="px-2 py-1 bg-green-500 text-white text-xs font-bold rounded-full">PR!</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-600">
                          +{formatTime(diff)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-1">
                          {athlete.badges.slice(0, 3).map((badge, i) => (
                            <div
                              key={i}
                              className="w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center"
                              title={badge}
                            >
                              <Award className="w-4 h-4 text-white" />
                            </div>
                          ))}
                          {athlete.badges.length > 3 && (
                            <span className="text-xs text-gray-500">+{athlete.badges.length - 3}</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {compareMode && (
                            <button
                              onClick={() => {
                                if (compareAthletes.includes(athlete)) {
                                  setCompareAthletes(compareAthletes.filter(a => a.id !== athlete.id));
                                } else if (compareAthletes.length < 2) {
                                  setCompareAthletes([...compareAthletes, athlete]);
                                }
                              }}
                              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                                compareAthletes.includes(athlete)
                                  ? 'bg-orange-500 text-white'
                                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                              }`}
                              disabled={!compareAthletes.includes(athlete) && compareAthletes.length >= 2}
                            >
                              {compareAthletes.includes(athlete) ? 'Seleccionado' : 'Comparar'}
                            </button>
                          )}
                          <button
                            onClick={() => setSelectedAthlete(athlete)}
                            className="p-2 hover:bg-orange-100 rounded-lg transition-colors"
                          >
                            <ChevronRight className="w-5 h-5 text-orange-600" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>

      {/* ==================== MODAL DE PERFIL DE ATLETA ==================== */}
      <AnimatePresence>
        {selectedAthlete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedAthlete(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <AthleteProfile athlete={selectedAthlete} onClose={() => setSelectedAthlete(null)} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ==================== MODAL DE COMPARACIÓN ==================== */}
      <AnimatePresence>
        {compareMode && compareAthletes.length === 2 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => {
              setCompareMode(false);
              setCompareAthletes([]);
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <ComparisonView
                athlete1={compareAthletes[0]}
                athlete2={compareAthletes[1]}
                onClose={() => {
                  setCompareMode(false);
                  setCompareAthletes([]);
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ==================== COMPONENTE DE PODIO ====================

interface PodiumCardProps {
  athlete: Athlete;
  position: 1 | 2 | 3;
}

const PodiumCard: React.FC<PodiumCardProps> = ({ athlete, position }) => {
  const heights = { 1: 'h-80', 2: 'h-64', 3: 'h-64' };
  const borders = {
    1: 'border-yellow-400 shadow-yellow-500/50',
    2: 'border-gray-400 shadow-gray-500/50',
    3: 'border-amber-600 shadow-amber-600/50'
  };
  const badges = {
    1: { icon: '🥇', text: '1st Place', bg: 'from-yellow-400 to-yellow-600' },
    2: { icon: '🥈', text: '2nd Place', bg: 'from-gray-400 to-gray-600' },
    3: { icon: '🥉', text: '3rd Place', bg: 'from-amber-600 to-amber-800' }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: position * 0.2, duration: 0.5 }}
      className={`relative ${position === 1 ? 'order-2' : position === 2 ? 'order-1' : 'order-3'} flex flex-col items-center`}
    >
      {/* Atleta */}
      <div className="mb-4 flex flex-col items-center">
        <div className={`relative mb-3 ${position === 1 ? 'w-24 h-24' : 'w-20 h-20'}`}>
          <img
            src={athlete.avatar}
            alt={athlete.name}
            className={`w-full h-full rounded-full border-4 ${borders[position]} shadow-xl`}
          />
          {position === 1 && (
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center animate-pulse">
              <Crown className="w-5 h-5 text-yellow-900" />
            </div>
          )}
        </div>

        <h4 className={`${position === 1 ? 'text-lg' : 'text-base'} font-bold text-gray-900 text-center`}>
          {athlete.name}
        </h4>

        <p className={`${position === 1 ? 'text-2xl' : 'text-xl'} font-bold text-gray-900 mt-1`}>
          {athlete.results.wodOfDay?.score || 'N/A'}
        </p>

        <div className={`mt-2 px-3 py-1 bg-gradient-to-r ${badges[position].bg} text-white text-xs font-bold rounded-full shadow-lg`}>
          {badges[position].icon} {badges[position].text}
        </div>
      </div>

      {/* Escalón del podio */}
      <div className={`w-32 ${heights[position]} bg-gradient-to-b ${badges[position].bg} rounded-t-2xl shadow-2xl ${borders[position]} border-4 flex items-center justify-center relative overflow-hidden group`}>
        {/* Efecto shimmer */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>

        <span className="text-6xl font-bold text-white/50 relative z-10">{position}</span>
      </div>
    </motion.div>
  );
};

// ==================== COMPONENTE DE PERFIL DE ATLETA ====================

interface AthleteProfileProps {
  athlete: Athlete;
  onClose: () => void;
}

const AthleteProfile: React.FC<AthleteProfileProps> = ({ athlete, onClose }) => {
  const prData = [
    { name: 'Back Squat', value: athlete.results.prs.backSquat, max: 300 },
    { name: 'Deadlift', value: athlete.results.prs.deadlift, max: 400 },
    { name: 'Clean', value: athlete.results.prs.clean, max: 200 },
    { name: 'Snatch', value: athlete.results.prs.snatch, max: 150 },
    { name: 'Bench', value: athlete.results.prs.benchPress, max: 200 }
  ];

  const progressData = [
    { month: 'Jul', prs: 2 },
    { month: 'Ago', prs: 4 },
    { month: 'Sep', prs: 3 },
    { month: 'Oct', prs: 5 },
    { month: 'Nov', prs: 3 },
    { month: 'Dic', prs: 4 }
  ];

  return (
    <div>
      {/* Header con gradiente */}
      <div className="relative overflow-hidden bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 p-8 rounded-t-3xl">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl animate-pulse"></div>
        </div>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/30 transition-colors"
        >
          <X className="w-6 h-6 text-white" />
        </button>

        <div className="relative z-10 flex items-start gap-6">
          <img
            src={athlete.avatar}
            alt={athlete.name}
            className="w-24 h-24 rounded-2xl border-4 border-white shadow-xl"
          />

          <div className="flex-1">
            <h2 className="text-3xl font-bold text-white mb-2">{athlete.name}</h2>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-white text-sm font-semibold">
                {athlete.age} años
              </span>
              <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-white text-sm font-semibold">
                {athlete.gender === 'M' ? 'Masculino' : 'Femenino'}
              </span>
              <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-white text-sm font-semibold">
                {athlete.division}
              </span>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-2">
              {athlete.badges.map((badge, i) => (
                <div key={i} className="px-3 py-1 bg-yellow-400 text-yellow-900 rounded-full text-xs font-bold">
                  <Award className="w-3 h-3 inline mr-1" />
                  {badge}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Contenido */}
      <div className="p-8">
        {/* Estadísticas rápidas */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-4 border border-blue-200">
            <p className="text-sm text-gray-600 mb-1">Clases Totales</p>
            <p className="text-2xl font-bold text-gray-900">{athlete.totalClasses}</p>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-4 border border-green-200">
            <p className="text-sm text-gray-600 mb-1">PRs Este Mes</p>
            <p className="text-2xl font-bold text-gray-900">{athlete.prCount}</p>
          </div>
          <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-4 border border-orange-200">
            <p className="text-sm text-gray-600 mb-1">Racha Actual</p>
            <p className="text-2xl font-bold text-gray-900">{athlete.currentStreak} días</p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-4 border border-purple-200">
            <p className="text-sm text-gray-600 mb-1">Asistencia</p>
            <p className="text-2xl font-bold text-gray-900">{athlete.attendance}%</p>
          </div>
        </div>

        {/* PRs y gráficos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* PRs Radar Chart */}
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg p-6 border border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-orange-600" />
              Personal Records
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <RadarChart data={prData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="name" />
                <PolarRadiusAxis />
                <Radar name="PRs" dataKey="value" stroke="#f97316" fill="#f97316" fillOpacity={0.6} />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Progresión temporal */}
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg p-6 border border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-orange-600" />
              PRs por Mes
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={progressData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="prs" fill="#f97316" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Benchmarks completados */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg p-6 border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Dumbbell className="w-5 h-5 text-orange-600" />
            Benchmarks Completados
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(athlete.results.benchmarks).map(([name, result]) => (
              <div key={name} className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-4 border border-orange-200">
                <p className="text-sm font-semibold text-gray-600 mb-1">{name}</p>
                <p className="text-2xl font-bold text-gray-900">{result.score}</p>
                <p className="text-xs text-gray-500">{new Date(result.date).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ==================== COMPONENTE DE COMPARACIÓN ====================

interface ComparisonViewProps {
  athlete1: Athlete;
  athlete2: Athlete;
  onClose: () => void;
}

const ComparisonView: React.FC<ComparisonViewProps> = ({ athlete1, athlete2, onClose }) => {
  const comparisonData = [
    { name: 'Back Squat', athlete1: athlete1.results.prs.backSquat, athlete2: athlete2.results.prs.backSquat },
    { name: 'Deadlift', athlete1: athlete1.results.prs.deadlift, athlete2: athlete2.results.prs.deadlift },
    { name: 'Clean', athlete1: athlete1.results.prs.clean, athlete2: athlete2.results.prs.clean },
    { name: 'Snatch', athlete1: athlete1.results.prs.snatch, athlete2: athlete2.results.prs.snatch },
    { name: 'Pull-ups', athlete1: athlete1.results.prs.pullUps, athlete2: athlete2.results.prs.pullUps }
  ];

  return (
    <div>
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 p-6 rounded-t-3xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/30 transition-colors"
        >
          <X className="w-6 h-6 text-white" />
        </button>

        <h2 className="text-2xl font-bold text-white text-center">Comparación de Atletas</h2>
      </div>

      {/* Comparación lado a lado */}
      <div className="p-8">
        <div className="grid grid-cols-2 gap-8 mb-8">
          {/* Atleta 1 */}
          <div className="text-center">
            <img
              src={athlete1.avatar}
              alt={athlete1.name}
              className="w-24 h-24 rounded-full border-4 border-orange-400 mx-auto mb-4"
            />
            <h3 className="text-xl font-bold text-gray-900">{athlete1.name}</h3>
            <p className="text-sm text-gray-600">{athlete1.age} años • {athlete1.division}</p>
          </div>

          {/* Atleta 2 */}
          <div className="text-center">
            <img
              src={athlete2.avatar}
              alt={athlete2.name}
              className="w-24 h-24 rounded-full border-4 border-blue-400 mx-auto mb-4"
            />
            <h3 className="text-xl font-bold text-gray-900">{athlete2.name}</h3>
            <p className="text-sm text-gray-600">{athlete2.age} años • {athlete2.division}</p>
          </div>
        </div>

        {/* Comparación de PRs */}
        <div className="space-y-4 mb-8">
          {comparisonData.map((item, index) => {
            const winner = (item.athlete1 || 0) > (item.athlete2 || 0) ? 1 : 2;

            return (
              <div key={index} className="bg-white/80 backdrop-blur-xl rounded-xl p-4 border border-gray-200">
                <p className="text-center text-sm font-semibold text-gray-600 mb-3">{item.name}</p>
                <div className="grid grid-cols-2 gap-4">
                  <div className={`text-center p-3 rounded-lg ${winner === 1 ? 'bg-green-50 border-2 border-green-500' : 'bg-gray-50'}`}>
                    <p className="text-2xl font-bold text-gray-900">{item.athlete1 || 'N/A'}</p>
                    {winner === 1 && <CheckCircle className="w-5 h-5 text-green-600 mx-auto mt-1" />}
                  </div>
                  <div className={`text-center p-3 rounded-lg ${winner === 2 ? 'bg-green-50 border-2 border-green-500' : 'bg-gray-50'}`}>
                    <p className="text-2xl font-bold text-gray-900">{item.athlete2 || 'N/A'}</p>
                    {winner === 2 && <CheckCircle className="w-5 h-5 text-green-600 mx-auto mt-1" />}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Gráfico de radar comparativo */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg p-6 border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">Comparación Visual</h3>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={comparisonData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="name" />
              <PolarRadiusAxis />
              <Radar name={athlete1.name} dataKey="athlete1" stroke="#f97316" fill="#f97316" fillOpacity={0.5} />
              <Radar name={athlete2.name} dataKey="athlete2" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.5} />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage;
