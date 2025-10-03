import React from 'react';
import PanelVideo from './components/PanelVideo';
import ListaAsistentes from './components/ListaAsistentes';
import ChatLateral from './components/ChatLateral';
import ControlesVideo from './components/ControlesVideo';

const VideollamadaSalaPage: React.FC = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header with Branding */}
        <header className="flex items-center justify-between p-4 bg-white shadow-md">
          <div className="flex items-center">
            {/* Replace with actual logo */}
            <img src="/path/to/your/logo.png" alt="Logo" className="h-8 mr-3" />
            <h1 className="text-xl font-semibold">Tele-Sesión en Vivo</h1>
          </div>
          <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
            Grabar Sesión
          </button>
        </header>

        {/* Video Panel and Controls */}
        <main className="flex-1 flex flex-col md:flex-row p-4 gap-4">
          <div className="flex-1 bg-gray-800 rounded-lg shadow-lg flex items-center justify-center relative">
            <PanelVideo />
            <div className="absolute bottom-4 w-full flex justify-center">
              <ControlesVideo />
            </div>
          </div>
          <div className="w-full md:w-1/4 flex flex-col gap-4">
            <ListaAsistentes />
            <ChatLateral />
          </div>
        </main>
      </div>
    </div>
  );
};

export default VideollamadaSalaPage;
