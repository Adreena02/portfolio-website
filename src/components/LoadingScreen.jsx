import React, {useEffect, useState } from 'react'
import styles from './LoadingScreen.module.css'

export default function LoadingScreen({ onDone }) {
    const [phase, setPhase] = useState('in') // 'in' | 'out'

    useEffect(() => {
        const fadeOut = setTimeout(() =>
            setPhase('out'), 2000)
        const done = setTimeout(() => 
            onDone(), 2600)
        return () => { clearTimeout(fadeOut);
            clearTimeout(done) }
}, [])

    return (
        <div className={`${styles.screen} ${phase === 'out' ? styles.out : ''}`}>
            <div className={styles.content}>
                <p className={styles.name}>adreena.dev</p>
                <div className={styles.dots}>
                    <span className={styles.dot} />
                    <span className={styles.dot} />
                    <span className={styles.dot} />
                </div>
                <p className={styles.label}>loading...</p>
            </div>
        </div>
    )
}
