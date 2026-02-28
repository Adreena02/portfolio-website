import React from 'react'
import Window from './Window.jsx'
import styles from './About.module.css'

const SKILLS = [
  {name: 'React', color: '#61dafb', text: '#1a1a2e'},
  {name: 'JavaScript', color: '#f7df1e', text: '#1a1a2e'},
  {name: 'TypeScript', color: '#3178c6', text: '#fff'},
  {name: 'Python', color: '#3572a5', text: '#fff'},
  {name: 'Java', color: '#f89820', text: '#1a1a2e'},
  {name: 'Node.js', color: '#68a063', text: '#fff'},
  {name: 'AWS', color: '#ff9900', text: '#1a1a2e'},
  {name: 'UiPath', color: '#f4831f', text: '#fff'},
  {name: 'Terraform', color: '#7b42bc', text: '#fff'},
  {name: 'PostgreSQL', color: '#336791', text: '#fff'},
  {name: 'Spring Boot', color: '#6db33f', text: '#fff'},
]

export default function About({ onClose }) {
  return (
    <Window title="about" onClose={onClose}>
      {/* Fixed header — always visible */}
      <div className={styles.header}>
        <div className={styles.avatar}>
          <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" width="80" height="80">
            <circle cx="40" cy="40" r="40" fill="#d9d9d9"/>
            <circle cx="40" cy="30" r="14" fill="#bbb"/>
            <ellipse cx="40" cy="70" rx="22" ry="16" fill="#bbb"/>
          </svg>
        </div>
        <div className={styles.headerText}>
          <h1 className={styles.name}>Adreena Fulcher</h1>
          <p className={styles.tagline}>NYC based full stack + devops engineer</p>
          <p className={styles.tagline}>
            Former software engineer at{' '}
            <a className={styles.link} href="https://www.jpmorganchase.com" target="_blank" rel="noopener noreferrer">
              JP Morgan & Chase
            </a>
          </p>
        </div>
      </div>

      <hr className={styles.divider} />

      {/* Scrollable content below */}
      <div className={styles.scrollBody}>
        <div className={styles.bio}>
          <p>hi! nice to meet you, i'm adreena. i...</p>
          <ul>
            <li>
              develop cute{' '}
              <a className={styles.link} href="#" onClick={e => e.preventDefault()}>
                desktop applications
              </a>
              ,
            </li>
            <li>create website wire frames,</li>
            <li>build resilience and stability of product tools to accelerate the adoption of native cloud tech and enhance the customer experience,</li>
            <li>utilize low code apps to create streamlined processes to lessen workload and,</li>
            <li>do front-end web development!</li>
          </ul>
          <p className={styles.contact}>
            interested in working with me? send me an email at{' '}
            <a className={styles.link} href="mailto:fulcheradreena@gmail.com">
              fulcheradreena@gmail.com
            </a>! (:
          </p>
        </div>
        
        <div className={styles.skills}>
          <h2 className={styles.sectionTitle}>LANGUAGES & TOOLS</h2>
          <div className={styles.pills}>
            {SKILLS.map(skill => (
              <span
                key={skill.name}
                className={styles.pill}
                style={{ background: skill.color, color: skill.text }}
              >
                {skill.name}
              </span>
            ))}
          </div>
        </div>

        <div className={styles.education}>
          <h2 className={styles.eduTitle}>EDUCATION</h2>
          <p>CUNY Queens College - Computer Science (2020)</p>
          <p>Flatiron School - Software Development (2021)</p>
        </div>
      </div>
    </Window>
  )
}