Principios de diseño y UX

Velocidad ante todo: autosave con Live Sync (los cambios del coach se propagan a la app del cliente), atajos, drag & drop, edición inline de raciones.

Claridad nutricional: totales en tiempo real (comida/día/semana) y semáforos (±5% verde, ±10% ámbar, >±10% rojo).

Ediciones mínimas con gran impacto: pincel de macros, sustituciones inteligentes y ajustes masivos con previsualización antes/después.

Seguridad y coherencia: bloqueos por alérgenos, presupuesto y cadena de frío; fixes con explicación.

Solo rol coach: el editor no expone vista de cliente ni edición de recetas/alimentos (solo lectura). El cliente las ve en su propia app.

Consistencia visual y foco: densidad pro (desktop) con estados y mensajes claros.

Arquitectura de información

Header: Cliente (avatar + chips de restricciones), rango de fechas, acciones (Undo/Redo, Duplicar semana, Modo Batch), estado de guardado con Live Sync.

Panel izquierdo – Catálogo: buscador semántico + filtros (tiempo, coste, equipo, preferencias, alérgenos, sabor, textura, saciedad). Tabs: Recetas | Alimentos | Plantillas | Bloques.

Lienzo central – Semana/Calendario: grid Días × Comidas con tarjetas de receta, drag & drop, pincel de macros, linter, sobras y batch.

Panel derecho – Detalles: totales (comida/día/semana), objetivos, fixes 1-clic, sustituciones, coste/tiempo, contexto (clima/ciclo/entreno si integra), notas del coach, indicador Live Sync.

Nota: desde este editor no se editan recetas ni alimentos. Solo consulta + acciones permitidas (sustituir receta, cambiar raciones, mover, batch).

Layout global y navegación
┌────────────────────────────────────────────────────────────────────┐
│ Header (Cliente • Rango • Undo/Redo • Duplicar semana • Batch • ✓) │
├───────────────┬──────────────────────────────────────┬─────────────┤
│ Catálogo      │ Lienzo Semana/Calendario             │ Detalles    │
│ (Tabs+Search) │ Drag&Drop • Pincel • Linter • Sobras │ Totales+Fix │
└───────────────┴──────────────────────────────────────┴─────────────┘


Navegación primaria: tabs del Catálogo y selector de semana.

Navegación contextual: menús (…) en tarjetas/slots; modales (Sustituir, Macro Brush, Batch).

Feedback: toasts (autosave/undo), badges del linter, barras de coste/tiempo, estado “Visible en la app del cliente”.

Vistas principales
6.1 Editor Semana/Calendario

Objetivo: componer/ajustar la dieta por días y comidas con el mínimo de clicks.

Grid Días × Comidas: Desayuno, Media mañana, Comida, Merienda, Cena, Snacks.

Tarjeta de receta (en slot): raciones (stepper), kcal y P/C/F instantáneos, iconos de alérgenos, tiempo y coste, acceso a Plan B.

Drag & Drop: desde Catálogo o entre comidas; duplicar con Alt/Option + arrastre.

Edición inline de raciones: ↑/↓ o input; recalcula totales en <200 ms.

Pincel de macros (tecla B): sliders (P, C, F, kcal o %), tolerancia ±5/10%; aplica a día/semana/selección; preview antes/después (máx. 3 cambios/día).

Linter nutricional: fibra baja, sodio alto, monotonía (sabor/textura), presupuesto, tiempo, alérgenos, cadena de frío. Cada alerta ofrece Fix 1-clic (ajustes permitidos sin editar recetas).

Sobras y batch: indicador de raciones disponibles; sugerencias para reubicar dentro de 48–72 h (seguridad fría).

Plan B: 2–3 alternativas isocalóricas/coste similar, respetando preferencias del cliente.

Sin vista de cliente: solo coach; los cambios viajan a la app del cliente por Live Sync.

6.2 Editor de Recetas (solo lectura)

Objetivo: consultar detalles para decidir swaps y raciones.

Contenido: ingredientes (conversión crudo⇄cocido/rendimiento), macros/micros, alérgenos, perfil sabor/textura, equipo, tiempo, coste, saciedad.

Acciones permitidas desde dieta:

