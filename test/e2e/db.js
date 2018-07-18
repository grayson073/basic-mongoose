const connect = require('../../lib/connect');
connect('mongodb://localhost:27017/foods');
const mongoose = require('mongoose');

after(() => {
    return mongoose.connection.close();
});

module.exports = {
    
};