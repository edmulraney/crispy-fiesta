import React, { useEffect, useState, useCallback } from 'react'
import { PluginContext } from './context'

const PluginProvider = props => {
  const [plugins, setPlugins] = useState([])
  const register = useCallback(plugin => setPlugins([...plugins, plugin]), [])

  useEffect(() => {
    const handleHmr = async evt => {
      console.log('received hmr event', { evt })
      const plugin = event.detail.plugin
      const index = plugins.findIndex(p => p.id === plugin.id)
      console.log('asas', index, plugins)
      const oldPlugin = plugins[index]
      const replacementPlugin = await import(
        /* webpackIgnore: true */ oldPlugin.url
      ).then(() => {
        window[oldPlugin.url].plugin.url = oldPlugin.url
        return window[oldPlugin.url].plugin
      })
      const nextPlugins = [
        ...plugins.slice(0, index),
        replacementPlugin,
        ...plugins.slice(index + 1),
      ]
      setPlugins(nextPlugins)
    }
    document.body.addEventListener('hmr', handleHmr)
    return () => {
      console.log('cleaning up', handleHmr)
      document.body.removeEventListener('hmr', handleHmr)
    }
  }, [plugins])

  useEffect(() => {
    ;(async () => {
      const nextPlugins = await Promise.all(
        props.urls.map(url =>
          import(/* webpackIgnore: true */ url).then(() => {
            window[url].plugin.url = url
            return window[url].plugin
          })
        )
      )
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
