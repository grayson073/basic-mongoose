const chai = require('chai');
const { assert } = chai;
const Burrito = require('../../lib/models/burrito');

const getErrors = (validation, numberExpected) => {
    assert.isDefined(validation);
    const errors = validation.errors;
    assert.equal(Object.keys(errors).length, numberExpected);
    return errors;
};

describe('Burrito model', () => {

    it('Validates a good model', () => {
        const data = {
            name: 'Carne Asada',
            price: 5.00,
            rating: 5,
            ingredients: {
                meat: 'beef',
                vegetables: 'Onions, avocado',
                hasCheese: true
            },
            isSpicy: true,
            greatFor: ['breakfast', 'lunch', 'dinner']
        };

        const burrito = new Burrito(data);
        const json = burrito.toJSON();
        delete json._id;
        assert.deepEqual(json, data);
        assert.isUndefined(burrito.validateSync());
    });

    it('Validates required fields', () => {
        const burrito = new Burrito({});
        const errors = getErrors(burrito.validateSync(), 3);
        assert.equal(errors.name.kind, 'required');
        assert.equal(errors['ingredients.meat'].kind, 'required');
        assert.equal(errors.price.kind, 'required');
    });

});