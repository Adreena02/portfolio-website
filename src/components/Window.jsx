import React, { useRef, useState, useEffect } from 'react'
import styles from './Window.module.css'

export default function Window({ title, onClose, onFocus, zIndex, children, style }) {
  const windowRef = useRef(null)
  const dragging = useRef(false)
  const offset = useRef({ x: 0, y: 0 })
  const [pos, setPos] = useState(null)

  useEffect(() => {
    if (windowRef.current && pos === null) {
      const el = windowRef.current
      const rect = el.getBoundingClientRect()
      setPos({ x: rect.left, y: rect.top })
    }
  }, [])

  // Dragging only triggered from the chrome titlebar
  const onChromeMouseDown = (e) => {
    if (e.target.closest('button')) return
    dragging.current = true
    const rect = windowRef.current.getBoundingClientRect()
    offset.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    e.preventDefault()
  }

  useEffect(() => {
    const onMouseMove = (e) => {
      if (!dragging.current) return
      setPos({
        x: Math.max(0, Math.min(window.innerWidth - 100, e.clientX - offset.current.x)),
        y: Math.max(0, Math.min(window.innerHeight - 40, e.clientY - offset.current.y)),
      })
    }
    const onMouseUp = () => { dragging.current = false }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
    }
  }, [])

  const windowStyle = pos
    ? { position: 'fixed', left: pos.x, top: pos.y, margin: 0, zIndex: zIndex ?? 100, ...style }
    : { zIndex: zIndex ?? 100, ...style }

  return (
    <div className={styles.overlay}>
      <div
        ref={windowRef}
        className={styles.window}
        style={windowStyle}
        onMouseDown={() => onFocus?.()}  // any click on window brings it to front
        onClick={e => e.stopPropagation()}
      >
        <div className={styles.chrome} onMouseDown={onChromeMouseDown}>
          <span className={styles.title}>{title}</span>
          <button className={styles.closeBtn} onClick={onClose}>✕</button>
        </div>
        <div className={styles.body}>
          {children}
        </div>
      </div>
    </div>
  )
}