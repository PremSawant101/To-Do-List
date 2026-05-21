const express = require('express');

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.set('view engine', 'ejs');

let tasks = [
    { id: 1, task: 'Learn Node.js' },
    { id: 2, task: 'Practice Express' }
];

// Home page - view all tasks
app.get('/', (req, res) => {
    res.render('index', { tasks });
});

// Add task
app.post('/add', (req, res) => {
    const newTask = {
        id: Date.now(),
        task: req.body.task
    };

    tasks.push(newTask);
    res.redirect('/');
});

// Delete task
app.get('/delete/:id', (req, res) => {
    const id = Number(req.params.id);

    tasks = tasks.filter(task => task.id !== id);

    res.redirect('/');
});

// Edit task page
app.get('/edit/:id', (req, res) => {
    const id = Number(req.params.id);

    const task = tasks.find(task => task.id === id);

    res.render('edit', { task });
});

// Update task
app.post('/update/:id', (req, res) => {
    const id = Number(req.params.id);

    const task = tasks.find(task => task.id === id);

    task.task = req.body.task;

    res.redirect('/');
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});