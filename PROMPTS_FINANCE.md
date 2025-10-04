# 🎨 PROMPTS DE REDISEÑO - MÓDULOS FINANCE

---

## 📋 PROMPT 1: Gastos - Gestión Completa

Transforma completamente el módulo de Gastos (src/features/finance/finance/gastos) aplicando el sistema de diseño moderno.

**IMPORTANTE**:
- Revisa y sigue ESTRICTAMENTE la guía de estilos en `GUIA_ESTILOS_UI.md`
- Crea un sistema de gestión de gastos completo y funcional
- Incluye categorización inteligente, búsqueda avanzada y reportes visuales

### Requisitos de Diseño:

1. **HERO SECTION - Panel de Gastos**
   - Gradiente `from-emerald-600 via-teal-600 to-cyan-600`
   - Background con blur orbs animados
   - Grid pattern sutil
   - Título "Gestión de Gastos"
   - Selector de período (dropdown elegante): Hoy, Semana, Mes, Trimestre, Año, Personalizado
   - Fecha actual y última actualización
   - Botones de acción: Nuevo Gasto, Importar Gastos, Configurar Presupuestos

2. **KPIs PRINCIPALES** (4-6 cards)
   - Grid 2-3 columnas con `bg-white border-gray-200 rounded-lg`
   - Cards con:
     * Gastos Totales del Período (con gráfico mini sparkline)
     * Gastos Fijos Recurrentes
     * Gastos Variables
     * Ahorro vs Presupuesto (circular progress)
     * Proveedor Top (más gastado)
     * Categoría Top
   - Cada card con:
     * Icono en bg-{color}-50 rounded-lg
     * Valor grande y destacado
     * Cambio % con flecha (verde/rojo)
     * Mini gráfico de tendencia

3. **SISTEMA DE CATEGORIZACIÓN**
   - Pills/badges horizontales para filtrar por categoría:
     * Todas
     * Nómina/Salarios (Users - red)
     * Alquiler/Local (Building - orange)
     * Suministros (Zap - green)
     * Marketing (Megaphone - purple)
     * Software/Tecnología (Laptop - blue)
     * Equipamiento (Package - pink)
     * Impuestos (Receipt - indigo)
     * Seguros (Shield - teal)
     * Mantenimiento (Wrench - orange)
     * Otros (MoreHorizontal - gray)
   - Cada pill con:
     * Icono + texto
     * Contador de gastos
     * Border que se ilumina al seleccionar
     * Gradiente sutil en hover

4. **TABLA/VISTA DE GASTOS**
   - Toggle entre vista Tabla y Cards
   - Glassmorphism container: `bg-white/80 backdrop-blur-xl rounded-3xl`

   **Vista Tabla:**
   - Columnas: Fecha, Concepto/Descripción, Categoría, Proveedor, Método Pago, Monto, Estado, Acciones
   - Checkbox para selección múltiple
   - Sorting por columna
   - Row con hover effect
   - Estados con badges coloridos:
     * Pagado (verde)
     * Pendiente (amarillo)
     * Vencido (rojo)
     * Aprobado (azul)
   - Iconos indicadores:
     * Tiene factura (FileText verde)
     * Es recurrente (RefreshCw azul)
     * Nota adjunta (MessageSquare)
   - Expandible para ver detalles adicionales

   **Vista Cards:**
   - Grid 3-4 columnas en desktop
   - Cards con:
     * Categoría badge arriba
     * Icono de categoría grande
     * Concepto en bold
     * Proveedor y fecha
     * Monto destacado
     * Estado badge
     * Botones de acción al hover

5. **FILTROS Y BÚSQUEDA AVANZADA**
   - Barra de búsqueda destacada con icono
   - Búsqueda en tiempo real (concepto, proveedor, referencia)
   - Panel de filtros colapsable con:
     * Categoría (multi-select)
     * Proveedor (dropdown con búsqueda)
     * Método de Pago (pills)
     * Estado (pills)
     * Rango de Fechas (date picker)
     * Rango de Montos (slider doble)
     * Solo Recurrentes (toggle)
     * Solo con Factura (toggle)
   - Botón "Limpiar Filtros"
   - Contador: "X gastos encontrados"

6. **GESTIÓN DE PRESUPUESTOS**
   - Modal/Panel lateral para configurar presupuestos
   - Por cada categoría:
     * Nombre de categoría con icono
     * Input de presupuesto mensual
     * Gasto actual del mes
     * Progress bar visual con colores:
       - Verde: < 70% usado
       - Amarillo: 70-90% usado
       - Naranja: 90-100% usado
       - Rojo: > 100% excedido
     * Porcentaje usado
     * Monto restante o excedido
   - Gráfico de dona para distribución visual
   - Alertas automáticas cuando se excede

7. **ANÁLISIS Y GRÁFICOS**
   - Sección con tabs:
     * Tendencias (Line chart de 6-12 meses)
     * Por Categoría (Pie/Donut chart)
     * Gastos Fijos vs Variables (Bar chart comparativo)
     * Por Proveedor (Top 10 horizontal bars)
   - Usar Recharts con styling custom
   - Tooltips informativos
   - Leyenda interactiva (click para ocultar serie)
   - Botón export a imagen/PDF

8. **GESTIÓN DE GASTOS RECURRENTES**
   - Sección especial para gastos automáticos
   - Lista/Cards de gastos recurrentes con:
     * Icono de categoría
     * Concepto y proveedor
     * Monto fijo
     * Frecuencia (Semanal, Mensual, Trimestral, Anual)
     * Próxima fecha de cargo
     * Toggle activo/pausado
     * Botones: Editar, Eliminar, Ver historial
   - Calendario visual con próximos cargos
   - Suma total de recurrentes mensuales

9. **GESTIÓN DE PROVEEDORES**
   - Modal/Página de proveedores
   - Lista de proveedores ordenada por gasto total
   - Por cada proveedor:
     * Nombre y contacto
     * Categoría principal
     * Total gastado (período)
     * Número de transacciones
     * Última transacción
     * Gráfico mini de tendencia
     * Botones: Ver gastos, Editar, Contactar

