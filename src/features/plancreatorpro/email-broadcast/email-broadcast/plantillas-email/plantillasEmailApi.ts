
// src/features/email-broadcast/plantillas-email/plantillasEmailApi.ts
import { PlaceholderImages } from '../../../../../utils/placeholderImages';

export interface EmailTemplate {
  id: string;
  name: string;
  category: string;
  thumbnail: string; // URL or base64 for thumbnail image
  content: string; // HTML content of the template
  isFavorite: boolean;
}

// Mock API calls for demonstration purposes
const mockTemplates: EmailTemplate[] = [
  {
    id: '1',
    name: 'Plantilla de Bienvenida',
    category: 'Bienvenida',
    thumbnail: PlaceholderImages.emailTemplate('#0000FF', 'Bienvenida'),
    content: '<h1>Bienvenido a nuestro servicio!</h1><p>Gracias por unirte.</p>',
    isFavorite: false,
  },
  {
    id: '2',
    name: 'Recordatorio de Evento',
    category: 'Recordatorio',
    thumbnail: PlaceholderImages.emailTemplate('#FF0000', 'Recordatorio'),
    content: '<h1>No olvides nuestro próximo evento!</h1><p>Te esperamos.</p>',
    isFavorite: true,
  },
  {
    id: '3',
    name: 'Anuncio de Nuevo Producto',
    category: 'Anuncio',
    thumbnail: PlaceholderImages.emailTemplate('#00FF00', 'Anuncio'),
    content: '<h1>Descubre nuestro nuevo producto!</h1><p>Te encantará.</p>',
    isFavorite: false,
  },
];

export const getEmailTemplates = async (): Promise<EmailTemplate[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockTemplates), 500);
  });
};

export const getEmailTemplateById = async (id: string): Promise<EmailTemplate | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockTemplates.find(template => template.id === id)), 500);
  });
};

export const updateEmailTemplate = async (template: EmailTemplate): Promise<EmailTemplate> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = mockTemplates.findIndex(t => t.id === template.id);
      if (index !== -1) {
        mockTemplates[index] = template;
        resolve(template);
      } else {
        reject(new Error('Template not found'));
      }
    }, 500);
  });
};

export const toggleFavoriteTemplate = async (id: string): Promise<EmailTemplate | undefined> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const template = mockTemplates.find(t => t.id === id);
      if (template) {
        template.isFavorite = !template.isFavorite;
        resolve(template);
      } else {
        reject(new Error('Template not found'));
      }
    }, 500);
  });
};
