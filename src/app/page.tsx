import Image from 'next/image'
import styles from './page.module.scss'
import Link from 'next/link'
import Card from '@/components/card'

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <h1>
          Look My Works
        </h1>
      </div>

      <div className={styles.grid}>
        <Card
          title={'Calculator'}
          description={'Calculator with React + TypeScript.'}
          href={'/calculator'}
        />
        <Card
          title={'Meditation App'}
          description={'Meditation App with React + TypeScript.'}
          href={'/meditationApp'}
        />
        {/* <Card
          title={'todoList'}
          description={'todoList App with React + TypeScript.'}
          href={'/todoList'}
        /> */}
      </div>
    </main>
  )
}
