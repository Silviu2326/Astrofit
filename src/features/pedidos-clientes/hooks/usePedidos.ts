import { useState, useMemo } from 'react';
import type { Pedido, FiltrosPedidos, EstadisticasPedidos, EstadoPedido } from '../types';

export const usePedidos = () => {
  const [filtros, setFiltros] = useState<FiltrosPedidos>({});

  // Datos de ejemplo
  const pedidosEjemplo: Pedido[] = [
    {
      id: '1',
      numeroPedido: 'PED-2025-001',
      cliente: {
        id: 'c1',
        nombre: 'Ana García',
        email: 'ana.garcia@email.com',
        telefono: '+34 612 345 678'
      },
      productos: [
        {
          id: 'p1',
          nombre: 'Laptop HP ProBook',
          sku: 'HP-PB-450',
          cantidad: 1,
          precioUnitario: 899.99,
          subtotal: 899.99
        },
        {
          id: 'p2',
          nombre: 'Mouse Logitech MX Master',
          sku: 'LOG-MX-3',
          cantidad: 2,
          precioUnitario: 89.99,
          subtotal: 179.98
        }
      ],
      direccionEnvio: {
        nombre: 'Ana García',
        telefono: '+34 612 345 678',
        direccion: 'Calle Mayor 123, Piso 4B',
        ciudad: 'Madrid',
        codigoPostal: '28013',
        pais: 'España',
        notas: 'Llamar antes de entregar'
      },
      estado: 'en_transito',
      prioridad: 'alta',
      subtotal: 1079.97,
      envio: 9.99,
      impuestos: 227.79,
      total: 1317.75,
      metodoPago: 'tarjeta',
      fechaPedido: new Date('2025-01-15T10:30:00'),
      fechaEstimadaEntrega: new Date('2025-01-20T18:00:00'),
      seguimiento: 'ES1234567890ABC',
      empresa: 'DHL Express',
      historialEnvio: [
        {
          fecha: new Date('2025-01-17T14:30:00'),
          estado: 'en_transito',
          ubicacion: 'Centro de distribución Madrid',
          descripcion: 'Paquete en tránsito hacia destino final',
          responsable: 'Juan Pérez'
        },
        {
          fecha: new Date('2025-01-16T09:15:00'),
          estado: 'enviado',
          ubicacion: 'Almacén central Barcelona',
          descripcion: 'Paquete enviado desde almacén',
          responsable: 'María López'
        },
        {
          fecha: new Date('2025-01-15T11:00:00'),
          estado: 'procesando',
          ubicacion: 'Almacén central Barcelona',
          descripcion: 'Pedido en preparación',
          responsable: 'Carlos Ruiz'
        },
        {
          fecha: new Date('2025-01-15T10:30:00'),
          estado: 'pendiente',
          descripcion: 'Pedido recibido y confirmado',
          responsable: 'Sistema'
        }
      ],
      mensajes: [
        {
          id: 'm1',
          pedidoId: '1',
          remitente: 'cliente',
          nombreRemitente: 'Ana García',
          mensaje: '¿Cuándo llegará mi pedido? Lo necesito para el lunes.',
          fecha: new Date('2025-01-17T15:00:00'),
          leido: true
        },
        {
          id: 'm2',
          pedidoId: '1',
          remitente: 'empresa',
          nombreRemitente: 'Equipo de Soporte',
          mensaje: 'Hola Ana, tu pedido está en tránsito y llegará el viernes como máximo. ¡Gracias por tu paciencia!',
          fecha: new Date('2025-01-17T15:30:00'),
          leido: true
        }
      ]
    },
    {
      id: '2',
      numeroPedido: 'PED-2025-002',
      cliente: {
        id: 'c2',
        nombre: 'Carlos Martínez',
        email: 'carlos.m@email.com',
        telefono: '+34 623 456 789'
      },
      productos: [
        {
          id: 'p3',
          nombre: 'Monitor Samsung 27"',
          sku: 'SAM-MON-27',
          cantidad: 2,
          precioUnitario: 299.99,
          subtotal: 599.98
        }
      ],
      direccionEnvio: {
        nombre: 'Carlos Martínez',
        telefono: '+34 623 456 789',
        direccion: 'Avenida Diagonal 456',
        ciudad: 'Barcelona',
        codigoPostal: '08006',
        pais: 'España'
      },
      estado: 'procesando',
      prioridad: 'normal',
      subtotal: 599.98,
      envio: 12.99,
      impuestos: 128.81,
      total: 741.78,
      metodoPago: 'paypal',
      fechaPedido: new Date('2025-01-18T14:20:00'),
      fechaEstimadaEntrega: new Date('2025-01-23T18:00:00'),
      historialEnvio: [
        {
          fecha: new Date('2025-01-18T15:00:00'),
          estado: 'procesando',
          ubicacion: 'Almacén central Madrid',
          descripcion: 'Pedido confirmado y en preparación',
          responsable: 'Laura Sánchez'
        },
        {
          fecha: new Date('2025-01-18T14:20:00'),
          estado: 'pendiente',
          descripcion: 'Pedido recibido',
          responsable: 'Sistema'
        }
      ],
      mensajes: []
    },
    {
      id: '3',
      numeroPedido: 'PED-2025-003',
      cliente: {
        id: 'c3',
        nombre: 'Laura Fernández',
        email: 'laura.f@email.com',
        telefono: '+34 634 567 890'
      },
      productos: [
        {
          id: 'p4',
          nombre: 'Teclado Mecánico RGB',
          sku: 'KEY-RGB-X1',
          cantidad: 1,
          precioUnitario: 149.99,
          subtotal: 149.99
        }
      ],
      direccionEnvio: {
        nombre: 'Laura Fernández',
        telefono: '+34 634 567 890',
        direccion: 'Calle Valencia 78',
        ciudad: 'Valencia',
        codigoPostal: '46002',
        pais: 'España'
      },
      estado: 'entregado',
      prioridad: 'normal',
      subtotal: 149.99,
      envio: 4.99,
      impuestos: 32.55,
      total: 187.53,
      metodoPago: 'tarjeta',
      fechaPedido: new Date('2025-01-10T09:15:00'),
      fechaEntrega: new Date('2025-01-13T11:30:00'),
      seguimiento: 'ES9876543210XYZ',
      empresa: 'Correos Express',
      historialEnvio: [
        {
          fecha: new Date('2025-01-13T11:30:00'),
          estado: 'entregado',
          ubicacion: 'Calle Valencia 78, Valencia',
          descripcion: 'Paquete entregado al destinatario',
          responsable: 'Pedro González'
        },
        {
          fecha: new Date('2025-01-12T08:00:00'),
          estado: 'en_transito',
          ubicacion: 'Centro de distribución Valencia',
          descripcion: 'En reparto',
          responsable: 'Pedro González'
        },
        {
          fecha: new Date('2025-01-11T16:00:00'),
          estado: 'enviado',
          ubicacion: 'Almacén central Madrid',
          descripcion: 'Paquete enviado',
          responsable: 'Ana Morales'
        },
        {
          fecha: new Date('2025-01-10T10:00:00'),
          estado: 'procesando',
          ubicacion: 'Almacén central Madrid',
          descripcion: 'Preparando pedido',
          responsable: 'Sistema'
        },
        {
          fecha: new Date('2025-01-10T09:15:00'),
          estado: 'pendiente',
          descripcion: 'Pedido confirmado',
          responsable: 'Sistema'
        }
      ],
      mensajes: [
        {
          id: 'm3',
          pedidoId: '3',
          remitente: 'cliente',
          nombreRemitente: 'Laura Fernández',
          mensaje: '¡Producto recibido en perfectas condiciones! Muchas gracias',
          fecha: new Date('2025-01-13T12:00:00'),
          leido: true
        }
      ]
    },
    {
      id: '4',
      numeroPedido: 'PED-2025-004',
      cliente: {
        id: 'c4',
        nombre: 'Miguel Ángel Torres',
        email: 'miguel.torres@email.com',
        telefono: '+34 645 678 901'
      },
      productos: [
        {
          id: 'p5',
          nombre: 'Webcam Logitech 4K',
          sku: 'LOG-WC-4K',
          cantidad: 1,
          precioUnitario: 199.99,
          subtotal: 199.99
        },
        {
          id: 'p6',
          nombre: 'Micrófono Blue Yeti',
          sku: 'BLUE-YETI',
          cantidad: 1,
          precioUnitario: 129.99,
          subtotal: 129.99
        }
      ],
      direccionEnvio: {
        nombre: 'Miguel Ángel Torres',
        telefono: '+34 645 678 901',
        direccion: 'Plaza España 15',
        ciudad: 'Sevilla',
        codigoPostal: '41013',
        pais: 'España'
      },
      estado: 'pendiente',
      prioridad: 'urgente',
      subtotal: 329.98,
      envio: 7.99,
      impuestos: 71.08,
      total: 409.05,
      metodoPago: 'transferencia',
      fechaPedido: new Date('2025-01-19T16:45:00'),
      fechaEstimadaEntrega: new Date('2025-01-22T18:00:00'),
      historialEnvio: [
        {
          fecha: new Date('2025-01-19T16:45:00'),
          estado: 'pendiente',
          descripcion: 'Pedido recibido, esperando confirmación de pago',
          responsable: 'Sistema'
        }
      ],
      mensajes: [
        {
          id: 'm4',
          pedidoId: '4',
          remitente: 'cliente',
          nombreRemitente: 'Miguel Ángel Torres',
          mensaje: 'He realizado la transferencia. ¿Cuánto tardan en confirmarla?',
          fecha: new Date('2025-01-19T17:00:00'),
          leido: false
        }
      ]
    }
  ];

  const [pedidos, setPedidos] = useState<Pedido[]>(pedidosEjemplo);

  // Aplicar filtros
  const pedidosFiltrados = useMemo(() => {
    return pedidos.filter(pedido => {
      // Filtro por estado
      if (filtros.estado && filtros.estado.length > 0) {
        if (!filtros.estado.includes(pedido.estado)) return false;
      }

      // Filtro por prioridad
      if (filtros.prioridad && filtros.prioridad.length > 0) {
        if (!filtros.prioridad.includes(pedido.prioridad)) return false;
      }

      // Filtro por método de pago
      if (filtros.metodoPago && filtros.metodoPago.length > 0) {
        if (!filtros.metodoPago.includes(pedido.metodoPago)) return false;
      }

      // Filtro por fecha desde
      if (filtros.fechaDesde) {
        if (new Date(pedido.fechaPedido) < filtros.fechaDesde) return false;
      }

      // Filtro por fecha hasta
      if (filtros.fechaHasta) {
        if (new Date(pedido.fechaPedido) > filtros.fechaHasta) return false;
      }

      return true;
    });
  }, [pedidos, filtros]);

  // Calcular estadísticas
  const estadisticas: EstadisticasPedidos = useMemo(() => {
    return {
      total: pedidos.length,
      pendientes: pedidos.filter(p => p.estado === 'pendiente').length,
      procesando: pedidos.filter(p => p.estado === 'procesando').length,
      enviados: pedidos.filter(p => p.estado === 'enviado' || p.estado === 'en_transito').length,
      entregados: pedidos.filter(p => p.estado === 'entregado').length,
      cancelados: pedidos.filter(p => p.estado === 'cancelado').length,
      ingresosTotales: pedidos.reduce((sum, p) => sum + p.total, 0),
      ticketPromedio: pedidos.length > 0
        ? pedidos.reduce((sum, p) => sum + p.total, 0) / pedidos.length
        : 0
    };
  }, [pedidos]);

  const actualizarEstado = (pedidoId: string, nuevoEstado: EstadoPedido) => {
    setPedidos(pedidos.map(pedido => {
      if (pedido.id === pedidoId) {
        const nuevoEvento = {
          fecha: new Date(),
          estado: nuevoEstado,
          descripcion: `Estado actualizado a ${nuevoEstado}`,
          responsable: 'Sistema'
        };

        return {
          ...pedido,
          estado: nuevoEstado,
          historialEnvio: [nuevoEvento, ...pedido.historialEnvio]
        };
      }
      return pedido;
    }));
  };

  return {
    pedidos: pedidosFiltrados,
    estadisticas,
    filtros,
    setFiltros,
    actualizarEstado
  };
};
