const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');

const zoneSchema = mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: [true, "Zone name is required"]
    },
    active: {
        type: Boolean,
        default: true
    }
});

zoneSchema.plugin(uniqueValidator, { type: 'mongoose-unique-validator' }, {
    message: '{PATH} should be unique'
});

module.exports = mongoose.model("Zone", zoneSchema);