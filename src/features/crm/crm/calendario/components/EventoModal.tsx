import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, MapPin, Users, Bell, Type } from 'lucide-react';
import { Evento } from '../calendarioApi';

interface EventoModalProps {
  evento: Evento | null;
  onClose: () => void;
  onSave: (eventoData: Partial<Evento>) => void;
}

const EventoModal: React.FC<EventoModalProps> = ({ evento, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    fechaInicio: '',
    horaInicio: '',
    fechaFin: '',
    horaFin: '',
    tipo: 'cita' as 'cita' | 'clase' | 'reunion' | 'evento' | 'otro',
    ubicacion: '',
    recordatorio: false,
    minutosAntes: 15
  });

  useEffect(() => {
    if (evento) {
      const fechaInicio = new Date(evento.fechaInicio);
      const fechaFin = new Date(evento.fechaFin);

      setFormData({
        titulo: evento.titulo,
        descripcion: evento.descripcion || '',
        fechaInicio: fechaInicio.toISOString().split('T')[0],
        horaInicio: fechaInicio.toTimeString().slice(0, 5),
        fechaFin: fechaFin.toISOString().split('T')[0],
        horaFin: fechaFin.toTimeString().slice(0, 5),
        tipo: evento.tipo,
        ubicacion: evento.ubicacion || '',
        recordatorio: evento.recordatorio || false,
        minutosAntes: evento.minutosAntes || 15
      });
    }
  }, [evento]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const fechaInicioISO = `${formData.fechaInicio}T${formData.horaInicio}:00`;
    const fechaFinISO = `${formData.fechaFin}T${formData.horaFin}:00`;

    const eventoData = {
      titulo: formData.titulo,
      descripcion: formData.descripcion,
      fechaInicio: fechaInicioISO,
      fechaFin: fechaFinISO,
      tipo: formData.tipo,
      ubicacion: formData.ubicacion,
      recordatorio: formData.recordatorio,
      minutosAntes: formData.minutosAntes
    };

    onSave(eventoData);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800">
              {evento ? 'Editar Evento' : 'Nuevo Evento'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Título */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Type className="w-4 h-4 inline mr-2" />
                Título *
              </label>
              <input
                type="text"
                required
                value={formData.titulo}
                onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Nombre del evento"
              />
            </div>

            {/* Tipo */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de evento *
              </label>
              <select
                value={formData.tipo}
                onChange={(e) => setFormData({ ...formData, tipo: e.target.value as any })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="cita">Cita</option>
                <option value="clase">Clase</option>
                <option value="reunion">Reunión</option>
                <option value="evento">Evento</option>
                <option value="otro">Otro</option>
              </select>
            </div>

            {/* Fechas */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="w-4 h-4 inline mr-2" />
                  Fecha inicio *
                </label>
                <input
                  type="date"
                  required
                  value={formData.fechaInicio}
                  onChange={(e) => setFormData({ ...formData, fechaInicio: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Clock className="w-4 h-4 inline mr-2" />
                  Hora inicio *
                </label>
                <input
                  type="time"
                  required
                  value={formData.horaInicio}
                  onChange={(e) => setFormData({ ...formData, horaInicio: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fecha fin *
                </label>
                <input
                  type="date"
                  required
                  value={formData.fechaFin}
                  onChange={(e) => setFormData({ ...formData, fechaFin: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hora fin *
                </label>
                <input
                  type="time"
                  required
                  value={formData.horaFin}
                  onChange={(e) => setFormData({ ...formData, horaFin: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Ubicación */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MapPin className="w-4 h-4 inline mr-2" />
                Ubicación
              </label>
              <input
                type="text"
                value={formData.ubicacion}
                onChange={(e) => setFormData({ ...formData, ubicacion: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Dirección o lugar del evento"
              />
            </div>

            {/* Descripción */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descripción
              </label>
              <textarea
                value={formData.descripcion}
                onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Detalles adicionales del evento"
              />
            </div>

            {/* Recordatorio */}
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.recordatorio}
                  onChange={(e) => setFormData({ ...formData, recordatorio: e.target.checked })}
                  className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
                <span className="text-sm font-medium text-gray-700">
                  <Bell className="w-4 h-4 inline mr-2" />
                  Activar recordatorio
                </span>
              </label>

              {formData.recordatorio && (
                <select
                  value={formData.minutosAntes}
                  onChange={(e) => setFormData({ ...formData, minutosAntes: Number(e.target.value) })}
                  className="px-3 py-1 border border-gray-300 rounded-lg text-sm"
                >
                  <option value={5}>5 minutos antes</option>
                  <option value={15}>15 minutos antes</option>
                  <option value={30}>30 minutos antes</option>
                  <option value={60}>1 hora antes</option>
                  <option value={1440}>1 día antes</option>
                </select>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
              >
                {evento ? 'Actualizar' : 'Crear'} Evento
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default EventoModal;
