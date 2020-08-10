const mongoose = require('mongoose');

mongoose.connect(process.env.URLDB, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) throw err;
    console.log('Successfully connected');
});

module.exports = mongoose;