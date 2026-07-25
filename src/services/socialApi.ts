import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ContentItem } from '../store/slices/favoritesSlice';

// A mock endpoint for Social Media posts (Twitter/Instagram style)
const MOCK_POSTS = [
  {
    id: 'social-1',
    author: '@tech_insider',
    content: 'Just tried the new AI models and they are mind-blowing! 🤯 The reasoning capabilities are off the charts. #AI #TechTrends',
    image: null,
    likes: 1402,
    date: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 mins ago
  },
  {
    id: 'social-2',
    author: '@design_guru',
    content: 'Glassmorphism is back but with a twist. Loving the new depth effects and mesh gradients in modern UI design. Check out this snippet! ✨',
    image: 'https://placehold.co/600x600/10b981/ffffff?text=Design+Snippet',
    likes: 389,
    date: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
  },
  {
    id: 'social-3',
    author: '@dev_memes',
    content: 'When you fix a bug but 5 more appear. 🐛🔨 #programming #webdev',
    image: null,
    likes: 4501,
    date: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
  },
  {
    id: 'social-4',
    author: '@frontend_daily',
    content: 'React Server Components are changing how we build apps. Are you using App Router yet? Let us know below! 👇',
    image: null,
    likes: 892,
    date: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(), // 12 hours ago
  },
];

export const socialApi = createApi({
  reducerPath: 'socialApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }), // Mock response
  endpoints: (builder) => ({
    getSocialPosts: builder.query<ContentItem[], void>({
      queryFn: async () => {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 600));

        const transformed: ContentItem[] = MOCK_POSTS.map(post => ({
          id: post.id,
          type: 'social',
          title: `Post by ${post.author}`,
          description: post.content,
          imageUrl: post.image || undefined,
          url: `https://twitter.com/search?q=${encodeURIComponent(post.author)}`, // Mock URL
          date: post.date,
          source: 'Social Media',
        }));

        return { data: transformed };
      },
    }),
  }),
});

export const { useGetSocialPostsQuery } = socialApi;
