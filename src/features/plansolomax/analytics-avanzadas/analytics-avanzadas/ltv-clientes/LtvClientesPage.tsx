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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-teal-50/30 pb-12">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 rounded-3xl shadow-2xl mb-8 p-8 md:p-12"
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

        <div className="relative z-10">
          {/* Título con icono animado */}
          <div className="flex items-center gap-3 mb-4">
            <div className="relative">
              <DollarSign className="w-10 h-10 text-yellow-300 animate-pulse" />
              <div className="absolute inset-0 w-10 h-10 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Lifetime Value <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">(LTV)</span>
            </h1>
          </div>

          {/* Descripción */}
          <p className="text-xl md:text-2xl text-emerald-100 max-w-3xl leading-relaxed mb-6">
            Predice y <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">maximiza el valor</span> de tus clientes a largo plazo
          </p>

          {/* Indicadores pills */}
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <TrendingUp className="w-5 h-5 text-green-300" />
              <span className="text-sm font-semibold text-white">Predicción con IA</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Target className="w-5 h-5 text-yellow-300" />
              <span className="text-sm font-semibold text-white">Análisis de Cohortes</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Users className="w-5 h-5 text-blue-300" />
              <span className="text-sm font-semibold text-white">Segmentación Avanzada</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* KPIs Principales - Estadísticas Rápidas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          {
            title: 'LTV Promedio',
            value: `€${kpis.ltvPromedio.toLocaleString()}`,
            icon: DollarSign,
            gradient: 'from-emerald-500 to-teal-600',
            change: `+${kpis.variacionMensual}%`,
            changePositive: true,
            detail: 'vs mes anterior'
          },
          {
            title: 'LTV Predicho 12 Meses',
            value: `€${kpis.ltvProyectado.toLocaleString()}`,
            icon: Target,
            gradient: 'from-green-500 to-emerald-600',
            change: '+18%',
            changePositive: true,
            detail: 'proyección con IA'
          },
          {
            title: 'CAC/LTV Ratio',
            value: `1:${(1 / kpis.cacLtvRatio).toFixed(1)}`,
            icon: Activity,
            gradient: 'from-teal-500 to-cyan-600',
            change: kpis.cacLtvRatio <= 0.33 ? 'Excelente' : kpis.cacLtvRatio <= 0.5 ? 'Bueno' : 'Mejorar',
            changePositive: kpis.cacLtvRatio <= 0.33,
            detail: 'ideal: 1:3'
          },
          {
            title: 'Segmento de Mayor Valor',
            value: segmentos[0]?.nombre || 'Premium',
            icon: Crown,
            gradient: 'from-yellow-500 to-amber-600',
            change: `${segmentos[0]?.porcentajeIngresos}%`,
            changePositive: true,
            detail: 'de ingresos totales'
          }
        ].map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ scale: 1.03, y: -8 }}
            className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 border border-white/50 relative overflow-hidden group"
          >
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>

            {/* Decoración de fondo */}
            <div className={`absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br ${stat.gradient} opacity-5 rounded-full blur-2xl`}></div>

            <div className="relative z-10">
              {/* Icono */}
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center text-white mb-4 shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon className="w-8 h-8" />
              </div>

              {/* Título */}
              <p className="text-sm font-semibold text-gray-600 mb-2 tracking-wide uppercase">
                {stat.title}
              </p>

              {/* Valor */}
              <p className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 mb-3">
                {stat.value}
              </p>

              {/* Cambio */}
              <div className="flex items-center gap-2">
                <div className={`p-1 ${stat.changePositive ? 'bg-green-50' : 'bg-gray-50'} rounded-lg`}>
                  {stat.changePositive ? (
                    <ArrowUp className="w-4 h-4 text-green-600" />
                  ) : (
                    <Minus className="w-4 h-4 text-gray-600" />
                  )}
                </div>
                <span className={`text-sm font-bold ${stat.changePositive ? 'text-green-600' : 'text-gray-600'}`}>{stat.change}</span>
                <span className="text-xs text-gray-500 font-medium">{stat.detail}</span>
              </div>

              {/* Barra decorativa */}
              <div className="mt-4 w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '75%' }}
                  transition={{ delay: index * 0.1 + 0.5, duration: 1 }}
                  className={`h-full bg-gradient-to-r ${stat.gradient} rounded-full`}
                ></motion.div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Segmentación por Valor con Acciones Recomendadas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[
          {
            ...segmentos[0],
            color: 'from-yellow-400 via-amber-500 to-orange-600',
            titulo: 'VIP (Top 10%)',
            acciones: ['Programa de lealtad exclusivo', 'Sesiones personalizadas premium', 'Eventos VIP'],
            badge: 'Prioridad Alta'
          },
          {
            ...segmentos[1],
            color: 'from-emerald-400 via-teal-500 to-cyan-600',
            titulo: 'Alto Valor (Top 25%)',
            acciones: ['Ofertas de upgrade', 'Contenido premium', 'Descuentos especiales'],
            badge: 'Crecimiento'
          },
          {
            ...segmentos[2],
            color: 'from-blue-400 via-indigo-500 to-purple-600',
            titulo: 'Valor Medio',
            acciones: ['Programas de engagement', 'Challenges grupales', 'Incentivos referidos'],
            badge: 'Activación'
          }
        ].map((seg, index) => (
          <motion.div
            key={seg.nombre}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * index }}
            className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 overflow-hidden group hover:shadow-2xl transition-all duration-300"
          >
            {/* Header con gradiente */}
            <div className={`bg-gradient-to-br ${seg.color} p-6 relative overflow-hidden`}>
              {/* Pattern de fondo */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0" style={{
                  backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
                  backgroundSize: '20px 20px'
                }}></div>
              </div>

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                    {seg.icono}
                  </div>
                  <div className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full border border-white/20">
                    <span className="text-xs font-semibold text-white">{seg.badge}</span>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">{seg.titulo}</h3>
                <div className="text-white/90 text-sm">{seg.clientes} clientes</div>
              </div>
            </div>

            {/* Body */}
            <div className="p-6">
              <div className="space-y-4 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">LTV Promedio</span>
                  <span className="text-2xl font-bold text-gray-900">€{seg.ltvPromedio.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">% de Ingresos</span>
                  <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-600">
                    {seg.porcentajeIngresos}%
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${seg.porcentajeIngresos}%` }}
                    transition={{ delay: index * 0.2 + 0.5, duration: 1 }}
                    className={`h-full bg-gradient-to-r ${seg.color} rounded-full`}
                  />
                </div>
              </div>

              {/* Acciones recomendadas */}
              <div className="border-t border-gray-100 pt-4">
                <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Acciones Recomendadas</div>
                <div className="space-y-2">
                  {seg.acciones.map((accion, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{accion}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Botón de acción */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full mt-4 px-4 py-3 bg-gradient-to-r ${seg.color} text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300`}
              >
                Ver Clientes
              </motion.button>
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

      {/* Distribución de LTV con Percentiles */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 mb-8"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            Distribución de LTV
          </h3>
          <div className="flex items-center gap-2">
            <div className="px-3 py-1 bg-gradient-to-r from-green-50 to-emerald-50 rounded-full border border-green-200">
              <span className="text-sm font-bold text-green-700">Top 10% identificados</span>
            </div>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={distribucionLtv}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="rango"
              tick={{ fill: '#6b7280', fontSize: 12 }}
              axisLine={{ stroke: '#d1d5db' }}
            />
            <YAxis
              tick={{ fill: '#6b7280', fontSize: 12 }}
              axisLine={{ stroke: '#d1d5db' }}
              label={{ value: 'Clientes', angle: -90, position: 'insideLeft', fill: '#6b7280' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: 'none',
                borderRadius: '12px',
                boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
              }}
            />
            <Bar dataKey="clientes" radius={[12, 12, 0, 0]}>
              {distribucionLtv.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={
                    index >= 5 ? 'url(#gradientVIP)' :
                    index >= 3 ? 'url(#gradientAlto)' :
                    'url(#gradientMedio)'
                  }
                />
              ))}
            </Bar>
            <defs>
              <linearGradient id="gradientVIP" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#fbbf24" stopOpacity={1}/>
                <stop offset="100%" stopColor="#f59e0b" stopOpacity={1}/>
              </linearGradient>
              <linearGradient id="gradientAlto" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity={1}/>
                <stop offset="100%" stopColor="#059669" stopOpacity={1}/>
              </linearGradient>
              <linearGradient id="gradientMedio" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#60a5fa" stopOpacity={1}/>
                <stop offset="100%" stopColor="#3b82f6" stopOpacity={1}/>
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>

        {/* Percentiles marcados */}
        <div className="mt-6 grid grid-cols-4 gap-4">
          {[
            { label: 'P25', value: '€520', color: 'from-blue-500 to-indigo-600', desc: '25% inferior' },
            { label: 'P50 (Mediana)', value: '€1,250', color: 'from-emerald-500 to-teal-600', desc: 'punto medio' },
            { label: 'P75', value: '€2,100', color: 'from-green-500 to-emerald-600', desc: '25% superior' },
            { label: 'P90', value: '€3,800', color: 'from-yellow-500 to-amber-600', desc: '10% superior' }
          ].map((percentil, i) => (
            <div key={i} className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 border border-gray-200">
              <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">{percentil.label}</div>
              <div className={`text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${percentil.color} mb-1`}>
                {percentil.value}
              </div>
              <div className="text-xs text-gray-600">{percentil.desc}</div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-gradient-to-br from-blue-500 to-indigo-600" />
            <span className="text-gray-700 font-medium">Bajo (&lt;€800)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-gradient-to-br from-emerald-500 to-teal-600" />
            <span className="text-gray-700 font-medium">Medio (€800-€2K)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-gradient-to-br from-yellow-500 to-amber-600" />
            <span className="text-gray-700 font-medium">Alto (€2K+)</span>
          </div>
        </div>
      </motion.div>

      {/* Gráficos principales */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">

        {/* LTV Acumulado por Cohorte - Análisis Temporal */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl">
                <LineChart className="w-5 h-5 text-white" />
              </div>
              LTV Acumulado por Cohorte
            </h3>
            <div className="flex items-center gap-2">
              <div className="px-3 py-1 bg-gradient-to-r from-purple-50 to-pink-50 rounded-full border border-purple-200">
                <span className="text-sm font-bold text-purple-700">Tendencias y Proyecciones</span>
              </div>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={350}>
            <RechartsLineChart data={ltvAcumulado}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="mes"
                tick={{ fill: '#6b7280', fontSize: 12 }}
                axisLine={{ stroke: '#d1d5db' }}
                label={{ value: 'Meses desde registro', position: 'insideBottom', offset: -5, fill: '#6b7280' }}
              />
              <YAxis
                tick={{ fill: '#6b7280', fontSize: 12 }}
                axisLine={{ stroke: '#d1d5db' }}
                label={{ value: 'LTV Acumulado (€)', angle: -90, position: 'insideLeft', fill: '#6b7280' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: 'none',
                  borderRadius: '12px',
                  boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
                }}
              />
              <Legend
                wrapperStyle={{ paddingTop: '20px' }}
                iconType="line"
              />
              <Line
                type="monotone"
                dataKey="Q1"
                stroke="#10b981"
                strokeWidth={3}
                dot={false}
                name="Q1 2024 (más reciente)"
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="Q2"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={false}
                name="Q2 2024"
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="Q3"
                stroke="#8b5cf6"
                strokeWidth={3}
                dot={false}
                name="Q3 2023"
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="Q4"
                stroke="#f59e0b"
                strokeWidth={3}
                dot={false}
                name="Q4 2023 (más antigua)"
                activeDot={{ r: 6 }}
              />
            </RechartsLineChart>
          </ResponsiveContainer>

          {/* Insights de cohortes */}
          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <span className="text-sm font-bold text-green-900">Cohorte Destacada</span>
              </div>
              <div className="text-2xl font-bold text-green-600 mb-1">Q1 2024</div>
              <div className="text-sm text-green-700">+23% mejor LTV vs promedio histórico</div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-bold text-blue-900">Tiempo al Pico</span>
              </div>
              <div className="text-2xl font-bold text-blue-600 mb-1">18 meses</div>
              <div className="text-sm text-blue-700">Punto máximo de valor generado</div>
            </div>
          </div>
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

      {/* Predictor de LTV con IA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 mb-8"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl">
              <Zap className="w-5 h-5 text-white" />
            </div>
            Predictor de LTV con IA
          </h3>
          <div className="px-3 py-1 bg-gradient-to-r from-purple-50 to-pink-50 rounded-full border border-purple-200">
            <span className="text-sm font-bold text-purple-700">Modelo ML v2.1</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Escenarios predictivos */}
          <div className="space-y-4">
            <div className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Escenarios de Predicción</div>

            {[
              {
                tipo: 'Optimista',
                valor: Math.round(kpis.ltvProyectado * 1.2),
                probabilidad: 25,
                color: 'from-green-500 to-emerald-600',
                icon: TrendingUp,
                desc: 'Con mejoras en retención'
              },
              {
                tipo: 'Realista',
                valor: kpis.ltvProyectado,
                probabilidad: 55,
                color: 'from-blue-500 to-indigo-600',
                icon: Target,
                desc: 'Manteniendo tendencia actual'
              },
              {
                tipo: 'Pesimista',
                valor: Math.round(kpis.ltvProyectado * 0.85),
                probabilidad: 20,
                color: 'from-orange-500 to-red-600',
                icon: TrendingDown,
                desc: 'Si aumenta el churn'
              }
            ].map((escenario, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 bg-gradient-to-br ${escenario.color} rounded-xl`}>
                      <escenario.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">{escenario.tipo}</div>
                      <div className="text-xs text-gray-600">{escenario.desc}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${escenario.color}`}>
                      €{escenario.valor.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-500">{escenario.probabilidad}% prob.</div>
                  </div>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${escenario.probabilidad}%` }}
                    transition={{ delay: i * 0.2 + 0.5, duration: 1 }}
                    className={`h-full bg-gradient-to-r ${escenario.color} rounded-full`}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Factores de influencia */}
          <div className="space-y-4">
            <div className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Factores de Influencia en LTV</div>

            {[
              { factor: 'Adherencia al programa', impacto: 92, icon: Activity, color: 'emerald' },
              { factor: 'Frecuencia de uso', impacto: 85, icon: Calendar, color: 'blue' },
              { factor: 'Tipo de membresía', impacto: 78, icon: Crown, color: 'yellow' },
              { factor: 'NPS y satisfacción', impacto: 71, icon: Star, color: 'purple' },
              { factor: 'Canal de adquisición', impacto: 64, icon: Users, color: 'teal' },
              { factor: 'Edad del cliente', impacto: 52, icon: Clock, color: 'gray' }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className={`p-2 bg-${item.color}-100 rounded-lg`}>
                  <item.icon className={`w-4 h-4 text-${item.color}-600`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">{item.factor}</span>
                    <span className={`text-sm font-bold text-${item.color}-600`}>{item.impacto}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.impacto}%` }}
                      transition={{ delay: i * 0.1 + 0.3, duration: 0.8 }}
                      className={`h-full bg-${item.color}-500 rounded-full`}
                    />
                  </div>
                </div>
              </div>
            ))}

            {/* Confianza del modelo */}
            <div className="mt-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold text-purple-900">Confianza del Modelo</span>
                <span className="text-2xl font-bold text-purple-600">87%</span>
              </div>
              <div className="w-full h-3 bg-purple-200 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '87%' }}
                  transition={{ delay: 0.5, duration: 1.2 }}
                  className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full relative"
                >
                  <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
                </motion.div>
              </div>
              <p className="text-xs text-purple-700 mt-2">Basado en 2,847 predicciones históricas</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Simulador de Impacto de Churn */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-6 shadow-xl border border-green-200 mb-8"
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
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50"
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <div className="p-2 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-xl">
              <Trophy className="w-5 h-5 text-white" />
            </div>
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
                className="pl-10 pr-4 py-2 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm"
              />
            </div>
          </div>
        </div>

        {/* Tabs de filtros */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {[
            { key: 'todos', label: 'Todos', count: clientes.length, gradient: 'from-gray-500 to-gray-600', icon: Users },
            { key: 'alto-valor', label: 'VIP', count: clientes.filter(c => c.ltvTotal >= 2000).length, gradient: 'from-yellow-500 to-amber-600', icon: Crown },
            { key: 'riesgo', label: 'En Riesgo', count: clientes.filter(c => c.probabilidadChurn >= 40).length, gradient: 'from-red-500 to-orange-600', icon: AlertTriangle },
            { key: 'nuevos', label: 'Nuevos', count: clientes.filter(c => c.mesesActivo <= 3).length, gradient: 'from-green-500 to-emerald-600', icon: Star }
          ].map(tab => (
            <motion.button
              key={tab.key}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setSelectedTab(tab.key);
                setCurrentPage(1);
              }}
              className={`px-4 py-2 rounded-xl whitespace-nowrap flex items-center gap-2 font-semibold transition-all duration-300 ${
                selectedTab === tab.key
                  ? `bg-gradient-to-r ${tab.gradient} text-white shadow-lg`
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
              <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                selectedTab === tab.key ? 'bg-white/20' : 'bg-gray-200'
              }`}>
                {tab.count}
              </span>
            </motion.button>
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
                      <div className="flex items-center justify-end gap-2">
                        <span className="font-bold text-gray-900">€{cliente.ltvTotal.toLocaleString()}</span>
                        {cliente.ltvTotal >= 3000 && (
                          <div className="px-2 py-0.5 bg-gradient-to-r from-yellow-400 to-amber-500 text-white text-xs font-bold rounded-full">
                            VIP
                          </div>
                        )}
                      </div>
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