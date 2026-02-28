import React, { useState } from 'react'
import Window from './Window.jsx'
import styles from './Contact.module.css'

export default function Contact({ onClose }) {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.message) return
    setSent(true)
  }

  return (
    <Window title="contact" onClose={onClose}>
      {sent ? (
        <div className={styles.success}>
          <div className={styles.successEmoji}>🎉</div>
          <h2 className={styles.successTitle}>message sent!</h2>
          <p className={styles.successText}>thanks for reaching out, i'll get back to you soon (:  </p>
        </div>
      ) : (
        <div className={styles.form}>
          <p className={styles.intro}>want to work together or just say hi? send me a message!</p>
          <div className={styles.field}>
            <label className={styles.label}>name</label>
            <input
              className={styles.input}
              name="name"
              type="text"
              placeholder="your name"
              value={form.name}
              onChange={handleChange}
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>email</label>
            <input
              className={styles.input}
              name="email"
              type="email"
              placeholder="your@email.com"
              value={form.email}
              onChange={handleChange}
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>message</label>
            <textarea
              className={styles.textarea}
              name="message"
              placeholder="say something nice..."
              rows={4}
              value={form.message}
              onChange={handleChange}
            />
          </div>
          <button className={styles.btn} onClick={handleSubmit}>send it! ✉️</button>
        </div>
      )}
    </Window>
  )
}
