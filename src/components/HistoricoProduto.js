import { useQuery, gql } from '@apollo/client';
import { Link } from 'react-router-dom';
import DeleteButtonHistoricodeVenda from './DeleteButtonHistoricodeVenda';

const GET_HISTORICO_PRODUTO = gql`
  query GetHistoricoProduto {
    historicoProdutos {
      id
      nomeProduto
      precoAntigo
      precoNovo
      quantidadeAntiga
      quantidadeNova
      data
    }
  }
`;

function HistoricoProduto() {
  const { loading, error, data } = useQuery(GET_HISTORICO_PRODUTO);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleDeleted = () => {
    // Recarregar a lista de categorias ou atualizar o cache
  };

  return (
    <div>
      <h2>Histórico de Produtos</h2>
      <ul>
  {data.historicoProdutos.map((historico) => (
    <li key={historico.id}>
      Produto: {historico.nomeProduto} - Preço Antigo: {historico.precoAntigo} - Preço Novo: {historico.precoNovo} - Quantidade Antiga: {historico.quantidadeAntiga} - Quantidade Nova: {historico.quantidadeNova} 
      <Link to={`/atualizarhistoricodevenda/${historico.id}`}>Atualizar Histórico</Link>
      <DeleteButtonHistoricodeVenda id={historico.id} onDeleted={handleDeleted} itemType="HistoricoProduto" />
    </li>
  ))}
</ul>

    </div>
  );
}

export default HistoricoProduto;
