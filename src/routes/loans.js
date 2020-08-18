const LoansController = require("../controllers/loans");

//Clients routes
module.exports = app => {
    app.get("/loans", LoansController.index);
    app.post("/loans", LoansController.createLoan);
    app.get("/loans/:id", LoansController.oneLoan);
    /* app.put("/loans/:id", LoansController.updateLoan);*/
    app.delete("/loans/:id", LoansController.deleteLoan);
};