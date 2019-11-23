import React, { useState, useCallback } from 'react'
import { PluginContext } from './context'
window.react2 = React
const PluginProvider = () => {
  const [plugins, setPlugins] = useState(new Map())
  const register = useCallback(
    plugin => setPlugins(plugins.set(plugin.id, plugin)),
    []
  )

  return <PluginContext.Provider value={{ plugins, register }} />
}

export { PluginProvider }
