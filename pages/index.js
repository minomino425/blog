import { getAllPosts } from 'lib/api'
import Container from 'components/container'
import Hero from 'components/hero'
import Meta from 'components/meta'
import { getPlaiceholder } from 'plaiceholder'
import { eyecatchLocal } from 'lib/constants'
import Posts from 'components/post'
import Pagination from 'components/pagination'

export default function Home({ posts }) {
  return (
    <>
      <Container>
        <Meta />
        <Hero title="CUBE" subtitle="アウトプットしていくサイト" imageOn />
        <Posts posts={posts} />
        <Pagination nextUrl='/blog' nextText='MorePost'/>
      </Container>
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
