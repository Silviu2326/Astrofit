export interface Certification {
  id: string;
  name: string;
  institution: string;
  dateObtained: string;
  expiryDate?: string;
  status: 'valid' | 'expiring' | 'expired';
  fileUrl?: string;
}

export interface Availability {
  day: string; // 'monday', 'tuesday', etc.
  hours: { start: string; end: string }[];
}

export interface ClassHistory {
  id: string;
  className: string;
  date: string;
  attendance: number;
  capacity: number;
  rating?: number;
  status: 'completed' | 'upcoming' | 'cancelled';
}

export interface Review {
  id: string;
  studentName: string;
  rating: number;
  comment: string;
  date: string;
  className: string;
}

export interface Coach {
  id: string;
  name: string;
  lastName: string;
  email: string;
  phone: string;
  photo: string;
  status: 'active' | 'inactive' | 'absent';

  // Professional info
  specialties: string[];
  expertiseLevel?: { [specialty: string]: 'basic' | 'intermediate' | 'expert' };
  bio?: string;
  yearsExperience: number;
  dateJoined: string;
  contractType: 'employee' | 'freelance';

  // Social
  socialMedia?: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
  };

  // Stats
  rating: number;
  totalClasses: number;
  classesThisMonth: number;
  totalStudents: number;
  attendanceRate: number;

  // Schedule
  availability?: Availability[];
  nextClass?: {
    className: string;
    date: string;
    time: string;
  };

  // Certifications
  certifications?: Certification[];

  // History
  classHistory?: ClassHistory[];
  reviews?: Review[];

  // Compensation
  ratePerClass?: number;
  attendanceBonus?: number;
  salesCommission?: number;
  paymentMethod?: string;
}

