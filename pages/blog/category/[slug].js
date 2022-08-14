import Container from 'components/container'
import Postheader from 'components/post-header'
import { getAllCategories } from 'lib/api'

export default function Category({ name }) {
  return (
    <Container>
      <Postheader title={name} subtitle="Blog Category" />
    </Container>
  )
}

export async function getStaticPaths() {
  return {
    paths: ['/blog/category/technology'],
    fallback: false,
  }
}

export async function getStaticProps(context) {
  const catSlug = context.params.slug

  const allCats = await getAllCategories()
  const cat = allCats.find(({ slug }) => slug === catSlug)

  return {
    props: {
      name: cat.name,
    },
  }
}