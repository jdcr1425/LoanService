const zoneController = require("../controllers/zones");

module.exports = app => {
    app.get("/zones", zoneController.index);
    app.post("/zones", zoneController.createZone);
    app.put("/zones/:id", zoneController.updateZone);
    app.delete("/zones/:id", zoneController.deleteZone);
}