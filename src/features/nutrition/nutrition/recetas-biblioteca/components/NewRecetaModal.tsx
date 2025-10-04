import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Upload, Clock, ChefHat, Users, Flame } from 'lucide-react';
import { Receta, NutritionalValues } from '../recetasBibliotecaApi';

interface NewRecetaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (receta: Omit<Receta, 'id'>) => void;
}

export const NewRecetaModal: React.FC<NewRecetaModalProps> = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    type: 'Desayuno' as 'Desayuno' | 'Almuerzo' | 'Cena' | 'Snack',
    ingredients: [''],
    steps: [''],
    nutritionalValues: {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
      fiber: 0,
      sodium: 0,
      sugar: 0,
    },
    tags: [''],
    portions: 1,
    prepTime: 0,
    cookTime: 0,
    difficulty: 'Fácil' as 'Fácil' | 'Media' | 'Difícil',
    rating: 5,
    restrictions: [] as string[],
    personalNotes: '',
    photoUrl: '',
  });

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleArrayChange = (field: 'ingredients' | 'steps' | 'tags' | 'restrictions', index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const addArrayItem = (field: 'ingredients' | 'steps' | 'tags' | 'restrictions') => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeArrayItem = (field: 'ingredients' | 'steps' | 'tags' | 'restrictions', index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const handleRestrictionToggle = (restriction: string) => {
    setFormData(prev => ({
      ...prev,
      restrictions: prev.restrictions.includes(restriction)
        ? prev.restrictions.filter(r => r !== restriction)
        : [...prev.restrictions, restriction]
    }));
  };

  const handleSave = () => {
    const newReceta: Omit<Receta, 'id'> = {
      ...formData,
      ingredients: formData.ingredients.filter(ing => ing.trim() !== ''),
      steps: formData.steps.filter(step => step.trim() !== ''),
      tags: formData.tags.filter(tag => tag.trim() !== ''),
      isFavorite: false,
    };
    onSave(newReceta);
    onClose();
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const restrictions = ['Vegano', 'Vegetariano', 'Sin gluten', 'Sin lactosa'];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 bg-gradient-to-r from-pink-50 to-rose-50 border-b border-pink-200 p-6 rounded-t-3xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-rose-600">Nueva Receta</h2>
                  <p className="text-gray-600 mt-1">Paso {currentStep} de {totalSteps}</p>
                </div>
                <button
                  onClick={onClose}
                  className="w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>
              
              {/* Progress bar */}
              <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
                  transition={{ duration: 0.3 }}
                  className="h-full bg-gradient-to-r from-pink-500 to-rose-600 rounded-full"
                />
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Step 1: Información básica */}
              {currentStep === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Nombre de la receta</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors duration-300"
                      placeholder="Ej: Bowl de Açaí con Frutas Tropicales"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Tipo de comida</label>
                      <select
                        value={formData.type}
                        onChange={(e) => handleInputChange('type', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors duration-300"
                      >
                        <option value="Desayuno">Desayuno</option>
                        <option value="Almuerzo">Almuerzo</option>
                        <option value="Cena">Cena</option>
                        <option value="Snack">Snack</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Dificultad</label>
                      <select
                        value={formData.difficulty}
                        onChange={(e) => handleInputChange('difficulty', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors duration-300"
                      >
                        <option value="Fácil">Fácil</option>
                        <option value="Media">Media</option>
                        <option value="Difícil">Difícil</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                        <Clock className="w-4 h-4 text-pink-600" />
                        Tiempo de preparación (min)
                      </label>
                      <input
                        type="number"
                        value={formData.prepTime}
                        onChange={(e) => handleInputChange('prepTime', parseInt(e.target.value) || 0)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors duration-300"
                        min="0"
                      />
                    </div>

                    <div>
                      <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                        <ChefHat className="w-4 h-4 text-pink-600" />
                        Tiempo de cocción (min)
                      </label>
                      <input
                        type="number"
                        value={formData.cookTime}
                        onChange={(e) => handleInputChange('cookTime', parseInt(e.target.value) || 0)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors duration-300"
                        min="0"
                      />
                    </div>

                    <div>
                      <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                        <Users className="w-4 h-4 text-pink-600" />
                        Porciones
                      </label>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setFormData(prev => ({ ...prev, portions: Math.max(1, prev.portions - 1) }))}
                          className="w-10 h-10 bg-pink-100 hover:bg-pink-200 rounded-xl flex items-center justify-center text-pink-700 transition-colors duration-300"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="text-2xl font-bold text-gray-800 w-12 text-center">{formData.portions}</span>
                        <button
                          onClick={() => setFormData(prev => ({ ...prev, portions: prev.portions + 1 }))}
                          className="w-10 h-10 bg-pink-100 hover:bg-pink-200 rounded-xl flex items-center justify-center text-pink-700 transition-colors duration-300"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">URL de imagen (opcional)</label>
                    <input
                      type="url"
                      value={formData.photoUrl}
                      onChange={(e) => handleInputChange('photoUrl', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors duration-300"
                      placeholder="https://ejemplo.com/imagen.jpg"
                    />
                  </div>
                </motion.div>
              )}

              {/* Step 2: Ingredientes */}
              {currentStep === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-gray-800">Ingredientes</h3>
                      <button
                        onClick={() => addArrayItem('ingredients')}
                        className="flex items-center gap-2 px-4 py-2 bg-pink-100 hover:bg-pink-200 text-pink-700 rounded-xl font-semibold transition-colors duration-300"
                      >
                        <Plus className="w-4 h-4" />
                        Agregar
                      </button>
                    </div>

                    <div className="space-y-3">
                      {formData.ingredients.map((ingredient, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <input
                            type="text"
                            value={ingredient}
                            onChange={(e) => handleArrayChange('ingredients', index, e.target.value)}
                            className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors duration-300"
                            placeholder="Ej: 200g açaí congelado"
                          />
                          {formData.ingredients.length > 1 && (
                            <button
                              onClick={() => removeArrayItem('ingredients', index)}
                              className="w-10 h-10 bg-red-100 hover:bg-red-200 rounded-xl flex items-center justify-center text-red-700 transition-colors duration-300"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Pasos de preparación */}
              {currentStep === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-gray-800">Pasos de preparación</h3>
                      <button
                        onClick={() => addArrayItem('steps')}
                        className="flex items-center gap-2 px-4 py-2 bg-pink-100 hover:bg-pink-200 text-pink-700 rounded-xl font-semibold transition-colors duration-300"
                      >
                        <Plus className="w-4 h-4" />
                        Agregar paso
                      </button>
                    </div>

                    <div className="space-y-4">
                      {formData.steps.map((step, index) => (
                        <div key={index} className="flex gap-4">
                          <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <textarea
                              value={step}
                              onChange={(e) => handleArrayChange('steps', index, e.target.value)}
                              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors duration-300 resize-none"
                              rows={3}
                              placeholder="Describe el paso de preparación..."
                            />
                          </div>
                          {formData.steps.length > 1 && (
                            <button
                              onClick={() => removeArrayItem('steps', index)}
                              className="w-10 h-10 bg-red-100 hover:bg-red-200 rounded-xl flex items-center justify-center text-red-700 transition-colors duration-300 self-start"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 4: Información nutricional y restricciones */}
              {currentStep === 4 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                      <Flame className="w-5 h-5 text-orange-600" />
                      Información Nutricional (por porción)
                    </h3>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Calorías</label>
                        <input
                          type="number"
                          value={formData.nutritionalValues.calories}
                          onChange={(e) => handleInputChange('nutritionalValues', { ...formData.nutritionalValues, calories: parseInt(e.target.value) || 0 })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors duration-300"
                          min="0"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Proteínas (g)</label>
                        <input
                          type="number"
                          value={formData.nutritionalValues.protein}
                          onChange={(e) => handleInputChange('nutritionalValues', { ...formData.nutritionalValues, protein: parseInt(e.target.value) || 0 })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors duration-300"
                          min="0"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Carbohidratos (g)</label>
                        <input
                          type="number"
                          value={formData.nutritionalValues.carbs}
                          onChange={(e) => handleInputChange('nutritionalValues', { ...formData.nutritionalValues, carbs: parseInt(e.target.value) || 0 })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors duration-300"
                          min="0"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Grasas (g)</label>
                        <input
                          type="number"
                          value={formData.nutritionalValues.fat}
                          onChange={(e) => handleInputChange('nutritionalValues', { ...formData.nutritionalValues, fat: parseInt(e.target.value) || 0 })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors duration-300"
                          min="0"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Restricciones alimentarias</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {restrictions.map((restriction) => (
                        <button
                          key={restriction}
                          onClick={() => handleRestrictionToggle(restriction)}
                          className={`px-4 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
                            formData.restrictions.includes(restriction)
                              ? 'bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-lg'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {restriction}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Notas personales (opcional)</label>
                    <textarea
                      value={formData.personalNotes}
                      onChange={(e) => handleInputChange('personalNotes', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors duration-300 resize-none"
                      rows={3}
                      placeholder="Agrega consejos, variaciones o notas especiales..."
                    />
                  </div>
                </motion.div>
              )}

              {/* Navigation buttons */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
                <button
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    currentStep === 1
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Anterior
                </button>

                <div className="flex items-center gap-2">
                  {Array.from({ length: totalSteps }).map((_, index) => (
                    <div
                      key={index}
                      className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                        index + 1 <= currentStep ? 'bg-pink-500' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>

                {currentStep < totalSteps ? (
                  <button
                    onClick={nextStep}
                    className="px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Siguiente
                  </button>
                ) : (
                  <button
                    onClick={handleSave}
                    className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Guardar Receta
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
