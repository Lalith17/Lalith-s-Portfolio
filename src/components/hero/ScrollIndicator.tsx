import React, { useEffect, useState } from "react";
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
      // Hide indicator when user has scrolled down a bit
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
      className="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center justify-center cursor-pointer z-10"
      initial={{ opacity: 0, y: 10 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: { delay: 1.5 },
      }}
      whileHover={{ scale: 1.1 }}
      onClick={onClick}
      aria-label="Scroll down"
    >
      <motion.p
        className="text-sm text-white font-medium mb-2"
        animate={{
          textShadow: [
            "0 0 4px rgba(255,255,255,0.5)",
            "0 0 8px rgba(255,255,255,0.8)",
            "0 0 4px rgba(255,255,255,0.5)",
          ],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        Scroll
      </motion.p>
      <motion.div
        className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-purple-600/30 to-pink-600/30 backdrop-blur-md border border-white/20"
        animate={{
          y: [0, 5, 0],
          boxShadow: [
            "0 0 10px 0 rgba(168, 85, 247, 0.3)",
            "0 0 20px 5px rgba(168, 85, 247, 0.6)",
            "0 0 10px 0 rgba(168, 85, 247, 0.3)",
          ],
        }}
        transition={{
          y: {
            repeat: Infinity,
            duration: 1.5,
            ease: "easeInOut",
          },
          boxShadow: {
            repeat: Infinity,
            duration: 2,
            ease: "easeInOut",
          },
        }}
      >
        <ChevronDown className="w-6 h-6 text-white" />
      </motion.div>
    </motion.div>
  );
};

export default ScrollIndicator;
