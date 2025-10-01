export type WodType = 'AMRAP' | 'For Time' | 'EMOM' | 'Custom';

export interface Wod {
  id: string;
  type: WodType;
  description: string;
}

const mockWods: Wod[] = [
  {
    id: 'wod-1',
    type: 'AMRAP',
    description: 'AMRAP 20 minutes:\n- 10 Pull-ups\n- 20 Push-ups\n- 30 Air Squats',
  },
  {
    id: 'wod-2\n',
    type: 'For Time',
    description: 'For Time:\n- 50 Wall Balls (20/14 lbs)\n- 40 Toes-to-Bar\n- 30 Box Jumps (24/20 inch)\n- 20 Handstand Push-ups\n- 10 Ring Muscle-ups',
  },
  {
    id: 'wod-3',
    type: 'EMOM',
    description: 'EMOM 10 minutes:\n- Minute 1: 12/9 Calorie Row\n- Minute 2: 15 Kettlebell Swings (24/16 kg)',
  },
];

export const getMockWod = (): Wod => {
  const randomIndex = Math.floor(Math.random() * mockWods.length);
  return mockWods[randomIndex];
};

export const getWodTemplate = (type: WodType): string => {
  switch (type) {
    case 'AMRAP':
      return 'AMRAP (As Many Rounds As Possible) XX minutes:\n- X Reps of Exercise A\n- X Reps of Exercise B\n- X Reps of Exercise C';
    case 'For Time':
      return 'For Time:\n- X Reps of Exercise A\n- X Reps of Exercise B\n- X Reps of Exercise C';
    case 'EMOM':
      return 'EMOM (Every Minute On the Minute) XX minutes:\n- Minute 1: Exercise A\n- Minute 2: Exercise B';
    default:
      return '';
  }
};

// Advanced Functionalities Endpoints (Mock)

export const getSuggestedWods = async (): Promise<Wod[]> => {
  console.log('Fetching AI suggested WODs...');
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 'ai-wod-1', type: 'Custom', description: 'AI Suggested WOD: Focus on Legs and Core' },
        { id: 'ai-wod-2', type: 'AMRAP', description: 'AI Suggested WOD: Upper Body Blast AMRAP 15' },
      ]);
    }, 500);
  });
};

export const getExerciseLibrary = async (): Promise<any[]> => {
  console.log('Fetching exercise library...');
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 'ex-1', name: 'Squat', videoUrl: 'https://example.com/squat.mp4' },
        { id: 'ex-2', name: 'Push-up', videoUrl: 'https://example.com/pushup.mp4' },
      ]);
    }, 500);
  });
};

export const getScaledWod = async (wodId: string, level: string): Promise<Wod> => {
  console.log(`Scaling WOD ${wodId} for level ${level}...`);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id: wodId, type: 'Custom', description: `Scaled WOD for ${level}: ${wodId} (modified)` });
    }, 500);
  });
};

export const submitWodRating = async (wodId: string, rating: number, comment: string): Promise<string> => {
  console.log(`Submitting rating for WOD ${wodId}: ${rating} - ${comment}`);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('Rating submitted successfully!');
    }, 500);
  });
};

export const getWearableData = async (userId: string): Promise<any> => {
  console.log(`Fetching wearable data for user ${userId}...`);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ heartRate: 120, caloriesBurned: 500, duration: 60 });
    }, 500);
  });
};

export const getWeeklyChallenges = async (): Promise<any[]> => {
  console.log('Fetching weekly challenges...');
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 'challenge-1', name: 'Push-up Challenge', description: 'Complete 100 push-ups in a week.' },
        { id: 'challenge-2', name: 'Running Challenge', description: 'Run 10km in a week.' },
      ]);
    }, 500);
  });
};

export const getDifficultyProgression = async (userId: string): Promise<any> => {
  console.log(`Fetching difficulty progression for user ${userId}...`);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ currentLevel: 'Intermediate', nextLevelProgress: 75 });
    }, 500);
  });
};

export const getCollaborativeWods = async (): Promise<Wod[]> => {
  console.log('Fetching collaborative WODs...');
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 'collab-wod-1', type: 'Custom', description: 'Gym A vs Gym B Challenge WOD' },
        { id: 'collab-wod-2', type: 'For Time', description: 'Community Hero WOD' },
      ]);
    }, 500);
  });
};

export const getUserBadges = async (userId: string): Promise<any[]> => {
  console.log(`Fetching badges for user ${userId}...`);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 'badge-1', name: 'First WOD', imageUrl: 'https://example.com/badge1.png' },
        { id: 'badge-2', name: 'Ironman', imageUrl: 'https://example.com/badge2.png' },
      ]);
    }, 500);
  });
};

export const getTrainingPatterns = async (userId: string): Promise<any> => {
  console.log(`Fetching training patterns for user ${userId}...`);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ favoriteMovements: ['Squat', 'Deadlift'], peakPerformanceDays: ['Monday', 'Wednesday'] });
    }, 500);
  });
};

export const saveCustomWod = async (wod: Wod): Promise<string> => {
  console.log(`Saving custom WOD: ${wod.id}`);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('Custom WOD saved successfully!');
    }, 500);
  });
};

export const get3DExerciseView = async (exerciseId: string): Promise<string> => {
  console.log(`Fetching 3D view for exercise ${exerciseId}...`);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`3D model data for exercise ${exerciseId}`);
    }, 500);
  });
};

export const startMotivationalTimer = async (duration: number): Promise<string> => {
  console.log(`Starting motivational timer for ${duration} minutes...`);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('Motivational timer started!');
    }, 500);
  });
};

export const shareWodSocial = async (wodId: string, platform: string): Promise<string> => {
  console.log(`Sharing WOD ${wodId} on ${platform}...`);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('WOD shared successfully on social media!');
    }, 500);
  });
};

export const startCoachMode = async (coachId: string): Promise<string> => {
  console.log(`Starting coach mode for coach ${coachId}...`);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('Coach mode activated, live broadcasting started!');
    }, 500);
  });
};

export const getAugmentedRealityDemo = async (exerciseId: string): Promise<string> => {
  console.log(`Fetching AR demo for exercise ${exerciseId}...`);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`AR demonstration data for exercise ${exerciseId}`);
    }, 500);
  });
};
