import React from 'react';

interface SwitchBeneficiosProps {
  isOn: boolean;
  handleToggle: () => void;
}

const SwitchBeneficios: React.FC<SwitchBeneficiosProps> = ({ isOn, handleToggle }) => {
  return (
    <label
      htmlFor="toggle-switch"
      className="flex items-center cursor-pointer"
    >
      <div className="relative">
        <input
          type="checkbox"
          id="toggle-switch"
          className="sr-only"
          checked={isOn}
          onChange={handleToggle}
        />
        <div
          className={`block w-10 h-6 rounded-full ${isOn ? 'bg-blue-600' : 'bg-gray-300'}`}
        ></div>
        <div
          className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition ${isOn ? 'translate-x-full' : 'translate-x-0'}`}
        ></div>
      </div>
    </label>
  );
};

export default SwitchBeneficios;
