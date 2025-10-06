import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Play, TestTube, Mail, MessageSquare, Clock, CheckCircle,
  AlertCircle, ChevronRight, User, Calendar, Zap
} from 'lucide-react';

interface FlowTestingProps {
  flowName: string;
  onClose: () => void;
}

interface TestStep {
  id: string;
  type: string;
  name: string;
  status: 'pending' | 'running' | 'completed' | 'error';
  timestamp?: string;
  details?: string;
  preview?: {
    subject?: string;
    content?: string;
    duration?: string;
  };
}

const FlowTesting: React.FC<FlowTestingProps> = ({ flowName, onClose }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [testEmail, setTestEmail] = useState('');
  const [testPhone, setTestPhone] = useState('');
  const [currentStep, setCurrentStep] = useState(0);

  const [testSteps, setTestSteps] = useState<TestStep[]>([
    {
      id: '1',
      type: 'trigger',
      name: 'Trigger: Nuevo Registro',
      status: 'pending'
    },
    {
      id: '2',
      type: 'email',
      name: 'Email de Bienvenida',
      status: 'pending',
      preview: {
        subject: '¡Bienvenido! Tutorial rápido',
        content: 'Hola {{nombre}}, gracias por registrarte...'
      }
    },
    {
      id: '3',
      type: 'delay',
      name: 'Esperar 3 días',
      status: 'pending',
      preview: {
        duration: '3 días'
      }
    },
    {
      id: '4',
      type: 'conditional',
      name: 'Condicional: ¿Agendó sesión?',
      status: 'pending'
    },
    {
      id: '5',
      type: 'email',
      name: 'Email: Recordatorio',
      status: 'pending',
      preview: {
        subject: 'No olvides agendar tu primera sesión',
        content: 'Hola {{nombre}}, notamos que aún no has agendado...'
      }
    }
  ]);

  const runTest = async () => {
    setIsRunning(true);

    for (let i = 0; i < testSteps.length; i++) {
      setCurrentStep(i);

      // Update to running
      setTestSteps(prev => prev.map((step, idx) =>
        idx === i
          ? { ...step, status: 'running', timestamp: new Date().toLocaleTimeString() }
          : step
      ));

      // Simulate execution
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Update to completed
      setTestSteps(prev => prev.map((step, idx) =>
        idx === i
          ? { ...step, status: 'completed' }
          : step
      ));
    }

    setIsRunning(false);
  };

  const getStepIcon = (type: string) => {
    switch (type) {
      case 'email': return Mail;
      case 'delay': return Clock;
      case 'conditional': return Zap;
      default: return CheckCircle;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'border-blue-500 bg-blue-50';
      case 'completed': return 'border-green-500 bg-green-50';
      case 'error': return 'border-red-500 bg-red-50';
      default: return 'border-gray-300 bg-white';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'running':
        return (
          <span className="flex items-center gap-1 px-3 py-1 bg-blue-500 text-white text-xs font-bold rounded-full">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            Ejecutando
          </span>
        );
      case 'completed':
        return (
          <span className="flex items-center gap-1 px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full">
            <CheckCircle className="w-3 h-3" />
            Completado
          </span>
        );
      case 'error':
        return (
          <span className="flex items-center gap-1 px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
            <AlertCircle className="w-3 h-3" />
            Error
          </span>
        );
      default:
        return (
          <span className="px-3 py-1 bg-gray-300 text-gray-700 text-xs font-bold rounded-full">
            Pendiente
          </span>
        );
    }
  };

  return (
    <div className="p-6">
      {/* Test Configuration */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-6 mb-6 border border-blue-200">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <TestTube className="w-6 h-6 text-blue-600" />
          Configuración de Test
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Email de Prueba</label>
            <input
              type="email"
              value={testEmail}
              onChange={(e) => setTestEmail(e.target.value)}
              placeholder="tu@email.com"
              className="w-full px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Teléfono de Prueba (opcional)</label>
            <input
              type="tel"
              value={testPhone}
              onChange={(e) => setTestPhone(e.target.value)}
              placeholder="+34 600 000 000"
              className="w-full px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none"
            />
          </div>
        </div>

        <button
          onClick={runTest}
          disabled={isRunning || !testEmail}
          className="w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Play className="w-5 h-5" />
          {isRunning ? 'Ejecutando Test...' : 'Ejecutar Test'}
        </button>
      </div>

      {/* Timeline de Ejecución */}
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50">
        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <Calendar className="w-6 h-6 text-purple-600" />
          Timeline de Ejecución
        </h3>

        <div className="space-y-4">
          {testSteps.map((step, index) => {
            const Icon = getStepIcon(step.type);
            const isActive = currentStep === index && isRunning;

            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative p-4 rounded-2xl border-2 transition-all duration-300 ${getStatusColor(step.status)} ${isActive ? 'shadow-xl scale-105' : ''}`}
              >
                {/* Connection Line */}
                {index < testSteps.length - 1 && (
                  <div className="absolute left-8 top-full w-0.5 h-4 bg-gradient-to-b from-gray-300 to-transparent"></div>
                )}

                <div className="flex items-start gap-4">
                  <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${
                    step.status === 'running' ? 'bg-blue-500 animate-pulse' :
                    step.status === 'completed' ? 'bg-green-500' :
                    step.status === 'error' ? 'bg-red-500' :
                    'bg-gray-300'
                  } text-white`}>
                    <Icon className="w-6 h-6" />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="font-bold text-gray-800">{step.name}</p>
                        {step.timestamp && (
                          <p className="text-xs text-gray-500">{step.timestamp}</p>
                        )}
                      </div>
                      {getStatusBadge(step.status)}
                    </div>

                    {step.preview && (
                      <div className="mt-3 p-3 bg-white/50 rounded-xl border border-gray-200">
                        {step.preview.subject && (
                          <div className="mb-2">
                            <p className="text-xs font-semibold text-gray-600">Asunto:</p>
                            <p className="text-sm text-gray-800">{step.preview.subject}</p>
                          </div>
                        )}
                        {step.preview.content && (
                          <div className="mb-2">
                            <p className="text-xs font-semibold text-gray-600">Preview:</p>
                            <p className="text-sm text-gray-800 line-clamp-2">{step.preview.content}</p>
                          </div>
                        )}
                        {step.preview.duration && (
                          <div>
                            <p className="text-xs font-semibold text-gray-600">Duración:</p>
                            <p className="text-sm text-gray-800">{step.preview.duration}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Validación de Errores */}
      <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-3xl p-6 mt-6 border border-orange-200">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <AlertCircle className="w-6 h-6 text-orange-600" />
          Validación
        </h3>

        <div className="space-y-3">
          <div className="flex items-start gap-3 p-3 bg-white/50 rounded-xl">
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-gray-800">Todos los nodos configurados</p>
              <p className="text-xs text-gray-600">Todos los nodos tienen configuración válida</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-white/50 rounded-xl">
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-gray-800">Rutas completas</p>
              <p className="text-xs text-gray-600">No hay paths sin salida detectados</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-white/50 rounded-xl">
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-gray-800">Variables definidas</p>
              <p className="text-xs text-gray-600">Todas las variables requeridas están definidas</p>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 mt-6">
        <button className="flex-1 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2">
          <Mail className="w-5 h-5" />
          Enviar Test a mi Email
        </button>

        <button
          onClick={onClose}
          className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-colors"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default FlowTesting;
