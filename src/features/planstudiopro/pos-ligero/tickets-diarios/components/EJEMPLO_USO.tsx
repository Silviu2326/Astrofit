/**
 * EJEMPLO DE USO - Componentes Modernos de Tickets Diarios
 *
 * Este archivo demuestra cómo integrar todos los componentes creados
 * en una página completa de Tickets Diarios.
 */

import React, { useState } from 'react';
import {
  TablaTicketsModerna,
  ModalDetalleTicket,
  FiltrosAvanzados,
  GraficoVentasPorHora,
  AnalisisPorMetodoPago,
  AnalisisPorCajero,
  ProductosMasVendidos
} from './index';

// Datos de ejemplo (reemplazar con datos reales de la API)
const datosEjemplo = {
  tickets: [
    {
      id: '1',
      numeroTicket: '001',
      hora: '10:30',
      cliente: 'Juan Pérez',
      cantidadItems: 3,
      total: 125.50,
      metodoPago: 'tarjeta' as const,
      cajero: 'María García',
      estado: 'completada' as const,
      fecha: '2024-10-03',
      items: [
        {
          id: '1',
          nombre: 'Producto A',
          categoria: 'Electrónica',
          cantidad: 2,
          precioUnitario: 50.00,
          subtotal: 100.00
        }
      ],
      subtotal: 100.00,
      descuentoTotal: 0,
      impuestos: 25.50,
      eventos: [
        {
          id: '1',
          tipo: 'venta',
          descripcion: 'Venta completada',
          usuario: 'María García',
          hora: '10:30'
        }
      ]
    },
    // ... más tickets
  ],

  ventasPorHora: [
    { hora: '09:00', monto: 850.00, tickets: 12 },
    { hora: '10:00', monto: 1200.00, tickets: 18 },
    { hora: '11:00', monto: 950.00, tickets: 15 },
    { hora: '12:00', monto: 1500.00, tickets: 22 },
    { hora: '13:00', monto: 1100.00, tickets: 16 },
    { hora: '14:00', monto: 800.00, tickets: 10 },
    { hora: '15:00', monto: 1300.00, tickets: 20 },
    { hora: '16:00', monto: 1450.00, tickets: 21 },
  ],

  ventasPorMetodoPago: [
    { metodo: 'efectivo', monto: 3500.00, tickets: 45 },
    { metodo: 'tarjeta', monto: 5200.00, tickets: 68 },
    { metodo: 'transferencia', monto: 2100.00, tickets: 28 },
    { metodo: 'credito', monto: 1350.00, tickets: 18 },
  ],

  rendimientoCajeros: [
    {
      id: '1',
      nombre: 'María García',
      avatar: '👩',
      ticketsProcesados: 45,
      totalVendido: 4800.00,
      ticketPromedio: 106.67,
      reembolsos: 2
    },
    {
      id: '2',
      nombre: 'Carlos López',
      avatar: '👨',
      ticketsProcesados: 38,
      totalVendido: 3950.00,
      ticketPromedio: 103.95,
      reembolsos: 1
    },
    {
      id: '3',
      nombre: 'Ana Martínez',
      avatar: '👩',
      ticketsProcesados: 52,
      totalVendido: 5400.00,
      ticketPromedio: 103.85,
      reembolsos: 0
    },
  ],

  productosMasVendidos: [
    {
      id: '1',
      nombre: 'Laptop HP Core i5',
      emoji: '💻',
      categoria: 'Electrónica',
      unidadesVendidas: 24,
      revenue: 18500.00,
      porcentajeTotal: 28.5
    },
    {
      id: '2',
      nombre: 'Mouse Inalámbrico',
      emoji: '🖱️',
      categoria: 'Accesorios',
      unidadesVendidas: 45,
      revenue: 1350.00,
      porcentajeTotal: 15.2
    },
    {
      id: '3',
      nombre: 'Teclado Mecánico',
      emoji: '⌨️',
      categoria: 'Accesorios',
      unidadesVendidas: 32,
      revenue: 3200.00,
      porcentajeTotal: 12.8
    },
    {
      id: '4',
      nombre: 'Monitor 24"',
      emoji: '🖥️',
      categoria: 'Electrónica',
      unidadesVendidas: 18,
      revenue: 5400.00,
      porcentajeTotal: 10.5
    },
    {
      id: '5',
      nombre: 'Auriculares Bluetooth',
      emoji: '🎧',
      categoria: 'Audio',
      unidadesVendidas: 38,
      revenue: 2850.00,
      porcentajeTotal: 8.9
    },
    {
      id: '6',
      nombre: 'Webcam HD',
      emoji: '📹',
      categoria: 'Accesorios',
      unidadesVendidas: 22,
      revenue: 1980.00,
      porcentajeTotal: 6.7
    },
    {
      id: '7',
      nombre: 'Cable USB-C',
      emoji: '🔌',
      categoria: 'Cables',
      unidadesVendidas: 65,
      revenue: 975.00,
      porcentajeTotal: 5.4
    },
    {
      id: '8',
      nombre: 'SSD 500GB',
      emoji: '💾',
      categoria: 'Almacenamiento',
      unidadesVendidas: 15,
      revenue: 2250.00,
      porcentajeTotal: 4.8
    },
    {
      id: '9',
      nombre: 'Mousepad Gaming',
      emoji: '🎮',
      categoria: 'Gaming',
      unidadesVendidas: 28,
      revenue: 840.00,
      porcentajeTotal: 3.6
    },
    {
      id: '10',
      nombre: 'Hub USB 4 puertos',
      emoji: '🔗',
      categoria: 'Accesorios',
      unidadesVendidas: 19,
      revenue: 665.00,
      porcentajeTotal: 2.9
    },
  ]
};

