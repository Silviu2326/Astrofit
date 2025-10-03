import React, { useState } from 'react';
import MockupInteractivo from './components/MockupInteractivo';
import NavigadorPantallas from './components/NavigadorPantallas';
import PreviewTiempoReal from './components/PreviewTiempoReal';
import SimuladorMovil from './components/SimuladorMovil';

const VistaPreviewAppPage: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [appConfig, setAppConfig] = useState({
    appName: 'Mi App',
    primaryColor: '#3B82F6',
    secondaryColor: '#60A5FA',
    icon: 'default-icon',
    screens: {
      home: { name: 'Inicio', content: 'Bienvenido a mi app!' },
      profile: { name: 'Perfil', content: 'Contenido del perfil.' },
      settings: { name: 'Ajustes', content: 'Configuraciones de la app.' },
    },
  });

  const handleScreenChange = (screen: string) => {
    setCurrentScreen(screen);
  };

  const handleConfigChange = (key: string, value: any) => {
    setAppConfig((prevConfig) => ({
      ...prevConfig,
      [key]: value,
    }));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-8">Vista Previa de App White-Label</h1>
      <div className="flex flex-col lg:flex-row gap-8 w-full max-w-6xl">
        <div className="flex-1 bg-white shadow-lg rounded-lg p-6">
          <PreviewTiempoReal appConfig={appConfig} onConfigChange={handleConfigChange} />
        </div>
        <div className="flex-1 flex flex-col items-center bg-white shadow-lg rounded-lg p-6">
          <NavigadorPantallas
            screens={Object.keys(appConfig.screens)}
            currentScreen={currentScreen}
            onScreenChange={handleScreenChange}
          />
          <MockupInteractivo platform="iOS">
            <SimuladorMovil
              currentScreen={currentScreen}
              appConfig={appConfig}
              platform="iOS"
            />
          </MockupInteractivo>
        </div>
      </div>
    </div>
  );
};

export default VistaPreviewAppPage;
