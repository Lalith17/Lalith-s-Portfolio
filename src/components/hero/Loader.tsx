import React from "react";
import { motion } from "framer-motion";

const Loader: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      <motion.div
        className="flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex space-x-2 mb-4">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-4 h-4 rounded-full bg-purple-600"
              animate={{
                y: [0, -10, 0],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
        <motion.p
          className="text-white text-sm font-medium"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Loading 3D Experience...
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Loader;
