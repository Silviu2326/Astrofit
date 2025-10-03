import React, { useState } from 'react';
import { registerWellnessMetrics, WellnessData } from '../cuestionarioDiarioApi';

interface RatingProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  icons: string[];
}

const RatingInput: React.FC<RatingProps> = ({ label, value, onChange, icons }) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">{label}</label>
      <div className="flex justify-around items-center bg-gray-50 p-2 rounded-lg">
        {[1, 2, 3, 4, 5].map((num) => (
          <button
            key={num}
            type="button"
            className={`text-3xl p-2 rounded-full transition-colors duration-200
              ${value === num ? 'bg-blue-200 text-blue-700' : 'text-gray-400 hover:bg-gray-200'}`}
            onClick={() => onChange(num)}
          >
            {icons[num - 1]}
          </button>
        ))}
      </div>
    </div>
  );
};

const FormularioWellness: React.FC = () => {
  const [sleep, setSleep] = useState(3);
  const [pain, setPain] = useState(3);
  const [mood, setMood] = useState(3);
  const [energy, setEnergy] = useState(3);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<'success' | 'error' | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const data: WellnessData = {
      sleep,
      pain,
      mood,
      energy,
      date: new Date().toISOString().split('T')[0], // YYYY-MM-DD
    };

    try {
      await registerWellnessMetrics(data);
      setMessage('success');
      // Optionally reset form or provide feedback
    } catch (error) {
      console.error('Error registering wellness metrics:', error);
      setMessage('error');
    } finally {
      setLoading(false);
    }
  };

  const sleepIcons = ['😴', '😔', '😐', '😊', '🤩'];
  const painIcons = [' unbearable', ' severe', ' moderate', ' mild', ' none'];
  const moodIcons = ['😭', '😞', '😐', '🙂', '😁'];
  const energyIcons = [' exhausted', ' low', ' normal', ' good', ' high'];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <RatingInput label="Calidad del Sueño" value={sleep} onChange={setSleep} icons={sleepIcons} />
      <RatingInput label="Nivel de Dolor" value={pain} onChange={setPain} icons={painIcons} />
      <RatingInput label="Estado de Ánimo" value={mood} onChange={setMood} icons={moodIcons} />
      <RatingInput label="Nivel de Energía" value={energy} onChange={setEnergy} icons={energyIcons} />

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-3 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50"
        disabled={loading}
      >
        {loading ? 'Guardando...' : 'Registrar Wellness'}
      </button>

      {message === 'success' && (
        <p className="text-green-600 text-center mt-4">¡Registro de wellness exitoso!</p>
      )}
      {message === 'error' && (
        <p className="text-red-600 text-center mt-4">Error al registrar wellness. Inténtalo de nuevo.</p>
      )}
    </form>
  );
};

export default FormularioWellness;
