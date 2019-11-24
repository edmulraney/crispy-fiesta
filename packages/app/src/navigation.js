import React, { useEffect, useState, useRef } from 'react'
import { render } from 'react-dom'
import { usePlugins } from '../lib/use-plugins'

const Navigation = props => {
  const ref = useRef(null)
  const plugins = usePlugins()
  useEffect(() => {
    if (ref !== null && plugins.length) {
      console.log({ plugins })
      const Plugin = plugins[0].App
      render(<Plugin />, ref.current)
      document.body.addEventListener('hmr', evt => {
        console.log('received hmr event', ref.current, { evt })
        render(<evt.detail.plugin.App />, ref.current)
      })
    }
  }, [plugins, ref])

  return (
    <ul>
      {plugins.map(plugin => {
        return (
          <React.Fragment key={plugin.id}>
            <li>{plugin.metadata.name}</li>
            <div ref={ref}></div>
          </React.Fragment>
        )
      })}
    </ul>
  )
}

export { Navigation }
