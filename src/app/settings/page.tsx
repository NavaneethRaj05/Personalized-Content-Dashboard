'use client';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { toggleCategory } from '../../store/slices/preferencesSlice';
import { FiCheck, FiSliders } from 'react-icons/fi';
import { motion } from 'framer-motion';

const CATEGORIES = [
  { id: 'business', label: 'Business', emoji: '💼' },
  { id: 'entertainment', label: 'Entertainment', emoji: '🎬' },
  { id: 'general', label: 'General', emoji: '🌐' },
  { id: 'health', label: 'Health', emoji: '🏥' },
  { id: 'science', label: 'Science', emoji: '🔬' },
  { id: 'sports', label: 'Sports', emoji: '⚽' },
  { id: 'technology', label: 'Technology', emoji: '💻' },
];

export default function SettingsPage() {
  const categories = useSelector((state: RootState) => state.preferences.categories);
  const dispatch = useDispatch();

  return (
    <div className="page-enter max-w-2xl mx-auto py-8">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center">
            <FiSliders className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          </div>
          <h1 className="section-title">Settings</h1>
        </div>
        <p className="section-sub ml-12">Customize your content preferences.</p>
      </div>

      <div className="card overflow-hidden">
        <div className="p-5 border-b border-[var(--border)]">
          <h2 className="text-[15px] font-semibold text-gray-900 dark:text-white">Content Categories</h2>
          <p className="text-[13px] text-gray-500 mt-0.5">Choose the topics you want to see in your personalized feed.</p>
        </div>

        <div className="p-5 grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {CATEGORIES.map((cat) => {
            const isSelected = categories.includes(cat.id);
            return (
              <motion.button
                key={cat.id}
                onClick={() => dispatch(toggleCategory(cat.id))}
                whileTap={{ scale: 0.97 }}
                className={`relative flex items-center gap-3 p-3.5 rounded-xl border-2 text-left transition-all duration-150 ${
                  isSelected
                    ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-500/10'
                    : 'border-[var(--border)] hover:border-indigo-300 dark:hover:border-indigo-600 hover:bg-gray-50 dark:hover:bg-white/[0.03]'
                }`}
              >
                <span className="text-xl">{cat.emoji}</span>
                <span className={`text-[13px] font-medium flex-1 ${isSelected ? 'text-indigo-700 dark:text-indigo-300' : 'text-gray-700 dark:text-gray-300'}`}>
                  {cat.label}
                </span>
                {isSelected && (
                  <div className="w-5 h-5 rounded-full bg-indigo-600 flex items-center justify-center flex-shrink-0">
                    <FiCheck className="w-3 h-3 text-white" />
                  </div>
                )}
              </motion.button>
            );
          })}
        </div>

        <div className="p-5 bg-[var(--surface-2)] dark:bg-white/[0.02] border-t border-[var(--border)]">
          <p className="text-[12px] text-gray-400">
            {categories.length === 0
              ? 'Select at least one category to personalize your feed.'
              : `${categories.length} categor${categories.length === 1 ? 'y' : 'ies'} selected. Your feed updates instantly.`}
          </p>
        </div>
      </div>
    </div>
  );
}
