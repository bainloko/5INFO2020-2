/*
* KAUA MAIA COUSILLAS
* TDSI, PROGRAMAÇÃO III
* 04/04/2021
*/

const mongoose = require("mongoose");
const uri = "mongodb://localhost:27017/apnp";

mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('useFindAndModify', false);

module.exports = mongoose;