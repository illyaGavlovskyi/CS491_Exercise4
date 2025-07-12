const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');
const path = require('path');

app.use(express.json());

app.use(express.static('public'));

// Path to the token file
const tokenFile = path.join('token.json');

// If no json create it with an empty JSON object
if (!fs.existsSync(tokenFile)) {
  fs.writeFileSync(tokenFile, JSON.stringify({}));
}

// Read and return as josn a GET request
app.get('/token', (req, res) => {
  const token = JSON.parse(fs.readFileSync(tokenFile));
  res.json(token);
});

// Writes the token.json file
app.post('/token', (req, res) => {
  fs.writeFileSync(tokenFile, JSON.stringify(req.body));
  res.sendStatus(200);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
