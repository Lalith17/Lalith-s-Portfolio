import React, { useState } from "react";
import { motion } from "framer-motion";
import { Globe, Code, Server, Database, Cpu, Layers } from "lucide-react";

const SkillsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    "Languages" | "Frameworks" | "Tools"
  >("Languages");

  const skillCategories = {
    Languages: [
      {
        name: "Python",
        icon: (
          <img
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg"
            className="w-12 h-12"
            alt="Python"
          />
        ),
        level: 90,
        color: "#3776AB",
      },
      {
        name: "Java",
        icon: (
          <img
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg"
            className="w-12 h-12"
            alt="Java"
          />
        ),
        level: 85,
        color: "#007396",
      },
      {
        name: "JavaScript",
        icon: <span className="text-4xl font-bold">JS</span>,
        level: 95,
        color: "#F7DF1E",
      },
      {
        name: "TypeScript",
        icon: <span className="text-4xl font-bold">TS</span>,
        level: 85,
        color: "#3178C6",
      },
      {
        name: "C++",
        icon: <span className="text-4xl font-bold">C++</span>,
        level: 75,
        color: "#00599C",
      },
      {
        name: "HTML/CSS",
        icon: <Globe className="w-12 h-12" />,
        level: 90,
        color: "#E34F26",
      },
    ],
    Frameworks: [
      {
        name: "React",
        icon: (
          <img
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
            className="w-12 h-12"
            alt="React"
          />
        ),
        level: 90,
        color: "#61DAFB",
      },
      {
        name: "Node.js",
        icon: (
          <img
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg"
            className="w-12 h-12"
            alt="Node.js"
          />
        ),
        level: 85,
        color: "#339933",
      },
      {
        name: "Flutter",
        icon: (
          <img
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg"
            className="w-12 h-12"
            alt="Flutter"
          />
        ),
        level: 80,
        color: "#02569B",
      },
      {
        name: "Django",
        icon: (
          <img
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg"
            className="w-12 h-12"
            alt="Django"
          />
        ),
        level: 75,
        color: "#092E20",
      },
      {
        name: "TensorFlow",
        icon: (
          <img
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg"
            className="w-12 h-12"
            alt="TensorFlow"
          />
        ),
        level: 70,
        color: "#FF6F00",
      },
      {
        name: "FastAPI",
        icon: <Server className="w-12 h-12" />,
        level: 80,
        color: "#009688",
      },
    ],
    Tools: [
      {
        name: "Firebase",
        icon: (
          <img
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg"
            className="w-12 h-12"
            alt="Firebase"
          />
        ),
        level: 90,
        color: "#FFCA28",
      },
      {
        name: "AWS",
        icon: (
          <img
            src="https://raw.githubusercontent.com/devicons/devicon/master/icons/amazonwebservices/amazonwebservices-original-wordmark.svg"
            className="w-12 h-12"
            alt="AWS"
          />
        ),
        level: 80,
        color: "#232F3E",
      },
      {
        name: "Git",
        icon: (
          <img
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg"
            className="w-12 h-12"
            alt="Git"
          />
        ),
        level: 85,
        color: "#F05032",
      },
      {
        name: "MongoDB",
        icon: <Database className="w-12 h-12" />,
        level: 75,
        color: "#47A248",
      },
      {
        name: "Docker",
        icon: (
          <img
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg"
            className="w-12 h-12"
            alt="Docker"
          />
        ),
        level: 70,
        color: "#2496ED",
      },
      {
        name: "Kubernetes",
        icon: <Layers className="w-12 h-12" />,
        level: 65,
        color: "#326CE5",
      },
    ],
  };

  const tabVariants = {
    inactive: { opacity: 0.7, scale: 0.95 },
    active: { opacity: 1, scale: 1 },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
    <section className="w-full py-20 px-4 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Technical Skills
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Expertise in multiple languages, frameworks, and technologies
          </p>
        </motion.div>

        {/* Tabs */}
        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12 px-2">
          {(
            Object.keys(skillCategories) as Array<keyof typeof skillCategories>
          ).map((category) => (
            <motion.button
              key={category}
              className={`px-4 py-2 rounded-full flex items-center gap-2 text-sm md:text-base md:px-6 md:py-3 ${activeTab === category ? "bg-purple-900/50 text-white border border-purple-500" : "bg-gray-800/50 text-gray-300 border border-gray-700"}`}
              onClick={() => setActiveTab(category)}
              variants={tabVariants}
              animate={activeTab === category ? "active" : "inactive"}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category === "Languages" && <Globe className="w-5 h-5" />}
              {category === "Frameworks" && <Code className="w-5 h-5" />}
              {category === "Tools" && <Server className="w-5 h-5" />}
              <span>{category}</span>
            </motion.button>
          ))}
        </div>

        {/* Skills Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 px-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {skillCategories[activeTab].map((skill, index) => (
            <motion.div
              key={index}
              className="bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700 p-3 flex flex-col items-center justify-center hover:border-purple-500 transition-all duration-300 min-w-[120px]"
              variants={itemVariants}
              whileHover={{
                y: -5,
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)",
              }}
            >
              <div className="mb-3 text-white">{skill.icon}</div>
              <h3 className="text-white font-medium mb-2">{skill.name}</h3>
              <div className="w-full bg-gray-700 h-1.5 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: skill.color }}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                  viewport={{ once: true }}
                ></motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
