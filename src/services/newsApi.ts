import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ContentItem } from '../store/slices/favoritesSlice';

export const newsApi = createApi({
  reducerPath: 'newsApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
  endpoints: (builder) => ({
    getTopHeadlines: builder.query<ContentItem[], { category?: string; query?: string; page?: number }>({
      query: ({ category = 'general', query = '', page = 1 }) => {
        let url = `news?page=${page}`;
        if (query) {
          url += `&query=${query}`;
        } else if (category) {
          url += `&category=${category}`;
        }
        return url;
      },
      transformResponse: (response: { articles: Array<{ url: string, title: string, description: string, urlToImage: string, publishedAt: string, source: { name: string } }> }) => {
        if (!response.articles) return [];
        return response.articles.filter((article) => article.title !== '[Removed]').map((article) => ({
          id: article.url,
          type: 'news',
          title: article.title,
          description: article.description || '',
          imageUrl: article.urlToImage,
          url: article.url,
          date: article.publishedAt,
          source: article.source.name,
        }));
      },
    }),
  }),
});

export const { useGetTopHeadlinesQuery } = newsApi;
