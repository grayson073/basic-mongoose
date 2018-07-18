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

    .put('/:id', (req, res) => {
        Burrito.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            })
            .then(burrito => res.json(burrito));
    })

    .delete('/:id', (req, res) => {
        Burrito.findByIdAndRemove(req.params.id)
            .then((burrito) => {
                if(burrito) {
                    return res.json({ removed: true });
                } else {
                    return res.json({ removed: false });
                }
            });
    });