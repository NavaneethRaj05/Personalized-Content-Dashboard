'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ContentItem } from '../../store/slices/favoritesSlice';
import { FiHeart, FiExternalLink, FiMove } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../../store/slices/favoritesSlice';
import { RootState } from '../../store';

interface ContentCardProps {
  item: ContentItem;
  id: string;
}

export function ContentCard({ item, id }: ContentCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 50 : 1,
  };

  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.favorites.items);
  const isFavorite = favorites.some((fav) => fav.id === item.id);

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="group relative bg-white/70 dark:bg-[#151515]/70 backdrop-blur-2xl rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] hover:shadow-2xl hover:shadow-blue-500/10 dark:hover:shadow-blue-500/20 border border-white/50 dark:border-white/5 overflow-hidden transition-all duration-500 hover:-translate-y-1"
    >
      <div 
        {...attributes} 
        {...listeners}
        className="absolute top-2 left-2 p-2 bg-black/40 backdrop-blur-md rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing z-10"
      >
        <FiMove />
      </div>

      <div className="absolute top-2 right-2 flex space-x-2 z-10">
        <button
          onClick={() => dispatch(toggleFavorite(item))}
          className="p-2 bg-white/80 dark:bg-black/60 backdrop-blur-md rounded-full text-gray-900 dark:text-white hover:text-red-500 transition-colors"
        >
          <FiHeart className={isFavorite ? 'fill-red-500 text-red-500' : ''} />
        </button>
      </div>

      {item.imageUrl && (
        <div className="h-48 w-full overflow-hidden">
          <img
            src={item.imageUrl}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=No+Image';
            }}
          />
        </div>
      )}

      <div className="p-5">
        <div className="flex items-center space-x-2 mb-3">
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 uppercase tracking-wider">
            {item.type}
          </span>
          {item.source && (
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {item.source}
            </span>
          )}
        </div>
        
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 leading-snug">
          {item.title}
        </h3>
        
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
          {item.description}
        </p>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100 dark:border-gray-800">
          <span className="text-xs text-gray-400" suppressHydrationWarning>
            {new Date(item.date).toLocaleDateString()}
          </span>
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
          >
            <span>Read More</span>
            <FiExternalLink />
          </a>
        </div>
      </div>
    </div>
  );
}
