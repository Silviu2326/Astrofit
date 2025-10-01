import React from 'react';

const CrearGrupo: React.FC = () => {
  // TODO: Implement form for creating a new group
  // - Group name, description
  // - Upload image for cover
  // - Set privacy settings (public/private, join requests)
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Crear Nuevo Grupo</h2>
      <form>
        {/* Form fields will go here */}
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Crear Grupo</button>
      </form>
    </div>
  );
};

export default CrearGrupo;
