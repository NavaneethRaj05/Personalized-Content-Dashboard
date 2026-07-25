'use client';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { toggleCategory } from '../../store/slices/preferencesSlice';
import { FiCheck } from 'react-icons/fi';

const AVAILABLE_CATEGORIES = [
  'business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'
];

export default function SettingsPage() {
  const categories = useSelector((state: RootState) => state.preferences.categories);
  const dispatch = useDispatch();

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Settings</h1>
      
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
        <div className="p-6 border-b border-gray-100 dark:border-gray-800">
          <h2 className="text-xl font-semibold mb-2">Content Preferences</h2>
          <p className="text-gray-500 text-sm">Select the categories of news you want to see in your feed.</p>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {AVAILABLE_CATEGORIES.map(category => {
              const isSelected = categories.includes(category);
              return (
                <button
                  key={category}
                  onClick={() => dispatch(toggleCategory(category))}
                  className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all ${
                    isSelected
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400'
                      : 'border-gray-200 dark:border-gray-700 hover:border-blue-300'
                  }`}
                >
                  <span className="capitalize font-medium">{category}</span>
                  {isSelected && <FiCheck className="w-5 h-5" />}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
