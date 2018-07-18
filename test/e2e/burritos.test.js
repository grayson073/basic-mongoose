const { assert } = require('chai');
const request = require('./request');
const { dropCollection } = require('./db');

describe('Burritos API', () => {

    beforeEach(() => dropCollection('foods'));

    let burrito;

    beforeEach(() => {
        const data = {
            name: 'Carne Asada',
            price: 5.00,
            ingredients: {
                meat: 'beef'
            }
        };

        return request
            .post('/api/burritos')
            .send(data)
            .then(({ body }) => burrito = body);
    });

    it('Saves a burrito', () => {
        assert.isOk(burrito._id);
    });

});