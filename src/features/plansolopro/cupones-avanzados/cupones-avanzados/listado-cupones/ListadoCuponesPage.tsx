import React from 'react';
import { motion } from 'framer-motion';
import { 
  Tag, 
  Plus, 
  BarChart3, 
  Search, 
  Filter,
  Download,
  RefreshCw,
  Eye,
  Edit,
  Trash2,
  Copy,
  Calendar,
  Users,
  DollarSign,
  TrendingUp
} from 'lucide-react';
import { TablaCupones } from './components/TablaCupones';
import { FiltrosCupones } from './components/FiltrosCupones';

const ListadoCuponesPage: React.FC = () => {
  // Mock data for demonstration
  const cupones = [
    {
      id: '1',
      codigo: 'VERANO20',
      tipo: 'porcentaje',
      valor: 20,
      fechaInicio: '2023-06-01',
      fechaFin: '2023-08-31',
      usosActuales: 150,
      limiteUsos: 500,
      estado: 'activo',
    },
    {
      id: '2',
      codigo: 'ENVIOFREE',
      tipo: 'fijo',
      valor: 5,
      fechaInicio: '2023-01-01',
      fechaFin: '2023-12-31',
      usosActuales: 1000,
      limiteUsos: 1000,
      estado: 'agotado',
    },
    {
      id: '3',
      codigo: 'NAVIDAD10',
      tipo: 'porcentaje',
      valor: 10,
      fechaInicio: '2022-12-01',
      fechaFin: '2022-12-25',
      usosActuales: 300,
      limiteUsos: 300,
      estado: 'caducado',
    },
    {
      id: '4',
      codigo: 'NUEVOCLIENTE',
      tipo: 'porcentaje',
      valor: 15,
      fechaInicio: '2024-01-01',
      fechaFin: '2024-12-31',
      usosActuales: 50,
      limiteUsos: 200,
      estado: 'activo',
    },
  ];

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
              <Tag className="w-10 h-10 text-yellow-300 animate-pulse" />
              <div className="absolute inset-0 w-10 h-10 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Listado <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Cupones</span>
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl leading-relaxed">
            Gestiona todos tus cupones de descuento desde tu panel de entrenador
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
              <Tag className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Total Cupones</p>
              <p className="text-2xl font-bold text-gray-900">{cupones.length}</p>
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
              <p className="text-sm font-medium text-gray-600 mb-1">Usos Totales</p>
              <p className="text-2xl font-bold text-gray-900">1,500</p>
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
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Descuento Total</p>
              <p className="text-2xl font-bold text-gray-900">€3,250</p>
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
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Conversión</p>
              <p className="text-2xl font-bold text-gray-900">24.5%</p>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="max-w-[1920px] mx-auto px-6">
        <FiltrosCupones />
        <TablaCupones cupones={cupones} />
      </div>
    </div>
  );
};

export default ListadoCuponesPage;