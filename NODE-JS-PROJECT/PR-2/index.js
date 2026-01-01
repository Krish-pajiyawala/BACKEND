const express = require('express');
const port = 8080;
const app = express()

app.set('view engine', 'ejs');
app.use(express.urlencoded())
app.use(express.json())

let students = [
    {
        id: "1",
        name: "john",
        age: "19",
        email: "john@test.in"
    },
    {
        id: "2",
        name: "jolly",
        age: "19",
        email: "jolly@test.in"
    },
    {
        id: "3",
        name: "jonny",
        age: "21",
        email: "jonny@test.in"
    },
    {
        id: "4",
        name: "nobita",
        age: "19",
        email: "nobita@test.in"
    },
]

app.get('/', (req, res) => {
    res.render('index', { students })
})

app.post('/add-student', (req, res) => {
    students.push(req.body);
    return res.redirect('/')
})

app.get('/delete-student/:id', (req, res) => {
    const id = req.params.id

    students = students.filter(stud => stud.id !== id)
    return res.redirect('/')
})

app.get('/edit-student/:id', (req, res) => {

    let id = req.params.id;
    student = students.find((stud) => stud.id == id);
    return res.render('edit-student', { student })
})

app.post('/update-student/:id', (req, res) => {
    let id = req.params.id;

    let update = students.map((stud) => {
        if (stud.id == id) {
            return {
                ...req.body,
                id: id,
            }
        } else {
            return stud
        }
    })

    students = update
    res.redirect('/')
})

app.listen(port, () => {
    console.log(`Server is started at http://localhost:${port}`);
});