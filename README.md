# adreena fulcher — portfolio

hey! this is my personal portfolio site. it's built around a retro desktop OS aesthetic — draggable windows, titlebar chrome, the whole thing. i wanted it to feel like something you'd actually remember after visiting, not just another scrollable page.

---

## what's inside

- **about** — a little bit about me, my background, and my tech stack
- **links** — github and linkedin
- **work** — projects i've actually shipped
- **contact** — a form to reach me directly

---

## built with

- React + Vite
- CSS Modules
- react-wavify (for the wave animation)
- deployed on Vercel

---

## features

- draggable, stackable windows with z-index management
- dark mode with smooth theme transitions
- animated wave background
- loading screen on first visit
- floating music button (drop a `song.mp3` in `/public` to use it!)
- download resume button (drop a `resume.pdf` in `/public`)
- mobile responsive
- pink custom scrollbars because of course

---

## running locally

```bash
npm install
npm run dev
```

---

## notes

- to add your resume: drop `resume.pdf` into the `/public` folder
- to add background music: drop `song.mp3` into the `/public` folder
- to update projects: edit the `projects` array in `src/components/Work.jsx`
- to add your Medium case study link: find `medium: null` in `Work.jsx` and replace it with your URL

---

*designed & built by adreena fulcher. not affiliated with anyone, just a developer with a thing for retro UIs and cozy details.*