const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:8080',
      changeOrigin: true,
      ws: false,
      secure: false,
      timeout: 15000,
      proxyTimeout: 15000,
      onError(err, req, res) {
        console.error('PROXY ERROR:', err?.code || err?.message);
        res.writeHead(504, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Gateway Timeout (proxy)' }));
      },
    })
  );
};