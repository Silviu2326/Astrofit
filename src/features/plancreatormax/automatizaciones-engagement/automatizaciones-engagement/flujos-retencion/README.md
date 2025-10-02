# 🔄 Flujos de Retención - Sistema de Automatización

## 📋 Descripción

Sistema completo de automatización de flujos de retención de clientes con constructor visual drag & drop, analytics en tiempo real, testing automatizado y optimización con IA.

## ✨ Características Principales

### 1. **Hero Section con Gradiente Green-Emerald-Teal**
- Título impactante: "Flujos de Retención Automatizados"
- Descripción: "Mantén a tus clientes comprometidos en piloto automático"
- Icono de infinity loop animado
- Pills informativos con glassmorphism

### 2. **Estadísticas Rápidas (4 Cards)**
- ✅ Flujos Activos
- 👥 Clientes en Flujos
- 📈 Tasa de Retención (%)
- 💰 Conversiones Generadas
- Cards con efecto glassmorphism y hover shimmer

### 3. **Galería de Flujos**
Grid responsivo con cards de flujos:
- Nombre del flujo
- Trigger (evento activador)
- Número de pasos
- Clientes activos
- Tasa de conversión con progress bar animado
- Ingresos generados
- Estado (Activo/Pausado/Draft) con badges coloridos
- Acciones: Ver Métricas, Editar, Duplicar, Test, Pausar/Activar

### 4. **Sistema de Filtros**
- Todos
- Activos
- Pausados
- Borradores

### 5. **Templates Predefinidos (5 Templates)**

#### 📋 Onboarding de Nuevos Clientes
- Día 1: Email de bienvenida + tutorial
- Día 3: Verificar si agendó primera sesión
- Día 7: Solicitar feedback inicial

#### 🔄 Reactivación de Inactivos
- Detectar inactividad > 7 días
- Email: "Te extrañamos"
- Oferta especial 20% descuento

#### ⬆️ Upsell a Plan Premium
- Trigger: Cliente usa features > 80%
- Mostrar beneficios premium
- Descuento limitado 30%

#### 🔄 Renovación de Suscripción
- 7 días antes de vencer
- 3 días antes (urgencia)
- Día de vencimiento (notificación push)

#### 🛒 Recuperación de Carrito Abandonado
- Trigger: Abandonó pago
- Recordatorio 1h después
- Descuento 15% a las 24h

### 6. **Constructor Visual de Flujos (Flow Builder)** 🎨

#### Canvas Drag & Drop
- Grid pattern de fondo
- Zoom in/out (50% - 200%)
- Auto-layout para organizar nodos
- Minimap en esquina inferior derecha

#### Tipos de Nodos
- **⚡ Trigger**: Punto de inicio del flujo
- **📧 Email**: Enviar email personalizado
- **💬 SMS**: Enviar mensaje de texto
- **🔔 Push**: Notificación push
- **🏷️ Tag**: Asignar etiqueta
- **💳 Plan**: Cambiar plan de suscripción
- **🔗 Webhook**: Ejecutar webhook externo
- **🔀 Condicional**: If/Then (Sí/No)
- **⏰ Delay**: Esperar X horas/días
- **⚡ A/B Split**: Dividir tráfico 50/50

#### Conexiones
- Líneas animadas entre nodos
- Diferentes colores por tipo:
  - Verde: Camino "Sí" en condicionales
  - Rojo: Camino "No" en condicionales
  - Gris: Camino por defecto
- Labels en conexiones

#### Panel de Configuración (Lateral Derecho)
- **Email**:
  - Asunto
  - Contenido (editor de texto)
  - Variables dinámicas
- **SMS**:
  - Mensaje (160 caracteres)
  - Variables
- **Push**:
  - Título
  - Mensaje
  - Deep link
- **Condicional**:
  - Condición a evaluar
  - Operadores (igual, mayor, contiene)
  - Valor a comparar
