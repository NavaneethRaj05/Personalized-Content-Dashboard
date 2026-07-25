'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ContentItem } from '../../store/slices/favoritesSlice';
import { FiChevronLeft, FiChevronRight, FiExternalLink } from 'react-icons/fi';

export function HeroSlider({ items }: { items: ContentItem[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    if (items.length <= 1) return;
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [items.length]);

  if (!items || items.length === 0) return null;

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (dir: number) => ({
      zIndex: 0,
      x: dir < 0 ? 1000 : -1000,
      opacity: 0
    })
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
    <div className="relative w-full h-[400px] sm:h-[500px] rounded-3xl overflow-hidden shadow-2xl mb-12 group bg-black">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 }
          }}
          className="absolute inset-0 w-full h-full"
        >
          {currentItem.imageUrl ? (
            <div className="absolute inset-0">
              <img src={currentItem.imageUrl} alt={currentItem.title} className="w-full h-full object-cover opacity-60" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            </div>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-900 to-purple-900" />
          )}

          <div className="absolute bottom-0 left-0 p-8 sm:p-12 w-full max-w-4xl">
            <span className="inline-block px-3 py-1 mb-4 rounded-full text-xs font-bold tracking-wider uppercase bg-blue-500 text-white shadow-lg backdrop-blur-md">
              Trending
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-4 leading-tight drop-shadow-md">
              {currentItem.title}
            </h2>
            <p className="text-gray-300 text-sm sm:text-lg line-clamp-2 mb-6 max-w-2xl">
              {currentItem.description}
            </p>
            <a 
              href={currentItem.url} 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center space-x-2 bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-gray-200 transition-colors shadow-xl"
            >
              <span>Read Full Story</span>
              <FiExternalLink />
            </a>
          </div>
        </motion.div>
      </AnimatePresence>

      {items.length > 1 && (
        <>
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/50 z-10"
            onClick={() => paginate(-1)}
          >
            <FiChevronLeft className="w-6 h-6" />
          </button>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/50 z-10"
            onClick={() => paginate(1)}
          >
            <FiChevronRight className="w-6 h-6" />
          </button>

          <div className="absolute bottom-6 right-8 flex space-x-2 z-10">
            {items.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setDirection(idx > currentIndex ? 1 : -1);
                  setCurrentIndex(idx);
                }}
                className={`w-2.5 h-2.5 rounded-full transition-all ${idx === currentIndex ? 'bg-white w-6' : 'bg-white/50 hover:bg-white/80'}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
