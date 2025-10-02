export type LessonType = 'video' | 'texto' | 'quiz' | 'descargable';

export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  description: string;
  type: LessonType;
  order: number;
  duration?: number; // en minutos
  content: LessonContent;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type LessonContent =
  | VideoContent
  | TextContent
  | QuizContent
  | DownloadableContent;

export interface VideoContent {
  type: 'video';
  videoUrl: string;
  thumbnailUrl?: string;
  transcription?: string;
}

export interface TextContent {
  type: 'texto';
  html: string;
  markdown?: string;
}

export interface QuizContent {
  type: 'quiz';
  questions: QuizQuestion[];
  passingScore: number;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
  correctOptionId: string;
  explanation?: string;
}

export interface QuizOption {
  id: string;
  text: string;
}

export interface DownloadableContent {
  type: 'descargable';
  fileUrl: string;
  fileName: string;
  fileSize: number; // en bytes
  fileType: string;
}

export interface LessonFormData {
  title: string;
  description: string;
  type: LessonType;
  duration?: number;
  content: Partial<LessonContent>;
  isPublished: boolean;
}