10. **FORMULARIO DE NUEVO GASTO**
    - Modal elegante con glassmorphism
    - Campos:
      * Fecha (date picker)
      * Concepto (input con autocomplete)
      * Descripción (textarea)
      * Categoría (dropdown con iconos)
      * Subcategoría (opcional)
      * Proveedor (dropdown con búsqueda o crear nuevo)
      * Monto (input numérico grande)
      * Método de Pago (select: Transferencia, Tarjeta, Efectivo, Domiciliación)
      * Estado (select)
      * Referencia/Nº factura (opcional)
      * Notas (textarea)
      * ¿Es recurrente? (toggle)
        - Si sí: Frecuencia y próxima fecha
      * ¿Tiene factura? (toggle)
        - Si sí: Upload de archivo con drag & drop
    - Validación en tiempo real
    - Botones: Cancelar, Guardar como Borrador, Guardar y Crear Otro, Guardar

11. **IMPORTACIÓN DE GASTOS**
    - Modal de importación
    - Opciones:
      * Subir CSV/Excel
      * Conectar con banco (simulado)
      * Importar desde contabilidad
    - Drag & drop zone elegante
    - Preview de datos
    - Mapeo de campos
    - Validación de duplicados
    - Progress bar de importación

12. **ALERTAS Y NOTIFICACIONES**
    - Card destacada con alertas:
      * Presupuestos excedidos
      * Gastos pendientes de aprobar
      * Facturas sin adjuntar
      * Gastos recurrentes próximos
      * Proveedores con aumento de gasto
    - Prioridad por color
    - Acciones rápidas inline

13. **ACCIONES MASIVAS**
    - Cuando hay items seleccionados, mostrar barra flotante:
      * X gastos seleccionados
      * Aprobar todos
      * Marcar como pagados
      * Cambiar categoría
      * Exportar selección
      * Eliminar
    - Animación de entrada desde abajo

14. **EXPORT Y REPORTES**
    - Botón "Generar Reporte" destacado
    - Modal de configuración:
      * Tipo de reporte (Completo, Por Categoría, Por Proveedor, Comparativo)
      * Período
      * Formato (PDF, Excel, CSV)
      * Incluir gráficos (toggle)
      * Incluir facturas adjuntas (toggle)
    - Preview del reporte
    - Botón download

15. **PAGINACIÓN Y ORDENAMIENTO**
    - Paginación elegante en la parte inferior
    - Selector de items por página: 10, 25, 50, 100
    - Indicador: "Mostrando X-Y de Z gastos"
    - Botones: Primera, Anterior, Números, Siguiente, Última

16. **DATOS MOCKEADOS** (Realistas y Variados)
    - 50-80 gastos distribuidos en los últimos 6 meses
    - Todas las categorías representadas
    - 10-15 proveedores diferentes
    - Estados variados (70% pagados, 20% pendientes, 10% otros)
    - 30% con facturas adjuntas
    - 20% recurrentes
    - Montos realistas por categoría
    - Tendencias coherentes (crecimiento, estacionalidad)

**ESTILOS CLAVE A USAR**:
- Hero: gradiente emerald-teal-cyan
- Cards: `bg-white border-gray-200 rounded-lg p-6`
- Glassmorphism: `bg-white/80 backdrop-blur-xl rounded-3xl`
- Tabla: hover effects, zebra striping sutil
- Badges categorías con colores asignados
- Progress bars con gradientes
- Gráficos con colores corporativos

**FUNCIONALIDAD CLAVE**:
- Búsqueda instantánea
- Filtrado múltiple sin recargar
- CRUD completo de gastos
- Gestión de presupuestos
- Importación de datos
- Export personalizado
- Responsive completo

**NO CREAR NUEVOS ARCHIVOS** - Solo editar archivos existentes en la carpeta.

---

## 📋 PROMPT 2: Exportar Contabilidad

Transforma completamente el módulo de Exportar Contabilidad (src/features/finance/finance/exportar-contabilidad) aplicando el sistema de diseño moderno.

**IMPORTANTE**:
- Revisa y sigue ESTRICTAMENTE la guía de estilos en `GUIA_ESTILOS_UI.md`
- Crea un sistema de exportación flexible y potente
- Incluye múltiples formatos y personalización avanzada

### Requisitos de Diseño:

1. **HERO SECTION - Centro de Exportación**
   - Gradiente `from-violet-600 via-purple-600 to-fuchsia-600`
   - Background con dots pattern
   - Título "Exportar a Contabilidad"
   - Descripción: "Exporta tus datos financieros a tu software contable favorito"
   - Iconos de formatos soportados en pills
   - Última exportación realizada (timestamp)

2. **ESTADÍSTICAS RÁPIDAS** (4 cards)
   - Exportaciones Este Mes
   - Total Registros Exportables
   - Última Sincronización
   - Software Conectado
   - Cada card con icono gradiente y animación de entrada

3. **SELECTOR DE SOFTWARE CONTABLE**
   - Cards grandes seleccionables (2-3 columnas):
     * Excel/CSV (genérico)
     * ContaPlus
     * A3 Contable
     * Sage
     * QuickBooks
     * Xero
     * Holded
     * Otro (personalizado)
   - Cada card con:
     * Logo del software (o icono placeholder)
     * Nombre
     * Descripción breve
     * Badge "Recomendado" si aplica
     * Badge "Conectado" si ya configurado
     * Estado de compatibilidad (100% compatible)
     * Border que se ilumina al seleccionar
   - Card seleccionada con gradiente y check

