import React, { useState } from 'react';
import useShoppingCart from '../hooks/useShoppingCart';
import './ShoppingCartExample.css';

// Datos de ejemplo para productos
const productosEjemplo = [
  {
    id: 1,
    nombre: 'Curso de React Avanzado',
    descripcion: 'Aprende React desde cero hasta nivel avanzado',
    precio: 89.99,
    categoria: 'Frontend',
    imagen: 'https://via.placeholder.com/100x100/4f46e5/ffffff?text=React'
  },
  {
    id: 2,
    nombre: 'JavaScript Moderno ES6+',
    descripcion: 'Domina las características modernas de JavaScript',
    precio: 59.99,
    categoria: 'Frontend',
    imagen: 'https://via.placeholder.com/100x100/10b981/ffffff?text=JS'
  },
  {
    id: 3,
    nombre: 'Node.js y Express',
    descripcion: 'Desarrollo backend con Node.js y Express.js',
    precio: 79.99,
    categoria: 'Backend',
    imagen: 'https://via.placeholder.com/100x100/059669/ffffff?text=Node'
  },
  {
    id: 4,
    nombre: 'Python para Data Science',
    descripcion: 'Análisis de datos con Python, Pandas y NumPy',
    precio: 99.99,
    categoria: 'Data Science',
    imagen: 'https://via.placeholder.com/100x100/7c3aed/ffffff?text=Python'
  }
];

/**
 * Componente de ejemplo que demuestra el uso del hook useShoppingCart
 * Implementa el segundo prompt de prompts_frontend
 */
