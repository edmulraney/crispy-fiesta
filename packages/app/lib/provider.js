import React, { useEffect, useState, useCallback } from 'react'
import { PluginContext } from './context'
import { resolvePlugin } from './resolve-plugin'

const PluginProvider = props => {
  const [plugins, setPlugins] = useState([])
  const register = useCallback(async url => {
    const plugin = await resolvePlugin(url)
    setPlugins([...plugins, plugin]), []
  })

  useEffect(() => {
    const handleHmr = async evt => {
      const plugin = event.detail.plugin
      const index = plugins.findIndex(p => p.id === plugin.id)
      const oldPlugin = plugins[index]
      const replacementPlugin = await resolvePlugin(oldPlugin.url)
      const nextPlugins = [
        ...plugins.slice(0, index),
        replacementPlugin,
        ...plugins.slice(index + 1),
      ]
      setPlugins(nextPlugins)
    }
    document.body.addEventListener('hmr', handleHmr)
    return () => document.body.removeEventListener('hmr', handleHmr)
  }, [plugins])

  useEffect(() => {
    ;(async () => {
      const nextPlugins = await Promise.all(props.urls.map(resolvePlugin))
      setPlugins([...plugins, ...nextPlugins])
    })()
  }, [])

  return (
    <PluginContext.Provider value={{ plugins, register }}>
      {props.children}
    </PluginContext.Provider>
  )
}

export { PluginProvider }
