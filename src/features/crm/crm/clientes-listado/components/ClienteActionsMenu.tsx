import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Edit, Trash2, Mail, Phone, Copy, Archive } from 'lucide-react';

interface ClienteActionsMenuProps {
  clienteId: string;
  clienteNombre: string;
  clienteEmail: string;
  clienteTelefono?: string;
  onEdit?: (clienteId: string) => void;
}

const ClienteActionsMenu: React.FC<ClienteActionsMenuProps> = ({
  clienteId,
  clienteNombre,
  clienteEmail,
  clienteTelefono,
  onEdit
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleEdit = () => {
    setIsOpen(false);
    onEdit?.(clienteId);
  };

  const handleDelete = () => {
    setIsOpen(false);
    const confirmDelete = confirm(`¿Está seguro de que desea eliminar al cliente ${clienteNombre}? Esta acción no se puede deshacer.`);
    if (confirmDelete) {
      alert(`Cliente ${clienteNombre} eliminado correctamente`);
    }
  };

  const handleSendEmail = () => {
    setIsOpen(false);
    alert(`Enviar email a ${clienteEmail} (funcionalidad pendiente)`);
  };

  const handleCall = () => {
    setIsOpen(false);
    if (clienteTelefono) {
      alert(`Llamar a ${clienteTelefono} (funcionalidad pendiente)`);
    } else {
      alert('No hay número de teléfono disponible');
    }
  };

  const handleCopyInfo = () => {
    setIsOpen(false);
    const info = `Nombre: ${clienteNombre}\nEmail: ${clienteEmail}${clienteTelefono ? `\nTeléfono: ${clienteTelefono}` : ''}`;
    navigator.clipboard.writeText(info).then(() => {
      alert('Información copiada al portapapeles');
    }).catch(() => {
      alert('Error al copiar la información');
    });
  };

  const handleArchive = () => {
    setIsOpen(false);
    const confirmArchive = confirm(`¿Está seguro de que desea archivar al cliente ${clienteNombre}?`);
    if (confirmArchive) {
      alert(`Cliente ${clienteNombre} archivado correctamente`);
    }
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="p-1.5 rounded-md border border-gray-200 hover:bg-gray-100 transition-colors w-7 h-7 flex items-center justify-center"
        aria-label="Más acciones"
      >
        <span className="text-gray-600 leading-none" aria-hidden>⋯</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50"
          >
            <button
              onClick={handleEdit}
              className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <Edit className="w-4 h-4" />
              Editar cliente
            </button>
            
            <button
              onClick={handleSendEmail}
              className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <Mail className="w-4 h-4" />
              Enviar email
            </button>
            
            {clienteTelefono && (
              <button
                onClick={handleCall}
                className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <Phone className="w-4 h-4" />
                Llamar
              </button>
            )}
            
            <button
              onClick={handleCopyInfo}
              className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <Copy className="w-4 h-4" />
              Copiar información
            </button>
            
            <div className="border-t border-gray-100 my-1" />
            
            <button
              onClick={handleArchive}
              className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <Archive className="w-4 h-4" />
              Archivar
            </button>
            
            <button
              onClick={handleDelete}
              className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              Eliminar
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ClienteActionsMenu;
