import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, Bot, X, User, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface Message {
  id: string;
  text: string;
  sender: "user" | "assistant";
  timestamp: Date;
}

const ChatAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Personal information for the assistant to use
  const personalInfo = {
    name: "Megha Sai Lalith Vallamkonda",
    education: [
      {
        institution: "VIT-AP University",
        degree: "B.Tech in Computer Science",
        years: "2022 - 2026",
        gpa: "9.17",
      },
      {
        institution: "Resonance Junior College",
        degree: "Intermediate",
        subjects: "Mathematics, Physics, Chemistry",
        years: "2020 - 2022",
        gpa: "9.7",
      },
    ],
    experience: [
      {
        position: "Generative AI Intern",
        company: "PetThinQ Inc.",
        period: "Feb 2025 - May 2025",
        description:
          "Engineering an AI-ready e-commerce platform with React.js, FastAPI, and AWS. Sole developer building web pages, APIs, and Shopify headless integrations.",
      },
      {
        position: "Full Stack Developer",
        company: "Honeyfilm Pvt Ltd.",
        period: "June 2024 - Sept 2024",
        description:
          "Led a 4-member team to develop two scalable apps using Firebase and Flutter. Developed backend with 10+ databases, API calls, and user data management.",
      },
    ],
    projects: [
      {
        name: "Research Paper on Hybrid ML-DL Model",
        description:
          "Co-authored paper on hybrid CatBoost-ANN model for predicting compressive strength with 94% accuracy. Presented at ICDCC 2024 Conference (IEEE).",
      },
      {
        name: "Paperless Scholarship Disbursement System",
        description:
          "Built server-less back-end using Firebase Authentication & Firestore. Designed dashboard with role-based access for 500+ users.",
      },
      {
        name: "MediNet",
        description:
          "Created healthcare system enhancing patient interactions and record management. Implemented appointment scheduling and secure access across four departments.",
      },
    ],
    skills: {
      techStack: [
        "Java",
        "Python",
        "JavaScript",
        "Flutter",
        "MySQL",
        "Firebase",
        "AWS",
        "GCP",
      ],
      frameworks: [
        "Node.js",
        "Flask",
        "Django",
        "FastAPI",
        "TensorFlow",
        "Keras",
      ],
      tools: ["Web/App Development", "Prompt Engineering", "Git", "Postman"],
    },
    certifications: [
      "Cisco: Cybersecurity Essentials",
      "IBM: Web Development with HTML5, CSS3, and JavaScript",
      "IBM: Generative AI-Powered Applications with Python",
      "AWS: Getting Started with Data Analytics on AWS",
      "IBM: Machine Learning with Python",
      "AWS: AWS Academy Cloud Architecting",
    ],
    clubs: {
      position: "President, Milestone Club",
      period: "Sept 2023 - Present",
      description:
        "Managed 150+ participants in hackathons and coding events. Coordinated projects, boosting engagement by 40%.",
    },
    contact: {
      email: "mslalith17@gmail.com",
      linkedin: "linkedin.com/in/lalithvallamkonda",
      github: "github.com/Lalith17",
    },
  };

  // Scroll to bottom of messages when new message is added
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen && messages.length === 0) {
      // Add welcome message when opening chat for the first time
      const welcomeMessage: Message = {
        id: Date.now().toString(),
        text: "Hi there! I'm Lalith's virtual assistant. Feel free to ask me anything about his education, experience, projects, skills, or how I was built!",
        sender: "assistant",
        timestamp: new Date(),
      };
      setMessages([welcomeMessage]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() === "") return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response after a short delay
    setTimeout(() => {
      const response = generateResponse(input.trim());
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: "assistant",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1000);
  };

  // Advanced contextual response generation based on user input
  const generateResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();
    const context: string[] = [];

    // Extract context from previous messages (last 3 messages)
    const recentMessages = messages.slice(-3);
    recentMessages.forEach((msg) => {
      if (msg.sender === "user") {
        context.push(msg.text.toLowerCase());
      }
    });

    // Check if query is a follow-up question
    const isFollowUp =
      context.length > 0 &&
      (lowerQuery.includes("what about") ||
        lowerQuery.includes("how about") ||
        lowerQuery.includes("and") ||
        lowerQuery.includes("also") ||
        lowerQuery.includes("what else") ||
        lowerQuery.startsWith("why") ||
        lowerQuery.startsWith("when") ||
        lowerQuery.startsWith("where") ||
        lowerQuery.length < 15);

    // Education related queries
    if (
      lowerQuery.includes("education") ||
      lowerQuery.includes("study") ||
      lowerQuery.includes("college") ||
      lowerQuery.includes("university") ||
      lowerQuery.includes("degree") ||
      (isFollowUp &&
        context.some(
          (c) =>
            c.includes("education") ||
            c.includes("study") ||
            c.includes("college"),
        ))
    ) {
      if (
        lowerQuery.includes("gpa") ||
        context.some((c) => c.includes("gpa"))
      ) {
        return `Lalith maintains an impressive GPA of 9.17 at VIT-AP University, which places him among the top performers in his class. During his intermediate education, he achieved a GPA of 9.7 in challenging subjects like Mathematics, Physics, and Chemistry.`;
      }

      if (lowerQuery.includes("when") || lowerQuery.includes("year")) {
        return `Lalith began his B.Tech in Computer Science at VIT-AP University in 2022 and is expected to graduate in 2026. Before that, he completed his intermediate education at Resonance Junior College from 2020 to 2022.`;
      }

      return `Lalith is pursuing a B.Tech in Computer Science at VIT-AP University (2022-2026) with a GPA of 9.17. He previously completed his intermediate education at Resonance Junior College (2020-2022) with a GPA of 9.7, studying Mathematics, Physics, and Chemistry. His strong academic background has provided him with a solid foundation in computer science principles and mathematical thinking.`;
    }

    // Experience related queries
    if (
      lowerQuery.includes("experience") ||
      lowerQuery.includes("work") ||
      lowerQuery.includes("job") ||
      lowerQuery.includes("intern") ||
      lowerQuery.includes("career") ||
      (isFollowUp &&
        context.some(
          (c) =>
            c.includes("experience") || c.includes("work") || c.includes("job"),
        ))
    ) {
      if (
        lowerQuery.includes("petthinq") ||
        context.some((c) => c.includes("petthinq"))
      ) {
        return `At PetThinQ Inc. (Feb-May 2025), Lalith worked as a Generative AI Intern where he engineered an AI-ready e-commerce platform. He was the sole developer responsible for building web pages with React.js, creating APIs with FastAPI, and implementing Shopify headless integrations. This experience allowed him to work with cutting-edge AI technologies in a real-world business context.`;
      }

      if (
        lowerQuery.includes("honeyfilm") ||
        context.some((c) => c.includes("honeyfilm"))
      ) {
        return `At Honeyfilm Pvt Ltd. (June-Sept 2024), Lalith served as a Full Stack Developer where he led a 4-member team to develop two scalable applications. He utilized Firebase for backend development, managing 10+ databases, implementing API calls, and handling user data management. This role helped him develop both technical and leadership skills.`;
      }

      return `Lalith has gained valuable industry experience through two key roles: As a Generative AI Intern at PetThinQ Inc. (Feb-May 2025), he engineered an AI-ready e-commerce platform with React.js, FastAPI, and AWS. Previously, as a Full Stack Developer at Honeyfilm Pvt Ltd. (June-Sept 2024), he led a 4-member team to develop scalable apps using Firebase and Flutter. These experiences have given him practical expertise in both frontend and backend development, as well as team leadership.`;
    }

    // Project related queries
    if (
      lowerQuery.includes("project") ||
      lowerQuery.includes("portfolio") ||
      lowerQuery.includes("research") ||
      lowerQuery.includes("paper") ||
      (isFollowUp &&
        context.some(
          (c) =>
            c.includes("project") ||
            c.includes("portfolio") ||
            c.includes("research"),
        ))
    ) {
      if (
        lowerQuery.includes("research") ||
        lowerQuery.includes("paper") ||
        lowerQuery.includes("ml") ||
        lowerQuery.includes("ai") ||
        context.some((c) => c.includes("research") || c.includes("paper"))
      ) {
        return `Lalith co-authored an impressive research paper on a hybrid CatBoost-ANN model for predicting compressive strength with 94% accuracy. This work was presented at the prestigious ICDCC 2024 Conference organized by IEEE. The model combined the strengths of gradient boosting and neural networks to achieve superior prediction performance compared to traditional methods.`;
      }

      if (
        lowerQuery.includes("scholarship") ||
        context.some((c) => c.includes("scholarship"))
      ) {
        return `The Paperless Scholarship Disbursement System is one of Lalith's standout projects. He built a server-less back-end using Firebase Authentication and Firestore, designed a dashboard with role-based access for over 500 users, and implemented real-time data synchronization. This system significantly streamlined the scholarship application and disbursement process.`;
      }

      if (
        lowerQuery.includes("medinet") ||
        lowerQuery.includes("health") ||
        context.some((c) => c.includes("medinet") || c.includes("health"))
      ) {
        return `MediNet is a comprehensive healthcare system Lalith developed to enhance patient interactions and record management. It features appointment scheduling functionality and secure access across four different departments. The system helps healthcare providers manage patient data efficiently while ensuring privacy and security compliance.`;
      }

      if (lowerQuery.includes("github") || lowerQuery.includes("code")) {
        return `You can explore Lalith's projects on his GitHub profile at github.com/Lalith17. His repositories include the code for his research paper on hybrid ML-DL models, the Paperless Scholarship System, and MediNet healthcare application. Each project demonstrates his skills in different technologies and domains.`;
      }

      return `Lalith has worked on several impressive projects: 1) He co-authored a research paper on a hybrid CatBoost-ANN model with 94% accuracy, presented at IEEE's ICDCC 2024 Conference. 2) He built a Paperless Scholarship System with Firebase, featuring role-based access for 500+ users. 3) He created MediNet, a healthcare system for patient interactions and record management with secure access across four departments. All these projects showcase his versatility across different domains and technologies.`;
    }

    // Skills related queries
    if (
      lowerQuery.includes("skill") ||
      lowerQuery.includes("technology") ||
      lowerQuery.includes("tech stack") ||
      lowerQuery.includes("programming") ||
      lowerQuery.includes("language") ||
      (isFollowUp &&
        context.some(
          (c) =>
            c.includes("skill") ||
            c.includes("tech") ||
            c.includes("programming"),
        ))
    ) {
      if (
        lowerQuery.includes("java") ||
        lowerQuery.includes("python") ||
        lowerQuery.includes("javascript")
      ) {
        return `Lalith is proficient in multiple programming languages including Java, Python, and JavaScript. He uses Java for backend development, Python for data science and machine learning projects (including his research paper), and JavaScript for web development with frameworks like React.js. His multi-language expertise allows him to choose the right tool for each specific project requirement.`;
      }

      if (
        lowerQuery.includes("cloud") ||
        lowerQuery.includes("aws") ||
        lowerQuery.includes("firebase") ||
        lowerQuery.includes("gcp")
      ) {
        return `Lalith has strong cloud computing skills, with experience in AWS, Firebase, and Google Cloud Platform (GCP). He's used Firebase extensively for backend development in projects like the Paperless Scholarship System, AWS for his work at PetThinQ Inc., and has certifications in AWS cloud architecture and data analytics.`;
      }

      if (
        lowerQuery.includes("framework") ||
        lowerQuery.includes("react") ||
        lowerQuery.includes("flutter")
      ) {
        return `Lalith works with several frameworks including React.js for web development, Flutter for cross-platform mobile apps, Node.js for backend JavaScript, and Flask/Django/FastAPI for Python web services. He also has experience with TensorFlow and Keras for machine learning projects, as demonstrated in his research paper.`;
      }

      return `Lalith's technical skills span multiple areas: His tech stack includes Java, Python, JavaScript, Flutter, MySQL, Firebase, AWS, and GCP. He's proficient with frameworks like React.js, Node.js, Flask, Django, FastAPI, TensorFlow, and Keras. His toolset includes Web/App Development, Prompt Engineering, Git, and Postman. This diverse skill set allows him to handle full-stack development across various platforms and technologies.`;
    }

    // Certification related queries
    if (
      lowerQuery.includes("certification") ||
      lowerQuery.includes("certificate") ||
      lowerQuery.includes("course") ||
      (isFollowUp &&
        context.some(
          (c) =>
            c.includes("certification") ||
            c.includes("certificate") ||
            c.includes("course"),
        ))
    ) {
      if (
        lowerQuery.includes("aws") ||
        context.some((c) => c.includes("aws"))
      ) {
        return `Lalith holds two AWS certifications: "AWS: Getting Started with Data Analytics on AWS" and "AWS: AWS Academy Cloud Architecting". These certifications validate his skills in cloud architecture and data analytics on the AWS platform, which he's applied in his professional work at PetThinQ Inc.`;
      }

      if (
        lowerQuery.includes("ibm") ||
        context.some((c) => c.includes("ibm"))
      ) {
        return `Lalith has earned several IBM certifications, including "Web Development with HTML5, CSS3, and JavaScript", "Generative AI-Powered Applications with Python", and "Machine Learning with Python". These certifications from IBM demonstrate his expertise in web development, AI applications, and machine learning techniques.`;
      }

      return `Lalith has earned several valuable certifications that complement his academic education: Cisco: Cybersecurity Essentials, IBM: Web Development with HTML5/CSS3/JavaScript, IBM: Generative AI-Powered Applications with Python, AWS: Getting Started with Data Analytics on AWS, IBM: Machine Learning with Python, and AWS: AWS Academy Cloud Architecting. These certifications demonstrate his commitment to continuous learning and professional development.`;
    }

    // Contact related queries
    if (
      lowerQuery.includes("contact") ||
      lowerQuery.includes("email") ||
      lowerQuery.includes("linkedin") ||
      lowerQuery.includes("github") ||
      lowerQuery.includes("reach") ||
      (isFollowUp &&
        context.some(
          (c) =>
            c.includes("contact") || c.includes("email") || c.includes("reach"),
        ))
    ) {
      if (lowerQuery.includes("email")) {
        return `You can contact Lalith directly via email at mslalith17@gmail.com. He typically responds to professional inquiries within 24-48 hours.`;
      }

      if (lowerQuery.includes("linkedin")) {
        return `Lalith's LinkedIn profile can be found at linkedin.com/in/lalithvallamkonda. You can connect with him there to see his professional experience, skills, and recommendations in more detail.`;
      }

      if (lowerQuery.includes("github")) {
        return `Lalith's GitHub profile is available at github.com/Lalith17. There you can explore his code repositories, including projects like his hybrid ML-DL model, Paperless Scholarship System, and MediNet healthcare application.`;
      }

      return `You can contact Lalith through multiple channels: Email him at mslalith17@gmail.com, connect on LinkedIn at linkedin.com/in/lalithvallamkonda, or check out his projects on GitHub at github.com/Lalith17. He's open to discussing project collaborations, job opportunities, or answering questions about his work.`;
    }

    // Club/Leadership related queries
    if (
      lowerQuery.includes("club") ||
      lowerQuery.includes("leadership") ||
      lowerQuery.includes("president") ||
      lowerQuery.includes("extracurricular") ||
      (isFollowUp &&
        context.some(
          (c) =>
            c.includes("club") ||
            c.includes("leadership") ||
            c.includes("president"),
        ))
    ) {
      if (
        lowerQuery.includes("milestone") ||
        context.some((c) => c.includes("milestone"))
      ) {
        return `As President of the Milestone Club since September 2023, Lalith has transformed the organization by implementing structured project management and mentorship programs. The club focuses on coding events, hackathons, and technical skill development for computer science students.`;
      }

      if (
        lowerQuery.includes("achievement") ||
        lowerQuery.includes("accomplish")
      ) {
        return `Under Lalith's leadership, the Milestone Club has seen a 40% increase in member engagement. He's successfully organized multiple hackathons, coding competitions, and technical workshops that have helped members develop practical skills and build impressive portfolios.`;
      }

      return `Lalith has demonstrated strong leadership skills as the President of the Milestone Club since September 2023. In this role, he manages over 150 participants in hackathons and coding events, coordinates various technical projects, and has boosted member engagement by 40%. This experience has helped him develop organizational, communication, and team management skills that complement his technical abilities.`;
    }

    // Chatbot related queries
    if (
      lowerQuery.includes("chatbot") ||
      lowerQuery.includes("assistant") ||
      lowerQuery.includes("how do you work") ||
      lowerQuery.includes("how were you made") ||
      lowerQuery.includes("how were you built")
    ) {
      return `I'm a specialized chatbot created to provide information about Lalith Vallamkonda. I was built using React with TypeScript and styled with Tailwind CSS. I work by analyzing your questions and matching them against a knowledge base of information about Lalith's education, experience, projects, and skills. I also maintain context between messages to provide more relevant responses to follow-up questions. While I'm not powered by a large language model like ChatGPT, I use pattern matching and contextual awareness to simulate natural conversation about Lalith's professional background.`;
    }

    // General information about Lalith
    if (
      lowerQuery.includes("who") ||
      lowerQuery.includes("about") ||
      lowerQuery.includes("tell me") ||
      lowerQuery.includes("lalith") ||
      lowerQuery.includes("introduction") ||
      lowerQuery.includes("background")
    ) {
      return `Megha Sai Lalith Vallamkonda is a Computer Science student at VIT-AP University (2022-2026) with a strong academic record (GPA: 9.17) and practical experience in software development. He has worked as a Generative AI Intern at PetThinQ Inc. and as a Full Stack Developer at Honeyfilm Pvt Ltd. His technical skills include Java, Python, JavaScript, Flutter, Firebase, and AWS. He's also co-authored a research paper on hybrid ML-DL models presented at an IEEE conference. Beyond academics, he serves as President of the Milestone Club, managing 150+ participants in technical events. Lalith is passionate about building scalable applications and exploring AI/ML technologies.`;
    }

    // Default response for other queries
    return `I'm not sure about that specific information about Lalith. Would you like to know about his education, work experience, projects, skills, or how to contact him? You can also ask about his research paper, leadership experience, or certifications.`;
  };

  return (
    <>
      {/* Chat toggle button */}
      <motion.button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Bot className="w-6 h-6" />}
      </motion.button>

      {/* Chat window */}
      <motion.div
        className="fixed bottom-24 right-6 z-50 w-80 md:w-96 h-96 bg-gray-900/95 backdrop-blur-md rounded-xl border border-gray-700 shadow-xl overflow-hidden flex flex-col"
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        animate={{
          opacity: isOpen ? 1 : 0,
          y: isOpen ? 0 : 20,
          scale: isOpen ? 1 : 0.9,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        style={{ display: isOpen ? "flex" : "none" }}
      >
        {/* Chat header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-4 flex items-center">
          <div className="bg-white/20 p-2 rounded-full mr-3">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-white font-medium">Lalith's Assistant</h3>
            <p className="text-white/70 text-xs">
              Ask me anything about Lalith
            </p>
          </div>
        </div>

        {/* Messages container */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-2 ${message.sender === "user" ? "bg-purple-600 text-white" : "bg-gray-800 text-white"}`}
              >
                <div className="flex items-center mb-1">
                  <div className="p-1 rounded-full bg-black/20 mr-2">
                    {message.sender === "user" ? (
                      <User className="w-3 h-3 text-white" />
                    ) : (
                      <Sparkles className="w-3 h-3 text-white" />
                    )}
                  </div>
                  <span className="text-xs text-white/70">
                    {message.sender === "user" ? "You" : "Assistant"}
                  </span>
                </div>
                <p className="text-sm">{message.text}</p>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-800 text-white max-w-[80%] rounded-2xl px-4 py-3">
                <div className="flex space-x-2">
                  <div
                    className="w-2 h-2 rounded-full bg-gray-500 animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  ></div>
                  <div
                    className="w-2 h-2 rounded-full bg-gray-500 animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  ></div>
                  <div
                    className="w-2 h-2 rounded-full bg-gray-500 animate-bounce"
                    style={{ animationDelay: "600ms" }}
                  ></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input form */}
        <form
          onSubmit={handleSubmit}
          className="p-3 border-t border-gray-700 bg-gray-800"
        >
          <div className="flex">
            <Input
              type="text"
              value={input}
              onChange={handleInputChange}
              placeholder="Ask about Lalith..."
              className="flex-1 bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus-visible:ring-purple-500"
            />
            <Button
              type="submit"
              size="icon"
              className="ml-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              disabled={isTyping}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </motion.div>
    </>
  );
};

export default ChatAssistant;
