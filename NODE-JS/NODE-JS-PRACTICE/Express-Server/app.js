const express = require('express');
const app = express();
const port = 8000;

app.set('view engine', 'ejs');

const students = [
  {
    id: 1,
    name: "i",
    age: 20,
    email: "iam@test.com"
  },
  {
    id: 2,
    name: "he",
    age: 30,
    email: "he@test.com"
  },
  {
    id: 3,
    name: "she",
    age: 40,
    email: "she@test.com"
  },
  {
    id: 4,
    name: "it",
    age: 50,
    email: "it@test.com"
  },
]

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