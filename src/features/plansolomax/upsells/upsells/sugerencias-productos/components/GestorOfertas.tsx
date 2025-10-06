import React, { useState, useEffect } from 'react';
import { getUpsellOffers, updateUpsellOffer, deleteUpsellOffer } from '../sugerenciasProductosApi';

interface UpsellOffer {
  id: string;
  title: string;
  price: number;
  description: string;
  active: boolean;
}

const GestorOfertas: React.FC = () => {
  const [offers, setOffers] = useState<UpsellOffer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOffers();
  }, []);

  const fetchOffers = async () => {
    setLoading(true);
    const data = await getUpsellOffers();
    setOffers(data);
    setLoading(false);
  };

  const handleToggleActive = async (offer: UpsellOffer) => {
    const updatedOffer = { ...offer, active: !offer.active };
    await updateUpsellOffer(updatedOffer);
    fetchOffers(); // Refrescar la lista
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta oferta?')) {
      await deleteUpsellOffer(id);
      fetchOffers(); // Refrescar la lista
    }
  };

  if (loading) return <p>Cargando ofertas...</p>;

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-3">Ofertas Actuales</h3>
      {offers.length === 0 ? (
        <p>No hay ofertas de upsell configuradas.</p>
      ) : (
        <ul>
          {offers.map((offer) => (
            <li key={offer.id} className="flex justify-between items-center border-b py-2">
              <div>
                <p className="font-medium">{offer.title} - {offer.price}€</p>
                <p className="text-sm text-gray-600">{offer.description}</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 text-xs rounded-full ${offer.active ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
                  {offer.active ? 'Activa' : 'Inactiva'}
                </span>
                <button
                  onClick={() => handleToggleActive(offer)}
                  className="bg-blue-500 hover:bg-blue-700 text-white text-sm py-1 px-3 rounded"
                >
                  {offer.active ? 'Desactivar' : 'Activar'}
                </button>
                <button
                  onClick={() => handleDelete(offer.id)}
                  className="bg-red-500 hover:bg-red-700 text-white text-sm py-1 px-3 rounded"
                >
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      {/* Botón para añadir nueva oferta, que podría abrir el EditorUpsell */}
      <button className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
        Añadir Nueva Oferta
      </button>
    </div>
  );
};

export default GestorOfertas;
