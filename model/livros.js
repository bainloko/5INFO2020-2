/*
* KAUA MAIA COUSILLAS
* TDSI, PROGRAMAÇÃO III
* 04/04/2021
*/

var conexao = require("../config/conexao.js");

var livroSchema = conexao.Schema({
    livro:{type:String},
    autor:{type:String},
    data:{type:Date},
    editora:{type:String},
    email:{type:String},
    quantidade:{type:Number}
});

module.exports = conexao.model("Livro", livroSchema);