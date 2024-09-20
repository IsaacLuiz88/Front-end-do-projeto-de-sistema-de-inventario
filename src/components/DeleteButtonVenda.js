import React from 'react';
import { useMutation, gql } from '@apollo/client';

const DELETE_VENDA = gql`
  mutation DeletarVenda($id: Int!) {
    deletarVenda(id: $id) {
      id
    }
  }
`;


const DeleteButtonVenda = ({ id, onDeleted, itemType }) => {
  const [deleteVenda, { loading, error }] = useMutation(DELETE_VENDA, {
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
        deleteVenda();
    }
  };

  return (
    <button onClick={handleDelete} disabled={loading}>
      {loading ? 'Excluindo...' : `Excluir ${itemType}`}
    </button>
  );
};

export default DeleteButtonVenda;