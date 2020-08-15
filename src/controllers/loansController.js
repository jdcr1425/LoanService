const LoanModel = require("../models/Loan");
const clientModel = require("../models/Client");

const LoansCtrl = {};
const _ = require('underscore');

LoansCtrl.index = async (req, res) => {
    try {
        const loans = await LoanModel.find({ active: true });
        const numberOfLoans = await LoanModel.countDocuments({ active: true });

        return res.status(200).json({
            state: "ok",
            data: {
                loans,
                numberOfLoans
            }
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({ state: "error", error })
    }

}

LoansCtrl.oneLoan = async (req, res) => {
    try {
        let { id } = req.params;

        const loan = await LoanModel.findOne({ _id: id });


        return res.status(200).json({
            state: "ok",
            data: {
                loan
            }
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({ state: "error", error })
    }
}

LoansCtrl.createLoan = async (req, res) => {
    try {

        /**
         * TODO:
         * Verify if loan client and loan co-signer exists.
         */
         const minimunLoanAmount=50,minimunFeeAmount=50;


         const {id_client, IdCosigner, amount, fee} = req.body

         const client = clientModel.findOne({_id: id_client});

         if(!client) throw("Client does not exist");

         const coSigner = clientModel.findOne({_id: IdCosigner});

         if(!coSigner) throw("Co-signer does not exist");

         if(amount<minimunLoanAmount) throw(`The amount must be higher than ${minimunLoanAmount} COP`);

         if(fee<minimunFeeAmount)throw(`The fee must be higher than ${minimunFeeAmount} COP`);


        const newLoan = new LoanModel(req.body);

        const Loan = await newLoan.save();

        return res.status(201).json({
            state: "ok",
            data: {
                Loan,
            }
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({ state: "error", error })
    }

}

module.exports = LoansCtrl;