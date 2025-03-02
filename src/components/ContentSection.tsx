import React, { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Search,
  Code,
  Layers,
  Rocket,
  Github,
  Database,
  Globe,
  Server,
} from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";

interface ContentSectionProps {
  title?: string;
  subtitle?: string;
  projects?: Project[];
}

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  category: string;
  githubUrl?: string;
}

const ContentSection: React.FC<ContentSectionProps> = ({
  title = "Projects",
  subtitle = "Showcasing my technical projects and experiences",
  projects = [
    {
      id: "1",
      title: "Research Paper on Hybrid ML-DL Model",
      description:
        "Co-authored paper on hybrid CatBoost-ANN model for predicting compressive strength with 94% accuracy. Presented at IEEE's ICDCC 2024 Conference.",
      image:
        "https://images.unsplash.com/photo-1507668077129-56e32842fceb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      tags: ["Machine Learning", "Research", "IEEE", "Python"],
      category: "Research",
      githubUrl: "https://github.com/Lalith17/hybrid-ml-dl-model",
    },
    {
      id: "2",
      title: "Paperless Scholarship Disbursement System",
      description:
        "Built server-less back-end using Firebase Authentication & Firestore with role-based access for 500+ users. Implemented real-time data synchronization.",
      image:
        "https://images.unsplash.com/photo-1606857521015-7f9fcf423740?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      tags: ["Firebase", "Authentication", "Dashboard", "React"],
      category: "Web Development",
      githubUrl: "https://github.com/Lalith17/paperless-scholarship",
    },
    {
      id: "3",
      title: "MediNet Healthcare System",
      description:
        "Healthcare system enhancing patient interactions and record management with appointment scheduling. Implemented secure access across four departments.",
      image:
        "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      tags: ["Healthcare", "Flutter", "Security", "Firebase"],
      category: "Healthcare",
      githubUrl: "https://github.com/Lalith17/medinet",
    },
    {
      id: "4",
      title: "E-Commerce Platform",
      description:
        "Developed a full-featured e-commerce platform with product catalog, shopping cart, and secure payment processing using Stripe integration.",
      image:
        "https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      tags: ["React", "Node.js", "Stripe", "MongoDB"],
      category: "E-commerce",
      githubUrl: "https://github.com/Lalith17/ecommerce-platform",
    },
    {
      id: "5",
      title: "Portfolio Website",
      description:
        "Designed and developed a responsive portfolio website with 3D animations, interactive UI elements, and optimized performance metrics.",
      image:
        "https://images.unsplash.com/photo-1545239351-ef35f43d514b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      tags: ["React", "Three.js", "Framer Motion", "Tailwind CSS"],
      category: "Portfolio",
      githubUrl: "https://github.com/Lalith17/portfolio",
    },
    {
      id: "6",
      title: "Mobile App for Event Management",
      description:
        "Created a cross-platform mobile application for event planning and management with real-time updates and location-based services.",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      tags: ["Flutter", "Firebase", "Google Maps API", "Push Notifications"],
      category: "Mobile Apps",
      githubUrl: "https://github.com/Lalith17/event-manager",
    },
  ],
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Get unique categories from projects
  const categories = [
    "All",
    ...new Set(projects.map((project) => project.category)),
  ];

  // Filter projects based on active filter and search query
  const filteredProjects = projects.filter((project) => {
    const matchesFilter =
      activeFilter === "All" || project.category === activeFilter;
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    return matchesFilter && matchesSearch;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  // 3D card hover effect
  const cardVariants = {
    hover: {
      rotateY: 5,
      rotateX: -5,
      scale: 1.05,
      boxShadow:
        "0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15,
      },
    },
  };

  return (
    <section
      ref={ref}
      className="w-full min-h-screen bg-black py-20 px-4 md:px-8 lg:px-16"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {title}
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">{subtitle}</p>
        </motion.div>

        {/* Filter and Search */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeFilter === category ? "default" : "outline"}
                className={`rounded-full px-6 ${activeFilter === category ? "bg-purple-600 hover:bg-purple-700" : "border-gray-600 text-gray-300 hover:border-purple-500 hover:text-purple-400"}`}
                onClick={() => setActiveFilter(category)}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="max-w-md mx-auto relative">
            <Input
              type="text"
              placeholder="Search projects..."
              className="bg-gray-800/50 border-gray-700 text-white pl-10 focus-visible:ring-purple-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
        </motion.div>

        {/* Projects Grid with 3D effect */}
        <AnimatePresence>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20 perspective-1000"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={containerVariants}
          >
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  variants={itemVariants}
                  whileHover="hover"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <motion.div className="h-full" variants={cardVariants}>
                    <Card className="overflow-hidden bg-gray-800/50 border-gray-700 h-full group cursor-pointer transform-style-3d">
                      <a
                        href={
                          project.githubUrl ||
                          `https://github.com/Lalith17/${project.id}`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block h-full"
                      >
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full">
                            <span className="text-xs text-white">
                              {project.category}
                            </span>
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                            <span className="text-white font-medium px-3 py-1 rounded-full bg-purple-600/70 text-sm flex items-center">
                              <Github className="w-4 h-4 mr-1" /> View Project
                            </span>
                          </div>
                        </div>
                        <CardContent className="p-6">
                          <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-purple-400 transition-colors">
                            {project.title}
                          </h3>
                          <p className="text-gray-300 mb-4 text-sm">
                            {project.description}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {project.tags.map((tag, index) => (
                              <span
                                key={index}
                                className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded-full group-hover:bg-purple-900/40 group-hover:text-purple-200 transition-colors"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </CardContent>
                      </a>
                    </Card>
                  </motion.div>
                </motion.div>
              ))
            ) : (
              <motion.div
                className="col-span-full text-center py-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <p className="text-gray-400 text-lg">
                  No projects found matching your criteria.
                </p>
                <Button
                  variant="outline"
                  className="mt-4 border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white"
                  onClick={() => {
                    setActiveFilter("All");
                    setSearchQuery("");
                  }}
                >
                  Reset Filters
                </Button>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ContentSection;
