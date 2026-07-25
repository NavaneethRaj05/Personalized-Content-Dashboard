'use client';

import { useSearchParams } from 'next/navigation';
import { useGetTopHeadlinesQuery } from '../../services/newsApi';
import { DraggableFeed } from '../../components/feed/DraggableFeed';
import { FiSearch, FiLoader } from 'react-icons/fi';
import { Suspense } from 'react';

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';

  const { data, isLoading } = useGetTopHeadlinesQuery({ query }, { skip: !query });

  return (
    <div className="page-enter py-8">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center">
            <FiSearch className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          </div>
          <div>
            <h1 className="section-title">
              {query ? <>Results for <span className="gradient-text">&ldquo;{query}&rdquo;</span></> : 'Search'}
            </h1>
          </div>
        </div>
        {data && !isLoading && (
          <p className="section-sub ml-12">{data.length} article{data.length !== 1 ? 's' : ''} found</p>
        )}
      </div>

      {!query ? (
        <div className="card flex flex-col items-center justify-center py-20 text-center">
          <div className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-white/[0.04] flex items-center justify-center mb-4">
            <FiSearch className="w-7 h-7 text-gray-300 dark:text-gray-600" />
          </div>
          <h2 className="text-[16px] font-semibold text-gray-900 dark:text-white mb-1">Start searching</h2>
          <p className="text-[13px] text-gray-400 max-w-xs">
            Use the search bar above or press <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-white/10 rounded text-[11px] font-mono">Ctrl+K</kbd> to begin.
          </p>
        </div>
      ) : isLoading ? (
        <div className="flex flex-col items-center justify-center py-24 gap-3 text-gray-400">
          <FiLoader className="w-6 h-6 animate-spin text-indigo-500" />
          <p className="text-[13px]">Searching for &ldquo;{query}&rdquo;…</p>
        </div>
      ) : data && data.length > 0 ? (
        <DraggableFeed items={data} />
      ) : (
        <div className="card flex flex-col items-center justify-center py-20 text-center">
          <h2 className="text-[16px] font-semibold text-gray-900 dark:text-white mb-1">No results found</h2>
          <p className="text-[13px] text-gray-400">Try a different search term or browse the trending feed.</p>
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center py-24">
        <FiLoader className="w-6 h-6 animate-spin text-indigo-500" />
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}
