import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import {
  FileDown,
  Book,
  BookOpen,
  FileText,
  Receipt,
  Building2,
  Scale,
  TrendingUp,
  Percent,
  FileSpreadsheet,
  Database,
  Code,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Download,
  Mail,
  Share2,
  Check,
  Loader2,
  Calendar,
  Filter,
  Save,
  Trash2,
  Edit2,
  Play,
  FileType,
  Info
} from 'lucide-react';

// Types
type DataType = 'libroDiario' | 'libroMayor' | 'facturasEmitidas' | 'facturasRecibidas' | 'conciliacion' | 'balance' | 'resultados' | 'impuestos';
type ExportFormat = 'excel' | 'csv' | 'pdf' | 'contaplus' | 'a3' | 'sage' | 'xml' | 'ofx';
type PeriodType = 'last30' | 'thisMonth' | 'thisQuarter' | 'thisFiscalYear' | 'custom';
type ExportStatus = 'idle' | 'validating' | 'preparing' | 'generating' | 'compressing' | 'completed' | 'error';

interface DataCard {
  id: DataType;
  title: string;
  icon: any;
  description: string;
  formats: ExportFormat[];
}

interface ExportTemplate {
  id: string;
  name: string;
  dataTypes: DataType[];
  format: ExportFormat;
  lastUsed: string;
  period: string;
}

interface ExportHistory {
  id: string;
  date: string;
  time: string;
  user: string;
  dataTypes: DataType[];
  period: string;
  format: ExportFormat;
  size: string;
  status: 'completed' | 'error';
}

interface ValidationItem {
  label: string;
  passed: boolean;
  issue?: string;
}

