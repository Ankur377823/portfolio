# Portfolio

Source for my personal portfolio site, styled as an engineering notebook.

**Live site:** https://portfolio-puce-nine-11.vercel.app/

## Sections

Home, About, Projects (with case notes), Experience, Milestones, Skills, Education and Contact.

## Tech stack

React-style components running on [Preact](https://preactjs.com) (a small, fast stand-in for React), built with Vite, with animations from [Motion](https://motion.dev). Deployed on Vercel.

## Run locally

```bash
git clone https://github.com/Ankur377823/portfolio.git
cd portfolio
npm install
npm run dev
```

Then open http://localhost:5173. `npm run build` writes the production site to `dist/`.

## Project structure

| Path | Purpose |
|---|---|
| `src/data.js` | All site content: projects, experience, skills, links |
| `src/components/Ink.jsx` | Hand-drawn animation pieces: notes, highlighter, circles, arrows, ticks |
| `src/components/Chrome.jsx` | Header, mobile index, page tabs, scroll ink, footer |
| `src/components/Hero.jsx` | Name, intro, polaroid and sticky notes |
| `src/components/Projects.jsx` | Project entries, diagrams and case notes |
| `src/components/Sections.jsx` | About, Experience, Milestones, Skills, Education |
| `src/components/Contact.jsx` | Contact details and the Web3Forms contact form |
| `src/styles.css` | Styles |
| `public/assets/` | Profile photo and resume |
