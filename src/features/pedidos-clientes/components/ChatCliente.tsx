import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send,
  Paperclip,
  Image as ImageIcon,
  File,
  X,
  Download,
  Clock,
  CheckCheck
} from 'lucide-react';
import type { Pedido, Mensaje } from '../types';

interface ChatClienteProps {
  pedido: Pedido;
}

export const ChatCliente: React.FC<ChatClienteProps> = ({ pedido }) => {
  const [mensaje, setMensaje] = useState('');
  const [mensajes, setMensajes] = useState<Mensaje[]>(pedido.mensajes);
  const [archivosAdjuntos, setArchivosAdjuntos] = useState<File[]>([]);
  const mensajesRef = useRef<HTMLDivElement>(null);
  const inputFileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (mensajesRef.current) {
      mensajesRef.current.scrollTop = mensajesRef.current.scrollHeight;
    }
  }, [mensajes]);

  const handleEnviarMensaje = () => {
    if (!mensaje.trim() && archivosAdjuntos.length === 0) return;

    const nuevoMensaje: Mensaje = {
      id: Date.now().toString(),
      pedidoId: pedido.id,
      remitente: 'empresa',
      nombreRemitente: 'Equipo de Soporte',
      mensaje: mensaje,
      fecha: new Date(),
      leido: true,
      adjuntos: archivosAdjuntos.map(f => f.name)
    };

    setMensajes([...mensajes, nuevoMensaje]);
    setMensaje('');
    setArchivosAdjuntos([]);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleEnviarMensaje();
    }
  };

  const handleAdjuntarArchivo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setArchivosAdjuntos([...archivosAdjuntos, ...files]);
  };

  const eliminarAdjunto = (index: number) => {
    setArchivosAdjuntos(archivosAdjuntos.filter((_, i) => i !== index));
  };

  const formatearFecha = (fecha: Date) => {
    const ahora = new Date();
    const diff = ahora.getTime() - new Date(fecha).getTime();
    const minutos = Math.floor(diff / 60000);
    const horas = Math.floor(diff / 3600000);
    const dias = Math.floor(diff / 86400000);

    if (minutos < 1) return 'Ahora';
    if (minutos < 60) return `Hace ${minutos}m`;
    if (horas < 24) return `Hace ${horas}h`;
    if (dias < 7) return `Hace ${dias}d`;

    return new Date(fecha).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short'
    });
  };

  const obtenerIconoAdjunto = (nombre: string) => {
    const extension = nombre.split('.').pop()?.toLowerCase();
    if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(extension || '')) {
      return ImageIcon;
    }
    return File;
  };

  return (
    <div className="flex flex-col h-[600px]">
      {/* Header del chat */}
      <div className="bg-gradient-to-r from-cyan-50 to-blue-50 p-4 rounded-t-xl border-b border-gray-200">
        <div className="flex items-center gap-3">
          {pedido.cliente.avatar ? (
            <img
              src={pedido.cliente.avatar}
              alt={pedido.cliente.nombre}
              className="w-12 h-12 rounded-full object-cover"
            />
          ) : (
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-lg">
              {pedido.cliente.nombre.charAt(0)}
            </div>
          )}
          <div>
            <h4 className="font-semibold text-gray-900">{pedido.cliente.nombre}</h4>
            <p className="text-sm text-gray-600">{pedido.cliente.email}</p>
          </div>
        </div>
      </div>

      {/* Área de mensajes */}
      <div
        ref={mensajesRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50"
      >
        <AnimatePresence>
          {mensajes.map((msg, index) => {
            const esCliente = msg.remitente === 'cliente';
            const IconoAdjunto = msg.adjuntos?.[0] ? obtenerIconoAdjunto(msg.adjuntos[0]) : File;

            return (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.05 }}
                className={`flex ${esCliente ? 'justify-start' : 'justify-end'}`}
              >
                <div className={`max-w-[70%] ${esCliente ? 'order-1' : 'order-2'}`}>
                  <div className="flex items-center gap-2 mb-1">
                    {esCliente && (
                      <span className="text-xs font-medium text-gray-600">
                        {msg.nombreRemitente}
                      </span>
                    )}
                    <span className="text-xs text-gray-500">
                      {formatearFecha(msg.fecha)}
                    </span>
                  </div>

                  <div className={`rounded-2xl px-4 py-3 ${
                    esCliente
                      ? 'bg-white text-gray-900 rounded-tl-none'
                      : 'bg-gradient-to-br from-cyan-500 to-blue-500 text-white rounded-tr-none'
                  }`}>
                    <p className="text-sm whitespace-pre-wrap">{msg.mensaje}</p>

                    {msg.adjuntos && msg.adjuntos.length > 0 && (
                      <div className="mt-3 space-y-2">
                        {msg.adjuntos.map((adjunto, i) => (
                          <div
                            key={i}
                            className={`flex items-center gap-2 p-2 rounded-lg ${
                              esCliente ? 'bg-gray-100' : 'bg-white/20'
                            }`}
                          >
                            <IconoAdjunto className="w-4 h-4" />
                            <span className="text-xs flex-1 truncate">{adjunto}</span>
                            <button className="p-1 hover:bg-white/20 rounded">
                              <Download className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {!esCliente && (
                    <div className="flex items-center justify-end gap-1 mt-1">
                      {msg.leido ? (
                        <CheckCheck className="w-4 h-4 text-blue-500" />
                      ) : (
                        <Clock className="w-4 h-4 text-gray-400" />
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {mensajes.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Send className="w-8 h-8 text-blue-600" />
            </div>
            <p className="text-gray-500">No hay mensajes aún</p>
            <p className="text-sm text-gray-400 mt-1">
              Inicia la conversación con tu cliente
            </p>
          </div>
        )}
      </div>

      {/* Archivos adjuntos preview */}
      {archivosAdjuntos.length > 0 && (
        <div className="px-4 py-2 bg-gray-100 border-t border-gray-200">
          <div className="flex items-center gap-2 flex-wrap">
            {archivosAdjuntos.map((archivo, index) => {
              const IconoArchivo = obtenerIconoAdjunto(archivo.name);
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-2 px-3 py-2 bg-white rounded-lg border border-gray-200"
                >
                  <IconoArchivo className="w-4 h-4 text-blue-600" />
                  <span className="text-sm text-gray-700 max-w-[150px] truncate">
                    {archivo.name}
                  </span>
                  <button
                    onClick={() => eliminarAdjunto(index)}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <X className="w-3 h-3 text-gray-500" />
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {/* Input de mensaje */}
      <div className="p-4 bg-white border-t border-gray-200 rounded-b-xl">
        <div className="flex items-end gap-3">
          <input
            ref={inputFileRef}
            type="file"
            multiple
            onChange={handleAdjuntarArchivo}
            className="hidden"
          />
          <button
            onClick={() => inputFileRef.current?.click()}
            className="p-3 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            title="Adjuntar archivo"
          >
            <Paperclip className="w-5 h-5" />
          </button>

          <div className="flex-1 relative">
            <textarea
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Escribe un mensaje..."
              rows={1}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              style={{ minHeight: '48px', maxHeight: '120px' }}
            />
          </div>

          <button
            onClick={handleEnviarMensaje}
            disabled={!mensaje.trim() && archivosAdjuntos.length === 0}
            className="p-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>

        <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
          <span>Presiona Enter para enviar</span>
          <span>Shift + Enter para nueva línea</span>
        </div>
      </div>
    </div>
  );
};
