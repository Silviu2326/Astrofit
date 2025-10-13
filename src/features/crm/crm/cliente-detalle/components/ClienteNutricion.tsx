import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Apple, 
  Utensils, 
  Target, 
  TrendingUp, 
  Calendar, 
  Plus,
  Edit3,
  Camera,
  BarChart3,
  Clock,
  Zap,
  Heart,
  Scale,
  Droplets,
  Flame
} from 'lucide-react';
import { Cliente } from '../clienteDetalleApi';

interface ClienteNutricionProps {
  cliente: Cliente;
}

interface Comida {
  id: string;
  nombre: string;
  tipo: 'Desayuno' | 'Almuerzo' | 'Cena' | 'Snack';
  calorias: number;
  proteinas: number;
  carbohidratos: number;
  grasas: number;
  fecha: string;
  hora: string;
  foto?: string;
  completada: boolean;
}

interface PlanNutricional {
  id: string;
  nombre: string;
  descripcion: string;
  objetivo: 'Perder peso' | 'Ganar músculo' | 'Mantener' | 'Definir';
  caloriasObjetivo: number;
  proteinasObjetivo: number;
  carbohidratosObjetivo: number;
  grasasObjetivo: number;
  activo: boolean;
  fechaInicio: string;
  fechaFin: string;
}

interface MacroDiario {
  fecha: string;
  calorias: { objetivo: number; consumido: number; restante: number };
  proteinas: { objetivo: number; consumido: number; restante: number };
  carbohidratos: { objetivo: number; consumido: number; restante: number };
  grasas: { objetivo: number; consumido: number; restante: number };
}

