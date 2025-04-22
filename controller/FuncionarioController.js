import moment from "moment";
import Funcionario from "../model/FuncionarioModel.js";

async function listar(req, res) {
    const respostaBanco = await Funcionario.findAll();
    res.json(respostaBanco);
}

async function selecionar(req, res) {
    const id = req.params.id;
    const respostaBanco = await Funcionario.findByPk(id);
    res.json(respostaBanco);
}

async function inserir(req, res) {
    try{
    const respostaBanco = await Funcionario.create(req.body);
    res.json(respostaBanco);
    } catch (erro) {
    console.error("Erro ao inserir Funcionário:", erro);
    res.status(500).json({ erro: erro.message });
    }
}

async function alterar(req, res){
    const nomefuncionario = req.body.nomefuncionario;
    const cpf = req.body.cpf;
    const email = req.body.email;
    const telefone = req.body.telefone;
    const nascimento = req.body.nascimento;
    const salario = req.body.salario;
    const contratacao = req.body.contratacao;

    const idfuncionario = req.params.id;

    try{
        const respostaBanco = await Funcionario.update(
            {nomefuncionario, cpf, email, telefone, nascimento, salario, contratacao},
            {where: {idfuncionario}}
        );
        res.json(respostaBanco);

    } catch (erro) {
        console.error("Erro ao inserir Funcionário:", erro);
        res.status(500).json({ erro: erro.message });
    }
}

export default {listar, selecionar, inserir, alterar};