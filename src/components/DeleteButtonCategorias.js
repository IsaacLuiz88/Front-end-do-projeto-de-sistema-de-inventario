import React from 'react';
import { useMutation, gql } from '@apollo/client';

const DELETE_CATEGORIA = gql`
  mutation DeletarCategoria($id: Int!) {
    deletarCategoria(id: $id) {
      id
    }
  }
`;


const DeleteButtonCategorias = ({ id, onDeleted, itemType }) => {
  const [deleteCategoria, { loading, error }] = useMutation(DELETE_CATEGORIA, {
    variables: { id },
    onCompleted: () => {
      if (onDeleted) onDeleted();
      alert(`${itemType} excluído com sucesso!`);
    },
    onError: (error) => {
      console.error('Erro ao excluir item:', error);
      alert(`Erro ao excluir ${itemType}.`);
    }
  });

  const handleDelete = () => {
    if (window.confirm(`Tem certeza que deseja excluir este ${itemType}?`)) {
      deleteCategoria();
    }
  };

  return (
    <button onClick={handleDelete} disabled={loading}>
      {loading ? 'Excluindo...' : `Excluir ${itemType}`}
    </button>
  );
};

export default DeleteButtonCategorias;