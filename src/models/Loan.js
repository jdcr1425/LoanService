const validator = require('validator');
const mongoose = require('mongoose');
const { Decimal128 } = require('mongodb');

let validLoanType = {
    values: ['DAILY', 'MONTHLY', 'WEEKLY', 'BIWEEKLY'],
    message: '{VALUE} is not a valid loan type'
}

let Schema = mongoose.Schema;

let LoanSchema = new Schema({
        id_client: {
            type: Schema.Types.ObjectId,
            ref: "Client",
            required: [true, 'The client is required']
        },
        id_zone: {
            type: Schema.Types.ObjectId,
            ref: "Zone",
            required: [true, 'The zone is required']
        },
        amount: {
            type: Decimal128,
            required: [true, 'The amount is required']
        },
        fee: {
            type: Decimal128,
            required: [true, 'The fee is required'],
        },
        loanType: {
            type: String,
            default: 'DAILY',
            enum: validLoanType,
            required: true
        },
        interestPercent: {
            type: Number,
            required: [true, 'The interest porcent is required']
        },
        active: {
            type: Boolean,
            default: true
        },
        IdCosigner: {
            type: Schema.Types.ObjectId,
            ref: "Client",
            required: false
        },
        loanDate: {
            type: Date,
            required: [true, 'The finish loan date is required']
        },
        finishLoanDate: {
            type: Date,
            required: [true, 'The finish loan date is required']
        },
        interests: Decimal128,
        balance: Decimal128
    }

);


module.exports = mongoose.models.Loan || mongoose.model('Loan', LoanSchema);