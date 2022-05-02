const express = require("express");

const app = express();

app.use(express.json());

/*app.use((req, res, next) => {
    console.log("Acessou o Middlewares!");
    next();
});*/

function valContato(req, res, next){
    if(!req.body.email){
        console.log("Acessou o Middlewares de validação!");
        return res.json({
            erro: true,
            mensagem: "Necessário enviar o e-mail!"
        });
    };
    return next();
};

app.get("/", (req, res) => {
    console.log("Acessou a rota listar!");
    res.send("Celke!");
});

app.get("/contato/:id", (req, res) => {
    const { id } = req.params;
    const { sit } = req.query;
    return res.json({
        id,
        nome: "Cesar",
        email: "cesar@celke.com.br",
        sit
    });
});

app.post("/contato", valContato, (req, res) => {
    console.log("Acessou a rota cadastrar!");
    var nome = req.body.nome;
    var { email } = req.body;
    //Implementar a regra para salvar no banco de dados
    return res.json({
        nome,
        email
    });
});

app.put("/contato/:id", valContato, (req, res) => {
    const { id } = req.params;
    const { _id, nome, email} = req.body;

    return res.json({
        id,
        _id,
        nome,
        email
    });
});

app.delete("/contato/:id", (req, res) => {
    const { id } = req.params;

    return res.json({
        id
    });
});

app.listen(8080, () => {
    console.log("Servidor iniciado na porta 8080: http://localhost:8080");
});