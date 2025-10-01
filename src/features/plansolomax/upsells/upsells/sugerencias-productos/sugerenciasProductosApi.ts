// Archivo para la lógica de la API de sugerencias de productos (upsells)

interface UpsellOffer {
  id: string;
  title: string;
  price: number;
  description: string;
  active: boolean;
  templateId?: string; // Para plantillas predefinidas
}

// Simulación de una API
const mockUpsells: UpsellOffer[] = [
  {
    id: '1',
    title: 'Añadir 3 sesiones extra',
    price: 29.99,
    description: 'Obtén 3 sesiones adicionales a un precio especial.',
    active: true,
  },
  {
    id: '2',
    title: 'Upgrade a paquete premium',
    price: 99.99,
    description: 'Desbloquea todas las funciones premium por un año.',
    active: false,
  },
];

export const getUpsellOffers = async (): Promise<UpsellOffer[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockUpsells), 500);
  });
};

export const createUpsellOffer = async (offer: Omit<UpsellOffer, 'id'>): Promise<UpsellOffer> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newOffer = { ...offer, id: String(mockUpsells.length + 1) };
      mockUpsells.push(newOffer);
      resolve(newOffer);
    }, 500);
  });
};

export const updateUpsellOffer = async (offer: UpsellOffer): Promise<UpsellOffer> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = mockUpsells.findIndex((u) => u.id === offer.id);
      if (index !== -1) {
        mockUpsells[index] = offer;
        resolve(offer);
      } else {
        reject(new Error('Oferta no encontrada'));
      }
    }, 500);
  });
};

export const deleteUpsellOffer = async (id: string): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = mockUpsells.findIndex((u) => u.id === id);
      if (index !== -1) {
        mockUpsells.splice(index, 1);
      }
      resolve();
    }, 500);
  });
};
