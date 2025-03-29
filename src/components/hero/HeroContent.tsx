import React from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { ArrowRight, Code, Layers, Sparkles } from "lucide-react";
import SocialLinks from "../SocialLinks";

// Add xs breakpoint for extra small screens
import "../../index.css";

interface HeroContentProps {
  title?: string;
  subtitle?: string;
  description?: string;
  ctaText?: string;
  onCtaClick?: () => void;
}

const HeroContent = ({
  title = "MEGHA SAI LALITH VALLAMKONDA",
  subtitle = "Full Stack Developer",
  description = "Computer Science student at VIT-AP University with experience in React.js, Flutter, Firebase, and AWS. Passionate about building scalable web applications and AI-powered solutions.",
  ctaText = "Get Started",
  onCtaClick = () => console.log("CTA clicked"),
}: HeroContentProps) => {
  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
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

  const featureVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
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
      className="absolute inset-0 flex items-start justify-center z-10 text-white p-4 md:p-12 bg-black/20 backdrop-blur-sm rounded-xl overflow-y-auto"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-4xl text-center w-full pt-4 sm:pt-8 md:pt-0">
        <motion.div variants={itemVariants} className="mb-2">
          <span className="text-sm md:text-base font-medium bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            {subtitle}
          </span>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-xl xs:text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold mb-2 sm:mb-3 md:mb-4 tracking-tight px-2 break-words"
        >
          {title}
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-xs xs:text-sm sm:text-base md:text-lg text-gray-200 mb-4 sm:mb-6 max-w-2xl mx-auto px-2"
        >
          {description}
        </motion.p>

        <motion.div variants={itemVariants} className="mb-4 sm:mb-6">
          <Button
            size="default"
            onClick={onCtaClick}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full text-sm sm:text-base font-medium"
          >
            {ctaText} <ArrowRight className="ml-1 h-3 w-3 sm:h-4 sm:w-4" />
          </Button>
        </motion.div>

        <motion.div variants={itemVariants} className="mb-4 sm:mb-6">
          <SocialLinks className="justify-center" />
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mt-2 sm:mt-4 px-2"
        >
          <motion.div
            variants={featureVariants}
            className="bg-black/30 backdrop-blur-md p-3 sm:p-4 rounded-xl border border-gray-800"
          >
            <div className="bg-purple-600/20 p-2 rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center mb-2 mx-auto">
              <Code className="h-4 w-4 sm:h-5 sm:w-5 text-purple-400" />
            </div>
            <h3 className="text-sm sm:text-base font-semibold mb-1">
              Tech Stack
            </h3>
            <p className="text-gray-400 text-xs">
              Java, Python, JS, Flutter, MySQL, Firebase, AWS, GCP
            </p>
          </motion.div>

          <motion.div
            variants={featureVariants}
            className="bg-black/30 backdrop-blur-md p-3 sm:p-4 rounded-xl border border-gray-800"
          >
            <div className="bg-blue-600/20 p-2 rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center mb-2 mx-auto">
              <Layers className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400" />
            </div>
            <h3 className="text-sm sm:text-base font-semibold mb-1">
              Frameworks
            </h3>
            <p className="text-gray-400 text-xs">
              Node.js, Flask, Django, FastAPI, TensorFlow, Keras
            </p>
          </motion.div>

          <motion.div
            variants={featureVariants}
            className="bg-black/30 backdrop-blur-md p-3 sm:p-4 rounded-xl border border-gray-800"
          >
            <div className="bg-pink-600/20 p-2 rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center mb-2 mx-auto">
              <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-pink-400" />
            </div>
            <h3 className="text-sm sm:text-base font-semibold mb-1">
              Education
            </h3>
            <p className="text-gray-400 text-xs">
              VIT-AP University, B.Tech in Computer Science (2022-2026, GPA:
              9.17)
            </p>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default HeroContent;
