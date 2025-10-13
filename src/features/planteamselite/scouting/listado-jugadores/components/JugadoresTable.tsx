import React, { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronUp, 
  ChevronDown, 
  Eye, 
  Edit, 
  Star, 
  MapPin, 
  Calendar,
  Target,
  TrendingUp,
  Users,
  Filter,
  Search,
  MoreVertical,
  Download,
  Share2,
  Plus,
  Trash2,
  Mail,
  FileText,
  BarChart3,
  Settings,
  X,
  Check,
  AlertCircle,
  Info,
  Play,
  Pause,
  RotateCcw,
  Save,
  Upload,
  Copy,
  ExternalLink,
  Heart,
  Flag,
  Award,
  Zap,
  Shield,
  Clock,
  DollarSign,
  Globe,
  Phone,
  MessageSquare,
  Camera,
  Video,
  Music,
  Bookmark,
  Tag,
  Layers,
  Grid,
  List,
  Maximize,
  Minimize,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  SortAsc,
  SortDesc,
  ArrowUpDown,
  FilterX,
  CheckCircle,
  XCircle,
  AlertTriangle,
  ThumbsUp,
  ThumbsDown,
  MessageCircle,
  Send,
  Archive,
  Unarchive,
  Lock,
  Unlock,
  EyeOff,
  Edit3,
  Trash,
  MoreHorizontal,
  UserPlus,
  UserMinus,
  UserCheck,
  UserX,
  StarOff,
  StarHalf,
  TrendingDown,
  Activity,
  PieChart,
  LineChart,
  BarChart,
  TrendingUp as TrendingUpIcon,
  Database,
  Server,
  Cloud,
  Wifi,
  WifiOff,
  Signal,
  SignalZero,
  SignalOne,
  SignalTwo,
  SignalThree,
  SignalFour,
  Battery,
  BatteryLow,
  BatteryMedium,
  BatteryHigh,
  BatteryFull,
  Power,
  PowerOff,
  Volume2,
  VolumeX,
  Volume1,
  Mute,
  Unmute,
  Mic,
  MicOff,
  Headphones,
  HeadphonesOff,
  Speaker,
  SpeakerOff,
  Radio,
  RadioOff,
  Tv,
  TvOff,
  Monitor,
  MonitorOff,
  Laptop,
  LaptopOff,
  Smartphone,
  SmartphoneOff,
  Tablet,
  TabletOff,
  Watch,
  WatchOff,
  Gamepad2,
  Gamepad2Off,
  Controller,
  ControllerOff,
  Joystick,
  JoystickOff,
  Mouse,
  MouseOff,
  Keyboard,
  KeyboardOff,
  Printer,
  PrinterOff,
  Scanner,
  ScannerOff,
  Fax,
  FaxOff,
  Copier,
  CopierOff,
  HardDrive,
  HardDriveOff,
  SdCard,
  SdCardOff,
  Usb,
  UsbOff,
  Cable,
  CableOff,
  Plug,
  PlugOff,
  Outlet,
  OutletOff,
  Lightbulb,
  LightbulbOff,
  Lamp,
  LampOff,
  Flashlight,
  FlashlightOff,
  Candle,
  CandleOff,
  Fire,
  FireOff,
  Flame,
  FlameOff,
  Sparkles,
  SparklesOff,
  Magic,
  MagicOff,
  Wand,
  WandOff,
  Hat,
  HatOff,
  Crown,
  CrownOff,
  Gem,
  GemOff,
  Diamond,
  DiamondOff,
  Ruby,
  RubyOff,
  Emerald,
  EmeraldOff,
  Sapphire,
  SapphireOff,
  Topaz,
  TopazOff,
  Amethyst,
  AmethystOff,
  Pearl,
  PearlOff,
  Opal,
  OpalOff,
  Jade,
  JadeOff,
  Coral,
  CoralOff,
  Amber,
  AmberOff,
  Ivory,
  IvoryOff,
  Bone,
  BoneOff,
  Horn,
  HornOff,
  Antler,
  AntlerOff,
  Feather,
  FeatherOff,
  Wing,
  WingOff,
  Angel,
  AngelOff,
  Devil,
  DevilOff,
  Ghost,
  GhostOff,
  Skull,
  SkullOff,
  Cross,
  CrossOff,
  StarOfDavid,
  StarOfDavidOff,
  Crescent,
  CrescentOff,
  Sun,
  SunOff,
  Moon,
  MoonOff,
  Planet,
  PlanetOff,
  Comet,
  CometOff,
  Meteor,
  MeteorOff,
  Asteroid,
  AsteroidOff,
  Satellite,
  SatelliteOff,
  Rocket,
  RocketOff,
  Spaceship,
  SpaceshipOff,
  Ufo,
  UfoOff,
  Alien,
  AlienOff,
  Robot,
  RobotOff,
  Cyborg,
  CyborgOff,
  Android,
  AndroidOff,
  Ios,
  IosOff,
  Windows,
  WindowsOff,
  Linux,
  LinuxOff,
  Mac,
  MacOff,
  Chrome,
  ChromeOff,
  Firefox,
  FirefoxOff,
  Safari,
  SafariOff,
  Edge,
  EdgeOff,
  Opera,
  OperaOff,
  Brave,
  BraveOff,
  Tor,
  TorOff,
  Vpn,
  VpnOff,
  Proxy,
  ProxyOff,
  Firewall,
  FirewallOff,
  ShieldCheck,
  ShieldCheckOff,
  ShieldAlert,
  ShieldAlertOff,
  ShieldX,
  ShieldXOff,
  ShieldPlus,
  ShieldPlusOff,
  ShieldMinus,
  ShieldMinusOff,
  ShieldQuestion,
  ShieldQuestionOff,
  ShieldExclamation,
  ShieldExclamationOff,
  ShieldInfo,
  ShieldInfoOff,
  ShieldBan,
  ShieldBanOff,
  ShieldOff,
  ShieldOn,
  Key,
  KeyOff,
  LockKeyhole,
  LockKeyholeOff,
  UnlockKeyhole,
  UnlockKeyholeOff,
  KeyRound,
  KeyRoundOff,
  KeySquare,
  KeySquareOff,
  KeyTriangle,
  KeyTriangleOff,
  KeyDiamond,
  KeyDiamondOff,
  KeyHexagon,
  KeyHexagonOff,
  KeyOctagon,
  KeyOctagonOff,
  KeyCircle,
  KeyCircleOff,
  KeyOval,
  KeyOvalOff,
  KeyRectangle,
  KeyRectangleOff,
  KeySquareRound,
  KeySquareRoundOff,
  KeySquareSquare,
  KeySquareSquareOff,
  KeySquareTriangle,
  KeySquareTriangleOff,
  KeySquareDiamond,
  KeySquareDiamondOff,
  KeySquareHexagon,
  KeySquareHexagonOff,
  KeySquareOctagon,
  KeySquareOctagonOff,
  KeySquareCircle,
  KeySquareCircleOff,
  KeySquareOval,
  KeySquareOvalOff,
  KeySquareRectangle,
  KeySquareRectangleOff,
  KeyTriangleRound,
  KeyTriangleRoundOff,
  KeyTriangleSquare,
  KeyTriangleSquareOff,
  KeyTriangleTriangle,
  KeyTriangleTriangleOff,
  KeyTriangleDiamond,
  KeyTriangleDiamondOff,
  KeyTriangleHexagon,
  KeyTriangleHexagonOff,
  KeyTriangleOctagon,
  KeyTriangleOctagonOff,
  KeyTriangleCircle,
  KeyTriangleCircleOff,
  KeyTriangleOval,
  KeyTriangleOvalOff,
  KeyTriangleRectangle,
  KeyTriangleRectangleOff,
  KeyDiamondRound,
  KeyDiamondRoundOff,
  KeyDiamondSquare,
  KeyDiamondSquareOff,
  KeyDiamondTriangle,
  KeyDiamondTriangleOff,
  KeyDiamondDiamond,
  KeyDiamondDiamondOff,
  KeyDiamondHexagon,
  KeyDiamondHexagonOff,
  KeyDiamondOctagon,
  KeyDiamondOctagonOff,
  KeyDiamondCircle,
  KeyDiamondCircleOff,
  KeyDiamondOval,
  KeyDiamondOvalOff,
  KeyDiamondRectangle,
  KeyDiamondRectangleOff,
  KeyHexagonRound,
  KeyHexagonRoundOff,
  KeyHexagonSquare,
  KeyHexagonSquareOff,
  KeyHexagonTriangle,
  KeyHexagonTriangleOff,
  KeyHexagonDiamond,
  KeyHexagonDiamondOff,
  KeyHexagonHexagon,
  KeyHexagonHexagonOff,
  KeyHexagonOctagon,
  KeyHexagonOctagonOff,
  KeyHexagonCircle,
  KeyHexagonCircleOff,
  KeyHexagonOval,
  KeyHexagonOvalOff,
  KeyHexagonRectangle,
  KeyHexagonRectangleOff,
  KeyOctagonRound,
  KeyOctagonRoundOff,
  KeyOctagonSquare,
  KeyOctagonSquareOff,
  KeyOctagonTriangle,
  KeyOctagonTriangleOff,
  KeyOctagonDiamond,
  KeyOctagonDiamondOff,
  KeyOctagonHexagon,
  KeyOctagonHexagonOff,
  KeyOctagonOctagon,
  KeyOctagonOctagonOff,
  KeyOctagonCircle,
  KeyOctagonCircleOff,
  KeyOctagonOval,
  KeyOctagonOvalOff,
  KeyOctagonRectangle,
  KeyOctagonRectangleOff,
  KeyCircleRound,
  KeyCircleRoundOff,
  KeyCircleSquare,
  KeyCircleSquareOff,
  KeyCircleTriangle,
  KeyCircleTriangleOff,
  KeyCircleDiamond,
  KeyCircleDiamondOff,
  KeyCircleHexagon,
  KeyCircleHexagonOff,
  KeyCircleOctagon,
  KeyCircleOctagonOff,
  KeyCircleCircle,
  KeyCircleCircleOff,
  KeyCircleOval,
  KeyCircleOvalOff,
  KeyCircleRectangle,
  KeyCircleRectangleOff,
  KeyOvalRound,
  KeyOvalRoundOff,
  KeyOvalSquare,
  KeyOvalSquareOff,
  KeyOvalTriangle,
  KeyOvalTriangleOff,
  KeyOvalDiamond,
  KeyOvalDiamondOff,
  KeyOvalHexagon,
  KeyOvalHexagonOff,
  KeyOvalOctagon,
  KeyOvalOctagonOff,
  KeyOvalCircle,
  KeyOvalCircleOff,
  KeyOvalOval,
  KeyOvalOvalOff,
  KeyOvalRectangle,
  KeyOvalRectangleOff,
  KeyRectangleRound,
  KeyRectangleRoundOff,
  KeyRectangleSquare,
  KeyRectangleSquareOff,
  KeyRectangleTriangle,
  KeyRectangleTriangleOff,
  KeyRectangleDiamond,
  KeyRectangleDiamondOff,
  KeyRectangleHexagon,
  KeyRectangleHexagonOff,
  KeyRectangleOctagon,
  KeyRectangleOctagonOff,
  KeyRectangleCircle,
  KeyRectangleCircleOff,
  KeyRectangleOval,
  KeyRectangleOvalOff,
  KeyRectangleRectangle,
  KeyRectangleRectangleOff
} from 'lucide-react';
import { Prospecto } from '../listadoJugadoresApi';

