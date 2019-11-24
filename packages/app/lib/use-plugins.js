import React, { useContext } from 'react'
import { PluginContext } from './context'

const usePlugins = () => {
  const { plugins } = useContext(PluginContext)
  return plugins
}

export { usePlugins }
