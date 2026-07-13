import express from 'express';
const router = express.Router();
import rotaCertaServices from '../services/rotaCertaService.js';

// Rota para obter todos os itens

router.get('/rotaCerta', (req, res)=>{
    const dados = rotaCertaServices.lerDadosDoArquivo();
    res.status(200).json(dados);
});

router.post('/rotaCerta', (req, res)=>{
    const novoDado = req.body;
    const dadoSalvo = rotaCertaServices.salvarDadosDoArquivo(novoDado);
    res.status(201).json(dadoSalvo);
});

router.get('/rotaCerta/:id', (req, res)=>{
    const {id} = req.params;
    const dados = rotaCertaServices.lerDadosDoArquivoPorId(parseInt(id));

    if(!dados){
        res.status(404).json({message: 'Item não encontrado'});
    } else {
        res.status(200).json(dados);
    }
});

router.delete('/rotaCerta/:id', (req, res)=>{
    const {id} = req.params;
    const excluido = rotaCertaServices.deletarDadosDoArquivoPorId(parseInt(id));

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