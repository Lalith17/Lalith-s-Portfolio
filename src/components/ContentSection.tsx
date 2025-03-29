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
        "https://static.vecteezy.com/system/resources/previews/023/826/514/large_2x/ai-artificial-intelligence-humanoid-side-portrait-view-with-blue-and-orange-vibrant-neon-and-copy-space-artificial-intelligence-technology-concept-ai-generated-illustration-free-photo.jpg",
      tags: ["Machine Learning", "Research", "IEEE", "Python"],
      category: "AI & Machine Learning",
      githubUrl:
        "https://github.com/Lalith17/Hybrid-Model-for-Concrete-Strength-Prediction",
    },
    {
      id: "2",
      title: "Paperless Scholarship Disbursement System",
      description:
        "Built server-less back-end using Firebase Authentication & Firestore with role-based access for 500+ users. Implemented real-time data synchronization.",
      image:
        "https://www.oist.jp/sites/default/files/photos/20180224-graduation-ceremony-graduates.jpg",
      tags: ["Firebase", "Authentication", "Dashboard", "React"],
      category: "Web & App Development",
      githubUrl:
        "https://github.com/Lalith17/Paperless-Scholarship-Disbursement-System-for-PMSS",
    },
    {
      id: "3",
      title: "MediNet Healthcare System",
      description:
        "Healthcare system enhancing patient interactions and record management with appointment scheduling. Implemented secure access across four departments.",
      image:
        "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      tags: ["Healthcare", "Flutter", "Security", "Firebase"],
      category: "Web & App Development",
      githubUrl: "https://github.com/Lalith17/MediNet",
    },
    {
      id: "4",
      title: "DocClassify - Document Classification & OCR",
      description:
        "Built a document classification system using FastAPI, OpenCV, and Tesseract OCR to classify invoices, emails, and resumes. Integrated a machine learning model with Random Forest for accurate classification.",
      image:
        "https://www.slideteam.net/media/catalog/product/cache/1280x720/d/o/document_process_workflow_automation_illustration_slide01.jpg",
      tags: ["AI", "OCR", "Machine Learning", "FastAPI"],
      category: "AI & Machine Learning",
      githubUrl: "https://github.com/Lalith17/DocClassify",
    },
    {
      id: "5",
      title: "StyleSpectrum - AI-Powered Fashion Assistant",
      description:
        "Developed an AI-powered fashion assistant that suggests stylish outfit combinations based on user-uploaded clothing images. Uses color analysis and decision trees for intelligent outfit matching.",
      image:
        "https://images.unsplash.com/photo-1520975916090-3105956dac38?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      tags: ["AI", "Fashion Tech", "Flask", "Computer Vision"],
      category: "AI Applications",
      githubUrl: "https://github.com/Lalith17/StyleSpectrum",
    },
    {
      id: "6",
      title: "Face Clustering with Deep Learning",
      description:
        "Implemented a facial clustering system using InsightFace for feature extraction and K-Means for grouping similar faces. Organizes images into clusters based on facial similarities.",
      image:
        "https://research.aimultiple.com/wp-content/uploads/2019/07/point_detection_research_slide.png",
      tags: ["Deep Learning", "Face Recognition", "K-Means", "InsightFace"],
      category: "AI & Machine Learning",
      githubUrl: "https://github.com/Lalith17/Face-Clustering-Project",
    },
    {
      id: "7",
      title: "Firebase Community Chat App",
      description:
        "A real-time community-based chat application using Firebase Realtime Database. Enables users to join community channels, send messages, and view updates instantly.",
      image:
        "https://i.pinimg.com/originals/ca/f2/df/caf2df0bf337a8ab3808889edb9870d3.jpg",
      tags: ["Firebase", "Realtime Database", "JavaScript", "Chat Application"],
      category: "Web & App Development",
      githubUrl:
        "https://github.com/Lalith17/Firebase-Community-Chat-Application",
    },
    {
      id: "8",
      title: "Resume ATS Analysis Tool",
      description:
        "An AI-powered resume analysis tool using Google Generative AI (Gemini-pro) to evaluate job fit, missing keywords, and ATS compatibility for optimized applications.",
      image:
        "https://aitificial.blog/wp-content/uploads/2024/07/resume-ats-checkers-e1721537938426.jpg",
      tags: [
        "AI",
        "Resume Analysis",
        "Google Generative AI",
        "Node.js",
        "PDF Parsing",
      ],
      category: "AI Applications",
      githubUrl: "https://github.com/Lalith17/ATS-FRIENDLY-RESUME",
    },
    {
      id: "9",
      title: "SpeechSentinel - Hate Speech Detection",
      description:
        "A web application leveraging NLP and machine learning to classify text as hate speech, offensive speech, or non-offensive speech with a Flask-based interface.",
      image:
        "https://repository-images.githubusercontent.com/282252594/0bc47500-d67a-11ea-9e1b-8ddadf5e9b90",
      tags: [
        "NLP",
        "Flask",
        "Machine Learning",
        "Text Classification",
        "Hate Speech Detection",
      ],
      category: "AI & Machine Learning",
      githubUrl: "https://github.com/Lalith17/SpeechSentinel",
    },
    {
      id: "10",
      title: "Nutrition.AI - AI-Powered Dietary Guidance",
      description:
        "An AI-driven nutrition assistant using Gemini Pro Vision to provide personalized meal plans, dietary feedback, and wellness tips for healthier living.",
      image:
        "https://inkwell-oasis-s3.s3.us-west-1.amazonaws.com/peppino/medium_ai_powered_nutrition_guidance_personalized_dietary_recommendations_for_optimal_well_being_47sxx2d9d8e3nxt7fnv4v_b8becd947c.webp",
      tags: [
        "AI",
        "Nutrition",
        "HealthTech",
        "Gemini Pro Vision",
        "Dietary Guidance",
      ],
      category: "AI Applications",
      githubUrl: "https://github.com/Lalith17/Nutrition.Ai",
    },
    {
      id: "11",
      title: "FutureVista: Human Following Robot",
      description:
        "An Arduino-based robot that follows humans using ultrasonic sensors, adjusting direction and maintaining a safe following distance with obstacle avoidance.",
      image:
        "https://circuitdigest.com/sites/default/files/projectimage_mic/human-following-robot.jpg",
      tags: ["Arduino", "Robotics", "Ultrasonic Sensors", "Embedded Systems"],
      category: "Web3 & IoT",
      githubUrl: "https://github.com/Lalith17/Human-Following-Robot",
    },
    {
      id: "12",
      title: "QR Share",
      description:
        "A web application for secure and effortless file sharing using QR codes, enabling quick transfers between devices with a user-friendly interface.",
      image: "public/images/qrcode.png",
      tags: ["QR Code", "File Sharing", "Web App", "Security"],
      category: "Web & App Development",
      githubUrl: "https://sharedata-e0f70.web.app",
    },
    {
      id: "13",
      title: "Automobile Theft Detection System",
      description:
        "A security system that detects vehicle theft using GPS tracking, motion sensors, and mobile alerts, providing real-time protection for automobiles.",
      image:
        "https://img.vehicleservicepros.com/files/base/cygnus/vspc/image/2022/01/16x9/MA0322_T3_04.61f18b97789d9.png?auto=format%2Ccompress&fill=blur&fit=fill&h=630&w=1200",
      tags: ["IoT", "Security", "GPS", "Arduino"],
      category: "Web3 & IoT",
      githubUrl: "https://github.com/Lalith17/VEHICLE-THEFT-DETECTION",
    },
    {
      id: "14",
      title: "XAFFLE: Decentralized Raffle Smart Contract",
      description:
        "A Solidity smart contract that facilitates decentralized NFT raffles on the Ethereum blockchain, ensuring fair and transparent winner selection.",
      image:
        "https://www.cointribune.com/wp-content/uploads/2019/12/smart-contract-1-780x507.png",
      tags: ["Solidity", "Blockchain", "NFT", "Ethereum"],
      category: "Web3 & IoT",
      githubUrl: "https://github.com/Lalith17/DIMO-XAFFLE",
    },
    {
      id: "15",
      title: "CineSuggest: Personalized Movie Recommendation System",
      description:
        "A personalized movie recommendation system using machine learning to suggest movies based on user preferences such as genre, mood, cast, and director.",
      image:
        "https://miro.medium.com/v2/resize%3Afit%3A1358/1%2AVVOC3WBUZU87p4MMMLr7zg.png",
      tags: [
        "Machine Learning",
        "Streamlit",
        "Python",
        "Recommendation System",
      ],
      category: "AI & Machine Learning",
      githubUrl: "https://github.com/Lalith17/CineSuggest",
    },
  ],
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });
  const [activeFilter, setActiveFilter] = useState("AI & Machine Learning");
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
          scale: 1.03, // Slightly bigger effect for a smooth hover
          boxShadow:
            "0 10px 20px rgba(0, 0, 0, 0.1), 0 6px 6px rgba(0, 0, 0, 0.05)", // Soft shadow
          transition: {
            type: "spring",
            stiffness: 200,
            damping: 20,
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
                className={`rounded-full px-6 ${
                  activeFilter === category
                    ? "bg-purple-600 hover:bg-purple-700 text-white"
                    : "border-gray-500 text-gray-400 hover:border-purple-500 hover:text-purple-300"
                }`}
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
            animate={"visible"}
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
                          <div className="absolute top-3 right-3 bg-black/70 px-3 py-1 rounded-full">
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
                          <h3 className="text-xl font-semibold text-white mb-2 transition-colors group-hover:text-purple-300">
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
