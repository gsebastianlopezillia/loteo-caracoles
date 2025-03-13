
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: 'https://gsebastianlopezillia.github.io/loteo-caracoles/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/loteo-caracoles"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 23622, hash: '8e7c2adc2147e4059ec3d0abfbd4d32bc470ffd3ed6c71ed347ab19d84a0855c', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 17196, hash: '14a2a3328da123f349e2af0664bf10348d48a62f4237f173b71362295f70e803', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 100383, hash: '779a86bc0689eda14c9c93260759a74e86fb7ca3856a2c6210488a5aa70a8a33', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-52WF6A3K.css': {size: 6979, hash: 'ob/HeOe/41A', text: () => import('./assets-chunks/styles-52WF6A3K_css.mjs').then(m => m.default)}
  },
};
