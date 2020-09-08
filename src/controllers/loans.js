const _ = require('underscore');
const dayjs = require('dayjs')
const loanRespository = require('../repository/loans');
const clientRepository = require('../repository/clients');
const zoneRepository = require('../repository/zones');




const LoansCtrl = {};

const getBalance = (interestAmount, amount) => {
    return interestAmount + amount;
}

const getInterests = (amount, interestPercent, numberOfMonths) => {
    return ((amount * interestPercent) / 100) * numberOfMonths
}

const getNumberOfMonths = (loanDate, finishLoanDate) => {

    const loan_date = dayjs(loanDate);
    const finish_loan_date = dayjs(finishLoanDate);
    const months = finish_loan_date.diff(loan_date, "month");

    return months;
}

const validDate = (loanDate, finishLoanDate) => {
    const loan_date = dayjs(loanDate);
    const finish_loan_date = dayjs(finishLoanDate);

    if (loan_date.isBefore(dayjs(), 'day')) throw ("Loan date is not valid")

    if (finish_loan_date.isBefore(loan_date)) throw ("Finish loan date must be after loan date")

    if (finish_loan_date.isSame(loan_date)) throw ("Dates cannot be the same")
}


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

        if (!loan) res.status(404).json({ state: "error", msj: "The loan does not exist in the data base" })

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

        const { id_client, id_cosigner, amount, fee, interestPercent, id_zone, loanType, finishLoanDate, interests, balance, loanDate } = req.body

        const client = await clientRepository.getClient({ _id: id_client });

        if (!client) throw ("Client does not exist");

        const coSigner = await clientRepository.getClient({ _id: id_cosigner });

        if (!coSigner) throw ("Co-signer does not exist");

        const zone = await zoneRepository.getZone({ _id: id_zone });

        if (!zone) throw ("The zone does not exist");

        if (amount < minimunLoanAmount) throw (`The amount must be higher than ${minimunLoanAmount} COP`);

        if (fee < minimunFeeAmount) throw (`The fee must be higher than ${minimunFeeAmount} COP`);

        if (!Number(interestPercent)) throw (`The interest percent must be a valid number`);

        validDate(loanDate, finishLoanDate) //Validate if dates are valid

        const numberOfMonths = getNumberOfMonths(loanDate, finishLoanDate);

        const interest = getInterests(amount, interestPercent, numberOfMonths);

        const balance_total = getBalance(interest, amount);

        const newLoan = {
            id_client,
            id_cosigner,
            amount,
            fee,
            interestPercent,
            id_zone,
            loanType,
            finishLoanDate,
            interests: interest,
            balance: balance_total,
            loanDate
        };

        const Loan = await loanRespository.saveLoan(newLoan);

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