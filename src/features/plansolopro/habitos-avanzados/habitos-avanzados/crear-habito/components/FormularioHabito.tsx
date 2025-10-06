import React from 'react';
import { motion } from 'framer-motion';
import { 
  Target, 
  FileText, 
  Tag, 
  Star,
  Zap,
  Heart,
  Brain,
  Dumbbell,
  Apple,
  Moon,
  Sun
} from 'lucide-react';

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

interface FormularioHabitoProps {
  habitoData: HabitoData;
  onFormChange: (data: Partial<HabitoData>) => void;
}

const FormularioHabito: React.FC<FormularioHabitoProps> = ({ habitoData, onFormChange }) => {
  const categorias = [
    { id: 'salud', nombre: 'Salud', icono: Heart, color: 'red' },
    { id: 'fitness', nombre: 'Fitness', icono: Dumbbell, color: 'blue' },
    { id: 'nutricion', nombre: 'Nutrición', icono: Apple, color: 'green' },
    { id: 'mental', nombre: 'Bienestar Mental', icono: Brain, color: 'purple' },
    { id: 'productividad', nombre: 'Productividad', icono: Zap, color: 'yellow' },
    { id: 'sueño', nombre: 'Sueño', icono: Moon, color: 'indigo' },
  ];

  const plantillasHabitos = [
    {
      id: 'agua',
      nombre: 'Beber 2L de agua',
      descripcion: 'Mantener una hidratación adecuada durante el día',
      categoria: 'salud',
      objetivo: 8,
      tipoObjetivo: 'veces' as const,
      dificultad: 'facil' as const,
    },
    {
      id: 'ejercicio',
      nombre: 'Ejercicio diario',
      descripcion: 'Realizar al menos 30 minutos de actividad física',
      categoria: 'fitness',
      objetivo: 30,
      tipoObjetivo: 'minutos' as const,
      dificultad: 'medio' as const,
    },
    {
      id: 'meditacion',
      nombre: 'Meditación matutina',
      descripcion: 'Dedicar tiempo a la meditación y mindfulness',
      categoria: 'mental',
      objetivo: 10,
      tipoObjetivo: 'minutos' as const,
      dificultad: 'medio' as const,
    },
    {
      id: 'lectura',
      nombre: 'Lectura diaria',
      descripcion: 'Leer al menos 20 páginas de un libro',
      categoria: 'productividad',
      objetivo: 20,
      tipoObjetivo: 'minutos' as const,
      dificultad: 'facil' as const,
    },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    onFormChange({ [name]: value });
  };

  const handleNumericChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onFormChange({ [name]: parseInt(value) || 0 });
  };

  const aplicarPlantilla = (plantilla: typeof plantillasHabitos[0]) => {
    onFormChange({
      nombre: plantilla.nombre,
      descripcion: plantilla.descripcion,
      categoria: plantilla.categoria,
      objetivo: plantilla.objetivo,
      tipoObjetivo: plantilla.tipoObjetivo,
      dificultad: plantilla.dificultad,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 mb-6"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg shadow-lg">
          <Target className="w-5 h-5 text-white" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900">Define el Hábito</h2>
      </div>

      <div className="space-y-6">
        {/* Plantillas de Hábitos */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Plantillas de Hábitos Populares
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {plantillasHabitos.map((plantilla) => (
              <motion.button
                key={plantilla.id}
                type="button"
                onClick={() => aplicarPlantilla(plantilla)}
                whileHover={{ scale: 1.02 }}
                className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all text-left"
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Star className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{plantilla.nombre}</h4>
                    <p className="text-sm text-gray-600 mt-1">{plantilla.descripcion}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">
                        {plantilla.objetivo} {plantilla.tipoObjetivo}
                      </span>
                      <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded capitalize">
                        {plantilla.dificultad}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Nombre del Hábito */}
        <div>
          <label htmlFor="nombre" className="block text-sm font-semibold text-gray-700 mb-2">
            Nombre del Hábito
          </label>
          <div className="relative">
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={habitoData.nombre}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
              placeholder="Ej: Beber 2L de agua diariamente"
              required
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <Target className="w-5 h-5 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Descripción */}
        <div>
          <label htmlFor="descripcion" className="block text-sm font-semibold text-gray-700 mb-2">
            Descripción del Hábito
          </label>
          <textarea
            id="descripcion"
            name="descripcion"
            value={habitoData.descripcion}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
            placeholder="Describe el hábito en detalle, incluyendo beneficios y motivación..."
            rows={3}
          />
        </div>

        {/* Categoría */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Categoría del Hábito
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {categorias.map((categoria) => {
              const Icon = categoria.icono;
              const isSelected = habitoData.categoria === categoria.id;
              return (
                <button
                  key={categoria.id}
                  type="button"
                  onClick={() => onFormChange({ categoria: categoria.id })}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    isSelected
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      isSelected ? 'bg-blue-100' : 'bg-gray-100'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="font-medium">{categoria.nombre}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Objetivo y Duración */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="objetivo" className="block text-sm font-semibold text-gray-700 mb-2">
              Objetivo Diario
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                id="objetivo"
                name="objetivo"
                value={habitoData.objetivo}
                onChange={handleNumericChange}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                min="1"
                required
              />
              <select
                name="tipoObjetivo"
                value={habitoData.tipoObjetivo}
                onChange={handleChange}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
              >
                <option value="veces">veces</option>
                <option value="minutos">minutos</option>
                <option value="dias">días</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="duracion" className="block text-sm font-semibold text-gray-700 mb-2">
              Duración del Reto (días)
            </label>
            <input
              type="number"
              id="duracion"
              name="duracion"
              value={habitoData.duracion}
              onChange={handleNumericChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
              min="1"
              max="365"
              required
            />
          </div>
        </div>

        {/* Dificultad */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Nivel de Dificultad
          </label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { id: 'facil', nombre: 'Fácil', color: 'green', descripcion: 'Perfecto para empezar' },
              { id: 'medio', nombre: 'Medio', color: 'yellow', descripcion: 'Desafío moderado' },
              { id: 'dificil', nombre: 'Difícil', color: 'red', descripcion: 'Para expertos' },
            ].map((dificultad) => {
              const isSelected = habitoData.dificultad === dificultad.id;
              return (
                <button
                  key={dificultad.id}
                  type="button"
                  onClick={() => onFormChange({ dificultad: dificultad.id as any })}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    isSelected
                      ? `border-${dificultad.color}-500 bg-${dificultad.color}-50 text-${dificultad.color}-700`
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-center">
                    <div className={`w-8 h-8 rounded-full mx-auto mb-2 ${
                      isSelected ? `bg-${dificultad.color}-100` : 'bg-gray-100'
                    }`} />
                    <h4 className="font-medium">{dificultad.nombre}</h4>
                    <p className="text-xs text-gray-600 mt-1">{dificultad.descripcion}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Recompensa */}
        <div>
          <label htmlFor="recompensa" className="block text-sm font-semibold text-gray-700 mb-2">
            Recompensa por Completar
          </label>
          <input
            type="text"
            id="recompensa"
            name="recompensa"
            value={habitoData.recompensa}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
            placeholder="Ej: Ver un capítulo de mi serie favorita"
          />
          <p className="text-sm text-gray-600 mt-1">
            Define una recompensa que te motive a completar el hábito
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default FormularioHabito;
