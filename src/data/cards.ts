export type CardItem = {
  title: string
  description: string
  href: string
}

export const cards: CardItem[] = [
  {
    title: 'Calculator',
    description: 'Calculator with React + TypeScript.',
    href: '/calculator',
  },
  {
    title: 'Meditation App',
    description: 'Meditation App with React + TypeScript.',
    href: '/meditationApp',
  },
  {
    title: 'todoList',
    description: 'todoList App with React + TypeScript.',
    href: '/todoList',
  },
  {
    title: 'Shogi App',
    description: 'Japanese Shogi App with React + TypeScript.',
    href: '/shogi',
  },
]