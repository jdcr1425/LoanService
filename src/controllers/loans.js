const _ = require('underscore');

const LoanModel = require("../models/Loan");
const clientModel = require("../models/Client");
const zoneModel = require("../models/zone");

const LoansCtrl = {};


LoansCtrl.index = async(req, res) => {
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

LoansCtrl.oneLoan = async(req, res) => {
    try {
        let { id } = req.params;

        const loan = await LoanModel.findById({ _id: id });


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

LoansCtrl.createLoan = async(req, res) => {
    try {

        const minimunLoanAmount = 50,
            minimunFeeAmount = 50;

        const { id_client, id_cosigner, amount, fee, interestPercent, id_zone } = req.body

        const client = await clientModel.findById({ _id: id_client });

        if (!client) throw ("Client does not exist");

        const coSigner = await clientModel.findById({ _id: id_cosigner });

        if (!coSigner) throw ("Co-signer does not exist");

        const zone = await zoneModel.findById({ _id: id_zone });

        if (!zone) throw ("The zone does not exist");

        if (amount < minimunLoanAmount) throw (`The amount must be higher than ${minimunLoanAmount} COP`);

        if (fee < minimunFeeAmount) throw (`The fee must be higher than ${minimunFeeAmount} COP`);

        console.log(Number(interestPercent));

        if (!Number(interestPercent)) throw (`The interest percent must be a valid number`);


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

};


LoansCtrl.updateLoan = async(req, res) => {
    try {
        const { id } = req.params;

        const body = _.pick(req.body, ['amount', 'fee', 'loanType', 'interestPercent', 'finishLoanDate']);

        const loanUpdate = await LoanModel.findOneAndUpdate({ _id: id }, body, { new: true, runValidators: true, context: 'query', useFindAndModify: false })

        return res.status(201).json({
            ok: "ok",
            data: {
                loanUpdate,
            }
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({ state: "error", error })
    }

};


LoansCtrl.deleteLoan = async(req, res) => {

    try {
        const { id } = req.params;
        const deletedLoan = await LoanModel.findByIdAndUpdate({ _id: id }, { active: false }, { new: true, runValidators: true });
        if (deletedLoan) {
            return res.status(204).json({ state: "ok" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ state: "error", error })
    }
};

module.exports = LoansCtrl;