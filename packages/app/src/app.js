import React from 'react'
import './globals'
import { Navigation } from './navigation.js'
import { PluginProvider } from '../lib/provider'

const urls = ['//localhost:8081/dist/main.js']

const App = props => {
  return (
    <PluginProvider urls={urls}>
      <h1>App</h1>
      <Navigation />
    </PluginProvider>
  )
}

export { App }
