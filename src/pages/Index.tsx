import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Hero } from "@/components/Hero";
import { Projects } from "@/components/Projects";
import { Experience } from "@/components/Experience";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Contact } from "@/components/Contact";
import { BackToTop } from "@/components/BackToTop";

const Index = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash === "#projects") {
      // wait a tick to ensure components are mounted
      setTimeout(() => {
        document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
      }, 0);
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <About />
      <Projects />
      <Experience />
      <Skills />
      <Contact />
      <BackToTop />
    </div>
  );
};

export default Index;
