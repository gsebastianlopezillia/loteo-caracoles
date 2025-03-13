
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/loteo-caracoles/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/loteo-caracoles"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 23584, hash: '549d8f38f2830b70f7076df97da57679cc78255addcf09d6640c803af3761b95', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 17158, hash: 'f5ac2d38636796e79306286de769991b6458e24eb60daa9b33446488ab847706', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 100345, hash: '0364cbf695b687cae054dc22e401fa5be48bc58f73c1af24dc0301743326e04f', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-52WF6A3K.css': {size: 6979, hash: 'ob/HeOe/41A', text: () => import('./assets-chunks/styles-52WF6A3K_css.mjs').then(m => m.default)}
  },
};
