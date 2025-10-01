import React, { useState, useEffect } from 'react';
import TablaInventario from './components/TablaInventario';
import AlertasStock from './components/AlertasStock';
import BuscadorProductos from './components/BuscadorProductos';
import HistorialMovimientos from './components/HistorialMovimientos';
import ConfiguracionStock from './components/ConfiguracionStock';
import CodigosUbicacion from './components/CodigosUbicacion';
import CategorizacionAvanzada from './components/CategorizacionAvanzada';
import ReportesRotacion from './components/ReportesRotacion';
import IntegracionCodigosBarras from './components/IntegracionCodigosBarras';
import { fetchProducts, Product } from './catalogoStockApi';

const CatalogoStockPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      const data = await fetchProducts();
      setProducts(data);
      setLoading(false);
    };
    getProducts();
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className="p-4">Cargando inventario...</div>;
  }

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Catálogo de Stock - Inventario Avanzado</h1>

      <div className="mb-6">
        <BuscadorProductos />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <AlertasStock />
        <ConfiguracionStock />
        <CodigosUbicacion />
        <CategorizacionAvanzada />
        <IntegracionCodigosBarras />
        <ReportesRotacion />
      </div>

      <div className="mb-6">
        <HistorialMovimientos />
      </div>

      <TablaInventario products={filteredProducts} searchTerm={searchTerm} />
    </div>
  );
};

export default CatalogoStockPage;
