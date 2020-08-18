const ClientController = require("../controllers/clients");

//Clients routes
module.exports = app => {
    app.get("/clients", ClientController.index);
    app.get("/clients/:id", ClientController.oneClient);
    app.post("/clients", ClientController.createClient);
    app.put("/clients/:id", ClientController.updateClient);
    app.delete("/clients/:id", ClientController.deleteClient);

};