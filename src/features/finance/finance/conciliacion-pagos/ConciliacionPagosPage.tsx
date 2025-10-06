import React, { useState, useMemo } from 'react';
import toast from 'react-hot-toast';
import {
  CheckCircle, Clock, AlertTriangle, Calendar, Upload, Settings,
  Search, Download, Plus, RefreshCw, Trash2, X, Check,
  FileText, CreditCard, ArrowRight, Eye, Edit,
  Building, Zap, Info, Target, Link as LinkIcon, Save,
  AlertCircle, Loader2
} from 'lucide-react';

// ==================== TIPOS ====================
interface ExtractoBancario {
  id: string;
  fecha: string;
  referencia: string;
  concepto: string;
  monto: number;
  estado: 'pendiente' | 'conciliado' | 'parcial';
  tipo: 'banco' | 'stripe' | 'paypal' | 'bizum' | 'efectivo';
  selected: boolean;
}

interface Factura {
  id: string;
  numeroFactura: string;
  cliente: string;
  fechaEmision: string;
  fechaEsperada: string;
  monto: number;
  estado: 'pendiente' | 'conciliado' | 'vencido';
  selected: boolean;
}

interface Match {
  id: string;
  extractoId: string;
  facturaId: string;
  confianza: number;
  diferencia: number;
  tipo: 'exacto' | 'parcial' | 'sugerido';
}

interface Discrepancia {
  id: string;
  tipo: 'duplicado' | 'monto_diferente' | 'sin_registro' | 'sin_pago';
  detalles: string;
  diferenciaMonto?: number;
  estado: 'pendiente' | 'investigando' | 'resuelta';
}

interface ConciliacionHistorial {
  id: string;
  fecha: string;
  periodo: string;
  usuario: string;
  transacciones: number;
  discrepancias: number;
  estado: 'completado' | 'pendiente' | 'revision';
}

