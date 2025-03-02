import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Activity, AlertTriangle, Gauge } from "lucide-react";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

interface PerformanceMonitorProps {
  visible?: boolean;
  onPerformanceData?: (data: PerformanceData) => void;
  threshold?: number;
}

interface PerformanceData {
  fps: number;
  memory?: {
    usedJSHeapSize: number;
    totalJSHeapSize: number;
  };
  quality: "high" | "medium" | "low";
}

const PerformanceMonitor: React.FC<PerformanceMonitorProps> = ({
  visible = false,
  onPerformanceData = () => {},
  threshold = 30,
}) => {
  const [isVisible, setIsVisible] = useState(visible);
  const [performanceData, setPerformanceData] = useState<PerformanceData>({
    fps: 60,
    memory: undefined,
    quality: "high",
  });
  const [expanded, setExpanded] = useState(false);

  const frames = useRef(0);
  const prevTime = useRef(performance.now());
  const animationFrameId = useRef<number>();

  useEffect(() => {
    const updatePerformance = () => {
      const time = performance.now();
      frames.current += 1;

      if (time >= prevTime.current + 1000) {
        const fps = Math.round(
          (frames.current * 1000) / (time - prevTime.current),
        );

        // Get memory info if available
        let memory;
        if (performance && (performance as any).memory) {
          const memoryInfo = (performance as any).memory;
          memory = {
            usedJSHeapSize: memoryInfo.usedJSHeapSize,
            totalJSHeapSize: memoryInfo.totalJSHeapSize,
          };
        }

        // Determine quality level based on FPS
        let quality: "high" | "medium" | "low" = "high";
        if (fps < threshold) {
          quality = "low";
        } else if (fps < threshold * 1.5) {
          quality = "medium";
        }

        const newData = { fps, memory, quality };
        setPerformanceData(newData);
        onPerformanceData(newData);

        prevTime.current = time;
        frames.current = 0;
      }

      animationFrameId.current = requestAnimationFrame(updatePerformance);
    };

    animationFrameId.current = requestAnimationFrame(updatePerformance);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [onPerformanceData, threshold]);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  // Determine color based on FPS
  const getFpsColor = () => {
    if (performanceData.fps < threshold) return "text-red-500";
    if (performanceData.fps < threshold * 1.5) return "text-yellow-500";
    return "text-green-500";
  };

  if (!isVisible) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="fixed bottom-4 right-4 z-50 bg-black/50 backdrop-blur-sm border-gray-700 hover:bg-black/70"
              onClick={toggleVisibility}
            >
              <Gauge className="h-5 w-5 text-gray-300" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>Show Performance Monitor</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return (
    <motion.div
      className="fixed bottom-4 right-4 z-50 bg-black/70 backdrop-blur-md rounded-lg border border-gray-700 text-white overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      style={{ width: expanded ? "300px" : "180px" }}
    >
      <div className="flex items-center justify-between p-3 border-b border-gray-700">
        <div className="flex items-center gap-2">
          <Activity className="h-4 w-4 text-gray-300" />
          <span className="text-sm font-medium">Performance</span>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 hover:bg-gray-800"
            onClick={toggleExpanded}
          >
            {expanded ? (
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.5 9.5L8.5 9.5L8.5 7.5L6.5 7.5L6.5 9.5Z"
                  fill="currentColor"
                />
              </svg>
            ) : (
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.5 4.5L8.5 4.5L8.5 6.5L10.5 6.5L10.5 8.5L8.5 8.5L8.5 10.5L6.5 10.5L6.5 8.5L4.5 8.5L4.5 6.5L6.5 6.5L6.5 4.5Z"
                  fill="currentColor"
                />
              </svg>
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 hover:bg-gray-800"
            onClick={toggleVisibility}
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
                fill="currentColor"
              />
            </svg>
          </Button>
        </div>
      </div>

      <div className="p-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-gray-400">FPS</span>
          <span className={`text-sm font-mono ${getFpsColor()}`}>
            {performanceData.fps}
          </span>
        </div>

        {performanceData.quality !== "high" && (
          <div className="flex items-center gap-2 mb-2 bg-yellow-900/30 p-2 rounded-md">
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
            <span className="text-xs text-yellow-300">
              {performanceData.quality === "low"
                ? "Low performance detected"
                : "Medium performance"}
            </span>
          </div>
        )}

        {expanded && performanceData.memory && (
          <>
            <div className="flex items-center justify-between mb-2 mt-3">
              <span className="text-xs text-gray-400">Memory Used</span>
              <span className="text-sm font-mono">
                {formatBytes(performanceData.memory.usedJSHeapSize)}
              </span>
            </div>

            <div className="w-full bg-gray-700 rounded-full h-1.5 mb-2">
              <div
                className="bg-blue-500 h-1.5 rounded-full"
                style={{
                  width: `${(performanceData.memory.usedJSHeapSize / performanceData.memory.totalJSHeapSize) * 100}%`,
                }}
              ></div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400">Total Available</span>
              <span className="text-sm font-mono">
                {formatBytes(performanceData.memory.totalJSHeapSize)}
              </span>
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default PerformanceMonitor;
