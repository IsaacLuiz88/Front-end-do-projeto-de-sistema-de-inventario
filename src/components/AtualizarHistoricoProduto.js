import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { gql } from '@apollo/client';
import { useParams } from 'react-router-dom'; // Para obter o ID da URL

const GET_HISTORICO_PRODUTO = gql`
  query GetHistoricoProduto($id: Int!) {
    historicoProduto(id: $id) {
      id
      nomeProduto
      precoAntigo
      precoNovo
      quantidadeAntiga
      quantidadeNova
      data
    }
  }
`;

const ATUALIZAR_HISTORICO_PRODUTO = gql`
  mutation AtualizarHistoricoProduto(
    $id: Int!,
    $nomeProduto: String!,
    $precoAntigo: Float!,
    $precoNovo: Float!,
    $quantidadeAntiga: Int!,
    $quantidadeNova: Int!,
    $data: String!
  ) {
    atualizarHistoricoProduto(
      id: $id,
      nomeProduto: $nomeProduto,
      precoAntigo: $precoAntigo,
      precoNovo: $precoNovo,
      quantidadeAntiga: $quantidadeAntiga,
      quantidadeNova: $quantidadeNova,
      data: $data
    ) {
      id
      nomeProduto
      precoAntigo
      precoNovo
      quantidadeAntiga
      quantidadeNova
      data
    }
  }
`;

const AtualizarHistoricoProduto = () => {
  const { id } = useParams(); // Obtém o ID da URL
  const [nomeProduto, setNomeProduto] = useState('');
  const [precoAntigo, setPrecoAntigo] = useState('');
  const [precoNovo, setPrecoNovo] = useState('');
  const [quantidadeAntiga, setQuantidadeAntiga] = useState('');
  const [quantidadeNova, setQuantidadeNova] = useState('');
  const [data, setData] = useState('');

  // Query para buscar o produto
  const { loading: loadingQuery, error: errorQuery, data: dataQuery } = useQuery(GET_HISTORICO_PRODUTO, {
    variables: { id: parseInt(id) }, // Busca pelo ID do histórico do produto
    onCompleted: (data) => {
      setNomeProduto(data.historicoProduto.nomeProduto);
      setPrecoAntigo(data.historicoProduto.precoAntigo);
      setPrecoNovo(data.historicoProduto.precoNovo);
      setQuantidadeAntiga(data.historicoProduto.quantidadeAntiga);
      setQuantidadeNova(data.historicoProduto.quantidadeNova);
      setData(data.historicoProduto.data);
    }
  });

  const [atualizarHistoricoProduto, { loading: loadingMutation, error: errorMutation }] = useMutation(ATUALIZAR_HISTORICO_PRODUTO);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await atualizarHistoricoProduto({
        variables: {
          id: parseInt(id),
          nomeProduto,
          precoAntigo: parseFloat(precoAntigo),
          precoNovo: parseFloat(precoNovo),
          quantidadeAntiga: parseInt(quantidadeAntiga),
          quantidadeNova: parseInt(quantidadeNova),
          data
        }
      });
      alert('Histórico do produto atualizado com sucesso!');
    } catch (err) {
      alert(`Erro ao atualizar o histórico do produto: ${err.message}`);
    }
  };

  if (loadingQuery) return <p>Carregando...</p>;
  if (errorQuery) return <p>Erro ao carregar: {errorQuery.message}</p>;

  return (
    <form onSubmit={handleSubmit}>
      <h2>Atualizar Histórico do Produto</h2>
      <label>
        Nome do Produto:
        <input type="text" value={nomeProduto} onChange={(e) => setNomeProduto(e.target.value)} required />
      </label><br />
      <label>
        Preço Antigo:
        <input type="number" step="0.01" value={precoAntigo} onChange={(e) => setPrecoAntigo(e.target.value)} required />
      </label><br />
      <label>
        Preço Novo:
        <input type="number" step="0.01" value={precoNovo} onChange={(e) => setPrecoNovo(e.target.value)} required />
      </label><br />
      <label>
        Quantidade Antiga:
        <input type="number" value={quantidadeAntiga} onChange={(e) => setQuantidadeAntiga(e.target.value)} required />
      </label><br />
      <label>
        Quantidade Nova:
        <input type="number" value={quantidadeNova} onChange={(e) => setQuantidadeNova(e.target.value)} required />
      </label><br />
      <label>
        Data:
        <input type="date" value={data} onChange={(e) => setData(e.target.value)} required />
      </label><br />
      <button type="submit" disabled={loadingMutation}>Atualizar</button>
      {errorMutation && <p>Error: {errorMutation.message}</p>}
    </form>
  );
};

export default AtualizarHistoricoProduto;
