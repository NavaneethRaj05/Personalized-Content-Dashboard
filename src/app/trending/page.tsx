'use client';

import { useGetTopHeadlinesQuery } from '../../services/newsApi';
import { DraggableFeed } from '../../components/feed/DraggableFeed';
import { FiTrendingUp, FiLoader } from 'react-icons/fi';

export default function TrendingPage() {
  const { data, isLoading } = useGetTopHeadlinesQuery({ category: 'general' });

  return (
    <div className="py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
          <FiTrendingUp className="text-green-500" /> Trending Now
        </h1>
        <p className="text-gray-500 mt-2">The most popular content right now.</p>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20">
          <FiLoader className="w-8 h-8 animate-spin text-green-500" />
        </div>
      ) : data && data.length > 0 ? (
        <DraggableFeed items={data} />
      ) : (
        <div className="text-center py-20 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Nothing trending</h2>
          <p className="text-gray-500 mt-2">Check back later for updates.</p>
        </div>
      )}
    </div>
  );
}
