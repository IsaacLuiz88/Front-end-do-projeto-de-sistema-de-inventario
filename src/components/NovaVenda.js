import { useMutation, gql } from '@apollo/client';
import { useState } from 'react';

const CRIAR_VENDA = gql`
  mutation CriarVenda($nomeDoProduto: String!, $quantidade: Int!, $data: String!) {
    novaVenda(nomeDoProduto: $nomeDoProduto, quantidade: $quantidade, data: $data) {
      id
      nomeDoProduto
      quantidade
      data
    }
  }
`;

function NovaVenda() {
  const [nomeDoProduto, setNomeDoProduto] = useState(''); // Corrigido para string
  const [quantidade, setQuantidade] = useState(0);
  const [data, setData] = useState('');
  const [novaVenda, { loading, error }] = useMutation(CRIAR_VENDA);

  const handleSubmit = (e) => {
    e.preventDefault();
    novaVenda({
      variables: {
        nomeDoProduto,
        quantidade: parseInt(quantidade), // Garantir que quantidade seja um número
        data,
      },
    });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Criar Nova Venda</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome do Produto:</label>
          <input
            type="text"
            value={nomeDoProduto}
            onChange={(e) => setNomeDoProduto(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Quantidade:</label>
          <input
            type="number"
            value={quantidade}
            onChange={(e) => setQuantidade(e.target.value)}
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
        <button type="submit">Criar Venda</button>
      </form>
      {data && (
        <p>Venda {data.novaVenda} criado com sucesso!</p>
      )}
    </div>
  );
}

export default NovaVenda;