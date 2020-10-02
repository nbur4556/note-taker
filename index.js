const express = require('express');
const fs = require('fs');

const app = express();

let PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// PAGE ENDPOINT
app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/public/index.html`);
});

app.get('/notes', (req, res) => {
    res.sendFile(`${__dirname}/public/notes.html`);
});

// API ENDPOINT
app.get('/api/notes', (req, res) => {
    fs.readFile('db/db.json', 'utf8', (err, data) => {
        if (err) throw err;

        res.json(data);
    });
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});