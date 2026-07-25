'use client';

import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { DraggableFeed } from '../../components/feed/DraggableFeed';
import { FiHeart } from 'react-icons/fi';

export default function FavoritesPage() {
  const items = useSelector((state: RootState) => state.favorites.items);

  return (
    <div className="py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
          <FiHeart className="text-red-500" /> Favorites
        </h1>
        <p className="text-gray-500 mt-2">Your saved content, organized exactly how you like it.</p>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800">
          <FiHeart className="w-16 h-16 mx-auto text-gray-300 dark:text-gray-700 mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">No favorites yet</h2>
          <p className="text-gray-500 mt-2">Click the heart icon on any card to save it here.</p>
        </div>
      ) : (
        <DraggableFeed items={items} />
      )}
    </div>
  );
}
