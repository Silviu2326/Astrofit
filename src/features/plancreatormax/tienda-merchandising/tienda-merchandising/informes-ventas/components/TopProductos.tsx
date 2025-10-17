import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Star, 
  TrendingUp, 
  Eye, 
  ShoppingCart,
  Award,
  ExternalLink
} from 'lucide-react';
import { Button } from '../../../../../../components/ui/button';
import toast from 'react-hot-toast';
import { getTopProductos } from '../informesVentasApi';

interface Product {
  id: number;
  name: string;
  category: string;
  sales: number;
  revenue: number;
  growth: number;
  image: string;
  description?: string;
  price: number;
  cost: number;
  margin: number;
  marginPercent: number;
  stock: number;
  rating: number;
  reviews: number;
  lastSale?: string;
  seasonality?: 'high' | 'medium' | 'low';
}

interface TopProductosProps {
  onViewProduct?: (product: Product) => void;
}

const TopProductos: React.FC<TopProductosProps> = ({ onViewProduct }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);

  // Mock data que se reemplazará con datos reales de la API
  const mockProducts: Product[] = [
    {
      id: 1,
      name: 'Proteína Whey Premium',
      category: 'Suplementos',
      sales: 1240,
      revenue: 24800,
      growth: 15.2,
      image: '/placeholder-product.svg',
      description: 'Proteína de suero de leche de alta calidad, ideal para el crecimiento muscular y recuperación post-entrenamiento.',
      price: 45.00,
      cost: 25.00,
      margin: 20.00,
      marginPercent: 44.4,
      stock: 150,
      rating: 4.8,
      reviews: 324,
      lastSale: '2024-01-15',
      seasonality: 'high'
    },
    {
      id: 2,
      name: 'Creatina Monohidrato',
      category: 'Suplementos',
      sales: 980,
      revenue: 19600,
      growth: 8.7,
      image: '/placeholder-product.svg',
      description: 'Creatina monohidrato micronizada para mejorar el rendimiento y la fuerza muscular.',
      price: 30.00,
      cost: 15.00,
      margin: 15.00,
      marginPercent: 50.0,
      stock: 200,
      rating: 4.6,
      reviews: 189,
      lastSale: '2024-01-14',
      seasonality: 'medium'
    },
    {
      id: 3,
      name: 'Pre-entrenamiento Energy',
      category: 'Suplementos',
      sales: 850,
      revenue: 25500,
      growth: 22.1,
      image: '/placeholder-product.svg',
      description: 'Suplemento pre-entrenamiento con cafeína y beta-alanina para maximizar el rendimiento.',
      price: 35.00,
      cost: 18.00,
      margin: 17.00,
      marginPercent: 48.6,
      stock: 120,
      rating: 4.7,
      reviews: 267,
      lastSale: '2024-01-13',
      seasonality: 'high'
    },
    {
      id: 4,
      name: 'Cinturón de Levantamiento',
      category: 'Equipamiento',
      sales: 720,
      revenue: 14400,
      growth: -3.2,
      image: '/placeholder-product.svg',
      description: 'Cinturón de levantamiento de pesas profesional para soporte lumbar.',
      price: 60.00,
      cost: 35.00,
      margin: 25.00,
      marginPercent: 41.7,
      stock: 45,
      rating: 4.5,
      reviews: 156,
      lastSale: '2024-01-12',
      seasonality: 'low'
    },
    {
      id: 5,
      name: 'Guantes de Gimnasio',
      category: 'Equipamiento',
      sales: 650,
      revenue: 9750,
      growth: 12.5,
      image: '/placeholder-product.svg',
      description: 'Guantes de gimnasio con agarre mejorado y protección para las manos.',
      price: 15.00,
      cost: 8.00,
      margin: 7.00,
      marginPercent: 46.7,
      stock: 300,
      rating: 4.4,
      reviews: 98,
      lastSale: '2024-01-11',
      seasonality: 'medium'
    }
  ];

  // Cargar datos desde la API (mock por ahora)
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setIsLoading(true);
        // Simular llamada a la API
        await new Promise(resolve => setTimeout(resolve, 1000));
        await getTopProductos(5);
        // Por ahora usar datos mock, luego se reemplazará con apiData
        setProducts(mockProducts);
      } catch (error) {
        console.error('Error loading products:', error);
        // Fallback a datos mock en caso de error
        setProducts(mockProducts);
        toast.error('Error al cargar productos, mostrando datos de ejemplo');
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  const categories = ['all', 'Suplementos', 'Equipamiento', 'Ropa'];

  const handleViewProduct = (product: Product) => {
    if (onViewProduct) {
      onViewProduct(product);
    } else {
      toast.success(`Abriendo detalles de ${product.name}`);
    }
  };

  const handleExportReport = () => {
    setIsLoading(true);
    toast.loading('Generando reporte de productos...', { id: 'export-products' });
    
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Reporte de productos exportado correctamente', { id: 'export-products' });
    }, 2000);
  };

  const handleRefreshData = () => {
    setIsLoading(true);
    toast.loading('Actualizando ranking de productos...', { id: 'refresh-products' });
    
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Datos de productos actualizados', { id: 'refresh-products' });
    }, 1500);
  };

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  return (
    <div className="space-y-6">
      {/* Header con controles */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg text-white">
            <Star className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Top Productos</h3>
            <p className="text-sm text-gray-600">Ranking por unidades vendidas</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <select 
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">Todas las categorías</option>
            {categories.slice(1).map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefreshData}
            disabled={isLoading}
            className="flex items-center gap-2"
          >
            <TrendingUp className={`w-4 h-4 ${isLoading ? 'animate-pulse' : ''}`} />
            Actualizar
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleExportReport}
            disabled={isLoading}
            className="flex items-center gap-2"
          >
            <ExternalLink className="w-4 h-4" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Lista de productos */}
      <div className="space-y-3">
        {filteredProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gradient-to-r from-white to-gray-50 p-4 rounded-xl border border-gray-200 hover:border-blue-300 transition-all duration-300 hover:shadow-md"
          >
            <div className="flex items-center gap-4">
              {/* Posición */}
              <div className="flex-shrink-0">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                  index === 0 ? 'bg-gradient-to-br from-yellow-400 to-yellow-600' :
                  index === 1 ? 'bg-gradient-to-br from-gray-400 to-gray-600' :
                  index === 2 ? 'bg-gradient-to-br from-orange-400 to-orange-600' :
                  'bg-gradient-to-br from-blue-400 to-blue-600'
                }`}>
                  {index === 0 ? <Award className="w-5 h-5" /> : index + 1}
                </div>
              </div>

              {/* Imagen del producto */}
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                  <ShoppingCart className="w-6 h-6 text-gray-400" />
                </div>
              </div>

              {/* Información del producto */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-semibold text-gray-900 truncate">{product.name}</h4>
                    <p className="text-sm text-gray-600">{product.category}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center gap-1">
                        <ShoppingCart className="w-4 h-4 text-gray-400" />
                        <span className="text-sm font-medium text-gray-700">{product.sales.toLocaleString()} vendidos</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-sm font-medium text-gray-700">${product.revenue.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                      product.growth >= 0 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-red-100 text-red-700'
                    }`}>
                      <TrendingUp className={`w-3 h-3 ${product.growth < 0 ? 'rotate-180' : ''}`} />
                      {product.growth >= 0 ? '+' : ''}{product.growth}%
                    </div>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleViewProduct(product)}
                      className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Resumen */}
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-4 rounded-xl border border-blue-200">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-semibold text-gray-900">Resumen del Período</h4>
            <p className="text-sm text-gray-600">Total de productos analizados</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-blue-900">{filteredProducts.length}</p>
            <p className="text-sm text-blue-600">productos activos</p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default TopProductos;