const mockCoaches: Coach[] = [
  {
    id: '1',
    name: 'Juan',
    lastName: 'Pérez',
    email: 'juan.perez@studio.com',
    phone: '+34 612 345 678',
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Juan',
    status: 'active',
    specialties: ['CrossFit', 'Fuerza', 'HIIT'],
    expertiseLevel: { 'CrossFit': 'expert', 'Fuerza': 'expert', 'HIIT': 'intermediate' },
    bio: 'Coach certificado CrossFit Level 2 con más de 8 años de experiencia. Especializado en entrenamiento de fuerza y acondicionamiento.',
    yearsExperience: 8,
    dateJoined: '2018-03-15',
    contractType: 'employee',
    socialMedia: {
      instagram: '@juan_coach_fit',
      facebook: 'JuanPerezCoach'
    },
    rating: 4.8,
    totalClasses: 450,
    classesThisMonth: 28,
    totalStudents: 180,
    attendanceRate: 92,
    nextClass: {
      className: 'CrossFit Avanzado',
      date: '2024-12-20',
      time: '18:00'
    },
    certifications: [
      {
        id: 'c1',
        name: 'CrossFit Level 2',
        institution: 'CrossFit Inc.',
        dateObtained: '2019-05-10',
        expiryDate: '2025-05-10',
        status: 'valid'
      },
      {
        id: 'c2',
        name: 'CPR & First Aid',
        institution: 'Red Cross',
        dateObtained: '2023-01-15',
        expiryDate: '2025-01-15',
        status: 'valid'
      }
    ],
    reviews: [
      { id: 'r1', studentName: 'María S.', rating: 5, comment: 'Excelente coach, muy motivador!', date: '2024-12-15', className: 'CrossFit' },
      { id: 'r2', studentName: 'Pedro L.', rating: 5, comment: 'Las clases son muy dinámicas', date: '2024-12-10', className: 'HIIT' }
    ],
    ratePerClass: 45,
    attendanceBonus: 10,
    salesCommission: 5
  },
  {
    id: '2',
    name: 'María',
    lastName: 'García',
    email: 'maria.garcia@studio.com',
    phone: '+34 623 456 789',
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria',
    status: 'active',
    specialties: ['Yoga', 'Pilates', 'Meditación'],
    expertiseLevel: { 'Yoga': 'expert', 'Pilates': 'intermediate', 'Meditación': 'expert' },
    bio: 'Instructora certificada RYT 500 con formación en Hatha, Vinyasa y Yin Yoga.',
    yearsExperience: 10,
    dateJoined: '2016-09-01',
    contractType: 'employee',
    socialMedia: {
      instagram: '@maria_yoga_flow',
      facebook: 'MariaGarciaYoga'
    },
    rating: 4.9,
    totalClasses: 680,
    classesThisMonth: 32,
    totalStudents: 250,
    attendanceRate: 95,
    nextClass: {
      className: 'Vinyasa Yoga',
      date: '2024-12-20',
      time: '09:00'
    },
    certifications: [
      {
        id: 'c3',
        name: 'RYT 500 Yoga Teacher',
        institution: 'Yoga Alliance',
        dateObtained: '2017-08-20',
        status: 'valid'
      },
      {
        id: 'c4',
        name: 'Pilates Mat Certification',
        institution: 'STOTT Pilates',
        dateObtained: '2018-03-10',
        expiryDate: '2025-03-10',
        status: 'valid'
      }
    ],
    reviews: [
      { id: 'r3', studentName: 'Ana M.', rating: 5, comment: 'María es increíble, sus clases son transformadoras', date: '2024-12-14', className: 'Vinyasa Yoga' },
      { id: 'r4', studentName: 'Laura P.', rating: 5, comment: 'Muy paciente y profesional', date: '2024-12-12', className: 'Yoga' }
    ],
    ratePerClass: 40,
    attendanceBonus: 8,
    salesCommission: 4
  },
  {
    id: '3',
    name: 'Carlos',
    lastName: 'Ruíz',
    email: 'carlos.ruiz@studio.com',
    phone: '+34 634 567 890',
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos',
    status: 'active',
    specialties: ['Spinning', 'Ciclismo Indoor', 'Cardio'],
    expertiseLevel: { 'Spinning': 'expert', 'Ciclismo Indoor': 'expert', 'Cardio': 'intermediate' },
    bio: 'Instructor de Spinning certificado con pasión por el ciclismo y la música energizante.',
    yearsExperience: 6,
    dateJoined: '2019-02-10',
    contractType: 'employee',
    rating: 4.7,
    totalClasses: 380,
    classesThisMonth: 24,
    totalStudents: 160,
    attendanceRate: 88,
    nextClass: {
      className: 'Spinning Power',
      date: '2024-12-20',
      time: '19:00'
    },
    certifications: [
      {
        id: 'c5',
        name: 'Spinning Instructor Certification',
        institution: 'Mad Dogg Athletics',
        dateObtained: '2018-11-05',
        status: 'valid'
      }
    ],
    reviews: [
      { id: 'r5', studentName: 'Jorge T.', rating: 5, comment: 'Clases muy intensas y motivadoras', date: '2024-12-13', className: 'Spinning' },
      { id: 'r6', studentName: 'Sofía R.', rating: 4, comment: 'Buena energía en cada clase', date: '2024-12-11', className: 'Spinning Power' }
    ],
    ratePerClass: 38,
    attendanceBonus: 7,
    salesCommission: 3
  },
  {
    id: '4',
    name: 'Ana',
    lastName: 'López',
    email: 'ana.lopez@studio.com',
    phone: '+34 645 678 901',
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ana',
    status: 'active',
    specialties: ['Pilates', 'Barre', 'Flexibilidad'],
    expertiseLevel: { 'Pilates': 'expert', 'Barre': 'intermediate', 'Flexibilidad': 'expert' },
    bio: 'Especialista en Pilates Reformer y Mat, enfocada en corrección postural y fortalecimiento del core.',
    yearsExperience: 7,
    dateJoined: '2018-06-20',
    contractType: 'freelance',
    socialMedia: {
      instagram: '@ana_pilates_studio'
    },
    rating: 4.9,
    totalClasses: 420,
    classesThisMonth: 26,
    totalStudents: 140,
    attendanceRate: 93,
    nextClass: {
      className: 'Pilates Reformer',
      date: '2024-12-20',
      time: '10:30'
    },
    certifications: [
      {
        id: 'c7',
        name: 'Pilates Comprehensive Certification',
        institution: 'STOTT Pilates',
        dateObtained: '2018-02-15',
        status: 'valid'
      },
      {
        id: 'c8',
        name: 'Barre Instructor',
        institution: 'BarreAmped',
        dateObtained: '2020-06-10',
        expiryDate: '2024-12-31',
        status: 'expiring'
      }
    ],
    reviews: [
      { id: 'r7', studentName: 'Lucía G.', rating: 5, comment: 'Ana es muy detallista y atenta', date: '2024-12-16', className: 'Pilates' },
      { id: 'r8', studentName: 'Carmen V.', rating: 5, comment: 'Mis dolores de espalda han mejorado mucho', date: '2024-12-09', className: 'Pilates Reformer' }
    ],
    ratePerClass: 50,
    attendanceBonus: 12,
    salesCommission: 6
  },
  {
    id: '5',
    name: 'Pedro',
    lastName: 'Martínez',
    email: 'pedro.martinez@studio.com',
    phone: '+34 656 789 012',
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Pedro',
    status: 'absent',
    specialties: ['Boxeo', 'Kickboxing', 'Defensa Personal'],
    expertiseLevel: { 'Boxeo': 'expert', 'Kickboxing': 'expert', 'Defensa Personal': 'intermediate' },
    bio: 'Ex-competidor de boxeo amateur, ahora instructor certificado en artes marciales y fitness de combate.',
    yearsExperience: 9,
    dateJoined: '2017-01-15',
    contractType: 'employee',
    rating: 4.6,
    totalClasses: 520,
    classesThisMonth: 0,
    totalStudents: 200,
    attendanceRate: 85,
    certifications: [
      {
        id: 'c9',
        name: 'Boxing Coach Level 2',
        institution: 'National Boxing Federation',
        dateObtained: '2016-09-20',
        status: 'valid'
      }
    ],
    reviews: [
      { id: 'r9', studentName: 'Roberto M.', rating: 5, comment: 'Pedro sabe cómo sacar lo mejor de ti', date: '2024-11-28', className: 'Boxeo' },
      { id: 'r10', studentName: 'Diego F.', rating: 4, comment: 'Clases muy técnicas y exigentes', date: '2024-11-25', className: 'Kickboxing' }
    ],
    ratePerClass: 42,
    attendanceBonus: 9,
    salesCommission: 5
  },
  {
    id: '6',
    name: 'Laura',
    lastName: 'Sánchez',
    email: 'laura.sanchez@studio.com',
    phone: '+34 667 890 123',
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Laura',
    status: 'active',
    specialties: ['Funcional', 'TRX', 'Movilidad'],
    expertiseLevel: { 'Funcional': 'expert', 'TRX': 'expert', 'Movilidad': 'intermediate' },
    bio: 'Especialista en entrenamiento funcional y prevención de lesiones. Certificada en TRX y FMS.',
    yearsExperience: 5,
    dateJoined: '2020-05-10',
    contractType: 'employee',
    socialMedia: {
      instagram: '@laura_functional_fit'
    },
    rating: 4.8,
    totalClasses: 280,
    classesThisMonth: 22,
    totalStudents: 130,
    attendanceRate: 90,
    nextClass: {
      className: 'Entrenamiento Funcional',
      date: '2024-12-20',
      time: '17:00'
    },
    certifications: [
      {
        id: 'c10',
        name: 'TRX Suspension Training',
        institution: 'TRX Training',
        dateObtained: '2020-02-10',
        expiryDate: '2025-02-10',
        status: 'valid'
      },
      {
        id: 'c11',
        name: 'FMS Level 1',
        institution: 'Functional Movement Systems',
        dateObtained: '2021-07-20',
        status: 'valid'
      }
    ],
    reviews: [
      { id: 'r11', studentName: 'Andrea C.', rating: 5, comment: 'Laura es una coach excepcional', date: '2024-12-17', className: 'Funcional' },
      { id: 'r12', studentName: 'Miguel A.', rating: 5, comment: 'Excelentes correcciones técnicas', date: '2024-12-15', className: 'TRX' }
    ],
    ratePerClass: 43,
    attendanceBonus: 8,
    salesCommission: 4
  },
  {
    id: '7',
    name: 'Roberto',
    lastName: 'Fernández',
    email: 'roberto.fernandez@studio.com',
    phone: '+34 678 901 234',
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Roberto',
    status: 'active',
    specialties: ['Natación', 'Aquagym', 'Triatlón'],
    expertiseLevel: { 'Natación': 'expert', 'Aquagym': 'intermediate', 'Triatlón': 'expert' },
    bio: 'Ex-nadador profesional, ahora entrenador de natación y preparador de triatletas.',
    yearsExperience: 12,
    dateJoined: '2015-07-01',
    contractType: 'employee',
    rating: 4.9,
    totalClasses: 720,
    classesThisMonth: 30,
    totalStudents: 190,
    attendanceRate: 94,
    nextClass: {
      className: 'Natación Técnica',
      date: '2024-12-20',
      time: '07:00'
    },
    certifications: [
      {
        id: 'c12',
        name: 'Swimming Coach Level 3',
        institution: 'National Swimming Federation',
        dateObtained: '2014-05-15',
        status: 'valid'
      },
      {
        id: 'c13',
        name: 'Triathlon Coach',
        institution: 'International Triathlon Union',
        dateObtained: '2016-09-10',
        status: 'valid'
      }
    ],
    reviews: [
      { id: 'r13', studentName: 'Patricia N.', rating: 5, comment: 'Roberto ha mejorado mi técnica increíblemente', date: '2024-12-18', className: 'Natación' },
      { id: 'r14', studentName: 'Carlos B.', rating: 5, comment: 'Excelente preparación para competencia', date: '2024-12-16', className: 'Triatlón' }
    ],
    ratePerClass: 48,
    attendanceBonus: 10,
    salesCommission: 5
  },
  {
    id: '8',
    name: 'Elena',
    lastName: 'Morales',
    email: 'elena.morales@studio.com',
    phone: '+34 689 012 345',
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Elena',
    status: 'inactive',
    specialties: ['Danza', 'Zumba', 'Cardio Dance'],
    expertiseLevel: { 'Danza': 'expert', 'Zumba': 'expert', 'Cardio Dance': 'intermediate' },
    bio: 'Bailarina profesional y coreógrafa con especialización en fitness dance.',
    yearsExperience: 8,
    dateJoined: '2018-09-15',
    contractType: 'freelance',
    socialMedia: {
      instagram: '@elena_dance_fit',
      facebook: 'ElenaMoralesDance'
    },
    rating: 4.7,
    totalClasses: 410,
    classesThisMonth: 0,
    totalStudents: 175,
    attendanceRate: 89,
    certifications: [
      {
        id: 'c14',
        name: 'Zumba Instructor',
        institution: 'Zumba Fitness',
        dateObtained: '2017-06-10',
        expiryDate: '2023-06-10',
        status: 'expired'
      }
    ],
    reviews: [
      { id: 'r15', studentName: 'Beatriz L.', rating: 5, comment: 'Las clases son súper divertidas', date: '2024-10-15', className: 'Zumba' },
      { id: 'r16', studentName: 'Isabel R.', rating: 4, comment: 'Elena tiene mucha energía', date: '2024-10-10', className: 'Cardio Dance' }
    ],
    ratePerClass: 35,
    attendanceBonus: 6,
    salesCommission: 3
  },
  {
    id: '9',
    name: 'Javier',
    lastName: 'Torres',
    email: 'javier.torres@studio.com',
    phone: '+34 690 123 456',
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Javier',
    status: 'active',
    specialties: ['Bodybuilding', 'Powerlifting', 'Nutrición Deportiva'],
    expertiseLevel: { 'Bodybuilding': 'expert', 'Powerlifting': 'intermediate', 'Nutrición Deportiva': 'expert' },
    bio: 'Culturista competitivo y nutricionista deportivo. Especializado en hipertrofia y composición corporal.',
    yearsExperience: 11,
    dateJoined: '2016-03-01',
    contractType: 'employee',
    socialMedia: {
      instagram: '@javier_bodycoach'
    },
    rating: 4.8,
    totalClasses: 610,
    classesThisMonth: 29,
    totalStudents: 210,
    attendanceRate: 91,
    nextClass: {
      className: 'Hipertrofia Avanzada',
      date: '2024-12-20',
      time: '20:00'
    },
    certifications: [
      {
        id: 'c15',
        name: 'Sports Nutrition Specialist',
        institution: 'ISSN',
        dateObtained: '2017-11-20',
        status: 'valid'
      },
      {
        id: 'c16',
        name: 'Personal Trainer Certification',
        institution: 'NSCA-CPT',
        dateObtained: '2015-08-10',
        expiryDate: '2025-08-10',
        status: 'valid'
      }
    ],
    reviews: [
      { id: 'r17', studentName: 'Alberto S.', rating: 5, comment: 'Javier conoce todo sobre nutrición y entrenamiento', date: '2024-12-17', className: 'Bodybuilding' },
      { id: 'r18', studentName: 'Fernando P.', rating: 5, comment: 'Resultados garantizados con su método', date: '2024-12-14', className: 'Hipertrofia' }
    ],
    ratePerClass: 52,
    attendanceBonus: 12,
    salesCommission: 7
  },
  {
    id: '10',
    name: 'Cristina',
    lastName: 'Navarro',
    email: 'cristina.navarro@studio.com',
    phone: '+34 601 234 567',
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Cristina',
    status: 'active',
    specialties: ['Mindfulness', 'Yoga Terapéutico', 'Stretching'],
    expertiseLevel: { 'Mindfulness': 'expert', 'Yoga Terapéutico': 'expert', 'Stretching': 'intermediate' },
    bio: 'Terapeuta certificada en Yoga y Mindfulness, enfocada en bienestar integral y manejo del estrés.',
    yearsExperience: 9,
    dateJoined: '2017-04-15',
    contractType: 'freelance',
    socialMedia: {
      instagram: '@cristina_mindful_yoga'
    },
    rating: 5.0,
    totalClasses: 510,
    classesThisMonth: 27,
    totalStudents: 165,
    attendanceRate: 96,
    nextClass: {
      className: 'Mindfulness & Meditation',
      date: '2024-12-20',
      time: '08:00'
    },
    certifications: [
      {
        id: 'c17',
        name: 'Mindfulness-Based Stress Reduction',
        institution: 'University of Massachusetts',
        dateObtained: '2018-05-20',
        status: 'valid'
      },
      {
        id: 'c18',
        name: 'Therapeutic Yoga Certification',
        institution: 'Yoga Medicine',
        dateObtained: '2019-09-15',
        expiryDate: '2025-09-15',
        status: 'valid'
      }
    ],
    reviews: [
      { id: 'r19', studentName: 'Marta D.', rating: 5, comment: 'Cristina es una maestra increíble, cambió mi vida', date: '2024-12-18', className: 'Mindfulness' },
      { id: 'r20', studentName: 'Rosa V.', rating: 5, comment: 'Sus clases son un oasis de paz', date: '2024-12-17', className: 'Yoga Terapéutico' }
    ],
    ratePerClass: 46,
    attendanceBonus: 10,
    salesCommission: 5
  }
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
