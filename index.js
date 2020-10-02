const express = require('express');
const fs = require('fs');

const app = express();

let PORT = 3000;

app.get('/', (req, res) => {
    res.send('<h1>Hello World</h1>');
});

app.get('/notes', (req, res) => {
    res.send('<h1>Hello Notes</h1>');
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});