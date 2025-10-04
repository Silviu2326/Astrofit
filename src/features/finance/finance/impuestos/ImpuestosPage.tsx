import React, { useState } from 'react';
import { motion } from 'framer-motion';
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
  Filter,
  AlertCircle,
  CheckCircle,
  Clock,
  Search,
  Plus,
} from 'lucide-react';

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
    if (filtroOperaciones === 'ingresos') return op.tipo === 'ingreso';
    if (filtroOperaciones === 'gastos') return op.tipo === 'gasto';
    return true;
  });

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
            <div className="flex items-center gap-3">
              <div className="flex bg-white/10 backdrop-blur-md border border-white/20 rounded-xl overflow-hidden">
                <select
                  value={ejercicioFiscal}
                  onChange={(e) => setEjercicioFiscal(e.target.value)}
                  className="px-3 py-2 text-sm font-semibold bg-transparent text-white border-none focus:outline-none cursor-pointer"
                >
                  <option value="2025">Ejercicio 2025</option>
                  <option value="2024">Ejercicio 2024</option>
                  <option value="2023">Ejercicio 2023</option>
                </select>
              </div>

              <div className="flex bg-white/10 backdrop-blur-md border border-white/20 rounded-xl overflow-hidden">
                <select
                  value={trimestreSeleccionado || ''}
                  onChange={(e) => setTrimestreSeleccionado(e.target.value ? Number(e.target.value) : null)}
                  className="px-3 py-2 text-sm font-semibold bg-transparent text-white border-none focus:outline-none cursor-pointer"
                >
                  <option value="">Todos</option>
                  <option value="1">Q1</option>
                  <option value="2">Q2</option>
                  <option value="3">Q3</option>
                  <option value="4">Q4</option>
                </select>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2.5 bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-300"
              >
                <Settings className="w-4 h-4" />
                <span className="hidden sm:inline">Config</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
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
                {resumenTrimestres.map((trimestre) => (
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
                    <button className="w-full bg-blue-50 hover:bg-blue-100 text-blue-600 py-2 rounded-lg text-sm font-medium transition-colors">
                      Preparar Declaración
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Desglose Detallado */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                  <FileText className="text-blue-600" />
                  Desglose de Operaciones
                </h2>
                <div className="flex gap-3">
                  <div className="flex gap-2">
                    <button
                      onClick={() => setFiltroOperaciones('todos')}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        filtroOperaciones === 'todos'
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      Todos
                    </button>
                    <button
                      onClick={() => setFiltroOperaciones('ingresos')}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        filtroOperaciones === 'ingresos'
                          ? 'bg-green-600 text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      Ingresos
                    </button>
                    <button
                      onClick={() => setFiltroOperaciones('gastos')}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        filtroOperaciones === 'gastos'
                          ? 'bg-red-600 text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      Gastos
                    </button>
                  </div>
                  <button className="bg-slate-700 hover:bg-slate-800 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
                    <Download size={18} />
                    Exportar
                  </button>
                </div>
              </div>

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
                <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors">
                  Generar Modelo 303
                </button>
                <button className="px-6 bg-slate-700 hover:bg-slate-800 text-white py-3 rounded-lg font-semibold transition-colors">
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

              <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold transition-colors">
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

              <button className="w-full mt-6 bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold transition-colors">
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
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
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
                    <button className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 py-2 rounded-lg text-sm font-medium transition-colors">
                      Ver Detalles
                    </button>
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
                          <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">Ver</button>
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
                        className="w-full px-3 py-2 border border-slate-300 rounded text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-600 mb-1">% IVA</label>
                      <select className="w-full px-3 py-2 border border-slate-300 rounded text-sm">
                        <option value="21">21%</option>
                        <option value="10">10%</option>
                        <option value="4">4%</option>
                      </select>
                    </div>
                    <div className="pt-2 border-t">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-slate-600">Cuota IVA:</span>
                        <span className="font-bold text-blue-600">210.00 €</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600">Total con IVA:</span>
                        <span className="font-bold text-slate-800">1,210.00 €</span>
                      </div>
                    </div>
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
                        className="w-full px-3 py-2 border border-slate-300 rounded text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-600 mb-1">% Retención</label>
                      <select className="w-full px-3 py-2 border border-slate-300 rounded text-sm">
                        <option value="15">15%</option>
                        <option value="7">7%</option>
                        <option value="19">19%</option>
                      </select>
                    </div>
                    <div className="pt-2 border-t">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-slate-600">Retención:</span>
                        <span className="font-bold text-purple-600">750.00 €</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600">Importe neto:</span>
                        <span className="font-bold text-slate-800">4,250.00 €</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </motion.div>

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