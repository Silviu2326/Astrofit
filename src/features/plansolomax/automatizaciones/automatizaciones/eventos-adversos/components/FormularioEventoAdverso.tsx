import React, { useState } from 'react';
import { EventoAdverso } from '../eventosAdversosApi';
import { AlertTriangle, Calendar, FileText, User, Zap } from 'lucide-react';

interface FormularioEventoAdversoProps {
  clienteId: string;
  onEventoCreado: (evento: EventoAdverso) => void;
  onCancelar: () => void;
}

export const FormularioEventoAdverso: React.FC<FormularioEventoAdversoProps> = ({
  clienteId,
  onEventoCreado,
  onCancelar
}) => {
  const [formData, setFormData] = useState({
    tipo: 'lesion' as EventoAdverso['tipo'],
    severidad: 'leve' as EventoAdverso['severidad'],
    descripcion: '',
    notasMedicas: '',
    recomendaciones: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const nuevoEvento: Omit<EventoAdverso, 'id' | 'fecha'> = {
        clienteId,
        tipo: formData.tipo,
        severidad: formData.severidad,
        descripcion: formData.descripcion,
        flujosAfectados: [],
        estado: 'activo',
        notasMedicas: formData.notasMedicas,
        recomendaciones: formData.recomendaciones
      };

      // Simular creación del evento
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const eventoCompleto: EventoAdverso = {
        ...nuevoEvento,
        id: `evento_${Date.now()}`,
        fecha: new Date()
      };

      onEventoCreado(eventoCompleto);
    } catch (error) {
      console.error('Error al crear evento adverso:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getSeveridadColor = (severidad: string) => {
    switch (severidad) {
      case 'leve': return 'text-green-600 bg-green-50';
      case 'moderada': return 'text-yellow-600 bg-yellow-50';
      case 'grave': return 'text-orange-600 bg-orange-50';
      case 'critica': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-red-100 rounded-lg">
          <AlertTriangle className="w-6 h-6 text-red-600" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Registrar Evento Adverso</h2>
          <p className="text-sm text-gray-600">Cliente ID: {clienteId}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Tipo de Evento */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tipo de Evento
          </label>
          <select
            value={formData.tipo}
            onChange={(e) => setFormData({ ...formData, tipo: e.target.value as EventoAdverso['tipo'] })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            required
          >
            <option value="lesion">Lesión</option>
            <option value="problema_medico">Problema Médico</option>
            <option value="contraindicacion">Contraindicación</option>
            <option value="alergia">Alergia</option>
            <option value="intolerancia">Intolerancia</option>
          </select>
        </div>

        {/* Severidad */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Severidad
          </label>
          <div className="grid grid-cols-2 gap-3">
            {(['leve', 'moderada', 'grave', 'critica'] as const).map((severidad) => (
              <label
                key={severidad}
                className={`flex items-center space-x-2 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                  formData.severidad === severidad
                    ? 'border-red-500 bg-red-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <input
                  type="radio"
                  name="severidad"
                  value={severidad}
                  checked={formData.severidad === severidad}
                  onChange={(e) => setFormData({ ...formData, severidad: e.target.value as EventoAdverso['severidad'] })}
                  className="sr-only"
                />
                <div className={`w-3 h-3 rounded-full ${getSeveridadColor(severidad).split(' ')[0]}`} />
                <span className="text-sm font-medium capitalize">{severidad}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Descripción */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <FileText className="w-4 h-4 inline mr-1" />
            Descripción del Evento
          </label>
          <textarea
            value={formData.descripcion}
            onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
            placeholder="Describe detalladamente el evento adverso..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            rows={4}
            required
          />
        </div>

        {/* Notas Médicas */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <User className="w-4 h-4 inline mr-1" />
            Notas Médicas (Opcional)
          </label>
          <textarea
            value={formData.notasMedicas}
            onChange={(e) => setFormData({ ...formData, notasMedicas: e.target.value })}
            placeholder="Información médica relevante..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            rows={3}
          />
        </div>

        {/* Recomendaciones */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Zap className="w-4 h-4 inline mr-1" />
            Recomendaciones (Opcional)
          </label>
          <textarea
            value={formData.recomendaciones}
            onChange={(e) => setFormData({ ...formData, recomendaciones: e.target.value })}
            placeholder="Recomendaciones para el manejo del evento..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            rows={3}
          />
        </div>

        {/* Botones */}
        <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
          <button
            type="button"
            onClick={onCancelar}
            className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Registrando...</span>
              </>
            ) : (
              <>
                <AlertTriangle className="w-4 h-4" />
                <span>Registrar Evento</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};






