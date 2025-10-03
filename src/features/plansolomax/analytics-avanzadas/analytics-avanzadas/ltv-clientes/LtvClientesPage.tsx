import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  TrendingUp, Download, Settings, Users, DollarSign, Target,
  TrendingDown, Award, ChevronDown, ChevronUp, Search, Filter,
  AlertCircle, Zap, Clock, Calendar, Mail, Phone, X, BarChart3,
  PieChart, LineChart, Activity, ArrowUp, ArrowDown, Minus,
  Star, Trophy, Medal, Crown, Eye, CheckCircle, AlertTriangle
} from 'lucide-react';
import {
  LineChart as RechartsLineChart, Line, BarChart, Bar, ScatterChart, Scatter,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  Area, AreaChart, Cell, PieChart as RechartsPieChart, Pie
} from 'recharts';

// Tipos
interface Cliente {
  id: string;
  nombre: string;
  avatar: string;
  ltvTotal: number;
  ltvProyectado: number;
  mesesActivo: number;
  ingresoMensualPromedio: number;
  ultimaTransaccion: string;
  tendencia: 'creciente' | 'estable' | 'decreciente';
  probabilidadChurn: number;
  tipoMembresia: string;
  canalAdquisicion: string;
  ubicacion: string;
  edad: number;
  objetivoFitness: string;
  transacciones: Array<{
    fecha: string;
    concepto: string;
    monto: number;
  }>;
  engagement: {
    adherencia: number;
    sesionesCompletadas: number;
    nps: number;
  };
  cac: number;
}

interface Segmento {
  nombre: string;
  color: string;
  clientes: number;
  ltvPromedio: number;
  porcentajeIngresos: number;
  icono: React.ReactNode;
}

