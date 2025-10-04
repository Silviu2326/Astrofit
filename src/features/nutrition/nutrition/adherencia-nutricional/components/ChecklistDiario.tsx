
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Check, Coffee, Sun, Sandwich, Cookie, Moon, Droplets, ChevronLeft, ChevronRight } from 'lucide-react';
import { getDailyChecklist, updateDailyChecklist, getAdherenceData } from '../adherenciaNutricionalApi';
import { DailyChecklist } from '../adherenciaNutricionalApi';

const ChecklistDiario: React.FC = () => {
  const [checklist, setChecklist] = useState<DailyChecklist[string]>({
    breakfast: false,
    midMorning: false,
    lunch: false,
    snack: false,
    dinner: false,
    hydration: false,
  });
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [monthData, setMonthData] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const dateStr = selectedDate.toISOString().split('T')[0];
      const data = await getDailyChecklist(dateStr);
      setChecklist(data);

      // Get adherence data for heatmap
      const adherenceData = await getAdherenceData();
      const dataMap: { [key: string]: number } = {};
      adherenceData.forEach((entry) => {
        dataMap[entry.date] = entry.adherencePercentage;
      });
      setMonthData(dataMap);

      setLoading(false);
    };
    fetchData();
  }, [selectedDate]);

  const handleCheckboxChange = async (item: keyof DailyChecklist[string]) => {
    const updatedChecklist = { ...checklist, [item]: !checklist[item] };
    setChecklist(updatedChecklist);
    const dateStr = selectedDate.toISOString().split('T')[0];
    await updateDailyChecklist(dateStr, updatedChecklist);
  };

  const getAdherenceColor = (percentage: number | undefined) => {
    if (!percentage) return 'bg-gray-100';
    if (percentage >= 85) return 'bg-green-500';
    if (percentage >= 70) return 'bg-yellow-500';
    if (percentage >= 50) return 'bg-orange-500';
    return 'bg-red-500';
  };

  // Generate calendar days for current month
  const generateCalendar = () => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    // Add empty slots for days before month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    // Add actual days
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    return days;
  };

  const changeMonth = (direction: number) => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(newDate.getMonth() + direction);
    setSelectedDate(newDate);
  };

  const selectDay = (day: number | null) => {
    if (day) {
      const newDate = new Date(selectedDate);
      newDate.setDate(day);
      setSelectedDate(newDate);
    }
  };

  const isToday = (day: number) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      selectedDate.getMonth() === today.getMonth() &&
      selectedDate.getFullYear() === today.getFullYear()
    );
  };

  const isSelectedDay = (day: number) => {
    return day === selectedDate.getDate();
  };

  const checklistItems = [
    { key: 'breakfast', label: 'Desayuno', icon: Coffee, color: 'from-yellow-500 to-orange-500' },
    { key: 'midMorning', label: 'Media Mañana', icon: Sun, color: 'from-orange-500 to-red-500' },
    { key: 'lunch', label: 'Almuerzo', icon: Sandwich, color: 'from-red-500 to-pink-500' },
    { key: 'snack', label: 'Merienda', icon: Cookie, color: 'from-pink-500 to-purple-500' },
    { key: 'dinner', label: 'Cena', icon: Moon, color: 'from-purple-500 to-indigo-500' },
    { key: 'hydration', label: 'Hidratación', icon: Droplets, color: 'from-blue-500 to-cyan-500' },
  ];

  if (loading) {
    return (
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/50">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/2"></div>
          <div className="h-48 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  const calendarDays = generateCalendar();
  const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 overflow-hidden"
    >
      {/* Header con gradiente */}
      <div className="bg-gradient-to-r from-teal-500 via-green-500 to-lime-500 p-6 relative overflow-hidden">
        {/* Pattern de fondo */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        <h3 className="text-xl font-bold text-white flex items-center gap-2 relative z-10">
          <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
            <Calendar className="w-6 h-6" />
          </div>
          Calendario de Adherencia
        </h3>
      </div>

      <div className="p-6">
        {/* Calendar Navigation */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => changeMonth(-1)}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors duration-200"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h4 className="text-lg font-bold text-gray-800">
            {monthNames[selectedDate.getMonth()]} {selectedDate.getFullYear()}
          </h4>
          <button
            onClick={() => changeMonth(1)}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors duration-200"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Calendar Grid with Heatmap */}
        <div className="mb-6">
          <div className="grid grid-cols-7 gap-2 mb-2">
            {dayNames.map((day) => (
              <div key={day} className="text-center text-xs font-semibold text-gray-500">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-2">
            {calendarDays.map((day, index) => {
              if (day === null) {
                return <div key={`empty-${index}`} className="aspect-square"></div>;
              }

              const dateStr = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day)
                .toISOString()
                .split('T')[0];
              const adherence = monthData[dateStr];
              const colorClass = getAdherenceColor(adherence);

              return (
                <motion.button
                  key={day}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => selectDay(day)}
                  className={`aspect-square rounded-xl flex items-center justify-center text-sm font-semibold transition-all duration-200 ${
                    isSelectedDay(day)
                      ? 'ring-2 ring-teal-500 ring-offset-2'
                      : ''
                  } ${
                    isToday(day)
                      ? 'border-2 border-teal-600'
                      : ''
                  } ${
                    adherence
                      ? `${colorClass} text-white shadow-md`
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                  title={adherence ? `Adherencia: ${adherence}%` : 'Sin datos'}
                >
                  {day}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-4 mb-6 text-xs">
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 rounded bg-red-500"></div>
            <span className="text-gray-600">&lt;50%</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 rounded bg-orange-500"></div>
            <span className="text-gray-600">50-69%</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 rounded bg-yellow-500"></div>
            <span className="text-gray-600">70-84%</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 rounded bg-green-500"></div>
            <span className="text-gray-600">≥85%</span>
          </div>
        </div>

        {/* Checklist del día seleccionado */}
        <div>
          <h4 className="text-md font-bold text-gray-800 mb-4">
            Checklist - {selectedDate.toLocaleDateString('es-ES', { day: 'numeric', month: 'long' })}
          </h4>
          <div className="space-y-3">
            {checklistItems.map((item, index) => {
              const isChecked = checklist[item.key as keyof DailyChecklist[string]];
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.key}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`flex items-center justify-between p-4 rounded-2xl transition-all duration-300 border-2 cursor-pointer ${
                    isChecked
                      ? 'bg-gradient-to-r ' + item.color + ' border-transparent shadow-lg'
                      : 'bg-gray-50 border-gray-200 hover:border-gray-300 hover:shadow-md'
                  }`}
                  onClick={() => handleCheckboxChange(item.key as keyof DailyChecklist[string])}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-xl ${isChecked ? 'bg-white/20 backdrop-blur-sm' : 'bg-white'}`}>
                      <Icon className={`w-5 h-5 ${isChecked ? 'text-white' : 'text-gray-600'}`} />
                    </div>
                    <span className={`font-semibold ${isChecked ? 'text-white' : 'text-gray-700'}`}>
                      {item.label}
                    </span>
                  </div>

                  {/* Custom Checkbox */}
                  <motion.div
                    className={`w-7 h-7 rounded-xl flex items-center justify-center border-2 transition-all duration-300 ${
                      isChecked
                        ? 'bg-white border-white'
                        : 'bg-white border-gray-300'
                    }`}
                    whileTap={{ scale: 0.9 }}
                  >
                    {isChecked && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 500, damping: 15 }}
                      >
                        <Check className="w-5 h-5 text-teal-600" strokeWidth={3} />
                      </motion.div>
                    )}
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Progress Summary */}
        <div className="mt-6 p-4 bg-gradient-to-r from-teal-50 to-green-50 rounded-2xl border border-teal-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-gray-700">Progreso del día</span>
            <span className="text-lg font-bold text-teal-600">
              {Math.round((Object.values(checklist).filter(Boolean).length / Object.values(checklist).length) * 100)}%
            </span>
          </div>
          <div className="w-full bg-teal-200 rounded-full h-3 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{
                width: `${(Object.values(checklist).filter(Boolean).length / Object.values(checklist).length) * 100}%`,
              }}
              transition={{ duration: 0.5 }}
              className="h-full bg-gradient-to-r from-teal-500 to-green-600 rounded-full"
            ></motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ChecklistDiario;
