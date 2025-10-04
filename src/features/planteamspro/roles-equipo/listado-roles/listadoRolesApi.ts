import { useState, useEffect } from 'react';

export type RolPrincipal = 'Entrenador Principal' | 'Asistente' | 'Fisioterapeuta' | 'Atleta' | 'Capitán';

export interface MiembroEquipo {
  id: string;
  fotoPerfil: string;
  nombre: string;
  posicion: string;
  rolPrincipal: RolPrincipal;
}

const mockEquipo: MiembroEquipo[] = [
  {
    id: '1',
    fotoPerfil: 'https://randomuser.me/api/portraits/men/1.jpg',
    nombre: 'Juan Pérez',
    posicion: 'Delantero',
    rolPrincipal: 'Capitán',
  },
  {
    id: '2',
    fotoPerfil: 'https://randomuser.me/api/portraits/women/2.jpg',
    nombre: 'María García',
    posicion: 'Defensa',
    rolPrincipal: 'Atleta',
  },
  {
    id: '3',
    fotoPerfil: 'https://randomuser.me/api/portraits/men/3.jpg',
    nombre: 'Carlos Sánchez',
    posicion: 'Mediocampista',
    rolPrincipal: 'Atleta',
  },
  {
    id: '4',
    fotoPerfil: 'https://randomuser.me/api/portraits/women/4.jpg',
    nombre: 'Ana López',
    posicion: 'Portera',
    rolPrincipal: 'Atleta',
  },
  {
    id: '5',
    fotoPerfil: 'https://randomuser.me/api/portraits/men/5.jpg',
    nombre: 'Pedro Martínez',
    posicion: 'Entrenador',
    rolPrincipal: 'Entrenador Principal',
  },
  {
    id: '6',
    fotoPerfil: 'https://randomuser.me/api/portraits/women/6.jpg',
    nombre: 'Laura Rodríguez',
    posicion: 'Asistente Técnico',
    rolPrincipal: 'Asistente',
  },
  {
    id: '7',
    fotoPerfil: 'https://randomuser.me/api/portraits/men/7.jpg',
    nombre: 'Miguel Fernández',
    posicion: 'Fisioterapeuta',
    rolPrincipal: 'Fisioterapeuta',
  },
  {
    id: '8',
    fotoPerfil: 'https://randomuser.me/api/portraits/women/8.jpg',
    nombre: 'Sofía Giménez',
    posicion: 'Delantera',
    rolPrincipal: 'Atleta',
  },
  {
    id: '9',
    fotoPerfil: 'https://randomuser.me/api/portraits/men/9.jpg',
    nombre: 'Javier Ruiz',
    posicion: 'Defensa',
    rolPrincipal: 'Atleta',
  },
  {
    id: '10',
    fotoPerfil: 'https://randomuser.me/api/portraits/women/10.jpg',
    nombre: 'Elena Díaz',
    posicion: 'Mediocampista',
    rolPrincipal: 'Atleta',
  },
  {
    id: '11',
    fotoPerfil: 'https://randomuser.me/api/portraits/men/11.jpg',
    nombre: 'Pablo Moreno',
    posicion: 'Delantero',
    rolPrincipal: 'Atleta',
  },
  {
    id: '12',
    fotoPerfil: 'https://randomuser.me/api/portraits/women/12.jpg',
    nombre: 'Lucía Romero',
    posicion: 'Defensa',
    rolPrincipal: 'Atleta',
  },
  {
    id: '13',
    fotoPerfil: 'https://randomuser.me/api/portraits/men/13.jpg',
    nombre: 'Diego Alonso',
    posicion: 'Mediocampista',
    rolPrincipal: 'Atleta',
  },
  {
    id: '14',
    fotoPerfil: 'https://randomuser.me/api/portraits/women/14.jpg',
    nombre: 'Paula Navarro',
    posicion: 'Delantera',
    rolPrincipal: 'Atleta',
  },
  {
    id: '15',
    fotoPerfil: 'https://randomuser.me/api/portraits/men/15.jpg',
    nombre: 'Sergio Castro',
    posicion: 'Defensa',
    rolPrincipal: 'Atleta',
  },
  {
    id: '16',
    fotoPerfil: 'https://randomuser.me/api/portraits/women/16.jpg',
    nombre: 'Andrea Vargas',
    posicion: 'Mediocampista',
    rolPrincipal: 'Atleta',
  },
  {
    id: '17',
    fotoPerfil: 'https://randomuser.me/api/portraits/men/17.jpg',
    nombre: 'Ricardo Núñez',
    posicion: 'Delantero',
    rolPrincipal: 'Atleta',
  },
  {
    id: '18',
    fotoPerfil: 'https://randomuser.me/api/portraits/women/18.jpg',
    nombre: 'Isabel Ortega',
    posicion: 'Defensa',
    rolPrincipal: 'Atleta',
  },
  {
    id: '19',
    fotoPerfil: 'https://randomuser.me/api/portraits/men/19.jpg',
    nombre: 'Manuel Ramos',
    posicion: 'Mediocampista',
    rolPrincipal: 'Atleta',
  },
  {
    id: '20',
    fotoPerfil: 'https://randomuser.me/api/portraits/women/20.jpg',
    nombre: 'Carmen Morales',
    posicion: 'Delantera',
    rolPrincipal: 'Atleta',
  },
  {
    id: '21',
    fotoPerfil: 'https://randomuser.me/api/portraits/men/21.jpg',
    nombre: 'Alejandro Gil',
    posicion: 'Defensa',
    rolPrincipal: 'Atleta',
  },
  {
    id: '22',
    fotoPerfil: 'https://randomuser.me/api/portraits/women/22.jpg',
    nombre: 'Natalia Soto',
    posicion: 'Mediocampista',
    rolPrincipal: 'Atleta',
  },
  {
    id: '23',
    fotoPerfil: 'https://randomuser.me/api/portraits/men/23.jpg',
    nombre: 'Francisco Herrera',
    posicion: 'Delantero',
    rolPrincipal: 'Atleta',
  },
  {
    id: '24',
    fotoPerfil: 'https://randomuser.me/api/portraits/women/24.jpg',
    nombre: 'Victoria Ruiz',
    posicion: 'Defensa',
    rolPrincipal: 'Atleta',
  },
  {
    id: '25',
    fotoPerfil: 'https://randomuser.me/api/portraits/men/25.jpg',
    nombre: 'Jorge Castro',
    posicion: 'Mediocampista',
    rolPrincipal: 'Atleta',
  },
];

