import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, AlertCircle } from 'lucide-react';
import { createOrGetCliente, NewClienteInput, Cliente, updateCliente } from '../clientesListadoApi';

interface ClienteFormModalProps {
  open: boolean;
  onClose: () => void;
  onCreated?: (result: { id: string; existed: boolean }) => void;
  cliente?: Cliente | null;
  onUpdated?: (cliente: Cliente) => void;
}

const ClienteFormModal: React.FC<ClienteFormModalProps> = ({ open, onClose, onCreated, cliente, onUpdated }) => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [estado, setEstado] = useState<'activo' | 'inactivo'>('activo');
  const [etiquetas, setEtiquetas] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<{ message: string; existed: boolean } | null>(null);

  // Prefill when editing
  useEffect(() => {
    if (open && cliente) {
      setNombre(cliente.nombre || '');
      setEmail(cliente.email || '');
      setTelefono(cliente.telefono || '');
      setEstado(cliente.estado || 'activo');
      setEtiquetas((cliente.etiquetas || []).join(', '));
      setError(null);
      setSuccess(null);
    } else if (open && !cliente) {
      // ensure blank for new
      resetForm();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, cliente?.id]);

  const resetForm = () => {
    setNombre('');
    setEmail('');
    setTelefono('');
    setEstado('activo');
    setEtiquetas('');
    setError(null);
    setSuccess(null);
    setSubmitting(false);
  };

  const handleClose = () => {
    if (!submitting) {
      resetForm();
      onClose();
    }
  };

  const validate = () => {
    if (!nombre.trim()) return 'El nombre es obligatorio';
    if (!email.trim() && !telefono.trim()) return 'Email o teléfono es obligatorio';
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Email inválido';
    return null;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const v = validate();
    if (v) {
      setError(v);
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const payload: NewClienteInput = {
        nombre,
        email,
        telefono,
        estado,
        etiquetas: etiquetas
          .split(',')
          .map(t => t.trim())
          .filter(Boolean),
      };
      if (cliente && cliente.id) {
        const updated = updateCliente(cliente.id, payload);
        setSuccess({ message: 'Cliente actualizado correctamente.', existed: true });
        onUpdated?.(updated);
      } else {
        const { cliente: created, existed } = createOrGetCliente(payload);
        setSuccess({ message: existed ? 'El cliente ya existía. Abierto el registro existente.' : 'Cliente creado correctamente.', existed });
        onCreated?.({ id: created.id, existed });
      }
      setTimeout(() => {
        handleClose();
      }, 600);
    } catch (err: any) {
      setError(err?.message || 'No se pudo crear el cliente');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 240, damping: 22 }}
            className="bg-white w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-5 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900">{cliente ? 'Editar Cliente' : 'Nuevo Cliente'}</h3>
              <button onClick={handleClose} className="p-2 rounded-lg hover:bg-gray-100">
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <form onSubmit={onSubmit} className="p-5 space-y-4">
              {error && (
                <div className="flex items-center gap-2 text-red-700 bg-red-50 border border-red-200 px-3 py-2 rounded-lg">
                  <AlertCircle className="w-4 h-4" />
                  <span className="text-sm font-medium">{error}</span>
                </div>
              )}
              {success && (
                <div className="flex items-center gap-2 text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-2 rounded-lg">
                  <CheckCircle2 className="w-4 h-4" />
                  <span className="text-sm font-medium">{success.message}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-gray-700">Nombre</label>
                  <input
                    className="mt-1 w-full px-3 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                    placeholder="Ej. Ana García"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700">Estado</label>
                  <select
                    className="mt-1 w-full px-3 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                    value={estado}
                    onChange={e => setEstado(e.target.value as any)}
                  >
                    <option value="activo">Activo</option>
                    <option value="inactivo">Inactivo</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700">Email</label>
                  <input
                    type="email"
                    className="mt-1 w-full px-3 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="ana@ejemplo.com"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700">Teléfono</label>
                  <input
                    className="mt-1 w-full px-3 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={telefono}
                    onChange={e => setTelefono(e.target.value)}
                    placeholder="+34 600 000 000"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-sm font-semibold text-gray-700">Etiquetas (separadas por coma)</label>
                  <input
                    className="mt-1 w-full px-3 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={etiquetas}
                    onChange={e => setEtiquetas(e.target.value)}
                    placeholder="premium, online"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button type="button" onClick={handleClose} className="px-4 py-2 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50">
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 disabled:opacity-60"
                >
                  {submitting ? 'Guardando...' : (cliente ? 'Actualizar' : 'Guardar')}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ClienteFormModal;


