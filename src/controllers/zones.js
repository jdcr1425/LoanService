const _ = require("underscore");
const zoneRepository = require("../repository/zones");


const index = async(req, res) => {
    try {
        const zones = await zoneRepository.getZones({ active: true });
        const numberOfZones = await zoneRepository.getNumberOfZones({ active: true });

        return res.status(200).json({
            state: "ok",
            data: {
                zones,
                numberOfZones
            }
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            status: "error",
            err
        });
    }

};

const createZone = async(req, res) => {
    try {
        const createdZone = await zoneRepository.saveZone(req.body);
        if (createdZone) {
            return res.status(201).json({
                state: "ok",
                createdZone
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: "error",
            error
        })
    }
};

const updateZone = async(req, res) => {
    try {
        const id = req.params.id;

        const body = _.pick(req.body, ['name']);

        const zoneUpdate = await zoneRepository.updateZone(id, body, { new: true, runValidators: true, context: 'query', useFindAndModify: false })

        return res.status(201).json({
            ok: "ok",
            data: {
                zoneUpdate,
            }
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({ state: "error", error })
    }

};

const deleteZone = async(req, res) => {
    try {
        const id = req.params.id;

        const zoneDeleted = await zoneRepository.deleteZone(id, { active: false }, { new: true, runValidators: true, context: 'query', useFindAndModify: false })

        return res.status(201).json({
            ok: "ok",
            data: {
                zoneDeleted,
            }
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({ state: "error", error })
    }

};


module.exports = { index, createZone, updateZone, deleteZone }