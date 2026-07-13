import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const caminhoDoArquivo = path.join(__dirname, '../rotaCerta.json');

function lerDadosDoArquivo() {
    try {
        const dados = fs.readFileSync(caminhoDoArquivo, 'utf-8');
        return JSON.parse(dados)
    } catch (erro) {
        console.error('Erro ao ler o arquivo:', erro);
        return [];}
    }

function lerDadosDoArquivoPorId(id) {
    const lista = lerDadosDoArquivo();
    return lista.find(item => item.id === id);
}


function salvarDadosDoArquivo(dados) {
    try {
        const listaAtual = lerDadosDoArquivo();

        dados.id = listaAtual.length > 0 ? listaAtual[listaAtual.length - 1].id + 1 : 1;
        listaAtual.push(dados);

        fs.writeFileSync(caminhoDoArquivo, JSON.stringify(listaAtual, null, 2), 'utf-8');
        return dados;
    } catch (erro) {
        console.error('Erro ao salvar o arquivo:', erro);
        throw erro; }
    }

function deletarDadosDoArquivoPorId(id) {
    const listaAtual = lerDadosDoArquivo();
    const novaLista = listaAtual.filter(item => item.id !== id);

    if (novaLista.length === listaAtual.length) {
        throw new Error('Item não encontrado para deletar');
    }

    const novaListaJSON = JSON.stringify(novaLista, null, 2);
    fs.writeFileSync(caminhoDoArquivo, novaListaJSON, 'utf-8');
    return true;
}

///////////// Put de material extra

function atualizarDadosDoArquivoPorId(id, novosDados) {
    const listaAtual = lerDadosDoArquivo();
    const index = listaAtual.findIndex(item => item.id === id);

    if (index === -1) {
        throw new Error('Item não encontrado para atualizar');
    }
    listaAtual[index] = { ...listaAtual[index], ...novosDados };
    fs.writeFileSync(caminhoDoArquivo, JSON.stringify(listaAtual, null, 2), 'utf-8');
}

    export default {
        lerDadosDoArquivo,
        salvarDadosDoArquivo,
        lerDadosDoArquivoPorId,
        deletarDadosDoArquivoPorId,
        atualizarDadosDoArquivoPorId

    }