export interface VarianteProducto {
  id: string;
  sku: string;
  nombre: string;
  atributos: Record<string, string>; // ej: { talla: 'M', color: 'Rojo' }
  precio: number;
  precioComparacion?: number;
  stock: number;
  stockMinimo: number;
  imagen?: string;
  activo: boolean;
  codigoBarras?: string;
}

export interface OpcionVariante {
  id: string;
  nombre: string; // ej: "Talla", "Color"
  valores: string[]; // ej: ["S", "M", "L", "XL"]
}

export interface Producto {
  id: string;
  nombre: string;
  descripcion: string;
  categoria: string;
  subcategoria?: string;
  marca?: string;
  imagenes: string[];
  precioBase: number;
  precioComparacion?: number;
  tieneVariantes: boolean;
  opcionesVariantes: OpcionVariante[];
  variantes: VarianteProducto[];
  stockTotal: number;
  estado: 'activo' | 'borrador' | 'archivado';
  etiquetas: string[];
  seo: {
    titulo?: string;
    descripcion?: string;
    palabrasClave?: string[];
  };
  fechaCreacion: Date;
  fechaActualizacion: Date;
}

export interface CategoriaProducto {
  id: string;
  nombre: string;
  descripcion?: string;
  icono: string;
  subcategorias: string[];
  productosCount: number;
}

export interface MovimientoInventario {
  id: string;
  productoId: string;
  varianteId: string;
  tipo: 'entrada' | 'salida' | 'ajuste' | 'devolucion';
  cantidad: number;
  stockAnterior: number;
  stockNuevo: number;
  motivo: string;
  usuario: string;
  fecha: Date;
  referencia?: string;
}

export interface FiltrosProducto {
  busqueda: string;
  categoria?: string;
  subcategoria?: string;
  estado?: 'activo' | 'borrador' | 'archivado';
  stockBajo?: boolean;
  etiquetas?: string[];
  precioMin?: number;
  precioMax?: number;
}

export interface EstadisticasCatalogo {
  totalProductos: number;
  productosActivos: number;
  productosStockBajo: number;
  valorInventarioTotal: number;
  categorias: number;
  variantesTotal: number;
}
