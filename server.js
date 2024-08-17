const { createServer } = require('node:http');
const { readFile } = require('node:fs').promises;
const path = require('node:path');

const hostname = '127.0.0.1';
const port = 3000;

const server = createServer(async (req, res) => {
  try {
    if (req.url === '/') {
      // Serve index.html
      const filePath = path.join(__dirname, 'index.html');
      const fileContent = await readFile(filePath, 'utf-8');
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/html');
      res.end(fileContent);
    } else {
      // Serve a 404 for other routes
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/plain');
      res.end('404 Not Found');
    }
  } catch (err) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'text/plain');
    res.end('500 Internal Server Error');
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at https://${hostname}:${port}/`);
});