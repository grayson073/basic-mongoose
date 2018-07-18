const { assert } = require('chai');
const request = require('./request');
const { dropCollection } = require('./db');

describe('Burritos API', () => {

    beforeEach(() => dropCollection('burritos'));

    let carneAsada;
    let californiaBurrito;

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
            .then(({ body }) => carneAsada = body);
    });

    beforeEach(() => {
        const data = {
            name: 'California Burrito',
            price: 7.00,
            ingredients: {
                meat: 'beef',
                vegetables: 'Onions, French Fries'
            }
        };

        return request
            .post('/api/burritos')
            .send(data)
            .then(({ body }) => californiaBurrito = body);
    });

    it('Saves a burrito', () => {
        assert.isOk(carneAsada._id);
    });

    it('Gets a list of burritos with only name and price selected', () => {
        return request
            .get('/api/burritos')
            .then(({ body }) => {
                assert.equal(body[0].name, ['Carne Asada']);
                assert.equal(body[1].name, ['California Burrito']);
                assert.equal(body[0].price, [5.00]);
                assert.equal(body[1].price, [7.00]);
            });
    });

    it('Gets a burrito by id', () => {
        return request
            .get(`/api/burritos/${carneAsada._id}`)
            .then(({ body }) => {
                assert.deepEqual(body, carneAsada);
            });
    });

    it('Returns a 404 if requested id doesn\'t exist', () => {
        return request
            .get('/api/burritos/5b4e19d81cb530811cda0999')
            .then(res => {
                assert.deepEqual(res.status, 404);
            });
    });

    it('Updates a resource by id', () => {
        californiaBurrito.name = 'Super Cali Burrito';

        return request
            .put(`/api/burritos/${californiaBurrito._id}`)
            .send(californiaBurrito)
            .then(({ body }) => {
                assert.deepEqual(body, californiaBurrito);
            });
    });

    it('Deletes a resource by id', () => {
        return request
            .del(`/api/burritos/${californiaBurrito._id}`)
            .then(({ body }) => {
                assert.isTrue(body.removed);
            });
    });

    it('Returns removed: false on non-existent object', () => {
        return request
            .del('/api/burritos/5b4f8bfe8990cdeff599803a')
            .then(({ body }) => {
                assert.isFalse(body.removed);
            });
    });

});