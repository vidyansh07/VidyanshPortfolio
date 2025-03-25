import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { motion } from "framer-motion";

import BlogListPage from "./components/BlogListPage";
import BlogDetailsPage from "./components/BlogDetailsPage";
import BlogAdminPage from "./components/BlogAdminPage";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import SelectedWork from "./components/SelectedWork";
import About from "./components/About";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import GlobalStyles from "./components/GlobalStyles";


// Home page component
const Main = () => {
  return (
    <>
      <Hero />
      <SelectedWork />
      <About />
      <Skills />
      <Contact />
    </>
  );
};

// Main App component with routing
const App = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex-grow"
        >
          <div className="container mx-auto max-w-5xl my-10">
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/blogs" element={<BlogListPage />} />
              <Route path="/blog/:id" element={<BlogDetailsPage />} />
              <Route path="/hacking" element={<BlogAdminPage />} />
              <Route path="/projects" element={<SelectedWork />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
            <GlobalStyles />
          </div>
        </motion.main>
        <footer className="bg-gray-100 py-6 text-center">
          <p className="text-gray-600">
            © {new Date().getFullYear()} My Blog. All rights reserved.
          </p>
        </footer>
      </div>
    </Router>
  );
};

export default App;