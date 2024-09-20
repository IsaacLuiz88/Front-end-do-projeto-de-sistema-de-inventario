import { useMutation, gql } from '@apollo/client';
import { useState } from 'react';

// Definindo a mutation GraphQL para criar um histórico de produto
const NOVO_HISTORICO_PRODUTO = gql`
  mutation novoHistoricoProduto(
    $nomeProduto: String!,
    $precoAntigo: Float!,
    $precoNovo: Float!,
    $quantidadeAntiga: Int!,
    $quantidadeNova: Int!,
    $data: String!
  ) {
    novoHistoricoProduto(
      nomeProduto: $nomeProduto,
      precoAntigo: $precoAntigo,
      precoNovo: $precoNovo,
      quantidadeAntiga: $quantidadeAntiga,
      quantidadeNova: $quantidadeNova,
      data: $data
    ) {
      id
      nomeProduto
    }
  }
`;

function CriarHistoricoProduto() {
  const [nomeProduto, setNomeProduto] = useState('');
  const [precoAntigo, setPrecoAntigo] = useState('');
  const [precoNovo, setPrecoNovo] = useState('');
  const [quantidadeAntiga, setQuantidadeAntiga] = useState('');
  const [quantidadeNova, setQuantidadeNova] = useState('');
  const [data, setData] = useState('');

  const [novoHistoricoProduto, { loading, error, data: responseData }] = useMutation(NOVO_HISTORICO_PRODUTO);

  const handleSubmit = (e) => {
    e.preventDefault();
    novoHistoricoProduto({
      variables: {
        nomeProduto,
        precoAntigo: parseFloat(precoAntigo),
        precoNovo: parseFloat(precoNovo),
        quantidadeAntiga: parseInt(quantidadeAntiga),
        quantidadeNova: parseInt(quantidadeNova),
        data,
      },
    }).then(() => {
      // Limpar os campos após o envio bem-sucedido
      setNomeProduto('');
      setPrecoAntigo('');
      setPrecoNovo('');
      setQuantidadeAntiga('');
      setQuantidadeNova('');
      setData('');
    });
  };

  if (loading) return <p>Enviando...</p>;
  if (error) return <p>Erro: {error.message}</p>;

  return (
    <div>
      <h2>Criar Histórico de Produto</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome do Produto:</label>
          <input
            type="text"
            value={nomeProduto}
            onChange={(e) => setNomeProduto(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Preço Antigo:</label>
          <input
            type="number"
            value={precoAntigo}
            onChange={(e) => setPrecoAntigo(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Preço Novo:</label>
          <input
            type="number"
            value={precoNovo}
            onChange={(e) => setPrecoNovo(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Quantidade Antiga:</label>
          <input
            type="number"
            value={quantidadeAntiga}
            onChange={(e) => setQuantidadeAntiga(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Quantidade Nova:</label>
          <input
            type="number"
            value={quantidadeNova}
            onChange={(e) => setQuantidadeNova(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Data:</label>
          <input
            type="date"
            value={data}
            onChange={(e) => setData(e.target.value)}
            required
          />
        </div>
        <button type="submit">Criar Histórico</button>
      </form>
      {responseData && (
        <p>Histórico do produto {responseData.novoHistoricoProduto.nomeProduto} criado com sucesso!</p>
      )}
    </div>
  );
}

export default CriarHistoricoProduto;