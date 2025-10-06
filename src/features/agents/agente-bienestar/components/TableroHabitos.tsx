import React, { useState, useEffect } from 'react';
import { fetchHabits, updateHabitCompletion, Habit } from '../agenteBienestarApi';

const TableroHabitos: React.FC = () => {
  const [habits, setHabits] = useState<Habit[]>([]);

  useEffect(() => {
    const getHabits = async () => {
      const data = await fetchHabits();
      setHabits(data);
    };
    getHabits();
  }, []);

  const handleToggleCompletion = async (id: string, completed: boolean) => {
    const updatedHabits = await updateHabitCompletion(id, completed);
    setHabits(updatedHabits);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Tablero de Hábitos</h2>
      <div className="space-y-4">
        {habits.map((habit) => (
          <div key={habit.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-md">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={habit.completed}
                onChange={() => handleToggleCompletion(habit.id, !habit.completed)}
                className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className={`ml-3 text-lg font-medium ${habit.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                {habit.name}
              </span>
            </div>
            <span className="text-gray-600 text-md">
              {habit.current} / {habit.target}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableroHabitos;
