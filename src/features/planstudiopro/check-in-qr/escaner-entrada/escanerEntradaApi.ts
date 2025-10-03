// Tipos
export interface MiembroInfo {
  id: string;
  nombre: string;
  email: string;
  telefono: string;
  avatar?: string;
  membresia: {
    tipo: 'Mensual' | 'Anual' | 'Premium' | 'VIP' | 'Pase Día' | 'Pack 10 Clases';
    estado: 'activo' | 'vencido' | 'por-vencer';
    fechaInicio: string;
    fechaVencimiento: string;
    creditos?: number;
    creditosTotales?: number;
  };
  clase?: {
    nombre: string;
    horario: string;
    coach: string;
    tieneReserva: boolean;
  };
  qrCode: string;
}

export interface CheckInRegistro {
  id: string;
  miembroId: string;
  timestamp: Date;
  exitoso: boolean;
  tipoAlerta?: 'sin-creditos' | 'sin-reserva' | 'membresia-vencida' | 'restriccion-horario';
  claseId?: string;
  esWalkIn: boolean;
}

export interface ClaseActual {
  id: string;
  nombre: string;
  horario: string;
  coach: string;
  capacidadTotal: number;
  inscritos: number;
  checkedIn: number;
}

export interface EstadisticasHoy {
  checkInsHoy: number;
  checkInsUltimaHora: number;
  promedioCheckIn: string;
  capacidadActual: number;
  capacidadMaxima: number;
}

export interface EscaneoResultado {
  exitoso: boolean;
  miembro?: MiembroInfo;
  alerta?: {
    tipo: 'membresia-vencida' | 'sin-creditos' | 'sin-reserva' | 'clase-llena' | 'restriccion-horario' | 'codigo-invalido' | 'codigo-usado-hoy';
    mensaje: string;
    sugerencia?: string;
  };
}

// Datos mockeados
const nombres = ['Carlos', 'María', 'Juan', 'Ana', 'Pedro', 'Laura', 'Diego', 'Sofia', 'Miguel', 'Valentina', 'Andrés', 'Camila', 'Luis', 'Isabella', 'Jorge', 'Martina', 'Fernando', 'Luciana', 'Roberto', 'Daniela'];
const apellidos = ['García', 'Rodríguez', 'Martínez', 'López', 'González', 'Pérez', 'Sánchez', 'Ramírez', 'Torres', 'Flores', 'Rivera', 'Gómez', 'Díaz', 'Cruz', 'Morales', 'Reyes', 'Jiménez', 'Hernández', 'Ruiz', 'Vargas'];
const clasesDisponibles = [
  { nombre: 'Yoga Flow', horario: '07:00 AM', coach: 'Ana Martínez' },
  { nombre: 'HIIT Intenso', horario: '08:00 AM', coach: 'Carlos Ruiz' },
  { nombre: 'Spinning', horario: '09:00 AM', coach: 'Laura Gómez' },
  { nombre: 'CrossFit', horario: '10:00 AM', coach: 'Diego Torres' },
  { nombre: 'Pilates', horario: '11:00 AM', coach: 'Sofia Reyes' },
  { nombre: 'Funcional', horario: '06:00 PM', coach: 'Miguel Díaz' },
  { nombre: 'Boxing', horario: '07:00 PM', coach: 'Pedro López' },
  { nombre: 'Zumba', horario: '08:00 PM', coach: 'Valentina Cruz' },
];

