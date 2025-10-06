
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Send, Eye, CheckCircle, AlertCircle } from 'lucide-react';

interface PersonalizadorMasivoProps {
  mensaje: string;
}

interface Cliente {
  id: string;
  nombre: string;
  objetivo: string;
  progreso: number;
  proximaSesion: string;
  email: string;
}

const PersonalizadorMasivo: React.FC<PersonalizadorMasivoProps> = ({ mensaje }) => {
  const [clientesSeleccionados, setClientesSeleccionados] = useState<Set<string>>(new Set());
  const [previsualizandoCliente, setPrevisualizandoCliente] = useState<Cliente | null>(null);

  const clientes: Cliente[] = [
    { id: '1', nombre: 'Ana García', objetivo: 'Perder 5kg', progreso: 60, proximaSesion: '2024-01-15 10:00', email: 'ana@ejemplo.com' },
    { id: '2', nombre: 'Carlos Ruiz', objetivo: 'Ganar masa muscular', progreso: 45, proximaSesion: '2024-01-15 14:00', email: 'carlos@ejemplo.com' },
    { id: '3', nombre: 'María López', objetivo: 'Mejorar resistencia', progreso: 75, proximaSesion: '2024-01-16 09:00', email: 'maria@ejemplo.com' },
    { id: '4', nombre: 'Juan Pérez', objetivo: 'Tonificar', progreso: 50, proximaSesion: '2024-01-16 11:00', email: 'juan@ejemplo.com' },
    { id: '5', nombre: 'Laura Martínez', objetivo: 'Perder 8kg', progreso: 35, proximaSesion: '2024-01-17 10:00', email: 'laura@ejemplo.com' },
    { id: '6', nombre: 'Pedro Sánchez', objetivo: 'Ganar fuerza', progreso: 80, proximaSesion: '2024-01-17 15:00', email: 'pedro@ejemplo.com' }
  ];

  const toggleCliente = (clienteId: string) => {
    const newSet = new Set(clientesSeleccionados);
    if (newSet.has(clienteId)) {
      newSet.delete(clienteId);
    } else {
      newSet.add(clienteId);
    }
    setClientesSeleccionados(newSet);
  };

  const personalizarMensaje = (cliente: Cliente): string => {
    return mensaje
      .replace(/\{\{nombre\}\}/g, cliente.nombre)
      .replace(/\{\{objetivo\}\}/g, cliente.objetivo)
      .replace(/\{\{progreso\}\}/g, `${cliente.progreso}%`)
      .replace(/\{\{proxima_sesion\}\}/g, cliente.proximaSesion);
  };

  const handleEnviarMasivo = () => {
    if (clientesSeleccionados.size === 0) {
      alert('Selecciona al menos un cliente');
      return;
    }
    alert(`Enviando mensaje a ${clientesSeleccionados.size} clientes...`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 overflow-hidden"
    >
      {/* Header con gradiente */}
      <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 p-6 relative overflow-hidden">
        {/* Pattern de fondo */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        <h3 className="text-xl font-bold text-white flex items-center gap-2 relative z-10">
          <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
            <Users className="w-6 h-6" />
          </div>
          Personalizador Masivo
        </h3>
        <p className="text-sm text-teal-100 mt-1 relative z-10">
          {clientesSeleccionados.size} de {clientes.length} clientes seleccionados
        </p>
      </div>

      {/* Body */}
      <div className="p-6 space-y-4">
        {/* Info mensaje */}
        {!mensaje && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded-lg">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-yellow-600" />
              <p className="text-sm text-yellow-800">
                Genera un mensaje primero para personalizarlo
              </p>
            </div>
          </div>
        )}

        {/* Lista de clientes */}
        <div className="space-y-2 max-h-96 overflow-y-auto pr-2">
          {clientes.map((cliente, index) => {
            const isSeleccionado = clientesSeleccionados.has(cliente.id);

            return (
              <motion.div
                key={cliente.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                className={`p-4 rounded-2xl border-2 transition-all duration-300 cursor-pointer ${
                  isSeleccionado
                    ? 'border-emerald-500 bg-gradient-to-r from-emerald-50 to-teal-50 shadow-md'
                    : 'border-gray-200 bg-white hover:border-emerald-300 hover:shadow-sm'
                }`}
                onClick={() => toggleCliente(cliente.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm ${
                      isSeleccionado
                        ? 'bg-gradient-to-br from-emerald-500 to-teal-600'
                        : 'bg-gradient-to-br from-gray-400 to-gray-500'
                    }`}>
                      {cliente.nombre.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800">{cliente.nombre}</p>
                      <p className="text-xs text-gray-600">{cliente.email}</p>
                      <div className="mt-2 flex items-center gap-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-1.5">
                          <div
                            className="bg-gradient-to-r from-emerald-500 to-teal-600 h-1.5 rounded-full"
                            style={{ width: `${cliente.progreso}%` }}
                          ></div>
                        </div>
                        <span className="text-xs font-semibold text-gray-600">{cliente.progreso}%</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Objetivo: {cliente.objetivo}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setPrevisualizandoCliente(cliente);
                      }}
                      className="p-2 bg-gray-100 rounded-lg hover:bg-emerald-100 transition-colors duration-200"
                      title="Vista previa"
                    >
                      <Eye className="w-4 h-4 text-gray-600" />
                    </button>
                    {isSeleccionado && (
                      <CheckCircle className="w-6 h-6 text-emerald-500" />
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Botones de acción */}
        <div className="flex gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setClientesSeleccionados(new Set(clientes.map(c => c.id)))}
            className="flex-1 bg-gray-100 text-gray-700 font-semibold py-3 rounded-2xl hover:bg-gray-200 transition-all duration-300"
          >
            Seleccionar Todos
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleEnviarMasivo}
            disabled={clientesSeleccionados.size === 0}
            className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-4 h-4" />
            Enviar a {clientesSeleccionados.size} Cliente{clientesSeleccionados.size !== 1 ? 's' : ''}
          </motion.button>
        </div>

        {/* Modal de vista previa */}
        {previsualizandoCliente && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setPrevisualizandoCliente(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6"
            >
              <h4 className="text-xl font-bold text-gray-800 mb-4">Vista Previa - {previsualizandoCliente.nombre}</h4>
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-4 border-2 border-emerald-200">
                <p className="text-sm text-gray-800 whitespace-pre-wrap">
                  {mensaje ? personalizarMensaje(previsualizandoCliente) : 'No hay mensaje para previsualizar'}
                </p>
              </div>
              <button
                onClick={() => setPrevisualizandoCliente(null)}
                className="mt-4 w-full bg-gray-100 text-gray-700 font-semibold py-2 rounded-xl hover:bg-gray-200 transition-colors duration-200"
              >
                Cerrar
              </button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default PersonalizadorMasivo;
