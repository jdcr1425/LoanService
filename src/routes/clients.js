const ClientController = require("../controllers/clients");

//Clients routes
module.exports = app => {
    app.get("/clients/:id?", ClientController.index);
    app.post("/clients", ClientController.createClient);
    app.put("/clients/:id", ClientController.updateClient);
    app.delete("/clients/:id", ClientController.deleteClient);

};