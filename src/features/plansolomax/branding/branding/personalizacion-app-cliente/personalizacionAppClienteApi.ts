import { PlaceholderImages } from '../../../../../utils/placeholderImages';

export interface AppBranding {
  id: string;
  clientName: string;
  primaryColor: string;
  secondaryColor: string;
  logoUrl: string;
  splashScreenUrl: string;
  appIconUrl: string;
  welcomeMessage: string;
  customFont?: string;
  status: 'draft' | 'active' | 'archived';
}

export interface BrandingTemplate {
  id: string;
  name: string;
  description: string;
  previewUrl: string;
  category: 'fitness' | 'wellness' | 'sports' | 'corporate';
}

const mockBranding: AppBranding[] = [
  {
    id: '1',
    clientName: 'FitLife Gym',
    primaryColor: '#3B82F6',
    secondaryColor: '#1E40AF',
    logoUrl: PlaceholderImages.logo(150),
    splashScreenUrl: PlaceholderImages.generic(300, 600, 'Splash Screen'),
    appIconUrl: PlaceholderImages.logo(100),
    welcomeMessage: '¡Bienvenido a FitLife Gym!',
    customFont: 'Inter',
    status: 'active',
  },
  {
    id: '2',
    clientName: 'Wellness Center',
    primaryColor: '#10B981',
    secondaryColor: '#059669',
    logoUrl: PlaceholderImages.logo(150),
    splashScreenUrl: PlaceholderImages.generic(300, 600, 'Splash Screen'),
    appIconUrl: PlaceholderImages.logo(100),
    welcomeMessage: '¡Bienvenido a nuestro centro de bienestar!',
    status: 'draft',
  },
];

const mockTemplates: BrandingTemplate[] = [
  {
    id: '1',
    name: 'Fitness Pro',
    description: 'Plantilla moderna para gimnasios y centros de fitness',
    previewUrl: PlaceholderImages.generic(300, 200, 'Fitness Template'),
    category: 'fitness',
  },
  {
    id: '2',
    name: 'Wellness Zen',
    description: 'Diseño relajante para centros de bienestar y spa',
    previewUrl: PlaceholderImages.generic(300, 200, 'Wellness Template'),
    category: 'wellness',
  },
  {
    id: '3',
    name: 'Sports Dynamic',
    description: 'Plantilla energética para equipos deportivos',
    previewUrl: PlaceholderImages.generic(300, 200, 'Sports Template'),
    category: 'sports',
  },
];

export const fetchBranding = async (): Promise<AppBranding[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockBranding);
    }, 500);
  });
};

export const fetchBrandingById = async (id: string): Promise<AppBranding | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockBranding.find(branding => branding.id === id));
    }, 500);
  });
};

export const fetchTemplates = async (category?: string): Promise<BrandingTemplate[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filteredTemplates = category 
        ? mockTemplates.filter(template => template.category === category)
        : mockTemplates;
      resolve(filteredTemplates);
    }, 500);
  });
};

export const createBranding = async (branding: Omit<AppBranding, 'id'>): Promise<AppBranding> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newBranding: AppBranding = {
        ...branding,
        id: Date.now().toString(),
      };
      resolve(newBranding);
    }, 500);
  });
};

export const updateBranding = async (id: string, branding: Partial<AppBranding>): Promise<AppBranding> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const existingBranding = mockBranding.find(b => b.id === id);
      if (existingBranding) {
        const updatedBranding = { ...existingBranding, ...branding };
        resolve(updatedBranding);
      } else {
        reject(new Error('Branding not found'));
      }
    }, 500);
  });
};

export const deleteBranding = async (id: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = mockBranding.findIndex(b => b.id === id);
      if (index !== -1) {
        mockBranding.splice(index, 1);
        resolve();
      } else {
        reject(new Error('Branding not found'));
      }
    }, 500);
  });
};

export const applyTemplate = async (brandingId: string, templateId: string): Promise<AppBranding> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const branding = mockBranding.find(b => b.id === brandingId);
      const template = mockTemplates.find(t => t.id === templateId);
      
      if (branding && template) {
        // Apply template colors and settings
        branding.primaryColor = template.category === 'fitness' ? '#3B82F6' : '#10B981';
        branding.secondaryColor = template.category === 'fitness' ? '#1E40AF' : '#059669';
        resolve(branding);
      } else {
        reject(new Error('Branding or template not found'));
      }
    }, 500);
  });
};

export const generatePreview = async (brandingId: string): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Generate a preview URL (in real app, this would call an API)
      resolve(PlaceholderImages.generic(400, 800, 'App Preview'));
    }, 1000);
  });
};

export const publishBranding = async (id: string): Promise<AppBranding> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const branding = mockBranding.find(b => b.id === id);
      if (branding) {
        branding.status = 'active';
        resolve(branding);
      } else {
        reject(new Error('Branding not found'));
      }
    }, 500);
  });
};