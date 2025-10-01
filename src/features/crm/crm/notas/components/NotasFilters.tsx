
import React, { useState, useEffect } from 'react';
import { getClients, getTeamMembers } from '../notasApi';

export interface NotasFilter {
  searchText: string;
  clientId: string;
  tag: string;
  author: string;
  assignedTo: string;
  priority: 'all' | 'alta' | 'media' | 'baja';
  dateRange: 'all' | 'today' | 'last7days' | 'last30days';
}

interface NotasFiltersProps {
  filters: NotasFilter;
  onFilterChange: (newFilters: Partial<NotasFilter>) => void;
}

interface Client {
  id: string;
  name: string;
}

interface TeamMember {
  id: string;
  name: string;
}

const NotasFilters: React.FC<NotasFiltersProps> = ({ filters, onFilterChange }) => {
  const [clients, setClients] = useState<Client[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);

  useEffect(() => {
    const fetchDropdownData = async () => {
      const fetchedClients = await getClients();
      const fetchedTeamMembers = await getTeamMembers();
      setClients(fetchedClients);
      setTeamMembers(fetchedTeamMembers);
    };
    fetchDropdownData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    onFilterChange({ [name]: value });
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Filtros de Notas</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label htmlFor="searchText" className="block text-sm font-medium text-gray-700">Buscar en contenido</label>
          <input
            type="text"
            id="searchText"
            name="searchText"
            value={filters.searchText}
            onChange={handleChange}
            placeholder="Buscar por título o contenido..."
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label htmlFor="clientId" className="block text-sm font-medium text-gray-700">Cliente/Lead</label>
          <select
            id="clientId"
            name="clientId"
            value={filters.clientId}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">Todos</option>
            {clients.map((client) => (
              <option key={client.id} value={client.id}>{client.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="tag" className="block text-sm font-medium text-gray-700">Etiqueta</label>
          <input
            type="text"
            id="tag"
            name="tag"
            value={filters.tag}
            onChange={handleChange}
            placeholder="Filtrar por etiqueta..."
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label htmlFor="author" className="block text-sm font-medium text-gray-700">Autor</label>
          <select
            id="author"
            name="author"
            value={filters.author}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">Todos</option>
            {teamMembers.map((member) => (
              <option key={member.id} value={member.name}>{member.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="assignedTo" className="block text-sm font-medium text-gray-700">Asignado a</label>
          <select
            id="assignedTo"
            name="assignedTo"
            value={filters.assignedTo}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">Todos</option>
            {teamMembers.map((member) => (
              <option key={member.id} value={member.name}>{member.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="priority" className="block text-sm font-medium text-gray-700">Prioridad</label>
          <select
            id="priority"
            name="priority"
            value={filters.priority}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="all">Todas</option>
            <option value="alta">Alta</option>
            <option value="media">Media</option>
            <option value="baja">Baja</option>
          </select>
        </div>
        <div>
          <label htmlFor="dateRange" className="block text-sm font-medium text-gray-700">Fecha</label>
          <select
            id="dateRange"
            name="dateRange"
            value={filters.dateRange}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="all">Cualquier fecha</option>
            <option value="today">Hoy</option>
            <option value="last7days">Últimos 7 días</option>
            <option value="last30days">Últimos 30 días</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default NotasFilters;
