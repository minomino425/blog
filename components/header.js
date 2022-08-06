import Logo from './logo'
import Nav from './nav'
import styles from 'styles/header.module.css'
import Container from './container'

export default function Header() {
  return (
    <header className={styles.flexContainer}>
      <Container large>
        <Logo boxOn />
        <Nav />
      </Container>
    </header>
  )
}
