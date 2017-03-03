const PATHS = new Map()
  .set('manifests', 'manifests')

const ROUTES = new Map()
  .set('home', '/')
  .set('scene', '/scene/:id')

const COLORS = new Map()
  .set('preloader-background', '#64B5F6')
  .set('scene-background', '#4DB6AC')

export {
  PATHS,
  ROUTES,
  COLORS
}
