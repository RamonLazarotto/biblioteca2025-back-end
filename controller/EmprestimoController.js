import moment from "moment";
import Emprestimo from "../model/EmprestimoModel.js";
import Livro from "../model/LivroModel.js";
import Usuario from "../model/UsuarioModel.js";

async function listar(req, res) {
    const respostaBanco = await Emprestimo.findAll();
    res.json(respostaBanco);
}

async function selecionar(req, res) {
    const id = req.params.id;
    const respostaBanco = await Emprestimo.findByPk(id);
    res.json(respostaBanco);
}

async function emprestar(req, res) {
  //Lendo os parâmetros
  const idlivro = req.body.idlivro;
  const idusuario = req.body.idusuario;

  //Verifica se existe o parametro
  if (!idlivro) {
    res.status(422).send("O parâmetro idlivro é obrigatório!");
  }
  if (!idusuario) {
    res.status(422).send("O parâmetro idusuario é obrigatório!");
  }

  //Verifica se o livro existe
  const livroBanco = await Livro.findByPk(idlivro);
  if (!livroBanco) {
    res.status(404).send("Livro não encontrado");
  }
  //Verifica se o usuário existe
  const usuarioBanco = await Usuario.findByPk(idusuario);
  if (!usuarioBanco) {
    res.status(404).send("Usuário não encontrado");
  }

  //Verifca se o livro está inativo
  if (!livroBanco.ativo) {
    res.status(422).send("Este livro está inativo!");
  }
  //Verifica se o livro está emprestado
  if (livroBanco.emprestado) {
    res.status(422).send("Este livro já está emprestado!");
  }

  //Verifica se o livro está com devolução pendente
  if (livroBanco.devolucao) {
    res.status(422).send("Este livro está com devolução pendente");
 }

  //Verifica se o usuário tem um empréstimo pendente
  //falta fazer

  //Setando data de emprestimo e data de vencimento
  const emprestimo = moment().format("YYYY-MM-DD");
  const vencimento = moment().add(15, "days").format("YYYY-MM-DD");

  //Inserindo o emprestimo no banco
  const respostaBanco = await Emprestimo.create({idlivro,idusuario,emprestimo,vencimento,});

  //alterando o campo emprestado do livro para true
  const emprestado = true;
  await Livro.update(
    {emprestado},
    {where: {idlivro}})

  res.json(respostaBanco);
}

async function devolver(req, res){
    const idlivro = req.body.idlivro;
    const idusuario = req.body.idusuario;
    const emprestimo = req.body.emprestimo;
    const vencimento = req.body.vencimento;
    let devolucao = req.body.devolucao;
    const observacao = req.body.observacao;

    const idemprestimo = req.params.id;

    //Verifica se o livro existe
    const livroBanco = await Livro.findByPk(idlivro);
      if (!livroBanco) {
      res.status(404).send("Livro não encontrado");
    }

    //Atualizando o campo emprestimo no banco
    try{
    devolucao = moment().format("YYYY-MM-DD")
    const respostaBanco = await Emprestimo.update(
        {idlivro, idusuario, emprestimo, vencimento, devolucao, observacao},
        {where: {idemprestimo}})

    //alterando o campo emprestado do livro para false
    const emprestado = false;
    await Livro.update(
    {emprestado},
    {where: {idlivro}})

  res.json(respostaBanco);
    } catch (erro) {
        console.error("Erro ao inserir livro:", erro);
        res.status(500).json({ erro: erro.message });
    }  
}

export default {listar, selecionar, emprestar, devolver};