4. **CONFIGURACIÓN DE EXPORTACIÓN**
   - Sección glassmorphism con tabs:

     **Tab 1: Datos a Exportar**
     - Checkboxes con styling custom:
       * Facturas Emitidas
       * Facturas Recibidas
       * Gastos
       * Ingresos
       * IVA (Repercutido/Soportado)
       * IRPF Retenciones
       * Bancos y Tesorería
       * Clientes
       * Proveedores
       * Productos/Servicios
       * Asientos Contables
     - Contador de registros por tipo
     - Toggle "Seleccionar todo"

     **Tab 2: Período**
     - Selector visual de período:
       * Pills predefinidos: Este mes, Último trimestre, Este año, Año anterior
       * Date range picker personalizado
       * Año fiscal vs Año natural (toggle)
     - Preview de fechas seleccionadas
     - Contador de registros en período

     **Tab 3: Formato**
     - Opciones según software seleccionado:
       * Tipo de archivo (CSV, Excel, XML, TXT, etc.)
       * Separador (coma, punto y coma, tabulador)
       * Codificación (UTF-8, ISO-8859-1, etc.)
       * Decimales (punto o coma)
       * Incluir cabeceras (toggle)
       * Agrupar por... (dropdown)
       * Ordenar por... (dropdown)
     - Preview de estructura de archivo

     **Tab 4: Opciones Avanzadas**
     - Mapeo de cuentas contables:
       * Tabla: Tipo de Operación | Cuenta Contable
       * Input para cada tipo
       * Botón "Usar plantilla"
       * Botón "Guardar como plantilla"
     - Opciones adicionales:
       * Incluir documentos adjuntos (ZIP)
       * Generar informe resumen
       * Dividir en múltiples archivos (por mes/tipo)
       * Incluir metadatos

5. **PREVIEW DE EXPORTACIÓN**
   - Card grande con glassmorphism
   - Título "Vista Previa"
   - Tabla con primeras 10-15 filas
   - Columnas dinámicas según configuración
   - Scroll horizontal si muchas columnas
   - Resumen al pie:
     * Total de filas
     * Tamaño estimado del archivo
     * Tipos de datos incluidos
   - Botón "Actualizar Preview"

6. **VALIDACIONES Y AVISOS**
   - Card de alertas antes de exportar:
     * Advertencias (ej: "Hay 5 facturas sin número")
     * Errores (ej: "Faltan cuentas contables mapeadas")
     * Información (ej: "Se exportarán 234 registros")
   - Iconos por severidad
   - Opción "Exportar de todos modos" o "Corregir ahora"

7. **PROCESO DE EXPORTACIÓN**
   - Botón grande "Exportar Ahora" con gradiente
   - Al click, modal de progreso:
     * Progress bar circular animado
     * "Preparando datos..." → "Generando archivo..." → "Comprimiendo..." → "¡Listo!"
     * Estadísticas en tiempo real:
       - Registros procesados: X de Y
       - Tiempo transcurrido
       - Archivos generados
     * Animación de éxito al completar

8. **RESULTADO DE EXPORTACIÓN**
   - Modal de éxito con:
     * Icono de checkmark animado
     * "Exportación Completada"
     * Resumen:
       - Total de registros exportados
       - Archivos generados (lista con tamaños)
       - Período exportado
       - Software destino
     * Botones:
       - Descargar Archivo(s) (principal)
       - Ver Informe Detallado
       - Enviar por Email
       - Exportar Nuevamente
     * Opción "Guardar esta configuración" (nombre + guardar)

9. **PLANTILLAS GUARDADAS**
   - Sección "Tus Plantillas de Exportación"
   - Cards de plantillas guardadas:
     * Nombre de la plantilla
     * Software contable
     * Datos incluidos (pills)
     * Última vez usada
     * Botones:
       - Usar Plantilla
       - Editar
       - Duplicar
       - Eliminar
   - Botón "Nueva Plantilla"
   - Plantilla por defecto marcada con estrella

10. **HISTORIAL DE EXPORTACIONES**
    - Sección "Exportaciones Recientes"
    - Tabla con:
      * Fecha y hora
      * Software destino
      * Período exportado
      * Registros exportados
      * Formato
      * Usuario que exportó
      * Estado (Completada/Error)
      * Tamaño del archivo
      * Acciones:
        - Ver detalles
        - Descargar nuevamente
        - Repetir exportación
    - Filtros: Por software, Por fecha, Por estado
    - Paginación

11. **SINCRONIZACIÓN AUTOMÁTICA**
    - Card especial si software soporta API:
      * "Conectar con [Software]"
      * Descripción de sincronización automática
      * Botón "Configurar Conexión"
      * Modal de OAuth/API Key
      * Estado de conexión (conectado/desconectado)
      * Última sincronización
      * Configurar frecuencia:
        - Manual
        - Cada hora
        - Diaria
        - Semanal
      * Toggle activar/desactivar
      * Log de sincronizaciones

12. **AYUDA Y DOCUMENTACIÓN**
    - Sección colapsable "¿Cómo funciona?"
    - Pasos visuales con iconos:
      1. Selecciona tu software contable
      2. Elige qué datos exportar
      3. Configura el formato
      4. Descarga o sincroniza
    - FAQs inline
    - Link a documentación detallada por software
    - Video tutorial (thumbnail con play)

13. **VALIDACIÓN Y CORRECCIÓN**
    - Si hay errores, modal de "Revisar Datos":
      * Lista de problemas detectados
      * Por cada problema:
        - Descripción
        - Registro afectado
        - Sugerencia de corrección
        - Botón "Corregir Ahora" (abre registro)
        - Botón "Omitir"
      * Opción "Corregir todos automáticamente" (si posible)
      * Opción "Exportar sin estos registros"

14. **DATOS MOCKEADOS**
    - Historial de 10-15 exportaciones previas variadas
    - 3-5 plantillas guardadas con nombres descriptivos
    - Preview con datos realistas (facturas, gastos, etc.)
    - Warnings y errores simulados
    - Soporte para 5-8 softwares contables
    - Tamaños de archivo realistas

**ESTILOS CLAVE A USAR**:
- Hero: gradiente violet-purple-fuchsia
- Cards software: `rounded-3xl shadow-lg` con hover effects
- Preview tabla: glassmorphism con scroll horizontal
- Progress: circular con colores gradientes
- Plantillas: cards con badges coloridos
- Validaciones: alertas con iconos y colores según severidad

**FUNCIONALIDAD CLAVE**:
- Selector de software intuitivo
- Configuración completa y flexible
- Preview antes de exportar
- Validación de datos
- Plantillas reutilizables
- Historial completo
- Sincronización automática (si aplica)
- Export multi-formato

