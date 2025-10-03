import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Upload, FileSpreadsheet, Database, Cloud, CheckCircle,
  AlertCircle, ArrowRight, ArrowLeft, Download, FileText,
  Table, Link as LinkIcon, Droplet, X, Check, HelpCircle,
  TrendingUp, Calendar, Users, Dumbbell, CreditCard, Clock,
  Play, RefreshCw, FileCheck, Eye, ChevronRight, Zap
} from 'lucide-react';

type ImportStep = 'select-source' | 'upload' | 'map-fields' | 'validate';
type ImportSource = 'file' | 'google-sheets' | 'api' | 'platform';
type FieldStatus = 'mapped' | 'suggested' | 'required' | 'unmapped';

interface FileData {
  name: string;
  size: number;
  type: string;
  progress: number;
}

interface FieldMapping {
  sourceField: string;
  targetField: string;
  status: FieldStatus;
  example: string;
}

interface ImportResult {
  total: number;
  imported: number;
  updated: number;
  skipped: number;
  errors: number;
}

interface ValidationError {
  row: number;
  field: string;
  error: string;
  suggestion: string;
}

const ImportadorDatosPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<ImportStep>('select-source');
  const [selectedSource, setSelectedSource] = useState<ImportSource | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<FileData[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [importProgress, setImportProgress] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [fieldMappings, setFieldMappings] = useState<FieldMapping[]>([
    { sourceField: 'nombre_completo', targetField: 'Nombre', status: 'mapped', example: 'Juan Pérez' },
    { sourceField: 'correo', targetField: 'Email', status: 'mapped', example: 'juan@email.com' },
    { sourceField: 'telefono', targetField: 'Teléfono', status: 'suggested', example: '+34 600 123 456' },
    { sourceField: 'fecha_nac', targetField: 'Fecha de Nacimiento', status: 'mapped', example: '15/05/1990' },
    { sourceField: 'objetivo', targetField: 'Objetivos', status: 'suggested', example: 'Pérdida de peso' },
    { sourceField: 'membresia', targetField: 'Tipo de Membresía', status: 'required', example: 'Premium' },
    { sourceField: 'direccion', targetField: 'Dirección', status: 'unmapped', example: 'Calle Mayor 123' }
  ]);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Mock data
  const importSources = [
    {
      id: 'file' as ImportSource,
      title: 'Subir Archivo',
      description: 'Importa datos desde archivos CSV, Excel o JSON',
      icon: Upload,
      gradient: 'from-emerald-500 to-teal-500',
      recommended: true,
      formats: ['CSV', 'XLSX', 'JSON']
    },
    {
      id: 'google-sheets' as ImportSource,
      title: 'Google Sheets',
      description: 'Conecta y sincroniza tus hojas de cálculo de Google',
      icon: Table,
      gradient: 'from-green-500 to-emerald-500',
      recommended: false,
      formats: ['Google Sheets']
    },
    {
      id: 'api' as ImportSource,
      title: 'API / Webhook',
      description: 'Importa datos desde una API externa o webhook',
      icon: LinkIcon,
      gradient: 'from-teal-500 to-cyan-500',
      recommended: false,
      formats: ['JSON', 'XML']
    },
    {
      id: 'platform' as ImportSource,
      title: 'Otra Plataforma',
      description: 'Importa desde Dropbox, Drive u otras plataformas',
      icon: Cloud,
      gradient: 'from-cyan-500 to-blue-500',
      recommended: false,
      formats: ['Múltiples']
    }
  ];


  const validationErrors: ValidationError[] = [
    { row: 15, field: 'Email', error: 'Formato inválido', suggestion: 'Debe contener @ y dominio válido' },
    { row: 23, field: 'Teléfono', error: 'Número incompleto', suggestion: 'Debe tener 9 dígitos' },
    { row: 45, field: 'Fecha de Nacimiento', error: 'Fecha futura', suggestion: 'No puede ser posterior a hoy' }
  ];

  const templates = [
    {
      id: 'clientes',
      name: 'Plantilla de Clientes',
      icon: Users,
      gradient: 'from-blue-500 to-indigo-500',
      fields: ['Nombre', 'Email', 'Teléfono', 'Fecha de Nacimiento', 'Objetivos'],
      records: 50
    },
    {
      id: 'entrenamientos',
      name: 'Plantilla de Entrenamientos',
      icon: Dumbbell,
      gradient: 'from-purple-500 to-pink-500',
      fields: ['Ejercicio', 'Grupo Muscular', 'Series', 'Repeticiones', 'Tiempo'],
      records: 30
    },
    {
      id: 'productos',
      name: 'Plantilla de Productos',
      icon: CreditCard,
      gradient: 'from-orange-500 to-red-500',
      fields: ['Nombre', 'Precio', 'Categoría', 'Stock', 'Descripción'],
      records: 25
    }
  ];

  const importHistory = [
    {
      id: 1,
      date: '2024-01-28 14:30',
      type: 'Clientes',
      records: 145,
      status: 'success',
      errors: 0
    },
    {
      id: 2,
      date: '2024-01-27 10:15',
      type: 'Entrenamientos',
      records: 89,
      status: 'success',
      errors: 0
    },
    {
      id: 3,
      date: '2024-01-26 16:45',
      type: 'Productos',
      records: 67,
      status: 'partial',
      errors: 5
    },
    {
      id: 4,
      date: '2024-01-25 09:20',
      type: 'Clientes',
      records: 120,
      status: 'success',
      errors: 0
    },
    {
      id: 5,
      date: '2024-01-24 11:30',
      type: 'Entrenamientos',
      records: 0,
      status: 'error',
      errors: 15
    }
  ];

  const mockImportResult: ImportResult = {
    total: 150,
    imported: 142,
    updated: 3,
    skipped: 2,
    errors: 3
  };

  // Funciones de utilidad
  const handleFileUpload = useCallback((files: FileList | null) => {
    if (!files) return;
    
    setIsUploading(true);
    const newFiles: FileData[] = [];
    
    Array.from(files).forEach((file, index) => {
      const fileData: FileData = {
        name: file.name,
        size: file.size,
        type: file.name.split('.').pop() || '',
        progress: 0
      };
      newFiles.push(fileData);
      
      // Simular progreso de carga
      const interval = setInterval(() => {
        setUploadedFiles(prev => prev.map(f => 
          f.name === fileData.name 
            ? { ...f, progress: Math.min(f.progress + 10, 100) }
            : f
        ));
        
        if (fileData.progress >= 100) {
          clearInterval(interval);
          setIsUploading(false);
        }
      }, 100);
    });
    
    setUploadedFiles(prev => [...prev, ...newFiles]);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFileUpload(e.dataTransfer.files);
  }, [handleFileUpload]);

  const handleFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileUpload(e.target.files);
  }, [handleFileUpload]);

  const removeFile = useCallback((fileName: string) => {
    setUploadedFiles(prev => prev.filter(f => f.name !== fileName));
  }, []);

  const downloadTemplate = useCallback((templateId: string) => {
    const template = templates.find(t => t.id === templateId);
    if (!template) return;

    // Crear datos CSV de ejemplo
    const headers = template.fields.join(',');
    const sampleData = template.fields.map(field => {
      switch (field) {
        case 'Nombre': return 'Juan Pérez';
        case 'Email': return 'juan@email.com';
        case 'Teléfono': return '+34 600 123 456';
        case 'Fecha de Nacimiento': return '15/05/1990';
        case 'Objetivos': return 'Pérdida de peso';
        case 'Ejercicio': return 'Press de banca';
        case 'Grupo Muscular': return 'Pecho';
        case 'Series': return '3';
        case 'Repeticiones': return '12';
        case 'Tiempo': return '45 min';
        case 'Precio': return '29.99';
        case 'Categoría': return 'Suplementos';
        case 'Stock': return '50';
        case 'Descripción': return 'Producto de alta calidad';
        default: return 'Ejemplo';
      }
    }).join(',');
    
    const csvContent = `${headers}\n${sampleData}`;
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${template.name}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  const autoDetectFields = useCallback(() => {
    // Simular detección automática con IA
    setFieldMappings(prev => prev.map(mapping => ({
      ...mapping,
      status: mapping.status === 'unmapped' ? 'suggested' : mapping.status
    })));
    
    // Mostrar notificación de éxito
    alert('¡Detección automática completada! Se han sugerido mapeos para los campos no mapeados.');
  }, []);

  const updateFieldMapping = useCallback((index: number, targetField: string) => {
    setFieldMappings(prev => prev.map((mapping, i) => 
      i === index 
        ? { ...mapping, targetField, status: targetField === 'No mapear' ? 'unmapped' : 'mapped' }
        : mapping
    ));
  }, []);

  const downloadErrorReport = useCallback(() => {
    const headers = 'Fila,Campo,Error,Sugerencia';
    const csvContent = validationErrors.map(error => 
      `${error.row},${error.field},"${error.error}","${error.suggestion}"`
    ).join('\n');
    
    const fullCsv = `${headers}\n${csvContent}`;
    const blob = new Blob([fullCsv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'reporte_errores_importacion.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  const viewImportedData = useCallback(() => {
    // Simular navegación a vista de datos
    alert('Redirigiendo a la vista de datos importados...');
  }, []);

  const openHelpGuide = useCallback(() => {
    // Simular apertura de guía de ayuda
    alert('Abriendo guía de importación...');
  }, []);

  const openVideoTutorials = useCallback(() => {
    // Simular apertura de videos tutoriales
    alert('Abriendo videos tutoriales...');
  }, []);

  const viewImportHistory = useCallback((importId: number) => {
    // Simular vista de historial específico
    alert(`Viendo detalles de importación #${importId}...`);
  }, []);

  const handleStartImport = () => {
    setIsImporting(true);
    setImportProgress(0);

    const interval = setInterval(() => {
      setImportProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsImporting(false);
            setShowResult(true);
          }, 500);
          return 100;
        }
        return prev + 5;
      });
    }, 200);
  };

  const getStatusColor = (status: FieldStatus) => {
    switch (status) {
      case 'mapped': return 'text-green-600 bg-green-50 border-green-200';
      case 'suggested': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'required': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status: FieldStatus) => {
    switch (status) {
      case 'mapped': return <CheckCircle className="w-4 h-4" />;
      case 'suggested': return <HelpCircle className="w-4 h-4" />;
      case 'required': return <AlertCircle className="w-4 h-4" />;
      default: return <X className="w-4 h-4" />;
    }
  };

  const renderStepIndicator = () => {
    const steps = [
      { id: 'select-source', label: 'Origen' },
      { id: 'upload', label: 'Subir' },
      { id: 'map-fields', label: 'Mapear' },
      { id: 'validate', label: 'Validar' }
    ];

    const currentIndex = steps.findIndex(s => s.id === currentStep);

    return (
      <div className="flex items-center justify-center gap-2 mb-8">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <div className="flex items-center gap-2">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`flex items-center justify-center w-10 h-10 rounded-full font-bold transition-all duration-300 ${
                  index <= currentIndex
                    ? 'bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-lg'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {index < currentIndex ? <Check className="w-5 h-5" /> : index + 1}
              </motion.div>
              <span className={`text-sm font-semibold ${
                index <= currentIndex ? 'text-gray-900' : 'text-gray-500'
              }`}>
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className={`h-0.5 w-12 transition-all duration-300 ${
                index < currentIndex ? 'bg-gradient-to-r from-emerald-500 to-teal-500' : 'bg-gray-200'
              }`} />
            )}
          </React.Fragment>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-teal-50/30 pb-12">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 rounded-3xl shadow-2xl mb-8 p-8 md:p-12"
      >
        {/* Animated background effects */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        {/* Dots pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="relative">
              <Upload className="w-10 h-10 text-yellow-300 animate-pulse" />
              <div className="absolute inset-0 w-10 h-10 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Importa tus datos <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">fácilmente</span>
            </h1>
          </div>

          <p className="text-xl md:text-2xl text-teal-100 max-w-3xl leading-relaxed mb-6">
            Migra tus datos desde <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">cualquier formato</span> en minutos
          </p>

          {/* Format icons */}
          <div className="flex flex-wrap gap-3">
            {['CSV', 'Excel', 'JSON', 'Google Sheets'].map((format) => (
              <div key={format} className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
                <FileSpreadsheet className="w-4 h-4 text-emerald-200" />
                <span className="text-sm font-semibold text-white">{format}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Step Indicator */}
      {!showResult && renderStepIndicator()}

      {/* Main Content */}
      <AnimatePresence mode="wait">
        {/* STEP 1: Select Source */}
        {currentStep === 'select-source' && (
          <motion.div
            key="select-source"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
            className="space-y-8"
          >
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Selecciona el origen de tus datos</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {importSources.map((source, index) => {
                  const Icon = source.icon;
                  return (
                    <motion.button
                      key={source.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02, y: -4 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedSource(source.id)}
                      className={`relative overflow-hidden rounded-3xl p-6 text-left transition-all duration-300 ${
                        selectedSource === source.id
                          ? 'bg-gradient-to-br from-emerald-50 to-teal-50 border-4 border-emerald-500 shadow-2xl shadow-emerald-500/20'
                          : 'bg-white border-2 border-gray-200 hover:border-emerald-300 hover:shadow-xl'
                      }`}
                    >
                      {/* Glow effect */}
                      {selectedSource === source.id && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-teal-500/10"
                        />
                      )}

                      <div className="relative z-10">
                        <div className="flex items-start justify-between mb-4">
                          <div className={`p-4 rounded-2xl bg-gradient-to-br ${source.gradient} shadow-lg`}>
                            <Icon className="w-8 h-8 text-white" />
                          </div>
                          {source.recommended && (
                            <div className="px-3 py-1 bg-yellow-500 text-white text-xs font-bold rounded-full">
                              Recomendado
                            </div>
                          )}
                        </div>

                        <h3 className="text-xl font-bold text-gray-900 mb-2">{source.title}</h3>
                        <p className="text-gray-600 mb-4">{source.description}</p>

                        <div className="flex flex-wrap gap-2">
                          {source.formats.map((format) => (
                            <span key={format} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded-lg">
                              {format}
                            </span>
                          ))}
                        </div>
                      </div>

                      {selectedSource === source.id && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute top-4 right-4 p-2 bg-emerald-500 rounded-full"
                        >
                          <Check className="w-5 h-5 text-white" />
                        </motion.div>
                      )}
                    </motion.button>
                  );
                })}
              </div>

              <div className="mt-8 flex justify-end">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={!selectedSource}
                  onClick={() => setCurrentStep('upload')}
                  className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center gap-2"
                >
                  Continuar
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}

        {/* STEP 2: Upload File */}
        {currentStep === 'upload' && (
          <motion.div
            key="upload"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/50">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Sube tu archivo</h2>

              {/* Drop Zone */}
              <motion.div
                whileHover={{ scale: 1.01 }}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`relative overflow-hidden border-dashed border-4 rounded-3xl p-12 text-center transition-all duration-300 cursor-pointer group ${
                  isDragOver 
                    ? 'border-emerald-500 bg-gradient-to-br from-emerald-100 to-teal-100' 
                    : 'border-emerald-300 bg-gradient-to-br from-emerald-50 to-teal-50 hover:border-emerald-500'
                }`}
              >
                {/* Animated background */}
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>

                <div className="relative z-10">
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="mb-6"
                  >
                    <Upload className={`w-20 h-20 mx-auto ${isDragOver ? 'text-emerald-700' : 'text-emerald-600'}`} />
                  </motion.div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {isDragOver ? '¡Suelta el archivo aquí!' : 'Arrastra tu archivo aquí'}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    o{' '}
                    <span className="text-emerald-600 font-semibold hover:text-emerald-700 cursor-pointer">
                      haz click para seleccionar
                    </span>
                  </p>
                  <p className="text-sm text-gray-500">
                    Formatos soportados: .xlsx, .csv, .json (máx. 10MB)
                  </p>
                </div>

                {/* Hidden file input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept=".xlsx,.csv,.json"
                  onChange={handleFileInputChange}
                  className="hidden"
                />
              </motion.div>

              {/* Uploaded Files */}
              {uploadedFiles.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-6"
                >
                  <button
                    onClick={() => {
                      setUploadedFiles([
                        { name: 'clientes_enero_2024.xlsx', size: 2457600, type: 'xlsx', progress: 100 }
                      ]);
                    }}
                    className="w-full p-4 border-2 border-dashed border-gray-300 rounded-2xl text-gray-500 hover:border-emerald-500 hover:text-emerald-600 transition-all duration-300"
                  >
                    + Click aquí para simular carga de archivo
                  </button>
                </motion.div>
              )}

              {uploadedFiles.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-8 space-y-4"
                >
                  <h3 className="text-lg font-bold text-gray-900">Archivos subidos</h3>
                  {uploadedFiles.map((file, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white rounded-2xl p-4 border border-gray-200 shadow-md"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl">
                            <FileSpreadsheet className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{file.name}</p>
                            <p className="text-sm text-gray-500">
                              {(file.size / 1024 / 1024).toFixed(2)} MB • {file.type.toUpperCase()}
                            </p>
                          </div>
                        </div>
                        <button 
                          onClick={() => removeFile(file.name)}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          <X className="w-5 h-5 text-gray-500" />
                        </button>
                      </div>

                      {file.progress < 100 ? (
                        <div className="w-full bg-emerald-100 rounded-full h-2 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${file.progress}%` }}
                            transition={{ duration: 0.5 }}
                            className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"
                          />
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-emerald-600">
                          <CheckCircle className="w-5 h-5" />
                          <span className="text-sm font-semibold">Carga completada</span>
                        </div>
                      )}
                    </motion.div>
                  ))}

                  {/* Preview Table */}
                  <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-md mt-6">
                    <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <Eye className="w-5 h-5 text-emerald-600" />
                      Vista previa (primeras 3 filas)
                    </h4>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-gradient-to-r from-emerald-50 to-teal-50">
                            <th className="px-4 py-3 text-left text-sm font-bold text-gray-700">Nombre</th>
                            <th className="px-4 py-3 text-left text-sm font-bold text-gray-700">Email</th>
                            <th className="px-4 py-3 text-left text-sm font-bold text-gray-700">Teléfono</th>
                            <th className="px-4 py-3 text-left text-sm font-bold text-gray-700">Fecha Nac.</th>
                          </tr>
                        </thead>
                        <tbody>
                          {['Juan Pérez', 'María García', 'Carlos López'].map((name, i) => (
                            <tr key={i} className="border-b border-gray-100 hover:bg-emerald-50/50 transition-colors">
                              <td className="px-4 py-3 text-sm text-gray-900">{name}</td>
                              <td className="px-4 py-3 text-sm text-gray-600">email{i + 1}@example.com</td>
                              <td className="px-4 py-3 text-sm text-gray-600">+34 600 {100 + i * 111} 456</td>
                              <td className="px-4 py-3 text-sm text-gray-600">{15 + i}/05/199{i}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </motion.div>
              )}

              <div className="mt-8 flex justify-between">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentStep('select-source')}
                  className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-300 flex items-center gap-2"
                >
                  <ArrowLeft className="w-5 h-5" />
                  Atrás
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={uploadedFiles.length === 0}
                  onClick={() => setCurrentStep('map-fields')}
                  className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center gap-2"
                >
                  Continuar
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}

        {/* STEP 3: Map Fields */}
        {currentStep === 'map-fields' && (
          <motion.div
            key="map-fields"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/50">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Mapea los campos</h2>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={autoDetectFields}
                  className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
                >
                  <Zap className="w-4 h-4" />
                  Auto-detectar con IA
                </motion.button>
              </div>

              {/* Mapping Table */}
              <div className="space-y-3">
                {fieldMappings.map((mapping, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`p-4 rounded-2xl border-2 transition-all duration-300 ${getStatusColor(mapping.status)}`}
                  >
                    <div className="flex items-center gap-4">
                      {/* Source Field */}
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <div className="p-2 bg-white rounded-lg shadow-sm">
                            <FileText className="w-4 h-4 text-gray-600" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-900">{mapping.sourceField}</p>
                            <p className="text-xs text-gray-500">{mapping.example}</p>
                          </div>
                        </div>
                      </div>

                      {/* Arrow */}
                      <ArrowRight className="w-6 h-6 text-gray-400 flex-shrink-0" />

                      {/* Target Field */}
                      <div className="flex-1">
                        <select 
                          value={mapping.targetField}
                          onChange={(e) => updateFieldMapping(index, e.target.value)}
                          className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl font-semibold text-gray-900 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none transition-all"
                        >
                          <option value="Nombre">Nombre</option>
                          <option value="Email">Email</option>
                          <option value="Teléfono">Teléfono</option>
                          <option value="Fecha de Nacimiento">Fecha de Nacimiento</option>
                          <option value="Objetivos">Objetivos</option>
                          <option value="Tipo de Membresía">Tipo de Membresía</option>
                          <option value="Dirección">Dirección</option>
                          <option value="No mapear">No mapear</option>
                        </select>
                      </div>

                      {/* Status */}
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {getStatusIcon(mapping.status)}
                        <span className="text-xs font-bold uppercase tracking-wider">
                          {mapping.status === 'mapped' && 'Mapeado'}
                          {mapping.status === 'suggested' && 'Sugerido'}
                          {mapping.status === 'required' && 'Requerido'}
                          {mapping.status === 'unmapped' && 'Sin mapear'}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Legend */}
              <div className="mt-6 p-4 bg-gradient-to-r from-gray-50 to-slate-50 rounded-2xl border border-gray-200">
                <h4 className="text-sm font-bold text-gray-700 mb-3">Leyenda:</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="flex items-center gap-2">
                    <div className="p-1 bg-green-100 rounded">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="text-xs text-gray-700">Mapeado correctamente</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="p-1 bg-yellow-100 rounded">
                      <HelpCircle className="w-4 h-4 text-yellow-600" />
                    </div>
                    <span className="text-xs text-gray-700">Sugerencia de mapeo</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="p-1 bg-red-100 rounded">
                      <AlertCircle className="w-4 h-4 text-red-600" />
                    </div>
                    <span className="text-xs text-gray-700">Campo requerido</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="p-1 bg-gray-100 rounded">
                      <X className="w-4 h-4 text-gray-600" />
                    </div>
                    <span className="text-xs text-gray-700">Sin mapear</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-between">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentStep('upload')}
                  className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-300 flex items-center gap-2"
                >
                  <ArrowLeft className="w-5 h-5" />
                  Atrás
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentStep('validate')}
                  className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center gap-2"
                >
                  Continuar
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}

        {/* STEP 4: Validate and Confirm */}
        {currentStep === 'validate' && !isImporting && !showResult && (
          <motion.div
            key="validate"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/50">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Validar y Confirmar</h2>

              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border-2 border-blue-200"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl shadow-lg">
                      <Database className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <p className="text-3xl font-bold text-gray-900">150</p>
                  <p className="text-sm font-semibold text-gray-600">Registros encontrados</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-green-200"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl shadow-lg">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <p className="text-3xl font-bold text-gray-900">7</p>
                  <p className="text-sm font-semibold text-gray-600">Campos mapeados</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-6 border-2 border-orange-200"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-3 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl shadow-lg">
                      <AlertCircle className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <p className="text-3xl font-bold text-gray-900">{validationErrors.length}</p>
                  <p className="text-sm font-semibold text-gray-600">Errores detectados</p>
                </motion.div>
              </div>

              {/* Errors List */}
              {validationErrors.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-orange-600" />
                    Errores y Advertencias
                  </h3>
                  <div className="space-y-3">
                    {validationErrors.map((error, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-orange-50 border-l-4 border-orange-500 rounded-xl p-4"
                      >
                        <div className="flex items-start gap-3">
                          <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="px-2 py-1 bg-orange-200 text-orange-800 text-xs font-bold rounded">
                                Fila {error.row}
                              </span>
                              <span className="text-sm font-bold text-gray-900">{error.field}</span>
                            </div>
                            <p className="text-sm text-gray-700 mb-1">{error.error}</p>
                            <p className="text-xs text-gray-600">
                              💡 <span className="font-semibold">Sugerencia:</span> {error.suggestion}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Options */}
              <div className="bg-gradient-to-r from-slate-50 to-gray-50 rounded-2xl p-6 border border-gray-200 mb-8">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Opciones de Importación</h3>
                <div className="space-y-3">
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="mt-1 w-5 h-5 rounded border-2 border-gray-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                    />
                    <div>
                      <p className="font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors">
                        Omitir filas con errores
                      </p>
                      <p className="text-sm text-gray-600">Las filas con errores no se importarán</p>
                    </div>
                  </label>
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="mt-1 w-5 h-5 rounded border-2 border-gray-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                    />
                    <div>
                      <p className="font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors">
                        Actualizar registros existentes
                      </p>
                      <p className="text-sm text-gray-600">Si existe un registro, se actualizará</p>
                    </div>
                  </label>
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      className="mt-1 w-5 h-5 rounded border-2 border-gray-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                    />
                    <div>
                      <p className="font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors">
                        Crear backup antes de importar
                      </p>
                      <p className="text-sm text-gray-600">Se guardará una copia de seguridad de los datos actuales</p>
                    </div>
                  </label>
                </div>
              </div>

              <div className="flex justify-between">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentStep('map-fields')}
                  className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-300 flex items-center gap-2"
                >
                  <ArrowLeft className="w-5 h-5" />
                  Atrás
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleStartImport}
                  className="px-8 py-4 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center gap-2"
                >
                  <Play className="w-5 h-5" />
                  Iniciar Importación
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Import Progress Modal */}
        {isImporting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 max-w-md w-full border border-white/50"
            >
              <div className="text-center">
                {/* Circular Progress */}
                <div className="relative w-40 h-40 mx-auto mb-6">
                  <svg className="w-40 h-40 transform -rotate-90">
                    <circle
                      cx="80"
                      cy="80"
                      r="70"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="none"
                      className="text-emerald-100"
                    />
                    <motion.circle
                      cx="80"
                      cy="80"
                      r="70"
                      stroke="url(#gradient)"
                      strokeWidth="8"
                      fill="none"
                      strokeLinecap="round"
                      initial={{ strokeDasharray: "439.8", strokeDashoffset: "439.8" }}
                      animate={{ strokeDashoffset: `${439.8 - (439.8 * importProgress) / 100}` }}
                      transition={{ duration: 0.5 }}
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#10b981" />
                        <stop offset="50%" stopColor="#14b8a6" />
                        <stop offset="100%" stopColor="#06b6d4" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-4xl font-bold text-gray-900">{importProgress}%</p>
                    </div>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-2">Importando datos...</h3>
                <p className="text-gray-600 mb-6">Por favor espera mientras procesamos tus datos</p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-3 border border-blue-200">
                    <p className="text-2xl font-bold text-blue-600">{Math.floor((importProgress / 100) * 150)}</p>
                    <p className="text-xs text-gray-600">Importados</p>
                  </div>
                  <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-3 border border-orange-200">
                    <p className="text-2xl font-bold text-orange-600">{Math.floor((importProgress / 100) * 3)}</p>
                    <p className="text-xs text-gray-600">Errores</p>
                  </div>
                  <div className="bg-gradient-to-br from-slate-50 to-gray-50 rounded-xl p-3 border border-gray-200">
                    <p className="text-2xl font-bold text-gray-600">{Math.ceil((100 - importProgress) / 2)}s</p>
                    <p className="text-xs text-gray-600">Restante</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Import Result */}
        {showResult && (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            {/* Success Animation */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="flex justify-center mb-8"
            >
              <div className="relative">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 blur-xl opacity-50"
                />
                <div className="relative p-6 bg-white rounded-full">
                  <CheckCircle className="w-20 h-20 text-emerald-600" />
                </div>
              </div>
            </motion.div>

            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/50">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">¡Importación Completada!</h2>
                <p className="text-lg text-gray-600">Tus datos han sido importados exitosamente</p>
              </div>

              {/* Results Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-green-200 text-center"
                >
                  <p className="text-4xl font-bold text-green-600 mb-2">{mockImportResult.imported}</p>
                  <p className="text-sm font-semibold text-gray-700">Importados</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border-2 border-blue-200 text-center"
                >
                  <p className="text-4xl font-bold text-blue-600 mb-2">{mockImportResult.updated}</p>
                  <p className="text-sm font-semibold text-gray-700">Actualizados</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-6 border-2 border-yellow-200 text-center"
                >
                  <p className="text-4xl font-bold text-yellow-600 mb-2">{mockImportResult.skipped}</p>
                  <p className="text-sm font-semibold text-gray-700">Omitidos</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl p-6 border-2 border-red-200 text-center"
                >
                  <p className="text-4xl font-bold text-red-600 mb-2">{mockImportResult.errors}</p>
                  <p className="text-sm font-semibold text-gray-700">Errores</p>
                </motion.div>
              </div>

              {/* Donut Chart Visualization (simplified) */}
              <div className="flex justify-center mb-8">
                <div className="relative w-48 h-48">
                  <svg className="w-48 h-48 transform -rotate-90">
                    {/* Background circle */}
                    <circle
                      cx="96"
                      cy="96"
                      r="80"
                      fill="none"
                      stroke="#e5e7eb"
                      strokeWidth="32"
                    />
                    {/* Imported - green */}
                    <circle
                      cx="96"
                      cy="96"
                      r="80"
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="32"
                      strokeDasharray={`${(mockImportResult.imported / mockImportResult.total) * 502} 502`}
                      strokeDashoffset="0"
                    />
                    {/* Updated - blue */}
                    <circle
                      cx="96"
                      cy="96"
                      r="80"
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="32"
                      strokeDasharray={`${(mockImportResult.updated / mockImportResult.total) * 502} 502`}
                      strokeDashoffset={`-${(mockImportResult.imported / mockImportResult.total) * 502}`}
                    />
                    {/* Errors - red */}
                    <circle
                      cx="96"
                      cy="96"
                      r="80"
                      fill="none"
                      stroke="#ef4444"
                      strokeWidth="32"
                      strokeDasharray={`${(mockImportResult.errors / mockImportResult.total) * 502} 502`}
                      strokeDashoffset={`-${((mockImportResult.imported + mockImportResult.updated) / mockImportResult.total) * 502}`}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-3xl font-bold text-gray-900">{mockImportResult.total}</p>
                      <p className="text-sm text-gray-600">Total</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={viewImportedData}
                  className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Eye className="w-5 h-5" />
                  Ver datos importados
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={downloadErrorReport}
                  className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  Descargar reporte de errores
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setShowResult(false);
                    setCurrentStep('select-source');
                    setSelectedSource(null);
                    setUploadedFiles([]);
                  }}
                  className="px-6 py-3 border-2 border-emerald-500 text-emerald-600 font-semibold rounded-xl hover:bg-emerald-50 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <RefreshCw className="w-5 h-5" />
                  Importar más datos
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Templates Section */}
      {!showResult && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12 bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/50"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Usa una plantilla predefinida</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {templates.map((template, index) => {
              const Icon = template.icon;
              return (
                <motion.div
                  key={template.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.03, y: -4 }}
                  className="bg-white rounded-2xl p-6 border-2 border-gray-200 hover:border-emerald-300 hover:shadow-xl transition-all duration-300 cursor-pointer group"
                >
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${template.gradient} flex items-center justify-center text-white mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-8 h-8" />
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 mb-2">{template.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">{template.records} registros de ejemplo</p>

                  <div className="space-y-2 mb-4">
                    <p className="text-xs font-semibold text-gray-700">Campos incluidos:</p>
                    <div className="flex flex-wrap gap-1">
                      {template.fields.slice(0, 3).map((field) => (
                        <span key={field} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                          {field}
                        </span>
                      ))}
                      {template.fields.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                          +{template.fields.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => downloadTemplate(template.id)}
                    className="w-full px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Descargar CSV
                  </motion.button>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* Import History */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-8 bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50"
      >
        <div className="bg-gradient-to-r from-slate-100 to-gray-100 p-6 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Clock className="w-6 h-6 text-gray-700" />
            Historial de Importaciones
          </h3>
        </div>

        <div className="p-6">
          <div className="space-y-3">
            {importHistory.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center justify-between p-4 rounded-2xl hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 transition-all duration-300 border border-gray-100 hover:border-emerald-200 hover:shadow-md group"
              >
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl ${
                    item.status === 'success' ? 'bg-green-100' :
                    item.status === 'partial' ? 'bg-yellow-100' : 'bg-red-100'
                  }`}>
                    {item.status === 'success' ? <CheckCircle className="w-6 h-6 text-green-600" /> :
                     item.status === 'partial' ? <AlertCircle className="w-6 h-6 text-yellow-600" /> :
                     <X className="w-6 h-6 text-red-600" />}
                  </div>

                  <div>
                    <p className="font-semibold text-gray-900">{item.type}</p>
                    <p className="text-sm text-gray-600">{item.date}</p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className={`text-sm font-bold ${
                      item.status === 'success' ? 'text-green-600' :
                      item.status === 'partial' ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {item.status === 'success' ? 'Exitoso' :
                       item.status === 'partial' ? 'Con advertencias' : 'Error'}
                    </p>
                    <p className="text-xs text-gray-500">
                      {item.records} registros {item.errors > 0 && `• ${item.errors} errores`}
                    </p>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => viewImportHistory(item.id)}
                    className="p-2 rounded-lg hover:bg-emerald-100 transition-colors"
                  >
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-emerald-600" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Help Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-8 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl shadow-xl p-8 relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        <div className="relative z-10 text-center">
          <HelpCircle className="w-12 h-12 text-yellow-300 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-white mb-2">¿Necesitas ayuda?</h3>
          <p className="text-indigo-100 mb-6">Consulta nuestra guía completa o mira los videos tutoriales</p>

          <div className="flex flex-wrap gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={openHelpGuide}
              className="px-6 py-3 bg-white text-purple-600 font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Ver Guía de Importación
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={openVideoTutorials}
              className="px-6 py-3 bg-white/20 backdrop-blur-sm text-white font-bold rounded-xl border-2 border-white/30 hover:bg-white/30 transition-all duration-300"
            >
              Videos Tutoriales
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ImportadorDatosPage;
