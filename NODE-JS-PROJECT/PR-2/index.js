const express = require('express');
const port = 8000;
const app = express()

app.set('view engine', 'ejs');
app.use(express.urlencoded())
app.use(express.json())

// Changed students array to tasks array
let tasks = [
    {
        id: "1",
        title: "Complete Project Proposal",
        description: "Write and submit the final project proposal document",
        due_date: "2024-01-15",
        due_time: "18:00",
        status: "pending"
    },
    {
        id: "2",
        title: "Team Meeting",
        description: "Weekly team sync-up meeting",
        due_date: "2024-01-10",
        due_time: "14:30",
        status: "completed"
    },
    {
        id: "3",
        title: "Code Review",
        description: "Review pull requests from junior developers",
        due_date: "2024-01-12",
        due_time: "16:00",
        status: "in-progress"
    },
    {
        id: "4",
        title: "Client Presentation",
        description: "Prepare slides and demo for client meeting",
        due_date: "2024-01-20",
        due_time: "11:00",
        status: "pending"
    },
]

// Home route - changed to tasks
app.get('/', (req, res) => {
    res.render('index', { tasks })
})

// Add task route
app.post('/add-task', (req, res) => {
    // Add default status if not provided
    const newTask = {
        ...req.body,
        status: req.body.status || 'pending'
    };
    tasks.push(newTask);
    return res.redirect('/')
})

// Delete task route
app.get('/delete-task/:id', (req, res) => {
    const id = req.params.id
    tasks = tasks.filter(task => task.id !== id)
    return res.redirect('/')
})

// Edit task route - show edit form
app.get('/edit-task/:id', (req, res) => {
    let id = req.params.id;
    let task = tasks.find((task) => task.id == id);
    
    if (!task) {
        return res.redirect('/')
    }
    
    return res.render('to-do', { task })
})

// Update task route
app.post('/update-task/:id', (req, res) => {
    let id = req.params.id;

    let updatedTasks = tasks.map((task) => {
        if (task.id == id) {
            return {
                ...req.body,
                id: id,
            }
        } else {
            return task
        }
    })

    tasks = updatedTasks
    res.redirect('/')
})

app.get('/complete-task/:id', (req, res) => {
    let id = req.params.id;
    
    tasks = tasks.map((task) => {
        if (task.id == id) {
            return {
                ...task,
                status: 'completed'
            }
        } else {
            return task
        }
    })
    
    return res.redirect('/')
})

app.get('/start-task/:id', (req, res) => {
    let id = req.params.id;
    
    tasks = tasks.map((task) => {
        if (task.id == id) {
            return {
                ...task,
                status: 'in-progress'
            }
        } else {
            return task
        }
    })
    
    return res.redirect('/')
})

app.listen(port, () => {
    console.log(`Task Management Server started at http://localhost:${port}`);
});