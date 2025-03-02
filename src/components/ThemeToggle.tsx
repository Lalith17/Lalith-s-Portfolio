import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";

const ThemeToggle: React.FC = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem("theme");
    let prefersDark;

    if (savedTheme) {
      prefersDark = savedTheme === "dark";
    } else {
      prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      // Save the initial preference
      localStorage.setItem("theme", prefersDark ? "dark" : "light");
    }

    setIsDark(prefersDark);

    // Apply theme class to document
    document.documentElement.classList.remove("dark", "light");
    document.documentElement.classList.add(prefersDark ? "dark" : "light");
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);

    // Remove both classes first, then add the correct one
    document.documentElement.classList.remove("dark", "light");
    document.documentElement.classList.add(newIsDark ? "dark" : "light");

    // Store preference in localStorage
    localStorage.setItem("theme", newIsDark ? "dark" : "light");
  };

  return (
    <motion.button
      onClick={toggleTheme}
      className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-purple-600/30 to-pink-600/30 backdrop-blur-md border border-white/20 text-white hover:from-purple-600/50 hover:to-pink-600/50 transition-all duration-300"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </motion.button>
  );
};

export default ThemeToggle;
