import 'styles/globals.css'
import Layout from 'components/layout'
import { AnimatePresence } from 'framer-motion'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useRoutes,
} from 'react-router-dom'

//FontAwesomeの設定
import '@fortawesome/fontawesome-svg-core/styles.css'
import { config } from '@fortawesome/fontawesome-svg-core'
config.autoAddCss = false

import About from '../pages/about'
import Home from '../pages/index'

function MyApp({ Component, pageProps, router }) {
  const routes = useRoutes([
    { path: '/', name: 'Home', Component: Home },
    { path: '/about', name: 'About', Component: About },
  ])
  return (
    <Layout>
      {routes.map(({ path, Component }) => (
        <Routes>
          <Route key={path} exact path={path}>
            {({ match }) => (
              <div
                in={match != null}
                timeout={1200}
                classNames="page"
                onExit={onExit}
                onEntering={onEnter}
                unmountOnExit
              >
                <div className="page">
                  <Component {...pageProps} key={router.asPath} />
                </div>
              </div>
            )}
          </Route>
        </Routes>
      ))}
    </Layout>
  )
}

export default MyApp
