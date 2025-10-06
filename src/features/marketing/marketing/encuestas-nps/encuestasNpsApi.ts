import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface NpsScore {
  date: string;
  score: number;
}

interface Feedback {
  id: string;
  type: 'promoter' | 'passive' | 'detractor';
  comment: string;
  score: number;
  date: string;
}

interface SurveyTemplate {
  id: string;
  name: string;
  questions: string[];
}

const mockNpsScores: NpsScore[] = [
  { date: '2024-01-01', score: 30 },
  { date: '2024-02-01', score: 35 },
  { date: '2024-03-01', score: 40 },
  { date: '2024-04-01', score: 38 },
  { date: '2024-05-01', score: 42 },
];

const mockFeedback: Feedback[] = [
  { id: '1', type: 'promoter', comment: 'Excelente servicio, muy contento con los resultados!', score: 9, date: '2024-05-20' },
  { id: '2', type: 'passive', comment: 'El gimnasio está bien, pero podría mejorar la variedad de clases.', score: 7, date: '2024-05-19' },
  { id: '3', type: 'detractor', comment: 'Muy insatisfecho con la atención al cliente, no me resolvieron nada.', score: 3, date: '2024-05-18' },
  { id: '4', type: 'promoter', comment: 'Los entrenadores son muy profesionales y motivadores.', score: 10, date: '2024-05-17' },
  { id: '5', type: 'passive', comment: 'Las instalaciones son un poco antiguas, pero cumplen su función.', score: 6, date: '2024-05-16' },
  { id: '6', type: 'detractor', comment: 'El horario de apertura es muy limitado, no puedo ir cuando quiero.', score: 4, date: '2024-05-15' },
];

const mockSurveyTemplates: SurveyTemplate[] = [
  { id: '1', name: 'Encuesta General de Satisfacción', questions: ['¿Qué tan probable es que nos recomiendes a un amigo o colega?', '¿Qué es lo que más te gusta de nuestro servicio?', '¿Qué podríamos mejorar?'] },
  { id: '2', name: 'Encuesta Post-Clase', questions: ['¿Qué tan probable es que recomiendes esta clase?', '¿Cómo calificarías al instructor?', '¿Qué te pareció la intensidad de la clase?'] },
];

export const encuestasNpsApi = createApi({
  reducerPath: 'encuestasNpsApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }), // Mocking, so base URL doesn't matter much
  endpoints: (builder) => ({
    getNpsScores: builder.query<NpsScore[], void>({
      queryFn: () => ({ data: mockNpsScores }),
    }),
    getFeedback: builder.query<Feedback[], void>({
      queryFn: () => ({ data: mockFeedback }),
    }),
    getSurveyTemplates: builder.query<SurveyTemplate[], void>({
      queryFn: () => ({ data: mockSurveyTemplates }),
    }),
    sendSurvey: builder.mutation<any, { templateId: string; responses: { question: string; answer: string | number }[] }>({
      queryFn: (surveyData) => {
        console.log('Sending survey:', surveyData);
        return { data: { success: true, message: 'Survey sent successfully' } };
      },
    }),
  }),
});

export const { useGetNpsScoresQuery, useGetFeedbackQuery, useGetSurveyTemplatesQuery, useSendSurveyMutation } = encuestasNpsApi;