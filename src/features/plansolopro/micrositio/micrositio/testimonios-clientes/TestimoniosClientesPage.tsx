import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Star, 
  Users, 
  TrendingUp, 
  Download,
  RefreshCw,
  Eye,
  Filter,
  Search,
  Plus,
  Edit,
  Trash2,
  Share,
  BookOpen,
  Zap,
  Target,
  Activity,
  Award,
  Save,
  Upload,
  Settings,
  MessageCircle
} from 'lucide-react';
import { GaleriaTestimonios } from './components/GaleriaTestimonios';
import { FiltrosTestimonios } from './components/FiltrosTestimonios';
import { CarruselPrincipal } from './components/CarruselPrincipal';
import { Testimonio } from './testimoniosClientesApi';

const mockTestimonios: Testimonio[] = [
  {
    id: '1',
    author: 'Ana G.',
    comment: '¡Excelente servicio! Mi negocio ha crecido exponencialmente gracias a ellos.',
    rating: 5,
    serviceType: 'Marketing Digital',
    photo: 'https://via.placeholder.com/150/FF5733/FFFFFF?text=Ana',
    highlighted: true,
  },
  {
    id: '2',
    author: 'Carlos R.',
    comment: 'Profesionales y muy atentos. Recomiendo sus servicios al 100%.',
    rating: 4,
    serviceType: 'Desarrollo Web',
    photo: 'https://via.placeholder.com/150/33FF57/FFFFFF?text=Carlos',
    highlighted: false,
  },
  {
    id: '3',
    author: 'Marta P.',
    comment: 'Me encantó el diseño de mi nueva web. Superaron mis expectativas.',
    rating: 5,
    serviceType: 'Diseño Gráfico',
    photo: 'https://via.placeholder.com/150/3357FF/FFFFFF?text=Marta',
    highlighted: true,
  },
  {
    id: '4',
    author: 'Javier S.',
    comment: 'Muy buen soporte técnico y resultados visibles en poco tiempo.',
    rating: 4,
    serviceType: 'Marketing Digital',
    photo: 'https://via.placeholder.com/150/FFFF33/000000?text=Javier',
    highlighted: false,
  },
  {
    id: '5',
    author: 'Laura M.',
    comment: 'Una experiencia fantástica, el equipo es muy creativo y eficiente.',
    rating: 5,
    serviceType: 'Desarrollo Web',
    photo: 'https://via.placeholder.com/150/FF33FF/FFFFFF?text=Laura',
    highlighted: false,
  },
];

const TestimoniosClientesPage: React.FC = () => {
  const [filteredTestimonios, setFilteredTestimonios] = useState<Testimonio[]>(mockTestimonios);
  const [filters, setFilters] = useState<{ serviceType: string; rating: number | null }>({
    serviceType: 'Todos',
    rating: null,
  });

  const handleFilterChange = (newFilters: { serviceType?: string; rating?: number | null }) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);

    let tempTestimonios = mockTestimonios;

    if (updatedFilters.serviceType && updatedFilters.serviceType !== 'Todos') {
      tempTestimonios = tempTestimonios.filter(t => t.serviceType === updatedFilters.serviceType);
    }

    if (updatedFilters.rating !== null) {
      tempTestimonios = tempTestimonios.filter(t => t.rating >= updatedFilters.rating!);
    }

    setFilteredTestimonios(tempTestimonios);
  };

  const highlightedTestimonios = mockTestimonios.filter(t => t.highlighted);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/30 pb-12">
      {/* Hero Header con gradiente */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl shadow-2xl mb-8 p-8 md:p-12"
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
          <div className="flex items-center gap-3 mb-4">
            <div className="relative">
              <Star className="w-10 h-10 text-yellow-300 animate-pulse" />
              <div className="absolute inset-0 w-10 h-10 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Gestión <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Testimonios</span>
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl leading-relaxed">
            Gestiona los testimonios de tus clientes desde tu panel de entrenador
          </p>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-lg">
              <Star className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Testimonios Totales</p>
              <p className="text-2xl font-bold text-gray-900">47</p>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Clientes Activos</p>
              <p className="text-2xl font-bold text-gray-900">23</p>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Puntuación Media</p>
              <p className="text-2xl font-bold text-gray-900">4.8</p>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Destacados</p>
              <p className="text-2xl font-bold text-gray-900">12</p>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="max-w-[1920px] mx-auto px-6">
        {/* Panel de Control del Entrenador */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg">
                <Settings className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">Gestión de Testimonios</h3>
            </div>
            <p className="text-gray-600 mb-4">Modera, destaca y gestiona los testimonios de tus clientes</p>
            <div className="flex gap-3">
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all">
                <Plus className="w-4 h-4 inline mr-2" />
                Agregar Testimonio
              </button>
              <button className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-green-700 hover:to-blue-700 transition-all">
                <Edit className="w-4 h-4 inline mr-2" />
                Moderar
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-lg">
                <Eye className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">Vista Previa</h3>
            </div>
            <p className="text-gray-600 mb-4">Ve cómo se ven tus testimonios para los clientes</p>
            <button className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-2 px-4 rounded-lg hover:from-green-700 hover:to-blue-700 transition-all">
              <Eye className="w-4 h-4 inline mr-2" />
              Ver Vista Previa
            </button>
          </motion.div>
        </div>

        {/* Filtros y Galería */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 mb-6"
        >
          <FiltrosTestimonios onFilterChange={handleFilterChange} currentFilters={filters} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow-lg">
              <Star className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">Testimonios de Clientes</h3>
          </div>
          <GaleriaTestimonios testimonios={filteredTestimonios} />
        </motion.div>
      </div>
    </div>
  );
};

export default TestimoniosClientesPage;
