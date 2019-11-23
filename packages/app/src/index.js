import './app.js'

if (process.env.NODE_ENV !== 'production') {
  if (module.hot) {
    module.hot.accept('./app.js')
  }
}
