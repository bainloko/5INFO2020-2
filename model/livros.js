/*
* @bainloko
* TDSI, PROGRAMAÇÃO III
* 04/04/2021
*/

var conexao = require("../config/conexao.js");

var livroSchema = conexao.Schema({
    nomeLivro:{type:String},
    autor:{type:String},
    anoPubli:{type:Number},
    editora:{type:String},
    email:{type:String},
    quantidade:{type:Number}
});

module.exports = conexao.model("Livro", livroSchema);