///importando os mondulos fs, path e fileURLToPath 
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
/////configuração para que o dirname possa rodar
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/////dirname guiando o const caminhoDoArquivo para o arquivo json que vai armazenar os dados
const caminhoDoArquivo = path.join(__dirname, '../rotaCerta.json');
/////função para ler os dados usando um try catch para caso de erro ele retornar um array vazio e nao quebrar a aplicação
function lerDadosDoArquivo() {
    try {
        const dados = fs.readFileSync(caminhoDoArquivo, 'utf-8');
        return JSON.parse(dados)
    } catch (erro) {
        console.error('Erro ao ler o arquivo:', erro);
        return [];}
    }
/////função para ler os dados do arquivo por id usando a função lerDadosDoArquivo e o metodo find para encontrar o item com o id passado como parametro
function lerDadosDoArquivoPorId(id) {
    const lista = lerDadosDoArquivo();
    return lista.find(item => item.id === id);
}

//////função para salvar os dados no arquivo usando um try catch para caso de erro ele retornar o erro e nao quebrar a aplicação
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
//////função para deletar os dados do arquivo por id usando a função lerDadosDoArquivo e o metodo filter para criar uma nova lista sem o item com o id passado como parametro
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
//////exportando as funções para serem usadas em outros arquivos
    export default {
        lerDadosDoArquivo,
        salvarDadosDoArquivo,
        lerDadosDoArquivoPorId,
        deletarDadosDoArquivoPorId,
        atualizarDadosDoArquivoPorId

    }