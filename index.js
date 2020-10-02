const express = require('express');
const fs = require('fs');

const app = express();

let PORT = 3000;

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
})