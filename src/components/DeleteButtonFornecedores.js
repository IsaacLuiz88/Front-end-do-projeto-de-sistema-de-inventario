import React from 'react';
import { useMutation, gql } from '@apollo/client';

const DELETE_FORNECEDOR = gql`
  mutation DeletarFornecedor($id: Int!) {
    deletarFornecedor(id: $id) {
      id
    }
  }
`;


const DeleteButtonFornecedor = ({ id, onDeleted, itemType }) => {
  const [deleteFornecedor, { loading, error }] = useMutation(DELETE_FORNECEDOR, {
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
      deleteFornecedor();
    }
  };

  return (
    <button onClick={handleDelete} disabled={loading}>
      {loading ? 'Excluindo...' : `Excluir ${itemType}`}
    </button>
  );
};

export default DeleteButtonFornecedor;