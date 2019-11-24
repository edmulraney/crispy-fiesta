const resolvePlugin = async url =>
  await import(/* webpackIgnore: true */ url).then(() => {
    window[url].plugin.url = url
    return window[url].plugin
  })

export { resolvePlugin }
