/// na linha 3, 4 e 5 eu importei o express, crie um const de rotas e importei o service que vai levar os dados

import express from 'express';
const router = express.Router();
import rotaCertaServices from '../services/rotaCertaService.js';

// Rota para obter todos os itens

/////get ele transformou a função que vem do service em um get 
router.get('/rotaCerta', (req, res)=>{
    const dados = rotaCertaServices.lerDadosDoArquivo();
    res.status(200).json(dados);
});
/////post ele transformou a função que vem do service em um post 
router.post('/rotaCerta', (req, res)=>{
    ///req.body ele é o corpo da requisição que é oque o usuario vai enviar para api
    const novoDado = req.body;
    const dadoSalvo = rotaCertaServices.salvarDadosDoArquivo(novoDado);
    res.status(201).json(dadoSalvo);
});
/////getById ele transformou a função que vem do service em um getById ele vai receber um id e vai retornar o item que tem aquele id
router.get('/rotaCerta/:id', (req, res)=>{
    ///req.params ele é o corpo da requisição que é oque o usuario vai enviar para api
    const {id} = req.params;
    const dados = rotaCertaServices.lerDadosDoArquivoPorId(parseInt(id));
    ///if simples para que se nao tivermos nenhum item com aquele id ele retorna o erro 404 e se tiver ele retorn o 200 
    if(!dados){
        res.status(404).json({message: 'Item não encontrado'});
    } else {
        res.status(200).json(dados);
    }
});
//////delete ele transformou a função que vem do service em um delete ele vai receber um id e vai deletar o item que tem aquele id
router.delete('/rotaCerta/:id', (req, res)=>{
    const {id} = req.params;
    const excluido = rotaCertaServices.deletarDadosDoArquivoPorId(parseInt(id));
    ///if simples para que se nao tivermos nenhum item com aquele id ele retorna o erro 404 e se tiver ele retorn o 200
    if(excluido){
        res.status(200).json({message: 'Item deletado com sucesso'});
    } else {
        res.status(404).json({message: 'Item não encontrado'});
    }
})

/////put extra

router.put('/rotaCerta/:id', (req, res)=>{
    const {id} = req.params;
    const novosDados = req.body;

    try {
        rotaCertaServices.atualizarDadosDoArquivoPorId(parseInt(id), novosDados);
        res.status(200).json({message: 'Item atualizado com sucesso'});
    } catch (erro) {
        res.status(404).json({message: 'Item não encontrado'});
    }
});

export default router;