import React from 'react';

interface FeedGrupoProps {
  groupId: string;
}

const FeedGrupo: React.FC<FeedGrupoProps> = ({ groupId }) => {
  // TODO: Fetch posts exclusive to this group
  // TODO: Implement posting functionality for group members
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Feed del Grupo {groupId}</h2>
      {/* Display group posts here */}
      <div className="mt-4">
        {/* Post creation input */}
      </div>
    </div>
  );
};

export default FeedGrupo;
