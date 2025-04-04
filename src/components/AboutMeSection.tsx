import React from "react";
import { motion } from "framer-motion";
import SectionTransition from "./SectionTransition";

const AboutMeSection: React.FC = () => {
  return (
    <section className="w-full py-20 px-4 bg-black">
      <div className="max-w-6xl mx-auto">
        <SectionTransition className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            About Me
          </h2>
          <p className="text-gray-300 max-w-3xl mx-auto text-lg">
            Creating digital experiences at the intersection of design and
            technology
          </p>
        </SectionTransition>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <SectionTransition className="col-span-2" index={1}>
            <div>
              <h3 className="text-3xl font-bold text-white mb-6">
                Megha Sai Lalith Vallamkonda
              </h3>

              <p className="text-gray-300 mb-6 text-lg">
                I'm a computer science student at VIT-AP University with a
                passion for full-stack development and generative AI. Currently
                pursuing my B.Tech with a 9.22 CGPA, I combine strong technical
                foundations with real-world project experience to create
                innovative solutions.
              </p>

              <p className="text-gray-300 mb-6 text-lg">
                As a Generative AI Intern at Cloud9Vacation.com, I developed and
                deployed an AI-powered travel planner website, offering 100+
                packages with optimized response times. Integrated back-end
                services to efficiently handle user data, package details, and
                transactions.
              </p>

              <h3 className="text-2xl font-bold text-white mt-10 mb-4">
                Education & Leadership
              </h3>
              <p className="text-gray-300 mb-2">
                B.Tech in Computer Science at VIT-AP University (2022-2026, CGPA:
                9.22)
              </p>
              <p className="text-gray-300 mb-6">
                Intermediate at Resonance Junior College (2020-2022, CGPA: 9.7)
              </p>

              <p className="text-gray-300 text-lg">
                As President of the Milestone Club, I manage 150+ participants
                in hackathons and coding events, coordinating projects and
                boosting engagement by 40%. My leadership experience complements
                my technical skills in developing comprehensive solutions.
              </p>
            </div>
          </SectionTransition>

          <SectionTransition className="grid grid-cols-2 gap-6" index={2}>
            <div className="contents">
              <motion.div
                className="bg-purple-900/30 backdrop-blur-sm p-8 rounded-xl border border-purple-500/30 flex flex-col items-center justify-center"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <span className="text-5xl font-bold text-purple-400 mb-2">
                  9.22
                </span>
                <span className="text-gray-300 text-center">
                  University CGPA
                </span>
              </motion.div>

              <motion.div
                className="bg-blue-900/30 backdrop-blur-sm p-8 rounded-xl border border-blue-500/30 flex flex-col items-center justify-center"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <span className="text-5xl font-bold text-blue-400 mb-2">
                  2+
                </span>
                <span className="text-gray-300 text-center">
                  Years Experience
                </span>
              </motion.div>

              <motion.div
                className="bg-pink-900/30 backdrop-blur-sm p-8 rounded-xl border border-pink-500/30 flex flex-col items-center justify-center"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <span className="text-5xl font-bold text-pink-400 mb-2">
                  30+
                </span>
                <span className="text-gray-300 text-center">
                  Certifications
                </span>
              </motion.div>

              <motion.div
                className="bg-teal-900/30 backdrop-blur-sm p-8 rounded-xl border border-teal-500/30 flex flex-col items-center justify-center"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <span className="text-5xl font-bold text-teal-400 mb-2">
                  150+
                </span>
                <span className="text-gray-300 text-center">Club Members</span>
              </motion.div>
            </div>
          </SectionTransition>
        </div>
      </div>
    </section>
  );
};

export default AboutMeSection;
