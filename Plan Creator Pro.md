🌍 Plan Creator Pro — Páginas y Descripciones
👥 Comunidad
1. feed-comunidad

src/features/plancreatorpro/comunidad/feed-comunidad/FeedComunidadPage.tsx

Tu red social privada.

Qué tendrá: publicaciones de entrenadores y clientes (texto, imagen, vídeo), likes, comentarios, encuestas rápidas.

Cómo se verá: timeline estilo Facebook/Instagram, limpio, con fotos redondas de perfil y secciones para destacar “post fijados”.

2. grupos-comunidad

src/features/plancreatorpro/comunidad/grupos-comunidad/GruposComunidadPage.tsx

Subcomunidades temáticas.

Qué tendrá: creación de grupos (ej. “Reto 30 días”, “Fuerza Avanzada”), miembros, moderadores, posts propios.

Cómo se verá: tarjetas de grupo con imagen de portada + contador de miembros, feed independiente dentro de cada grupo.

3. moderacion-comunidad

src/features/plancreatorpro/comunidad/moderacion-comunidad/ModeracionComunidadPage.tsx

Panel de control del entrenador.

Qué tendrá: lista de reportes, posts marcados, solicitudes de entrada, herramientas para bloquear usuarios o borrar contenido.

Cómo se verá: vista administrativa sencilla con banderas rojas y botones de acción rápida.

4. ranking-actividad

src/features/plancreatorpro/comunidad/ranking-actividad/RankingActividadPage.tsx

Gamificación social.

Qué tendrá: tabla con los usuarios más activos (publicaciones, comentarios, logros) y medallas digitales.

Cómo se verá: leaderboard con fotos de perfil, puntos y medallas al estilo “gamerscore”.

💳 Membresías
5. listado-membresias

src/features/plancreatorpro/membresias/listado-membresias/ListadoMembresiasPage.tsx

Panel de todas las membresías activas.

Qué tendrá: lista de niveles de suscripción (ej. bronce, plata, oro), número de miembros activos, ingresos.

Cómo se verá: tarjetas tipo pricing con información resumida y botón editar.

6. pagina-membresia

src/features/plancreatorpro/membresias/pagina-membresia/PaginaMembresiaPage.tsx

Página pública de una suscripción.

Qué tendrá: beneficios, precio, qué incluye (ej. acceso a cursos, entrenos exclusivos).

Cómo se verá: landing estilo “página de venta”, con lista de beneficios y botón de “Unirse”.

7. beneficios-membresia

src/features/plancreatorpro/membresias/beneficios-membresia/BeneficiosMembresiPage.tsx

Editor de perks de cada nivel.

Qué tendrá: interfaz para añadir o quitar beneficios (ej. “1 directo semanal”, “Acceso a recetas exclusivas”).

Cómo se verá: lista editable con switches ON/OFF y vista previa.

8. pagos-membresia

src/features/plancreatorpro/membresias/pagos-membresia/PagosMembresiPage.tsx

Seguimiento económico.

Qué tendrá: listado de pagos recurrentes, ingresos mensuales, tasa de cancelación.

Cómo se verá: dashboard con gráfico de ingresos recurrentes y tabla de pagos.

🎓 Cursos Online
9. listado-cursos

src/features/plancreatorpro/cursos-online/listado-cursos/ListadoCursosPage.tsx

Vista general de todos tus cursos.

Qué tendrá: títulos, nº de alumnos, estado (borrador/activo), precio.

Cómo se verá: tarjetas con miniatura de portada, contador de inscritos y botones de gestión.

10. curso-detalle

src/features/plancreatorpro/cursos-online/curso-detalle/CursoDetallePage.tsx

Ficha de un curso.

Qué tendrá: descripción, módulos, lecciones, alumnos inscritos, progreso medio.

Cómo se verá: página tipo “Udemy” con portada del curso, índice lateral de lecciones y pestañas de info.

11. crear-curso

