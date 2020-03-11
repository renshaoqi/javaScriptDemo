const express = require('express');
const fs = require('fs');
const readFile = require('util').promisify(fs.readFile)
const app = express();

app.get('/admin', async (req, res, next) => {
    try {
        let result = await readFile('./1-使用.js');
        console.log(result.toString());
    } catch (err) {
        next(err);
    }
});

app.use((err, req, res, next) => {
    res.status(500).send(err.message);
});

app.listen(7788);
