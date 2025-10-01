import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, GripVertical, Check, Lightbulb, AlertTriangle, ChevronDown, ChevronUp } from 'lucide-react';

interface InstruccionesEditorProps {
  initialContent: string;
  onContentChange: (content: string) => void;
}

interface Step {
  id: string;
  content: string;
}

const InstruccionesEditor: React.FC<InstruccionesEditorProps> = ({ initialContent, onContentChange }) => {
  const [steps, setSteps] = useState<Step[]>([]);
  const [newStep, setNewStep] = useState('');
  const [tips, setTips] = useState('');
  const [warnings, setWarnings] = useState('');
  const [showTips, setShowTips] = useState(false);
  const [showWarnings, setShowWarnings] = useState(false);

  useEffect(() => {
    // Parse initial content if it's a string (convert to steps)
    if (initialContent && typeof initialContent === 'string') {
      const parsedSteps = initialContent.split('\n').filter(Boolean).map((step, index) => ({
        id: `step-${index}`,
        content: step.replace(/^\d+\.\s*/, '')
      }));
      setSteps(parsedSteps);
    }
  }, [initialContent]);

  useEffect(() => {
    // Update parent with stringified steps
    const content = steps.map((step, index) => `${index + 1}. ${step.content}`).join('\n');
    onContentChange(content);
  }, [steps, onContentChange]);

  const addStep = () => {
    if (newStep.trim()) {
      setSteps([...steps, { id: `step-${Date.now()}`, content: newStep.trim() }]);
      setNewStep('');
    }
  };

  const removeStep = (id: string) => {
    setSteps(steps.filter(step => step.id !== id));
  };

  const moveStep = (index: number, direction: 'up' | 'down') => {
    const newSteps = [...steps];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex >= 0 && targetIndex < newSteps.length) {
      [newSteps[index], newSteps[targetIndex]] = [newSteps[targetIndex], newSteps[index]];
      setSteps(newSteps);
    }
  };

  const updateStep = (id: string, content: string) => {
    setSteps(steps.map(step => step.id === id ? { ...step, content } : step));
  };

  return (
    <div className="space-y-6">
      {/* Instrucciones Paso a Paso */}
      <div>
        <label className="block text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
          <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-lg text-xs">REQUERIDO</span>
          Instrucciones Paso a Paso
        </label>

        <div className="space-y-3 mb-4">
          <AnimatePresence>
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl border-2 border-slate-200 p-4 group hover:border-emerald-300 transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <div className="flex items-start gap-3">
                  {/* Drag Handle */}
                  <div className="flex flex-col gap-1 mt-1">
                    <button
                      onClick={() => moveStep(index, 'up')}
                      disabled={index === 0}
                      className="text-slate-400 hover:text-emerald-600 disabled:opacity-20 transition-colors"
                    >
                      <ChevronUp className="w-4 h-4" />
                    </button>
                    <GripVertical className="w-4 h-4 text-slate-300 cursor-move" />
                    <button
                      onClick={() => moveStep(index, 'down')}
                      disabled={index === steps.length - 1}
                      className="text-slate-400 hover:text-emerald-600 disabled:opacity-20 transition-colors"
                    >
                      <ChevronDown className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Number Badge */}
                  <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-500 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                    {index + 1}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <textarea
                      value={step.content}
                      onChange={(e) => updateStep(step.id, e.target.value)}
                      className="w-full px-3 py-2 text-sm text-slate-700 border border-transparent focus:border-emerald-300 rounded-lg focus:ring-2 focus:ring-emerald-100 transition-all outline-none resize-none bg-transparent hover:bg-slate-50"
                      rows={2}
                      placeholder="Descripción del paso..."
                    />
                  </div>

                  {/* Delete Button */}
                  <button
                    onClick={() => removeStep(step.id)}
                    className="opacity-0 group-hover:opacity-100 p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Add New Step */}
        <div className="flex gap-2">
          <input
            type="text"
            value={newStep}
            onChange={(e) => setNewStep(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addStep()}
            placeholder="Escribe el siguiente paso..."
            className="flex-1 px-4 py-3 border-2 border-slate-200 rounded-2xl focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 transition-all duration-300 outline-none bg-white"
          />
          <button
            onClick={addStep}
            className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Agregar
          </button>
        </div>

        <p className="mt-2 text-xs text-slate-500 flex items-center gap-1">
          <Check className="w-3 h-3 text-emerald-600" />
          {steps.length} pasos agregados
        </p>
      </div>

      {/* Tips y Consejos */}
      <div>
        <button
          onClick={() => setShowTips(!showTips)}
          className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-cyan-50 hover:from-blue-100 hover:to-cyan-100 rounded-2xl border-2 border-blue-200 transition-all duration-300 mb-3"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-xl">
              <Lightbulb className="w-5 h-5 text-blue-600" />
            </div>
            <span className="font-bold text-slate-900">Tips y Consejos</span>
          </div>
          <ChevronDown className={`w-5 h-5 text-slate-600 transition-transform ${showTips ? 'rotate-180' : ''}`} />
        </button>

        <AnimatePresence>
          {showTips && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <textarea
                value={tips}
                onChange={(e) => setTips(e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border-2 border-blue-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 outline-none bg-white resize-none"
                placeholder="Agrega tips útiles para mejorar la ejecución del ejercicio..."
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Precauciones/Advertencias */}
      <div>
        <button
          onClick={() => setShowWarnings(!showWarnings)}
          className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-orange-50 to-red-50 hover:from-orange-100 hover:to-red-100 rounded-2xl border-2 border-orange-200 transition-all duration-300 mb-3"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-100 rounded-xl">
              <AlertTriangle className="w-5 h-5 text-orange-600" />
            </div>
            <span className="font-bold text-slate-900">Precauciones y Advertencias</span>
          </div>
          <ChevronDown className={`w-5 h-5 text-slate-600 transition-transform ${showWarnings ? 'rotate-180' : ''}`} />
        </button>

        <AnimatePresence>
          {showWarnings && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <textarea
                value={warnings}
                onChange={(e) => setWarnings(e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border-2 border-orange-200 rounded-2xl focus:ring-4 focus:ring-orange-100 focus:border-orange-500 transition-all duration-300 outline-none bg-white resize-none"
                placeholder="Agrega precauciones importantes y contraindicaciones..."
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default InstruccionesEditor;
