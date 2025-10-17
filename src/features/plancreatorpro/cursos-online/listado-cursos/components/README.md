# 🛍️ Componente ProductList

Este componente implementa el **primer prompt de prompts_frontend**: *"Crear un componente React para mostrar una lista de productos con filtros"*

## 📋 Características

### ✨ Funcionalidades Principales
- **Lista de productos** con diseño de tarjetas moderno y responsivo
- **Sistema de filtros avanzado** con múltiples criterios
- **Paginación inteligente** con control de elementos por página
- **Ordenamiento dinámico** por diferentes criterios
- **Búsqueda en tiempo real** por nombre y descripción
- **Filtros por rango de precio** con validación
- **Filtros por categoría y nivel** con opciones dinámicas
- **Filtro de productos destacados**

### 🎨 Diseño y UX
- **Diseño responsivo** que se adapta a móviles, tablets y desktop
- **Animaciones suaves** y transiciones elegantes
- **Estados de carga** y feedback visual
- **Accesibilidad completa** con ARIA labels y navegación por teclado
- **Tema moderno** con colores y tipografías profesionales

## 🏗️ Arquitectura

### Componentes
```
ProductList/
├── ProductList.jsx          # Componente principal
├── ProductList.css          # Estilos principales
├── useProductFilters.js     # Hook personalizado para filtros
├── Pagination.jsx           # Componente de paginación
├── Pagination.css           # Estilos de paginación
├── ProductListExample.jsx   # Ejemplo de uso
└── README.md               # Documentación
```

### Hook Personalizado: `useProductFilters`
```javascript
const {
  filtros,                    // Estado actual de filtros
  productosFiltrados,         // Productos después de aplicar filtros
  categorias,                 // Categorías únicas disponibles
  niveles,                    // Niveles únicos disponibles
  actualizarFiltro,           // Función para actualizar un filtro
  limpiarFiltros,             // Función para limpiar todos los filtros
  totalProductos,             // Total de productos
  totalFiltrados             // Total de productos filtrados
} = useProductFilters(productos);
```

## 🚀 Uso

### Implementación Básica
```jsx
import ProductList from './components/ProductList';

function App() {
  return (
    <div>
      <ProductList />
    </div>
  );
}
```

### Implementación con Datos Personalizados
```jsx
import ProductList from './components/ProductList';

const productosPersonalizados = [
  {
    id: 1,
    nombre: 'Mi Curso Personalizado',
    descripcion: 'Descripción del curso',
    precio: 99.99,
    categoria: 'Frontend',
    imagen: 'url-de-imagen',
    rating: 4.8,
    estudiantes: 1000,
    duracion: '30 horas',
    nivel: 'Intermedio',
    destacado: true
  }
  // ... más productos
];

function App() {
  return (
    <div>
      <ProductList productos={productosPersonalizados} />
    </div>
  );
}
```

## 🎛️ Filtros Disponibles

### 🔍 Búsqueda
- **Campo**: `busqueda`
- **Tipo**: Texto libre
- **Funciona en**: Nombre y descripción del producto

### 📂 Categoría
- **Campo**: `categoria`
- **Tipo**: Select dinámico
- **Opciones**: Se generan automáticamente de los productos

### 💰 Rango de Precio
- **Campos**: `precioMin`, `precioMax`
- **Tipo**: Input numérico
- **Validación**: Precio mínimo no puede ser mayor al máximo

### 📊 Nivel
- **Campo**: `nivel`
- **Tipo**: Select dinámico
- **Opciones**: Principiante, Intermedio, Avanzado

### ⭐ Destacados
- **Campo**: `soloDestacados`
- **Tipo**: Checkbox
- **Funcionalidad**: Muestra solo productos marcados como destacados

### 🔄 Ordenamiento
- **Campo**: `ordenamiento`
- **Opciones**:
  - `nombre`: Nombre (A-Z)
  - `precio-asc`: Precio (Menor a Mayor)
  - `precio-desc`: Precio (Mayor a Menor)
  - `rating`: Mejor Valorados
  - `estudiantes`: Más Populares

## 📱 Responsive Design

### Breakpoints
- **Desktop**: > 1024px - Grid de 3 columnas
- **Tablet**: 768px - 1024px - Grid de 2 columnas
- **Mobile**: < 768px - Grid de 1 columna

### Características Responsive
- **Filtros colapsables** en móviles
- **Paginación adaptativa** con controles táctiles
- **Imágenes optimizadas** para diferentes tamaños
- **Tipografía escalable** para mejor legibilidad

## 🎨 Personalización

### Variables CSS Principales
```css
:root {
  --primary-color: #3b82f6;
  --secondary-color: #6b7280;
  --success-color: #059669;
  --border-color: #e5e7eb;
  --background-color: #ffffff;
  --text-color: #1f2937;
}
```

### Clases CSS Principales
- `.product-list-container`: Contenedor principal
- `.filters-panel`: Panel de filtros lateral
- `.products-grid`: Grid de productos
- `.product-card`: Tarjeta individual de producto
- `.pagination-container`: Contenedor de paginación

## 🔧 Configuración Avanzada

### Props del Componente ProductList
```jsx
<ProductList
  productos={arrayDeProductos}           // Array de productos (opcional)
  itemsPerPage={12}                     // Elementos por página (opcional)
  showPagination={true}                 // Mostrar paginación (opcional)
  showFilters={true}                    // Mostrar filtros (opcional)
  onProductClick={handleProductClick}   // Callback al hacer click en producto (opcional)
  onAddToCart={handleAddToCart}         // Callback al agregar al carrito (opcional)
/>
```

### Estructura de Producto
```javascript
const producto = {
  id: number,                    // ID único del producto
  nombre: string,                 // Nombre del producto
  descripcion: string,            // Descripción del producto
  precio: number,                 // Precio del producto
  categoria: string,              // Categoría del producto
  imagen: string,                 // URL de la imagen
  rating: number,                 // Calificación (0-5)
  estudiantes: number,            // Número de estudiantes
  duracion: string,              // Duración del curso
  nivel: string,                 // Nivel de dificultad
  destacado: boolean             // Si es un producto destacado
};
```

## 🧪 Testing

### Casos de Prueba Recomendados
1. **Filtros individuales**: Probar cada filtro por separado
2. **Filtros combinados**: Probar múltiples filtros simultáneos
3. **Paginación**: Navegar entre páginas y cambiar elementos por página
4. **Búsqueda**: Probar búsquedas con diferentes términos
5. **Responsive**: Probar en diferentes tamaños de pantalla
6. **Accesibilidad**: Navegación con teclado y lectores de pantalla

## 🚀 Mejoras Futuras

### Funcionalidades Adicionales
- [ ] **Filtros guardados**: Guardar combinaciones de filtros
- [ ] **Vista de lista**: Alternar entre vista de grid y lista
- [ ] **Comparador**: Comparar productos lado a lado
- [ ] **Favoritos**: Sistema de productos favoritos
- [ ] **Filtros avanzados**: Filtros por fecha, instructor, etc.
- [ ] **Exportación**: Exportar resultados filtrados
- [ ] **URLs compartibles**: URLs con filtros aplicados

### Optimizaciones
- [ ] **Lazy loading**: Carga perezosa de imágenes
- [ ] **Virtualización**: Para listas muy grandes
- [ ] **Caché**: Cachear resultados de filtros
- [ ] **Debounce**: Optimizar búsquedas en tiempo real

## 📄 Licencia

Este componente es parte del proyecto PlanCreatorPro y está sujeto a las mismas condiciones de licencia del proyecto principal.

---

**Desarrollado como parte del primer prompt de prompts_frontend** 🎯










