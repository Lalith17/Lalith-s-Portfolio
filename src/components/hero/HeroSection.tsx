import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ThreeJsCanvas from "./ThreeJsCanvas";
import HeroContent from "./HeroContent";
import ScrollIndicator from "./ScrollIndicator";
import ParticleSystem from "../ParticleSystem";

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

// Device types for optimization
type DeviceType = "desktop" | "tablet" | "mobile";

// Performance levels
type PerformanceLevel = "high" | "medium" | "low";

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
  const [deviceType, setDeviceType] = useState<DeviceType>("desktop");
  const [performanceLevel, setPerformanceLevel] =
    useState<PerformanceLevel>("high");
  const [particleCount, setParticleCount] = useState<number>(30); // Default particle count
  const [effectsIntensity, setEffectsIntensity] = useState<number>(1); // Default effects intensity
  const { scrollY } = useScroll();

  // Transform values for parallax scrolling effect
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.9]);
  const y = useTransform(scrollY, [0, 300], [0, 100]);

  // Handle performance monitoring
  const handlePerformanceData = (currentFps: number) => {
    setFps(currentFps);

    // Adjust performance level based on FPS
    if (currentFps < 25) {
      setPerformanceLevel("low");
      if (!isOptimized) {
        setIsOptimized(true);
        adjustEffectsForPerformance("low", deviceType);
      }
    } else if (currentFps < 45) {
      setPerformanceLevel("medium");
      if (performanceLevel !== "medium") {
        adjustEffectsForPerformance("medium", deviceType);
      }
    } else {
      setPerformanceLevel("high");
    }
  };

  // Adjust effects based on performance level and device type
  const adjustEffectsForPerformance = (
    level: PerformanceLevel,
    device: DeviceType,
  ) => {
    // Particle count adjustments
    if (level === "low") {
      setParticleCount(device === "mobile" ? 5 : device === "tablet" ? 10 : 15);
      setEffectsIntensity(0.3);
    } else if (level === "medium") {
      setParticleCount(
        device === "mobile" ? 10 : device === "tablet" ? 20 : 25,
      );
      setEffectsIntensity(0.6);
    } else {
      setParticleCount(
        device === "mobile" ? 15 : device === "tablet" ? 25 : 30,
      );
      setEffectsIntensity(1);
    }
  };

  // Detect device capabilities and screen size on mount
  useEffect(() => {
    // Device detection based on user agent
    const userAgent = navigator.userAgent;
    const isMobile = /iPhone|Android|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      userAgent,
    );
    const isTablet =
      /iPad|Tablet|Nexus 7|Kindle Fire/i.test(userAgent) ||
      (window.innerWidth >= 768 && window.innerWidth <= 1024);

    // Set device type based on detection
    let detectedDevice: DeviceType = "desktop";
    if (isMobile) {
      detectedDevice = "mobile";
    } else if (isTablet) {
      detectedDevice = "tablet";
    }
    setDeviceType(detectedDevice);
    // Check for low-end devices based on memory and processor
    const isLowEndDevice = () => {
      // Check available memory if possible
      if (
        typeof (navigator as any).deviceMemory !== "undefined" &&
        (navigator as any).deviceMemory < 4
      ) {
        return true;
      }

      // Check hardware concurrency (CPU cores)
      if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
        return true;
      }

      // Check if it's a mobile device (generally lower performance)
      return isMobile;
    };

    // Set initial optimization based on device detection
    const shouldOptimize = isLowEndDevice() || isMobile;
    setIsOptimized(shouldOptimize);

    // Set initial performance level
    const initialPerformanceLevel: PerformanceLevel = shouldOptimize
      ? "low"
      : isTablet
        ? "medium"
        : "high";
    setPerformanceLevel(initialPerformanceLevel);

    // Apply initial effects adjustments
    adjustEffectsForPerformance(initialPerformanceLevel, detectedDevice);

    // Add resize listener to adjust for orientation changes
    const handleResize = () => {
      const width = window.innerWidth;
      let newDeviceType: DeviceType = "desktop";

      if (width < 768) {
        newDeviceType = "mobile";
      } else if (width < 1024) {
        newDeviceType = "tablet";
      }

      if (newDeviceType !== deviceType) {
        setDeviceType(newDeviceType);
        adjustEffectsForPerformance(performanceLevel, newDeviceType);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
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
          isOptimized={isOptimized}
          deviceType={deviceType}
          performanceLevel={performanceLevel}
          particleCount={particleCount}
          effectsIntensity={effectsIntensity}
        />

        {/* Hero-specific interactive particles */}
        <ParticleSystem
          count={
            deviceType === "mobile" ? 30 : deviceType === "tablet" ? 50 : 70
          }
          color="#ffffff"
          size={2}
          speed={0.3}
          interactive={true}
          className="z-10"
        />
      </motion.div>

      {/* Content Overlay */}
      <motion.div
        className="relative z-10 w-full h-full overflow-y-auto"
        style={{ opacity }}
      >
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
          FPS: {fps} | Device: {deviceType} | Performance: {performanceLevel}{" "}
          {isOptimized ? "(Optimized)" : ""}
        </div>
      )}
    </motion.section>
  );
};

export default HeroSection;
