// src/features/sistema-afiliados/recursos-afiliados/recursosAfiliadosApi.ts

export const fetchBanners = async () => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 'banner1', title: 'Banner Principal', imageUrl: '/placeholders/banner1.jpg', downloadUrl: '/downloads/banner1.zip' },
        { id: 'banner2', title: 'Banner Cuadrado', imageUrl: '/placeholders/banner2.jpg', downloadUrl: '/downloads/banner2.zip' },
      ]);
    }, 500);
  });
};

export const generateReferralLink = async (userId: string, campaignId: string) => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`https://tudominio.com/referido?ref=${userId}&camp=${campaignId}`);
    }, 300);
  });
};

export const fetchPrewrittenTexts = async () => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 'text1', title: 'Post para Instagram', content: '¡Descubre nuestros productos! #afiliados #marketing' },
        { id: 'text2', title: 'Tweet Promocional', content: 'Gran oferta por tiempo limitado. ¡No te lo pierdas! #oferta' },
      ]);
    }, 400);
  });
};

export const downloadKit = async (kitId: string) => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ message: `Kit ${kitId} descargado exitosamente.` });
    }, 200);
  });
};
