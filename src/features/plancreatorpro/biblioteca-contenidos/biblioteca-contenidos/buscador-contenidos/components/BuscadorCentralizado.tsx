import React, { useState, useEffect } from 'react';
import { getSearchSuggestions } from '../buscadorContenidosApi';

interface BuscadorCentralizadoProps {
  onSearch?: (query: string) => void;
  isSearching?: boolean;
  searchQuery?: string;
}

const BuscadorCentralizado: React.FC<BuscadorCentralizadoProps> = ({ onSearch, isSearching = false, searchQuery = '' }) => {
  const [searchTerm, setSearchTerm] = useState(searchQuery);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  // Sincronizar con el searchQuery del padre
  useEffect(() => {
    setSearchTerm(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    if (searchTerm.length > 2) {
      const fetchSuggestions = async () => {
        const res = await getSearchSuggestions(searchTerm) as string[];
        setSuggestions(res);
      };
      fetchSuggestions();
    } else {
      setSuggestions([]);
    }
  }, [searchTerm]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm && !searchHistory.includes(searchTerm)) {
      setSearchHistory([searchTerm, ...searchHistory.slice(0, 4)]); // Keep last 5 searches
    }
    if (onSearch) {
      onSearch(searchTerm);
    }
  };

  return (
    <div className="relative">
      <form onSubmit={handleSearch} className="flex items-center border border-gray-300 rounded-full shadow-sm focus-within:ring-2 focus-within:ring-blue-500">
        <input
          type="text"
          className="w-full px-5 py-2 rounded-l-full focus:outline-none"
          placeholder="Buscar contenido..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          type="submit"
          disabled={isSearching}
          className="bg-blue-600 text-white px-6 py-2 rounded-r-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSearching ? 'Buscando...' : 'Buscar'}
        </button>
      </form>

      {suggestions.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 shadow-lg">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                setSearchTerm(suggestion);
                setSuggestions([]);
                if (onSearch) {
                  onSearch(suggestion);
                }
              }}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}

      {searchHistory.length > 0 && (
        <div className="mt-4">
          <h3 className="text-sm font-semibold text-gray-600 mb-2">Historial de Búsquedas:</h3>
          <div className="flex flex-wrap gap-2">
            {searchHistory.map((item, index) => (
              <span
                key={index}
                className="bg-gray-200 text-gray-700 text-sm px-3 py-1 rounded-full cursor-pointer hover:bg-gray-300"
                onClick={() => {
                  setSearchTerm(item);
                  if (onSearch) {
                    onSearch(item);
                  }
                }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BuscadorCentralizado;
