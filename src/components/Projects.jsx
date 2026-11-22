import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, m } from 'motion/react';
import { copy, projects } from '../data';
import { Arrow, Heading, Note, Reveal, viewportOnce } from './Ink';

const ease = [0.22, 1, 0.36, 1];

function Diagram({ diagram, compact = false }) {
  return (
    <Reveal className={`diagram ${compact ? 'diagram--compact' : ''}`} y={10}>
      {diagram.rows.map((row, r) => (
        <div key={r} className={`flow ${r > 0 ? 'flow--sub' : ''}`}>
          {r > 0 && <span className="flow__branch" aria-hidden="true">↳</span>}
          {row.map((raw, i) => {
            const hi = raw.startsWith('*');
            const label = hi ? raw.slice(1) : raw;
            const delay = 0.15 + (r * row.length + i) * 0.12;
            return (
              <span key={label} className="flow__step">
                {i > 0 && (r === 0 ? <Arrow delay={delay - 0.06} /> : <span className="flow__dot">·</span>)}
                <m.span
                  className={`box ${hi ? 'box--hi' : ''}`}
                  initial={{ opacity: 0, scale: 0.85, y: 6 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={viewportOnce}
                  whileHover={{ x: -2, y: -2, boxShadow: '5px 5px 0 var(--ink)' }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20, delay }}
                >
                  {label}
                </m.span>
              </span>
            );
          })}
        </div>
      ))}
      {diagram.note && (
        <Note color="red" tilt={1.5} size="22px" delay={0.9} className="diagram__note">
          {diagram.note}
        </Note>
      )}
    </Reveal>
  );
}

/** The long-form write-up: problem, what I built, details, full stack. */
function CaseBody({ p }) {
  const cs = p.caseStudy;
  return (
    <div className="case__paper">
      <div className="case__cols">
        <div>
          <h4 className="hand">the problem</h4>
          <p>{cs.problem}</p>
        </div>
        <div>
          <h4 className="hand">what I built</h4>
          <p>{cs.solution}</p>
        </div>
      </div>
      <h4 className="hand">the details</h4>
      <ul className="case__list">
        {cs.features.map((f) => (
          <li key={f}>{f}</li>
        ))}
      </ul>
      <div className="chips">
        {cs.stack.map((t) => (
          <span key={t}>{t}</span>
        ))}
      </div>
      {cs.liveNote && <p className="mono case__live">ⓘ {cs.liveNote}</p>}
    </div>
  );
}

// Render's free tier puts idle servers to sleep, so the first visit can be slow.
const sleepsWhenIdle = (href) => href.includes('.onrender.com');

function Links({ p, children }) {
  const slow = p.links.some((l) => sleepsWhenIdle(l.href));
  return (
    <>
      <div className="proj__links mono">
        {p.links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            target="_blank"
            rel="noopener"
            title={sleepsWhenIdle(l.href) ? 'Free server: the first load can take about 30 seconds' : undefined}
          >
            {l.label} ↗
          </a>
        ))}
        {children}
      </div>
      {slow && (
        <p className="wake mono">
          <span aria-hidden="true">zZ</span> free server, so the first load can take ~30s while it wakes up
        </p>
      )}
    </>
  );
}

function Meta({ p }) {
  return (
    <div className="mono proj__meta">
      {p.live && (
        <span className="live">
          <span className="live__dot" aria-hidden="true" /> live
        </span>
      )}
      {p.privateRepo && <span>private repo</span>}
      <span>{p.kind}</span>
    </div>
  );
}

/* ---------- featured projects: full write-up, case notes unfold inline ---------- */

