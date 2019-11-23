import React from 'react'

const PluginContext = React.createContext({
  plugins: new Map(),
  register: () => {},
})

export { PluginContext }
