🧑‍💻 Plan Solo Pro — Páginas y Descripciones
🌐 Micrositio Reservas
1. landing-servicios

src/features/plansolopro/micrositio/landing-servicios/LandingServiciosPage.tsx

La portada del entrenador.

Qué tendrá: una foto/hero principal con tu nombre y especialidad, listado de servicios (entrenos online, sesiones 1 a 1, packs), testimonios de clientes y un botón de “Reservar ahora”.

Cómo se verá: diseño tipo web moderna, con secciones apiladas (hero → servicios → testimonios → CTA). Colores personalizables para tu marca.

2. calendario-publico

src/features/plansolopro/micrositio/calendario-publico/CalendarioPublicoPage.tsx

Donde el cliente consulta tu disponibilidad.

Qué tendrá: un calendario visual con los días/horas en que aceptas reservas, con franjas libres y ocupadas.

Cómo se verá: vista de calendario limpia (tipo Google Calendar) pero solo mostrando tus huecos disponibles, con botones de “Reservar sesión”.

3. pagina-reserva

src/features/plansolopro/micrositio/pagina-reserva/PaginaReservaPage.tsx

El embudo de reserva de sesión.

Qué tendrá: formulario para seleccionar servicio, hora disponible, datos básicos del cliente (nombre, email, teléfono) y pago (Stripe embebido).

Cómo se verá: formulario paso a paso con barras de progreso y confirmación visual de la cita.

4. testimonios-clientes

src/features/plansolopro/micrositio/testimonios-clientes/TestimoniosClientesPage.tsx

Una galería de opiniones.

Qué tendrá: lista de reseñas, cada una con foto/nombre/estrella y comentario.

Cómo se verá: tarjetas limpias estilo “testimonial carousel” que deslizan horizontalmente, muy visual y social.

5. blog-noticias (opcional, si el entrenador quiere generar contenido)

src/features/plansolopro/micrositio/blog-noticias/BlogNoticiasPage.tsx

Qué tendrá: artículos cortos con tips fitness, nutrición o noticias tuyas.

Cómo se verá: feed tipo blog minimalista con títulos, imágenes y extractos.

✅ Hábitos Avanzados
6. listado-habitos

src/features/plansolopro/habitos-avanzados/listado-habitos/ListadoHabitosPage.tsx

Panel central de gestión de hábitos de clientes.

Qué tendrá: tabla/lista con hábitos asignados a cada cliente, nivel de cumplimiento (% semanal), estado (activo/inactivo).

Cómo se verá: tablero estilo Kanban o lista con barras de progreso de color (verde, amarillo, rojo).

7. crear-habito

src/features/plansolopro/habitos-avanzados/crear-habito/CrearHabitoPage.tsx

Diseñador de hábitos personalizados.

Qué tendrá: formulario para definir hábito (ej. “Beber 2L agua”, “Caminar 8k pasos”), frecuencia (diario, 3x/semana), recordatorios.

Cómo se verá: un asistente sencillo con campos + vista previa de cómo lo verá el cliente en su app.

8. estadisticas-habitos

src/features/plansolopro/habitos-avanzados/estadisticas-habitos/EstadisticasHabitosPage.tsx

Analítica de hábitos.

Qué tendrá: gráficos de adherencia por cliente (ej.: gráfico circular % cumplido vs no cumplido). Ranking de hábitos más cumplidos por el grupo de clientes.

Cómo se verá: dashboard con gráficas de barras, donuts y tablas simples.

9. retos-habitos

src/features/plansolopro/habitos-avanzados/retos-habitos/RetosHabitosPage.tsx

Gamificación para motivar.

Qué tendrá: creación de retos (“30 días seguidos con 10k pasos”), listado de participantes, tabla de clasificación.

Cómo se verá: tarjetas visuales con insignias, logros desbloqueados y medallas digitales.

🎥 Tele-Sesiones
10. videollamada-sala

src/features/plansolopro/tele-sesiones/videollamada-sala/VideollamadaSalaPage.tsx

Tu sala online de entreno en vivo.

