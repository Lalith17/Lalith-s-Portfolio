import React, { useRef, useEffect, useState, useMemo } from "react";
import { useMotionValue, useSpring, motion } from "framer-motion";

interface ThreeJsCanvasProps {
  text?: string;
  backgroundColor?: string;
  onPerformanceData?: (fps: number) => void;
}

// Futuristic animated background with 3D-like elements
const AnimatedBackground = () => {
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
          return Array.from({ length: 30 }).map((_, i) => {
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
                  filter: "blur(1px)",
                  boxShadow: "0 0 8px rgba(255, 255, 255, 0.8)",
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
          return Array.from({ length: 5 }).map((_, i) => {
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
                  filter: "blur(40px)",
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

const ThreeJsCanvas: React.FC<ThreeJsCanvasProps> = ({
  text = "LALITH",
  backgroundColor = "#050505",
  onPerformanceData,
}) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth mouse movement
  const smoothMouseX = useSpring(mouseX, { damping: 50, stiffness: 400 });
  const smoothMouseY = useSpring(mouseY, { damping: 50, stiffness: 400 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set((clientX / innerWidth) * 2 - 1);
    mouseY.set((clientY / innerHeight) * 2 - 1);
  };

  return (
    <motion.div
      className="w-full h-full bg-black force-dark"
      style={{ backgroundColor }}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <AnimatedBackground />
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <motion.div
          className="relative perspective-1000"
          animate={{
            rotateX: smoothMouseY.get() * 5,
            rotateY: smoothMouseX.get() * -5,
          }}
          transition={{ type: "spring", stiffness: 100, damping: 30 }}
        >
          <motion.h1
            className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 tracking-tight"
            style={{
              textShadow:
                "0 0 30px rgba(168, 85, 247, 0.5), 0 0 60px rgba(168, 85, 247, 0.3)",
            }}
            initial={{ opacity: 0, scale: 0.8, z: -100 }}
            animate={{
              opacity: 1,
              scale: 1,
              z: 0,
              textShadow: [
                "0 0 30px rgba(168, 85, 247, 0.5)",
                "0 0 60px rgba(168, 85, 247, 0.8)",
                "0 0 30px rgba(168, 85, 247, 0.5)",
              ],
            }}
            transition={{
              duration: 2,
              textShadow: {
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
          >
            {text}
          </motion.h1>

          {/* 3D text shadow/reflection effect */}
          <motion.h1
            className="absolute top-0 left-0 text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-900/30 to-pink-900/30 tracking-tight blur-sm"
            style={{
              transform:
                "translateZ(-20px) translateY(10px) rotateX(180deg) scaleY(-0.2) skewX(10deg)",
              opacity: 0.3,
              filter: "blur(4px)",
            }}
          >
            {text}
          </motion.h1>

          {/* Glowing particles around text */}
          <div className="absolute inset-0 -z-10">
            {useMemo(() => {
              return Array.from({ length: 10 }).map((_, i) => {
                const size = Math.random() * 6 + 2;
                const top = Math.random() * 100;
                const left = Math.random() * 100;
                const xStart = Math.random() * -50;
                const xMid = Math.random() * 50;
                const yStart = Math.random() * -50;
                const yMid = Math.random() * 50;
                const duration = Math.random() * 5 + 5;

                return (
                  <motion.div
                    key={i}
                    className="absolute rounded-full bg-purple-500"
                    style={{
                      width: `${size}px`,
                      height: `${size}px`,
                      filter: "blur(2px)",
                      boxShadow: "0 0 10px 2px rgba(168, 85, 247, 0.8)",
                      top: `${top}%`,
                      left: `${left}%`,
                    }}
                    animate={{
                      x: [xStart, xMid, xStart],
                      y: [yStart, yMid, yStart],
                      opacity: [0.4, 1, 0.4],
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
        </motion.div>
      </div>
      <PerformanceMonitor onPerformanceData={onPerformanceData} />
    </motion.div>
  );
};

export default ThreeJsCanvas;
