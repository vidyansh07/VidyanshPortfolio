import React, { useState } from 'react';
import { motion } from 'framer-motion';
// import { ExternalLink, GitHub, ArrowRight } from 'lucide-react';

const ProjectCard = ({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.2,
      }
    },
    hover: {
      y: -5,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <motion.a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      className="p-5 m-2 flex flex-col items-start bg-gray-50 rounded-3xl cursor-pointer hover:bg-gray-100 text-left transform transition-all duration-300 relative overflow-hidden group"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="w-full h-72 rounded-2xl relative overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10"
          animate={{ opacity: isHovered ? 1 : 0 }}
        >
          <div className="flex gap-4">
            {/* <ExternalLink className="text-white w-6 h-6" />
            {project.github && (
              <GitHub className="text-white w-6 h-6" />
            )} */}
          </div>
        </motion.div>
        <motion.img
          src={project.image}
          alt={project.title}
          className="object-cover w-full h-full rounded-2xl bg-white shadow-xl transform transition-transform duration-700"
          animate={{
            scale: isHovered ? 1.05 : 1,
          }}
        />
      </div>
      <div className="mt-4 space-y-2">
        <h3 className="text-2xl font-medium group-hover:text-blue-600 transition-colors duration-300">
          {project.title}
        </h3>
        <p className="opacity-50 text-md line-clamp-2">
          {project.description}
        </p>
        <div className="flex gap-2 flex-wrap mt-2">
          {project.technologies.map((tech, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-gray-200 rounded-full text-sm text-gray-700"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.a>
  );
};

const SelectedWork = () => {
  const projects = [
    {
      title: "Ecoclean",
      description: "A comprehensive project management solution with real-time updates and team collaboration features.",
      image: "https://images.pexels.com/photos/18794597/pexels-photo-18794597/free-photo-of-sanitation-worker-leaning-on-a-garbage-truck.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      link: "https://project-manager.example.com",
      github: "https://github.com/username/project-manager",
      technologies: ["React", "Node.js", "MongoDB"]
    },
    {
      title: "AI Analytics Dashboard",
      description: "Interactive analytics platform powered by AI for data-driven insights and decision making.",
      image: "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      link: "https://ai-analytics.example.com",
      technologies: ["Python", "TensorFlow", "React"]
    },
    {
      title: "E-commerce Platform",
      description: "Modern e-commerce solution with advanced product management and payment integration.",
      image: "https://images.pexels.com/photos/7621355/pexels-photo-7621355.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      link: "https://ecommerce.example.com",
      technologies: ["Next.js", "Stripe", "PostgreSQL"]
    },
    {
      title: "Social Media App",
      description: "Feature-rich social media application with real-time messaging and content sharing.",
      image: "https://images.pexels.com/photos/1092671/pexels-photo-1092671.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      link: "https://social.example.com",
      technologies: ["React Native", "Firebase", "Redux"]
    }
  ];

  return (
    <section className="text-center mt-20 flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full"
      >
        <h2 className="text-4xl font-black mb-4">Selected Work</h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-10">
          Here are some of my featured projects that showcase my expertise in software development and problem-solving.
        </p>
        
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>

        <motion.button
          className="relative gradient-border m-1 px-6 py-3 rounded-xl flex items-center justify-center bg-black hover:bg-white hover:text-black opacity-95 hover:opacity-100 text-white mt-10 gap-2 group mx-auto"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          See More Projects
          {/* <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" /> */}
        </motion.button>
      </motion.div>
    </section>
  );
};

export default SelectedWork;