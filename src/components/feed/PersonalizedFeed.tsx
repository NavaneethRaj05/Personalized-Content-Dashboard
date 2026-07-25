'use client';

import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useGetTopHeadlinesQuery } from '../../services/newsApi';
import { DraggableFeed } from './DraggableFeed';
import { HeroSlider } from './HeroSlider';
import { FiLoader, FiAlertCircle, FiWifi } from 'react-icons/fi';

export function PersonalizedFeed() {
  const categories = useSelector((state: RootState) => state.preferences.categories);
  const primaryCategory = categories.length > 0 ? categories[0] : 'general';

  const { data: newsItems, isLoading, error, refetch } = useGetTopHeadlinesQuery({ category: primaryCategory });

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-3 text-gray-400">
        <FiLoader className="w-6 h-6 animate-spin text-indigo-500" />
        <p className="text-[13px]">Loading your personalized feed…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card flex flex-col items-center justify-center py-16 text-center max-w-md mx-auto">
        <div className="w-14 h-14 rounded-2xl bg-red-50 dark:bg-red-500/10 flex items-center justify-center mb-4">
          <FiWifi className="w-6 h-6 text-red-500" />
        </div>
        <h3 className="text-[16px] font-semibold text-gray-900 dark:text-white mb-1">Could not load content</h3>
        <p className="text-[13px] text-gray-500 mb-4">Check your API key or internet connection.</p>
        <button onClick={() => refetch()} className="btn-primary text-sm">Try again</button>
      </div>
    );
  }

  if (!newsItems || newsItems.length === 0) {
    return (
      <div className="card flex flex-col items-center justify-center py-16 text-center">
        <FiAlertCircle className="w-8 h-8 text-gray-300 mb-3" />
        <p className="text-[14px] text-gray-500">No content found for your preferences. Try selecting different categories in Settings.</p>
      </div>
    );
  }

  const heroItems = newsItems.slice(0, 3);
  const feedItems = newsItems.slice(3);

  return (
    <div className="page-enter space-y-10">
      <HeroSlider items={heroItems} />

      <div>
        <div className="flex items-end justify-between mb-5">
          <div>
            <h2 className="section-title">Your Feed</h2>
            <p className="section-sub capitalize">{primaryCategory} • {feedItems.length} articles</p>
          </div>
          <p className="text-[12px] text-gray-400 hidden sm:block">Drag cards to reorder</p>
        </div>
        <DraggableFeed items={feedItems} />
      </div>
    </div>
  );
}
