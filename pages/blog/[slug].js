import Container from 'components/container'
import { getAllSlugs, getPostBySlug } from 'lib/api'
import { extractText } from 'lib/extract-text'
import PostHeader from 'components/post-header'
import Image from 'next/image'
import {
  TwoColumn,
  TwoColumnMain,
  TwoColumnSidebar,
} from 'components/two-column'
import PostBody from 'components/post-body'
import ConvertBody from 'components/convert-body'
import PostCategories from 'components/post-categories'
import Meta from 'components/meta'
import { eyecatchLocal } from 'lib/constants'
import { getPlaiceholder } from 'plaiceholder'
import { prevNextPost } from 'lib/prev-next-post'
import Pagination from 'components/pagination'
import { motion } from 'framer-motion'

export default function Post({
  title,
  publish,
  content,
  eyecatch,
  categories,
  description,
  prevPost,
  nextPost,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }} // 初期状態
      animate={{ opacity: 1, y: 0 }} // マウント時
      exit={{ opacity: 0, y: 10 }} // アンマウント時
      transition={{
        duration: 0.5,
      }}
    >
      <Container>
        <Meta
          pageTitle={title}
          pageDesc={description}
          pageImg={eyecatch.url}
          pageImgW={eyecatch.width}
          pageImgH={eyecatch.height}
        />
        <article>
          <PostHeader title={title} subtitle="Blog Article" publish={publish} />
          <figure>
            <Image
              key={eyecatch.url}
              src={eyecatch.url}
              alt=""
              layout="responsive"
              width={eyecatch.width}
              height={eyecatch.height}
              sizes="{min-width:1152px} 1152px,100vw"
              priority
              placeholder="blur"
              blurDataURL={eyecatch.blurDataURL}
            />
          </figure>

          <TwoColumn>
            <TwoColumnMain>
              <PostBody>
                <ConvertBody contentHTML={content} />
              </PostBody>
            </TwoColumnMain>
            <TwoColumnSidebar>
              <PostCategories categories={categories} />
            </TwoColumnSidebar>
          </TwoColumn>
          <div>
            {prevPost.title}
            {prevPost.slug}
          </div>
          <div>
            {nextPost.title}
            {nextPost.slug}
          </div>

          <Pagination
            prevText={prevPost.title}
            prevUrl={`/blog/${prevPost.slug}`}
            nextText={nextPost.title}
            nextUrl={`/blog/${nextPost.slug}`}
          />
        </article>
      </Container>
    </motion.div>
  )
}

export async function getStaticPaths() {
  const allSlugs = await getAllSlugs()
  return {
    paths: allSlugs.map(({ slug }) => `/blog/${slug}`),
    fallback: false,
  }
}

export async function getStaticProps(context) {
  const slug = context.params.slug

  const post = await getPostBySlug(slug)

  const description = extractText(post.content)

  const eyecatch = post.eyecatch ?? eyecatchLocal

  const { base64 } = await getPlaiceholder(eyecatch.url)
  eyecatch.blurDataURL = base64

  const allSlugs = await getAllSlugs()
  const [prevPost, nextPost] = prevNextPost(allSlugs, slug)
  return {
    props: {
      title: post.title,
      publish: post.publishDate,
      content: post.content,
      eyecatch: eyecatch,
      categories: post.categories,
      description: description,
      prevPost: prevPost,
      nextPost: nextPost,
    },
  }
}
