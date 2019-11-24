import React, { useEffect, useState, useCallback } from 'react'
import { PluginContext } from './context'

const PluginProvider = props => {
  const [plugins, setPlugins] = useState([])
  const register = useCallback(plugin => setPlugins([...plugins, plugin]), [])

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
