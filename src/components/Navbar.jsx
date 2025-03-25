import React, { useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { path: "/projects", label: "Projects" },
    { path: "/blogs", label: "Blog" },
    {path: "/contact", label: "Contact"},
    {path: "/about", label: "About"}
  ];

  // Variants for menu animations
  const menuVariants = {
    hidden: { 
      opacity: 0, 
      y: -20,
      transition: {
        duration: 0.3
      }
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1
      }
    }
  };

  const menuItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm"
    >
      <div className="container mx-auto max-w-5xl px-4 py-6 flex items-center justify-between">
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link 
            to="/" 
            className="text-xl font-bold text-gray-800 hover:text-blue-600 transition-colors"
          >
            vidyansh tripathi
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {menuItems.map((item) => (
            <motion.div
              key={item.path}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to={item.path}
                className={`
                  text-gray-600 
                  hover:text-blue-600 
                  transition-colors 
                  ${location.pathname === item.path 
                    ? 'text-blue-600 font-semibold' 
                    : ''
                  }
                `}
              >
                {item.label}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-600 flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            {!isMenuOpen && "Menu"}
          </motion.button>

          {/* Mobile Menu Dropdown */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={menuVariants}
                className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden"
              >
                {menuItems.map((item) => (
                  <motion.div
                    key={item.path}
                    variants={menuItemVariants}
                  >
                    <Link
                      to={item.path}
                      onClick={() => setIsMenuOpen(false)}
                      className={`
                        block px-4 py-2 
                        ${location.pathname === item.path 
                          ? 'bg-blue-50 text-blue-600 font-semibold' 
                          : 'text-gray-700 hover:bg-gray-100'
                        }
                        transition-colors
                      `}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;