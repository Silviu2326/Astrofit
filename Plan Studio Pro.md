🏢 Plan Studio Pro — Páginas y Descripciones
📅 Gestión de Clases
1. calendario-clases

src/features/planstudiopro/gestion-clases/calendario-clases/CalendarioClasesPage.tsx

El corazón del box o estudio.

Qué tendrá: vista semanal/diaria de todas las clases, con coach asignado, capacidad, inscritos y disponibilidad.

Cómo se verá: calendario visual tipo “Google Calendar”, con tarjetas por clase (color por categoría: fuerza, cardio, yoga).

2. reservas-clase

src/features/planstudiopro/gestion-clases/reservas-clase/ReservasClasePage.tsx

Gestión de inscripciones.

Qué tendrá: listado de reservas por clase, control de aforo, lista de espera automática.

Cómo se verá: tabla con nombre, estado (confirmado, en espera, cancelado) y botones de acción rápida.

3. gestion-coach

src/features/planstudiopro/gestion-clases/gestion-coach/GestionCoachPage.tsx

Organización de entrenadores.

Qué tendrá: asignación de clases a cada entrenador, disponibilidad semanal, horas extra.

Cómo se verá: panel tipo “staff manager” con fotos de entrenadores y sus horarios.

4. reportes-asistencia

src/features/planstudiopro/gestion-clases/reportes-asistencia/ReportesAsistenciaPage.tsx

Informe de asistencia de alumnos.

Qué tendrá: % de asistencia por clase, alumnos frecuentes, ausencias recurrentes.

Cómo se verá: dashboard con gráfico de barras (clase más concurrida) y ranking de asistencia por cliente.

🏋️ Whiteboard
5. wod-del-dia

src/features/planstudiopro/whiteboard/wod-dia/WodDiaPage.tsx

Tu pizarra digital.

Qué tendrá: publicación diaria del WOD (ejercicio, repeticiones, tiempo). Editable y visible desde la app de cliente.

Cómo se verá: pantalla con diseño tipo “chalkboard” (pizarra de box) pero en digital, clara y motivadora.

6. leaderboard

src/features/planstudiopro/whiteboard/leaderboard/LeaderboardPage.tsx

Competencia sana.

Qué tendrá: ranking de resultados (tiempos, cargas, repeticiones) de los clientes que completaron el WOD.

Cómo se verá: tabla estilo marcador deportivo con nombres, fotos de perfil y medallas digitales.

7. historial-marcas

src/features/planstudiopro/whiteboard/historial-marcas/HistorialMarcasPage.tsx

Registro de PRs y resultados.

Qué tendrá: log histórico de las marcas personales de cada cliente (ej. RM squat, Fran time).

Cómo se verá: gráfico de evolución por ejercicio + tabla con fechas y PRs.

📲 Check-in QR
8. escaner-entrada

src/features/planstudiopro/check-in-qr/escaner-entrada/EscanerEntradaPage.tsx

Acceso rápido al estudio.

Qué tendrá: lector QR para escanear la app del cliente al entrar.

Cómo se verá: pantalla tipo escáner con cámara y feedback inmediato (✔️ acceso, ❌ no válido).

9. historial-asistencias

src/features/planstudiopro/check-in-qr/historial-asistencias/HistorialAsistenciasPage.tsx

Registro de entradas.

Qué tendrá: listado cronológico de quién entró, a qué hora, a qué clase.

Cómo se verá: tabla con filtros por cliente, clase, día.

10. pases-virtuales

src/features/planstudiopro/check-in-qr/pases-virtuales/PasesVirtualesPage.tsx

Sustituto digital de los bonos físicos.

Qué tendrá: gestión de sesiones restantes en cada bono, alertas cuando quedan pocas.

Cómo se verá: tarjetas digitales con contador de sesiones (tipo “punch card” en pantalla).

💳 POS Ligero
11. ventas-rapidas

src/features/planstudiopro/pos-ligero/ventas-rapidas/VentasRapidasPage.tsx

Caja rápida del estudio.

Qué tendrá: venta directa de productos simples (agua, batidos, camisetas).

Cómo se verá: cuadrícula con iconos de productos + botón cobrar.

12. tickets-diarios

src/features/planstudiopro/pos-ligero/tickets-diarios/TicketsDiariosPage.tsx

Registro de ventas.

Qué tendrá: listado de transacciones del día con estado de pago.

Cómo se verá: tabla sencilla con totales al final.

13. caja-diaria

src/features/planstudiopro/pos-ligero/caja-diaria/CajaDiariaPage.tsx

Cierre del día.

Qué tendrá: resumen de ingresos diarios (clases + productos), control de efectivo vs tarjeta.

Cómo se verá: dashboard con indicadores grandes y gráfico circular.

📑 Pases & Contratos
14. listado-pases

src/features/planstudiopro/pases-contratos/listado-pases/ListadoPasesPage.tsx

Gestor de bonos y pases.

Qué tendrá: lista de bonos activos (10 sesiones, mensual, trimestral), clientes asociados, uso restante.

Cómo se verá: tarjetas con barras de progreso que muestran cuánto le queda a cada cliente.

15. crear-contrato

src/features/planstudiopro/pases-contratos/crear-contrato/CrearContratoPage.tsx

Generador de contratos digitales.

Qué tendrá: plantillas con datos del cliente, condiciones, firma digital.

Cómo se verá: editor de contrato en PDF con campo de firma digital al final.

16. renovaciones

src/features/planstudiopro/pases-contratos/renovaciones/RenovacionesPage.tsx

Seguimiento de caducidades.

Qué tendrá: alertas de contratos próximos a expirar y opción de renovarlos con un clic.

Cómo se verá: listado con fechas de vencimiento resaltadas en amarillo/rojo.

📊 Resumen Studio Pro

Gestión de Clases: 4 páginas

Whiteboard: 3 páginas

Check-in QR: 3 páginas

POS Ligero: 3 páginas

Pases & Contratos: 3 páginas

👉 Total: 16 páginas diseñadas para estudios boutique que necesitan control, experiencia premium y gamificación.