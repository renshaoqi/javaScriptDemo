const express = require('express');
const home = express.Router();

home.get('/index', (req, res) => {
    res.send('/home/index');
})

module.exports = home;
