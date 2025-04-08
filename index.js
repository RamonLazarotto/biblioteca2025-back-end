import express from "express";
import banco from "./banco.js";
import editora from "./controller/EditoraController.js";

try {
    await banco.authenticate();
    console.log('Conexão com o Banco de Dados estabelecida com sucesso.');
  } catch (error) {
    console.error('Erro ao conectar-se com o banco de dados:', error);
  }

const app = express();
app.use(express.json());

//rotas crud da tabela editora
app.get('/editora', editora.listar);

app.get('/editora/:id', editora.selecionar);

app.post('/editora', editora.inserir);

app.put('/editora/:id', editora.alterar);

app.delete('/editora/:id', editora.excluir)

//Mensagem de que o servidor rodando
app.listen(3000, () => {console.log("Servidor Rodando.") });