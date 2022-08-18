import 'styles/globals.css'
import Layout from 'components/layout'
import { AnimatePresence } from 'framer-motion'

//FontAwesomeの設定
import '@fortawesome/fontawesome-svg-core/styles.css'
import { config } from '@fortawesome/fontawesome-svg-core'
config.autoAddCss = false

function MyApp({ Component, pageProps, router }) {
  console.log(router)
  return (
    <Layout>
      <AnimatePresence exitBeforeEnter>
        <Component {...pageProps} key={router.asPath} />
      </AnimatePresence>
    </Layout>
  )
}

export default MyApp
