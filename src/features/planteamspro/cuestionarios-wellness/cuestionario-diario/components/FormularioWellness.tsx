import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import { registerWellnessMetrics, WellnessData } from '../cuestionarioDiarioApi';

interface RatingProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  icons: string[];
}

const RatingInput: React.FC<RatingProps> = ({ label, value, onChange, icons }) => {
  return (
    <div className="mb-6">
      <label className="block text-gray-700 text-base font-semibold mb-3">{label}</label>
      <div className="flex justify-around items-center bg-gradient-to-r from-emerald-50 to-teal-50 p-4 rounded-2xl border border-emerald-200">
        {[1, 2, 3, 4, 5].map((num) => (
          <button
            key={num}
            type="button"
            className={`text-3xl p-3 rounded-2xl transition-all duration-300 transform hover:scale-110
              ${value === num
                ? 'bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-xl scale-110'
                : 'text-gray-400 hover:bg-white/50 hover:shadow-md'}`}
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

      {/* Progress bar del cuestionario */}
      <div className="my-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-semibold text-gray-600">Progreso</span>
          <span className="text-sm font-bold text-emerald-600">100%</span>
        </div>
        <div className="w-full bg-emerald-200 rounded-full h-3 overflow-hidden shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-full relative transition-all duration-500"
            style={{ width: '100%' }}
          >
            <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="relative overflow-hidden w-full bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 py-4 px-6 text-white font-bold text-lg group disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={loading}
      >
        {/* Efecto hover */}
        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>

        {/* Decoración */}
        <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>

        <div className="relative z-10 flex items-center justify-center gap-2">
          <Heart className="w-5 h-5" />
          <span>{loading ? 'Guardando...' : 'Registrar Wellness'}</span>
        </div>
      </button>

      {message === 'success' && (
        <div className="flex items-center justify-center gap-2 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200">
          <div className="p-2 bg-green-500 rounded-xl">
            <Heart className="w-5 h-5 text-white" />
          </div>
          <p className="text-green-700 font-semibold">¡Registro de wellness exitoso!</p>
        </div>
      )}
      {message === 'error' && (
        <div className="flex items-center justify-center gap-2 p-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl border border-red-200">
          <div className="p-2 bg-red-500 rounded-xl">
            <span className="text-white text-lg">⚠️</span>
          </div>
          <p className="text-red-700 font-semibold">Error al registrar wellness. Inténtalo de nuevo.</p>
        </div>
      )}
    </form>
  );
};

export default FormularioWellness;
