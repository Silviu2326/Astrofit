🏃 Plan Teams Pro — Páginas y Descripciones
👥 Roles de Equipo
1. listado-roles

src/features/planteamspro/roles-equipo/listado-roles/ListadoRolesPage.tsx

Gestión de puestos dentro del club.

Qué tendrá: listado de entrenadores, asistentes, fisioterapeutas y atletas con su rol asignado.

Cómo se verá: tabla con fotos de perfil, nombre, rol y botones para editar/cambiar rol.

2. permisos-entrenadores

src/features/planteamspro/roles-equipo/permisos-entrenadores/PermisosEntrenadoresPage.tsx

Control de accesos al sistema.

Qué tendrá: definir qué entrenadores pueden crear rutinas, acceder a datos médicos o convocar atletas.

Cómo se verá: matriz de permisos con switches ON/OFF (checklist visual).

3. asignacion-roles

src/features/planteamspro/roles-equipo/asignacion-roles/AsignacionRolesPage.tsx

Asignación flexible de roles.

Qué tendrá: capacidad de dar múltiples roles a una persona (ej.: jugador y capitán).

Cómo se verá: formulario con menús desplegables y etiquetas de colores para cada rol.

📅 Planificación de Mesociclos
4. calendario-periodizacion

src/features/planteamspro/planificacion-mesociclos/calendario-periodizacion/CalendarioPeriodizacionPage.tsx

Planificación del año deportivo.

Qué tendrá: ciclos de pretemporada, competición, descanso, visibles en un calendario de semanas/meses.

Cómo se verá: vista tipo gantt (barras por semanas), con colores por fase (azul = fuerza, verde = técnica, rojo = competición).

5. editar-mesociclo

src/features/planteamspro/planificacion-mesociclos/editar-mesociclo/EditarMesocicloPage.tsx

Editor de bloques de entrenamiento.

Qué tendrá: desglose de objetivos (fuerza, resistencia, técnica), volumen, intensidad.

Cómo se verá: editor modular con sliders para volumen y carga.

6. plantillas-mesociclos

src/features/planteamspro/planificacion-mesociclos/plantillas-mesociclos/PlantillasMesociclosPage.tsx

Banco de planificaciones recurrentes.

Qué tendrá: plantillas para guardar y reutilizar (ej.: mesociclo de pretemporada).

Cómo se verá: galería de tarjetas con título, duración y botón “aplicar”.

🧪 Laboratorio de Tests
7. pruebas-fisicas

src/features/planteamspro/laboratorio-tests/pruebas-fisicas/PruebasFisicasPage.tsx

Gestión de test de rendimiento.

Qué tendrá: vertical jump, test de velocidad, resistencia, 1RM, VO2 estimado.

Cómo se verá: tabla con pruebas, fecha, atletas participantes.

8. resultados-historicos

src/features/planteamspro/laboratorio-tests/resultados-historicos/ResultadosHistoricosPage.tsx

Historial por atleta y prueba.

Qué tendrá: evolución de resultados individuales (ej. salto vertical de 40cm → 48cm).

Cómo se verá: gráfico de líneas comparando resultados a lo largo del tiempo.

9. comparador-resultados

src/features/planteamspro/laboratorio-tests/comparador-resultados/ComparadorResultadosPage.tsx

Comparaciones entre atletas o equipos.

Qué tendrá: seleccionar 2+ atletas y comparar métricas clave.

Cómo se verá: gráfico de barras lado a lado con colores por atleta.

📋 Cuestionarios Wellness
10. cuestionario-diario

src/features/planteamspro/cuestionarios-wellness/cuestionario-diario/CuestionarioDiarioPage.tsx

Control del estado del atleta.

Qué tendrá: breve formulario diario (sueño, dolor, ánimo, energía).

Cómo se verá: interfaz móvil simple con iconos (carita feliz/triste, escala de 1-5).

11. informes-semanales

src/features/planteamspro/cuestionarios-wellness/informes-semanales/InformesSemanalesPage.tsx

Resumen de wellness.

Qué tendrá: evolución semanal del equipo en sueño, fatiga y ánimo.

Cómo se verá: dashboard con gráficos en radar y promedios por día.

12. alertas-fatiga

src/features/planteamspro/cuestionarios-wellness/alertas-fatiga/AlertasFatigaPage.tsx

Detección de sobrecarga.

Qué tendrá: alertas automáticas cuando un atleta baja mucho en métricas de energía/ánimo.

Cómo se verá: panel de alertas en rojo/amarillo, con recomendaciones (“reducir carga esta semana”).

📣 Convocatorias
13. lista-convocatorias

src/features/planteamspro/convocatorias/lista-convocatorias/ListaConvocatoriasPage.tsx

Gestión de partidos y eventos.

Qué tendrá: listado de próximos partidos con fecha, lugar, plantilla convocada.

Cómo se verá: tabla tipo calendario deportivo con iconos de estado (convocado, suplente, no disponible).

14. asistencia-eventos

src/features/planteamspro/convocatorias/asistencia-eventos/AsistenciaEventosPage.tsx

Confirmación de disponibilidad.

Qué tendrá: atletas marcan si pueden asistir o no, entrenadores ven el estado.

Cómo se verá: lista con ✔️ / ❌ por cada jugador y porcentaje global.

15. gestion-plantillas-convocatoria

src/features/planteamspro/convocatorias/gestion-plantillas-convocatoria/GestionPlantillasConvocatoriaPage.tsx

Creación de plantillas de alineaciones.

Qué tendrá: posición de cada jugador, roles dentro del partido.

Cómo se verá: tablero táctico tipo cancha con arrastrar y soltar fotos de jugadores.

🧑‍🎓 Perfiles de Atletas
16. ficha-atleta

src/features/planteamspro/perfiles-atletas/ficha-atleta/FichaAtletaPage.tsx

Ficha detallada de cada deportista.

Qué tendrá: datos personales, posición, historial de lesiones, progresión física.

Cómo se verá: página estilo “perfil deportivo” con pestañas.

17. historial-rendimiento

src/features/planteamspro/perfiles-atletas/historial-rendimiento/HistorialRendimientoPage.tsx

Datos longitudinales.

Qué tendrá: progresión en tests, entrenos realizados, carga acumulada.

Cómo se verá: gráficos con línea de tendencia y comparaciones anuales.

18. comparador-atletas

src/features/planteamspro/perfiles-atletas/comparador-atletas/ComparadorAtletasPage.tsx

Cara a cara entre jugadores.

Qué tendrá: comparación directa de dos atletas en métricas clave (fuerza, resistencia, técnica).

Cómo se verá: gráfico de barras lado a lado con colores por jugador.

📊 Resumen Teams Pro

Roles de Equipo: 3 páginas

Planificación Mesociclos: 3 páginas

Laboratorio Tests: 3 páginas

Cuestionarios Wellness: 3 páginas

Convocatorias: 3 páginas

Perfiles Atletas: 3 páginas

👉 Total: 18 páginas, con un enfoque profesional y estructurado para la gestión integral de equipos.