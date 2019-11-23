import { App } from './app.js'

const id = 'dashboard'

const metadata = {
  name: 'Dashboard',
}

// export default { id, App, metadata }
export { id, App, metadata }

if (process.env.NODE_ENV !== 'production') {
  if (module.hot) {
    module.hot.accept('./app.js')
  }
}
