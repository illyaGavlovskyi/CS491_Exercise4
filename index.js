// const express = require('express')
// const app = express()
// const port = 3000

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })
//  //das

const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.json());

// ✅ Serve files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// ✅ Token file path
const tokenFile = path.join(__dirname, 'token.json');

// Make sure token.json exists
if (!fs.existsSync(tokenFile)) {
  fs.writeFileSync(tokenFile, JSON.stringify({}));
}

// ✅ GET token
app.get('/token', (req, res) => {
  const token = JSON.parse(fs.readFileSync(tokenFile));
  res.json(token);
});

// ✅ POST token
app.post('/token', (req, res) => {
  fs.writeFileSync(tokenFile, JSON.stringify(req.body));
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
