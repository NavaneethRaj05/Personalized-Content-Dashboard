'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ContentItem } from '../../store/slices/favoritesSlice';
import { FiBookmark, FiExternalLink, FiMove, FiCalendar } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../../store/slices/favoritesSlice';
import { RootState } from '../../store';
import { AISummarizer } from '../ai/AISummarizer';


interface ContentCardProps {
  item: ContentItem;
  id: string;
}

const TYPE_COLORS: Record<string, string> = {
  news: 'bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400',
  movie: 'bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400',
  social: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400',
};

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
    opacity: isDragging ? 0.4 : 1,
    zIndex: isDragging ? 50 : 1,
  };

  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.favorites.items);
  const isFavorite = favorites.some((fav) => fav.id === item.id);

  const typeColor = TYPE_COLORS[item.type] || TYPE_COLORS.news;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="card card-hover flex flex-col h-full overflow-hidden"
    >
      {/* Image */}
      {item.imageUrl ? (
        <div className="relative h-44 w-full overflow-hidden bg-gray-100 dark:bg-gray-800 flex-shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={item.imageUrl}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
            onError={(e) => {
              (e.target as HTMLImageElement).src = `https://placehold.co/400x300/6366f1/ffffff?text=${item.source || 'News'}`;
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

          {/* Drag handle */}
          <div
            {...attributes}
            {...listeners}
            className="absolute top-2 left-2 w-7 h-7 rounded-lg bg-black/30 backdrop-blur-sm text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing"
          >
            <FiMove className="w-3.5 h-3.5" />
          </div>

          {/* Bookmark */}
          <button
            onClick={() => dispatch(toggleFavorite(item))}
            className={`absolute top-2 right-2 w-7 h-7 rounded-lg backdrop-blur-sm flex items-center justify-center transition-all ${
              isFavorite
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'bg-black/30 text-white hover:bg-indigo-600/80'
            }`}
          >
            <FiBookmark className={`w-3.5 h-3.5 ${isFavorite ? 'fill-current' : ''}`} />
          </button>
        </div>
      ) : (
        <div className="relative h-10 w-full flex-shrink-0">
          <div
            {...attributes}
            {...listeners}
            className="absolute top-2 left-2 w-7 h-7 rounded-lg bg-gray-100 dark:bg-white/[0.06] text-gray-500 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing"
          >
            <FiMove className="w-3.5 h-3.5" />
          </div>
          <button
            onClick={() => dispatch(toggleFavorite(item))}
            className={`absolute top-2 right-2 w-7 h-7 rounded-lg flex items-center justify-center transition-all ${
              isFavorite
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 dark:bg-white/[0.06] text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400'
            }`}
          >
            <FiBookmark className={`w-3.5 h-3.5 ${isFavorite ? 'fill-current' : ''}`} />
          </button>
        </div>
      )}

      {/* Body */}
      <div className="flex flex-col flex-1 p-4">
        {/* Meta row */}
        <div className="flex items-center gap-2 mb-3">
          <span className={`badge ${typeColor}`}>{item.type}</span>
          {item.source && (
            <span className="text-[11px] font-medium text-gray-400 truncate">{item.source}</span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-[14px] font-semibold text-gray-900 dark:text-white leading-snug line-clamp-2 mb-2">
          {item.title}
        </h3>

        {/* Description */}
        {item.description && (
          <p className="text-[12.5px] text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-2 mb-4 flex-1">
            {item.description}
          </p>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-[var(--border)]">
          <AISummarizer title={item.title} description={item.description} />

          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-[11px] text-gray-400" suppressHydrationWarning>
              <FiCalendar className="w-3 h-3" />
              {new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </span>
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-7 h-7 rounded-lg bg-gray-100 dark:bg-white/[0.06] flex items-center justify-center text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-all"
              title="Read full article"
            >
              <FiExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
