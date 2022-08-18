import { getAllPosts } from 'lib/api'
import Container from 'components/container'
import Hero from 'components/hero'
import Meta from 'components/meta'
import { getPlaiceholder } from 'plaiceholder'
import { eyecatchLocal } from 'lib/constants'
import Posts from 'components/post'
import Pagination from 'components/pagination'
import { motion } from 'framer-motion'

export default function Home({ posts }) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 50 }} // 初期状態
        animate={{ opacity: 1, y: 0 }} // マウント時
        exit={{ opacity: 0, y: 50 }} // アンマウント時
        transition={{
          duration: 0.5,
        }}
      >
        <Container>
          <Meta />
          <Hero title="CUBE" subtitle="アウトプットしていくサイト" imageOn />
          <Posts posts={posts} />
          <Pagination nextUrl="/blog" nextText="MorePost" />
        </Container>
      </motion.div>
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
