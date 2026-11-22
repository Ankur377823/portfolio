import { useRef } from 'react';
import { m, useScroll, useTransform } from 'motion/react';
import { about, education, experience, milestones, skills } from '../data';
import { Heading, Note, Reveal, Squiggle, Tick, viewportOnce } from './Ink';

export function About() {
  return (
    <section id="about" aria-labelledby="about-h">
      <Heading page="p. 1 — about" title="About me" id="about-h" />
      <div className="about">
        <div className="about__text">
          {about.map((para, i) => (
            <Reveal as="p" key={i} delay={i * 0.08}>
              {para}
            </Reveal>
          ))}
        </div>
        <Reveal className="about__card" delay={0.15}>
          <span className="mono muted">currently</span>
          <p>
            Finishing my final year at <Squiggle>NIT Calicut</Squiggle>, open to software engineering roles from
            2027.
          </p>
          <span className="mono muted">last role</span>
          <p>SWE Intern · Wingback Security · May–Jul 2026</p>
          <span className="mono muted">daily tools</span>
          <p>Python, FastAPI, SQL, Claude Code, Cursor</p>
        </Reveal>
      </div>
    </section>
  );
}

export function Experience() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 60%'] });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="experience" aria-labelledby="exp-h">
      <Heading page="p. 3 — where I've been" title="Experience" id="exp-h" />
      <p className="section__intro">Internship, leadership and student engineering work.</p>
      <div className="timeline" ref={ref}>
        <m.span className="timeline__line" style={{ scaleY }} aria-hidden="true" />
        {experience.map((e, i) => (
          <Reveal className="t" key={e.role} delay={0.05}>
            <m.span
              className="t__dot"
              aria-hidden="true"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={viewportOnce}
              transition={{ type: 'spring', stiffness: 400, damping: 15, delay: 0.2 }}
            />
            <div className="mono t__when">{e.when}</div>
            <h3>{e.role}</h3>
            <div className="t__org">{e.org}</div>
            <ul>
              {e.points.map(([title, text]) => (
                <li key={text}>
                  {title && <b>{title}: </b>}
                  {text}
                </li>
              ))}
            </ul>
            <div className="chips">
              {e.tags.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
            {e.note && (
              <Note tilt={1.5} size="23px" className="t__note" delay={0.5}>
                {e.note}
              </Note>
            )}
            {i === 0 && <span className="sr-only">Current or most recent role.</span>}
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function Milestones() {
  return (
    <section id="milestones" aria-labelledby="ms-h">
      <Heading page="p. 4 — ticked off" title="Milestones" id="ms-h" />
      <p className="section__intro">National competitions, competitive programming and a live product launch.</p>
      <ul className="milestones">
        {milestones.map((m, i) => (
          <Reveal as="li" key={m.title} delay={i * 0.08} className="milestone">
            <Tick delay={0.25 + i * 0.12} />
            <div>
              <span className="mono muted">{m.label}</span>
              <h3>{m.title}</h3>
              <p>{m.text}</p>
            </div>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}

export function Tools() {
  return (
    <section id="tools" aria-labelledby="tools-h">
      <Heading page="p. 5 — my toolbox" title="Skills" id="tools-h" />
      <p className="section__intro">Languages, frameworks and tools I use to build and ship production systems.</p>
      <div className="skills">
        {skills.map((s, i) => (
          <Reveal
            key={s.group}
            className="skill"
            delay={i * 0.07}
            whileHover={{ rotate: i % 2 ? 0.8 : -0.8, y: -3 }}
          >
            <h4 className="hand">{s.group}</h4>
            <ul className="mono">
              {s.items.map((it) => (
                <li key={it}>{it}</li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function Education() {
  return (
    <section id="education" aria-labelledby="edu-h">
      <Heading page="p. 6 — school" title="Education" id="edu-h" />
      <div className="edu">
        {education.map((e, i) => (
          <Reveal className="edu__row" key={e.school} delay={i * 0.08}>
            <span className="mono muted">{e.when}</span>
            <div>
              <h3>{e.school}</h3>
              <div>{e.degree}</div>
              {e.text && <p className="muted">{e.text}</p>}
            </div>
            <span className="edu__score hand">{e.score}</span>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
