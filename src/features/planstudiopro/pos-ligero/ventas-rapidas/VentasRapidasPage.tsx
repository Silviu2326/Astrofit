import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Sparkles } from 'lucide-react';
import CarritoVenta from './components/CarritoVenta';
import CuadriculaProductos from './components/CuadriculaProductos';
import ProcesadorPago from './components/ProcesadorPago';
import EstadisticasHoy from './components/EstadisticasHoy';
import { Producto, ItemCarrito, EstadisticasDia } from '../../types';
import { fetchEstadisticasHoy } from './ventasRapidasApi';

const VentasRapidasPage: React.FC = () => {
  const [carrito, setCarrito] = useState<ItemCarrito[]>([]);
  const [mostrarPago, setMostrarPago] = useState<boolean>(false);
  const [estadisticas, setEstadisticas] = useState<EstadisticasDia | null>(null);

  useEffect(() => {
    fetchEstadisticasHoy().then(setEstadisticas);
  }, []);

  const agregarAlCarrito = (producto: Producto) => {
    setCarrito((prevCarrito) => {
      const productoExistente = prevCarrito.find((item) => item.id === producto.id);
      if (productoExistente) {
        return prevCarrito.map((item) =>
          item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
        );
      }
      return [...prevCarrito, { ...producto, cantidad: 1 }];
    });
  };

  const eliminarDelCarrito = (productoId: string) => {
    setCarrito((prevCarrito) => {
      const productoAEliminar = prevCarrito.find((item) => item.id === productoId);
      if (!productoAEliminar) return prevCarrito;

      if (productoAEliminar.cantidad > 1) {
        return prevCarrito.map((item) =>
          item.id === productoId ? { ...item, cantidad: item.cantidad - 1 } : item
        );
      } else {
        return prevCarrito.filter((item) => item.id !== productoId);
      }
    });
  };

  const actualizarCantidad = (productoId: string, nuevaCantidad: number) => {
    if (nuevaCantidad <= 0) {
      eliminarDelCarrito(productoId);
    } else {
      setCarrito((prevCarrito) =>
        prevCarrito.map((item) =>
          item.id === productoId ? { ...item, cantidad: nuevaCantidad } : item
        )
      );
    }
  };

  const limpiarCarrito = () => {
    if (confirm('¿Estás seguro de que deseas vaciar el carrito?')) {
      setCarrito([]);
    }
  };

  const calcularTotal = () => {
    return carrito.reduce((acc, item) => {
      const precioFinal = item.enOferta
        ? item.precio * (1 - (item.descuento || 0) / 100)
        : item.precio;
      return acc + (precioFinal * item.cantidad);
    }, 0);
  };

  const handleProcederPago = () => {
    setMostrarPago(true);
  };

  const handlePagoExitoso = () => {
    setCarrito([]);
    setMostrarPago(false);
    // Actualizar estadísticas
    fetchEstadisticasHoy().then(setEstadisticas);
  };

  const handleCancelarPago = () => {
    setMostrarPago(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50/30 to-emerald-50/30 p-4 md:p-8">
      {/* HERO SECTION */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 rounded-3xl shadow-2xl mb-8 p-8 md:p-12"
      >
        {/* Efectos de fondo animados */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        <div className="relative z-10">
          {/* Título con icono animado */}
          <div className="flex items-center gap-3 mb-4">
            <div className="relative">
              <ShoppingCart className="w-10 h-10 text-yellow-300 animate-pulse" />
              <div className="absolute inset-0 w-10 h-10 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Punto de Venta <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Rápido</span>
            </h1>
          </div>

          {/* Descripción */}
          <p className="text-xl md:text-2xl text-green-100 max-w-3xl leading-relaxed">
            Ventas <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">simples</span> y <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">eficientes</span>
          </p>

          {/* Indicadores pills */}
          <div className="mt-8 flex flex-wrap gap-4">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Sparkles className="w-5 h-5 text-green-300" />
              <span className="text-sm font-semibold text-white">Sistema POS Moderno</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <span className="text-sm font-semibold text-white">📦 30+ Productos</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <span className="text-sm font-semibold text-white">💳 Múltiples Métodos de Pago</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ESTADÍSTICAS DE HOY */}
      {estadisticas && <EstadisticasHoy estadisticas={estadisticas} />}

      {/* LAYOUT PRINCIPAL: PRODUCTOS + CARRITO */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* CATÁLOGO DE PRODUCTOS (2/3) */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Catálogo de Productos</h2>
              <div className="px-4 py-2 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full border border-green-200">
                <span className="text-sm font-bold text-green-700">🛒 POS</span>
              </div>
            </div>
            <CuadriculaProductos onProductoClick={agregarAlCarrito} />
          </motion.div>
        </div>

        {/* CARRITO (1/3) */}
        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <CarritoVenta
              carrito={carrito}
              onEliminarProducto={eliminarDelCarrito}
              onActualizarCantidad={actualizarCantidad}
              onProcederPago={handleProcederPago}
              onLimpiarCarrito={limpiarCarrito}
            />
          </motion.div>
        </div>
      </div>

      {/* PRODUCTOS RÁPIDOS */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="mt-8 bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50"
      >
        <h3 className="text-xl font-bold text-gray-900 mb-4">⚡ Acceso Rápido</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { nombre: 'Agua', precio: 1.00, icono: '💧', id: 'beb-001' },
            { nombre: 'Batido Proteína', precio: 5.00, icono: '🥤', id: 'beb-003' },
            { nombre: 'Drop-in', precio: 15.00, icono: '🎟️', id: 'pas-001' },
            { nombre: 'Barra Proteína', precio: 2.50, icono: '🍫', id: 'snk-001' },
          ].map((producto) => (
            <motion.button
              key={producto.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => agregarAlCarrito({
                id: producto.id,
                nombre: producto.nombre,
                precio: producto.precio,
                imagen: producto.icono,
                categoria: 'bebidas'
              })}
              className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 rounded-2xl border-2 border-green-200 transition-all duration-300 text-center"
            >
              <div className="text-3xl mb-2">{producto.icono}</div>
              <p className="font-bold text-sm text-gray-900">{producto.nombre}</p>
              <p className="text-lg font-bold text-green-600">${producto.precio.toFixed(2)}</p>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* MODAL DE PAGO */}
      {mostrarPago && (
        <ProcesadorPago
          total={calcularTotal()}
          carrito={carrito}
          onPagoExitoso={handlePagoExitoso}
          onCancelar={handleCancelarPago}
        />
      )}
    </div>
  );
};

export default VentasRapidasPage;
