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
    <div className="py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
          <FiSearch className="text-blue-500" /> Search Results
        </h1>
        {query && <p className="text-gray-500 mt-2">Showing results for &quot;{query}&quot;</p>}
      </div>

      {!query ? (
        <div className="text-center py-20 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Enter a search term</h2>
          <p className="text-gray-500 mt-2">Use the search bar above to find content.</p>
        </div>
      ) : isLoading ? (
        <div className="flex justify-center py-20">
          <FiLoader className="w-8 h-8 animate-spin text-blue-500" />
        </div>
      ) : data && data.length > 0 ? (
        <DraggableFeed items={data} />
      ) : (
        <div className="text-center py-20 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">No results found</h2>
          <p className="text-gray-500 mt-2">Try adjusting your search terms.</p>
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center"><FiLoader className="w-8 h-8 animate-spin mx-auto text-blue-500"/></div>}>
      <SearchContent />
    </Suspense>
  );
}
