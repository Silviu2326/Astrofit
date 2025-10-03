import React, { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import {
  ArrowUp,
  ArrowDown,
  Calculator,
  Percent,
  FileText,
  Settings,
  Calendar,
  TrendingUp,
  Download,
  AlertCircle,
  CheckCircle,
  Clock,
  Plus,
  Save,
  Edit,
  Trash2,
  Search,
} from 'lucide-react';
import Modal from '../../../../components/ui/modal';
import ConfirmationModal from '../../../../components/ui/confirmation-modal';
import InputModal from '../../../../components/ui/input-modal';

// ============================================================================
// TIPOS Y INTERFACES
// ============================================================================

interface OperacionIVA {
  id: string;
  fecha: string;
  tipo: 'ingreso' | 'gasto';
  clienteProveedor: string;
  baseImponible: number;
  porcentajeIVA: number;
  cuotaIVA: number;
  total: number;
  numeroFactura: string;
}

interface ResumenTrimestral {
  trimestre: number;
  ivaRepercutido: number;
  ivaSoportado: number;
  resultado: number;
  estado: 'pendiente' | 'declarado' | 'pagado';
  fechaLimite: string;
}

interface RetencionIRPF {
  id: string;
  fecha: string;
  cliente: string;
  baseRetencion: number;
  porcentaje: number;
  importeRetenido: number;
  facturaAsociada: string;
}

interface Declaracion {
  id: string;
  tipo: string;
  modelo: string;
  periodo: string;
  fechaDeclaracion: string;
  resultado: number;
  estado: 'pendiente' | 'presentado' | 'pagado';
  fechaLimite: string;
}

interface OtroImpuesto {
  id: string;
  nombre: string;
  importeAnual: number;
  frecuencia: string;
  proximoVencimiento: string;
  estado: 'pendiente' | 'pagado';
}

// ============================================================================
// DATOS MOCKEADOS
// ============================================================================

const OPERACIONES_IVA: OperacionIVA[] = [
  // TRIMESTRE 1
  { id: '1', fecha: '2025-01-05', tipo: 'ingreso', clienteProveedor: 'Cliente A SL', baseImponible: 5000, porcentajeIVA: 21, cuotaIVA: 1050, total: 6050, numeroFactura: 'F-2025-001' },
  { id: '2', fecha: '2025-01-12', tipo: 'gasto', clienteProveedor: 'Proveedor Tech', baseImponible: 800, porcentajeIVA: 21, cuotaIVA: 168, total: 968, numeroFactura: 'P-001' },
  { id: '3', fecha: '2025-01-20', tipo: 'ingreso', clienteProveedor: 'Corporación Beta', baseImponible: 8500, porcentajeIVA: 21, cuotaIVA: 1785, total: 10285, numeroFactura: 'F-2025-002' },
  { id: '4', fecha: '2025-02-03', tipo: 'gasto', clienteProveedor: 'Suministros Office', baseImponible: 450, porcentajeIVA: 21, cuotaIVA: 94.5, total: 544.5, numeroFactura: 'P-002' },
  { id: '5', fecha: '2025-02-15', tipo: 'ingreso', clienteProveedor: 'StartUp Gamma', baseImponible: 3200, porcentajeIVA: 21, cuotaIVA: 672, total: 3872, numeroFactura: 'F-2025-003' },
  { id: '6', fecha: '2025-02-25', tipo: 'gasto', clienteProveedor: 'Asesoría Legal', baseImponible: 1200, porcentajeIVA: 21, cuotaIVA: 252, total: 1452, numeroFactura: 'P-003' },
  { id: '7', fecha: '2025-03-10', tipo: 'ingreso', clienteProveedor: 'Industrias Delta', baseImponible: 12000, porcentajeIVA: 21, cuotaIVA: 2520, total: 14520, numeroFactura: 'F-2025-004' },
  { id: '8', fecha: '2025-03-15', tipo: 'gasto', clienteProveedor: 'Alquiler Oficina', baseImponible: 1500, porcentajeIVA: 21, cuotaIVA: 315, total: 1815, numeroFactura: 'P-004' },
  { id: '9', fecha: '2025-03-22', tipo: 'ingreso', clienteProveedor: 'Consultoría Epsilon', baseImponible: 4500, porcentajeIVA: 21, cuotaIVA: 945, total: 5445, numeroFactura: 'F-2025-005' },
  { id: '10', fecha: '2025-03-28', tipo: 'gasto', clienteProveedor: 'Software SaaS', baseImponible: 600, porcentajeIVA: 21, cuotaIVA: 126, total: 726, numeroFactura: 'P-005' },

  // TRIMESTRE 2
  { id: '11', fecha: '2025-04-08', tipo: 'ingreso', clienteProveedor: 'Grupo Zeta', baseImponible: 9500, porcentajeIVA: 21, cuotaIVA: 1995, total: 11495, numeroFactura: 'F-2025-006' },
  { id: '12', fecha: '2025-04-15', tipo: 'gasto', clienteProveedor: 'Marketing Digital', baseImponible: 2000, porcentajeIVA: 21, cuotaIVA: 420, total: 2420, numeroFactura: 'P-006' },
  { id: '13', fecha: '2025-04-22', tipo: 'ingreso', clienteProveedor: 'Cliente A SL', baseImponible: 6200, porcentajeIVA: 21, cuotaIVA: 1302, total: 7502, numeroFactura: 'F-2025-007' },
  { id: '14', fecha: '2025-05-05', tipo: 'gasto', clienteProveedor: 'Suministros Office', baseImponible: 380, porcentajeIVA: 21, cuotaIVA: 79.8, total: 459.8, numeroFactura: 'P-007' },
  { id: '15', fecha: '2025-05-12', tipo: 'ingreso', clienteProveedor: 'Tech Solutions', baseImponible: 15000, porcentajeIVA: 21, cuotaIVA: 3150, total: 18150, numeroFactura: 'F-2025-008' },
  { id: '16', fecha: '2025-05-20', tipo: 'gasto', clienteProveedor: 'Formación Equipo', baseImponible: 1800, porcentajeIVA: 21, cuotaIVA: 378, total: 2178, numeroFactura: 'P-008' },
  { id: '17', fecha: '2025-06-03', tipo: 'ingreso', clienteProveedor: 'Corporación Beta', baseImponible: 7800, porcentajeIVA: 21, cuotaIVA: 1638, total: 9438, numeroFactura: 'F-2025-009' },
  { id: '18', fecha: '2025-06-10', tipo: 'gasto', clienteProveedor: 'Alquiler Oficina', baseImponible: 1500, porcentajeIVA: 21, cuotaIVA: 315, total: 1815, numeroFactura: 'P-009' },
  { id: '19', fecha: '2025-06-18', tipo: 'ingreso', clienteProveedor: 'StartUp Gamma', baseImponible: 5400, porcentajeIVA: 21, cuotaIVA: 1134, total: 6534, numeroFactura: 'F-2025-010' },
  { id: '20', fecha: '2025-06-25', tipo: 'gasto', clienteProveedor: 'Software SaaS', baseImponible: 600, porcentajeIVA: 21, cuotaIVA: 126, total: 726, numeroFactura: 'P-010' },

  // TRIMESTRE 3
  { id: '21', fecha: '2025-07-05', tipo: 'ingreso', clienteProveedor: 'Industrias Delta', baseImponible: 11000, porcentajeIVA: 21, cuotaIVA: 2310, total: 13310, numeroFactura: 'F-2025-011' },
  { id: '22', fecha: '2025-07-12', tipo: 'gasto', clienteProveedor: 'Proveedor Tech', baseImponible: 950, porcentajeIVA: 21, cuotaIVA: 199.5, total: 1149.5, numeroFactura: 'P-011' },
  { id: '23', fecha: '2025-07-20', tipo: 'ingreso', clienteProveedor: 'Grupo Zeta', baseImponible: 8900, porcentajeIVA: 21, cuotaIVA: 1869, total: 10769, numeroFactura: 'F-2025-012' },
  { id: '24', fecha: '2025-08-03', tipo: 'gasto', clienteProveedor: 'Marketing Digital', baseImponible: 1500, porcentajeIVA: 21, cuotaIVA: 315, total: 1815, numeroFactura: 'P-012' },
  { id: '25', fecha: '2025-08-15', tipo: 'ingreso', clienteProveedor: 'Tech Solutions', baseImponible: 13500, porcentajeIVA: 21, cuotaIVA: 2835, total: 16335, numeroFactura: 'F-2025-013' },
  { id: '26', fecha: '2025-08-22', tipo: 'gasto', clienteProveedor: 'Alquiler Oficina', baseImponible: 1500, porcentajeIVA: 21, cuotaIVA: 315, total: 1815, numeroFactura: 'P-013' },
  { id: '27', fecha: '2025-09-05', tipo: 'ingreso', clienteProveedor: 'Cliente A SL', baseImponible: 7200, porcentajeIVA: 21, cuotaIVA: 1512, total: 8712, numeroFactura: 'F-2025-014' },
  { id: '28', fecha: '2025-09-12', tipo: 'gasto', clienteProveedor: 'Suministros Office', baseImponible: 420, porcentajeIVA: 21, cuotaIVA: 88.2, total: 508.2, numeroFactura: 'P-014' },
  { id: '29', fecha: '2025-09-20', tipo: 'ingreso', clienteProveedor: 'Consultoría Epsilon', baseImponible: 6800, porcentajeIVA: 21, cuotaIVA: 1428, total: 8228, numeroFactura: 'F-2025-015' },
  { id: '30', fecha: '2025-09-28', tipo: 'gasto', clienteProveedor: 'Software SaaS', baseImponible: 600, porcentajeIVA: 21, cuotaIVA: 126, total: 726, numeroFactura: 'P-015' },

  // TRIMESTRE 4 (futuro)
  { id: '31', fecha: '2025-10-08', tipo: 'ingreso', clienteProveedor: 'Corporación Beta', baseImponible: 9200, porcentajeIVA: 21, cuotaIVA: 1932, total: 11132, numeroFactura: 'F-2025-016' },
  { id: '32', fecha: '2025-10-15', tipo: 'gasto', clienteProveedor: 'Proveedor Tech', baseImponible: 1100, porcentajeIVA: 21, cuotaIVA: 231, total: 1331, numeroFactura: 'P-016' },
  { id: '33', fecha: '2025-10-22', tipo: 'ingreso', clienteProveedor: 'StartUp Gamma', baseImponible: 4800, porcentajeIVA: 21, cuotaIVA: 1008, total: 5808, numeroFactura: 'F-2025-017' },
  { id: '34', fecha: '2025-11-05', tipo: 'gasto', clienteProveedor: 'Marketing Digital', baseImponible: 2200, porcentajeIVA: 21, cuotaIVA: 462, total: 2662, numeroFactura: 'P-017' },
  { id: '35', fecha: '2025-11-12', tipo: 'ingreso', clienteProveedor: 'Tech Solutions', baseImponible: 16500, porcentajeIVA: 21, cuotaIVA: 3465, total: 19965, numeroFactura: 'F-2025-018' },
  { id: '36', fecha: '2025-11-20', tipo: 'gasto', clienteProveedor: 'Alquiler Oficina', baseImponible: 1500, porcentajeIVA: 21, cuotaIVA: 315, total: 1815, numeroFactura: 'P-018' },
  { id: '37', fecha: '2025-12-03', tipo: 'ingreso', clienteProveedor: 'Industrias Delta', baseImponible: 10500, porcentajeIVA: 21, cuotaIVA: 2205, total: 12705, numeroFactura: 'F-2025-019' },
  { id: '38', fecha: '2025-12-10', tipo: 'gasto', clienteProveedor: 'Formación Equipo', baseImponible: 1600, porcentajeIVA: 21, cuotaIVA: 336, total: 1936, numeroFactura: 'P-019' },
  { id: '39', fecha: '2025-12-18', tipo: 'ingreso', clienteProveedor: 'Grupo Zeta', baseImponible: 8700, porcentajeIVA: 21, cuotaIVA: 1827, total: 10527, numeroFactura: 'F-2025-020' },
  { id: '40', fecha: '2025-12-28', tipo: 'gasto', clienteProveedor: 'Software SaaS', baseImponible: 600, porcentajeIVA: 21, cuotaIVA: 126, total: 726, numeroFactura: 'P-020' },
];

const RETENCIONES_IRPF: RetencionIRPF[] = [
  { id: '1', fecha: '2025-01-20', cliente: 'Corporación Beta', baseRetencion: 8500, porcentaje: 15, importeRetenido: 1275, facturaAsociada: 'F-2025-002' },
  { id: '2', fecha: '2025-02-15', cliente: 'StartUp Gamma', baseRetencion: 3200, porcentaje: 15, importeRetenido: 480, facturaAsociada: 'F-2025-003' },
  { id: '3', fecha: '2025-03-10', cliente: 'Industrias Delta', baseRetencion: 12000, porcentaje: 15, importeRetenido: 1800, facturaAsociada: 'F-2025-004' },
  { id: '4', fecha: '2025-03-22', cliente: 'Consultoría Epsilon', baseRetencion: 4500, porcentaje: 15, importeRetenido: 675, facturaAsociada: 'F-2025-005' },
  { id: '5', fecha: '2025-04-22', cliente: 'Cliente A SL', baseRetencion: 6200, porcentaje: 15, importeRetenido: 930, facturaAsociada: 'F-2025-007' },
  { id: '6', fecha: '2025-05-12', cliente: 'Tech Solutions', baseRetencion: 15000, porcentaje: 15, importeRetenido: 2250, facturaAsociada: 'F-2025-008' },
  { id: '7', fecha: '2025-06-03', cliente: 'Corporación Beta', baseRetencion: 7800, porcentaje: 15, importeRetenido: 1170, facturaAsociada: 'F-2025-009' },
  { id: '8', fecha: '2025-06-18', cliente: 'StartUp Gamma', baseRetencion: 5400, porcentaje: 15, importeRetenido: 810, facturaAsociada: 'F-2025-010' },
  { id: '9', fecha: '2025-07-05', cliente: 'Industrias Delta', baseRetencion: 11000, porcentaje: 15, importeRetenido: 1650, facturaAsociada: 'F-2025-011' },
  { id: '10', fecha: '2025-07-20', cliente: 'Grupo Zeta', baseRetencion: 8900, porcentaje: 15, importeRetenido: 1335, facturaAsociada: 'F-2025-012' },
  { id: '11', fecha: '2025-08-15', cliente: 'Tech Solutions', baseRetencion: 13500, porcentaje: 15, importeRetenido: 2025, facturaAsociada: 'F-2025-013' },
  { id: '12', fecha: '2025-09-05', cliente: 'Cliente A SL', baseRetencion: 7200, porcentaje: 15, importeRetenido: 1080, facturaAsociada: 'F-2025-014' },
  { id: '13', fecha: '2025-09-20', cliente: 'Consultoría Epsilon', baseRetencion: 6800, porcentaje: 15, importeRetenido: 1020, facturaAsociada: 'F-2025-015' },
];

const DECLARACIONES: Declaracion[] = [
  { id: '1', tipo: 'IVA', modelo: '303', periodo: 'Q1 2025', fechaDeclaracion: '2025-04-20', resultado: 4516.5, estado: 'pagado', fechaLimite: '2025-04-20' },
  { id: '2', tipo: 'IRPF', modelo: '130', periodo: 'Q1 2025', fechaDeclaracion: '2025-04-20', resultado: 1240, estado: 'pagado', fechaLimite: '2025-04-20' },
  { id: '3', tipo: 'IVA', modelo: '303', periodo: 'Q2 2025', fechaDeclaracion: '2025-07-20', resultado: 6125.2, estado: 'pagado', fechaLimite: '2025-07-20' },
  { id: '4', tipo: 'IRPF', modelo: '130', periodo: 'Q2 2025', fechaDeclaracion: '2025-07-20', resultado: 1580, estado: 'pagado', fechaLimite: '2025-07-20' },
  { id: '5', tipo: 'IVA', modelo: '303', periodo: 'Q3 2025', fechaDeclaracion: '2025-10-20', resultado: 5456.3, estado: 'presentado', fechaLimite: '2025-10-20' },
  { id: '6', tipo: 'IRPF', modelo: '130', periodo: 'Q3 2025', fechaDeclaracion: '2025-10-20', resultado: 1390, estado: 'presentado', fechaLimite: '2025-10-20' },
  { id: '7', tipo: 'IVA', modelo: '303', periodo: 'Q4 2025', fechaDeclaracion: '', resultado: 0, estado: 'pendiente', fechaLimite: '2026-01-20' },
];

const OTROS_IMPUESTOS: OtroImpuesto[] = [
  { id: '1', nombre: 'IAE (Impuesto Actividades Económicas)', importeAnual: 450, frecuencia: 'Anual', proximoVencimiento: '2026-09-15', estado: 'pendiente' },
  { id: '2', nombre: 'Tasa de Basuras', importeAnual: 180, frecuencia: 'Anual', proximoVencimiento: '2026-06-30', estado: 'pendiente' },
  { id: '3', nombre: 'Licencia Municipal', importeAnual: 320, frecuencia: 'Anual', proximoVencimiento: '2026-03-31', estado: 'pendiente' },
];

// ============================================================================
// FUNCIONES DE CÁLCULO
// ============================================================================

const calcularResumenTrimestral = (trimestre: number): ResumenTrimestral => {
  const operacionesTrimestre = OPERACIONES_IVA.filter(op => {
    const mes = new Date(op.fecha).getMonth() + 1;
    return Math.ceil(mes / 3) === trimestre;
  });

  const ivaRepercutido = operacionesTrimestre
    .filter(op => op.tipo === 'ingreso')
    .reduce((sum, op) => sum + op.cuotaIVA, 0);

  const ivaSoportado = operacionesTrimestre
    .filter(op => op.tipo === 'gasto')
    .reduce((sum, op) => sum + op.cuotaIVA, 0);

  const resultado = ivaRepercutido - ivaSoportado;

  let estado: 'pendiente' | 'declarado' | 'pagado' = 'pendiente';
  const declaracion = DECLARACIONES.find(d => d.periodo === `Q${trimestre} 2025` && d.tipo === 'IVA');
  if (declaracion) {
    estado = declaracion.estado === 'pagado' ? 'pagado' : 'declarado';
  }

  const fechaLimite = `2025-${(trimestre * 3 + 1).toString().padStart(2, '0')}-20`;

  return {
    trimestre,
    ivaRepercutido,
    ivaSoportado,
    resultado,
    estado,
    fechaLimite,
  };
};

// ============================================================================
// COMPONENTES
// ============================================================================

const ImpuestosPage: React.FC = () => {
  const [ejercicioFiscal, setEjercicioFiscal] = useState('2025');
  const [trimestreSeleccionado, setTrimestreSeleccionado] = useState<number | null>(null);
  const [tabActiva, setTabActiva] = useState<'iva' | 'irpf' | 'otros' | 'declaraciones' | 'configuracion'>('iva');
  const [filtroOperaciones, setFiltroOperaciones] = useState<'todos' | 'ingresos' | 'gastos'>('todos');
  
  // Estados para modales
  const [modalConfiguracion, setModalConfiguracion] = useState(false);
  const [modalNuevaDeclaracion, setModalNuevaDeclaracion] = useState(false);
  const [modalNuevoImpuesto, setModalNuevoImpuesto] = useState(false);
  const [modalDetallesImpuesto, setModalDetallesImpuesto] = useState(false);
  const [modalDetallesDeclaracion, setModalDetallesDeclaracion] = useState(false);
  const [impuestoSeleccionado, setImpuestoSeleccionado] = useState<OtroImpuesto | null>(null);
  const [declaracionSeleccionada, setDeclaracionSeleccionada] = useState<Declaracion | null>(null);
  
  // Estados para confirmaciones
  const [confirmacionEliminar, setConfirmacionEliminar] = useState(false);
  const [confirmacionGenerar, setConfirmacionGenerar] = useState(false);
  const [tipoGeneracion, setTipoGeneracion] = useState<string>('');
  
  // Estados para formularios
  const [datosFiscales, setDatosFiscales] = useState({
    nif: 'B12345678',
    razonSocial: 'Mi Empresa SL',
    domicilio: 'Calle Principal 123, 28001 Madrid',
    epigrafeIAE: '831.9',
    regimenFiscal: 'Régimen General'
  });
  
  const [configuracionIVA, setConfiguracionIVA] = useState({
    tipoIVA: '21',
    aplicarIVA21: true,
    recargoEquivalencia: false
  });
  
  
  // Estados para calculadoras
  const [calculadoraIVA, setCalculadoraIVA] = useState({
    baseImponible: '',
    porcentajeIVA: '21'
  });
  
  const [calculadoraIRPF, setCalculadoraIRPF] = useState({
    baseRetencion: '',
    porcentajeRetencion: '15'
  });

  // Cálculos principales
  const totalIVARepercutido = OPERACIONES_IVA
    .filter(op => op.tipo === 'ingreso')
    .reduce((sum, op) => sum + op.cuotaIVA, 0);

  const totalIVASoportado = OPERACIONES_IVA
    .filter(op => op.tipo === 'gasto')
    .reduce((sum, op) => sum + op.cuotaIVA, 0);

  const resultadoIVA = totalIVARepercutido - totalIVASoportado;

  const totalIRPFRetenido = RETENCIONES_IRPF.reduce((sum, r) => sum + r.importeRetenido, 0);

  const resumenTrimestres = [1, 2, 3, 4].map(t => calcularResumenTrimestral(t));

  // Filtrar operaciones
  const operacionesFiltradas = OPERACIONES_IVA.filter(op => {
    // Filtro por tipo de operación
    if (filtroOperaciones === 'ingresos') return op.tipo === 'ingreso';
    if (filtroOperaciones === 'gastos') return op.tipo === 'gasto';
    
    // Filtro por trimestre si está seleccionado
    if (trimestreSeleccionado) {
      const mes = new Date(op.fecha).getMonth() + 1;
      const trimestreOperacion = Math.ceil(mes / 3);
      return trimestreOperacion === trimestreSeleccionado;
    }
    
    return true;
  });

  // Filtrar resumen trimestral
  const resumenTrimestresFiltrado = trimestreSeleccionado 
    ? resumenTrimestres.filter(t => t.trimestre === trimestreSeleccionado)
    : resumenTrimestres;

  // ============================================================================
  // FUNCIONES DE MANEJO DE EVENTOS
  // ============================================================================

  const handleExportarDatos = () => {
    toast.loading('Exportando datos...', { id: 'export' });
    setTimeout(() => {
      toast.success('Datos exportados correctamente', { id: 'export' });
    }, 2000);
  };

  const handlePrepararDeclaracion = (trimestre: number) => {
    toast.success(`Preparando declaración del Q${trimestre} 2025...`);
    setModalNuevaDeclaracion(true);
  };

  const handleGenerarModelo = (tipo: string) => {
    setTipoGeneracion(tipo);
    setConfirmacionGenerar(true);
  };

  const handleConfirmarGeneracion = () => {
    toast.loading(`Generando ${tipoGeneracion}...`, { id: 'generar' });
    setTimeout(() => {
      toast.success(`${tipoGeneracion} generado correctamente`, { id: 'generar' });
      setConfirmacionGenerar(false);
    }, 2000);
  };

  const handleGuardarConfiguracion = () => {
    toast.loading('Guardando configuración...', { id: 'config' });
    setTimeout(() => {
      toast.success('Configuración guardada correctamente', { id: 'config' });
      setModalConfiguracion(false);
    }, 1500);
  };

  const handleAñadirImpuesto = () => {
    setModalNuevoImpuesto(true);
  };

  const handleVerDetallesImpuesto = (impuesto: OtroImpuesto) => {
    setImpuestoSeleccionado(impuesto);
    setModalDetallesImpuesto(true);
  };

  const handleEliminarImpuesto = (impuesto: OtroImpuesto) => {
    setImpuestoSeleccionado(impuesto);
    setConfirmacionEliminar(true);
  };

  const handleConfirmarEliminacion = () => {
    toast.success(`Impuesto "${impuestoSeleccionado?.nombre}" eliminado`);
    setConfirmacionEliminar(false);
    setImpuestoSeleccionado(null);
  };

  const handleCalcularIVA = () => {
    const base = parseFloat(calculadoraIVA.baseImponible);
    const porcentaje = parseFloat(calculadoraIVA.porcentajeIVA);
    if (base && porcentaje) {
      const cuotaIVA = (base * porcentaje) / 100;
      const total = base + cuotaIVA;
      toast.success(`IVA: ${cuotaIVA.toFixed(2)}€ | Total: ${total.toFixed(2)}€`);
    }
  };

  const handleCalcularIRPF = () => {
    const base = parseFloat(calculadoraIRPF.baseRetencion);
    const porcentaje = parseFloat(calculadoraIRPF.porcentajeRetencion);
    if (base && porcentaje) {
      const retencion = (base * porcentaje) / 100;
      const neto = base - retencion;
      toast.success(`Retención: ${retencion.toFixed(2)}€ | Neto: ${neto.toFixed(2)}€`);
    }
  };

  const handleNuevaDeclaracion = () => {
    toast.success('Nueva declaración creada');
    setModalNuevaDeclaracion(false);
  };

  const handleNuevoImpuesto = (nombre: string) => {
    toast.success(`Nuevo impuesto "${nombre}" añadido`);
    setModalNuevoImpuesto(false);
  };

  const handleVerDeclaracion = (declaracion: Declaracion) => {
    setDeclaracionSeleccionada(declaracion);
    setModalDetallesDeclaracion(true);
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
                  <Percent className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-purple-400 rounded-full border-2 border-white animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                  Gestión de <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Impuestos</span>
                </h1>
                <p className="text-lg md:text-xl text-blue-100 mt-2 max-w-2xl flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Cálculo y declaración de impuestos del negocio
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 flex-wrap">
              {/* Filtro Ejercicio Fiscal */}
              <div className="relative">
                <select
                  value={ejercicioFiscal}
                  onChange={(e) => setEjercicioFiscal(e.target.value)}
                  className="appearance-none bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-2.5 pr-8 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-white/30 cursor-pointer hover:bg-white/20 transition-all duration-300"
                >
                  <option value="2025" className="bg-slate-800 text-white">Ejercicio 2025</option>
                  <option value="2024" className="bg-slate-800 text-white">Ejercicio 2024</option>
                  <option value="2023" className="bg-slate-800 text-white">Ejercicio 2023</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="w-4 h-4 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {/* Filtro Trimestre */}
              <div className="relative">
                <select
                  value={trimestreSeleccionado || ''}
                  onChange={(e) => setTrimestreSeleccionado(e.target.value ? Number(e.target.value) : null)}
                  className="appearance-none bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-2.5 pr-8 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-white/30 cursor-pointer hover:bg-white/20 transition-all duration-300"
                >
                  <option value="" className="bg-slate-800 text-white">Todos los trimestres</option>
                  <option value="1" className="bg-slate-800 text-white">Q1 2025</option>
                  <option value="2" className="bg-slate-800 text-white">Q2 2025</option>
                  <option value="3" className="bg-slate-800 text-white">Q3 2025</option>
                  <option value="4" className="bg-slate-800 text-white">Q4 2025</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="w-4 h-4 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {/* Botón Limpiar Filtros */}
              {(trimestreSeleccionado || filtroOperaciones !== 'todos') && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setTrimestreSeleccionado(null);
                    setFiltroOperaciones('todos');
                    toast.success('Filtros limpiados');
                  }}
                  className="flex items-center gap-2 px-3 py-2.5 bg-red-500/20 backdrop-blur-md border border-red-400/30 text-red-100 font-semibold rounded-xl hover:bg-red-500/30 transition-all duration-300"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span className="hidden sm:inline">Limpiar</span>
                </motion.button>
              )}

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setModalConfiguracion(true)}
                className="flex items-center gap-2 px-4 py-2.5 bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-300"
              >
                <Settings className="w-4 h-4" />
                <span className="hidden sm:inline">Config</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setModalNuevaDeclaracion(true)}
                className="flex items-center gap-2 px-6 py-2.5 bg-white text-emerald-600 font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <Plus className="w-5 h-5" />
                <span>Nueva Declaración</span>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Section */}
      <div className="max-w-[1920px] mx-auto px-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-2.5 bg-green-50 rounded-lg">
                <ArrowUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <p className="text-sm font-medium text-gray-600 mb-1">IVA Repercutido</p>
            <p className="text-3xl font-bold text-green-600">{totalIVARepercutido.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}</p>
            <p className="text-xs text-gray-500 mt-1">Cobrado a clientes</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-2.5 bg-red-50 rounded-lg">
                <ArrowDown className="w-6 h-6 text-red-600" />
              </div>
            </div>
            <p className="text-sm font-medium text-gray-600 mb-1">IVA Soportado</p>
            <p className="text-3xl font-bold text-red-600">{totalIVASoportado.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}</p>
            <p className="text-xs text-gray-500 mt-1">Pagado a proveedores</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2.5 ${resultadoIVA > 0 ? 'bg-orange-50' : 'bg-blue-50'} rounded-lg`}>
                <Calculator className={`w-6 h-6 ${resultadoIVA > 0 ? 'text-orange-600' : 'text-blue-600'}`} />
              </div>
            </div>
            <p className="text-sm font-medium text-gray-600 mb-1">Resultado IVA</p>
            <p className={`text-3xl font-bold ${resultadoIVA > 0 ? 'text-orange-600' : 'text-blue-600'}`}>
              {Math.abs(resultadoIVA).toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
            </p>
            <p className="text-xs text-gray-500 mt-1">{resultadoIVA > 0 ? 'A pagar' : 'A devolver'}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-2.5 bg-purple-50 rounded-lg">
                <Percent className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <p className="text-sm font-medium text-gray-600 mb-1">IRPF Retenido</p>
            <p className="text-3xl font-bold text-purple-600">{totalIRPFRetenido.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}</p>
            <p className="text-xs text-gray-500 mt-1">{RETENCIONES_IRPF.length} retenciones 15%</p>
          </motion.div>
        </div>
      </div>

      {/* TABS PRINCIPALES */}
      <div className="mb-6">
        <div className="flex gap-2 border-b border-slate-200">
          {[
            { id: 'iva', label: 'IVA', icon: Calculator },
            { id: 'irpf', label: 'IRPF', icon: Percent },
            { id: 'otros', label: 'Otros Impuestos', icon: FileText },
            { id: 'declaraciones', label: 'Declaraciones', icon: TrendingUp },
            { id: 'configuracion', label: 'Configuración', icon: Settings },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setTabActiva(tab.id as any)}
              className={`flex items-center gap-2 px-6 py-3 font-medium transition-colors ${
                tabActiva === tab.id
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-slate-600 hover:text-slate-800'
              }`}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* CONTENIDO DE TABS */}
      <motion.div
        key={tabActiva}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* TAB IVA */}
        {tabActiva === 'iva' && (
          <div className="space-y-6">
            {/* Resumen Trimestral */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <Calendar className="text-blue-600" />
                Resumen Trimestral {ejercicioFiscal}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {resumenTrimestresFiltrado.map((trimestre) => (
                  <div
                    key={trimestre.trimestre}
                    className="border-2 border-slate-200 rounded-lg p-4 hover:border-blue-400 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-bold text-slate-800">Q{trimestre.trimestre}</h3>
                      <span
                        className={`text-xs font-semibold px-2 py-1 rounded ${
                          trimestre.estado === 'pagado'
                            ? 'bg-green-100 text-green-700'
                            : trimestre.estado === 'declarado'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}
                      >
                        {trimestre.estado === 'pagado' ? 'Pagado' : trimestre.estado === 'declarado' ? 'Declarado' : 'Pendiente'}
                      </span>
                    </div>
                    <div className="space-y-2 mb-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600">Repercutido:</span>
                        <span className="font-semibold text-green-600">+{trimestre.ivaRepercutido.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600">Soportado:</span>
                        <span className="font-semibold text-red-600">-{trimestre.ivaSoportado.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}</span>
                      </div>
                      <div className="border-t pt-2 flex justify-between">
                        <span className="font-semibold text-slate-800">Resultado:</span>
                        <span className={`font-bold ${trimestre.resultado > 0 ? 'text-orange-600' : 'text-blue-600'}`}>
                          {trimestre.resultado.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
                        </span>
                      </div>
                    </div>
                    <div className="text-xs text-slate-500 mb-3">
                      Límite: {new Date(trimestre.fechaLimite).toLocaleDateString('es-ES')}
                    </div>
                    <button 
                      onClick={() => handlePrepararDeclaracion(trimestre.trimestre)}
                      className="w-full bg-blue-50 hover:bg-blue-100 text-blue-600 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      Preparar Declaración
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Desglose Detallado */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                    <FileText className="text-blue-600" />
                    Desglose de Operaciones
                  </h2>
                  {(trimestreSeleccionado || filtroOperaciones !== 'todos') && (
                    <p className="text-sm text-slate-600 mt-1">
                      Mostrando {operacionesFiltradas.length} de {OPERACIONES_IVA.length} operaciones
                      {trimestreSeleccionado && ` • Trimestre Q${trimestreSeleccionado}`}
                      {filtroOperaciones !== 'todos' && ` • ${filtroOperaciones === 'ingresos' ? 'Solo ingresos' : 'Solo gastos'}`}
                    </p>
                  )}
                </div>
                <div className="flex gap-3">
                  <div className="flex gap-2 bg-slate-100 p-1 rounded-lg">
                    <button
                      onClick={() => setFiltroOperaciones('todos')}
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                        filtroOperaciones === 'todos'
                          ? 'bg-white text-slate-800 shadow-sm'
                          : 'text-slate-600 hover:text-slate-800 hover:bg-white/50'
                      }`}
                    >
                      <div className={`w-2 h-2 rounded-full ${filtroOperaciones === 'todos' ? 'bg-blue-500' : 'bg-slate-400'}`}></div>
                      Todos
                    </button>
                    <button
                      onClick={() => setFiltroOperaciones('ingresos')}
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                        filtroOperaciones === 'ingresos'
                          ? 'bg-white text-slate-800 shadow-sm'
                          : 'text-slate-600 hover:text-slate-800 hover:bg-white/50'
                      }`}
                    >
                      <ArrowUp className="w-3 h-3" />
                      Ingresos
                    </button>
                    <button
                      onClick={() => setFiltroOperaciones('gastos')}
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                        filtroOperaciones === 'gastos'
                          ? 'bg-white text-slate-800 shadow-sm'
                          : 'text-slate-600 hover:text-slate-800 hover:bg-white/50'
                      }`}
                    >
                      <ArrowDown className="w-3 h-3" />
                      Gastos
                    </button>
                  </div>
                  <button 
                    onClick={handleExportarDatos}
                    className="bg-slate-700 hover:bg-slate-800 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                  >
                    <Download size={18} />
                    Exportar
                  </button>
                </div>
              </div>

              {operacionesFiltradas.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-8 h-8 text-slate-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-2">No se encontraron operaciones</h3>
                  <p className="text-slate-600 mb-4">
                    No hay operaciones que coincidan con los filtros aplicados.
                  </p>
                  <button
                    onClick={() => {
                      setTrimestreSeleccionado(null);
                      setFiltroOperaciones('todos');
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    Limpiar filtros
                  </button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-50 border-b-2 border-slate-200">
                      <tr>
                        <th className="text-left p-3 text-sm font-semibold text-slate-700">Fecha</th>
                        <th className="text-left p-3 text-sm font-semibold text-slate-700">Tipo</th>
                        <th className="text-left p-3 text-sm font-semibold text-slate-700">Cliente/Proveedor</th>
                        <th className="text-right p-3 text-sm font-semibold text-slate-700">Base Imponible</th>
                        <th className="text-center p-3 text-sm font-semibold text-slate-700">% IVA</th>
                        <th className="text-right p-3 text-sm font-semibold text-slate-700">Cuota IVA</th>
                        <th className="text-right p-3 text-sm font-semibold text-slate-700">Total</th>
                        <th className="text-left p-3 text-sm font-semibold text-slate-700">Nº Factura</th>
                      </tr>
                    </thead>
                    <tbody>
                      {operacionesFiltradas.slice(0, 20).map((op) => (
                      <tr key={op.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                        <td className="p-3 text-sm text-slate-600">{new Date(op.fecha).toLocaleDateString('es-ES')}</td>
                        <td className="p-3">
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-semibold ${
                              op.tipo === 'ingreso'
                                ? 'bg-green-100 text-green-700'
                                : 'bg-red-100 text-red-700'
                            }`}
                          >
                            {op.tipo === 'ingreso' ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
                            {op.tipo === 'ingreso' ? 'Ingreso' : 'Gasto'}
                          </span>
                        </td>
                        <td className="p-3 text-sm text-slate-800">{op.clienteProveedor}</td>
                        <td className="p-3 text-sm text-right text-slate-800 font-medium">
                          {op.baseImponible.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
                        </td>
                        <td className="p-3 text-sm text-center text-slate-600">{op.porcentajeIVA}%</td>
                        <td className="p-3 text-sm text-right font-semibold text-blue-600">
                          {op.cuotaIVA.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
                        </td>
                        <td className="p-3 text-sm text-right font-bold text-slate-800">
                          {op.total.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
                        </td>
                        <td className="p-3 text-sm text-slate-600 font-mono">{op.numeroFactura}</td>
                      </tr>
                    ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Modelo 303 */}
            <div className="bg-gradient-to-br from-blue-50 to-slate-50 rounded-xl shadow-lg p-6 border-2 border-blue-200">
              <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <FileText className="text-blue-600" />
                Modelo 303 - Declaración de IVA
              </h2>
              <p className="text-slate-600 mb-6">Formulario simplificado del modelo oficial de Hacienda</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-white rounded-lg p-4 border border-slate-200">
                  <h3 className="font-bold text-slate-800 mb-3">IVA Repercutido (Devengado)</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Base imponible 21%:</span>
                      <span className="font-semibold">{(totalIVARepercutido / 0.21).toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Cuota IVA 21%:</span>
                      <span className="font-bold text-green-600">{totalIVARepercutido.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4 border border-slate-200">
                  <h3 className="font-bold text-slate-800 mb-3">IVA Soportado (Deducible)</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Base imponible 21%:</span>
                      <span className="font-semibold">{(totalIVASoportado / 0.21).toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Cuota IVA 21%:</span>
                      <span className="font-bold text-red-600">{totalIVASoportado.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 border-2 border-blue-400">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-slate-800">Resultado de la Declaración</h3>
                  <span className={`text-2xl font-bold ${resultadoIVA > 0 ? 'text-orange-600' : 'text-blue-600'}`}>
                    {resultadoIVA.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
                  </span>
                </div>
                <p className="text-sm text-slate-600">
                  {resultadoIVA > 0 ? 'A ingresar en Hacienda' : 'A compensar o devolver'}
                </p>
              </div>

              <div className="flex gap-3 mt-6">
                <button 
                  onClick={() => handleGenerarModelo('Modelo 303')}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors"
                >
                  Generar Modelo 303
                </button>
                <button 
                  onClick={handleExportarDatos}
                  className="px-6 bg-slate-700 hover:bg-slate-800 text-white py-3 rounded-lg font-semibold transition-colors"
                >
                  <Download size={20} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB IRPF */}
        {tabActiva === 'irpf' && (
          <div className="space-y-6">
            {/* Retenciones Practicadas */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <Percent className="text-purple-600" />
                Retenciones IRPF Practicadas
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50 border-b-2 border-slate-200">
                    <tr>
                      <th className="text-left p-3 text-sm font-semibold text-slate-700">Fecha</th>
                      <th className="text-left p-3 text-sm font-semibold text-slate-700">Cliente</th>
                      <th className="text-right p-3 text-sm font-semibold text-slate-700">Base Retención</th>
                      <th className="text-center p-3 text-sm font-semibold text-slate-700">% Retención</th>
                      <th className="text-right p-3 text-sm font-semibold text-slate-700">Importe Retenido</th>
                      <th className="text-left p-3 text-sm font-semibold text-slate-700">Factura</th>
                    </tr>
                  </thead>
                  <tbody>
                    {RETENCIONES_IRPF.map((ret) => (
                      <tr key={ret.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                        <td className="p-3 text-sm text-slate-600">{new Date(ret.fecha).toLocaleDateString('es-ES')}</td>
                        <td className="p-3 text-sm text-slate-800">{ret.cliente}</td>
                        <td className="p-3 text-sm text-right text-slate-800 font-medium">
                          {ret.baseRetencion.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
                        </td>
                        <td className="p-3 text-sm text-center text-slate-600">{ret.porcentaje}%</td>
                        <td className="p-3 text-sm text-right font-bold text-purple-600">
                          {ret.importeRetenido.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
                        </td>
                        <td className="p-3 text-sm text-slate-600 font-mono">{ret.facturaAsociada}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-slate-100 border-t-2 border-slate-300">
                    <tr>
                      <td colSpan={4} className="p-3 text-right font-bold text-slate-800">TOTAL RETENIDO:</td>
                      <td className="p-3 text-right text-xl font-bold text-purple-600">
                        {totalIRPFRetenido.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
                      </td>
                      <td></td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            {/* Modelo 130 */}
            <div className="bg-gradient-to-br from-purple-50 to-slate-50 rounded-xl shadow-lg p-6 border-2 border-purple-200">
              <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Calculator className="text-purple-600" />
                Modelo 130 - Pago Fraccionado IRPF
              </h2>
              <p className="text-slate-600 mb-6">Cálculo trimestral de pagos a cuenta (estimación directa simplificada)</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {[1, 2, 3, 4].map((q) => {
                  const ingresosQ = OPERACIONES_IVA
                    .filter(op => op.tipo === 'ingreso' && Math.ceil((new Date(op.fecha).getMonth() + 1) / 3) === q)
                    .reduce((sum, op) => sum + op.baseImponible, 0);
                  const gastosQ = OPERACIONES_IVA
                    .filter(op => op.tipo === 'gasto' && Math.ceil((new Date(op.fecha).getMonth() + 1) / 3) === q)
                    .reduce((sum, op) => sum + op.baseImponible, 0);
                  const rendimientoNeto = (ingresosQ - gastosQ) * 0.2; // 20% del rendimiento

                  return (
                    <div key={q} className="bg-white rounded-lg p-4 border border-slate-200">
                      <h3 className="font-bold text-slate-800 mb-3">Trimestre Q{q}</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-slate-600">Ingresos:</span>
                          <span className="font-semibold text-green-600">+{ingresosQ.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Gastos deducibles:</span>
                          <span className="font-semibold text-red-600">-{gastosQ.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}</span>
                        </div>
                        <div className="flex justify-between border-t pt-2">
                          <span className="text-slate-800 font-semibold">Pago fraccionado (20%):</span>
                          <span className="font-bold text-purple-600">{rendimientoNeto.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <button 
                onClick={() => handleGenerarModelo('Modelo 130')}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold transition-colors"
              >
                Generar Modelo 130
              </button>
            </div>

            {/* Modelo 190 */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <FileText className="text-purple-600" />
                Modelo 190 - Resumen Anual de Retenciones
              </h2>
              <p className="text-slate-600 mb-6">Declaración informativa anual de retenciones e ingresos a cuenta del IRPF</p>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50 border-b-2 border-slate-200">
                    <tr>
                      <th className="text-left p-3 text-sm font-semibold text-slate-700">NIF/CIF</th>
                      <th className="text-left p-3 text-sm font-semibold text-slate-700">Perceptor</th>
                      <th className="text-right p-3 text-sm font-semibold text-slate-700">Total Percibido</th>
                      <th className="text-right p-3 text-sm font-semibold text-slate-700">Total Retenido</th>
                      <th className="text-center p-3 text-sm font-semibold text-slate-700">Nº Facturas</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.from(new Set(RETENCIONES_IRPF.map(r => r.cliente))).map((cliente) => {
                      const retenciones = RETENCIONES_IRPF.filter(r => r.cliente === cliente);
                      const totalPercibido = retenciones.reduce((sum, r) => sum + r.baseRetencion, 0);
                      const totalRetenido = retenciones.reduce((sum, r) => sum + r.importeRetenido, 0);

                      return (
                        <tr key={cliente} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                          <td className="p-3 text-sm text-slate-600 font-mono">B{Math.floor(Math.random() * 90000000) + 10000000}</td>
                          <td className="p-3 text-sm text-slate-800">{cliente}</td>
                          <td className="p-3 text-sm text-right text-slate-800 font-medium">
                            {totalPercibido.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
                          </td>
                          <td className="p-3 text-sm text-right font-bold text-purple-600">
                            {totalRetenido.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
                          </td>
                          <td className="p-3 text-sm text-center text-slate-600">{retenciones.length}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <button 
                onClick={() => handleGenerarModelo('Modelo 190')}
                className="w-full mt-6 bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold transition-colors"
              >
                Generar Modelo 190
              </button>
            </div>
          </div>
        )}

        {/* TAB OTROS IMPUESTOS */}
        {tabActiva === 'otros' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                  <FileText className="text-blue-600" />
                  Otros Impuestos Locales
                </h2>
                <button 
                  onClick={handleAñadirImpuesto}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                >
                  <Plus size={18} />
                  Añadir Impuesto
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {OTROS_IMPUESTOS.map((impuesto) => (
                  <div key={impuesto.id} className="border-2 border-slate-200 rounded-lg p-5 hover:border-blue-400 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-bold text-slate-800">{impuesto.nombre}</h3>
                      <span
                        className={`text-xs font-semibold px-2 py-1 rounded ${
                          impuesto.estado === 'pagado'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}
                      >
                        {impuesto.estado === 'pagado' ? 'Pagado' : 'Pendiente'}
                      </span>
                    </div>
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600">Importe anual:</span>
                        <span className="font-bold text-slate-800">{impuesto.importeAnual.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600">Frecuencia:</span>
                        <span className="font-medium text-slate-700">{impuesto.frecuencia}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600">Vencimiento:</span>
                        <span className="font-medium text-slate-700">{new Date(impuesto.proximoVencimiento).toLocaleDateString('es-ES')}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleVerDetallesImpuesto(impuesto)}
                        className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-2 rounded-lg text-sm font-medium transition-colors"
                      >
                        Ver Detalles
                      </button>
                      <button 
                        onClick={() => handleEliminarImpuesto(impuesto)}
                        className="bg-red-100 hover:bg-red-200 text-red-700 p-2 rounded-lg transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB DECLARACIONES */}
        {tabActiva === 'declaraciones' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <TrendingUp className="text-blue-600" />
                Historial de Declaraciones
              </h2>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50 border-b-2 border-slate-200">
                    <tr>
                      <th className="text-left p-3 text-sm font-semibold text-slate-700">Tipo</th>
                      <th className="text-left p-3 text-sm font-semibold text-slate-700">Modelo</th>
                      <th className="text-left p-3 text-sm font-semibold text-slate-700">Período</th>
                      <th className="text-left p-3 text-sm font-semibold text-slate-700">Fecha Declaración</th>
                      <th className="text-right p-3 text-sm font-semibold text-slate-700">Resultado</th>
                      <th className="text-center p-3 text-sm font-semibold text-slate-700">Estado</th>
                      <th className="text-left p-3 text-sm font-semibold text-slate-700">Fecha Límite</th>
                      <th className="text-center p-3 text-sm font-semibold text-slate-700">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {DECLARACIONES.map((decl) => (
                      <tr key={decl.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                        <td className="p-3">
                          <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                            decl.tipo === 'IVA' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'
                          }`}>
                            {decl.tipo}
                          </span>
                        </td>
                        <td className="p-3 text-sm font-mono text-slate-800">{decl.modelo}</td>
                        <td className="p-3 text-sm text-slate-800">{decl.periodo}</td>
                        <td className="p-3 text-sm text-slate-600">
                          {decl.fechaDeclaracion ? new Date(decl.fechaDeclaracion).toLocaleDateString('es-ES') : '-'}
                        </td>
                        <td className="p-3 text-sm text-right font-bold text-slate-800">
                          {decl.resultado > 0 ? decl.resultado.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' }) : '-'}
                        </td>
                        <td className="p-3 text-center">
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-semibold ${
                              decl.estado === 'pagado'
                                ? 'bg-green-100 text-green-700'
                                : decl.estado === 'presentado'
                                ? 'bg-blue-100 text-blue-700'
                                : 'bg-yellow-100 text-yellow-700'
                            }`}
                          >
                            {decl.estado === 'pagado' && <CheckCircle size={12} />}
                            {decl.estado === 'presentado' && <Clock size={12} />}
                            {decl.estado === 'pendiente' && <AlertCircle size={12} />}
                            {decl.estado === 'pagado' ? 'Pagado' : decl.estado === 'presentado' ? 'Presentado' : 'Pendiente'}
                          </span>
                        </td>
                        <td className="p-3 text-sm text-slate-600">{new Date(decl.fechaLimite).toLocaleDateString('es-ES')}</td>
                        <td className="p-3 text-center">
                          <button 
                            onClick={() => handleVerDeclaracion(decl)}
                            className="text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors"
                          >
                            Ver
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Calendario Fiscal */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <Calendar className="text-blue-600" />
                Calendario Fiscal 2025
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { fecha: '20 Abril', evento: 'IVA Q1 + IRPF Q1', tipo: 'vencido' },
                  { fecha: '20 Julio', evento: 'IVA Q2 + IRPF Q2', tipo: 'vencido' },
                  { fecha: '20 Octubre', evento: 'IVA Q3 + IRPF Q3', tipo: 'proximo' },
                  { fecha: '20 Enero 2026', evento: 'IVA Q4 + IRPF Q4', tipo: 'futuro' },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-lg border-l-4 ${
                      item.tipo === 'vencido'
                        ? 'bg-green-50 border-green-500'
                        : item.tipo === 'proximo'
                        ? 'bg-orange-50 border-orange-500'
                        : 'bg-slate-50 border-slate-300'
                    }`}
                  >
                    <div className="text-sm font-bold text-slate-800 mb-1">{item.fecha}</div>
                    <div className="text-xs text-slate-600">{item.evento}</div>
                    <div className={`text-xs font-semibold mt-2 ${
                      item.tipo === 'vencido' ? 'text-green-700' : item.tipo === 'proximo' ? 'text-orange-700' : 'text-slate-500'
                    }`}>
                      {item.tipo === 'vencido' ? '✓ Presentado' : item.tipo === 'proximo' ? '⚠ Próximo' : 'Pendiente'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB CONFIGURACIÓN */}
        {tabActiva === 'configuracion' && (
          <div className="space-y-6">
            {/* Datos Fiscales */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <Settings className="text-blue-600" />
                Datos Fiscales del Negocio
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">NIF/CIF</label>
                  <input
                    type="text"
                    defaultValue="B12345678"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Razón Social</label>
                  <input
                    type="text"
                    defaultValue="Mi Empresa SL"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Domicilio Fiscal</label>
                  <input
                    type="text"
                    defaultValue="Calle Principal 123, 28001 Madrid"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Epígrafe IAE</label>
                  <input
                    type="text"
                    defaultValue="831.9"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Régimen Fiscal</label>
                  <select className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option>Régimen General</option>
                    <option>Régimen Simplificado</option>
                    <option>Estimación Objetiva</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Configuración IVA */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-slate-800 mb-6">Configuración de IVA</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Tipo de IVA por defecto</label>
                  <select className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="21">21% - General</option>
                    <option value="10">10% - Reducido</option>
                    <option value="4">4% - Superreducido</option>
                  </select>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="iva21" defaultChecked className="w-4 h-4 text-blue-600" />
                  <label htmlFor="iva21" className="text-sm text-slate-700">Aplicar IVA 21% a servicios profesionales</label>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="recargo" className="w-4 h-4 text-blue-600" />
                  <label htmlFor="recargo" className="text-sm text-slate-700">Aplicar recargo de equivalencia</label>
                </div>
              </div>
            </div>

            {/* Configuración IRPF */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-slate-800 mb-6">Configuración de IRPF</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">% Retención a aplicar</label>
                  <select className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="15">15% - Profesionales</option>
                    <option value="7">7% - Nuevas actividades (3 años)</option>
                    <option value="19">19% - Rendimientos capital</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Actividad Profesional</label>
                  <input
                    type="text"
                    defaultValue="Servicios de consultoría"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Calculadora de IVA */}
            <div className="bg-gradient-to-br from-blue-50 to-slate-50 rounded-xl shadow-lg p-6 border-2 border-blue-200">
              <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <Calculator className="text-blue-600" />
                Calculadoras Fiscales
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg p-4 border border-slate-200">
                  <h3 className="font-bold text-slate-800 mb-3">Calculadora de IVA</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs text-slate-600 mb-1">Base Imponible</label>
                      <input
                        type="number"
                        placeholder="1000"
                        value={calculadoraIVA.baseImponible}
                        onChange={(e) => setCalculadoraIVA({...calculadoraIVA, baseImponible: e.target.value})}
                        className="w-full px-3 py-2 border border-slate-300 rounded text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-600 mb-1">% IVA</label>
                      <select 
                        value={calculadoraIVA.porcentajeIVA}
                        onChange={(e) => setCalculadoraIVA({...calculadoraIVA, porcentajeIVA: e.target.value})}
                        className="w-full px-3 py-2 border border-slate-300 rounded text-sm"
                      >
                        <option value="21">21%</option>
                        <option value="10">10%</option>
                        <option value="4">4%</option>
                      </select>
                    </div>
                    <div className="pt-2 border-t">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-slate-600">Cuota IVA:</span>
                        <span className="font-bold text-blue-600">
                          {calculadoraIVA.baseImponible && calculadoraIVA.porcentajeIVA 
                            ? ((parseFloat(calculadoraIVA.baseImponible) * parseFloat(calculadoraIVA.porcentajeIVA)) / 100).toFixed(2) + ' €'
                            : '0.00 €'
                          }
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600">Total con IVA:</span>
                        <span className="font-bold text-slate-800">
                          {calculadoraIVA.baseImponible && calculadoraIVA.porcentajeIVA 
                            ? (parseFloat(calculadoraIVA.baseImponible) + (parseFloat(calculadoraIVA.baseImponible) * parseFloat(calculadoraIVA.porcentajeIVA)) / 100).toFixed(2) + ' €'
                            : '0.00 €'
                          }
                        </span>
                      </div>
                    </div>
                    <button 
                      onClick={handleCalcularIVA}
                      className="w-full mt-3 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      Calcular
                    </button>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4 border border-slate-200">
                  <h3 className="font-bold text-slate-800 mb-3">Calculadora de IRPF</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs text-slate-600 mb-1">Base de Retención</label>
                      <input
                        type="number"
                        placeholder="5000"
                        value={calculadoraIRPF.baseRetencion}
                        onChange={(e) => setCalculadoraIRPF({...calculadoraIRPF, baseRetencion: e.target.value})}
                        className="w-full px-3 py-2 border border-slate-300 rounded text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-600 mb-1">% Retención</label>
                      <select 
                        value={calculadoraIRPF.porcentajeRetencion}
                        onChange={(e) => setCalculadoraIRPF({...calculadoraIRPF, porcentajeRetencion: e.target.value})}
                        className="w-full px-3 py-2 border border-slate-300 rounded text-sm"
                      >
                        <option value="15">15%</option>
                        <option value="7">7%</option>
                        <option value="19">19%</option>
                      </select>
                    </div>
                    <div className="pt-2 border-t">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-slate-600">Retención:</span>
                        <span className="font-bold text-purple-600">
                          {calculadoraIRPF.baseRetencion && calculadoraIRPF.porcentajeRetencion 
                            ? ((parseFloat(calculadoraIRPF.baseRetencion) * parseFloat(calculadoraIRPF.porcentajeRetencion)) / 100).toFixed(2) + ' €'
                            : '0.00 €'
                          }
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600">Importe neto:</span>
                        <span className="font-bold text-slate-800">
                          {calculadoraIRPF.baseRetencion && calculadoraIRPF.porcentajeRetencion 
                            ? (parseFloat(calculadoraIRPF.baseRetencion) - (parseFloat(calculadoraIRPF.baseRetencion) * parseFloat(calculadoraIRPF.porcentajeRetencion)) / 100).toFixed(2) + ' €'
                            : '0.00 €'
                          }
                        </span>
                      </div>
                    </div>
                    <button 
                      onClick={handleCalcularIRPF}
                      className="w-full mt-3 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      Calcular
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </motion.div>

      {/* MODALES Y CONFIRMACIONES */}
      
      {/* Modal de Configuración */}
      <Modal
        isOpen={modalConfiguracion}
        onClose={() => setModalConfiguracion(false)}
        title="Configuración Fiscal"
        size="xl"
      >
        <div className="space-y-6">
          {/* Datos Fiscales */}
          <div>
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Datos Fiscales del Negocio</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">NIF/CIF</label>
                <input
                  type="text"
                  value={datosFiscales.nif}
                  onChange={(e) => setDatosFiscales({...datosFiscales, nif: e.target.value})}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Razón Social</label>
                <input
                  type="text"
                  value={datosFiscales.razonSocial}
                  onChange={(e) => setDatosFiscales({...datosFiscales, razonSocial: e.target.value})}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-2">Domicilio Fiscal</label>
                <input
                  type="text"
                  value={datosFiscales.domicilio}
                  onChange={(e) => setDatosFiscales({...datosFiscales, domicilio: e.target.value})}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Configuración IVA */}
          <div>
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Configuración de IVA</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Tipo de IVA por defecto</label>
                <select 
                  value={configuracionIVA.tipoIVA}
                  onChange={(e) => setConfiguracionIVA({...configuracionIVA, tipoIVA: e.target.value})}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="21">21% - General</option>
                  <option value="10">10% - Reducido</option>
                  <option value="4">4% - Superreducido</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  id="iva21" 
                  checked={configuracionIVA.aplicarIVA21}
                  onChange={(e) => setConfiguracionIVA({...configuracionIVA, aplicarIVA21: e.target.checked})}
                  className="w-4 h-4 text-blue-600" 
                />
                <label htmlFor="iva21" className="text-sm text-slate-700">Aplicar IVA 21% a servicios profesionales</label>
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-4 border-t">
            <button 
              onClick={() => setModalConfiguracion(false)}
              className="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-700 py-2 rounded-lg font-medium transition-colors"
            >
              Cancelar
            </button>
            <button 
              onClick={handleGuardarConfiguracion}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition-colors"
            >
              <Save className="w-4 h-4 inline mr-2" />
              Guardar Configuración
            </button>
          </div>
        </div>
      </Modal>

      {/* Modal Nueva Declaración */}
      <Modal
        isOpen={modalNuevaDeclaracion}
        onClose={() => setModalNuevaDeclaracion(false)}
        title="Nueva Declaración"
        size="lg"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Tipo de Declaración</label>
            <select className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option>IVA - Modelo 303</option>
              <option>IRPF - Modelo 130</option>
              <option>IRPF - Modelo 190</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Período</label>
            <select className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option>Q1 2025</option>
              <option>Q2 2025</option>
              <option>Q3 2025</option>
              <option>Q4 2025</option>
            </select>
          </div>
          <div className="flex gap-3 pt-4">
            <button 
              onClick={() => setModalNuevaDeclaracion(false)}
              className="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-700 py-2 rounded-lg font-medium transition-colors"
            >
              Cancelar
            </button>
            <button 
              onClick={handleNuevaDeclaracion}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition-colors"
            >
              Crear Declaración
            </button>
          </div>
        </div>
      </Modal>

      {/* Modal Nuevo Impuesto */}
      <InputModal
        isOpen={modalNuevoImpuesto}
        onClose={() => setModalNuevoImpuesto(false)}
        onConfirm={handleNuevoImpuesto}
        title="Añadir Nuevo Impuesto"
        message="Introduce el nombre del nuevo impuesto local:"
        placeholder="Ej: Tasa de Basuras, Licencia Municipal..."
        confirmText="Añadir Impuesto"
      />

      {/* Modal Detalles Impuesto */}
      <Modal
        isOpen={modalDetallesImpuesto}
        onClose={() => setModalDetallesImpuesto(false)}
        title={impuestoSeleccionado?.nombre || 'Detalles del Impuesto'}
        size="md"
      >
        {impuestoSeleccionado && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Importe Anual</label>
                <p className="text-lg font-bold text-slate-800">{impuestoSeleccionado.importeAnual.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Frecuencia</label>
                <p className="text-lg font-semibold text-slate-800">{impuestoSeleccionado.frecuencia}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Próximo Vencimiento</label>
                <p className="text-lg font-semibold text-slate-800">{new Date(impuestoSeleccionado.proximoVencimiento).toLocaleDateString('es-ES')}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Estado</label>
                <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                  impuestoSeleccionado.estado === 'pagado' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {impuestoSeleccionado.estado === 'pagado' ? 'Pagado' : 'Pendiente'}
                </span>
              </div>
            </div>
            <div className="flex gap-3 pt-4 border-t">
              <button 
                onClick={() => setModalDetallesImpuesto(false)}
                className="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-700 py-2 rounded-lg font-medium transition-colors"
              >
                Cerrar
              </button>
              <button 
                onClick={() => {
                  setModalDetallesImpuesto(false);
                  // Aquí se podría abrir un modal de edición
                }}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition-colors"
              >
                <Edit className="w-4 h-4 inline mr-2" />
                Editar
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Confirmación Generar Modelo */}
      <ConfirmationModal
        isOpen={confirmacionGenerar}
        onClose={() => setConfirmacionGenerar(false)}
        onConfirm={handleConfirmarGeneracion}
        title="Generar Modelo"
        message={`¿Estás seguro de que quieres generar el ${tipoGeneracion}? Esta acción creará un archivo PDF con los datos actuales.`}
        confirmText="Generar"
        type="info"
      />

      {/* Confirmación Eliminar Impuesto */}
      <ConfirmationModal
        isOpen={confirmacionEliminar}
        onClose={() => setConfirmacionEliminar(false)}
        onConfirm={handleConfirmarEliminacion}
        title="Eliminar Impuesto"
        message={`¿Estás seguro de que quieres eliminar el impuesto "${impuestoSeleccionado?.nombre}"? Esta acción no se puede deshacer.`}
        confirmText="Eliminar"
        type="danger"
      />

      {/* Modal Detalles Declaración */}
      <Modal
        isOpen={modalDetallesDeclaracion}
        onClose={() => setModalDetallesDeclaracion(false)}
        title={`Detalles de Declaración - ${declaracionSeleccionada?.tipo} ${declaracionSeleccionada?.modelo}`}
        size="lg"
      >
        {declaracionSeleccionada && (
          <div className="space-y-6">
            {/* Información General */}
            <div className="bg-slate-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Información General</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1">Tipo de Declaración</label>
                  <p className="text-lg font-semibold text-slate-800">{declaracionSeleccionada.tipo}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1">Modelo</label>
                  <p className="text-lg font-mono font-semibold text-slate-800">{declaracionSeleccionada.modelo}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1">Período</label>
                  <p className="text-lg font-semibold text-slate-800">{declaracionSeleccionada.periodo}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1">Estado</label>
                  <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold ${
                    declaracionSeleccionada.estado === 'pagado'
                      ? 'bg-green-100 text-green-700'
                      : declaracionSeleccionada.estado === 'presentado'
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {declaracionSeleccionada.estado === 'pagado' && <CheckCircle size={16} />}
                    {declaracionSeleccionada.estado === 'presentado' && <Clock size={16} />}
                    {declaracionSeleccionada.estado === 'pendiente' && <AlertCircle size={16} />}
                    {declaracionSeleccionada.estado === 'pagado' ? 'Pagado' : declaracionSeleccionada.estado === 'presentado' ? 'Presentado' : 'Pendiente'}
                  </span>
                </div>
              </div>
            </div>

            {/* Fechas */}
            <div className="bg-slate-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Fechas Importantes</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1">Fecha de Declaración</label>
                  <p className="text-lg font-semibold text-slate-800">
                    {declaracionSeleccionada.fechaDeclaracion 
                      ? new Date(declaracionSeleccionada.fechaDeclaracion).toLocaleDateString('es-ES', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })
                      : 'No presentada'
                    }
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1">Fecha Límite</label>
                  <p className="text-lg font-semibold text-slate-800">
                    {new Date(declaracionSeleccionada.fechaLimite).toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            </div>

            {/* Resultado Económico */}
            <div className="bg-slate-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Resultado Económico</h3>
              <div className="text-center">
                <div className={`text-3xl font-bold ${
                  declaracionSeleccionada.resultado > 0 ? 'text-orange-600' : 'text-blue-600'
                }`}>
                  {declaracionSeleccionada.resultado > 0 
                    ? declaracionSeleccionada.resultado.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })
                    : 'Sin resultado'
                  }
                </div>
                <p className="text-sm text-slate-600 mt-2">
                  {declaracionSeleccionada.resultado > 0 
                    ? 'Importe a ingresar en Hacienda' 
                    : declaracionSeleccionada.resultado < 0 
                    ? 'Importe a compensar o devolver'
                    : 'Sin importe a pagar'
                  }
                </p>
              </div>
            </div>

            {/* Desglose por Trimestre (si es IVA) */}
            {declaracionSeleccionada.tipo === 'IVA' && (
              <div className="bg-slate-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Desglose Trimestral</h3>
                <div className="space-y-3">
                  {(() => {
                    const trimestre = parseInt(declaracionSeleccionada.periodo.split(' ')[0].replace('Q', ''));
                    const operacionesTrimestre = OPERACIONES_IVA.filter(op => {
                      const mes = new Date(op.fecha).getMonth() + 1;
                      return Math.ceil(mes / 3) === trimestre;
                    });
                    
                    const ivaRepercutido = operacionesTrimestre
                      .filter(op => op.tipo === 'ingreso')
                      .reduce((sum, op) => sum + op.cuotaIVA, 0);
                    
                    const ivaSoportado = operacionesTrimestre
                      .filter(op => op.tipo === 'gasto')
                      .reduce((sum, op) => sum + op.cuotaIVA, 0);

                    return (
                      <>
                        <div className="flex justify-between items-center py-2 border-b border-slate-200">
                          <span className="text-slate-600">IVA Repercutido (Cobrado):</span>
                          <span className="font-semibold text-green-600">
                            +{ivaRepercutido.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
                          </span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-slate-200">
                          <span className="text-slate-600">IVA Soportado (Pagado):</span>
                          <span className="font-semibold text-red-600">
                            -{ivaSoportado.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
                          </span>
                        </div>
                        <div className="flex justify-between items-center py-2 font-bold text-lg">
                          <span className="text-slate-800">Resultado Neto:</span>
                          <span className={ivaRepercutido - ivaSoportado > 0 ? 'text-orange-600' : 'text-blue-600'}>
                            {(ivaRepercutido - ivaSoportado).toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
                          </span>
                        </div>
                        <div className="text-sm text-slate-500 mt-2">
                          {operacionesTrimestre.length} operaciones registradas en este trimestre
                        </div>
                      </>
                    );
                  })()}
                </div>
              </div>
            )}

            {/* Acciones */}
            <div className="flex gap-3 pt-4 border-t">
              <button 
                onClick={() => setModalDetallesDeclaracion(false)}
                className="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-700 py-2 rounded-lg font-medium transition-colors"
              >
                Cerrar
              </button>
              {declaracionSeleccionada.estado === 'pendiente' && (
                <button 
                  onClick={() => {
                    toast.success('Preparando declaración...');
                    setModalDetallesDeclaracion(false);
                  }}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition-colors"
                >
                  Preparar Declaración
                </button>
              )}
              <button 
                onClick={() => {
                  toast.success('Descargando PDF...');
                }}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
              >
                <Download size={16} />
                Descargar PDF
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* DISCLAIMER */}
      <div className="mt-8 bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-lg">
        <div className="flex items-start gap-3">
          <AlertCircle className="text-yellow-600 flex-shrink-0 mt-0.5" size={20} />
          <div>
            <h3 className="font-bold text-yellow-800 mb-1">Aviso Legal</h3>
            <p className="text-sm text-yellow-700">
              Esta herramienta proporciona cálculos estimados con fines informativos. Los datos y resultados mostrados
              deben ser verificados por un profesional fiscal o asesor. No sustituye el asesoramiento profesional.
              Consulte siempre con un gestor o asesor fiscal antes de presentar declaraciones oficiales.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImpuestosPage;