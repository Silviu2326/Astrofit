import { useState, useMemo, useCallback } from 'react';

/**
 * Hook personalizado para manejar el estado y lógica de filtros de productos
 * @param {Array} productos - Array de productos a filtrar
 * @returns {Object} Objeto con filtros, funciones y productos filtrados
 */
export const useProductFilters = (productos) => {
  // Estado inicial de filtros
  const [filtros, setFiltros] = useState({
    busqueda: '',
    categoria: '',
    precioMin: '',
    precioMax: '',
    nivel: '',
    ordenamiento: 'nombre',
    soloDestacados: false
  });

  // Obtener categorías únicas
  const categorias = useMemo(() => {
    return [...new Set(productos.map(producto => producto.categoria))];
  }, [productos]);

  // Obtener niveles únicos
  const niveles = useMemo(() => {
    return [...new Set(productos.map(producto => producto.nivel))];
  }, [productos]);

  // Filtrar y ordenar productos
  const productosFiltrados = useMemo(() => {
    let resultado = productos.filter(producto => {
      // Filtro de búsqueda (nombre y descripción)
      if (filtros.busqueda) {
        const busqueda = filtros.busqueda.toLowerCase();
        const nombreMatch = producto.nombre.toLowerCase().includes(busqueda);
        const descripcionMatch = producto.descripcion.toLowerCase().includes(busqueda);
        if (!nombreMatch && !descripcionMatch) return false;
      }

      // Filtro de categoría
      if (filtros.categoria && producto.categoria !== filtros.categoria) {
        return false;
      }

      // Filtro de precio mínimo
      if (filtros.precioMin && producto.precio < parseFloat(filtros.precioMin)) {
        return false;
      }

      // Filtro de precio máximo
      if (filtros.precioMax && producto.precio > parseFloat(filtros.precioMax)) {
        return false;
      }

      // Filtro de nivel
      if (filtros.nivel && producto.nivel !== filtros.nivel) {
        return false;
      }

      // Filtro de destacados
      if (filtros.soloDestacados && !producto.destacado) {
        return false;
      }

      return true;
    });

    // Aplicar ordenamiento
    resultado.sort((a, b) => {
      switch (filtros.ordenamiento) {
        case 'precio-asc':
          return a.precio - b.precio;
        case 'precio-desc':
          return b.precio - a.precio;
        case 'rating':
          return b.rating - a.rating;
        case 'estudiantes':
          return b.estudiantes - a.estudiantes;
        case 'nombre':
        default:
          return a.nombre.localeCompare(b.nombre);
      }
    });

    return resultado;
  }, [productos, filtros]);

  // Función para actualizar un filtro específico
  const actualizarFiltro = useCallback((campo, valor) => {
    setFiltros(prev => ({
      ...prev,
      [campo]: valor
    }));
  }, []);

  // Función para actualizar múltiples filtros a la vez
  const actualizarFiltros = useCallback((nuevosFiltros) => {
    setFiltros(prev => ({
      ...prev,
      ...nuevosFiltros
    }));
  }, []);

  // Función para limpiar todos los filtros
  const limpiarFiltros = useCallback(() => {
    setFiltros({
      busqueda: '',
      categoria: '',
      precioMin: '',
      precioMax: '',
      nivel: '',
      ordenamiento: 'nombre',
      soloDestacados: false
    });
  }, []);

  // Función para resetear a filtros por defecto
  const resetearFiltros = useCallback(() => {
    setFiltros({
      busqueda: '',
      categoria: '',
      precioMin: '',
      precioMax: '',
      nivel: '',
      ordenamiento: 'nombre',
      soloDestacados: false
    });
  }, []);

  // Función para obtener estadísticas de filtros activos
  const obtenerEstadisticasFiltros = useCallback(() => {
    const filtrosActivos = Object.entries(filtros).filter(([key, value]) => {
      if (key === 'ordenamiento') return false;
      return value !== '' && value !== false;
    });

    return {
      totalFiltros: filtrosActivos.length,
      filtrosActivos: filtrosActivos.map(([key, value]) => ({ key, value })),
      tieneFiltros: filtrosActivos.length > 0
    };
  }, [filtros]);

  // Función para exportar filtros actuales
  const exportarFiltros = useCallback(() => {
    return { ...filtros };
  }, [filtros]);

  // Función para importar filtros
  const importarFiltros = useCallback((filtrosImportados) => {
    setFiltros(prev => ({
      ...prev,
      ...filtrosImportados
    }));
  }, []);

  return {
    // Estado
    filtros,
    productosFiltrados,
    categorias,
    niveles,
    
    // Funciones
    actualizarFiltro,
    actualizarFiltros,
    limpiarFiltros,
    resetearFiltros,
    obtenerEstadisticasFiltros,
    exportarFiltros,
    importarFiltros,
    
    // Estadísticas
    totalProductos: productos.length,
    totalFiltrados: productosFiltrados.length
  };
};

export default useProductFilters;










