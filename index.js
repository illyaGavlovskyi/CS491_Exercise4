const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');
const path = require('path');

app.use(express.json());

app.use(express.static('public'));

// Token file path
const tokenFile = path.join('token.json');

// Make sure token.json exists
if (!fs.existsSync(tokenFile)) {
  fs.writeFileSync(tokenFile, JSON.stringify({}));
}

// GET token
app.get('/token', (req, res) => {
  const token = JSON.parse(fs.readFileSync(tokenFile));
  res.json(token);
});

// POST token
app.post('/token', (req, res) => {
  fs.writeFileSync(tokenFile, JSON.stringify(req.body));
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
