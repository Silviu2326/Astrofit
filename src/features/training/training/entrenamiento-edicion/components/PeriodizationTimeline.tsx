import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus, Calendar, AlertCircle } from 'lucide-react';

interface WeekData {
  weekNumber: number;
  volumePercentage: number;
  intensityPercentage: number;
  isDeload: boolean;
  startDate: string;
  endDate: string;
  phase?: string;
}

interface PeriodizationTimelineProps {
  weeks: WeekData[];
  currentWeek: number;
  onWeekClick: (weekNumber: number) => void;
  onEditWeek?: (weekNumber: number) => void;
  isEditMode?: boolean;
}

const PeriodizationTimeline: React.FC<PeriodizationTimelineProps> = ({
  weeks,
  currentWeek,
  onWeekClick,
  onEditWeek,
  isEditMode = false
}) => {
  const maxVolume = Math.max(...weeks.map(w => w.volumePercentage));

  return (
    <div className="space-y-4">
      {/* Phase Labels */}
      <div className="flex gap-2 mb-4">
        <div className="flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-bold">
          <TrendingUp className="w-3 h-3" />
          Acumulación
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-bold">
          <Minus className="w-3 h-3" />
          Descarga
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-bold">
          <TrendingUp className="w-3 h-3" />
          Intensificación
        </div>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Grid Lines */}
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
          {[100, 75, 50, 25, 0].map((pct, idx) => (
            <div key={pct} className="flex items-center">
              <span className="text-xs text-gray-400 w-10">{pct}%</span>
              <div className="flex-1 border-t border-gray-200 border-dashed"></div>
            </div>
          ))}
        </div>

        {/* Weeks */}
        <div className="flex gap-2 pt-8 pb-4 relative z-10 ml-12">
          {weeks.map((week) => {
            const heightPercentage = (week.volumePercentage / maxVolume) * 100;
            const isCurrentWeek = week.weekNumber === currentWeek;

            return (
              <motion.div
                key={week.weekNumber}
                className="flex-1 group relative"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <button
                  onClick={() => onWeekClick(week.weekNumber)}
                  className={`w-full rounded-t-lg transition-all ${
                    week.isDeload
                      ? 'bg-gradient-to-t from-yellow-400 to-yellow-500'
                      : 'bg-gradient-to-t from-orange-500 to-pink-600'
                  } ${isCurrentWeek ? 'ring-4 ring-blue-500' : ''}`}
                  style={{ height: `${Math.max(heightPercentage, 10)}px` }}
                >
                  {/* Hover Tooltip */}
                  <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20">
                    <div className="bg-gray-900 text-white text-xs rounded-lg p-3 whitespace-nowrap shadow-xl">
                      <div className="font-bold mb-1">Semana {week.weekNumber}</div>
                      <div>{week.startDate} - {week.endDate}</div>
                      <div className="mt-2 space-y-1">
                        <div>Volumen: {week.volumePercentage}%</div>
                        <div>Intensidad: {week.intensityPercentage}%</div>
                        {week.isDeload && (
                          <div className="text-yellow-400 font-bold mt-1">⚠️ DESCARGA</div>
                        )}
                      </div>
                    </div>
                  </div>
                </button>

                {/* Week Label */}
                <div className="text-center mt-2">
                  <div className={`text-xs font-bold ${isCurrentWeek ? 'text-blue-600' : 'text-gray-600'}`}>
                    S{week.weekNumber}
                  </div>
                  {week.isDeload && (
                    <div className="text-xs text-yellow-600 font-bold">⚡</div>
                  )}
                </div>

                {/* Edit Button */}
                {isEditMode && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onEditWeek?.(week.weekNumber);
                    }}
                    className="absolute top-0 right-0 p-1 bg-blue-500 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity text-xs"
                  >
                    ✏️
                  </button>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-between text-xs text-gray-600">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gradient-to-t from-orange-500 to-pink-600 rounded"></div>
            <span>Carga Normal</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gradient-to-t from-yellow-400 to-yellow-500 rounded"></div>
            <span>Descarga</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 ring-4 ring-blue-500 bg-orange-500 rounded"></div>
            <span>Semana Actual</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PeriodizationTimeline;
