import React from 'react';

interface UpsellOffer {
  id: string;
  title: string;
  price: number;
  description: string;
  active: boolean;
}

interface VistaPreviewCheckoutProps {
  offers: UpsellOffer[]; // Las ofertas que se mostrarán en la vista previa
}

const VistaPreviewCheckout: React.FC<VistaPreviewCheckoutProps> = ({ offers }) => {
  const activeOffers = offers.filter(offer => offer.active);

  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow-inner border border-gray-200">
      <h3 className="text-xl font-bold mb-4 text-center text-gray-800">Vista Previa del Checkout</h3>
      <div className="bg-white p-4 rounded-md shadow-sm border border-gray-100">
        <h4 className="text-lg font-semibold mb-3 text-gray-700">Tu Pedido</h4>
        <ul className="space-y-2 mb-4">
          {/* Simulación de un producto en el carrito */}
          <li className="flex justify-between text-gray-600">
            <span>Producto Principal</span>
            <span>50.00€</span>
          </li>
          <li className="flex justify-between font-bold text-gray-800 border-t pt-2 mt-2">
            <span>Total Actual</span>
            <span>50.00€</span>
          </li>
        </ul>

        {activeOffers.length > 0 && (
          <div className="mt-6 pt-4 border-t border-dashed border-gray-300">
            <h4 className="text-lg font-semibold mb-3 text-blue-700">¡Ofertas Especiales para ti!</h4>
            <div className="space-y-4">
              {activeOffers.map((offer) => (
                <div key={offer.id} className="flex items-start space-x-3 p-3 bg-blue-50 rounded-md border border-blue-200">
                  <input type="checkbox" className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                  <div>
                    <p className="font-medium text-blue-800">{offer.title} <span className="text-green-600 font-bold">+{offer.price}€</span></p>
                    <p className="text-sm text-blue-600">{offer.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeOffers.length === 0 && (
          <p className="mt-6 text-center text-gray-500 italic">No hay ofertas de upsell activas para mostrar en el checkout.</p>
        )}

        <div className="mt-6 pt-4 border-t font-bold text-xl flex justify-between items-center text-gray-900">
          <span>Total Final Estimado</span>
          <span>{50 + activeOffers.reduce((sum, offer) => sum + offer.price, 0)}€</span>
        </div>

        <button className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-md text-lg">
          Proceder al Pago
        </button>
      </div>
    </div>
  );
};

export default VistaPreviewCheckout;
