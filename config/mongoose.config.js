const mongoose = require('mongoose');
mongoose.connect("mongodb://admin:admin@localhost:27017/Proyecto?authSource=admin")
    .then(() => console.log(`Established a connection to database`))
    .catch(err => console.log("Something went wrong when connecting to the database", err));