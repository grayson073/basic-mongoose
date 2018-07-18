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
            .select('name price')
            .then(burritos => res.json(burritos));
    })
    
    .get('/:id', (req, res) => {
        Burrito.findById(req.params.id)
            .lean()
            .then(burrito => {
                if(burrito === null) {
                    return res.sendStatus(404);
                }
                return res.json(burrito);
            });
    })