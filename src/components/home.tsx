import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
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
import ParticleSystem from "./ParticleSystem";
import ScrollTransition from "./ScrollTransition";
import SectionTransition from "./SectionTransition";

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

  // Refs for scroll transitions
  const aboutRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const journeyRef = useRef<HTMLDivElement>(null);
  const resumeRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  // Scroll progress for parallax effects
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, 300]);

  return (
    <motion.div
      className="min-h-screen bg-black relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Interactive Particle System - Global */}
      <ParticleSystem
        count={80}
        color="#8b5cf6"
        size={3}
        speed={0.5}
        interactive={true}
        className="fixed inset-0 z-10 opacity-30 pointer-events-none"
      />

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

      {/* Theme Toggle removed */}

      {/* About Me Section */}
      <div ref={aboutRef}>
        <ScrollTransition transitionType="fade" threshold={0.3}>
          <AboutMeSection />
        </ScrollTransition>
      </div>

      {/* Projects Section */}
      <div ref={projectsRef}>
        <ScrollTransition transitionType="slide" threshold={0.3}>
          <ContentSection />
        </ScrollTransition>
      </div>

      {/* Skills Section */}
      <div ref={skillsRef}>
        <ScrollTransition transitionType="scale" threshold={0.3}>
          <SkillsSection />
        </ScrollTransition>
      </div>

      {/* Journey Section - Storytelling */}
      <div ref={journeyRef}>
        <ScrollTransition transitionType="blur" threshold={0.3}>
          <JourneySection />
        </ScrollTransition>
      </div>

      {/* Resume Section with Download Option */}
      <div ref={resumeRef}>
        <ScrollTransition transitionType="rotate" threshold={0.3}>
          <ResumeSection />
        </ScrollTransition>
      </div>

      {/* Contact Form Section */}
      <div ref={contactRef}>
        <ScrollTransition transitionType="fade" threshold={0.3}>
          <section className="w-full py-20 px-4 bg-black">
            <div className="max-w-5xl mx-auto">
              <SectionTransition className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Contact Me
                </h2>
                <p className="text-gray-300 max-w-2xl mx-auto">
                  Have a project in mind or want to discuss opportunities? Get
                  in touch!
                </p>
              </SectionTransition>

              <ContactForm />
            </div>
          </section>
        </ScrollTransition>
      </div>

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
