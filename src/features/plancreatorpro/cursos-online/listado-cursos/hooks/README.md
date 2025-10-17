# 🛒 Hook useShoppingCart

Este hook personalizado implementa el **segundo prompt de prompts_frontend**: *"Implementar un hook personalizado para manejar el estado del carrito de compras"*

## 📋 Características

### ✨ Funcionalidades Principales
- **Gestión completa del estado** del carrito de compras
- **Persistencia automática** en localStorage
- **Cálculo automático** de totales, descuentos e impuestos
- **Sistema de cupones** de descuento
- **Estadísticas avanzadas** del carrito
- **Exportación e importación** de carritos
- **Manejo de errores** y estados de carga
- **Optimización de rendimiento** con useMemo y useCallback

### 🎯 Funciones del Hook
- `addToCart()` - Agregar productos al carrito
- `removeFromCart()` - Eliminar productos del carrito
- `updateQuantity()` - Actualizar cantidad de productos
- `incrementQuantity()` - Incrementar cantidad
- `decrementQuantity()` - Decrementar cantidad
- `clearCart()` - Limpiar todo el carrito
- `applyCoupon()` - Aplicar cupones de descuento
- `exportCart()` - Exportar carrito
- `importCart()` - Importar carrito

## 🚀 Uso Básico

```jsx
import useShoppingCart from './hooks/useShoppingCart';

function ShoppingCart() {
  const {
    cartItems,
    cartTotals,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart
  } = useShoppingCart();

  return (
    <div>
      {/* Tu componente aquí */}
    </div>
  );
}
```

## ⚙️ Configuración Avanzada

```jsx
const {
  cartItems,
  cartTotals,
  addToCart,
  // ... otras funciones
} = useShoppingCart({
  storageKey: 'mi-carrito-personalizado',
  persist: true,
  onCartChange: (items) => {
    console.log('Carrito actualizado:', items);
  }
});
```

## 📊 API Completa

### Estado del Hook
```javascript
const {
  // Estado principal
  cartItems,           // Array de productos en el carrito
  cartTotals,          // Objeto con totales calculados
  isLoading,           // Estado de carga
  error,               // Mensaje de error si existe
  
  // Estado derivado
  isEmpty,             // Boolean: si el carrito está vacío
  totalItems,          // Número total de items
  totalValue,          // Valor total del carrito
} = useShoppingCart();
```

### Funciones Principales
```javascript
// Agregar producto al carrito
addToCart(product, quantity = 1)

// Remover producto del carrito
removeFromCart(productId)

// Actualizar cantidad de un producto
updateQuantity(productId, newQuantity)

// Incrementar/decrementar cantidad
incrementQuantity(productId)
decrementQuantity(productId)

// Limpiar todo el carrito
clearCart()
```

### Funciones de Utilidad
```javascript
// Verificar si un producto está en el carrito
isInCart(productId)

// Obtener cantidad de un producto
getItemQuantity(productId)

// Obtener resumen completo del carrito
getCartSummary()

// Obtener estadísticas del carrito
getCartStats()
```

### Funciones Avanzadas
```javascript
// Aplicar cupón de descuento
applyCoupon(couponCode)

// Exportar carrito para backup
exportCart()

// Importar carrito desde backup
importCart(cartData)

// Verificar si el carrito ha cambiado
hasCartChanged()
```

## 🎨 Estructura de Datos

### Producto en el Carrito
```javascript
const cartItem = {
  id: number,                    // ID único del producto
  nombre: string,                // Nombre del producto
  descripcion: string,           // Descripción del producto
  precio: number,                // Precio unitario
  imagen: string,                // URL de la imagen
  categoria: string,             // Categoría del producto
  cantidad: number,              // Cantidad en el carrito
  agregadoEn: string             // Fecha de agregado (ISO string)
};
```

### Totales del Carrito
```javascript
const cartTotals = {
  subtotal: number,              // Subtotal sin descuentos
  discountAmount: number,        // Monto de descuento
  discountPercentage: number,     // Porcentaje de descuento
  total: number,                 // Total final
  totalItems: number,            // Total de items
  hasDiscount: boolean           // Si tiene descuento aplicado
};
```

### Estadísticas del Carrito
```javascript
const cartStats = {
  totalItems: number,            // Total de items
  totalValue: number,            // Valor total
  categories: object,            // Items por categoría
  priceRanges: object,           // Items por rango de precio
  averageItemPrice: number       // Precio promedio por item
};
```

