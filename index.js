/*
* KAUA MAIA COUSILLAS - IFSUL CAMPUS BAGE
* TDSI, PROGRAMACAO III
* 11/03/2021
*/

const express = require("express"); //servidor
const app = express(); //construtor do servidor
var bodyParser = require("body-parser"); //recebe a requisição body e faz o parse para uma interpretação adequada pelo JavaScript
var cookieParser = require("cookie-parser"); //recebe cookies e faz o parse para uma interpretação adequada pelo JavaScript
var path = require("path");

app.use(bodyParser.json()); //inicializa, em json, o body-parser
app.use(bodyParser.urlencoded({extended:false})); //define o body-parser como não estendido
app.use(cookieParser()); //inicializa o cookie-parser

app.set("view engine", "ejs"); //define a view engine do servidor como o ejs

app.use(express.static(path.join(__dirname, "public"))); //define a localização da pasta estática do servidor

//fim da configuração inicial do servidor /\
app.get('/', function(req, res){
    //res.send("Oi mundo.");
    res.render("formulario.ejs");
});

app.post('/', function(req, res){
    res.send("Oi mundo, via Post!");
});

/* fim do código do servidor
app.listen(3000, ()=>console.log("Conexão inicializada com sucesso.")); //somente com comandos de uma só linha
*/
app.listen(3000, function(){
    console.log("Conexão inicializada com sucesso.") //sempre no fim do código, temos a app.listen, que abre a porta para o recebimento de comandos do servidor. função anônima de callback inserida
});