const express = require('express');
const moment = require('moment');
const fs = require('fs');

const app = express();

let PORT = 3000;

// Returns db file as JSON data
function getDbData(filePath = `${__dirname}/db/db.json`) {
    let data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
}

// Writes JSON data to db file
function writeDbData(data, filePath = `${__dirname}/db/db.json`) {
    fs.writeFile(filePath, JSON.stringify(data), err => {
        if (err) throw err;
    });
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
// Get Note Info
app.get('/api/notes', (req, res) => {
    dataArray = getDbData();
    return res.json(dataArray);
});

// Add a Note
app.post('/api/notes', (req, res) => {
    let dataArray = getDbData();
    let newData = req.body;

    // Use current timestamp as data id
    newData.id = moment().format('yyyyMMDDHHmmssSS');

    dataArray.push(newData);
    writeDbData(dataArray);
    return res.json(dataArray);
});

// Delete a Note
app.delete('/api/notes/:id', (req, res) => {
    let dataArray = getDbData();
    let { id } = req.params;

    // Remove data object with matching id from dataArray
    for (let i = 0; i < dataArray.length; i++) {
        if (dataArray[i].id == id) {
            dataArray.splice(i, 1);
        }
    }

    writeDbData(dataArray);
    res.json(dataArray);
})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

