import React, { useState } from 'react';
import { Plus, X, Save } from 'lucide-react';

interface RegistroMarcaProps {
  onRegistrar: (marca: {
    ejercicio: string;
    valor: number;
    unidad: string;
    atleta: string;
    notas?: string;
  }) => void;
}

const RegistroMarca: React.FC<RegistroMarcaProps> = ({ onRegistrar }) => {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [formData, setFormData] = useState({
    ejercicio: '',
    valor: '',
    unidad: 'kg',
    atleta: '',
    notas: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.ejercicio || !formData.valor || !formData.atleta) {
      alert('Por favor completa todos los campos requeridos');
      return;
    }

    onRegistrar({
      ejercicio: formData.ejercicio,
      valor: parseFloat(formData.valor),
      unidad: formData.unidad,
      atleta: formData.atleta,
      notas: formData.notas || undefined
    });

    // Reset form
    setFormData({
      ejercicio: '',
      valor: '',
      unidad: 'kg',
      atleta: '',
      notas: ''
    });
    setMostrarFormulario(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (!mostrarFormulario) {
    return (
      <button
        onClick={() => setMostrarFormulario(true)}
        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        <Plus className="h-5 w-5" />
        Registrar Nueva Marca
      </button>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Registrar Nueva Marca</h3>
        <button
          onClick={() => setMostrarFormulario(false)}
          className="p-1 hover:bg-gray-100 rounded transition-colors"
        >
          <X className="h-5 w-5 text-gray-500" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="atleta" className="block text-sm font-medium text-gray-700 mb-1">
            Atleta *
          </label>
          <input
            type="text"
            id="atleta"
            name="atleta"
            value={formData.atleta}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Nombre del atleta"
            required
          />
        </div>

        <div>
          <label htmlFor="ejercicio" className="block text-sm font-medium text-gray-700 mb-1">
            Ejercicio *
          </label>
          <input
            type="text"
            id="ejercicio"
            name="ejercicio"
            value={formData.ejercicio}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Ej: Back Squat, Deadlift, etc."
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="valor" className="block text-sm font-medium text-gray-700 mb-1">
              Valor *
            </label>
            <input
              type="number"
              id="valor"
              name="valor"
              value={formData.valor}
              onChange={handleChange}
              step="0.1"
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="0.0"
              required
            />
          </div>

          <div>
            <label htmlFor="unidad" className="block text-sm font-medium text-gray-700 mb-1">
              Unidad *
            </label>
            <select
              id="unidad"
              name="unidad"
              value={formData.unidad}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="kg">kg</option>
              <option value="lbs">lbs</option>
              <option value="seg">segundos</option>
              <option value="min">minutos</option>
              <option value="reps">repeticiones</option>
              <option value="m">metros</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="notas" className="block text-sm font-medium text-gray-700 mb-1">
            Notas (opcional)
          </label>
          <textarea
            id="notas"
            name="notas"
            value={formData.notas}
            onChange={handleChange}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            placeholder="Comentarios adicionales..."
          />
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Save className="h-4 w-4" />
            Guardar Marca
          </button>
          <button
            type="button"
            onClick={() => setMostrarFormulario(false)}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegistroMarca;
