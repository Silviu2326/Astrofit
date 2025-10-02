# 📦 Módulo de Pedidos de Clientes

Módulo completo para la gestión de pedidos con seguimiento de envíos y comunicación con clientes.

## 🎨 Diseño

- **Gradiente**: cyan → blue → indigo
- **Estilo**: Moderno, profesional y orientado a la gestión logística

## ✨ Características

### 📊 Gestión de Pedidos
- Lista completa de pedidos con información detallada
- Estados: pendiente, procesando, enviado, en tránsito, entregado, cancelado
- Prioridades: baja, normal, alta, urgente
- Métodos de pago: tarjeta, transferencia, PayPal, contra reembolso

### 🚚 Seguimiento de Envíos
- Timeline visual del historial de envío
- Información de tracking y empresa de envío
- Actualización de estados en tiempo real
- Eventos con ubicación, descripción y responsable
- Fechas estimadas de entrega

### 💬 Comunicación con Clientes
- Chat integrado para cada pedido
- Mensajes en tiempo real
- Adjuntos de archivos e imágenes
- Indicadores de lectura
- Notificaciones de mensajes no leídos

### 🔍 Filtros y Búsqueda
- Búsqueda por número de pedido, cliente o email
- Filtros por estado, prioridad y método de pago
- Rango de fechas
- Exportación de datos

### 📈 Estadísticas
- Total de pedidos
- Pedidos por estado
- Ingresos totales
- Ticket promedio
- Tasas de entrega y cancelación

## 📁 Estructura

```
pedidos-clientes/
├── components/
│   ├── PedidosClientes.tsx       # Componente principal
│   ├── TablaPedidos.tsx          # Tabla de pedidos
│   ├── DetallesPedido.tsx        # Modal de detalles
│   ├── TimelineEnvio.tsx         # Timeline de seguimiento
│   ├── ChatCliente.tsx           # Sistema de mensajería
│   ├── FiltrosPedidos.tsx        # Panel de filtros
│   └── EstadisticasPedidos.tsx   # Métricas y estadísticas
├── hooks/
│   └── usePedidos.ts             # Hook para gestión de pedidos
├── types/
│   └── index.ts                  # Definiciones TypeScript
└── index.ts                      # Exportaciones
```

## 🚀 Uso

```tsx
import { PedidosClientes } from '@/features/pedidos-clientes';

function App() {
  return <PedidosClientes />;
}
```

## 📊 Tipos de Datos

### Pedido
```typescript
interface Pedido {
  id: string;
  numeroPedido: string;
  cliente: Cliente;
  productos: ProductoPedido[];
  direccionEnvio: DireccionEnvio;
  estado: EstadoPedido;
  prioridad: PrioridadPedido;
  total: number;
  metodoPago: TipoPago;
  fechaPedido: Date;
  seguimiento?: string;
  historialEnvio: EventoEnvio[];
  mensajes: Mensaje[];
}
```

### Estados de Pedido
- `pendiente`: Pedido recibido, esperando procesamiento
- `procesando`: En preparación
- `enviado`: Enviado desde almacén
- `en_transito`: En camino al destino
- `entregado`: Entregado al cliente
- `cancelado`: Pedido cancelado

## 🎯 Funcionalidades Principales

### 1. Vista de Pedidos
- Tabla con todos los pedidos
- Información del cliente con avatar
- Estado visual con iconos y colores
- Prioridad destacada
- Indicadores de mensajes no leídos

### 2. Detalles del Pedido
- Información completa del cliente
- Dirección de envío
- Lista de productos con precios
- Resumen de pago (subtotal, envío, impuestos)
- Acciones: descargar PDF, imprimir, enviar por email

### 3. Seguimiento de Envío
- Timeline visual con eventos
- Estado actual destacado
- Información de tracking
- Empresa de envío
- Formulario para agregar eventos
- Ubicación y responsable de cada evento

### 4. Chat con Cliente
- Interfaz de mensajería intuitiva
- Mensajes del cliente y empresa diferenciados
- Adjuntar archivos e imágenes
- Indicadores de lectura
- Timestamps relativos
- Enter para enviar, Shift+Enter para nueva línea

### 5. Filtros Avanzados
- Por estado del pedido
- Por prioridad
- Por método de pago
- Por rango de fechas
- Limpieza rápida de filtros

## 🎨 Componentes Visuales

### Códigos de Color por Estado
- **Pendiente**: Amarillo
- **Procesando**: Azul
- **Enviado/En Tránsito**: Índigo/Púrpura
- **Entregado**: Verde
- **Cancelado**: Rojo

### Gradientes
- Principal: `from-cyan-500 via-blue-500 to-indigo-500`
- Fondos: `from-cyan-50 via-blue-50 to-indigo-50`
- Tarjetas: Degradados específicos por métrica

## 🔧 Personalización

### Modificar Estados
Edita `types/index.ts`:
```typescript
export type EstadoPedido =
  | 'pendiente'
  | 'procesando'
  | 'tu_nuevo_estado';
```

### Agregar Filtros
Edita `FiltrosPedidos.tsx` para añadir nuevos criterios de filtrado.

### Personalizar Chat
Modifica `ChatCliente.tsx` para cambiar el comportamiento de mensajería.

## 📱 Responsive

- ✅ Mobile-first
- ✅ Tablet optimizado
- ✅ Desktop completo
- ✅ Adaptación de grids y layouts

## ♿ Accesibilidad

- Etiquetas ARIA
- Navegación por teclado
- Contraste adecuado
- Textos descriptivos

## 🚀 Rendimiento

- Lazy loading de componentes
- Memoización con useMemo
- Animaciones optimizadas con Framer Motion
- Filtrado eficiente

## 🔜 Mejoras Futuras

- [ ] Integración con API real
- [ ] Notificaciones push
- [ ] Exportación a Excel/CSV
- [ ] Impresión de etiquetas de envío
- [ ] Integración con APIs de mensajería (WhatsApp, email)
- [ ] Gráficos de tendencias
- [ ] Predicción de entregas con IA
- [ ] Multi-idioma
