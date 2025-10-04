import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface Article {
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
  attachments?: { name: string; url: string }[];
  categories: string[];
  tags: string[];
  comments: Comment[];
}

interface Comment {
  id: string;
  articleId: string;
  memberId: string;
  memberName: string;
  comment: string;
  createdAt: string;
}

export const contenidosArticulosApi = createApi({
  reducerPath: 'contenidosArticulosApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/articles' }), // Adjust base URL as needed
  endpoints: (builder) => ({
    getArticles: builder.query<Article[], void>({
      query: () => '',
    }),
    getArticleById: builder.query<Article, string>({
      query: (id) => `/${id}`,
    }),
    createArticle: builder.mutation<Article, Partial<Article>>({
      query: (newArticle) => ({
        url: '',
        method: 'POST',
        body: newArticle,
      }),
    }),
    updateArticle: builder.mutation<Article, Partial<Article>>({
      query: ({ id, ...patch }) => ({
        url: `/${id}`,
        method: 'PUT',
        body: patch,
      }),
    }),
    deleteArticle: builder.mutation<void, string>({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
    }),
    addComment: builder.mutation<Comment, Partial<Comment>>({
      query: (newComment) => ({
        url: `/comments`,
        method: 'POST',
        body: newComment,
      }),
    }),
  }),
});

export const {
  useGetArticlesQuery,
  useGetArticleByIdQuery,
  useCreateArticleMutation,
  useUpdateArticleMutation,
  useDeleteArticleMutation,
  useAddCommentMutation,
} = contenidosArticulosApi;
