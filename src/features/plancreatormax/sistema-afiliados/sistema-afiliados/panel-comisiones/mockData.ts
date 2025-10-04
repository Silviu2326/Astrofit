// Datos mockeados para el Panel de Comisiones

export interface Comision {
  id: string;
  afiliadoId: string;
  afiliadoNombre: string;
  afiliadoAvatar: string;
  fechaVenta: string;
  clienteReferido: string;
  productoVendido: string;
  valorVenta: number;
  porcentajeComision: number;
  montoComision: number;
  estado: 'pendiente_validacion' | 'aprobada' | 'pagada' | 'revertida';
  fechaPago?: string;
  tier: 'bronce' | 'plata' | 'oro' | 'platino';
  metodoPago?: 'transferencia' | 'paypal' | 'stripe' | 'wire';
  referenciaPago?: string;
  motivoRevision?: string;
  esRecurrente: boolean;
}

export interface Afiliado {
  id: string;
  nombre: string;
  avatar: string;
  tier: 'bronce' | 'plata' | 'oro' | 'platino';
  totalGenerado: number;
  pendientePago: number;
  ultimoPago: string;
  metodoPagoPreferido: 'transferencia' | 'paypal' | 'stripe' | 'wire';
  email: string;
}

export interface HistorialPago {
  id: string;
  fecha: string;
  afiliados: string[];
  montoTotal: number;
  metodoPago: 'transferencia' | 'paypal' | 'stripe' | 'wire';
  referencia: string;
  estado: 'completado' | 'fallido' | 'pendiente';
  comisionesIds: string[];
}

// Nombres para generar datos aleatorios
const nombresAfiliados = [
  'Carlos Méndez', 'Ana García', 'Luis Rodríguez', 'María López', 'José Martínez',
  'Laura Fernández', 'Pedro Sánchez', 'Carmen Torres', 'Miguel Ángel', 'Isabel Ramírez',
  'Javier Navarro', 'Rosa Morales', 'Antonio Jiménez', 'Lucía Ruiz', 'Francisco Díaz',
  'Elena Castro', 'Manuel Vargas', 'Patricia Romero', 'Sergio Iglesias', 'Marta Silva',
  'Alberto Gutiérrez', 'Cristina Muñoz', 'David Ortiz', 'Beatriz Santos', 'Raúl Moreno',
  'Silvia Ramos', 'Andrés Álvarez', 'Teresa Gil', 'Roberto Molina', 'Pilar Serrano',
  'Fernando Blanco', 'Mónica Suárez', 'Julio Castro', 'Nuria Vega', 'Óscar Guerrero',
  'Alicia Prieto', 'Víctor Rubio', 'Dolores Sanz', 'Enrique Pascual', 'Gloria Márquez',
  'Rafael Domínguez', 'Yolanda Herrera', 'Alejandro Nieto', 'Inés Medina', 'Pablo León',
  'Rosario Cortés', 'Gonzalo Delgado', 'Amparo Vidal', 'Jorge Aguilar', 'Concepción Rojas'
];

const clientes = [
  'TechCorp SA', 'Digital Solutions Ltd', 'Innovation Hub', 'Smart Systems', 'Cloud Ventures',
  'Data Analytics Co', 'Mobile First Inc', 'Web Services Pro', 'AI Solutions', 'Blockchain Labs',
  'E-Commerce Plus', 'Marketing Digital Pro', 'Social Media Expert', 'SEO Masters', 'Content Creators',
  'Design Studio', 'Development Team', 'Consulting Group', 'Training Academy', 'Business Intelligence',
  'Startup Accelerator', 'Venture Capital', 'Growth Hacking', 'Product Management', 'Agile Coaching',
  'DevOps Engineers', 'Cyber Security', 'Network Solutions', 'Database Experts', 'API Developers',
  'UX Designers', 'UI Specialists', 'Frontend Masters', 'Backend Gurus', 'Full Stack Pros',
  'Mobile Apps Co', 'Game Development', 'AR/VR Studio', 'IoT Solutions', 'Robotics Lab',
  'Machine Learning', 'Deep Learning Co', 'Natural Language', 'Computer Vision', 'Data Science',
  'Business Analytics', 'Financial Tech', 'InsurTech', 'HealthTech', 'EduTech', 'LegalTech'
];

