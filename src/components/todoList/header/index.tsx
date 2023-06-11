import Link from "next/link";
import classes from './header.module.scss'

export default function Header() {
  return (
    <header className={classes.header}>
      <h1>Todolist</h1>
      <Link className={classes.header__link} href={'/'}>Home</Link> |
      <Link className={classes.header__link} href={'/about'}>About</Link>
    </header>
  )
}