
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/"
  },
  {
    "renderMode": 2,
    "route": "/lotes"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 24094, hash: '4c751fb96708f00f8215981ea6bc89bdfda00cbdd596c1ed769ece2629ed7f21', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 17668, hash: '6512b67f6f559bbb65f4801d6f0fc236011bfa73038fe8e163038fa6fe38591b', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 125278, hash: 'cf301a9822372975f13df9a9bc249b466e96462753c8409747b63dad7da6afe5', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'lotes/index.html': {size: 125278, hash: 'cf301a9822372975f13df9a9bc249b466e96462753c8409747b63dad7da6afe5', text: () => import('./assets-chunks/lotes_index_html.mjs').then(m => m.default)},
    'styles-52WF6A3K.css': {size: 6979, hash: 'ob/HeOe/41A', text: () => import('./assets-chunks/styles-52WF6A3K_css.mjs').then(m => m.default)}
  },
};
