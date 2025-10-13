import React, { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronUp, ChevronDown, Eye, Edit, Star, MapPin, Calendar, Target, TrendingUp, Users, Filter, Search, MoreVertical, Download, Share2, Plus, Trash2, Mail, FileText, BarChart3, Settings, X, Check, AlertCircle, Info, Play, Pause, RotateCcw, Save, Upload, Copy, ExternalLink, Heart, Flag, Award, Zap, Shield, Clock, DollarSign, Globe, Phone, MessageSquare, Camera, Video, Music, Bookmark, Tag, Layers, Grid, List, Maximize, Minimize, RefreshCw, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, SortAsc, SortDesc, ArrowUpDown, FilterX, CheckCircle, XCircle, AlertTriangle, ThumbsUp, ThumbsDown, MessageCircle, Send, Archive, Unarchive, Lock, Unlock, EyeOff, Edit3, Trash, MoreHorizontal, UserPlus, UserMinus, UserCheck, UserX, StarOff, StarHalf, TrendingDown, Activity, PieChart, LineChart, BarChart, Database, Server, Cloud, Wifi, WifiOff, Signal, Battery, Power, Volume2, VolumeX, Mic, Headphones, Speaker, Radio, Tv, Monitor, Laptop, Smartphone, Tablet, Watch, Gamepad2, Controller, Joystick, Mouse, Keyboard, Printer, Scanner, Fax, Copier, HardDrive, SdCard, Usb, Cable, Plug, Outlet, Lightbulb, Lamp, Flashlight, Candle, Fire, Flame, Sparkles, Magic, Wand, Hat, Crown, Gem, Diamond, Ruby, Emerald, Sapphire, Topaz, Amethyst, Pearl, Opal, Jade, Coral, Amber, Ivory, Bone, Horn, Antler, Feather, Wing, Angel, Devil, Ghost, Skull, Cross, StarOfDavid, Crescent, Sun, Moon, Planet, Comet, Meteor, Asteroid, Satellite, Rocket, Spaceship, Ufo, Alien, Robot, Cyborg, Android, Ios, Windows, Linux, Mac, Chrome, Firefox, Safari, Edge, Opera, Brave, Tor, Vpn, Proxy, Firewall, ShieldCheck, ShieldAlert, ShieldX, ShieldPlus, ShieldMinus, ShieldQuestion, ShieldExclamation, ShieldInfo, ShieldBan, ShieldOff, ShieldOn, Key, LockKeyhole, UnlockKeyhole, KeyRound, KeySquare, KeyTriangle, KeyDiamond, KeyHexagon, KeyOctagon, KeyCircle, KeyOval, KeyRectangle
} from 'lucide-react';
import { Prospecto } from '../listadoJugadoresApi';