**NO CREAR NUEVOS ARCHIVOS** - Solo editar archivos existentes en la carpeta.

---

## 📋 PROMPT 3: Productos y Servicios

Transforma completamente el módulo de Productos y Servicios (src/features/finance/finance/productos-servicios) aplicando el sistema de diseño moderno.

**IMPORTANTE**:
- Revisa y sigue ESTRICTAMENTE la guía de estilos en `GUIA_ESTILOS_UI.md`
- Catálogo de productos/servicios atractivo y funcional
- Gestión completa de inventario y precios

### Requisitos de Diseño:

1. **HERO SECTION - Catálogo**
   - Gradiente `from-blue-600 via-indigo-600 to-purple-600`
   - Background con blur orbs
   - Título "Productos y Servicios"
   - Descripción: "Gestiona tu catálogo de productos y servicios"
   - Barra de búsqueda grande destacada
   - Pills con métricas:
     * Total de items
     * Activos
     * Agotados
     * Valor total inventario

2. **ESTADÍSTICAS** (4 cards animados)
   - Total Productos/Servicios
   - Valor Total del Inventario
   - Items con Stock Bajo (alerta)
   - Más Vendido del Mes
   - Cada card con icono, valor grande, y mini gráfico sparkline

3. **FILTROS Y VISTA**
   - Toggle entre vista Grid (cards) y List (tabla)
   - Filtros en sidebar colapsable:
     * Tipo (pills):
       - Todos
       - Productos
       - Servicios
       - Packs/Combos
     * Categoría (multi-select dropdown):
       - Membresías
       - Sesiones de entrenamiento
       - Planes nutricionales
       - Productos físicos (proteína, ropa, accesorios)
       - Consultoría
       - Otros
     * Estado (pills):
       - Todos
       - Activos
       - Pausados
       - Agotados
     * Precio (slider de rango)
     * Con stock (toggle)
     * Destacados (toggle)
   - Ordenar por: Nombre, Precio, Stock, Más vendido, Fecha creación
   - Botón "Limpiar filtros"

4. **VISTA GRID (Cards)**
   - Grid 3-4 columnas responsive
   - Cards con glassmorphism:
     * Imagen del producto/servicio (placeholder con gradiente si no hay)
     * Badge de categoría en esquina
     * Badge "Agotado" si stock = 0
     * Badge "Destacado" con estrella
     * Nombre del producto
     * Descripción corta (truncada)
     * Precio grande y destacado
     * Precio con descuento tachado (si aplica)
     * Pills con info:
       - Stock disponible (con color según cantidad)
       - Duración (si es servicio)
       - Sesiones incluidas
     * Botones de acción al hover:
       - Ver detalles (ojo)
       - Editar (lápiz)
       - Duplicar (copiar)
       - Activar/Pausar (toggle)
   - Hover effect: lift + shadow

5. **VISTA LISTA (Tabla)**
   - Tabla elegante con:
     * Checkbox para selección múltiple
     * Imagen thumbnail
     * Nombre y descripción
     * Categoría (badge)
     * Tipo (badge)
     * Precio
     * Stock (con color según nivel)
     * Estado (badge)
     * Ventas del mes
     * Acciones (botones)
   - Sorting por columna
   - Row hover effect
   - Expandible para ver detalles adicionales

6. **MODAL DE DETALLES**
   - Modal amplio con tabs:

     **Tab Info General:**
     - Imagen grande (slider si hay múltiples)
     - Nombre
     - Descripción completa
     - Categoría y tipo
     - SKU/Código
     - Estado (activo/pausado)
     - Destacado (toggle con estrella)
     - Tags (pills editables)

     **Tab Precios:**
     - Precio base (grande)
     - Precio con descuento (opcional)
     - Descuento % o cantidad fija
     - Fecha inicio/fin descuento
     - Impuestos aplicables (IVA %)
     - Precio final calculado
     - Historial de cambios de precio (timeline)

     **Tab Inventario** (solo productos):
     - Stock actual (input)
     - Stock mínimo (alerta)
     - Ubicación en almacén
     - Proveedor
     - Costo de adquisición
     - Margen de beneficio calculado
     - Historial de movimientos (entradas/salidas)

     **Tab Servicios** (solo servicios):
     - Duración (input con selector: minutos, horas, días)
     - Número de sesiones
     - Válido por (días desde compra)
     - Entrenadores/Staff asignados
     - Disponibilidad (días y horarios)

     **Tab Estadísticas:**
     - Total vendido (cantidad y €)
     - Gráfico de ventas (últimos 6 meses)
     - Calificación promedio (estrellas)
     - Reviews/Comentarios
     - Clientes que compraron
     - Productos relacionados más comprados

7. **FORMULARIO CREAR/EDITAR**
   - Modal wizard o página completa
   - Pasos:

     **Paso 1: Información Básica**
     - Upload de imagen (drag & drop, múltiples)
     - Nombre (input con contador de caracteres)
     - Descripción corta (textarea, max 200 chars)
     - Descripción completa (textarea con markdown)
     - Tipo: Producto / Servicio / Pack (radio buttons grandes)
     - Categoría (dropdown)
     - Tags (input con autocomplete, crear nuevos)

     **Paso 2: Precios e Impuestos**
     - Precio base (input numérico grande)
     - Moneda (selector)
     - IVA aplicable (dropdown: 0%, 4%, 10%, 21%)
     - Precio final calculado (read-only, destacado)
     - ¿Tiene descuento? (toggle)
       - Si sí: % o cantidad fija
       - Fechas de vigencia
       - Preview de precio final
     - ¿Es precio recurrente? (toggle)
       - Si sí: Frecuencia (mensual, trimestral, anual)

     **Paso 3: Inventario/Disponibilidad**
     - Si Producto:
       * Stock inicial
       * Stock mínimo
       * SKU (autogenerado o manual)
       * Ubicación
       * Proveedor
       * Costo adquisición
       * ¿Controlar stock? (toggle)
     - Si Servicio:
       * Duración
       * Sesiones incluidas
       * Válido por X días
       * Disponibilidad (calendario/horarios)
       * Staff asignado (multi-select)
       * Capacidad máxima (simultáneos)
     - Si Pack:
       * Productos/Servicios incluidos (selector múltiple)
       * Cantidad de cada uno
       * Precio total vs suma individual

     **Paso 4: Opciones Avanzadas**
     - ¿Es destacado? (toggle con estrella)
     - ¿Es visible en tienda online? (toggle)
     - ¿Requiere aprobación? (toggle)
     - Límite de compra por cliente
     - Productos relacionados (selector)
     - Orden de visualización (número)

     **Paso 5: Confirmación**
     - Preview visual del producto/servicio
     - Resumen de toda la configuración
     - Botón "Crear" / "Guardar Cambios"

