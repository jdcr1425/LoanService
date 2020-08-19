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

const deleteClient = (id, filters, options) => {
    return clientsModel.findOneAndUpdate({ _id: id }, filters, options)
}

const updateClient = (id, filters, options) => {
    return clientsModel.findOneAndUpdate({ _id: id }, filters, options)
}



module.exports = { getClients, getNumberofClients, getClient, hasALoan, saveClient, deleteClient, updateClient }