function FeaturedProject({ p, index }) {
  const [open, setOpen] = useState(false);
  return (
    <article className="proj">
      <Reveal className="proj__main">
        <span className="mono muted proj__num">{String(index + 1).padStart(2, '0')}</span>
        <h3>
          {p.title} <span className="proj__sub">— {p.subtitle}</span>
        </h3>
        <Meta p={p} />
        <p className="proj__summary">{p.summary}</p>

        {p.stats && (
          <div className="proj__stats">
            {p.stats.map((s) => (
              <div key={s.l}>
                <b>{s.n}</b>
                <span className="mono">{s.l}</span>
              </div>
            ))}
          </div>
        )}

        <Diagram diagram={p.diagram} />

        {p.highlights && (
          <dl className="proj__highlights">
            {p.highlights.map(([t, d]) => (
              <div key={t}>
                <dt>{t}</dt>
                <dd>{d}</dd>
              </div>
            ))}
          </dl>
        )}

        {p.bullets && (
          <ul className="proj__bullets">
            {p.bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        )}

        <Links p={p}>
          <button className="linklike" aria-expanded={open} aria-controls={`case-${p.id}`} onClick={() => setOpen((o) => !o)}>
            {open ? 'fold case notes ↑' : 'unfold case notes ↓'}
          </button>
        </Links>

        <AnimatePresence initial={false}>
          {open && (
            <m.div
              id={`case-${p.id}`}
              className="case"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.45, ease }}
            >
              <CaseBody p={p} />
            </m.div>
          )}
        </AnimatePresence>
      </Reveal>

      <aside className="proj__aside">
        {p.margin && (
          <Note tilt={2} color="red" size="23px" delay={0.4}>
            {p.margin}
          </Note>
        )}
        <Reveal className="chips" delay={0.2} y={8}>
          {p.tags.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </Reveal>
      </aside>
    </article>
  );
}

/* ---------- smaller projects: compact cards, case notes in a slide-up sheet ---------- */

function CaseSheet({ p, onClose }) {
  const closeRef = useRef(null);

  useEffect(() => {
    const prevFocus = document.activeElement;
    closeRef.current?.focus();
    document.body.style.overflow = 'hidden';
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
      prevFocus?.focus?.();
    };
  }, [onClose]);

  return (
    <m.div
      className="sheet"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
      onClick={onClose}
    >
      <m.div
        className="sheet__page"
        role="dialog"
        aria-modal="true"
        aria-labelledby={`sheet-${p.id}`}
        initial={{ y: 60, rotate: 1.5, opacity: 0 }}
        animate={{ y: 0, rotate: 0, opacity: 1 }}
        exit={{ y: 40, rotate: -1, opacity: 0, transition: { duration: 0.2, ease: 'easeIn' } }}
        transition={{ type: 'spring', stiffness: 220, damping: 24 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sheet__head">
          <div>
            <span className="mono muted">case notes</span>
            <h3 id={`sheet-${p.id}`}>{p.title}</h3>
          </div>
          <button ref={closeRef} className="btn" onClick={onClose}>
            close ✕
          </button>
        </div>
        <CaseBody p={p} />
        <Links p={p} />
      </m.div>
    </m.div>
  );
}

function CompactProject({ p, index, onOpen }) {
  return (
    <Reveal
      as="article"
      className="card"
      delay={(index % 3) * 0.08}
      whileHover={{ y: -4, rotate: index % 2 ? 0.4 : -0.4 }}
    >
      <span className="mono muted proj__num">{String(index + 1).padStart(2, '0')}</span>
      <h3>{p.title}</h3>
      <Meta p={p} />
      <p className="card__summary">{p.summary}</p>
      <Diagram diagram={p.diagram} compact />
      <div className="chips">
        {p.tags.map((t) => (
          <span key={t}>{t}</span>
        ))}
      </div>
      <Links p={p}>
        <button className="linklike" onClick={() => onOpen(p)} aria-haspopup="dialog">
          read case notes →
        </button>
      </Links>
    </Reveal>
  );
}

export default function Projects() {
  const [sheet, setSheet] = useState(null);
  const closeSheet = useCallback(() => setSheet(null), []);
  const featured = projects.filter((p) => p.featured);
  const smaller = projects.filter((p) => !p.featured);

  return (
    <section id="work" aria-labelledby="work-h">
      <Heading page="p. 2 — things I built" title="Projects" id="work-h" />
      <p className="section__intro">
        {copy.projectsIntro}
      </p>

      {featured.map((p, i) => (
        <FeaturedProject key={p.id} p={p} index={i} />
      ))}

      <div className="smaller">
        <Reveal as="h3" className="hand smaller__title">
          {copy.smallerTitle}
        </Reveal>
        <div className="cards">
          {smaller.map((p, i) => (
            <CompactProject key={p.id} p={p} index={featured.length + i} onOpen={setSheet} />
          ))}
        </div>
      </div>

      <AnimatePresence>{sheet && <CaseSheet key={sheet.id} p={sheet} onClose={closeSheet} />}</AnimatePresence>
    </section>
  );
}
