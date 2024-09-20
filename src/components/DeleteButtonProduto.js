import React from 'react';
import { useMutation, gql } from '@apollo/client';

const DELETE_PRODUTO = gql`
  mutation DeletarProduto($id: Int!) {
    deletarProduto(id: $id) {
      id
    }
  }
`;


const DeleteButtonProduto = ({ id, onDeleted, itemType }) => {
  const [deleteProduto, { loading, error }] = useMutation(DELETE_PRODUTO, {
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
      deleteProduto();
    }
  };

  return (
    <button onClick={handleDelete} disabled={loading}>
      {loading ? 'Excluindo...' : `Excluir ${itemType}`}
    </button>
  );
};

export default DeleteButtonProduto;