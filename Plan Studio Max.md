🏋️ Plan Studio Max — Páginas y Descripciones
🔑 Control de Accesos
1. tarjetas-socios

src/features/planstudiomax/control-accesos/tarjetas-socios/TarjetasSociosPage.tsx

Gestión de credenciales de acceso.

Qué tendrá: registro de tarjetas magnéticas/QR, asignación a clientes, estado (activo, bloqueado).

Cómo se verá: tabla con foto de cliente, número de tarjeta, botones activar/bloquear.

2. gestion-tornos

src/features/planstudiomax/control-accesos/gestion-tornos/GestionTornosPage.tsx

Administración de accesos físicos.

Qué tendrá: control de tornos y puertas inteligentes, horarios de acceso configurables.

Cómo se verá: panel con switches ON/OFF, estado en tiempo real (verde acceso ok, rojo fallo).

3. reportes-accesos

src/features/planstudiomax/control-accesos/reportes-accesos/ReportesAccesosPage.tsx

Historial de entradas al gimnasio.

Qué tendrá: registros de quién entró, a qué hora, sede y puerta usada.

Cómo se verá: listado con filtros por cliente/fecha + gráfico de picos de asistencia.

🖥️ Kiosko Auto Check-in
4. interfaz-cliente

src/features/planstudiomax/kiosko/interfaz-cliente/InterfazClientePage.tsx

Pantalla de check-in autónomo.

Qué tendrá: opción de escanear QR o introducir número de socio, bienvenida personalizada.

Cómo se verá: pantalla tipo tablet con diseño limpio, logotipo del gimnasio y botones grandes.

5. historial-kiosko

src/features/planstudiomax/kiosko/historial-kiosko/HistorialKioskoPage.tsx

Registro de autoservicio.

Qué tendrá: listado de accesos hechos por kiosko, incidencias detectadas (ej. abono caducado).

Cómo se verá: tabla con iconos de estado (✔️ válido, ❌ no válido).

🏢 Multi-Sedes
6. listado-sedes

src/features/planstudiomax/multi-sedes/listado-sedes/ListadoSedesPage.tsx

Vista de todas las ubicaciones.

Qué tendrá: listado con direcciones, responsables, aforo máximo, estado operativo.

Cómo se verá: tarjetas con mapa pequeño, nombre de sede y botones de gestión.

7. comparativa-sedes

src/features/planstudiomax/multi-sedes/comparativa-sedes/ComparativaSedesPage.tsx

Análisis entre sedes.

Qué tendrá: métricas de ingresos, clientes activos, nivel de ocupación.

Cómo se verá: dashboard comparativo con gráficos de barras y ranking de sedes.

8. transferencias-clientes

src/features/planstudiomax/multi-sedes/transferencias-clientes/TransferenciasClientesPage.tsx

Movimiento entre centros.

Qué tendrá: gestión de clientes que cambian de sede, con histórico de cambios.

Cómo se verá: listado con origen → destino y fecha de traslado.

📦 Inventario Avanzado
9. catalogo-stock

src/features/planstudiomax/inventario-avanzado/catalogo-stock/CatalogoStockPage.tsx

Listado de productos del gimnasio.

Qué tendrá: material deportivo, suplementos, merchandising, con stock actual y ubicación.

Cómo se verá: tabla con iconos de producto, stock restante, alertas en rojo si escaso.

10. control-pedidos

src/features/planstudiomax/inventario-avanzado/control-pedidos/ControlPedidosPage.tsx

Gestión de compras a proveedores.

Qué tendrá: órdenes de compra, estado (pendiente, enviado, recibido).

Cómo se verá: listado con línea de tiempo de pedido y botones de confirmar recepción.

11. alertas-inventario

src/features/planstudiomax/inventario-avanzado/alertas-inventario/AlertasInventarioPage.tsx

Notificaciones automáticas.

Qué tendrá: alertas de productos con stock bajo, caducidad próxima, incidencias.

Cómo se verá: panel lateral de alertas con colores (amarillo = aviso, rojo = crítico).

🏢 CRM Empresas
12. convenios-corporativos

src/features/planstudiomax/crm-empresas/convenios-corporativos/ConveniosCorporativosPage.tsx

Gestión de acuerdos B2B.

Qué tendrá: listado de convenios con empresas, número de empleados asociados, condiciones de contrato.

Cómo se verá: tarjetas tipo ficha de empresa con logo, sector y datos clave.

13. empleados-socios

src/features/planstudiomax/crm-empresas/empleados-socios/EmpleadosSociosPage.tsx

Listado de beneficiarios de convenios.

Qué tendrá: lista de empleados inscritos con datos básicos, estado (activo, baja).

Cómo se verá: tabla con buscador, filtros por empresa, etiquetas de estado.

14. facturacion-empresas

src/features/planstudiomax/crm-empresas/facturacion-empresas/FacturacionEmpresasPage.tsx

Gestión de cobros corporativos.

Qué tendrá: facturas recurrentes por convenio, historial de pagos, estados.

Cómo se verá: tabla de facturas con etiquetas (pagada, pendiente, vencida) y sumario económico.