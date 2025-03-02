import React from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { ArrowRight, Code, Layers, Sparkles } from "lucide-react";
import SocialLinks from "../SocialLinks";

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
      className="absolute inset-0 flex items-center justify-center z-10 text-white p-6 md:p-12 bg-black/20 backdrop-blur-sm rounded-xl"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-4xl text-center">
        <motion.div variants={itemVariants} className="mb-[2] mt-4 mb-[2]">
          <span className="text-sm md:text-base font-medium bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            {subtitle}
          </span>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 tracking-tight"
        >
          {title}
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-base md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto"
        >
          {description}
        </motion.p>

        <motion.div variants={itemVariants} className="mb-8">
          <Button
            size="lg"
            onClick={onCtaClick}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-6 rounded-full text-lg font-medium"
          >
            {ctaText} <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>

        <motion.div variants={itemVariants} className="mb-12">
          <SocialLinks className="justify-center" />
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8"
        >
          <motion.div
            variants={featureVariants}
            className="bg-black/30 backdrop-blur-md p-6 rounded-xl border border-gray-800"
          >
            <div className="bg-purple-600/20 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4 mx-auto">
              <Code className="h-6 w-6 text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Tech Stack</h3>
            <p className="text-gray-400 text-sm">
              Java, Python, JS, Flutter, MySQL, Firebase, AWS, GCP
            </p>
          </motion.div>

          <motion.div
            variants={featureVariants}
            className="bg-black/30 backdrop-blur-md p-6 rounded-xl border border-gray-800"
          >
            <div className="bg-blue-600/20 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4 mx-auto">
              <Layers className="h-6 w-6 text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Frameworks</h3>
            <p className="text-gray-400 text-sm">
              Node.js, Flask, Django, FastAPI, TensorFlow, Keras
            </p>
          </motion.div>

          <motion.div
            variants={featureVariants}
            className="bg-black/30 backdrop-blur-md p-6 rounded-xl border border-gray-800"
          >
            <div className="bg-pink-600/20 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4 mx-auto">
              <Sparkles className="h-6 w-6 text-pink-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Education</h3>
            <p className="text-gray-400 text-sm">
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
