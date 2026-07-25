'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ContentItem } from '../../store/slices/favoritesSlice';
import { FiChevronLeft, FiChevronRight, FiExternalLink, FiZap } from 'react-icons/fi';
import { AISummarizer } from '../ai/AISummarizer';

export function HeroSlider({ items }: { items: ContentItem[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    if (items.length <= 1) return;
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [items.length]);

  if (!items || items.length === 0) return null;

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
    center: { zIndex: 1, x: 0, opacity: 1 },
    exit: (dir: number) => ({ zIndex: 0, x: dir < 0 ? '100%' : '-100%', opacity: 0 }),
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => {
      let nextIndex = prev + newDirection;
      if (nextIndex < 0) nextIndex = items.length - 1;
      if (nextIndex >= items.length) nextIndex = 0;
      return nextIndex;
    });
  };

  const currentItem = items[currentIndex];

  return (
    <div className="relative w-full h-[320px] sm:h-[420px] lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl mb-10 group bg-black select-none">
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ x: { type: 'spring', stiffness: 300, damping: 30 }, opacity: { duration: 0.25 } }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.1}
          onDragEnd={(_, info) => {
            if (info.offset.x < -60) paginate(1);
            else if (info.offset.x > 60) paginate(-1);
          }}
          className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing"
        >
          {currentItem.imageUrl ? (
            <div className="absolute inset-0">
              <img src={currentItem.imageUrl} alt={currentItem.title} className="w-full h-full object-cover opacity-50" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
            </div>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-tr from-violet-900 to-indigo-800" />
          )}

          {/* Source badge */}
          {currentItem.source && (
            <div className="absolute top-6 left-6 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-white text-xs font-semibold border border-white/20">
              {currentItem.source}
            </div>
          )}

          <div className="absolute bottom-0 left-0 p-6 sm:p-10 w-full">
            <span className="inline-flex items-center space-x-1 px-3 py-1 mb-4 rounded-full text-xs font-bold tracking-wider uppercase bg-violet-500 text-white shadow-lg">
              <FiZap className="w-3 h-3" />
              <span>Top Story</span>
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-3 leading-tight drop-shadow-lg line-clamp-2">
              {currentItem.title}
            </h2>
            {currentItem.description && (
              <p className="text-gray-300 text-sm sm:text-base line-clamp-2 mb-5 max-w-2xl">
                {currentItem.description}
              </p>
            )}
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={currentItem.url}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center space-x-2 bg-white text-black px-5 py-2.5 rounded-full font-semibold hover:bg-gray-100 transition-colors shadow-xl text-sm"
              >
                <span>Read Full Story</span>
                <FiExternalLink className="w-4 h-4" />
              </a>
              <div onClick={(e) => e.stopPropagation()}>
                <AISummarizer title={currentItem.title} description={currentItem.description} />
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Nav buttons — desktop only */}
      {items.length > 1 && (
        <>
          <button
            className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/50 z-10"
            onClick={() => paginate(-1)}
          >
            <FiChevronLeft className="w-5 h-5" />
          </button>
          <button
            className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/50 z-10"
            onClick={() => paginate(1)}
          >
            <FiChevronRight className="w-5 h-5" />
          </button>

          {/* Dot indicators */}
          <div className="absolute bottom-5 right-6 flex space-x-2 z-10">
            {items.map((_, idx) => (
              <button
                key={idx}
                onClick={() => { setDirection(idx > currentIndex ? 1 : -1); setCurrentIndex(idx); }}
                className={`h-2 rounded-full transition-all duration-300 ${idx === currentIndex ? 'bg-white w-6' : 'bg-white/40 w-2 hover:bg-white/70'}`}
              />
            ))}
          </div>

          {/* Swipe hint on mobile */}
          <p className="sm:hidden absolute bottom-5 left-6 text-white/50 text-xs">Swipe to explore</p>
        </>
      )}
    </div>
  );
}
