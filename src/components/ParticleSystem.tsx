import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";

interface ParticleSystemProps {
  count?: number;
  color?: string;
  size?: number;
  speed?: number;
  interactive?: boolean;
  className?: string;
}

const ParticleSystem: React.FC<ParticleSystemProps> = ({
  count = 50,
  color = "#ffffff",
  size = 2,
  speed = 1,
  interactive = true,
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mousePosition = useRef({ x: 0, y: 0 });
  const particles = useRef<
    Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      color: string;
    }>
  >([]);

  // Initialize particles
  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const rect = container.getBoundingClientRect();

    // Create particles
    particles.current = Array.from({ length: count }).map(() => ({
      x: Math.random() * rect.width,
      y: Math.random() * rect.height,
      size: Math.random() * size + 1,
      speedX: (Math.random() - 0.5) * speed,
      speedY: (Math.random() - 0.5) * speed,
      opacity: Math.random() * 0.5 + 0.3,
      color,
    }));

    // Track mouse position for interactive mode
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mousePosition.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    if (interactive) {
      window.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      if (interactive) {
        window.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, [count, color, size, speed, interactive]);

  // Animation frame for particle movement
  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    let animationFrameId: number;

    const animate = () => {
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const ctx = document.createElement("canvas").getContext("2d");
      if (!ctx) return;

      // Update particle positions
      particles.current.forEach((particle) => {
        // Move particles
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Bounce off walls
        if (particle.x < 0 || particle.x > rect.width) {
          particle.speedX *= -1;
        }
        if (particle.y < 0 || particle.y > rect.height) {
          particle.speedY *= -1;
        }

        // Interactive mode - particles are attracted to mouse
        if (interactive) {
          const dx = mousePosition.current.x - particle.x;
          const dy = mousePosition.current.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            const force = 0.2 * (1 - distance / 100);
            particle.speedX += (dx / distance) * force;
            particle.speedY += (dy / distance) * force;
          }

          // Limit speed
          const maxSpeed = speed * 2;
          const currentSpeed = Math.sqrt(
            particle.speedX * particle.speedX +
              particle.speedY * particle.speedY,
          );
          if (currentSpeed > maxSpeed) {
            particle.speedX = (particle.speedX / currentSpeed) * maxSpeed;
            particle.speedY = (particle.speedY / currentSpeed) * maxSpeed;
          }
        }
      });

      // Request next frame
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [interactive, speed]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
    >
      {particles.current.map((particle, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full"
          animate={{
            x: particle.x,
            y: particle.y,
            opacity: particle.opacity,
          }}
          transition={{
            duration: 0.1,
            ease: "linear",
          }}
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
          }}
        />
      ))}
    </div>
  );
};

export default ParticleSystem;
