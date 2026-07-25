'use client';

import { useTheme } from 'next-themes';
import { FiSun, FiMoon, FiMenu, FiSearch } from 'react-icons/fi';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

import { motion, AnimatePresence } from 'framer-motion';

interface HeaderProps {
  onMenuClick: () => void;
}

const SUGGESTIONS = [
  'Technology news', 'AI breakthroughs', 'Space exploration',
  'Climate change', 'Stock market', 'Sports highlights', 'Health tips',
];

export function Header({ onMenuClick }: HeaderProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [search, setSearch] = useState('');
  const [focused, setFocused] = useState(false);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { setMounted(true); }, []);

  // Keyboard shortcut ⌘K / Ctrl+K
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/search?q=${encodeURIComponent(search.trim())}`);
      setFocused(false);
      inputRef.current?.blur();
    }
  };

  const handleSuggestion = (s: string) => {
    setSearch(s);
    router.push(`/search?q=${encodeURIComponent(s)}`);
    setFocused(false);
  };

  const filteredSuggestions = search.length > 0
    ? SUGGESTIONS.filter(s => s.toLowerCase().includes(search.toLowerCase())).slice(0, 4)
    : SUGGESTIONS.slice(0, 5);

  return (
    <header className="h-[60px] flex-shrink-0 flex items-center border-b border-[var(--border)] bg-[var(--surface)]/80 dark:bg-[#0c0c14]/80 backdrop-blur-xl sticky top-0 z-50 px-4 md:px-6 gap-3">
      {/* Mobile menu */}
      <button
        onClick={onMenuClick}
        className="md:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors flex-shrink-0"
        aria-label="Open menu"
      >
        <FiMenu className="w-5 h-5" />
      </button>

      {/* Search */}
      <div className="flex-1 max-w-lg relative" onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setFocused(false);
      }}>
        <form onSubmit={handleSubmit}>
          <div className={`flex items-center gap-2.5 h-9 px-3 rounded-xl border transition-all duration-200 ${
            focused
              ? 'bg-white dark:bg-[#1a1a2e] border-indigo-500/50 shadow-[0_0_0_3px_rgba(99,102,241,0.1)]'
              : 'bg-[var(--surface-2)] dark:bg-white/[0.04] border-transparent hover:border-[var(--border)]'
          }`}>
            <FiSearch className={`w-3.5 h-3.5 flex-shrink-0 transition-colors ${focused ? 'text-indigo-500' : 'text-gray-400'}`} />
            <input
              ref={inputRef}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onFocus={() => setFocused(true)}
              placeholder="Search articles, topics…"
              className="flex-1 bg-transparent text-[13.5px] text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 outline-none min-w-0"
            />
            {search && (
              <button type="button" onClick={() => setSearch('')} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-xs transition-colors">✕</button>
            )}
            {!search && !focused && (
              <div className="hidden sm:flex items-center gap-1 flex-shrink-0">
                <kbd className="text-[10px] text-gray-400 bg-gray-100 dark:bg-white/[0.06] px-1.5 py-0.5 rounded-md font-mono border border-[var(--border)]">
                  {mounted && navigator.platform.includes('Mac') ? '⌘' : 'Ctrl'}
                </kbd>
                <kbd className="text-[10px] text-gray-400 bg-gray-100 dark:bg-white/[0.06] px-1.5 py-0.5 rounded-md font-mono border border-[var(--border)]">K</kbd>
              </div>
            )}
          </div>
        </form>

        {/* Search dropdown */}
        <AnimatePresence>
          {focused && (
            <motion.div
              initial={{ opacity: 0, y: -4, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -4, scale: 0.98 }}
              transition={{ duration: 0.15 }}
              className="absolute top-full left-0 right-0 mt-1.5 bg-white dark:bg-[#111120] border border-[var(--border)] rounded-xl shadow-2xl shadow-black/10 dark:shadow-black/40 overflow-hidden z-50"
            >
              <div className="p-2">
                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider px-2 py-1.5">
                  {search ? 'Suggestions' : 'Popular Topics'}
                </p>
                {filteredSuggestions.map((s) => (
                  <button
                    key={s}
                    onMouseDown={() => handleSuggestion(s)}
                    className="w-full flex items-center gap-2.5 px-2 py-2 rounded-lg text-[13px] text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-left"
                  >
                    <FiSearch className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                    {s}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-1 ml-auto flex-shrink-0">
        {mounted && (
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/[0.05] transition-all"
            aria-label="Toggle theme"
          >
            <motion.div
              key={theme}
              initial={{ rotate: -30, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              {theme === 'dark' ? <FiSun className="w-4 h-4" /> : <FiMoon className="w-4 h-4" />}
            </motion.div>
          </button>
        )}

        {/* User avatar */}
        <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-violet-500 flex items-center justify-center text-white font-semibold text-[13px] ml-1 cursor-pointer hover:opacity-90 transition-opacity">
          U
        </div>
      </div>
    </header>
  );
}
