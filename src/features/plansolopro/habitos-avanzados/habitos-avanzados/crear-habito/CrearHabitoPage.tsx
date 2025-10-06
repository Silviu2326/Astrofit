import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Target, 
  Save, 
  Eye, 
  Users, 
  Calendar, 
  Bell,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Clock,
  Star,
  Zap
} from 'lucide-react';
import FormularioHabito from './components/FormularioHabito';
import SelectorFrecuencia from './components/SelectorFrecuencia';
import ConfiguracionRecordatorios from './components/ConfiguracionRecordatorios';
import VistaPrevia from './components/VistaPrevia';
import { crearHabitoApi } from './crearHabitoApi';

interface HabitoData {
  nombre: string;
  descripcion: string;
  categoria: string;
  frecuencia: string;
  diasSemana: number[];
  horaRecordatorio: string;
  duracion: number;
  objetivo: number;
  tipoObjetivo: 'veces' | 'minutos' | 'dias';
  dificultad: 'facil' | 'medio' | 'dificil';
  recompensa: string;
  recordatorios: boolean;
  notificaciones: boolean;
}

const CrearHabitoPage: React.FC = () => {
  const [habitoData, setHabitoData] = useState<HabitoData>({
    nombre: '',
    descripcion: '',
    categoria: '',
    frecuencia: 'diario',
    diasSemana: [],
    horaRecordatorio: '09:00',
    duracion: 30,
    objetivo: 1,
    tipoObjetivo: 'veces',
    dificultad: 'medio',
    recompensa: '',
    recordatorios: true,
    notificaciones: true,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const handleFormChange = (data: Partial<HabitoData>) => {
    setHabitoData((prev) => ({ ...prev, ...data }));
    setErrors([]);
  };

  const validateForm = (): boolean => {
    const newErrors: string[] = [];
    
    if (!habitoData.nombre.trim()) {
      newErrors.push('El nombre del hábito es obligatorio');
    }
    
    if (!habitoData.categoria) {
      newErrors.push('Debes seleccionar una categoría');
    }
    
    if (habitoData.objetivo <= 0) {
      newErrors.push('El objetivo debe ser mayor a 0');
    }
    
    if (habitoData.duracion <= 0) {
      newErrors.push('La duración debe ser mayor a 0');
    }
    
    if (habitoData.frecuencia === 'semanal' && habitoData.diasSemana.length === 0) {
      newErrors.push('Debes seleccionar al menos un día de la semana');
    }
    
    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      await crearHabitoApi.createHabit(habitoData);
      setShowSuccess(true);
      
      // Reset form after success
      setTimeout(() => {
        setHabitoData({
          nombre: '',
          descripcion: '',
          categoria: '',
          frecuencia: 'diario',
          diasSemana: [],
          horaRecordatorio: '09:00',
          duracion: 30,
          objetivo: 1,
          tipoObjetivo: 'veces',
          dificultad: 'medio',
          recompensa: '',
          recordatorios: true,
          notificaciones: true,
        });
        setShowSuccess(false);
      }, 3000);
      
    } catch (error) {
      console.error('Error al crear hábito:', error);
      setErrors(['Error al crear el hábito. Inténtalo de nuevo.']);
    } finally {
      setIsSubmitting(false);
    }
  };

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
              <Target className="w-10 h-10 text-yellow-300 animate-pulse" />
              <div className="absolute inset-0 w-10 h-10 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Crear <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Hábito</span>
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl leading-relaxed">
            Diseña hábitos personalizados para tus clientes desde tu panel de entrenador
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
                <Target className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Hábitos Activos</p>
                <p className="text-2xl font-bold text-gray-900">24</p>
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
                <p className="text-sm font-medium text-gray-600 mb-1">Clientes Participando</p>
                <p className="text-2xl font-bold text-gray-900">156</p>
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
                <p className="text-sm font-medium text-gray-600 mb-1">Tasa de Éxito</p>
                <p className="text-2xl font-bold text-gray-900">78.5%</p>
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
                <Star className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Puntuación Media</p>
                <p className="text-2xl font-bold text-gray-900">4.7</p>
              </div>
            </div>
          </motion.div>
        </div>

      {/* Success Message */}
      {showSuccess && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl"
        >
          <div className="flex items-center gap-3">
            <CheckCircle className="w-6 h-6 text-green-600" />
            <div>
              <h3 className="font-semibold text-green-800">¡Hábito creado exitosamente!</h3>
              <p className="text-sm text-green-700">El hábito ha sido guardado y está listo para asignar a tus clientes.</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Error Messages */}
      {errors.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl"
        >
          <div className="flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-red-600 mt-0.5" />
            <div>
              <h3 className="font-semibold text-red-800 mb-2">Por favor corrige los siguientes errores:</h3>
              <ul className="text-sm text-red-700 space-y-1">
                {errors.map((error, index) => (
                  <li key={index}>• {error}</li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <FormularioHabito habitoData={habitoData} onFormChange={handleFormChange} />
          <SelectorFrecuencia habitoData={habitoData} onFormChange={handleFormChange} />
          <ConfiguracionRecordatorios habitoData={habitoData} onFormChange={handleFormChange} />
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Save className="w-5 h-5 text-green-600" />
              Acciones
            </h3>
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg shadow-lg hover:from-green-700 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Creando...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Crear Hábito
                  </>
                )}
              </button>
              
              <button
                type="button"
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Guardar Borrador
              </button>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <VistaPrevia habitoData={habitoData} />
          
          {/* Preview Stats */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Eye className="w-5 h-5 text-blue-600" />
              Vista Previa del Hábito
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-600">Dificultad:</span>
                <span className="font-semibold capitalize">{habitoData.dificultad}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                <span className="text-gray-600">Duración:</span>
                <span className="font-semibold text-blue-600">{habitoData.duracion} días</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg border-2 border-green-200">
                <span className="text-gray-600 font-semibold">Objetivo:</span>
                <span className="font-bold text-green-600 text-lg">
                  {habitoData.objetivo} {habitoData.tipoObjetivo}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </form>
    </div>
  );
};

export default CrearHabitoPage;
