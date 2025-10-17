import React from 'react';
import ProductList from './ProductList';

/**
 * Componente de ejemplo que muestra cómo usar ProductList
 * Este archivo demuestra la implementación del primer prompt de prompts_frontend
 */
const ProductListExample = () => {
  return (
    <div className="product-list-example">
      <div className="example-header">
        <h2>Ejemplo de Lista de Productos con Filtros</h2>
        <p>
          Este componente implementa el primer prompt de prompts_frontend:
          <strong>"Crear un componente React para mostrar una lista de productos con filtros"</strong>
        </p>
      </div>
      
      <ProductList />
      
      <div className="example-features">
        <h3>Características implementadas:</h3>
        <ul>
          <li>✅ Lista de productos con diseño de tarjetas moderno</li>
          <li>✅ Sistema de filtros avanzado (búsqueda, categoría, precio, nivel)</li>
          <li>✅ Ordenamiento por múltiples criterios</li>
          <li>✅ Paginación con control de elementos por página</li>
          <li>✅ Diseño responsivo para móviles y desktop</li>
          <li>✅ Hook personalizado para manejo de estado</li>
          <li>✅ Componentes reutilizables y modulares</li>
          <li>✅ Accesibilidad y buenas prácticas de UX</li>
        </ul>
      </div>
    </div>
  );
};

export default ProductListExample;










