import React from 'react'

const PluginContext = React.createContext({
  plugins: [],
  register: () => {},
})

export { PluginContext }
