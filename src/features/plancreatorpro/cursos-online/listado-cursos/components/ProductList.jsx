import React, { useState, useMemo, useEffect } from 'react';
import useProductFilters from './useProductFilters';
import Pagination from './Pagination';
import './ProductList.css';

// Datos de ejemplo para los productos
const productosEjemplo = [
  {
    id: 1,
    nombre: 'Curso de React Avanzado',
    descripcion: 'Aprende React desde cero hasta nivel avanzado con hooks, context y más',
    precio: 89.99,
    categoria: 'Frontend',
    imagen: 'https://via.placeholder.com/300x200/4f46e5/ffffff?text=React+Course',
    rating: 4.8,
    estudiantes: 1250,
    duracion: '40 horas',
    nivel: 'Intermedio',
    destacado: true
  },
  {
    id: 2,
    nombre: 'JavaScript Moderno ES6+',
    descripcion: 'Domina las características modernas de JavaScript',
    precio: 59.99,
    categoria: 'Frontend',
    imagen: 'https://via.placeholder.com/300x200/10b981/ffffff?text=JavaScript',
    rating: 4.6,
    estudiantes: 890,
    duracion: '25 horas',
    nivel: 'Principiante',
    destacado: false
  },
  {
    id: 3,
    nombre: 'Node.js y Express',
    descripcion: 'Desarrollo backend con Node.js y Express.js',
    precio: 79.99,
    categoria: 'Backend',
    imagen: 'https://via.placeholder.com/300x200/059669/ffffff?text=Node.js',
    rating: 4.7,
    estudiantes: 650,
    duracion: '35 horas',
    nivel: 'Intermedio',
    destacado: true
  },
  {
    id: 4,
    nombre: 'Python para Data Science',
    descripcion: 'Análisis de datos con Python, Pandas y NumPy',
    precio: 99.99,
    categoria: 'Data Science',
    imagen: 'https://via.placeholder.com/300x200/7c3aed/ffffff?text=Python',
    rating: 4.9,
    estudiantes: 2100,
    duracion: '50 horas',
    nivel: 'Avanzado',
    destacado: true
  },
  {
    id: 5,
    nombre: 'Diseño UI/UX con Figma',
    descripcion: 'Crea interfaces increíbles con Figma',
    precio: 49.99,
    categoria: 'Diseño',
    imagen: 'https://via.placeholder.com/300x200/f59e0b/ffffff?text=Figma',
    rating: 4.5,
    estudiantes: 750,
    duracion: '20 horas',
    nivel: 'Principiante',
    destacado: false
  },
  {
    id: 6,
    nombre: 'DevOps con Docker y Kubernetes',
    descripcion: 'Containerización y orquestación de aplicaciones',
    precio: 119.99,
    categoria: 'DevOps',
    imagen: 'https://via.placeholder.com/300x200/dc2626/ffffff?text=Docker',
    rating: 4.8,
    estudiantes: 450,
    duracion: '45 horas',
    nivel: 'Avanzado',
    destacado: false
  }
];

