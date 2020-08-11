const validator = require('validator');
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
        required: [true, 'The document is required'],
        unique:true
    },
    active: {
        type: Boolean,
        default: true
    },
    email: {
        type: String,
        required: false,
        validate: [validator.isEmail, 'Wrong Email'] 
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


clientSchema.plugin(uniqueValidator, { type: 'mongoose-unique-validator' },{
    message: '{PATH} should be unique'
})

module.exports = mongoose.model('Client', clientSchema);