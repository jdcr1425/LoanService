const _ = require('underscore');
const loanRespository = require('../repository/loans');
const clientRepository = require('../repository/clients');
const zoneRepository = require('../repository/zones');




const LoansCtrl = {};


LoansCtrl.index = async(req, res) => {
    try {
        const loans = await loanRespository.getLoans({ active: true });
        const numberOfLoans = await loanRespository.getNumberofLoans({ active: true });

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

        const loan = await loanRespository.getLoan({ _id: id });


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

        const client = await clientRepository.getClient({ _id: id_client });

        if (!client) throw ("Client does not exist");

        const coSigner = await clientRepository.getClient({ _id: id_cosigner });

        if (!coSigner) throw ("Co-signer does not exist");

        const zone = await zoneRepository.getZone({ _id: id_zone });

        if (!zone) throw ("The zone does not exist");

        if (amount < minimunLoanAmount) throw (`The amount must be higher than ${minimunLoanAmount} COP`);

        if (fee < minimunFeeAmount) throw (`The fee must be higher than ${minimunFeeAmount} COP`);

        console.log(Number(interestPercent));

        if (!Number(interestPercent)) throw (`The interest percent must be a valid number`);

        const Loan = await loanRespository.saveLoan(req.body);

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

        const loanUpdate = await loanRespository.updateLoan({ _id: id }, body, { new: true, runValidators: true, context: 'query', useFindAndModify: false })

        return res.status(201).json({
            ok: "ok",
            data: loanUpdate

        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({ state: "error", error })
    }

};


LoansCtrl.deleteLoan = async(req, res) => {

    try {
        const { id } = req.params;
        const deletedLoan = await loanRespository.deleteLoan({ _id: id }, { active: false }, { new: true, runValidators: true });
        if (deletedLoan) {
            return res.status(204).json({ state: "ok" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ state: "error", error })
    }
};

module.exports = LoansCtrl;