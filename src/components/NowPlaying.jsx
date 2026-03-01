import React, { useState, useEffect, useRef } from 'react'
import Window from './Window.jsx'
import styles from './NowPlaying.module.css'

const SONG = {
  title: 'Rest Point Lullaby',
  artist: 'CFL Turning Pages',
  src: '/song.mp3'
}

export default function NowPlaying({ onClose }) {
    const audioRef = useRef(null)
    const [playing, setPlaying] = useState(false)
    const [progress, setProgress] = useState(0)
    const [duration, setDuration] = useState(0)

    useEffect(() => {
    const audio = new Audio(SONG.src)
    audio.loop = true
    audioRef.current = audio

    audio.addEventListener('loadedmetadata', () => setDuration(audio.duration))
    audio.addEventListener('timeupdate', () => setProgress(audio.currentTime))

    return () => {
      audio.pause()
      audio.src = ''
    }
  }, [])

  // Play/pause in sync with state
  useEffect(() => {
    if (!audioRef.current) return
    playing ? audioRef.current.play().catch(() => setPlaying(false)) : audioRef.current.pause()
  }, [playing])

  const seek = (e) => {
    if (!audioRef.current || !duration) return
    const rect = e.currentTarget.getBoundingClientRect()
    const newTime = ((e.clientX - rect.left) / rect.width) * duration
    audioRef.current.currentTime = newTime
    setProgress(newTime)
  }

  const skip = (secs) => {
    if (!audioRef.current) return
    audioRef.current.currentTime = Math.min(duration, Math.max(0, audioRef.current.currentTime + secs))
  }

  const fmt = (s) => {
    if (!s || isNaN(s)) return '0:00'
    return `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`
  }

  const pct = duration ? (progress / duration) * 100 : 0

  return (
    <Window title="now playing" onClose={onClose}>
      <div className={styles.player}>

        {/* Vinyl record */}
        <div className={styles.art}>
          <div className={`${styles.vinyl} ${playing ? styles.spinning : ''}`}>
            <div className={styles.vinylInner} />
          </div>
        </div>

        {/* Song info */}
        <div className={styles.info}>
          <p className={styles.title}>{SONG.title}</p>
          <p className={styles.artist}>{SONG.artist}</p>
        </div>

        {/* Progress bar */}
        <div className={styles.progressWrap}>
          <span className={styles.time}>{fmt(progress)}</span>
          <div className={styles.bar} onClick={seek}>
            <div className={styles.fill} style={{ width: `${pct}%` }} />
            <div className={styles.thumb} style={{ left: `${pct}%` }} />
          </div>
          <span className={styles.time}>{fmt(duration)}</span>
        </div>

        {/* Controls */}
        <div className={styles.controls}>
          <button className={styles.ctrl} onClick={() => skip(-10)}>⏮</button>
          <button className={`${styles.ctrl} ${styles.playBtn}`} onClick={() => setPlaying(p => !p)}>
            {playing ? '⏸' : '▶'}
          </button>
          <button className={styles.ctrl} onClick={() => skip(10)}>⏭</button>
        </div>

        <p className={styles.hint}>
          {duration ? '♡' : '⚠️ add song.mp3 to your public/ folder'}
        </p>
      </div>
    </Window>
  )
}
