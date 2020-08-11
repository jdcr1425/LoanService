const clientModel = require("../models/Client");
const clientsCtrl = {};
const _ = require('underscore');


clientsCtrl.index = async (req, res) => {
    try {
        const clients = await clientModel.find({});
        const numberOfClients = await clientModel.countDocuments({});

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

clientsCtrl.oneClient = async (req, res) => {
    try {
        let { id } = req.params
        const client = await clientModel.findOne({ _id: id });
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

clientsCtrl.createClient = async (req, res) => {
    try {

        //const { name, document, active, email, adress, telephone } = req.body;

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

clientsCtrl.updateClient = async (req, res) => {
    try {
        let id = req.params.id;

        let body = _.pick(req.body, ['name', 'email', 'document', 'active', 'adress', 'telephone']);

        const clientUpdate = await clientModel.findOneAndUpdate({_id:id}, body, { new: true, runValidators: true, context: 'query', useFindAndModify: false })

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