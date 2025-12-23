const express = require('express');
const app = express();
const port = 8000;

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.end("Welcome to Express Server");
}
);

app.get('/home', (req, res) => {
  res.render('index');
}
);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
}
);