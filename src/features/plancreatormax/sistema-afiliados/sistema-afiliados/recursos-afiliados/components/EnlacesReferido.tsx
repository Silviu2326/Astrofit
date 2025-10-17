import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, Copy, CheckCircle, ExternalLink, Zap } from 'lucide-react';
import toast from 'react-hot-toast';
import { generateReferralLink } from '../recursosAfiliadosApi';

const EnlacesReferido: React.FC = () => {
  const [referralLink, setReferralLink] = useState<string>('');
  const [campaign, setCampaign] = useState<string>('default');
  const [generating, setGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerateLink = async () => {
    if (!campaign.trim()) {
      toast.error('Por favor ingresa un nombre de campaña');
      return;
    }

    try {
      setGenerating(true);
      // In a real app, userId would come from auth context
      const userId = 'user123';
      const link = await generateReferralLink(userId, campaign);
      setReferralLink(link as string);
      toast.success(`¡Enlace de referido generado para "${campaign}"!`);
    } catch (error) {
      toast.error('Error al generar el enlace de referido');
    } finally {
      setGenerating(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      toast.success('¡Enlace copiado al portapapeles!');
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error('Error al copiar el enlace');
    }
  };

  const openLink = () => {
    window.open(referralLink, '_blank');
    toast.success('Enlace abierto en nueva pestaña');
  };

  return (
    <section className="mb-8">
      <h3 className="text-xl font-semibold mb-4">Enlaces de Referido Personalizados</h3>
      <p className="text-gray-700 mb-6">
        Genera enlaces únicos para tus campañas y realiza un seguimiento de tus referencias.
      </p>
      
      <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-6 border border-orange-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <h4 className="font-semibold text-gray-800">Generador de Enlaces</h4>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Nombre de la campaña (ej: verano2025)"
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
              value={campaign}
              onChange={(e) => setCampaign(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleGenerateLink()}
            />
          </div>
          <button
            onClick={handleGenerateLink}
            disabled={generating}
            className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-w-[140px]"
          >
            {generating ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Generando...
              </>
            ) : (
              <>
                <Link className="w-4 h-4" />
                Generar Enlace
              </>
            )}
          </button>
        </div>
        
        {referralLink && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg p-4 border border-gray-200"
          >
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <p className="font-medium text-gray-800">Tu enlace de referido:</p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-3 mb-4">
              <p className="text-sm text-gray-600 break-all font-mono">{referralLink}</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={copyToClipboard}
                className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2"
              >
                {copied ? (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    ¡Copiado!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copiar Enlace
                  </>
                )}
              </button>
              
              <button
                onClick={openLink}
                className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                Abrir Enlace
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default EnlacesReferido;
