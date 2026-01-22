import Link from "next/link"
import classes from "./card.module.scss"

interface CardProps {
  title: string
  description: string
  href: string
}

const Card = ({ title, description, href }: CardProps) => {
  return (
    <Link
      className={classes.card}
      target="_blank"
      rel="noopener noreferrer"
      href={href}
    >
      <h2 className={classes.card__title}>{title} <span>-&gt;</span></h2>
      <p>{description}</p>
    </Link>
  )
}

export default Card;