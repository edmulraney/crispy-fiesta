import React, { useEffect, useState, useRef } from 'react'
import { usePlugins } from '../lib/use-plugins'

const Navigation = props => {
  const ref = useRef(null)
  const plugins = usePlugins()

  return (
    <ul>
      {plugins.map(plugin => {
        return (
          <React.Fragment key={plugin.id}>
            <li>{plugin.metadata.name}</li>
            <plugin.App />
          </React.Fragment>
        )
      })}
    </ul>
  )
}

export { Navigation }
