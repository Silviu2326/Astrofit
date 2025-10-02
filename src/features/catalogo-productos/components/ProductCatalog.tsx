import React, { useState } from 'react';
import { Package, Plus, Search, Filter, TrendingUp, AlertTriangle, Archive } from 'lucide-react';
import type { Product, ProductFilters, ProductStats } from '../types/product.types';
import { ProductCard } from './ProductCard';
import { ProductFiltersPanel } from './ProductFiltersPanel';
import { ProductForm } from './ProductForm';
import { ProductStatsCards } from './ProductStatsCards';

// Mock data
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Camiseta Premium Fitness',
    description: 'Camiseta técnica de alta calidad con tecnología de absorción de humedad',
    category: 'apparel',
    tags: ['fitness', 'training', 'premium'],
    basePrice: 29.99,
    variants: [
      {
        id: 'v1',
        sku: 'CPF-BLK-S',
        name: 'Negro - S',
        attributes: { size: 'S', color: 'Negro' },
        price: 29.99,
        compareAtPrice: 39.99,
        stock: 45,
        lowStockThreshold: 10,
        isActive: true,
      },
      {
        id: 'v2',
        sku: 'CPF-BLK-M',
        name: 'Negro - M',
        attributes: { size: 'M', color: 'Negro' },
        price: 29.99,
        stock: 8,
        lowStockThreshold: 10,
        isActive: true,
      },
      {
        id: 'v3',
        sku: 'CPF-BLU-L',
        name: 'Azul - L',
        attributes: { size: 'L', color: 'Azul' },
        price: 29.99,
        stock: 0,
        lowStockThreshold: 10,
        isActive: true,
      },
    ],
    images: [],
    status: 'active',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-20'),
    brand: 'FitPro',
  },
  {
    id: '2',
    name: 'Proteína Whey Premium',
    description: 'Suplemento de proteína de suero de leche de alta calidad',
    category: 'supplements',
    tags: ['protein', 'supplement', 'nutrition'],
    basePrice: 49.99,
    variants: [
      {
        id: 'v4',
        sku: 'PWP-CHO-1KG',
        name: 'Chocolate - 1kg',
        attributes: { flavor: 'Chocolate', size: '1kg' },
        price: 49.99,
        stock: 120,
        lowStockThreshold: 20,
        isActive: true,
      },
      {
        id: 'v5',
        sku: 'PWP-VAN-1KG',
        name: 'Vainilla - 1kg',
        attributes: { flavor: 'Vainilla', size: '1kg' },
        price: 49.99,
        stock: 15,
        lowStockThreshold: 20,
        isActive: true,
      },
    ],
    images: [],
    status: 'active',
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-02-05'),
    brand: 'NutriMax',
  },
  {
    id: '3',
    name: 'Mancuerna Ajustable Pro',
    description: 'Set de mancuernas ajustables de 5 a 25kg',
    category: 'equipment',
    tags: ['equipment', 'weights', 'home-gym'],
    basePrice: 199.99,
    variants: [
      {
        id: 'v6',
        sku: 'MAP-SET-25KG',
        name: 'Set 25kg',
        attributes: { weight: '25kg' },
        price: 199.99,
        stock: 5,
        lowStockThreshold: 5,
        isActive: true,
      },
    ],
    images: [],
    status: 'active',
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-25'),
    brand: 'FitGear',
  },
];

const mockStats: ProductStats = {
  totalProducts: 3,
  activeProducts: 3,
  draftProducts: 0,
  archivedProducts: 0,
  totalVariants: 6,
  lowStockVariants: 3,
  outOfStockVariants: 1,
  totalInventoryValue: 15234.50,
};

export function ProductCatalog() {
  const [products] = useState<Product[]>(mockProducts);
  const [stats] = useState<ProductStats>(mockStats);
  const [filters, setFilters] = useState<ProductFilters>({});
  const [showFilters, setShowFilters] = useState(false);
  const [showProductForm, setShowProductForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = products.filter((product) => {
    if (searchTerm && !product.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    if (filters.category && product.category !== filters.category) {
      return false;
    }
    if (filters.status && product.status !== filters.status) {
      return false;
    }
    if (filters.inStock !== undefined) {
      const hasStock = product.variants.some((v) => v.stock > 0);
      if (filters.inStock && !hasStock) return false;
      if (!filters.inStock && hasStock) return false;
    }
    if (filters.lowStock) {
      const hasLowStock = product.variants.some((v) => v.stock > 0 && v.stock <= v.lowStockThreshold);
      if (!hasLowStock) return false;
    }
    return true;
  });

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setShowProductForm(true);
  };

  const handleNewProduct = () => {
    setSelectedProduct(undefined);
    setShowProductForm(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Catálogo de Productos
          </h1>
          <p className="text-gray-600 mt-1">
            Gestiona productos, variantes, inventario y precios
          </p>
        </div>
        <button
          onClick={handleNewProduct}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 transition-all"
        >
          <Plus className="w-5 h-5" />
          Nuevo Producto
        </button>
      </div>

      {/* Stats Cards */}
      <ProductStatsCards stats={stats} />

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-2 border rounded-lg transition-all ${
              showFilters
                ? 'bg-blue-50 border-blue-300 text-blue-700'
                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Filter className="w-5 h-5" />
            Filtros
          </button>
        </div>

        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <ProductFiltersPanel filters={filters} onFiltersChange={setFilters} />
          </div>
        )}
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No se encontraron productos
          </h3>
          <p className="text-gray-600 mb-4">
            Intenta ajustar los filtros o crea un nuevo producto
          </p>
          <button
            onClick={handleNewProduct}
            className="px-4 py-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700"
          >
            Crear Producto
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onEdit={handleEditProduct}
            />
          ))}
        </div>
      )}

      {/* Product Form Modal */}
      {showProductForm && (
        <ProductForm
          product={selectedProduct}
          onClose={() => setShowProductForm(false)}
          onSave={(product) => {
            console.log('Product saved:', product);
            setShowProductForm(false);
          }}
        />
      )}
    </div>
  );
}
