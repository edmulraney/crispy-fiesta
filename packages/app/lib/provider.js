import React, { useEffect, useState, useCallback } from 'react'
import { PluginContext } from './context'

let handleHmr

const PluginProvider = props => {
  const [plugins, setPlugins] = useState([])
  const register = useCallback(plugin => setPlugins([...plugins, plugin]), [])

  useEffect(() => {
    const handleHmr = async evt => {
      console.log('received hmr event', { evt })
      const plugin = event.detail.plugin
      const index = plugins.findIndex(p => p.id === plugin.id)
      const replacementPlugin = await import(
        /* webpackIgnore: true */ '//localhost:8081/dist/main.js'
      ).then(() => window['//localhost:8081/dist/main.js'].plugin)
      const nextPlugins = [
        ...plugins.slice(0, index),
        replacementPlugin,
        ...plugins.slice(index),
      ]
      setPlugins(nextPlugins)
    }
    document.body.addEventListener('hmr', handleHmr)
    return () => {
      console.log('cleaning up', handleHmr)
      document.body.removeEventListener('hmr', handleHmr)
    }
  }, [])

  useEffect(() => {
    ;(async () => {
      const nextPlugins = await Promise.all(
        props.urls.map(url =>
          import(/* webpackIgnore: true */ url).then(test1 => {
            console.log({ test1 }, window[url])
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
