import { getAllPosts } from 'lib/api'
import { useEffect } from 'react'
import Container from 'components/container'
import Hero from 'components/hero'
import Meta from 'components/meta'
import { getPlaiceholder } from 'plaiceholder'
import { eyecatchLocal } from 'lib/constants'
import Posts from 'components/post'
import Pagination from 'components/pagination'
// import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import styles from 'styles/home.module.css'

export default function Home({ posts }) {
  // useEffect(() => {
  //   if (process.browser) {
  //     setAnimation()
  //   }
  // }, [])

  const setAnimation = () => {
    const tl = gsap.timeline()
    // tl.to('.home_overlay-path__UIap_', {
    //   duration: 0.3,
    //   ease: 'power2',
    //   attr: { d: 'M 0 100 V 100 Q 50 100 100 100 V 100 z' },
    // })
    tl.to(
      '.home_overlay-path__UIap_',
      {
        duration: 0.5,
        ease: 'power4.in',
        attr: { d: 'M 0 100 V 50 Q 50 0 100 50 V 100 z' },
      },
      0,
    )
    tl.to('.home_overlay-path__UIap_', {
      duration: 0.3,
      ease: 'power2',
      attr: { d: 'M 0 100 V 0 Q 50 0 100 0 V 100 z' },
      // onComplete: () => {
      //   useEffect(() => {
      //     tl.current.to(test, 2, { opacity: 0, onComplete: update })
      //   }, [count])
      // },
    })
    tl.to('.home_overlay__p6V_L', {
      duration: 0.3,
      ease: 'power2',
      y: '-100%',
    })
  }

  return (
    <>
      {/* <motion.div
        initial={{ opacity: 0, y: 50 }} // 初期状態
        animate={{ opacity: 1, y: 0 }} // マウント時
        exit={{ opacity: 0, y: 50 }} // アンマウント時
        transition={{
          duration: 0.5,
        }}
      > */}
      <svg
        className={styles.overlay}
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <path
          className={styles['overlay-path']}
          vector-effect="non-scaling-stroke"
          d="M 0 100 V 100 Q 50 100 100 100 V 100 z"
        />
      </svg>
      <Container>
        <Meta />
        <Hero
          title="Minoblog"
          subtitle="みのみのがアウトプットします"
          imageOn
        />
        <Posts posts={posts} />
        <Pagination nextUrl="/blog" nextText="MorePost" />
      </Container>
      {/* </motion.div> */}
    </>
  )
}

export async function getStaticProps() {
  const posts = await getAllPosts(4)

  for (const post of posts) {
    if (!post.hasOwnProperty('eyecatch')) {
      post.eyecatch = eyecatchLocal
    }
    const { base64 } = await getPlaiceholder(post.eyecatch.url)
    post.eyecatch.blurDataURL = base64
  }

  return {
    props: {
      posts: posts,
    },
  }
}
