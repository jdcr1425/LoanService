const clientsModel = require("../models/client");
const loansModel = require("../models/loan");

const getClients = (filters) => {
    return clientsModel.find(filters);
}

const getNumberofClients = (filters) => {
    return clientsModel.countDocuments(filters);
}

const getClient = (filters) => {
    return clientsModel.findOne(filters);
}

const hasALoan = (filters) => {
    return loansModel.findOne(filters);
}

const saveClient = ({...params }) => {
    const newClient = new clientsModel(params);
    return newClient.save();
}

const deleteClient = (id, newdata, options) => {
    return clientsModel.findOneAndUpdate({ _id: id }, newdata, options)
}

const updateClient = (id, newdata, options) => {
    return clientsModel.findOneAndUpdate({ _id: id }, newdata, options)
}



module.exports = { getClients, getNumberofClients, getClient, hasALoan, saveClient, deleteClient, updateClient }