const EjemploTicketsDiariosPage: React.FC = () => {
  const [ticketSeleccionado, setTicketSeleccionado] = useState<any>(null);
  const [mostrarFiltros, setMostrarFiltros] = useState(false);
  const [ticketsFiltrados, setTicketsFiltrados] = useState(datosEjemplo.tickets);

  const handleFiltrar = (filtros: any) => {
    // Aquí implementar la lógica de filtrado real
    console.log('Filtros aplicados:', filtros);
    // Ejemplo simple de filtrado
    let resultado = [...datosEjemplo.tickets];

    if (filtros.cliente) {
      resultado = resultado.filter(t =>
        t.cliente.toLowerCase().includes(filtros.cliente.toLowerCase())
      );
    }

    if (filtros.estados.length > 0) {
      resultado = resultado.filter(t => filtros.estados.includes(t.estado));
    }

    setTicketsFiltrados(resultado);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/30 p-6 space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl shadow-2xl p-8 text-white">
        <h1 className="text-4xl font-bold mb-2">Tickets Diarios</h1>
        <p className="text-blue-100">Análisis completo de ventas y transacciones del día</p>
      </div>

      {/* Tabla de Tickets */}
      <TablaTicketsModerna
        tickets={ticketsFiltrados}
        onSeleccionarTicket={setTicketSeleccionado}
        onToggleFiltros={() => setMostrarFiltros(true)}
      />

      {/* Sección de Gráficos y Análisis */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <GraficoVentasPorHora datos={datosEjemplo.ventasPorHora} />
        <AnalisisPorMetodoPago datos={datosEjemplo.ventasPorMetodoPago} />
      </div>

      {/* Análisis por Cajero */}
      <AnalisisPorCajero datos={datosEjemplo.rendimientoCajeros} />

      {/* Productos Más Vendidos */}
      <ProductosMasVendidos datos={datosEjemplo.productosMasVendidos} />

      {/* Modal de Detalle de Ticket */}
      {ticketSeleccionado && (
        <ModalDetalleTicket
          ticket={ticketSeleccionado}
          onCerrar={() => setTicketSeleccionado(null)}
        />
      )}

      {/* Panel de Filtros Avanzados */}
      {mostrarFiltros && (
        <FiltrosAvanzados
          tickets={datosEjemplo.tickets}
          onFiltrar={handleFiltrar}
          onCerrar={() => setMostrarFiltros(false)}
        />
      )}
    </div>
  );
};

export default EjemploTicketsDiariosPage;

/**
 * INSTRUCCIONES DE INTEGRACIÓN:
 *
 * 1. Importar los componentes necesarios desde './components'
 *
 * 2. Preparar los datos desde la API o estado global:
 *    - tickets: Array de objetos con información de cada ticket
 *    - ventasPorHora: Array con datos de ventas agrupados por hora
 *    - ventasPorMetodoPago: Array con distribución por método de pago
 *    - rendimientoCajeros: Array con métricas por cajero
 *    - productosMasVendidos: Array con top 10 productos
 *
 * 3. Manejar estados locales:
 *    - ticketSeleccionado: Para el modal de detalle
 *    - mostrarFiltros: Para el panel de filtros
 *    - ticketsFiltrados: Para los resultados filtrados
 *
 * 4. Implementar funciones de manejo:
 *    - handleFiltrar: Aplicar filtros a los tickets
 *    - handleSeleccionarTicket: Mostrar detalle de un ticket
 *
 * 5. Asegurar que Recharts esté instalado:
 *    npm install recharts
 *
 * 6. Verificar que framer-motion esté instalado:
 *    npm install framer-motion
 *
 * 7. Verificar que lucide-react esté instalado:
 *    npm install lucide-react
 */
