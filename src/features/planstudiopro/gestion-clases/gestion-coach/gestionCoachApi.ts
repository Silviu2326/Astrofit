export interface Coach {
  id: string;
  name: string;
  specialty: string;
  photo: string;
  status: 'disponible' | 'ocupado' | 'libre';
}

const mockCoaches: Coach[] = [
  {
    id: '1',
    name: 'Juan Pérez',
    specialty: 'Fuerza',
    photo: 'https://via.placeholder.com/150/FF0000/FFFFFF?text=JP',
    status: 'disponible',
  },
  {
    id: '2',
    name: 'María García',
    specialty: 'Cardio',
    photo: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=MG',
    status: 'ocupado',
  },
  {
    id: '3',
    name: 'Carlos Ruíz',
    specialty: 'Yoga',
    photo: 'https://via.placeholder.com/150/008000/FFFFFF?text=CR',
    status: 'libre',
  },
  {
    id: '4',
    name: 'Ana López',
    specialty: 'Pilates',
    photo: 'https://via.placeholder.com/150/FFFF00/000000?text=AL',
    status: 'disponible',
  },
  {
    id: '5',
    name: 'Pedro Martínez',
    specialty: 'Nutrición',
    photo: 'https://via.placeholder.com/150/FFA500/FFFFFF?text=PM',
    status: 'ocupado',
  },
  {
    id: '6',
    name: 'Laura Sánchez',
    specialty: 'Funcional',
    photo: 'https://via.placeholder.com/150/800080/FFFFFF?text=LS',
    status: 'disponible',
  },
];

export const fetchCoaches = async (): Promise<Coach[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockCoaches);
    }, 500);
  });
};

// Nuevos endpoints de gestión avanzada
export const submitEvaluation = async (coachId: string, evaluationData: any): Promise<any> => {
  console.log(`Submitting evaluation for coach ${coachId}:`, evaluationData);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, message: 'Evaluation submitted successfully' });
    }, 500);
  });
};

export const manageSubstitution = async (coachId: string, substitutionData: any): Promise<any> => {
  console.log(`Managing substitution for coach ${coachId}:`, substitutionData);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, message: 'Substitution managed successfully' });
    }, 500);
  });
};

export const trackHours = async (coachId: string, hoursData: any): Promise<any> => {
  console.log(`Tracking hours for coach ${coachId}:`, hoursData);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, message: 'Hours tracked successfully' });
    }, 500);
  });
};

export const updateKPIs = async (coachId: string, kpiData: any): Promise<any> => {
  console.log(`Updating KPIs for coach ${coachId}:`, kpiData);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, message: 'KPIs updated successfully' });
    }, 500);
  });
};

export const planVacation = async (coachId: string, vacationData: any): Promise<any> => {
  console.log(`Planning vacation for coach ${coachId}:`, vacationData);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, message: 'Vacation planned successfully' });
    }, 500);
  });
};

export const manageCertifications = async (coachId: string, certificationData: any): Promise<any> => {
  console.log(`Managing certifications for coach ${coachId}:`, certificationData);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, message: 'Certifications managed successfully' });
    }, 500);
  });
};

export const setupMentoring = async (juniorCoachId: string, seniorCoachId: string): Promise<any> => {
  console.log(`Setting up mentoring between ${juniorCoachId} and ${seniorCoachId}`);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, message: 'Mentoring setup successfully' });
    }, 500);
  });
};

export const integratePayroll = async (coachId: string, payrollData: any): Promise<any> => {
  console.log(`Integrating payroll for coach ${coachId}:`, payrollData);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, message: 'Payroll integrated successfully' });
    }, 500);
  });
};

export const analyzeProfitability = async (coachId: string): Promise<any> => {
  console.log(`Analyzing profitability for coach ${coachId}`);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, data: { roi: '150%', revenue: '€5000' } });
    }, 500);
  });
};

export const awardBonus = async (coachId: string, bonusAmount: number): Promise<any> => {
  console.log(`Awarding bonus of €${bonusAmount} to coach ${coachId}`);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, message: 'Bonus awarded successfully' });
    }, 500);
  });
};
