import React, { useState } from 'react';
import {
  Mail,
  ShoppingBag,
  Calendar,
  Gift,
  TrendingUp,
  Users,
  Heart,
  Zap,
  Search,
  Star,
  Eye,
} from 'lucide-react';

interface Template {
  id: string;
  name: string;
  category: string;
  icon: any;
  description: string;
  preview: string;
  blocks: any[];
  tags: string[];
  popular?: boolean;
}

interface BibliotecaTemplatesProps {
  onSelectTemplate: (template: Template) => void;
}

export default function BibliotecaTemplates({
  onSelectTemplate,
}: BibliotecaTemplatesProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null);

  const categories = [
    { id: 'all', label: 'Todos', icon: Mail },
    { id: 'bienvenida', label: 'Bienvenida', icon: Heart },
    { id: 'promocion', label: 'Promociones', icon: ShoppingBag },
    { id: 'newsletter', label: 'Newsletter', icon: TrendingUp },
    { id: 'evento', label: 'Eventos', icon: Calendar },
    { id: 'transaccional', label: 'Transaccional', icon: Zap },
    { id: 'retencion', label: 'Retención', icon: Users },
  ];

  const templates: Template[] = [
    {
      id: 'welcome-1',
      name: '¡Bienvenido a bordo!',
      category: 'bienvenida',
      icon: Heart,
      description: 'Email de bienvenida cálido y profesional para nuevos usuarios',
      preview:
        'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=300&fit=crop',
      tags: ['onboarding', 'primeros pasos', 'engagement'],
      popular: true,
      blocks: [
        {
          id: '1',
          type: 'image',
          content: {
            src: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&h=200&fit=crop',
            alt: 'Bienvenida',
          },
          style: { padding: '0px' },
        },
        {
          id: '2',
          type: 'text',
          content: { html: '<h1>¡Bienvenido a nuestra comunidad! 🎉</h1>' },
          style: { padding: '20px', fontSize: '28px', color: '#1f2937' },
        },
        {
          id: '3',
          type: 'text',
          content: {
            html: '<p>Estamos emocionados de tenerte con nosotros. Preparamos una guía especial para que comiences con el pie derecho.</p>',
          },
          style: { padding: '0 20px 20px', fontSize: '16px', color: '#4b5563' },
        },
        {
          id: '4',
          type: 'button',
          content: { text: 'Comenzar ahora', url: '#' },
          style: {
            padding: '12px 32px',
            backgroundColor: '#3b82f6',
            color: '#ffffff',
            borderRadius: '8px',
          },
        },
      ],
    },
    {
      id: 'promo-1',
      name: 'Oferta Flash',
      category: 'promocion',
      icon: ShoppingBag,
      description: 'Template urgente para promociones limitadas',
      preview:
        'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400&h=300&fit=crop',
      tags: ['urgencia', 'descuento', 'venta'],
      popular: true,
      blocks: [
        {
          id: '1',
          type: 'text',
          content: {
            html: '<h1 style="color: #dc2626;">🔥 OFERTA FLASH - 24H</h1>',
          },
          style: { padding: '30px 20px', fontSize: '32px', textAlign: 'center' },
        },
        {
          id: '2',
          type: 'text',
          content: {
            html: '<p style="text-align: center; font-size: 48px; font-weight: bold; color: #3b82f6;">50% OFF</p>',
          },
          style: { padding: '0 20px' },
        },
        {
          id: '3',
          type: 'text',
          content: {
            html: '<p>Solo por hoy, obtén un 50% de descuento en todos nuestros planes. No dejes pasar esta oportunidad única.</p>',
          },
          style: { padding: '20px', fontSize: '16px', color: '#4b5563' },
        },
        {
          id: '4',
          type: 'button',
          content: { text: 'Aprovechar oferta', url: '#' },
          style: {
            padding: '14px 36px',
            backgroundColor: '#dc2626',
            color: '#ffffff',
            borderRadius: '8px',
          },
        },
      ],
    },
    {
      id: 'newsletter-1',
      name: 'Newsletter Mensual',
      category: 'newsletter',
      icon: TrendingUp,
      description: 'Diseño limpio para actualizaciones mensuales',
      preview:
        'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=400&h=300&fit=crop',
      tags: ['contenido', 'noticias', 'actualizaciones'],
      blocks: [
        {
          id: '1',
          type: 'text',
          content: {
            html: '<h2>📰 Newsletter - Diciembre 2024</h2>',
          },
          style: { padding: '20px', fontSize: '24px', color: '#1f2937' },
        },
        {
          id: '2',
          type: 'divider',
          content: { style: 'solid', color: '#e5e7eb' },
          style: { margin: '0 20px' },
        },
        {
          id: '3',
          type: 'text',
          content: {
            html: '<h3>🎯 Lo más destacado del mes</h3><ul><li>Nueva funcionalidad de IA</li><li>Mejoras en rendimiento</li><li>Eventos próximos</li></ul>',
          },
          style: { padding: '20px', fontSize: '16px', color: '#4b5563' },
        },
      ],
    },
    {
      id: 'evento-1',
      name: 'Invitación a Evento',
      category: 'evento',
      icon: Calendar,
      description: 'Invitación elegante para webinars y eventos',
      preview:
        'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop',
      tags: ['webinar', 'conferencia', 'invitación'],
      popular: true,
      blocks: [
        {
          id: '1',
          type: 'text',
          content: {
            html: '<h1 style="text-align: center;">Estás invitado a nuestro Webinar</h1>',
          },
          style: { padding: '30px 20px', fontSize: '28px', color: '#1f2937' },
        },
        {
          id: '2',
          type: 'text',
          content: {
            html: '<p style="text-align: center;"><strong>📅 15 de Diciembre, 2024</strong><br>🕐 18:00 - 19:30 hrs</p>',
          },
          style: { padding: '20px', fontSize: '18px', color: '#4b5563' },
        },
        {
          id: '3',
          type: 'button',
          content: { text: 'Reservar mi lugar', url: '#' },
          style: {
            padding: '14px 32px',
            backgroundColor: '#8b5cf6',
            color: '#ffffff',
            borderRadius: '8px',
          },
        },
      ],
    },
    {
      id: 'transaccional-1',
      name: 'Confirmación de Compra',
      category: 'transaccional',
      icon: Zap,
      description: 'Email transaccional para confirmaciones de compra',
      preview:
        'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop',
      tags: ['confirmación', 'pedido', 'recibo'],
      blocks: [
        {
          id: '1',
          type: 'text',
          content: {
            html: '<h2>✅ ¡Pedido confirmado!</h2>',
          },
          style: { padding: '20px', fontSize: '26px', color: '#059669' },
        },
        {
          id: '2',
          type: 'text',
          content: {
            html: '<p>Gracias por tu compra. Tu pedido #12345 ha sido procesado correctamente.</p>',
          },
          style: { padding: '0 20px 20px', fontSize: '16px', color: '#4b5563' },
        },
      ],
    },
    {
      id: 'retencion-1',
      name: 'Te Extrañamos',
      category: 'retencion',
      icon: Users,
      description: 'Campaña de reactivación para usuarios inactivos',
      preview:
        'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop',
      tags: ['reactivación', 'engagement', 'oferta'],
      blocks: [
        {
          id: '1',
          type: 'text',
          content: {
            html: '<h1>¡Te hemos extrañado! 💙</h1>',
          },
          style: { padding: '30px 20px', fontSize: '28px', color: '#1f2937' },
        },
        {
          id: '2',
          type: 'text',
          content: {
            html: '<p>Han pasado 30 días desde tu última visita. Tenemos novedades increíbles para ti y un regalo especial de bienvenida.</p>',
          },
          style: { padding: '0 20px 20px', fontSize: '16px', color: '#4b5563' },
        },
        {
          id: '3',
          type: 'button',
          content: { text: 'Ver mi regalo', url: '#' },
          style: {
            padding: '12px 32px',
            backgroundColor: '#ec4899',
            color: '#ffffff',
            borderRadius: '8px',
          },
        },
      ],
    },
    {
      id: 'gift-1',
      name: 'Regalo Especial',
      category: 'promocion',
      icon: Gift,
      description: 'Template para regalos y sorpresas a clientes',
      preview:
        'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=400&h=300&fit=crop',
      tags: ['regalo', 'sorpresa', 'fidelización'],
      blocks: [
        {
          id: '1',
          type: 'text',
          content: {
            html: '<h1 style="text-align: center;">🎁 Tienes un regalo esperándote</h1>',
          },
          style: { padding: '30px 20px', fontSize: '28px', color: '#1f2937' },
        },
        {
          id: '2',
          type: 'text',
          content: {
            html: '<p>Como agradecimiento por ser parte de nuestra comunidad, queremos regalarte un mes gratis de nuestro plan premium.</p>',
          },
          style: { padding: '20px', fontSize: '16px', color: '#4b5563' },
        },
        {
          id: '3',
          type: 'button',
          content: { text: 'Reclamar mi regalo', url: '#' },
          style: {
            padding: '14px 32px',
            backgroundColor: '#f59e0b',
            color: '#ffffff',
            borderRadius: '8px',
          },
        },
      ],
    },
    {
      id: 'newsletter-2',
      name: 'Tips Semanales',
      category: 'newsletter',
      icon: Zap,
      description: 'Newsletter con consejos y tips útiles',
      preview:
        'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=300&fit=crop',
      tags: ['consejos', 'educación', 'valor'],
      blocks: [
        {
          id: '1',
          type: 'text',
          content: {
            html: '<h2>💡 Tips de la semana</h2>',
          },
          style: { padding: '20px', fontSize: '26px', color: '#1f2937' },
        },
        {
          id: '2',
          type: 'text',
          content: {
            html: '<p><strong>Tip #1:</strong> Aprovecha las integraciones para automatizar tu trabajo.</p><p><strong>Tip #2:</strong> Utiliza las plantillas para ahorrar tiempo.</p><p><strong>Tip #3:</strong> Programa tus publicaciones con anticipación.</p>',
          },
          style: { padding: '0 20px 20px', fontSize: '16px', color: '#4b5563' },
        },
      ],
    },
  ];

  const filteredTemplates = templates.filter((template) => {
    const matchesCategory =
      selectedCategory === 'all' || template.category === selectedCategory;
    const matchesSearch =
      searchQuery === '' ||
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Biblioteca de Templates
        </h2>
        <p className="text-gray-600">
          Selecciona una plantilla profesional y personalízala a tu gusto
        </p>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar templates por nombre, descripción o tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              {category.label}
            </button>
          );
        })}
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => {
          const Icon = template.icon;
          return (
            <div
              key={template.id}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-all group"
            >
              {/* Preview Image */}
              <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                <img
                  src={template.preview}
                  alt={template.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {template.popular && (
                  <div className="absolute top-3 right-3 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                    <Star className="w-3 h-3 fill-current" />
                    Popular
                  </div>
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <button
                    onClick={() => setPreviewTemplate(template)}
                    className="bg-white text-gray-900 px-4 py-2 rounded-lg font-medium flex items-center gap-2 transform translate-y-2 group-hover:translate-y-0 transition-transform"
                  >
                    <Eye className="w-4 h-4" />
                    Vista Previa
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-start gap-3 mb-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {template.name}
                    </h3>
                    <p className="text-sm text-gray-600">{template.description}</p>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {template.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action */}
                <button
                  onClick={() => onSelectTemplate(template)}
                  className="w-full py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium hover:shadow-lg transition-all"
                >
                  Usar Template
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredTemplates.length === 0 && (
        <div className="text-center py-12">
          <Mail className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No se encontraron templates
          </h3>
          <p className="text-gray-600">
            Intenta con otros términos de búsqueda o categorías
          </p>
        </div>
      )}

      {/* Preview Modal */}
      {previewTemplate && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">
                {previewTemplate.name}
              </h3>
              <button
                onClick={() => setPreviewTemplate(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            <div className="p-6">
              <img
                src={previewTemplate.preview}
                alt={previewTemplate.name}
                className="w-full rounded-lg mb-4"
              />
              <p className="text-gray-600 mb-4">{previewTemplate.description}</p>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    onSelectTemplate(previewTemplate);
                    setPreviewTemplate(null);
                  }}
                  className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium hover:shadow-lg transition-all"
                >
                  Usar Template
                </button>
                <button
                  onClick={() => setPreviewTemplate(null)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
