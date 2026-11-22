import { useState } from 'react';
import { AnimatePresence, m } from 'motion/react';
import { copy, profile, WEB3FORMS_KEY } from '../data';
import { Heading, Note, Reveal } from './Ink';

function CopyEmail() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    let ok = false;
    try {
      await navigator.clipboard.writeText(profile.email);
      ok = true;
    } catch {
      // Older browsers and some embedded views block the async clipboard; fall back to a hidden textarea.
      const ta = document.createElement('textarea');
      ta.value = profile.email;
      ta.setAttribute('readonly', '');
      ta.style.cssText = 'position:absolute;left:-9999px';
      document.body.appendChild(ta);
      ta.select();
      ok = document.execCommand('copy');
      ta.remove();
    }
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    }
  };
  return (
    <span className="copy">
      <a className="envelope__email" href={`mailto:${profile.email}`}>
        {profile.email}
      </a>
      <button className="copy__btn mono" onClick={copy} aria-label="Copy email address">
        copy
      </button>
      <AnimatePresence>
        {copied && (
          <m.span
            className="copy__done hand"
            role="status"
            initial={{ opacity: 0, y: 6, rotate: -6 }}
            animate={{ opacity: 1, y: 0, rotate: -4 }}
            exit={{ opacity: 0, y: -6 }}
          >
            copied!
          </m.span>
        )}
      </AnimatePresence>
    </span>
  );
}

function ContactForm() {
  const [state, setState] = useState({ status: 'idle', message: '' });

  const onSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const name = form.elements.name.value.trim();
    setState({ status: 'sending', message: '' });
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(form),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || json.success === false) throw new Error(json.message || `status ${res.status}`);
      form.reset();
      setState({ status: 'sent', message: `Thanks, ${name}. Your message is on its way, and I'll write back soon.` });
    } catch {
      setState({
        status: 'error',
        message: `Your message couldn't be sent. Email me directly at ${profile.email}.`,
      });
    }
  };

  return (
    <form className="letter" onSubmit={onSubmit} noValidate>
      <input type="hidden" name="access_key" value={WEB3FORMS_KEY} />
      <input type="hidden" name="from_name" value="Portfolio Contact Form" />
      <input type="checkbox" name="botcheck" className="honeypot" tabIndex={-1} autoComplete="off" aria-hidden="true" />

      <span className="hand letter__greeting">Dear Ankur,</span>
      <div className="letter__row">
        <label>
          <span className="mono">your name</span>
          <input name="name" type="text" autoComplete="name" maxLength={100} required placeholder="Priya Sharma" />
        </label>
        <label>
          <span className="mono">your email</span>
          <input name="email" type="email" autoComplete="email" maxLength={150} required placeholder="priya@company.com" />
        </label>
      </div>
      <label>
        <span className="mono">subject</span>
        <input name="subject" type="text" maxLength={150} required placeholder="Backend role at our team" />
      </label>
      <label>
        <span className="mono">message</span>
        <textarea name="message" rows={5} maxLength={5000} required placeholder="Hi Ankur, I saw Job Bot and…" />
      </label>
      <div className="letter__foot">
        <m.button
          type="submit"
          className="btn btn--ink"
          disabled={state.status === 'sending'}
          whileTap={{ scale: 0.97 }}
        >
          {state.status === 'sending' ? 'sending…' : 'send letter →'}
        </m.button>
        <AnimatePresence mode="wait">
          {state.message && (
            <m.p
              key={state.status}
              role="status"
              className={`letter__status letter__status--${state.status}`}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              {state.message}
            </m.p>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
}

export default function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-h">
      <Heading page="p. 7 — say hi" title="Contact" id="contact-h" />
      <p className="section__intro">
        Let's talk about software engineering opportunities, backend projects and collaborations.
      </p>
      <div className="contact">
        <Reveal className="envelope" initial={{ opacity: 0, y: 24, rotate: -2 }} whileInView={{ opacity: 1, y: 0, rotate: -0.5 }}>
          <Note size="26px" delay={0.3}>
            {copy.contactNote}
          </Note>
          <CopyEmail />
          <dl className="envelope__meta mono">
            <div>
              <dt>phone</dt>
              <dd>
                <a href={`tel:${profile.phone.replace(/\s/g, '')}`}>{profile.phone}</a>
              </dd>
            </div>
            <div>
              <dt>location</dt>
              <dd>{profile.location}</dd>
            </div>
          </dl>
          <div className="envelope__links mono">
            {profile.links.map((l) => (
              <a key={l.href} href={l.href} target="_blank" rel="noopener">
                {l.label} ↗
              </a>
            ))}
            <a href={profile.resume} target="_blank" rel="noopener">
              resume ↗
            </a>
          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
