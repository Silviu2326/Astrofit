💎 Plan Solo Max — Páginas y Descripciones
⚡ Automatizaciones
1. listado-automatizaciones

src/features/plansolomax/automatizaciones/listado-automatizaciones/ListadoAutomatizacionesPage.tsx

Tu central de flujos automáticos.

Qué tendrá: listado de todas las automatizaciones activas (ej.: bienvenida a nuevo cliente, recordatorio de pago, encuesta post-sesión).

Cómo se verá: tabla/kanban con estado (activo/pausado), tipo (email, notificación, tarea), y contador de ejecuciones.

2. crear-flujo

src/features/plansolomax/automatizaciones/crear-flujo/CrearFlujoPage.tsx

Diseñador de automatizaciones.

Qué tendrá: constructor visual tipo “arrastrar y soltar” (ej.: disparador = nuevo cliente → acción = enviar email → acción = crear tarea).

Cómo se verá: diagrama de bloques con nodos conectados, estilo “flowchart” moderno.

3. historial-flujos

src/features/plansolomax/automatizaciones/historial-flujos/HistorialFlujosPage.tsx

Registro de ejecuciones.

Qué tendrá: lista de cuándo se disparó cada flujo, resultado (éxito/error), cliente afectado.

Cómo se verá: listado con iconos de estado y filtros por fecha.

4. libreria-plantillas

src/features/plansolomax/automatizaciones/libreria-plantillas/LibreriaPlantillasPage.tsx

Colección de automatizaciones prediseñadas.

Qué tendrá: ejemplos listos como “Bienvenida”, “Recuperación de clientes inactivos”, “Cumpleaños”.

Cómo se verá: galería de tarjetas con título, descripción y botón “Usar plantilla”.

⌚ Integración con Wearables
5. dispositivos-conectados

src/features/plansolomax/wearables/dispositivos-conectados/DispositivosConectadosPage.tsx

Panel de conexión.

Qué tendrá: listado de wearables conectables (Fitbit, Garmin, Apple Watch), estado de conexión de cada cliente.

Cómo se verá: tarjetas con logo del dispositivo, botón “conectar/desconectar” y etiqueta de sincronización (última vez conectado).

6. panel-datos-wearables

src/features/plansolomax/wearables/panel-datos-wearables/PanelDatosWearablesPage.tsx

Vista de métricas importadas.

Qué tendrá: pasos, sueño, frecuencia cardiaca, calorías quemadas, entrenos registrados automáticamente.

Cómo se verá: dashboard con gráficos de líneas (evolución diaria) y resúmenes semanales.

7. reportes-rendimiento

src/features/plansolomax/wearables/reportes-rendimiento/ReportesRendimientoPage.tsx

Informes generados a partir de wearables.

Qué tendrá: informe en PDF/visual con conclusiones (“El sueño de Marta bajó esta semana un 15%”).

Cómo se verá: documento claro con secciones y gráficos para compartir con el cliente.

🛒 Upsells en Checkout
8. sugerencias-productos

src/features/plansolomax/upsells/sugerencias-productos/SugerenciasProductosPage.tsx

Gestor de ofertas adicionales.

Qué tendrá: crear upsells tipo “¿Quieres añadir un bono de 3 sesiones?” al finalizar la compra.

Cómo se verá: editor sencillo con campos de título, precio, descripción y botón activar.

9. configuracion-upsells

src/features/plansolomax/upsells/configuracion-upsells/ConfiguracionUpsellsPage.tsx

Control del embudo de venta.

Qué tendrá: reglas de cuándo mostrar upsells (ej.: si compra plan mensual → sugerir anual).

Cómo se verá: lista de reglas con condiciones y destinos, estilo “if/then”.

10. conversion-report

src/features/plansolomax/upsells/conversion-report/ConversionReportPage.tsx

Análisis de efectividad.

Qué tendrá: cuántos upsells se ofrecieron, cuántos aceptaron, ingresos extra generados.

Cómo se verá: dashboard con gráficos de barras y tasa de conversión en % destacado.

🎨 Branding Avanzado
11. personalizacion-dominio

src/features/plansolomax/branding/personalizacion-dominio/PersonalizacionDominioPage.tsx

Tu URL única.

Qué tendrá: configuración para usar un dominio propio (ej. entrenaconana.com).

Cómo se verá: formulario con estado de dominio (activo/pending) y ayuda paso a paso.

12. personalizacion-estilos

src/features/plansolomax/branding/personalizacion-estilos/PersonalizacionEstilosPage.tsx

Diseño visual personalizado.

Qué tendrá: selector de colores, tipografías y logos.

Cómo se verá: editor visual con previsualización en tiempo real de cómo se verá tu micrositio/app.

13. personalizacion-app-cliente

src/features/plansolomax/branding/personalizacion-app-cliente/PersonalizacionAppClientePage.tsx

Marca en la app de clientes.

Qué tendrá: ajustes de logo, splash screen, icono de app, frases personalizadas.

Cómo se verá: vista previa en mockups de móvil para comprobar cómo lo verán tus clientes.

📊 Analíticas Avanzadas
14. cohortes-clientes

src/features/plansolomax/analytics-avanzadas/cohortes-clientes/CohortesClientesPage.tsx

Segmentación por grupos de inicio.

Qué tendrá: ver retención y evolución de clientes que empezaron en la misma fecha (ej. “cohorte Enero 2025”).

Cómo se verá: tabla con curvas de retención, líneas de colores comparando cohortes.

15. ltv-clientes

src/features/plansolomax/analytics-avanzadas/ltv-clientes/LtvClientesPage.tsx

Valor de vida de clientes.

Qué tendrá: cálculo de ingresos totales generados por cliente y media de duración de su ciclo de vida.

Cómo se verá: tarjetas por cliente con ingresos generados y gráfico acumulado.

16. retencion-clientes

src/features/plansolomax/analytics-avanzadas/retencion-clientes/RetencionClientesPage.tsx

Vista general de fidelización.

Qué tendrá: % de clientes que permanecen activos mes a mes, con alertas de pérdida.

Cómo se verá: gráfico de líneas con tendencia y KPI destacados en grande.

17. analitica-ingresos

src/features/plansolomax/analytics-avanzadas/analitica-ingresos/AnaliticaIngresosPage.tsx

Resumen financiero avanzado.

Qué tendrá: desglose de ingresos por tipo de producto/servicio, comparación mensual.

Cómo se verá: dashboard con gráfico circular de distribución y comparativa histórica.

🚀 Resumen Plan Solo Max

Automatizaciones: 4 páginas

Wearables: 3 páginas

Upsells: 3 páginas

Branding Avanzado: 3 páginas

Analíticas Avanzadas: 4 páginas

👉 Total: 17 páginas con un panel visual, claro y potente para llevar un negocio freelance al siguiente nivel.