interface JugadoresTableAdvancedProps {
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

const JugadoresTableAdvanced: React.FC<JugadoresTableAdvancedProps> = ({
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
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [viewMode, setViewMode] = useState<'table' | 'grid' | 'list'>('table');
  const [showColumns, setShowColumns] = useState(false);
  const [exportFormat, setExportFormat] = useState<'excel' | 'pdf' | 'csv'>('excel');
  const [filters, setFilters] = useState<FilterState>({
    posicion: '',
    edad: '',
    club: '',
    nacionalidad: '',
    nivel: '',
    potencial: '',
    estado: ''
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Pagination
  const totalPages = Math.ceil(jugadores.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

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

  const paginatedJugadores = filteredAndSortedJugadores.slice(startIndex, endIndex);

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

  const handleBulkAction = (action: string) => {
    console.log(`Bulk action: ${action} on ${selected.size} players`);
    // Implement bulk actions
  };

  const handleExport = () => {
    console.log(`Exporting as ${exportFormat}`);
    // Implement export functionality
  };

  const handleImport = () => {
    fileInputRef.current?.click();
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log('Importing file:', file.name);
      // Implement import functionality
    }
  };

  return (
    <div className="space-y-6">
      {/* Advanced Header with Multiple Controls */}
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 p-6">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between mb-6">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Búsqueda avanzada..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm"
              />
            </div>
          </div>
          
          <div className="flex flex-wrap gap-3">
            {/* View Mode Toggle */}
            <div className="flex items-center gap-1 bg-gray-100 rounded-2xl p-1">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setViewMode('table')}
                className={`p-2 rounded-xl transition-all duration-300 ${
                  viewMode === 'table' ? 'bg-white shadow-md' : 'text-gray-600'
                }`}
              >
                <Grid className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-xl transition-all duration-300 ${
                  viewMode === 'grid' ? 'bg-white shadow-md' : 'text-gray-600'
                }`}
              >
                <List className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Action Buttons */}
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
              onClick={() => setShowBulkActions(!showBulkActions)}
              className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl font-semibold hover:shadow-xl transition-all duration-300"
            >
              <Settings className="w-5 h-5" />
              Acciones
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowAnalytics(!showAnalytics)}
              className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-2xl font-semibold hover:shadow-xl transition-all duration-300"
            >
              <BarChart3 className="w-5 h-5" />
              Analytics
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleExport}
              className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-2xl font-semibold hover:shadow-xl transition-all duration-300"
            >
              <Download className="w-5 h-5" />
              Exportar
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleImport}
              className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-2xl font-semibold hover:shadow-xl transition-all duration-300"
            >
              <Upload className="w-5 h-5" />
              Importar
            </motion.button>
          </div>
        </div>

        {/* Advanced Filters */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6 p-4 bg-gray-50 rounded-2xl"
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
        </AnimatePresence>

        {/* Bulk Actions */}
        <AnimatePresence>
          {showBulkActions && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6 p-4 bg-yellow-50 rounded-2xl border border-yellow-200"
            >
              <div className="flex flex-wrap gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleBulkAction('export')}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-600 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Exportar Seleccionados
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleBulkAction('email')}
                  className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-xl font-semibold hover:bg-green-600 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  Enviar Email
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleBulkAction('status')}
                  className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-xl font-semibold hover:bg-purple-600 transition-colors"
                >
                  <Settings className="w-4 h-4" />
                  Cambiar Estado
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleBulkAction('compare')}
                  className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transition-colors"
                >
                  <BarChart3 className="w-4 h-4" />
                  Comparar
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Analytics Dashboard */}
        <AnimatePresence>
          {showAnalytics && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border border-purple-200"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-xl shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Users className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Total Jugadores</p>
                      <p className="text-2xl font-bold text-gray-900">{jugadores.length}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <TrendingUp className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">En Seguimiento</p>
                      <p className="text-2xl font-bold text-gray-900">{jugadores.filter(j => j.estado === 'seguimiento activo').length}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-yellow-100 rounded-lg">
                      <Star className="w-6 h-6 text-yellow-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Estrellas</p>
                      <p className="text-2xl font-bold text-gray-900">{jugadores.filter(j => j.potencial === 'Estrella').length}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <Award className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Fichados</p>
                      <p className="text-2xl font-bold text-gray-900">{jugadores.filter(j => j.estado === 'fichado').length}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Advanced Table */}
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 overflow-hidden">
        {/* Table Header with Pagination Controls */}
        <div className="px-6 py-4 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h3 className="text-xl font-bold">Listado de Jugadores</h3>
              <div className="flex items-center gap-2">
                <span className="text-sm opacity-90">Mostrando {startIndex + 1}-{Math.min(endIndex, filteredAndSortedJugadores.length)} de {filteredAndSortedJugadores.length}</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <label className="text-sm opacity-90">Por página:</label>
                <select
                  value={itemsPerPage}
                  onChange={(e) => setItemsPerPage(Number(e.target.value))}
                  className="px-3 py-1 rounded-lg bg-white/20 text-white border border-white/30 focus:bg-white/30 outline-none"
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
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
                  className="py-4 px-6 text-left cursor-pointer select-none hover:bg-gray-100 transition-colors"
                  onClick={() => handleSort('nombre')}
                >
                  <div className="flex items-center gap-2">
                    Nombre
                    <SortIcon active={sortKey === 'nombre'} dir={sortDir} />
                  </div>
                </th>
                <th 
                  className="py-4 px-6 text-left cursor-pointer select-none hover:bg-gray-100 transition-colors"
                  onClick={() => handleSort('edad')}
                >
                  <div className="flex items-center gap-2">
                    Edad
                    <SortIcon active={sortKey === 'edad'} dir={sortDir} />
                  </div>
                </th>
                <th 
                  className="py-4 px-6 text-left cursor-pointer select-none hover:bg-gray-100 transition-colors"
                  onClick={() => handleSort('posicion')}
                >
                  <div className="flex items-center gap-2">
                    Posición
                    <SortIcon active={sortKey === 'posicion'} dir={sortDir} />
                  </div>
                </th>
                <th 
                  className="py-4 px-6 text-left cursor-pointer select-none hover:bg-gray-100 transition-colors"
                  onClick={() => handleSort('clubActual')}
                >
                  <div className="flex items-center gap-2">
                    Club Actual
                    <SortIcon active={sortKey === 'clubActual'} dir={sortDir} />
                  </div>
                </th>
                <th 
                  className="py-4 px-6 text-left cursor-pointer select-none hover:bg-gray-100 transition-colors"
                  onClick={() => handleSort('nacionalidad')}
                >
                  <div className="flex items-center gap-2">
                    Nacionalidad
                    <SortIcon active={sortKey === 'nacionalidad'} dir={sortDir} />
                  </div>
                </th>
                <th 
                  className="py-4 px-6 text-left cursor-pointer select-none hover:bg-gray-100 transition-colors"
                  onClick={() => handleSort('nivel')}
                >
                  <div className="flex items-center gap-2">
                    Nivel
                    <SortIcon active={sortKey === 'nivel'} dir={sortDir} />
                  </div>
                </th>
                <th 
                  className="py-4 px-6 text-left cursor-pointer select-none hover:bg-gray-100 transition-colors"
                  onClick={() => handleSort('potencial')}
                >
                  <div className="flex items-center gap-2">
                    Potencial
                    <SortIcon active={sortKey === 'potencial'} dir={sortDir} />
                  </div>
                </th>
                <th 
                  className="py-4 px-6 text-left cursor-pointer select-none hover:bg-gray-100 transition-colors"
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
              {paginatedJugadores.map((jugador, index) => (
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

        {/* Pagination */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Mostrando {startIndex + 1} a {Math.min(endIndex, filteredAndSortedJugadores.length)} de {filteredAndSortedJugadores.length} jugadores
            </div>
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronsLeft className="w-4 h-4" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
              </motion.button>
              
              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const page = i + 1;
                  return (
                    <motion.button
                      key={page}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setCurrentPage(page)}
                      className={`px-3 py-2 rounded-lg border transition-colors ${
                        currentPage === page
                          ? 'bg-blue-500 text-white border-blue-500'
                          : 'border-gray-300 hover:bg-gray-100'
                      }`}
                    >
                      {page}
                    </motion.button>
                  );
                })}
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-4 h-4" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronsRight className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Hidden file input for import */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".xlsx,.xls,.csv"
        onChange={handleFileUpload}
        className="hidden"
      />
    </div>
  );
};

export default JugadoresTableAdvanced;



