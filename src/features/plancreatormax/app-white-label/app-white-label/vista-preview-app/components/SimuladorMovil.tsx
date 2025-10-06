import React from 'react';

interface SimuladorMovilProps {
  currentScreen: string;
  appConfig: any;
  platform: 'iOS' | 'Android';
}

const SimuladorMovil: React.FC<SimuladorMovilProps> = ({ currentScreen, appConfig, platform }) => {
  const screenContent = appConfig.screens[currentScreen]?.content || 'Pantalla no encontrada';

  return (
    <div
      className="w-full h-full flex flex-col"
      style={{
        backgroundColor: appConfig.primaryColor,
        color: appConfig.secondaryColor,
      }}
    >
      <div className="flex items-center justify-between p-4" style={{ backgroundColor: appConfig.primaryColor }}>
        <span className="text-white font-bold">{appConfig.appName}</span>
        <img src={appConfig.icon} alt="App Icon" className="w-8 h-8 rounded-full" />
      </div>
      <div className="flex-1 flex items-center justify-center p-4 bg-white text-gray-800">
        <p className="text-center text-lg">{screenContent}</p>
      </div>
      <div className="flex justify-around p-2" style={{ backgroundColor: appConfig.primaryColor }}>
        {Object.keys(appConfig.screens).map((screenKey) => (
          <button
            key={screenKey}
            className={`p-2 rounded-md ${currentScreen === screenKey ? 'bg-blue-700 text-white' : 'text-white'}`}
          >
            {appConfig.screens[screenKey].name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SimuladorMovil;
