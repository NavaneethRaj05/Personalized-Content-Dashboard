'use client';

import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { DraggableFeed } from '../../components/feed/DraggableFeed';
import { FiBookmark } from 'react-icons/fi';

export default function FavoritesPage() {
  const items = useSelector((state: RootState) => state.favorites.items);

  return (
    <div className="page-enter py-8">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center">
            <FiBookmark className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          </div>
          <h1 className="section-title">Saved Articles</h1>
        </div>
        <p className="section-sub ml-12">
          {items.length > 0 ? `${items.length} saved article${items.length > 1 ? 's' : ''} — drag to reorder` : 'Articles you bookmark appear here.'}
        </p>
      </div>

      {items.length === 0 ? (
        <div className="card flex flex-col items-center justify-center py-20 text-center">
          <div className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-white/[0.04] flex items-center justify-center mb-4">
            <FiBookmark className="w-7 h-7 text-gray-300 dark:text-gray-600" />
          </div>
          <h2 className="text-[16px] font-semibold text-gray-900 dark:text-white mb-1">Nothing saved yet</h2>
          <p className="text-[13px] text-gray-400 max-w-xs">
            Click the bookmark icon on any article card to save it here for later.
          </p>
        </div>
      ) : (
        <DraggableFeed items={items} />
      )}
    </div>
  );
}
