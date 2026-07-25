'use client';

import { useMemo, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useGetTopHeadlinesQuery } from '../../services/newsApi';
import { useGetTrendingMoviesQuery } from '../../services/tmdbApi';
import { useGetSocialPostsQuery } from '../../services/socialApi';
import { ContentItem } from '../../store/slices/favoritesSlice';
import { DraggableFeed } from './DraggableFeed';
import { HeroSlider } from './HeroSlider';
import { FiLoader, FiAlertCircle, FiWifi, FiRefreshCw } from 'react-icons/fi';
import { motion } from 'framer-motion';

const PAGE_SIZE = 6; // articles per "page" shown in the feed

export function PersonalizedFeed() {
  const categories = useSelector((state: RootState) => state.preferences.categories);
  const primaryCategory = categories.length > 0 ? categories[0] : 'general';
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  // Fetch from all 3 APIs
  const { data: newsItems, isLoading: newsLoading, error: newsError, refetch: refetchNews } = useGetTopHeadlinesQuery({ category: primaryCategory });
  const { data: movieItems, isLoading: moviesLoading } = useGetTrendingMoviesQuery();
  const { data: socialItems, isLoading: socialLoading } = useGetSocialPostsQuery();

  const isLoading = newsLoading || moviesLoading || socialLoading;

  // Build the combined interleaved list (hero + feed)
  const { heroItems, allFeedItems } = useMemo(() => {
    if (!newsItems) return { heroItems: [], allFeedItems: [] };

    const news = [...(newsItems || [])];
    const movies = [...(movieItems || [])];
    const social = [...(socialItems || [])];

    // Top 3 news for hero slider
    const heroItems = news.splice(0, 3);

    // Interleave the rest: 2 news, 1 social, 1 movie
    const combined: ContentItem[] = [];
    while (news.length > 0 || movies.length > 0 || social.length > 0) {
      if (news.length > 0) combined.push(news.shift()!);
      if (news.length > 0) combined.push(news.shift()!);
      if (social.length > 0) combined.push(social.shift()!);
      if (movies.length > 0) combined.push(movies.shift()!);
    }

    return { heroItems, allFeedItems: combined };
  }, [newsItems, movieItems, socialItems]);

  // Paginated slice of the feed
  const visibleFeed = useMemo(() => {
    return allFeedItems.slice(0, page * PAGE_SIZE);
  }, [allFeedItems, page]);

  const hasMore = visibleFeed.length < allFeedItems.length;

  const handleLoadMore = useCallback(() => {
    setLoadingMore(true);
    // Simulate brief delay for UX feedback
    setTimeout(() => {
      setPage(prev => prev + 1);
      setLoadingMore(false);
    }, 500);
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-3 text-gray-400">
        <FiLoader className="w-6 h-6 animate-spin text-indigo-500" />
        <p className="text-[13px]">Aggregating your personalized feed…</p>
        <p className="text-[11px] text-gray-300 dark:text-gray-600">Fetching news, recommendations & social posts</p>
      </div>
    );
  }

  if (newsError) {
    return (
      <div className="card flex flex-col items-center justify-center py-16 text-center max-w-md mx-auto">
        <div className="w-14 h-14 rounded-2xl bg-red-50 dark:bg-red-500/10 flex items-center justify-center mb-4">
          <FiWifi className="w-6 h-6 text-red-500" />
        </div>
        <h3 className="text-[16px] font-semibold text-gray-900 dark:text-white mb-1">Could not load content</h3>
        <p className="text-[13px] text-gray-500 mb-4">Check your API key or internet connection.</p>
        <button onClick={() => refetchNews()} className="btn-primary text-sm">
          <FiRefreshCw className="w-3.5 h-3.5" /> Try again
        </button>
      </div>
    );
  }

  if (!heroItems.length) {
    return (
      <div className="card flex flex-col items-center justify-center py-16 text-center">
        <FiAlertCircle className="w-8 h-8 text-gray-300 mb-3" />
        <p className="text-[14px] text-gray-500">No content found for your preferences. Try selecting different categories in Settings.</p>
      </div>
    );
  }

  return (
    <div className="page-enter space-y-10">
      <HeroSlider items={heroItems} />

      <div>
        <div className="flex items-end justify-between mb-5">
          <div>
            <h2 className="section-title">Your Feed</h2>
            <p className="section-sub capitalize">
              {primaryCategory} News · Recommendations · Social
              <span className="ml-2 text-indigo-500 font-medium">{visibleFeed.length} of {allFeedItems.length}</span>
            </p>
          </div>
          <p className="text-[12px] text-gray-400 hidden sm:block">Drag cards to reorder</p>
        </div>

        <DraggableFeed items={visibleFeed} />

        {/* Load More */}
        {hasMore && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center mt-10"
          >
            <button
              onClick={handleLoadMore}
              disabled={loadingMore}
              className="btn-primary px-8 py-3 text-[13px] disabled:opacity-60"
            >
              {loadingMore ? (
                <>
                  <FiLoader className="w-4 h-4 animate-spin" />
                  Loading more…
                </>
              ) : (
                <>
                  <FiRefreshCw className="w-4 h-4" />
                  Load More ({allFeedItems.length - visibleFeed.length} remaining)
                </>
              )}
            </button>
          </motion.div>
        )}

        {!hasMore && allFeedItems.length > 0 && (
          <p className="text-center text-[12px] text-gray-400 mt-8">
            You&apos;ve reached the end of your feed ✓
          </p>
        )}
      </div>
    </div>
  );
}
