'use client';

import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useGetTopHeadlinesQuery } from '../../services/newsApi';
import { DraggableFeed } from './DraggableFeed';
import { FiLoader, FiAlertCircle } from 'react-icons/fi';
import { motion } from 'framer-motion';

export function PersonalizedFeed() {
  const categories = useSelector((state: RootState) => state.preferences.categories);
  
  // Since NewsAPI top-headlines only supports one category at a time in the free tier easily,
  // we can fetch the primary category or 'general' if none selected
  const primaryCategory = categories.length > 0 ? categories[0] : 'general';
  
  const { data: newsItems, isLoading, error } = useGetTopHeadlinesQuery({ category: primaryCategory });

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-gray-500">
        <FiLoader className="w-8 h-8 animate-spin mb-4 text-blue-500" />
        <p>Loading your personalized content...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-red-500 bg-red-50 dark:bg-red-900/10 rounded-xl">
        <FiAlertCircle className="w-12 h-12 mb-4" />
        <h3 className="text-lg font-semibold">Failed to load content</h3>
        <p className="text-sm">Please check your API key or network connection.</p>
      </div>
    );
  }

  if (!newsItems || newsItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-gray-500">
        <p>No content found for your preferences.</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-6 flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Your Feed</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Personalized content based on your interests ({primaryCategory})
          </p>
        </div>
      </div>
      <DraggableFeed items={newsItems} />
    </motion.div>
  );
}
