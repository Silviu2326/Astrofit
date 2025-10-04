import React, { useState } from 'react';

interface PantallaKioskoProps {
  onCheckIn: (memberId: string) => void;
}

const PantallaKiosko: React.FC<PantallaKioskoProps> = ({ onCheckIn }) => {
  const [memberId, setMemberId] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (memberId.trim()) {
      onCheckIn(memberId.trim());
      setMemberId(''); // Clear input after submission
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Introduzca su número de socio</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={memberId}
          onChange={(e) => setMemberId(e.target.value)}
          placeholder="Ej: 12345"
          className="w-full p-4 border-2 border-gray-300 rounded-lg text-xl text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Número de socio"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg text-2xl transition duration-300 ease-in-out transform hover:scale-105"
        >
          Check-in
        </button>
      </form>
    </div>
  );
};

export default PantallaKiosko;