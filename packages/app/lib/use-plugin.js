import React, { useState, useEffect } from 'react'

const usePlugin = url => {
  const [plugin, setPlugin] = useState(null)

  useEffect(() => {
    const resolvedPlugin = await import (/* webpackIgnore: true */ url)
    setPlugin(resolvedPlugin)
  }, [])

  return plugin
}

export { usePlugin }