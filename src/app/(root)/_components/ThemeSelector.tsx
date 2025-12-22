"use client";

import { useCodeEditorStore } from "@/store/useCodeEditorStore";
import React, { useEffect, useRef, useState } from "react";
import { THEMES } from "../_constants";
import { AnimatePresence, motion } from "framer-motion";
import {
  CircleOff,
  Cloud,
  Github,
  Laptop,
  Moon,
  Palette,
  Sun,
  ChevronDownIcon,
} from "lucide-react";
import useMounted from "@/hooks/useMounted";

const THEME_ICONS: Record<string, React.ReactNode> = {
  "vs-dark": <Moon className="size-4" />,
  "vs-light": <Sun className="size-4" />,
  "github-dark": <Github className="size-4" />,
  monokai: <Laptop className="size-4" />,
  "solarized-dark": <Cloud className="size-4" />,
};

function ThemeSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const mounted = useMounted();
  const { theme, setTheme } = useCodeEditorStore();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const currentTheme = THEMES.find((t) => t.id === theme);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center gap-3 px-4 py-1.5 bg-[#1e1e2e]/80 
        rounded-lg transition-all duration-200 border border-gray-800/50 hover:border-gray-700"
      >
        {/* Hover gradient */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/5 
          rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
        />

        {/* Icon container (matches LanguageSelector) */}
        <div className="size-6 rounded-md bg-gray-800/50 p-1 group-hover:scale-110 transition-transform">
          <Palette className="w-full h-full text-gray-400 group-hover:text-gray-300" />
        </div>

        {/* Label */}
        <span className="text-gray-200 min-w-[80px] text-left group-hover:text-white transition-colors">
          {currentTheme?.label}
        </span>

        {/* Color indicator */}
        <div
          className="ml-auto relative w-4 h-4 rounded-full border border-gray-600 
          group-hover:border-gray-500 transition-colors"
          style={{ background: currentTheme?.color }}
        />

        {/* Chevron */}
        <ChevronDownIcon
          className={`size-4 text-gray-400 transition-all duration-300 group-hover:text-gray-300
          ${isOpen ? "rotate-180" : ""}`}
        />
      </motion.button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 mt-2 w-64 bg-[#1e1e2e]/95 backdrop-blur-2xl
            rounded-xl border border-[#313244] shadow-2xl py-2 z-50"
          >
            <div className="px-3 pb-2 mb-2 border-b border-gray-800/50">
              <p className="text-xs font-medium text-gray-400">Select Theme</p>
            </div>

            <div className="max-h-[280px] overflow-y-auto overflow-x-hidden">
              {THEMES.map((t, index) => (
                <motion.div
                  key={t.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative group px-2"
                >
                  <button
                    onClick={() => setTheme(t.id)}
                    className={`
                      relative w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200
                      ${theme === t.id ? "bg-blue-500/10 text-blue-400" : "text-gray-300 hover:bg-[#262637]"}
                    `}
                  >
                    {/* Hover gradient */}
                    <div
                      className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-lg
                      opacity-0 group-hover:opacity-100 transition-opacity"
                    />

                    {/* Icon */}
                    <div
                      className={`
                        relative size-8 rounded-lg flex items-center justify-center
                        ${theme === t.id ? "bg-blue-500/10 text-blue-400" : "bg-gray-800/50 text-gray-400"}
                        group-hover:scale-110 transition-transform
                      `}
                    >
                      {THEME_ICONS[t.id] || <CircleOff className="w-4 h-4" />}
                    </div>

                    {/* Label */}
                    <span className="flex-1 text-left group-hover:text-white transition-colors">
                      {t.label}
                    </span>

                    {/* Color indicator */}
                    <div
                      className="relative size-4 rounded-full border border-gray-600 
                      group-hover:border-gray-500 transition-colors"
                      style={{ background: t.color }}
                    />

                    {/* Active border */}
                    {theme === t.id && (
                      <motion.div
                        className="absolute inset-0 border-2 border-blue-500/30 rounded-lg"
                        transition={{
                          type: "spring",
                          bounce: 0.2,
                          duration: 0.6,
                        }}
                      />
                    )}
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ThemeSelector;
