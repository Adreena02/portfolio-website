import React, { useState, useEffect, useRef } from 'react'
import Wave from 'react-wavify'
import About from './components/About.jsx'
import Links from './components/Links.jsx'
import Work from './components/Work.jsx'
import Contact from './components/Contact.jsx'
import NowPlaying from './components/NowPlaying.jsx'
import LoadingScreen from './components/LoadingScreen.jsx'
import styles from './App.module.css'

const NAV_ITEMS = [
  { id: 'about',   label: 'about',   cssVar: '--circle-about',   tooltip: 'who i am & what i do'  },
  { id: 'links',   label: 'links',   cssVar: '--circle-links',   tooltip: 'github & linkedin'      },
  { id: 'work',    label: 'work',    cssVar: '--circle-work',    tooltip: "projects i've shipped"  },
  { id: 'contact', label: 'contact', cssVar: '--circle-contact', tooltip: "let's work together"    },
]

export default function App() {
  const [loading, setLoading] = useState(true)
  const [openWindows, setOpenWindows] = useState(new Set())
  const [zStack, setZStack] = useState([]) // ordered list, last = top
  const [dark, setDark] = useState(false)
  const [playing, setPlaying] = useState(false)
  const audioRef = useRef(null)

  useEffect(() => {
    const audio = new Audio('/song.mp3')
    audio.loop = true
    audioRef.current = audio
    return () => { audio.pause(); audio.src = '' }
  }, [])

  useEffect(() => {
    if (!audioRef.current) return
    playing
      ? audioRef.current.play().catch(() => setPlaying(false))
      : audioRef.current.pause()
  }, [playing])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light')
  }, [dark])

  const openWindow  = (id) => {
    setOpenWindows(prev => new Set([...prev, id]))
    setZStack(prev => [...prev.filter(i => i !== id)])
  }
  const closeWindow = (id) => {
    setOpenWindows(prev => { const next = new Set(prev); next.delete(id); return next })
    setZStack(prev => prev.filter(i => i !== id))
  }
  const focusWindow = (id) => setZStack(prev => [...prev.filter(i => i !==id), id])
  const zIndex = (id) => 100 + zStack.indexOf(id)

  return (
    <>
      {loading && <LoadingScreen onDone={() => setLoading(false)} />}

      <div className={styles.page}>
        <div className={styles.topBg} />

        <div className={styles.wavesContainer}>
          <svg width="0" height="0">
            <defs>
              <linearGradient id="waveGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={dark ? '#3a7a35' : '#b8e0b2'} />
                <stop offset="100%" stopColor={dark ? '#2d6b2d' : '#6dbf67'} />
              </linearGradient>
            </defs>
          </svg>
          <Wave
            fill="url(#waveGradient)"
            paused={false}
            style={{ display: 'block', width: '100%' }}
            options={{ height: 30, amplitude: 28, speed: 0.15, points: 4 }}
          />
        </div>
        <div className={styles.bottomBg} />

        <div className={styles.homeWindow}>
          <div className={styles.chrome}>
            <span className={styles.chromeTitle}>home</span>
            <button
              className={styles.themeToggle}
              onClick={() => setDark(d => !d)}
              title={dark ? 'switch to light mode' : 'switch to dark mode'}
            >
              {dark ? '☀️' : '🌙'}
            </button>
          </div>
          <div className={styles.body}>
            <h1 className={styles.heading}>
              hey! i'm <span className={styles.pink}>adreena</span>
            </h1>
            <p className={styles.sub}>Frontend Engineer & Creative Developer</p>

            <p className={styles.hint}>click to explore ↓</p>

            <nav className={styles.nav}>
              {NAV_ITEMS.map(item => (
                <button
                  key={item.id}
                  className={`${styles.navItem} ${openWindows.has(item.id) ? styles.active : ''}`}
                  onClick={() => openWindow(item.id)}
                >
                  <span className={styles.tooltip}>{item.tooltip}</span>
                  <div
                    className={styles.circle}
                    style={{ background: 'var(' + item.cssVar + ')' }}
                  />
                  <span className={styles.navLabel}>{item.label}</span>
                </button>
              ))}
            </nav>

            <a href="/resume.pdf" download className={styles.resumeBtn}>
              Download Resume (PDF)
            </a>
          </div>
        </div>

        {/* Floating Now Playing Toggle */}   
         <button
            className={`${styles.nowPlayingBtn} ${playing ? styles.nowPlayingActive : ''}`}
            onClick={() => setPlaying(p => !p)}
            title={playing ? 'pause' : 'play'} 
          >
            {playing ? '⏸' : '🎵'}
          </button>

        {openWindows.has('about')      && <About      onClose={() => closeWindow('about')}      onFocus={() => focusWindow('about')}      zIndex={zIndex('about')} />}
        {openWindows.has('links')      && <Links      onClose={() => closeWindow('links')}      onFocus={() => focusWindow('links')}      zIndex={zIndex('links')} />}
        {openWindows.has('work')       && <Work       onClose={() => closeWindow('work')}       onFocus={() => focusWindow('work')}       zIndex={zIndex('work')} />}
        {openWindows.has('contact')    && <Contact    onClose={() => closeWindow('contact')}    onFocus={() => focusWindow('contact')}    zIndex={zIndex('contact')} />}
      </div>
    </>
  )
}