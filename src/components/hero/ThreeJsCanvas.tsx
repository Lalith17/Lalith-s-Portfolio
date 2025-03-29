import React, { useRef, useEffect, useState, useMemo } from "react";
import { useMotionValue, useSpring, motion } from "framer-motion";

interface ThreeJsCanvasProps {
  text?: string;
  backgroundColor?: string;
  onPerformanceData?: (fps: number) => void;
  isOptimized?: boolean;
  deviceType?: "desktop" | "tablet" | "mobile";
  performanceLevel?: "high" | "medium" | "low";
  particleCount?: number;
  effectsIntensity?: number;
}

// Futuristic animated background with 3D-like elements
// Shader for animated background
const backgroundShader = {
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform float time;
    uniform vec2 resolution;
    uniform vec2 mousePos;
    varying vec2 vUv;

    void main() {
      vec2 position = vUv * 2.0 - 1.0;
      float distance = length(position);
      float mouseDist = length(position - mousePos);
      
      vec3 color1 = vec3(0.4, 0.2, 0.8);
      vec3 color2 = vec3(0.8, 0.3, 0.7);
      
      float noise = sin(position.x * 10.0 + time) * sin(position.y * 10.0 + time) * 0.5;
      float mouseInfluence = smoothstep(0.5, 0.0, mouseDist);
      
      vec3 color = mix(color1, color2, noise + mouseInfluence);
      gl_FragColor = vec4(color, 1.0);
    }
  `,
};

const AnimatedBackground = ({
  particleCount = 30,
  effectsIntensity = 1,
  deviceType = "desktop",
}: {
  particleCount?: number;
  effectsIntensity?: number;
  deviceType?: "desktop" | "tablet" | "mobile";
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX / innerWidth) * 2 - 1;
      const y = (clientY / innerHeight) * 2 - 1;

      setPosition({ x, y });
      setRotation({
        x: y * 10, // Tilt based on mouse Y position
        y: -x * 10, // Tilt based on mouse X position
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-black">
      {/* Animated gradient background */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          background: `radial-gradient(circle at ${50 + position.x * 10}% ${50 + position.y * 10}%, rgba(111, 63, 251, 0.8), rgba(70, 27, 184, 0.6), rgba(33, 13, 71, 0.4))`,
          transition: "background 0.2s ease-out",
        }}
      ></div>

      {/* Space background with stars */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80')] opacity-20 mix-blend-overlay"></div>

      {/* 3D Grid effect */}
      <div
        ref={gridRef}
        className="absolute inset-0 perspective-1000"
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          transition: "transform 0.2s ease-out",
        }}
      >
        <div className="absolute inset-0 grid grid-cols-12 grid-rows-12 gap-4 p-8 transform-style-3d transform-gpu">
          {useMemo(() => {
            return Array.from({ length: 24 }).map((_, i) => {
              const initialZ = Math.random() * -200;
              const midZ = Math.random() * -100;
              const duration = Math.random() * 10 + 15;

              return (
                <motion.div
                  key={i}
                  className="bg-gradient-to-br from-purple-500/20 to-pink-500/10 backdrop-blur-sm rounded-lg border border-white/10"
                  initial={{ z: initialZ }}
                  animate={{
                    z: [initialZ, midZ, initialZ],
                    opacity: [0.3, 0.7, 0.3],
                  }}
                  transition={{
                    duration,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              );
            });
          }, [])}
        </div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0">
        {useMemo(() => {
          return Array.from({ length: particleCount }).map((_, i) => {
            const width = Math.random() * 8 + 2;
            const top = Math.random() * 100;
            const left = Math.random() * 100;
            const yStart = Math.random() * -100;
            const yMid = Math.random() * 100;
            const xStart = Math.random() * -50;
            const xMid = Math.random() * 50;
            const duration = Math.random() * 20 + 10;

            return (
              <motion.div
                key={i}
                className="absolute rounded-full bg-white/20"
                style={{
                  width: `${width}px`,
                  height: `${width}px`,
                  top: `${top}%`,
                  left: `${left}%`,
                  filter: `blur(${effectsIntensity}px)`,
                  boxShadow: `0 0 ${8 * effectsIntensity}px rgba(255, 255, 255, ${0.8 * effectsIntensity})`,
                  opacity: deviceType === "mobile" ? 0.7 : 1,
                }}
                animate={{
                  y: [yStart, yMid, yStart],
                  x: [xStart, xMid, xStart],
                  opacity: [0.2, 0.8, 0.2],
                }}
                transition={{
                  duration,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            );
          });
        }, [])}
      </div>

      {/* Glowing circles */}
      <div className="absolute inset-0 overflow-hidden">
        {useMemo(() => {
          // Adjust number of glowing circles based on device type
          const circleCount =
            deviceType === "mobile" ? 2 : deviceType === "tablet" ? 3 : 5;
          return Array.from({ length: circleCount }).map((_, i) => {
            const r = Math.random() * 100 + 155;
            const g = Math.random() * 100 + 100;
            const b = Math.random() * 155 + 100;
            const width = Math.random() * 300 + 200;
            const top = Math.random() * 100;
            const left = Math.random() * 100;
            const duration = Math.random() * 10 + 15;

            return (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  background: `radial-gradient(circle, rgba(${r}, ${g}, ${b}, 0.3), transparent 70%)`,
                  width: `${width}px`,
                  height: `${width}px`,
                  top: `${top}%`,
                  left: `${left}%`,
                  filter: `blur(${40 * effectsIntensity}px)`,
                  opacity: deviceType === "mobile" ? 0.6 : 1,
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                  duration,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            );
          });
        }, [])}
      </div>
    </div>
  );
};

// Performance monitoring component
const PerformanceMonitor = ({
  onPerformanceData,
}: {
  onPerformanceData?: (fps: number) => void;
}) => {
  const [fps, setFps] = useState(0);
  const frames = useRef(0);
  const prevTime = useRef(performance.now());

  useEffect(() => {
    const updateFPS = () => {
      const time = performance.now();
      frames.current += 1;
      if (time >= prevTime.current + 1000) {
        const currentFps = Math.round(
          (frames.current * 1000) / (time - prevTime.current),
        );
        setFps(currentFps);
        if (onPerformanceData) {
          onPerformanceData(currentFps);
        }
        prevTime.current = time;
        frames.current = 0;
      }
      requestAnimationFrame(updateFPS);
    };

    const animationId = requestAnimationFrame(updateFPS);
    return () => cancelAnimationFrame(animationId);
  }, [onPerformanceData]);

  return null;
};

// Enhanced 3D Text component using CSS and framer-motion
// Physics configuration for interactive elements
const physicsConfig = {
  gravity: -9.8,
  damping: 0.98,
  mass: 1,
  stiffness: 100,
  bounce: 0.5,
};

const Enhanced3DText = ({
  text,
  deviceType,
  performanceLevel,
  mousePosition,
}: {
  text: string;
  deviceType: string;
  performanceLevel: string;
  mousePosition: { x: number; y: number };
}) => {
  const textRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  // Adjust text size based on device type
  const getTextSize = () => {
    switch (deviceType) {
      case "mobile":
        return "text-5xl md:text-6xl";
      case "tablet":
        return "text-6xl md:text-7xl";
      default:
        return "text-7xl md:text-8xl";
    }
  };

  // Adjust effects intensity based on performance level
  const getEffectsIntensity = () => {
    switch (performanceLevel) {
      case "low":
        return {
          textShadow:
            "0 0 15px rgba(168, 85, 247, 0.5), 0 0 30px rgba(168, 85, 247, 0.3)",
          transition: { duration: 0.3 },
        };
      case "medium":
        return {
          textShadow:
            "0 0 20px rgba(168, 85, 247, 0.5), 0 0 40px rgba(168, 85, 247, 0.3)",
          transition: { duration: 0.2 },
        };
      default:
        return {
          textShadow:
            "0 0 30px rgba(168, 85, 247, 0.5), 0 0 60px rgba(168, 85, 247, 0.3)",
          transition: { duration: 0.1 },
        };
    }
  };

  // Calculate rotation based on mouse position
  const rotateX = mousePosition.y * 10;
  const rotateY = mousePosition.x * 10;

  return (
    <div className="relative perspective-1000">
      <motion.div
        ref={textRef}
        className={`${getTextSize()} font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 tracking-tight`}
        style={{
          transformStyle: "preserve-3d",
        }}
        animate={{
          rotateX: rotateX,
          rotateY: rotateY,
          textShadow: [
            "0 0 30px rgba(168, 85, 247, 0.5)",
            "0 0 60px rgba(168, 85, 247, 0.8)",
            "0 0 30px rgba(168, 85, 247, 0.5)",
          ],
          y: [0, -10 * physicsConfig.gravity * 0.1, 0],
          scale: [1, 1.05, 1],
          rotateZ: [-2, 2, -2],
        }}
        transition={{
          rotateX: getEffectsIntensity().transition,
          rotateY: getEffectsIntensity().transition,
          textShadow: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          },
          y: {
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          },
          scale: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          },
          rotateZ: {
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {text}
      </motion.div>

      {/* 3D text shadow/reflection effect */}
      <motion.div
        className={`absolute top-0 left-0 ${getTextSize()} font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-900/30 to-pink-900/30 tracking-tight blur-sm`}
        style={{
          transform:
            "translateZ(-20px) translateY(10px) rotateX(180deg) scaleY(-0.2) skewX(10deg)",
          opacity: 0.3,
          filter: "blur(4px)",
        }}
        animate={{
          rotateX: rotateX + 180,
          rotateY: rotateY,
        }}
        transition={{
          rotateX: getEffectsIntensity().transition,
          rotateY: getEffectsIntensity().transition,
        }}
      >
        {text}
      </motion.div>
    </div>
  );
};

// Enhanced particle system using CSS and framer-motion
const EnhancedParticleSystem = ({
  count,
  deviceType,
  performanceLevel,
}: {
  count: number;
  deviceType: string;
  performanceLevel: string;
}) => {
  // Adjust particle properties based on performance level
  const getParticleProps = () => {
    switch (performanceLevel) {
      case "low":
        return {
          count: Math.floor(count * 0.3),
          size: { min: 2, max: 4 },
          speed: 0.5,
        };
      case "medium":
        return {
          count: Math.floor(count * 0.6),
          size: { min: 2, max: 6 },
          speed: 0.8,
        };
      default:
        return {
          count: count,
          size: { min: 2, max: 8 },
          speed: 1,
        };
    }
  };

  const particleProps = getParticleProps();

  return (
    <div className="absolute inset-0 overflow-hidden">
      {Array.from({ length: particleProps.count }).map((_, i) => {
        const size =
          Math.random() * (particleProps.size.max - particleProps.size.min) +
          particleProps.size.min;
        const top = Math.random() * 100;
        const left = Math.random() * 100;
        const duration = (Math.random() * 5 + 5) / particleProps.speed;

        return (
          <motion.div
            key={i}
            className="absolute rounded-full bg-purple-500"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              top: `${top}%`,
              left: `${left}%`,
              filter: "blur(2px)",
              boxShadow: "0 0 10px 2px rgba(168, 85, 247, 0.8)",
            }}
            animate={{
              y: [Math.random() * -50, Math.random() * 50, Math.random() * -50],
              x: [Math.random() * -50, Math.random() * 50, Math.random() * -50],
              opacity: [0.4, 1, 0.4],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        );
      })}
    </div>
  );
};

// Mouse position state for global tracking
const useMousePosition = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { damping: 50, stiffness: 400 });
  const smoothMouseY = useSpring(mouseY, { damping: 50, stiffness: 400 });

  const handleMouseMove = (e: MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set((clientX / innerWidth) * 2 - 1);
    mouseY.set((clientY / innerHeight) * 2 - 1);
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return { smoothMouseX, smoothMouseY };
};

const ThreeJsCanvas: React.FC<ThreeJsCanvasProps> = ({
  text = "LALITH",
  backgroundColor = "#050505",
  onPerformanceData,
  isOptimized = false,
  deviceType = "desktop",
  performanceLevel = "high",
  particleCount = 30,
  effectsIntensity = 1,
}) => {
  const { smoothMouseX, smoothMouseY } = useMousePosition();

  // Adjust particle count based on performance level and device type
  const getAdjustedParticleCount = () => {
    if (performanceLevel === "low") {
      return deviceType === "mobile" ? 50 : deviceType === "tablet" ? 100 : 150;
    } else if (performanceLevel === "medium") {
      return deviceType === "mobile"
        ? 100
        : deviceType === "tablet"
          ? 200
          : 300;
    } else {
      return deviceType === "mobile"
        ? 200
        : deviceType === "tablet"
          ? 400
          : 600;
    }
  };

  return (
    <motion.div
      className="w-full h-full bg-black force-dark"
      style={{ backgroundColor }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Background animation for additional visual interest */}
      <AnimatedBackground
        particleCount={particleCount}
        effectsIntensity={effectsIntensity}
        deviceType={deviceType}
      />

      {/* Enhanced 3D Text */}
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <Enhanced3DText
          text={text}
          deviceType={deviceType}
          performanceLevel={performanceLevel}
          mousePosition={{ x: smoothMouseX.get(), y: smoothMouseY.get() }}
        />

        {/* Enhanced Particle System */}
        <EnhancedParticleSystem
          count={getAdjustedParticleCount()}
          deviceType={deviceType}
          performanceLevel={performanceLevel}
        />
      </div>

      <PerformanceMonitor onPerformanceData={onPerformanceData} />
    </motion.div>
  );
};

export default ThreeJsCanvas;
