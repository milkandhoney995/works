import styles from './page.module.scss'
import Card from '@/components/card'
import { cards } from '@/data/cards'

const Home = () => {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <h1>Look My Works</h1>
      </div>

      <div className={styles.grid}>
        {cards.map((card) => (
          <Card
            key={card.href}
            title={card.title}
            description={card.description}
            href={card.href}
          />
        ))}
      </div>
    </main>
  )
}

export default Home;