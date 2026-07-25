'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiHome, FiTrendingUp, FiBookmark, FiSettings, FiSearch } from 'react-icons/fi';

const navItems = [
  { name: 'Feed', path: '/', icon: FiHome },
  { name: 'Search', path: '/search', icon: FiSearch },
  { name: 'Trending', path: '/trending', icon: FiTrendingUp },
  { name: 'Saved', path: '/favorites', icon: FiBookmark },
  { name: 'Settings', path: '/settings', icon: FiSettings },
];

export function MobileBottomNav() {
  const pathname = usePathname();
  const [activePath, setActivePath] = useState(pathname);

  useEffect(() => {
    setActivePath(pathname);
  }, [pathname]);

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-[var(--border)] bg-[var(--surface)]/90 backdrop-blur-xl safe-bottom">
      <div className="flex items-center h-16 px-1">
        {navItems.map((item) => {
          const isActive = activePath === item.path;
          return (
            <Link
              key={item.name}
              href={item.path}
              onClick={() => setActivePath(item.path)}
              className={`flex flex-col items-center justify-center flex-1 gap-1 h-full transition-all ${
                isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-400 dark:text-gray-600'
              }`}
            >
              <div className={`p-1.5 rounded-xl transition-all ${isActive ? 'bg-indigo-50 dark:bg-indigo-500/15' : ''}`}>
                <item.icon className="w-[18px] h-[18px]" />
              </div>
              <span className="text-[10px] font-medium tracking-tight">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
