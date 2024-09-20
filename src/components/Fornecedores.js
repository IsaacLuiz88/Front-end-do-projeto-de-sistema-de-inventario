import { useQuery, gql } from '@apollo/client';
import DeleteButtonFornecedor from './DeleteButtonFornecedores';

const GET_FORNECEDORES = gql`
  query GetFornecedores {
    fornecedores {
      id
      nome
      email
      contato
      endereco
      }
    }
`;

function Fornecedores() {
  const { loading, error, data } = useQuery(GET_FORNECEDORES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleDeleted = () => {
    // Recarregar a lista de categorias ou atualizar o cache
  };

  return (
    <div>
      <h2>Fornecedores</h2>
      <ul>
        {data.fornecedores.map((fornecedor) => (
          <li key={fornecedor.id}>
           {fornecedor.id} - {fornecedor.nome} - Email: ({fornecedor.email}) - Contato: {fornecedor.contato} - Endereco: {fornecedor.endereco} -- <DeleteButtonFornecedor id={fornecedor.id} onDeleted={handleDeleted} itemType="Fornecedor" /> {/* Produtos: {fornecedor.produtos} */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Fornecedores;