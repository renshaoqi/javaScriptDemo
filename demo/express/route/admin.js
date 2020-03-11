const express = require('express');
const admin = express.Router();

admin.get('/index', (req, res) => {
    res.send('/admin/index');
})

module.exports = admin;
