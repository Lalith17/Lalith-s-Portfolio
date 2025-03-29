import React, { useRef, useState, useEffect } from "react";
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
  const { scrollY } = useScroll();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [`start ${1 - threshold}`, `end ${threshold}`],
  });

  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrollingDown, setIsScrollingDown] = useState(true);

  useEffect(() => {
    return scrollY.onChange((current) => {
      setIsScrollingDown(current > lastScrollY);
      setLastScrollY(current);
    });
  }, [scrollY, lastScrollY]);

  // Always define animations, but apply them conditionally
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 1]);
  const x = useTransform(scrollYProgress, [0, 0.5, 1], [50, 0, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 1]);
  const rotate = useTransform(scrollYProgress, [0, 0.5, 1], [5, 0, 0]);
  const filter = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ["blur(10px)", "blur(0px)", "blur(0px)"],
  );

  const getAnimationProps = () => {
    if (!isScrollingDown) {
      return { opacity: 1, x: 0, scale: 1, rotate: 0, filter: "blur(0px)" };
    }

    switch (transitionType) {
      case "fade":
        return { opacity };
      case "slide":
        return { opacity, x };
      case "scale":
        return { opacity, scale };
      case "rotate":
        return { opacity, rotate };
      case "blur":
        return { opacity, filter };
      default:
        return { opacity };
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
