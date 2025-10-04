import React, { useState, useEffect } from 'react';
import { createUpsellOffer, updateUpsellOffer } from '../sugerenciasProductosApi';

interface UpsellOffer {
  id?: string; // Opcional para nuevas ofertas
  title: string;
  price: number;
  description: string;
  active: boolean;
}

interface EditorUpsellProps {
  offerToEdit?: UpsellOffer; // Si se pasa una oferta, es para editar
  onSave: () => void; // Callback para cuando se guarda una oferta
}

const EditorUpsell: React.FC<EditorUpsellProps> = ({ offerToEdit, onSave }) => {
  const [offer, setOffer] = useState<UpsellOffer>({
    title: '',
    price: 0,
    description: '',
    active: true,
  });

  useEffect(() => {
    if (offerToEdit) {
      setOffer(offerToEdit);
    } else {
      setOffer({ title: '', price: 0, description: '', active: true });
    }
  }, [offerToEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setOffer((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (offer.id) {
      await updateUpsellOffer(offer as Required<UpsellOffer>);
    } else {
      await createUpsellOffer(offer);
    }
    onSave(); // Notificar al componente padre que se ha guardado
    setOffer({ title: '', price: 0, description: '', active: true }); // Resetear formulario
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-3">{offer.id ? 'Editar Oferta' : 'Crear Nueva Oferta'}</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Título</label>
          <input
            type="text"
            id="title"
            name="title"
            value={offer.title}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            required
          />
        </div>
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">Precio</label>
          <input
            type="number"
            id="price"
            name="price"
            value={offer.price}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            required
            min="0"
            step="0.01"
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descripción</label>
          <textarea
            id="description"
            name="description"
            value={offer.description}
            onChange={handleChange}
            rows={3}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            required
          ></textarea>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="active"
            name="active"
            checked={offer.active}
            onChange={handleChange}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded"
          />
          <label htmlFor="active" className="ml-2 block text-sm text-gray-900">Activar oferta</label>
        </div>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {offer.id ? 'Guardar Cambios' : 'Crear Oferta'}
        </button>
      </form>
    </div>
  );
};

export default EditorUpsell;
