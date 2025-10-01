import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChefHat, Sparkles, Clock, Users, Save, RefreshCw, Eye } from 'lucide-react';
import RecetaForm from './components/RecetaForm';
import IngredientesEditor from './components/IngredientesEditor';
import PasosEditor from './components/PasosEditor';
import NutricionCalculator from './components/NutricionCalculator';
import FotoUpload from './components/FotoUpload';
import { recetaNuevaApi } from './recetaNuevaApi';

interface Ingrediente {
  id: string;
  nombre: string;
  cantidad: number;
  unidad: string;
}

interface Paso {
  id: string;
  descripcion: string;
  tiempoEstimado?: number;
}

interface RecetaData {
  nombre: string;
  descripcion: string;
  tipoComida: string;
  dificultad: string;
  tiempoPreparacion: number;
  tiempoCoccion: number;
  etiquetas: string[];
  porciones: number;
  tipsNotas: string;
  ingredientes: Ingrediente[];
  pasos: Paso[];
  fotoUrl?: string;
}

const RecetaNuevaPage: React.FC = () => {
  const [recetaDetails, setRecetaDetails] = useState<Omit<RecetaData, 'ingredientes' | 'pasos' | 'fotoUrl'>>({
    nombre: '',
    descripcion: '',
    tipoComida: '',
    dificultad: 'media',
    tiempoPreparacion: 30,
    tiempoCoccion: 0,
    etiquetas: [],
    porciones: 4,
    tipsNotas: '',
  });
  const [ingredientes, setIngredientes] = useState<Ingrediente[]>([]);
  const [pasos, setPasos] = useState<Paso[]>([]);
  const [fotoFile, setFotoFile] = useState<File | null>(null);
  const [fotoPreviewUrl, setFotoPreviewUrl] = useState<string | undefined>(undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleRecetaFormSubmit = (data: any) => {
    setRecetaDetails(data);
  };

  const handleIngredientesChange = (updatedIngredientes: Ingrediente[]) => {
    setIngredientes(updatedIngredientes);
  };

  const handlePasosChange = (updatedPasos: Paso[]) => {
    setPasos(updatedPasos);
  };

  const handleFotoUpload = (file: File | null) => {
    setFotoFile(file);
    if (file) {
      setFotoPreviewUrl(URL.createObjectURL(file));
    } else {
      setFotoPreviewUrl(undefined);
    }
  };

  const handleSaveReceta = async () => {
    // Basic validation
    if (!recetaDetails.nombre || ingredientes.length === 0 || pasos.length === 0) {
      setSubmitMessage({ type: 'error', message: 'Por favor, complete el nombre de la receta, añada al menos un ingrediente y un paso.' });
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage(null);

    try {
      const newReceta: RecetaData = {
        ...recetaDetails,
        ingredientes,
        pasos,
        fotoUrl: fotoPreviewUrl,
      };
      await recetaNuevaApi.createReceta(newReceta);
      setSubmitMessage({ type: 'success', message: '¡Receta creada con éxito!' });

      // Reset form
      setTimeout(() => {
        setRecetaDetails({
          nombre: '',
          descripcion: '',
          tipoComida: '',
          dificultad: 'media',
          tiempoPreparacion: 30,
          tiempoCoccion: 0,
          etiquetas: [],
          porciones: 4,
          tipsNotas: '',
        });
        setIngredientes([]);
        setPasos([]);
        setFotoFile(null);
        setFotoPreviewUrl(undefined);
        setSubmitMessage(null);
      }, 2000);

    } catch (error) {
      console.error('Error al crear la receta:', error);
      setSubmitMessage({ type: 'error', message: 'Error al crear la receta. Inténtelo de nuevo.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveAndCreateAnother = async () => {
    await handleSaveReceta();
  };

  const tiempoTotal = recetaDetails.tiempoPreparacion + recetaDetails.tiempoCoccion;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-pink-50/30 pb-12">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 rounded-3xl shadow-2xl mb-8 p-8 md:p-12"
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
              <ChefHat className="w-10 h-10 text-yellow-300 animate-pulse" />
              <div className="absolute inset-0 w-10 h-10 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Crear Nueva <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Receta</span>
            </h1>
          </div>

          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl leading-relaxed mb-6">
            Diseña y guarda tus recetas con <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">cálculo nutricional automático</span>
          </p>

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-purple-100">
            <span className="text-sm font-medium">Recetas</span>
            <span className="text-purple-300">›</span>
            <span className="text-sm font-semibold text-white">Nueva</span>
          </div>
        </div>
      </motion.div>

      {/* Mensaje de estado */}
      {submitMessage && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mb-6 p-4 rounded-2xl border-2 ${
            submitMessage.type === 'success'
              ? 'bg-green-50 border-green-500 text-green-800'
              : 'bg-red-50 border-red-500 text-red-800'
          } flex items-center gap-3 font-semibold shadow-lg`}
        >
          {submitMessage.type === 'success' ? <Sparkles className="w-5 h-5" /> : null}
          {submitMessage.message}
        </motion.div>
      )}

      {/* Layout Principal - Dos Columnas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Columna Izquierda - Formulario */}
        <div className="lg:col-span-2 space-y-6">
          <RecetaForm initialData={recetaDetails} onSubmit={handleRecetaFormSubmit} />
          <FotoUpload onFotoUpload={handleFotoUpload} initialFotoUrl={fotoPreviewUrl} />
          <IngredientesEditor
            initialIngredientes={ingredientes}
            onIngredientesChange={handleIngredientesChange}
          />
          <PasosEditor initialPasos={pasos} onPasosChange={handlePasosChange} />
        </div>

        {/* Columna Derecha - Preview y Nutrición */}
        <div className="space-y-6 lg:sticky lg:top-6 lg:h-fit">
          {/* Preview en Vivo */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 overflow-hidden relative"
          >
            {/* Decoración de fondo */}
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-pink-200 to-rose-200 rounded-full blur-3xl opacity-20"></div>

            <div className="relative z-10">
              {/* Header del preview */}
              <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 p-6">
                <div className="flex items-center gap-2 text-white">
                  <Eye className="w-5 h-5" />
                  <h3 className="text-lg font-bold">Vista Previa</h3>
                </div>
              </div>

              <div className="p-6 space-y-4">
                {/* Foto preview */}
                {fotoPreviewUrl ? (
                  <img src={fotoPreviewUrl} alt="Preview" className="w-full h-48 object-cover rounded-2xl shadow-lg" />
                ) : (
                  <div className="w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center">
                    <ChefHat className="w-16 h-16 text-gray-400" />
                  </div>
                )}

                {/* Nombre y descripción */}
                <div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-2">
                    {recetaDetails.nombre || 'Nombre de la receta'}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {recetaDetails.descripcion || 'Descripción de la receta...'}
                  </p>
                </div>

                {/* Info rápida */}
                <div className="flex flex-wrap gap-3">
                  <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-purple-50 to-pink-50 rounded-full border border-purple-200">
                    <Clock className="w-4 h-4 text-purple-600" />
                    <span className="text-sm font-bold text-purple-700">{tiempoTotal} min</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-purple-50 to-pink-50 rounded-full border border-purple-200">
                    <Users className="w-4 h-4 text-purple-600" />
                    <span className="text-sm font-bold text-purple-700">{recetaDetails.porciones} porciones</span>
                  </div>
                  {recetaDetails.tipoComida && (
                    <div className="px-3 py-2 bg-purple-500 text-white text-xs font-bold rounded-full">
                      {recetaDetails.tipoComida}
                    </div>
                  )}
                  {recetaDetails.dificultad && (
                    <div className="px-3 py-2 bg-pink-500 text-white text-xs font-bold rounded-full">
                      {recetaDetails.dificultad}
                    </div>
                  )}
                </div>

                {/* Ingredientes preview */}
                {ingredientes.length > 0 && (
                  <div>
                    <h5 className="text-sm font-bold text-gray-700 mb-2">Ingredientes:</h5>
                    <ul className="space-y-1 text-sm text-gray-600">
                      {ingredientes.slice(0, 5).map((ing) => (
                        <li key={ing.id} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span>
                          {ing.nombre} ({ing.cantidad} {ing.unidad})
                        </li>
                      ))}
                      {ingredientes.length > 5 && (
                        <li className="text-xs text-purple-600 font-semibold">
                          +{ingredientes.length - 5} más...
                        </li>
                      )}
                    </ul>
                  </div>
                )}

                {/* Pasos preview */}
                {pasos.length > 0 && (
                  <div>
                    <h5 className="text-sm font-bold text-gray-700 mb-2">Pasos:</h5>
                    <ol className="space-y-2 text-sm text-gray-600">
                      {pasos.slice(0, 3).map((paso, idx) => (
                        <li key={paso.id} className="flex gap-2">
                          <span className="flex-shrink-0 w-5 h-5 bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                            {idx + 1}
                          </span>
                          <span className="line-clamp-2">{paso.descripcion}</span>
                        </li>
                      ))}
                      {pasos.length > 3 && (
                        <li className="text-xs text-purple-600 font-semibold ml-7">
                          +{pasos.length - 3} pasos más...
                        </li>
                      )}
                    </ol>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Calculadora Nutricional */}
          <NutricionCalculator ingredientes={ingredientes} porciones={recetaDetails.porciones} />

          {/* Acciones Finales */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="space-y-3"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSaveReceta}
              disabled={isSubmitting}
              className="w-full relative overflow-hidden bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 p-4 text-white font-bold group border border-white/20 disabled:opacity-50"
            >
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              <div className="relative z-10 flex items-center justify-center gap-2">
                <Save className="w-5 h-5" />
                {isSubmitting ? 'Guardando...' : 'Guardar Receta'}
              </div>
            </motion.button>

            <button
              onClick={handleSaveAndCreateAnother}
              disabled={isSubmitting}
              className="w-full px-4 py-3 border-2 border-purple-500 text-purple-600 rounded-2xl font-semibold hover:bg-purple-50 transition-colors duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <RefreshCw className="w-4 h-4" />
              Guardar y crear otra
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default RecetaNuevaPage;