// Generar miembros
const generarMiembros = (): MiembroInfo[] => {
  const miembros: MiembroInfo[] = [];
  const tiposMembresia: Array<'Mensual' | 'Anual' | 'Premium' | 'VIP' | 'Pase Día' | 'Pack 10 Clases'> = ['Mensual', 'Anual', 'Premium', 'VIP', 'Pase Día', 'Pack 10 Clases'];

  for (let i = 0; i < 80; i++) {
    const nombre = `${nombres[Math.floor(Math.random() * nombres.length)]} ${apellidos[Math.floor(Math.random() * apellidos.length)]}`;
    const tipo = tiposMembresia[Math.floor(Math.random() * tiposMembresia.length)];

    // Estado de membresía (70% activo, 15% vencido, 15% por vencer)
    const rand = Math.random();
    let estado: 'activo' | 'vencido' | 'por-vencer';
    let fechaVencimiento: Date;

    if (rand < 0.7) {
      estado = 'activo';
      fechaVencimiento = new Date(Date.now() + (30 + Math.random() * 300) * 24 * 60 * 60 * 1000);
    } else if (rand < 0.85) {
      estado = 'por-vencer';
      fechaVencimiento = new Date(Date.now() + Math.random() * 5 * 24 * 60 * 60 * 1000);
    } else {
      estado = 'vencido';
      fechaVencimiento = new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000);
    }

    const fechaInicio = new Date(fechaVencimiento.getTime() - 365 * 24 * 60 * 60 * 1000);

    // Créditos para pases de clase
    let creditos, creditosTotales;
    if (tipo === 'Pack 10 Clases') {
      creditosTotales = 10;
      creditos = Math.floor(Math.random() * 11);
    } else if (tipo === 'Pase Día') {
      creditosTotales = 1;
      creditos = Math.random() > 0.5 ? 1 : 0;
    }

    // 60% tiene clase asignada
    let clase;
    if (Math.random() < 0.6) {
      const claseSeleccionada = clasesDisponibles[Math.floor(Math.random() * clasesDisponibles.length)];
      clase = {
        ...claseSeleccionada,
        tieneReserva: Math.random() > 0.15 // 85% tiene reserva
      };
    }

    miembros.push({
      id: `MEM${String(i + 1).padStart(4, '0')}`,
      nombre,
      email: `${nombre.toLowerCase().replace(' ', '.')}@email.com`,
      telefono: `+1 ${Math.floor(Math.random() * 900 + 100)}-${Math.floor(Math.random() * 900 + 100)}-${Math.floor(Math.random() * 9000 + 1000)}`,
      avatar: `https://i.pravatar.cc/150?img=${i + 1}`,
      membresia: {
        tipo,
        estado,
        fechaInicio: fechaInicio.toISOString().split('T')[0],
        fechaVencimiento: fechaVencimiento.toISOString().split('T')[0],
        creditos,
        creditosTotales
      },
      clase,
      qrCode: `QR${String(i + 1).padStart(6, '0')}`
    });
  }

  return miembros;
};

const miembrosSimulados = generarMiembros();

// Generar check-ins de hoy
const generarCheckInsHoy = (): CheckInRegistro[] => {
  const checkIns: CheckInRegistro[] = [];
  const ahora = new Date();
  const inicioDelDia = new Date(ahora.getFullYear(), ahora.getMonth(), ahora.getDate(), 6, 0);

  for (let i = 0; i < 45; i++) {
    const minutosDesdeInicio = Math.random() * (ahora.getTime() - inicioDelDia.getTime()) / (60 * 1000);
    const timestamp = new Date(inicioDelDia.getTime() + minutosDesdeInicio * 60 * 1000);

    const miembro = miembrosSimulados[Math.floor(Math.random() * miembrosSimulados.length)];
    const exitoso = Math.random() > 0.1;

    let tipoAlerta;
    if (!exitoso || miembro.membresia.estado === 'vencido' || (miembro.membresia.creditos !== undefined && miembro.membresia.creditos === 0)) {
      const alertas: Array<'sin-creditos' | 'sin-reserva' | 'membresia-vencida' | 'restriccion-horario'> = ['sin-creditos', 'sin-reserva', 'membresia-vencida', 'restriccion-horario'];
      tipoAlerta = alertas[Math.floor(Math.random() * alertas.length)];
    }

    checkIns.push({
      id: `CHK${String(i + 1).padStart(6, '0')}`,
      miembroId: miembro.id,
      timestamp,
      exitoso,
      tipoAlerta,
      claseId: miembro.clase ? `CLS${Math.floor(Math.random() * 8) + 1}` : undefined,
      esWalkIn: Math.random() > 0.8
    });
  }

  return checkIns.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
};

const checkInsHoy = generarCheckInsHoy();

// Estadísticas
export const obtenerEstadisticasHoy = (): EstadisticasHoy => {
  const ahora = new Date();
  const unaHoraAtras = new Date(ahora.getTime() - 60 * 60 * 1000);

  const checkInsUltimaHora = checkInsHoy.filter(c => c.timestamp >= unaHoraAtras).length;

  return {
    checkInsHoy: checkInsHoy.length,
    checkInsUltimaHora,
    promedioCheckIn: '2.3 seg',
    capacidadActual: checkInsHoy.filter(c => {
      const diffMinutes = (ahora.getTime() - c.timestamp.getTime()) / (60 * 1000);
      return diffMinutes < 60;
    }).length,
    capacidadMaxima: 45
  };
};

