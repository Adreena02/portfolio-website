import React from 'react'
import Window from './Window.jsx'
import styles from './Work.module.css'

const projects = [
  {
    title: 'Desktop App',
    description: 'A cute desktop application built with Electron and React. Focused on clean UI and smooth interactions.',
    tags: ['Electron', 'React', 'CSS'],
    color: '#c9b8e8',
  },
  {
    title: 'Portfolio Site',
    description: 'This very website! Designed in Figma and built with React + Vite. Inspired by retro desktop UI.',
    tags: ['React', 'Vite', 'Figma'],
    color: '#a8d8ea',
  },
  {
    title: 'DevOps Pipeline',
    description: 'CI/CD pipeline setup using GitHub Actions, Docker, and AWS. Streamlined deployments for a team project.',
    tags: ['GitHub Actions', 'Docker', 'AWS'],
    color: '#f9e4a1',
  },
  {
    title: 'Desktop Calendar',
    description: 'A cute desktop calendar! This is made with Electron and React. Inspired by pixel animations.',
    tags: ['Electron','React', 'CSS'],
    color: '#fb93bb',
  },
]

export default function Work({ onClose }) {
  return (
    <Window title="work" onClose={onClose} style={{ maxWidth: 620 }}>
      <div className={styles.grid}>
        {projects.map((p, i) => (
          <div key={i} className={styles.card} style={{ '--accent': p.color }}>
            <div className={styles.cardTop} style={{ background: p.color }} />
            <div className={styles.cardBody}>
              <h3 className={styles.cardTitle}>{p.title}</h3>
              <p className={styles.cardDesc}>{p.description}</p>
              <div className={styles.tags}>
                {p.tags.map(t => (
                  <span key={t} className={styles.tag}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Window>
  )
}
