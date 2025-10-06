import React, { useEffect, useState } from 'react';
import { useStore } from '../store';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MessageSquare, Webhook, GitBranch, Clock, Settings, Play, CheckCircle, XCircle, AlertTriangle, Info, PlusCircle, Trash2, Cog } from 'lucide-react';

// Helper Components
const FormField = ({ label, children, tooltip, error }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 flex items-center">
      {label}
      {tooltip && (
        <span className="ml-2 text-gray-400 hover:text-gray-600 cursor-pointer" title={tooltip}>
          <Info size={14} />
        </span>
      )}
    </label>
    <div className="mt-1">{children}</div>
    {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
  </div>
);

const TabButton = ({ label, activeTab, setActiveTab, tabName }) => (
    <button 
        onClick={() => setActiveTab(tabName)} 
        className={`px-4 py-2 text-sm font-medium transition-colors duration-200 ${activeTab === tabName 
            ? 'border-b-2 border-indigo-500 text-indigo-600' 
            : 'text-gray-500 hover:text-gray-700'}`}
    >
        {label}
    </button>
);


// --- Settings Components ---

const TriggerSettings = ({ data, onChange, setErrors }) => (
    <div>
        <p className="text-sm text-gray-600">Este es el punto de partida de tu automatización. Configura qué evento lo inicia.</p>
        <FormField label="Tipo de Disparador" tooltip="Define el evento que inicia el flujo.">
            <select 
                name="triggerType"
                value={data.triggerType || ''}
                onChange={onChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
                <option value="">Selecciona un disparador</option>
                <option value="user_signup">Usuario se registra</option>
                <option value="product_purchased">Producto comprado</option>
                <option value="form_submitted">Formulario enviado</option>
            </select>
        </FormField>
    </div>
);

const EmailSettings = ({ data, onChange, errors }) => (
  <div>
    <FormField label="Plantilla de Email" tooltip="Selecciona la plantilla de email a enviar." error={errors?.template}>
      <select name="template" value={data.template || ''} onChange={onChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
        <option value="">Selecciona una plantilla</option>
        <option value="welcome">Plantilla de Bienvenida</option>
        <option value="offer">Plantilla de Oferta</option>
      </select>
    </FormField>
    <FormField label="Remitente" tooltip="Dirección de email desde la que se enviará el correo." error={errors?.from}>
      <input name="from" type="email" value={data.from || ''} onChange={onChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="ej: marketing@empresa.com" />
    </FormField>
    <FormField label="Asunto" tooltip="El asunto del correo electrónico." error={errors?.subject}>
      <input name="subject" type="text" value={data.subject || ''} onChange={onChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="¡Bienvenido a nuestra plataforma!" />
    </FormField>
    <FormField label="Adjuntos" tooltip="Añade archivos adjuntos al correo.">
      <input type="file" multiple className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100"/>
    </FormField>
  </div>
);

const SmsSettings = ({ data, onChange, errors }) => (
    <div>
        <FormField label="Mensaje" tooltip="El contenido del SMS. Límite de 160 caracteres." error={errors?.message}>
            <textarea
                name="message"
                rows={4}
                value={data.message || ''}
                onChange={onChange}
                maxLength={160}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Escribe tu mensaje aquí..."
            />
        </FormField>
        <FormField label="Número de Origen" tooltip="Número desde el que se enviará el SMS." error={errors?.sourceNumber}>
            <input name="sourceNumber" type="text" value={data.sourceNumber || ''} onChange={onChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="+1234567890" />
        </FormField>
    </div>
);

const WebhookSettings = ({ data, onChange, errors }) => (
    <div>
        <FormField label="URL del Webhook" tooltip="La URL a la que se enviará la petición." error={errors?.url}>
            <input name="url" type="url" value={data.url || ''} onChange={onChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="https://api.ejemplo.com/webhook" />
        </FormField>
        <FormField label="Método HTTP" tooltip="El método HTTP para la petición.">
            <select name="method" value={data.method || 'POST'} onChange={onChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                <option>POST</option>
                <option>GET</option>
                <option>PUT</option>
                <option>DELETE</option>
            </select>
        </FormField>
        <FormField label="Headers (JSON)" tooltip="Cabeceras HTTP en formato JSON." error={errors?.headers}>
            <textarea
                name="headers"
                rows={3}
                value={data.headers || ''}
                onChange={onChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm font-mono"
                placeholder='{ "Content-Type": "application/json" }'
            />
        </FormField>
        <FormField label="Payload (JSON)" tooltip="Cuerpo de la petición en formato JSON." error={errors?.payload}>
            <textarea
                name="payload"
                rows={5}
                value={data.payload || ''}
                onChange={onChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm font-mono"
                placeholder='{ "key": "value" }'
            />
        </FormField>
    </div>
);

const ConditionSettings = ({ data, onChange, errors }) => {
    const conditions = data.conditions || [{ field: '', operator: 'eq', value: '' }];

    const handleConditionChange = (index, prop, value) => {
        const newConditions = [...conditions];
        newConditions[index][prop] = value;
        onChange({ target: { name: 'conditions', value: newConditions } });
    };

    const addCondition = () => {
        const newConditions = [...conditions, { field: '', operator: 'eq', value: '' }];
        onChange({ target: { name: 'conditions', value: newConditions } });
    };

    const removeCondition = (index) => {
        const newConditions = conditions.filter((_, i) => i !== index);
        onChange({ target: { name: 'conditions', value: newConditions } });
    };

    return (
        <div>
            <p className="text-sm text-gray-600 mb-4">Define las reglas para dividir el flujo. El flujo continuará por el camino "Sí" si se cumplen todas las condiciones (Y).</p>
            <div className="space-y-4">
                {conditions.map((cond, index) => (
                    <div key={index} className="p-2 border rounded-md bg-gray-50">
                        <div className="grid grid-cols-3 gap-2">
                            <input type="text" value={cond.field} onChange={(e) => handleConditionChange(index, 'field', e.target.value)} className="border-gray-300 rounded-md shadow-sm sm:text-sm" placeholder="Campo (ej: email)" />
                            <select value={cond.operator} onChange={(e) => handleConditionChange(index, 'operator', e.target.value)} className="border-gray-300 rounded-md shadow-sm sm:text-sm">
                                <option value="eq">es igual a</option>
                                <option value="neq">no es igual a</option>
                                <option value="contains">contiene</option>
                                <option value="gt">es mayor que</option>
                                <option value="lt">es menor que</option>
                            </select>
                            <input type="text" value={cond.value} onChange={(e) => handleConditionChange(index, 'value', e.target.value)} className="border-gray-300 rounded-md shadow-sm sm:text-sm" placeholder="Valor" />
                        </div>
                        <div className="flex justify-end mt-2">
                            <button onClick={() => removeCondition(index)} className="text-red-500 hover:text-red-700">
                                <Trash2 size={16} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <button onClick={addCondition} className="mt-4 flex items-center text-sm text-indigo-600 hover:text-indigo-800">
                <PlusCircle size={16} className="mr-1" />
                Añadir condición
            </button>
        </div>
    );
};

const DelaySettings = ({ data, onChange, errors }) => (
    <div className="flex items-start space-x-2">
        <div className="w-1/3">
            <input name="delayValue" type="number" value={data.delayValue || 1} onChange={onChange} className="w-full border-gray-300 rounded-md shadow-sm sm:text-sm" min="1" />
            {errors?.delayValue && <p className="mt-1 text-xs text-red-500">{errors.delayValue}</p>}
        </div>
        <select name="delayUnit" value={data.delayUnit || 'minutes'} onChange={onChange} className="w-2/3 border-gray-300 rounded-md shadow-sm sm:text-sm">
            <option value="minutes">Minutos</option>
            <option value="hours">Horas</option>
            <option value="days">Días</option>
        </select>
    </div>
);


const nodeSettingsMap = {
  trigger: { component: TriggerSettings, icon: Play, name: 'Disparador' },
  email: { component: EmailSettings, icon: Mail, name: 'Acción: Email' },
  sms: { component: SmsSettings, icon: MessageSquare, name: 'Acción: SMS' },
  webhook: { component: WebhookSettings, icon: Webhook, name: 'Acción: Webhook' },
  condition: { component: ConditionSettings, icon: GitBranch, name: 'Condición' },
  delay: { component: DelaySettings, icon: Clock, name: 'Retardo' },
};

// --- Main Component ---

const PanelPropiedades: React.FC = () => {
  const { selectedNode, updateNodeData } = useStore();
  const [nodeData, setNodeData] = useState(selectedNode?.data || {});
  const [errors, setErrors] = useState({});
  const [activeTab, setActiveTab] = useState('general');
  const [testStatus, setTestStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');

  useEffect(() => {
    const data = selectedNode?.data || {};
    setNodeData(data);
    validate(data, selectedNode?.type);
    setTestStatus('idle');
    setActiveTab('general');
  }, [selectedNode]);

  const validate = (data, type) => {
    const newErrors = {};
    // General validation
    if (!data.label?.trim()) newErrors.label = 'El nombre del nodo es obligatorio.';

    // Type-specific validation
    switch (type) {
        case 'email':
            if (!data.from) newErrors.from = 'El remitente es obligatorio.';
            else if (!/\S+@\S+\.\S+/.test(data.from)) newErrors.from = 'Formato de email inválido.';
            if (!data.subject) newErrors.subject = 'El asunto es obligatorio.';
            break;
        case 'webhook':
            if (!data.url) newErrors.url = 'La URL es obligatoria.';
            else {
                try { new URL(data.url); }
                catch (_) { newErrors.url = 'La URL no es válida.'; }
            }
            if (data.headers) {
                try { JSON.parse(data.headers); }
                catch (e) { newErrors.headers = 'El formato JSON de los headers es inválido.'; }
            }
            if (data.payload) {
                try { JSON.parse(data.payload); }
                catch (e) { newErrors.payload = 'El formato JSON del payload es inválido.'; }
            }
            break;
        case 'sms':
            if (!data.message) newErrors.message = 'El mensaje es obligatorio.';
            break;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | { target: { name: string, value: any } }) => {
    const { name, value, type } = e.target;
    let finalValue = value;
    if (type === 'checkbox') {
        finalValue = (e.target as HTMLInputElement).checked;
    }
    const newData = { ...nodeData, [name]: finalValue };
    setNodeData(newData);
    validate(newData, selectedNode?.type);
  };

  const handleSave = () => {
    if (selectedNode && validate(nodeData, selectedNode.type)) {
      updateNodeData(selectedNode.id, nodeData);
      // Add visual feedback for saving
    }
  };
  
  const handleTest = () => {
    if (!validate(nodeData, selectedNode.type)) return;
    setTestStatus('testing');
    setTimeout(() => {
      const success = Math.random() > 0.3;
      setTestStatus(success ? 'success' : 'error');
    }, 1500);
  };

  const renderSettings = () => {
    const nodeType = selectedNode?.type;
    const settings = nodeSettingsMap[nodeType];
    if (!settings) return <p className="text-sm text-gray-500 p-4 text-center">Este nodo no tiene configuraciones específicas.</p>;
    
    const SpecificSettings = settings.component;
    return <SpecificSettings data={nodeData} onChange={handleInputChange} errors={errors} />;
  };

  const NodeIcon = selectedNode?.type ? nodeSettingsMap[selectedNode.type]?.icon || Settings : Settings;
  const nodeInfo = selectedNode?.type ? nodeSettingsMap[selectedNode.type] : null;

  return (
    <aside className="w-96 bg-white shadow-lg flex flex-col border-l border-gray-200">
      <AnimatePresence>
        {selectedNode ? (
          <motion.div
            key={selectedNode.id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.3 }}
            className="flex-grow flex flex-col"
          >
            <div className="p-4 border-b border-gray-200">
                <div className="flex items-center mb-2">
                    <NodeIcon className="w-6 h-6 mr-3 text-indigo-600" />
                    <h2 className="text-lg font-bold text-gray-800">{nodeInfo?.name || 'Nodo'}</h2>
                </div>
                <p className="text-sm text-gray-500">{nodeData.description || 'Descripción del nodo.'}</p>
            </div>

            <div className="flex border-b border-gray-200">
              <TabButton label="General" activeTab={activeTab} setActiveTab={setActiveTab} tabName="general" />
              <TabButton label="Configuración" activeTab={activeTab} setActiveTab={setActiveTab} tabName="config" />
            </div>

            <div className="flex-grow p-4 overflow-y-auto">
                <AnimatePresence mode="wait">
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                >
                    {activeTab === 'general' && (
                    <div>
                        <FormField label="Nombre del Nodo" tooltip="Un nombre descriptivo para identificar este paso en el flujo." error={errors.label}>
                        <input
                            type="text"
                            name="label"
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            value={nodeData.label || ''}
                            onChange={handleInputChange}
                        />
                        </FormField>
                        <FormField label="Descripción" tooltip="Explica brevemente la función de este nodo.">
                        <textarea
                            name="description"
                            rows={3}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            value={nodeData.description || ''}
                            onChange={handleInputChange}
                        />
                        </FormField>
                        <div className="flex items-center justify-between mt-6">
                        <span className="text-sm font-medium text-gray-700">Estado</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" name="active" checked={nodeData.active ?? true} onChange={handleInputChange} className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-indigo-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                        </label>
                        </div>
                    </div>
                    )}

                    {activeTab === 'config' && (
                        <div>
                            {renderSettings()}
                        </div>
                    )}
                </motion.div>
                </AnimatePresence>
            </div>
            
            <div className="p-4 border-t border-gray-200 bg-gray-50">
              <h3 className="text-md font-semibold mb-3 text-gray-800">Acciones</h3>
              <div className="flex space-x-2">
                <button 
                    onClick={handleTest}
                    disabled={testStatus === 'testing' || !!Object.keys(errors).length}
                    className="flex-1 flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                    <Play className="w-5 h-5 mr-2" />
                    {testStatus === 'testing' ? 'Probando...' : 'Probar'}
                </button>
                <button 
                    onClick={handleSave}
                    disabled={!!Object.keys(errors).length}
                    className="flex-1 flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                    Guardar
                </button>
              </div>
              <div className="mt-3 h-8">
                <AnimatePresence>
                  {testStatus === 'success' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center text-green-600">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      <span className="text-sm font-medium">¡Prueba exitosa!</span>
                    </motion.div>
                  )}
                  {testStatus === 'error' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center text-red-600">
                      <XCircle className="w-5 h-5 mr-2" />
                      <span className="text-sm font-medium">Error en la prueba.</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center h-full text-center text-gray-500 p-4"
          >
            <Cog className="w-16 h-16 mb-4 text-gray-300" />
            <h3 className="text-lg font-semibold">Panel de Propiedades</h3>
            <p className="text-sm">Selecciona un nodo del flujo para ver y editar sus propiedades aquí.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </aside>
  );
};

export default PanelPropiedades;
