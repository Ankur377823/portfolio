import { LazyMotion, MotionConfig, domAnimation } from 'motion/react';
import { Footer, Header, PageTabs, ScrollInk, useActiveSection } from './components/Chrome';
import Hero from './components/Hero';
import Projects from './components/Projects';
import { About, Education, Experience, Milestones, Tools } from './components/Sections';
import Contact from './components/Contact';

export default function App() {
  const active = useActiveSection();
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <a className="skip" href="#main">
          Skip to content
        </a>
        <ScrollInk />
        <div className="margin-line" aria-hidden="true" />
        <PageTabs active={active} />
        <div className="page">
          <Header active={active} />
          <main id="main">
            <Hero />
            <About />
            <Projects />
            <Experience />
            <Milestones />
            <Tools />
            <Education />
            <Contact />
          </main>
          <Footer />
        </div>
      </MotionConfig>
    </LazyMotion>
  );
}
