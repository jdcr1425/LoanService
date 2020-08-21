module.exports = app => {
    require("./routes/clients")(app);
    require("./routes/loans")(app);
    require("./routes/zones")(app)
};