const ExportarContabilidadPage: React.FC = () => {
  // State
  const [selectedData, setSelectedData] = useState<Set<DataType>>(new Set());
  const [selectedFormat, setSelectedFormat] = useState<ExportFormat>('excel');
  const [periodType, setPeriodType] = useState<PeriodType>('thisMonth');
  const [customStartDate, setCustomStartDate] = useState('2025-09-01');
  const [customEndDate, setCustomEndDate] = useState('2025-09-30');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [includeOpening, setIncludeOpening] = useState(true);
  const [includeClosing, setIncludeClosing] = useState(true);
  const [groupBy, setGroupBy] = useState<'cuenta' | 'fecha'>('fecha');
  const [includeAttachments, setIncludeAttachments] = useState(false);
  const [encryptPassword, setEncryptPassword] = useState('');
  const [digitalSignature, setDigitalSignature] = useState(false);
  const [reportLanguage, setReportLanguage] = useState('ES');
  const [exportStatus, setExportStatus] = useState<ExportStatus>('idle');
  const [exportProgress, setExportProgress] = useState(0);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [newTemplateName, setNewTemplateName] = useState('');
  const [showValidationDetails, setShowValidationDetails] = useState(false);
  const [showMappingModal, setShowMappingModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'export' | 'templates' | 'history' | 'integrations' | 'reports'>('export');
  const [accountMappings, setAccountMappings] = useState([
    { category: 'Ingresos por servicios', account: '705', description: 'Prestaciones de servicios' },
    { category: 'Ingresos por ventas', account: '700', description: 'Ventas de mercaderías' },
    { category: 'Gastos de personal', account: '640', description: 'Sueldos y salarios' },
    { category: 'Alquiler oficina', account: '621', description: 'Arrendamientos' },
    { category: 'Servicios profesionales', account: '623', description: 'Servicios profesionales indep.' }
  ]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<{id: string, name: string} | null>(null);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [previewData, setPreviewData] = useState<any>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    user: '',
    format: '',
    status: '',
    dateFrom: '',
    dateTo: '',
    dataTypes: [] as string[]
  });

  // Data cards
  const dataCards: DataCard[] = [
    {
      id: 'libroDiario',
      title: 'Libro Diario',
      icon: Book,
      description: 'Exporta asientos contables ordenados cronológicamente',
      formats: ['excel', 'csv', 'pdf', 'contaplus', 'a3', 'sage']
    },
    {
      id: 'libroMayor',
      title: 'Libro Mayor',
      icon: BookOpen,
      description: 'Exporta movimientos por cuenta contable',
      formats: ['excel', 'csv', 'pdf']
    },
    {
      id: 'facturasEmitidas',
      title: 'Facturas Emitidas',
      icon: FileText,
      description: 'Libro registro de facturas emitidas (IVA repercutido)',
      formats: ['excel', 'csv', 'pdf', 'xml']
    },
    {
      id: 'facturasRecibidas',
      title: 'Facturas Recibidas',
      icon: Receipt,
      description: 'Libro registro de facturas recibidas (IVA soportado)',
      formats: ['excel', 'csv', 'pdf']
    },
    {
      id: 'conciliacion',
      title: 'Conciliación Bancaria',
      icon: Building2,
      description: 'Exporta movimientos bancarios conciliados',
      formats: ['excel', 'ofx', 'csv']
    },
    {
      id: 'balance',
      title: 'Balance de Situación',
      icon: Scale,
      description: 'Balance de activos y pasivos',
      formats: ['excel', 'pdf']
    },
    {
      id: 'resultados',
      title: 'Cuenta de Resultados',
      icon: TrendingUp,
      description: 'Estado de pérdidas y ganancias (P&L)',
      formats: ['excel', 'pdf']
    },
    {
      id: 'impuestos',
      title: 'Impuestos (IVA/IRPF)',
      icon: Percent,
      description: 'Datos fiscales y modelos tributarios',
      formats: ['excel', 'pdf']
    }
  ];

  // Mock data
  const mockTemplates: ExportTemplate[] = [
    {
      id: 'tpl001',
      name: 'Export mensual para gestoría',
      dataTypes: ['facturasEmitidas', 'facturasRecibidas', 'impuestos'],
      format: 'excel',
      lastUsed: '15/09/2025',
      period: 'Este mes'
    },
    {
      id: 'tpl002',
      name: 'Declaración trimestral IVA',
      dataTypes: ['facturasEmitidas', 'facturasRecibidas', 'impuestos'],
      format: 'pdf',
      lastUsed: '01/07/2025',
      period: 'Trimestre actual'
    },
    {
      id: 'tpl003',
      name: 'Cierre de ejercicio',
      dataTypes: ['libroDiario', 'libroMayor', 'balance', 'resultados'],
      format: 'pdf',
      lastUsed: '31/12/2024',
      period: 'Año fiscal'
    }
  ];

  const mockHistory: ExportHistory[] = [
    {
      id: 'exp001',
      date: '28/09/2025',
      time: '14:35',
      user: 'Juan Pérez',
      dataTypes: ['facturasEmitidas', 'facturasRecibidas'],
      period: '01/09/2025 - 30/09/2025',
      format: 'excel',
      size: '2.4 MB',
      status: 'completed'
    },
    {
      id: 'exp002',
      date: '25/09/2025',
      time: '10:22',
      user: 'María García',
      dataTypes: ['libroDiario'],
      period: '01/07/2025 - 30/09/2025',
      format: 'pdf',
      size: '5.8 MB',
      status: 'completed'
    },
    {
      id: 'exp003',
      date: '20/09/2025',
      time: '16:45',
      user: 'Juan Pérez',
      dataTypes: ['balance', 'resultados'],
      period: '01/01/2025 - 30/09/2025',
      format: 'excel',
      size: '1.2 MB',
      status: 'completed'
    },
    {
      id: 'exp004',
      date: '15/09/2025',
      time: '09:15',
      user: 'Ana López',
      dataTypes: ['impuestos'],
      period: '01/09/2025 - 30/09/2025',
      format: 'xml',
      size: '0.8 MB',
      status: 'error'
    },
    {
      id: 'exp005',
      date: '10/09/2025',
      time: '11:30',
      user: 'Juan Pérez',
      dataTypes: ['conciliacion'],
      period: '01/08/2025 - 31/08/2025',
      format: 'csv',
      size: '3.1 MB',
      status: 'completed'
    }
  ];

  // Filter options
  const filterOptions = {
    users: ['Juan Pérez', 'María García', 'Ana López'],
    formats: ['excel', 'csv', 'pdf', 'xml'],
    statuses: ['completed', 'error'],
    dataTypes: dataCards.map(card => ({ value: card.id, label: card.title }))
  };

  // Filter logic
  const filteredHistory = mockHistory.filter(item => {
    if (filters.user && item.user !== filters.user) return false;
    if (filters.format && item.format !== filters.format) return false;
    if (filters.status && item.status !== filters.status) return false;
    if (filters.dateFrom && new Date(item.date.split('/').reverse().join('-')) < new Date(filters.dateFrom)) return false;
    if (filters.dateTo && new Date(item.date.split('/').reverse().join('-')) > new Date(filters.dateTo)) return false;
    if (filters.dataTypes.length > 0 && !filters.dataTypes.some(type => item.dataTypes.includes(type as DataType))) return false;
    return true;
  });

  const validationItems: ValidationItem[] = [
    { label: 'Todas las facturas tienen número', passed: true },
    { label: 'No hay fechas inválidas', passed: true },
    { label: 'Cuentas contables mapeadas', passed: true },
    { label: 'IVA correctamente aplicado', passed: false, issue: '3 facturas con tipo IVA incorrecto' },
    { label: 'Transacciones conciliadas', passed: false, issue: '12 transacciones pendientes de conciliar' }
  ];

  const mockPreviewData = [
    { fecha: '01/09/2025', cuenta: '4300001', concepto: 'Factura FV-2025-001', debe: '1,210.00', haber: '0.00' },
    { fecha: '01/09/2025', cuenta: '4770001', concepto: 'IVA Repercutido 21%', debe: '0.00', haber: '210.00' },
    { fecha: '01/09/2025', cuenta: '7050001', concepto: 'Venta servicios', debe: '0.00', haber: '1,000.00' },
    { fecha: '05/09/2025', cuenta: '6230001', concepto: 'Servicios profesionales', debe: '500.00', haber: '0.00' },
    { fecha: '05/09/2025', cuenta: '4720001', concepto: 'IVA Soportado 21%', debe: '105.00', haber: '0.00' },
    { fecha: '05/09/2025', cuenta: '4100001', concepto: 'Proveedor ABC SL', debe: '0.00', haber: '605.00' },
    { fecha: '10/09/2025', cuenta: '5720001', concepto: 'Transferencia bancaria', debe: '1,210.00', haber: '0.00' },
    { fecha: '10/09/2025', cuenta: '4300001', concepto: 'Cobro FV-2025-001', debe: '0.00', haber: '1,210.00' },
    { fecha: '15/09/2025', cuenta: '6210001', concepto: 'Alquiler oficina', debe: '800.00', haber: '0.00' },
    { fecha: '15/09/2025', cuenta: '5720001', concepto: 'Pago alquiler', debe: '0.00', haber: '800.00' }
  ];

  // Format configurations
  const formatConfigs = {
    excel: { icon: FileSpreadsheet, label: 'Excel (.xlsx)', description: 'Compatible con Microsoft Excel y Google Sheets' },
    csv: { icon: FileText, label: 'CSV (.csv)', description: 'Formato de texto plano separado por comas' },
    pdf: { icon: FileType, label: 'PDF (.pdf)', description: 'Documento portátil de solo lectura' },
    contaplus: { icon: Database, label: 'Contaplus', description: 'Formato específico para Contaplus' },
    a3: { icon: Database, label: 'A3 Contabilidad', description: 'Formato específico para A3' },
    sage: { icon: Database, label: 'Sage', description: 'Formato específico para Sage' },
    xml: { icon: Code, label: 'XML', description: 'Formato estructurado XML' },
    ofx: { icon: Code, label: 'OFX', description: 'Open Financial Exchange' }
  };

  // Handlers
  const toggleDataSelection = (dataId: DataType) => {
    const newSelection = new Set(selectedData);
    if (newSelection.has(dataId)) {
      newSelection.delete(dataId);
    } else {
      newSelection.add(dataId);
    }
    setSelectedData(newSelection);
  };

  const getPeriodLabel = () => {
    switch (periodType) {
      case 'last30': return 'Últimos 30 días';
      case 'thisMonth': return 'Este mes (01/09/2025 - 30/09/2025)';
      case 'thisQuarter': return 'Trimestre actual (01/07/2025 - 30/09/2025)';
      case 'thisFiscalYear': return 'Año fiscal (01/01/2025 - 31/12/2025)';
      case 'custom': return `Del ${customStartDate} al ${customEndDate}`;
      default: return '';
    }
  };

  const getTotalRecords = () => {
    return selectedData.size * 150 + Math.floor(Math.random() * 50);
  };

  const getEstimatedSize = () => {
    const baseSize = selectedData.size * 0.5;
    return (baseSize + Math.random() * 2).toFixed(1);
  };

  const getEstimatedTime = () => {
    return Math.max(5, selectedData.size * 2);
  };

  const handleExport = () => {
    setExportStatus('validating');
    setExportProgress(0);

    const stages: ExportStatus[] = ['validating', 'preparing', 'generating', 'compressing', 'completed'];
    let currentStage = 0;

    const interval = setInterval(() => {
      setExportProgress((prev) => {
        const newProgress = prev + 5;
        if (newProgress >= 100) {
          clearInterval(interval);
          setExportStatus('completed');
          setTimeout(() => {
            setShowSuccessModal(true);
            setExportStatus('idle');
            setExportProgress(0);
          }, 500);
          return 100;
        }
        if (newProgress % 25 === 0 && currentStage < stages.length - 1) {
          currentStage++;
          setExportStatus(stages[currentStage]);
        }
        return newProgress;
      });
    }, 150);
  };

  const getStatusLabel = () => {
    switch (exportStatus) {
      case 'validating': return 'Validando información...';
      case 'preparing': return 'Preparando datos...';
      case 'generating': return 'Generando archivo...';
      case 'compressing': return 'Comprimiendo...';
      case 'completed': return 'Completado';
      default: return '';
    }
  };

  const saveAsTemplate = () => {
    if (newTemplateName.trim()) {
      // Simulate saving template
      setShowTemplateModal(false);
      setNewTemplateName('');
    }
  };

  const getDataTypeLabel = (type: DataType) => {
    const card = dataCards.find(c => c.id === type);
    return card?.title || type;
  };

  const updateAccountMapping = (index: number, field: 'account' | 'description', value: string) => {
    setAccountMappings(prev => prev.map((mapping, i) => 
      i === index ? { ...mapping, [field]: value } : mapping
    ));
  };

  // Template functions
  const useTemplate = (templateId: string) => {
    const template = mockTemplates.find(t => t.id === templateId);
    if (template) {
      setSelectedData(new Set(template.dataTypes));
      setSelectedFormat(template.format);
      toast.success(`Plantilla "${template.name}" aplicada correctamente`);
    }
  };

  const editTemplate = (templateId: string) => {
    const template = mockTemplates.find(t => t.id === templateId);
    if (template) {
      setSelectedData(new Set(template.dataTypes));
      setSelectedFormat(template.format);
      setNewTemplateName(template.name);
      setShowTemplateModal(true);
      toast.success(`Editando plantilla "${template.name}"`);
    }
  };

  const deleteTemplate = (templateId: string) => {
    const template = mockTemplates.find(t => t.id === templateId);
    if (template) {
      setItemToDelete({ id: templateId, name: template.name });
      setShowDeleteModal(true);
    }
  };

  const confirmDelete = () => {
    if (itemToDelete) {
      toast.success(`Plantilla "${itemToDelete.name}" eliminada`);
      setShowDeleteModal(false);
      setItemToDelete(null);
    }
  };

  // History functions
  const downloadHistoryItem = () => {
    toast.success('Descargando archivo...');
    // Simulate download
    setTimeout(() => {
      toast.success('Archivo descargado correctamente');
    }, 2000);
  };

  const deleteHistoryItem = (itemId: string) => {
    const item = mockHistory.find(h => h.id === itemId);
    if (item) {
      setItemToDelete({ id: itemId, name: `Exportación del ${item.date}` });
      setShowDeleteModal(true);
    }
  };

  // Integration functions
  const toggleIntegration = (integrationName: string) => {
    toast.success(`Integración con ${integrationName} ${Math.random() > 0.5 ? 'conectada' : 'desconectada'}`);
  };

  const generatePackGestoria = () => {
    toast.loading('Generando Pack Gestoría...');
    setTimeout(() => {
      toast.success('Pack Gestoría generado correctamente');
    }, 3000);
  };

  // Report functions
  const generateReport = (reportName: string) => {
    toast.loading(`Generando ${reportName}...`);
    setTimeout(() => {
      toast.success(`${reportName} generado correctamente`);
    }, 2500);
  };

  const previewReport = (reportName: string) => {
    setPreviewData({ name: reportName, content: 'Vista previa del reporte...' });
    setShowPreviewModal(true);
  };

  // Help functions
  const showHelp = (helpItem: string) => {
    toast.success(`Abriendo ayuda: ${helpItem}`);
  };

  // Success modal functions
  const downloadFile = () => {
    toast.loading('Descargando archivo...');
    setTimeout(() => {
      toast.success('Archivo descargado correctamente');
      setShowSuccessModal(false);
    }, 2000);
  };

  const sendByEmail = () => {
    toast.loading('Enviando por email...');
    setTimeout(() => {
      toast.success('Archivo enviado por email correctamente');
    }, 2000);
  };

  const shareLink = () => {
    navigator.clipboard.writeText('https://astrofit.com/export/12345');
    toast.success('Link copiado al portapapeles');
  };

  // Filter functions
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const updateFilter = (key: string, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const toggleDataTypeFilter = (dataType: string) => {
    setFilters(prev => ({
      ...prev,
      dataTypes: prev.dataTypes.includes(dataType)
        ? prev.dataTypes.filter(type => type !== dataType)
        : [...prev.dataTypes, dataType]
    }));
  };

  const clearFilters = () => {
    setFilters({
      user: '',
      format: '',
      status: '',
      dateFrom: '',
      dateTo: '',
      dataTypes: []
    });
    toast.success('Filtros limpiados');
  };

  const applyFilters = () => {
    setShowFilters(false);
    toast.success(`Filtros aplicados - ${filteredHistory.length} resultados`);
  };

  const hasActiveFilters = () => {
    return filters.user || filters.format || filters.status || filters.dateFrom || filters.dateTo || filters.dataTypes.length > 0;
  };

  // Close dropdown when clicking outside
  const filterRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setShowFilters(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/30 pb-12">
      {/* Hero Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 shadow-2xl mb-8 p-8 md:p-12"
      >
        {/* Blur orbs */}
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
                  <FileDown className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-cyan-400 rounded-full border-2 border-white animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                  Exportación <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Contable</span>
                </h1>
                <p className="text-lg md:text-xl text-blue-100 mt-2 max-w-2xl">
                  Exporta tus datos a software de contabilidad
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="max-w-[1920px] mx-auto px-6">

      {/* Tabs */}
      <div className="mb-6 bg-white rounded-xl shadow-sm p-2 flex gap-2 overflow-x-auto">
        {[
          { id: 'export', label: 'Exportar Datos', icon: FileDown },
          { id: 'templates', label: 'Plantillas', icon: Save },
          { id: 'history', label: 'Historial', icon: Calendar },
          { id: 'integrations', label: 'Integraciones', icon: Database },
          { id: 'reports', label: 'Reportes', icon: FileText }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Export Tab */}
      {activeTab === 'export' && (
        <div className="space-y-6">
          {/* Data Selection Cards */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">1. Selecciona los datos a exportar</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {dataCards.map((card) => {
                const Icon = card.icon;
                const isSelected = selectedData.has(card.id);
                return (
                  <motion.div
                    key={card.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => toggleDataSelection(card.id)}
                    className={`relative p-4 border-2 rounded-xl cursor-pointer transition-all ${
                      isSelected
                        ? 'border-emerald-500 bg-emerald-50 shadow-md'
                        : 'border-gray-200 bg-white hover:border-emerald-300 hover:shadow'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className={`p-2 rounded-lg ${isSelected ? 'bg-emerald-500' : 'bg-gray-100'}`}>
                        <Icon className={`w-5 h-5 ${isSelected ? 'text-white' : 'text-gray-600'}`} />
                      </div>
                      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                        isSelected ? 'bg-emerald-500 border-emerald-500' : 'border-gray-300'
                      }`}>
                        {isSelected && <Check className="w-3 h-3 text-white" />}
                      </div>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1">{card.title}</h3>
                    <p className="text-sm text-gray-600 mb-3">{card.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {card.formats.slice(0, 3).map((fmt) => (
                        <span key={fmt} className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded">
                          {fmt.toUpperCase()}
                        </span>
                      ))}
                      {card.formats.length > 3 && (
                        <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded">
                          +{card.formats.length - 3}
                        </span>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Configuration */}
          {selectedData.size > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-sm p-6 space-y-6"
            >
              {/* Period Selection */}
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">2. Selecciona el período</h2>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-4">
                  {[
                    { id: 'last30', label: 'Últimos 30 días' },
                    { id: 'thisMonth', label: 'Este mes' },
                    { id: 'thisQuarter', label: 'Trimestre' },
                    { id: 'thisFiscalYear', label: 'Año fiscal' },
                    { id: 'custom', label: 'Personalizado' }
                  ].map((period) => (
                    <button
                      key={period.id}
                      onClick={() => setPeriodType(period.id as PeriodType)}
                      className={`px-4 py-3 rounded-lg font-medium transition-all ${
                        periodType === period.id
                          ? 'bg-emerald-500 text-white shadow-md'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {period.label}
                    </button>
                  ))}
                </div>
                {periodType === 'custom' && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Fecha inicio</label>
                      <input
                        type="date"
                        value={customStartDate}
                        onChange={(e) => setCustomStartDate(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Fecha fin</label>
                      <input
                        type="date"
                        value={customEndDate}
                        onChange={(e) => setCustomEndDate(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                )}
                <div className="mt-3 p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
                  <p className="text-sm font-medium text-emerald-900">{getPeriodLabel()}</p>
                </div>
              </div>

              {/* Format Selection */}
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">3. Selecciona el formato</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                  {(Object.keys(formatConfigs) as ExportFormat[]).map((format) => {
                    const config = formatConfigs[format];
                    const Icon = config.icon;
                    return (
                      <motion.button
                        key={format}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedFormat(format)}
                        className={`flex items-start gap-3 p-4 rounded-xl border-2 transition-all text-left ${
                          selectedFormat === format
                            ? 'border-emerald-500 bg-emerald-50 shadow-md'
                            : 'border-gray-200 bg-white hover:border-emerald-300'
                        }`}
                      >
                        <div className={`p-2 rounded-lg ${selectedFormat === format ? 'bg-emerald-500' : 'bg-gray-100'}`}>
                          <Icon className={`w-5 h-5 ${selectedFormat === format ? 'text-white' : 'text-gray-600'}`} />
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-gray-900 mb-1">{config.label}</div>
                          <div className="text-xs text-gray-600">{config.description}</div>
                        </div>
                        {selectedFormat === format && (
                          <Check className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Advanced Options */}
              <div>
                <button
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className="flex items-center gap-2 text-emerald-600 font-medium hover:text-emerald-700"
                >
                  {showAdvanced ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  Opciones Avanzadas
                </button>
                <AnimatePresence>
                  {showAdvanced && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 space-y-4 border-t pt-4"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={includeOpening}
                            onChange={(e) => setIncludeOpening(e.target.checked)}
                            className="w-4 h-4 text-emerald-500 rounded focus:ring-emerald-500"
                          />
                          <span className="text-sm text-gray-700">Incluir asientos de apertura</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={includeClosing}
                            onChange={(e) => setIncludeClosing(e.target.checked)}
                            className="w-4 h-4 text-emerald-500 rounded focus:ring-emerald-500"
                          />
                          <span className="text-sm text-gray-700">Incluir asientos de cierre</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={includeAttachments}
                            onChange={(e) => setIncludeAttachments(e.target.checked)}
                            className="w-4 h-4 text-emerald-500 rounded focus:ring-emerald-500"
                          />
                          <span className="text-sm text-gray-700">Incluir documentos adjuntos (ZIP)</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={digitalSignature}
                            onChange={(e) => setDigitalSignature(e.target.checked)}
                            className="w-4 h-4 text-emerald-500 rounded focus:ring-emerald-500"
                          />
                          <span className="text-sm text-gray-700">Firma digital</span>
                        </label>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Agrupar por</label>
                          <div className="flex gap-3">
                            <label className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="radio"
                                checked={groupBy === 'fecha'}
                                onChange={() => setGroupBy('fecha')}
                                className="w-4 h-4 text-emerald-500 focus:ring-emerald-500"
                              />
                              <span className="text-sm text-gray-700">Fecha</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="radio"
                                checked={groupBy === 'cuenta'}
                                onChange={() => setGroupBy('cuenta')}
                                className="w-4 h-4 text-emerald-500 focus:ring-emerald-500"
                              />
                              <span className="text-sm text-gray-700">Cuenta</span>
                            </label>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Cifrado con contraseña (opcional)
                          </label>
                          <input
                            type="password"
                            value={encryptPassword}
                            onChange={(e) => setEncryptPassword(e.target.value)}
                            placeholder="Dejar vacío para no cifrar"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Idioma del reporte</label>
                          <select
                            value={reportLanguage}
                            onChange={(e) => setReportLanguage(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                          >
                            <option value="ES">Español</option>
                            <option value="EN">English</option>
                            <option value="FR">Français</option>
                          </select>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}

          {/* Preview & Validation */}
          {selectedData.size > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-sm p-6 space-y-6"
            >
              {/* Summary */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl border border-emerald-200">
                  <div className="text-sm text-gray-600 mb-1">Total de registros</div>
                  <div className="text-2xl font-bold text-gray-900">{getTotalRecords().toLocaleString()}</div>
                </div>
                <div className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
                  <div className="text-sm text-gray-600 mb-1">Tamaño estimado</div>
                  <div className="text-2xl font-bold text-gray-900">{getEstimatedSize()} MB</div>
                </div>
                <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-200">
                  <div className="text-sm text-gray-600 mb-1">Tiempo estimado</div>
                  <div className="text-2xl font-bold text-gray-900">{getEstimatedTime()} seg</div>
                </div>
              </div>

              {/* Validation */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">Validación de datos</h3>
                  <button
                    onClick={() => setShowValidationDetails(!showValidationDetails)}
                    className="text-emerald-600 hover:text-emerald-700 text-sm font-medium"
                  >
                    {showValidationDetails ? 'Ocultar detalles' : 'Ver detalles'}
                  </button>
                </div>
                <div className="space-y-2">
                  {validationItems.map((item, idx) => (
                    <div key={idx} className={`flex items-start gap-3 p-3 rounded-lg ${
                      item.passed ? 'bg-green-50' : 'bg-amber-50'
                    }`}>
                      {item.passed ? (
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      ) : (
                        <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                      )}
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">{item.label}</div>
                        {!item.passed && showValidationDetails && item.issue && (
                          <div className="text-sm text-amber-700 mt-1">{item.issue}</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                {validationItems.some(v => !v.passed) && (
                  <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                    <div className="flex items-start gap-2">
                      <Info className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                      <div className="text-sm text-amber-900">
                        Hay algunos problemas menores. Puedes exportar igualmente o resolverlos primero para mejores resultados.
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Preview Table */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Vista previa de datos</h3>
                <div className="overflow-x-auto border border-gray-200 rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fecha</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cuenta</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Concepto</th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Debe</th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Haber</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {mockPreviewData.map((row, idx) => (
                        <tr key={idx} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm text-gray-900">{row.fecha}</td>
                          <td className="px-4 py-3 text-sm text-gray-600">{row.cuenta}</td>
                          <td className="px-4 py-3 text-sm text-gray-900">{row.concepto}</td>
                          <td className="px-4 py-3 text-sm text-right text-gray-900 font-medium">{row.debe}</td>
                          <td className="px-4 py-3 text-sm text-right text-gray-900 font-medium">{row.haber}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-2 text-sm text-gray-600 text-center">
                  Mostrando las primeras 10 filas de {getTotalRecords().toLocaleString()} registros
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowMappingModal(true)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
                  >
                    Configurar plan contable
                  </button>
                  <button
                    onClick={() => setShowTemplateModal(true)}
                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    Guardar como plantilla
                  </button>
                </div>
                <button
                  onClick={handleExport}
                  disabled={exportStatus !== 'idle'}
                  className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {exportStatus === 'idle' ? (
                    <>
                      <FileDown className="w-5 h-5" />
                      Generar Exportación
                    </>
                  ) : (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      {getStatusLabel()}
                    </>
                  )}
                </button>
              </div>

              {/* Progress Bar */}
              {exportStatus !== 'idle' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-2"
                >
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">{getStatusLabel()}</span>
                    <span className="text-emerald-600 font-semibold">{exportProgress}%</span>
                  </div>
                  <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-emerald-500 to-teal-600"
                      initial={{ width: 0 }}
                      animate={{ width: `${exportProgress}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </div>
      )}

      {/* Templates Tab */}
      {activeTab === 'templates' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Plantillas Predefinidas</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {mockTemplates.map((template) => (
                <div key={template.id} className="p-4 border-2 border-gray-200 rounded-xl hover:border-emerald-300 transition-all">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-bold text-gray-900">{template.name}</h3>
                    <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs rounded-full font-medium">
                      {formatConfigs[template.format].label}
                    </span>
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">Incluye:</span>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {template.dataTypes.map((type) => (
                          <span key={type} className="text-xs px-2 py-0.5 bg-gray-100 text-gray-700 rounded">
                            {getDataTypeLabel(type)}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">Período:</span> {template.period}
                    </div>
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">Último uso:</span> {template.lastUsed}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => useTemplate(template.id)}
                      className="flex-1 px-3 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 font-medium text-sm transition-colors"
                    >
                      Usar
                    </button>
                    <button 
                      onClick={() => editTemplate(template.id)}
                      className="p-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => deleteTemplate(template.id)}
                      className="p-2 border border-gray-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* History Tab */}
      {activeTab === 'history' && (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <h2 className="text-xl font-bold text-gray-900">Historial de Exportaciones</h2>
              {hasActiveFilters() && (
                <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-sm rounded-full font-medium">
                  {filteredHistory.length} resultados
                </span>
              )}
            </div>
            <div className="relative" ref={filterRef}>
              <button 
                onClick={toggleFilters}
                className={`flex items-center gap-2 px-4 py-2 border rounded-lg font-medium transition-colors ${
                  hasActiveFilters()
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Filter className="w-4 h-4" />
                Filtrar
                {hasActiveFilters() && (
                  <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                )}
              </button>
              
              {/* Filter Dropdown */}
              <AnimatePresence>
                {showFilters && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    className="absolute right-0 top-full mt-2 w-80 bg-white border border-gray-200 rounded-xl shadow-lg z-50 p-6"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-bold text-gray-900">Filtros</h3>
                        <button
                          onClick={clearFilters}
                          className="text-sm text-emerald-600 hover:text-emerald-700 font-medium"
                        >
                          Limpiar todo
                        </button>
                      </div>

                      {/* Usuario */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Usuario</label>
                        <select
                          value={filters.user}
                          onChange={(e) => updateFilter('user', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        >
                          <option value="">Todos los usuarios</option>
                          {filterOptions.users.map(user => (
                            <option key={user} value={user}>{user}</option>
                          ))}
                        </select>
                      </div>

                      {/* Formato */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Formato</label>
                        <select
                          value={filters.format}
                          onChange={(e) => updateFilter('format', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        >
                          <option value="">Todos los formatos</option>
                          {filterOptions.formats.map(format => (
                            <option key={format} value={format}>{format.toUpperCase()}</option>
                          ))}
                        </select>
                      </div>

                      {/* Estado */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Estado</label>
                        <select
                          value={filters.status}
                          onChange={(e) => updateFilter('status', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        >
                          <option value="">Todos los estados</option>
                          <option value="completed">Completado</option>
                          <option value="error">Error</option>
                        </select>
                      </div>

                      {/* Fechas */}
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Desde</label>
                          <input
                            type="date"
                            value={filters.dateFrom}
                            onChange={(e) => updateFilter('dateFrom', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Hasta</label>
                          <input
                            type="date"
                            value={filters.dateTo}
                            onChange={(e) => updateFilter('dateTo', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                          />
                        </div>
                      </div>

                      {/* Tipos de datos */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Tipos de datos</label>
                        <div className="space-y-2 max-h-32 overflow-y-auto">
                          {filterOptions.dataTypes.map(dataType => (
                            <label key={dataType.value} className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={filters.dataTypes.includes(dataType.value)}
                                onChange={() => toggleDataTypeFilter(dataType.value)}
                                className="w-4 h-4 text-emerald-500 rounded focus:ring-emerald-500"
                              />
                              <span className="text-sm text-gray-700">{dataType.label}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      {/* Botones de acción */}
                      <div className="flex gap-3 pt-4 border-t">
                        <button
                          onClick={clearFilters}
                          className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium text-sm transition-colors"
                        >
                          Limpiar
                        </button>
                        <button
                          onClick={applyFilters}
                          className="flex-1 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 font-medium text-sm transition-colors"
                        >
                          Aplicar
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          {filteredHistory.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fecha</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Usuario</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Datos</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Período</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Formato</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tamaño</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Acciones</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredHistory.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{item.date}</div>
                        <div className="text-xs text-gray-500">{item.time}</div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">{item.user}</td>
                      <td className="px-4 py-4">
                        <div className="flex flex-wrap gap-1">
                          {item.dataTypes.slice(0, 2).map((type) => (
                            <span key={type} className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded">
                              {getDataTypeLabel(type)}
                            </span>
                          ))}
                          {item.dataTypes.length > 2 && (
                            <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded">
                              +{item.dataTypes.length - 2}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-600">{item.period}</td>
                      <td className="px-4 py-4">
                        <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs rounded-full font-medium">
                          {item.format.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">{item.size}</td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        {item.status === 'completed' ? (
                          <span className="flex items-center gap-1 text-green-700">
                            <CheckCircle className="w-4 h-4" />
                            <span className="text-sm font-medium">Completado</span>
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-red-700">
                            <XCircle className="w-4 h-4" />
                            <span className="text-sm font-medium">Error</span>
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button 
                            onClick={downloadHistoryItem}
                            className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                          >
                            <Download className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => deleteHistoryItem(item.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                <Filter className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron resultados</h3>
              <p className="text-gray-600 mb-4">Intenta ajustar los filtros para encontrar lo que buscas</p>
              <button
                onClick={clearFilters}
                className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 font-medium transition-colors"
              >
                Limpiar filtros
              </button>
            </div>
          )}
          <div className="mt-4 text-sm text-gray-600 text-center">
            Los archivos se conservan durante 30 días
          </div>
        </div>
      )}

      {/* Integrations Tab */}
      {activeTab === 'integrations' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Integraciones Directas</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { name: 'Contaplus', connected: true },
                { name: 'A3 Contabilidad', connected: false },
                { name: 'Sage', connected: false },
                { name: 'Holded', connected: false }
              ].map((integration) => (
                <div key={integration.name} className="p-6 border-2 border-gray-200 rounded-xl">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-gray-100 rounded-lg">
                        <Database className="w-6 h-6 text-gray-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">{integration.name}</h3>
                        <span className={`text-sm ${integration.connected ? 'text-green-600' : 'text-gray-500'}`}>
                          {integration.connected ? 'Conectado' : 'Desconectado'}
                        </span>
                      </div>
                    </div>
                    {integration.connected && (
                      <div className="w-3 h-3 bg-green-500 rounded-full" />
                    )}
                  </div>
                  <button 
                    onClick={() => toggleIntegration(integration.name)}
                    className={`w-full px-4 py-2 rounded-lg font-medium transition-colors ${
                      integration.connected
                        ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                        : 'border-2 border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {integration.connected ? 'Enviar datos' : 'Conectar'}
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Pack Gestoría</h2>
            <div className="p-6 bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-xl">
              <h3 className="font-bold text-gray-900 mb-3">Exportación completa para gestoría</h3>
              <p className="text-sm text-gray-700 mb-4">
                Genera un paquete completo con todos los documentos necesarios para tu gestoría
              </p>
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <Check className="w-4 h-4 text-emerald-600" />
                  Libro de facturas emitidas y recibidas
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <Check className="w-4 h-4 text-emerald-600" />
                  Extractos bancarios completos
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <Check className="w-4 h-4 text-emerald-600" />
                  Justificantes de gastos
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <Check className="w-4 h-4 text-emerald-600" />
                  Datos fiscales (IVA, IRPF)
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <Check className="w-4 h-4 text-emerald-600" />
                  Índice en PDF y protección con contraseña
                </div>
              </div>
              <button 
                onClick={generatePackGestoria}
                className="w-full px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
              >
                Generar Pack Gestoría
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reports Tab */}
      {activeTab === 'reports' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Reportes Estándar</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { name: 'Balance de Situación', icon: Scale, format: 'PDF', lastGenerated: '28/09/2025' },
                { name: 'Cuenta de Resultados (P&L)', icon: TrendingUp, format: 'PDF', lastGenerated: '28/09/2025' },
                { name: 'Cash Flow Statement', icon: Building2, format: 'PDF', lastGenerated: '25/09/2025' },
                { name: 'Memoria Anual', icon: FileText, format: 'Word/PDF', lastGenerated: '31/12/2024' }
              ].map((report) => {
                const Icon = report.icon;
                return (
                  <div key={report.name} className="p-6 border-2 border-gray-200 rounded-xl hover:border-emerald-300 transition-all">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="p-3 bg-emerald-100 rounded-lg">
                        <Icon className="w-6 h-6 text-emerald-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 mb-1">{report.name}</h3>
                        <div className="text-sm text-gray-600">
                          <span className="font-medium">Formato:</span> {report.format}
                        </div>
                        <div className="text-sm text-gray-600">
                          <span className="font-medium">Última generación:</span> {report.lastGenerated}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => generateReport(report.name)}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 font-medium transition-colors"
                      >
                        <Play className="w-4 h-4" />
                        Generar
                      </button>
                      <button 
                        onClick={() => previewReport(report.name)}
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
                      >
                        Preview
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Ayuda y Documentación</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                '¿Qué formato usar?',
                'Guía para importar en Contaplus',
                'Mapeo de cuentas contables',
                'Preguntas frecuentes (FAQs)'
              ].map((helpItem) => (
                <button 
                  key={helpItem} 
                  onClick={() => showHelp(helpItem)}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-emerald-300 hover:bg-emerald-50 transition-all text-left"
                >
                  <span className="text-gray-900 font-medium">{helpItem}</span>
                  <Info className="w-5 h-5 text-gray-400" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccessModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowSuccessModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8"
            >
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Exportación completada</h3>
                <p className="text-gray-600">Tu archivo está listo para descargar</p>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 mb-6 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Nombre:</span>
                  <span className="text-gray-900 font-medium">exportacion_contable_sept2025.{selectedFormat}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tamaño:</span>
                  <span className="text-gray-900 font-medium">{getEstimatedSize()} MB</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Formato:</span>
                  <span className="text-gray-900 font-medium">{formatConfigs[selectedFormat].label}</span>
                </div>
              </div>

              <div className="space-y-3">
                <button 
                  onClick={downloadFile}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
                >
                  <Download className="w-5 h-5" />
                  Descargar ahora
                </button>
                <div className="grid grid-cols-2 gap-3">
                  <button 
                    onClick={sendByEmail}
                    className="flex items-center justify-center gap-2 px-4 py-2.5 border-2 border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    Enviar por email
                  </button>
                  <button 
                    onClick={shareLink}
                    className="flex items-center justify-center gap-2 px-4 py-2.5 border-2 border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                  >
                    <Share2 className="w-4 h-4" />
                    Compartir link
                  </button>
                </div>
                <button
                  onClick={() => setShowSuccessModal(false)}
                  className="w-full px-6 py-2.5 text-gray-600 hover:text-gray-900 font-medium transition-colors"
                >
                  Cerrar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Template Modal */}
      <AnimatePresence>
        {showTemplateModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowTemplateModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Guardar como plantilla</h3>
              <p className="text-gray-600 mb-6">Dale un nombre a tu configuración actual para reutilizarla más tarde</p>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nombre de la plantilla</label>
                  <input
                    type="text"
                    value={newTemplateName}
                    onChange={(e) => setNewTemplateName(e.target.value)}
                    placeholder="Ej: Export mensual octubre"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>

                <div className="p-4 bg-gray-50 rounded-xl">
                  <div className="text-sm font-medium text-gray-700 mb-2">Esta plantilla incluirá:</div>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>• {selectedData.size} tipos de datos seleccionados</li>
                    <li>• Formato: {formatConfigs[selectedFormat].label}</li>
                    <li>• Período: {getPeriodLabel()}</li>
                    <li>• Opciones avanzadas configuradas</li>
                  </ul>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowTemplateModal(false)}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={saveAsTemplate}
                  disabled={!newTemplateName.trim()}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  Guardar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mapping Modal */}
      <AnimatePresence>
        {showMappingModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowMappingModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full p-8 max-h-[80vh] overflow-y-auto"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Configuración de Plan Contable</h3>
              <p className="text-gray-600 mb-6">Mapea las categorías internas a cuentas contables</p>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Plantilla de plan contable</label>
                <select className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent">
                  <option>Plan General Contable (PGC) España</option>
                  <option>Plan simplificado</option>
                  <option>Personalizado</option>
                </select>
              </div>

              <div className="border-2 border-gray-200 rounded-xl overflow-hidden mb-6">
                <table className="min-w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Categoría Interna</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cuenta Contable</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Descripción</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {accountMappings.map((mapping, idx) => (
                      <tr key={idx}>
                        <td className="px-4 py-3 text-sm text-gray-900">{mapping.category}</td>
                        <td className="px-4 py-3">
                          <input
                            type="text"
                            value={mapping.account}
                            onChange={(e) => updateAccountMapping(idx, 'account', e.target.value)}
                            className="w-24 px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <input
                            type="text"
                            value={mapping.description}
                            onChange={(e) => updateAccountMapping(idx, 'description', e.target.value)}
                            className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowMappingModal(false)}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => setShowMappingModal(false)}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
                >
                  Guardar Configuración
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteModal && itemToDelete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowDeleteModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8"
            >
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
                  <Trash2 className="w-10 h-10 text-red-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Confirmar eliminación</h3>
                <p className="text-gray-600">¿Estás seguro de que quieres eliminar "{itemToDelete.name}"?</p>
                <p className="text-sm text-gray-500 mt-2">Esta acción no se puede deshacer.</p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={confirmDelete}
                  className="flex-1 px-6 py-3 bg-red-600 text-white rounded-xl font-bold shadow-lg hover:bg-red-700 transition-all"
                >
                  Eliminar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Preview Modal */}
      <AnimatePresence>
        {showPreviewModal && previewData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowPreviewModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full p-8 max-h-[80vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Vista previa: {previewData.name}</h3>
                <button
                  onClick={() => setShowPreviewModal(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 mb-6">
                <div className="text-center text-gray-600">
                  <FileText className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                  <p className="text-lg font-medium mb-2">Vista previa del reporte</p>
                  <p className="text-sm">Aquí se mostraría el contenido del reporte generado</p>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowPreviewModal(false)}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition-colors"
                >
                  Cerrar
                </button>
                <button
                  onClick={() => {
                    generateReport(previewData.name);
                    setShowPreviewModal(false);
                  }}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
                >
                  Generar Reporte
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      </div>
    </div>
  );
};

export default ExportarContabilidadPage;