8. **GESTIÓN DE CATEGORÍAS**
   - Modal de gestión
   - Lista de categorías actuales:
     * Nombre
     * Icono
     * Color
     * Número de items
     * Botones: Editar, Eliminar
   - Formulario para nueva categoría:
     * Nombre
     * Icono (selector de Lucide icons)
     * Color (color picker)
     * Descripción
     * Orden
   - Drag & drop para reordenar

9. **PACKS Y COMBOS**
   - Sección especial para crear bundles
   - Selector de productos/servicios
   - Preview del pack con:
     * Items incluidos (cards pequeños)
     * Precio individual suma
     * Precio del pack
     * Ahorro calculado (%)
     * Descripción del combo
   - Opción de precio fijo o suma con descuento

10. **ACCIONES MASIVAS**
    - Al seleccionar múltiples items:
      * Barra flotante con contador
      * Acciones:
        - Cambiar categoría
        - Aplicar descuento
        - Activar/Pausar
        - Marcar como destacados
        - Exportar selección
        - Eliminar
      * Animación de entrada

11. **GESTIÓN DE STOCK** (Productos)
    - Vista especial "Control de Stock"
    - Tabla con:
      * Producto
      * Stock actual
      * Stock mínimo
      * Estado (color según nivel):
        - Verde: > stock mínimo + 50%
        - Amarillo: cerca del mínimo
        - Rojo: bajo mínimo o agotado
      * Última entrada
      * Valor del inventario
      * Acciones: Ajustar, Entrada, Salida
    - Alertas de stock bajo
    - Historial de movimientos

12. **REPORTES Y ESTADÍSTICAS**
    - Tab de Reportes:
      * Productos más vendidos (top 10)
      * Productos menos vendidos
      * Ingresos por categoría (pie chart)
      * Evolución de ventas (line chart)
      * Margen de beneficio por producto
      * Valor del inventario total
    - Filtros por período
    - Export a PDF/Excel

13. **IMPORTACIÓN/EXPORTACIÓN**
    - Botones en header:
      * Importar (CSV/Excel)
      * Exportar Catálogo
    - Modal de importación:
      * Drag & drop de archivo
      * Preview de datos
      * Mapeo de campos
      * Validación
      * Import con progress bar
    - Modal de exportación:
      * Selección de campos
      * Formato (CSV, Excel, PDF)
      * Filtros aplicados
      * Download

14. **DATOS MOCKEADOS**
    - 30-50 productos/servicios variados:
      * 15-20 servicios (membresías, entrenamientos, nutrición)
      * 10-15 productos (suplementos, ropa, accesorios)
      * 5-8 packs/combos
    - Categorías realistas
    - Precios variados (20€ a 500€)
    - Stocks variados (algunos agotados)
    - Algunos con descuentos activos
    - Estadísticas de ventas coherentes
    - Imágenes con gradientes de placeholder

**ESTILOS CLAVE A USAR**:
- Hero: gradiente blue-indigo-purple
- Cards grid: glassmorphism con hover lift
- Imágenes: `rounded-2xl` con aspect ratio 1:1
- Badges categorías con colores
- Stock: colores según nivel (verde/amarillo/rojo)
- Modal detalles: full-screen en mobile
- Formulario: wizard con progress stepper

**FUNCIONALIDAD CLAVE**:
- CRUD completo
- Búsqueda instantánea
- Filtrado múltiple
- Gestión de stock
- Control de precios
- Packs/combos
- Importación masiva
- Estadísticas visuales

**NO CREAR NUEVOS ARCHIVOS** - Solo editar archivos existentes en la carpeta.

---

## 📋 PROMPT 4: Planes y Precios

Transforma completamente el módulo de Planes y Precios (src/features/finance/finance/planes-precios) aplicando el sistema de diseño moderno.

**IMPORTANTE**:
- Revisa y sigue ESTRICTAMENTE la guía de estilos en `GUIA_ESTILOS_UI.md`
- Pricing page atractiva y estratégica
- Comparación visual de planes

### Requisitos de Diseño:

1. **HERO SECTION - Pricing**
   - Gradiente `from-indigo-600 via-purple-600 to-pink-600`
   - Título "Planes y Precios"
   - Descripción: "Elige el plan perfecto para tu negocio"
   - Toggle Mensual/Anual (destacado):
     * "Ahorra 20% anual" en badge
     * Animación smooth entre estados
   - Contador "X clientes activos con planes"

2. **ESTADÍSTICAS** (4 cards)
   - Suscripciones Activas
   - Ingresos Recurrentes (MRR)
   - Plan Más Popular
   - Tasa de Renovación (%)
   - Cada card animado con entrada escalonada

3. **COMPARADOR DE PLANES** (Pricing Table)
   - Grid 3-4 columnas para planes
   - Plan recomendado destacado con:
     * Badge "Más Popular"
     * Border con gradiente
     * Slight elevation
     * Background con glassmorphism más intenso

   **Estructura de cada card de plan:**
   - Nombre del plan (en bold)
   - Icono representativo grande
   - Descripción breve (1-2 líneas)
   - Precio:
     * Número grande (€XX)
     * Período (/mes o /año)
     * Precio tachado si hay descuento
     * Ahorro calculado si anual
   - Lista de características (checkmarks):
     * Incluidas (checkmark verde)
     * No incluidas (X gris)
     * Ilimitadas (infinity icon)
   - Límites claros:
     * X clientes
     * X entrenamientos/mes
     * X GB almacenamiento
     * etc.
   - Botón CTA:
     * Plan actual: "Plan Actual" (disabled)
     * Otros: "Elegir Plan" / "Upgrade"
     * Gradiente si es recomendado
   - Link "Ver detalles completos"