- **Delay**:
  - Duración (input numérico)
  - Unidad (horas/días/semanas)

### 7. **Analytics del Flujo** 📊

#### Métricas Principales
- Total de entradas
- Conversiones completadas
- Tasa de conversión (%)
- Tiempo promedio en flujo
- Ingresos generados

#### Funnel de Conversión Visual
- Diagrama paso por paso
- Usuarios que llegaron a cada paso
- Tasa de conversión por paso
- Drop-off rate con indicador visual
- Barras de progreso animadas

#### Métricas de Email
Por cada email del flujo:
- Total enviados
- Tasa de apertura (%)
- Tasa de clicks (%)
- Números absolutos (abiertos, clicks)
- Progress bars visuales

#### Gráfico Temporal (Placeholder)
- Rendimiento en el tiempo
- Área para chart de líneas/barras

### 8. **Sistema de Testing** 🧪

#### Configuración de Test
- Email de prueba (requerido)
- Teléfono de prueba (opcional)
- Botón "Ejecutar Test"

#### Timeline de Ejecución
- Visualización paso por paso
- Estados:
  - ⏳ Pendiente (gris)
  - 🔵 Ejecutando (azul, animado)
  - ✅ Completado (verde)
  - ❌ Error (rojo)
- Preview de contenido para cada paso
- Timestamp de ejecución
- Progress bar individual

#### Validación Automática
- ✅ Todos los nodos configurados
- ✅ No hay paths sin salida
- ✅ Variables definidas correctamente
- Indicadores visuales de validación

### 9. **Segmentación y Reglas** 🎯

#### Segmentación de Entrada
**Incluir Segmentos:**
- 💳 Plan Premium / Básico
- 📍 España / México / Otros
- 📊 Alto / Bajo Engagement
- 🏷️ Tags personalizados (VIP, etc.)

**Excluir Segmentos:**
- Mismas opciones para exclusión
- Visual con border rojo

**Preview de Audiencia:**
- Cálculo estimado de usuarios
- Muestra tamaño final de audiencia

#### Reglas de Salida
Condiciones automáticas de salida:
- ✅ Completó objetivo (conversión)
- ❌ Canceló suscripción
- 🔄 Cambió de segmento
- ⏰ Tiempo límite alcanzado

**Acción al Salir (opcional):**
- Asignar tag específico
- Enviar email de despedida
- Ejecutar webhook

#### Configuración Avanzada
- Límite de usuarios simultáneos
- Límite de tiempo en flujo (días)
- Permitir reentrada (toggle)

### 10. **Historial de Ejecuciones** 📜

Lista de clientes en flujos:
- Avatar con inicial del nombre
- Nombre del cliente
- Fecha/hora de entrada
- Paso actual
- Próxima acción programada
- Estado (En Progreso/Completado/Salió)
- Progress bar de completitud
- Ver journey individual (modal)

### 11. **Optimización con IA** 🤖

#### Sugerencias Automáticas
- 💡 Agregar delay optimizado
- 📧 Mejores subjects de email
- 📉 Detectar nodos con alto drop-off
- 🔀 Sugerencias de A/B testing

**Para cada sugerencia:**
- Tipo de optimización (icono)
- Descripción detallada
- Impacto estimado (porcentaje)
- Nivel de confianza (%)
- Botón "Aplicar" (hover)

#### Auto-Optimize Toggle
- Activar/desactivar optimización automática
- Switch animado

## 📂 Estructura de Archivos

```
flujos-retencion/
├── FlujosRetencionPage.tsx          # Página principal
├── types.ts                          # Tipos y interfaces TypeScript
├── mockData.ts                       # Datos de ejemplo (12 flujos, 5 templates)
├── README.md                         # Esta documentación
└── components/
    ├── index.ts                      # Barrel export
    ├── FlowBuilder.tsx               # Constructor visual drag & drop
    ├── FlowAnalytics.tsx             # Analytics y métricas detalladas
    ├── FlowTesting.tsx               # Sistema de testing y validación
    └── SegmentationRules.tsx         # Segmentación y reglas de entrada/salida
```

