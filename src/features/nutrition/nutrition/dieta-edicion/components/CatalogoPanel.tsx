import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Filter,
  Clock,
  DollarSign,
  ChefHat,
  Heart,
  AlertTriangle,
  Sparkles,
  Snowflake,
  Flame,
  X,
  GripVertical,
  Droplet,
  Leaf,
  Utensils
} from 'lucide-react';
import { Receta, Alimento, FiltrosCatalogo } from '../types';

interface CatalogoPanelProps {
  onRecetaSelect: (receta: Receta) => void;
  onAlimentoSelect: (alimento: Alimento) => void;
}

type Tab = 'recetas' | 'alimentos' | 'plantillas' | 'bloques';
type SearchChip = {
  id: string;
  label: string;
  type: 'proteina' | 'alergeno' | 'tiempo' | 'coste';
  value: any;
};

export const CatalogoPanel: React.FC<CatalogoPanelProps> = ({
  onRecetaSelect,
  onAlimentoSelect
}) => {
  const [tabActiva, setTabActiva] = useState<Tab>('recetas');
  const [busqueda, setBusqueda] = useState('');
  const [mostrarFiltros, setMostrarFiltros] = useState(false);
  const [searchChips, setSearchChips] = useState<SearchChip[]>([]);

  // Mock data
  const recetasMock: Receta[] = [
    {
      id: '1',
      nombre: 'Tostadas aguacate & huevo',
      imagen: '🥑',
      macros: {
        proteinas: 18,
        carbohidratos: 35,
        grasas: 22,
        calorias: 420,
        fibra: 8,
        azucar: 2,
        sal: 1.2
      },
      tiempo: 15,
      coste: 3.5,
      alergenos: [{ id: '1', nombre: 'Gluten', icono: '🌾' }],
      saciedad: 4,
      sabor: ['salado', 'cremoso'],
      textura: ['crujiente', 'cremoso'],
      equipo: ['tostadora'],
      batchFriendly: false,
      congelable: false,
      requiereFrio: true,
      ingredientes: []
    },
    {
      id: '2',
      nombre: 'Bowl quinoa & pollo',
      imagen: '🥗',
      macros: {
        proteinas: 35,
        carbohidratos: 45,
        grasas: 12,
        calorias: 450,
        fibra: 7,
        azucar: 4,
        sal: 1.8
      },
      tiempo: 30,
      coste: 5.5,
      alergenos: [],
      saciedad: 5,
      sabor: ['salado', 'umami'],
      textura: ['crujiente', 'jugoso'],
      equipo: ['horno'],
      batchFriendly: true,
      congelable: true,
      requiereFrio: true,
      ingredientes: []
    },
    {
      id: '3',
      nombre: 'Batido proteína-plátano',
      imagen: '🥤',
      macros: {
        proteinas: 25,
        carbohidratos: 30,
        grasas: 5,
        calorias: 270,
        fibra: 3,
        azucar: 15,
        sal: 0.3
      },
      tiempo: 5,
      coste: 2.5,
      alergenos: [{ id: '2', nombre: 'Lácteos', icono: '🥛' }],
      saciedad: 3,
      sabor: ['dulce'],
      textura: ['cremoso'],
      equipo: ['batidora'],
      batchFriendly: false,
      congelable: false,
      requiereFrio: true,
      ingredientes: []
    },
    {
      id: '4',
      nombre: 'Ensalada mediterránea',
      imagen: '🥙',
      macros: {
        proteinas: 12,
        carbohidratos: 28,
        grasas: 18,
        calorias: 320,
        fibra: 9,
        azucar: 6,
        sal: 1.5
      },
      tiempo: 10,
      coste: 4.0,
      alergenos: [],
      saciedad: 3,
      sabor: ['salado', 'fresco'],
      textura: ['crujiente'],
      equipo: [],
      batchFriendly: false,
      congelable: false,
      requiereFrio: true,
      ingredientes: []
    }
  ];

  const tabs = [
    { id: 'recetas', label: 'Recetas', icon: ChefHat },
    { id: 'alimentos', label: 'Alimentos', icon: Sparkles },
    { id: 'plantillas', label: 'Plantillas', icon: Flame },
    { id: 'bloques', label: 'Bloques', icon: Heart }
  ];

  const addSearchChip = (chip: SearchChip) => {
    if (!searchChips.find((c) => c.id === chip.id)) {
      setSearchChips([...searchChips, chip]);
    }
  };

  const removeSearchChip = (id: string) => {
    setSearchChips(searchChips.filter((c) => c.id !== id));
  };

  const clearAllFilters = () => {
    setSearchChips([]);
    setBusqueda('');
  };

  const getSaciedadIcon = (saciedad: number) => {
    if (saciedad >= 4) return { icon: Utensils, color: 'text-green-600', label: 'Saciedad alta' };
    if (saciedad >= 3) return { icon: Droplet, color: 'text-blue-600', label: 'Saciedad media' };
    return { icon: Leaf, color: 'text-amber-600', label: 'Saciedad baja' };
  };

  const getSaborTextura = (receta: Receta) => {
    const sabor = receta.sabor[0] || '';
    const textura = receta.textura[0] || '';
    return `${sabor} · ${textura}`;
  };

  return (
    <div className="w-80 bg-white border-r border-gray-200 flex flex-col h-full">
      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setTabActiva(tab.id as Tab)}
            className={`flex-1 py-2.5 px-3 text-xs font-semibold transition-all relative ${
              tabActiva === tab.id
                ? 'text-lime-700 bg-lime-50'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center justify-center gap-1.5">
              <tab.icon className="w-3.5 h-3.5" />
              <span className="hidden xl:inline">{tab.label}</span>
            </div>
            {tabActiva === tab.id && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-lime-600"
              />
            )}
          </button>
        ))}
      </div>

      {/* Búsqueda mejorada */}
      <div className="p-3 border-b border-gray-200 space-y-2">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
          <input
            type="text"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder='Buscar... (">30g P", "sin gluten")'
            className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent text-sm"
          />
        </div>

        {/* Search Chips */}
        {searchChips.length > 0 && (
          <div className="flex items-center gap-1.5 flex-wrap">
            {searchChips.map((chip) => (
              <motion.div
                key={chip.id}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="flex items-center gap-1 px-2 py-1 bg-lime-100 text-lime-800 text-xs font-semibold rounded-full"
              >
                <span>{chip.label}</span>
                <button
                  onClick={() => removeSearchChip(chip.id)}
                  className="hover:bg-lime-200 rounded-full p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </motion.div>
            ))}
            <button
              onClick={clearAllFilters}
              className="text-xs font-semibold text-gray-600 hover:text-gray-900 underline"
            >
              Borrar todo
            </button>
          </div>
        )}

        {/* Toggle Filtros */}
        <button
          onClick={() => setMostrarFiltros(!mostrarFiltros)}
          className="w-full px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg text-xs font-semibold text-gray-700 flex items-center justify-center gap-2 transition-colors"
        >
          <Filter className="w-3.5 h-3.5" />
          {mostrarFiltros ? 'Ocultar filtros' : 'Filtros'}
        </button>

        {/* Filtros */}
        <AnimatePresence>
          {mostrarFiltros && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="space-y-2 overflow-hidden pt-1"
            >
              {/* Quick filters */}
              <div className="space-y-1.5">
                <button
                  onClick={() =>
                    addSearchChip({
                      id: 'proteina30',
                      label: '>30g proteína',
                      type: 'proteina',
                      value: 30
                    })
                  }
                  className="w-full px-2 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-xs font-semibold transition-colors text-left"
                >
                  + Alta proteína (&gt;30g)
                </button>
                <button
                  onClick={() =>
                    addSearchChip({
                      id: 'singluten',
                      label: 'Sin gluten',
                      type: 'alergeno',
                      value: 'gluten'
                    })
                  }
                  className="w-full px-2 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg text-xs font-semibold transition-colors text-left"
                >
                  + Sin gluten
                </button>
                <button
                  onClick={() =>
                    addSearchChip({
                      id: 'rapida',
                      label: '<25 min',
                      type: 'tiempo',
                      value: 25
                    })
                  }
                  className="w-full px-2 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-700 rounded-lg text-xs font-semibold transition-colors text-left"
                >
                  + Rápida (&lt;25 min)
                </button>
              </div>

              {/* Opciones especiales */}
              <div className="space-y-1.5 pt-1 border-t border-gray-200">
                <label className="flex items-center gap-2 text-xs cursor-pointer hover:bg-gray-50 rounded px-2 py-1">
                  <input type="checkbox" className="rounded text-lime-600" />
                  <Flame className="w-3 h-3 text-orange-500" />
                  Batch-friendly
                </label>
                <label className="flex items-center gap-2 text-xs cursor-pointer hover:bg-gray-50 rounded px-2 py-1">
                  <input type="checkbox" className="rounded text-lime-600" />
                  <Snowflake className="w-3 h-3 text-blue-500" />
                  Congelable
                </label>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Lista de recetas - Densidad reducida 10-12% */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {recetasMock
          .filter((r) => r.nombre.toLowerCase().includes(busqueda.toLowerCase()))
          .map((receta) => {
            const saciedadInfo = getSaciedadIcon(receta.saciedad);
            return (
              <motion.div
                key={receta.id}
                whileHover={{ scale: 1.015, x: 2 }}
                onClick={() => onRecetaSelect(receta)}
                draggable
                onDragStart={(e) => {
                  e.dataTransfer.setData('receta', JSON.stringify(receta));
                }}
                className="bg-white border border-gray-200 hover:border-lime-300 rounded-xl p-2.5 cursor-grab active:cursor-grabbing transition-all hover:shadow-md relative group"
              >
                {/* Drag handle - más evidente */}
                <div className="absolute left-1 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <GripVertical className="w-4 h-4 text-gray-400" />
                </div>

                {/* Header */}
                <div className="flex items-start gap-2.5 mb-2 pl-5">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-lime-100 to-green-100 flex items-center justify-center text-xl flex-shrink-0">
                    {receta.imagen}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-xs text-gray-900 truncate leading-tight">
                      {receta.nombre}
                    </h4>
                    {/* Tiempo y Batch juntos */}
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-gray-600 flex items-center gap-0.5">
                        <Clock className="w-3 h-3" />
                        {receta.tiempo}'
                      </span>
                      {receta.batchFriendly && (
                        <span className="px-1.5 py-0.5 bg-orange-100 text-orange-700 text-xs font-semibold rounded-full flex items-center gap-0.5">
                          <Flame className="w-2.5 h-2.5" />
                          Batch
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Macros compactos */}
                <div className="grid grid-cols-4 gap-1 mb-2">
                  <div className="text-center bg-orange-50 rounded px-1 py-1">
                    <div className="text-xs font-bold text-orange-600 leading-none">
                      {receta.macros.calorias}
                    </div>
                    <div className="text-xs text-gray-500 leading-none">kcal</div>
                  </div>
                  <div className="text-center bg-blue-50 rounded px-1 py-1">
                    <div className="text-xs font-bold text-blue-600 leading-none">
                      {receta.macros.proteinas}g
                    </div>
                    <div className="text-xs text-gray-500 leading-none">P</div>
                  </div>
                  <div className="text-center bg-amber-50 rounded px-1 py-1">
                    <div className="text-xs font-bold text-amber-600 leading-none">
                      {receta.macros.carbohidratos}g
                    </div>
                    <div className="text-xs text-gray-500 leading-none">C</div>
                  </div>
                  <div className="text-center bg-purple-50 rounded px-1 py-1">
                    <div className="text-xs font-bold text-purple-600 leading-none">
                      {receta.macros.grasas}g
                    </div>
                    <div className="text-xs text-gray-500 leading-none">G</div>
                  </div>
                </div>

                {/* Badges consistentes - coste + saciedad + alérgenos + congelable */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 flex-wrap">
                    <span className="text-xs text-gray-600 flex items-center gap-0.5">
                      <DollarSign className="w-3 h-3" />
                      {receta.coste.toFixed(1)}€
                    </span>
                    {receta.congelable && (
                      <span className="px-1.5 py-0.5 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full flex items-center gap-0.5">
                        <Snowflake className="w-2.5 h-2.5" />
                      </span>
                    )}
                    {receta.alergenos.length > 0 && (
                      <span className="px-1.5 py-0.5 bg-red-100 text-red-700 text-xs font-semibold rounded-full flex items-center gap-0.5">
                        <AlertTriangle className="w-2.5 h-2.5" />
                        {receta.alergenos[0].icono}
                      </span>
                    )}
                  </div>

                  {/* Saciedad + Sabor/Textura tooltip */}
                  <div className="flex items-center gap-1">
                    <div
                      className="flex items-center gap-0.5"
                      title={`${saciedadInfo.label} · ${getSaborTextura(receta)}`}
                    >
                      <saciedadInfo.icon className={`w-3 h-3 ${saciedadInfo.color}`} />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
      </div>
    </div>
  );
};