interface JugadoresTableProps {
  jugadores: Prospecto[];
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onSelect: (id: string) => void;
  onSelectAll: () => void;
  selected: Set<string>;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onFilterChange: (filters: FilterState) => void;
}

interface FilterState {
  posicion: string;
  edad: string;
  club: string;
  nacionalidad: string;
  nivel: string;
  potencial: string;
  estado: string;
}

type SortKey = 'nombre' | 'edad' | 'posicion' | 'clubActual' | 'nacionalidad' | 'nivel' | 'potencial' | 'estado';
type SortDir = 'asc' | 'desc';

const JugadoresTable: React.FC<JugadoresTableProps> = ({
  jugadores,
  onView,
  onEdit,
  onSelect,
  onSelectAll,
  selected,
  searchTerm,
  onSearchChange,
  onFilterChange
}) => {
  const [sortKey, setSortKey] = useState<SortKey>('nombre');
  const [sortDir, setSortDir] = useState<SortDir>('asc');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    posicion: '',
    edad: '',
    club: '',
    nacionalidad: '',
    nivel: '',
    potencial: '',
    estado: ''
  });

  // Sorting logic
  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  // Filter and sort data
  const filteredAndSortedJugadores = useMemo(() => {
    let filtered = jugadores.filter(jugador => {
      const matchesSearch = jugador.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           jugador.clubActual.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           jugador.nacionalidad.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesFilters = 
        (!filters.posicion || jugador.posicion.toLowerCase().includes(filters.posicion.toLowerCase())) &&
        (!filters.edad || jugador.edad.toString().includes(filters.edad)) &&
        (!filters.club || jugador.clubActual.toLowerCase().includes(filters.club.toLowerCase())) &&
        (!filters.nacionalidad || jugador.nacionalidad.toLowerCase().includes(filters.nacionalidad.toLowerCase())) &&
        (!filters.nivel || jugador.nivel === filters.nivel) &&
        (!filters.potencial || jugador.potencial === filters.potencial) &&
        (!filters.estado || jugador.estado === filters.estado);

      return matchesSearch && matchesFilters;
    });

    // Sort data
    filtered.sort((a, b) => {
      let aValue: any = a[sortKey];
      let bValue: any = b[sortKey];

      if (sortKey === 'edad') {
        aValue = a.edad;
        bValue = b.edad;
      }

      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (aValue < bValue) return sortDir === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [jugadores, searchTerm, filters, sortKey, sortDir]);

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const getNivelColor = (nivel: string) => {
    switch (nivel) {
      case 'Alto': return 'bg-green-100 text-green-800';
      case 'Medio': return 'bg-yellow-100 text-yellow-800';
      case 'Bajo': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPotencialColor = (potencial: string) => {
    switch (potencial) {
      case 'Estrella': return 'bg-purple-100 text-purple-800';
      case 'Alto': return 'bg-blue-100 text-blue-800';
      case 'Medio': return 'bg-yellow-100 text-yellow-800';
      case 'Bajo': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'fichado': return 'bg-green-100 text-green-800';
      case 'seguimiento activo': return 'bg-blue-100 text-blue-800';
      case 'en evaluación': return 'bg-yellow-100 text-yellow-800';
      case 'descartado': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const SortIcon: React.FC<{ active: boolean; dir: SortDir }> = ({ active, dir }) => {
    if (!active) return <ChevronDown className="w-4 h-4 text-gray-400" />;
    return dir === 'asc' ? 
      <ChevronUp className="w-4 h-4 text-blue-600" /> : 
      <ChevronDown className="w-4 h-4 text-blue-600" />;
  };

  const allSelected = jugadores.length > 0 && jugadores.every(j => selected.has(j.id));
  const someSelected = jugadores.some(j => selected.has(j.id)) && !allSelected;

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 overflow-hidden">
      {/* Header with search and filters */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar jugadores..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm"
              />
            </div>
          </div>
          
          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-2xl font-semibold hover:shadow-xl transition-all duration-300"
            >
              <Filter className="w-5 h-5" />
              Filtros
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl font-semibold hover:shadow-xl transition-all duration-300"
            >
              <Download className="w-5 h-5" />
              Exportar
            </motion.button>
          </div>
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-6 p-4 bg-gray-50 rounded-2xl"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <select
                value={filters.posicion}
                onChange={(e) => handleFilterChange('posicion', e.target.value)}
                className="px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 outline-none bg-white"
              >
                <option value="">Todas las posiciones</option>
                <option value="Portero">Portero</option>
                <option value="Defensa">Defensa</option>
                <option value="Mediocampista">Mediocampista</option>
                <option value="Delantero">Delantero</option>
              </select>

              <select
                value={filters.edad}
                onChange={(e) => handleFilterChange('edad', e.target.value)}
                className="px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 outline-none bg-white"
              >
                <option value="">Todas las edades</option>
                <option value="16-20">16-20 años</option>
                <option value="21-25">21-25 años</option>
                <option value="26-30">26-30 años</option>
                <option value="31+">31+ años</option>
              </select>

              <select
                value={filters.nivel}
                onChange={(e) => handleFilterChange('nivel', e.target.value)}
                className="px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 outline-none bg-white"
              >
                <option value="">Todos los niveles</option>
                <option value="Alto">Alto</option>
                <option value="Medio">Medio</option>
                <option value="Bajo">Bajo</option>
              </select>

              <select
                value={filters.estado}
                onChange={(e) => handleFilterChange('estado', e.target.value)}
                className="px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 outline-none bg-white"
              >
                <option value="">Todos los estados</option>
                <option value="seguimiento activo">Seguimiento Activo</option>
                <option value="en evaluación">En Evaluación</option>
                <option value="descartado">Descartado</option>
                <option value="fichado">Fichado</option>
              </select>
            </div>
          </motion.div>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white">
            <tr>
              <th className="py-4 px-6 text-left w-12">
                <input
                  type="checkbox"
                  checked={allSelected}
                  ref={(el) => {
                    if (el) el.indeterminate = someSelected;
                  }}
                  onChange={onSelectAll}
                  className="w-4 h-4 rounded border-gray-300 bg-white"
                />
              </th>
              <th className="py-4 px-6 text-left">Foto</th>
              <th 
                className="py-4 px-6 text-left cursor-pointer select-none hover:bg-white/10 transition-colors"
                onClick={() => handleSort('nombre')}
              >
                <div className="flex items-center gap-2">
                  Nombre
                  <SortIcon active={sortKey === 'nombre'} dir={sortDir} />
                </div>
              </th>
              <th 
                className="py-4 px-6 text-left cursor-pointer select-none hover:bg-white/10 transition-colors"
                onClick={() => handleSort('edad')}
              >
                <div className="flex items-center gap-2">
                  Edad
                  <SortIcon active={sortKey === 'edad'} dir={sortDir} />
                </div>
              </th>
              <th 
                className="py-4 px-6 text-left cursor-pointer select-none hover:bg-white/10 transition-colors"
                onClick={() => handleSort('posicion')}
              >
                <div className="flex items-center gap-2">
                  Posición
                  <SortIcon active={sortKey === 'posicion'} dir={sortDir} />
                </div>
              </th>
              <th 
                className="py-4 px-6 text-left cursor-pointer select-none hover:bg-white/10 transition-colors"
                onClick={() => handleSort('clubActual')}
              >
                <div className="flex items-center gap-2">
                  Club Actual
                  <SortIcon active={sortKey === 'clubActual'} dir={sortDir} />
                </div>
              </th>
              <th 
                className="py-4 px-6 text-left cursor-pointer select-none hover:bg-white/10 transition-colors"
                onClick={() => handleSort('nacionalidad')}
              >
                <div className="flex items-center gap-2">
                  Nacionalidad
                  <SortIcon active={sortKey === 'nacionalidad'} dir={sortDir} />
                </div>
              </th>
              <th 
                className="py-4 px-6 text-left cursor-pointer select-none hover:bg-white/10 transition-colors"
                onClick={() => handleSort('nivel')}
              >
                <div className="flex items-center gap-2">
                  Nivel
                  <SortIcon active={sortKey === 'nivel'} dir={sortDir} />
                </div>
              </th>
              <th 
                className="py-4 px-6 text-left cursor-pointer select-none hover:bg-white/10 transition-colors"
                onClick={() => handleSort('potencial')}
              >
                <div className="flex items-center gap-2">
                  Potencial
                  <SortIcon active={sortKey === 'potencial'} dir={sortDir} />
                </div>
              </th>
              <th 
                className="py-4 px-6 text-left cursor-pointer select-none hover:bg-white/10 transition-colors"
                onClick={() => handleSort('estado')}
              >
                <div className="flex items-center gap-2">
                  Estado
                  <SortIcon active={sortKey === 'estado'} dir={sortDir} />
                </div>
              </th>
              <th className="py-4 px-6 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredAndSortedJugadores.map((jugador, index) => (
              <motion.tr
                key={jugador.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="py-4 px-6">
                  <input
                    type="checkbox"
                    checked={selected.has(jugador.id)}
                    onChange={() => onSelect(jugador.id)}
                    className="w-4 h-4 rounded border-gray-300 bg-white"
                  />
                </td>
                <td className="py-4 px-6">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                    {jugador.fotoUrl ? (
                      <img 
                        src={jugador.fotoUrl} 
                        alt={jugador.nombre}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Users className="w-6 h-6 text-gray-400" />
                    )}
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="font-semibold text-gray-900">{jugador.nombre}</div>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-700">{jugador.edad} años</span>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-blue-500" />
                    <span className="text-gray-700">{jugador.posicion}</span>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-700">{jugador.clubActual}</span>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <span className="text-gray-700">{jugador.nacionalidad}</span>
                </td>
                <td className="py-4 px-6">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getNivelColor(jugador.nivel)}`}>
                    {jugador.nivel}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getPotencialColor(jugador.potencial)}`}>
                      {jugador.potencial}
                    </span>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getEstadoColor(jugador.estado)}`}>
                    {jugador.estado}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => onView(jugador.id)}
                      className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                      title="Ver detalles"
                    >
                      <Eye className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => onEdit(jugador.id)}
                      className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors"
                      title="Editar"
                    >
                      <Edit className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                      title="Más opciones"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </motion.button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer with stats */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Mostrando {filteredAndSortedJugadores.length} de {jugadores.length} jugadores
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span>{jugadores.filter(j => j.estado === 'seguimiento activo').length} en seguimiento</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-500" />
              <span>{jugadores.filter(j => j.potencial === 'Estrella').length} estrellas</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JugadoresTable;
