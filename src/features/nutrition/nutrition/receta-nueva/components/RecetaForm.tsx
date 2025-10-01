import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { UtensilsCrossed, Clock, Flame, Users, Tag, AlertCircle, Timer } from 'lucide-react';

interface RecetaFormProps {
  initialData?: any;
  onSubmit: (data: any) => void;
}

const RecetaForm: React.FC<RecetaFormProps> = ({ initialData, onSubmit }) => {
  const [nombre, setNombre] = useState(initialData?.nombre || '');
  const [descripcion, setDescripcion] = useState(initialData?.descripcion || '');
  const [tipoComida, setTipoComida] = useState(initialData?.tipoComida || '');
  const [dificultad, setDificultad] = useState(initialData?.dificultad || 'media');
  const [tiempoPreparacion, setTiempoPreparacion] = useState(initialData?.tiempoPreparacion || 30);
  const [tiempoCoccion, setTiempoCoccion] = useState(initialData?.tiempoCoccion || 0);
  const [porciones, setPorciones] = useState(initialData?.porciones || 4);
  const [etiquetas, setEtiquetas] = useState<string[]>(initialData?.etiquetas || []);
  const [tipsNotas, setTipsNotas] = useState(initialData?.tipsNotas || '');

  // Auto-submit cuando cambia cualquier valor
  useEffect(() => {
    const timer = setTimeout(() => {
      onSubmit({
        nombre,
        descripcion,
        tipoComida,
        dificultad,
        tiempoPreparacion,
        tiempoCoccion,
        porciones,
        etiquetas,
        tipsNotas,
      });
    }, 300); // Debounce de 300ms

    return () => clearTimeout(timer);
  }, [nombre, descripcion, tipoComida, dificultad, tiempoPreparacion, tiempoCoccion, porciones, etiquetas, tipsNotas]);

  const tiposComida = ['Desayuno', 'Almuerzo', 'Cena', 'Snack', 'Postre', 'Bebida'];
  const dificultades = ['Fácil', 'Media', 'Difícil'];

  const etiquetasDisponibles = [
    'Vegano', 'Vegetariano', 'Sin gluten', 'Sin lactosa',
    'Baja en carbos', 'Alta proteína', 'Mediterránea', 'Asiática',
    'Mexicana', 'Italiana', 'Saludable', 'Comfort food'
  ];

  const toggleEtiqueta = (etiqueta: string) => {
    if (etiquetas.includes(etiqueta)) {
      setEtiquetas(etiquetas.filter(e => e !== etiqueta));
    } else {
      setEtiquetas([...etiquetas, etiqueta]);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 md:p-8 border border-white/50 relative overflow-hidden"
    >
      {/* Decoración de fondo */}
      <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full blur-3xl opacity-20"></div>

      <div className="relative z-10 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl shadow-lg">
            <UtensilsCrossed className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">Información Básica</h3>
        </div>

        {/* Nombre de la receta */}
        <div>
          <label htmlFor="nombre" className="block text-sm font-semibold text-gray-700 mb-2">
            Nombre de la Receta *
          </label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Ej: Pasta Carbonara con Champiñones"
            className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm font-medium"
            required
          />
        </div>

        {/* Descripción */}
        <div>
          <label htmlFor="descripcion" className="block text-sm font-semibold text-gray-700 mb-2">
            Descripción Breve
          </label>
          <textarea
            id="descripcion"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            placeholder="Una deliciosa receta cremosa perfecta para cualquier ocasión..."
            rows={3}
            className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm resize-none"
          />
        </div>

        {/* Tipo de comida y dificultad */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="tipoComida" className="block text-sm font-semibold text-gray-700 mb-2">
              Tipo de Comida
            </label>
            <div className="relative">
              <select
                id="tipoComida"
                value={tipoComida}
                onChange={(e) => setTipoComida(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm appearance-none font-medium"
              >
                <option value="">Seleccionar...</option>
                {tiposComida.map(tipo => (
                  <option key={tipo} value={tipo.toLowerCase()}>{tipo}</option>
                ))}
              </select>
              <Tag className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Dificultad
            </label>
            <div className="flex gap-2">
              {dificultades.map((dif) => (
                <button
                  key={dif}
                  type="button"
                  onClick={() => setDificultad(dif.toLowerCase())}
                  className={`flex-1 px-4 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    dificultad === dif.toLowerCase()
                      ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {dif}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tiempos y porciones */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="tiempoPreparacion" className="block text-sm font-semibold text-gray-700 mb-2">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-purple-600" />
                Tiempo Prep. (min)
              </div>
            </label>
            <input
              type="number"
              id="tiempoPreparacion"
              value={tiempoPreparacion}
              onChange={(e) => setTiempoPreparacion(parseInt(e.target.value) || 0)}
              min="0"
              className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm font-medium"
            />
          </div>

          <div>
            <label htmlFor="tiempoCoccion" className="block text-sm font-semibold text-gray-700 mb-2">
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-orange-600" />
                Tiempo Cocción (min)
              </div>
            </label>
            <input
              type="number"
              id="tiempoCoccion"
              value={tiempoCoccion}
              onChange={(e) => setTiempoCoccion(parseInt(e.target.value) || 0)}
              min="0"
              className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm font-medium"
            />
          </div>

          <div>
            <label htmlFor="porciones" className="block text-sm font-semibold text-gray-700 mb-2">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-600" />
                Porciones
              </div>
            </label>
            <input
              type="number"
              id="porciones"
              value={porciones}
              onChange={(e) => setPorciones(parseInt(e.target.value) || 1)}
              min="1"
              className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm font-medium"
            />
          </div>
        </div>

        {/* Etiquetas */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4 text-purple-600" />
              Etiquetas y Categorías
            </div>
          </label>
          <div className="flex flex-wrap gap-2">
            {etiquetasDisponibles.map((etiqueta) => (
              <button
                key={etiqueta}
                type="button"
                onClick={() => toggleEtiqueta(etiqueta)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                  etiquetas.includes(etiqueta)
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {etiqueta}
              </button>
            ))}
          </div>
        </div>

        {/* Tips y notas */}
        <div>
          <label htmlFor="tipsNotas" className="block text-sm font-semibold text-gray-700 mb-2">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-blue-600" />
              Tips y Notas Personales
            </div>
          </label>
          <textarea
            id="tipsNotas"
            value={tipsNotas}
            onChange={(e) => setTipsNotas(e.target.value)}
            placeholder="Consejos, sustituciones, notas especiales..."
            rows={3}
            className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm resize-none"
          />
        </div>

        {/* Indicador de auto-guardado */}
        <div className="flex items-center gap-2 text-sm text-gray-500 pt-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          Los cambios se guardan automáticamente
        </div>
      </div>
    </motion.div>
  );
};

export default RecetaForm;
