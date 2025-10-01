import React, { useState } from 'react';
import { addTarea, Tarea } from '../tareasApi';

const TareaForm: React.FC = () => {
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
      // Optionally, refresh the task list in TareasPage
    } catch (error) {
      console.error('Error al crear la tarea:', error);
      alert('Hubo un error al crear la tarea.');
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Crear Nueva Tarea</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="titulo" className="block text-sm font-medium text-gray-700">Título <span className="text-red-500">*</span></label>
          <input
            type="text"
            id="titulo"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
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
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          ></textarea>
        </div>
        <div>
          <label htmlFor="fechaVencimiento" className="block text-sm font-medium text-gray-700">Fecha de Vencimiento <span className="text-red-500">*</span></label>
          <input
            type="date"
            id="fechaVencimiento"
            value={fechaVencimiento}
            onChange={(e) => setFechaVencimiento(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            required
          />
        </div>
        <div>
          <label htmlFor="prioridad" className="block text-sm font-medium text-gray-700">Prioridad</label>
          <select
            id="prioridad"
            value={prioridad}
            onChange={(e) => setPrioridad(e.target.value as Tarea['prioridad'])}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
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
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
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
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div>
          <label htmlFor="notasAdicionales" className="block text-sm font-medium text-gray-700">Notas Adicionales</label>
          <textarea
            id="notasAdicionales"
            value={notasAdicionales}
            onChange={(e) => setNotasAdicionales(e.target.value)}
            rows={2}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Crear Tarea
        </button>
      </form>
    </div>
  );
};

export default TareaForm;