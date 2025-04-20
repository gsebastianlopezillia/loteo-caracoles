
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
    'index.csr.html': {size: 24119, hash: 'c3be6bbaec14178d6b62992da0952635770607a8bf640f61278d9e4517e05a07', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 17668, hash: '87506a804e70e50d073932be8f2cb794b7f72d0a549d6769f76c616f964e605f', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 105835, hash: 'c7aa2d97f8af08cb55e159b3367cf2d006cb98157504caa64414b38b6dde1241', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'lotes/index.html': {size: 105835, hash: 'c7aa2d97f8af08cb55e159b3367cf2d006cb98157504caa64414b38b6dde1241', text: () => import('./assets-chunks/lotes_index_html.mjs').then(m => m.default)},
    'styles-2ZXIKNV5.css': {size: 7004, hash: 'P7StzgCJIAU', text: () => import('./assets-chunks/styles-2ZXIKNV5_css.mjs').then(m => m.default)}
  },
};
