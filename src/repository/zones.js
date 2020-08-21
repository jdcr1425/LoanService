const zoneModel = require("../models/zone");

const getZones = (filters) => {
    return zoneModel.find(filters);
};

const getNumberOfZones = (filters) => {
    return zoneModel.countDocuments(filters);
}

const saveZone = ({...params }) => {
    const newZone = new zoneModel(params);
    return newZone.save();

};

const updateZone = (id, newdata, options) => {
    return zoneModel.findOneAndUpdate({ _id: id }, newdata, options);
}

const deleteZone = (id, newdata, options) => {
    return zoneModel.findOneAndUpdate({ _id: id }, newdata, options);
}

module.exports = { getZones, saveZone, updateZone, deleteZone, getNumberOfZones };