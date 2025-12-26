const express = require('express');
const app = express();
const port = 8000;

app.set('view engine', 'ejs');
app.use(express.urlencoded());

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
  res.render('index', {students});
}
);

app.post('/add-student', (req, res) =>{
    students.push(req.body);
    // console.log(req.body)
    return res.redirect('/')
}) 

app.get('/delete-student/:id', (req, res) => {
    // console.log(req.params.id);
    const id = req.params.id

    students = students.filter(stud => stud.id !== id)
    return res.redirect('/')
})

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
}
);