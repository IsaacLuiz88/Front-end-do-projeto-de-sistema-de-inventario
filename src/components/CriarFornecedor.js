import { useMutation, gql } from '@apollo/client';
import { useState } from 'react';

// Definindo a mutation GraphQL para criar um fornecedor
const CRIAR_FORNECEDOR = gql`
  mutation CriarFornecedor($nome: String!, $email: String!, $contato: String!, $endereco: String!) {
    criarFornecedor(nome: $nome, email: $email, contato: $contato, endereco: $endereco) {
      id
      nome
      email
      contato
      endereco
    }
  }
`;

function CriarFornecedor() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [contato, setContato] = useState('');
  const [endereco, setEndereco] = useState('');

  const [criarFornecedor, { loading, error, data }] = useMutation(CRIAR_FORNECEDOR);

  const handleSubmit = (e) => {
    e.preventDefault();
    criarFornecedor({
      variables: {
        nome,
        email,
        contato,
        endereco,
      },
    }).then(() => {
      // Limpar os campos após o envio bem-sucedido
      setNome('');
      setEmail('');
      setContato('');
      setEndereco('');
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
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Contato:</label>
          <input
            type="text"
            value={contato}
            onChange={(e) => setContato(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Endereço:</label>
          <input
            type="text"
            value={endereco}
            onChange={(e) => setEndereco(e.target.value)}
            required
          />
        </div>
        <button type="submit">Criar Fornecedor</button>
      </form>
      {data && (
        <p>Fornecedor {data.criarFornecedor.nome} criado com sucesso!</p>
      )}
    </div>
  );
}

export default CriarFornecedor;