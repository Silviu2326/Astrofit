export interface Reserva {
  id: string;
  cliente: string;
  clase: string;
  estado: 'confirmado' | 'espera' | 'cancelado';
}

export const getReservas = (): Reserva[] => {
  // Datos mock de reservas
  return [
    { id: '1', cliente: 'Ana García', clase: 'Yoga Principiantes', estado: 'confirmado' },
    { id: '2', cliente: 'Luis Pérez', clase: 'Pilates Avanzado', estado: 'confirmado' },
    { id: '3', cliente: 'Marta Ruíz', clase: 'Spinning', estado: 'espera' },
    { id: '4', cliente: 'Pedro López', clase: 'Yoga Principiantes', estado: 'confirmado' },
    { id: '5', cliente: 'Sofía Martín', clase: 'Pilates Avanzado', estado: 'cancelado' },
    { id: '6', cliente: 'Javier Gómez', clase: 'Spinning', estado: 'confirmado' },
    { id: '7', cliente: 'Elena Díaz', clase: 'Yoga Principiantes', estado: 'espera' },
  ];
};
