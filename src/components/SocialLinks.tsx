import React from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";

interface SocialLinksProps {
  email?: string;
  linkedin?: string;
  github?: string;
  className?: string;
}

const SocialLinks: React.FC<SocialLinksProps> = ({
  email = "mslalith17@gmail.com",
  linkedin = "linkedin.com/in/lalithvallamkonda",
  github = "github.com/Lalith17",
  className = "",
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  return (
    <motion.div
      className={`flex gap-4 ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.a
        href={`mailto:${email}`}
        target="_blank"
        rel="noopener noreferrer"
        variants={itemVariants}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-purple-600/30 to-pink-600/30 backdrop-blur-md border border-white/20 text-white hover:from-purple-600/50 hover:to-pink-600/50 transition-all duration-300"
      >
        <Mail className="w-5 h-5" />
      </motion.a>

      <motion.a
        href={`https://${linkedin}`}
        target="_blank"
        rel="noopener noreferrer"
        variants={itemVariants}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-purple-600/30 to-pink-600/30 backdrop-blur-md border border-white/20 text-white hover:from-purple-600/50 hover:to-pink-600/50 transition-all duration-300"
      >
        <Linkedin className="w-5 h-5" />
      </motion.a>

      <motion.a
        href={`https://${github}`}
        target="_blank"
        rel="noopener noreferrer"
        variants={itemVariants}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-purple-600/30 to-pink-600/30 backdrop-blur-md border border-white/20 text-white hover:from-purple-600/50 hover:to-pink-600/50 transition-all duration-300"
      >
        <Github className="w-5 h-5" />
      </motion.a>
    </motion.div>
  );
};

export default SocialLinks;
