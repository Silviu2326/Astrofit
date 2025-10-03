import React, { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import {
  CreditCard, Calendar, Target, RefreshCw, Clock, TrendingUp,
  Plus, Upload, Settings, Search, Filter, Download, Eye, Edit2,
  Trash2, Check, X, ChevronDown, ChevronUp, BarChart3, LineChart,
  Grid, List, FileText, AlertCircle, Building, Zap,
  Megaphone, Laptop, Package, Receipt, Shield, Wrench, MoreHorizontal,
  ChevronLeft, ChevronRight, Users, Bell, CheckCircle, Copy, Save
} from 'lucide-react';
import {
  BarChart, Bar, LineChart as RechartsLineChart, Line, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell
} from 'recharts';
import ConfirmationModal from '../../../../components/ui/confirmation-modal';
import InputModal from '../../../../components/ui/input-modal';

// ============= TYPES =============
interface Gasto {
  id: string;
  fecha: string;
  concepto: string;
  descripcion: string;
  categoria: string;
  subcategoria?: string;
  proveedor: string;
  monto: number;
  metodoPago: string;
  estado: 'Pagado' | 'Pendiente' | 'Aprobado' | 'Rechazado';
  referencia?: string;
  notas?: string;
  esRecurrente: boolean;
  frecuencia?: 'Semanal' | 'Mensual' | 'Trimestral' | 'Anual';
  proximaRecurrencia?: string;
  tieneFactura: boolean;
  facturaUrl?: string;
}

interface Proveedor {
  id: string;
  nombre: string;
  categoria: string;
  totalGastado: number;
  numeroTransacciones: number;
  ultimoGasto: string;
  contacto?: string;
}

interface Presupuesto {
  categoria: string;
  presupuestoMensual: number;
  gastoActual: number;
  icono: React.ReactNode;
  color: string;
}

interface Alerta {
  id: string;
  tipo: 'excedido' | 'proximo' | 'pendiente' | 'sin-factura' | 'inusual';
  mensaje: string;
  severidad: 'alta' | 'media' | 'baja';
  fecha: string;
}

// ============= MOCK DATA =============
const categorias = [
  { value: 'nomina', label: 'Nómina/Salarios', icono: Users, color: '#EF4444' },
  { value: 'alquiler', label: 'Alquiler/Local', icono: Building, color: '#F59E0B' },
  { value: 'suministros', label: 'Suministros', icono: Zap, color: '#10B981' },
  { value: 'marketing', label: 'Marketing y Publicidad', icono: Megaphone, color: '#8B5CF6' },
  { value: 'software', label: 'Software y Tecnología', icono: Laptop, color: '#3B82F6' },
  { value: 'equipamiento', label: 'Equipamiento y Material', icono: Package, color: '#EC4899' },
  { value: 'impuestos', label: 'Impuestos y Tasas', icono: Receipt, color: '#6366F1' },
  { value: 'seguros', label: 'Seguros', icono: Shield, color: '#14B8A6' },
  { value: 'mantenimiento', label: 'Mantenimiento', icono: Wrench, color: '#F97316' },
  { value: 'otros', label: 'Otros', icono: MoreHorizontal, color: '#6B7280' },
];

const proveedoresMock: Proveedor[] = [
  { id: 'p1', nombre: 'Amazon Web Services', categoria: 'software', totalGastado: 4500, numeroTransacciones: 6, ultimoGasto: '2025-09-25', contacto: 'aws@amazon.com' },
  { id: 'p2', nombre: 'Google Ads', categoria: 'marketing', totalGastado: 8900, numeroTransacciones: 12, ultimoGasto: '2025-09-28', contacto: 'ads@google.com' },
  { id: 'p3', nombre: 'Telefónica', categoria: 'suministros', totalGastado: 2400, numeroTransacciones: 6, ultimoGasto: '2025-09-20', contacto: 'empresas@telefonica.es' },
  { id: 'p4', nombre: 'Inmobiliaria García', categoria: 'alquiler', totalGastado: 12000, numeroTransacciones: 6, ultimoGasto: '2025-09-01', contacto: 'info@inmobiliariagarcia.es' },
  { id: 'p5', nombre: 'Iberdrola', categoria: 'suministros', totalGastado: 1800, numeroTransacciones: 6, ultimoGasto: '2025-09-15', contacto: 'empresas@iberdrola.es' },
  { id: 'p6', nombre: 'Microsoft', categoria: 'software', totalGastado: 3600, numeroTransacciones: 6, ultimoGasto: '2025-09-22', contacto: 'business@microsoft.com' },
  { id: 'p7', nombre: 'Meta Ads', categoria: 'marketing', totalGastado: 6700, numeroTransacciones: 10, ultimoGasto: '2025-09-27', contacto: 'ads@meta.com' },
  { id: 'p8', nombre: 'Mapfre Seguros', categoria: 'seguros', totalGastado: 2500, numeroTransacciones: 4, ultimoGasto: '2025-09-10', contacto: 'empresas@mapfre.com' },
  { id: 'p9', nombre: 'Hacienda Pública', categoria: 'impuestos', totalGastado: 5600, numeroTransacciones: 4, ultimoGasto: '2025-09-05', contacto: '' },
  { id: 'p10', nombre: 'Office Depot', categoria: 'equipamiento', totalGastado: 3200, numeroTransacciones: 15, ultimoGasto: '2025-09-26', contacto: 'empresas@officedepot.es' },
  { id: 'p11', nombre: 'Mantenimientos Rápidos SL', categoria: 'mantenimiento', totalGastado: 1850, numeroTransacciones: 8, ultimoGasto: '2025-09-18', contacto: 'info@mantenimientos.es' },
];

const gastosMock: Gasto[] = [
  // Nómina
  { id: 'g1', fecha: '2025-09-30', concepto: 'Nómina Septiembre', descripcion: 'Pago nóminas empleados', categoria: 'nomina', proveedor: 'Nóminas Internas', monto: 18500, metodoPago: 'Transferencia', estado: 'Pendiente', esRecurrente: true, frecuencia: 'Mensual', proximaRecurrencia: '2025-10-30', tieneFactura: false },
  { id: 'g2', fecha: '2025-08-30', concepto: 'Nómina Agosto', descripcion: 'Pago nóminas empleados', categoria: 'nomina', proveedor: 'Nóminas Internas', monto: 18500, metodoPago: 'Transferencia', estado: 'Pagado', esRecurrente: true, frecuencia: 'Mensual', tieneFactura: false },
  { id: 'g3', fecha: '2025-07-30', concepto: 'Nómina Julio', descripcion: 'Pago nóminas empleados', categoria: 'nomina', proveedor: 'Nóminas Internas', monto: 18500, metodoPago: 'Transferencia', estado: 'Pagado', esRecurrente: true, frecuencia: 'Mensual', tieneFactura: false },
  { id: 'g4', fecha: '2025-06-30', concepto: 'Nómina Junio', descripcion: 'Pago nóminas empleados', categoria: 'nomina', proveedor: 'Nóminas Internas', monto: 18000, metodoPago: 'Transferencia', estado: 'Pagado', esRecurrente: true, frecuencia: 'Mensual', tieneFactura: false },

  // Alquiler
  { id: 'g5', fecha: '2025-09-01', concepto: 'Alquiler Local Septiembre', descripcion: 'Alquiler oficina principal', categoria: 'alquiler', proveedor: 'Inmobiliaria García', monto: 2000, metodoPago: 'Transferencia', estado: 'Pagado', referencia: 'ALQ-092025', esRecurrente: true, frecuencia: 'Mensual', proximaRecurrencia: '2025-10-01', tieneFactura: true, facturaUrl: '/facturas/alquiler-sept.pdf' },
  { id: 'g6', fecha: '2025-08-01', concepto: 'Alquiler Local Agosto', descripcion: 'Alquiler oficina principal', categoria: 'alquiler', proveedor: 'Inmobiliaria García', monto: 2000, metodoPago: 'Transferencia', estado: 'Pagado', esRecurrente: true, frecuencia: 'Mensual', tieneFactura: true },
  { id: 'g7', fecha: '2025-07-01', concepto: 'Alquiler Local Julio', descripcion: 'Alquiler oficina principal', categoria: 'alquiler', proveedor: 'Inmobiliaria García', monto: 2000, metodoPago: 'Transferencia', estado: 'Pagado', esRecurrente: true, frecuencia: 'Mensual', tieneFactura: true },
  { id: 'g8', fecha: '2025-06-01', concepto: 'Alquiler Local Junio', descripcion: 'Alquiler oficina principal', categoria: 'alquiler', proveedor: 'Inmobiliaria García', monto: 2000, metodoPago: 'Transferencia', estado: 'Pagado', esRecurrente: true, frecuencia: 'Mensual', tieneFactura: true },

  // Suministros
  { id: 'g9', fecha: '2025-09-20', concepto: 'Factura Internet y Teléfono', descripcion: 'Telecomunicaciones', categoria: 'suministros', proveedor: 'Telefónica', monto: 450, metodoPago: 'Domiciliación', estado: 'Pagado', esRecurrente: true, frecuencia: 'Mensual', proximaRecurrencia: '2025-10-20', tieneFactura: true },
  { id: 'g10', fecha: '2025-09-15', concepto: 'Factura Electricidad', descripcion: 'Consumo eléctrico', categoria: 'suministros', proveedor: 'Iberdrola', monto: 380, metodoPago: 'Domiciliación', estado: 'Pagado', esRecurrente: true, frecuencia: 'Mensual', proximaRecurrencia: '2025-10-15', tieneFactura: true },
  { id: 'g11', fecha: '2025-08-20', concepto: 'Factura Internet y Teléfono', descripcion: 'Telecomunicaciones', categoria: 'suministros', proveedor: 'Telefónica', monto: 450, metodoPago: 'Domiciliación', estado: 'Pagado', esRecurrente: true, frecuencia: 'Mensual', tieneFactura: true },
  { id: 'g12', fecha: '2025-08-15', concepto: 'Factura Electricidad', descripcion: 'Consumo eléctrico', categoria: 'suministros', proveedor: 'Iberdrola', monto: 420, metodoPago: 'Domiciliación', estado: 'Pagado', esRecurrente: true, frecuencia: 'Mensual', tieneFactura: true },
  { id: 'g13', fecha: '2025-07-18', concepto: 'Agua y Gas', descripcion: 'Suministros básicos', categoria: 'suministros', proveedor: 'Canal de Isabel II', monto: 180, metodoPago: 'Domiciliación', estado: 'Pagado', esRecurrente: false, tieneFactura: true },

  // Marketing
  { id: 'g14', fecha: '2025-09-28', concepto: 'Campaña Google Ads Septiembre', descripcion: 'Publicidad online', categoria: 'marketing', proveedor: 'Google Ads', monto: 1200, metodoPago: 'Tarjeta', estado: 'Pagado', referencia: 'GADS-092025', esRecurrente: false, tieneFactura: true, facturaUrl: '/facturas/google-sept.pdf' },
  { id: 'g15', fecha: '2025-09-27', concepto: 'Campaña Meta Ads', descripcion: 'Facebook e Instagram', categoria: 'marketing', proveedor: 'Meta Ads', monto: 850, metodoPago: 'Tarjeta', estado: 'Pagado', esRecurrente: false, tieneFactura: true },
  { id: 'g16', fecha: '2025-09-10', concepto: 'Diseño Gráfico', descripcion: 'Material publicitario', categoria: 'marketing', proveedor: 'Estudio Creativo Plus', monto: 650, metodoPago: 'Transferencia', estado: 'Pagado', esRecurrente: false, tieneFactura: true },
  { id: 'g17', fecha: '2025-08-28', concepto: 'Campaña Google Ads Agosto', descripcion: 'Publicidad online', categoria: 'marketing', proveedor: 'Google Ads', monto: 1100, metodoPago: 'Tarjeta', estado: 'Pagado', esRecurrente: false, tieneFactura: true },
  { id: 'g18', fecha: '2025-08-25', concepto: 'Campaña Meta Ads', descripcion: 'Facebook e Instagram', categoria: 'marketing', proveedor: 'Meta Ads', monto: 920, metodoPago: 'Tarjeta', estado: 'Pagado', esRecurrente: false, tieneFactura: true },
  { id: 'g19', fecha: '2025-07-15', concepto: 'SEO y SEM', descripcion: 'Optimización buscadores', categoria: 'marketing', proveedor: 'SEO Masters', monto: 780, metodoPago: 'Transferencia', estado: 'Pagado', esRecurrente: false, tieneFactura: true },

  // Software
  { id: 'g20', fecha: '2025-09-25', concepto: 'AWS Cloud Services', descripcion: 'Hosting y servidores', categoria: 'software', proveedor: 'Amazon Web Services', monto: 750, metodoPago: 'Tarjeta', estado: 'Pagado', esRecurrente: true, frecuencia: 'Mensual', proximaRecurrencia: '2025-10-25', tieneFactura: true },
  { id: 'g21', fecha: '2025-09-22', concepto: 'Microsoft 365 Business', descripcion: 'Licencias Office', categoria: 'software', proveedor: 'Microsoft', monto: 600, metodoPago: 'Tarjeta', estado: 'Pagado', esRecurrente: true, frecuencia: 'Mensual', proximaRecurrencia: '2025-10-22', tieneFactura: true },
  { id: 'g22', fecha: '2025-09-18', concepto: 'Adobe Creative Cloud', descripcion: 'Suite diseño', categoria: 'software', proveedor: 'Adobe', monto: 280, metodoPago: 'Tarjeta', estado: 'Pagado', esRecurrente: true, frecuencia: 'Mensual', tieneFactura: true },
  { id: 'g23', fecha: '2025-08-25', concepto: 'AWS Cloud Services', descripcion: 'Hosting y servidores', categoria: 'software', proveedor: 'Amazon Web Services', monto: 720, metodoPago: 'Tarjeta', estado: 'Pagado', esRecurrente: true, frecuencia: 'Mensual', tieneFactura: true },
  { id: 'g24', fecha: '2025-08-22', concepto: 'Microsoft 365 Business', descripcion: 'Licencias Office', categoria: 'software', proveedor: 'Microsoft', monto: 600, metodoPago: 'Tarjeta', estado: 'Pagado', esRecurrente: true, frecuencia: 'Mensual', tieneFactura: true },

  // Equipamiento
  { id: 'g25', fecha: '2025-09-26', concepto: 'Material de Oficina', descripcion: 'Papelería y suministros', categoria: 'equipamiento', proveedor: 'Office Depot', monto: 320, metodoPago: 'Tarjeta', estado: 'Pagado', esRecurrente: false, tieneFactura: true },
  { id: 'g26', fecha: '2025-09-12', concepto: 'Mobiliario Oficina', descripcion: '2 sillas ergonómicas', categoria: 'equipamiento', proveedor: 'Office Depot', monto: 580, metodoPago: 'Transferencia', estado: 'Pagado', esRecurrente: false, tieneFactura: true },
  { id: 'g27', fecha: '2025-08-20', concepto: 'Ordenador Portátil', descripcion: 'Laptop para diseño', categoria: 'equipamiento', proveedor: 'Apple Store', monto: 2100, metodoPago: 'Transferencia', estado: 'Pagado', referencia: 'MAC-2025', esRecurrente: false, tieneFactura: true },
  { id: 'g28', fecha: '2025-07-25', concepto: 'Monitor 4K', descripcion: 'Pantalla profesional', categoria: 'equipamiento', proveedor: 'Amazon', monto: 450, metodoPago: 'Tarjeta', estado: 'Pagado', esRecurrente: false, tieneFactura: true },
  { id: 'g29', fecha: '2025-06-18', concepto: 'Material de Oficina', descripcion: 'Papelería y suministros', categoria: 'equipamiento', proveedor: 'Office Depot', monto: 280, metodoPago: 'Tarjeta', estado: 'Pagado', esRecurrente: false, tieneFactura: true },

  // Impuestos
  { id: 'g30', fecha: '2025-09-05', concepto: 'IVA Trimestral', descripcion: 'Declaración IVA 3T', categoria: 'impuestos', proveedor: 'Hacienda Pública', monto: 2800, metodoPago: 'Transferencia', estado: 'Pagado', referencia: 'IVA-3T2025', esRecurrente: false, tieneFactura: false },
  { id: 'g31', fecha: '2025-07-20', concepto: 'IRPF 2T', descripcion: 'Retenciones trimestrales', categoria: 'impuestos', proveedor: 'Hacienda Pública', monto: 1650, metodoPago: 'Transferencia', estado: 'Pagado', esRecurrente: false, tieneFactura: false },
  { id: 'g32', fecha: '2025-06-05', concepto: 'IVA Trimestral', descripcion: 'Declaración IVA 2T', categoria: 'impuestos', proveedor: 'Hacienda Pública', monto: 2400, metodoPago: 'Transferencia', estado: 'Pagado', esRecurrente: false, tieneFactura: false },

  // Seguros
  { id: 'g33', fecha: '2025-09-10', concepto: 'Seguro RC Profesional', descripcion: 'Responsabilidad civil', categoria: 'seguros', proveedor: 'Mapfre Seguros', monto: 420, metodoPago: 'Domiciliación', estado: 'Pagado', esRecurrente: true, frecuencia: 'Trimestral', proximaRecurrencia: '2025-12-10', tieneFactura: true },
  { id: 'g34', fecha: '2025-08-15', concepto: 'Seguro Multirriesgo Oficina', descripcion: 'Seguro local', categoria: 'seguros', proveedor: 'Mapfre Seguros', monto: 380, metodoPago: 'Domiciliación', estado: 'Pagado', esRecurrente: true, frecuencia: 'Trimestral', tieneFactura: true },
  { id: 'g35', fecha: '2025-06-10', concepto: 'Seguro RC Profesional', descripcion: 'Responsabilidad civil', categoria: 'seguros', proveedor: 'Mapfre Seguros', monto: 420, metodoPago: 'Domiciliación', estado: 'Pagado', esRecurrente: true, frecuencia: 'Trimestral', tieneFactura: true },

  // Mantenimiento
  { id: 'g36', fecha: '2025-09-18', concepto: 'Mantenimiento Aire Acondicionado', descripcion: 'Revisión y limpieza', categoria: 'mantenimiento', proveedor: 'Mantenimientos Rápidos SL', monto: 280, metodoPago: 'Transferencia', estado: 'Pagado', esRecurrente: false, tieneFactura: true },
  { id: 'g37', fecha: '2025-09-05', concepto: 'Reparación Impresora', descripcion: 'Cambio tóner y revisión', categoria: 'mantenimiento', proveedor: 'TechFix', monto: 120, metodoPago: 'Efectivo', estado: 'Pagado', esRecurrente: false, tieneFactura: false },
  { id: 'g38', fecha: '2025-08-12', concepto: 'Limpieza Oficina', descripcion: 'Limpieza profunda', categoria: 'mantenimiento', proveedor: 'Limpiezas Express', monto: 150, metodoPago: 'Transferencia', estado: 'Pagado', esRecurrente: false, tieneFactura: true },
  { id: 'g39', fecha: '2025-07-22', concepto: 'Fontanería', descripcion: 'Reparación baño', categoria: 'mantenimiento', proveedor: 'Mantenimientos Rápidos SL', monto: 95, metodoPago: 'Efectivo', estado: 'Pagado', esRecurrente: false, tieneFactura: false },

  // Otros
  { id: 'g40', fecha: '2025-09-22', concepto: 'Formación Empleados', descripcion: 'Curso online marketing digital', categoria: 'otros', proveedor: 'Udemy Business', monto: 340, metodoPago: 'Tarjeta', estado: 'Pagado', esRecurrente: false, tieneFactura: true },
  { id: 'g41', fecha: '2025-09-14', concepto: 'Cafetería y Suministros', descripcion: 'Café, té, galletas', categoria: 'otros', proveedor: 'Makro', monto: 180, metodoPago: 'Tarjeta', estado: 'Pagado', esRecurrente: false, tieneFactura: true },
  { id: 'g42', fecha: '2025-09-08', concepto: 'Parking Mensual', descripcion: 'Aparcamiento oficina', categoria: 'otros', proveedor: 'Parkings Centro', monto: 120, metodoPago: 'Domiciliación', estado: 'Pagado', esRecurrente: true, frecuencia: 'Mensual', tieneFactura: false },
  { id: 'g43', fecha: '2025-08-28', concepto: 'Comida Equipo', descripcion: 'Celebración proyecto', categoria: 'otros', proveedor: 'Restaurante El Buen Gusto', monto: 380, metodoPago: 'Tarjeta', estado: 'Pagado', esRecurrente: false, tieneFactura: true },
  { id: 'g44', fecha: '2025-08-10', concepto: 'Subscripción Prensa', descripcion: 'El País Negocios', categoria: 'otros', proveedor: 'El País', monto: 45, metodoPago: 'Tarjeta', estado: 'Pagado', esRecurrente: true, frecuencia: 'Mensual', tieneFactura: false },

  // Gastos pendientes
  { id: 'g45', fecha: '2025-09-29', concepto: 'Consultoría Legal', descripcion: 'Asesoría contratos', categoria: 'otros', proveedor: 'Bufete Martínez', monto: 850, metodoPago: 'Transferencia', estado: 'Pendiente', referencia: 'LEG-2025-09', esRecurrente: false, tieneFactura: true },
  { id: 'g46', fecha: '2025-09-28', concepto: 'Hosting Web Adicional', descripcion: 'Servidor VPS', categoria: 'software', proveedor: 'DigitalOcean', monto: 120, metodoPago: 'Tarjeta', estado: 'Pendiente', esRecurrente: false, tieneFactura: false },
  { id: 'g47', fecha: '2025-09-25', concepto: 'Material Promocional', descripcion: 'Flyers y tarjetas', categoria: 'marketing', proveedor: 'Imprenta Rápida', monto: 320, metodoPago: 'Transferencia', estado: 'Pendiente', esRecurrente: false, tieneFactura: false },
];

const presupuestosMock: Record<string, number> = {
  nomina: 20000,
  alquiler: 2200,
  suministros: 1500,
  marketing: 3500,
  software: 2000,
  equipamiento: 3000,
  impuestos: 3000,
  seguros: 1200,
  mantenimiento: 800,
  otros: 1500,
};

// ============= MAIN COMPONENT =============
export default function GastosPage() {
  const [periodo, setPeriodo] = useState('2025-09');
  const [tabActual, setTabActual] = useState<'todos' | 'pendientes' | 'pagados' | 'recurrentes' | 'aprobar'>('todos');
  const [vistaActual, setVistaActual] = useState<'tabla' | 'cards'>('tabla');
  const [busqueda, setBusqueda] = useState('');
  const [filtroCategoria, setFiltroCategoria] = useState<string>('');
  const [filtroProveedor, setFiltroProveedor] = useState<string>('');
  const [filtroEstado, setFiltroEstado] = useState<string>('');
  const [ordenarPor, setOrdenarPor] = useState<'fecha' | 'monto' | 'categoria'>('fecha');
  const [ordenDireccion, setOrdenDireccion] = useState<'asc' | 'desc'>('desc');
  const [paginaActual, setPaginaActual] = useState(1);
  const [gastosPorPagina] = useState(10);
  const [mostrarFiltros, setMostrarFiltros] = useState(false);
  const [seleccionados, setSeleccionados] = useState<string[]>([]);
  const [gastoExpandido, setGastoExpandido] = useState<string | null>(null);
  const [mostrarModalNuevo, setMostrarModalNuevo] = useState(false);
  const [mostrarModalProveedores, setMostrarModalProveedores] = useState(false);
  const [mostrarModalPresupuestos, setMostrarModalPresupuestos] = useState(false);
  const [mostrarAlertas, setMostrarAlertas] = useState(false);
  const [vistaPorcentaje, setVistaPorcentaje] = useState(false);
  const [gastos, setGastos] = useState<Gasto[]>(gastosMock);
  const [proveedores, setProveedores] = useState<Proveedor[]>(proveedoresMock);
  
  // Estados para modales de confirmación
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    type?: 'danger' | 'warning' | 'info';
  }>({ isOpen: false, title: '', message: '', onConfirm: () => {} });
  
  const [inputModal, setInputModal] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: (value: string) => void;
    placeholder?: string;
  }>({ isOpen: false, title: '', message: '', onConfirm: () => {} });
  
  const [mostrarModalDetalles, setMostrarModalDetalles] = useState(false);
  const [gastoSeleccionado, setGastoSeleccionado] = useState<Gasto | null>(null);
  
  // Estados para gestión de proveedores
  const [mostrarModalNuevoProveedor, setMostrarModalNuevoProveedor] = useState(false);
  const [mostrarModalDetallesProveedor, setMostrarModalDetallesProveedor] = useState(false);
  const [proveedorSeleccionado, setProveedorSeleccionado] = useState<Proveedor | null>(null);
  const [proveedorEditando, setProveedorEditando] = useState<Proveedor | null>(null);
  const [nuevoProveedor, setNuevoProveedor] = useState<Partial<Proveedor>>({});
  
  // Estados para gestión de presupuestos
  const [presupuestosEditables, setPresupuestosEditables] = useState<Record<string, number>>(presupuestosMock);
  const [presupuestosTemporales, setPresupuestosTemporales] = useState<Record<string, number>>(presupuestosMock);
  
  // Estados para formularios
  const [gastoEditando, setGastoEditando] = useState<Gasto | null>(null);
  const [nuevoGasto, setNuevoGasto] = useState<Partial<Gasto>>({});
  const [isLoading, setIsLoading] = useState(false);
  
  // Referencias para archivos
  const fileInputRef = useRef<HTMLInputElement>(null);
  const importInputRef = useRef<HTMLInputElement>(null);

  // Cálculos
  const gastosMes = useMemo(() => {
    return gastos.filter(g => g.fecha.startsWith(periodo));
  }, [gastos, periodo]);

  const gastosFiltrados = useMemo(() => {
    let resultado = [...gastosMes];

    // Filtro por tab
    switch (tabActual) {
      case 'pendientes':
        resultado = resultado.filter(g => g.estado === 'Pendiente');
        break;
      case 'pagados':
        resultado = resultado.filter(g => g.estado === 'Pagado');
        break;
      case 'recurrentes':
        resultado = resultado.filter(g => g.esRecurrente);
        break;
      case 'aprobar':
        resultado = resultado.filter(g => g.estado === 'Aprobado' || g.estado === 'Rechazado');
        break;
    }

    // Búsqueda
    if (busqueda) {
      const lower = busqueda.toLowerCase();
      resultado = resultado.filter(g =>
        g.concepto.toLowerCase().includes(lower) ||
        g.proveedor.toLowerCase().includes(lower) ||
        g.descripcion.toLowerCase().includes(lower)
      );
    }

    // Filtros
    if (filtroCategoria) {
      resultado = resultado.filter(g => g.categoria === filtroCategoria);
    }
    if (filtroProveedor) {
      resultado = resultado.filter(g => g.proveedor === filtroProveedor);
    }
    if (filtroEstado) {
      resultado = resultado.filter(g => g.estado === filtroEstado);
    }

    // Ordenamiento
    resultado.sort((a, b) => {
      let comparacion = 0;
      switch (ordenarPor) {
        case 'fecha':
          comparacion = new Date(a.fecha).getTime() - new Date(b.fecha).getTime();
          break;
        case 'monto':
          comparacion = a.monto - b.monto;
          break;
        case 'categoria':
          comparacion = a.categoria.localeCompare(b.categoria);
          break;
      }
      return ordenDireccion === 'asc' ? comparacion : -comparacion;
    });

    return resultado;
  }, [gastosMes, tabActual, busqueda, filtroCategoria, filtroProveedor, filtroEstado, ordenarPor, ordenDireccion]);

  const gastosPaginados = useMemo(() => {
    const inicio = (paginaActual - 1) * gastosPorPagina;
    return gastosFiltrados.slice(inicio, inicio + gastosPorPagina);
  }, [gastosFiltrados, paginaActual, gastosPorPagina]);

  const totalPaginas = Math.ceil(gastosFiltrados.length / gastosPorPagina);

  const totalGastos = useMemo(() => {
    return gastos.reduce((sum, g) => sum + g.monto, 0);
  }, [gastos]);

  const totalGastosMes = useMemo(() => {
    return gastosMes.reduce((sum, g) => sum + g.monto, 0);
  }, [gastosMes]);

  const totalPresupuesto = useMemo(() => {
    return Object.values(presupuestosEditables).reduce((sum, p) => sum + p, 0);
  }, [presupuestosEditables]);

  const presupuestoRestante = totalPresupuesto - totalGastosMes;
  const porcentajePresupuesto = (totalGastosMes / totalPresupuesto) * 100;

  const gastosRecurrentes = useMemo(() => {
    return gastos.filter(g => g.esRecurrente).reduce((sum, g) => sum + g.monto, 0);
  }, [gastos]);

  const gastosPendientesAprobar = useMemo(() => {
    return gastos.filter(g => g.estado === 'Pendiente').length;
  }, [gastos]);

  const mayorCategoria = useMemo(() => {
    const porCategoria = gastosMes.reduce((acc, g) => {
      acc[g.categoria] = (acc[g.categoria] || 0) + g.monto;
      return acc;
    }, {} as Record<string, number>);

    const mayor = Object.entries(porCategoria).sort(([, a], [, b]) => b - a)[0];
    if (!mayor) return { categoria: 'N/A', monto: 0 };

    const cat = categorias.find(c => c.value === mayor[0]);
    return { categoria: cat?.label || mayor[0], monto: mayor[1] };
  }, [gastosMes]);

  const presupuestos: Presupuesto[] = useMemo(() => {
    return categorias.map(cat => {
      const gastoActual = gastosMes
        .filter(g => g.categoria === cat.value)
        .reduce((sum, g) => sum + g.monto, 0);

      return {
        categoria: cat.label,
        presupuestoMensual: presupuestosEditables[cat.value],
        gastoActual,
        icono: <cat.icono size={18} />,
        color: cat.color,
      };
    });
  }, [gastosMes, presupuestosEditables]);

  const datosGraficoCategorias = useMemo(() => {
    return presupuestos.map(p => ({
      categoria: p.categoria,
      presupuesto: p.presupuestoMensual,
      gasto: p.gastoActual,
      porcentaje: (p.gastoActual / p.presupuestoMensual) * 100,
      excede: p.gastoActual > p.presupuestoMensual,
    }));
  }, [presupuestos]);

  const datosGraficoEvolucion = useMemo(() => {
    const meses = ['2025-04', '2025-05', '2025-06', '2025-07', '2025-08', '2025-09'];
    return meses.map(mes => {
      const gastosMes = gastos.filter(g => g.fecha.startsWith(mes));
      const total = gastosMes.reduce((sum, g) => sum + g.monto, 0);

      const porCategoria = categorias.reduce((acc, cat) => {
        acc[cat.value] = gastosMes
          .filter(g => g.categoria === cat.value)
          .reduce((sum, g) => sum + g.monto, 0);
        return acc;
      }, {} as Record<string, number>);

      return {
        mes: mes.substring(5),
        total,
        promedio: totalPresupuesto,
        presupuesto: totalPresupuesto,
        ...porCategoria,
      };
    });
  }, [gastos, totalPresupuesto]);

  const alertas: Alerta[] = useMemo(() => {
    const result: Alerta[] = [];

    // Presupuestos excedidos
    presupuestos.forEach(p => {
      if (p.gastoActual > p.presupuestoMensual) {
        result.push({
          id: `exc-${p.categoria}`,
          tipo: 'excedido',
          mensaje: `Presupuesto de ${p.categoria} excedido en ${((p.gastoActual - p.presupuestoMensual) / p.presupuestoMensual * 100).toFixed(1)}%`,
          severidad: 'alta',
          fecha: new Date().toISOString(),
        });
      } else if (p.gastoActual > p.presupuestoMensual * 0.9) {
        result.push({
          id: `warn-${p.categoria}`,
          tipo: 'excedido',
          mensaje: `Presupuesto de ${p.categoria} al ${(p.gastoActual / p.presupuestoMensual * 100).toFixed(1)}%`,
          severidad: 'media',
          fecha: new Date().toISOString(),
        });
      }
    });

    // Gastos pendientes
    const pendientes = gastos.filter(g => g.estado === 'Pendiente');
    if (pendientes.length > 0) {
      result.push({
        id: 'pend-general',
        tipo: 'pendiente',
        mensaje: `${pendientes.length} gastos pendientes de pago por ${pendientes.reduce((s, g) => s + g.monto, 0).toFixed(2)}€`,
        severidad: 'media',
        fecha: new Date().toISOString(),
      });
    }

    // Gastos sin factura
    const sinFactura = gastos.filter(g => !g.tieneFactura && g.monto > 100);
    if (sinFactura.length > 0) {
      result.push({
        id: 'sin-fact',
        tipo: 'sin-factura',
        mensaje: `${sinFactura.length} gastos superiores a 100€ sin factura adjunta`,
        severidad: 'baja',
        fecha: new Date().toISOString(),
      });
    }

    // Recurrentes próximos
    const recurrentes = gastos.filter(g => g.esRecurrente && g.proximaRecurrencia);
    const proximos = recurrentes.filter(g => {
      const dias = Math.ceil((new Date(g.proximaRecurrencia!).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
      return dias <= 7 && dias >= 0;
    });
    if (proximos.length > 0) {
      result.push({
        id: 'rec-prox',
        tipo: 'proximo',
        mensaje: `${proximos.length} gastos recurrentes próximos a vencer en los próximos 7 días`,
        severidad: 'baja',
        fecha: new Date().toISOString(),
      });
    }

    return result;
  }, [presupuestos, gastos]);

  const getCategoriaInfo = (catValue: string) => {
    return categorias.find(c => c.value === catValue) || categorias[categorias.length - 1];
  };

  const getEstadoBadgeColor = (estado: string) => {
    switch (estado) {
      case 'Pagado': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Pendiente': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'Aprobado': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'Rechazado': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const toggleSeleccion = (id: string) => {
    setSeleccionados(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const toggleTodos = () => {
    if (seleccionados.length === gastosPaginados.length) {
      setSeleccionados([]);
    } else {
      setSeleccionados(gastosPaginados.map(g => g.id));
    }
  };

  // ============= FUNCIONES DE UTILIDAD =============
  const generarId = () => `g${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  const formatearFecha = (fecha: string) => {
    return new Date(fecha).toISOString().split('T')[0];
  };

  const validarGasto = (gasto: Partial<Gasto>): string | null => {
    if (!gasto.concepto?.trim()) return 'El concepto es obligatorio';
    if (!gasto.categoria) return 'La categoría es obligatoria';
    if (!gasto.proveedor?.trim()) return 'El proveedor es obligatorio';
    if (!gasto.monto || gasto.monto <= 0) return 'El monto debe ser mayor a 0';
    if (!gasto.fecha) return 'La fecha es obligatoria';
    return null;
  };

  // ============= FUNCIONES CRUD =============
  const crearGasto = async (gastoData: Partial<Gasto>) => {
    const error = validarGasto(gastoData);
    if (error) {
      toast.error(error);
      return;
    }

    setIsLoading(true);
    try {
      // Simular llamada API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const nuevoGasto: Gasto = {
        id: generarId(),
        fecha: gastoData.fecha!,
        concepto: gastoData.concepto!,
        descripcion: gastoData.descripcion || '',
        categoria: gastoData.categoria!,
        subcategoria: gastoData.subcategoria,
        proveedor: gastoData.proveedor!,
        monto: gastoData.monto!,
        metodoPago: gastoData.metodoPago || 'Transferencia',
        estado: gastoData.estado || 'Pendiente',
        referencia: gastoData.referencia,
        notas: gastoData.notas,
        esRecurrente: gastoData.esRecurrente || false,
        frecuencia: gastoData.frecuencia,
        proximaRecurrencia: gastoData.proximaRecurrencia,
        tieneFactura: gastoData.tieneFactura || false,
        facturaUrl: gastoData.facturaUrl,
      };

      setGastos(prev => [nuevoGasto, ...prev]);
      setNuevoGasto({});
      setMostrarModalNuevo(false);
      toast.success('Gasto creado exitosamente');
    } catch (error) {
      toast.error('Error al crear el gasto');
    } finally {
      setIsLoading(false);
    }
  };

  const editarGasto = async (id: string, gastoData: Partial<Gasto>) => {
    const error = validarGasto(gastoData);
    if (error) {
      toast.error(error);
      return;
    }

    setIsLoading(true);
    try {
      // Simular llamada API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setGastos(prev => prev.map(g => 
        g.id === id ? { ...g, ...gastoData } : g
      ));
      
      setGastoEditando(null);
      toast.success('Gasto actualizado exitosamente');
    } catch (error) {
      toast.error('Error al actualizar el gasto');
    } finally {
      setIsLoading(false);
    }
  };

  const eliminarGasto = async (id: string) => {
    setIsLoading(true);
    try {
      // Simular llamada API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setGastos(prev => prev.filter(g => g.id !== id));
      setSeleccionados(prev => prev.filter(s => s !== id));
      toast.success('Gasto eliminado exitosamente');
    } catch (error) {
      toast.error('Error al eliminar el gasto');
    } finally {
      setIsLoading(false);
    }
  };

  const cambiarEstadoGasto = async (id: string, nuevoEstado: Gasto['estado']) => {
    setIsLoading(true);
    try {
      // Simular llamada API
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setGastos(prev => prev.map(g => 
        g.id === id ? { ...g, estado: nuevoEstado } : g
      ));
      
      toast.success(`Gasto marcado como ${nuevoEstado.toLowerCase()}`);
    } catch (error) {
      toast.error('Error al cambiar el estado del gasto');
    } finally {
      setIsLoading(false);
    }
  };

  // ============= FUNCIONES DE OPERACIONES MASIVAS =============
  const cambiarCategoriaMasivo = async (nuevaCategoria: string) => {
    if (seleccionados.length === 0) {
      toast.error('No hay gastos seleccionados');
      return;
    }

    setIsLoading(true);
    try {
      // Simular llamada API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setGastos(prev => prev.map(g => 
        seleccionados.includes(g.id) ? { ...g, categoria: nuevaCategoria } : g
      ));
      
      setSeleccionados([]);
      toast.success(`${seleccionados.length} gastos actualizados`);
    } catch (error) {
      toast.error('Error al actualizar los gastos');
    } finally {
      setIsLoading(false);
    }
  };

  const marcarComoPagadoMasivo = async () => {
    if (seleccionados.length === 0) {
      toast.error('No hay gastos seleccionados');
      return;
    }

    setIsLoading(true);
    try {
      // Simular llamada API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setGastos(prev => prev.map(g => 
        seleccionados.includes(g.id) ? { ...g, estado: 'Pagado' as const } : g
      ));
      
      setSeleccionados([]);
      toast.success(`${seleccionados.length} gastos marcados como pagados`);
    } catch (error) {
      toast.error('Error al actualizar los gastos');
    } finally {
      setIsLoading(false);
    }
  };

  const eliminarMasivo = async () => {
    if (seleccionados.length === 0) {
      toast.error('No hay gastos seleccionados');
      return;
    }

    setConfirmModal({
      isOpen: true,
      title: 'Eliminar Gastos',
      message: `¿Estás seguro de que quieres eliminar ${seleccionados.length} gastos? Esta acción no se puede deshacer.`,
      type: 'danger',
      onConfirm: async () => {
        setIsLoading(true);
        try {
          // Simular llamada API
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          setGastos(prev => prev.filter(g => !seleccionados.includes(g.id)));
          setSeleccionados([]);
          setConfirmModal({ isOpen: false, title: '', message: '', onConfirm: () => {} });
          toast.success(`${seleccionados.length} gastos eliminados`);
        } catch (error) {
          toast.error('Error al eliminar los gastos');
        } finally {
          setIsLoading(false);
        }
      }
    });
  };

  // ============= FUNCIONES DE IMPORT/EXPORT =============
  const exportarGastos = () => {
    try {
      const datosExportar = gastosFiltrados.map(g => ({
        Fecha: g.fecha,
        Concepto: g.concepto,
        Descripción: g.descripcion,
        Categoría: getCategoriaInfo(g.categoria).label,
        Proveedor: g.proveedor,
        Monto: g.monto,
        'Método de Pago': g.metodoPago,
        Estado: g.estado,
        Referencia: g.referencia || '',
        'Es Recurrente': g.esRecurrente ? 'Sí' : 'No',
        Frecuencia: g.frecuencia || '',
        'Tiene Factura': g.tieneFactura ? 'Sí' : 'No',
      }));

      const csv = [
        Object.keys(datosExportar[0]).join(','),
        ...datosExportar.map(row => Object.values(row).map(val => `"${val}"`).join(','))
      ].join('\n');

      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `gastos_${periodo}_${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast.success('Gastos exportados exitosamente');
    } catch (error) {
      toast.error('Error al exportar los gastos');
    }
  };

  const importarGastos = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.csv')) {
      toast.error('Solo se permiten archivos CSV');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const csv = e.target?.result as string;
        const lines = csv.split('\n');
        const headers = lines[0].split(',').map(h => h.replace(/"/g, ''));
        
        const nuevosGastos: Gasto[] = [];
        for (let i = 1; i < lines.length; i++) {
          if (lines[i].trim()) {
            const values = lines[i].split(',').map(v => v.replace(/"/g, ''));
            const gasto: Partial<Gasto> = {};
            
            headers.forEach((header, index) => {
              const value = values[index];
              switch (header) {
                case 'Fecha':
                  gasto.fecha = value;
                  break;
                case 'Concepto':
                  gasto.concepto = value;
                  break;
                case 'Descripción':
                  gasto.descripcion = value;
                  break;
                case 'Categoría':
                  const cat = categorias.find(c => c.label === value);
                  gasto.categoria = cat?.value || 'otros';
                  break;
                case 'Proveedor':
                  gasto.proveedor = value;
                  break;
                case 'Monto':
                  gasto.monto = parseFloat(value);
                  break;
                case 'Método de Pago':
                  gasto.metodoPago = value;
                  break;
                case 'Estado':
                  gasto.estado = value as Gasto['estado'];
                  break;
                case 'Referencia':
                  gasto.referencia = value;
                  break;
                case 'Es Recurrente':
                  gasto.esRecurrente = value === 'Sí';
                  break;
                case 'Frecuencia':
                  gasto.frecuencia = value as Gasto['frecuencia'];
                  break;
                case 'Tiene Factura':
                  gasto.tieneFactura = value === 'Sí';
                  break;
              }
            });
            
            if (gasto.concepto && gasto.categoria && gasto.proveedor && gasto.monto && gasto.fecha) {
              nuevosGastos.push({
                id: generarId(),
                fecha: gasto.fecha,
                concepto: gasto.concepto,
                descripcion: gasto.descripcion || '',
                categoria: gasto.categoria,
                proveedor: gasto.proveedor,
                monto: gasto.monto,
                metodoPago: gasto.metodoPago || 'Transferencia',
                estado: gasto.estado || 'Pendiente',
                referencia: gasto.referencia,
                esRecurrente: gasto.esRecurrente || false,
                frecuencia: gasto.frecuencia,
                proximaRecurrencia: gasto.proximaRecurrencia,
                tieneFactura: gasto.tieneFactura || false,
                facturaUrl: gasto.facturaUrl,
              });
            }
          }
        }
        
        setGastos(prev => [...nuevosGastos, ...prev]);
        toast.success(`${nuevosGastos.length} gastos importados exitosamente`);
      } catch (error) {
        toast.error('Error al procesar el archivo CSV');
      }
    };
    reader.readAsText(file);
  };

  // ============= MANEJADORES DE EVENTOS =============
  const handleNuevoGasto = () => {
    setNuevoGasto({
      fecha: formatearFecha(new Date().toISOString()),
      estado: 'Pendiente',
      metodoPago: 'Transferencia',
      esRecurrente: false,
      tieneFactura: false,
    });
    setMostrarModalNuevo(true);
  };

  const handleEditarGasto = (gasto: Gasto) => {
    setGastoEditando(gasto);
    setNuevoGasto(gasto);
    setMostrarModalNuevo(true);
  };

  const handleEliminarGasto = (gasto: Gasto) => {
    setConfirmModal({
      isOpen: true,
      title: 'Eliminar Gasto',
      message: `¿Estás seguro de que quieres eliminar el gasto "${gasto.concepto}"? Esta acción no se puede deshacer.`,
      type: 'danger',
      onConfirm: () => {
        eliminarGasto(gasto.id);
        setConfirmModal({ isOpen: false, title: '', message: '', onConfirm: () => {} });
      }
    });
  };

  const handleCambiarCategoria = () => {
    setInputModal({
      isOpen: true,
      title: 'Cambiar Categoría',
      message: 'Selecciona la nueva categoría para los gastos seleccionados:',
      onConfirm: (categoria) => {
        const cat = categorias.find(c => c.label === categoria);
        if (cat) {
          cambiarCategoriaMasivo(cat.value);
        } else {
          toast.error('Categoría no válida');
        }
        setInputModal({ isOpen: false, title: '', message: '', onConfirm: () => {} });
      }
    });
  };

  const handleSubirFactura = (gastoId: string) => {
    if (fileInputRef.current) {
      fileInputRef.current.onchange = (e) => {
        const file = (e.target as HTMLInputElement).files?.[0];
        if (file) {
          // Simular subida de archivo
          toast.success('Factura subida exitosamente');
          setGastos(prev => prev.map(g => 
            g.id === gastoId ? { ...g, tieneFactura: true, facturaUrl: file.name } : g
          ));
        }
      };
      fileInputRef.current.click();
    }
  };

  const handleVerDetalles = (gasto: Gasto) => {
    setGastoSeleccionado(gasto);
    setMostrarModalDetalles(true);
  };

  // ============= FUNCIONES DE GESTIÓN DE PROVEEDORES =============
  const validarProveedor = (proveedor: Partial<Proveedor>): string | null => {
    if (!proveedor.nombre?.trim()) return 'El nombre del proveedor es obligatorio';
    if (!proveedor.categoria) return 'La categoría es obligatoria';
    return null;
  };

  const crearProveedor = async (proveedorData: Partial<Proveedor>) => {
    const error = validarProveedor(proveedorData);
    if (error) {
      toast.error(error);
      return;
    }

    setIsLoading(true);
    try {
      // Simular llamada API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const nuevoProveedor: Proveedor = {
        id: `p${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        nombre: proveedorData.nombre!,
        categoria: proveedorData.categoria!,
        totalGastado: 0,
        numeroTransacciones: 0,
        ultimoGasto: new Date().toISOString().split('T')[0],
        contacto: proveedorData.contacto,
      };

      setProveedores(prev => [nuevoProveedor, ...prev]);
      setNuevoProveedor({});
      setMostrarModalNuevoProveedor(false);
      toast.success('Proveedor creado exitosamente');
    } catch (error) {
      toast.error('Error al crear el proveedor');
    } finally {
      setIsLoading(false);
    }
  };

  const editarProveedor = async (id: string, proveedorData: Partial<Proveedor>) => {
    const error = validarProveedor(proveedorData);
    if (error) {
      toast.error(error);
      return;
    }

    setIsLoading(true);
    try {
      // Simular llamada API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setProveedores(prev => prev.map(p => 
        p.id === id ? { ...p, ...proveedorData } : p
      ));
      
      setProveedorEditando(null);
      toast.success('Proveedor actualizado exitosamente');
    } catch (error) {
      toast.error('Error al actualizar el proveedor');
    } finally {
      setIsLoading(false);
    }
  };

  const eliminarProveedor = async (id: string) => {
    setIsLoading(true);
    try {
      // Simular llamada API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setProveedores(prev => prev.filter(p => p.id !== id));
      toast.success('Proveedor eliminado exitosamente');
    } catch (error) {
      toast.error('Error al eliminar el proveedor');
    } finally {
      setIsLoading(false);
    }
  };

  const handleNuevoProveedor = () => {
    setNuevoProveedor({
      totalGastado: 0,
      numeroTransacciones: 0,
      ultimoGasto: new Date().toISOString().split('T')[0],
    });
    setMostrarModalNuevoProveedor(true);
  };

  const handleEditarProveedor = (proveedor: Proveedor) => {
    setProveedorEditando(proveedor);
    setNuevoProveedor(proveedor);
    setMostrarModalNuevoProveedor(true);
  };

  const handleVerDetallesProveedor = (proveedor: Proveedor) => {
    setProveedorSeleccionado(proveedor);
    setMostrarModalDetallesProveedor(true);
  };

  const handleEliminarProveedor = (proveedor: Proveedor) => {
    setConfirmModal({
      isOpen: true,
      title: 'Eliminar Proveedor',
      message: `¿Estás seguro de que quieres eliminar el proveedor "${proveedor.nombre}"? Esta acción no se puede deshacer.`,
      type: 'danger',
      onConfirm: () => {
        eliminarProveedor(proveedor.id);
        setConfirmModal({ isOpen: false, title: '', message: '', onConfirm: () => {} });
      }
    });
  };

  // ============= FUNCIONES DE GESTIÓN DE PRESUPUESTOS =============
  const actualizarPresupuesto = async (categoria: string, nuevoPresupuesto: number) => {
    if (nuevoPresupuesto < 0) {
      toast.error('El presupuesto no puede ser negativo');
      return;
    }

    setIsLoading(true);
    try {
      // Simular llamada API
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setPresupuestosEditables(prev => ({
        ...prev,
        [categoria]: nuevoPresupuesto
      }));
      
      toast.success(`Presupuesto de ${getCategoriaInfo(categoria).label} actualizado`);
    } catch (error) {
      toast.error('Error al actualizar el presupuesto');
    } finally {
      setIsLoading(false);
    }
  };

  const actualizarPresupuestoIndividual = (categoria: string, valor: number) => {
    setPresupuestosTemporales(prev => ({
      ...prev,
      [categoria]: valor
    }));
  };

  const guardarTodosLosPresupuestos = async () => {
    setIsLoading(true);
    try {
      // Simular llamada API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setPresupuestosEditables(presupuestosTemporales);
      toast.success('Todos los presupuestos han sido actualizados');
    } catch (error) {
      toast.error('Error al guardar los presupuestos');
    } finally {
      setIsLoading(false);
    }
  };

  const resetearPresupuestos = () => {
    setPresupuestosTemporales(presupuestosEditables);
    toast('Presupuestos restablecidos', { icon: '↩️' });
  };

  const copiarPresupuestosAMeses = () => {
    setInputModal({
      isOpen: true,
      title: 'Copiar Presupuestos',
      message: 'Selecciona los meses a los que quieres copiar estos presupuestos:',
      onConfirm: (meses) => {
        // Simular copia a otros meses
        toast.success(`Presupuestos copiados a ${meses} meses`);
        setInputModal({ isOpen: false, title: '', message: '', onConfirm: () => {} });
      }
    });
  };

  const aplicarPresupuestoPorcentual = (porcentaje: number) => {
    const nuevosPresupuestos = { ...presupuestosTemporales };
    Object.keys(nuevosPresupuestos).forEach(categoria => {
      nuevosPresupuestos[categoria] = Math.round(presupuestosEditables[categoria] * (porcentaje / 100));
    });
    setPresupuestosTemporales(nuevosPresupuestos);
    toast.success(`Presupuestos ajustados al ${porcentaje}%`);
  };

  const duplicarPresupuestoAnterior = () => {
    // Simular obtener presupuesto del mes anterior
    toast.success('Presupuesto del mes anterior aplicado');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/30 pb-12">
      {/* Hero Header con gradiente */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 shadow-2xl mb-8 p-8 md:p-12"
      >
        {/* Efectos de fondo animados */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        <div className="relative z-10 max-w-[1920px] mx-auto">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="bg-white/20 backdrop-blur-md rounded-2xl p-4">
                  <CreditCard className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-400 rounded-full border-2 border-white animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                  Gestión de <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Gastos</span>
                </h1>
                <p className="text-lg md:text-xl text-blue-100 mt-2 max-w-2xl flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Control completo de gastos y presupuestos
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <div className="flex bg-white/10 backdrop-blur-md border border-white/20 rounded-xl overflow-hidden">
                <select
                  value={periodo}
                  onChange={(e) => setPeriodo(e.target.value)}
                  className="px-3 py-2 text-sm font-semibold bg-transparent text-white border-none focus:outline-none cursor-pointer"
                >
                  <option value="2025-09">Septiembre 2025</option>
                  <option value="2025-08">Agosto 2025</option>
                  <option value="2025-07">Julio 2025</option>
                  <option value="2025-06">Junio 2025</option>
                  <option value="2025-05">Mayo 2025</option>
                  <option value="2025-04">Abril 2025</option>
                </select>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => importInputRef.current?.click()}
                className="flex items-center gap-2 px-4 py-2.5 bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-300"
              >
                <Upload className="w-4 h-4" />
                <span className="hidden sm:inline">Importar</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setMostrarModalPresupuestos(true)}
                className="flex items-center gap-2 px-4 py-2.5 bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-300"
              >
                <Settings className="w-4 h-4" />
                <span className="hidden sm:inline">Presupuestos</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNuevoGasto}
                className="flex items-center gap-2 px-6 py-2.5 bg-white text-emerald-600 font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <Plus className="w-5 h-5" />
                <span>Nuevo Gasto</span>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Section */}
      <div className="max-w-[1920px] mx-auto px-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-6 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-2.5 bg-red-50 rounded-lg">
                <CreditCard className="w-6 h-6 text-red-600" />
              </div>
            </div>
            <p className="text-sm font-medium text-gray-600 mb-1">Gastos Totales</p>
            <p className="text-3xl font-bold text-red-600">
              {totalGastos.toLocaleString('es-ES', { minimumFractionDigits: 2 })}€
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-2.5 bg-orange-50 rounded-lg">
                <Calendar className="w-6 h-6 text-orange-600" />
              </div>
            </div>
            <p className="text-sm font-medium text-gray-600 mb-1">Gastos de {periodo}</p>
            <p className="text-3xl font-bold text-orange-600">
              {totalGastosMes.toLocaleString('es-ES', { minimumFractionDigits: 2 })}€
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-2.5 bg-green-50 rounded-lg">
                <Target className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-sm font-bold text-green-600">{porcentajePresupuesto.toFixed(1)}%</span>
            </div>
            <p className="text-sm font-medium text-gray-600 mb-1">Presupuesto Restante</p>
            <p className="text-3xl font-bold text-green-600">
              {presupuestoRestante.toLocaleString('es-ES', { minimumFractionDigits: 2 })}€
            </p>
            <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all ${
                  porcentajePresupuesto > 90 ? 'bg-red-500' :
                  porcentajePresupuesto > 70 ? 'bg-yellow-500' :
                  'bg-green-500'
                }`}
                style={{ width: `${Math.min(porcentajePresupuesto, 100)}%` }}
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-2.5 bg-blue-50 rounded-lg">
                <RefreshCw className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <p className="text-sm font-medium text-gray-600 mb-1">Gastos Recurrentes</p>
            <p className="text-3xl font-bold text-blue-600">
              {gastosRecurrentes.toLocaleString('es-ES', { minimumFractionDigits: 2 })}€
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-2.5 bg-yellow-50 rounded-lg">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
            <p className="text-sm font-medium text-gray-600 mb-1">Por Aprobar/Pagar</p>
            <p className="text-3xl font-bold text-yellow-600">
              {gastosPendientesAprobar}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-2.5 bg-purple-50 rounded-lg">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <p className="text-sm font-medium text-gray-600 mb-1">Mayor Categoría</p>
            <p className="text-3xl font-bold text-purple-600">
              {mayorCategoria.monto.toLocaleString('es-ES', { minimumFractionDigits: 2 })}€
            </p>
            <p className="text-xs text-gray-500 mt-1 truncate">{mayorCategoria.categoria}</p>
          </motion.div>
        </div>

        {/* ALERTAS */}
        {alertas.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Bell className="text-orange-400" size={24} />
                <h3 className="text-xl font-bold text-white">Alertas y Notificaciones</h3>
                <span className="bg-orange-500/20 text-orange-400 px-3 py-1 rounded-full text-sm font-medium">
                  {alertas.length}
                </span>
              </div>
              <button
                onClick={() => setMostrarAlertas(!mostrarAlertas)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                {mostrarAlertas ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
            </div>

            {mostrarAlertas && (
              <div className="space-y-2">
                {alertas.map(alerta => (
                  <div
                    key={alerta.id}
                    className={`p-4 rounded-xl border flex items-start gap-3 ${
                      alerta.severidad === 'alta' ? 'bg-red-500/10 border-red-500/30' :
                      alerta.severidad === 'media' ? 'bg-yellow-500/10 border-yellow-500/30' :
                      'bg-blue-500/10 border-blue-500/30'
                    }`}
                  >
                    <AlertCircle
                      className={
                        alerta.severidad === 'alta' ? 'text-red-400' :
                        alerta.severidad === 'media' ? 'text-yellow-400' :
                        'text-blue-400'
                      }
                      size={20}
                    />
                    <div className="flex-1">
                      <p className="text-white">{alerta.mensaje}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* GRÁFICOS */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Gráfico por categorías */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <BarChart3 className="text-orange-400" size={24} />
                <h3 className="text-xl font-bold text-white">Gastos por Categoría</h3>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setVistaPorcentaje(!vistaPorcentaje)}
                  className="text-slate-400 hover:text-white transition-colors px-3 py-1 rounded-lg hover:bg-slate-700/50"
                >
                  {vistaPorcentaje ? '€' : '%'}
                </button>
              </div>
            </div>

            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={datosGraficoCategorias} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis type="number" stroke="#94a3b8" />
                <YAxis dataKey="categoria" type="category" width={150} stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: '1px solid #334155',
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                />
                <Bar dataKey={vistaPorcentaje ? "porcentaje" : "gasto"} radius={[0, 8, 8, 0]}>
                  {datosGraficoCategorias.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.excede ? '#EF4444' : '#F59E0B'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>

            <div className="mt-4 grid grid-cols-2 gap-4">
              {datosGraficoCategorias.map((cat, idx) => (
                <div key={idx} className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">{cat.categoria}</span>
                  <span className={`font-medium ${cat.excede ? 'text-red-400' : 'text-green-400'}`}>
                    {cat.porcentaje.toFixed(1)}%
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Gráfico evolución temporal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50"
          >
            <div className="flex items-center gap-3 mb-6">
              <LineChart className="text-blue-400" size={24} />
              <h3 className="text-xl font-bold text-white">Evolución Temporal</h3>
            </div>

            <ResponsiveContainer width="100%" height={400}>
              <RechartsLineChart data={datosGraficoEvolucion}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="mes" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: '1px solid #334155',
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                />
                <Legend />
                <Line type="monotone" dataKey="total" stroke="#F59E0B" strokeWidth={3} name="Total" />
                <Line type="monotone" dataKey="presupuesto" stroke="#10B981" strokeWidth={2} strokeDasharray="5 5" name="Presupuesto" />
                <Line type="monotone" dataKey="promedio" stroke="#6B7280" strokeWidth={2} strokeDasharray="3 3" name="Promedio" />
              </RechartsLineChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* TABS Y FILTROS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50"
        >
          {/* Tabs */}
          <div className="flex gap-2 mb-6 overflow-x-auto">
            {[
              { id: 'todos', label: 'Todos los Gastos', count: gastosMes.length },
              { id: 'pendientes', label: 'Pendientes de Pago', count: gastosMes.filter(g => g.estado === 'Pendiente').length },
              { id: 'pagados', label: 'Pagados', count: gastosMes.filter(g => g.estado === 'Pagado').length },
              { id: 'recurrentes', label: 'Recurrentes', count: gastosMes.filter(g => g.esRecurrente).length },
              { id: 'aprobar', label: 'Por Aprobar', count: gastosMes.filter(g => g.estado === 'Aprobado' || g.estado === 'Rechazado').length },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => {
                  setTabActual(tab.id as any);
                  setPaginaActual(1);
                }}
                className={`px-6 py-3 rounded-xl font-medium transition-all whitespace-nowrap ${
                  tabActual === tab.id
                    ? 'bg-orange-500 text-white'
                    : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {tab.label}
                <span className="ml-2 bg-white/20 px-2 py-0.5 rounded-full text-xs">
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* Búsqueda y filtros */}
          <div className="flex gap-4 mb-6 flex-wrap">
            <div className="flex-1 min-w-[300px] relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input
                type="text"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                placeholder="Buscar por concepto, proveedor..."
                className="w-full bg-slate-700/50 text-white pl-10 pr-4 py-3 rounded-xl border border-slate-600 focus:border-orange-500 focus:outline-none"
              />
            </div>

            <button
              onClick={() => setMostrarFiltros(!mostrarFiltros)}
              className="bg-slate-700/50 text-white px-6 py-3 rounded-xl border border-slate-600 hover:bg-slate-700 transition-all flex items-center gap-2"
            >
              <Filter size={20} />
              Filtros
              {(filtroCategoria || filtroProveedor || filtroEstado) && (
                <span className="bg-orange-500 w-2 h-2 rounded-full" />
              )}
            </button>

            <select
              value={ordenarPor}
              onChange={(e) => setOrdenarPor(e.target.value as any)}
              className="bg-slate-700/50 text-white px-4 py-3 rounded-xl border border-slate-600"
            >
              <option value="fecha">Ordenar por Fecha</option>
              <option value="monto">Ordenar por Monto</option>
              <option value="categoria">Ordenar por Categoría</option>
            </select>

            <button
              onClick={() => setOrdenDireccion(prev => prev === 'asc' ? 'desc' : 'asc')}
              className="bg-slate-700/50 text-white px-4 py-3 rounded-xl border border-slate-600 hover:bg-slate-700"
            >
              {ordenDireccion === 'asc' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>

            <div className="flex gap-2 border-l border-slate-600 pl-4">
              <button
                onClick={() => setVistaActual('tabla')}
                className={`p-3 rounded-xl transition-all ${
                  vistaActual === 'tabla'
                    ? 'bg-orange-500 text-white'
                    : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'
                }`}
              >
                <List size={20} />
              </button>
              <button
                onClick={() => setVistaActual('cards')}
                className={`p-3 rounded-xl transition-all ${
                  vistaActual === 'cards'
                    ? 'bg-orange-500 text-white'
                    : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'
                }`}
              >
                <Grid size={20} />
              </button>
            </div>

            <button 
              onClick={exportarGastos}
              className="bg-slate-700/50 text-white px-6 py-3 rounded-xl border border-slate-600 hover:bg-slate-700 flex items-center gap-2"
            >
              <Download size={20} />
              Exportar
            </button>
          </div>

          {/* Panel de filtros */}
          {mostrarFiltros && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mb-6 p-6 bg-slate-700/30 rounded-xl border border-slate-600"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-slate-300 mb-2 text-sm">Categoría</label>
                  <select
                    value={filtroCategoria}
                    onChange={(e) => setFiltroCategoria(e.target.value)}
                    className="w-full bg-slate-700 text-white px-4 py-2 rounded-lg border border-slate-600"
                  >
                    <option value="">Todas las categorías</option>
                    {categorias.map(cat => (
                      <option key={cat.value} value={cat.value}>{cat.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 mb-2 text-sm">Proveedor</label>
                  <select
                    value={filtroProveedor}
                    onChange={(e) => setFiltroProveedor(e.target.value)}
                    className="w-full bg-slate-700 text-white px-4 py-2 rounded-lg border border-slate-600"
                  >
                    <option value="">Todos los proveedores</option>
                    {proveedores.map(p => (
                      <option key={p.id} value={p.nombre}>{p.nombre}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 mb-2 text-sm">Estado</label>
                  <select
                    value={filtroEstado}
                    onChange={(e) => setFiltroEstado(e.target.value)}
                    className="w-full bg-slate-700 text-white px-4 py-2 rounded-lg border border-slate-600"
                  >
                    <option value="">Todos los estados</option>
                    <option value="Pagado">Pagado</option>
                    <option value="Pendiente">Pendiente</option>
                    <option value="Aprobado">Aprobado</option>
                    <option value="Rechazado">Rechazado</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => {
                    setFiltroCategoria('');
                    setFiltroProveedor('');
                    setFiltroEstado('');
                  }}
                  className="text-orange-400 hover:text-orange-300 text-sm"
                >
                  Limpiar filtros
                </button>
              </div>
            </motion.div>
          )}

          {/* Vista Tabla */}
          {vistaActual === 'tabla' && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="text-left py-4 px-4">
                      <input
                        type="checkbox"
                        checked={seleccionados.length === gastosPaginados.length && gastosPaginados.length > 0}
                        onChange={toggleTodos}
                        className="w-4 h-4 rounded border-slate-600 bg-slate-700"
                      />
                    </th>
                    <th className="text-left py-4 px-4 text-slate-300 font-medium">Fecha</th>
                    <th className="text-left py-4 px-4 text-slate-300 font-medium">Concepto</th>
                    <th className="text-left py-4 px-4 text-slate-300 font-medium">Categoría</th>
                    <th className="text-left py-4 px-4 text-slate-300 font-medium">Proveedor</th>
                    <th className="text-left py-4 px-4 text-slate-300 font-medium">Método</th>
                    <th className="text-right py-4 px-4 text-slate-300 font-medium">Monto</th>
                    <th className="text-center py-4 px-4 text-slate-300 font-medium">Estado</th>
                    <th className="text-center py-4 px-4 text-slate-300 font-medium">Info</th>
                    <th className="text-center py-4 px-4 text-slate-300 font-medium">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {gastosPaginados.map((gasto, idx) => {
                    const catInfo = getCategoriaInfo(gasto.categoria);
                    return (
                      <React.Fragment key={gasto.id}>
                        <motion.tr
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors cursor-pointer"
                          onClick={() => setGastoExpandido(gastoExpandido === gasto.id ? null : gasto.id)}
                        >
                          <td className="py-4 px-4" onClick={(e) => e.stopPropagation()}>
                            <input
                              type="checkbox"
                              checked={seleccionados.includes(gasto.id)}
                              onChange={() => toggleSeleccion(gasto.id)}
                              className="w-4 h-4 rounded border-slate-600 bg-slate-700"
                            />
                          </td>
                          <td className="py-4 px-4 text-slate-300">
                            {new Date(gasto.fecha).toLocaleDateString('es-ES')}
                          </td>
                          <td className="py-4 px-4">
                            <div className="text-white font-medium">{gasto.concepto}</div>
                            <div className="text-slate-400 text-sm">{gasto.descripcion}</div>
                          </td>
                          <td className="py-4 px-4">
                            <span
                              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium"
                              style={{ backgroundColor: `${catInfo.color}20`, color: catInfo.color }}
                            >
                              <catInfo.icono size={14} />
                              {catInfo.label}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-slate-300">{gasto.proveedor}</td>
                          <td className="py-4 px-4 text-slate-300 text-sm">{gasto.metodoPago}</td>
                          <td className="py-4 px-4 text-right text-white font-semibold">
                            {gasto.monto.toLocaleString('es-ES', { minimumFractionDigits: 2 })}€
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex justify-center">
                              <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getEstadoBadgeColor(gasto.estado)}`}>
                                {gasto.estado}
                              </span>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex justify-center gap-2">
                              {gasto.tieneFactura && (
                                <FileText className="text-green-400" size={16} />
                              )}
                              {gasto.esRecurrente && (
                                <RefreshCw className="text-blue-400" size={16} />
                              )}
                            </div>
                          </td>
                          <td className="py-4 px-4" onClick={(e) => e.stopPropagation()}>
                            <div className="flex justify-center gap-2">
                              <button 
                                onClick={() => setGastoExpandido(gastoExpandido === gasto.id ? null : gasto.id)}
                                className="text-blue-400 hover:text-blue-300 p-1"
                                title="Ver detalles"
                              >
                                <Eye size={16} />
                              </button>
                              <button 
                                onClick={() => handleEditarGasto(gasto)}
                                className="text-yellow-400 hover:text-yellow-300 p-1"
                                title="Editar gasto"
                              >
                                <Edit2 size={16} />
                              </button>
                              <button 
                                onClick={() => handleEliminarGasto(gasto)}
                                className="text-red-400 hover:text-red-300 p-1"
                                title="Eliminar gasto"
                              >
                                <Trash2 size={16} />
                              </button>
                              {gasto.estado === 'Pendiente' && (
                                <button 
                                  onClick={() => cambiarEstadoGasto(gasto.id, 'Pagado')}
                                  className="text-green-400 hover:text-green-300 p-1" 
                                  title="Marcar como pagado"
                                >
                                  <CheckCircle size={16} />
                                </button>
                              )}
                            </div>
                          </td>
                        </motion.tr>

                        {/* Fila expandida */}
                        {gastoExpandido === gasto.id && (
                          <motion.tr
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="bg-slate-700/20 border-b border-slate-700/50"
                          >
                            <td colSpan={10} className="p-6">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-3">
                                  <h4 className="text-white font-semibold mb-3">Detalles del Gasto</h4>
                                  {gasto.referencia && (
                                    <div className="flex justify-between">
                                      <span className="text-slate-400">Referencia:</span>
                                      <span className="text-white font-mono">{gasto.referencia}</span>
                                    </div>
                                  )}
                                  {gasto.notas && (
                                    <div>
                                      <span className="text-slate-400">Notas:</span>
                                      <p className="text-white mt-1">{gasto.notas}</p>
                                    </div>
                                  )}
                                  {gasto.esRecurrente && (
                                    <>
                                      <div className="flex justify-between">
                                        <span className="text-slate-400">Frecuencia:</span>
                                        <span className="text-white">{gasto.frecuencia}</span>
                                      </div>
                                      {gasto.proximaRecurrencia && (
                                        <div className="flex justify-between">
                                          <span className="text-slate-400">Próxima recurrencia:</span>
                                          <span className="text-white">
                                            {new Date(gasto.proximaRecurrencia).toLocaleDateString('es-ES')}
                                          </span>
                                        </div>
                                      )}
                                    </>
                                  )}
                                </div>

                                <div>
                                  <h4 className="text-white font-semibold mb-3">Documentos</h4>
                                  {gasto.tieneFactura ? (
                                    <div className="bg-slate-700/50 rounded-xl p-4 border border-slate-600 flex items-center justify-between">
                                      <div className="flex items-center gap-3">
                                        <FileText className="text-green-400" size={24} />
                                        <div>
                                          <div className="text-white font-medium">Factura adjunta</div>
                                          <div className="text-slate-400 text-sm">{gasto.facturaUrl || 'factura.pdf'}</div>
                                        </div>
                                      </div>
                                      <button className="text-blue-400 hover:text-blue-300 flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-600/50">
                                        <Eye size={16} />
                                        Ver
                                      </button>
                                    </div>
                                  ) : (
                                    <div className="bg-slate-700/50 rounded-xl p-4 border border-slate-600 flex items-center gap-3">
                                      <AlertCircle className="text-yellow-400" size={24} />
                                      <div>
                                        <div className="text-white font-medium">Sin factura adjunta</div>
                                        <button 
                                          onClick={() => handleSubirFactura(gasto.id)}
                                          className="text-blue-400 hover:text-blue-300 text-sm mt-1"
                                        >
                                          Subir factura
                                        </button>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </td>
                          </motion.tr>
                        )}
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>

              {gastosFiltrados.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-slate-400 text-lg">No se encontraron gastos</div>
                </div>
              )}
            </div>
          )}

          {/* Vista Cards */}
          {vistaActual === 'cards' && (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {gastosPaginados.map((gasto, idx) => {
                const catInfo = getCategoriaInfo(gasto.categoria);
                return (
                  <motion.div
                    key={gasto.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.05 }}
                    className="bg-slate-700/30 rounded-xl border border-slate-600 overflow-hidden hover:border-orange-500/50 transition-all"
                  >
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <span
                          className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium"
                          style={{ backgroundColor: `${catInfo.color}20`, color: catInfo.color }}
                        >
                          <catInfo.icono size={12} />
                          {catInfo.label}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getEstadoBadgeColor(gasto.estado)}`}>
                          {gasto.estado}
                        </span>
                      </div>

                      <h4 className="text-white font-semibold text-lg mb-1">{gasto.concepto}</h4>
                      <p className="text-slate-400 text-sm mb-3">{gasto.descripcion}</p>

                      <div className="flex items-baseline gap-2 mb-3">
                        <span className="text-3xl font-bold text-white">
                          {gasto.monto.toLocaleString('es-ES', { minimumFractionDigits: 2 })}€
                        </span>
                      </div>

                      <div className="space-y-2 text-sm mb-4">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400">Proveedor:</span>
                          <span className="text-white">{gasto.proveedor}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400">Fecha:</span>
                          <span className="text-white">{new Date(gasto.fecha).toLocaleDateString('es-ES')}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400">Método:</span>
                          <span className="text-white">{gasto.metodoPago}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mb-4">
                        {gasto.tieneFactura && (
                          <span className="flex items-center gap-1 text-xs text-green-400">
                            <FileText size={12} />
                            Con factura
                          </span>
                        )}
                        {gasto.esRecurrente && (
                          <span className="flex items-center gap-1 text-xs text-blue-400">
                            <RefreshCw size={12} />
                            {gasto.frecuencia}
                          </span>
                        )}
                      </div>

                      <div className="flex gap-2">
                        <button 
                          onClick={() => handleVerDetalles(gasto)}
                          className="flex-1 bg-blue-500/20 text-blue-400 py-2 rounded-lg hover:bg-blue-500/30 transition-all flex items-center justify-center gap-2"
                        >
                          <Eye size={16} />
                          Ver
                        </button>
                        <button 
                          onClick={() => handleEditarGasto(gasto)}
                          className="flex-1 bg-yellow-500/20 text-yellow-400 py-2 rounded-lg hover:bg-yellow-500/30 transition-all flex items-center justify-center gap-2"
                        >
                          <Edit2 size={16} />
                          Editar
                        </button>
                        {gasto.estado === 'Pendiente' && (
                          <button 
                            onClick={() => cambiarEstadoGasto(gasto.id, 'Pagado')}
                            className="bg-green-500/20 text-green-400 p-2 rounded-lg hover:bg-green-500/30 transition-all"
                            title="Marcar como pagado"
                          >
                            <Check size={16} />
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}

          {/* Paginación */}
          {totalPaginas > 1 && (
            <div className="flex items-center justify-between mt-6 pt-6 border-t border-slate-700">
              <div className="text-slate-400 text-sm">
                Mostrando {((paginaActual - 1) * gastosPorPagina) + 1} a {Math.min(paginaActual * gastosPorPagina, gastosFiltrados.length)} de {gastosFiltrados.length} gastos
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setPaginaActual(p => Math.max(1, p - 1))}
                  disabled={paginaActual === 1}
                  className="px-4 py-2 rounded-lg bg-slate-700 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-600"
                >
                  <ChevronLeft size={20} />
                </button>
                {Array.from({ length: totalPaginas }, (_, i) => i + 1).map(num => (
                  <button
                    key={num}
                    onClick={() => setPaginaActual(num)}
                    className={`px-4 py-2 rounded-lg ${
                      paginaActual === num
                        ? 'bg-orange-500 text-white'
                        : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                    }`}
                  >
                    {num}
                  </button>
                ))}
                <button
                  onClick={() => setPaginaActual(p => Math.min(totalPaginas, p + 1))}
                  disabled={paginaActual === totalPaginas}
                  className="px-4 py-2 rounded-lg bg-slate-700 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-600"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          )}
        </motion.div>

        {/* Acciones masivas */}
        <AnimatePresence>
          {seleccionados.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-slate-800 border border-slate-700 rounded-2xl p-4 shadow-2xl flex items-center gap-4 z-50"
            >
              <div className="text-white font-medium">
                {seleccionados.length} gastos seleccionados
              </div>
              <div className="h-6 w-px bg-slate-600" />
              <button 
                onClick={handleCambiarCategoria}
                className="text-blue-400 hover:text-blue-300 px-4 py-2 rounded-lg hover:bg-slate-700 transition-all"
              >
                Cambiar categoría
              </button>
              <button 
                onClick={marcarComoPagadoMasivo}
                className="text-green-400 hover:text-green-300 px-4 py-2 rounded-lg hover:bg-slate-700 transition-all"
              >
                Marcar como pagado
              </button>
              <button 
                onClick={exportarGastos}
                className="text-yellow-400 hover:text-yellow-300 px-4 py-2 rounded-lg hover:bg-slate-700 transition-all"
              >
                Exportar
              </button>
              <button 
                onClick={eliminarMasivo}
                className="text-red-400 hover:text-red-300 px-4 py-2 rounded-lg hover:bg-slate-700 transition-all"
              >
                Eliminar
              </button>
              <button
                onClick={() => setSeleccionados([])}
                className="text-slate-400 hover:text-white ml-2"
              >
                <X size={20} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Botones flotantes adicionales */}
        <div className="fixed bottom-6 right-6 flex flex-col gap-3">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => toast('Funcionalidad de gastos recurrentes próximamente', { icon: 'ℹ️' })}
            className="bg-blue-500 text-white p-4 rounded-full shadow-xl hover:shadow-2xl transition-all"
            title="Gastos recurrentes"
          >
            <RefreshCw size={24} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setMostrarModalProveedores(true)}
            className="bg-purple-500 text-white p-4 rounded-full shadow-xl hover:shadow-2xl transition-all"
            title="Gestionar proveedores"
          >
            <Users size={24} />
          </motion.button>
        </div>

        {/* MODAL NUEVO GASTO */}
        <AnimatePresence>
          {mostrarModalNuevo && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-6"
              onClick={() => setMostrarModalNuevo(false)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-slate-800 rounded-2xl border border-slate-700 p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-white">
                    {gastoEditando ? 'Editar Gasto' : 'Nuevo Gasto'}
                  </h3>
                  <button
                    onClick={() => {
                      setMostrarModalNuevo(false);
                      setGastoEditando(null);
                      setNuevoGasto({});
                    }}
                    className="text-slate-400 hover:text-white"
                  >
                    <X size={24} />
                  </button>
                </div>

                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (gastoEditando) {
                      editarGasto(gastoEditando.id, nuevoGasto);
                    } else {
                      crearGasto(nuevoGasto);
                    }
                  }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-slate-300 mb-2 text-sm">Fecha del Gasto</label>
                      <input
                        type="date"
                        value={nuevoGasto.fecha || ''}
                        onChange={(e) => setNuevoGasto(prev => ({ ...prev, fecha: e.target.value }))}
                        className="w-full bg-slate-700 text-white px-4 py-3 rounded-xl border border-slate-600 focus:border-orange-500 focus:outline-none"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-slate-300 mb-2 text-sm">Categoría</label>
                      <select 
                        value={nuevoGasto.categoria || ''}
                        onChange={(e) => setNuevoGasto(prev => ({ ...prev, categoria: e.target.value }))}
                        className="w-full bg-slate-700 text-white px-4 py-3 rounded-xl border border-slate-600 focus:border-orange-500 focus:outline-none"
                        required
                      >
                        <option value="">Seleccionar categoría...</option>
                        {categorias.map(cat => (
                          <option key={cat.value} value={cat.value}>{cat.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-2 text-sm">Concepto</label>
                    <input
                      type="text"
                      value={nuevoGasto.concepto || ''}
                      onChange={(e) => setNuevoGasto(prev => ({ ...prev, concepto: e.target.value }))}
                      placeholder="Ej: Factura electricidad Septiembre"
                      className="w-full bg-slate-700 text-white px-4 py-3 rounded-xl border border-slate-600 focus:border-orange-500 focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-2 text-sm">Descripción</label>
                    <textarea
                      value={nuevoGasto.descripcion || ''}
                      onChange={(e) => setNuevoGasto(prev => ({ ...prev, descripcion: e.target.value }))}
                      placeholder="Descripción detallada del gasto..."
                      rows={3}
                      className="w-full bg-slate-700 text-white px-4 py-3 rounded-xl border border-slate-600 focus:border-orange-500 focus:outline-none resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-slate-300 mb-2 text-sm">Proveedor</label>
                      <select 
                        value={nuevoGasto.proveedor || ''}
                        onChange={(e) => setNuevoGasto(prev => ({ ...prev, proveedor: e.target.value }))}
                        className="w-full bg-slate-700 text-white px-4 py-3 rounded-xl border border-slate-600 focus:border-orange-500 focus:outline-none"
                        required
                      >
                        <option value="">Seleccionar proveedor...</option>
                        {proveedores.map(p => (
                          <option key={p.id} value={p.nombre}>{p.nombre}</option>
                        ))}
                        <option value="nuevo">+ Nuevo proveedor</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-slate-300 mb-2 text-sm">Monto (€)</label>
                      <input
                        type="number"
                        step="0.01"
                        value={nuevoGasto.monto || ''}
                        onChange={(e) => setNuevoGasto(prev => ({ ...prev, monto: parseFloat(e.target.value) || 0 }))}
                        placeholder="0.00"
                        className="w-full bg-slate-700 text-white px-4 py-3 rounded-xl border border-slate-600 focus:border-orange-500 focus:outline-none"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-slate-300 mb-2 text-sm">Método de Pago</label>
                      <select 
                        value={nuevoGasto.metodoPago || 'Transferencia'}
                        onChange={(e) => setNuevoGasto(prev => ({ ...prev, metodoPago: e.target.value }))}
                        className="w-full bg-slate-700 text-white px-4 py-3 rounded-xl border border-slate-600 focus:border-orange-500 focus:outline-none"
                      >
                        <option value="Transferencia">Transferencia</option>
                        <option value="Tarjeta">Tarjeta</option>
                        <option value="Efectivo">Efectivo</option>
                        <option value="Domiciliación">Domiciliación</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-slate-300 mb-2 text-sm">Estado</label>
                      <select 
                        value={nuevoGasto.estado || 'Pendiente'}
                        onChange={(e) => setNuevoGasto(prev => ({ ...prev, estado: e.target.value as Gasto['estado'] }))}
                        className="w-full bg-slate-700 text-white px-4 py-3 rounded-xl border border-slate-600 focus:border-orange-500 focus:outline-none"
                      >
                        <option value="Pagado">Pagado</option>
                        <option value="Pendiente">Pendiente</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-2 text-sm">Referencia/Nº Factura</label>
                    <input
                      type="text"
                      value={nuevoGasto.referencia || ''}
                      onChange={(e) => setNuevoGasto(prev => ({ ...prev, referencia: e.target.value }))}
                      placeholder="Opcional"
                      className="w-full bg-slate-700 text-white px-4 py-3 rounded-xl border border-slate-600 focus:border-orange-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={nuevoGasto.esRecurrente || false}
                        onChange={(e) => setNuevoGasto(prev => ({ ...prev, esRecurrente: e.target.checked }))}
                        className="w-4 h-4 rounded" 
                      />
                      <span className="text-white">Es un gasto recurrente</span>
                    </label>
                  </div>

                  {nuevoGasto.esRecurrente && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-slate-300 mb-2 text-sm">Frecuencia</label>
                        <select 
                          value={nuevoGasto.frecuencia || ''}
                          onChange={(e) => setNuevoGasto(prev => ({ ...prev, frecuencia: e.target.value as Gasto['frecuencia'] }))}
                          className="w-full bg-slate-700 text-white px-4 py-3 rounded-xl border border-slate-600 focus:border-orange-500 focus:outline-none"
                        >
                          <option value="">Seleccionar frecuencia...</option>
                          <option value="Semanal">Semanal</option>
                          <option value="Mensual">Mensual</option>
                          <option value="Trimestral">Trimestral</option>
                          <option value="Anual">Anual</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-slate-300 mb-2 text-sm">Próxima Recurrencia</label>
                        <input
                          type="date"
                          value={nuevoGasto.proximaRecurrencia || ''}
                          onChange={(e) => setNuevoGasto(prev => ({ ...prev, proximaRecurrencia: e.target.value }))}
                          className="w-full bg-slate-700 text-white px-4 py-3 rounded-xl border border-slate-600 focus:border-orange-500 focus:outline-none"
                        />
                      </div>
                    </div>
                  )}

                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-slate-600 rounded-xl p-8 text-center hover:border-orange-500 transition-colors cursor-pointer"
                  >
                    <Upload className="mx-auto text-slate-400 mb-3" size={48} />
                    <p className="text-white font-medium mb-1">Adjuntar factura/comprobante</p>
                    <p className="text-slate-400 text-sm">Arrastra archivos aquí o haz clic para seleccionar</p>
                  </div>

                  <div className="flex gap-3 pt-6">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="flex-1 bg-orange-500 text-white py-3 rounded-xl font-semibold hover:bg-orange-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isLoading && (
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      )}
                      {gastoEditando ? 'Actualizar Gasto' : 'Guardar Gasto'}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (gastoEditando) {
                          editarGasto(gastoEditando.id, nuevoGasto);
                        } else {
                          crearGasto(nuevoGasto);
                        }
                        setNuevoGasto({
                          fecha: formatearFecha(new Date().toISOString()),
                          estado: 'Pendiente',
                          metodoPago: 'Transferencia',
                          esRecurrente: false,
                          tieneFactura: false,
                        });
                      }}
                      disabled={isLoading}
                      className="flex-1 bg-slate-700 text-white py-3 rounded-xl font-semibold hover:bg-slate-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Guardar y Nuevo
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setMostrarModalNuevo(false);
                        setGastoEditando(null);
                        setNuevoGasto({});
                      }}
                      disabled={isLoading}
                      className="px-6 bg-slate-700 text-white py-3 rounded-xl font-semibold hover:bg-slate-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Cancelar
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* MODAL PROVEEDORES */}
        <AnimatePresence>
          {mostrarModalProveedores && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-6"
              onClick={() => setMostrarModalProveedores(false)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-slate-800 rounded-2xl border border-slate-700 p-8 max-w-5xl w-full max-h-[90vh] overflow-y-auto"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-white">Gestión de Proveedores</h3>
                  <button
                    onClick={() => setMostrarModalProveedores(false)}
                    className="text-slate-400 hover:text-white"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="mb-6">
                  <button 
                    onClick={handleNuevoProveedor}
                    className="bg-orange-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-orange-600 transition-all flex items-center gap-2"
                  >
                    <Plus size={20} />
                    Nuevo Proveedor
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-700">
                        <th className="text-left py-3 px-4 text-slate-300 font-medium">Nombre</th>
                        <th className="text-left py-3 px-4 text-slate-300 font-medium">Categoría</th>
                        <th className="text-right py-3 px-4 text-slate-300 font-medium">Total Gastado</th>
                        <th className="text-center py-3 px-4 text-slate-300 font-medium">Transacciones</th>
                        <th className="text-left py-3 px-4 text-slate-300 font-medium">Último Gasto</th>
                        <th className="text-center py-3 px-4 text-slate-300 font-medium">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {proveedores.map(proveedor => {
                        const catInfo = getCategoriaInfo(proveedor.categoria);
                        return (
                          <tr key={proveedor.id} className="border-b border-slate-700/50 hover:bg-slate-700/30">
                            <td className="py-4 px-4">
                              <div className="text-white font-medium">{proveedor.nombre}</div>
                              {proveedor.contacto && (
                                <div className="text-slate-400 text-sm">{proveedor.contacto}</div>
                              )}
                            </td>
                            <td className="py-4 px-4">
                              <span
                                className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm"
                                style={{ backgroundColor: `${catInfo.color}20`, color: catInfo.color }}
                              >
                                {catInfo.label}
                              </span>
                            </td>
                            <td className="py-4 px-4 text-right text-white font-semibold">
                              {proveedor.totalGastado.toLocaleString('es-ES')}€
                            </td>
                            <td className="py-4 px-4 text-center text-slate-300">
                              {proveedor.numeroTransacciones}
                            </td>
                            <td className="py-4 px-4 text-slate-300">
                              {new Date(proveedor.ultimoGasto).toLocaleDateString('es-ES')}
                            </td>
                            <td className="py-4 px-4">
                              <div className="flex justify-center gap-2">
                                <button 
                                  onClick={() => handleVerDetallesProveedor(proveedor)}
                                  className="text-blue-400 hover:text-blue-300 p-1"
                                  title="Ver detalles"
                                >
                                  <Eye size={16} />
                                </button>
                                <button 
                                  onClick={() => handleEditarProveedor(proveedor)}
                                  className="text-yellow-400 hover:text-yellow-300 p-1"
                                  title="Editar proveedor"
                                >
                                  <Edit2 size={16} />
                                </button>
                                <button 
                                  onClick={() => handleEliminarProveedor(proveedor)}
                                  className="text-red-400 hover:text-red-300 p-1"
                                  title="Eliminar proveedor"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* MODAL PRESUPUESTOS */}
        <AnimatePresence>
          {mostrarModalPresupuestos && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-6"
              onClick={() => setMostrarModalPresupuestos(false)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-slate-800 rounded-2xl border border-slate-700 p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-white">Configuración de Presupuestos</h3>
                  <button
                    onClick={() => setMostrarModalPresupuestos(false)}
                    className="text-slate-400 hover:text-white"
                  >
                    <X size={24} />
                  </button>
                </div>

                {/* Botones de acción rápida */}
                <div className="mb-6 flex flex-wrap gap-3">
                  <button
                    onClick={() => aplicarPresupuestoPorcentual(110)}
                    className="bg-blue-500/20 text-blue-400 px-4 py-2 rounded-lg hover:bg-blue-500/30 transition-all text-sm"
                  >
                    +10% Todos
                  </button>
                  <button
                    onClick={() => aplicarPresupuestoPorcentual(90)}
                    className="bg-yellow-500/20 text-yellow-400 px-4 py-2 rounded-lg hover:bg-yellow-500/30 transition-all text-sm"
                  >
                    -10% Todos
                  </button>
                  <button
                    onClick={duplicarPresupuestoAnterior}
                    className="bg-green-500/20 text-green-400 px-4 py-2 rounded-lg hover:bg-green-500/30 transition-all text-sm"
                  >
                    Copiar Mes Anterior
                  </button>
                  <button
                    onClick={resetearPresupuestos}
                    className="bg-slate-500/20 text-slate-400 px-4 py-2 rounded-lg hover:bg-slate-500/30 transition-all text-sm"
                  >
                    Restablecer
                  </button>
                </div>

                <div className="space-y-4">
                  {presupuestos.map((presupuesto, idx) => {
                    const categoriaKey = categorias.find(c => c.label === presupuesto.categoria)?.value || '';
                    const presupuestoActual = presupuestosTemporales[categoriaKey] || presupuesto.presupuestoMensual;
                    const porcentaje = (presupuesto.gastoActual / presupuestoActual) * 100;
                    const restante = presupuestoActual - presupuesto.gastoActual;

                    return (
                      <div
                        key={idx}
                        className="bg-slate-700/30 rounded-xl border border-slate-600 p-6"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div
                              className="p-2 rounded-xl"
                              style={{ backgroundColor: `${presupuesto.color}20`, color: presupuesto.color }}
                            >
                              {presupuesto.icono}
                            </div>
                            <div>
                              <h4 className="text-white font-semibold">{presupuesto.categoria}</h4>
                              <p className="text-slate-400 text-sm">
                                {presupuesto.gastoActual.toLocaleString('es-ES')}€ de {presupuestoActual.toLocaleString('es-ES')}€
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className={`text-2xl font-bold ${
                              porcentaje > 100 ? 'text-red-400' :
                              porcentaje > 90 ? 'text-yellow-400' :
                              'text-green-400'
                            }`}>
                              {porcentaje.toFixed(1)}%
                            </div>
                            <div className="text-slate-400 text-sm">
                              {restante < 0 ? 'Excedido' : `Restante: ${restante.toFixed(2)}€`}
                            </div>
                          </div>
                        </div>

                        <div className="w-full bg-slate-700 rounded-full h-3 mb-4">
                          <div
                            className={`h-3 rounded-full transition-all ${
                              porcentaje > 100 ? 'bg-red-500' :
                              porcentaje > 90 ? 'bg-yellow-500' :
                              porcentaje > 70 ? 'bg-orange-500' :
                              'bg-green-500'
                            }`}
                            style={{ width: `${Math.min(porcentaje, 100)}%` }}
                          />
                        </div>

                        <div className="flex gap-3">
                          <input
                            type="number"
                            value={presupuestoActual}
                            onChange={(e) => actualizarPresupuestoIndividual(categoriaKey, parseFloat(e.target.value) || 0)}
                            className="flex-1 bg-slate-700 text-white px-4 py-2 rounded-lg border border-slate-600 focus:border-orange-500 focus:outline-none"
                            min="0"
                            step="0.01"
                          />
                          <button 
                            onClick={() => actualizarPresupuesto(categoriaKey, presupuestoActual)}
                            disabled={isLoading}
                            className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                          >
                            {isLoading && (
                              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            )}
                            Actualizar
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-6 pt-6 border-t border-slate-700">
                  <div className="flex justify-between items-center mb-4">
                    <div className="text-white">
                      <div className="text-2xl font-bold">
                        {Object.values(presupuestosTemporales).reduce((sum, p) => sum + p, 0).toLocaleString('es-ES')}€
                      </div>
                      <div className="text-slate-400 text-sm">Presupuesto Total Mensual</div>
                    </div>
                    <div className="flex gap-3">
                      <button 
                        onClick={copiarPresupuestosAMeses}
                        className="bg-slate-700 text-white px-6 py-3 rounded-xl hover:bg-slate-600 transition-all flex items-center gap-2"
                      >
                        <Copy size={16} />
                        Copiar a Otros Meses
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <button
                      onClick={guardarTodosLosPresupuestos}
                      disabled={isLoading}
                      className="flex-1 bg-green-500 text-white py-3 rounded-xl font-semibold hover:bg-green-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isLoading && (
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      )}
                      <Save size={16} />
                      Guardar Todos los Cambios
                    </button>
                    <button
                      onClick={resetearPresupuestos}
                      disabled={isLoading}
                      className="px-6 bg-slate-700 text-white py-3 rounded-xl font-semibold hover:bg-slate-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      <RefreshCw size={16} />
                      Restablecer
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* MODAL DE DETALLES DEL GASTO */}
        <AnimatePresence>
          {mostrarModalDetalles && gastoSeleccionado && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-6"
              onClick={() => setMostrarModalDetalles(false)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-slate-800 rounded-2xl border border-slate-700 p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-white">Detalles del Gasto</h3>
                  <button
                    onClick={() => setMostrarModalDetalles(false)}
                    className="text-slate-400 hover:text-white"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Información principal */}
                  <div className="space-y-6">
                    <div className="bg-slate-700/30 rounded-xl p-6">
                      <h4 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
                        <CreditCard size={20} />
                        Información General
                      </h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Concepto:</span>
                          <span className="text-white font-medium">{gastoSeleccionado.concepto}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Descripción:</span>
                          <span className="text-white">{gastoSeleccionado.descripcion || 'Sin descripción'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Monto:</span>
                          <span className="text-white font-bold text-xl">
                            {gastoSeleccionado.monto.toLocaleString('es-ES', { minimumFractionDigits: 2 })}€
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Fecha:</span>
                          <span className="text-white">
                            {new Date(gastoSeleccionado.fecha).toLocaleDateString('es-ES')}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-slate-700/30 rounded-xl p-6">
                      <h4 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
                        <Building size={20} />
                        Proveedor y Categoría
                      </h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Proveedor:</span>
                          <span className="text-white">{gastoSeleccionado.proveedor}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Categoría:</span>
                          <span
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium"
                            style={{ 
                              backgroundColor: `${getCategoriaInfo(gastoSeleccionado.categoria).color}20`, 
                              color: getCategoriaInfo(gastoSeleccionado.categoria).color 
                            }}
                          >
                            {React.createElement(getCategoriaInfo(gastoSeleccionado.categoria).icono, { size: 14 })}
                            {getCategoriaInfo(gastoSeleccionado.categoria).label}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Método de Pago:</span>
                          <span className="text-white">{gastoSeleccionado.metodoPago}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Estado:</span>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getEstadoBadgeColor(gastoSeleccionado.estado)}`}>
                            {gastoSeleccionado.estado}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Información adicional */}
                  <div className="space-y-6">
                    {gastoSeleccionado.referencia && (
                      <div className="bg-slate-700/30 rounded-xl p-6">
                        <h4 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
                          <FileText size={20} />
                          Referencia
                        </h4>
                        <div className="bg-slate-600/50 rounded-lg p-3">
                          <span className="text-white font-mono">{gastoSeleccionado.referencia}</span>
                        </div>
                      </div>
                    )}

                    {gastoSeleccionado.esRecurrente && (
                      <div className="bg-slate-700/30 rounded-xl p-6">
                        <h4 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
                          <RefreshCw size={20} />
                          Información Recurrente
                        </h4>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-slate-400">Frecuencia:</span>
                            <span className="text-white">{gastoSeleccionado.frecuencia}</span>
                          </div>
                          {gastoSeleccionado.proximaRecurrencia && (
                            <div className="flex justify-between">
                              <span className="text-slate-400">Próxima recurrencia:</span>
                              <span className="text-white">
                                {new Date(gastoSeleccionado.proximaRecurrencia).toLocaleDateString('es-ES')}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="bg-slate-700/30 rounded-xl p-6">
                      <h4 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
                        <FileText size={20} />
                        Documentos
                      </h4>
                      {gastoSeleccionado.tieneFactura ? (
                        <div className="bg-slate-600/50 rounded-lg p-4 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <FileText className="text-green-400" size={24} />
                            <div>
                              <div className="text-white font-medium">Factura adjunta</div>
                              <div className="text-slate-400 text-sm">{gastoSeleccionado.facturaUrl || 'factura.pdf'}</div>
                            </div>
                          </div>
                          <button className="text-blue-400 hover:text-blue-300 flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-500/50">
                            <Eye size={16} />
                            Ver
                          </button>
                        </div>
                      ) : (
                        <div className="bg-slate-600/50 rounded-lg p-4 flex items-center gap-3">
                          <AlertCircle className="text-yellow-400" size={24} />
                          <div>
                            <div className="text-white font-medium">Sin factura adjunta</div>
                            <button 
                              onClick={() => handleSubirFactura(gastoSeleccionado.id)}
                              className="text-blue-400 hover:text-blue-300 text-sm mt-1"
                            >
                              Subir factura
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 mt-8 pt-6 border-t border-slate-700">
                  <button
                    onClick={() => {
                      setMostrarModalDetalles(false);
                      handleEditarGasto(gastoSeleccionado);
                    }}
                    className="flex-1 bg-yellow-500 text-white py-3 rounded-xl font-semibold hover:bg-yellow-600 transition-all flex items-center justify-center gap-2"
                  >
                    <Edit2 size={16} />
                    Editar Gasto
                  </button>
                  <button
                    onClick={() => {
                      setMostrarModalDetalles(false);
                      handleEliminarGasto(gastoSeleccionado);
                    }}
                    className="flex-1 bg-red-500 text-white py-3 rounded-xl font-semibold hover:bg-red-600 transition-all flex items-center justify-center gap-2"
                  >
                    <Trash2 size={16} />
                    Eliminar Gasto
                  </button>
                  <button
                    onClick={() => setMostrarModalDetalles(false)}
                    className="px-6 bg-slate-700 text-white py-3 rounded-xl font-semibold hover:bg-slate-600 transition-all"
                  >
                    Cerrar
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* MODAL NUEVO/EDITAR PROVEEDOR */}
        <AnimatePresence>
          {mostrarModalNuevoProveedor && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-6"
              onClick={() => setMostrarModalNuevoProveedor(false)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-slate-800 rounded-2xl border border-slate-700 p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-white">
                    {proveedorEditando ? 'Editar Proveedor' : 'Nuevo Proveedor'}
                  </h3>
                  <button
                    onClick={() => {
                      setMostrarModalNuevoProveedor(false);
                      setProveedorEditando(null);
                      setNuevoProveedor({});
                    }}
                    className="text-slate-400 hover:text-white"
                  >
                    <X size={24} />
                  </button>
                </div>

                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (proveedorEditando) {
                      editarProveedor(proveedorEditando.id, nuevoProveedor);
                    } else {
                      crearProveedor(nuevoProveedor);
                    }
                  }}
                  className="space-y-6"
                >
                  <div>
                    <label className="block text-slate-300 mb-2 text-sm">Nombre del Proveedor</label>
                    <input
                      type="text"
                      value={nuevoProveedor.nombre || ''}
                      onChange={(e) => setNuevoProveedor(prev => ({ ...prev, nombre: e.target.value }))}
                      placeholder="Ej: Amazon Web Services"
                      className="w-full bg-slate-700 text-white px-4 py-3 rounded-xl border border-slate-600 focus:border-orange-500 focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-2 text-sm">Categoría</label>
                    <select 
                      value={nuevoProveedor.categoria || ''}
                      onChange={(e) => setNuevoProveedor(prev => ({ ...prev, categoria: e.target.value }))}
                      className="w-full bg-slate-700 text-white px-4 py-3 rounded-xl border border-slate-600 focus:border-orange-500 focus:outline-none"
                      required
                    >
                      <option value="">Seleccionar categoría...</option>
                      {categorias.map(cat => (
                        <option key={cat.value} value={cat.value}>{cat.label}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-2 text-sm">Contacto (Opcional)</label>
                    <input
                      type="email"
                      value={nuevoProveedor.contacto || ''}
                      onChange={(e) => setNuevoProveedor(prev => ({ ...prev, contacto: e.target.value }))}
                      placeholder="email@proveedor.com"
                      className="w-full bg-slate-700 text-white px-4 py-3 rounded-xl border border-slate-600 focus:border-orange-500 focus:outline-none"
                    />
                  </div>

                  <div className="flex gap-3 pt-6">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="flex-1 bg-orange-500 text-white py-3 rounded-xl font-semibold hover:bg-orange-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isLoading && (
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      )}
                      {proveedorEditando ? 'Actualizar Proveedor' : 'Crear Proveedor'}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setMostrarModalNuevoProveedor(false);
                        setProveedorEditando(null);
                        setNuevoProveedor({});
                      }}
                      disabled={isLoading}
                      className="px-6 bg-slate-700 text-white py-3 rounded-xl font-semibold hover:bg-slate-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Cancelar
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* MODAL DETALLES PROVEEDOR */}
        <AnimatePresence>
          {mostrarModalDetallesProveedor && proveedorSeleccionado && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-6"
              onClick={() => setMostrarModalDetallesProveedor(false)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-slate-800 rounded-2xl border border-slate-700 p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-white">Detalles del Proveedor</h3>
                  <button
                    onClick={() => setMostrarModalDetallesProveedor(false)}
                    className="text-slate-400 hover:text-white"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Información del proveedor */}
                  <div className="space-y-6">
                    <div className="bg-slate-700/30 rounded-xl p-6">
                      <h4 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
                        <Building size={20} />
                        Información General
                      </h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Nombre:</span>
                          <span className="text-white font-medium">{proveedorSeleccionado.nombre}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Categoría:</span>
                          <span
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium"
                            style={{ 
                              backgroundColor: `${getCategoriaInfo(proveedorSeleccionado.categoria).color}20`, 
                              color: getCategoriaInfo(proveedorSeleccionado.categoria).color 
                            }}
                          >
                            {React.createElement(getCategoriaInfo(proveedorSeleccionado.categoria).icono, { size: 14 })}
                            {getCategoriaInfo(proveedorSeleccionado.categoria).label}
                          </span>
                        </div>
                        {proveedorSeleccionado.contacto && (
                          <div className="flex justify-between">
                            <span className="text-slate-400">Contacto:</span>
                            <span className="text-white">{proveedorSeleccionado.contacto}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="bg-slate-700/30 rounded-xl p-6">
                      <h4 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
                        <CreditCard size={20} />
                        Estadísticas Financieras
                      </h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Total Gastado:</span>
                          <span className="text-white font-bold text-xl">
                            {proveedorSeleccionado.totalGastado.toLocaleString('es-ES', { minimumFractionDigits: 2 })}€
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Número de Transacciones:</span>
                          <span className="text-white font-semibold">{proveedorSeleccionado.numeroTransacciones}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Último Gasto:</span>
                          <span className="text-white">
                            {new Date(proveedorSeleccionado.ultimoGasto).toLocaleDateString('es-ES')}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Promedio por Transacción:</span>
                          <span className="text-white">
                            {proveedorSeleccionado.numeroTransacciones > 0 
                              ? (proveedorSeleccionado.totalGastado / proveedorSeleccionado.numeroTransacciones).toLocaleString('es-ES', { minimumFractionDigits: 2 }) + '€'
                              : '0€'
                            }
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Gastos recientes del proveedor */}
                  <div className="space-y-6">
                    <div className="bg-slate-700/30 rounded-xl p-6">
                      <h4 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
                        <FileText size={20} />
                        Gastos Recientes
                      </h4>
                      <div className="space-y-3 max-h-64 overflow-y-auto">
                        {gastos
                          .filter(g => g.proveedor === proveedorSeleccionado.nombre)
                          .slice(0, 10)
                          .map(gasto => (
                            <div key={gasto.id} className="bg-slate-600/50 rounded-lg p-3 flex justify-between items-center">
                              <div>
                                <div className="text-white font-medium text-sm">{gasto.concepto}</div>
                                <div className="text-slate-400 text-xs">
                                  {new Date(gasto.fecha).toLocaleDateString('es-ES')}
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-white font-semibold">
                                  {gasto.monto.toLocaleString('es-ES', { minimumFractionDigits: 2 })}€
                                </div>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getEstadoBadgeColor(gasto.estado)}`}>
                                  {gasto.estado}
                                </span>
                              </div>
                            </div>
                          ))}
                        {gastos.filter(g => g.proveedor === proveedorSeleccionado.nombre).length === 0 && (
                          <div className="text-slate-400 text-center py-4">
                            No hay gastos registrados para este proveedor
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 mt-8 pt-6 border-t border-slate-700">
                  <button
                    onClick={() => {
                      setMostrarModalDetallesProveedor(false);
                      handleEditarProveedor(proveedorSeleccionado);
                    }}
                    className="flex-1 bg-yellow-500 text-white py-3 rounded-xl font-semibold hover:bg-yellow-600 transition-all flex items-center justify-center gap-2"
                  >
                    <Edit2 size={16} />
                    Editar Proveedor
                  </button>
                  <button
                    onClick={() => {
                      setMostrarModalDetallesProveedor(false);
                      handleEliminarProveedor(proveedorSeleccionado);
                    }}
                    className="flex-1 bg-red-500 text-white py-3 rounded-xl font-semibold hover:bg-red-600 transition-all flex items-center justify-center gap-2"
                  >
                    <Trash2 size={16} />
                    Eliminar Proveedor
                  </button>
                  <button
                    onClick={() => setMostrarModalDetallesProveedor(false)}
                    className="px-6 bg-slate-700 text-white py-3 rounded-xl font-semibold hover:bg-slate-600 transition-all"
                  >
                    Cerrar
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* MODALES DE CONFIRMACIÓN E INPUT */}
        <ConfirmationModal
          isOpen={confirmModal.isOpen}
          onClose={() => setConfirmModal({ isOpen: false, title: '', message: '', onConfirm: () => {} })}
          onConfirm={confirmModal.onConfirm}
          title={confirmModal.title}
          message={confirmModal.message}
          type={confirmModal.type}
          isLoading={isLoading}
        />

        <InputModal
          isOpen={inputModal.isOpen}
          onClose={() => setInputModal({ isOpen: false, title: '', message: '', onConfirm: () => {} })}
          onConfirm={inputModal.onConfirm}
          title={inputModal.title}
          message={inputModal.message}
          placeholder={inputModal.placeholder}
          isLoading={isLoading}
        />

        {/* INPUTS DE ARCHIVO OCULTOS */}
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
          className="hidden"
        />
        <input
          ref={importInputRef}
          type="file"
          accept=".csv"
          onChange={importarGastos}
          className="hidden"
        />

      </div>
    </div>
  );
}