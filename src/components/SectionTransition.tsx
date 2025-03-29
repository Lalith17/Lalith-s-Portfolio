import React from "react";
import { motion } from "framer-motion";

interface SectionTransitionProps {
  children: React.ReactNode;
  className?: string;
  index?: number;
}

const SectionTransition: React.FC<SectionTransitionProps> = ({
  children,
  className = "",
  index = 0,
}) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        type: "spring",
        damping: 20,
        stiffness: 100,
        delay: index * 0.1,
      }}
    >
      {children}
    </motion.div>
  );
};

export default SectionTransition;
