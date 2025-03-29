
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MousePointerClick } from "lucide-react";

interface ScrollIndicatorProps {
  onClick?: () => void;
  visible?: boolean;
}

const ScrollIndicator = ({
  onClick = () =>
    window.scrollBy({ top: window.innerHeight, behavior: "smooth" }),
  visible = true,
}: ScrollIndicatorProps) => {
  const [isVisible, setIsVisible] = useState(visible);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(visible);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [visible]);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer z-50"
      onClick={onClick}
    >
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        className="flex flex-col items-center gap-2"
      >
        <MousePointerClick className="w-6 h-6 text-white/70" />
        <div className="w-1 h-6 bg-white/20 rounded-full" />
      </motion.div>
    </motion.div>
  );
};

export default ScrollIndicator;
