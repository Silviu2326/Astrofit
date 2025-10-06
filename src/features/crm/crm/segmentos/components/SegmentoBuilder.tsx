import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Segment } from '../SegmentosPage';

interface SegmentoBuilderProps {
  initialSegment: Segment | null;
  onSave: (segment: Segment) => void;
  onRunPreview: (rules: any[]) => void;
}

const SegmentoBuilder: React.FC<SegmentoBuilderProps> = ({ initialSegment, onSave, onRunPreview }) => {
  const [name, setName] = useState(initialSegment?.name || '');
  const [description, setDescription] = useState(initialSegment?.description || '');
  const [rules, setRules] = useState<any[]>(initialSegment?.rules || []); // Placeholder for rule objects

  useEffect(() => {
    if (initialSegment) {
      setName(initialSegment.name);
      setDescription(initialSegment.description);
      setRules(initialSegment.rules);
    } else {
      setName('');
      setDescription('');
      setRules([]);
    }
  }, [initialSegment]);

  const handleAddRule = () => {
    const newRule = { 
      id: Date.now(), 
      type: 'tag', 
      operator: 'includes', 
      value: '',
      combinator: rules.length > 0 ? 'AND' : undefined
    };
    setRules([...rules, newRule]);
  };

  const handleRuleChange = (id: number, field: string, value: any) => {
    setRules(rules.map(rule => (rule.id === id ? { ...rule, [field]: value } : rule)));
  };

  const handleRemoveRule = (id: number) => {
    setRules(rules.filter(rule => rule.id !== id));
  };

  const handleSave = () => {
    if (!name.trim()) {
      toast.error('❌ El nombre del segmento no puede estar vacío');
      return;
    }
    
    if (name.length < 3) {
      toast.error('❌ El nombre del segmento debe tener al menos 3 caracteres');
      return;
    }
    
    if (!description.trim()) {
      toast.error('❌ La descripción del segmento no puede estar vacía');
      return;
    }
    
    // Validar reglas
    const invalidRules = rules.filter(rule => !rule.value || !rule.value.trim());
    if (invalidRules.length > 0) {
      toast.error('❌ Todas las reglas deben tener un valor válido');
      return;
    }
    
    const segmentToSave: Segment = {
      id: initialSegment?.id || String(Date.now()), // Generate new ID if creating
      name: name.trim(),
      description: description.trim(),
      rules,
      memberCount: initialSegment?.memberCount || 0, // Will be updated by backend
      lastUpdated: new Date().toISOString().slice(0, 10),
    };
    
    onSave(segmentToSave);
  };

  const handlePreview = () => {
    onRunPreview(rules);
  };

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="segmentName" className="block text-sm font-medium text-gray-700">Nombre del Segmento</label>
        <input
          type="text"
          id="segmentName"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ej: Clientes Premium"
        />
      </div>
      <div>
        <label htmlFor="segmentDescription" className="block text-sm font-medium text-gray-700">Descripción</label>
        <textarea
          id="segmentDescription"
          rows={3}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe el propósito de este segmento"
        ></textarea>
      </div>

      <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-700">Reglas del Segmento</h3>
      <div className="border border-gray-200 rounded-md p-4 space-y-3">
        {rules.length === 0 && <p className="text-gray-500">Aún no hay reglas. Añade una para empezar.</p>}
        {rules.map((rule, index) => (
          <div key={rule.id} className="flex items-center space-x-2 bg-gray-50 p-2 rounded-md">
            {index > 0 && (
              <select
                className="border border-gray-300 rounded-md p-1 text-sm"
                value={rule.combinator || 'AND'}
                onChange={(e) => handleRuleChange(rule.id, 'combinator', e.target.value)}
              >
                <option value="AND">Y (AND)</option>
                <option value="OR">O (OR)</option>
              </select>
            )}
            <select
              className="border border-gray-300 rounded-md p-1 text-sm flex-grow"
              value={rule.type}
              onChange={(e) => handleRuleChange(rule.id, 'type', e.target.value)}
            >
              <option value="tag">Etiqueta</option>
              <option value="activity">Actividad</option>
              <option value="date">Fecha</option>
              <option value="status">Estado</option>
              {/* Add more filter types as needed */}
            </select>
            <select
              className="border border-gray-300 rounded-md p-1 text-sm flex-grow"
              value={rule.operator}
              onChange={(e) => handleRuleChange(rule.id, 'operator', e.target.value)}
            >
              <option value="includes">Incluye</option>
              <option value="excludes">No incluye</option>
              <option value="equals">Es igual a</option>
              {/* Add more operators as needed */}
            </select>
            <input
              type="text"
              className="border border-gray-300 rounded-md shadow-sm p-1 text-sm flex-grow"
              value={rule.value}
              onChange={(e) => handleRuleChange(rule.id, 'value', e.target.value)}
              placeholder="Valor de la regla"
            />
            <button
              onClick={() => handleRemoveRule(rule.id)}
              className="bg-red-500 text-white p-1 rounded-md hover:bg-red-600 text-sm"
            >
              Eliminar
            </button>
          </div>
        ))}
        <button
          onClick={handleAddRule}
          className="mt-3 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors"
        >
          + Añadir Regla
        </button>
      </div>

      <div className="flex justify-end space-x-3 mt-6">
        <button
          onClick={handlePreview}
          disabled={rules.length === 0}
          className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          🔍 Previsualizar Segmento
        </button>
        <button
          onClick={handleSave}
          disabled={!name.trim() || !description.trim()}
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          💾 Guardar Segmento
        </button>
      </div>
    </div>
  );
};

export default SegmentoBuilder;