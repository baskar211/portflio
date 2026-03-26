"use client";
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AccordionItem({
  index,
  title,
  children,
  open,
  onToggle,
}) {
  return (
    <div className="border-b border-gray-200 dark:border-gray-700 py-4">
      <button
        onClick={onToggle}
        className="w-full flex justify-between items-center text-left focus:outline-none"
      >
        <span className="text-lg font-semibold text-gray-800 dark:text-white hover:text-blue-600 transition-colors">
          {title}
        </span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-blue-600 text-2xl font-bold"
        >
          +
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden mt-2"
          >
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-base pl-1">
              {children}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
