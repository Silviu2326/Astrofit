import React from 'react';
import { ArrowUpDown, ChevronDown, ChevronUp, Eye } from 'lucide-react';
import { Cliente, SortBy, SortDir } from '../clientesListadoApi';
import ClienteActionsMenu from './ClienteActionsMenu';

interface ClientesTableProps {
  clientes: Cliente[];
  sortBy: SortBy;
  sortDir: SortDir;
  onSort: (key: SortBy) => void;
  selected: Set<string>;
  onToggleSelect: (id: string) => void;
  onToggleSelectAll: () => void;
  onView: (id: string) => void;
  onEdit?: (id: string) => void;
}

const SortIcon: React.FC<{ active: boolean; dir: SortDir }> = ({ active, dir }) => {
  if (!active) return <ArrowUpDown className="w-4 h-4 text-gray-400" />;
  return dir === 'asc' ? (
    <ChevronUp className="w-4 h-4 text-blue-600" />
  ) : (
    <ChevronDown className="w-4 h-4 text-blue-600" />
  );
};

const ClientesTable: React.FC<ClientesTableProps> = ({
  clientes,
  sortBy,
  sortDir,
  onSort,
  selected,
  onToggleSelect,
  onToggleSelectAll,
  onView,
  onEdit,
}) => {
  const allSelected = clientes.length > 0 && clientes.every(c => selected.has(c.id));
  const someSelected = clientes.some(c => selected.has(c.id)) && !allSelected;

  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow-md">
      <table className="min-w-full">
        <thead>
          <tr className="bg-gray-50 text-gray-600 uppercase text-xs">
            <th className="py-3 px-6 text-left w-10">
              <input
                type="checkbox"
                checked={allSelected}
                ref={(el) => {
                  if (el) el.indeterminate = someSelected;
                }}
                onChange={onToggleSelectAll}
              />
            </th>
            <th className="py-3 px-6 text-left">Foto</th>
            <th className="py-3 px-6 text-left cursor-pointer select-none" onClick={() => onSort('nombre')}>
              <div className="inline-flex items-center gap-1">Nombre <SortIcon active={sortBy==='nombre'} dir={sortDir} /></div>
            </th>
            <th className="py-3 px-6 text-left cursor-pointer select-none" onClick={() => onSort('estado')}>
              <div className="inline-flex items-center gap-1">Estado <SortIcon active={sortBy==='estado'} dir={sortDir} /></div>
            </th>
            <th className="py-3 px-6 text-left">Etiquetas</th>
            <th className="py-3 px-6 text-left cursor-pointer select-none" onClick={() => onSort('fechaAlta')}>
              <div className="inline-flex items-center gap-1">Fecha Alta <SortIcon active={sortBy==='fechaAlta'} dir={sortDir} /></div>
            </th>
            <th className="py-3 px-6 text-left cursor-pointer select-none" onClick={() => onSort('ultimaActividad')}>
              <div className="inline-flex items-center gap-1">Última Actividad <SortIcon active={sortBy==='ultimaActividad'} dir={sortDir} /></div>
            </th>
            <th className="py-3 px-6 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody className="text-gray-700 text-sm">
          {clientes.map((cliente) => (
            <tr key={cliente.id} className="border-t border-gray-100 hover:bg-gray-50">
              <td className="py-3 px-6">
                <input
                  type="checkbox"
                  checked={selected.has(cliente.id)}
                  onChange={() => onToggleSelect(cliente.id)}
                />
              </td>
              <td className="py-3 px-6">
                <img src={cliente.foto} alt={cliente.nombre} className="w-10 h-10 rounded-full" />
              </td>
              <td className="py-3 px-6">
                <div className="flex flex-col">
                  <span className="font-medium">{cliente.nombre}</span>
                  <span className="text-xs text-gray-500">{cliente.email}</span>
                </div>
              </td>
              <td className="py-3 px-6">
                <span
                  className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                    cliente.estado === 'activo' ? 'bg-green-100 text-green-700' : 'bg-rose-100 text-rose-700'
                  }`}
                >
                  {cliente.estado}
                </span>
              </td>
              <td className="py-3 px-6">
                <div className="flex flex-wrap gap-1">
                  {cliente.etiquetas.slice(0, 3).map((tag) => (
                    <span key={tag} className="px-2 py-0.5 text-xs font-semibold text-blue-700 bg-blue-100 rounded-full">
                      {tag}
                    </span>
                  ))}
                  {cliente.etiquetas.length > 3 && (
                    <span className="px-2 py-0.5 text-xs font-semibold text-gray-600 bg-gray-100 rounded-full">
                      +{cliente.etiquetas.length - 3}
                    </span>
                  )}
                </div>
              </td>
              <td className="py-3 px-6">{cliente.fechaAlta}</td>
              <td className="py-3 px-6">{cliente.ultimaActividad}</td>
              <td className="py-3 px-6 text-center">
                <div className="inline-flex gap-2">
                  <button
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs bg-blue-600 hover:bg-blue-700 text-white rounded-md"
                    onClick={() => onView(cliente.id)}
                  >
                    <Eye className="w-3.5 h-3.5" /> Ver
                  </button>
                  <ClienteActionsMenu
                    clienteId={cliente.id}
                    clienteNombre={cliente.nombre}
                    clienteEmail={cliente.email}
                    clienteTelefono={cliente.telefono}
                    onEdit={onEdit}
                  />
                </div>
              </td>
            </tr>
          ))}
          {clientes.length === 0 && (
            <tr>
              <td colSpan={8} className="py-10 text-center text-gray-500">No hay clientes que coincidan con los filtros.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ClientesTable;