src/features/plancreatorpro/cursos-online/crear-curso/CrearCursoPage.tsx

Asistente para montar un curso.

Qué tendrá: pasos para añadir título, descripción, subir portada, definir precio.

Cómo se verá: wizard por pasos con barra de progreso y previsualización final.

12. gestion-lecciones

src/features/plancreatorpro/cursos-online/gestion-lecciones/GestionLeccionesPage.tsx

Editor de contenido del curso.

Qué tendrá: subir vídeos, añadir PDFs, redactar lecciones, definir quizzes.

Cómo se verá: editor modular con bloques arrastrables (vídeo, texto, test).

13. quizzes-evaluaciones

src/features/plancreatorpro/cursos-online/quizzes-evaluaciones/QuizzesEvaluacionesPage.tsx

Evaluación del aprendizaje.

Qué tendrá: creación de tests con preguntas múltiples, feedback inmediato, notas.

Cómo se verá: interfaz tipo cuestionario con resultados instantáneos y tabla de calificaciones.

📚 Biblioteca de Contenidos
14. contenidos-video

src/features/plancreatorpro/biblioteca-contenidos/contenidos-video/ContenidosVideoPage.tsx

Videoteca privada.

Qué tendrá: vídeos de entreno o teoría clasificados por tema.

Cómo se verá: galería con thumbnails y buscador por etiquetas.

15. contenidos-articulos

src/features/plancreatorpro/biblioteca-contenidos/contenidos-articulos/ContenidosArticulosPage.tsx

Blog interno para miembros.

Qué tendrá: artículos escritos con imágenes y documentos descargables.

Cómo se verá: listado de artículos con título, imagen destacada y botón leer.

16. contenidos-descargables

src/features/plancreatorpro/biblioteca-contenidos/contenidos-descargables/ContenidosDescargablesPage.tsx

Material complementario.

Qué tendrá: PDFs, plantillas, hojas de cálculo descargables.

Cómo se verá: listado con iconos de tipo de archivo y botón de descarga.

17. buscador-contenidos

src/features/plancreatorpro/biblioteca-contenidos/buscador-contenidos/BuscadorContenidosPage.tsx

Búsqueda centralizada.

Qué tendrá: campo de búsqueda con filtros (tipo de recurso, duración, tema).

Cómo se verá: página limpia estilo Google con resultados organizados en categorías.

✉️ Email Broadcast
18. listado-emails

src/features/plancreatorpro/email-broadcast/listado-emails/ListadoEmailsPage.tsx

Historial de campañas enviadas.

Qué tendrá: asunto, fecha, nº de destinatarios, tasa de apertura.

Cómo se verá: tabla tipo CRM con etiquetas verdes/rojas según estado.

19. crear-email

src/features/plancreatorpro/email-broadcast/crear-email/CrearEmailPage.tsx

Editor de correos masivos.

Qué tendrá: editor con bloques arrastrables (texto, imagen, botón), segmentación de destinatarios.

Cómo se verá: previsualización tipo “newsletter” con live preview.

20. plantillas-email

src/features/plancreatorpro/email-broadcast/plantillas-email/PlantillasEmailPage.tsx

Banco de emails reutilizables.

Qué tendrá: plantillas listas (bienvenida, recordatorio, anuncio curso).

Cómo se verá: galería con thumbnails de diseño de cada email.

21. reportes-envio

src/features/plancreatorpro/email-broadcast/reportes-envio/ReportesEnvioPage.tsx

Métricas de impacto.

Qué tendrá: tasa de apertura, clics, bajas, ingresos generados.

Cómo se verá: dashboard con barras y gráficos de embudo.

🚀 Resumen Creator Pro

Comunidad: 4 páginas

Membresías: 4 páginas

Cursos Online: 5 páginas

Biblioteca de Contenidos: 4 páginas

Email Broadcast: 4 páginas

👉 Total: 21 páginas, todas enfocadas en la monetización de contenido y construcción de comunidad.