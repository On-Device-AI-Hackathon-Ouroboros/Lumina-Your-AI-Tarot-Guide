const express = require('express');
const next = require('next');
const { createProxyMiddleware } = require('http-proxy-middleware');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // Log to verify the middleware setup
  console.log("Setting up proxy middleware...");

  // Set up the proxy for '/api' path
  server.use(
    '/api', // Match any request that starts with '/api'
    (req, res, next) => {
      console.log("Received request for API:", req.url); // Log every incoming API request
      next(); // Pass to the proxy middleware
    },
    createProxyMiddleware({
      target: 'http://127.0.0.1:5000', // Backend server URL
      changeOrigin: true, // Ensures cross-origin headers are handled correctly
      pathRewrite: { '^/api': '' }, // Optionally rewrite the URL path
      onProxyReq: (proxyReq, req, res) => {
        console.log(`Proxying request to: ${proxyReq.url}`); // Log each proxied request
      },
      onError: (err, req, res) => {
        console.error('Proxy error:', err); // Log the proxy error
        res.status(500).json({ error: 'Proxy error: ' + err.message });
      },
    })
  );

  // Handle all other requests with Next.js
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  // Start the server
  server.listen(3000, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
  });
});