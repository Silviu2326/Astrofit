import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, Edit, Save, X, Dumbbell, Clock, Weight, Repeat } from 'lucide-react';

interface Ejercicio {
  id: string;
  nombre: string;
  categoria: string;
  series: number;
  repeticiones: string;
  peso: number;
  descanso: number;
  notas?: string;
  completado?: boolean;
}

interface EjercicioEditorProps {
  sesion: any;
  onEjerciciosChange: (ejercicios: Ejercicio[]) => void;
  onSesionChange: (sesion: any) => void;
  modo: 'edicion' | 'visualizacion';
}

const EjercicioEditor: React.FC<EjercicioEditorProps> = ({
  sesion,
  onEjerciciosChange,
  onSesionChange,
  modo
}) => {
  const [ejercicios, setEjercicios] = useState<Ejercicio[]>(sesion.ejercicios || []);
  const [editingEjercicio, setEditingEjercicio] = useState<string | null>(null);
  const [nuevoEjercicio, setNuevoEjercicio] = useState<Partial<Ejercicio>>({
    nombre: '',
    categoria: '',
    series: 3,
    repeticiones: '8-12',
    peso: 0,
    descanso: 60
  });

  const handleAddEjercicio = () => {
    if (nuevoEjercicio.nombre && nuevoEjercicio.categoria) {
      const ejercicio: Ejercicio = {
        id: Date.now().toString(),
        nombre: nuevoEjercicio.nombre,
        categoria: nuevoEjercicio.categoria,
        series: nuevoEjercicio.series || 3,
        repeticiones: nuevoEjercicio.repeticiones || '8-12',
        peso: nuevoEjercicio.peso || 0,
        descanso: nuevoEjercicio.descanso || 60,
        notas: nuevoEjercicio.notas || '',
        completado: false
      };

      const nuevosEjercicios = [...ejercicios, ejercicio];
      setEjercicios(nuevosEjercicios);
      onEjerciciosChange(nuevosEjercicios);
      setNuevoEjercicio({
        nombre: '',
        categoria: '',
        series: 3,
        repeticiones: '8-12',
        peso: 0,
        descanso: 60
      });
    }
  };

  const handleDeleteEjercicio = (id: string) => {
    const nuevosEjercicios = ejercicios.filter(e => e.id !== id);
    setEjercicios(nuevosEjercicios);
    onEjerciciosChange(nuevosEjercicios);
  };

  const handleUpdateEjercicio = (id: string, updates: Partial<Ejercicio>) => {
    const nuevosEjercicios = ejercicios.map(e => 
      e.id === id ? { ...e, ...updates } : e
    );
    setEjercicios(nuevosEjercicios);
    onEjerciciosChange(nuevosEjercicios);
  };

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/50">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Editor de Ejercicios</h2>
        <div className="flex items-center gap-2">
          <Dumbbell className="w-6 h-6 text-orange-600" />
          <span className="text-sm text-gray-600">{ejercicios.length} ejercicios</span>
        </div>
      </div>

      {/* Formulario para nuevo ejercicio */}
      <div className="bg-gradient-to-r from-orange-50 to-pink-50 rounded-2xl p-6 mb-6 border border-orange-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Agregar Nuevo Ejercicio</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Nombre</label>
            <input
              type="text"
              value={nuevoEjercicio.nombre || ''}
              onChange={(e) => setNuevoEjercicio({ ...nuevoEjercicio, nombre: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Ej: Press de banca"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Categoría</label>
            <select
              value={nuevoEjercicio.categoria || ''}
              onChange={(e) => setNuevoEjercicio({ ...nuevoEjercicio, categoria: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="">Seleccionar categoría</option>
              <option value="Pecho">Pecho</option>
              <option value="Espalda">Espalda</option>
              <option value="Piernas">Piernas</option>
              <option value="Hombros">Hombros</option>
              <option value="Brazos">Brazos</option>
              <option value="Core">Core</option>
              <option value="Cardio">Cardio</option>
            </select>
          </div>
          <div className="flex items-end">
            <button
              onClick={handleAddEjercicio}
              className="w-full px-4 py-2 bg-gradient-to-r from-orange-500 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
            >
              <Plus className="w-4 h-4 inline mr-2" />
              Agregar
            </button>
          </div>
        </div>
      </div>

      {/* Lista de ejercicios */}
      <div className="space-y-4">
        {ejercicios.map((ejercicio, index) => (
          <motion.div
            key={ejercicio.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-3">
                  <h4 className="text-lg font-semibold text-gray-900">{ejercicio.nombre}</h4>
                  <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-semibold">
                    {ejercicio.categoria}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex items-center gap-2">
                    <Repeat className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">{ejercicio.series} series</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Weight className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">{ejercicio.repeticiones} reps</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Dumbbell className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">{ejercicio.peso} kg</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">{ejercicio.descanso}s</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                {modo === 'edicion' && (
                  <>
                    <button
                      onClick={() => setEditingEjercicio(editingEjercicio === ejercicio.id ? null : ejercicio.id)}
                      className="p-2 text-gray-500 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-all"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteEjercicio(ejercicio.id)}
                      className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Formulario de edición */}
            {editingEjercicio === ejercicio.id && modo === 'edicion' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 pt-4 border-t border-gray-200"
              >
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Series</label>
                    <input
                      type="number"
                      value={ejercicio.series}
                      onChange={(e) => handleUpdateEjercicio(ejercicio.id, { series: parseInt(e.target.value) })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Repeticiones</label>
                    <input
                      type="text"
                      value={ejercicio.repeticiones}
                      onChange={(e) => handleUpdateEjercicio(ejercicio.id, { repeticiones: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Peso (kg)</label>
                    <input
                      type="number"
                      value={ejercicio.peso}
                      onChange={(e) => handleUpdateEjercicio(ejercicio.id, { peso: parseFloat(e.target.value) })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Descanso (s)</label>
                    <input
                      type="number"
                      value={ejercicio.descanso}
                      onChange={(e) => handleUpdateEjercicio(ejercicio.id, { descanso: parseInt(e.target.value) })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Notas</label>
                  <textarea
                    value={ejercicio.notas || ''}
                    onChange={(e) => handleUpdateEjercicio(ejercicio.id, { notas: e.target.value })}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
                    placeholder="Notas adicionales..."
                  />
                </div>
                <div className="flex justify-end gap-2 mt-4">
                  <button
                    onClick={() => setEditingEjercicio(null)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    <X className="w-4 h-4 inline mr-2" />
                    Cancelar
                  </button>
                  <button
                    onClick={() => setEditingEjercicio(null)}
                    className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                  >
                    <Save className="w-4 h-4 inline mr-2" />
                    Guardar
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {ejercicios.length === 0 && (
        <div className="text-center py-12">
          <Dumbbell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-600 mb-2">No hay ejercicios</h3>
          <p className="text-gray-500">Agrega ejercicios para comenzar a crear tu entrenamiento</p>
        </div>
      )}
    </div>
  );
};

export default EjercicioEditor;
