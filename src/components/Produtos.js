import { useQuery, gql } from '@apollo/client';
import DeleteButtonProduto from './DeleteButtonProduto';

const GET_PRODUTOS = gql`
  query GetProdutos {
    produtos {
      id
      nome
      preco
      quantidade
    }
  }
`;

function Produtos() {
  const { loading, error, data } = useQuery(GET_PRODUTOS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleDeleted = () => {
    // Recarregar a lista de categorias ou atualizar o cache
  };

  
  return (
    <div>
      <h2>Produtos</h2>
      <ul>
        {data.produtos.map((produto) => (
          <li key={produto.id}>
            {produto.nome} - Preço: {produto.preco} - Quantidade: {produto.quantidade} -- <DeleteButtonProduto id={produto.id} onDeleted={handleDeleted} itemType="Produto" />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Produtos;
