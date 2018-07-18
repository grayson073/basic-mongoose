const router = require('express').Router();
const Burrito = require('../models/burrito');

module.exports = router
    .get('/', (req, res) => {
        Burrito.find(req.query)
            .lean()
            .then(burritos => res.json(burritos));
    });