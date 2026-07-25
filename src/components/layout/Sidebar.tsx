'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiHome, FiTrendingUp, FiSettings, FiSearch, FiX, FiZap, FiBookmark } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { name: 'Feed', path: '/', icon: FiHome },
  { name: 'Search', path: '/search', icon: FiSearch },
  { name: 'Trending', path: '/trending', icon: FiTrendingUp },
  { name: 'Favorites', path: '/favorites', icon: FiBookmark },
  { name: 'Settings', path: '/settings', icon: FiSettings },
];

interface SidebarProps {
  mobileOpen?: boolean;
  onClose?: () => void;
}

function NavList({ pathname, onClose }: { pathname: string; onClose?: () => void }) {
  return (
    <nav className="flex-1 px-3 space-y-0.5">
      {navItems.map((item) => {
        const isActive = pathname === item.path;
        return (
          <Link
            key={item.name}
            href={item.path}
            onClick={onClose}
            className={`group flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[13.5px] font-medium transition-all duration-150 ${
              isActive
                ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100/70 dark:hover:bg-white/[0.04] hover:text-gray-900 dark:hover:text-gray-200'
            }`}
          >
            <span className={`flex-shrink-0 transition-transform group-hover:scale-110 ${isActive ? 'text-indigo-500' : ''}`}>
              <item.icon className="w-[18px] h-[18px]" />
            </span>
            <span>{item.name}</span>
            {isActive && (
              <motion.span
                layoutId="sidebar-pill"
                className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-500"
              />
            )}
          </Link>
        );
      })}
    </nav>
  );
}

export function Sidebar({ mobileOpen = false, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex flex-col h-screen w-64 fixed left-0 top-0 z-30 bg-[var(--surface)] dark:bg-[#0c0c14] border-r border-[var(--border)]">
        {/* Logo */}
        <div className="px-5 py-5 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/30 flex-shrink-0">
            <FiZap className="text-white w-4 h-4" />
          </div>
          <div>
            <p className="text-[15px] font-bold text-gray-900 dark:text-white tracking-tight">Nexus</p>
            <p className="text-[10px] font-medium text-gray-400 uppercase tracking-widest -mt-0.5">Dashboard</p>
          </div>
        </div>

        <div className="px-5 mb-4">
          <div className="h-px bg-[var(--border)]" />
        </div>

        <NavList pathname={pathname} />

        {/* AI badge */}
        <div className="mx-4 my-4 p-3.5 rounded-xl bg-gradient-to-br from-indigo-50 to-violet-50 dark:from-indigo-500/10 dark:to-violet-500/10 border border-indigo-100 dark:border-indigo-500/20">
          <div className="flex items-center gap-2 mb-1">
            <FiZap className="text-indigo-500 w-3.5 h-3.5" />
            <span className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">AI Powered</span>
          </div>
          <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed">Smart summaries & chat assistant on every article.</p>
        </div>

        {/* User */}
        <div className="px-4 pb-5 border-t border-[var(--border)] pt-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-violet-500 flex items-center justify-center text-white font-bold text-[13px] flex-shrink-0">
              U
            </div>
            <div className="min-w-0">
              <p className="text-[13px] font-semibold text-gray-900 dark:text-white truncate">User</p>
              <p className="text-[11px] text-gray-400 truncate">user@example.com</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="md:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 32 }}
              className="md:hidden fixed left-0 top-0 bottom-0 z-50 w-72 flex flex-col bg-white dark:bg-[#0c0c14] border-r border-[var(--border)] shadow-2xl"
            >
              <div className="px-5 py-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                    <FiZap className="text-white w-4 h-4" />
                  </div>
                  <p className="text-[15px] font-bold text-gray-900 dark:text-white">Nexus</p>
                </div>
                <button onClick={onClose} className="btn-ghost p-2 rounded-lg">
                  <FiX className="w-4 h-4" />
                </button>
              </div>
              <div className="px-5 mb-4"><div className="h-px bg-[var(--border)]" /></div>
              <NavList pathname={pathname} onClose={onClose} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
