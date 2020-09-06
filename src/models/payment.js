const validator = require('validator');
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const paymentSchema = new mongoose.Schema({
    id_loan: {
        type: Schema.Types.ObjectId,
        ref: "Loan",
        required: [true, 'The id loan is required']
    },
    amount: {
        type: Decimal128,
        required: [true, 'The amount is required']
    }

}, { timestamps: { createdAt: 'created_at' } });

module.exports = mongoose.models.Payment || mongoose.model('Payment', paymentSchema);