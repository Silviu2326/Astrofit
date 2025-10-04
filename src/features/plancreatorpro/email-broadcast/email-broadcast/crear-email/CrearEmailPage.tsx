import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Edit3, Target, Eye, Clock, Sparkles, Save, Send } from 'lucide-react';
import toast from 'react-hot-toast';
import EditorEmail, { EditorEmailRef } from './components/EditorEmail';
import BloquesArrastrables from './components/BloquesArrastrables';
import SegmentacionDestinatarios from './components/SegmentacionDestinatarios';
import PreviewNewsletter from './components/PreviewNewsletter';
import BlockConfigModal from './components/BlockConfigModal';

const CrearEmailPage: React.FC = () => {
  // State management
  const [emailSubject, setEmailSubject] = useState('');
  const [enableABTest, setEnableABTest] = useState(false);
  const [sendDate, setSendDate] = useState('');
  const [sendTime, setSendTime] = useState('');
  const [selectedSegment, setSelectedSegment] = useState('');
  const [emailContent, setEmailContent] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isSending, setIsSending] = useState(false);
  
  // Modal state for block configuration
  const [isBlockConfigModalOpen, setIsBlockConfigModalOpen] = useState(false);
  const [editingBlock, setEditingBlock] = useState<any>(null);
  const [editorRef, setEditorRef] = useState<EditorEmailRef | null>(null);

  // Handler functions
  const handleSaveEmail = async () => {
    if (!emailSubject.trim()) {
      toast.error('Por favor, ingresa un asunto para el email');
      return;
    }
    
    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success('Email guardado exitosamente');
    } catch (error) {
      toast.error('Error al guardar el email');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSendEmail = async () => {
    if (!emailSubject.trim()) {
      toast.error('Por favor, ingresa un asunto para el email');
      return;
    }
    if (!selectedSegment) {
      toast.error('Por favor, selecciona un segmento de destinatarios');
      return;
    }
    if (!sendDate || !sendTime) {
      toast.error('Por favor, configura la fecha y hora de envío');
      return;
    }

    setIsSending(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success('Email programado para envío exitosamente');
    } catch (error) {
      toast.error('Error al programar el envío del email');
    } finally {
      setIsSending(false);
    }
  };

  const handleSubjectChange = (value: string) => {
    setEmailSubject(value);
  };

  const handleSegmentChange = (segment: string) => {
    setSelectedSegment(segment);
  };

  // Block configuration handlers
  const handleBlockConfigure = (block: any) => {
    setEditingBlock(block);
    setIsBlockConfigModalOpen(true);
  };

  const handleBlockConfigSave = (config: any) => {
    // Update the block in the editor
    if (editorRef && editingBlock) {
      editorRef.updateBlockConfig(editingBlock.id, config);
    }
    setIsBlockConfigModalOpen(false);
    setEditingBlock(null);
  };

  const handleBlockConfigClose = () => {
    setIsBlockConfigModalOpen(false);
    setEditingBlock(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/30 pb-12">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl shadow-2xl mb-8 p-8 md:p-12"
      >
        {/* Efectos de fondo animados */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        <div className="relative z-10">
          {/* Título con icono animado */}
          <div className="flex items-center gap-3 mb-4">
            <div className="relative">
              <Edit3 className="w-10 h-10 text-yellow-300 animate-pulse" />
              <div className="absolute inset-0 w-10 h-10 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Crear <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Email</span>
            </h1>
          </div>

          {/* Descripción */}
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl leading-relaxed">
            Diseña y envía <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">emails profesionales</span> con nuestro editor drag & drop
          </p>

          {/* Indicadores pills */}
          <div className="mt-8 flex flex-wrap gap-4">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Target className="w-5 h-5 text-green-300" />
              <span className="text-sm font-semibold text-white">Segmentación Avanzada</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Eye className="w-5 h-5 text-blue-300" />
              <span className="text-sm font-semibold text-white">Preview en Tiempo Real</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Clock className="w-5 h-5 text-purple-300" />
              <span className="text-sm font-semibold text-white">Programación Inteligente</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Pruebas A/B de asunto */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden mb-8"
      >
        {/* Decoración de fondo */}
        <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-orange-200 to-pink-200 rounded-full blur-3xl opacity-20"></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-gradient-to-br from-orange-500 to-pink-500 rounded-xl backdrop-blur-sm">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-pink-600">
              Asunto del Email y Pruebas A/B
            </h2>
          </div>
          <p className="text-gray-600 mb-4">Configura el asunto del email y las opciones para pruebas A/B para optimizar el rendimiento.</p>
          
          {/* Input placeholder */}
          <div className="space-y-4">
            <input
              type="text"
              value={emailSubject}
              onChange={(e) => handleSubjectChange(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm"
              placeholder="Escribe el asunto de tu email..."
            />
            <div className="flex items-center gap-2">
              <input 
                type="checkbox" 
                className="rounded-lg" 
                checked={enableABTest}
                onChange={(e) => setEnableABTest(e.target.checked)}
              />
              <span className="text-sm text-gray-600">Activar prueba A/B para optimizar el asunto</span>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2">
          <EditorEmail 
            onContentChange={setEmailContent} 
            onBlockConfigure={handleBlockConfigure}
            ref={setEditorRef}
          />
        </div>
        <div className="lg:col-span-1">
          <BloquesArrastrables />
        </div>
      </div>

      {/* Segmentación de destinatarios */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="mb-8"
      >
        <SegmentacionDestinatarios onSegmentChange={handleSegmentChange} selectedSegment={selectedSegment} />
      </motion.div>

      {/* Preview tipo newsletter y live preview en tiempo real */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="mb-8"
      >
        <PreviewNewsletter emailContent={emailContent} emailSubject={emailSubject} />
      </motion.div>

      {/* Programación de envío */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden"
      >
        {/* Decoración de fondo */}
        <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-blue-200 to-indigo-200 rounded-full blur-3xl opacity-20"></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl backdrop-blur-sm">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              Programación de Envío
            </h2>
          </div>
          <p className="text-gray-600 mb-4">Define cuándo se enviará este email para maximizar el engagement.</p>
          
          {/* Controles de programación */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Fecha de envío</label>
              <input
                type="date"
                value={sendDate}
                onChange={(e) => setSendDate(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Hora de envío</label>
              <input
                type="time"
                value={sendTime}
                onChange={(e) => setSendTime(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm"
              />
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSaveEmail}
              disabled={isSaving}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Guardando...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Guardar Borrador
                </>
              )}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSendEmail}
              disabled={isSending}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSending ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Enviando...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Programar Envío
                </>
              )}
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Block Configuration Modal */}
      <BlockConfigModal
        isOpen={isBlockConfigModalOpen}
        onClose={handleBlockConfigClose}
        blockType={editingBlock?.type || 'text'}
        onSave={handleBlockConfigSave}
        initialConfig={editingBlock?.config}
      />
    </div>
  );
};

export default CrearEmailPage;
