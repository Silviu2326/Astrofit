import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, Search, X } from 'lucide-react';

interface ClientesFiltersProps {
  onFilterChange: (filters: any) => void;
}

const ClientesFilters: React.FC<ClientesFiltersProps> = ({ onFilterChange }) => {
  const [q, setQ] = useState('');
  const [estado, setEstado] = useState<string>('');
  const [etiquetas, setEtiquetas] = useState('');
  const [fechaAltaDesde, setFechaAltaDesde] = useState('');
  const [fechaAltaHasta, setFechaAltaHasta] = useState('');
  const [sinActividadDias, setSinActividadDias] = useState<number | ''>('');
  const [showAdvanced, setShowAdvanced] = useState(false);

  const chips = useMemo(() => {
    const result: { label: string; onRemove: () => void }[] = [];
    if (q) result.push({ label: `Buscar: ${q}`, onRemove: () => setQ('') });
    if (estado) result.push({ label: `Estado: ${estado}`, onRemove: () => setEstado('') });
    const tags = etiquetas
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);
    if (tags.length) result.push({ label: `Etiquetas: ${tags.join(', ')}`, onRemove: () => setEtiquetas('') });
    if (fechaAltaDesde) result.push({ label: `Alta desde: ${fechaAltaDesde}`, onRemove: () => setFechaAltaDesde('') });
    if (fechaAltaHasta) result.push({ label: `Alta hasta: ${fechaAltaHasta}`, onRemove: () => setFechaAltaHasta('') });
    if (sinActividadDias) result.push({ label: `Sin actividad ≥ ${sinActividadDias} días`, onRemove: () => setSinActividadDias('') });
    return result;
  }, [q, estado, etiquetas, fechaAltaDesde, fechaAltaHasta, sinActividadDias]);

  const apply = () => {
    onFilterChange({
      q,
      estado: estado || undefined,
      etiquetas: etiquetas
        ? etiquetas
            .split(',')
            .map(t => t.trim())
            .filter(Boolean)
        : undefined,
      fechaAltaDesde: fechaAltaDesde || undefined,
      fechaAltaHasta: fechaAltaHasta || undefined,
      sinActividadDias: sinActividadDias === '' ? undefined : Number(sinActividadDias),
      page: 1,
    });
  };

  const clear = () => {
    setQ('');
    setEstado('');
    setEtiquetas('');
    setFechaAltaDesde('');
    setFechaAltaHasta('');
    setSinActividadDias('');
    onFilterChange({ q: '', estado: '', etiquetas: [], fechaAltaDesde: undefined, fechaAltaHasta: undefined, sinActividadDias: undefined, page: 1 });
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-4">
      <div className="flex flex-col md:flex-row md:items-center gap-3">
        <div className="flex-1 relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar por nombre, email o teléfono"
            className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && apply()}
          />
        </div>

        <select
          className="border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={estado}
          onChange={(e) => setEstado(e.target.value)}
        >
          <option value="">Todos los estados</option>
          <option value="activo">Activo</option>
          <option value="inactivo">Inactivo</option>
        </select>

        <button
          onClick={() => setShowAdvanced(v => !v)}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition"
        >
          <Filter className="w-4 h-4" />
          Avanzado
        </button>

        <div className="flex items-center gap-2 ml-auto">
          <button onClick={clear} className="px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50">Limpiar</button>
          <button onClick={apply} className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold shadow">
            Aplicar filtros
          </button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {showAdvanced && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4"
          >
            <div>
              <label className="block text-sm text-gray-600 mb-1">Etiquetas (separadas por coma)</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={etiquetas}
                onChange={(e) => setEtiquetas(e.target.value)}
                placeholder="premium, online"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Fecha alta desde</label>
              <input
                type="date"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={fechaAltaDesde}
                onChange={(e) => setFechaAltaDesde(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Fecha alta hasta</label>
              <input
                type="date"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={fechaAltaHasta}
                onChange={(e) => setFechaAltaHasta(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Sin actividad (días)</label>
              <input
                type="number"
                min={0}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={sinActividadDias}
                onChange={(e) => setSinActividadDias(e.target.value === '' ? '' : Number(e.target.value))}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {chips.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {chips.map((c, i) => (
            <span key={i} className="inline-flex items-center gap-1 px-2.5 py-1 text-xs bg-gray-100 text-gray-700 rounded-full">
              {c.label}
              <button onClick={c.onRemove} className="ml-1 text-gray-500 hover:text-gray-700" aria-label="Quitar filtro">
                <X className="w-3.5 h-3.5" />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default ClientesFilters;