4. **TABLA COMPARATIVA DETALLADA**
   - Botón "Comparar Todos los Planes" que expande
   - Tabla horizontal con:
     * Primera columna: Característica
     * Siguientes columnas: Cada plan
   - Categorías de características:
     * Gestión de Clientes
     * Entrenamientos y Dietas
     * Comunicación
     * Reportes y Análisis
     * Facturación
     * Integraciones
     * Soporte
     * Almacenamiento
   - Cada celda con:
     * Checkmark (incluido)
     * Número (límite)
     * Texto (descripción)
     * X (no incluido)
   - Filas con hover effect
   - Sticky header y primera columna

5. **CALCULADORA DE ROI**
   - Card especial "¿Cuánto ahorrarías?"
   - Inputs interactivos:
     * Número de clientes
     * Número de entrenamientos/mes
     * Precio promedio de tus servicios
     * Slider animado para cada input
   - Cálculo en tiempo real de:
     * Tiempo ahorrado (horas/mes)
     * Ingresos potenciales extra
     * ROI en %
     * Payback period (meses)
   - Gráfico visual (bar chart)
   - CTA "Empezar Ahora"

6. **ADD-ONS Y EXTRAS**
   - Sección "Personaliza tu Plan"
   - Cards de add-ons disponibles:
     * Clientes adicionales (+50, +100, +200)
     * Almacenamiento extra (+10GB, +50GB)
     * SMS adicionales (+500, +1000)
     * Usuarios staff extra (+1, +3, +5)
     * Dominio personalizado
     * White label
     * Soporte prioritario
   - Cada card con:
     * Icono
     * Nombre del add-on
     * Descripción breve
     * Precio adicional
     * Toggle o botón "Añadir"
   - Suma total actualizada en tiempo real

7. **FAQs SOBRE PRECIOS**
   - Accordion elegante con preguntas comunes:
     * ¿Puedo cambiar de plan?
     * ¿Qué pasa si supero los límites?
     * ¿Hay permanencia?
     * ¿Cómo se factura?
     * ¿Hay descuentos para equipos?
     * ¿Qué incluye el soporte?
     * ¿Puedo cancelar en cualquier momento?
     * ¿Hay prueba gratuita?
   - Iconos que rotan al expandir
   - Animación suave

8. **TESTIMONIOS POR PLAN**
   - Sección "Lo que dicen nuestros clientes"
   - Cards de testimonios agrupados por plan:
     * Avatar circular
     * Nombre y negocio
     * Plan que usa
     * Quote destacado
     * Rating (estrellas)
   - Slider/Carousel con flechas
   - 8-10 testimonios variados

9. **GESTIÓN DE TU PLAN ACTUAL** (Si usuario logueado)
   - Card destacada "Tu Plan Actual"
   - Información:
     * Nombre del plan con badge
     * Precio actual
     * Fecha de renovación
     * Límites usados:
       - Progress bars por recurso
       - Color según % usado (verde/amarillo/rojo)
       - "X de Y clientes usados"
     * Add-ons activos (lista)
   - Botones:
     * Upgrade a plan superior
     * Añadir add-ons
     * Cambiar a anual (si mensual)
     * Ver facturas
     * Gestionar suscripción

10. **COMPARADOR INTERACTIVO**
    - Toggle "Comparar 2-3 Planes"
    - Selección múltiple de planes
    - Vista lado a lado con:
      * Highlights de diferencias
      * Características únicas en color
      * Precio comparado
      * Ahorro calculado
      * Recomendación inteligente
    - Botón "Elegir este plan"

11. **PROCESO DE UPGRADE/CAMBIO**
    - Modal de confirmación:
      * Plan actual → Plan nuevo (visual)
      * Diferencia de precio
      * Cambios en características
      * Cálculo prorrateado
      * Nueva fecha de renovación
      * Método de pago (card guardada)
      * Checkbox "Acepto términos"
      * Botón "Confirmar Cambio"
    - Modal de éxito con confetti
    - Redirect a onboarding del nuevo plan (si aplica)

12. **HISTORIAL DE CAMBIOS DE PLAN**
    - Timeline visual:
      * Fecha del cambio
      * Plan anterior → Plan nuevo
      * Razón (upgrade, downgrade, cambio)
      * Precio en ese momento
      * Usuario que realizó el cambio
    - Últimos 12 meses

13. **ALERTAS Y NOTIFICACIONES**
    - Card de alertas:
      * Próxima a renovación (7 días antes)
      * Límite de recursos cerca (90% usado)
      * Oportunidad de ahorro (upgrade a anual)
      * Nuevo plan disponible
      * Descuento temporal
    - Acciones inline

14. **DATOS MOCKEADOS**
    - 4 planes:
      * **Básico** (€29/mes):
        - 50 clientes
        - 100 entrenamientos/mes
        - 5GB almacenamiento
        - Email soporte
      * **Profesional** (€79/mes) - MÁS POPULAR:
        - 200 clientes
        - Entrenamientos ilimitados
        - 25GB almacenamiento
        - Chat y email soporte
        - App móvil
      * **Business** (€149/mes):
        - 500 clientes
        - Todo ilimitado
        - 100GB almacenamiento
        - Soporte prioritario
        - White label
        - API access
      * **Enterprise** (Personalizado):
        - Todo ilimitado
        - Almacenamiento personalizado
        - Account manager
        - SLA garantizado
    - Precios anuales con 20% descuento
    - 10 add-ons variados
    - 10 FAQs completas
    - 8 testimonios realistas

**ESTILOS CLAVE A USAR**:
- Hero: gradiente indigo-purple-pink
- Cards planes: glassmorphism con borders sutiles
- Plan recomendado: border gradiente animado
- Toggle mensual/anual: estilo iOS moderno
- Checkmarks: verde, X: gris
- Progress bars: gradientes según % usado
- CTAs: gradientes llamativos

