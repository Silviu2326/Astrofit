import { PlaceholderImages } from '../../../../../utils/placeholderImages';
export const fetchAppConfig = async (appId: string) => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        appName: 'Mi App Personalizada',
        primaryColor: '#4F46E5',
        secondaryColor: '#A5B4FC',
        icon: PlaceholderImages.generic(48, 48),
        screens: {
          home: { name: 'Inicio', content: 'Bienvenido a tu app personalizada!' },
          about: { name: 'Acerca de', content: 'Esta es una app de ejemplo.' },
        },
      });
    }, 500);
  });
};

export const updateAppConfig = async (appId: string, config: any) => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Updating app config:', config);
      resolve({ success: true, message: 'Configuración actualizada.' });
    }, 500);
  });
};