export const fetchEquipo = (): Promise<MiembroEquipo[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockEquipo);
    }, 500); // Simulate network delay
  });
};

export const useEquipo = () => {
  const [equipo, setEquipo] = useState<MiembroEquipo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const getEquipo = async () => {
      try {
        const data = await fetchEquipo();
        setEquipo(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    getEquipo();
  }, []);

  return { equipo, loading, error };
};

// Nuevos endpoints para gestión de roles y notificaciones

export const updateRol = async (memberId: string, newRol: RolPrincipal): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Rol de miembro ${memberId} actualizado a ${newRol}`);
      resolve();
    }, 300);
  });
};

export const promoteMember = async (memberId: string): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Miembro ${memberId} promovido.`);
      resolve();
    }, 300);
  });
};

export const demoteMember = async (memberId: string): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Miembro ${memberId} degradado.`);
      resolve();
    }, 300);
  });
};

export const setTemporaryRol = async (
  memberId: string,
  temporaryRol: RolPrincipal,
  startDate: Date,
  endDate: Date
): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Rol temporal para miembro ${memberId} establecido: ${temporaryRol} de ${startDate.toLocaleDateString()} a ${endDate.toLocaleDateString()}.`);
      resolve();
    }, 300);
  });
};

export const getHistorialCambios = async (memberId: string): Promise<any[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Obteniendo historial de cambios para miembro ${memberId}.`);
      resolve([
        { timestamp: new Date(), change: 'Rol cambiado a Capitán', justification: 'Por liderazgo' },
        { timestamp: new Date(), change: 'Promovido', justification: 'Buen desempeño' },
      ]);
    }, 300);
  });
};

export const sendNotification = async (message: string, recipientId?: string): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Notificación enviada: ${message}` + (recipientId ? ` a ${recipientId}` : ''));
      resolve();
    }, 300);
  });
};
