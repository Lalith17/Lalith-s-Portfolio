import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

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
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="fixed bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer z-50"
      onClick={onClick}
    >
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm"
      >
        <ChevronDown className="w-6 h-6 text-white" />
      </motion.div>
    </motion.div>
  );
};

export default ScrollIndicator;
