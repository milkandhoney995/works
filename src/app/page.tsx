import Image from 'next/image'
import styles from './page.module.scss'
import Link from 'next/link'

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          Get started by editing&nbsp;
          <code className={styles.code}>src/app/page.tsx</code>
        </p>
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
      </div>
    </main>
  )
}
