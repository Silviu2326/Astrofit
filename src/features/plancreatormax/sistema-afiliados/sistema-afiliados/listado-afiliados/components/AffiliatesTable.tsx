import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Search, Filter, ChevronDown, ChevronUp, MoreVertical,
  Eye, BarChart3, Edit, Ban, CheckCircle, Mail, ArrowUpDown
} from 'lucide-react';
import { mockAffiliates, getTierInfo, getStatusColor, Affiliate, AffiliateStatus, TierLevel } from '../data/mockData';

interface AffiliatesTableProps {
  onViewProfile: (affiliate: Affiliate) => void;
}

export const AffiliatesTable: React.FC<AffiliatesTableProps> = ({ onViewProfile }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<AffiliateStatus | 'Todos'>('Todos');
  const [tierFilter, setTierFilter] = useState<TierLevel | 'Todos'>('Todos');
  const [sortField, setSortField] = useState<keyof Affiliate>('salesGenerated');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const handleSort = (field: keyof Affiliate) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const filteredAndSortedAffiliates = useMemo(() => {
    let filtered = mockAffiliates.filter(affiliate => {
      const matchesSearch = affiliate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           affiliate.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           affiliate.code.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'Todos' || affiliate.status === statusFilter;
      const matchesTier = tierFilter === 'Todos' || affiliate.tier === tierFilter;

      return matchesSearch && matchesStatus && matchesTier;
    });

    filtered.sort((a, b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];

      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
      }

      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return sortDirection === 'asc'
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }

      return 0;
    });

    return filtered;
  }, [searchTerm, statusFilter, tierFilter, sortField, sortDirection]);

  const SortIcon = ({ field }: { field: keyof Affiliate }) => {
    if (sortField !== field) return <ArrowUpDown className="w-4 h-4 text-gray-400" />;
    return sortDirection === 'asc'
      ? <ChevronUp className="w-4 h-4 text-indigo-600" />
      : <ChevronDown className="w-4 h-4 text-indigo-600" />;
  };

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 overflow-hidden">
      {/* Header con filtros */}
      <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6 relative overflow-hidden">
        {/* Pattern de fondo */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        <div className="relative z-10">
          <h3 className="text-xl font-bold text-white mb-4">Listado de Afiliados</h3>

          <div className="flex flex-col lg:flex-row gap-4">
            {/* Búsqueda */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
              <input
                type="text"
                placeholder="Buscar por nombre, email o código..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
            </div>

            {/* Filtro de Estado */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as AffiliateStatus | 'Todos')}
              className="px-4 py-3 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-white/50 cursor-pointer"
            >
              <option value="Todos">Todos los estados</option>
              <option value="Activo">Activos</option>
              <option value="Pendiente">Pendientes</option>
              <option value="Suspendido">Suspendidos</option>
            </select>

            {/* Filtro de Tier */}
            <select
              value={tierFilter}
              onChange={(e) => setTierFilter(e.target.value as TierLevel | 'Todos')}
              className="px-4 py-3 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-white/50 cursor-pointer"
            >
              <option value="Todos">Todos los tiers</option>
              <option value="Bronce">Bronce</option>
              <option value="Plata">Plata</option>
              <option value="Oro">Oro</option>
              <option value="Platino">Platino</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tabla */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left">
                <button
                  onClick={() => handleSort('name')}
                  className="flex items-center gap-2 text-xs font-bold text-gray-700 uppercase tracking-wider hover:text-indigo-600 transition-colors"
                >
                  Afiliado
                  <SortIcon field="name" />
                </button>
              </th>
              <th className="px-6 py-4 text-left">
                <button
                  onClick={() => handleSort('code')}
                  className="flex items-center gap-2 text-xs font-bold text-gray-700 uppercase tracking-wider hover:text-indigo-600 transition-colors"
                >
                  Código
                  <SortIcon field="code" />
                </button>
              </th>
              <th className="px-6 py-4 text-left">
                <button
                  onClick={() => handleSort('status')}
                  className="flex items-center gap-2 text-xs font-bold text-gray-700 uppercase tracking-wider hover:text-indigo-600 transition-colors"
                >
                  Estado
                  <SortIcon field="status" />
                </button>
              </th>
              <th className="px-6 py-4 text-left">
                <button
                  onClick={() => handleSort('tier')}
                  className="flex items-center gap-2 text-xs font-bold text-gray-700 uppercase tracking-wider hover:text-indigo-600 transition-colors"
                >
                  Tier
                  <SortIcon field="tier" />
                </button>
              </th>
              <th className="px-6 py-4 text-left">
                <button
                  onClick={() => handleSort('clicks')}
                  className="flex items-center gap-2 text-xs font-bold text-gray-700 uppercase tracking-wider hover:text-indigo-600 transition-colors"
                >
                  Clicks
                  <SortIcon field="clicks" />
                </button>
              </th>
              <th className="px-6 py-4 text-left">
                <button
                  onClick={() => handleSort('conversions')}
                  className="flex items-center gap-2 text-xs font-bold text-gray-700 uppercase tracking-wider hover:text-indigo-600 transition-colors"
                >
                  Conversiones
                  <SortIcon field="conversions" />
                </button>
              </th>
              <th className="px-6 py-4 text-left">
                <button
                  onClick={() => handleSort('conversionRate')}
                  className="flex items-center gap-2 text-xs font-bold text-gray-700 uppercase tracking-wider hover:text-indigo-600 transition-colors"
                >
                  Conv. %
                  <SortIcon field="conversionRate" />
                </button>
              </th>
              <th className="px-6 py-4 text-left">
                <button
                  onClick={() => handleSort('salesGenerated')}
                  className="flex items-center gap-2 text-xs font-bold text-gray-700 uppercase tracking-wider hover:text-indigo-600 transition-colors"
                >
                  Ventas
                  <SortIcon field="salesGenerated" />
                </button>
              </th>
              <th className="px-6 py-4 text-left">
                <button
                  onClick={() => handleSort('commissionsEarned')}
                  className="flex items-center gap-2 text-xs font-bold text-gray-700 uppercase tracking-wider hover:text-indigo-600 transition-colors"
                >
                  Comisiones
                  <SortIcon field="commissionsEarned" />
                </button>
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredAndSortedAffiliates.map((affiliate, index) => {
              const tierInfo = getTierInfo(affiliate.tier);
              const statusColor = getStatusColor(affiliate.status);

              return (
                <motion.tr
                  key={affiliate.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03, duration: 0.3 }}
                  className="hover:bg-gradient-to-r hover:from-indigo-50/50 hover:to-purple-50/50 transition-all"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${tierInfo.color} flex items-center justify-center text-white font-bold shadow-md`}>
                        {affiliate.avatar}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">{affiliate.name}</div>
                        <div className="text-sm text-gray-500">{affiliate.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-mono rounded-lg">
                      {affiliate.code}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 ${statusColor.bg} ${statusColor.text} text-sm font-semibold rounded-full border ${statusColor.border}`}>
                      {affiliate.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 ${tierInfo.bgColor} ${tierInfo.textColor} text-sm font-bold rounded-full border ${tierInfo.borderColor}`}>
                      {affiliate.tier}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                    {affiliate.clicks.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                    {affiliate.conversions}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-bold text-indigo-600">
                      {affiliate.conversionRate.toFixed(2)}%
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                    ${affiliate.salesGenerated.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-green-600">
                    ${affiliate.commissionsEarned.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap relative">
                    <button
                      onClick={() => setActiveDropdown(activeDropdown === affiliate.id ? null : affiliate.id)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <MoreVertical className="w-5 h-5 text-gray-600" />
                    </button>

                    {activeDropdown === affiliate.id && (
                      <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-200 z-50 overflow-hidden">
                        <button
                          onClick={() => {
                            onViewProfile(affiliate);
                            setActiveDropdown(null);
                          }}
                          className="w-full px-4 py-3 text-left hover:bg-indigo-50 transition-colors flex items-center gap-3 text-sm font-medium text-gray-700"
                        >
                          <Eye className="w-4 h-4" />
                          Ver perfil completo
                        </button>
                        <button className="w-full px-4 py-3 text-left hover:bg-indigo-50 transition-colors flex items-center gap-3 text-sm font-medium text-gray-700">
                          <BarChart3 className="w-4 h-4" />
                          Ver reportes
                        </button>
                        <button className="w-full px-4 py-3 text-left hover:bg-indigo-50 transition-colors flex items-center gap-3 text-sm font-medium text-gray-700">
                          <Edit className="w-4 h-4" />
                          Editar comisión
                        </button>
                        {affiliate.status === 'Activo' ? (
                          <button className="w-full px-4 py-3 text-left hover:bg-red-50 transition-colors flex items-center gap-3 text-sm font-medium text-red-600">
                            <Ban className="w-4 h-4" />
                            Suspender
                          </button>
                        ) : (
                          <button className="w-full px-4 py-3 text-left hover:bg-green-50 transition-colors flex items-center gap-3 text-sm font-medium text-green-600">
                            <CheckCircle className="w-4 h-4" />
                            Activar
                          </button>
                        )}
                        <button className="w-full px-4 py-3 text-left hover:bg-indigo-50 transition-colors flex items-center gap-3 text-sm font-medium text-gray-700">
                          <Mail className="w-4 h-4" />
                          Contactar
                        </button>
                      </div>
                    )}
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer con contador */}
      <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
        <p className="text-sm text-gray-600">
          Mostrando <span className="font-bold text-gray-900">{filteredAndSortedAffiliates.length}</span> de{' '}
          <span className="font-bold text-gray-900">{mockAffiliates.length}</span> afiliados
        </p>
      </div>
    </div>
  );
};
