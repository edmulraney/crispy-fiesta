import React, { useEffect, useState } from 'react'

const url = '//localhost:8081/dist/main.js'
// const Navigation = props => <div>hi</div>

const Navigation = props => {
  const [plugins, setPlugins] = useState({})

  useEffect(() => {
    ;(async () => {
      const plugin = await import(/* webpackIgnore: true */ url).then(
        () => window[url]
      )
      console.log('got plugin', plugin)
      setPlugins({ ...plugins, [plugin.id]: plugin })
    })()
  }, [])
  console.log('redner', plugins)
  return (
    <ul>
      {Object.values(plugins).map(plugin => (
        <li key={plugin.id}>{plugin.metadata.name}</li>
      ))}
    </ul>
  )
}

export { Navigation }
