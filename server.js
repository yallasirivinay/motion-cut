const express = require('express');
const mysql = require('mysql');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

const db = mysql.createConnection({
    host: 'localhost',
    user: 'your_mysql_username',
    password: 'your_mysql_password',
    database: 'task_manager'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
    } else {
        console.log('Connected to MySQL database');
        db.query('CREATE TABLE IF NOT EXISTS tasks (id INT AUTO_INCREMENT PRIMARY KEY, task TEXT)', (err) => {
            if (err) {
                console.error('Error creating tasks table:', err);
            }
        });
    }
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/api/tasks', (req, res) => {
    const task = req.body.task;

    if (task) {
        db.query('INSERT INTO tasks (task) VALUES (?)', [task], (err) => {
            if (err) {
                console.error(err);
                res.status(500).send('Internal Server Error');
            } else {
                res.status(201).send('Task added successfully');
            }
        });
    } else {
        res.status(400).send('Bad Request');
    }
});

app.get('/api/tasks', (req, res) => {
    db.query('SELECT * FROM tasks', (err, rows) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        } else {
            const tasks = rows.map(row => row.task);
            res.json(tasks);
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
