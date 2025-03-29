import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FileDown,
  ExternalLink,
  Briefcase,
  GraduationCap,
  Award,
  Code,
} from "lucide-react";
import { Button } from "./ui/button";

const ResumeSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    "experience" | "education" | "skills" | "certifications"
  >("experience");

  const handleDownloadResume = () => {
    window.open(
      "https://drive.google.com/file/d/1uDLlZG45Ts_3DkpRaJJnJHFTLTSUJthF/view?usp=drive_link",
      "_blank",
    );
  };

  const tabs = [
    {
      id: "experience",
      label: "Experience",
      icon: <Briefcase className="h-4 w-4" />,
    },
    {
      id: "education",
      label: "Education",
      icon: <GraduationCap className="h-4 w-4" />,
    },
    { id: "skills", label: "Skills", icon: <Code className="h-4 w-4" /> },
    {
      id: "certifications",
      label: "Certifications",
      icon: <Award className="h-4 w-4" />,
    },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "experience":
        return (
          <div className="space-y-6">
            <TimelineItem
              title="Generative AI Intern"
              company="cloud9vacation.com"
              date="Nov 2024 - Feb 2025"
              description="Developed and deployed an AI-powered travel planner website, offering 100+ packages with optimized response times. Integrated back-end services to efficiently handle user data, package details, and transactions."
            />
            <TimelineItem
              title="Full Stack Developer"
              company="Honeyfilm Pvt Ltd."
              date="June 2024 - Sept 2024"
              description="Led a 4-member team to develop two scalable apps using Firebase and Flutter. Developed backend with 10+ databases, API calls, and user data management."
            />
          </div>
        );
      case "education":
        return (
          <div className="space-y-6">
            <TimelineItem
              title="B.Tech in Computer Science"
              company="VIT-AP University"
              date="2022 - 2026"
              description="CGPA: 9.18"
            />
            <TimelineItem
              title="Intermediate"
              company="Resonance Junior College"
              date="2020 - 2022"
              description="Mathematics, Physics, Chemistry, CGPA: 9.7"
            />
          </div>
        );
      case "skills":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SkillCategory
              title="Tech Stack"
              skills={[
                "Java",
                "Python",
                "JavaScript",
                "Flutter",
                "MySQL",
                "Firebase",
                "AWS",
                "GCP",
              ]}
            />
            <SkillCategory
              title="Frameworks"
              skills={[
                "Node.js",
                "Flask",
                "Django",
                "FastAPI",
                "TensorFlow",
                "Keras",
              ]}
            />
            <SkillCategory
              title="Tools"
              skills={[
                "Web/App Development",
                "Prompt Engineering",
                "Git",
                "Postman",
              ]}
            />
          </div>
        );
      case "certifications":
        return (
          <div className="space-y-4">
            <CertificationItem title="Cisco: Cybersecurity Essentials" />
            <CertificationItem title="IBM: Web Development with HTML5, CSS3, and JavaScript" />
            <CertificationItem title="IBM: Generative AI-Powered Applications with Python" />
            <CertificationItem title="AWS: Getting Started with Data Analytics on AWS" />
            <CertificationItem title="IBM: Machine Learning with Python" />
            <CertificationItem title="AWS: AWS Academy Cloud Architecting" />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section className="w-full py-20 px-4 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            My Resume
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            A snapshot of my professional journey, education, and skills
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Button
              onClick={handleDownloadResume}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium rounded-md transition-all duration-300"
            >
              <FileDown className="mr-2 h-5 w-5" /> View Resume
            </Button>

            <Button
              variant="outline"
              className="border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white transition-all duration-300"
              onClick={() =>
                window.open(
                  "https://linkedin.com/in/lalithvallamkonda",
                  "_blank",
                )
              }
            >
              <ExternalLink className="mr-2 h-5 w-5" /> View LinkedIn
            </Button>
          </div>
        </motion.div>

        <motion.div
          className="bg-black/40 backdrop-blur-md rounded-xl border border-gray-800 overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {/* Tabs */}
          <div className="flex overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center px-4 py-3 text-sm font-medium whitespace-nowrap transition-all duration-200 ${activeTab === tab.id ? "text-white border-b-2 border-purple-500" : "text-gray-400 hover:text-white"}`}
              >
                {tab.icon}
                <span className="ml-2">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-6">{renderTabContent()}</div>
        </motion.div>
      </div>
    </section>
  );
};

const TimelineItem: React.FC<{
  title: string;
  company: string;
  date: string;
  description: string;
}> = ({ title, company, date, description }) => {
  return (
    <motion.div
      className="relative pl-8 border-l border-gray-700"
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      viewport={{ once: true }}
    >
      <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-purple-500 border-2 border-black"></div>
      <h3 className="text-xl font-semibold text-white">{title}</h3>
      <div className="flex justify-between items-center mb-2">
        <p className="text-purple-400">{company}</p>
        <p className="text-gray-400 text-sm">{date}</p>
      </div>
      <p className="text-gray-300">{description}</p>
    </motion.div>
  );
};

const SkillCategory: React.FC<{ title: string; skills: string[] }> = ({
  title,
  skills,
}) => {
  return (
    <motion.div
      className="bg-gray-800/30 p-4 rounded-lg"
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      viewport={{ once: true }}
    >
      <h3 className="text-lg font-medium text-white mb-3">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <span
            key={index}
            className="text-sm bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full"
          >
            {skill}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

const CertificationItem: React.FC<{ title: string }> = ({ title }) => {
  return (
    <motion.div
      className="flex items-center gap-3 bg-gray-800/30 p-3 rounded-lg"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      viewport={{ once: true }}
    >
      <Award className="text-purple-400 h-5 w-5 flex-shrink-0" />
      <p className="text-white">{title}</p>
    </motion.div>
  );
};

export default ResumeSection;
