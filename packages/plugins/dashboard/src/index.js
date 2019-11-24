import { plugin } from './plugin.js'

export { plugin }

module.hot.accept('./plugin.js', () => {
  const event = new CustomEvent('hmr', { detail: { plugin } })
  document.body.dispatchEvent(event)
  console.log('updated plugin')
})
