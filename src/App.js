import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Projects from "./components/Projects";
import BlogList from "./components/BlogList";
// import BlogPost from "./components/BlogPost";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import SelectedWork from "./components/SelectedWork";
import About from "./components/About";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import GlobalStyles from "./components/GlobalStyles";

// Modified Navbar component with navigation links

// Home page component
const Home = () => {
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
    <BrowserRouter>
      <main className="__className_8d54fb">
        <div className="container mx-auto max-w-5xl my-10">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/blog" element={<BlogList />} />
            {/* <Route path="/blog/:id" element={<BlogPost />} /> */}
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
          <GlobalStyles />
        </div>
      </main>
    </BrowserRouter>
  );
};

export default App;