const ClienteNutricion: React.FC<ClienteNutricionProps> = ({ cliente }) => {
  const [activeView, setActiveView] = useState<'dashboard' | 'comidas' | 'planes' | 'macros' | 'recetas'>('dashboard');
  const [showAddComida, setShowAddComida] = useState(false);
  const [showAddPlan, setShowAddPlan] = useState(false);

  // Datos mock para demostración
  const comidas: Comida[] = [
    {
      id: '1',
      nombre: 'Avena con frutas',
      tipo: 'Desayuno',
      calorias: 350,
      proteinas: 12,
      carbohidratos: 45,
      grasas: 8,
      fecha: '2024-01-15',
      hora: '08:00',
      completada: true
    },
    {
      id: '2',
      nombre: 'Pechuga de pollo con arroz',
      tipo: 'Almuerzo',
      calorias: 450,
      proteinas: 35,
      carbohidratos: 40,
      grasas: 12,
      fecha: '2024-01-15',
      hora: '13:00',
      completada: true
    },
    {
      id: '3',
      nombre: 'Ensalada de atún',
      tipo: 'Cena',
      calorias: 280,
      proteinas: 25,
      carbohidratos: 15,
      grasas: 15,
      fecha: '2024-01-15',
      hora: '20:00',
      completada: false
    }
  ];

  const planes: PlanNutricional[] = [
    {
      id: '1',
      nombre: 'Plan Definición',
      descripcion: 'Plan enfocado en pérdida de grasa manteniendo músculo',
      objetivo: 'Definir',
      caloriasObjetivo: 1800,
      proteinasObjetivo: 150,
      carbohidratosObjetivo: 180,
      grasasObjetivo: 60,
      activo: true,
      fechaInicio: '2024-01-01',
      fechaFin: '2024-03-01'
    }
  ];

  const macroDiario: MacroDiario = {
    fecha: '2024-01-15',
    calorias: { objetivo: 1800, consumido: 1080, restante: 720 },
    proteinas: { objetivo: 150, consumido: 72, restante: 78 },
    carbohidratos: { objetivo: 180, consumido: 100, restante: 80 },
    grasas: { objetivo: 60, consumido: 35, restante: 25 }
  };

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case 'Desayuno': return 'bg-yellow-100 text-yellow-800';
      case 'Almuerzo': return 'bg-orange-100 text-orange-800';
      case 'Cena': return 'bg-blue-100 text-blue-800';
      case 'Snack': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getObjetivoColor = (objetivo: string) => {
    switch (objetivo) {
      case 'Perder peso': return 'bg-red-100 text-red-800';
      case 'Ganar músculo': return 'bg-green-100 text-green-800';
      case 'Mantener': return 'bg-blue-100 text-blue-800';
      case 'Definir': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const DashboardView = () => (
    <div className="space-y-6">
      {/* Métricas principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-2xl border border-red-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-red-600">Calorías Hoy</p>
              <p className="text-2xl font-bold text-red-900">1,080</p>
              <p className="text-xs text-red-600">de 1,800 objetivo</p>
            </div>
            <Flame className="w-8 h-8 text-red-600" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl border border-blue-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600">Proteínas</p>
              <p className="text-2xl font-bold text-blue-900">72g</p>
              <p className="text-xs text-blue-600">de 150g objetivo</p>
            </div>
            <Zap className="w-8 h-8 text-blue-600" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-2xl border border-green-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600">Carbohidratos</p>
              <p className="text-2xl font-bold text-green-900">100g</p>
              <p className="text-xs text-green-600">de 180g objetivo</p>
            </div>
            <Scale className="w-8 h-8 text-green-600" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-2xl border border-purple-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-purple-600">Grasas</p>
              <p className="text-2xl font-bold text-purple-900">35g</p>
              <p className="text-xs text-purple-600">de 60g objetivo</p>
            </div>
            <Droplets className="w-8 h-8 text-purple-600" />
          </div>
        </motion.div>
      </div>

      {/* Progreso de macros */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Progreso de Macros</h3>
        <div className="space-y-4">
          {[
            { nombre: 'Calorías', datos: macroDiario.calorias, color: 'from-red-500 to-red-600' },
            { nombre: 'Proteínas', datos: macroDiario.proteinas, color: 'from-blue-500 to-blue-600' },
            { nombre: 'Carbohidratos', datos: macroDiario.carbohidratos, color: 'from-green-500 to-green-600' },
            { nombre: 'Grasas', datos: macroDiario.grasas, color: 'from-purple-500 to-purple-600' }
          ].map((macro) => {
            const porcentaje = (macro.datos.consumido / macro.datos.objetivo) * 100;
            return (
              <div key={macro.nombre} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-gray-700">{macro.nombre}</span>
                  <span className="text-gray-600">
                    {macro.datos.consumido}g / {macro.datos.objetivo}g
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full bg-gradient-to-r ${macro.color} transition-all duration-500`}
                    style={{ width: `${Math.min(porcentaje, 100)}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>{porcentaje.toFixed(1)}% completado</span>
                  <span>{macro.datos.restante}g restantes</span>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Comidas del día */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Comidas de Hoy</h3>
          <button
            onClick={() => setShowAddComida(true)}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Añadir Comida
          </button>
        </div>
        <div className="space-y-3">
          {comidas.map((comida) => (
            <div key={comida.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-4">
                <div className={`w-3 h-3 rounded-full ${comida.completada ? 'bg-green-500' : 'bg-gray-300'}`} />
                <div>
                  <h4 className="font-medium text-gray-900">{comida.nombre}</h4>
                  <p className="text-sm text-gray-600">{comida.hora}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTipoColor(comida.tipo)}`}>
                  {comida.tipo}
                </span>
                <div className="text-right">
                  <p className="font-medium text-gray-900">{comida.calorias} cal</p>
                  <p className="text-xs text-gray-600">
                    P: {comida.proteinas}g | C: {comida.carbohidratos}g | G: {comida.grasas}g
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );

  const ComidasView = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Registro de Comidas</h3>
        <button
          onClick={() => setShowAddComida(true)}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Nueva Comida
        </button>
      </div>

      <div className="space-y-4">
        {comidas.map((comida) => (
          <motion.div
            key={comida.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-indigo-100 rounded-xl">
                  <Utensils className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">{comida.nombre}</h4>
                  <p className="text-sm text-gray-600 flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {comida.hora} - {new Date(comida.fecha).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTipoColor(comida.tipo)}`}>
                  {comida.tipo}
                </span>
                <div className={`w-3 h-3 rounded-full ${comida.completada ? 'bg-green-500' : 'bg-gray-300'}`} />
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div className="text-center p-3 bg-red-50 rounded-lg">
                <p className="text-sm font-medium text-red-600">Calorías</p>
                <p className="text-xl font-bold text-red-900">{comida.calorias}</p>
              </div>
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <p className="text-sm font-medium text-blue-600">Proteínas</p>
                <p className="text-xl font-bold text-blue-900">{comida.proteinas}g</p>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <p className="text-sm font-medium text-green-600">Carbohidratos</p>
                <p className="text-xl font-bold text-green-900">{comida.carbohidratos}g</p>
              </div>
              <div className="text-center p-3 bg-purple-50 rounded-lg">
                <p className="text-sm font-medium text-purple-600">Grasas</p>
                <p className="text-xl font-bold text-purple-900">{comida.grasas}g</p>
              </div>
            </div>

            {comida.foto && (
              <div className="mb-4">
                <img
                  src={comida.foto}
                  alt={comida.nombre}
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
            )}

            <div className="flex items-center justify-end gap-2">
              <button className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                <Edit3 className="w-4 h-4" />
              </button>
              <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                <Camera className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const PlanesView = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Planes Nutricionales</h3>
        <button
          onClick={() => setShowAddPlan(true)}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Nuevo Plan
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {planes.map((plan) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-indigo-100 rounded-xl">
                  <Target className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">{plan.nombre}</h4>
                  <p className="text-sm text-gray-600">{plan.descripcion}</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getObjetivoColor(plan.objetivo)}`}>
                {plan.objetivo}
              </span>
            </div>

            <div className="space-y-3 mb-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-red-50 rounded-lg">
                  <p className="text-sm font-medium text-red-600">Calorías</p>
                  <p className="text-lg font-bold text-red-900">{plan.caloriasObjetivo}</p>
                </div>
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm font-medium text-blue-600">Proteínas</p>
                  <p className="text-lg font-bold text-blue-900">{plan.proteinasObjetivo}g</p>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <p className="text-sm font-medium text-green-600">Carbohidratos</p>
                  <p className="text-lg font-bold text-green-900">{plan.carbohidratosObjetivo}g</p>
                </div>
                <div className="text-center p-3 bg-purple-50 rounded-lg">
                  <p className="text-sm font-medium text-purple-600">Grasas</p>
                  <p className="text-lg font-bold text-purple-900">{plan.grasasObjetivo}g</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                <p>Inicio: {new Date(plan.fechaInicio).toLocaleDateString()}</p>
                <p>Fin: {new Date(plan.fechaFin).toLocaleDateString()}</p>
              </div>
              <div className="flex items-center gap-2">
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm">
                  Ver Detalles
                </button>
                <button className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                  <Edit3 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Navegación de vistas */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        {[
          { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
          { id: 'comidas', label: 'Comidas', icon: Utensils },
          { id: 'planes', label: 'Planes', icon: Target },
          { id: 'macros', label: 'Macros', icon: TrendingUp },
          { id: 'recetas', label: 'Recetas', icon: Apple },
        ].map((view) => (
          <button
            key={view.id}
            onClick={() => setActiveView(view.id as any)}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeView === view.id
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <view.icon className="w-4 h-4" />
            {view.label}
          </button>
        ))}
      </div>

      {/* Contenido de la vista activa */}
      {activeView === 'dashboard' && <DashboardView />}
      {activeView === 'comidas' && <ComidasView />}
      {activeView === 'planes' && <PlanesView />}
      {activeView === 'macros' && <div>Vista de Macros (en desarrollo)</div>}
      {activeView === 'recetas' && <div>Vista de Recetas (en desarrollo)</div>}
    </div>
  );
};

export default ClienteNutricion;

