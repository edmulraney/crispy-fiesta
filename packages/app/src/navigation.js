import React, { useEffect, useState } from 'react'

const url = '//localhost:8081/dist/main.js'
// const Navigation = props => <div>hi</div>

const Navigation = props => {
  const [plugins, setPlugins] = useState(new Map())

  useEffect(() => {
    ;(async () => {
      const dashboard = await require.resolveWeak(
        /*
        webpackIgnore: true,
      */ url
      )
      console.log('got plugin', dashboard)
      setPlugins(plugins.set(dashboard.id, dashboard))
    })()
  }, [])
  console.log(plugins)
  return (
    <ul>
      {Array.from(plugins).map(plugin => (
        <li>{plugin.metadata.name}</li>
      ))}
    </ul>
  )
}

export { Navigation }
