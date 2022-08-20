import Contact from 'components/contact'
import Container from 'components/container'
import { useEffect } from 'react'
import Hero from 'components/hero'
import PostBody from 'components/post-body'
import {
  TwoColumn,
  TwoColumnMain,
  TwoColumnSidebar,
} from 'components/two-column'
import Image from 'next/image'
import eyecatch from 'images/about.jpg'
import Meta from 'components/meta'
import Accordion from 'components/accordion'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import styles from 'styles/home.module.css'

export default function About() {
  useEffect(() => {
    if (process.browser) {
      setAnimation()
    }
  }, [])

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
          <Meta
            pageTitle="アバウト"
            pageDesc="About development activities"
            pageImg={eyecatch.src}
            pageImgW={eyecatch.width}
            pageImgH={eyecatch.height}
          ></Meta>
          <Hero title="About" subtitle="About developement activities" />
          <figure>
            <Image
              src={eyecatch}
              alt=""
              layout="responsive"
              sizes="{min-widyh: 1152px} 1152px, 100vw"
              priority
              placeholder="blur"
            />
          </figure>
          <TwoColumn>
            <TwoColumnMain>
              <PostBody>
                <p>
                  Cubeが得意とする分野はモノづくりです。3次元から2次元の造形、プログラミングやデザインなど、さまざまな技術を組み合わせることによって社会や環境と結びつけるクリエイティブを提案し続けています。
                </p>
                <h2>モノづくりで目指していること</h2>
                <p>
                  モノづくりではデータの解析からクリエイティブまで幅広いことを担当しています。新しいことを取り入れながら、ユーザーにマッチした提案を実現するのが目標です。たくさんの開発・提供が数多くありますが、特にそこを磨く作業に力を入れています。
                </p>
                <p>
                  単純に形にするだけでなく、作る過程や、なぜそのようにしたのかを大事にしながらものづくりをしています。毎回課題解決テーマをもって「モノ」と向き合い制作をし、フィードバックしてもらうことで自分の中にあるモヤモヤを言葉にして「問い」への答えを出しています。
                </p>
                <h3>新しいことへのチャレンジ</h3>
                <p>
                  今までと違うものを作ることで愛着が湧いてきます。そこで興味を持ったことは小さなことでもいいから取り入れて、良いものを作れるようにしています。小さなヒントから新しいものを生み出すようなモノづくりは、これからも続けていきたいです。
                </p>

                <h2>FAQ</h2>
                <Accordion heading="プログラミングのポイントについて">
                  <p>
                    プログラミングのポイントは、作りたいものを作ることです。楽しいことから思いつき、目標とゴールを決め、そこに向かってさまざまな課題を設定していきながら、プログラムを作っていきます。
                  </p>
                </Accordion>
                <Accordion heading="古代語の解読について">
                  <p>
                    古代語を解読するのに必要なのは、書かれた文字そのものだけです。古代の世界観や思考方法。それらを読み取ってこそ古代の世界観が理解できてきます。
                  </p>
                </Accordion>
                <Accordion heading="公開リポジトリの活用について">
                  <p>
                    公開リポジトリを活用すると、全世界のどこからでもアクセスし、開発者が関連するプロジェクトのタスクを利用することができます。
                  </p>
                </Accordion>
              </PostBody>
            </TwoColumnMain>

            <TwoColumnSidebar>
              <Contact />
            </TwoColumnSidebar>
          </TwoColumn>
        </Container>
      {/* </motion.div> */}
    </>
  )
}
