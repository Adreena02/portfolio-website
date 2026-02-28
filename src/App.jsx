import React, { useState, useEffect } from 'react'
import Wave from 'react-wavify'
import About from './components/About.jsx'
import Links from './components/Links.jsx'
import Work from './components/Work.jsx'
import Contact from './components/Contact.jsx'
import NowPlaying from './components/NowPlaying.jsx'
import LoadingScreen from './components/LoadingScreen.jsx'
import styles from './App.module.css'

const NAV_ITEMS = [
  { id: 'about',      label: 'about',       cssVar: '--circle-about'   },
  { id: 'links',      label: 'links',       cssVar: '--circle-links'   },
  { id: 'work',       label: 'work',        cssVar: '--circle-work'    },
  { id: 'contact',    label: 'contact',     cssVar: '--circle-contact' },
  { id: 'nowplaying', label: 'now playing', cssVar: '--circle-music'   },
]

export default function App() {
  const [loading, setLoading] = useState(true)
  const [openWindows, setOpenWindows] = useState(new Set())
  const [zStack, setZStack] = useState([]) // ordered list, last = top
  const [dark, setDark] = useState(false)

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
              title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {dark ? '☀️' : '🌙'}
            </button>
          </div>
          <div className={styles.body}>
            <h1 className={styles.heading}>
              hey! i'm <span className={styles.pink}>adreena</span>
            </h1>
            <p className={styles.sub}>full stack + dev ops engineer</p>

            <nav className={styles.nav}>
              {NAV_ITEMS.map(item => (
                <button
                  key={item.id}
                  className={`${styles.navItem} ${openWindows.has(item.id) ? styles.active : ''}`}
                  onClick={() => openWindow(item.id)}
                >
                  <div
                    className={styles.circle}
                    style={{ background: 'var(' + item.cssVar + ')' }}
                  />
                  <span className={styles.navLabel}>{item.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {openWindows.has('about')      && <About      onClose={() => closeWindow('about')}      onFocus={() => focusWindow('about')}      zIndex={zIndex('about')} />}
        {openWindows.has('links')      && <Links      onClose={() => closeWindow('links')}      onFocus={() => focusWindow('links')}      zIndex={zIndex('links')} />}
        {openWindows.has('work')       && <Work       onClose={() => closeWindow('work')}       onFocus={() => focusWindow('work')}       zIndex={zIndex('work')} />}
        {openWindows.has('contact')    && <Contact    onClose={() => closeWindow('contact')}    onFocus={() => focusWindow('contact')}    zIndex={zIndex('contact')} />}
        {openWindows.has('nowplaying') && <NowPlaying onClose={() => closeWindow('nowplaying')} onFocus={() => focusWindow('nowplaying')} zIndex={zIndex('nowplaying')} />}
      </div>
    </>
  )
}
