import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Lead } from '../leadsListadoApi';

interface LeadsListProps {
  leads: Lead[];
}

type SortKey = 'name' | 'email' | 'phone' | 'origin' | 'status' | 'contactDate';

const PAGE_SIZE = 10;

const LeadsList: React.FC<LeadsListProps> = ({ leads }) => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [sortKey, setSortKey] = useState<SortKey>('contactDate');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');

  const sortedLeads = useMemo(() => {
    const copied = [...leads];
    copied.sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      if (sortKey === 'contactDate') {
        const aTime = new Date(String(aVal)).getTime();
        const bTime = new Date(String(bVal)).getTime();
        return sortDir === 'asc' ? aTime - bTime : bTime - aTime;
      }
      const aStr = String(aVal).toLowerCase();
      const bStr = String(bVal).toLowerCase();
      if (aStr < bStr) return sortDir === 'asc' ? -1 : 1;
      if (aStr > bStr) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });
    return copied;
  }, [leads, sortKey, sortDir]);

  const totalPages = Math.max(1, Math.ceil(sortedLeads.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageItems = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return sortedLeads.slice(start, start + PAGE_SIZE);
  }, [sortedLeads, currentPage]);

  const setSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer" onClick={() => setSort('name')}>Nombre</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer" onClick={() => setSort('email')}>Email</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer" onClick={() => setSort('phone')}>Teléfono</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer" onClick={() => setSort('origin')}>Origen</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer" onClick={() => setSort('status')}>Estado</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer" onClick={() => setSort('contactDate')}>Fecha contacto</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {pageItems.map((lead) => (
              <motion.tr key={lead.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm text-gray-800 font-medium">{lead.name}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{lead.email}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{lead.phone}</td>
                <td className="px-4 py-3 text-sm">
                  <span className="px-2 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700">{lead.origin}</span>
                </td>
                <td className="px-4 py-3 text-sm">
                  <span className="px-2 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">{lead.status}</span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">{new Date(lead.contactDate).toLocaleDateString()}</td>
                <td className="px-4 py-3 text-sm">
                  <button
                    onClick={() => navigate(`/lead-detalle/${lead.id}`)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    Ver
                  </button>
                </td>
              </motion.tr>
            ))}
            {pageItems.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-10 text-center text-gray-500 text-sm">No hay resultados para los filtros aplicados.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex items-center justify-between">
        <p className="text-sm text-gray-500">
          Mostrando {pageItems.length === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1}-{(currentPage - 1) * PAGE_SIZE + pageItems.length} de {sortedLeads.length}
        </p>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1.5 rounded-lg border text-sm disabled:opacity-50"
          >
            Anterior
          </button>
          <span className="text-sm text-gray-600">{currentPage}/{totalPages}</span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-1.5 rounded-lg border text-sm disabled:opacity-50"
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeadsList;
