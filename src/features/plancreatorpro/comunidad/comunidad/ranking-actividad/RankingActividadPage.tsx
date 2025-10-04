import React from 'react';

const RankingActividadPage: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Ranking de Actividad de la Comunidad</h1>
      {/* Aquí se integrarán los componentes Leaderboard, SistemaMedallas, PuntosActividad */}
      <p className="text-center text-gray-600">
        ¡Bienvenido al ranking de actividad! Aquí podrás ver a los usuarios más activos, sus puntos y medallas.
      </p>
    </div>
  );
};

export default RankingActividadPage;
