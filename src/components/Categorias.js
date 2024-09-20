import { useQuery, gql } from '@apollo/client';
import React from 'react';
import DeleteButton from './DeleteButtonCategorias';

const GET_CATEGORIAS = gql(`
  query GetCategorias {
    categorias {
      id
      nome
      }
    }
`);

function Categorias() {
  const { loading, error, data } = useQuery(GET_CATEGORIAS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleDeleted = () => {
    // Recarregar a lista de categorias ou atualizar o cache
  };

  return (
    <div>
      <h2>Categorias</h2>
      <ul>
        {data.categorias.map((categoria) => (
          <li key={categoria.id}>
            Nome da categoria: {categoria.nome} -- <DeleteButton id={categoria.id} onDeleted={handleDeleted} itemType="Categoria" />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categorias;