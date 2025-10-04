# Documentación Completa: Roles y Módulos del Sistema TrainerPro

> **Documento técnico detallado** - Versión Extendida
> Última actualización: 2025-10-04

---

## Tabla de Contenidos

1. [Roles y Planes del Sistema](#roles-y-planes-del-sistema)
2. [Módulos CORE](#módulos-core)
3. [Módulos PLAN SOLO](#módulos-plan-solo)
4. [Módulos PLAN CREATOR](#módulos-plan-creator)
5. [Módulos PLAN STUDIO](#módulos-plan-studio)
6. [Módulos PLAN TEAMS](#módulos-plan-teams)
7. [Arquitectura de Permisos](#arquitectura-de-permisos)
8. [Casos de Uso por Plan](#casos-de-uso-por-plan)
9. [Stack Tecnológico](#stack-tecnológico)

---

## ROLES Y PLANES DEL SISTEMA

El sistema TrainerPro ofrece 9 planes diferentes diseñados para cubrir todo el ecosistema fitness, desde entrenadores individuales hasta organizaciones deportivas de alto rendimiento.

### 1. **CORE** - Plan Base Universal

**Descripción**: Punto de entrada al ecosistema TrainerPro. Incluye todas las funcionalidades esenciales para iniciar un negocio fitness digital.

**Público Objetivo**:
- Entrenadores personales recién graduados
- Profesionales fitness iniciando negocio independiente
- Entrenadores en transición de empleado a freelance
- Nutricionistas deportivos independientes

**Precio Sugerido**: $29-49/mes

**Características Clave**:
- CRM básico con gestión de hasta 50 clientes
- Programación ilimitada de entrenamientos y dietas
- Sistema financiero completo
- Marketing básico
- 3 agentes de IA incluidos

---

### 2. **PLAN SOLO PRO** - Entrenador Personal Profesional

**Descripción**: Evolución del CORE para entrenadores personales que quieren profesionalizar su presencia digital y ofrecer servicios online.

**Público Objetivo**:
- Entrenadores personales con 20-100 clientes
- Coaches que quieren ofrecer sesiones virtuales
- Profesionales que necesitan un sitio web de reservas

**Precio Sugerido**: $79-99/mes

**Características Clave** (Incluye CORE +):
- Micrositio web con reservas online
- Sistema completo de videollamadas
- Tracking de hábitos saludables
- Cupones avanzados
- Mapeo del customer journey
- Hasta 150 clientes

---

### 3. **PLAN SOLO MAX** - Entrenador Personal Elite

**Descripción**: Plan premium para entrenadores establecidos que buscan escalar su negocio con automatizaciones, analytics y branding propio.

**Público Objetivo**:
- Entrenadores con 100-300 clientes
- Profesionales con alto ticket mensual
- Coaches que buscan pasividad en procesos
- Negocios fitness unipersonales en crecimiento

**Precio Sugerido**: $149-199/mes

**Características Clave** (Incluye SOLO PRO +):
- Analytics avanzadas con predicciones IA
- Motor de automatizaciones completo
- App móvil white label propia
- Dominio personalizado
- Integración con wearables
- Upsells inteligentes
- Clientes ilimitados

---

### 4. **PLAN CREATOR PRO** - Creador de Contenido

**Descripción**: Plataforma completa para influencers fitness y creadores de contenido que monetizan a través de cursos, comunidades y membresías online.

**Público Objetivo**:
- Influencers fitness (10K-100K seguidores)
- Coaches que venden programas online
- Expertos creando academias digitales
- Creadores de contenido educativo

**Precio Sugerido**: $129-179/mes

**Características Clave** (Incluye CORE +):
- Plataforma de cursos online (LMS)
- Comunidad privada estilo red social
- Sistema de membresías recurrentes
- Email marketing masivo
- Biblioteca de contenidos (video, artículos, descargables)
- Hasta 1000 miembros

---

### 5. **PLAN CREATOR MAX** - Creador Elite con Escalabilidad

**Descripción**: Máxima expresión para creadores que buscan construir un imperio digital con afiliados, merchandising y experimentación continua.

**Público Objetivo**:
- Influencers con 100K+ seguidores
- Academias online establecidas
- Negocios digitales escalables
- Brands personales fitness

**Precio Sugerido**: $299-399/mes

**Características Clave** (Incluye CREATOR PRO +):
- Programa de afiliados completo
- Tests A/B para optimización
- Tienda de merchandising
- App móvil white label
- Automatizaciones de engagement avanzadas
- Miembros ilimitados
- API completa para integraciones

---

### 6. **PLAN STUDIO PRO** - Gimnasios y Studios

**Descripción**: Suite completa para gestión operativa de gimnasios, boxes CrossFit, estudios de yoga/pilates y centros fitness.

**Público Objetivo**:
- Gimnasios boutique (50-200 miembros)
- Boxes de CrossFit
- Estudios de yoga/pilates
- Centros funcionales

**Precio Sugerido**: $179-249/mes

**Características Clave** (Incluye CORE +):
- Check-in con código QR
- Gestión completa de clases grupales
- Sistema de pases y contratos
- POS (punto de venta) integrado
- Whiteboard para WODs
- Hasta 300 miembros activos

---

### 7. **PLAN STUDIO MAX** - Gimnasios Enterprise

**Descripción**: Solución enterprise para cadenas de gimnasios, franquicias y negocios fitness multi-sede con necesidades corporativas.

**Público Objetivo**:
- Cadenas de gimnasios (2+ sedes)
- Franquicias fitness
- Gimnasios con 300+ miembros
- Negocios con convenios corporativos

**Precio Sugerido**: $399-599/mes

**Características Clave** (Incluye STUDIO PRO +):
- Gestión multi-sede ilimitada
- Control de accesos con torniquetes
- CRM para empresas (B2B)
- Inventario avanzado
- Kiosko de autoservicio
- Miembros ilimitados
- Soporte prioritario

---

### 8. **PLAN TEAMS PRO** - Equipos Deportivos

**Descripción**: Plataforma especializada para preparación física de equipos deportivos, clubes y organizaciones atléticas.

**Público Objetivo**:
- Equipos deportivos amateur
- Clubes deportivos
- Preparadores físicos de equipos
- Escuelas deportivas

**Precio Sugerido**: $249-349/mes

**Características Clave** (Incluye CORE adaptado +):
- Gestión de convocatorias
- Planificación por mesociclos
- Cuestionarios de wellness diarios
- Laboratorio de tests físicos
- Perfiles completos de atletas
- Sistema de roles y permisos
- Hasta 50 atletas

---

### 9. **PLAN TEAMS ELITE** - Alto Rendimiento

**Descripción**: Solución profesional para equipos de alto rendimiento con analytics predictivas, scouting y monitoreo en tiempo real.

**Público Objetivo**:
- Equipos profesionales
- Selecciones nacionales/regionales
- Clubs de elite
- Centros de alto rendimiento

**Precio Sugerido**: $599-999/mes

**Características Clave** (Incluye TEAMS PRO +):
- Analytics predictivas con IA
- Sistema completo de scouting
- Integración con sensores GPS/IMU
- Comparador de equipos
- Gestión de torneos y eventos
- Datos en tiempo real
- Atletas ilimitados
- Soporte 24/7

---

## MÓDULOS CORE

> Disponibles para todos los planes. Representan el 40% de funcionalidad total del sistema.

---

### MÓDULO 1: Sistema Central

**Objetivo**: Proporcionar la infraestructura base de navegación, configuración y soporte.

#### 1.1 Inicio / Dashboard

**Descripción Detallada**: Panel principal personalizado según el rol del usuario. Utiliza widgets inteligentes que se adaptan al comportamiento y prioridades del profesional.

**Componentes**:
- **Vista Ejecutiva**: Resumen de KPIs principales (clientes activos, ingresos mes actual, sesiones pendientes)
- **Agenda del Día**: Timeline con todas las actividades programadas
- **Acciones Rápidas**: Botones de acceso directo a funciones más utilizadas por el usuario
- **Notificaciones Inteligentes**: Sistema de alertas priorizadas (pagos vencidos, sesiones por confirmar, clientes sin actividad)
- **Widgets Personalizables**: Grid drag & drop para organizar información según preferencias
- **Comparativas Rápidas**: MoM y YoY de métricas clave

**Tecnología**:
- React con Context API para estado global
- Recharts para gráficos interactivos
- React Beautiful DnD para personalización de widgets
- Lazy loading de componentes

**Personalización por Plan**:
- CORE: 4 widgets fijos
- PRO: 8 widgets personalizables
- MAX: Widgets ilimitados + temas custom

---

#### 1.2 Configuración

**Descripción Detallada**: Centro de control de cuenta, perfil profesional y preferencias del sistema.

**Secciones**:

**Perfil Profesional**:
- Datos personales y profesionales
- Especialidades y certificaciones
- Foto de perfil y banner
- Bio y descripción de servicios
- Links a redes sociales
- Verificación de identidad (badge azul)

**Configuración de Cuenta**:
- Email y cambio de contraseña
- Autenticación de dos factores (2FA)
- Sesiones activas y dispositivos
- Zona horaria y localización
- Idioma de interfaz (15 idiomas disponibles)

**Preferencias de Negocio**:
- Moneda principal y secundaria
- Formatos de fecha y hora
- Unidades de medida (kg/lb, cm/in)
- Datos fiscales (RFC/RUT/CUIT, régimen tributario)

**Notificaciones**:
- Configuración granular por canal (email, SMS, push, WhatsApp)
- Horarios de no molestar
- Frecuencia de resúmenes
- Tipos de notificaciones activas

**Privacidad y Datos**:
- Consentimientos GDPR
- Exportar todos los datos
- Eliminar cuenta
- Historial de actividad

---

#### 1.3 Panel de Control (Dashboard Ejecutivo)

**Descripción Detallada**: Analytics en tiempo real del negocio con KPIs accionables y comparativas temporales.

**Métricas Principales**:

**Clientes**:
- Total clientes activos vs inactivos
- Nuevos clientes del mes
- Tasa de retención (mensual/anual)
- Churn rate
- Net Promoter Score (NPS) promedio

**Financiero**:
- Ingresos del mes (actual vs objetivo)
- Desglose por producto/servicio
- MRR (Monthly Recurring Revenue)
- Pagos pendientes
- Proyección fin de mes

**Operacional**:
- Sesiones realizadas vs programadas
- Tasa de asistencia
- Horas facturadas
- Capacidad utilizada

**Gráficos Interactivos**:
- Evolución de ingresos (últimos 12 meses)
- Distribución de clientes por plan
- Fuentes de captación de leads
- Productos más vendidos
- Heatmap de sesiones por día/hora

**Filtros Disponibles**:
- Rango de fechas personalizado
- Por sede (Studio Max)
- Por coach/entrenador
- Por categoría de cliente

---

#### 1.4 Asistente de Onboarding

**Descripción Detallada**: Wizard interactivo que guía la configuración inicial del sistema en 5 pasos simples.

**Flujo de Onboarding**:

**Paso 1: Bienvenida y Perfil**
- Video de bienvenida (2 min)
- Completar perfil profesional
- Selección de especialidad principal
- Tipo de negocio (solo, equipo, gimnasio, club)

**Paso 2: Configuración de Negocio**
- Datos fiscales básicos
- Moneda y zona horaria
- Horarios de operación
- Servicios que ofreces (checklist)

**Paso 3: Importar Datos Existentes**
- ¿Vienes de otro sistema? (Trainerize, Excel, etc.)
- Upload de archivo CSV/Excel
- Mapeo asistido de campos
- Preview antes de importar
- Opción de omitir

**Paso 4: Personalización Visual**
- Selección de tema (claro/oscuro)
- Color primario de marca
- Upload de logo
- Preview del resultado

**Paso 5: Tour Guiado**
- Tutorial interactivo de 10 minutos
- Tooltips contextuales
- Videos de funciones principales
- Checklist de primeros pasos

**Progreso Guardado**: El wizard se puede pausar y retomar en cualquier momento.

---

#### 1.5 Centro de Ayuda

**Descripción Detallada**: Base de conocimientos completa con múltiples formatos de contenido y soporte integrado.

**Estructura**:

**Base de Conocimientos**:
- 200+ artículos organizados por categorías
- Búsqueda semántica con IA
- Artículos relacionados sugeridos
- Rating de utilidad
- Comentarios y preguntas

**Categorías Principales**:
- Primeros pasos
- Gestión de clientes
- Programación de entrenamientos
- Facturación y cobros
- Marketing y ventas
- Integraciones
- Troubleshooting

**Video Tutoriales**:
- 50+ videos HD
- Transcripciones automáticas
- Marcadores de tiempo
- Playlists por tema
- Velocidad ajustable

**FAQs Dinámicas**:
- Preguntas más frecuentes
- Actualizadas según consultas reales
- Respuestas expandibles
- Videos explicativos incrustados

**Soporte en Vivo**:
- Chat en vivo (horario laboral)
- Bot de IA 24/7 para consultas básicas
- Sistema de tickets para problemas técnicos
- SLA de respuesta según plan:
  - CORE/PRO: 24-48h
  - MAX: 12-24h
  - ELITE: 4-8h
  - Enterprise: 1-4h

**Comunidad**:
- Foro de usuarios
- Casos de éxito
- Ideas y sugerencias
- Votación de nuevas features

---

#### 1.6 Importador de Datos

**Descripción Detallada**: Sistema robusto de migración desde hojas de cálculo y plataformas competidoras.

**Fuentes Soportadas**:

**Archivos**:
- Excel (.xlsx, .xls)
- CSV
- Google Sheets (link directo)
- JSON

**Plataformas Competidoras**:
- Trainerize
- TrueCoach
- MyFitnessPal
- My PT Hub
- TrainHeroic
- Fitbot

**Proceso de Importación**:

1. **Selección de Fuente**
   - Upload de archivo o conexión a plataforma
   - Detección automática de formato

2. **Mapeo de Campos**
   - Matching inteligente con IA
   - Vista previa de mapeo
   - Campos custom mapeables
   - Validación de tipos de dato

3. **Limpieza de Datos**
   - Detección de duplicados
   - Corrección de formatos
   - Validación de emails/teléfonos
   - Normalización de datos

4. **Configuración de Importación**
   - ¿Qué hacer con duplicados? (actualizar/ignorar/crear nuevo)
   - Asignación a categorías
   - Tags automáticos

5. **Preview y Confirmación**
   - Muestra de 10 registros
   - Resumen de importación
   - Estimación de tiempo

6. **Importación**
   - Barra de progreso en tiempo real
   - Procesamiento en background
   - Notificación al completar
   - Log de errores si los hay

**Historial de Importaciones**:
- Fecha y hora
- Archivo origen
- Registros importados/fallidos
- Posibilidad de revertir
- Exportar log de errores

---

#### 1.7 Integraciones Esenciales

**Descripción Detallada**: Hub centralizado de conexiones con servicios externos para extender funcionalidades.

**Categorías de Integraciones**:

**Pagos**:
- Stripe (tarjetas, ACH)
- PayPal
- Mercado Pago (Latam)
- Conekta (México)
- Square
- Authorize.net

**Calendarios**:
- Google Calendar (bidireccional)
- Outlook Calendar
- Apple Calendar (iCal)

**Videollamadas** (Solo Pro/Max):
- Zoom
- Google Meet
- Microsoft Teams
- Propio sistema nativo

**Marketing**:
- Mailchimp
- SendGrid
- Twilio (SMS)
- WhatsApp Business API

**Contabilidad**:
- QuickBooks
- Xero
- Contabilium (Latam)
- Wave

**Wearables** (Solo Max):
- Apple Health
- Google Fit
- Fitbit
- Garmin Connect
- Whoop
- Oura Ring
- Strava

**Redes Sociales**:
- Instagram (publicación automática)
- Facebook Pages
- TikTok
- YouTube

**Productividad**:
- Zapier (1000+ apps)
- Make (Integromat)
- Slack
- Trello

**Proceso de Conexión**:
1. Seleccionar integración
2. OAuth seguro (no guardamos credenciales)
3. Configuración de permisos
4. Testing de conexión
5. Activación

**Gestión de Integraciones**:
- Estado de conexión (activa/inactiva)
- Última sincronización
- Logs de actividad
- Reconectar si hay error
- Desconectar

---

### MÓDULO 2: CRM & Gestión de Clientes

**Objetivo**: Sistema completo de gestión de relaciones con clientes optimizado para el sector fitness.

#### 2.1 Clientes - Listado

**Descripción Detallada**: Vista maestra de todos los clientes con filtros avanzados y acciones masivas.

**Vistas Disponibles**:

**Vista de Lista** (tabla):
- Columnas configurables
- Ordenamiento por cualquier campo
- Búsqueda en vivo
- Selección múltiple
- Exportación a Excel/CSV/PDF

**Vista de Tarjetas** (cards):
- Grid responsivo
- Foto, nombre, plan activo
- Estado de pago
- Última actividad
- Acciones rápidas

**Vista de Kanban**:
- Etapas del customer journey
- Drag & drop entre estados
- Contadores por columna

**Filtros Avanzados**:

**Por Estado**:
- Activos
- Inactivos
- En prueba
- Morosos
- Congelados

**Por Plan**:
- Filtrar por producto/servicio
- Por rango de precio
- Por duración de contrato

**Por Actividad**:
- Últimos 7/30/90 días
- Sin actividad en X días
- Asistencia >70%
- Asistencia <30%

**Por Datos Demográficos**:
- Edad (rangos)
- Género
- Ubicación
- Fecha de inicio

**Por Etiquetas**:
- Tags personalizados
- Múltiples tags simultáneos
- Combinación AND/OR

**Búsqueda Avanzada**:
- Por nombre, email, teléfono, ID
- Búsqueda difusa (tolera errores)
- Por notas del cliente
- Por servicios contratados

**Acciones Masivas**:
- Enviar mensaje (email/SMS/WhatsApp)
- Cambiar estado
- Asignar tag
- Exportar selección
- Asignar a miembro del equipo
- Cambiar plan

**Métricas Rápidas** (panel superior):
- Total clientes activos
- Nuevos este mes
- Churn este mes
- Revenue total mensual

---

#### 2.2 Cliente - Detalle

**Descripción Detallada**: Vista 360° del cliente con toda su información en una interfaz unificada tipo CRM profesional.

**Estructura de Pestañas**:

**1. Resumen**:

**Header del Cliente**:
- Foto de perfil
- Nombre completo y edad
- Tags de estado (activo, moroso, VIP, etc.)
- Antigüedad como cliente
- Plan actual y próxima renovación
- Acciones rápidas (mensaje, programar sesión, cobrar)

**Datos Personales**:
- Email, teléfono, dirección
- Fecha de nacimiento
- Género
- Contacto de emergencia
- Botón para editar

**Información Médica**:
- Condiciones pre-existentes
- Lesiones actuales/pasadas
- Medicamentos
- Alergias
- Certificado médico (PDF adjunto)
- Fecha de último chequeo

**Objetivos**:
- Objetivo principal (bajar peso, ganar músculo, rendimiento)
- Objetivo secundarios
- Meta numérica (ej: llegar a 75kg)
- Fecha objetivo
- Progreso actual (%)

**Métricas de Salud**:
- Peso actual y objetivo
- IMC
- % grasa corporal
- Circunferencias (pecho, cintura, cadera, brazos, piernas)
- Gráfico de evolución de peso
- Fotos de progreso (galería before/after)

**2. Actividad**:

**Timeline Completo**:
- Todas las interacciones ordenadas cronológicamente
- Sesiones realizadas
- Pagos efectuados
- Mensajes intercambiados
- Planes asignados
- Notas agregadas
- Filtros por tipo de actividad

**Próximas Actividades**:
- Sesiones programadas
- Pagos pendientes
- Tareas asignadas
- Recordatorios

**3. Entrenamientos**:

**Planes Activos**:
- Entrenamientos asignados actuales
- Semana actual
- Adherencia (sesiones completadas/totales)
- Última sesión realizada

**Historial de Entrenamientos**:
- Todos los planes anteriores
- Búsqueda por fecha
- Ver detalles de cada sesión
- Feedback del cliente
- Fotos/videos de ejercicios

**Progresión de Cargas**:
- Gráficos de progreso por ejercicio
- PRs (personal records)
- Volumen total por semana
- Intensidad promedio

**Crear Nuevo**:
- Botón para asignar nuevo plan
- Desde plantilla o desde cero

**4. Nutrición**:

**Dietas Activas**:
- Planes nutricionales vigentes
- Adherencia diaria/semanal
- Registro fotográfico de comidas
- Macros consumidos vs objetivo

**Historial Nutricional**:
- Planes anteriores
- Evolución de peso
- Cambios en composición corporal
- Notas del nutricionista

**Calculadoras**:
- Recalcular TMB/TDEE
- Ajuste de macros
- Hidratación necesaria

**5. Finanzas**:

**Resumen Financiero**:
- Total facturado (lifetime)
- Deuda actual
- Último pago
- Próximo pago programado
- LTV (valor de vida estimado)

**Historial de Pagos**:
- Todas las transacciones
- Facturas emitidas (descargables)
- Método de pago utilizado
- Estado de cada pago

**Productos/Servicios Activos**:
- Planes vigentes
- Fecha de inicio y fin
- Precio y frecuencia
- Auto-renovación (sí/no)

**Acciones**:
- Crear nueva factura
- Registrar pago manual
- Enviar recordatorio de pago
- Aplicar descuento
- Congelar membresía

**6. Mensajes**:

**Conversación Completa**:
- Chat unificado (email, SMS, WhatsApp)
- Burbujas estilo mensajería
- Adjuntar archivos
- Enviar plan de entrenamiento/dieta
- Respuestas rápidas (templates)
- Agendar envío
- Historial completo

**7. Documentos**:

**Archivos del Cliente**:
- Contratos firmados
- Certificados médicos
- Fotos de progreso
- Estudios de laboratorio
- Consentimientos
- Facturas
- Organización por carpetas
- Upload drag & drop
- Previsualizador de PDFs/imágenes

**8. Notas**:

**Sistema de Notas**:
- Notas privadas del entrenador
- Notas compartidas con equipo
- Categorización (médica, entrenamiento, nutrición, administrativa)
- Editor rico (negrita, listas, etc.)
- Menciones a otros miembros del equipo
- Fijadas vs normales
- Búsqueda en notas

---

#### 2.3 Leads - Gestión de Prospectos

**Descripción Detallada**: Pipeline de ventas visual tipo CRM para convertir prospectos en clientes.

**Vista de Pipeline** (Kanban):

**Etapas Configurables** (ejemplo):
1. **Nuevo Lead** (contacto inicial recibido)
2. **Calificado** (se identificó necesidad y presupuesto)
3. **Propuesta Enviada** (se envió plan y precio)
4. **Seguimiento** (en negociación)
5. **Ganado** (se convirtió en cliente)
6. **Perdido** (no se concretó - motivo)

**Tarjeta de Lead**:
- Nombre y datos de contacto
- Fuente de origen (Instagram, Facebook Ad, referido, etc.)
- Temperatura (🔥 caliente, 🌤️ tibio, ❄️ frío)
- Servicios de interés
- Presupuesto estimado
- Última interacción
- Próxima acción
- Responsable asignado
- Tiempo en esta etapa

**Acciones Rápidas en Tarjeta**:
- Mover a siguiente etapa (drag & drop)
- Enviar mensaje
- Programar follow-up
- Marcar como ganado/perdido
- Ver detalle completo

**Métricas de Pipeline**:
- Total leads en cada etapa
- Valor potencial por etapa
- Tasa de conversión entre etapas
- Velocidad promedio del pipeline
- Leads ganados/perdidos este mes

**Filtros**:
- Por fuente de origen
- Por responsable
- Por rango de fechas
- Por temperatura
- Por servicios de interés

**Vista de Lista**:
- Tabla con todos los leads
- Ordenamiento por cualquier columna
- Exportación

**Lead Scoring Automático**:
- Puntuación 0-100 por lead
- Basado en:
  - Engagement (abre emails, responde rápido)
  - Presupuesto declarado
  - Servicios de interés (alto/bajo ticket)
  - Fuente de origen (calidad histórica)
  - Nivel de urgencia
- Los leads con mayor score aparecen primero

---

#### 2.4 Lead - Detalle

**Descripción Detallada**: Ficha completa del prospecto con toda la información para cerrar la venta.

**Información del Lead**:
- Datos personales completos
- Origen y cómo nos conoció
- Fuente de captación (con UTMs si aplica)
- Primera interacción (fecha y canal)
- Clasificación de temperatura

**Necesidades y Objetivos**:
- ¿Qué busca conseguir?
- Problemas que quiere resolver
- Experiencia previa (principiante/intermedio/avanzado)
- Disponibilidad horaria
- Preferencias (presencial/online)

**Información de Venta**:
- Presupuesto declarado
- Productos/servicios de interés
- Objeciones identificadas
- Nivel de urgencia
- Probabilidad de cierre (%)

**Historial de Interacciones**:
- Timeline completo de comunicaciones
- Emails enviados/abiertos
- Llamadas realizadas
- WhatsApps intercambiados
- Reuniones programadas

**Próximas Acciones**:
- Siguiente follow-up programado
- Tipo de acción (llamada, email, reunión)
- Recordatorio automático
- Responsable asignado

**Notas del Equipo**:
- Observaciones de cada interacción
- Insights capturados
- Comentarios compartidos

**Propuesta Comercial**:
- Productos/servicios propuestos
- Precio ofrecido
- Descuentos aplicados
- Propuesta formal (PDF descargable)
- Estado (enviada, vista, aceptada, rechazada)

**Convertir a Cliente**:
- Botón de conversión rápida
- Crea automáticamente:
  - Registro de cliente
  - Primera factura
  - Onboarding automático
- Mueve el lead a "Ganado"

**Marcar como Perdido**:
- Motivo de pérdida (categorizado)
- Notas adicionales
- Opción de agregar a campaña de nurturing
- Reactivación automática en X meses

---

#### 2.5 Bandeja de Entrada Unificada

**Descripción Detallada**: Centro de comunicaciones que consolida todos los canales en una interfaz tipo Gmail.

**Canales Soportados**:
- Email
- SMS
- WhatsApp Business
- Mensajes in-app
- Comentarios en redes sociales (Instagram/Facebook DMs)

**Interfaz**:

**Panel Izquierdo - Carpetas**:
- Recibidos (inbox)
- Enviados
- Borradores
- Spam
- Archivados
- Etiquetas personalizadas
- Contadores de no leídos

**Panel Central - Lista de Conversaciones**:
- Orden cronológico (más reciente arriba)
- Preview del último mensaje
- Indicador de canal (icono)
- Estado de lectura
- Estrella para marcar importante
- Checkbox para selección múltiple
- Búsqueda en vivo

**Panel Derecho - Conversación**:
- Vista de chat con burbujas
- Diferenciación visual emisor/receptor
- Timestamps
- Estados de WhatsApp (enviado/recibido/leído)
- Adjuntos con preview
- Links clickeables
- Respuesta rápida en la parte inferior

**Características Avanzadas**:

**Respuestas Rápidas**:
- Templates guardados
- Variables dinámicas (nombre, plan, próxima sesión)
- Categorización por tipo
- Atajos de teclado
- Personalización antes de enviar

**Asignación de Conversaciones**:
- Asignar a miembro del equipo
- Notificación al asignado
- Filtro "Mis conversaciones"
- Estados (pendiente, en progreso, resuelto)

**Automatizaciones**:
- Respuestas automáticas fuera de horario
- Auto-respuesta a preguntas frecuentes
- Chatbot integrado para consultas básicas
- Escalamiento a humano cuando sea necesario

**Integración con CRM**:
- Reconocimiento automático de cliente/lead
- Contexto lateral (plan, deuda, próxima sesión)
- Acciones rápidas (crear tarea, nota, factura)

**Programación de Mensajes**:
- Escribir y programar envío futuro
- Ideal para campañas
- Zona horaria del destinatario

**Adjuntos**:
- Drag & drop
- Hasta 25MB por archivo
- Previsualizador de imágenes/PDFs
- Envío de planes de entrenamiento/dieta directo

**Búsqueda**:
- Por cliente
- Por contenido del mensaje
- Por rango de fechas
- Por canal
- Por estado (leído/no leído)

---

Debido a la extensión del documento, voy a continuar con los siguientes módulos. ¿Quieres que continúe ampliando TODOS los módulos de CREATOR, STUDIO y TEAMS con este nivel de detalle, o prefieres que lo ajuste a un nivel medio de detalle para que el documento sea más manejable?

También puedo dividirlo en múltiples archivos si prefieres.