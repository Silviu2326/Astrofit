import React, { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { 
  Settings, 
  Store, 
  Palette, 
  CreditCard, 
  Truck, 
  Globe, 
  Shield, 
  Bell,
  Users,
  BarChart3,
  Save,
  Eye,
  Upload,
  Download,
  RefreshCw,
  Check,
  Plus,
  Trash2,
  Edit,
  ExternalLink
} from 'lucide-react';
import Modal from '../../../../../components/ui/modal';
import ConfirmationModal from '../../../../../components/ui/confirmation-modal';

const ConfiguracionTiendaPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('general');
  
  // Estados para modales
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Estados para funcionalidades específicas
  const [shippingZones, setShippingZones] = useState([
    { id: 1, name: 'Estados Unidos', rate: 15.00, countries: ['US'] },
    { id: 2, name: 'Europa', rate: 25.00, countries: ['DE', 'FR', 'ES', 'IT'] },
    { id: 3, name: 'América Latina', rate: 20.00, countries: ['MX', 'BR', 'AR', 'CO'] }
  ]);
  
  const [users, setUsers] = useState([
    { id: 1, name: 'Juan Pérez', email: 'juan@tienda.com', role: 'admin', status: 'active' },
    { id: 2, name: 'María García', email: 'maria@tienda.com', role: 'manager', status: 'active' },
    { id: 3, name: 'Carlos López', email: 'carlos@tienda.com', role: 'staff', status: 'inactive' }
  ]);
  
  const [editingUser, setEditingUser] = useState<any>(null);
  const [editingZone, setEditingZone] = useState<any>(null);
  const [domainStatus, setDomainStatus] = useState({
    verified: false,
    sslActive: false,
    lastChecked: null as string | null
  });
  const [analyticsStatus, setAnalyticsStatus] = useState({
    googleAnalytics: { connected: false, lastVerified: null as string | null },
    facebookPixel: { connected: false, lastVerified: null as string | null }
  });
  
  // Estados para formularios
  const [formData, setFormData] = useState({
    // General
    storeName: '',
    description: '',
    email: '',
    phone: '',
    
    // Apariencia
    primaryColor: '#6366f1',
    secondaryColor: '#8b5cf6',
    logo: null as File | null,
    favicon: null as File | null,
    
    // Pagos
    paymentMethods: ['stripe', 'paypal'],
    currency: 'USD',
    taxRate: 0,
    
    // Envíos
    shippingZones: [],
    defaultShippingRate: 0,
    freeShippingThreshold: 50,
    
    // Dominio
    customDomain: '',
    sslEnabled: true,
    
    // Seguridad
    twoFactorAuth: false,
    apiKey: '',
    
    // Notificaciones
    emailNotifications: true,
    smsNotifications: false,
    
    // Usuarios
    userRoles: ['admin', 'manager', 'staff'],
    
    // Analytics
    googleAnalytics: '',
    facebookPixel: ''
  });

  const tabs = [
    { id: 'general', label: 'General', icon: Settings },
    { id: 'apariencia', label: 'Apariencia', icon: Palette },
    { id: 'pagos', label: 'Pagos', icon: CreditCard },
    { id: 'envios', label: 'Envíos', icon: Truck },
    { id: 'dominio', label: 'Dominio', icon: Globe },
    { id: 'seguridad', label: 'Seguridad', icon: Shield },
    { id: 'notificaciones', label: 'Notificaciones', icon: Bell },
    { id: 'usuarios', label: 'Usuarios', icon: Users },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 }
  ];

  // Funciones de manejo
  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // Simular guardado
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success('Configuración guardada exitosamente');
    } catch (error) {
      toast.error('Error al guardar la configuración');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setModalType('reset');
    setIsConfirmationModalOpen(true);
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(formData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = 'configuracion-tienda.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    toast.success('Configuración exportada exitosamente');
  };

  const handleImport = () => {
    setModalType('import');
    setIsModalOpen(true);
  };

  const handlePreview = () => {
    toast.success('Vista previa abierta en nueva pestaña');
    window.open('/preview', '_blank');
  };

  const handleConfirmAction = async () => {
    if (modalType === 'reset') {
      setIsLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setFormData({
          storeName: '',
          description: '',
          email: '',
          phone: '',
          primaryColor: '#6366f1',
          secondaryColor: '#8b5cf6',
          logo: null,
          favicon: null,
          paymentMethods: ['stripe', 'paypal'],
          currency: 'USD',
          taxRate: 0,
          shippingZones: [],
          defaultShippingRate: 0,
          freeShippingThreshold: 50,
          customDomain: '',
          sslEnabled: true,
          twoFactorAuth: false,
          apiKey: '',
          emailNotifications: true,
          smsNotifications: false,
          userRoles: ['admin', 'manager', 'staff'],
          googleAnalytics: '',
          facebookPixel: ''
        });
        toast.success('Configuración restablecida');
      } catch (error) {
        toast.error('Error al restablecer la configuración');
      } finally {
        setIsLoading(false);
      }
    } else if (modalType === 'delete-user' && editingUser) {
      setIsLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 800));
        setUsers(prev => prev.filter(user => user.id !== editingUser.id));
        toast.success('Usuario eliminado exitosamente');
        setEditingUser(null);
      } catch (error) {
        toast.error('Error al eliminar el usuario');
      } finally {
        setIsLoading(false);
      }
    } else if (modalType === 'delete-zone' && editingZone) {
      setIsLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 800));
        setShippingZones(prev => prev.filter(zone => zone.id !== editingZone.id));
        toast.success('Zona de envío eliminada exitosamente');
        setEditingZone(null);
      } catch (error) {
        toast.error('Error al eliminar la zona de envío');
      } finally {
        setIsLoading(false);
      }
    }
    setIsConfirmationModalOpen(false);
  };

  // Funciones para gestión de zonas de envío
  const handleAddShippingZone = () => {
    setModalType('add-zone');
    setIsModalOpen(true);
  };

  const handleEditShippingZone = (zone: any) => {
    setEditingZone(zone);
    setModalType('edit-zone');
    setIsModalOpen(true);
  };

  const handleDeleteShippingZone = (zone: any) => {
    setEditingZone(zone);
    setModalType('delete-zone');
    setIsConfirmationModalOpen(true);
  };

  const handleSaveShippingZone = async (zoneData: any) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      if (editingZone) {
        setShippingZones(prev => prev.map(zone => 
          zone.id === editingZone.id ? { ...zone, ...zoneData } : zone
        ));
        toast.success('Zona de envío actualizada exitosamente');
      } else {
        const newZone = { id: Date.now(), ...zoneData };
        setShippingZones(prev => [...prev, newZone]);
        toast.success('Zona de envío creada exitosamente');
      }
      setEditingZone(null);
      setIsModalOpen(false);
    } catch (error) {
      toast.error('Error al guardar la zona de envío');
    } finally {
      setIsLoading(false);
    }
  };

  // Funciones para gestión de usuarios
  const handleAddUser = () => {
    setModalType('add-user');
    setIsModalOpen(true);
  };

  const handleEditUser = (user: any) => {
    setEditingUser(user);
    setModalType('edit-user');
    setIsModalOpen(true);
  };

  const handleDeleteUser = (user: any) => {
    setEditingUser(user);
    setModalType('delete-user');
    setIsConfirmationModalOpen(true);
  };

  const handleSaveUser = async (userData: any) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      if (editingUser) {
        setUsers(prev => prev.map(user => 
          user.id === editingUser.id ? { ...user, ...userData } : user
        ));
        toast.success('Usuario actualizado exitosamente');
      } else {
        const newUser = { id: Date.now(), ...userData };
        setUsers(prev => [...prev, newUser]);
        toast.success('Usuario creado exitosamente');
      }
      setEditingUser(null);
      setIsModalOpen(false);
    } catch (error) {
      toast.error('Error al guardar el usuario');
    } finally {
      setIsLoading(false);
    }
  };

  // Funciones para verificación de dominio
  const handleVerifyDomain = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setDomainStatus({
        verified: true,
        sslActive: formData.sslEnabled,
        lastChecked: new Date().toISOString()
      });
      toast.success('Dominio verificado exitosamente');
    } catch (error) {
      toast.error('Error al verificar el dominio');
    } finally {
      setIsLoading(false);
    }
  };

  // Funciones para generación de API key
  const handleGenerateApiKey = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      const newApiKey = `sk_live_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;
      handleInputChange('apiKey', newApiKey);
      toast.success('Nueva API key generada exitosamente');
    } catch (error) {
      toast.error('Error al generar la API key');
    } finally {
      setIsLoading(false);
    }
  };

  // Funciones para verificación de analytics
  const handleVerifyGoogleAnalytics = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setAnalyticsStatus(prev => ({
        ...prev,
        googleAnalytics: { connected: true, lastVerified: new Date().toISOString() }
      }));
      toast.success('Google Analytics verificado exitosamente');
    } catch (error) {
      toast.error('Error al verificar Google Analytics');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyFacebookPixel = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setAnalyticsStatus(prev => ({
        ...prev,
        facebookPixel: { connected: true, lastVerified: new Date().toISOString() }
      }));
      toast.success('Facebook Pixel verificado exitosamente');
    } catch (error) {
      toast.error('Error al verificar Facebook Pixel');
    } finally {
      setIsLoading(false);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Información Básica</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nombre de la Tienda</label>
                    <input
                      type="text"
                      value={formData.storeName}
                      onChange={(e) => handleInputChange('storeName', e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm"
                      placeholder="Mi Tienda Fitness"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Descripción</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm"
                      rows={3}
                      placeholder="Describe tu tienda..."
                    />
                  </div>
                </div>
              </div>
              <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Contacto</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm"
                      placeholder="contacto@mitienda.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Teléfono</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm"
                      placeholder="+1 234 567 8900"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Botones de acción */}
            <div className="flex flex-wrap gap-4 justify-end">
              <button
                onClick={handlePreview}
                className="flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <Eye className="w-5 h-5" />
                Vista Previa
              </button>
              <button
                onClick={handleSave}
                disabled={isLoading}
                className="flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <RefreshCw className="w-5 h-5 animate-spin" />
                ) : (
                  <Save className="w-5 h-5" />
                )}
                {isLoading ? 'Guardando...' : 'Guardar'}
              </button>
            </div>
          </div>
        );
      
      case 'apariencia':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Colores</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Color Primario</label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={formData.primaryColor}
                        onChange={(e) => handleInputChange('primaryColor', e.target.value)}
                        className="w-12 h-12 rounded-xl border-2 border-gray-200 cursor-pointer"
                      />
                      <input
                        type="text"
                        value={formData.primaryColor}
                        onChange={(e) => handleInputChange('primaryColor', e.target.value)}
                        className="flex-1 px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Color Secundario</label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={formData.secondaryColor}
                        onChange={(e) => handleInputChange('secondaryColor', e.target.value)}
                        className="w-12 h-12 rounded-xl border-2 border-gray-200 cursor-pointer"
                      />
                      <input
                        type="text"
                        value={formData.secondaryColor}
                        onChange={(e) => handleInputChange('secondaryColor', e.target.value)}
                        className="flex-1 px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Imágenes</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Logo</label>
                    <div className="flex items-center gap-3">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleInputChange('logo', e.target.files?.[0] || null)}
                        className="hidden"
                        id="logo-upload"
                      />
                      <label
                        htmlFor="logo-upload"
                        className="flex items-center gap-2 px-4 py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-2xl font-semibold transition-all duration-300 cursor-pointer"
                      >
                        <Upload className="w-5 h-5" />
                        Subir Logo
                      </label>
                      {formData.logo && (
                        <span className="text-sm text-gray-600">{formData.logo.name}</span>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Favicon</label>
                    <div className="flex items-center gap-3">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleInputChange('favicon', e.target.files?.[0] || null)}
                        className="hidden"
                        id="favicon-upload"
                      />
                      <label
                        htmlFor="favicon-upload"
                        className="flex items-center gap-2 px-4 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-2xl font-semibold transition-all duration-300 cursor-pointer"
                      >
                        <Upload className="w-5 h-5" />
                        Subir Favicon
                      </label>
                      {formData.favicon && (
                        <span className="text-sm text-gray-600">{formData.favicon.name}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4 justify-end">
              <button
                onClick={handleSave}
                disabled={isLoading}
                className="flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <RefreshCw className="w-5 h-5 animate-spin" />
                ) : (
                  <Save className="w-5 h-5" />
                )}
                {isLoading ? 'Guardando...' : 'Guardar'}
              </button>
            </div>
          </div>
        );
      
      case 'pagos':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Métodos de Pago</h3>
                <div className="space-y-4">
                  {['stripe', 'paypal', 'apple-pay', 'google-pay', 'bank-transfer'].map((method) => (
                    <label key={method} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.paymentMethods.includes(method)}
                        onChange={(e) => {
                          const methods = e.target.checked
                            ? [...formData.paymentMethods, method]
                            : formData.paymentMethods.filter(m => m !== method);
                          handleInputChange('paymentMethods', methods);
                        }}
                        className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500"
                      />
                      <span className="text-gray-700 capitalize">{method.replace('-', ' ')}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Configuración</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Moneda</label>
                    <select
                      value={formData.currency}
                      onChange={(e) => handleInputChange('currency', e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm"
                    >
                      <option value="USD">USD - Dólar Estadounidense</option>
                      <option value="EUR">EUR - Euro</option>
                      <option value="GBP">GBP - Libra Esterlina</option>
                      <option value="MXN">MXN - Peso Mexicano</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tasa de Impuestos (%)</label>
                    <input
                      type="number"
                      value={formData.taxRate}
                      onChange={(e) => handleInputChange('taxRate', parseFloat(e.target.value) || 0)}
                      className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm"
                      min="0"
                      max="100"
                      step="0.01"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4 justify-end">
              <button
                onClick={handleSave}
                disabled={isLoading}
                className="flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <RefreshCw className="w-5 h-5 animate-spin" />
                ) : (
                  <Save className="w-5 h-5" />
                )}
                {isLoading ? 'Guardando...' : 'Guardar'}
              </button>
            </div>
          </div>
        );
      
      case 'envios':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Configuración de Envío</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tarifa de Envío por Defecto ($)</label>
                    <input
                      type="number"
                      value={formData.defaultShippingRate}
                      onChange={(e) => handleInputChange('defaultShippingRate', parseFloat(e.target.value) || 0)}
                      className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm"
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Umbral de Envío Gratuito ($)</label>
                    <input
                      type="number"
                      value={formData.freeShippingThreshold}
                      onChange={(e) => handleInputChange('freeShippingThreshold', parseFloat(e.target.value) || 0)}
                      className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm"
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>
              </div>
              <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Zonas de Envío</h3>
                  <button
                    onClick={handleAddShippingZone}
                    className="flex items-center gap-2 px-4 py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-2xl font-semibold transition-all duration-300"
                  >
                    <Plus className="w-5 h-5" />
                    Agregar Zona
                  </button>
                </div>
                <div className="space-y-3">
                  {shippingZones.map((zone) => (
                    <div key={zone.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                          <Truck className="w-5 h-5 text-indigo-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{zone.name}</h4>
                          <p className="text-sm text-gray-600">${zone.rate} - {zone.countries.length} países</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEditShippingZone(zone)}
                          className="p-2 text-gray-400 hover:text-indigo-600 transition-colors"
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteShippingZone(zone)}
                          className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4 justify-end">
              <button
                onClick={handleSave}
                disabled={isLoading}
                className="flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <RefreshCw className="w-5 h-5 animate-spin" />
                ) : (
                  <Save className="w-5 h-5" />
                )}
                {isLoading ? 'Guardando...' : 'Guardar'}
              </button>
            </div>
          </div>
        );
      
      case 'dominio':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Dominio Personalizado</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Dominio</label>
                    <input
                      type="text"
                      value={formData.customDomain}
                      onChange={(e) => handleInputChange('customDomain', e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm"
                      placeholder="mitienda.com"
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={formData.sslEnabled}
                      onChange={(e) => handleInputChange('sslEnabled', e.target.checked)}
                      className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500"
                    />
                    <span className="text-gray-700">Habilitar SSL</span>
                  </div>
                </div>
              </div>
              <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Estado del Dominio</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${domainStatus.verified ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    <span className="text-gray-700">
                      {domainStatus.verified ? 'Dominio verificado' : 'Dominio no verificado'}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${domainStatus.sslActive ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                    <span className="text-gray-700">
                      {domainStatus.sslActive ? 'SSL activo' : 'SSL pendiente'}
                    </span>
                  </div>
                  {domainStatus.lastChecked && (
                    <div className="text-sm text-gray-500">
                      Última verificación: {new Date(domainStatus.lastChecked).toLocaleString()}
                    </div>
                  )}
                  <button
                    onClick={handleVerifyDomain}
                    disabled={isLoading}
                    className="flex items-center gap-2 px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-2xl font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <RefreshCw className="w-5 h-5 animate-spin" />
                    ) : (
                      <ExternalLink className="w-5 h-5" />
                    )}
                    {isLoading ? 'Verificando...' : 'Verificar Dominio'}
                  </button>
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4 justify-end">
              <button
                onClick={handleSave}
                disabled={isLoading}
                className="flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <RefreshCw className="w-5 h-5 animate-spin" />
                ) : (
                  <Save className="w-5 h-5" />
                )}
                {isLoading ? 'Guardando...' : 'Guardar'}
              </button>
            </div>
          </div>
        );
      
      case 'seguridad':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Autenticación</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">Autenticación de Dos Factores</h4>
                      <p className="text-sm text-gray-600">Añade una capa extra de seguridad</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.twoFactorAuth}
                        onChange={(e) => handleInputChange('twoFactorAuth', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                    </label>
                  </div>
                </div>
              </div>
              <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">API Key</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Clave API</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="password"
                        value={formData.apiKey}
                        onChange={(e) => handleInputChange('apiKey', e.target.value)}
                        className="flex-1 px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm"
                        placeholder="sk_live_..."
                      />
                      <button
                        onClick={handleGenerateApiKey}
                        disabled={isLoading}
                        className="p-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4 justify-end">
              <button
                onClick={handleSave}
                disabled={isLoading}
                className="flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <RefreshCw className="w-5 h-5 animate-spin" />
                ) : (
                  <Save className="w-5 h-5" />
                )}
                {isLoading ? 'Guardando...' : 'Guardar'}
              </button>
            </div>
          </div>
        );
      
      case 'notificaciones':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Notificaciones por Email</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">Habilitar notificaciones</h4>
                      <p className="text-sm text-gray-600">Recibe notificaciones por email</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.emailNotifications}
                        onChange={(e) => handleInputChange('emailNotifications', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                    </label>
                  </div>
                </div>
              </div>
              <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Notificaciones por SMS</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">Habilitar notificaciones</h4>
                      <p className="text-sm text-gray-600">Recibe notificaciones por SMS</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.smsNotifications}
                        onChange={(e) => handleInputChange('smsNotifications', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4 justify-end">
              <button
                onClick={handleSave}
                disabled={isLoading}
                className="flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <RefreshCw className="w-5 h-5 animate-spin" />
                ) : (
                  <Save className="w-5 h-5" />
                )}
                {isLoading ? 'Guardando...' : 'Guardar'}
              </button>
            </div>
          </div>
        );
      
      case 'usuarios':
        return (
          <div className="space-y-6">
            <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Usuarios</h3>
                <button
                  onClick={handleAddUser}
                  className="flex items-center gap-2 px-4 py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-2xl font-semibold transition-all duration-300"
                >
                  <Plus className="w-5 h-5" />
                  Agregar Usuario
                </button>
              </div>
              <div className="space-y-4">
                {users.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                        <Users className="w-5 h-5 text-indigo-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{user.name}</h4>
                        <p className="text-sm text-gray-600">{user.email} • {user.role}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <div className={`w-2 h-2 rounded-full ${user.status === 'active' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                          <span className="text-xs text-gray-500 capitalize">{user.status}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEditUser(user)}
                        className="p-2 text-gray-400 hover:text-indigo-600 transition-colors"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user)}
                        className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4 justify-end">
              <button
                onClick={handleSave}
                disabled={isLoading}
                className="flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <RefreshCw className="w-5 h-5 animate-spin" />
                ) : (
                  <Save className="w-5 h-5" />
                )}
                {isLoading ? 'Guardando...' : 'Guardar'}
              </button>
            </div>
          </div>
        );
      
      case 'analytics':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Google Analytics</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">ID de Seguimiento</label>
                    <input
                      type="text"
                      value={formData.googleAnalytics}
                      onChange={(e) => handleInputChange('googleAnalytics', e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm"
                      placeholder="G-XXXXXXXXXX"
                    />
                  </div>
                  <button
                    onClick={handleVerifyGoogleAnalytics}
                    disabled={isLoading || !formData.googleAnalytics}
                    className="flex items-center gap-2 px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-2xl font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <RefreshCw className="w-5 h-5 animate-spin" />
                    ) : analyticsStatus.googleAnalytics.connected ? (
                      <Check className="w-5 h-5 text-green-300" />
                    ) : (
                      <Check className="w-5 h-5" />
                    )}
                    {isLoading ? 'Verificando...' : analyticsStatus.googleAnalytics.connected ? 'Conectado' : 'Verificar Conexión'}
                  </button>
                  {analyticsStatus.googleAnalytics.lastVerified && (
                    <div className="text-sm text-gray-500">
                      Verificado: {new Date(analyticsStatus.googleAnalytics.lastVerified).toLocaleString()}
                    </div>
                  )}
                </div>
              </div>
              <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Facebook Pixel</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">ID del Pixel</label>
                    <input
                      type="text"
                      value={formData.facebookPixel}
                      onChange={(e) => handleInputChange('facebookPixel', e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm"
                      placeholder="123456789012345"
                    />
                  </div>
                  <button
                    onClick={handleVerifyFacebookPixel}
                    disabled={isLoading || !formData.facebookPixel}
                    className="flex items-center gap-2 px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-2xl font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <RefreshCw className="w-5 h-5 animate-spin" />
                    ) : analyticsStatus.facebookPixel.connected ? (
                      <Check className="w-5 h-5 text-green-300" />
                    ) : (
                      <Check className="w-5 h-5" />
                    )}
                    {isLoading ? 'Verificando...' : analyticsStatus.facebookPixel.connected ? 'Conectado' : 'Verificar Conexión'}
                  </button>
                  {analyticsStatus.facebookPixel.lastVerified && (
                    <div className="text-sm text-gray-500">
                      Verificado: {new Date(analyticsStatus.facebookPixel.lastVerified).toLocaleString()}
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4 justify-end">
              <button
                onClick={handleSave}
                disabled={isLoading}
                className="flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <RefreshCw className="w-5 h-5 animate-spin" />
                ) : (
                  <Save className="w-5 h-5" />
                )}
                {isLoading ? 'Guardando...' : 'Guardar'}
              </button>
            </div>
          </div>
        );
      
      default:
        return (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <Store className="w-12 h-12 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Configuración de {tabs.find(tab => tab.id === activeTab)?.label}</h3>
            <p className="text-gray-600">Esta sección estará disponible próximamente.</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/30 pb-12">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl shadow-2xl mb-8 p-8 md:p-12"
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
              <Settings className="w-10 h-10 text-yellow-300 animate-pulse" />
              <div className="absolute inset-0 w-10 h-10 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Configuración de <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Tienda</span>
            </h1>
          </div>

          {/* Descripción */}
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl leading-relaxed">
            Personaliza y configura todos los aspectos de tu <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">tienda online</span>
          </p>
        </div>
      </motion.div>

      {/* Contenido Principal */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar de Pestañas */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="lg:col-span-1"
          >
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden">
              {/* Decoración de fondo */}
              <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full blur-3xl opacity-20"></div>
              
              <div className="relative z-10">
                <h2 className="text-lg font-bold text-gray-900 mb-6">Configuraciones</h2>
                <div className="space-y-2">
                  {tabs.map((tab, index) => {
                    const Icon = tab.icon;
                    return (
                      <motion.button
                        key={tab.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + index * 0.05, duration: 0.4 }}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 text-left group ${
                          activeTab === tab.id
                            ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg'
                            : 'hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 text-gray-700 hover:text-gray-900'
                        }`}
                      >
                        <div className={`p-2 rounded-xl ${
                          activeTab === tab.id
                            ? 'bg-white/20 backdrop-blur-sm'
                            : 'bg-gray-100 group-hover:bg-indigo-100'
                        }`}>
                          <Icon className={`w-5 h-5 ${
                            activeTab === tab.id ? 'text-white' : 'text-gray-600 group-hover:text-indigo-600'
                          }`} />
                        </div>
                        <span className="font-medium">{tab.label}</span>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contenido de Pestaña */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="lg:col-span-3"
          >
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/50 relative overflow-hidden">
              {/* Decoración de fondo */}
              <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full blur-3xl opacity-20"></div>
              
              <div className="relative z-10">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  {renderTabContent()}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Botones de Acción Globales */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-8 flex flex-wrap gap-4 justify-center"
        >
          <button
            onClick={handleImport}
            className="flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <Download className="w-5 h-5" />
            Importar Configuración
          </button>
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <Upload className="w-5 h-5" />
            Exportar Configuración
          </button>
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <RefreshCw className="w-5 h-5" />
            Restablecer Todo
          </button>
        </motion.div>
      </div>

      {/* Modal de Importación */}
      <Modal
        isOpen={isModalOpen && modalType === 'import'}
        onClose={() => setIsModalOpen(false)}
        title="Importar Configuración"
        size="md"
      >
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Seleccionar archivo JSON
            </label>
            <input
              type="file"
              accept=".json"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = (event) => {
                    try {
                      const importedData = JSON.parse(event.target?.result as string);
                      setFormData(prev => ({ ...prev, ...importedData }));
                      toast.success('Configuración importada exitosamente');
                      setIsModalOpen(false);
                    } catch (error) {
                      toast.error('Error al importar el archivo. Verifica que sea un JSON válido.');
                    }
                  };
                  reader.readAsText(file);
                }
              }}
              className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm"
            />
          </div>
          <div className="flex gap-3 justify-end">
            <button
              onClick={() => setIsModalOpen(false)}
              className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-2xl font-semibold transition-all duration-300"
            >
              Cancelar
            </button>
          </div>
        </div>
      </Modal>

      {/* Modal de Zona de Envío */}
      <Modal
        isOpen={isModalOpen && (modalType === 'add-zone' || modalType === 'edit-zone')}
        onClose={() => {
          setIsModalOpen(false);
          setEditingZone(null);
        }}
        title={editingZone ? 'Editar Zona de Envío' : 'Agregar Zona de Envío'}
        size="md"
      >
        <ShippingZoneForm
          zone={editingZone}
          onSave={handleSaveShippingZone}
          onCancel={() => {
            setIsModalOpen(false);
            setEditingZone(null);
          }}
          isLoading={isLoading}
        />
      </Modal>

      {/* Modal de Usuario */}
      <Modal
        isOpen={isModalOpen && (modalType === 'add-user' || modalType === 'edit-user')}
        onClose={() => {
          setIsModalOpen(false);
          setEditingUser(null);
        }}
        title={editingUser ? 'Editar Usuario' : 'Agregar Usuario'}
        size="md"
      >
        <UserForm
          user={editingUser}
          onSave={handleSaveUser}
          onCancel={() => {
            setIsModalOpen(false);
            setEditingUser(null);
          }}
          isLoading={isLoading}
        />
      </Modal>

      {/* Modal de Confirmación */}
      <ConfirmationModal
        isOpen={isConfirmationModalOpen}
        onClose={() => setIsConfirmationModalOpen(false)}
        onConfirm={handleConfirmAction}
        title="Restablecer Configuración"
        message="¿Estás seguro de que quieres restablecer toda la configuración? Esta acción no se puede deshacer."
        confirmText="Restablecer"
        cancelText="Cancelar"
        type="warning"
        isLoading={isLoading}
      />
    </div>
  );
};

// Componente de formulario para zonas de envío
const ShippingZoneForm: React.FC<{
  zone: any;
  onSave: (data: any) => void;
  onCancel: () => void;
  isLoading: boolean;
}> = ({ zone, onSave, onCancel, isLoading }) => {
  const [formData, setFormData] = useState({
    name: zone?.name || '',
    rate: zone?.rate || 0,
    countries: zone?.countries || []
  });

  const availableCountries = [
    { code: 'US', name: 'Estados Unidos' },
    { code: 'CA', name: 'Canadá' },
    { code: 'MX', name: 'México' },
    { code: 'DE', name: 'Alemania' },
    { code: 'FR', name: 'Francia' },
    { code: 'ES', name: 'España' },
    { code: 'IT', name: 'Italia' },
    { code: 'BR', name: 'Brasil' },
    { code: 'AR', name: 'Argentina' },
    { code: 'CO', name: 'Colombia' }
  ];

  const handleCountryToggle = (countryCode: string) => {
    setFormData(prev => ({
      ...prev,
        countries: prev.countries.includes(countryCode)
        ? prev.countries.filter((c: string) => c !== countryCode)
        : [...prev.countries, countryCode]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Nombre de la Zona</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm"
          placeholder="Ej: Europa, América del Norte"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Tarifa de Envío ($)</label>
        <input
          type="number"
          value={formData.rate}
          onChange={(e) => setFormData(prev => ({ ...prev, rate: parseFloat(e.target.value) || 0 }))}
          className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm"
          min="0"
          step="0.01"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Países Incluidos</label>
        <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto">
          {availableCountries.map((country) => (
            <label key={country.code} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.countries.includes(country.code)}
                onChange={() => handleCountryToggle(country.code)}
                className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
              />
              <span className="text-sm text-gray-700">{country.name}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex gap-3 justify-end">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-2xl font-semibold transition-all duration-300"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={isLoading || !formData.name || formData.countries.length === 0}
          className="px-6 py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-2xl font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Guardando...' : 'Guardar'}
        </button>
      </div>
    </form>
  );
};

// Componente de formulario para usuarios
const UserForm: React.FC<{
  user: any;
  onSave: (data: any) => void;
  onCancel: () => void;
  isLoading: boolean;
}> = ({ user, onSave, onCancel, isLoading }) => {
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    role: user?.role || 'staff',
    status: user?.status || 'active'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Nombre Completo</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm"
          placeholder="Juan Pérez"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
          className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm"
          placeholder="juan@tienda.com"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Rol</label>
        <select
          value={formData.role}
          onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
          className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm"
        >
          <option value="admin">Administrador</option>
          <option value="manager">Gerente</option>
          <option value="staff">Personal</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Estado</label>
        <select
          value={formData.status}
          onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
          className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm"
        >
          <option value="active">Activo</option>
          <option value="inactive">Inactivo</option>
        </select>
      </div>

      <div className="flex gap-3 justify-end">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-2xl font-semibold transition-all duration-300"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={isLoading || !formData.name || !formData.email}
          className="px-6 py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-2xl font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Guardando...' : 'Guardar'}
        </button>
      </div>
    </form>
  );
};

export default ConfiguracionTiendaPage;
