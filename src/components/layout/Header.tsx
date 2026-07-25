'use client';

import { useTheme } from 'next-themes';
import { FiSun, FiMoon, FiBell } from 'react-icons/fi';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function Header() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [search, setSearch] = useState('');
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/search?q=${encodeURIComponent(search.trim())}`);
    }
  };

  return (
    <header className="h-16 border-b border-gray-200/50 dark:border-white/10 bg-white/40 dark:bg-[#0a0a0a]/40 backdrop-blur-3xl sticky top-0 z-50">
      <div className="flex items-center justify-between h-full px-6">
        <form onSubmit={handleSearch} className="flex-1 max-w-xl">
          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search news, movies, posts..."
              className="w-full bg-gray-100 dark:bg-gray-800 border-transparent focus:bg-white focus:ring-2 focus:ring-blue-500 rounded-lg py-2 pl-4 pr-10 text-sm transition-all text-gray-900 dark:text-white"
            />
          </div>
        </form>

        <div className="flex items-center space-x-4 ml-4">
          <button className="p-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">
            <FiBell className="w-5 h-5" />
          </button>
          {mounted && (
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
            >
              {theme === 'dark' ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
