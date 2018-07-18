/* eslint no-console: "off" */
const mongoose = require('mongoose');

module.exports = function(dbUri) {

    mongoose.connect(dbUri, { useNewUrlParser: true });

    mongoose.connection.on('connected', () => {
        console.log('Mongoose connection open to ' + dbUri);
    });

    mongoose.connection.on('error', (err) => {
        console.log('Mongoose connection error: ' + err);
    });

    mongoose.connection.on('disconnected', () => {
        console.log('Mongoose disconnected');
    });

    process.on('SIGINT', () => {
        mongoose.connection.close(() => {
            console.log('Mongoose disconnected through app termination');
            process.exit(0);
        });
    });
};