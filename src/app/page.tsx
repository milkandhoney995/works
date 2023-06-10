import Image from 'next/image'
import styles from './page.module.scss'
import Link from 'next/link'

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <h1>
          Look My Works
        </h1>
      </div>

      <div className={styles.grid}>
        <Link
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
          href="/calculator"
        >
        <h2>
           Calculator <span>-&gt;</span>
          </h2>
          <p>Calculator with React + TypeScript.</p>
        </Link>
        <Link
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
          href="/meditationApp"
        >
        <h2>
           Meditation App <span>-&gt;</span>
          </h2>
          <p>Meditation App with React + TypeScript.</p>
        </Link>
      </div>
    </main>
  )
}
