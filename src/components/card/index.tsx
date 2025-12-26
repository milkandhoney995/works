import Link from "next/link"
import classes from "./card.module.scss"

type propsType = {
  title: string
  description: string
  href: string
}

const Card = (props: propsType) => {
  return (
    <Link
      className={classes.card}
      target="_blank"
      rel="noopener noreferrer"
      href={props.href}
    >
      <h2>
        { props.title } <span>-&gt;</span>
      </h2>
      <p>{ props.description }</p>
    </Link>
  )
}

export default Card;