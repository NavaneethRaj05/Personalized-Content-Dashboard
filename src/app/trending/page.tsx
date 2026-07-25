'use client';

import { useGetTopHeadlinesQuery } from '../../services/newsApi';
import { DraggableFeed } from '../../components/feed/DraggableFeed';
import { FiTrendingUp, FiLoader } from 'react-icons/fi';

export default function TrendingPage() {
  const { data, isLoading } = useGetTopHeadlinesQuery({ category: 'general' });

  return (
    <div className="page-enter py-8">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-9 h-9 rounded-xl bg-orange-50 dark:bg-orange-500/10 flex items-center justify-center">
            <FiTrendingUp className="w-5 h-5 text-orange-500 dark:text-orange-400" />
          </div>
          <h1 className="section-title">Trending Now</h1>
        </div>
        <p className="section-sub ml-12">The most-read stories across the globe right now.</p>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-24 gap-3 text-gray-400">
          <FiLoader className="w-6 h-6 animate-spin text-indigo-500" />
          <p className="text-[13px]">Fetching trending stories…</p>
        </div>
      ) : data && data.length > 0 ? (
        <DraggableFeed items={data} />
      ) : (
        <div className="card flex flex-col items-center justify-center py-20 text-center">
          <h2 className="text-[16px] font-semibold text-gray-900 dark:text-white mb-1">Nothing trending right now</h2>
          <p className="text-[13px] text-gray-400">Check back in a few minutes for the latest stories.</p>
        </div>
      )}
    </div>
  );
}
