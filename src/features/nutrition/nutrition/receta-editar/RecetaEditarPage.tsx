import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Edit3, Save, Copy, Trash2, Upload, ChevronRight,
  Clock, Activity, TrendingUp, Users, CheckCircle
} from 'lucide-react';
import RecetaEditor from './components/RecetaEditor';
import IngredientesManager from './components/IngredientesManager';
import PasosManager from './components/PasosManager';
import NutricionUpdater from './components/NutricionUpdater';
import HistorialVersiones from './components/HistorialVersiones';

// Nuevo componente para Estadísticas de Uso
const EstadisticasUso: React.FC<{ stats: any }> = ({ stats }) => {
  return (
    <div className="space-y-6">
      {/* Métricas principales */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg p-6 border border-white/50 relative overflow-hidden"
        >
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-gradient-to-br from-blue-200 to-indigo-200 rounded-full blur-2xl opacity-20"></div>
          <div className="relative z-10">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white mb-3 shadow-lg">
              <Activity className="w-6 h-6" />
            </div>
            <p className="text-sm font-semibold text-gray-600 mb-1">Veces Usada</p>
            <p className="text-3xl font-bold text-gray-900">{stats.vecesUsada}</p>
            <p className="text-xs text-gray-500 mt-1">En dietas activas</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg p-6 border border-white/50 relative overflow-hidden"
        >
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full blur-2xl opacity-20"></div>
          <div className="relative z-10">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white mb-3 shadow-lg">
              <Users className="w-6 h-6" />
            </div>
            <p className="text-sm font-semibold text-gray-600 mb-1">Clientes</p>
            <p className="text-3xl font-bold text-gray-900">{stats.clientesUnicos}</p>
            <p className="text-xs text-gray-500 mt-1">Han consumido esta receta</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg p-6 border border-white/50 relative overflow-hidden"
        >
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-gradient-to-br from-yellow-200 to-orange-200 rounded-full blur-2xl opacity-20"></div>
          <div className="relative z-10">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-600 flex items-center justify-center text-white mb-3 shadow-lg">
              <TrendingUp className="w-6 h-6" />
            </div>
            <p className="text-sm font-semibold text-gray-600 mb-1">Rating Promedio</p>
            <div className="flex items-baseline gap-2">
              <p className="text-3xl font-bold text-gray-900">{stats.ratingPromedio}</p>
              <p className="text-lg text-gray-500">/5</p>
            </div>
            <div className="flex gap-1 mt-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <div
                  key={star}
                  className={`w-4 h-4 rounded-full ${
                    star <= stats.ratingPromedio ? 'bg-yellow-400' : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg p-6 border border-white/50 relative overflow-hidden"
        >
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-gradient-to-br from-green-200 to-emerald-200 rounded-full blur-2xl opacity-20"></div>
          <div className="relative z-10">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white mb-3 shadow-lg">
              <CheckCircle className="w-6 h-6" />
            </div>
            <p className="text-sm font-semibold text-gray-600 mb-1">Feedback Positivo</p>
            <p className="text-3xl font-bold text-gray-900">{stats.feedbackPositivo}%</p>
            <p className="text-xs text-gray-500 mt-1">De {stats.totalComentarios} comentarios</p>
          </div>
        </motion.div>
      </div>

      {/* Comentarios recientes */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg p-6 border border-white/50"
      >
        <h4 className="text-lg font-bold text-gray-900 mb-4">Comentarios Recientes</h4>
        <div className="space-y-3">
          {stats.comentarios.map((comentario: any, index: number) => (
            <div
              key={index}
              className="p-4 rounded-xl bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100"
            >
              <div className="flex items-start justify-between mb-2">
                <span className="font-semibold text-gray-900">{comentario.cliente}</span>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <div
                      key={star}
                      className={`w-3 h-3 rounded-full ${
                        star <= comentario.rating ? 'bg-yellow-400' : 'bg-gray-200'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-sm text-gray-700">{comentario.texto}</p>
              <p className="text-xs text-gray-500 mt-2">{comentario.fecha}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

const RecetaEditarPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'editar' | 'nutricion' | 'historial' | 'estadisticas'>('editar');
  const [autoSaving, setAutoSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState('Hace 2 minutos');

  // Datos mockeados expandidos
  const mockRecipe = {
    id: 'receta-123',
    nombre: 'Ensalada de Quinoa y Aguacate',
    descripcion: 'Una ensalada fresca y nutritiva, perfecta para el verano. Rica en proteínas vegetales y grasas saludables.',
    categoria: 'Ensaladas',
    dificultad: 'Fácil',
    tiempoPreparacion: 15,
    tiempoCoccion: 15,
    porciones: 2,
    fotoUrl: 'https://example.com/quinoa-salad.jpg',
    ingredientes: [
      { id: 'ing-1', nombre: 'Quinoa', cantidad: 1, unidad: 'taza', calorias: 120, proteinas: 4 },
      { id: 'ing-2', nombre: 'Aguacate', cantidad: 1, unidad: 'unidad', calorias: 160, proteinas: 2 },
      { id: 'ing-3', nombre: 'Tomates Cherry', cantidad: 10, unidad: 'unidades', calorias: 30, proteinas: 1 },
      { id: 'ing-4', nombre: 'Pepino', cantidad: 0.5, unidad: 'unidad', calorias: 8, proteinas: 0.3 },
      { id: 'ing-5', nombre: 'Limón', cantidad: 1, unidad: 'unidad', calorias: 17, proteinas: 0.6 },
      { id: 'ing-6', nombre: 'Aceite de Oliva', cantidad: 2, unidad: 'cucharadas', calorias: 240, proteinas: 0 },
      { id: 'ing-7', nombre: 'Sal', cantidad: 1, unidad: 'pizca', calorias: 0, proteinas: 0 },
      { id: 'ing-8', nombre: 'Pimienta', cantidad: 1, unidad: 'pizca', calorias: 0, proteinas: 0 },
    ],
    pasos: [
      { id: 'paso-1', orden: 1, descripcion: 'Cocinar la quinoa según las instrucciones del paquete. Dejar enfriar.', tiempo: 15, fotoUrl: null },
      { id: 'paso-2', orden: 2, descripcion: 'Cortar el aguacate, tomates cherry y pepino en trozos pequeños.', tiempo: 5, fotoUrl: null },
      { id: 'paso-3', orden: 3, descripcion: 'En un bol grande, combinar la quinoa cocida con los vegetales cortados.', tiempo: 2, fotoUrl: null },
      { id: 'paso-4', orden: 4, descripcion: 'Exprimir el jugo de limón, añadir aceite de oliva, sal y pimienta. Mezclar bien.', tiempo: 3, fotoUrl: null },
      { id: 'paso-5', orden: 5, descripcion: 'Servir fría. Opcional: decorar con cilantro fresco.', tiempo: 1, fotoUrl: null },
    ],
    informacionNutricional: {
      calorias: 575,
      proteinas: 8,
      carbohidratos: 45,
      grasas: 40,
      fibra: 12,
      sodio: 150,
      azucares: 3,
    },
    informacionNutricionalAnterior: {
      calorias: 550,
      proteinas: 7,
      carbohidratos: 42,
      grasas: 38,
      fibra: 11,
      sodio: 140,
      azucares: 3,
    },
    notasPersonales: 'Ideal para llevar al trabajo. Se puede añadir pollo a la parrilla para más proteína.',
    tags: ['Vegetariana', 'Sin Gluten', 'Alta en Fibra', 'Meal Prep'],
    historialVersiones: [
      {
        version: 1,
        fecha: '2023-01-15T10:30:00',
        usuario: 'María García',
        tiposCambios: ['Creación'],
        cambios: 'Versión inicial de la receta',
        notas: 'Primera versión basada en receta familiar',
      },
      {
        version: 2,
        fecha: '2023-03-20T14:15:00',
        usuario: 'María García',
        tiposCambios: ['Ingredientes'],
        cambios: 'Ajuste de cantidades de limón (1 → 1 unidad) y aceite (1.5 → 2 cucharadas)',
        notas: 'Feedback de clientes: necesitaba más sabor',
      },
      {
        version: 3,
        fecha: '2023-06-10T09:45:00',
        usuario: 'Carlos Ruiz',
        tiposCambios: ['Pasos', 'Nutrición'],
        cambios: 'Añadido paso de enfriamiento de quinoa y actualización de valores nutricionales',
        notas: 'Mejora en la textura final',
      },
      {
        version: 4,
        fecha: '2023-09-05T16:20:00',
        usuario: 'María García',
        tiposCambios: ['Descripción', 'Tags'],
        cambios: 'Mejorada descripción y añadidos tags',
        notas: 'Optimización SEO y categorización',
      },
      {
        version: 5,
        fecha: '2024-01-12T11:00:00',
        usuario: 'Laura Mendez',
        tiposCambios: ['Ingredientes', 'Nutrición'],
        cambios: 'Agregado pepino y recalculadas calorías totales',
        notas: 'Mayor frescura y hidratación',
      },
    ],
    estadisticas: {
      vecesUsada: 45,
      clientesUnicos: 28,
      ratingPromedio: 4.6,
      feedbackPositivo: 92,
      totalComentarios: 15,
      comentarios: [
        {
          cliente: 'Ana López',
          rating: 5,
          texto: '¡Deliciosa! La preparé para mi familia y les encantó. Muy fácil de hacer.',
          fecha: '2024-02-15',
        },
        {
          cliente: 'Pedro Martínez',
          rating: 4,
          texto: 'Muy buena, pero le añadí un poco más de limón a mi gusto. Perfecta para el verano.',
          fecha: '2024-02-10',
        },
        {
          cliente: 'Sofia Ramírez',
          rating: 5,
          texto: 'Excelente opción para meal prep. La hice el domingo y me duró toda la semana.',
          fecha: '2024-02-05',
        },
      ],
    },
  };

  const tabs = [
    { id: 'editar', label: 'Editar Contenido', icon: Edit3 },
    { id: 'nutricion', label: 'Actualizar Nutrición', icon: Activity },
    { id: 'historial', label: 'Historial de Versiones', icon: Clock },
    { id: 'estadisticas', label: 'Estadísticas de Uso', icon: TrendingUp },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-pink-50/30 pb-12">
      {/* HERO SECTION */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-r from-fuchsia-600 via-pink-600 to-rose-600 rounded-3xl shadow-2xl mb-8 p-8 md:p-12"
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
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-4 text-pink-100">
            <span className="text-sm font-medium">Recetas</span>
            <ChevronRight className="w-4 h-4" />
            <span className="text-sm font-medium">{mockRecipe.nombre}</span>
            <ChevronRight className="w-4 h-4" />
            <span className="text-sm font-semibold text-white">Editar</span>
          </div>

          {/* Título con icono animado */}
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="relative">
                  <Edit3 className="w-10 h-10 text-yellow-300 animate-pulse" />
                  <div className="absolute inset-0 w-10 h-10 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
                </div>
                <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
                  Editar <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Receta</span>
                </h1>
              </div>

              <p className="text-xl md:text-2xl text-pink-100 max-w-3xl leading-relaxed mb-6">
                {mockRecipe.nombre}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {mockRecipe.tags.map((tag, index) => (
                  <div
                    key={index}
                    className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20"
                  >
                    <span className="text-sm font-semibold text-white">{tag}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Auto-save indicator */}
            <div className="flex flex-col items-end gap-3">
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
                <div className={`w-2 h-2 rounded-full ${autoSaving ? 'bg-yellow-300 animate-pulse' : 'bg-green-300'}`}></div>
                <span className="text-sm font-semibold text-white">
                  {autoSaving ? 'Guardando...' : 'Guardado'}
                </span>
              </div>
              <span className="text-xs text-pink-100">{lastSaved}</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* TABS PRINCIPALES */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="mb-8"
      >
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg p-2 border border-white/50 flex flex-wrap gap-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-fuchsia-500 via-pink-500 to-rose-500 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* CONTENIDO SEGÚN TAB ACTIVO */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {activeTab === 'editar' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <RecetaEditor receta={mockRecipe} />
              <IngredientesManager ingredientes={mockRecipe.ingredientes} />
              <PasosManager pasos={mockRecipe.pasos} />
            </div>
            <div>
              {/* Panel lateral con información rápida */}
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 sticky top-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Información General</h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Dificultad</span>
                    <span className="font-semibold text-gray-900">{mockRecipe.dificultad}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Porciones</span>
                    <span className="font-semibold text-gray-900">{mockRecipe.porciones}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tiempo Total</span>
                    <span className="font-semibold text-gray-900">{mockRecipe.tiempoPreparacion + mockRecipe.tiempoCoccion} min</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Calorías</span>
                    <span className="font-semibold text-gray-900">{mockRecipe.informacionNutricional.calorias} kcal</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'nutricion' && (
          <NutricionUpdater
            actual={mockRecipe.informacionNutricional}
            anterior={mockRecipe.informacionNutricionalAnterior}
            ingredientes={mockRecipe.ingredientes}
          />
        )}

        {activeTab === 'historial' && (
          <HistorialVersiones historial={mockRecipe.historialVersiones} />
        )}

        {activeTab === 'estadisticas' && (
          <EstadisticasUso stats={mockRecipe.estadisticas} />
        )}
      </motion.div>

      {/* ACCIONES FINALES */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="mt-8 bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50"
      >
        <div className="flex flex-wrap gap-4 justify-end">
          <button className="px-6 py-3 border-2 border-red-500 text-red-600 rounded-xl font-semibold hover:bg-red-50 transition-colors duration-300 flex items-center gap-2">
            <Trash2 className="w-5 h-5" />
            Eliminar Receta
          </button>
          <button className="px-6 py-3 border-2 border-indigo-500 text-indigo-600 rounded-xl font-semibold hover:bg-indigo-50 transition-colors duration-300 flex items-center gap-2">
            <Copy className="w-5 h-5" />
            Duplicar Receta
          </button>
          <button className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-xl transition-all duration-300 flex items-center gap-2">
            <Save className="w-5 h-5" />
            Guardar como Nueva Versión
          </button>
          <button className="px-6 py-3 bg-gradient-to-r from-fuchsia-500 via-pink-500 to-rose-500 text-white rounded-xl font-semibold hover:shadow-2xl transition-all duration-300 flex items-center gap-2">
            <Upload className="w-5 h-5" />
            Publicar Cambios
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default RecetaEditarPage;
