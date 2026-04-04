import { useEffect } from 'react';
import './App.css';
import Navbar    from './components/Navbar';
import Hero      from './components/Hero';
import Skills    from './components/Skills';
import Projects  from './components/Projects';
import Research  from './components/Research';
import Experience from './components/Experience';
import Contact   from './components/Contact';
import Footer    from './components/Footer';

// Scroll-reveal: adds .visible class when element enters viewport
function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } }),
      { threshold: 0.12 }
    );
    els.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

export default function App() {
  useScrollReveal();

  return (
    <div className="app">
      <Navbar />
      <main>
        <Hero />
        <div className="reveal" id="about">
          {/* About is embedded in Hero; this anchor exists for nav */}
        </div>
        <div className="reveal" id="skills-wrap">
          <Skills />
        </div>
        <div className="reveal" id="projects-wrap">
          <Projects />
        </div>
        <div className="reveal" id="research-wrap">
          <Research />
        </div>
        <div className="reveal" id="experience-wrap">
          <Experience />
        </div>
        <div className="reveal" id="contact-wrap">
          <Contact />
        </div>
      </main>
      <Footer />
    </div>
  );
}