const ShoppingCartExample = () => {
  const [couponCode, setCouponCode] = useState('');
  const [couponResult, setCouponResult] = useState(null);

  // Usar el hook personalizado del carrito
  const {
    cartItems,
    cartTotals,
    isLoading,
    error,
    addToCart,
    removeFromCart,
    updateQuantity,
    incrementQuantity,
    decrementQuantity,
    clearCart,
    isInCart,
    getItemQuantity,
    applyCoupon,
    getCartStats,
    isEmpty
  } = useShoppingCart({
    storageKey: 'shopping-cart-example',
    persist: true,
    onCartChange: (items) => {
      console.log('Carrito actualizado:', items);
    }
  });

  // Manejar aplicación de cupón
  const handleApplyCoupon = () => {
    if (!couponCode.trim()) return;
    
    const result = applyCoupon(couponCode);
    setCouponResult(result);
    
    if (result.success) {
      setCouponCode('');
    }
  };

  // Obtener estadísticas del carrito
  const cartStats = getCartStats();

  return (
    <div className="shopping-cart-example">
      <div className="example-header">
        <h2>Ejemplo de Hook useShoppingCart</h2>
        <p>
          Este componente implementa el segundo prompt de prompts_frontend:
          <strong>"Implementar un hook personalizado para manejar el estado del carrito de compras"</strong>
        </p>
      </div>

      <div className="cart-demo-container">
        {/* Sección de Productos */}
        <div className="products-section">
          <h3>Productos Disponibles</h3>
          <div className="products-grid">
            {productosEjemplo.map(producto => (
              <div key={producto.id} className="product-card">
                <div className="product-image">
                  <img src={producto.imagen} alt={producto.nombre} />
                </div>
                <div className="product-info">
                  <h4>{producto.nombre}</h4>
                  <p>{producto.descripcion}</p>
                  <div className="product-price">${producto.precio}</div>
                  <div className="product-actions">
                    {isInCart(producto.id) ? (
                      <div className="quantity-controls">
                        <button 
                          onClick={() => decrementQuantity(producto.id)}
                          className="btn-quantity"
                        >
                          -
                        </button>
                        <span className="quantity">{getItemQuantity(producto.id)}</span>
                        <button 
                          onClick={() => incrementQuantity(producto.id)}
                          className="btn-quantity"
                        >
                          +
                        </button>
                      </div>
                    ) : (
                      <button 
                        onClick={() => addToCart(producto)}
                        className="btn-add-to-cart"
                        disabled={isLoading}
                      >
                        {isLoading ? 'Agregando...' : 'Agregar al Carrito'}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sección del Carrito */}
        <div className="cart-section">
          <div className="cart-header">
            <h3>Carrito de Compras</h3>
            {!isEmpty && (
              <button onClick={clearCart} className="btn-clear-cart">
                Limpiar Carrito
              </button>
            )}
          </div>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          {isEmpty ? (
            <div className="empty-cart">
              <p>Tu carrito está vacío</p>
              <p>Agrega algunos productos para comenzar</p>
            </div>
          ) : (
            <>
              {/* Lista de productos en el carrito */}
              <div className="cart-items">
                {cartItems.map(item => (
                  <div key={item.id} className="cart-item">
                    <div className="item-image">
                      <img src={item.imagen} alt={item.nombre} />
                    </div>
                    <div className="item-details">
                      <h4>{item.nombre}</h4>
                      <p className="item-category">{item.categoria}</p>
                      <div className="item-price">${item.precio}</div>
                    </div>
                    <div className="item-controls">
                      <div className="quantity-controls">
                        <button 
                          onClick={() => decrementQuantity(item.id)}
                          className="btn-quantity"
                        >
                          -
                        </button>
                        <input
                          type="number"
                          value={item.cantidad}
                          onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 0)}
                          className="quantity-input"
                          min="0"
                        />
                        <button 
                          onClick={() => incrementQuantity(item.id)}
                          className="btn-quantity"
                        >
                          +
                        </button>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="btn-remove"
                      >
                        Eliminar
                      </button>
                    </div>
                    <div className="item-total">
                      ${(item.precio * item.cantidad).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Aplicar cupón */}
              <div className="coupon-section">
                <h4>Aplicar Cupón</h4>
                <div className="coupon-controls">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Código de cupón"
                    className="coupon-input"
                  />
                  <button onClick={handleApplyCoupon} className="btn-apply-coupon">
                    Aplicar
                  </button>
                </div>
                {couponResult && (
                  <div className={`coupon-result ${couponResult.success ? 'success' : 'error'}`}>
                    {couponResult.success ? couponResult.description : couponResult.error}
                  </div>
                )}
                <div className="coupon-hints">
                  <p>Cupones disponibles:</p>
                  <ul>
                    <li><code>DESCUENTO10</code> - 10% de descuento</li>
                    <li><code>DESCUENTO20</code> - 20% de descuento</li>
                    <li><code>BIENVENIDO</code> - 15% de descuento</li>
                  </ul>
                </div>
              </div>

              {/* Resumen del carrito */}
              <div className="cart-summary">
                <h4>Resumen del Pedido</h4>
                <div className="summary-line">
                  <span>Subtotal ({cartTotals.totalItems} items):</span>
                  <span>${cartTotals.subtotal}</span>
                </div>
                {cartTotals.hasDiscount && (
                  <div className="summary-line discount">
                    <span>Descuento ({cartTotals.discountPercentage}%):</span>
                    <span>-${cartTotals.discountAmount}</span>
                  </div>
                )}
                <div className="summary-line total">
                  <span>Total:</span>
                  <span>${cartTotals.total}</span>
                </div>
              </div>

              {/* Estadísticas del carrito */}
              <div className="cart-stats">
                <h4>Estadísticas</h4>
                <div className="stats-grid">
                  <div className="stat-item">
                    <span className="stat-label">Total de items:</span>
                    <span className="stat-value">{cartStats.totalItems}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Valor total:</span>
                    <span className="stat-value">${cartStats.totalValue}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Precio promedio:</span>
                    <span className="stat-value">${cartStats.averageItemPrice.toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="category-stats">
                  <h5>Categorías:</h5>
                  {Object.entries(cartStats.categories).map(([category, count]) => (
                    <div key={category} className="category-stat">
                      <span>{category}:</span>
                      <span>{count} items</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Botón de checkout */}
              <button className="btn-checkout" disabled={isLoading}>
                {isLoading ? 'Procesando...' : 'Proceder al Pago'}
              </button>
            </>
          )}
        </div>
      </div>

      {/* Información del hook */}
      <div className="hook-info">
        <h3>Características del Hook useShoppingCart:</h3>
        <ul>
          <li>✅ Gestión completa del estado del carrito</li>
          <li>✅ Persistencia automática en localStorage</li>
          <li>✅ Cálculo automático de totales y descuentos</li>
          <li>✅ Funciones para agregar, eliminar y actualizar productos</li>
          <li>✅ Sistema de cupones de descuento</li>
          <li>✅ Estadísticas y análisis del carrito</li>
          <li>✅ Exportación e importación de carritos</li>
          <li>✅ Manejo de errores y estados de carga</li>
          <li>✅ Callbacks personalizables</li>
          <li>✅ Optimizado con useMemo y useCallback</li>
        </ul>
      </div>
    </div>
  );
};

export default ShoppingCartExample;
