import React from 'react'
import { render } from 'react-dom'
import './globals'
import { Navigation } from './navigation.js'

console.log('hihi')

const App = props => {
  return (
    <>
      <h1>App</h1>
      <Navigation />
    </>
  )
}

render(<App />, document.getElementById('app'))