## 🎨 Estilos y Diseño

### Paleta de Colores
- **Principal**: Green → Emerald → Teal (gradiente hero)
- **Estadísticas**:
  - Flujos Activos: Green → Emerald
  - Clientes: Blue → Cyan
  - Retención: Purple → Pink
  - Conversiones: Orange → Red

### Efectos Visuales
- ✨ Glassmorphism: `bg-white/80 backdrop-blur-xl`
- 🌟 Shimmer effect en hover
- 💫 Animaciones con Framer Motion
- 🎭 Border radius: `rounded-3xl` para cards principales
- 📊 Progress bars animadas
- 🔮 Blur orbs decorativos

### Componentes Clave
- Cards con glassmorphism
- Gradientes de 3 colores
- Patrones de dots/grid sutiles
- Badges con `rounded-full`
- Botones con hover shadow
- Inputs con focus ring

## 🚀 Funcionalidades Interactivas

1. **Modals Full-Screen**
   - Constructor de flujos
   - Analytics detallados
   - Sistema de testing
   - Segmentación y reglas

2. **Drag & Drop**
   - Nodos arrastrables en canvas
   - Posicionamiento libre
   - Conexiones automáticas

3. **Animaciones**
   - Entrada de elementos (stagger)
   - Hover effects (scale, lift)
   - Progress bars animadas
   - Pulse en elementos activos

4. **Responsive Design**
   - Grid adaptativo (1/2/3 columnas)
   - Mobile-first approach
   - Breakpoints: sm, md, lg

## 📊 Datos Mockeados

- **12 Flujos** de ejemplo con métricas realistas
- **5 Templates** predefinidos con nodos configurados
- **5 Ejecuciones** en historial
- **Analytics** completos con funnel de conversión
- **7 Segmentos** para filtrado
- **4 Optimizaciones** de IA

## 🔧 Uso

### Crear Nuevo Flujo
1. Click en "Ver Templates" o "Crear Nuevo Flujo"
2. Seleccionar template o empezar desde cero
3. Arrastrar nodos desde panel izquierdo
4. Configurar cada nodo en panel derecho
5. Conectar nodos
6. Guardar flujo

### Ver Analytics
1. Click en "Ver Métricas" en card de flujo
2. Revisar funnel de conversión
3. Analizar métricas de email
4. Identificar puntos de mejora

### Ejecutar Test
1. Click en icono de test (🧪)
2. Ingresar email de prueba
3. Click "Ejecutar Test"
4. Ver timeline de ejecución
5. Verificar validaciones

### Configurar Segmentación
1. Click en botón "Segmentación"
2. Seleccionar segmentos a incluir
3. Seleccionar segmentos a excluir
4. Definir reglas de salida
5. Configurar opciones avanzadas
6. Guardar configuración

## 🎯 Mejores Prácticas

1. **Diseño de Flujos**
   - Empezar con templates
   - Mantener flujos simples (3-7 pasos)
   - Usar condicionales para personalización
   - Testear antes de activar

2. **Optimización**
   - Revisar analytics regularmente
   - Aplicar sugerencias de IA
   - Hacer A/B testing
   - Iterar basado en datos

3. **Segmentación**
   - Definir audiencia clara
   - Excluir segmentos irrelevantes
   - Establecer reglas de salida
   - Limitar usuarios simultáneos si es necesario

## 🔄 Flujo de Trabajo Recomendado

1. 📋 Seleccionar template adecuado
2. 🎨 Personalizar en constructor visual
3. 🎯 Configurar segmentación
4. 🧪 Ejecutar test
5. 📊 Revisar analytics simulados
6. ✅ Activar flujo
7. 📈 Monitorear y optimizar

---

**Versión**: 1.0
**Última actualización**: Diciembre 2024
**Estado**: ✅ Completo
