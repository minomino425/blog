import Container from 'components/container'
import Postheader from 'components/post-header'
import { getAllCategories, getAllPostsByCategory } from 'lib/api'
import Posts from 'components/post'
import { eyecatchLocal } from 'lib/constants'
import { getPlaiceholder } from 'plaiceholder'
import Meta from 'components/meta'
import { motion } from 'framer-motion'

export default function Category({ name, posts }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }} // 初期状態
      animate={{ opacity: 1, y: 0 }} // マウント時
      exit={{ opacity: 0, y: 50 }} // アンマウント時
      transition={{
        duration: 0.5,
      }}
    >
      <Container>
        <Meta pageTitle={name} pageDesc={`${name}に関する記事`} />
        <Postheader title={name} subtitle="Blog Category" />
        <Posts posts={posts} />
      </Container>
    </motion.div>
  )
}

export async function getStaticPaths() {
  const allCats = await getAllCategories()
  return {
    paths: allCats.map(({ slug }) => `/blog/category/${slug}`),
    fallback: false,
  }
}

export async function getStaticProps(context) {
  const catSlug = context.params.slug

  const allCats = await getAllCategories()
  const cat = allCats.find(({ slug }) => slug === catSlug)

  const posts = await getAllPostsByCategory(cat.id)

  for (const post of posts) {
    if (!post.hasOwnProperty('eyecatch')) {
      post.eyecatch = eyecatchLocal
    }
    const { base64 } = await getPlaiceholder(post.eyecatch.url)
    post.eyecatch.blurDataURL = base64
  }
  return {
    props: {
      name: cat.name,
      posts: posts,
    },
  }
}
