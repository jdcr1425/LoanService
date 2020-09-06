const LoanModel = require("../models/Loan");

const getLoans = (filters) => {
    return LoanModel.find(filters);
}

const getNumberofLoans = (filters) => {
    return LoanModel.countDocuments(filters);
}

const getLoan = (filters) => {
    return LoanModel.findOne(filters);
}

const saveLoan = ({...params }) => {
    const newLoan = new LoanModel(params);
    return newLoan.save();

};

const updateLoan = (id, newdata, options) => {
    return LoanModel.findOneAndUpdate({ _id: id }, newdata, options)
}

const deleteLoan = (id, newdata, options) => {
    return LoanModel.findOneAndUpdate({ _id: id }, newdata, options);
}



module.exports = { getLoans, getNumberofLoans, getLoan, saveLoan, updateLoan, deleteLoan }