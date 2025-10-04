import { addDays, format } from 'date-fns';

export interface TimeSlot {
  id: string;
  start: Date;
  end: Date;
  available: boolean;
}

// Simulate fetching available time slots from an API
export const fetchAvailableSlots = async (date: Date): Promise<TimeSlot[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const slots: TimeSlot[] = [];
      const startOfDay = new Date(date.setHours(9, 0, 0, 0));

      for (let i = 0; i < 8; i++) { // 8 hourly slots
        const start = addDays(startOfDay, 0);
        start.setHours(9 + i);
        const end = addDays(startOfDay, 0);
        end.setHours(10 + i);

        slots.push({
          id: `${format(start, 'yyyy-MM-dd-HH')}`,
          start,
          end,
          available: Math.random() > 0.3, // Simulate some slots as occupied
        });
      }
      resolve(slots);
    }, 500);
  });
};

export const reserveSession = async (slotId: string): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Reserving session for slot: ${slotId}`);
      // Simulate API call success/failure
      resolve(Math.random() > 0.1);
    }, 300);
  });
};