const LtvClientesPage: React.FC = () => {
  // Estados
  const [selectedTab, setSelectedTab] = useState('todos');
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' }>({
    key: 'ltvTotal',
    direction: 'desc'
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCliente, setSelectedCliente] = useState<Cliente | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [churnReduction, setChurnReduction] = useState(10);
  const [engagementIncrease, setEngagementIncrease] = useState(15);
  const [segmentTab, setSegmentTab] = useState('membresia');

  const itemsPerPage = 10;

  // Generar datos mockeados
  const clientes: Cliente[] = useMemo(() => {
    const nombres = [
      'Ana García', 'Carlos Ruiz', 'María López', 'Juan Martínez', 'Laura Sánchez',
      'Pedro Rodríguez', 'Carmen Fernández', 'Luis Gómez', 'Isabel Torres', 'Miguel Ramírez',
      'Elena Díaz', 'Francisco Muñoz', 'Rosa Álvarez', 'Antonio Romero', 'Lucía Navarro',
      'José Jiménez', 'Marta Moreno', 'David Rubio', 'Sara Iglesias', 'Javier Ortiz',
      'Patricia Delgado', 'Raúl Castro', 'Cristina Gil', 'Alberto Vega', 'Beatriz Molina',
      'Sergio Herrera', 'Mónica Ramos', 'Pablo Santos', 'Andrea Lozano', 'Daniel Méndez',
      'Eva Gutiérrez', 'Roberto Vargas', 'Silvia Cortés', 'Manuel Reyes', 'Alicia Cabrera',
      'Fernando Cano', 'Natalia Márquez', 'Óscar Pascual', 'Virginia Campos', 'Adrián León',
      'Pilar Vázquez', 'Ignacio Soto', 'Teresa Blanco', 'Rubén Medina', 'Julia Prieto',
      'Marcos Peña', 'Irene Santana', 'Víctor Domínguez', 'Nuria Giménez', 'Ángel Herrero',
      'Sofía Castillo', 'Gonzalo Durán', 'Raquel Morales', 'Héctor Fuentes', 'Claudia Aguilar',
      'Emilio Carrasco', 'Dolores Sanz', 'Arturo Benítez', 'Amparo Vicente', 'Jaime Serrano',
      'Montserrat Gallego', 'Ramón Esteban', 'Inmaculada Parra', 'César Lorenzo', 'Francisca Nieto',
      'Enrique Cabello', 'Josefa Caballero', 'Salvador León', 'Rosario Bravo', 'Alfredo Silva',
      'Concepción Soria', 'Tomás Velasco', 'Encarnación Hidalgo', 'Rafael Flores', 'Asunción Peña',
      'Domingo Mora', 'Mercedes Acosta', 'Ricardo Roldán', 'Ángeles Crespo', 'Gabriel Robles',
      'Milagros Montero', 'Jesús Ferrer', 'Antonia Carmona', 'Lorenzo Moya', 'Piedad Soler',
      'Vicente Espinosa', 'Trinidad Casado', 'Agustín Gallardo', 'Remedios Román', 'Julián Marín',
      'Josefina Garrido', 'Mateo Calvo', 'Manuela Santos', 'Ángela Guerrero', 'Felipe Mendoza',
      'Victoria Cruz', 'Guillermo Ortega', 'Esperanza Núñez', 'Sebastián Pedrosa', 'Consuelo Arias'
    ];

    const membresias = ['Basic', 'Premium', 'Elite', 'Platinum'];
    const canales = ['Social Media', 'Google Ads', 'Referidos', 'Orgánico', 'Email Marketing'];
    const ubicaciones = ['Madrid', 'Barcelona', 'Valencia', 'Sevilla', 'Bilbao'];
    const objetivos = ['Pérdida de peso', 'Ganancia muscular', 'Tonificación', 'Rendimiento', 'Salud general'];

    return nombres.map((nombre, i) => {
      // Definir segmento de valor
      let ltvBase: number;
      if (i < 20) { // Top 20% - Alto valor
        ltvBase = 2000 + Math.random() * 3000;
      } else if (i < 70) { // 50% - Valor medio
        ltvBase = 800 + Math.random() * 1200;
      } else { // 30% - Valor bajo
        ltvBase = 200 + Math.random() * 600;
      }

      const mesesActivo = Math.floor(1 + Math.random() * 36);
      const ingresoMensualPromedio = ltvBase / Math.max(mesesActivo, 1);
      const tendencia: 'creciente' | 'estable' | 'decreciente' =
        Math.random() > 0.7 ? 'creciente' : Math.random() > 0.4 ? 'estable' : 'decreciente';
      const probabilidadChurn = tendencia === 'decreciente' ? 40 + Math.random() * 40 : Math.random() * 40;
      const cac = 150 + Math.random() * 300;

      // Generar transacciones
      const numTransacciones = Math.floor(mesesActivo * (1 + Math.random()));
      const transacciones = Array.from({ length: numTransacciones }, (_, j) => {
        const diasAtras = Math.floor(Math.random() * mesesActivo * 30);
        const fecha = new Date();
        fecha.setDate(fecha.getDate() - diasAtras);

        return {
          fecha: fecha.toISOString().split('T')[0],
          concepto: Math.random() > 0.5 ? 'Membresía mensual' : 'Sesión personal',
          monto: 40 + Math.random() * 100
        };
      }).sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());

      const ultimaTransaccion = transacciones[0]?.fecha || new Date().toISOString().split('T')[0];

      return {
        id: `cliente-${i + 1}`,
        nombre,
        avatar: `https://i.pravatar.cc/150?img=${i + 1}`,
        ltvTotal: Math.round(ltvBase * 100) / 100,
        ltvProyectado: Math.round((ltvBase * 1.2 + Math.random() * 500) * 100) / 100,
        mesesActivo,
        ingresoMensualPromedio: Math.round(ingresoMensualPromedio * 100) / 100,
        ultimaTransaccion,
        tendencia,
        probabilidadChurn: Math.round(probabilidadChurn),
        tipoMembresia: membresias[Math.floor(Math.random() * membresias.length)],
        canalAdquisicion: canales[Math.floor(Math.random() * canales.length)],
        ubicacion: ubicaciones[Math.floor(Math.random() * ubicaciones.length)],
        edad: 20 + Math.floor(Math.random() * 40),
        objetivoFitness: objetivos[Math.floor(Math.random() * objetivos.length)],
        transacciones,
        engagement: {
          adherencia: Math.round(50 + Math.random() * 50),
          sesionesCompletadas: Math.floor(mesesActivo * 4 * (0.5 + Math.random() * 0.5)),
          nps: Math.round(5 + Math.random() * 5)
        },
        cac: Math.round(cac * 100) / 100
      };
    }).sort((a, b) => b.ltvTotal - a.ltvTotal);
  }, []);

  // Calcular KPIs
  const kpis = useMemo(() => {
    const ltvPromedio = clientes.reduce((sum, c) => sum + c.ltvTotal, 0) / clientes.length;
    const ltvProyectadoTotal = clientes.reduce((sum, c) => sum + c.ltvProyectado, 0) / clientes.length;
    const cacPromedio = clientes.reduce((sum, c) => sum + c.cac, 0) / clientes.length;
    const cacLtvRatio = cacPromedio / ltvPromedio;
    const paybackPeriod = cacPromedio / (ltvPromedio / clientes.reduce((sum, c) => sum + c.mesesActivo, 0) * clientes.length);

    return {
      ltvPromedio: Math.round(ltvPromedio * 100) / 100,
      ltvProyectado: Math.round(ltvProyectadoTotal * 100) / 100,
      cacLtvRatio: Math.round(cacLtvRatio * 100) / 100,
      paybackPeriod: Math.round(paybackPeriod * 10) / 10,
      variacionMensual: 12.5, // Mock
      tendenciaLtv: 'up' as const
    };
  }, [clientes]);

  // Segmentación
  const segmentos: Segmento[] = useMemo(() => {
    const altoValor = clientes.filter(c => c.ltvTotal >= 2000);
    const medioValor = clientes.filter(c => c.ltvTotal >= 800 && c.ltvTotal < 2000);
    const bajoValor = clientes.filter(c => c.ltvTotal < 800);
    const totalIngresos = clientes.reduce((sum, c) => sum + c.ltvTotal, 0);

    return [
      {
        nombre: 'Alto Valor',
        color: 'from-yellow-400 to-amber-600',
        clientes: altoValor.length,
        ltvPromedio: Math.round(altoValor.reduce((sum, c) => sum + c.ltvTotal, 0) / altoValor.length),
        porcentajeIngresos: Math.round((altoValor.reduce((sum, c) => sum + c.ltvTotal, 0) / totalIngresos) * 100),
        icono: <Crown className="w-6 h-6" />
      },
      {
        nombre: 'Valor Medio',
        color: 'from-gray-300 to-gray-500',
        clientes: medioValor.length,
        ltvPromedio: Math.round(medioValor.reduce((sum, c) => sum + c.ltvTotal, 0) / medioValor.length),
        porcentajeIngresos: Math.round((medioValor.reduce((sum, c) => sum + c.ltvTotal, 0) / totalIngresos) * 100),
        icono: <Award className="w-6 h-6" />
      },
      {
        nombre: 'Valor Bajo',
        color: 'from-orange-400 to-orange-600',
        clientes: bajoValor.length,
        ltvPromedio: Math.round(bajoValor.reduce((sum, c) => sum + c.ltvTotal, 0) / bajoValor.length),
        porcentajeIngresos: Math.round((bajoValor.reduce((sum, c) => sum + c.ltvTotal, 0) / totalIngresos) * 100),
        icono: <Medal className="w-6 h-6" />
      }
    ];
  }, [clientes]);

  // Distribución de LTV
  const distribucionLtv = useMemo(() => {
    const rangos = [
      { min: 0, max: 500, label: '0-500€' },
      { min: 500, max: 1000, label: '500-1000€' },
      { min: 1000, max: 1500, label: '1-1.5K€' },
      { min: 1500, max: 2000, label: '1.5-2K€' },
      { min: 2000, max: 3000, label: '2-3K€' },
      { min: 3000, max: 5000, label: '3-5K€' },
      { min: 5000, max: Infinity, label: '5K+€' }
    ];

    return rangos.map(rango => ({
      rango: rango.label,
      clientes: clientes.filter(c => c.ltvTotal >= rango.min && c.ltvTotal < rango.max).length
    }));
  }, [clientes]);

  // LTV acumulado por cohorte
  const ltvAcumulado = useMemo(() => {
    const mesesMax = 24;
    return Array.from({ length: mesesMax }, (_, mes) => {
      const data: any = { mes: mes + 1 };

      // Cohortes por trimestre
      ['Q1', 'Q2', 'Q3', 'Q4'].forEach((q, i) => {
        const ltvPromedio = (mes + 1) * 80 * (1 + i * 0.1) * (1 + Math.random() * 0.2);
        data[q] = Math.round(ltvPromedio);
      });

      return data;
    });
  }, []);

  // Análisis por segmento
  const analisisPorSegmento = useMemo(() => {
    const grupos: Record<string, any> = {
      membresia: {},
      canal: {},
      ubicacion: {},
      edad: {},
      objetivo: {}
    };

    clientes.forEach(c => {
      // Por membresía
      if (!grupos.membresia[c.tipoMembresia]) {
        grupos.membresia[c.tipoMembresia] = { clientes: 0, ltvTotal: 0 };
      }
      grupos.membresia[c.tipoMembresia].clientes++;
      grupos.membresia[c.tipoMembresia].ltvTotal += c.ltvTotal;

      // Por canal
      if (!grupos.canal[c.canalAdquisicion]) {
        grupos.canal[c.canalAdquisicion] = { clientes: 0, ltvTotal: 0 };
      }
      grupos.canal[c.canalAdquisicion].clientes++;
      grupos.canal[c.canalAdquisicion].ltvTotal += c.ltvTotal;

      // Por ubicación
      if (!grupos.ubicacion[c.ubicacion]) {
        grupos.ubicacion[c.ubicacion] = { clientes: 0, ltvTotal: 0 };
      }
      grupos.ubicacion[c.ubicacion].clientes++;
      grupos.ubicacion[c.ubicacion].ltvTotal += c.ltvTotal;

      // Por edad
      const rangoEdad = c.edad < 25 ? '18-25' : c.edad < 35 ? '25-35' : c.edad < 45 ? '35-45' : '45+';
      if (!grupos.edad[rangoEdad]) {
        grupos.edad[rangoEdad] = { clientes: 0, ltvTotal: 0 };
      }
      grupos.edad[rangoEdad].clientes++;
      grupos.edad[rangoEdad].ltvTotal += c.ltvTotal;

      // Por objetivo
      if (!grupos.objetivo[c.objetivoFitness]) {
        grupos.objetivo[c.objetivoFitness] = { clientes: 0, ltvTotal: 0 };
      }
      grupos.objetivo[c.objetivoFitness].clientes++;
      grupos.objetivo[c.objetivoFitness].ltvTotal += c.ltvTotal;
    });

    // Convertir a arrays y calcular promedios
    Object.keys(grupos).forEach(tipo => {
      grupos[tipo] = Object.entries(grupos[tipo]).map(([nombre, data]: [string, any]) => ({
        nombre,
        clientes: data.clientes,
        ltvPromedio: Math.round(data.ltvTotal / data.clientes),
        porcentaje: Math.round((data.clientes / clientes.length) * 100)
      })).sort((a, b) => b.ltvPromedio - a.ltvPromedio);
    });

    return grupos;
  }, [clientes]);

  // CAC vs LTV para scatter
  const cacVsLtv = useMemo(() => {
    return clientes.map(c => ({
      nombre: c.nombre,
      cac: c.cac,
      ltv: c.ltvTotal,
      segmento: c.ltvTotal >= 2000 ? 'Alto' : c.ltvTotal >= 800 ? 'Medio' : 'Bajo'
    }));
  }, [clientes]);

  // Filtrar y ordenar clientes
  const clientesFiltrados = useMemo(() => {
    let filtered = clientes.filter(c => {
      const matchSearch = c.nombre.toLowerCase().includes(searchTerm.toLowerCase());

      if (selectedTab === 'alto-valor') return matchSearch && c.ltvTotal >= 2000;
      if (selectedTab === 'riesgo') return matchSearch && c.probabilidadChurn >= 40;
      if (selectedTab === 'nuevos') return matchSearch && c.mesesActivo <= 3;

      return matchSearch;
    });

    // Ordenar
    filtered.sort((a, b) => {
      const aVal = a[sortConfig.key as keyof Cliente];
      const bVal = b[sortConfig.key as keyof Cliente];

      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortConfig.direction === 'asc' ? aVal - bVal : bVal - aVal;
      }

      return sortConfig.direction === 'asc'
        ? String(aVal).localeCompare(String(bVal))
        : String(bVal).localeCompare(String(aVal));
    });

    return filtered;
  }, [clientes, selectedTab, sortConfig, searchTerm]);

  // Paginación
  const clientesPaginados = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return clientesFiltrados.slice(start, start + itemsPerPage);
  }, [clientesFiltrados, currentPage]);

  const totalPages = Math.ceil(clientesFiltrados.length / itemsPerPage);

  // Impacto de reducción de churn
  const impactoChurn = useMemo(() => {
    const ltvActual = kpis.ltvPromedio;
    const incrementoLtv = (churnReduction / 100) * ltvActual * 0.3 + (engagementIncrease / 100) * ltvActual * 0.2;
    const nuevoLtv = ltvActual + incrementoLtv;
    const ingresosAdicionales = incrementoLtv * clientes.length;

    return {
      incrementoLtv: Math.round(incrementoLtv),
      nuevoLtv: Math.round(nuevoLtv),
      ingresosAdicionales: Math.round(ingresosAdicionales),
      roi: Math.round((ingresosAdicionales / (ingresosAdicionales * 0.3)) * 100)
    };
  }, [churnReduction, engagementIncrease, kpis.ltvPromedio, clientes.length]);

  // Handlers
  const handleSort = (key: string) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'desc' ? 'asc' : 'desc'
    }));
  };

  const getMedalIcon = (index: number) => {
    if (index === 0) return <Crown className="w-5 h-5 text-yellow-500" />;
    if (index === 1) return <Trophy className="w-5 h-5 text-gray-400" />;
    if (index === 2) return <Medal className="w-5 h-5 text-orange-600" />;
    return null;
  };

  const getTendenciaIcon = (tendencia: string) => {
    if (tendencia === 'creciente') return <TrendingUp className="w-4 h-4 text-green-500" />;
    if (tendencia === 'decreciente') return <TrendingDown className="w-4 h-4 text-red-500" />;
    return <Minus className="w-4 h-4 text-gray-500" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="p-3 bg-gradient-to-br from-yellow-400 to-blue-600 rounded-xl"
            >
              <TrendingUp className="w-8 h-8 text-white" />
            </motion.div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                Lifetime Value de Clientes
              </h1>
              <p className="text-gray-600 mt-1">
                Analiza el valor real de cada cliente a lo largo del tiempo
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Exportar Análisis
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2"
            >
              <Settings className="w-4 h-4" />
              Configurar
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg flex items-center gap-2"
            >
              <Users className="w-4 h-4" />
              Ver Top Clientes
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* KPIs Principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-600 font-medium">LTV Promedio</h3>
            <DollarSign className="w-5 h-5 text-blue-600" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-2">
            €{kpis.ltvPromedio.toLocaleString()}
          </div>
          <div className="flex items-center gap-2 text-sm">
            <div className="flex items-center gap-1 text-green-600">
              <ArrowUp className="w-4 h-4" />
              <span>+{kpis.variacionMensual}%</span>
            </div>
            <span className="text-gray-500">vs mes anterior</span>
          </div>
          <div className="mt-4 h-12">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsLineChart data={Array.from({ length: 12 }, (_, i) => ({
                mes: i + 1,
                valor: kpis.ltvPromedio * (0.85 + i * 0.015)
              }))}>
                <Line type="monotone" dataKey="valor" stroke="#3b82f6" strokeWidth={2} dot={false} />
              </RechartsLineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-600 font-medium">LTV Proyectado</h3>
            <Target className="w-5 h-5 text-purple-600" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-2">
            €{kpis.ltvProyectado.toLocaleString()}
          </div>
          <div className="text-sm text-gray-600">
            Proyección a 12 meses
          </div>
          <div className="mt-4 bg-gradient-to-r from-purple-100 to-purple-50 rounded-lg p-3">
            <div className="text-xs text-purple-700 font-medium mb-1">Intervalo de confianza</div>
            <div className="text-sm text-purple-900">
              €{Math.round(kpis.ltvProyectado * 0.9).toLocaleString()} - €{Math.round(kpis.ltvProyectado * 1.1).toLocaleString()}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-600 font-medium">CAC:LTV Ratio</h3>
            <Activity className="w-5 h-5 text-green-600" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-2">
            1:{(1 / kpis.cacLtvRatio).toFixed(1)}
          </div>
          <div className="flex items-center gap-2">
            <div className={`px-2 py-1 rounded-full text-xs font-medium ${
              kpis.cacLtvRatio <= 0.33 ? 'bg-green-100 text-green-700' :
              kpis.cacLtvRatio <= 0.5 ? 'bg-yellow-100 text-yellow-700' :
              'bg-red-100 text-red-700'
            }`}>
              {kpis.cacLtvRatio <= 0.33 ? 'Excelente' : kpis.cacLtvRatio <= 0.5 ? 'Bueno' : 'Mejorar'}
            </div>
            <span className="text-sm text-gray-500">Ideal: 1:3</span>
          </div>
          <div className="mt-4">
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${
                  kpis.cacLtvRatio <= 0.33 ? 'bg-green-500' :
                  kpis.cacLtvRatio <= 0.5 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ width: `${Math.min((1/kpis.cacLtvRatio) / 5 * 100, 100)}%` }}
              />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-600 font-medium">Payback Period</h3>
            <Clock className="w-5 h-5 text-orange-600" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-2">
            {kpis.paybackPeriod} meses
          </div>
          <div className="text-sm text-gray-600 mb-4">
            Tiempo para recuperar inversión
          </div>
          <div className="flex items-center gap-2 text-sm">
            <TrendingDown className="w-4 h-4 text-green-600" />
            <span className="text-green-600">-2.1 meses vs promedio</span>
          </div>
        </motion.div>
      </div>

      {/* Segmentación por Valor */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {segmentos.map((seg, index) => (
          <motion.div
            key={seg.nombre}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * index }}
            className={`bg-gradient-to-br ${seg.color} rounded-xl p-6 shadow-lg text-white`}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">{seg.nombre}</h3>
              {seg.icono}
            </div>
            <div className="space-y-3">
              <div>
                <div className="text-sm opacity-90">Clientes</div>
                <div className="text-3xl font-bold">{seg.clientes}</div>
              </div>
              <div>
                <div className="text-sm opacity-90">LTV Promedio</div>
                <div className="text-2xl font-bold">€{seg.ltvPromedio.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-sm opacity-90">% de Ingresos Totales</div>
                <div className="text-2xl font-bold">{seg.porcentajeIngresos}%</div>
              </div>
              <div className="pt-2 border-t border-white/20">
                <div className="h-2 bg-white/30 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-white rounded-full"
                    style={{ width: `${seg.porcentajeIngresos}%` }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Alertas y Recomendaciones */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-6 mb-8"
      >
        <div className="flex items-center gap-3 mb-4">
          <Zap className="w-6 h-6 text-amber-600" />
          <h3 className="text-xl font-bold text-gray-900">Insights y Recomendaciones</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg p-4 border border-amber-100">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-500 mt-1" />
              <div>
                <div className="font-medium text-gray-900">10 clientes de alto valor</div>
                <div className="text-sm text-gray-600">en riesgo de churn</div>
                <button className="mt-2 text-sm text-blue-600 hover:underline">Ver detalles →</button>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 border border-amber-100">
            <div className="flex items-start gap-3">
              <Star className="w-5 h-5 text-green-500 mt-1" />
              <div>
                <div className="font-medium text-gray-900">15 clientes listos</div>
                <div className="text-sm text-gray-600">para upgrade a Premium</div>
                <button className="mt-2 text-sm text-blue-600 hover:underline">Contactar →</button>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 border border-amber-100">
            <div className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-blue-500 mt-1" />
              <div>
                <div className="font-medium text-gray-900">+20% mejor LTV</div>
                <div className="text-sm text-gray-600">clientes nuevos vs 6 meses</div>
                <button className="mt-2 text-sm text-blue-600 hover:underline">Analizar →</button>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 border border-amber-100">
            <div className="flex items-start gap-3">
              <Crown className="w-5 h-5 text-purple-500 mt-1" />
              <div>
                <div className="font-medium text-gray-900">Premium genera</div>
                <div className="text-sm text-gray-600">60% del LTV total</div>
                <button className="mt-2 text-sm text-blue-600 hover:underline">Estrategia →</button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Gráficos principales */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Distribución de LTV */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl p-6 shadow-lg"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-blue-600" />
            Distribución de LTV
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={distribucionLtv}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="rango" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="clientes" radius={[8, 8, 0, 0]}>
                {distribucionLtv.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={
                    index < 2 ? '#f59e0b' :
                    index < 4 ? '#9ca3af' :
                    '#fbbf24'
                  } />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-4 flex items-center justify-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-amber-600" />
              <span>Bajo</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gray-400" />
              <span>Medio</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <span>Alto</span>
            </div>
          </div>
        </motion.div>

        {/* LTV Acumulado por Cohorte */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl p-6 shadow-lg"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <LineChart className="w-5 h-5 text-purple-600" />
            LTV Acumulado por Cohorte
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <RechartsLineChart data={ltvAcumulado}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" label={{ value: 'Meses desde registro', position: 'insideBottom', offset: -5 }} />
              <YAxis label={{ value: 'LTV (€)', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="Q1" stroke="#3b82f6" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="Q2" stroke="#8b5cf6" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="Q3" stroke="#ec4899" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="Q4" stroke="#f59e0b" strokeWidth={2} dot={false} />
            </RechartsLineChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* CAC vs LTV Scatter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl p-6 shadow-lg mb-8"
      >
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Target className="w-5 h-5 text-green-600" />
          Comparativa CAC vs LTV
        </h3>
        <ResponsiveContainer width="100%" height={400}>
          <ScatterChart>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="cac" name="CAC" label={{ value: 'Costo de Adquisición (€)', position: 'insideBottom', offset: -5 }} />
            <YAxis dataKey="ltv" name="LTV" label={{ value: 'Lifetime Value (€)', angle: -90, position: 'insideLeft' }} />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <Legend />
            <Scatter name="Clientes" data={cacVsLtv} fill="#3b82f6">
              {cacVsLtv.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={
                    entry.segmento === 'Alto' ? '#fbbf24' :
                    entry.segmento === 'Medio' ? '#9ca3af' :
                    '#f59e0b'
                  }
                />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
        <div className="mt-4 text-center text-sm text-gray-600">
          <span className="font-medium">Línea ideal:</span> Ratio 1:3 (cada € invertido genera 3€ de LTV)
        </div>
      </motion.div>

      {/* Calculadora de LTV */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 shadow-lg mb-8"
      >
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Calculator className="w-5 h-5 text-blue-600" />
          Calculadora de LTV
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Valor promedio de transacción (€)
              </label>
              <input
                type="number"
                defaultValue="65"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Frecuencia de compra (veces/mes)
              </label>
              <input
                type="number"
                defaultValue="2"
                step="0.5"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Margen de beneficio (%)
              </label>
              <input
                type="number"
                defaultValue="70"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Vida promedio del cliente (meses)
              </label>
              <input
                type="number"
                defaultValue="18"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="flex flex-col justify-center items-center bg-white rounded-xl p-6">
            <div className="text-sm text-gray-600 mb-2">Fórmula:</div>
            <div className="text-center text-sm text-gray-700 mb-4 font-mono">
              LTV = Valor × Frecuencia × Margen × Vida
            </div>
            <div className="text-5xl font-bold text-blue-600 mb-2">
              €1,638
            </div>
            <div className="text-sm text-gray-600 mb-4">LTV Calculado</div>
            <div className="w-full bg-gray-100 rounded-lg p-4">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-gray-600">vs LTV Real Promedio:</span>
                <span className="font-bold text-green-600">+12%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 rounded-full" style={{ width: '78%' }} />
              </div>
            </div>
            <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Guardar Configuración
            </button>
          </div>
        </div>
      </motion.div>

      {/* Análisis por Segmento */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl p-6 shadow-lg mb-8"
      >
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <PieChart className="w-5 h-5 text-purple-600" />
          Análisis por Segmento
        </h3>
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {['membresia', 'canal', 'ubicacion', 'edad', 'objetivo'].map(tab => (
            <button
              key={tab}
              onClick={() => setSegmentTab(tab)}
              className={`px-4 py-2 rounded-lg whitespace-nowrap ${
                segmentTab === tab
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {tab === 'membresia' && 'Tipo de Membresía'}
              {tab === 'canal' && 'Canal de Adquisición'}
              {tab === 'ubicacion' && 'Ubicación'}
              {tab === 'edad' && 'Rango de Edad'}
              {tab === 'objetivo' && 'Objetivo Fitness'}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {analisisPorSegmento[segmentTab]?.map((item: any, index: number) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-gray-900">{item.nombre}</h4>
                <span className="text-sm text-gray-500">{item.porcentaje}%</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">LTV Promedio:</span>
                  <span className="font-bold text-blue-600">€{item.ltvPromedio}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Clientes:</span>
                  <span className="font-medium">{item.clientes}</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                    style={{ width: `${item.porcentaje}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Simulador de Impacto de Churn */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 shadow-lg mb-8"
      >
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Activity className="w-5 h-5 text-green-600" />
          Simulador de Impacto de Retención
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-gray-700">
                  Reducción de Churn
                </label>
                <span className="text-lg font-bold text-green-600">{churnReduction}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="50"
                value={churnReduction}
                onChange={(e) => setChurnReduction(Number(e.target.value))}
                className="w-full"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-gray-700">
                  Aumento de Engagement
                </label>
                <span className="text-lg font-bold text-blue-600">{engagementIncrease}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="50"
                value={engagementIncrease}
                onChange={(e) => setEngagementIncrease(Number(e.target.value))}
                className="w-full"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-1">Incremento en LTV</div>
              <div className="text-2xl font-bold text-green-600">
                +€{impactoChurn.incrementoLtv}
              </div>
            </div>
            <div className="bg-white rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-1">Nuevo LTV Promedio</div>
              <div className="text-2xl font-bold text-blue-600">
                €{impactoChurn.nuevoLtv}
              </div>
            </div>
            <div className="bg-white rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-1">Ingresos Adicionales</div>
              <div className="text-2xl font-bold text-purple-600">
                €{impactoChurn.ingresosAdicionales.toLocaleString()}
              </div>
            </div>
            <div className="bg-white rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-1">ROI Estimado</div>
              <div className="text-2xl font-bold text-amber-600">
                {impactoChurn.roi}%
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Ranking de Clientes */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl p-6 shadow-lg"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-500" />
            Ranking de Clientes por LTV
          </h3>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar cliente..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Tabs de filtros */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {[
            { key: 'todos', label: 'Todos', count: clientes.length },
            { key: 'alto-valor', label: 'Alto Valor', count: clientes.filter(c => c.ltvTotal >= 2000).length },
            { key: 'riesgo', label: 'En Riesgo', count: clientes.filter(c => c.probabilidadChurn >= 40).length },
            { key: 'nuevos', label: 'Nuevos', count: clientes.filter(c => c.mesesActivo <= 3).length }
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => {
                setSelectedTab(tab.key);
                setCurrentPage(1);
              }}
              className={`px-4 py-2 rounded-lg whitespace-nowrap flex items-center gap-2 ${
                selectedTab === tab.key
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {tab.label}
              <span className={`px-2 py-0.5 rounded-full text-xs ${
                selectedTab === tab.key ? 'bg-white/20' : 'bg-gray-200'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Tabla */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left p-3 text-sm font-semibold text-gray-700">Rank</th>
                <th className="text-left p-3 text-sm font-semibold text-gray-700">Cliente</th>
                <th
                  className="text-right p-3 text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-50"
                  onClick={() => handleSort('ltvTotal')}
                >
                  <div className="flex items-center justify-end gap-1">
                    LTV Total
                    {sortConfig.key === 'ltvTotal' && (
                      sortConfig.direction === 'desc' ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />
                    )}
                  </div>
                </th>
                <th
                  className="text-right p-3 text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-50"
                  onClick={() => handleSort('ltvProyectado')}
                >
                  <div className="flex items-center justify-end gap-1">
                    LTV Proyectado
                    {sortConfig.key === 'ltvProyectado' && (
                      sortConfig.direction === 'desc' ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />
                    )}
                  </div>
                </th>
                <th
                  className="text-center p-3 text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-50"
                  onClick={() => handleSort('mesesActivo')}
                >
                  <div className="flex items-center justify-center gap-1">
                    Meses Activo
                    {sortConfig.key === 'mesesActivo' && (
                      sortConfig.direction === 'desc' ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />
                    )}
                  </div>
                </th>
                <th className="text-right p-3 text-sm font-semibold text-gray-700">Ingreso Mensual</th>
                <th className="text-center p-3 text-sm font-semibold text-gray-700">Última Trans.</th>
                <th className="text-center p-3 text-sm font-semibold text-gray-700">Tendencia</th>
                <th
                  className="text-center p-3 text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-50"
                  onClick={() => handleSort('probabilidadChurn')}
                >
                  <div className="flex items-center justify-center gap-1">
                    Churn
                    {sortConfig.key === 'probabilidadChurn' && (
                      sortConfig.direction === 'desc' ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />
                    )}
                  </div>
                </th>
                <th className="text-center p-3 text-sm font-semibold text-gray-700">Acción</th>
              </tr>
            </thead>
            <tbody>
              {clientesPaginados.map((cliente, index) => {
                const globalIndex = (currentPage - 1) * itemsPerPage + index;
                return (
                  <motion.tr
                    key={cliente.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        {getMedalIcon(globalIndex)}
                        <span className="font-semibold text-gray-700">#{globalIndex + 1}</span>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={cliente.avatar}
                          alt={cliente.nombre}
                          className="w-10 h-10 rounded-full"
                        />
                        <div>
                          <div className="font-medium text-gray-900">{cliente.nombre}</div>
                          <div className="text-xs text-gray-500">{cliente.tipoMembresia}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-3 text-right">
                      <span className="font-bold text-gray-900">€{cliente.ltvTotal.toLocaleString()}</span>
                    </td>
                    <td className="p-3 text-right">
                      <span className="text-gray-600">€{cliente.ltvProyectado.toLocaleString()}</span>
                    </td>
                    <td className="p-3 text-center">
                      <span className="text-gray-900">{cliente.mesesActivo}</span>
                    </td>
                    <td className="p-3 text-right">
                      <span className="text-gray-600">€{Math.round(cliente.ingresoMensualPromedio)}</span>
                    </td>
                    <td className="p-3 text-center">
                      <span className="text-sm text-gray-600">
                        {new Date(cliente.ultimaTransaccion).toLocaleDateString('es-ES', { day: '2-digit', month: 'short' })}
                      </span>
                    </td>
                    <td className="p-3 text-center">
                      <div className="flex justify-center">
                        {getTendenciaIcon(cliente.tendencia)}
                      </div>
                    </td>
                    <td className="p-3 text-center">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        cliente.probabilidadChurn >= 60 ? 'bg-red-100 text-red-700' :
                        cliente.probabilidadChurn >= 40 ? 'bg-yellow-100 text-yellow-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {cliente.probabilidadChurn}%
                      </span>
                    </td>
                    <td className="p-3 text-center">
                      <button
                        onClick={() => setSelectedCliente(cliente)}
                        className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm flex items-center gap-1 mx-auto"
                      >
                        <Eye className="w-3 h-3" />
                        Ver
                      </button>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Paginación */}
        <div className="flex items-center justify-between mt-6">
          <div className="text-sm text-gray-600">
            Mostrando {((currentPage - 1) * itemsPerPage) + 1} - {Math.min(currentPage * itemsPerPage, clientesFiltrados.length)} de {clientesFiltrados.length} clientes
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Anterior
            </button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }

              return (
                <button
                  key={i}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`px-4 py-2 rounded-lg ${
                    currentPage === pageNum
                      ? 'bg-blue-600 text-white'
                      : 'border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Siguiente
            </button>
          </div>
        </div>
      </motion.div>

      {/* Modal de Perfil de Cliente */}
      <AnimatePresence>
        {selectedCliente && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedCliente(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              {/* Header del Modal */}
              <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 z-10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <img
                      src={selectedCliente.avatar}
                      alt={selectedCliente.nombre}
                      className="w-20 h-20 rounded-full border-4 border-white shadow-lg"
                    />
                    <div>
                      <h2 className="text-2xl font-bold">{selectedCliente.nombre}</h2>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="px-3 py-1 bg-white/20 rounded-full text-sm">
                          {selectedCliente.tipoMembresia}
                        </span>
                        <span className="px-3 py-1 bg-white/20 rounded-full text-sm">
                          {selectedCliente.ubicacion}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedCliente(null)}
                    className="p-2 hover:bg-white/20 rounded-lg"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              <div className="p-6">
                {/* Estadísticas Clave */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4">
                    <div className="text-sm text-blue-700 mb-1">LTV Total</div>
                    <div className="text-2xl font-bold text-blue-900">
                      €{selectedCliente.ltvTotal.toLocaleString()}
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4">
                    <div className="text-sm text-purple-700 mb-1">LTV Proyectado</div>
                    <div className="text-2xl font-bold text-purple-900">
                      €{selectedCliente.ltvProyectado.toLocaleString()}
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4">
                    <div className="text-sm text-green-700 mb-1">Meses Activo</div>
                    <div className="text-2xl font-bold text-green-900">
                      {selectedCliente.mesesActivo}
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg p-4">
                    <div className="text-sm text-amber-700 mb-1">Ingreso Mensual</div>
                    <div className="text-2xl font-bold text-amber-900">
                      €{Math.round(selectedCliente.ingresoMensualPromedio)}
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-rose-50 to-rose-100 rounded-lg p-4">
                    <div className="text-sm text-rose-700 mb-1">Probabilidad Churn</div>
                    <div className="text-2xl font-bold text-rose-900">
                      {selectedCliente.probabilidadChurn}%
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-lg p-4">
                    <div className="text-sm text-indigo-700 mb-1">Adherencia</div>
                    <div className="text-2xl font-bold text-indigo-900">
                      {selectedCliente.engagement.adherencia}%
                    </div>
                  </div>
                </div>

                {/* Timeline de Transacciones */}
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    Historial de Transacciones
                  </h3>
                  <div className="bg-gray-50 rounded-lg p-4 max-h-60 overflow-y-auto">
                    <div className="space-y-3">
                      {selectedCliente.transacciones.slice(0, 10).map((trans, i) => (
                        <div key={i} className="flex items-center justify-between py-2 border-b border-gray-200 last:border-0">
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-blue-600" />
                            <div>
                              <div className="font-medium text-gray-900">{trans.concepto}</div>
                              <div className="text-sm text-gray-500">
                                {new Date(trans.fecha).toLocaleDateString('es-ES', {
                                  day: '2-digit',
                                  month: 'long',
                                  year: 'numeric'
                                })}
                              </div>
                            </div>
                          </div>
                          <div className="font-bold text-green-600">
                            +€{trans.monto.toFixed(2)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Métricas de Engagement */}
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Activity className="w-5 h-5 text-purple-600" />
                    Métricas de Engagement
                  </h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <div className="text-sm text-gray-600 mb-2">Adherencia</div>
                      <div className="text-xl font-bold text-purple-600 mb-2">
                        {selectedCliente.engagement.adherencia}%
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-purple-600 rounded-full"
                          style={{ width: `${selectedCliente.engagement.adherencia}%` }}
                        />
                      </div>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <div className="text-sm text-gray-600 mb-2">Sesiones</div>
                      <div className="text-xl font-bold text-blue-600">
                        {selectedCliente.engagement.sesionesCompletadas}
                      </div>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <div className="text-sm text-gray-600 mb-2">NPS</div>
                      <div className="text-xl font-bold text-green-600">
                        {selectedCliente.engagement.nps}/10
                      </div>
                    </div>
                  </div>
                </div>

                {/* Predicciones */}
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                    Predicciones
                  </h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4 border border-green-200">
                      <div className="text-sm text-green-700 mb-2">Ingresos próximos 3 meses</div>
                      <div className="text-xl font-bold text-green-900">
                        €{Math.round(selectedCliente.ingresoMensualPromedio * 3)}
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
                      <div className="text-sm text-blue-700 mb-2">Prob. Upgrade</div>
                      <div className="text-xl font-bold text-blue-900">
                        {Math.round(selectedCliente.engagement.adherencia * 0.8)}%
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg p-4 border border-amber-200">
                      <div className="text-sm text-amber-700 mb-2">Riesgo Churn</div>
                      <div className="text-xl font-bold text-amber-900">
                        {selectedCliente.probabilidadChurn}%
                      </div>
                    </div>
                  </div>
                </div>

                {/* Botones de Acción */}
                <div className="flex gap-3">
                  <button className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2">
                    <Mail className="w-4 h-4" />
                    Contactar
                  </button>
                  <button className="flex-1 px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center justify-center gap-2">
                    <Activity className="w-4 h-4" />
                    Ver Entrenamientos
                  </button>
                  <button className="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center justify-center gap-2">
                    <Star className="w-4 h-4" />
                    Ofertas Personalizadas
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Componente auxiliar para Calculator (faltaba en imports)
const Calculator: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
  </svg>
);

export default LtvClientesPage;