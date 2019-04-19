const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const soldPriceSchema = new Schema({
    lat: {
        type: Number,
        required: true
    },
    long: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('SoldPrice', soldPriceSchema, 'SoldPrice');