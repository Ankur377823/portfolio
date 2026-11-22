import { m } from 'motion/react';

const once = { once: true, margin: '0px 0px -12% 0px' };
const ease = [0.22, 1, 0.36, 1];

/** Fades and lifts content in the first time it scrolls into view. */
export function Reveal({ as = 'div', delay = 0, y = 18, children, ...rest }) {
  const Tag = m[as];
  return (
    <Tag
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={once}
      transition={{ duration: 0.7, delay, ease }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/** Handwritten margin note that "writes" itself left to right. */
export function Note({ children, color = 'blue', tilt = -2, size, delay = 0.15, className = '', style }) {
  return (
    <m.span
      className={`note note--${color} ${className}`}
      style={{ rotate: tilt, fontSize: size, ...style }}
      initial={{ clipPath: 'inset(-20% 100% -20% 0)' }}
      whileInView={{ clipPath: 'inset(-20% 0% -20% 0)' }}
      viewport={once}
      transition={{ duration: 1.1, delay, ease: 'easeInOut' }}
    >
      {children}
    </m.span>
  );
}

/** Section heading with a highlighter stroke swiped behind it. */
export function Heading({ page, title, id }) {
  return (
    <div className="heading">
      <Reveal as="span" className="mono heading__page" y={8}>
        {page}
      </Reveal>
      <h2 id={id}>
        <m.span
          className="heading__marker"
          aria-hidden="true"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={once}
          transition={{ duration: 0.6, delay: 0.25, ease }}
        />
        <Reveal as="span" className="heading__text" y={10}>
          {title}
        </Reveal>
      </h2>
    </div>
  );
}

/** Draws a rough pen circle around its children. */
export function Circled({ children, color = 'var(--red)', delay = 0.6 }) {
  return (
    <span className="circled">
      {children}
      <svg viewBox="0 0 120 50" preserveAspectRatio="none" aria-hidden="true">
        <m.path
          d="M8 26 C 6 10, 40 4, 64 5 C 96 6, 116 14, 113 28 C 110 42, 74 47, 52 46 C 24 45, 4 38, 9 22 C 12 13, 26 9, 38 8"
          fill="none"
          stroke={color}
          strokeWidth="2.2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={once}
          transition={{ duration: 0.9, delay, ease: 'easeInOut' }}
        />
      </svg>
    </span>
  );
}

/** Wavy pen underline that draws in. */
export function Squiggle({ children, color = 'var(--blue)', delay = 0.4 }) {
  return (
    <span className="squiggle">
      {children}
      <svg viewBox="0 0 200 10" preserveAspectRatio="none" aria-hidden="true">
        <m.path
          d="M2 6 Q 12 1, 22 6 T 42 6 T 62 6 T 82 6 T 102 6 T 122 6 T 142 6 T 162 6 T 182 6 T 198 5"
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={once}
          transition={{ duration: 0.8, delay, ease: 'easeInOut' }}
        />
      </svg>
    </span>
  );
}

/** Small hand-drawn arrow used between diagram boxes. */
export function Arrow({ delay = 0 }) {
  return (
    <svg className="arrow" viewBox="0 0 40 20" aria-hidden="true">
      <m.path
        d="M2 11 C 12 8, 24 13, 34 10 M27 4 L35 10 L28 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={once}
        transition={{ duration: 0.5, delay, ease: 'easeOut' }}
      />
    </svg>
  );
}

/** A tick mark that draws itself into a box. */
export function Tick({ delay = 0 }) {
  return (
    <svg className="tick" viewBox="0 0 28 28" aria-hidden="true">
      <rect x="3" y="3" width="22" height="22" rx="2" fill="#fff" stroke="var(--ink)" strokeWidth="2" />
      <m.path
        d="M7 15 L12 20 L23 6"
        fill="none"
        stroke="var(--red)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={once}
        transition={{ duration: 0.45, delay, ease: 'easeOut' }}
      />
    </svg>
  );
}

export const viewportOnce = once;
export const easeOut = ease;
