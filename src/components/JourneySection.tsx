import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Code, Database, Lightbulb, Rocket, Server, Users } from "lucide-react";

const JourneySection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [1, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1]);

  const journeyItems = [
    {
      year: "2022",
      title: "Beginning the Journey",
      description:
        "Started my Computer Science degree at VIT-AP University, diving into programming fundamentals and building a strong foundation in algorithms and data structures.",
      icon: <Code className="h-6 w-6 text-purple-400" />,
      color: "from-purple-500/20 to-blue-500/20",
    },
    {
      year: "2023",
      title: "Expanding Horizons",
      description:
        "Became President of Milestone Club, managing 150+ participants in hackathons and coding events. Started exploring web development and cloud technologies.",
      icon: <Users className="h-6 w-6 text-blue-400" />,
      color: "from-blue-500/20 to-cyan-500/20",
    },
    {
      year: "2024",
      title: "Professional Experience",
      description:
        "Secured my first industry role as a Full Stack Developer at Honeyfilm Pvt Ltd, leading a team to develop scalable apps using Firebase and Flutter.",
      icon: <Database className="h-6 w-6 text-cyan-400" />,
      color: "from-cyan-500/20 to-teal-500/20",
    },
    {
      year: "2025",
      title: "AI & Research",
      description:
        "Co-authored a research paper on hybrid ML-DL models and joined PetThinQ Inc. as a Generative AI Intern, building AI-ready e-commerce platforms.",
      icon: <Lightbulb className="h-6 w-6 text-teal-400" />,
      color: "from-teal-500/20 to-green-500/20",
    },
    {
      year: "Future",
      title: "What's Next",
      description:
        "Continuing to explore cutting-edge technologies, with a focus on AI/ML, cloud architecture, and building scalable applications that solve real-world problems.",
      icon: <Rocket className="h-6 w-6 text-green-400" />,
      color: "from-green-500/20 to-purple-500/20",
    },
  ];

  return (
    <section
      ref={containerRef}
      className="w-full py-20 px-4 bg-black relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/40 via-black to-black"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80')] opacity-10 mix-blend-overlay"></div>
      </div>

      <motion.div
        className="max-w-5xl mx-auto relative z-10"
        style={{ opacity, scale }}
      >
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            My Journey
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            The story of my growth as a developer and the path that led me here
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-purple-500/50 via-blue-500/50 to-green-500/50 rounded-full"></div>

          {/* Journey items */}
          <div className="space-y-24">
            {journeyItems.map((item, index) => (
              <JourneyItem
                key={index}
                year={item.year}
                title={item.title}
                description={item.description}
                icon={item.icon}
                color={item.color}
                isLeft={index % 2 === 0}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

interface JourneyItemProps {
  year: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  isLeft: boolean;
}

const JourneyItem: React.FC<JourneyItemProps> = ({
  year,
  title,
  description,
  icon,
  color,
  isLeft,
}) => {
  return (
    <div className="relative">
      {/* Center dot */}
      <motion.div
        className={`absolute left-1/2 top-0 transform -translate-x-1/2 w-10 h-10 rounded-full bg-gradient-to-br ${color} flex items-center justify-center z-10 border-2 border-black`}
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
        viewport={{ once: true }}
      >
        {icon}
      </motion.div>

      {/* Content */}
      <div
        className={`flex ${isLeft ? "flex-row" : "flex-row-reverse"} items-start`}
      >
        <motion.div
          className={`w-1/2 ${isLeft ? "pr-12 text-right" : "pl-12 text-left"}`}
          initial={{ opacity: 0, x: isLeft ? -20 : 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div
            className={`inline-block px-4 py-1 rounded-full bg-gradient-to-r ${color} text-white text-sm font-medium mb-2`}
          >
            {year}
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
            {title}
          </h3>
          <p className="text-gray-300">{description}</p>
        </motion.div>

        <div className="w-1/2"></div>
      </div>
    </div>
  );
};

export default JourneySection;
