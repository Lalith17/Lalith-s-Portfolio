import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ThreeJsCanvas from "./ThreeJsCanvas";
import HeroContent from "./HeroContent";
import ScrollIndicator from "./ScrollIndicator";

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  description?: string;
  ctaText?: string;
  onCtaClick?: () => void;
  text3D?: string;
  backgroundColor?: string;
  onScrollToContent?: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  title = "CRAFT YOUR DIGITAL PRESENCE",
  subtitle = "Portfolio Generator",
  description = "Create a stunning, interactive portfolio website that showcases your work with mind-blowing 3D animations and effects.",
  ctaText = "Get Started",
  onCtaClick = () => console.log("CTA clicked"),
  text3D = "PORTFOLIO",
  backgroundColor = "#050505",
  onScrollToContent = () =>
    window.scrollBy({ top: window.innerHeight, behavior: "smooth" }),
}) => {
  const [fps, setFps] = useState<number>(60);
  const [isOptimized, setIsOptimized] = useState<boolean>(false);
  const { scrollY } = useScroll();

  // Transform values for parallax scrolling effect
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.9]);
  const y = useTransform(scrollY, [0, 300], [0, 100]);

  // Handle performance monitoring
  const handlePerformanceData = (currentFps: number) => {
    setFps(currentFps);

    // Automatically optimize for lower-end devices
    if (currentFps < 30 && !isOptimized) {
      setIsOptimized(true);
    }
  };

  // Detect device capabilities on mount
  useEffect(() => {
    // Simple device detection for mobile
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
      setIsOptimized(true);
    }
  }, []);

  return (
    <motion.section
      className="relative w-full h-screen overflow-hidden bg-black"
      style={{ backgroundColor }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* 3D Canvas Background */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{ opacity, scale, y }}
      >
        <ThreeJsCanvas
          text={text3D}
          backgroundColor={backgroundColor}
          onPerformanceData={handlePerformanceData}
        />
      </motion.div>

      {/* Content Overlay */}
      <motion.div className="relative z-10 w-full h-full" style={{ opacity }}>
        <HeroContent
          title={title}
          subtitle={subtitle}
          description={description}
          ctaText={ctaText}
          onCtaClick={onCtaClick}
        />
      </motion.div>

      {/* Scroll Indicator */}
      <ScrollIndicator onClick={onScrollToContent} />

      {/* Performance Monitor (only visible in development) */}
      {process.env.NODE_ENV === "development" && (
        <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full z-50">
          FPS: {fps} {isOptimized ? "(Optimized)" : ""}
        </div>
      )}
    </motion.section>
  );
};

export default HeroSection;
