const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


let Schema = mongoose.Schema;

let clientSchema = new Schema({
    name: {
        type: String,
        required: [true, 'The name is required']
    },
    document: {
        type: String,
        required: [true, 'The document is required']
    },
    active: {
        type: Boolean,
        default: true
    },
    email: {
        type: String,
        required: false
    },
    adress: {
        type: String,
        required: true
    },
    telephone: {
        type: String,
        required: true
    }

});


clientSchema.plugin(uniqueValidator, {
    message: '{PATH} should be unique'
})

module.exports = mongoose.model('Client', clientSchema);