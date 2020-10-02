const express = require('express');
const fs = require('fs');

const app = express();

let PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Returns db file as JSON data
function getDbData(filePath = `__dirname/db/db.json`) {
    let data = fs.readFileSync('db/db.json', 'utf8');
    return JSON.parse(data);
}

// PAGE ENDPOINT
app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/public/index.html`);
});

app.get('/notes', (req, res) => {
    res.sendFile(`${__dirname}/public/notes.html`);
});

// API ENDPOINT
app.get('/api/notes', (req, res) => {
    data = getDbData();
    return res.json(data);
});

app.post('/api/notes', (req, res) => {
    let data = req.body;

    fs.appendFile('db/db.json', JSON.stringify(data), err => {
        if (err) throw err;
    });

    return res.json(data);
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});