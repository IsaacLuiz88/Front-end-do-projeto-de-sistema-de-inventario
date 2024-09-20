import { useMutation, gql } from '@apollo/client';
import { useState } from 'react';

// Definindo a mutation GraphQL para criar uma categoria
const CRIAR_CATEGORIA = gql`
  mutation CriarCategoria($nome: String!) {
    criarCategoria(nome: $nome) {
      id
      nome
    }
  }
`;

function CriarCategoria() {
  const [nome, setNome] = useState('');

  const [criarCategoria, { loading, error, data }] = useMutation(CRIAR_CATEGORIA);

  const handleSubmit = (e) => {
    e.preventDefault();
    criarCategoria({
      variables: { nome }
    }).then(() => {
      // Limpar o campo após o envio bem-sucedido
      setNome('');
    }).catch((e) => {
      console.error('Erro ao criar categoria:', e);
    });
  };

  if (loading) return <p>Enviando...</p>;
  if (error) return <p>Erro: {error.message}</p>;

  return (
    <div>
      <h2>Criar Categoria</h2>
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
        <button type="submit">Criar Categoria</button>
      </form>
      {data && (
        <p>Categoria "{data.criarCategoria.nome}" criada com sucesso!</p>
      )}
    </div>
  );
}

export default CriarCategoria;