// Clase actual
export const obtenerClaseActual = (): ClaseActual | null => {
  const ahora = new Date();
  const hora = ahora.getHours();

  let claseIndex = -1;
  if (hora >= 7 && hora < 8) claseIndex = 0;
  else if (hora >= 8 && hora < 9) claseIndex = 1;
  else if (hora >= 9 && hora < 10) claseIndex = 2;
  else if (hora >= 10 && hora < 11) claseIndex = 3;
  else if (hora >= 11 && hora < 12) claseIndex = 4;
  else if (hora >= 18 && hora < 19) claseIndex = 5;
  else if (hora >= 19 && hora < 20) claseIndex = 6;
  else if (hora >= 20 && hora < 21) claseIndex = 7;

  if (claseIndex === -1) return null;

  const clase = clasesDisponibles[claseIndex];
  const inscritos = Math.floor(Math.random() * 15 + 10);
  const checkedIn = Math.floor(inscritos * (0.5 + Math.random() * 0.4));

  return {
    id: `CLS${claseIndex + 1}`,
    nombre: clase.nombre,
    horario: clase.horario,
    coach: clase.coach,
    capacidadTotal: 25,
    inscritos,
    checkedIn
  };
};

// Check-ins recientes
export const obtenerCheckInsRecientes = (limite: number = 20): Array<CheckInRegistro & { miembro: MiembroInfo }> => {
  return checkInsHoy.slice(0, limite).map(checkIn => ({
    ...checkIn,
    miembro: miembrosSimulados.find(m => m.id === checkIn.miembroId)!
  }));
};

// Buscar miembro
export const buscarMiembro = async (termino: string): Promise<MiembroInfo[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const terminoLower = termino.toLowerCase();
      const resultados = miembrosSimulados.filter(m =>
        m.nombre.toLowerCase().includes(terminoLower) ||
        m.email.toLowerCase().includes(terminoLower) ||
        m.telefono.includes(termino) ||
        m.id.toLowerCase().includes(terminoLower)
      );
      resolve(resultados.slice(0, 10));
    }, 300);
  });
};

// Simular escaneo QR
export const simularEscaneoQR = async (): Promise<EscaneoResultado> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const random = Math.random();

      // 85% escaneo exitoso
      if (random < 0.85) {
        const miembro = miembrosSimulados[Math.floor(Math.random() * miembrosSimulados.length)];

        // Validaciones
        if (miembro.membresia.estado === 'vencido') {
          resolve({
            exitoso: false,
            miembro,
            alerta: {
              tipo: 'membresia-vencida',
              mensaje: `Membresía vencida desde ${miembro.membresia.fechaVencimiento}`,
              sugerencia: 'Renovar membresía o permitir acceso excepcional'
            }
          });
          return;
        }

        if (miembro.membresia.creditos !== undefined && miembro.membresia.creditos === 0) {
          resolve({
            exitoso: false,
            miembro,
            alerta: {
              tipo: 'sin-creditos',
              mensaje: 'No hay créditos disponibles',
              sugerencia: 'Comprar pase adicional o permitir con cargo posterior'
            }
          });
          return;
        }

        if (miembro.clase && !miembro.clase.tieneReserva) {
          resolve({
            exitoso: false,
            miembro,
            alerta: {
              tipo: 'sin-reserva',
              mensaje: `Sin reserva para ${miembro.clase.nombre}`,
              sugerencia: 'Agregar a clase como walk-in si hay espacio'
            }
          });
          return;
        }

        // Check-in exitoso
        resolve({
          exitoso: true,
          miembro
        });
      } else if (random < 0.95) {
        // 10% código inválido
        resolve({
          exitoso: false,
          alerta: {
            tipo: 'codigo-invalido',
            mensaje: 'Código QR no válido o expirado',
            sugerencia: 'Verificar con recepción'
          }
        });
      } else {
        // 5% código ya usado hoy
        const miembro = miembrosSimulados[Math.floor(Math.random() * miembrosSimulados.length)];
        resolve({
          exitoso: false,
          miembro,
          alerta: {
            tipo: 'codigo-usado-hoy',
            mensaje: 'Este código ya fue usado hoy',
            sugerencia: 'Verificar intento de acceso duplicado'
          }
        });
      }
    }, 800);
  });
};

// Confirmar check-in
export const confirmarCheckIn = async (miembroId: string, claseId?: string): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simular confirmación exitosa
      resolve(true);
    }, 500);
  });
};
