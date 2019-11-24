import React from 'react'
import { render } from 'react-dom'
import { App } from './app.js'

render(<App />, document.getElementById('app'))

if (process.env.NODE_ENV !== 'production') {
  if (module.hot) {
    module.hot.accept()
  }
}
