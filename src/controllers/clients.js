const _ = require('underscore');
const clientModel = require("../models/Client");
const clientsRepository = require("../repository/clients");

const clientsCtrl = {};

clientsCtrl.index = async(req, res) => {
    try {
        const { id } = req.params;
        const { hasLoans } = req.query;

        //param hasLoans -> returns true if the client requested has an active loan
        if (id && hasLoans) {
            const hasAloan = await clientsRepository.hasALoan({ id_client: id, active: true })
            if (hasAloan) {
                return res.status(200).json({ state: "ok", hasActiveLoan: true })
            } else {
                return res.status(200).json({ state: "ok", hasActiveLoan: false })
            }
        } else if (id) {

            const client = await clientsRepository.getClient({ _id: id });
            if (!client) throw ("User not found");
            return res.status(200).json({ state: "ok", client });

        } else {
            const clients = await clientsRepository.getClients({ active: true });

            return res.status(200).json({
                state: "ok",
                data: {
                    clients
                }
            });

        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ state: "error", error })
    }
}

clientsCtrl.createClient = async(req, res) => {
    try {
        const client = await clientsRepository.saveClient(req.body);

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

        const clientUpdate = await clientsRepository.updateClient(id, body, { new: true, runValidators: true, context: 'query', useFindAndModify: false })

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

        const clientDeleted = await clientsRepository.deleteClient(id, { active: false }, { new: true, runValidators: true, context: 'query', useFindAndModify: false })

        return res.status(201).json({
            ok: "ok",
            data: {
                clientDeleted,
            }
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({ state: "error", error })
    }

};

module.exports = clientsCtrl;