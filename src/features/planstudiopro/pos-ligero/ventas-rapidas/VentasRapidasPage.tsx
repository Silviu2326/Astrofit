import React, { useState } from 'react';
import CarritoVenta from './components/CarritoVenta';
import CuadriculaProductos from './components/CuadriculaProductos';
import ProcesadorPago from './components/ProcesadorPago';
import { Producto } from '../../types'; // Assuming types.ts is in src/

// Nuevos componentes de e-commerce
import CatalogoOnline from './components/CatalogoOnline';
import InventarioTiempoReal from './components/InventarioTiempoReal';
import ProgramaAfiliados from './components/ProgramaAfiliados';
import UpsellingInteligente from './components/UpsellingInteligente';
import SuscripcionesRecurrentes from './components/SuscripcionesRecurrentes';
import IntegracionProveedores from './components/IntegracionProveedores';
import CashbackPuntos from './components/CashbackPuntos';
import ReviewsRatings from './components/ReviewsRatings';
import ChatbotRecomendaciones from './components/ChatbotRecomendaciones';
import MarketplaceCoaches from './components/MarketplaceCoaches';
import RealidadAumentadaPruebas from './components/RealidadAumentadaPruebas';
import BusquedaVisual from './components/BusquedaVisual';
import WishlistCompartida from './components/WishlistCompartida';
import OneClickCheckout from './components/OneClickCheckout';
import LiveShoppingSessions from './components/LiveShoppingSessions';
import SocialCommerceInfluencers from './components/SocialCommerceInfluencers';

const VentasRapidasPage: React.FC = () => {
  const [carrito, setCarrito] = useState<Producto[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [mostrarPago, setMostrarPago] = useState<boolean>(false);

  const agregarAlCarrito = (producto: Producto) => {
    setCarrito((prevCarrito) => {
      const productoExistente = prevCarrito.find((item) => item.id === producto.id);
      if (productoExistente) {
        return prevCarrito.map((item) =>
          item.id === producto.id ? { ...item, cantidad: (item.cantidad || 0) + 1 } : item
        );
      }
      return [...prevCarrito, { ...producto, cantidad: 1 }];
    });
    setTotal((prevTotal) => prevTotal + producto.precio);
  };

  const eliminarDelCarrito = (productoId: string) => {
    setCarrito((prevCarrito) => {
      const productoAEliminar = prevCarrito.find((item) => item.id === productoId);
      if (!productoAEliminar) return prevCarrito;

      if ((productoAEliminar.cantidad || 0) > 1) {
        setTotal((prevTotal) => prevTotal - productoAEliminar.precio);
        return prevCarrito.map((item) =>
          item.id === productoId ? { ...item, cantidad: (item.cantidad || 0) - 1 } : item
        );
      } else {
        setTotal((prevTotal) => prevTotal - productoAEliminar.precio * (productoAEliminar.cantidad || 1));
        return prevCarrito.filter((item) => item.id !== productoId);
      }
    });
  };

  const handleCobrar = () => {
    setMostrarPago(true);
  };

  const handlePagoExitoso = () => {
    alert('¡Pago exitoso!');
    setCarrito([]);
    setTotal(0);
    setMostrarPago(false);
  };

  const handleCancelarPago = () => {
    setMostrarPago(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Ventas Rápidas POS</h1>
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-2/3">
          <CuadriculaProductos onProductoClick={agregarAlCarrito} />
        </div>
        <div className="lg:w-1/3">
          <CarritoVenta carrito={carrito} total={total} onEliminarProducto={eliminarDelCarrito} />
          <button
            onClick={handleCobrar}
            className="mt-4 w-full bg-green-500 text-white py-3 rounded-lg text-xl font-semibold hover:bg-green-600 transition duration-200"
            disabled={carrito.length === 0}
          >
            Cobrar (${total.toFixed(2)})
          </button>
          {mostrarPago && (
            <ProcesadorPago
              total={total}
              onPagoExitoso={handlePagoExitoso}
              onCancelar={handleCancelarPago}
            />
          )}
        </div>
      </div>

      <div className="mt-10 p-4 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Funcionalidades Avanzadas de E-commerce</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <CatalogoOnline />
          <InventarioTiempoReal />
          <ProgramaAfiliados />
          <UpsellingInteligente />
          <SuscripcionesRecurrentes />
          <IntegracionProveedores />
          <CashbackPuntos />
          <ReviewsRatings />
          <ChatbotRecomendaciones />
          <MarketplaceCoaches />
          <RealidadAumentadaPruebas />
          <BusquedaVisual />
          <WishlistCompartida />
          <OneClickCheckout />
          <LiveShoppingSessions />
          <SocialCommerceInfluencers />
        </div>
      </div>
    </div>
  );
};

export default VentasRapidasPage;
