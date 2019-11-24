import React, { useEffect, useState, useCallback } from 'react'
import { PluginContext } from './context'

const urls = ['//localhost:8081/dist/main.js']

const PluginProvider = props => {
  const [plugins, setPlugins] = useState({})
  const register = useCallback(
    plugin => setPlugins({ ...plugins, [plugin.id]: plugin }),
    []
  )

  useEffect(() => {
    ;(async () => {
      const nextPlugins = await Promise.all(
        urls.map(url =>
          import(/* webpackIgnore: true */ url).then(() => window[url])
        )
      )
      console.log('got nextPlugins', nextPlugins)
      const next = {}
      nextPlugins.forEach(plugin => (next[plugin.id] = plugin))

      setPlugins({ ...plugins, ...next })
    })()
  }, [])

  return (
    <PluginContext.Provider value={{ plugins, register }}>
      {props.children}
    </PluginContext.Provider>
  )
}

export { PluginProvider }
