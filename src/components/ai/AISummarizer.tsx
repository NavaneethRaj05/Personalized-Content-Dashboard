'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiZap, FiX, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';

interface AISummaryProps {
  title: string;
  description: string;
}

interface SummaryResult {
  summary: string;
  keyPoints: string[];
}

export function AISummarizer({ title, description }: AISummaryProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SummaryResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSummarize = async (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setOpen(true);
    if (result) return;

    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/ai/summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setResult(data);
    } catch (err) {
      setError('Could not generate summary. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={handleSummarize}
        title="Get AI Summary"
        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-[11px] font-semibold hover:bg-indigo-100 dark:hover:bg-indigo-500/20 transition-all border border-indigo-100 dark:border-indigo-500/20"
      >
        <FiZap className="w-3 h-3" />
        AI Summary
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => { e.stopPropagation(); setOpen(false); }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 20 }}
              transition={{ type: 'spring', stiffness: 320, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-[420px] bg-white dark:bg-[#111118] rounded-2xl shadow-2xl overflow-hidden border border-[var(--border)]"
            >
              {/* Header */}
              <div className="p-5 bg-gradient-to-r from-indigo-600 to-violet-600 relative">
                <button onClick={() => setOpen(false)} className="absolute top-4 right-4 w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center text-white/80 hover:text-white hover:bg-white/20 transition-all">
                  <FiX className="w-4 h-4" />
                </button>
                <div className="flex items-center gap-2 mb-2">
                  <FiZap className="text-white/80 w-4 h-4" />
                  <span className="text-white/80 text-[11px] font-semibold uppercase tracking-wider">AI Summary</span>
                </div>
                <h3 className="text-white font-semibold text-[14px] leading-snug line-clamp-2 pr-8">{title}</h3>
              </div>

              {/* Body */}
              <div className="p-5">
                {loading && (
                  <div className="flex flex-col items-center py-8 gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center">
                      <FiZap className="w-5 h-5 text-indigo-500 animate-pulse" />
                    </div>
                    <div className="text-center">
                      <p className="text-[13px] font-medium text-gray-700 dark:text-gray-200">Generating summary…</p>
                      <p className="text-[11px] text-gray-400 mt-0.5">Powered by Groq</p>
                    </div>
                  </div>
                )}

                {error && (
                  <div className="flex items-center gap-2.5 p-3 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/20">
                    <FiAlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                    <p className="text-[12.5px] text-red-600 dark:text-red-400">{error}</p>
                  </div>
                )}

                {result && !loading && (
                  <div className="space-y-4">
                    <div>
                      <p className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest mb-2">Summary</p>
                      <p className="text-[13px] text-gray-700 dark:text-gray-200 leading-relaxed">{result.summary}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-violet-500 uppercase tracking-widest mb-2.5">Key Points</p>
                      <ul className="space-y-2">
                        {result.keyPoints.map((point, i) => (
                          <li key={i} className="flex items-start gap-2.5">
                            <FiCheckCircle className="w-3.5 h-3.5 text-indigo-500 mt-0.5 flex-shrink-0" />
                            <span className="text-[12.5px] text-gray-600 dark:text-gray-300 leading-relaxed">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>

              <div className="px-5 pb-4">
                <p className="text-[10.5px] text-gray-400 text-center">Powered by Groq AI</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
