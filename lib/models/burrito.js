const mongoose = require('mongoose');
const { Schema } = mongoose;

const burrito = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        required: false,
        min: 1,
        max: 5
    },
    ingredients: {
        meat: {
            type: String,
            required: true,
            enum: ['beef', 'chicken', 'pork']
        },
        vegetables: String,
        hasCheese: Boolean
    },
    isSpicy: {
        type: Boolean,
        default: true
    },
    greatFor: [String]
});

module.exports = mongoose.model('Burrito', burrito);