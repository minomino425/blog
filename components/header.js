import Logo from './logo'
import Nav from './nav'
import styles from 'styles/header.module.css'

export default function Header() {
  return (
    <header className={styles.flexContainer}>
      <Logo boxOn />
      <Nav />
    </header>
  )
}
