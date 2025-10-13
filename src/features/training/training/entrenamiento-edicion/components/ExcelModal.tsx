import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  FileSpreadsheet,
  Download,
  Save,
  Plus,
  Copy,
  Clipboard,
  Undo,
  Redo,
  Search,
  Filter,
  SortAsc,
  SortDesc,
  Trash2,
  BarChart3,
  PieChart,
  LineChart,
  Settings,
  Check,
  X as XIcon,
  Dumbbell,
  Calculator,
  Columns,
  Rows,
  Scissors,
  ZoomIn,
  ZoomOut
} from 'lucide-react';

interface ExcelModalProps {
  isOpen: boolean;
  onClose: () => void;
  sesionesSemana: { [key: string]: any[] };
  cliente: any;
  onSessionsUpdate?: (updatedSessions: { [key: string]: any[] }) => void;
}

interface CellData {
  value: string | number;
  type: 'text' | 'number' | 'formula' | 'date';
  formula?: string;
  format?: string;
  color?: string;
  backgroundColor?: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
}

interface ExcelRow {
  [key: string]: CellData;
}

interface ExcelSheet {
  name: string;
  data: ExcelRow[];
  columns: string[];
}

export const ExcelModal: React.FC<ExcelModalProps> = ({
  isOpen,
  onClose,
  sesionesSemana,
  cliente,
  onSessionsUpdate
}) => {
  const [activeSheet, setActiveSheet] = useState(0);
  const [selectedCell, setSelectedCell] = useState<string>('');
  const [editingCell, setEditingCell] = useState<string>('');
  const [cellValue, setCellValue] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [sortColumn, setSortColumn] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [showAddRow, setShowAddRow] = useState(false);
  const [showAddColumn, setShowAddColumn] = useState(false);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [showContextMenu, setShowContextMenu] = useState<{x: number, y: number, row?: number} | null>(null);
  const [showFormulaBar, setShowFormulaBar] = useState(false);
  const [formulaValue, setFormulaValue] = useState('');
  const [showCharts, setShowCharts] = useState(false);
  const [showDataValidation, setShowDataValidation] = useState(false);
  const [notifications, setNotifications] = useState<Array<{id: string, message: string, type: 'success' | 'error' | 'info'}>>([]);
  const [forceUpdate, setForceUpdate] = useState(0);

  // Función para mostrar notificaciones
  const showNotification = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    const id = `notification-${Date.now()}`;
    setNotifications(prev => [...prev, { id, message, type }]);
    
    // Auto-remove after 3 seconds
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 3000);
  };

  // Generar datos de la hoja de cálculo basados en sesionesSemana
  const generateExcelData = useCallback((): ExcelSheet[] => {
    console.log('🔄 Generando datos de Excel con sesionesSemana:', sesionesSemana);
    const diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
    
    // Hoja 1: Resumen Semanal
    const resumenData: ExcelRow[] = [
      {
        A: { value: 'DÍA', type: 'text', bold: true, backgroundColor: '#f3f4f6' },
        B: { value: 'SESIÓN', type: 'text', bold: true, backgroundColor: '#f3f4f6' },
        C: { value: 'EJERCICIOS', type: 'text', bold: true, backgroundColor: '#f3f4f6' },
        D: { value: 'VOLUMEN', type: 'text', bold: true, backgroundColor: '#f3f4f6' },
        E: { value: 'INTENSIDAD', type: 'text', bold: true, backgroundColor: '#f3f4f6' },
        F: { value: 'DURACIÓN', type: 'text', bold: true, backgroundColor: '#f3f4f6' },
        G: { value: 'CALORÍAS', type: 'text', bold: true, backgroundColor: '#f3f4f6' }
      }
    ];

    diasSemana.forEach((dia, index) => {
      // Mapear nombres de días a números (lunes=1, martes=2, etc.)
      const diaNumero = index + 1;
      const sesiones = sesionesSemana[diaNumero.toString()] || [];
      const totalEjercicios = sesiones.reduce((sum, s) => sum + (s.ejercicios?.length || 0), 0);
      const volumenTotal = totalEjercicios * 3; // Estimación
      const intensidadPromedio = sesiones.length > 0 ? 7.2 : 0;
      const duracion = sesiones.length * 60; // 60 min por sesión
      const calorias = duracion * 8; // 8 cal/min estimado

      console.log(`📊 ${dia} (${diaNumero}): ${sesiones.length} sesiones, ${totalEjercicios} ejercicios`);
      
      resumenData.push({
        A: { value: dia, type: 'text', bold: true },
        B: { value: sesiones.length, type: 'number' },
        C: { value: totalEjercicios, type: 'number' },
        D: { value: volumenTotal, type: 'number' },
        E: { value: intensidadPromedio, type: 'number' },
        F: { value: duracion, type: 'number' },
        G: { value: calorias, type: 'number' }
      });
    });

    // Agregar fila de totales
    const totalSesiones = resumenData.slice(1).reduce((sum, row) => sum + (row.B.value as number), 0);
    const totalEjercicios = resumenData.slice(1).reduce((sum, row) => sum + (row.C.value as number), 0);
    const totalVolumen = resumenData.slice(1).reduce((sum, row) => sum + (row.D.value as number), 0);
    const totalDuracion = resumenData.slice(1).reduce((sum, row) => sum + (row.F.value as number), 0);
    const totalCalorias = resumenData.slice(1).reduce((sum, row) => sum + (row.G.value as number), 0);

    resumenData.push({
      A: { value: 'TOTAL', type: 'text', bold: true, backgroundColor: '#dbeafe' },
      B: { value: totalSesiones, type: 'number', bold: true, backgroundColor: '#dbeafe' },
      C: { value: totalEjercicios, type: 'number', bold: true, backgroundColor: '#dbeafe' },
      D: { value: totalVolumen, type: 'number', bold: true, backgroundColor: '#dbeafe' },
      E: { value: '7.2', type: 'number', bold: true, backgroundColor: '#dbeafe' },
      F: { value: totalDuracion, type: 'number', bold: true, backgroundColor: '#dbeafe' },
      G: { value: totalCalorias, type: 'number', bold: true, backgroundColor: '#dbeafe' }
    });

    // Hoja 2: Detalle de Ejercicios
    const detalleData: ExcelRow[] = [
      {
        A: { value: 'DÍA', type: 'text', bold: true, backgroundColor: '#f3f4f6' },
        B: { value: 'EJERCICIO', type: 'text', bold: true, backgroundColor: '#f3f4f6' },
        C: { value: 'SERIES', type: 'text', bold: true, backgroundColor: '#f3f4f6' },
        D: { value: 'REPETICIONES', type: 'text', bold: true, backgroundColor: '#f3f4f6' },
        E: { value: 'PESO', type: 'text', bold: true, backgroundColor: '#f3f4f6' },
        F: { value: 'DESCANSO', type: 'text', bold: true, backgroundColor: '#f3f4f6' },
        G: { value: 'INTENSIDAD', type: 'text', bold: true, backgroundColor: '#f3f4f6' }
      }
    ];

    diasSemana.forEach(dia => {
      const sesiones = sesionesSemana[dia.toLowerCase()] || [];
      sesiones.forEach(sesion => {
        if (sesion.ejercicios) {
          sesion.ejercicios.forEach((ejercicio: any) => {
            detalleData.push({
              A: { value: dia, type: 'text' },
              B: { value: ejercicio.nombre || 'Ejercicio', type: 'text' },
              C: { value: ejercicio.series || 3, type: 'number' },
              D: { value: ejercicio.repeticiones || 12, type: 'number' },
              E: { value: ejercicio.peso || 0, type: 'number' },
              F: { value: ejercicio.descanso || 60, type: 'number' },
              G: { value: ejercicio.intensidad || 7, type: 'number' }
            });
          });
        }
      });
    });

    return [
      {
        name: 'Resumen Semanal',
        data: resumenData,
        columns: ['A', 'B', 'C', 'D', 'E', 'F', 'G']
      },
      {
        name: 'Detalle Ejercicios',
        data: detalleData,
        columns: ['A', 'B', 'C', 'D', 'E', 'F', 'G']
      }
    ];
  }, [sesionesSemana, cliente, forceUpdate]);

  const sheets = generateExcelData();
  const currentSheet = sheets[activeSheet];

  // Forzar re-render cuando cambien las sesiones
  useEffect(() => {
    // El generateExcelData ya se regenera automáticamente por el useCallback
    console.log('ExcelModal: sesionesSemana actualizadas', sesionesSemana);
    setForceUpdate(prev => prev + 1);
  }, [sesionesSemana]);

  const handleCellClick = (cellId: string) => {
    setSelectedCell(cellId);
    const [row, col] = cellId.split('-');
    const cellData = currentSheet.data[parseInt(row)]?.[col];
    setCellValue(cellData?.value?.toString() || '');
  };

  const handleCellEdit = (cellId: string) => {
    setEditingCell(cellId);
  };

  const handleCellSave = () => {
    if (editingCell && cellValue !== '') {
      const [row, col] = editingCell.split('-');
      // Aquí se actualizaría el valor en el estado
      console.log(`Updating cell ${editingCell} with value: ${cellValue}`);
    }
    setEditingCell('');
    setCellValue('');
  };

  const handleCellCancel = () => {
    setEditingCell('');
    setCellValue('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCellSave();
    } else if (e.key === 'Escape') {
      handleCellCancel();
    }
  };

  // Nuevas funciones para manejo de filas y columnas
  const handleAddRow = (position: 'top' | 'bottom') => {
    console.log(`Adding row ${position}`);
    // Aquí se implementaría la lógica para añadir filas
  };

  const handleAddColumn = (position: 'left' | 'right') => {
    console.log(`Adding column ${position}`);
    // Aquí se implementaría la lógica para añadir columnas
  };

  const handleDeleteRow = (rowIndex: number) => {
    console.log(`Deleting row ${rowIndex}`);
    // Aquí se implementaría la lógica para eliminar filas
  };

  const handleDeleteColumn = (columnIndex: number) => {
    console.log(`Deleting column ${columnIndex}`);
    // Aquí se implementaría la lógica para eliminar columnas
  };

  const handleAddSession = (day: string) => {
    console.log(`Adding session to ${day}`);
    
    // Crear una nueva sesión
    const newSession = {
      id: `session-${Date.now()}`,
      nombre: `Sesión ${day}`,
      ejercicios: [],
      duracion: 60,
      intensidad: 7,
      notas: ''
    };

    // Actualizar el estado real de sesionesSemana directamente
    const updatedSessions = { ...sesionesSemana };
    if (!updatedSessions[day]) {
      updatedSessions[day] = [];
    }
    updatedSessions[day].push(newSession);
    
    // Llamar a la función callback para actualizar el estado padre
    onSessionsUpdate?.(updatedSessions);
    
    console.log('Sesión añadida:', newSession);
    console.log('Estado actualizado:', updatedSessions);
    
    // Mostrar notificación de éxito
    showNotification(`✅ Sesión añadida a ${day}`, 'success');
  };

  const handleAddExercise = (sessionId: string) => {
    console.log(`Adding exercise to session ${sessionId}`);
    
    // Crear un nuevo ejercicio
    const newExercise = {
      id: `exercise-${Date.now()}`,
      nombre: 'Nuevo Ejercicio',
      series: 3,
      repeticiones: 12,
      peso: 0,
      descanso: 60,
      intensidad: 7,
      notas: ''
    };

    // Buscar la sesión en sesionesSemana y añadir el ejercicio directamente
    const updatedSessions = { ...sesionesSemana };
    let exerciseAdded = false;
    
    // Buscar en todos los días de la semana
    Object.keys(updatedSessions).forEach(day => {
      updatedSessions[day].forEach(session => {
        if (session.id === sessionId) {
          session.ejercicios.push(newExercise);
          exerciseAdded = true;
        }
      });
    });
    
    if (exerciseAdded) {
      // Llamar a la función callback para actualizar el estado padre
      onSessionsUpdate?.(updatedSessions);
      
      console.log('Ejercicio añadido:', newExercise);
      console.log('Estado actualizado:', updatedSessions);
      
      // Mostrar notificación de éxito
      showNotification(`✅ Ejercicio añadido a la sesión`, 'success');
    } else {
      showNotification(`❌ No se pudo encontrar la sesión ${sessionId}`, 'error');
    }
  };

  const handleContextMenu = (e: React.MouseEvent, rowIndex?: number) => {
    e.preventDefault();
    setShowContextMenu({
      x: e.clientX,
      y: e.clientY,
      row: rowIndex
    });
  };

  const handleRowSelect = (rowIndex: number, multiSelect: boolean = false) => {
    if (multiSelect) {
      setSelectedRows(prev => 
        prev.includes(rowIndex) 
          ? prev.filter(i => i !== rowIndex)
          : [...prev, rowIndex]
      );
    } else {
      setSelectedRows([rowIndex]);
    }
  };

  const handleFormulaSubmit = () => {
    if (formulaValue && selectedCell) {
      console.log(`Setting formula ${formulaValue} to cell ${selectedCell}`);
      setShowFormulaBar(false);
      setFormulaValue('');
    }
  };

  const handleSort = (column: string) => {
    setSortColumn(column);
    setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    console.log(`Sorting by ${column} ${sortDirection}`);
  };

  const handleFilter = (column: string, value: string) => {
    console.log(`Filtering ${column} by ${value}`);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-2xl w-full max-w-7xl max-h-[95vh] overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header tipo Excel */}
            <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-green-600 to-blue-600">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <FileSpreadsheet className="w-6 h-6 text-white" />
                  <div>
                    <h2 className="text-lg font-bold text-white">Planificación de Entrenamiento</h2>
                    <p className="text-sm text-green-100">Vista tipo Excel - {cliente?.nombre || 'Cliente'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                    title="Guardar"
                  >
                    <Save className="w-4 h-4 text-white" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                    title="Exportar"
                  >
                    <Download className="w-4 h-4 text-white" />
                  </motion.button>
                  <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-lg transition-colors">
                    <X className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>
            </div>

            {/* Toolbar tipo Excel Mejorado */}
            <div className="p-3 border-b border-gray-200 bg-gray-50">
              <div className="flex items-center gap-2 flex-wrap">
                {/* Grupo 1: Deshacer/Rehacer */}
                <div className="flex items-center gap-1">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 hover:bg-gray-200 rounded"
                    title="Deshacer"
                  >
                    <Undo className="w-4 h-4 text-gray-600" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 hover:bg-gray-200 rounded"
                    title="Rehacer"
                  >
                    <Redo className="w-4 h-4 text-gray-600" />
                  </motion.button>
                </div>
                
                <div className="w-px h-6 bg-gray-300 mx-2" />
                
                {/* Grupo 2: Copiar/Pegar/Cortar */}
                <div className="flex items-center gap-1">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 hover:bg-gray-200 rounded"
                    title="Cortar"
                  >
                    <Scissors className="w-4 h-4 text-gray-600" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 hover:bg-gray-200 rounded"
                    title="Copiar"
                  >
                    <Copy className="w-4 h-4 text-gray-600" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 hover:bg-gray-200 rounded"
                    title="Pegar"
                  >
                    <Clipboard className="w-4 h-4 text-gray-600" />
                  </motion.button>
                </div>

                <div className="w-px h-6 bg-gray-300 mx-2" />

                {/* Grupo 3: Añadir Filas/Columnas */}
                <div className="flex items-center gap-1">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowAddRow(!showAddRow)}
                    className={`p-2 rounded ${showAddRow ? 'bg-green-200 text-green-700' : 'hover:bg-gray-200'}`}
                    title="Añadir Fila"
                  >
                    <Rows className="w-4 h-4" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowAddColumn(!showAddColumn)}
                    className={`p-2 rounded ${showAddColumn ? 'bg-green-200 text-green-700' : 'hover:bg-gray-200'}`}
                    title="Añadir Columna"
                  >
                    <Columns className="w-4 h-4" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 hover:bg-gray-200 rounded"
                    title="Eliminar Fila/Columna"
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </motion.button>
                </div>

                <div className="w-px h-6 bg-gray-300 mx-2" />

                {/* Grupo 4: Búsqueda y Filtros */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <Search className="w-4 h-4 text-gray-500" />
                    <input
                      type="text"
                      placeholder="Buscar..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowFilters(!showFilters)}
                    className={`p-2 rounded ${showFilters ? 'bg-green-200 text-green-700' : 'hover:bg-gray-200'}`}
                    title="Filtros"
                  >
                    <Filter className="w-4 h-4" />
                  </motion.button>
                </div>

                <div className="w-px h-6 bg-gray-300 mx-2" />

                {/* Grupo 5: Ordenamiento */}
                <div className="flex items-center gap-1">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSort('A')}
                    className="p-2 hover:bg-gray-200 rounded"
                    title="Ordenar Ascendente"
                  >
                    <SortAsc className="w-4 h-4 text-gray-600" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSort('A')}
                    className="p-2 hover:bg-gray-200 rounded"
                    title="Ordenar Descendente"
                  >
                    <SortDesc className="w-4 h-4 text-gray-600" />
                  </motion.button>
                </div>

                <div className="w-px h-6 bg-gray-300 mx-2" />

                {/* Grupo 6: Fórmulas y Análisis */}
                <div className="flex items-center gap-1">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowFormulaBar(!showFormulaBar)}
                    className={`p-2 rounded ${showFormulaBar ? 'bg-blue-200 text-blue-700' : 'hover:bg-gray-200'}`}
                    title="Barra de Fórmulas"
                  >
                    <Calculator className="w-4 h-4" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowCharts(!showCharts)}
                    className={`p-2 rounded ${showCharts ? 'bg-purple-200 text-purple-700' : 'hover:bg-gray-200'}`}
                    title="Gráficos"
                  >
                    <BarChart3 className="w-4 h-4" />
                  </motion.button>
                </div>

                <div className="w-px h-6 bg-gray-300 mx-2" />

                {/* Grupo 7: Herramientas Avanzadas */}
                <div className="flex items-center gap-1">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 hover:bg-gray-200 rounded"
                    title="Zoom In"
                  >
                    <ZoomIn className="w-4 h-4 text-gray-600" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 hover:bg-gray-200 rounded"
                    title="Zoom Out"
                  >
                    <ZoomOut className="w-4 h-4 text-gray-600" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 hover:bg-gray-200 rounded"
                    title="Configuración"
                  >
                    <Settings className="w-4 h-4 text-gray-600" />
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Barra de Fórmulas */}
            {showFormulaBar && (
              <div className="p-3 border-b border-gray-200 bg-blue-50">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-blue-700">Fórmula:</span>
                  <input
                    type="text"
                    value={formulaValue}
                    onChange={(e) => setFormulaValue(e.target.value)}
                    placeholder="=SUM(A1:A10)"
                    className="flex-1 px-3 py-1 text-sm border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleFormulaSubmit}
                    className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                  >
                    <Check className="w-4 h-4" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowFormulaBar(false)}
                    className="px-3 py-1 bg-gray-500 text-white text-sm rounded hover:bg-gray-600"
                  >
                    <XIcon className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            )}

            {/* Panel de Añadir Fila/Columna */}
            {(showAddRow || showAddColumn) && (
              <div className="p-3 border-b border-gray-200 bg-green-50">
                <div className="flex items-center gap-4">
                  {showAddRow && (
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-green-700">Añadir Fila:</span>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleAddRow('top')}
                        className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
                      >
                        Arriba
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleAddRow('bottom')}
                        className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
                      >
                        Abajo
                      </motion.button>
                    </div>
                  )}
                  
                  {showAddColumn && (
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-green-700">Añadir Columna:</span>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleAddColumn('left')}
                        className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
                      >
                        Izquierda
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleAddColumn('right')}
                        className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
                      >
                        Derecha
                      </motion.button>
                    </div>
                  )}
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setShowAddRow(false);
                      setShowAddColumn(false);
                    }}
                    className="px-3 py-1 bg-gray-500 text-white text-sm rounded hover:bg-gray-600"
                  >
                    <XIcon className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            )}

            {/* Panel de Gráficos */}
            {showCharts && (
              <div className="p-3 border-b border-gray-200 bg-purple-50">
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium text-purple-700">Crear Gráfico:</span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-3 py-1 bg-purple-600 text-white text-sm rounded hover:bg-purple-700"
                  >
                    <BarChart3 className="w-4 h-4" />
                    Barras
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-3 py-1 bg-purple-600 text-white text-sm rounded hover:bg-purple-700"
                  >
                    <PieChart className="w-4 h-4" />
                    Circular
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-3 py-1 bg-purple-600 text-white text-sm rounded hover:bg-purple-700"
                  >
                    <LineChart className="w-4 h-4" />
                    Líneas
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowCharts(false)}
                    className="px-3 py-1 bg-gray-500 text-white text-sm rounded hover:bg-gray-600"
                  >
                    <XIcon className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            )}

            {/* Pestañas de hojas */}
            <div className="border-b border-gray-200 bg-gray-100">
              <div className="flex">
                {sheets.map((sheet, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveSheet(index)}
                    className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                      activeSheet === index
                        ? 'border-green-600 text-green-600 bg-white'
                        : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    {sheet.name}
                  </button>
                ))}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-3 py-2 text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                  title="Nueva hoja"
                >
                  <Plus className="w-4 h-4" />
                </motion.button>
              </div>
            </div>

            {/* Área de la hoja de cálculo */}
            <div className="flex-1 overflow-auto bg-white">
              <div className="p-4">
                {/* Tabla tipo Excel */}
                <div className="border border-gray-300 rounded-lg overflow-hidden">
                  {/* Header de columnas */}
                  <div className="flex bg-gray-100 border-b border-gray-300">
                    <div className="w-12 bg-gray-200 border-r border-gray-300 flex items-center justify-center text-xs font-medium text-gray-600">
                      #
                    </div>
                    {currentSheet.columns.map((col) => (
                      <div
                        key={col}
                        className="flex-1 min-w-24 px-3 py-2 border-r border-gray-300 text-xs font-medium text-gray-600 bg-gray-100"
                      >
                        {col}
                      </div>
                    ))}
                  </div>

                  {/* Filas de datos */}
                  {currentSheet.data.map((row, rowIndex) => {
                    const isRowSelected = selectedRows.includes(rowIndex);
                    const isHeaderRow = rowIndex === 0;
                    
                    return (
                      <div 
                        key={rowIndex} 
                        className={`flex border-b border-gray-200 hover:bg-gray-50 ${
                          isRowSelected ? 'bg-blue-50' : ''
                        } ${isHeaderRow ? 'bg-gray-100 font-semibold' : ''}`}
                        onContextMenu={(e) => handleContextMenu(e, rowIndex)}
                      >
                        {/* Número de fila con checkbox */}
                        <div className="w-12 bg-gray-50 border-r border-gray-300 flex items-center justify-center text-xs text-gray-500 relative">
                          <input
                            type="checkbox"
                            checked={isRowSelected}
                            onChange={() => handleRowSelect(rowIndex, true)}
                            className="w-3 h-3 text-blue-600 rounded focus:ring-blue-500"
                          />
                          <span className="ml-1">{rowIndex + 1}</span>
                        </div>
                        
                        {/* Celdas */}
                        {currentSheet.columns.map((col) => {
                          const cellId = `${rowIndex}-${col}`;
                          const cellData = row[col];
                          const isSelected = selectedCell === cellId;
                          const isEditing = editingCell === cellId;

                          return (
                            <div
                              key={col}
                              className={`flex-1 min-w-24 px-3 py-2 border-r border-gray-200 cursor-pointer relative group ${
                                isSelected ? 'bg-blue-100 border-blue-300' : ''
                              } ${isHeaderRow ? 'bg-gray-100 font-semibold' : ''}`}
                              onClick={() => handleCellClick(cellId)}
                              onDoubleClick={() => handleCellEdit(cellId)}
                              onContextMenu={(e) => handleContextMenu(e, rowIndex)}
                            >
                              {isEditing ? (
                                <input
                                  type="text"
                                  value={cellValue}
                                  onChange={(e) => setCellValue(e.target.value)}
                                  onKeyDown={handleKeyDown}
                                  onBlur={handleCellSave}
                                  className="w-full text-sm border-none outline-none bg-transparent"
                                  autoFocus
                                />
                              ) : (
                                <div className="flex items-center justify-between">
                                  <span
                                    className={`text-sm ${
                                      cellData?.bold ? 'font-bold' : ''
                                    } ${
                                      cellData?.color ? `text-${cellData.color}-600` : 'text-gray-900'
                                    }`}
                                    style={{
                                      backgroundColor: cellData?.backgroundColor,
                                      fontStyle: cellData?.italic ? 'italic' : 'normal',
                                      textDecoration: cellData?.underline ? 'underline' : 'none'
                                    }}
                                  >
                                    {cellData?.value || ''}
                                  </span>
                                  
                                  {/* Botones de acción en hover */}
                                  <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                                    <motion.button
                                      whileHover={{ scale: 1.1 }}
                                      whileTap={{ scale: 0.9 }}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleAddSession(col);
                                      }}
                                      className="p-1 hover:bg-blue-200 rounded text-blue-600"
                                      title="Añadir Sesión"
                                    >
                                      <Plus className="w-3 h-3" />
                                    </motion.button>
                                    <motion.button
                                      whileHover={{ scale: 1.1 }}
                                      whileTap={{ scale: 0.9 }}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleAddExercise(cellId);
                                      }}
                                      className="p-1 hover:bg-green-200 rounded text-green-600"
                                      title="Añadir Ejercicio"
                                    >
                                      <Dumbbell className="w-3 h-3" />
                                    </motion.button>
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>

                {/* Barra de estado mejorada */}
                <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center gap-4">
                    <span>Filas: {currentSheet.data.length}</span>
                    <span>Columnas: {currentSheet.columns.length}</span>
                    {selectedCell && <span>Celda: {selectedCell}</span>}
                    {selectedRows.length > 0 && <span>Seleccionadas: {selectedRows.length}</span>}
                    {sortColumn && <span>Ordenado por: {sortColumn} ({sortDirection})</span>}
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <span>Zoom: 100%</span>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-1 hover:bg-gray-200 rounded"
                        title="Zoom In"
                      >
                        <ZoomIn className="w-3 h-3" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-1 hover:bg-gray-200 rounded"
                        title="Zoom Out"
                      >
                        <ZoomOut className="w-3 h-3" />
                      </motion.button>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>Listo</span>
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Menú contextual */}
      {showContextMenu && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="fixed bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50"
          style={{
            left: showContextMenu.x,
            top: showContextMenu.y
          }}
          onClick={() => setShowContextMenu(null)}
        >
          <div className="px-3 py-2 text-sm font-medium text-gray-700 border-b border-gray-100">
            Acciones
          </div>
          
          <div className="py-1">
            <motion.button
              whileHover={{ backgroundColor: '#f3f4f6' }}
              className="w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
              onClick={() => {
                if (showContextMenu.row !== undefined) {
                  handleAddRow('bottom');
                }
                setShowContextMenu(null);
              }}
            >
              <Rows className="w-4 h-4" />
              Añadir Fila Abajo
            </motion.button>
            
            <motion.button
              whileHover={{ backgroundColor: '#f3f4f6' }}
              className="w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
              onClick={() => {
                if (showContextMenu.row !== undefined) {
                  handleAddRow('top');
                }
                setShowContextMenu(null);
              }}
            >
              <Rows className="w-4 h-4" />
              Añadir Fila Arriba
            </motion.button>
            
            <motion.button
              whileHover={{ backgroundColor: '#f3f4f6' }}
              className="w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
              onClick={() => {
                if (showContextMenu.row !== undefined) {
                  handleAddColumn('right');
                }
                setShowContextMenu(null);
              }}
            >
              <Columns className="w-4 h-4" />
              Añadir Columna
            </motion.button>
            
            <div className="border-t border-gray-100 my-1"></div>
            
            <motion.button
              whileHover={{ backgroundColor: '#fef2f2' }}
              className="w-full px-3 py-2 text-sm text-red-700 hover:bg-red-50 flex items-center gap-2"
              onClick={() => {
                if (showContextMenu.row !== undefined) {
                  handleDeleteRow(showContextMenu.row);
                }
                setShowContextMenu(null);
              }}
            >
              <Trash2 className="w-4 h-4" />
              Eliminar Fila
            </motion.button>
            
            <motion.button
              whileHover={{ backgroundColor: '#fef2f2' }}
              className="w-full px-3 py-2 text-sm text-red-700 hover:bg-red-50 flex items-center gap-2"
              onClick={() => {
                setShowContextMenu(null);
              }}
            >
              <Trash2 className="w-4 h-4" />
              Eliminar Columna
            </motion.button>
            
            <div className="border-t border-gray-100 my-1"></div>
            
            <motion.button
              whileHover={{ backgroundColor: '#f3f4f6' }}
              className="w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
              onClick={() => {
                setShowContextMenu(null);
              }}
            >
              <Copy className="w-4 h-4" />
              Copiar
            </motion.button>
            
            <motion.button
              whileHover={{ backgroundColor: '#f3f4f6' }}
              className="w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
              onClick={() => {
                setShowContextMenu(null);
              }}
            >
              <Clipboard className="w-4 h-4" />
              Pegar
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* Sistema de Notificaciones */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, x: 300, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 300, scale: 0.8 }}
            className={`
              px-4 py-3 rounded-lg shadow-lg border-l-4 max-w-sm
              ${notification.type === 'success' ? 'bg-green-50 border-green-400 text-green-800' : ''}
              ${notification.type === 'error' ? 'bg-red-50 border-red-400 text-red-800' : ''}
              ${notification.type === 'info' ? 'bg-blue-50 border-blue-400 text-blue-800' : ''}
            `}
          >
            <div className="flex items-center gap-2">
              <div className="flex-1 text-sm font-medium">
                {notification.message}
              </div>
              <button
                onClick={() => setNotifications(prev => prev.filter(n => n.id !== notification.id))}
                className="text-gray-400 hover:text-gray-600"
              >
                <XIcon className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </AnimatePresence>
  );
};
