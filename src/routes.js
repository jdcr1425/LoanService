const express = require('express');
const router = express.Router();
const ClientController = require("./controllers/clientsController")


//Clients routes
router.get("/clients", ClientController.index);
router.get("/clients/:id", ClientController.oneClient);
router.post("/clients", ClientController.createClient);
router.put("/clients/:id", ClientController.updateClient);



module.exports = router;
