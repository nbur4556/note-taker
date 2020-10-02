const express = require('express');
const fs = require('fs');

const app = express();

let PORT = 3000;

// Returns db file as JSON data
function getDbData(filePath = `${__dirname}/db/db.json`) {
    let data = fs.readFileSync('db/db.json', 'utf8');
    return JSON.parse(data);
}

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
    dataArray = getDbData();
    return res.json(dataArray);
});

app.post('/api/notes', (req, res) => {
    let dataArray = getDbData();
    let newData = req.body;

    dataArray.push(newData);

    fs.writeFile('db/db.json', JSON.stringify(dataArray), err => {
        if (err) throw err;
    });

    return res.json(dataArray);
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});