Qué tendrá: videollamada integrada (Zoom/Meet), lista de asistentes, chat lateral, botón de compartir pantalla.

Cómo se verá: interfaz tipo Zoom pero embebida dentro de Fitoffice, con tu logo en lugar del de Zoom.

11. grabaciones-sesiones

src/features/plansolopro/tele-sesiones/grabaciones-sesiones/GrabacionesSesionesPage.tsx

Historial de sesiones online.

Qué tendrá: listado de entrenos grabados con fecha y miniatura, accesibles para el cliente bajo permiso.

Cómo se verá: galería tipo “videoteca” con thumbnails y botones de reproducir/descargar.

12. chat-sesion

src/features/plansolopro/tele-sesiones/chat-sesion/ChatSesionPage.tsx

Espacio de conversación para clientes.

Qué tendrá: chat de texto en vivo durante la sesión, posibilidad de compartir links, emojis y notas rápidas.

Cómo se verá: ventana lateral estilo chat con burbujas modernas (tipo WhatsApp/Slack).

13. notas-sesion

src/features/plansolopro/tele-sesiones/notas-sesion/NotasSesionPage.tsx

Registro rápido de lo sucedido.

Qué tendrá: área de notas para apuntar observaciones (ej.: “Ana mejoró en técnica de sentadilla”), visibles solo para el entrenador.

Cómo se verá: formulario minimalista tipo post-it integrado en la sesión.

🎟️ Cupones Avanzados
14. listado-cupones

src/features/plansolopro/cupones-avanzados/listado-cupones/ListadoCuponesPage.tsx

Gestor de promociones activas.

Qué tendrá: tabla de cupones con código, tipo (% o €), fecha inicio/fin, nº de usos.

Cómo se verá: vista de listado con etiquetas de color (activo, caducado, agotado).

15. crear-cupon

src/features/plansolopro/cupones-avanzados/crear-cupon/CrearCuponPage.tsx

Diseñador de nuevos cupones.

Qué tendrá: formulario con nombre, tipo, valor, fecha de caducidad, número de usos permitidos, clientes válidos.

Cómo se verá: asistente limpio con vista previa del cupón (tarjeta con código y descuento).

16. reportes-uso

src/features/plansolopro/cupones-avanzados/reportes-uso/ReportesUsoPage.tsx

Estadísticas de promociones.

Qué tendrá: cuántas veces se usó cada cupón, ingresos generados, clientes nuevos captados.

Cómo se verá: dashboard con gráficos de barras y métricas resumidas.

👣 Recorrido Cliente
17. customer-journey

src/features/plansolopro/recorrido-cliente/customer-journey/CustomerJourneyPage.tsx

Mapa visual del viaje del cliente.

Qué tendrá: embudo visual con etapas (Lead → Cliente nuevo → Activo → Fiel). Clientes aparecen como tarjetas movibles.

Cómo se verá: tablero Kanban con colores por etapa, barras de conversión y alertas de “clientes estancados”.

18. hitos-clientes

src/features/plansolopro/recorrido-cliente/hitos-clientes/HitosClientesPage.tsx

Registro de momentos importantes.

Qué tendrá: cumpleaños, aniversarios de contrato, número de sesiones completadas.

Cómo se verá: timeline tipo red social, con iconos y colores festivos.

19. alertas-retencion

src/features/plansolopro/recorrido-cliente/alertas-retencion/AlertasRetencionPage.tsx

Radar de clientes en riesgo.

Qué tendrá: lista de clientes con baja asistencia o baja adherencia, con alertas rojas y sugerencias de acción (ej.: “enviar mensaje motivacional”).

Cómo se verá: panel con tarjetas rojas/amarillas/verdes y botones de acción rápida.

🚀 Resumen Plan Solo Pro

Micrositio Reservas: 5 páginas

Hábitos Avanzados: 4 páginas

Tele-Sesiones: 4 páginas

Cupones Avanzados: 3 páginas

Recorrido Cliente: 3 páginas

👉 Total: 19 páginas (cada una con un propósito claro y diseño único).