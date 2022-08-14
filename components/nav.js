import Hero from 'components/hero'
import Link from 'next/link'
import { useState } from 'react'
import styles from 'styles/nav.module.css'

export default function Nav() {
  const [navIsOpen, setNavIsOpen] = useState(false)

  const toggleNav = () => {
    setNavIsOpen((prev) => !prev)
  }

  const closeNav = () => {
    setNavIsOpen(false)
  }

  return (
    <>
      <nav className={navIsOpen ? styles.open : styles.close}>
        {navIsOpen && (
          <style jsx global>{`
            @media (max-width: 767px) {
              body {
                overflow: hidden;
                position: fixed;
                width: 100%;
              }
            }
          `}</style>
        )}
        <button className={styles.btn} onClick={toggleNav}>
          <span className={styles.bar}></span>
          <span className="sr-only">MENU</span>
        </button>
        <ul className={styles.list}>
          <li>
            <Link href="/">
              <a onClick={closeNav}>HOME</a>
            </Link>
          </li>
          <li>
            <Link href="/about">
              <a onClick={closeNav}>ABOUT</a>
            </Link>
          </li>
          <li>
            <Link href="/blog">
              <a onClick={closeNav}>Blog</a>
            </Link>
          </li>
        </ul>
      </nav>
    </>
  )
}
