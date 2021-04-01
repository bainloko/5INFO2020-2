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

app.use(cookieParser()); //inicializa o cookie-parser
app.use(bodyParser.json()); //inicializa o body-parser em json
app.use(bodyParser.urlencoded({extended:false})); //define o body-parser como não estendido

app.set("view engine", "ejs"); //define a view engine do servidor como o ejs

app.use(express.static(path.join(__dirname, "public"))); //define a localização da pasta estática do servidor

//fim da configuração inicial do servidor /\
//listar todos os dados \/
app.get('/', function(req, res){
    //res.send("Oi mundo.");
    res.render("list.ejs");
});

//listar os dados de acordo com um filtro
app.post('/', function(req, res){
    res.render("list.ejs");
});

//cadastrar uma nova entrada; inicializar a tela add em branco
app.get('/add', function(req, res){
    res.render("add.ejs");
});

//salvar os dados adicionados no BD
app.post('/add', function(req, res){
    res.render('add.ejs');
});

//editar uma entrada já existente; inicializar a tela edit em branco
app.get('/edit', function(req, res){
    res.render("edit.ejs");
});

//salvar os dados editados no BD
app.post('/edit', function(req, res){
    res.render('edit.ejs');
});

//deletar uma entrada no BD
app.get('/del', function(req, res){
    res.render('list.ejs');
});

//créditos
app.get('/autor', function(req, res){
    res.send("Desenvolvido por Kauã Maia Cousillas, na disciplina de Programação III")
});

/* fim do código do servidor
app.listen(3000, ()=>console.log("Conexão inicializada com sucesso.")); //somente com comandos de uma só linha
*/
app.listen(3000, function(){
    console.log("Conexão inicializada com sucesso.") //sempre no fim do código, temos a app.listen, que abre a porta para o recebimento de comandos do servidor. função anônima de callback inserida
});