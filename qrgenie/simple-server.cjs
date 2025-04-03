const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  // Serve the simple.html file for all requests
  fs.readFile(path.join(__dirname, 'simple.html'), (err, data) => {
    if (err) {
      res.writeHead(500);
      res.end('Error loading simple.html');
      return;
    }
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(data);
  });
});

const PORT = 8080;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
}); 