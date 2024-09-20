import React from 'react';
import { useMutation, gql } from '@apollo/client';

const DELETE_HISTORICODEVENDA = gql`
  mutation DeletarHistoricoDeVenda($id: Int!) {
    eletarHistoricoDeVenda(id: $id) {
      id
    }
  }
`;


const DeleteButtonHistoricodeVenda = ({ id, onDeleted, itemType }) => {
  const [deleteHistoricodeVenda, { loading, error }] = useMutation(DELETE_HISTORICODEVENDA, {
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
        deleteHistoricodeVenda();
    }
  };

  return (
    <button onClick={handleDelete} disabled={loading}>
      {loading ? 'Excluindo...' : `Excluir ${itemType}`}
    </button>
  );
};

export default DeleteButtonHistoricodeVenda;