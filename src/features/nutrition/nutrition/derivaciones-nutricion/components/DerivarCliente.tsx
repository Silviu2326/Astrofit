import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  UserPlus,
  Search,
  AlertCircle,
  FileText,
  Upload,
  X,
  Send,
  CheckCircle2,
  Info
} from 'lucide-react';
import { createDerivacion, getNutricionistas, getClientes } from '../derivacionesNutricionApi';
import type { NutricionistaExtendido, Cliente } from '../derivacionesNutricionApi';

const DerivarCliente: React.FC = () => {
  const [nutricionistas, setNutricionistas] = useState<NutricionistaExtendido[]>([]);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);

  // Form state
  const [selectedCliente, setSelectedCliente] = useState<string>('');
  const [searchCliente, setSearchCliente] = useState('');
  const [objetivo, setObjetivo] = useState('');
  const [restricciones, setRestricciones] = useState('');
  const [condicionesMedicas, setCondicionesMedicas] = useState('');
  const [medicamentos, setMedicamentos] = useState('');
  const [motivo, setMotivo] = useState('');
  const [urgencia, setUrgencia] = useState<'Normal' | 'Alta' | 'Urgente'>('Normal');
  const [nutricionistaId, setNutricionistaId] = useState('');
  const [documentos, setDocumentos] = useState<string[]>([]);
  const [showPreview, setShowPreview] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [nutData, cliData] = await Promise.all([
          getNutricionistas(),
          getClientes()
        ]);
        setNutricionistas(nutData.filter(n => n.disponibilidad !== 'No Disponible'));
        setClientes(cliData);
      } catch (error) {
        console.error('Error al cargar datos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredClientes = clientes.filter(c =>
    c.nombre.toLowerCase().includes(searchCliente.toLowerCase())
  );

  const selectedClienteData = clientes.find(c => c.id === selectedCliente);
  const selectedNutricionistaData = nutricionistas.find(n => n.id === nutricionistaId);

  const handleAddDocumento = () => {
    const docName = prompt('Nombre del documento (ejemplo: analisis_sangre.pdf):');
    if (docName && docName.trim()) {
      setDocumentos([...documentos, docName.trim()]);
    }
  };

  const handleRemoveDocumento = (index: number) => {
    setDocumentos(documentos.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedCliente || !nutricionistaId || !motivo) {
      alert('Por favor, complete todos los campos obligatorios.');
      return;
    }

    setSubmitting(true);

    try {
      const clienteData = clientes.find(c => c.id === selectedCliente);
      const nutricionistaData = nutricionistas.find(n => n.id === nutricionistaId);

      if (!clienteData || !nutricionistaData) {
        throw new Error('Datos no válidos');
      }

      await createDerivacion({
        clienteId: selectedCliente,
        clienteNombre: clienteData.nombre,
        clienteAvatar: clienteData.avatar,
        nutricionistaId,
        nutricionistaNombre: nutricionistaData.nombre,
        fechaDerivacion: new Date().toISOString().split('T')[0],
        urgencia,
        motivo,
        objetivo: objetivo || undefined,
        restricciones: restricciones || undefined,
        condicionesMedicas: condicionesMedicas || undefined,
        medicamentos: medicamentos || undefined,
        documentos: documentos.length > 0 ? documentos : undefined
      });

      setSuccess(true);

      // Reset form después de 2 segundos
      setTimeout(() => {
        setSelectedCliente('');
        setSearchCliente('');
        setObjetivo('');
        setRestricciones('');
        setCondicionesMedicas('');
        setMedicamentos('');
        setMotivo('');
        setUrgencia('Normal');
        setNutricionistaId('');
        setDocumentos([]);
        setShowPreview(false);
        setSuccess(false);
      }, 2000);

    } catch (error) {
      console.error('Error al crear derivación:', error);
      alert('Hubo un error al crear la derivación.');
    } finally {
      setSubmitting(false);
    }
  };

  const getUrgenciaColor = (urg: string) => {
    switch (urg) {
      case 'Urgente': return 'from-red-500 to-orange-500';
      case 'Alta': return 'from-orange-500 to-yellow-500';
      default: return 'from-blue-500 to-indigo-500';
    }
  };

  if (loading) {
    return (
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded-xl w-3/4"></div>
          <div className="h-12 bg-gray-200 rounded-xl"></div>
          <div className="h-12 bg-gray-200 rounded-xl"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 relative overflow-hidden">
      {/* Header con gradiente */}
      <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6 relative overflow-hidden">
        {/* Pattern de fondo */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        <h3 className="text-xl font-bold text-white flex items-center gap-2 relative z-10">
          <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
            <UserPlus className="w-6 h-6" />
          </div>
          Derivar Cliente
        </h3>
        <p className="text-blue-100 text-sm mt-2 relative z-10">
          Crea una nueva derivación a nutricionista profesional
        </p>
      </div>

      {/* Success Message */}
      <AnimatePresence>
        {success && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute inset-0 z-50 bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center"
          >
            <div className="text-center">
              <CheckCircle2 className="w-20 h-20 text-white mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">¡Derivación Enviada!</h3>
              <p className="text-green-100">La solicitud ha sido creada exitosamente</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Body */}
      <div className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Seleccionar Cliente */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <Search className="w-4 h-4 text-indigo-600" />
              Cliente a Derivar *
            </label>
            <div className="relative">
              <input
                type="text"
                className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm"
                placeholder="Buscar cliente..."
                value={searchCliente}
                onChange={(e) => setSearchCliente(e.target.value)}
              />
              {searchCliente && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-gray-200 max-h-48 overflow-auto z-10">
                  {filteredClientes.map((cliente) => (
                    <button
                      key={cliente.id}
                      type="button"
                      onClick={() => {
                        setSelectedCliente(cliente.id);
                        setSearchCliente(cliente.nombre);
                      }}
                      className="w-full px-4 py-3 text-left hover:bg-indigo-50 transition-colors flex items-center gap-3"
                    >
                      <span className="text-2xl">{cliente.avatar}</span>
                      <div>
                        <p className="font-medium text-gray-900">{cliente.nombre}</p>
                        <p className="text-xs text-gray-500">{cliente.email}</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
            {selectedClienteData && (
              <div className="mt-2 p-3 bg-indigo-50 rounded-xl flex items-center gap-3">
                <span className="text-3xl">{selectedClienteData.avatar}</span>
                <div>
                  <p className="font-bold text-indigo-900">{selectedClienteData.nombre}</p>
                  <p className="text-sm text-indigo-600">{selectedClienteData.email}</p>
                </div>
              </div>
            )}
          </div>

          {/* Objetivo */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Objetivo Principal
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none bg-white/80"
              placeholder="Ej: Mejorar rendimiento deportivo"
              value={objetivo}
              onChange={(e) => setObjetivo(e.target.value)}
            />
          </div>

          {/* Restricciones Alimentarias */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Restricciones Alimentarias
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none bg-white/80"
              placeholder="Ej: Intolerancia a lactosa, vegetariano"
              value={restricciones}
              onChange={(e) => setRestricciones(e.target.value)}
            />
          </div>

          {/* Condiciones Médicas */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Condiciones Médicas
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none bg-white/80"
              placeholder="Ej: Diabetes tipo 2, hipertensión"
              value={condicionesMedicas}
              onChange={(e) => setCondicionesMedicas(e.target.value)}
            />
          </div>

          {/* Medicamentos */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Medicamentos Actuales
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none bg-white/80"
              placeholder="Ej: Metformina 500mg"
              value={medicamentos}
              onChange={(e) => setMedicamentos(e.target.value)}
            />
          </div>

          {/* Motivo */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <FileText className="w-4 h-4 text-indigo-600" />
              Motivo de Derivación *
            </label>
            <textarea
              rows={4}
              className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none bg-white/80 resize-none"
              placeholder="Describe el motivo de la derivación..."
              value={motivo}
              onChange={(e) => setMotivo(e.target.value)}
              required
            ></textarea>
          </div>

          {/* Urgencia */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-indigo-600" />
              Nivel de Urgencia
            </label>
            <div className="grid grid-cols-3 gap-3">
              {(['Normal', 'Alta', 'Urgente'] as const).map((urg) => (
                <button
                  key={urg}
                  type="button"
                  onClick={() => setUrgencia(urg)}
                  className={`px-4 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    urgencia === urg
                      ? `bg-gradient-to-r ${getUrgenciaColor(urg)} text-white shadow-lg`
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {urg}
                </button>
              ))}
            </div>
          </div>

          {/* Nutricionista */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Nutricionista Sugerido *
            </label>
            <select
              className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none bg-white/80"
              value={nutricionistaId}
              onChange={(e) => setNutricionistaId(e.target.value)}
              required
            >
              <option value="">Seleccione un nutricionista</option>
              {nutricionistas.map((nut) => (
                <option key={nut.id} value={nut.id}>
                  {nut.nombre} - {nut.especialidades[0]}
                </option>
              ))}
            </select>
            {selectedNutricionistaData && (
              <div className="mt-2 p-3 bg-purple-50 rounded-xl">
                <p className="text-sm font-medium text-purple-900">
                  <span className="text-2xl mr-2">{selectedNutricionistaData.avatar}</span>
                  {selectedNutricionistaData.credenciales}
                </p>
                <p className="text-xs text-purple-600 mt-1">
                  {selectedNutricionistaData.especialidades.join(', ')}
                </p>
              </div>
            )}
          </div>

          {/* Documentos */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <Upload className="w-4 h-4 text-indigo-600" />
              Documentos Adjuntos
            </label>
            <button
              type="button"
              onClick={handleAddDocumento}
              className="w-full px-4 py-3 rounded-2xl border-2 border-dashed border-indigo-300 text-indigo-600 font-semibold hover:bg-indigo-50 transition-all duration-300"
            >
              + Agregar Documento
            </button>
            {documentos.length > 0 && (
              <div className="mt-3 space-y-2">
                {documentos.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-indigo-50 rounded-xl">
                    <span className="text-sm text-indigo-900 font-medium">{doc}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveDocumento(index)}
                      className="p-1 hover:bg-indigo-200 rounded-lg transition-colors"
                    >
                      <X className="w-4 h-4 text-indigo-600" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Preview Button */}
          <button
            type="button"
            onClick={() => setShowPreview(!showPreview)}
            className="w-full px-4 py-3 bg-gray-100 text-gray-700 rounded-2xl font-semibold hover:bg-gray-200 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Info className="w-5 h-5" />
            {showPreview ? 'Ocultar' : 'Ver'} Vista Previa
          </button>

          {/* Preview */}
          <AnimatePresence>
            {showPreview && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="p-4 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl border-2 border-indigo-200"
              >
                <h4 className="font-bold text-indigo-900 mb-3">Vista Previa de Derivación</h4>
                <div className="space-y-2 text-sm">
                  <p><span className="font-semibold">Cliente:</span> {selectedClienteData?.nombre || 'No seleccionado'}</p>
                  <p><span className="font-semibold">Nutricionista:</span> {selectedNutricionistaData?.nombre || 'No seleccionado'}</p>
                  <p><span className="font-semibold">Urgencia:</span> <span className={`px-2 py-1 rounded-lg text-white text-xs font-bold bg-gradient-to-r ${getUrgenciaColor(urgencia)}`}>{urgencia}</span></p>
                  {objetivo && <p><span className="font-semibold">Objetivo:</span> {objetivo}</p>}
                  {motivo && <p><span className="font-semibold">Motivo:</span> {motivo}</p>}
                  {documentos.length > 0 && <p><span className="font-semibold">Documentos:</span> {documentos.length}</p>}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={submitting || !selectedCliente || !nutricionistaId || !motivo}
            className="w-full relative overflow-hidden bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 p-4 text-white font-bold disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            {/* Efecto hover */}
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>

            <div className="relative z-10 flex items-center justify-center gap-2">
              {submitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Enviando...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Enviar Derivación
                </>
              )}
            </div>
          </button>
        </form>
      </div>
    </div>
  );
};

export default DerivarCliente;
