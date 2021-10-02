/*
* @bainloko
* TDSI, PROGRAMACAO III
* 11/03/2021
*/

const express = require("express"); //servidor
const app = express(); //construtor do servidor
var bodyParser = require("body-parser"); //recebe a requisição body e faz o parse para uma interpretação adequada pelo JavaScript
var cookieParser = require("cookie-parser"); //recebe cookies e faz o parse para uma interpretação adequada pelo JavaScript
var path = require("path");
var LivroModel = require("./model/livros.js");

app.use(cookieParser()); //inicializa o cookie-parser
app.use(bodyParser.json()); //inicializa o body-parser em json
app.use(bodyParser.urlencoded({extended:false})); //define o body-parser como não estendido

app.set("view engine", "ejs"); //define a view engine do servidor como o ejs

app.use(express.static(path.join(__dirname, "public"))); //define a localização da pasta estática do servidor

//fim da configuração inicial do servidor /\
//listar todos os dados \/
app.get('/', function(req, res){
    //res.send("Oi mundo.");

    LivroModel.find({}).lean().exec(function(err, docs){
        if(err){
            console.log("Houve um erro inesperado ao buscar os dados. Por favor, tente novamente! Código: " + err);
            res.send("Houve um erro inesperado ao buscar os dados. Por favor, tente novamente! Código: " + err);
        } else {
            res.render("list.ejs", {"Livros":docs, "msg":""});
        }
    });
});

//listar os dados de acordo com um filtro
app.post('/', function(req, res){
    LivroModel.find({'nomeLivro' : new RegExp(req.body.txtPesquisa, 'i')}).lean().exec(function(err, docs){ //{'nomeLivro': req.body.txtPesquisa}, caseSensitive, específico. já o RegExp pesquisa tudo, ignorando...
        if(err){
            console.log("Houve um erro inesperado ao buscar os dados. Por favor, tente novamente! Código: " + err);
            res.send("Houve um erro inesperado ao buscar os dados. Por favor, tente novamente! Código: " + err);
        } else {
            res.render("list.ejs", {"Livros":docs, "msg":""});
        }
    });
});

//cadastrar uma nova entrada; inicializar a tela add em branco
app.get('/add', function(req, res){
    res.render("add.ejs");
});

//salvar os dados adicionados no BD
app.post('/add', function(req, res){
    let livros = new LivroModel({
        nomeLivro: req.body.txtNomeLivro,
        autor: req.body.txtAutor,
        anoPubli: req.body.txtAnoPubli,
        editora: req.body.txtEditora,
        email: req.body.txtEmail,
        quantidade: req.body.numQuantidade
    });
    
    livros.save(function(err){
        if(err){
            console.log("Houve um erro inesperado ao adicionar os dados ao BD. Por favor, tente novamente! Código: " + err);
            res.send("Houve um erro inesperado ao adicionar os dados ao BD. Por favor, tente novamente! Código: " + err);
        } else {
            res.redirect('/');
        }
    });
});

//editar uma entrada já existente; inicializar a tela edit em branco
app.get('/edit/:id', function(req, res){
    LivroModel.findById(req.params.id).lean().exec(function(err, livro){
        if(err){
            console.log("Houve um erro inesperado ao buscar os dados. Por favor, tente novamente! Código: " + err);
            res.send("Houve um erro inesperado ao buscar os dados. Por favor, tente novamente! Código: " + err);
        } else {
            res.render("edit.ejs", {"livro":livro, "msg":""});
        }
    });
});

//salvar os dados editados no BD
app.post('/edit/:id', function(req, res){
    LivroModel.findByIdAndUpdate(req.params.id, {
        $set: {
            nomeLivro: req.body.txtNomeLivro,
            autor: req.body.txtAutor,
            anoPubli: req.body.txtAnoPubli,
            editora: req.body.txtEditora,
            email: req.body.txtEmail,
            quantidade: req.body.numQuantidade
        }
    }, {new: true}, function(err, livro){
        if(err){
            console.log("Houve um erro inesperado ao buscar os dados. Por favor, tente novamente! Código: " + err);
            res.send("Houve um erro inesperado ao buscar os dados. Por favor, tente novamente! Código: " + err);
        } else {
            res.render("edit.ejs", {"livro":livro, "msg":"Você editou os dados com sucesso!"});
        }
    });
});

//deletar uma entrada no BD
app.get('/del/:id', function(req, res){
    LivroModel.findByIdAndDelete(req.params.id, function(err){
        if(err){
            console.log("Houve um erro inesperado ao buscar os dados. Por favor, tente novamente! Código: " + err);
            res.send("Houve um erro inesperado ao buscar os dados. Por favor, tente novamente! Código: " + err);
        } else {
            LivroModel.find({}).lean().exec(function(err, docs){
                if(err){
                    console.log("Houve um erro inesperado ao listar os dados. Por favor, tente novamente! Código: " + err);
                    res.send("Houve um erro inesperado ao listar os dados. Por favor, tente novamente! Código: " + err);
                } else {
                    res.render("list.ejs", {"Livros":docs, "msg":"Você deletou os dados com sucesso!"});
                }
            });
        }
    });
});

//créditos
app.get('/autor', function(req, res){
    res.send("<h1>Desenvolvido por Kauã Maia Cousillas, na disciplina de Programação III</h1><p><a href='/add'>Cadastrar um novo livro</a>&ensp;<a href='/'>Voltar para a página principal</a></p>")
});

/* fim do código do servidor
app.listen(3000, ()=>console.log("Conexão inicializada com sucesso.")); //somente com comandos de uma só linha
*/
app.listen(3000, function(){
    console.log("Conexão inicializada com sucesso.") //sempre no fim do código, temos a app.listen, que abre a porta para o recebimento de comandos do servidor. função anônima de callback inserida
});