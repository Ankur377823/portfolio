import { m } from 'motion/react';
import { copy, profile, stickies } from '../data';
import { Circled, Note } from './Ink';

const ease = [0.22, 1, 0.36, 1];

function Name() {
  const words = profile.name.split(' ');
  return (
    <h1 className="hero__name">
      {words.map((w, i) => (
        <span key={w} className="hero__word">
          <m.span
            initial={{ y: '105%' }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, delay: 0.15 + i * 0.12, ease }}
          >
            {w}
          </m.span>
        </span>
      ))}
    </h1>
  );
}

function Polaroid() {
  return (
    <m.figure
      className="polaroid"
      initial={{ opacity: 0, y: -40, rotate: 10 }}
      animate={{ opacity: 1, y: 0, rotate: 3 }}
      whileHover={{ rotate: 0, scale: 1.03 }}
      transition={{ type: 'spring', stiffness: 120, damping: 14, delay: 0.5 }}
    >
      <m.span
        className="tape"
        aria-hidden="true"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.4, delay: 1.1, ease }}
      />
      <img src={profile.photo} alt={`Portrait of ${profile.name}`} width="900" height="1080" />
      <figcaption className="hand">me, 2026</figcaption>
    </m.figure>
  );
}

const stickyTilt = [2, -2.5, 1.5, -1];

function Sticky({ s, i }) {
  return (
    <m.div
      className={`sticky sticky--${s.color}`}
      initial={{ opacity: 0, y: -50, rotate: stickyTilt[i] - 10 }}
      animate={{ opacity: 1, y: 0, rotate: stickyTilt[i] }}
      whileHover={{ rotate: 0, y: -6, scale: 1.04 }}
      transition={{ type: 'spring', stiffness: 160, damping: 13, delay: 1.0 + i * 0.12 }}
    >
      <b>{s.big}</b>
      {s.text}
    </m.div>
  );
}

export default function Hero() {
  return (
    <section className="hero" id="top" aria-label="Introduction">
      <div className="hero__grid">
        <div>
          <m.span
            className="mono muted"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.05 }}
          >
            p. 0 — who's this
          </m.span>
          <Name />
          <Note size="clamp(22px, 3vw, 28px)" delay={0.7} className="hero__note">
            {copy.heroNote || `${profile.role.toLowerCase()} — ${profile.focus} ↓`}
          </Note>
          <m.p
            className="hero__lede"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9, ease }}
          >
            {copy.heroLede ? (
              <>
                {copy.heroLede[0]} <Circled delay={1.6}>{copy.heroLede[1]}</Circled>
                {copy.heroLede[2]}
              </>
            ) : (
              <>
                I build backend systems, AI automation and machine learning pipelines that{' '}
                <Circled delay={1.6}>run in production</Circled>. Right now I'm finishing my B.Tech at NIT
                Calicut, fresh off an internship at Wingback Security.
              </>
            )}
          </m.p>
          <m.div
            className="hero__actions"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.1, ease }}
          >
            <a className="btn btn--ink" href="#contact">
              write to me
            </a>
            <a className="btn" href={profile.resume} target="_blank" rel="noopener">
              read my resume ↗
            </a>
            <a className="mono hero__mail" href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
          </m.div>
        </div>
        <Polaroid />
      </div>

      <div className="stickies">
        {stickies.map((s, i) => (
          <Sticky key={s.text} s={s} i={i} />
        ))}
      </div>
    </section>
  );
}
