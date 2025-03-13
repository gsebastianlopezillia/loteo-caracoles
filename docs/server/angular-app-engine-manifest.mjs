
export default {
  basePath: 'https://gsebastianlopezillia.github.io/loteo-caracoles',
  supportedLocales: {
  "en-US": ""
},
  entryPoints: {
    '': () => import('./main.server.mjs')
  },
};