**FUNCIONALIDAD CLAVE**:
- Comparación visual
- Toggle mensual/anual con recalculo
- Calculadora ROI interactiva
- Add-ons configurables
- Upgrade/downgrade fluido
- Progress de límites usados
- Timeline de cambios

**NO CREAR NUEVOS ARCHIVOS** - Solo editar archivos existentes en la carpeta.

---

## 📋 PROMPT 5: Cupones y Descuentos

Transforma completamente el módulo de Cupones (src/features/finance/finance/cupones) aplicando el sistema de diseño moderno.

**IMPORTANTE**:
- Revisa y sigue ESTRICTAMENTE la guía de estilos en `GUIA_ESTILOS_UI.md`
- Sistema de cupones flexible y potente
- Gestión completa de promociones

### Requisitos de Diseño:

1. **HERO SECTION - Cupones**
   - Gradiente `from-orange-600 via-red-600 to-pink-600`
   - Background con pattern de tickets (diagonal stripes subtle)
   - Título "Cupones y Descuentos"
   - Descripción: "Crea y gestiona promociones para aumentar ventas"
   - Pills con iconos animados
   - Contador "X cupones activos"

2. **ESTADÍSTICAS** (4 cards animados)
   - Cupones Activos
   - Total Canjeados Este Mes
   - Ahorro Total Otorgado (€)
   - Tasa de Conversión (%)
   - Cada card con icono, valor, cambio % vs anterior

3. **FILTROS Y BÚSQUEDA**
   - Barra de búsqueda destacada (código o nombre)
   - Filtros en pills horizontales:
     * Estado:
       - Todos
       - Activos
       - Pausados
       - Expirados
       - Agotados
     * Tipo:
       - Todos
       - Porcentaje (%)
       - Cantidad fija (€)
       - Envío gratis
       - 2x1 / Regalo
   - Ordenar por: Uso, Fecha creación, Expiración

4. **VISTA DE CUPONES** (Grid o Lista)
   - Toggle entre vista Grid (cards) y Lista (tabla)

   **Vista Grid:**
   - Cards con estilo "ticket" (bordes serrados simulados)
   - Cada card con:
     * Badge de estado (activo/pausado/expirado)
     * Código del cupón (grande, estilo monospace)
     * Botón copiar al lado del código
     * Nombre/descripción
     * Tipo de descuento con icono:
       - Percentage (%)
       - Fixed amount (€)
       - Free shipping
       - BOGO (2x1)
     * Valor del descuento (destacado)
     * Restricciones en pills:
       - Monto mínimo
       - Productos específicos
       - Primera compra
       - Clientes específicos
     * Métricas:
       - Usado X de Y veces
       - Progress bar visual
     * Fecha de expiración (con countdown si cerca)
     * Botones de acción al hover:
       - Ver estadísticas
       - Editar
       - Duplicar
       - Pausar/Activar
       - Compartir
   - Hover effect: slight rotation + lift

   **Vista Lista (Tabla):**
   - Columnas:
     * Checkbox
     * Estado (badge)
     * Código
     * Nombre
     * Tipo (badge)
     * Descuento
     * Usado/Límite
     * Expiración
     * Acciones
   - Row hover effect
   - Sorting por columna

5. **FORMULARIO CREAR CUPÓN**
   - Modal wizard amplio con pasos:

     **Paso 1: Información Básica**
     - Nombre interno (para gestión)
     - Código del cupón:
       * Input grande con preview
       * Botón "Generar aleatorio"
       * Validación en tiempo real (único)
       * Mayúsculas automáticas
       * Preview visual del ticket
     - Descripción (para cliente)
     - Tipo de descuento (radio buttons grandes con iconos):
       * Porcentaje (%)
       * Cantidad fija (€)
       * Envío gratis
       * 2x1
       * Regalo con compra
     - Valor del descuento (input según tipo)

     **Paso 2: Restricciones**
     - ¿Tiene monto mínimo? (toggle)
       - Si sí: Input de monto
     - ¿Tiene máximo de descuento? (toggle)
       - Si sí: Input de tope
     - Aplicable a:
       * Todos los productos/servicios (default)
       * Productos específicos (multi-select)
       * Categorías específicas (multi-select)
       * Excluir productos (multi-select)
     - Aplicable a clientes:
       * Todos
       * Nuevos clientes (primera compra)
       * Clientes existentes
       * Clientes específicos (multi-select)
       * Segmento específico (dropdown)

     **Paso 3: Límites y Validez**
     - Límite de usos:
       * Ilimitado (toggle)
       * Total de usos (input)
       * Por cliente (input)
     - Período de validez:
       * Fecha inicio (date picker)
       * Fecha fin (date picker)
       * ¿Sin fecha fin? (toggle)
       * Countdown visual de días restantes
     - Horarios específicos (opcional):
       * Días de la semana (selector múltiple)
       * Horas (range picker)
     - ¿Se puede combinar con otros cupones? (toggle)

     **Paso 4: Marketing**
     - Mensaje personalizado al aplicar
     - URL de landing page (opcional)
     - Imagen del cupón (upload)
     - Tags para organización
     - ¿Destacar en web? (toggle)

     **Paso 5: Preview y Confirmación**
     - Preview visual del cupón (como ticket)
     - Resumen de todas las configuraciones
     - Test de aplicación (input de monto, muestra descuento)
     - Botón "Crear Cupón"

6. **VISTA DETALLE DE CUPÓN**
   - Modal/Página con tabs:

     **Tab Resumen:**
     - Ticket visual grande (diseño atractivo)
     - Código (con botón copiar)
     - Estado (badge grande)
     - Todas las especificaciones en cards
     - QR code generado
     - Link directo para compartir

     **Tab Estadísticas:**
     - KPIs del cupón:
       * Veces usado
       * Descuento total otorgado
       * Ingresos generados
       * Tasa de conversión
       * Ticket promedio con cupón
     - Gráfico de usos en el tiempo (line chart)
     - Top 10 clientes que lo usaron
     - Top productos comprados con este cupón
     - Distribución por día de la semana

     **Tab Historial:**
     - Timeline de usos:
       * Fecha y hora
       * Cliente que lo usó
       * Monto de la compra
       * Descuento aplicado
       * Productos comprados
       * Link a la factura
     - Filtros por fecha y cliente
     - Export de historial

     **Tab Compartir:**
     - Link directo (con auto-aplicación)
     - QR code descargable
     - Botones de compartir en:
       * Email (abre cliente)
       * WhatsApp
       * Redes sociales
     - HTML embed code
     - Preview de cómo se ve

