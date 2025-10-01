import React, { useState, useEffect } from 'react';
import { Ejercicio } from '../editorEjercicioApi';
import MediaUpload from './MediaUpload';
import InstruccionesEditor from './InstruccionesEditor';
import DetallesTecnicos from './DetallesTecnicos';

interface EjercicioFormProps {
  onSave: (ejercicio: Ejercicio) => void;
  initialData?: Ejercicio | null;
}

const EjercicioForm: React.FC<EjercicioFormProps> = ({ onSave, initialData }) => {
  const [formData, setFormData] = useState<Omit<Ejercicio, 'id'> & { id?: string }>({
    nombre: '',
    grupoMuscular: '',
    tipoMovimiento: '',
    dificultad: 'Principiante',
    tempo: '',
    rangoRepeticiones: '',
    materialNecesario: [],
    instrucciones: '',
    indicacionesTecnicas: '',
    erroresComunes: '',
    etiquetas: [],
    mediaUrl: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleArrayChange = (name: keyof typeof formData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value.split(',').map((item) => item.trim()).filter(Boolean),
    }));
  };

  const handleInstruccionesChange = (content: string) => {
    setFormData((prev) => ({
      ...prev,
      instrucciones: content,
    }));
  };

  const handleMediaUpload = (url: string) => {
    setFormData((prev) => ({
      ...prev,
      mediaUrl: url,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple validation
    if (!formData.nombre || !formData.grupoMuscular || !formData.instrucciones) {
      alert('Por favor, completa los campos obligatorios: Nombre, Grupo Muscular e Instrucciones.');
      return;
    }
    onSave(formData as Ejercicio);
  };

  const handleDuplicate = () => {
    const duplicatedData = { ...formData, id: undefined, nombre: `${formData.nombre} (Copia)` };
    setFormData(duplicatedData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-6">
      <div>
        <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">Nombre del Ejercicio <span className="text-red-500">*</span></label>
        <input
          type="text"
          name="nombre"
          id="nombre"
          value={formData.nombre}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          required
        />
      </div>

      <div>
        <label htmlFor="grupoMuscular" className="block text-sm font-medium text-gray-700">Grupo Muscular <span className="text-red-500">*</span></label>
        <input
          type="text"
          name="grupoMuscular"
          id="grupoMuscular"
          value={formData.grupoMuscular}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          required
        />
      </div>

      <div>
        <label htmlFor="tipoMovimiento" className="block text-sm font-medium text-gray-700">Tipo de Movimiento</label>
        <input
          type="text"
          name="tipoMovimiento"
          id="tipoMovimiento"
          value={formData.tipoMovimiento}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
      </div>

      <div>
        <label htmlFor="dificultad" className="block text-sm font-medium text-gray-700">Dificultad</label>
        <select
          name="dificultad"
          id="dificultad"
          value={formData.dificultad}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        >
          <option value="Principiante">Principiante</option>
          <option value="Intermedio">Intermedio</option>
          <option value="Avanzado">Avanzado</option>
        </select>
      </div>

      <MediaUpload onMediaUpload={handleMediaUpload} initialMediaUrl={formData.mediaUrl} />

      <InstruccionesEditor initialContent={formData.instrucciones} onContentChange={handleInstruccionesChange} />

      <DetallesTecnicos
        initialTempo={formData.tempo}
        onTempoChange={(value) => setFormData((prev) => ({ ...prev, tempo: value }))}
        initialRangoRepeticiones={formData.rangoRepeticiones}
        onRangoRepeticionesChange={(value) => setFormData((prev) => ({ ...prev, rangoRepeticiones: value }))}
        initialMaterialNecesario={formData.materialNecesario.join(', ')}
        onMaterialNecesarioChange={(value) => handleArrayChange('materialNecesario', value)}
        initialIndicacionesTecnicas={formData.indicacionesTecnicas}
        onIndicacionesTecnicasChange={(value) => setFormData((prev) => ({ ...prev, indicacionesTecnicas: value }))}
        initialErroresComunes={formData.erroresComunes}
        onErroresComunesChange={(value) => setFormData((prev) => ({ ...prev, erroresComunes: value }))}
        initialEtiquetas={formData.etiquetas.join(', ')}
        onEtiquetasChange={(value) => handleArrayChange('etiquetas', value)}
      />

      <div className="flex justify-end space-x-4">
        {initialData && (
          <button
            type="button"
            onClick={handleDuplicate}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Duplicar Ejercicio
          </button>
        )}
        <button
          type="submit"
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Guardar Ejercicio
        </button>
      </div>
    </form>
  );
};

export default EjercicioForm;
