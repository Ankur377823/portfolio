import { useEffect, useState } from 'react';
import { AnimatePresence, m, useScroll, useSpring } from 'motion/react';
import { profile, sections } from '../data';

/** Tracks which section is currently in the middle of the screen. */
export function useActiveSection() {
  const [active, setActive] = useState('top');
  useEffect(() => {
    // The active section is the last one whose top has passed 45% of the screen; above About it's "top".
    const update = () => {
      const line = window.innerHeight * 0.45;
      let current = 'top';
      for (const s of sections) {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top <= line) current = s.id;
      }
      setActive(current);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);
  return active;
}

/** A blue ink line across the top that fills as you read. */
export function ScrollInk() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.3 });
  return <m.div className="scroll-ink" style={{ scaleX }} aria-hidden="true" />;
}

export function Header({ active }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
  }, [open]);

  return (
    <header className="header">
      <a href="#top" className="hand header__logo" aria-label="Back to top">
        Ankur's notebook
      </a>
      <nav className="header__nav mono" aria-label="Sections">
        {sections.map((s) => (
          <a key={s.id} href={`#${s.id}`} className={active === s.id ? 'is-active' : ''}>
            {s.label}
          </a>
        ))}
        <a href={profile.resume} target="_blank" rel="noopener">
          resume ↗
        </a>
      </nav>
      <button
        className="header__menu mono"
        aria-expanded={open}
        aria-controls="index-card"
        onClick={() => setOpen((o) => !o)}
      >
        {open ? 'close' : 'index'}
      </button>

      <AnimatePresence>
        {open && (
          <m.div
            id="index-card"
            className="index-card"
            initial={{ opacity: 0, y: -16, rotate: -3 }}
            animate={{ opacity: 1, y: 0, rotate: -1 }}
            exit={{ opacity: 0, y: -12, rotate: -3 }}
            transition={{ type: 'spring', stiffness: 260, damping: 22 }}
          >
            <span className="hand index-card__title">contents</span>
            <ol>
              {sections.map((s, i) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} onClick={() => setOpen(false)}>
                    <span>{s.label}</span>
                    <span className="mono">p. {i + 1}</span>
                  </a>
                </li>
              ))}
              <li>
                <a href={profile.resume} target="_blank" rel="noopener">
                  <span>resume</span>
                  <span className="mono">↗</span>
                </a>
              </li>
            </ol>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/** Coloured bookmark tabs on the right edge (desktop only). */
export function PageTabs({ active }) {
  return (
    <nav className="tabs" aria-label="Page tabs">
      {sections.map((s, i) => (
        <m.a
          key={s.id}
          href={`#${s.id}`}
          className={`tabs__tab tabs__tab--${i % 4}`}
          animate={{ x: active === s.id ? -14 : 0 }}
          whileHover={{ x: -10 }}
          transition={{ type: 'spring', stiffness: 400, damping: 28 }}
        >
          {s.label}
        </m.a>
      ))}
    </nav>
  );
}

export function Footer() {
  return (
    <footer className="footer mono">
      <span>© {new Date().getFullYear()} {profile.name}</span>
      <span>last page edited Nov 2026 · drawn by hand, mostly</span>
      <a href="#top">back to p. 1 ↑</a>
    </footer>
  );
}
