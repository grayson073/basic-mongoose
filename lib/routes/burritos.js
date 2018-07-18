const router = require('express').Router();
const Burrito = require('../models/burrito');

module.exports = router
    .post('/', (req, res) => {
        Burrito.create(req.body)
            .then(burrito => res.json(burrito));
    })

    .get('/', (req, res) => {
        Burrito.find(req.query)
            .lean()
            .then(burritos => res.json(burritos));
    })
