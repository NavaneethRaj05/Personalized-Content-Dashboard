'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiHome, FiTrendingUp, FiHeart, FiSettings, FiSearch } from 'react-icons/fi';

const navItems = [
  { name: 'Home', path: '/', icon: FiHome },
  { name: 'Search', path: '/search', icon: FiSearch },
  { name: 'Trending', path: '/trending', icon: FiTrendingUp },
  { name: 'Favorites', path: '/favorites', icon: FiHeart },
  { name: 'Settings', path: '/settings', icon: FiSettings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-screen hidden md:flex flex-col border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 fixed left-0 top-0">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
      </div>
      <nav className="flex-1 px-4 space-y-2 mt-4">
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link
              key={item.name}
              href={item.path}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400'
                  : 'text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-gray-200 dark:border-gray-800">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
            U
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-white">User Name</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">user@example.com</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
