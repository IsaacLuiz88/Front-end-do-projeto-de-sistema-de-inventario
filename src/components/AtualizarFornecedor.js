import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

// Definindo a mutation GraphQL para atualizar um fornecedor
const ATUALIZAR_FORNECEDOR = gql`
  mutation AtualizarFornecedor($id: Int!, $nome: String!, $email: String!, $contato: String!, $endereco: String!) {
    atualizarFornecedor(id: $id, nome: $nome, email: $email, contato: $contato, endereco: $endereco) {
      id
      nome
      email
      contato
      endereco
    }
  }
`;

const AtualizarFornecedores = () => {
  const [id, setId] = useState('');
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [contato, setContato] = useState('');
  const [endereco, setEndereco] = useState('');

  const [atualizarFornecedor, { data, loading, error }] = useMutation(ATUALIZAR_FORNECEDOR);

  const handleSubmit = (e) => {
    e.preventDefault();

    const fornecedorId = parseInt(id);
    if (isNaN(fornecedorId)) {
      alert('Por favor, insira um ID válido.');
      return;
    }

    atualizarFornecedor({
      variables: {
        id: fornecedorId,
        nome,
        email,
        contato,
        endereco,
      },
    }).catch((error) => {
      console.error('Erro ao atualizar o fornecedor:', error);
    });
  };

  if (loading) return <p>Atualizando...</p>;
  if (error) return <p>Erro ao atualizar o fornecedor: {error.message}</p>;

  return (
    <div>
      <h2>Atualizar Fornecedor</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>ID do Fornecedor:</label>
          <input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
          />
        </div>
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
        <button type="submit">Atualizar Fornecedor</button>
      </form>

      {data && (
        <div>
          <h3>Fornecedor Atualizado:</h3>
          <p>ID: {data.atualizarFornecedor.id}</p>
          <p>Nome: {data.atualizarFornecedor.nome}</p>
          <p>Email: {data.atualizarFornecedor.email}</p>
          <p>Contato: {data.atualizarFornecedor.contato}</p>
          <p>Endereço: {data.atualizarFornecedor.endereco}</p>
        </div>
      )}
    </div>
  );
};

export default AtualizarFornecedores;