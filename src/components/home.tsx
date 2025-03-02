import React from "react";
import { motion } from "framer-motion";
import HeroSection from "./hero/HeroSection";
import ContentSection from "./ContentSection";
import AboutMeSection from "./AboutMeSection";
import SkillsSection from "./SkillsSection";
import ResumeSection from "./ResumeSection";
import JourneySection from "./JourneySection";
import ContactForm from "./ContactForm";
import ThemeToggle from "./ThemeToggle";
import ChatAssistant from "./ChatAssistant";
import PerformanceMonitor from "./hero/PerformanceMonitor";
import Footer from "./Footer";

interface HomeProps {
  title?: string;
  subtitle?: string;
  description?: string;
  ctaText?: string;
  text3D?: string;
  backgroundColor?: string;
  showPerformanceMonitor?: boolean;
}

const Home: React.FC<HomeProps> = ({
  title = "MEGHA SAI LALITH VALLAMKONDA",
  subtitle = "Full Stack Developer & CS Student",
  description = "Welcome to my digital portfolio showcasing my journey in software development, research, and technical innovation. Explore my projects and experience below.",
  ctaText = "Explore My Work",
  text3D = "LALITH",
  backgroundColor = "#050505",
  showPerformanceMonitor = process.env.NODE_ENV === "development",
}) => {
  const handleCtaClick = () => {
    window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
  };

  const handleScrollToContent = () => {
    window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
  };

  return (
    <motion.div
      className="min-h-screen bg-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero Section */}
      <HeroSection
        title={title}
        subtitle={subtitle}
        description={description}
        ctaText={ctaText}
        onCtaClick={handleCtaClick}
        text3D={text3D}
        backgroundColor={backgroundColor}
        onScrollToContent={handleScrollToContent}
      />

      {/* Theme Toggle - Fixed position */}
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      {/* About Me Section */}
      <AboutMeSection />

      {/* Projects Section */}
      <ContentSection />

      {/* Skills Section */}
      <SkillsSection />

      {/* Journey Section - Storytelling */}
      <JourneySection />

      {/* Resume Section with Download Option */}
      <ResumeSection />

      {/* Contact Form Section */}
      <section className="w-full py-20 px-4 bg-black">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Contact Me
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Have a project in mind or want to discuss opportunities? Get in
              touch!
            </p>
          </motion.div>

          <ContactForm />
        </div>
      </section>

      {/* Footer with Social Links */}
      <Footer />

      {/* Chat Assistant */}
      <ChatAssistant />

      {/* Performance Monitor - only visible when enabled */}
      {showPerformanceMonitor && (
        <PerformanceMonitor
          visible={true}
          threshold={30}
          onPerformanceData={(data) => {
            if (data.quality === "low") {
              console.log("Low performance detected, optimizing rendering...");
              // Here you could implement performance optimizations
            }
          }}
        />
      )}
    </motion.div>
  );
};

export default Home;