Sustituir por equivalente (isocalórica, por intención —crujiente/salado— o por presupuesto).

Cambiar raciones en el slot actual.

Mover a otro slot (día/comida).

Añadir a Batch.

Acciones NO permitidas: editar ingredientes, pasos o macros base (la edición existe en otro módulo fuera de este editor).

6.3 Planificador Batch Cooking

Objetivo: planificar sesiones de cocinado y repartir raciones eficientemente.

Sesiones: fecha/hora, duración, equipo disponible (horno, micro, airfryer).

Asignación: arrastra recetas batch-friendly y define nº de raciones a producir.

Distribución: propuesta automática por semana respetando cadena de frío y preferencias de consumo.

Lista de la compra por pasillos: consolida cantidades, agrupa por supermercado (configurable), propone marcas equivalentes.

Señales: badges “requiere frío”, “congelable”, “alto rendimiento”.

Componentes UI: catálogo completo

HeaderBar
Props: cliente, rango, onUndo, onRedo, onDuplicateWeek, onBatchToggle, liveSyncState.

SearchBar (con chips/filtros): tiempo, coste, equipo, preferencias, alérgenos, sabor, textura, saciedad.
Eventos: onQueryChange, onFilterChange, onSelect.

TabsCatálogo: Recetas | Alimentos | Plantillas | Bloques.

CardReceta (read-only): título, imagen, kcal, P/C/F, fibra, tiempo, coste, alérgenos, saciedad, badges (batch-friendly).
Menú (…): Añadir al slot, Sustituir en slot activo, Marcar flex, Añadir a batch, Ver receta.

CardAlimento (read-only): macros/100, micros clave, alérgenos, coste (informativa).

CardPlantilla: sliders paramétricos (kcal, % macros, presupuesto, tiempo) + preview → Generar semana.

CardBloque: conjuntos reutilizables (p. ej., “desayuno proteico express”) con CTA Insertar.

GridSemana: contenedor con virtualización; soporta DnD, multi-selección y estados de linter por slot.

SlotComida: header con totales locales; acciones: Añadir receta, Editar raciones, Plan B, Fix del linter.

TotalesPanel: totales por comida/día/semana (kcal, P/C/F, fibra, azúcar, sal, micros clave) + barras de presupuesto/tiempo.

LinterPanel y LinterBadge: severidad (info/warn/blocker) + CTA Arreglar (sin editar receta).

MacroBrushOverlay: sliders, ámbito (día/semana/selección), tolerancia, lista de cambios propuesta y confirmación.

BatchCookingPlanner: sesiones (fecha/duración/equipo), asignación de recetas/raciones, reglas de cadena de frío, export CSV/impresión.

NotasCoach: rich text con @menciones y adjuntos por día/comida.

Toast/Notify: autosave, live-sync, undo/redo, errores de bloqueo (alérgenos/presupuesto/frío).

Patrones y comportamientos

Autosave + Live Sync: debounce ~800 ms; UI optimista; si error (409/422) → rollback del cambio puntual con explicación. Estado visible: “Guardado • Visible en la app del cliente”.

Deshacer/Rehacer local: historial por sesión (no hay versiones históricas ni publicación). Snackbars con Deshacer tras cambios masivos.

Edición masiva: multi-selección (Shift+click / lazo) para raciones, mover slots, marcar “flex”, aplicar pincel a subconjuntos.

Pincel de macros: regla de mínimo cambio (≤3 ajustes/día), preserva restricciones (alérgenos, preferencias, presupuesto, tiempo). Siempre muestra antes/después.

Linter con fixes 1-clic: prioriza swaps/reajustes de menor impacto proteico y sin romper presupuesto/tiempo; bloquea si riesgo (alérgeno/cadena de frío) y propone alternativa segura.

Plan B contextual: alternativas equivalentes por macros/coste e “intención” (crujiente/salado/refrescante).

Batch cooking seguro: distribuye raciones dentro de ventana segura (48–72 h), etiqueta congelables y alerta si se excede.

Accesibilidad y rendimiento: navegación por teclado completa, ARIA-live para totales; listas virtualizadas, memo de totales y workers; feedback <200 ms en raciones/drag.