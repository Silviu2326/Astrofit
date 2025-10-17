import React, { useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import InicioPage from '../../features/core/inicio/InicioPage';
import PanelControlPage from '../../features/core/panel-control/PanelControlPage';
import AsistenteOnboardingPage from '../../features/core/asistente-onboarding/AsistenteOnboardingPage';
import CentroAyudaPage from '../../features/core/centro-ayuda/CentroAyudaPage';
import ImportadorDatosPage from '../../features/core/importador-datos/ImportadorDatosPage';
import IntegracionesEsencialesPage from '../../features/core/integraciones-esenciales/IntegracionesEsencialesPage';
import ConfiguracionPage from '../../features/core/configuracion/ConfiguracionPage';
import { PerfilPage } from '../../features/core/perfil/PerfilPage';
import { BandejaEntradaPage } from '../../features/crm/crm/bandeja-entrada/BandejaEntradaPage';
import ClientesListadoPage from '../../features/crm/crm/clientes-listado/ClientesListadoPage';
import ClienteDetallePage from '../../features/crm/crm/cliente-detalle/ClienteDetallePage';
import LeadsListadoPage from '../../features/crm/crm/leads-listado/LeadsListadoPage';
import LeadDetallePage from '../../features/crm/crm/lead-detalle/LeadDetallePage';
import NotasPage from '../../features/crm/crm/notas/NotasPage';
import SegmentosPage from '../../features/crm/crm/segmentos/SegmentosPage';
import TareasPage from '../../features/crm/crm/tareas/TareasPage';
import CalendarioPage from '../../features/crm/crm/calendario/CalendarioPage';
import AgenteEntrenadorPage from '../../features/agents/agente-entrenador/AgenteEntrenadorPage';
import AgenteFinancieroPage from '../../features/agents/agente-financiero/AgenteFinancieroPage';
import AgenteMarketingPage from '../../features/agents/agente-marketing/AgenteMarketingPage';
import BibliotecaEjerciciosPage from '../../features/training/training/biblioteca-ejercicios/BibliotecaEjerciciosPage';
import EditorEjercicioPage from '../../features/training/training/editor-ejercicio/EditorEjercicioPage';
import PlantillasEntrenosPage from '../../features/training/training/plantillas-entrenos/PlantillasEntrenosPage';
import EntrenamientosListadoPage from '../../features/training/training/entrenamientos-listado/EntrenamientosListadoPage';
import NuevoEntrenamientoPage from '../../features/training/training/nuevo-entrenamiento/NuevoEntrenamientoPage';
import EntrenamientoEdicionPage from '../../features/training/training/entrenamiento-edicion/EntrenamientoEdicionPage';
import CalculadorasFuerzaPage from '../../features/training/training/calculadoras-fuerza/CalculadorasFuerzaPage';
import PlantillasDietasPage from '../../features/nutrition/nutrition/plantillas-dietas/PlantillasDietasPage';
import DietasListadoPage from '../../features/nutrition/nutrition/dietas-listado/DietasListadoPage';
import DietaNuevaPage from '../../features/nutrition/nutrition/dieta-nueva/DietaNuevaPage';
import DietaEditarPage from '../../features/nutrition/nutrition/dieta-editar/DietaEditarPage';
import DietaEdicionPage from '../../features/nutrition/nutrition/dieta-edicion/DietaEdicionPage';
import RecetasBibliotecaPage from '../../features/nutrition/nutrition/recetas-biblioteca/RecetasBibliotecaPage';
import RecetaNuevaPage from '../../features/nutrition/nutrition/receta-nueva/RecetaNuevaPage';
import RecetaEditarPage from '../../features/nutrition/nutrition/receta-editar/RecetaEditarPage';
import CalculadorasNutricionalesPage from '../../features/nutrition/nutrition/calculadoras-nutricionales/CalculadorasNutricionalesPage';
import AdherenciaNutricionalPage from '../../features/nutrition/nutrition/adherencia-nutricional/AdherenciaNutricionalPage';
import DerivacionesNutricionPage from '../../features/nutrition/nutrition/derivaciones-nutricion/DerivacionesNutricionPage';
import PanelFinancieroPage from '../../features/finance/finance/panel-financiero/PanelFinancieroPage';
import CobrosFacturacionPage from '../../features/finance/finance/cobros-facturacion/CobrosFacturacionPage';
import ConciliacionPagosPage from '../../features/finance/finance/conciliacion-pagos/ConciliacionPagosPage';
import GastosPage from '../../features/finance/finance/gastos/GastosPage';
import ImpuestosPage from '../../features/finance/finance/impuestos/ImpuestosPage';
import ExportarContabilidadPage from '../../features/finance/finance/exportar-contabilidad/ExportarContabilidadPage';
import ProductosServiciosPage from '../../features/finance/finance/productos-servicios/ProductosServiciosPage';
import PlanesPreciosPage from '../../features/finance/finance/planes-precios/PlanesPreciosPage';
import CuponesPage from '../../features/finance/finance/cupones/CuponesPage';
import CampanasPage from '../../features/marketing/marketing/campanas/CampanasPage';
import FuentesLeadPage from '../../features/marketing/marketing/fuentes-lead/FuentesLeadPage';
import ReferidosPage from '../../features/marketing/marketing/referidos/ReferidosPage';
import EncuestasNpsPage from '../../features/marketing/marketing/encuestas-nps/EncuestasNpsPage';
import OpinionesResenasPage from '../../features/marketing/marketing/opiniones-resenas/OpinionesResenasPage';
import PlantillasComunicacionPage from '../../features/marketing/marketing/plantillas-comunicacion/PlantillasComunicacionPage';
import WidgetCaptacionPage from '../../features/marketing/marketing/widget-captacion/WidgetCaptacionPage';
// Plan Solo Pro imports
import LandingServiciosPage from '../../features/plansolopro/micrositio/micrositio/landing-servicios/LandingServiciosPage';
import CalendarioPublicoPage from '../../features/plansolopro/micrositio/micrositio/calendario-publico/CalendarioPublicoPage';
import PaginaReservaPage from '../../features/plansolopro/micrositio/micrositio/pagina-reserva/PaginaReservaPage';
import TestimoniosClientesPage from '../../features/plansolopro/micrositio/micrositio/testimonios-clientes/TestimoniosClientesPage';
import BlogNoticiasPage from '../../features/plansolopro/micrositio/micrositio/blog-noticias/BlogNoticiasPage';
import ListadoHabitosPage from '../../features/plansolopro/habitos-avanzados/habitos-avanzados/listado-habitos/ListadoHabitosPage';
import CrearHabitoPage from '../../features/plansolopro/habitos-avanzados/habitos-avanzados/crear-habito/CrearHabitoPage';
import EstadisticasHabitosPage from '../../features/plansolopro/habitos-avanzados/habitos-avanzados/estadisticas-habitos/EstadisticasHabitosPage';
import RetosHabitosPage from '../../features/plansolopro/habitos-avanzados/habitos-avanzados/retos-habitos/RetosHabitosPage';
import VideollamadaSalaPage from '../../features/plansolopro/tele-sesiones/tele-sesiones/videollamada-sala/VideollamadaSalaPage';
import GrabacionesSesionesPage from '../../features/plansolopro/tele-sesiones/tele-sesiones/grabaciones-sesiones/GrabacionesSesionesPage';
import ChatSesionPage from '../../features/plansolopro/tele-sesiones/tele-sesiones/chat-sesion/ChatSesionPage';
import NotasSesionPage from '../../features/plansolopro/tele-sesiones/tele-sesiones/notas-sesion/NotasSesionPage';
import ListadoCuponesPage from '../../features/plansolopro/cupones-avanzados/cupones-avanzados/listado-cupones/ListadoCuponesPage';
import CrearCuponPage from '../../features/plansolopro/cupones-avanzados/cupones-avanzados/crear-cupon/CrearCuponPage';
import ReportesUsoPage from '../../features/plansolopro/cupones-avanzados/cupones-avanzados/reportes-uso/ReportesUsoPage';
import CustomerJourneyPage from '../../features/plansolopro/recorrido-cliente/recorrido-cliente/customer-journey/CustomerJourneyPage';
import HitosClientesPage from '../../features/plansolopro/recorrido-cliente/recorrido-cliente/hitos-clientes/HitosClientesPage';
import AlertasRetencionPage from '../../features/plansolopro/recorrido-cliente/recorrido-cliente/alertas-retencion/AlertasRetencionPage';
// Plan Solo Max imports
import AnaliticaIngresosPage from '../../features/plansolomax/analytics-avanzadas/analytics-avanzadas/analitica-ingresos/AnaliticaIngresosPage';
import CohortesClientesPage from '../../features/plansolomax/analytics-avanzadas/analytics-avanzadas/cohortes-clientes/CohortesClientesPage';
import LtvClientesPage from '../../features/plansolomax/analytics-avanzadas/analytics-avanzadas/ltv-clientes/LtvClientesPage';
import RetencionClientesPage from '../../features/plansolomax/analytics-avanzadas/analytics-avanzadas/retencion-clientes/RetencionClientesPage';
import CrearFlujoPage from '../../features/plansolomax/automatizaciones/automatizaciones/crear-flujo/CrearFlujoPage';
import HistorialFlujosPage from '../../features/plansolomax/automatizaciones/automatizaciones/historial-flujos/HistorialFlujosPage';
import LibreriaPlantillasPage from '../../features/plansolomax/automatizaciones/automatizaciones/libreria-plantillas/LibreriaPlantillasPage';
import ListadoAutomatizacionesPage from '../../features/plansolomax/automatizaciones/automatizaciones/listado-automatizaciones/ListadoAutomatizacionesPage';
import ConstructorVisual from '../../features/constructor-visual/components/ConstructorVisual';
import PersonalizacionAppClientePage from '../../features/plansolomax/branding/branding/personalizacion-app-cliente/PersonalizacionAppClientePage';
import PersonalizacionDominioPage from '../../features/plansolomax/branding/branding/personalizacion-dominio/PersonalizacionDominioPage';
import PersonalizacionEstilosPage from '../../features/plansolomax/branding/branding/personalizacion-estilos/PersonalizacionEstilosPage';
import ConfiguracionUpsellsPage from '../../features/plansolomax/upsells/upsells/configuracion-upsells/ConfiguracionUpsellsPage';
import ConversionReportPage from '../../features/plansolomax/upsells/upsells/conversion-report/ConversionReportPage';
import SugerenciasProductosPage from '../../features/plansolomax/upsells/upsells/sugerencias-productos/SugerenciasProductosPage';
import DispositivosConectadosPage from '../../features/plansolomax/wearables/wearables/dispositivos-conectados/DispositivosConectadosPage';
import PanelDatosWearablesPage from '../../features/plansolomax/wearables/wearables/panel-datos-wearables/PanelDatosWearablesPage';
import ReportesRendimientoPage from '../../features/plansolomax/wearables/wearables/reportes-rendimiento/ReportesRendimientoPage';
// Plan Creator Pro imports
import BuscadorContenidosPage from '../../features/plancreatorpro/biblioteca-contenidos/biblioteca-contenidos/buscador-contenidos/BuscadorContenidosPage';
import ContenidosVideoPage from '../../features/plancreatorpro/biblioteca-contenidos/biblioteca-contenidos/contenidos-video/ContenidosVideoPage';
import ContenidosArticulosPage from '../../features/plancreatorpro/biblioteca-contenidos/biblioteca-contenidos/contenidos-articulos/ContenidosArticulosPage';
import ContenidosDescargablesPage from '../../features/plancreatorpro/biblioteca-contenidos/biblioteca-contenidos/contenidos-descargables/ContenidosDescargablesPage';
import FeedComunidadPage from '../../features/plancreatorpro/comunidad/comunidad/feed-comunidad/FeedComunidadPage';
import GruposComunidadPage from '../../features/plancreatorpro/comunidad/comunidad/grupos-comunidad/GruposComunidadPage';
import ModeracionComunidadPage from '../../features/plancreatorpro/comunidad/comunidad/moderacion-comunidad/ModeracionComunidadPage';
import RankingActividadPage from '../../features/plancreatorpro/comunidad/comunidad/ranking-actividad/RankingActividadPage';
import ListadoCursosPage from '../../features/plancreatorpro/cursos-online/cursos-online/listado-cursos/ListadoCursosPage';
import CrearCursoPage from '../../features/plancreatorpro/cursos-online/cursos-online/crear-curso/CrearCursoPage';
import CursoDetallePage from '../../features/plancreatorpro/cursos-online/cursos-online/curso-detalle/CursoDetallePage';
import GestionLeccionesPage from '../../features/plancreatorpro/cursos-online/cursos-online/gestion-lecciones/GestionLeccionesPage';
import QuizzesEvaluacionesPage from '../../features/plancreatorpro/cursos-online/cursos-online/quizzes-evaluaciones/QuizzesEvaluacionesPage';
import ListadoEmailsPage from '../../features/plancreatorpro/email-broadcast/email-broadcast/listado-emails/ListadoEmailsPage';
import CrearEmailPage from '../../features/plancreatorpro/email-broadcast/email-broadcast/crear-email/CrearEmailPage';
import PlantillasEmailPage from '../../features/plancreatorpro/email-broadcast/email-broadcast/plantillas-email/PlantillasEmailPage';
import ReportesEnvioPage from '../../features/plancreatorpro/email-broadcast/email-broadcast/reportes-envio/ReportesEnvioPage';
import ListadoMembresiasPage from '../../features/plancreatorpro/membresias/membresias/listado-membresias/ListadoMembresiasPage';
import PaginaMembresiaPage from '../../features/plancreatorpro/membresias/membresias/pagina-membresia/PaginaMembresiaPage';
import BeneficiosMembresiPage from '../../features/plancreatorpro/membresias/membresias/beneficios-membresia/BeneficiosMembresiPage';
import PagosMembresiPage from '../../features/plancreatorpro/membresias/membresias/pagos-membresia/PagosMembresiPage';
// Plan Creator Max imports
import ConfiguracionAppPage from '../../features/plancreatormax/app-white-label/app-white-label/configuracion-app/ConfiguracionAppPage';
import VistaPreviewAppPage from '../../features/plancreatormax/app-white-label/app-white-label/vista-preview-app/VistaPreviewAppPage';
import PersonalizacionPushPage from '../../features/plancreatormax/app-white-label/app-white-label/personalizacion-push/PersonalizacionPushPage';
import FlujosRetencionPage from '../../features/plancreatormax/automatizaciones-engagement/automatizaciones-engagement/flujos-retencion/FlujosRetencionPage';
import MensajesPersonalizadosPage from '../../features/plancreatormax/automatizaciones-engagement/automatizaciones-engagement/mensajes-personalizados/MensajesPersonalizadosPage';
import ReactivacionClientesPage from '../../features/plancreatormax/automatizaciones-engagement/automatizaciones-engagement/reactivacion-clientes/ReactivacionClientesPage';
import ListadoAfiliadosPage from '../../features/plancreatormax/sistema-afiliados/sistema-afiliados/listado-afiliados/ListadoAfiliadosPage';
import PanelComisionesPage from '../../features/plancreatormax/sistema-afiliados/sistema-afiliados/panel-comisiones/PanelComisionesPage';
import PagosAfiliadosPage from '../../features/plancreatormax/sistema-afiliados/sistema-afiliados/pagos-afiliados/PagosAfiliadosPage';
import RecursosAfiliadosPage from '../../features/plancreatormax/sistema-afiliados/sistema-afiliados/recursos-afiliados/RecursosAfiliadosPage';
import ExperimentosPage from '../../features/plancreatormax/tests-ab/tests-ab/experimentos/ExperimentosPage';
import ResultadosTestPage from '../../features/plancreatormax/tests-ab/tests-ab/resultados-test/ResultadosTestPage';
import HistorialExperimentosPage from '../../features/plancreatormax/tests-ab/tests-ab/historial-experimentos/HistorialExperimentosPage';
import CatalogoProductosPage from '../../features/plancreatormax/tienda-merchandising/tienda-merchandising/catalogo-productos/CatalogoProductosPage';
import ConfiguracionTiendaPage from '../../features/plancreatormax/tienda-merchandising/tienda-merchandising/configuracion-tienda/ConfiguracionTiendaPage';
import PedidosClientesPage from '../../features/plancreatormax/tienda-merchandising/tienda-merchandising/pedidos-clientes/PedidosClientesPage';
import InformesVentasPage from '../../features/plancreatormax/tienda-merchandising/tienda-merchandising/informes-ventas/InformesVentasPage';
// Plan Studio Pro imports
import EscanerEntradaPage from '../../features/planstudiopro/check-in-qr/escaner-entrada/EscanerEntradaPage';
import PasesVirtualesPage from '../../features/planstudiopro/check-in-qr/pases-virtuales/PasesVirtualesPage';
import HistorialAsistenciasPage from '../../features/planstudiopro/check-in-qr/historial-asistencias/HistorialAsistenciasPage';
import CalendarioClasesPage from '../../features/planstudiopro/gestion-clases/gestion-clases/CalendarioClasesPage';
import ReservasClasePage from '../../features/planstudiopro/gestion-clases/reservas-clase/ReservasClasePage';
import GestionCoachPage from '../../features/planstudiopro/gestion-clases/gestion-coach/GestionCoachPage';
import ReportesAsistenciaPage from '../../features/planstudiopro/gestion-clases/reportes-asistencia/ReportesAsistenciaPage';
import ListadoPasesPage from '../../features/planstudiopro/pases-contratos/listado-pases/ListadoPasesPage';
import CrearContratoPage from '../../features/planstudiopro/pases-contratos/crear-contrato/CrearContratoPage';
import RenovacionesPage from '../../features/planstudiopro/pases-contratos/renovaciones/RenovacionesPage';
import VentasRapidasPage from '../../features/planstudiopro/pos-ligero/ventas-rapidas/VentasRapidasPage';
import TicketsDiariosPage from '../../features/planstudiopro/pos-ligero/tickets-diarios/TicketsDiariosPage';
import CajaDiariaPage from '../../features/planstudiopro/pos-ligero/caja-diaria/CajaDiariaPage';
import WodDiaPage from '../../features/planstudiopro/whiteboard/wod-dia/WodDiaPage';
import LeaderboardPage from '../../features/planstudiopro/whiteboard/leaderboard/LeaderboardPage';
import HistorialMarcasPage from '../../features/planstudiopro/whiteboard/historial-marcas/HistorialMarcasPage';
// Plan Studio Max imports
import GestionTornosPage from '../../features/planstudiomax/control-accesos/gestion-tornos/GestionTornosPage';
import TarjetasSociosPage from '../../features/planstudiomax/control-accesos/tarjetas-socios/TarjetasSociosPage';
import ReportesAccesosPage from '../../features/planstudiomax/control-accesos/reportes-accesos/ReportesAccesosPage';
import ConveniosCorporativosPage from '../../features/planstudiomax/crm-empresas/convenios-corporativos/ConveniosCorporativosPage';
import EmpleadosSociosPage from '../../features/planstudiomax/crm-empresas/empleados-socios/EmpleadosSociosPage';
import FacturacionEmpresasPage from '../../features/planstudiomax/crm-empresas/facturacion-empresas/FacturacionEmpresasPage';
import CatalogoStockPage from '../../features/planstudiomax/inventario-avanzado/catalogo-stock/CatalogoStockPage';
import ControlPedidosPage from '../../features/planstudiomax/inventario-avanzado/control-pedidos/ControlPedidosPage';
import AlertasInventarioPage from '../../features/planstudiomax/inventario-avanzado/alertas-inventario/AlertasInventarioPage';
import InterfazClientePage from '../../features/planstudiomax/kiosko/interfaz-cliente/InterfazClientePage';
import HistorialKioskoPage from '../../features/planstudiomax/kiosko/historial-kiosko/HistorialKioskoPage';
import ListadoSedesPage from '../../features/planstudiomax/multi-sedes/listado-sedes/ListadoSedesPage';
import ComparativaSedesPage from '../../features/planstudiomax/multi-sedes/comparativa-sedes/ComparativaSedesPage';
import TransferenciasClientesPage from '../../features/planstudiomax/multi-sedes/transferencias-clientes/TransferenciasClientesPage';
// Plan Teams Pro imports
import ListaConvocatoriasPage from '../../features/planteamspro/convocatorias/lista-convocatorias/ListaConvocatoriasPage';
import GestionPlantillasConvocatoriaPage from '../../features/planteamspro/convocatorias/gestion-plantillas-convocatoria/GestionPlantillasConvocatoriaPage';
import AsistenciaEventosPage from '../../features/planteamspro/convocatorias/asistencia-eventos/AsistenciaEventosPage';
import CuestionarioDiarioPage from '../../features/planteamspro/cuestionarios-wellness/cuestionario-diario/CuestionarioDiarioPage';
import InformesSemanalesPage from '../../features/planteamspro/cuestionarios-wellness/informes-semanales/InformesSemanalesPage';
import AlertasFatigaPage from '../../features/planteamspro/cuestionarios-wellness/alertas-fatiga/AlertasFatigaPage';
import PruebasFisicasPage from '../../features/planteamspro/laboratorio-tests/pruebas-fisicas/PruebasFisicasPage';
import ResultadosHistoricosPage from '../../features/planteamspro/laboratorio-tests/resultados-historicos/ResultadosHistoricosPage';
import ComparadorResultadosPage from '../../features/planteamspro/laboratorio-tests/comparador-resultados/ComparadorResultadosPage';
import FichaAtletaPage from '../../features/planteamspro/perfiles-atletas/ficha-atleta/FichaAtletaPage';
import HistorialRendimientoPage from '../../features/planteamspro/perfiles-atletas/historial-rendimiento/HistorialRendimientoPage';
import ComparadorAtletasPage from '../../features/planteamspro/perfiles-atletas/comparador-atletas/ComparadorAtletasPage';
import CalendarioPeriodizacionPage from '../../features/planteamspro/planificacion-mesociclos/calendario-periodizacion/CalendarioPeriodizacionPage';
import PlantillasMesociclosPage from '../../features/planteamspro/planificacion-mesociclos/plantillas-mesociclos/PlantillasMesociclosPage';
import EditarMesocicloPage from '../../features/planteamspro/planificacion-mesociclos/editar-mesociclo/EditarMesocicloPage';
import ListadoRolesPage from '../../features/planteamspro/roles-equipo/listado-roles/ListadoRolesPage';
import AsignacionRolesPage from '../../features/planteamspro/roles-equipo/asignacion-roles/AsignacionRolesPage';
import PermisosEntrenadoresPage from '../../features/planteamspro/roles-equipo/permisos-entrenadores/PermisosEntrenadoresPage';
// Plan Teams Elite imports
import DashboardsEquiposPage from '../../features/planteamselite/analiticas-avanzadas/dashboards-equipos/DashboardsEquiposPage';
import ReportesRendimientoElitePage from '../../features/planteamselite/analiticas-avanzadas/reportes-rendimiento/ReportesRendimientoPage';
import ComparativasLongitudinalesPage from '../../features/planteamselite/analiticas-avanzadas/comparativas-longitudinales/ComparativasLongitudinalesPage';
import EquipoAVsBPage from '../../features/planteamselite/comparador-equipos/equipo-a-vs-b/EquipoAVsBPage';
import AnalisisPosicionPage from '../../features/planteamselite/comparador-equipos/analisis-posicion/AnalisisPosicionPage';
import ProyeccionPartidoPage from '../../features/planteamselite/comparador-equipos/proyeccion-partido/ProyeccionPartidoPage';
import TorneosPage from '../../features/planteamselite/eventos/torneos/TorneosPage';
import CampeonatosPage from '../../features/planteamselite/eventos/campeonatos/CampeonatosPage';
import ResultadosEventosPage from '../../features/planteamselite/eventos/resultados-eventos/ResultadosEventosPage';
import ListadoJugadoresPage from '../../features/planteamselite/scouting/listado-jugadores/ListadoJugadoresPage';
import EvaluacionJugadorPage from '../../features/planteamselite/scouting/evaluacion-jugador/EvaluacionJugadorPage';
import HistorialScoutingPage from '../../features/planteamselite/scouting/historial-scouting/HistorialScoutingPage';
import DispositivosConectadosElitePage from '../../features/planteamselite/sensores/dispositivos-conectados/DispositivosConectadosPage';
import DatosTiempoRealPage from '../../features/planteamselite/sensores/datos-tiempo-real/DatosTiempoRealPage';
import InformesSensoresPage from '../../features/planteamselite/sensores/informes-sensores/InformesSensoresPage';
import MensajeriaPage from '../../features/messaging/messaging/MensajeriaPage';
import DashboardEstadisticasPage from '../../features/core/dashboard-estadisticas/DashboardEstadisticasPage';

interface DashboardLayoutProps {
  onLogout: () => void;
  currentUser?: any;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ onLogout, currentUser }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true); // Siempre inicia colapsada
  const location = useLocation();

  // Extraer la ruta base sin parámetros (ej: "/dashboard/lead-detalle/123" -> "lead-detalle")
  // Removemos el prefijo /dashboard/ y luego tomamos el primer segmento
  const pathWithoutDashboard = location.pathname.replace(/^\/dashboard\/?/, '');
  const fullPath = pathWithoutDashboard || 'inicio';
  const activePage = fullPath.split('/')[0];

  const renderPage = () => {
    switch (activePage) {
      case 'inicio':
        return <InicioPage />;
      case 'configuracion':
        return <ConfiguracionPage />;
      case 'perfil':
        return <PerfilPage />;
      case 'panel-control':
        return <PanelControlPage />;
      case 'asistente-onboarding':
        return <AsistenteOnboardingPage />;
      case 'centro-ayuda':
        return <CentroAyudaPage />;
      case 'importador-datos':
        return <ImportadorDatosPage />;
      case 'integraciones-esenciales':
        return <IntegracionesEsencialesPage />;
      case 'bandeja-entrada':
        return <BandejaEntradaPage />;
      case 'clientes-listado':
        return <ClientesListadoPage />;
      case 'cliente-detalle':
        return <ClienteDetallePage />;
      case 'leads-listado':
        return <LeadsListadoPage />;
      case 'lead-detalle':
        return <LeadDetallePage />;
      case 'notas':
        return <NotasPage />;
      case 'segmentos':
        return <SegmentosPage />;
      case 'tareas':
        return <TareasPage />;
      case 'calendario':
        return <CalendarioPage />;
      case 'agente-entrenador':
        return <AgenteEntrenadorPage />;
      case 'agente-financiero':
        return <AgenteFinancieroPage />;
      case 'agente-marketing':
        return <AgenteMarketingPage />;
      case 'biblioteca-ejercicios':
        return <BibliotecaEjerciciosPage />;
      case 'editor-ejercicio':
        return <EditorEjercicioPage />;
      case 'plantillas-entrenos':
        return <PlantillasEntrenosPage />;
      case 'entrenamientos-listado':
        return <EntrenamientosListadoPage />;
      case 'nuevo-entrenamiento':
        return <NuevoEntrenamientoPage />;
      case 'calculadoras-fuerza':
        return <CalculadorasFuerzaPage />;
      case 'plantillas-dietas':
        return <PlantillasDietasPage />;
      case 'dietas-listado':
        return <DietasListadoPage />;
      case 'dieta-nueva':
        return <DietaNuevaPage />;
      case 'dieta-editar':
        return <DietaEditarPage />;
      case 'recetas-biblioteca':
        return <RecetasBibliotecaPage />;
      case 'receta-nueva':
        return <RecetaNuevaPage />;
      case 'receta-editar':
        return <RecetaEditarPage />;
      case 'calculadoras-nutricionales':
        return <CalculadorasNutricionalesPage />;
      case 'adherencia-nutricional':
        return <AdherenciaNutricionalPage />;
      case 'derivaciones-nutricion':
        return <DerivacionesNutricionPage />;
      case 'panel-financiero':
        return <PanelFinancieroPage />;
      case 'cobros-facturacion':
        return <CobrosFacturacionPage />;
      case 'conciliacion-pagos':
        return <ConciliacionPagosPage />;
      case 'gastos':
        return <GastosPage />;
      case 'impuestos':
        return <ImpuestosPage />;
      case 'exportar-contabilidad':
        return <ExportarContabilidadPage />;
      case 'productos-servicios':
        return <ProductosServiciosPage />;
      case 'planes-precios':
        return <PlanesPreciosPage />;
      case 'cupones':
        return <CuponesPage />;
      case 'campanas':
        return <CampanasPage />;
      case 'fuentes-lead':
        return <FuentesLeadPage />;
      case 'referidos':
        return <ReferidosPage />;
      case 'encuestas-nps':
        return <EncuestasNpsPage />;
      case 'opiniones-resenas':
        return <OpinionesResenasPage />;
      case 'plantillas-comunicacion':
        return <PlantillasComunicacionPage />;
      case 'widget-captacion':
        return <WidgetCaptacionPage />;
      // Plan Solo Pro cases
      case 'landing-servicios':
        return <LandingServiciosPage />;
      case 'calendario-publico':
        return <CalendarioPublicoPage />;
      case 'pagina-reserva':
        return <PaginaReservaPage />;
      case 'testimonios-clientes':
        return <TestimoniosClientesPage />;
      case 'blog-noticias':
        return <BlogNoticiasPage />;
      case 'listado-habitos':
        return <ListadoHabitosPage />;
      case 'crear-habito':
        return <CrearHabitoPage />;
      case 'estadisticas-habitos':
        return <EstadisticasHabitosPage />;
      case 'retos-habitos':
        return <RetosHabitosPage />;
      case 'videollamada-sala':
        return <VideollamadaSalaPage />;
      case 'grabaciones-sesiones':
        return <GrabacionesSesionesPage />;
      case 'chat-sesion':
        return <ChatSesionPage />;
      case 'notas-sesion':
        return <NotasSesionPage />;
      case 'listado-cupones':
        return <ListadoCuponesPage />;
      case 'crear-cupon':
        return <CrearCuponPage />;
      case 'reportes-uso':
        return <ReportesUsoPage />;
      case 'customer-journey':
        return <CustomerJourneyPage />;
      case 'hitos-clientes':
        return <HitosClientesPage />;
      case 'alertas-retencion':
        return <AlertasRetencionPage />;
      // Plan Solo Max cases
      case 'analitica-ingresos':
        return <AnaliticaIngresosPage />;
      case 'cohortes-clientes':
        return <CohortesClientesPage />;
      case 'ltv-clientes':
        return <LtvClientesPage />;
      case 'retencion-clientes-analytics':
        return <RetencionClientesPage />;
      case 'crear-flujo':
        return <CrearFlujoPage />;
      case 'historial-flujos':
        return <HistorialFlujosPage />;
      case 'libreria-plantillas':
        return <LibreriaPlantillasPage />;
      case 'listado-automatizaciones':
        return <ListadoAutomatizacionesPage />;
      case 'constructor-visual':
        return <ConstructorVisual />;
      case 'personalizacion-app-cliente':
        return <PersonalizacionAppClientePage />;
      case 'personalizacion-dominio':
        return <PersonalizacionDominioPage />;
      case 'personalizacion-estilos':
        return <PersonalizacionEstilosPage />;
      case 'configuracion-upsells':
        return <ConfiguracionUpsellsPage />;
      case 'conversion-report':
        return <ConversionReportPage />;
      case 'sugerencias-productos':
        return <SugerenciasProductosPage />;
      case 'dispositivos-conectados':
        return <DispositivosConectadosPage />;
      case 'panel-datos-wearables':
        return <PanelDatosWearablesPage />;
      case 'reportes-rendimiento':
        return <ReportesRendimientoPage />;
      // Plan Creator Pro cases
      case 'buscador-contenidos':
        return <BuscadorContenidosPage />;
      case 'contenidos-video':
        return <ContenidosVideoPage />;
      case 'contenidos-articulos':
        return <ContenidosArticulosPage />;
      case 'contenidos-descargables':
        return <ContenidosDescargablesPage />;
      case 'feed-comunidad':
        return <FeedComunidadPage />;
      case 'grupos-comunidad':
        return <GruposComunidadPage />;
      case 'moderacion-comunidad':
        return <ModeracionComunidadPage />;
      case 'ranking-actividad':
        return <RankingActividadPage />;
      case 'listado-cursos':
        return <ListadoCursosPage />;
      case 'crear-curso':
        return <CrearCursoPage />;
      case 'curso-detalle':
        return <CursoDetallePage />;
      case 'gestion-lecciones':
        return <GestionLeccionesPage />;
      case 'quizzes-evaluaciones':
        return <QuizzesEvaluacionesPage />;
      case 'listado-emails':
        return <ListadoEmailsPage />;
      case 'crear-email':
        return <CrearEmailPage />;
      case 'plantillas-email':
        return <PlantillasEmailPage />;
      case 'reportes-envio':
        return <ReportesEnvioPage />;
      case 'listado-membresias':
        return <ListadoMembresiasPage />;
      case 'pagina-membresia':
        return <PaginaMembresiaPage />;
      case 'beneficios-membresia':
        return <BeneficiosMembresiPage />;
      case 'pagos-membresia':
        return <PagosMembresiPage />;
      // Plan Creator Max cases
      case 'configuracion-app':
        return <ConfiguracionAppPage />;
      case 'vista-preview-app':
        return <VistaPreviewAppPage />;
      case 'personalizacion-push':
        return <PersonalizacionPushPage />;
      case 'flujos-retencion':
        return <FlujosRetencionPage />;
      case 'mensajes-personalizados':
        return <MensajesPersonalizadosPage />;
      case 'reactivacion-clientes':
        return <ReactivacionClientesPage />;
      case 'listado-afiliados':
        return <ListadoAfiliadosPage />;
      case 'panel-comisiones':
        return <PanelComisionesPage />;
      case 'pagos-afiliados':
        return <PagosAfiliadosPage />;
      case 'recursos-afiliados':
        return <RecursosAfiliadosPage />;
      case 'experimentos':
        return <ExperimentosPage />;
      case 'resultados-test':
        return <ResultadosTestPage />;
      case 'historial-experimentos':
        return <HistorialExperimentosPage />;
      case 'catalogo-productos':
        return <CatalogoProductosPage />;
      case 'configuracion-tienda':
        return <ConfiguracionTiendaPage />;
      case 'pedidos-clientes':
        return <PedidosClientesPage />;
      case 'informes-ventas':
        return <InformesVentasPage />;
      // Plan Studio Pro cases
      case 'escaner-entrada':
        return <EscanerEntradaPage />;
      case 'pases-virtuales':
        return <PasesVirtualesPage />;
      case 'historial-asistencias':
        return <HistorialAsistenciasPage />;
      case 'calendario-clases':
        return <CalendarioClasesPage />;
      case 'reservas-clase':
        return <ReservasClasePage />;
      case 'gestion-coach':
        return <GestionCoachPage />;
      case 'reportes-asistencia':
        return <ReportesAsistenciaPage />;
      case 'listado-pases':
        return <ListadoPasesPage />;
      case 'crear-contrato':
        return <CrearContratoPage />;
      case 'renovaciones':
        return <RenovacionesPage />;
      case 'ventas-rapidas':
        return <VentasRapidasPage />;
      case 'tickets-diarios':
        return <TicketsDiariosPage />;
      case 'caja-diaria':
        return <CajaDiariaPage />;
      case 'wod-dia':
        return <WodDiaPage />;
      case 'leaderboard':
        return <LeaderboardPage />;
      case 'historial-marcas':
        return <HistorialMarcasPage />;
      // Plan Studio Max cases
      case 'gestion-tornos':
        return <GestionTornosPage />;
      case 'tarjetas-socios':
        return <TarjetasSociosPage />;
      case 'reportes-accesos':
        return <ReportesAccesosPage />;
      case 'convenios-corporativos':
        return <ConveniosCorporativosPage />;
      case 'empleados-socios':
        return <EmpleadosSociosPage />;
      case 'facturacion-empresas':
        return <FacturacionEmpresasPage />;
      case 'catalogo-stock':
        return <CatalogoStockPage />;
      case 'control-pedidos':
        return <ControlPedidosPage />;
      case 'alertas-inventario':
        return <AlertasInventarioPage />;
      case 'interfaz-cliente':
        return <InterfazClientePage />;
      case 'historial-kiosko':
        return <HistorialKioskoPage />;
      case 'listado-sedes':
        return <ListadoSedesPage />;
      case 'comparativa-sedes':
        return <ComparativaSedesPage />;
      case 'transferencias-clientes':
        return <TransferenciasClientesPage />;
      // Plan Teams Pro cases
      case 'lista-convocatorias':
        return <ListaConvocatoriasPage />;
      case 'gestion-plantillas-convocatoria':
        return <GestionPlantillasConvocatoriaPage />;
      case 'asistencia-eventos':
        return <AsistenciaEventosPage />;
      case 'cuestionario-diario':
        return <CuestionarioDiarioPage />;
      case 'informes-semanales':
        return <InformesSemanalesPage />;
      case 'alertas-fatiga':
        return <AlertasFatigaPage />;
      case 'pruebas-fisicas':
        return <PruebasFisicasPage />;
      case 'resultados-historicos':
        return <ResultadosHistoricosPage />;
      case 'comparador-resultados':
        return <ComparadorResultadosPage />;
      case 'ficha-atleta':
        return <FichaAtletaPage />;
      case 'historial-rendimiento':
        return <HistorialRendimientoPage />;
      case 'comparador-atletas':
        return <ComparadorAtletasPage />;
      case 'calendario-periodizacion':
        return <CalendarioPeriodizacionPage />;
      case 'plantillas-mesociclos':
        return <PlantillasMesociclosPage />;
      case 'editar-mesociclo':
        return <EditarMesocicloPage />;
      case 'listado-roles':
        return <ListadoRolesPage />;
      case 'asignacion-roles':
        return <AsignacionRolesPage />;
      case 'permisos-entrenadores':
        return <PermisosEntrenadoresPage />;
      // Plan Teams Elite cases
      case 'dashboards-equipos':
        return <DashboardsEquiposPage />;
      case 'reportes-rendimiento-elite':
        return <ReportesRendimientoElitePage />;
      case 'comparativas-longitudinales':
        return <ComparativasLongitudinalesPage />;
      case 'equipo-a-vs-b':
        return <EquipoAVsBPage />;
      case 'analisis-posicion':
        return <AnalisisPosicionPage />;
      case 'proyeccion-partido':
        return <ProyeccionPartidoPage />;
      case 'torneos':
        return <TorneosPage />;
      case 'campeonatos':
        return <CampeonatosPage />;
      case 'resultados-eventos':
        return <ResultadosEventosPage />;
      case 'listado-jugadores':
        return <ListadoJugadoresPage />;
      case 'evaluacion-jugador':
        return <EvaluacionJugadorPage />;
      case 'historial-scouting':
        return <HistorialScoutingPage />;
      case 'dispositivos-conectados-elite':
        return <DispositivosConectadosElitePage />;
      case 'datos-tiempo-real':
        return <DatosTiempoRealPage />;
      case 'informes-sensores':
        return <InformesSensoresPage />;
      case 'mensajeria':
      case 'mensajes':
        return <MensajeriaPage />;
      case 'dashboard-estadisticas':
        return <DashboardEstadisticasPage />;
      default:
        return <InicioPage />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar
        activePage={activePage}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      
      <div className="transition-all duration-500">
        <Header
          onLogout={onLogout}
          onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
        
        <main className="p-6">
          <Routes>
            <Route index element={<Navigate to="inicio" replace />} />
            <Route path="training/entrenamientos/editar/:id" element={<EntrenamientoEdicionPage />} />
            <Route path="nutrition/dietas/editar/:id" element={<DietaEdicionPage />} />
            {/* Fallback: usa el renderer existente segun id en URL */}
            <Route path="*" element={renderPage()} />
          </Routes>
        </main>
      </div>
    </div>
  );
};