import { useState, useEffect, useCallback, useMemo } from 'react';

/**
 * Hook personalizado para manejar el estado del carrito de compras
 * Implementa el segundo prompt de prompts_frontend
 * 
 * @param {Object} options - Opciones de configuración
 * @param {string} options.storageKey - Clave para localStorage (default: 'shopping-cart')
 * @param {boolean} options.persist - Si debe persistir en localStorage (default: true)
 * @param {Function} options.onCartChange - Callback cuando cambia el carrito
 * @returns {Object} Objeto con estado y funciones del carrito
 */
export const useShoppingCart = (options = {}) => {
  const {
    storageKey = 'shopping-cart',
    persist = true,
    onCartChange
  } = options;

  // Estado del carrito
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Cargar carrito desde localStorage al inicializar
  useEffect(() => {
    if (persist) {
      try {
        const savedCart = localStorage.getItem(storageKey);
        if (savedCart) {
          const parsedCart = JSON.parse(savedCart);
          setCartItems(parsedCart);
        }
      } catch (err) {
        console.error('Error al cargar carrito desde localStorage:', err);
        setError('Error al cargar el carrito guardado');
      }
    }
  }, [storageKey, persist]);

  // Guardar carrito en localStorage cuando cambie
  useEffect(() => {
    if (persist && cartItems.length >= 0) {
      try {
        localStorage.setItem(storageKey, JSON.stringify(cartItems));
        if (onCartChange) {
          onCartChange(cartItems);
        }
      } catch (err) {
        console.error('Error al guardar carrito en localStorage:', err);
        setError('Error al guardar el carrito');
      }
    }
  }, [cartItems, storageKey, persist, onCartChange]);

  // Calcular totales
  const cartTotals = useMemo(() => {
    const subtotal = cartItems.reduce((total, item) => {
      return total + (item.precio * item.cantidad);
    }, 0);

    const totalItems = cartItems.reduce((total, item) => {
      return total + item.cantidad;
    }, 0);

    // Calcular descuentos (ejemplo: 10% si hay más de 3 items)
    const discountPercentage = totalItems >= 3 ? 0.1 : 0;
    const discountAmount = subtotal * discountPercentage;
    
    const total = subtotal - discountAmount;

    return {
      subtotal: parseFloat(subtotal.toFixed(2)),
      discountAmount: parseFloat(discountAmount.toFixed(2)),
      discountPercentage: Math.round(discountPercentage * 100),
      total: parseFloat(total.toFixed(2)),
      totalItems,
      hasDiscount: discountAmount > 0
    };
  }, [cartItems]);

  // Verificar si un producto está en el carrito
  const isInCart = useCallback((productId) => {
    return cartItems.some(item => item.id === productId);
  }, [cartItems]);

  // Obtener cantidad de un producto en el carrito
  const getItemQuantity = useCallback((productId) => {
    const item = cartItems.find(item => item.id === productId);
    return item ? item.cantidad : 0;
  }, [cartItems]);

  // Agregar producto al carrito
  const addToCart = useCallback((product, quantity = 1) => {
    setIsLoading(true);
    setError(null);

    try {
      setCartItems(prevItems => {
        const existingItem = prevItems.find(item => item.id === product.id);
        
        if (existingItem) {
          // Si el producto ya existe, aumentar la cantidad
          return prevItems.map(item =>
            item.id === product.id
              ? { ...item, cantidad: item.cantidad + quantity }
              : item
          );
        } else {
          // Si es un producto nuevo, agregarlo
          const newItem = {
            id: product.id,
            nombre: product.nombre,
            descripcion: product.descripcion,
            precio: product.precio,
            imagen: product.imagen,
            categoria: product.categoria,
            cantidad: quantity,
            agregadoEn: new Date().toISOString()
          };
          return [...prevItems, newItem];
        }
      });
    } catch (err) {
      setError('Error al agregar producto al carrito');
      console.error('Error adding to cart:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Remover producto del carrito
  const removeFromCart = useCallback((productId) => {
    setIsLoading(true);
    setError(null);

    try {
      setCartItems(prevItems => 
        prevItems.filter(item => item.id !== productId)
      );
    } catch (err) {
      setError('Error al remover producto del carrito');
      console.error('Error removing from cart:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Actualizar cantidad de un producto
  const updateQuantity = useCallback((productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.id === productId
            ? { ...item, cantidad: newQuantity }
            : item
        )
      );
    } catch (err) {
      setError('Error al actualizar cantidad del producto');
      console.error('Error updating quantity:', err);
    } finally {
      setIsLoading(false);
    }
  }, [removeFromCart]);

  // Incrementar cantidad de un producto
  const incrementQuantity = useCallback((productId) => {
    const currentQuantity = getItemQuantity(productId);
    updateQuantity(productId, currentQuantity + 1);
  }, [getItemQuantity, updateQuantity]);

  // Decrementar cantidad de un producto
  const decrementQuantity = useCallback((productId) => {
    const currentQuantity = getItemQuantity(productId);
    updateQuantity(productId, currentQuantity - 1);
  }, [getItemQuantity, updateQuantity]);

  // Limpiar todo el carrito
  const clearCart = useCallback(() => {
    setIsLoading(true);
    setError(null);

    try {
      setCartItems([]);
    } catch (err) {
      setError('Error al limpiar el carrito');
      console.error('Error clearing cart:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Aplicar cupón de descuento
  const applyCoupon = useCallback((couponCode) => {
    // Lógica simple de cupones (puede ser expandida)
    const validCoupons = {
      'DESCUENTO10': { percentage: 0.1, description: '10% de descuento' },
      'DESCUENTO20': { percentage: 0.2, description: '20% de descuento' },
      'BIENVENIDO': { percentage: 0.15, description: '15% de descuento para nuevos usuarios' }
    };

    const coupon = validCoupons[couponCode.toUpperCase()];
    if (coupon) {
      return {
        success: true,
        discount: coupon.percentage,
        description: coupon.description
      };
    }

    return {
      success: false,
      error: 'Cupón no válido'
    };
  }, []);

  // Obtener resumen del carrito
  const getCartSummary = useCallback(() => {
    return {
      items: cartItems,
      totals: cartTotals,
      isEmpty: cartItems.length === 0,
      isLoading,
      error
    };
  }, [cartItems, cartTotals, isLoading, error]);

  // Exportar carrito (para compartir o backup)
  const exportCart = useCallback(() => {
    return {
      items: cartItems,
      totals: cartTotals,
      exportedAt: new Date().toISOString()
    };
  }, [cartItems, cartTotals]);

  // Importar carrito (desde backup o compartido)
  const importCart = useCallback((cartData) => {
    setIsLoading(true);
    setError(null);

    try {
      if (cartData && cartData.items) {
        setCartItems(cartData.items);
        return { success: true };
      }
      return { success: false, error: 'Datos de carrito inválidos' };
    } catch (err) {
      setError('Error al importar carrito');
      return { success: false, error: 'Error al importar carrito' };
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Verificar si el carrito ha cambiado desde la última vez
  const hasCartChanged = useCallback(() => {
    const lastSaved = localStorage.getItem(`${storageKey}-last-modified`);
    const currentTime = new Date().toISOString();
    
    if (!lastSaved) return true;
    
    const lastModified = new Date(lastSaved);
    const now = new Date(currentTime);
    
    return (now - lastModified) > 0;
  }, [storageKey]);

  // Obtener estadísticas del carrito
  const getCartStats = useCallback(() => {
    const categories = {};
    const priceRanges = { '0-50': 0, '50-100': 0, '100-200': 0, '200+': 0 };
    
    cartItems.forEach(item => {
      // Categorías
      categories[item.categoria] = (categories[item.categoria] || 0) + item.cantidad;
      
      // Rangos de precio
      const price = item.precio;
      if (price < 50) priceRanges['0-50'] += item.cantidad;
      else if (price < 100) priceRanges['50-100'] += item.cantidad;
      else if (price < 200) priceRanges['100-200'] += item.cantidad;
      else priceRanges['200+'] += item.cantidad;
    });

    return {
      totalItems: cartTotals.totalItems,
      totalValue: cartTotals.total,
      categories,
      priceRanges,
      averageItemPrice: cartItems.length > 0 ? cartTotals.total / cartTotals.totalItems : 0
    };
  }, [cartItems, cartTotals]);

  return {
    // Estado
    cartItems,
    cartTotals,
    isLoading,
    error,
    
    // Funciones principales
    addToCart,
    removeFromCart,
    updateQuantity,
    incrementQuantity,
    decrementQuantity,
    clearCart,
    
    // Funciones de utilidad
    isInCart,
    getItemQuantity,
    getCartSummary,
    getCartStats,
    
    // Funciones avanzadas
    applyCoupon,
    exportCart,
    importCart,
    hasCartChanged,
    
    // Estado derivado
    isEmpty: cartItems.length === 0,
    totalItems: cartTotals.totalItems,
    totalValue: cartTotals.total
  };
};

export default useShoppingCart;