7. **CAMPAÑAS DE CUPONES**
   - Sección "Campañas Activas"
   - Agrupar cupones relacionados:
     * Nombre de campaña
     * Fecha de la campaña
     * Objetivo (ventas, nuevos clientes, etc.)
     * Cupones incluidos (lista)
     * Métricas agregadas
   - Crear nueva campaña (agrupa múltiples cupones)

8. **PLANTILLAS DE CUPONES**
   - Sección "Plantillas Rápidas"
   - Cards de plantillas predefinidas:
     * "Black Friday" (-20%)
     * "Bienvenida" (-15% primera compra)
     * "Cumpleaños" (-10%)
     * "Recuperar Carrito" (-5%)
     * "Referido" (20€ descuento)
     * "Cliente VIP" (-25%)
   - Cada plantilla con:
     * Icono y nombre
     * Configuración pre-cargada
     * Botón "Usar Plantilla"
   - Opción de guardar propias plantillas

9. **PROGRAMACIÓN AUTOMÁTICA**
   - Sección "Cupones Automáticos"
   - Crear reglas para auto-generación:
     * Trigger:
       - Nuevo registro
       - Cumpleaños del cliente
       - X días sin comprar
       - Carrito abandonado
       - After X purchases
     * Cupón a enviar (selector)
     * Canal (email, SMS, notificación)
     * Plantilla de mensaje
   - Lista de reglas activas
   - Toggle activar/desactivar regla

10. **VALIDADOR DE CUPONES**
    - Card destacada "Validar Cupón"
    - Input para código
    - Simulador de aplicación:
      * Monto de compra
      * Productos (opcional)
      * Cliente (opcional)
    - Al validar, muestra:
      * ✓ Válido / ✗ Inválido
      * Descuento que aplicaría
      * Restricciones que aplican
      * Mensaje personalizado
    - Útil para soporte

11. **ALERTAS Y NOTIFICACIONES**
    - Card de alertas:
      * Cupones próximos a expirar (7 días)
      * Cupones casi agotados (90% usado)
      * Cupones sin uso (30 días)
      * Cupones con alta conversión (destacar)
    - Acción rápida inline

12. **REPORTES**
    - Tab "Reportes":
      * Top cupones más usados
      * Cupones con mayor ROI
      * Cupones sin uso
      * Ahorro total por período (chart)
      * Ingresos generados por cupones
      * Comparativa entre campañas
    - Filtros por período
    - Export a PDF/Excel

13. **ACCIONES MASIVAS**
    - Al seleccionar múltiples cupones:
      * Barra flotante
      * Acciones:
        - Activar/Pausar
        - Cambiar fecha expiración
        - Cambiar límite de usos
        - Duplicar
        - Eliminar
        - Exportar
      * Animación entrada

14. **DATOS MOCKEADOS**
    - 20-30 cupones variados:
      * Estados variados (activos, pausados, expirados)
      * Tipos variados (%, €, envío gratis, 2x1)
      * Restricciones diferentes
      * Uso variado (0% a 100%)
      * Fechas de expiración variadas
    - Historial de usos realista (últimos 3 meses)
    - 5-8 plantillas predefinidas
    - Estadísticas coherentes

**ESTILOS CLAVE A USAR**:
- Hero: gradiente orange-red-pink
- Cards: estilo ticket con bordes serrados (CSS clip-path)
- Códigos: monospace, grande, destacado
- Progress bars: colores según % usado
- Badges estado con colores
- Preview ticket: diseño atractivo tipo cupón físico
- QR codes generados

**FUNCIONALIDAD CLAVE**:
- CRUD completo de cupones
- Generador de códigos
- Sistema de restricciones flexible
- Estadísticas detalladas
- Compartir fácil (link, QR, social)
- Plantillas rápidas
- Validador en tiempo real
- Automatización con triggers
- Campañas agrupadas

**NO CREAR NUEVOS ARCHIVOS** - Solo editar archivos existentes en la carpeta.

---

# 📝 NOTAS GENERALES

## ⚠️ IMPORTANTE PARA TODOS:
1. **SIEMPRE** revisar `GUIA_ESTILOS_UI.md` antes de empezar
2. **NO CREAR NUEVOS ARCHIVOS** - Solo editar existentes en cada carpeta
3. Usar **TypeScript** correctamente con tipos
4. Implementar **framer-motion** para todas las animaciones
5. Usar **Lucide React** para todos los iconos
6. **Datos mockeados** realistas y variados
7. **Responsive** completo (mobile-first)
8. **Código limpio** y bien comentado
9. **Glassmorphism** en containers principales
10. **Gradientes finance-themed** en headers (emerald-teal-cyan preferido)

## Checklist de Implementación:
- [ ] Hero section con gradiente correcto
- [ ] Blur orbs animados en background
- [ ] Grid/dots pattern sutil
- [ ] Stats cards con animación entrada
- [ ] `rounded-3xl` en cards principales
- [ ] `bg-white/80 backdrop-blur-xl` para glassmorphism
- [ ] `border border-white/50` en containers
- [ ] Hover effects en elementos interactivos
- [ ] Loading states
- [ ] Empty states
- [ ] Error states
- [ ] Success feedback
- [ ] Responsive breakpoints (sm, md, lg, xl)
- [ ] Accessibility (aria-labels, keyboard navigation)

## Paleta Finance:
- **Headers**: `from-emerald-600 via-teal-600 to-cyan-600`
- **Success**: green-600, green-50
- **Warning**: yellow-600, yellow-50
- **Error**: red-600, red-50
- **Info**: blue-600, blue-50

---

**Versión:** 1.0
**Fecha:** Enero 2025
**Módulo:** Finance - Gestión Financiera
