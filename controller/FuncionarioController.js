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

    //Verificando se funcionário já foi demitido
    const funcionarioBanco = await Funcionario.findByPk(idfuncionario);
    if (!funcionarioBanco.ativo){
        res.status(422).send("Funcinário inativo(demitido)!");
    }

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

async function demitir(req, res){
    const demissao = req.body.demissao;

    const idfuncionario = req.params.id;

    //Verifica se o Funcionario existe
    const funcionarioBanco = await Funcionario.findByPk(idfuncionario);
    if (!funcionarioBanco) {
        res.status(404).send("Funcionário não encontrado!");
    }

    //Verificando se funcionário já foi demitido
    if (!funcionarioBanco.ativo){
        res.status(422).send("Funcinário inativo(demitido)!");
    }

    try{
        //Passando a data da demissão do funcionario
        const respostaBanco = await Funcionario.update(
            {demissao},
            {where: {idfuncionario}}
        );

        //alterando o campo ativo do funcionario para false
        const ativo = false;
        await Funcionario.update(
            {ativo},
            {where: {idfuncionario}}
        )

        res.json(respostaBanco);

    } catch (erro) {
        console.error("Erro ao inserir Funcionário:", erro);
        res.status(500).json({ erro: erro.message });
    }
}

export default {listar, selecionar, inserir, alterar, demitir};