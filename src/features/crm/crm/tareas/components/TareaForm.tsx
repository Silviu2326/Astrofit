import React, { useState } from 'react';
import { X } from 'lucide-react';
import { addTarea, Tarea } from '../tareasApi';

interface TareaFormProps {
  onTareaCreated?: () => void;
  onClose?: () => void;
}

const TareaForm: React.FC<TareaFormProps> = ({ onTareaCreated, onClose }) => {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [fechaVencimiento, setFechaVencimiento] = useState('');
  const [prioridad, setPrioridad] = useState<Tarea['prioridad']>('media');
  const [asignadoA, setAsignadoA] = useState('');
  const [clienteRelacionado, setClienteRelacionado] = useState('');
  const [notasAdicionales, setNotasAdicionales] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!titulo || !fechaVencimiento || !asignadoA) {
      alert('Por favor, completa los campos obligatorios: Título, Fecha de Vencimiento y Asignado a.');
      return;
    }

    const newTarea = {
      titulo,
      descripcion,
      fechaVencimiento,
      prioridad,
      asignadoA,
      clienteRelacionado: clienteRelacionado || undefined,
      notasAdicionales: notasAdicionales || undefined,
    };

    try {
      await addTarea(newTarea);
      alert('Tarea creada exitosamente!');
      // Clear form
      setTitulo('');
      setDescripcion('');
      setFechaVencimiento('');
      setPrioridad('media');
      setAsignadoA('');
      setClienteRelacionado('');
      setNotasAdicionales('');
      // Notificar al componente padre para actualizar la lista
      if (onTareaCreated) {
        onTareaCreated();
      }
      // Cerrar el formulario
      if (onClose) {
        onClose();
      }
    } catch (error) {
      console.error('Error al crear la tarea:', error);
      alert('Hubo un error al crear la tarea.');
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/50">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Crear Nueva Tarea</h2>
        {onClose && (
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        )}
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="titulo" className="block text-sm font-medium text-gray-700">Título <span className="text-red-500">*</span></label>
          <input
            type="text"
            id="titulo"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-xl shadow-sm p-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
            required
          />
        </div>
        <div>
          <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700">Descripción</label>
          <textarea
            id="descripcion"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            rows={3}
            className="mt-1 block w-full border border-gray-300 rounded-xl shadow-sm p-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
          ></textarea>
        </div>
        <div>
          <label htmlFor="fechaVencimiento" className="block text-sm font-medium text-gray-700">Fecha de Vencimiento <span className="text-red-500">*</span></label>
          <input
            type="date"
            id="fechaVencimiento"
            value={fechaVencimiento}
            onChange={(e) => setFechaVencimiento(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-xl shadow-sm p-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
            required
          />
        </div>
        <div>
          <label htmlFor="prioridad" className="block text-sm font-medium text-gray-700">Prioridad</label>
          <select
            id="prioridad"
            value={prioridad}
            onChange={(e) => setPrioridad(e.target.value as Tarea['prioridad'])}
            className="mt-1 block w-full border border-gray-300 rounded-xl shadow-sm p-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
          >
            <option value="alta">Alta</option>
            <option value="media">Media</option>
            <option value="baja">Baja</option>
          </select>
        </div>
        <div>
          <label htmlFor="asignadoA" className="block text-sm font-medium text-gray-700">Asignado a <span className="text-red-500">*</span></label>
          <input
            type="text"
            id="asignadoA"
            value={asignadoA}
            onChange={(e) => setAsignadoA(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-xl shadow-sm p-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
            required
          />
        </div>
        <div>
          <label htmlFor="clienteRelacionado" className="block text-sm font-medium text-gray-700">Cliente/Lead Relacionado (Opcional)</label>
          <input
            type="text"
            id="clienteRelacionado"
            value={clienteRelacionado}
            onChange={(e) => setClienteRelacionado(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-xl shadow-sm p-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
          />
        </div>
        <div>
          <label htmlFor="notasAdicionales" className="block text-sm font-medium text-gray-700">Notas Adicionales</label>
          <textarea
            id="notasAdicionales"
            value={notasAdicionales}
            onChange={(e) => setNotasAdicionales(e.target.value)}
            rows={2}
            className="mt-1 block w-full border border-gray-300 rounded-xl shadow-sm p-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
          ></textarea>
        </div>
        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
          >
            Crear Tarea
          </button>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default TareaForm;