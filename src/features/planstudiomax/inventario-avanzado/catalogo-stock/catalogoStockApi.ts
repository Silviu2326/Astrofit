
export interface Product {
  id: string;
  name: string;
  category: 'equipamiento' | 'consumibles' | 'merchandising';
  stock: number;
  minStock?: number; // Nuevo campo para stock mínimo
  maxStock?: number; // Nuevo campo para stock máximo
  locationCode?: string; // Nuevo campo para código de ubicación
}

export interface StockAlert {
  id: string;
  productId: string;
  productName: string;
  currentStock: number;
  minStock: number;
  alertDate: string;
}

export interface InventoryReport {
  id: string;
  reportName: string;
  dateGenerated: string;
  data: any; // Puede ser más específico dependiendo del tipo de reporte
}

const mockProducts: Product[] = [
  { id: '1', name: 'Teclado Mecánico', category: 'equipamiento', stock: 15, minStock: 10, maxStock: 30, locationCode: 'A1' },
  { id: '2', name: 'Ratón Gaming', category: 'equipamiento', stock: 20, minStock: 10, maxStock: 40, locationCode: 'A2' },
  { id: '3', name: 'Monitor Curvo 27"', category: 'equipamiento', stock: 8, minStock: 5, maxStock: 15, locationCode: 'B1' },
  { id: '4', name: 'Cartuchos de Tinta (Negro)', category: 'consumibles', stock: 50, minStock: 20, maxStock: 100, locationCode: 'C1' },
  { id: '5', name: 'Papel A4 (Paquete 500)', category: 'consumibles', stock: 120, minStock: 50, maxStock: 200, locationCode: 'C2' },
  { id: '6', name: 'Taza con Logo de Empresa', category: 'merchandising', stock: 30, minStock: 15, maxStock: 50, locationCode: 'D1' },
  { id: '7', name: 'Camiseta (Talla L)', category: 'merchandising', stock: 25, minStock: 10, maxStock: 40, locationCode: 'D2' },
  { id: '8', name: 'Auriculares Inalámbricos', category: 'equipamiento', stock: 10, minStock: 5, maxStock: 20, locationCode: 'A3' },
  { id: '9', name: 'Bolígrafos (Caja)', category: 'consumibles', stock: 70, minStock: 30, maxStock: 100, locationCode: 'C3' },
  { id: '10', name: 'Mochila para Portátil', category: 'merchandising', stock: 5, minStock: 3, maxStock: 10, locationCode: 'D3' },
];

const mockStockAlerts: StockAlert[] = [
  { id: 'alert1', productId: '3', productName: 'Monitor Curvo 27" ', currentStock: 8, minStock: 5, alertDate: '2025-09-20' },
  { id: 'alert2', productId: '10', productName: 'Mochila para Portátil', currentStock: 5, minStock: 3, alertDate: '2025-09-25' },
];

const mockInventoryReports: InventoryReport[] = [
  { id: 'report1', reportName: 'Reporte de Rotación Mensual', dateGenerated: '2025-09-28', data: { /* datos del reporte */ } },
  { id: 'report2', reportName: 'Reporte de Productos Vendidos (Q3)', dateGenerated: '2025-09-28', data: { /* datos del reporte */ } },
];

export const fetchProducts = async (searchTerm: string = ''): Promise<Product[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filteredProducts = mockProducts.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      resolve(filteredProducts);
    }, 500);
  });
};

export const updateProductStock = async (id: string, newStock: number): Promise<Product | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const productIndex = mockProducts.findIndex(product => product.id === id);
      if (productIndex > -1) {
        mockProducts[productIndex].stock = newStock;
        resolve(mockProducts[productIndex]);
      } else {
        resolve(null);
      }
    }, 500);
  });
};

export const fetchStockAlerts = async (): Promise<StockAlert[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockStockAlerts);
    }, 500);
  });
};

export const fetchInventoryReports = async (): Promise<InventoryReport[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockInventoryReports);
    }, 500);
  });
};
