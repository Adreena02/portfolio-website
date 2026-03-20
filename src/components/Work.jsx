import React from 'react'
import Window from './Window.jsx'
import styles from './Work.module.css'

const projects = [
  {
    title: 'Hello Kitty Island Adventure Game Companion',
    description: 'A fan-made companion app for Hello Kitty Island Adventure. Track friendship levels, manage inventory, log recipes, and catalogue furniture — with all 13 residents pre-loaded and a gifting helper to match your items to resident preferences.',
    tags: ['React', 'Vite', 'HTML', 'CSS'],
    color: '#ff6b6b',
    link: 'https://hkia-island-companion.vercel.app/',
    medium: null, // add your Medium URL here when ready
  },
  {
    title: 'JobQuest',
    description: 'A desktop application for tracking job applications, built with Electron and React. Focused on clean UI and smooth interactions.',
    tags: ['Electron', 'React', 'CSS'],
    color: '#c9b8e8',
    github: 'https://github.com/Adreena02/electron-job-tracker',
  },
  {
    title: 'Portfolio Site',
    description: 'This very website! Designed in Figma and built with React + Vite. Inspired by retro desktop UI.',
    tags: ['React', 'Vite', 'Figma'],
    color: '#a8d8ea',
    github: 'https://github.com/Adreena02/portfolio-website',
  },
]

export default function Work({ onClose, onFocus, zIndex }) {
  return (
    <Window title="work" onClose={onClose} onFocus={onFocus} zIndex={zIndex} style={{ maxWidth: 620 }}>
      <div className={styles.scrollBody}>
        <div className={styles.grid}>
          {projects.map((p, i) => (
            <div key={i} className={styles.card}>
              <div className={styles.cardTop} style={{ background: p.color }} />
              <div className={styles.cardBody}>
                <h3 className={styles.cardTitle}>
                  {p.link
                    ? <a href={p.link} target="_blank" rel="noopener noreferrer" className={styles.cardLink}>{p.title}</a>
                    : p.title
                  }
                </h3>
                <p className={styles.cardDesc}>{p.description}</p>
                <div className={styles.tags}>
                  {p.tags.map(t => (
                    <span key={t} className={styles.tag}>{t}</span>
                  ))}
                </div>
                <div className={styles.cardLinks}>
                  {p.github && (
                    <a href={p.github} target="_blank" rel="noopener noreferrer" className={styles.cardAction}>
                      GitHub ↗
                    </a>
                  )}
                  {p.link && (
                    <a href={p.link} target="_blank" rel="noopener noreferrer" className={styles.cardAction}>
                      Live Site ↗
                    </a>
                  )}
                  {p.medium && (
                    <a href={p.medium} target="_blank" rel="noopener noreferrer" className={styles.cardAction}>
                      Case Study ↗
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Window>
  )
}