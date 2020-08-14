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
    interestPorcent: {
        type: Number,
        required: [true, 'The interest porcent is required']
    },
    active: {
        type: Boolean,
        default: true
    },
    coSigner: {
        type: Schema.Types.ObjectId,
        ref: "Client",
        required: false
    },
    finishLoanDate: {
        type: Date,
        required: [true, 'The finish loan date is required']
    }

},
    { timestamps: { createdAt: 'created_at' } }

);


module.exports = mongoose.model('Loan', LoanSchema);