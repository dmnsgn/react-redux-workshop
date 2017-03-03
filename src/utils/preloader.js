import 'createjs-preloadjs'
import 'createjs-soundjs'

import { PATHS } from '../config'

const preloader = {
  queues: [],

  loadManifest(id, progress) {
    if (this.queues[id] && this.queues[id].loaded) return new Promise(resolve => resolve())

    // Create queue
    this.queues[id] = new createjs.LoadQueue(true)
    if (typeof progress === 'function') this.queues[id].addEventListener('progress', progress)
    this.queues[id].addEventListener('error', event => console.error(event))

    // Add plugins
    createjs.Sound.alternateExtensions = ['mp3']
    this.queues[id].installPlugin(createjs.Sound)

    return new Promise((resolve) => {
      this.queues[id].addEventListener('complete', (event) => {
        resolve(event)
      })

      this.queues[id].loadManifest({
        src: `/${PATHS.get('manifests')}/${id}.json`,
        type: 'manifest'
      })
    })
  },

  getAsset(id, asset, getItem) {
    if (!this.queues[id]) throw new Error(`Preloader with id: '${id}' does not exist.`)

    return getItem ? this.queues[id].getItem(asset) : this.queues[id].getResult(asset)
  }
}

export default preloader
