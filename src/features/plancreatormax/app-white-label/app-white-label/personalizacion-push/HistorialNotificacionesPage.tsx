import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Eye, Calendar, Send, Trash2, Bell } from 'lucide-react';
import toast from 'react-hot-toast';
import Modal from '@/components/ui/modal';
import ConfirmationModal from '@/components/ui/confirmation-modal';

const HistorialNotificacionesPage: React.FC = () => {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<'all' | 'sent' | 'scheduled'>('all');

  const [notifications, setNotifications] = useState(
    Array.from({ length: 24 }).map((_, i) => ({
      id: i + 1,
      title: i % 3 === 0 ? 'Oferta especial' : i % 3 === 1 ? 'Recordatorio semanal' : 'Bienvenido a la app',
      message:
        i % 3 === 0
          ? 'Aprovecha el 50% de descuento en nuestros planes.'
          : i % 3 === 1
          ? 'No olvides completar tu entrenamiento de esta semana.'
          : 'Gracias por unirte a nuestra app, ¡comienza hoy!',
      status: i % 4 === 0 ? 'scheduled' : 'sent',
      sentAt: `2024-01-${(i % 28) + 1}`,
      openRate: Math.floor(40 + (i * 7) % 50),
      clickRate: Math.floor(10 + (i * 5) % 30),
    }))
  );

  const filtered = useMemo(() => {
    return notifications.filter(n => {
      const matchesQuery = !query.trim() || n.title.toLowerCase().includes(query.toLowerCase()) || n.message.toLowerCase().includes(query.toLowerCase());
      const matchesStatus = status === 'all' || n.status === status;
      return matchesQuery && matchesStatus;
    });
  }, [notifications, query, status]);

  const [previewItem, setPreviewItem] = useState<typeof notifications[number] | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const openPreview = (id: number) => {
    const item = notifications.find(n => n.id === id) || null;
    setPreviewItem(item);
    setIsPreviewOpen(!!item);
  };

  const requestDelete = (id: number) => {
    setDeleteId(id);
    setIsDeleteOpen(true);
  };

  const confirmDelete = () => {
    if (!deleteId) return;
    setNotifications(prev => prev.filter(n => n.id !== deleteId));
    setIsDeleteOpen(false);
    setDeleteId(null);
    toast.success('Notificación eliminada');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/30 pb-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl shadow-2xl mb-8 p-8 md:p-12"
      >
        <div className="relative z-10">
          <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-3">Historial de Notificaciones</h1>
          <p className="text-blue-100 text-lg max-w-2xl">Consulta, filtra y gestiona todas las notificaciones enviadas y programadas.</p>
        </div>
      </motion.div>

      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 mb-6">
        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center">
          <div className="flex-1 flex items-center gap-3 px-4 py-3 rounded-2xl border-2 border-gray-200 bg-white/80">
            <Search className="w-5 h-5 text-gray-500" />
            <input
              value={query}
              onChange={(e)=>setQuery(e.target.value)}
              placeholder="Buscar por título o mensaje..."
              className="flex-1 outline-none bg-transparent text-gray-800"
            />
          </div>
          <div className="flex items-center gap-2">
            <div className="px-3 py-2 rounded-xl border-2 border-gray-200 bg-white/70 flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <select value={status} onChange={(e)=>setStatus(e.target.value as any)} className="bg-transparent outline-none text-gray-700">
                <option value="all">Todos</option>
                <option value="sent">Enviados</option>
                <option value="scheduled">Programados</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left text-xs font-semibold text-gray-600 uppercase tracking-wider px-6 py-4">Título</th>
                <th className="text-left text-xs font-semibold text-gray-600 uppercase tracking-wider px-6 py-4">Mensaje</th>
                <th className="text-left text-xs font-semibold text-gray-600 uppercase tracking-wider px-6 py-4">Estado</th>
                <th className="text-left text-xs font-semibold text-gray-600 uppercase tracking-wider px-6 py-4">Fecha</th>
                <th className="text-left text-xs font-semibold text-gray-600 uppercase tracking-wider px-6 py-4">Aperturas</th>
                <th className="text-left text-xs font-semibold text-gray-600 uppercase tracking-wider px-6 py-4">Clics</th>
                <th className="px-6 py-4" />
              </tr>
            </thead>
            <tbody>
              {filtered.map(n => (
                <tr key={n.id} className="border-t border-gray-100 hover:bg-indigo-50/40">
                  <td className="px-6 py-4 font-semibold text-gray-900">{n.title}</td>
                  <td className="px-6 py-4 text-gray-700 max-w-xl truncate">{n.message}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1.5 rounded-full text-xs font-semibold ${n.status==='sent' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{n.status}</span>
                  </td>
                  <td className="px-6 py-4 text-gray-700 flex items-center gap-2"><Calendar className="w-4 h-4 text-gray-500" /> {n.sentAt}</td>
                  <td className="px-6 py-4 text-gray-700">{n.openRate}%</td>
                  <td className="px-6 py-4 text-gray-700">{n.clickRate}%</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2 justify-end">
                      <button onClick={()=>openPreview(n.id)} className="px-3 py-2 rounded-lg border border-gray-200 text-gray-700 hover:border-gray-300 flex items-center gap-2">
                        <Eye className="w-4 h-4" /> Vista previa
                      </button>
                      {n.status==='scheduled' ? (
                        <button onClick={()=>{ setNotifications(prev=>prev.map(x=>x.id===n.id?{...x,status:'sent'}:x)); toast.success('Enviada'); }} className="px-3 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 flex items-center gap-2">
                          <Send className="w-4 h-4" /> Enviar ahora
                        </button>
                      ) : (
                        <button onClick={()=>requestDelete(n.id)} className="px-3 py-2 rounded-lg text-red-600 border border-red-200 hover:bg-red-50 flex items-center gap-2">
                          <Trash2 className="w-4 h-4" /> Eliminar
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Vista previa */}
      <Modal isOpen={isPreviewOpen} onClose={() => setIsPreviewOpen(false)} title="Vista previa de notificación" size="sm">
        {previewItem && (
          <div className="flex justify-center">
            <div className="w-80 rounded-3xl border-2 border-gray-200 bg-white shadow-xl overflow-hidden">
              <div className="bg-slate-900 px-4 py-2 text-white text-xs flex items-center justify-between">
                <span>9:41</span>
                <div className="flex gap-1">
                  <span>5G</span>
                  <span>🔋</span>
                </div>
              </div>
              <div className="p-4 flex gap-3 items-start">
                <div className="p-2 bg-indigo-100 rounded-xl text-indigo-700">
                  <Bell className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-900 mb-1">{previewItem.title}</p>
                  <p className="text-sm text-gray-700 leading-snug">{previewItem.message}</p>
                  <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
                    <Calendar className="w-3.5 h-3.5" /> {previewItem.sentAt} · {previewItem.status}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Modal Confirmación eliminar */}
      <ConfirmationModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={confirmDelete}
        title="Eliminar notificación"
        message="Esta acción es permanente. ¿Deseas eliminar esta notificación?"
        confirmText="Eliminar"
        cancelText="Cancelar"
        type="danger"
      />
    </div>
  );
};

export default HistorialNotificacionesPage;


