const loanModel = require("../models/loan");
const clientModel = require("../models/Client");

const clientsCtrl = {};
const _ = require('underscore');


clientsCtrl.index = async(req, res) => {
    try {
        const clients = await clientModel.find({ active: true });
        const numberOfClients = await clientModel.countDocuments({ active: true });

        return res.status(200).json({
            state: "ok",
            data: {
                clients,
                numberOfClients
            }
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({ state: "error", error })
    }

};

clientsCtrl.oneClient = async(req, res) => {
    try {
        const { id } = req.params;
        const { hasLoans } = req.query;

        //param hasLoans -> returns true if the client requested has an active loan
        if (hasLoans) {
            const hasAloan = await loanModel.findOne({ id_client: id, active: true });

            if (hasAloan) {
                return res.status(200).json({ state: "ok", hasActiveLoan: true })
            } else {
                return res.status(200).json({ state: "ok", hasActiveLoan: false })
            }
        }

        const client = await clientModel.findOne({ _id: id });

        if (!client) throw ("User not found");

        return res.status(200).json({
            state: "ok",
            data: {
                client
            }
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({ state: "error", error })
    }
}

clientsCtrl.createClient = async(req, res) => {
    try {

        const newClient = new clientModel(req.body);

        const client = await newClient.save();

        return res.status(201).json({
            state: "ok",
            data: {
                client,
            }
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({ state: "error", error })
    }

};

clientsCtrl.updateClient = async(req, res) => {
    try {
        const id = req.params.id;

        const body = _.pick(req.body, ['name', 'email', 'document', 'adress', 'telephone']);

        const clientUpdate = await clientModel.findOneAndUpdate({ _id: id }, body, { new: true, runValidators: true, context: 'query', useFindAndModify: false })

        return res.status(201).json({
            ok: "ok",
            data: {
                clientUpdate,
            }
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({ state: "error", error })
    }

};

clientsCtrl.deleteClient = async(req, res) => {
    try {
        const id = req.params.id;

        const clientUpdate = await clientModel.findOneAndUpdate({ _id: id }, { active: false }, { new: true, runValidators: true, context: 'query', useFindAndModify: false })

        return res.status(201).json({
            ok: "ok",
            data: {
                clientUpdate,
            }
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({ state: "error", error })
    }

};





module.exports = clientsCtrl;