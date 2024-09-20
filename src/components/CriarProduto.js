import { useMutation, gql } from '@apollo/client';
import { useState } from 'react';

// Definindo a mutation GraphQL para criar um fornecedor
const CRIAR_PRODUTO = gql`
  mutation CriarProduto($nome: String!, $preco: Float!, $quantidade: Float!) {
    criarProduto(nome: $nome, preco: $preco, quantidade: $quantidade) {
      id
      nome
      preco
      quantidade
    }
  }
`;

function CriarProduto() {
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [quantidade, setQuantidade] = useState('');

  const [criarProduto, { loading, error, data }] = useMutation(CRIAR_PRODUTO);

  const handleSubmit = (e) => {
    e.preventDefault();
    criarProduto({
      variables: {
        nome,
        preco: parseFloat(preco), 
        quantidade: parseFloat(quantidade),
      },
    }).then(() => {
      // Limpar os campos após o envio bem-sucedido
      setNome('');
      setPreco('');
      setQuantidade('');
    });
  };

  if (loading) return <p>Enviando...</p>;
  if (error) return <p>Erro: {error.message}</p>;

  return (
    <div>
      <h2>Criar Fornecedor</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Preco:</label>
          <input
            type="number"
            value={preco}
            onChange={(e) => setPreco(e.target.value)}
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
        <button type="submit">Criar Fornecedor</button>
      </form>
      {data && (
        <p>Fornecedor {data.criarProduto.nome} criado com sucesso!</p>
      )}
    </div>
  );
}

export default CriarProduto;