## 💡 Ejemplos de Uso

### Agregar Producto al Carrito
```jsx
const product = {
  id: 1,
  nombre: 'Curso de React',
  precio: 99.99,
  // ... otros campos
};

// Agregar 1 unidad
addToCart(product);

// Agregar 3 unidades
addToCart(product, 3);
```

### Manejar Cantidades
```jsx
// Incrementar cantidad
incrementQuantity(productId);

// Decrementar cantidad
decrementQuantity(productId);

// Establecer cantidad específica
updateQuantity(productId, 5);
```

### Aplicar Cupones
```jsx
const result = applyCoupon('DESCUENTO10');

if (result.success) {
  console.log('Cupón aplicado:', result.description);
} else {
  console.error('Error:', result.error);
}
```

### Exportar/Importar Carrito
```jsx
// Exportar carrito
const cartData = exportCart();
console.log('Carrito exportado:', cartData);

// Importar carrito
const importResult = importCart(cartData);
if (importResult.success) {
  console.log('Carrito importado exitosamente');
}
```

## 🔧 Configuración de Opciones

```javascript
const options = {
  storageKey: 'shopping-cart',    // Clave para localStorage
  persist: true,                  // Si debe persistir en localStorage
  onCartChange: (items) => {      // Callback cuando cambia el carrito
    console.log('Carrito actualizado:', items);
  }
};

const cart = useShoppingCart(options);
```

## 🎯 Casos de Uso Comunes

### E-commerce Básico
```jsx
function ProductCard({ product }) {
  const { addToCart, isInCart, getItemQuantity } = useShoppingCart();
  
  return (
    <div>
      <h3>{product.nombre}</h3>
      <p>${product.precio}</p>
      
      {isInCart(product.id) ? (
        <div>
          <button onClick={() => decrementQuantity(product.id)}>-</button>
          <span>{getItemQuantity(product.id)}</span>
          <button onClick={() => incrementQuantity(product.id)}>+</button>
        </div>
      ) : (
        <button onClick={() => addToCart(product)}>
          Agregar al Carrito
        </button>
      )}
    </div>
  );
}
```

### Carrito de Compras Completo
```jsx
function ShoppingCart() {
  const {
    cartItems,
    cartTotals,
    removeFromCart,
    updateQuantity,
    clearCart
  } = useShoppingCart();

  return (
    <div>
      <h2>Carrito de Compras</h2>
      
      {cartItems.map(item => (
        <div key={item.id}>
          <h4>{item.nombre}</h4>
          <p>${item.precio} x {item.cantidad}</p>
          <button onClick={() => removeFromCart(item.id)}>
            Eliminar
          </button>
        </div>
      ))}
      
      <div>
        <p>Total: ${cartTotals.total}</p>
        <button onClick={clearCart}>Limpiar Carrito</button>
      </div>
    </div>
  );
}
```

### Persistencia Personalizada
```jsx
function App() {
  const cart = useShoppingCart({
    storageKey: 'mi-tienda-carrito',
    persist: true,
    onCartChange: (items) => {
      // Sincronizar con servidor
      syncCartWithServer(items);
    }
  });

  return <MiComponente />;
}
```

## 🚀 Mejoras Futuras

### Funcionalidades Adicionales
- [ ] **Sincronización en tiempo real** entre dispositivos
- [ ] **Carritos compartidos** entre usuarios
- [ ] **Lista de deseos** integrada
- [ ] **Productos relacionados** basados en el carrito
- [ ] **Notificaciones** de cambios en el carrito
- [ ] **Analytics** de comportamiento del carrito

### Optimizaciones
- [ ] **Debounce** para actualizaciones frecuentes
- [ ] **Compresión** de datos en localStorage
- [ ] **Lazy loading** de productos
- [ ] **Cache inteligente** de productos

## 🧪 Testing

### Casos de Prueba Recomendados
1. **Agregar productos** al carrito
2. **Actualizar cantidades** de productos
3. **Eliminar productos** del carrito
4. **Aplicar cupones** de descuento
5. **Persistencia** en localStorage
6. **Exportación/importación** de carritos
7. **Cálculos de totales** correctos
8. **Manejo de errores** y estados de carga

## 📄 Licencia

Este hook es parte del proyecto PlanCreatorPro y está sujeto a las mismas condiciones de licencia del proyecto principal.

---

**Desarrollado como parte del segundo prompt de prompts_frontend** 🎯
