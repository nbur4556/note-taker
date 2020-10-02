const express = require('express');
const fs = require('fs');

const app = express();

let PORT = 3000;

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/public/index.html`);
});

app.get('/notes', (req, res) => {
    res.sendFile(`${__dirname}/public/notes.html`);
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});