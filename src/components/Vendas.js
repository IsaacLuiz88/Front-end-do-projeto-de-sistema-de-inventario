import { useQuery, gql } from '@apollo/client';
import DeleteButtonVenda from './DeleteButtonVenda';

const GET_VENDAS = gql`
  query GetVendas {
    vendas {
      id
      nomeDoProduto
      quantidade
      data
    }
  }
`;

function Vendas() {
  const { loading, error, data } = useQuery(GET_VENDAS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleDeleted = () => {
    // Recarregar a lista de categorias ou atualizar o cache
  };

  return (
    <div>
      <h2>Vendas</h2>
      <ul>
        {data.vendas.map((venda) => (
          <li key={venda.id}>
            Produto: {venda.nomeDoProduto} - Quantidade: {venda.quantidade} - Data: {new Date(venda.data).toLocaleDateString()} - <DeleteButtonVenda id={venda.id}  onDeleted={handleDeleted} itemType="Venda" />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Vendas;