// ==================== DATOS MOCK ====================
const generarExtractoBancario = (): ExtractoBancario[] => {
  const conceptos = [
    'Transferencia SEPA', 'Pago Stripe', 'Bizum', 'Transferencia inmediata',
    'Pago con tarjeta', 'PayPal', 'Domiciliación', 'Ingreso efectivo',
    'Pago factura', 'Abono cliente', 'Transferencia nacional', 'Cargo TPV'
  ];

  return Array.from({ length: 28 }, (_, i) => ({
    id: `ext-${i + 1}`,
    fecha: new Date(2025, 2, Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
    referencia: `REF${2025}${String(i + 1).padStart(6, '0')}`,
    concepto: conceptos[Math.floor(Math.random() * conceptos.length)],
    monto: parseFloat((Math.random() * 5000 + 100).toFixed(2)),
    estado: i < 17 ? 'conciliado' : i < 25 ? 'pendiente' : 'parcial',
    tipo: ['banco', 'stripe', 'paypal', 'bizum', 'efectivo'][Math.floor(Math.random() * 5)] as any,
    selected: false
  }));
};

const generarFacturas = (): Factura[] => {
  const clientes = [
    'Acme Corporation', 'Tech Solutions SA', 'Global Industries', 'Smart Business',
    'Innovate Labs', 'Digital Services', 'Enterprise Group', 'Future Tech',
    'Professional Services', 'Corporate Solutions', 'Dynamic Systems', 'Advanced Co'
  ];

  return Array.from({ length: 32 }, (_, i) => {
    const fecha = new Date(2025, 2, Math.floor(Math.random() * 28) + 1);
    return {
      id: `fac-${i + 1}`,
      numeroFactura: `FAC-2025-${String(i + 1).padStart(4, '0')}`,
      cliente: clientes[Math.floor(Math.random() * clientes.length)],
      fechaEmision: fecha.toISOString().split('T')[0],
      fechaEsperada: new Date(fecha.getTime() + 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      monto: parseFloat((Math.random() * 5000 + 100).toFixed(2)),
      estado: i < 18 ? 'conciliado' : i < 30 ? 'pendiente' : 'vencido',
      selected: false
    };
  });
};

const generarDiscrepancias = (): Discrepancia[] => [
  {
    id: 'disc-1',
    tipo: 'monto_diferente',
    detalles: 'Diferencia de €15.50 entre extracto y factura FAC-2025-0012',
    diferenciaMonto: 15.50,
    estado: 'pendiente'
  },
  {
    id: 'disc-2',
    tipo: 'duplicado',
    detalles: 'Pago duplicado detectado: REF2025000145 y REF2025000147',
    estado: 'investigando'
  },
  {
    id: 'disc-3',
    tipo: 'sin_registro',
    detalles: 'Pago de €2,450.00 sin factura asociada',
    diferenciaMonto: 2450.00,
    estado: 'pendiente'
  }
];

const generarHistorial = (): ConciliacionHistorial[] => [
  {
    id: 'hist-1',
    fecha: '2025-03-25',
    periodo: 'Marzo 2025 (1-25)',
    usuario: 'María García',
    transacciones: 47,
    discrepancias: 2,
    estado: 'completado'
  },
  {
    id: 'hist-2',
    fecha: '2025-02-28',
    periodo: 'Febrero 2025',
    usuario: 'Juan Pérez',
    transacciones: 52,
    discrepancias: 1,
    estado: 'completado'
  },
  {
    id: 'hist-3',
    fecha: '2025-01-31',
    periodo: 'Enero 2025',
    usuario: 'María García',
    transacciones: 43,
    discrepancias: 3,
    estado: 'completado'
  }
];

// ==================== COMPONENTE PRINCIPAL ====================
const ConciliacionPagosPage: React.FC = () => {
  const [extracto, setExtracto] = useState<ExtractoBancario[]>(generarExtractoBancario());
  const [facturas, setFacturas] = useState<Factura[]>(generarFacturas());
  const [matches, setMatches] = useState<Match[]>([]);
  const [discrepancias] = useState<Discrepancia[]>(generarDiscrepancias());
  const [historial] = useState<ConciliacionHistorial[]>(generarHistorial());

  const [periodo, setPeriodo] = useState('marzo-2025');
  const [fuenteActiva, setFuenteActiva] = useState<'banco' | 'stripe' | 'paypal' | 'bizum' | 'todas'>('todas');
  const [searchExtracto, setSearchExtracto] = useState('');
  const [searchFacturas, setSearchFacturas] = useState('');
  const [draggedItem, setDraggedItem] = useState<{ tipo: 'extracto' | 'factura', id: string } | null>(null);
  const [hoveredZone, setHoveredZone] = useState<string | null>(null);

  // Modales
  const [showImportModal, setShowImportModal] = useState(false);
  const [showAjusteModal, setShowAjusteModal] = useState(false);
  const [showReporteModal, setShowReporteModal] = useState(false);
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedDiscrepancia, setSelectedDiscrepancia] = useState<Discrepancia | null>(null);
  
  // Estados para formularios
  const [importForm, setImportForm] = useState({
    formato: 'csv',
    archivo: null as File | null,
    cuenta: 'santander'
  });
  
  const [ajusteForm, setAjusteForm] = useState({
    tipo: 'correccion_monto',
    monto: '',
    razon: '',
    fecha: new Date().toISOString().split('T')[0]
  });
  
  // Estados de carga
  const [isLoading, setIsLoading] = useState(false);
  const [isAutoMatching, setIsAutoMatching] = useState(false);
  
  // Estados para configuración
  const [configForm, setConfigForm] = useState({
    cuentas: [
      { id: 'santander', nombre: 'Banco Santander', iban: 'ES12 3456 7890 1234 5678', activa: true, ultimaConciliacion: '2025-03-25' },
      { id: 'bbva', nombre: 'Banco BBVA', iban: 'ES98 7654 3210 9876 5432', activa: true, ultimaConciliacion: '2025-03-24' },
      { id: 'caixa', nombre: 'CaixaBank', iban: 'ES21 2100 0813 6101 2345 6789', activa: false, ultimaConciliacion: '2025-03-20' }
    ],
    notificaciones: {
      email: true,
      push: true,
      discrepancias: true,
      conciliacionCompleta: true
    },
    autoConciliacion: {
      activa: true,
      horario: '09:00',
      diasSemana: ['lunes', 'miercoles', 'viernes']
    }
  });
  
  const [nuevaCuenta, setNuevaCuenta] = useState({
    nombre: '',
    iban: '',
    tipo: 'banco'
  });

  // Reglas de auto-matching
  const [autoMatchRules, setAutoMatchRules] = useState({
    toleranciaMonto: 5,
    toleranciaFecha: 3,
    matchPorReferencia: true,
    matchPorCliente: true
  });

  // ==================== ESTADÍSTICAS ====================
  const stats = useMemo(() => {
    const conciliados = extracto.filter(e => e.estado === 'conciliado').length;
    const pendientes = extracto.filter(e => e.estado === 'pendiente').length;
    const ultimaConciliacion = historial[0]?.fecha || 'N/A';

    return {
      conciliados,
      pendientes,
      discrepancias: discrepancias.filter(d => d.estado === 'pendiente').length,
      ultimaConciliacion
    };
  }, [extracto, discrepancias, historial]);

  // ==================== FILTROS ====================
  const extractoFiltrado = useMemo(() => {
    return extracto.filter(e => {
      const matchSearch = e.referencia.toLowerCase().includes(searchExtracto.toLowerCase()) ||
                         e.concepto.toLowerCase().includes(searchExtracto.toLowerCase());
      const matchFuente = fuenteActiva === 'todas' || e.tipo === fuenteActiva;
      return matchSearch && matchFuente;
    });
  }, [extracto, searchExtracto, fuenteActiva]);

  const facturasFiltradas = useMemo(() => {
    return facturas.filter(f => {
      return f.numeroFactura.toLowerCase().includes(searchFacturas.toLowerCase()) ||
             f.cliente.toLowerCase().includes(searchFacturas.toLowerCase());
    });
  }, [facturas, searchFacturas]);

  // ==================== FUNCIONES DE UTILIDAD ====================
  const showToast = (message: string, type: 'success' | 'error' | 'loading' = 'success') => {
    if (type === 'success') {
      toast.success(message, { duration: 3000 });
    } else if (type === 'error') {
      toast.error(message, { duration: 5000 });
    } else {
      toast.loading(message, { duration: 2000 });
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImportForm(prev => ({ ...prev, archivo: file }));
      showToast(`Archivo ${file.name} seleccionado`, 'success');
    }
  };

  const handleImport = async () => {
    if (!importForm.archivo) {
      showToast('Por favor selecciona un archivo', 'error');
      return;
    }

    setIsLoading(true);
    showToast('Importando extracto bancario...', 'loading');
    
    // Simular importación
    setTimeout(() => {
      setIsLoading(false);
      setShowImportModal(false);
      showToast('Extracto bancario importado exitosamente', 'success');
      setImportForm({ formato: 'csv', archivo: null, cuenta: 'santander' });
    }, 2000);
  };

  const handleCreateAjuste = async () => {
    if (!ajusteForm.monto || !ajusteForm.razon) {
      showToast('Por favor completa todos los campos', 'error');
      return;
    }

    setIsLoading(true);
    showToast('Creando ajuste de conciliación...', 'loading');
    
    // Simular creación de ajuste
    setTimeout(() => {
      setIsLoading(false);
      setShowAjusteModal(false);
      showToast('Ajuste creado exitosamente', 'success');
      setAjusteForm({ tipo: 'correccion_monto', monto: '', razon: '', fecha: new Date().toISOString().split('T')[0] });
    }, 1500);
  };


  const handleExportReport = () => {
    showToast('Generando reporte PDF...', 'loading');
    setTimeout(() => {
      showToast('Reporte exportado exitosamente', 'success');
    }, 2000);
  };

  // ==================== AUTO-MATCHING ====================
  const autoMatch = async () => {
    setIsAutoMatching(true);
    showToast('Ejecutando auto-conciliación...', 'loading');
    
    const nuevosMatches: Match[] = [];
    const extractoPendiente = extracto.filter(e => e.estado === 'pendiente');
    const facturasPendientes = facturas.filter(f => f.estado === 'pendiente');

    // Simular procesamiento
    await new Promise(resolve => setTimeout(resolve, 1500));

    extractoPendiente.forEach(ext => {
      facturasPendientes.forEach(fac => {
        const diferenciaMonto = Math.abs(ext.monto - fac.monto);
        const diferenciaDias = Math.abs(
          (new Date(ext.fecha).getTime() - new Date(fac.fechaEsperada).getTime()) / (1000 * 60 * 60 * 24)
        );

        if (diferenciaMonto <= autoMatchRules.toleranciaMonto &&
            diferenciaDias <= autoMatchRules.toleranciaFecha) {
          const confianza = 100 - (diferenciaMonto / ext.monto * 50) - (diferenciaDias / autoMatchRules.toleranciaFecha * 20);

          if (confianza >= 70) {
            nuevosMatches.push({
              id: `match-${ext.id}-${fac.id}`,
              extractoId: ext.id,
              facturaId: fac.id,
              confianza: Math.round(confianza),
              diferencia: diferenciaMonto,
              tipo: diferenciaMonto === 0 ? 'exacto' : 'sugerido'
            });
          }
        }
      });
    });

    setMatches(prev => [...prev, ...nuevosMatches]);
    setIsAutoMatching(false);
    
    if (nuevosMatches.length > 0) {
      showToast(`${nuevosMatches.length} coincidencias encontradas`, 'success');
    } else {
      showToast('No se encontraron coincidencias automáticas', 'error');
    }
  };

  // ==================== CONFIRMAR MATCHES ====================
  const confirmarMatches = () => {
    if (matches.length === 0) {
      showToast('No hay matches para confirmar', 'error');
      return;
    }

    setIsLoading(true);
    showToast('Confirmando matches...', 'loading');

    setTimeout(() => {
      const nuevosExtractos = extracto.map(e => {
        const match = matches.find(m => m.extractoId === e.id);
        if (match) {
          return { ...e, estado: 'conciliado' as const };
        }
        return e;
      });

      const nuevasFacturas = facturas.map(f => {
        const match = matches.find(m => m.facturaId === f.id);
        if (match) {
          return { ...f, estado: 'conciliado' as const };
        }
        return f;
      });

      setExtracto(nuevosExtractos);
      setFacturas(nuevasFacturas);
      setMatches([]);
      setIsLoading(false);
      showToast(`${matches.length} matches confirmados exitosamente`, 'success');
    }, 1000);
  };

  const handleDeshacerMatches = () => {
    setShowConfirmModal(true);
  };

  const confirmarDeshacer = () => {
    setMatches([]);
    setShowConfirmModal(false);
    showToast('Matches deshechos', 'success');
  };

  const handleRefresh = () => {
    showToast('Actualizando datos...', 'loading');
    setTimeout(() => {
      showToast('Datos actualizados', 'success');
    }, 1000);
  };

  // ==================== FUNCIONES DE CONFIGURACIÓN ====================
  const handleConciliarCuenta = async (cuentaId: string) => {
    setIsLoading(true);
    showToast(`Iniciando conciliación para ${configForm.cuentas.find(c => c.id === cuentaId)?.nombre}...`, 'loading');
    
    setTimeout(() => {
      setIsLoading(false);
      showToast('Conciliación completada exitosamente', 'success');
      // Actualizar fecha de última conciliación
      setConfigForm(prev => ({
        ...prev,
        cuentas: prev.cuentas.map(c => 
          c.id === cuentaId 
            ? { ...c, ultimaConciliacion: new Date().toISOString().split('T')[0] }
            : c
        )
      }));
    }, 2000);
  };

  const handleToggleCuenta = (cuentaId: string) => {
    setConfigForm(prev => ({
      ...prev,
      cuentas: prev.cuentas.map(c => 
        c.id === cuentaId ? { ...c, activa: !c.activa } : c
      )
    }));
    showToast('Estado de cuenta actualizado', 'success');
  };

  const handleAgregarCuenta = () => {
    if (!nuevaCuenta.nombre || !nuevaCuenta.iban) {
      showToast('Por favor completa todos los campos', 'error');
      return;
    }

    const nuevaCuentaCompleta = {
      id: `cuenta-${Date.now()}`,
      nombre: nuevaCuenta.nombre,
      iban: nuevaCuenta.iban,
      activa: true,
      ultimaConciliacion: 'Nunca'
    };

    setConfigForm(prev => ({
      ...prev,
      cuentas: [...prev.cuentas, nuevaCuentaCompleta]
    }));

    setNuevaCuenta({ nombre: '', iban: '', tipo: 'banco' });
    showToast('Nueva cuenta agregada exitosamente', 'success');
  };

  const handleEliminarCuenta = (cuentaId: string) => {
    setConfigForm(prev => ({
      ...prev,
      cuentas: prev.cuentas.filter(c => c.id !== cuentaId)
    }));
    showToast('Cuenta eliminada', 'success');
  };

  const handleGuardarConfiguracion = () => {
    setIsLoading(true);
    showToast('Guardando configuración...', 'loading');
    
    setTimeout(() => {
      setIsLoading(false);
      setShowConfigModal(false);
      showToast('Configuración guardada exitosamente', 'success');
    }, 1500);
  };

  // ==================== FUNCIONES DE FILTRO POR MESES ====================
  const handleCambiarPeriodo = (nuevoPeriodo: string) => {
    setPeriodo(nuevoPeriodo);
    showToast(`Cambiando a período: ${nuevoPeriodo}`, 'loading');
    
    // Simular carga de datos del nuevo período
    setTimeout(() => {
      showToast(`Datos de ${nuevoPeriodo} cargados`, 'success');
    }, 1000);
  };

  // ==================== FUNCIONES DE INVESTIGACIÓN ====================
  const handleInvestigarDiscrepanciaCompleta = (discrepancia: Discrepancia) => {
    setSelectedDiscrepancia(discrepancia);
    showToast(`Iniciando investigación detallada: ${discrepancia.tipo}`, 'loading');
    
    // Simular proceso de investigación
    setTimeout(() => {
      showToast('Investigación completada. Revisa los resultados.', 'success');
      // Aquí se podría abrir un modal con los resultados de la investigación
    }, 2000);
  };

  // ==================== DRAG & DROP ====================
  const handleDragStart = (tipo: 'extracto' | 'factura', id: string) => {
    setDraggedItem({ tipo, id });
  };

  const handleDragOver = (e: React.DragEvent, zone: string) => {
    e.preventDefault();
    setHoveredZone(zone);
  };

  const handleDrop = (e: React.DragEvent, zone: 'extracto' | 'factura' | 'match') => {
    e.preventDefault();
    setHoveredZone(null);

    if (!draggedItem || zone !== 'match') return;

    // Lógica simplificada de matching manual
    if (draggedItem.tipo === 'extracto') {
      const ext = extracto.find(e => e.id === draggedItem.id);
      const facSeleccionadas = facturas.filter(f => f.selected);

      if (ext && facSeleccionadas.length === 1) {
        const match: Match = {
          id: `match-${ext.id}-${facSeleccionadas[0].id}`,
          extractoId: ext.id,
          facturaId: facSeleccionadas[0].id,
          confianza: 100,
          diferencia: Math.abs(ext.monto - facSeleccionadas[0].monto),
          tipo: Math.abs(ext.monto - facSeleccionadas[0].monto) === 0 ? 'exacto' : 'parcial'
        };
        setMatches(prev => [...prev, match]);
      }
    }

    setDraggedItem(null);
  };

  // ==================== RENDER ====================
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/30 pb-12">
      {/* Hero Header con gradiente */}
      <div className="relative overflow-hidden bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 shadow-2xl mb-8 p-8 md:p-12">
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
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                  Conciliación de <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Pagos</span>
                </h1>
                <p className="text-lg md:text-xl text-blue-100 mt-2 max-w-2xl flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Reconcilia pagos con extractos bancarios y pasarelas
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              {/* Filtro de Período Mejorado */}
              <div className="relative">
                <div className="flex bg-white/10 backdrop-blur-md border border-white/20 rounded-xl overflow-hidden shadow-lg">
                  <div className="flex items-center px-3 py-2 text-white/80">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span className="text-sm font-medium">Período:</span>
                  </div>
                  <select
                    value={periodo}
                    onChange={(e) => handleCambiarPeriodo(e.target.value)}
                    className="px-4 py-2 text-sm font-semibold bg-transparent text-white border-none focus:outline-none cursor-pointer hover:bg-white/10 transition-colors min-w-[140px]"
                  >
                    <option value="marzo-2025">📅 Marzo 2025</option>
                    <option value="febrero-2025">📅 Febrero 2025</option>
                    <option value="enero-2025">📅 Enero 2025</option>
                    <option value="diciembre-2024">📅 Diciembre 2024</option>
                    <option value="q1-2025">📊 Q1 2025</option>
                    <option value="q4-2024">📊 Q4 2024</option>
                    <option value="anual-2024">📈 Anual 2024</option>
                  </select>
                </div>
                
                {/* Indicador de período activo */}
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
              </div>

              <button
                onClick={() => setShowImportModal(true)}
                className="flex items-center gap-2 px-4 py-2.5 bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-300"
              >
                <Upload className="w-4 h-4" />
                <span className="hidden sm:inline">Importar</span>
              </button>

              <button
                onClick={autoMatch}
                disabled={isAutoMatching}
                className="flex items-center gap-2 px-4 py-2.5 bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isAutoMatching ? <Loader2 className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
                <span className="hidden sm:inline">{isAutoMatching ? 'Procesando...' : 'Auto-Conciliar'}</span>
              </button>

              <button
                onClick={handleRefresh}
                className="flex items-center gap-2 px-4 py-2.5 bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-300"
              >
                <RefreshCw className="w-4 h-4" />
                <span className="hidden sm:inline">Actualizar</span>
              </button>

              <button
                onClick={() => setShowConfigModal(true)}
                className="flex items-center gap-2 px-4 py-2.5 bg-white text-emerald-600 font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <Settings className="w-5 h-5" />
                <span>Config</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-[1920px] mx-auto px-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2.5 bg-green-50 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <p className="text-sm font-medium text-gray-600 mb-1">Pagos Conciliados</p>
            <p className="text-3xl font-bold text-green-600">{stats.conciliados}</p>
            <p className="text-xs text-gray-500 mt-1">Verificados y registrados</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2.5 bg-yellow-50 rounded-lg">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
            <p className="text-sm font-medium text-gray-600 mb-1">Pendientes de Conciliar</p>
            <p className="text-3xl font-bold text-yellow-600">{stats.pendientes}</p>
            <p className="text-xs text-gray-500 mt-1">Requieren revisión</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2.5 bg-red-50 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
            </div>
            <p className="text-sm font-medium text-gray-600 mb-1">Discrepancias Detectadas</p>
            <p className="text-3xl font-bold text-red-600">{stats.discrepancias}</p>
            <p className="text-xs text-gray-500 mt-1">Requieren atención</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2.5 bg-purple-50 rounded-lg">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <p className="text-sm font-medium text-gray-600 mb-1">Última Conciliación</p>
            <p className="text-3xl font-bold text-purple-600">{stats.ultimaConciliacion}</p>
            <p className="text-xs text-gray-500 mt-1">{historial[0]?.transacciones || 0} transacciones</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1920px] mx-auto px-6">
        {/* TABS DE FUENTES */}
        <div className="mb-6 bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 p-4">
          <div className="flex flex-wrap gap-2">
          {(['todas', 'banco', 'stripe', 'paypal', 'bizum'] as const).map((fuente) => (
            <button
              key={fuente}
              onClick={() => setFuenteActiva(fuente)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                fuenteActiva === fuente
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {fuente === 'todas' ? '🌐 Todas' :
               fuente === 'banco' ? '🏦 Banco' :
               fuente === 'stripe' ? '💳 Stripe' :
               fuente === 'paypal' ? '🅿️ PayPal' :
               '📱 Bizum'}
            </button>
          ))}
        </div>
      </div>

        {/* MATCHES ACTUALES */}
        {matches.length > 0 && (
          <div className="mb-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl shadow-xl p-6 border-2 border-green-200">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-xl font-bold text-green-800 flex items-center gap-2">
                <Target className="text-green-600" />
                Matches Preparados para Confirmar
              </h3>
              <p className="text-green-700 mt-1">
                {matches.length} coincidencias detectadas
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleDeshacerMatches}
                disabled={isLoading}
                className="px-4 py-2 bg-white border-2 border-red-300 text-red-700 rounded-lg hover:bg-red-50 transition-all flex items-center gap-2 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Trash2 size={18} />
                Deshacer
              </button>
              <button
                onClick={confirmarMatches}
                disabled={isLoading}
                className="px-6 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 transition-all shadow-md hover:shadow-lg flex items-center gap-2 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Check size={18} />}
                {isLoading ? 'Confirmando...' : `Confirmar Matches (${matches.length})`}
              </button>
            </div>
          </div>

          <div className="grid gap-3 max-h-60 overflow-y-auto">
            {matches.map(match => {
              const ext = extracto.find(e => e.id === match.extractoId);
              const fac = facturas.find(f => f.id === match.facturaId);

              return (
                <div key={match.id} className="bg-white rounded-lg p-4 border-2 border-green-200 flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="flex-1">
                      <div className="text-sm font-medium text-slate-700">{ext?.referencia}</div>
                      <div className="text-xs text-slate-500">{ext?.concepto}</div>
                    </div>

                    <ArrowRight className="text-green-600" size={24} />

                    <div className="flex-1">
                      <div className="text-sm font-medium text-slate-700">{fac?.numeroFactura}</div>
                      <div className="text-xs text-slate-500">{fac?.cliente}</div>
                    </div>

                    <div className="text-right">
                      <div className="text-lg font-bold text-slate-800">€{ext?.monto.toLocaleString('es-ES', { minimumFractionDigits: 2 })}</div>
                      {match.diferencia > 0 && (
                        <div className="text-xs text-orange-600 font-medium">
                          Dif: €{match.diferencia.toFixed(2)}
                        </div>
                      )}
                    </div>

                    <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                      match.confianza >= 95 ? 'bg-green-100 text-green-700' :
                      match.confianza >= 80 ? 'bg-yellow-100 text-yellow-700' :
                      'bg-orange-100 text-orange-700'
                    }`}>
                      {match.confianza}% confianza
                    </div>
                  </div>

                  <button
                    onClick={() => setMatches(matches.filter(m => m.id !== match.id))}
                    className="ml-4 p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <X size={18} />
                  </button>
                </div>
              );
            })}
            </div>
          </div>
        )}

        {/* LAYOUT DE 3 COLUMNAS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* COLUMNA 1: EXTRACTO BANCARIO */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 rounded-t-3xl">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Building size={24} />
              Extracto Bancario / Pasarela
            </h2>
            <p className="text-sm opacity-90 mt-1">Transacciones recibidas</p>
          </div>

          <div className="p-4">
            <div className="mb-4 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Buscar por referencia o concepto..."
                value={searchExtracto}
                onChange={(e) => setSearchExtracto(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="mb-3 flex items-center justify-between text-sm">
              <span className="font-medium text-slate-700">
                Total: €{extractoFiltrado.reduce((sum, e) => sum + e.monto, 0).toLocaleString('es-ES', { minimumFractionDigits: 2 })}
              </span>
              <span className="text-slate-500">
                {extractoFiltrado.length} transacciones
              </span>
            </div>

            <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2">
              {extractoFiltrado.map(ext => (
                <div
                  key={ext.id}
                  draggable={ext.estado === 'pendiente'}
                  onDragStart={() => handleDragStart('extracto', ext.id)}
                  onClick={() => {
                    if (ext.estado === 'pendiente') {
                      setExtracto(extracto.map(e =>
                        e.id === ext.id ? { ...e, selected: !e.selected } : e
                      ));
                    }
                  }}
                  className={`p-3 rounded-lg border-2 transition-all cursor-pointer ${
                    ext.estado === 'conciliado'
                      ? 'bg-green-50 border-green-200'
                      : ext.selected
                      ? 'bg-blue-100 border-blue-400 shadow-md'
                      : 'bg-white border-slate-200 hover:border-blue-300 hover:shadow-md'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="font-semibold text-slate-800 text-sm">{ext.referencia}</div>
                      <div className="text-xs text-slate-500 mt-0.5">{ext.concepto}</div>
                    </div>
                    <div className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                      ext.estado === 'conciliado' ? 'bg-green-100 text-green-700' :
                      ext.estado === 'pendiente' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-orange-100 text-orange-700'
                    }`}>
                      {ext.estado === 'conciliado' ? '✓ OK' :
                       ext.estado === 'pendiente' ? 'Pendiente' : 'Parcial'}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500">{ext.fecha}</span>
                    <span className="text-base font-bold text-slate-800">
                      €{ext.monto.toLocaleString('es-ES', { minimumFractionDigits: 2 })}
                    </span>
                  </div>

                  <div className="mt-2 flex items-center gap-2">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      ext.tipo === 'banco' ? 'bg-blue-100 text-blue-700' :
                      ext.tipo === 'stripe' ? 'bg-purple-100 text-purple-700' :
                      ext.tipo === 'paypal' ? 'bg-cyan-100 text-cyan-700' :
                      ext.tipo === 'bizum' ? 'bg-pink-100 text-pink-700' :
                      'bg-slate-100 text-slate-700'
                    }`}>
                      {ext.tipo}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* COLUMNA 2: ÁREA DE MATCHING */}
        <div
          className={`bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl shadow-lg border-4 border-dashed transition-all ${
            hoveredZone === 'match' ? 'border-blue-500 bg-blue-50' : 'border-slate-300'
          }`}
          onDragOver={(e) => handleDragOver(e, 'match')}
          onDrop={(e) => handleDrop(e, 'match')}
          onDragLeave={() => setHoveredZone(null)}
        >
          <div className="p-6 text-center">
            <div className="mb-6">
              <LinkIcon size={48} className="mx-auto text-slate-400 mb-3" />
              <h2 className="text-2xl font-bold text-slate-700 mb-2">Área de Matching</h2>
              <p className="text-slate-600">
                Arrastra transacciones aquí para conciliar
              </p>
            </div>

            {/* Reglas de auto-matching */}
            <div className="bg-white rounded-lg p-4 mb-6 text-left">
              <h3 className="font-bold text-slate-700 mb-3 flex items-center gap-2">
                <Settings size={18} />
                Reglas de Auto-Matching
              </h3>

              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-slate-600 block mb-1">
                    Tolerancia de monto: ±€{autoMatchRules.toleranciaMonto}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="50"
                    value={autoMatchRules.toleranciaMonto}
                    onChange={(e) => setAutoMatchRules({...autoMatchRules, toleranciaMonto: Number(e.target.value)})}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-600 block mb-1">
                    Tolerancia de fecha: ±{autoMatchRules.toleranciaFecha} días
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="15"
                    value={autoMatchRules.toleranciaFecha}
                    onChange={(e) => setAutoMatchRules({...autoMatchRules, toleranciaFecha: Number(e.target.value)})}
                    className="w-full"
                  />
                </div>

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={autoMatchRules.matchPorReferencia}
                    onChange={(e) => setAutoMatchRules({...autoMatchRules, matchPorReferencia: e.target.checked})}
                    className="rounded"
                  />
                  <span className="text-sm text-slate-700">Match por referencia</span>
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={autoMatchRules.matchPorCliente}
                    onChange={(e) => setAutoMatchRules({...autoMatchRules, matchPorCliente: e.target.checked})}
                    className="rounded"
                  />
                  <span className="text-sm text-slate-700">Match por cliente</span>
                </label>
              </div>
            </div>

            {/* Instrucciones */}
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
                <Info size={18} />
                Cómo usar
              </h4>
              <ul className="text-sm text-blue-700 space-y-1 text-left">
                <li>• Selecciona transacciones de izquierda o derecha</li>
                <li>• Arrastra aquí para crear un match manual</li>
                <li>• O usa "Auto-Conciliar" para matching automático</li>
                <li>• Revisa y confirma los matches sugeridos</li>
              </ul>
            </div>

            {/* Botón de auto-conciliar grande */}
            <button
              onClick={autoMatch}
              disabled={isAutoMatching}
              className="w-full mt-6 px-6 py-4 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl hover:from-green-700 hover:to-green-800 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-3 font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isAutoMatching ? <Loader2 size={24} className="animate-spin" /> : <Zap size={24} />}
              {isAutoMatching ? 'Procesando...' : 'Ejecutar Auto-Conciliación'}
            </button>
          </div>
        </div>

          {/* COLUMNA 3: FACTURAS/COBROS */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50">
            <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white p-4 rounded-t-3xl">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <FileText size={24} />
              Facturas / Cobros Registrados
            </h2>
            <p className="text-sm opacity-90 mt-1">Pendientes de conciliar</p>
          </div>

          <div className="p-4">
            <div className="mb-4 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Buscar por factura o cliente..."
                value={searchFacturas}
                onChange={(e) => setSearchFacturas(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            <div className="mb-3 flex items-center justify-between text-sm">
              <span className="font-medium text-slate-700">
                Total: €{facturasFiltradas.reduce((sum, f) => sum + f.monto, 0).toLocaleString('es-ES', { minimumFractionDigits: 2 })}
              </span>
              <span className="text-slate-500">
                {facturasFiltradas.length} facturas
              </span>
            </div>

            <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2">
              {facturasFiltradas.map(fac => (
                <div
                  key={fac.id}
                  draggable={fac.estado === 'pendiente'}
                  onDragStart={() => handleDragStart('factura', fac.id)}
                  onClick={() => {
                    if (fac.estado === 'pendiente') {
                      setFacturas(facturas.map(f =>
                        f.id === fac.id ? { ...f, selected: !f.selected } : f
                      ));
                    }
                  }}
                  className={`p-3 rounded-lg border-2 transition-all cursor-pointer ${
                    fac.estado === 'conciliado'
                      ? 'bg-green-50 border-green-200'
                      : fac.selected
                      ? 'bg-indigo-100 border-indigo-400 shadow-md'
                      : fac.estado === 'vencido'
                      ? 'bg-red-50 border-red-200'
                      : 'bg-white border-slate-200 hover:border-indigo-300 hover:shadow-md'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="font-semibold text-slate-800 text-sm">{fac.numeroFactura}</div>
                      <div className="text-xs text-slate-500 mt-0.5">{fac.cliente}</div>
                    </div>
                    <div className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                      fac.estado === 'conciliado' ? 'bg-green-100 text-green-700' :
                      fac.estado === 'pendiente' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {fac.estado === 'conciliado' ? '✓ Pagado' :
                       fac.estado === 'pendiente' ? 'Pendiente' : 'Vencido'}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-slate-500">Emisión: {fac.fechaEmision}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500">Esperado: {fac.fechaEsperada}</span>
                    <span className="text-base font-bold text-slate-800">
                      €{fac.monto.toLocaleString('es-ES', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            </div>
          </div>
        </div>

        {/* DISCREPANCIAS */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 mb-8">
        <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <AlertTriangle className="text-red-600" />
          Discrepancias Detectadas
        </h2>

        <div className="space-y-3">
          {discrepancias.map(disc => (
            <div key={disc.id} className="bg-red-50 border-2 border-red-200 rounded-lg p-4 flex items-start gap-4">
              <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                disc.tipo === 'duplicado' ? 'bg-orange-100 text-orange-700' :
                disc.tipo === 'monto_diferente' ? 'bg-red-100 text-red-700' :
                disc.tipo === 'sin_registro' ? 'bg-yellow-100 text-yellow-700' :
                'bg-purple-100 text-purple-700'
              }`}>
                {disc.tipo.replace('_', ' ').toUpperCase()}
              </div>

              <div className="flex-1">
                <p className="text-slate-800 font-medium">{disc.detalles}</p>
                {disc.diferenciaMonto && (
                  <p className="text-sm text-red-600 mt-1 font-semibold">
                    Diferencia: €{disc.diferenciaMonto.toFixed(2)}
                  </p>
                )}
              </div>

              <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                disc.estado === 'pendiente' ? 'bg-yellow-100 text-yellow-700' :
                disc.estado === 'investigando' ? 'bg-blue-100 text-blue-700' :
                'bg-green-100 text-green-700'
              }`}>
                {disc.estado}
              </div>

              <div className="flex gap-2">
                <button 
                  onClick={() => handleInvestigarDiscrepanciaCompleta(disc)}
                  className="px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium flex items-center gap-1"
                >
                  <Eye size={14} />
                  Investigar
                </button>
                <button
                  onClick={() => {
                    setSelectedDiscrepancia(disc);
                    setShowAjusteModal(true);
                  }}
                  className="px-3 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-medium"
                >
                  Crear Ajuste
                </button>
              </div>
            </div>
            ))}
          </div>
        </div>

        {/* HISTORIAL */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <Calendar className="text-purple-600" />
            Historial de Conciliaciones
          </h2>
          <button
            onClick={() => setShowReporteModal(true)}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all flex items-center gap-2 font-medium"
          >
            <Eye size={18} />
            Ver Completo
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-100">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Fecha</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Período</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Usuario</th>
                <th className="px-4 py-3 text-center text-sm font-semibold text-slate-700">Transacciones</th>
                <th className="px-4 py-3 text-center text-sm font-semibold text-slate-700">Discrepancias</th>
                <th className="px-4 py-3 text-center text-sm font-semibold text-slate-700">Estado</th>
                <th className="px-4 py-3 text-center text-sm font-semibold text-slate-700">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {historial.map(h => (
                <tr key={h.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 text-sm text-slate-700">{h.fecha}</td>
                  <td className="px-4 py-3 text-sm text-slate-700">{h.periodo}</td>
                  <td className="px-4 py-3 text-sm text-slate-700">{h.usuario}</td>
                  <td className="px-4 py-3 text-sm text-center font-semibold">{h.transacciones}</td>
                  <td className="px-4 py-3 text-sm text-center">
                    <span className={`px-2 py-1 rounded-full font-bold ${
                      h.discrepancias === 0 ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                    }`}>
                      {h.discrepancias}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      h.estado === 'completado' ? 'bg-green-100 text-green-700' :
                      h.estado === 'pendiente' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {h.estado}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => setShowReporteModal(true)}
                      className="px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium inline-flex items-center gap-1"
                    >
                      <Eye size={14} />
                      Ver
                    </button>
                  </td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* MODALES (simplificados) */}
      {showImportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-t-2xl">
              <h3 className="text-2xl font-bold flex items-center gap-2">
                <Upload size={28} />
                Importar Extracto Bancario
              </h3>
            </div>

            <div className="p-6">
              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-700 mb-2">Formato</label>
                <select 
                  value={importForm.formato}
                  onChange={(e) => setImportForm(prev => ({ ...prev, formato: e.target.value }))}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="csv">CSV - Extracto Bancario</option>
                  <option value="excel">Excel (.xlsx)</option>
                  <option value="ofx">OFX - Open Financial Exchange</option>
                  <option value="api">API Banco (Simulado)</option>
                  <option value="stripe">Stripe</option>
                  <option value="paypal">PayPal</option>
                </select>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-700 mb-2">Cuenta Bancaria</label>
                <select 
                  value={importForm.cuenta}
                  onChange={(e) => setImportForm(prev => ({ ...prev, cuenta: e.target.value }))}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="santander">Banco Santander - ES12 3456 7890 1234 5678</option>
                  <option value="bbva">Banco BBVA - ES98 7654 3210 9876 5432</option>
                  <option value="caixa">CaixaBank - ES21 2100 0813 6101 2345 6789</option>
                </select>
              </div>

              <div className="border-4 border-dashed border-slate-300 rounded-xl p-12 text-center hover:border-blue-400 transition-colors cursor-pointer">
                <input
                  type="file"
                  accept=".csv,.xlsx,.ofx"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <Upload size={48} className="mx-auto text-slate-400 mb-4" />
                  <p className="text-slate-700 font-medium mb-2">Arrastra tu archivo aquí</p>
                  <p className="text-sm text-slate-500">o haz clic para seleccionar</p>
                </label>
                {importForm.archivo && (
                  <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-green-700 font-medium">Archivo seleccionado:</p>
                    <p className="text-green-600 text-sm">{importForm.archivo.name}</p>
                  </div>
                )}
              </div>

              <div className="mt-6 flex gap-3 justify-end">
                <button
                  onClick={() => {
                    setShowImportModal(false);
                    setImportForm({ formato: 'csv', archivo: null, cuenta: 'santander' });
                  }}
                  className="px-6 py-2 border-2 border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 font-medium"
                >
                  Cancelar
                </button>
                <button 
                  onClick={handleImport}
                  disabled={isLoading || !importForm.archivo}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Upload size={18} />}
                  {isLoading ? 'Importando...' : 'Importar'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showAjusteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full">
            <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-6 rounded-t-2xl">
              <h3 className="text-2xl font-bold flex items-center gap-2">
                <Edit size={28} />
                Crear Ajuste de Conciliación
              </h3>
            </div>

            <div className="p-6 space-y-4">
              {selectedDiscrepancia && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                  <h4 className="font-semibold text-blue-800 mb-2">Discrepancia Relacionada</h4>
                  <p className="text-blue-700 text-sm">{selectedDiscrepancia.detalles}</p>
                  {selectedDiscrepancia.diferenciaMonto && (
                    <p className="text-blue-600 text-sm font-medium mt-1">
                      Diferencia: €{selectedDiscrepancia.diferenciaMonto.toFixed(2)}
                    </p>
                  )}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Tipo de Ajuste</label>
                <select 
                  value={ajusteForm.tipo}
                  onChange={(e) => setAjusteForm(prev => ({ ...prev, tipo: e.target.value }))}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500"
                >
                  <option value="correccion_monto">Corrección de Monto</option>
                  <option value="comision_bancaria">Comisión Bancaria</option>
                  <option value="devolucion">Devolución</option>
                  <option value="ajuste_manual">Ajuste Manual</option>
                  <option value="otro">Otro</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Monto del Ajuste (€)</label>
                <input 
                  type="number" 
                  step="0.01" 
                  value={ajusteForm.monto}
                  onChange={(e) => setAjusteForm(prev => ({ ...prev, monto: e.target.value }))}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500" 
                  placeholder="0.00" 
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Fecha del Ajuste</label>
                <input 
                  type="date" 
                  value={ajusteForm.fecha}
                  onChange={(e) => setAjusteForm(prev => ({ ...prev, fecha: e.target.value }))}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500" 
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Razón del Ajuste</label>
                <textarea 
                  rows={4} 
                  value={ajusteForm.razon}
                  onChange={(e) => setAjusteForm(prev => ({ ...prev, razon: e.target.value }))}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500" 
                  placeholder="Describe la razón del ajuste..."
                />
              </div>

              <div className="flex gap-3 justify-end pt-4">
                <button
                  onClick={() => {
                    setShowAjusteModal(false);
                    setSelectedDiscrepancia(null);
                    setAjusteForm({ tipo: 'correccion_monto', monto: '', razon: '', fecha: new Date().toISOString().split('T')[0] });
                  }}
                  className="px-6 py-2 border-2 border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 font-medium"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleCreateAjuste}
                  disabled={isLoading}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                  {isLoading ? 'Creando...' : 'Crear Ajuste'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showReporteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white p-6 rounded-t-2xl">
              <h3 className="text-2xl font-bold flex items-center gap-2">
                <FileText size={28} />
                Reporte de Conciliación - Marzo 2025
              </h3>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div className="bg-slate-50 p-4 rounded-lg">
                  <div className="text-sm text-slate-600 mb-1">Saldo Inicial</div>
                  <div className="text-2xl font-bold text-slate-800">€125,450.00</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="text-sm text-slate-600 mb-1">Total Ingresos</div>
                  <div className="text-2xl font-bold text-green-700">€87,320.50</div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-sm text-slate-600 mb-1">Transacciones Conciliadas</div>
                  <div className="text-2xl font-bold text-blue-700">47</div>
                </div>
                <div className="bg-red-50 p-4 rounded-lg">
                  <div className="text-sm text-slate-600 mb-1">Discrepancias</div>
                  <div className="text-2xl font-bold text-red-700">2</div>
                </div>
              </div>

              <div className="flex gap-3 justify-end pt-4">
                <button 
                  onClick={handleExportReport}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium flex items-center gap-2"
                >
                  <Download size={18} />
                  Exportar PDF
                </button>
                <button
                  onClick={() => setShowReporteModal(false)}
                  className="px-6 py-2 border-2 border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 font-medium"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showConfigModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-slate-600 to-slate-700 text-white p-6 rounded-t-2xl">
              <h3 className="text-2xl font-bold flex items-center gap-2">
                <Settings size={28} />
                Configuración del Sistema
              </h3>
              <p className="text-slate-200 mt-2">Gestiona cuentas bancarias, notificaciones y automatizaciones</p>
            </div>

            <div className="p-6">
              {/* TABS */}
              <div className="flex border-b border-slate-200 mb-6">
                <button className="px-4 py-2 text-sm font-medium text-blue-600 border-b-2 border-blue-600">
                  🏦 Cuentas Bancarias
                </button>
                <button className="px-4 py-2 text-sm font-medium text-slate-500 hover:text-slate-700">
                  🔔 Notificaciones
                </button>
                <button className="px-4 py-2 text-sm font-medium text-slate-500 hover:text-slate-700">
                  ⚙️ Automatización
                </button>
              </div>

              {/* SECCIÓN CUENTAS BANCARIAS */}
              <div className="space-y-4 mb-8">
                <h4 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                  <Building size={20} />
                  Cuentas Bancarias Configuradas
                </h4>
                
                <div className="space-y-3">
                  {configForm.cuentas.map((cuenta) => (
                    <div key={cuenta.id} className={`border-2 rounded-lg p-4 transition-all ${
                      cuenta.activa ? 'border-green-200 bg-green-50' : 'border-slate-200 bg-slate-50'
                    }`}>
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3">
                            <div className={`w-3 h-3 rounded-full ${cuenta.activa ? 'bg-green-500' : 'bg-slate-400'}`}></div>
                            <div>
                              <div className="font-semibold text-slate-800">{cuenta.nombre}</div>
                              <div className="text-sm text-slate-600">{cuenta.iban}</div>
                              <div className="text-xs text-slate-500 mt-1">
                                Última conciliación: {cuenta.ultimaConciliacion}
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleToggleCuenta(cuenta.id)}
                            className={`px-3 py-1 rounded-lg text-xs font-medium ${
                              cuenta.activa 
                                ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                            }`}
                          >
                            {cuenta.activa ? 'Activa' : 'Inactiva'}
                          </button>
                          
                          <button
                            onClick={() => handleConciliarCuenta(cuenta.id)}
                            disabled={isLoading || !cuenta.activa}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
                          >
                            {isLoading ? <Loader2 size={14} className="animate-spin" /> : <RefreshCw size={14} />}
                            Conciliar
                          </button>
                          
                          <button
                            onClick={() => handleEliminarCuenta(cuenta.id)}
                            className="px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 text-sm font-medium"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* AGREGAR NUEVA CUENTA */}
                <div className="border-2 border-dashed border-slate-300 rounded-lg p-6">
                  <h5 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                    <Plus size={18} />
                    Agregar Nueva Cuenta
                  </h5>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Nombre del Banco</label>
                      <input
                        type="text"
                        value={nuevaCuenta.nombre}
                        onChange={(e) => setNuevaCuenta(prev => ({ ...prev, nombre: e.target.value }))}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="Ej: Banco Santander"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">IBAN</label>
                      <input
                        type="text"
                        value={nuevaCuenta.iban}
                        onChange={(e) => setNuevaCuenta(prev => ({ ...prev, iban: e.target.value }))}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="ES12 3456 7890 1234 5678"
                      />
                    </div>
                    
                    <div className="flex items-end">
                      <button
                        onClick={handleAgregarCuenta}
                        className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium flex items-center justify-center gap-2"
                      >
                        <Plus size={16} />
                        Agregar
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* SECCIÓN NOTIFICACIONES */}
              <div className="space-y-4 mb-8">
                <h4 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                  <AlertCircle size={20} />
                  Configuración de Notificaciones
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <label className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={configForm.notificaciones.email}
                        onChange={(e) => setConfigForm(prev => ({
                          ...prev,
                          notificaciones: { ...prev.notificaciones, email: e.target.checked }
                        }))}
                        className="rounded"
                      />
                      <span className="text-slate-700">Notificaciones por Email</span>
                    </label>
                    
                    <label className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={configForm.notificaciones.push}
                        onChange={(e) => setConfigForm(prev => ({
                          ...prev,
                          notificaciones: { ...prev.notificaciones, push: e.target.checked }
                        }))}
                        className="rounded"
                      />
                      <span className="text-slate-700">Notificaciones Push</span>
                    </label>
                  </div>
                  
                  <div className="space-y-3">
                    <label className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={configForm.notificaciones.discrepancias}
                        onChange={(e) => setConfigForm(prev => ({
                          ...prev,
                          notificaciones: { ...prev.notificaciones, discrepancias: e.target.checked }
                        }))}
                        className="rounded"
                      />
                      <span className="text-slate-700">Alertas de Discrepancias</span>
                    </label>
                    
                    <label className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={configForm.notificaciones.conciliacionCompleta}
                        onChange={(e) => setConfigForm(prev => ({
                          ...prev,
                          notificaciones: { ...prev.notificaciones, conciliacionCompleta: e.target.checked }
                        }))}
                        className="rounded"
                      />
                      <span className="text-slate-700">Conciliación Completada</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* SECCIÓN AUTOMATIZACIÓN */}
              <div className="space-y-4 mb-8">
                <h4 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                  <Zap size={20} />
                  Automatización de Conciliación
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="flex items-center gap-3 mb-3">
                      <input
                        type="checkbox"
                        checked={configForm.autoConciliacion.activa}
                        onChange={(e) => setConfigForm(prev => ({
                          ...prev,
                          autoConciliacion: { ...prev.autoConciliacion, activa: e.target.checked }
                        }))}
                        className="rounded"
                      />
                      <span className="text-slate-700 font-medium">Auto-conciliación Activa</span>
                    </label>
                    
                    <div className="ml-6 space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Horario de Ejecución</label>
                        <input
                          type="time"
                          value={configForm.autoConciliacion.horario}
                          onChange={(e) => setConfigForm(prev => ({
                            ...prev,
                            autoConciliacion: { ...prev.autoConciliacion, horario: e.target.value }
                          }))}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Días de la Semana</label>
                    <div className="space-y-2">
                      {['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo'].map((dia) => (
                        <label key={dia} className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={configForm.autoConciliacion.diasSemana.includes(dia)}
                            onChange={(e) => {
                              const dias = configForm.autoConciliacion.diasSemana;
                              const nuevosDias = e.target.checked 
                                ? [...dias, dia]
                                : dias.filter(d => d !== dia);
                              setConfigForm(prev => ({
                                ...prev,
                                autoConciliacion: { ...prev.autoConciliacion, diasSemana: nuevosDias }
                              }));
                            }}
                            className="rounded"
                          />
                          <span className="text-sm text-slate-700 capitalize">{dia}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* BOTONES DE ACCIÓN */}
              <div className="flex gap-3 justify-end pt-6 border-t border-slate-200">
                <button
                  onClick={() => setShowConfigModal(false)}
                  className="px-6 py-2 border-2 border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 font-medium"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleGuardarConfiguracion}
                  disabled={isLoading}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                  {isLoading ? 'Guardando...' : 'Guardar Configuración'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Confirmación */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
            <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-6 rounded-t-2xl">
              <h3 className="text-2xl font-bold flex items-center gap-2">
                <AlertCircle size={28} />
                Confirmar Acción
              </h3>
            </div>

            <div className="p-6">
              <p className="text-slate-700 mb-6">
                ¿Estás seguro de que quieres deshacer todos los matches preparados? Esta acción no se puede deshacer.
              </p>

              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setShowConfirmModal(false)}
                  className="px-6 py-2 border-2 border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 font-medium"
                >
                  Cancelar
                </button>
                <button
                  onClick={confirmarDeshacer}
                  className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium"
                >
                  Deshacer Matches
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConciliacionPagosPage;