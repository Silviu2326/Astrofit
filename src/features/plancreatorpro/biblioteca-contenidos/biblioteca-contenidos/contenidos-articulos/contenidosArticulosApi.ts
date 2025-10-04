import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { mockArticles, Article, Comment } from './mockData';

// Simular delay de red
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const contenidosArticulosApi = createApi({
  reducerPath: 'contenidosArticulosApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/articles' }),
  endpoints: (builder) => ({
    getArticles: builder.query<Article[], void>({
      queryFn: async () => {
        await delay(800); // Simular delay de red
        return { data: mockArticles };
      },
    }),
    getArticleById: builder.query<Article, string>({
      queryFn: async (id) => {
        await delay(500);
        const article = mockArticles.find(a => a.id === id);
        if (!article) {
          return { error: { status: 404, data: 'Artículo no encontrado' } };
        }
        return { data: article };
      },
    }),
    createArticle: builder.mutation<Article, Partial<Article>>({
      queryFn: async (newArticle) => {
        await delay(1000);
        const article: Article = {
          id: Date.now().toString(),
          title: newArticle.title || 'Nuevo Artículo',
          content: newArticle.content || '',
          categories: newArticle.categories || [],
          tags: newArticle.tags || [],
          comments: [],
          author: 'Usuario Actual',
          publishedAt: new Date().toISOString().split('T')[0],
          readTime: 5,
          views: 0,
          ...newArticle
        };
        mockArticles.unshift(article);
        return { data: article };
      },
    }),
    updateArticle: builder.mutation<Article, Partial<Article>>({
      queryFn: async ({ id, ...patch }) => {
        await delay(800);
        const index = mockArticles.findIndex(a => a.id === id);
        if (index === -1) {
          return { error: { status: 404, data: 'Artículo no encontrado' } };
        }
        mockArticles[index] = { ...mockArticles[index], ...patch };
        return { data: mockArticles[index] };
      },
    }),
    deleteArticle: builder.mutation<void, string>({
      queryFn: async (id) => {
        await delay(600);
        const index = mockArticles.findIndex(a => a.id === id);
        if (index === -1) {
          return { error: { status: 404, data: 'Artículo no encontrado' } };
        }
        mockArticles.splice(index, 1);
        return { data: undefined };
      },
    }),
    addComment: builder.mutation<Comment, Partial<Comment>>({
      queryFn: async (newComment) => {
        await delay(500);
        const comment: Comment = {
          id: Date.now().toString(),
          articleId: newComment.articleId || '',
          memberId: newComment.memberId || 'user',
          memberName: newComment.memberName || 'Usuario',
          comment: newComment.comment || '',
          createdAt: new Date().toISOString()
        };
        
        const article = mockArticles.find(a => a.id === comment.articleId);
        if (article) {
          article.comments.push(comment);
        }
        
        return { data: comment };
      },
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
