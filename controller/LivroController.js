import Livro from "../model/LivroModel.js";

async function listar(req, res) {
    const respostaBanco = await Livro.findAll();
    res.json(respostaBanco);
}

async function selecionar(req, res) {
    const id = req.params.id;
    const respostaBanco = await Livro.findByPk(id);
    res.json(respostaBanco);
}

async function inserir(req, res) {
    console.log("Dados recebidos no req.body:", req.body);
    
    try {
        const respostaBanco = await Livro.create(req.body);
        res.json(respostaBanco);
    } catch (erro) {
        console.error("Erro ao inserir livro:", erro);
        res.status(500).json({ erro: erro.message });
    }
}

async function alterar(req, res) {
    const titulo = req.body.titulo;
    const edicao = req.body.edicao;
    const paginas = req.body.paginas;
    const publicacao = req.body.publicacao;
    const foto = req.body.foto;
    const localizacao = req.body.localizacao;
    const resumo = req.body.resumo;
    const ativo = req.body.ativo;
    const condicaofisica = req.body.condicaofisica;
    const emprestado = req.body.emprestado;
    const ideditora = req.body.ideditora;
    const idcategoria = req.body.idcategoria;

    const idlivro = req.params.id;

    const respostaBanco = await Livro.update(
        {titulo, edicao, paginas, publicacao, foto, localizacao, resumo, ativo, condicaofisica, emprestado, ideditora, idcategoria},
        {where: {idlivro}}
    );
    res.json(respostaBanco);
}

async function excluir(req, res) {
    const idlivro = req.params.id

    const respostaBanco = await Livro.destroy(
      {where: {idlivro} });
    res.json(respostaBanco);
}

export default { listar, selecionar, inserir, alterar, excluir };