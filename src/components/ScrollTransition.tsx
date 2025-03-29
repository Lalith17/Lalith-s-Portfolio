import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ScrollTransitionProps {
  children: React.ReactNode;
  className?: string;
  transitionType?: "fade" | "slide" | "scale" | "rotate" | "blur";
  duration?: number;
  threshold?: number;
  delay?: number;
}

const ScrollTransition: React.FC<ScrollTransitionProps> = ({
  children,
  className = "",
  transitionType = "fade",
  duration = 0.5,
  threshold = 0.2,
  delay = 0,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [`start ${1 - threshold}`, `end ${threshold}`],
  });

  // Different animation variants based on transition type
  const getAnimationProps = () => {
    switch (transitionType) {
      case "fade":
        return {
          opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 1]),
        };
      case "slide":
        return {
          opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 1]),
          x: useTransform(scrollYProgress, [0, 0.5, 1], [50, 0, 0]),
        };
      case "scale":
        return {
          opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 1]),
          scale: useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 1]),
        };
      case "rotate":
        return {
          opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 1]),
          rotate: useTransform(scrollYProgress, [0, 0.5, 1], [5, 0, 0]),
        };
      case "blur":
        return {
          opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 1]),
          filter: useTransform(
            scrollYProgress,
            [0, 0.5, 1],
            ["blur(10px)", "blur(0px)", "blur(0px)"],
          ),
        };
      default:
        return {
          opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 1]),
        };
    }
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0 }}
      style={getAnimationProps()}
      transition={{ duration, delay }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollTransition;
