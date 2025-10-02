import React, { useState } from 'react';
import { X, Plus, Trash2, Upload, Tag } from 'lucide-react';
import type { Producto, OpcionVariante } from '../types';
import VariantesManager from './VariantesManager';

interface ProductoFormModalProps {
  producto?: Producto;
  onGuardar: (producto: Producto) => void;
  onCerrar: () => void;
}

const ProductoFormModal: React.FC<ProductoFormModalProps> = ({ producto, onGuardar, onCerrar }) => {
  const [formData, setFormData] = useState<Partial<Producto>>(producto || {
    nombre: '',
    descripcion: '',
    categoria: 'Ropa',
    subcategoria: '',
    marca: '',
    imagenes: [],
    precioBase: 0,
    precioComparacion: 0,
    tieneVariantes: false,
    opcionesVariantes: [],
    variantes: [],
    stockTotal: 0,
    estado: 'borrador',
    etiquetas: [],
    seo: {},
    fechaCreacion: new Date(),
    fechaActualizacion: new Date()
  });

  const [pestanaActiva, setPestanaActiva] = useState<'general' | 'variantes' | 'seo'>('general');
  const [nuevaEtiqueta, setNuevaEtiqueta] = useState('');
  const [nuevaImagen, setNuevaImagen] = useState('');

  const categorias = [
    'Ropa',
    'Accesorios',
    'Calzado',
    'Equipamiento',
    'Suplementos',
    'Digital',
    'Otros'
  ];

  const subcategorias: Record<string, string[]> = {
    'Ropa': ['Camisetas', 'Sudaderas', 'Pantalones', 'Shorts', 'Chaquetas'],
    'Accesorios': ['Gorras', 'Mochilas', 'Cinturones', 'Guantes', 'Calcetines'],
    'Calzado': ['Zapatillas', 'Botas', 'Sandalias'],
    'Equipamiento': ['Pesas', 'Bandas', 'Colchonetas', 'Botellas'],
    'Suplementos': ['Proteínas', 'Pre-entreno', 'Vitaminas', 'Creatina'],
    'Digital': ['E-books', 'Cursos', 'Planes', 'Membresías'],
    'Otros': []
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const productoCompleto: Producto = {
      id: producto?.id || Date.now().toString(),
      nombre: formData.nombre || '',
      descripcion: formData.descripcion || '',
      categoria: formData.categoria || 'Ropa',
      subcategoria: formData.subcategoria,
      marca: formData.marca,
      imagenes: formData.imagenes || [],
      precioBase: Number(formData.precioBase) || 0,
      precioComparacion: formData.precioComparacion ? Number(formData.precioComparacion) : undefined,
      tieneVariantes: formData.tieneVariantes || false,
      opcionesVariantes: formData.opcionesVariantes || [],
      variantes: formData.variantes || [],
      stockTotal: formData.variantes?.reduce((sum, v) => sum + v.stock, 0) || 0,
      estado: formData.estado || 'borrador',
      etiquetas: formData.etiquetas || [],
      seo: formData.seo || {},
      fechaCreacion: producto?.fechaCreacion || new Date(),
      fechaActualizacion: new Date()
    };

    onGuardar(productoCompleto);
  };

  const agregarEtiqueta = () => {
    if (nuevaEtiqueta.trim() && !(formData.etiquetas || []).includes(nuevaEtiqueta.trim())) {
      setFormData({
        ...formData,
        etiquetas: [...(formData.etiquetas || []), nuevaEtiqueta.trim()]
      });
      setNuevaEtiqueta('');
    }
  };

  const eliminarEtiqueta = (etiqueta: string) => {
    setFormData({
      ...formData,
      etiquetas: (formData.etiquetas || []).filter(e => e !== etiqueta)
    });
  };

  const agregarImagen = () => {
    if (nuevaImagen.trim()) {
      setFormData({
        ...formData,
        imagenes: [...(formData.imagenes || []), nuevaImagen.trim()]
      });
      setNuevaImagen('');
    }
  };

  const eliminarImagen = (index: number) => {
    setFormData({
      ...formData,
      imagenes: (formData.imagenes || []).filter((_, i) => i !== index)
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white p-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">
              {producto ? 'Editar Producto' : 'Nuevo Producto'}
            </h2>
            <p className="text-blue-100 text-sm">
              Completa la información del producto y sus variantes
            </p>
          </div>
          <button
            onClick={onCerrar}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Pestañas */}
        <div className="flex border-b border-gray-200 px-6">
          <button
            onClick={() => setPestanaActiva('general')}
            className={`px-6 py-3 font-medium border-b-2 transition-colors ${
              pestanaActiva === 'general'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            General
          </button>
          <button
            onClick={() => setPestanaActiva('variantes')}
            className={`px-6 py-3 font-medium border-b-2 transition-colors ${
              pestanaActiva === 'variantes'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Variantes y Stock
          </button>
          <button
            onClick={() => setPestanaActiva('seo')}
            className={`px-6 py-3 font-medium border-b-2 transition-colors ${
              pestanaActiva === 'seo'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            SEO
          </button>
        </div>

        {/* Contenido */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-6">
            {/* Pestaña General */}
            {pestanaActiva === 'general' && (
              <>
                {/* Información básica */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nombre del producto *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.nombre || ''}
                      onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Ej: Camiseta Premium Fan Club"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Descripción
                    </label>
                    <textarea
                      value={formData.descripcion || ''}
                      onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Descripción detallada del producto..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Categoría *
                    </label>
                    <select
                      required
                      value={formData.categoria || 'Ropa'}
                      onChange={(e) => setFormData({ ...formData, categoria: e.target.value, subcategoria: '' })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {categorias.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Subcategoría
                    </label>
                    <select
                      value={formData.subcategoria || ''}
                      onChange={(e) => setFormData({ ...formData, subcategoria: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      disabled={!subcategorias[formData.categoria || 'Ropa']?.length}
                    >
                      <option value="">Seleccionar...</option>
                      {subcategorias[formData.categoria || 'Ropa']?.map(subcat => (
                        <option key={subcat} value={subcat}>{subcat}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Marca
                    </label>
                    <input
                      type="text"
                      value={formData.marca || ''}
                      onChange={(e) => setFormData({ ...formData, marca: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Nombre de la marca"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Estado
                    </label>
                    <select
                      value={formData.estado || 'borrador'}
                      onChange={(e) => setFormData({ ...formData, estado: e.target.value as any })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="borrador">Borrador</option>
                      <option value="activo">Activo</option>
                      <option value="archivado">Archivado</option>
                    </select>
                  </div>
                </div>

                {/* Precios */}
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Precios</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Precio base *
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                        <input
                          type="number"
                          required
                          min="0"
                          step="0.01"
                          value={formData.precioBase || ''}
                          onChange={(e) => setFormData({ ...formData, precioBase: Number(e.target.value) })}
                          className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="0.00"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Precio de comparación
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          value={formData.precioComparacion || ''}
                          onChange={(e) => setFormData({ ...formData, precioComparacion: Number(e.target.value) || undefined })}
                          className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="0.00"
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Precio tachado (opcional)</p>
                    </div>
                  </div>
                </div>

                {/* Imágenes */}
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Imágenes</h3>
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <input
                        type="url"
                        value={nuevaImagen}
                        onChange={(e) => setNuevaImagen(e.target.value)}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="URL de la imagen"
                      />
                      <button
                        type="button"
                        onClick={agregarImagen}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                      >
                        <Upload className="w-4 h-4" />
                        Agregar
                      </button>
                    </div>

                    {formData.imagenes && formData.imagenes.length > 0 && (
                      <div className="grid grid-cols-4 gap-3">
                        {formData.imagenes.map((img, index) => (
                          <div key={index} className="relative group">
                            <img
                              src={img}
                              alt={`Imagen ${index + 1}`}
                              className="w-full h-24 object-cover rounded-lg"
                            />
                            <button
                              type="button"
                              onClick={() => eliminarImagen(index)}
                              className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Etiquetas */}
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Etiquetas</h3>
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={nuevaEtiqueta}
                        onChange={(e) => setNuevaEtiqueta(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), agregarEtiqueta())}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Nueva etiqueta"
                      />
                      <button
                        type="button"
                        onClick={agregarEtiqueta}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
                      >
                        <Tag className="w-4 h-4" />
                        Agregar
                      </button>
                    </div>

                    {formData.etiquetas && formData.etiquetas.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {formData.etiquetas.map((etiqueta, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm flex items-center gap-2"
                          >
                            {etiqueta}
                            <button
                              type="button"
                              onClick={() => eliminarEtiqueta(etiqueta)}
                              className="hover:text-indigo-600"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}

            {/* Pestaña Variantes */}
            {pestanaActiva === 'variantes' && (
              <VariantesManager
                opcionesVariantes={formData.opcionesVariantes || []}
                variantes={formData.variantes || []}
                precioBase={formData.precioBase || 0}
                onUpdate={(opcionesVariantes, variantes) => {
                  setFormData({
                    ...formData,
                    opcionesVariantes,
                    variantes,
                    tieneVariantes: variantes.length > 0
                  });
                }}
              />
            )}

            {/* Pestaña SEO */}
            {pestanaActiva === 'seo' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Título SEO
                  </label>
                  <input
                    type="text"
                    value={formData.seo?.titulo || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      seo: { ...formData.seo, titulo: e.target.value }
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Título optimizado para buscadores"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Meta descripción
                  </label>
                  <textarea
                    value={formData.seo?.descripcion || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      seo: { ...formData.seo, descripcion: e.target.value }
                    })}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Descripción para resultados de búsqueda"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Recomendado: 150-160 caracteres
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Palabras clave
                  </label>
                  <input
                    type="text"
                    value={formData.seo?.palabrasClave?.join(', ') || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      seo: {
                        ...formData.seo,
                        palabrasClave: e.target.value.split(',').map(k => k.trim()).filter(k => k)
                      }
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="palabra1, palabra2, palabra3"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Separadas por comas
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 p-6 bg-gray-50 flex justify-end gap-3">
            <button
              type="button"
              onClick={onCerrar}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:shadow-lg transition-all"
            >
              {producto ? 'Actualizar Producto' : 'Crear Producto'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductoFormModal;
