
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/loteo-caracoles/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/loteo-caracoles"
  },
  {
    "renderMode": 2,
    "route": "/loteo-caracoles/lotes"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 24110, hash: '4a1478f3109622904d11075fbed3bf90bd9bd628e26789a40f27df84395edf68', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 17684, hash: '34e0b08d2df1d24a2a6c293a3f23b6e33c7e5bf5bf7ad51e6a028747f4851406', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 125294, hash: '463c415349d500ea4ded441509309c400e07a9163c4ce1f1445f411a817a6aa3', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'lotes/index.html': {size: 125294, hash: '463c415349d500ea4ded441509309c400e07a9163c4ce1f1445f411a817a6aa3', text: () => import('./assets-chunks/lotes_index_html.mjs').then(m => m.default)},
    'styles-52WF6A3K.css': {size: 6979, hash: 'ob/HeOe/41A', text: () => import('./assets-chunks/styles-52WF6A3K_css.mjs').then(m => m.default)}
  },
};