const ProductList = () => {
  // Estados para productos y paginación
  const [productos] = useState(productosEjemplo);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);

  // Usar el hook personalizado para filtros
  const {
    filtros,
    productosFiltrados,
    categorias,
    niveles,
    actualizarFiltro,
    limpiarFiltros,
    totalProductos,
    totalFiltrados
  } = useProductFilters(productos);

  // Calcular productos para la página actual
  const productosPaginados = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return productosFiltrados.slice(startIndex, endIndex);
  }, [productosFiltrados, currentPage, itemsPerPage]);

  // Calcular total de páginas
  const totalPages = Math.ceil(totalFiltrados / itemsPerPage);

  // Resetear página cuando cambien los filtros
  useEffect(() => {
    setCurrentPage(1);
  }, [filtros]);

  // Manejar cambio de página
  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Scroll hacia arriba para mejor UX
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Manejar cambio de elementos por página
  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  return (
    <div className="product-list-container">
      <div className="product-list-header">
        <h1>Catálogo de Cursos</h1>
        <p className="product-count">
          {totalFiltrados} de {totalProductos} cursos encontrados
        </p>
      </div>

      <div className="product-list-content">
        {/* Panel de Filtros */}
        <aside className="filters-panel">
          <div className="filters-header">
            <h3>Filtros</h3>
            <button onClick={limpiarFiltros} className="clear-filters-btn">
              Limpiar Filtros
            </button>
          </div>

          <div className="filter-group">
            <label htmlFor="busqueda">Buscar</label>
            <input
              id="busqueda"
              type="text"
              placeholder="Buscar cursos..."
              value={filtros.busqueda}
              onChange={(e) => actualizarFiltro('busqueda', e.target.value)}
              className="filter-input"
            />
          </div>

          <div className="filter-group">
            <label htmlFor="categoria">Categoría</label>
            <select
              id="categoria"
              value={filtros.categoria}
              onChange={(e) => actualizarFiltro('categoria', e.target.value)}
              className="filter-select"
            >
              <option value="">Todas las categorías</option>
              {categorias.map(categoria => (
                <option key={categoria} value={categoria}>{categoria}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="nivel">Nivel</label>
            <select
              id="nivel"
              value={filtros.nivel}
              onChange={(e) => actualizarFiltro('nivel', e.target.value)}
              className="filter-select"
            >
              <option value="">Todos los niveles</option>
              {niveles.map(nivel => (
                <option key={nivel} value={nivel}>{nivel}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Rango de Precio</label>
            <div className="price-range">
              <input
                type="number"
                placeholder="Mínimo"
                value={filtros.precioMin}
                onChange={(e) => actualizarFiltro('precioMin', e.target.value)}
                className="filter-input price-input"
              />
              <span>-</span>
              <input
                type="number"
                placeholder="Máximo"
                value={filtros.precioMax}
                onChange={(e) => actualizarFiltro('precioMax', e.target.value)}
                className="filter-input price-input"
              />
            </div>
          </div>

          <div className="filter-group">
            <label htmlFor="ordenamiento">Ordenar por</label>
            <select
              id="ordenamiento"
              value={filtros.ordenamiento}
              onChange={(e) => actualizarFiltro('ordenamiento', e.target.value)}
              className="filter-select"
            >
              <option value="nombre">Nombre (A-Z)</option>
              <option value="precio-asc">Precio (Menor a Mayor)</option>
              <option value="precio-desc">Precio (Mayor a Menor)</option>
              <option value="rating">Mejor Valorados</option>
              <option value="estudiantes">Más Populares</option>
            </select>
          </div>

          <div className="filter-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={filtros.soloDestacados}
                onChange={(e) => actualizarFiltro('soloDestacados', e.target.checked)}
              />
              <span>Solo cursos destacados</span>
            </label>
          </div>
        </aside>

        {/* Lista de Productos */}
        <main className="products-grid">
          {productosPaginados.length === 0 ? (
            <div className="no-products">
              <h3>No se encontraron cursos</h3>
              <p>Intenta ajustar los filtros para ver más resultados</p>
            </div>
          ) : (
            productosPaginados.map(producto => (
              <div key={producto.id} className="product-card">
                {producto.destacado && <div className="destacado-badge">⭐ Destacado</div>}
                
                <div className="product-image">
                  <img src={producto.imagen} alt={producto.nombre} />
                </div>

                <div className="product-info">
                  <div className="product-category">{producto.categoria}</div>
                  <h3 className="product-name">{producto.nombre}</h3>
                  <p className="product-description">{producto.descripcion}</p>
                  
                  <div className="product-meta">
                    <div className="product-rating">
                      <span className="stars">★★★★★</span>
                      <span className="rating-value">{producto.rating}</span>
                      <span className="students">({producto.estudiantes} estudiantes)</span>
                    </div>
                    
                    <div className="product-details">
                      <span className="level">{producto.nivel}</span>
                      <span className="duration">{producto.duracion}</span>
                    </div>
                  </div>

                  <div className="product-footer">
                    <div className="product-price">
                      <span className="price">${producto.precio}</span>
                    </div>
                    
                    <div className="product-actions">
                      <button className="btn-primary">Ver Detalles</button>
                      <button className="btn-secondary">Agregar al Carrito</button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </main>
      </div>

      {/* Componente de Paginación */}
      {totalFiltrados > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          itemsPerPage={itemsPerPage}
          totalItems={totalFiltrados}
          onPageChange={handlePageChange}
          onItemsPerPageChange={handleItemsPerPageChange}
          showItemsPerPage={true}
          showPageInfo={true}
        />
      )}
    </div>
  );
};

export default ProductList;