const productos = [
  'Plan Premium Mensual', 'Plan Premium Anual', 'Plan Business Mensual', 'Plan Business Anual',
  'Plan Enterprise', 'Curso Completo Marketing', 'Curso Avanzado SEO', 'Masterclass Digital',
  'Consultoría Personalizada', 'Paquete de Diseño', 'Desarrollo Web Custom', 'App Móvil',
  'Estrategia de Contenido', 'Gestión de Redes Sociales', 'Campaña Publicitaria',
  'Análisis de Datos', 'Dashboard Personalizado', 'Integración API', 'Sistema CRM',
  'Plataforma E-Learning', 'Tienda Online', 'Sistema de Reservas', 'Portal Corporativo',
  'Intranet Empresarial', 'Sistema de Gestión', 'Software ERP', 'Solución CRM',
  'Automatización Marketing', 'Email Marketing Pro', 'Landing Pages Pack'
];

const tiers: Array<'bronce' | 'plata' | 'oro' | 'platino'> = ['bronce', 'plata', 'oro', 'platino'];
const estados: Array<'pendiente_validacion' | 'aprobada' | 'pagada' | 'revertida'> = [
  'pendiente_validacion', 'aprobada', 'pagada', 'revertida'
];

// Generar comisiones mockeadas (300 registros)
const generarComisiones = (): Comision[] => {
  const comisiones: Comision[] = [];
  const fechaInicio = new Date('2024-01-01');
  const fechaFin = new Date('2025-10-10');

  for (let i = 0; i < 300; i++) {
    const tierAleatorio = tiers[Math.floor(Math.random() * tiers.length)];
    const estadoAleatorio = estados[Math.floor(Math.random() * 10)] || 'pagada'; // 90% pagadas, 10% otros

    // Distribuir estados de forma más realista
    let estado: Comision['estado'];
    const rand = Math.random();
    if (rand < 0.65) estado = 'pagada';
    else if (rand < 0.80) estado = 'aprobada';
    else if (rand < 0.92) estado = 'pendiente_validacion';
    else estado = 'revertida';

    const fechaVenta = new Date(
      fechaInicio.getTime() + Math.random() * (fechaFin.getTime() - fechaInicio.getTime())
    );

    const valorVenta = Math.floor(Math.random() * 4500) + 50;
    let porcentajeComision = 0.10; // bronce
    if (tierAleatorio === 'plata') porcentajeComision = 0.12;
    if (tierAleatorio === 'oro') porcentajeComision = 0.15;
    if (tierAleatorio === 'platino') porcentajeComision = 0.20;

    const montoComision = parseFloat((valorVenta * porcentajeComision).toFixed(2));

    const comision: Comision = {
      id: `COM-${String(i + 1).padStart(6, '0')}`,
      afiliadoId: `AFF-${String(Math.floor(Math.random() * 50) + 1).padStart(4, '0')}`,
      afiliadoNombre: nombresAfiliados[Math.floor(Math.random() * nombresAfiliados.length)],
      afiliadoAvatar: `https://i.pravatar.cc/150?u=${i}`,
      fechaVenta: fechaVenta.toISOString().split('T')[0],
      clienteReferido: clientes[Math.floor(Math.random() * clientes.length)],
      productoVendido: productos[Math.floor(Math.random() * productos.length)],
      valorVenta,
      porcentajeComision,
      montoComision,
      estado,
      tier: tierAleatorio,
      esRecurrente: Math.random() > 0.7
    };

    // Si está pagada, agregar fecha de pago y método
    if (estado === 'pagada') {
      const diasDespues = Math.floor(Math.random() * 30) + 7;
      const fechaPago = new Date(fechaVenta);
      fechaPago.setDate(fechaPago.getDate() + diasDespues);
      comision.fechaPago = fechaPago.toISOString().split('T')[0];
      const metodos: Array<'transferencia' | 'paypal' | 'stripe' | 'wire'> = ['transferencia', 'paypal', 'stripe', 'wire'];
      comision.metodoPago = metodos[Math.floor(Math.random() * metodos.length)];
      comision.referenciaPago = `REF-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    }

    // Si está pendiente de validación, agregar motivo
    if (estado === 'pendiente_validacion') {
      const motivos = [
        'Primera venta del afiliado',
        'Monto superior a $500',
        'Cliente nuevo - requiere verificación',
        'Posible transacción fraudulenta detectada',
        'Revisión de seguridad rutinaria'
      ];
      comision.motivoRevision = motivos[Math.floor(Math.random() * motivos.length)];
    }

    comisiones.push(comision);
  }

  // Ordenar por fecha de venta (más recientes primero)
  return comisiones.sort((a, b) => new Date(b.fechaVenta).getTime() - new Date(a.fechaVenta).getTime());
};

// Generar afiliados únicos
const generarAfiliados = (comisiones: Comision[]): Afiliado[] => {
  const afiliadosMap = new Map<string, Afiliado>();

  comisiones.forEach((comision) => {
    if (!afiliadosMap.has(comision.afiliadoId)) {
      afiliadosMap.set(comision.afiliadoId, {
        id: comision.afiliadoId,
        nombre: comision.afiliadoNombre,
        avatar: comision.afiliadoAvatar,
        tier: comision.tier,
        totalGenerado: 0,
        pendientePago: 0,
        ultimoPago: '',
        metodoPagoPreferido: 'paypal',
        email: `${comision.afiliadoNombre.toLowerCase().replace(' ', '.')}@example.com`
      });
    }

    const afiliado = afiliadosMap.get(comision.afiliadoId)!;
    afiliado.totalGenerado += comision.montoComision;

    if (comision.estado === 'aprobada' || comision.estado === 'pendiente_validacion') {
      afiliado.pendientePago += comision.montoComision;
    }

    if (comision.estado === 'pagada' && comision.fechaPago) {
      if (!afiliado.ultimoPago || comision.fechaPago > afiliado.ultimoPago) {
        afiliado.ultimoPago = comision.fechaPago;
        afiliado.metodoPagoPreferido = comision.metodoPago || 'paypal';
      }
    }
  });

  return Array.from(afiliadosMap.values()).sort((a, b) => b.totalGenerado - a.totalGenerado);
};

// Generar historial de pagos
const generarHistorialPagos = (comisiones: Comision[]): HistorialPago[] => {
  const historial: HistorialPago[] = [];
  const comisionesPagadas = comisiones.filter(c => c.estado === 'pagada' && c.fechaPago);

  // Agrupar por fecha de pago
  const porFecha = new Map<string, Comision[]>();
  comisionesPagadas.forEach(c => {
    const fecha = c.fechaPago!;
    if (!porFecha.has(fecha)) {
      porFecha.set(fecha, []);
    }
    porFecha.get(fecha)!.push(c);
  });

  // Crear registros de historial
  let index = 1;
  Array.from(porFecha.entries())
    .sort(([a], [b]) => new Date(b).getTime() - new Date(a).getTime())
    .forEach(([fecha, coms]) => {
      const metodos: Array<'transferencia' | 'paypal' | 'stripe' | 'wire'> = ['transferencia', 'paypal', 'stripe', 'wire'];
      historial.push({
        id: `PAY-${String(index++).padStart(5, '0')}`,
        fecha,
        afiliados: Array.from(new Set(coms.map(c => c.afiliadoNombre))),
        montoTotal: coms.reduce((sum, c) => sum + c.montoComision, 0),
        metodoPago: metodos[Math.floor(Math.random() * metodos.length)],
        referencia: `BATCH-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
        estado: Math.random() > 0.05 ? 'completado' : (Math.random() > 0.5 ? 'pendiente' : 'fallido'),
        comisionesIds: coms.map(c => c.id)
      });
    });

  return historial.slice(0, 50); // Limitar a últimos 50 pagos
};

// Exportar datos
export const mockComisiones = generarComisiones();
export const mockAfiliados = generarAfiliados(mockComisiones);
export const mockHistorialPagos = generarHistorialPagos(mockComisiones);

// Estadísticas generales
export const estadisticasGenerales = {
  totalComisionesGeneradas: mockComisiones.reduce((sum, c) => sum + c.montoComision, 0),
  pendientesDePago: mockComisiones
    .filter(c => c.estado === 'aprobada' || c.estado === 'pendiente_validacion')
    .reduce((sum, c) => sum + c.montoComision, 0),
  pagadasEsteMes: mockComisiones
    .filter(c => {
      if (c.estado !== 'pagada' || !c.fechaPago) return false;
      const fecha = new Date(c.fechaPago);
      const hoy = new Date();
      return fecha.getMonth() === hoy.getMonth() && fecha.getFullYear() === hoy.getFullYear();
    })
    .reduce((sum, c) => sum + c.montoComision, 0),
  proximoPago: '2025-10-15'
};
