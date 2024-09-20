import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Categorias from './components/Categorias';
import Fornecedores from './components/Fornecedores';
import Produtos from './components/Produtos';
import Vendas from './components/Vendas';
import HistoricoProduto from './components/HistoricoProduto';
import CriarVenda from './components/NovaVenda';
import CriarFornecedor from './components/CriarFornecedor';
import AtualizarFornecedores from './components/AtualizarFornecedor';
import BoasVindas from './components/BoasVindas'; // Importe o novo componente
import CriarCategoria from './components/CriarCategoria';

import './App.css';

import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import CriarProduto from './components/CriarProduto';
import CriarHistoricoProduto from './components/CriarHistorcodeProduto';
import AtualizarHistoricoProduto from './components/AtualizarHistoricoProduto';

const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
  cache: new InMemoryCache()
});

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BoasVindas />} />
      </Routes>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/" className="paginainicial">Página Inicial</Link>
            </li>
            <h1>Listagem:</h1>
            <li>
              <Link to="/categorias" className="paginainicial">Categorias</Link>
            </li>
            <li>
              <Link to="/fornecedores" className="paginainicial">Fornecedores</Link>
            </li>
            <li>
              <Link to="/produtos" className="paginainicial">Produtos</Link>
            </li>
            <li>
              <Link to="/vendas" className="paginainicial">Vendas</Link>
            </li>
            <li>
              <Link to="/historico-produto" className="paginainicial">Histórico de Produto</Link>
            </li>

            <br></br>

            <h1>Criação:</h1>
            <li>
              <Link to="/criarcategoria" className="paginainicial">Criar Categoria</Link>
            </li>
            <li>
              <Link to="/criarfornecedor" className="paginainicial">Criar Fornecedor</Link>
            </li>
            <li>
              <li>
                <Link to="/criarproduto" className="paginainicial"> Criar Produto</Link>
              </li>
            </li>
            <li>
              <Link to="/criarvenda" className="paginainicial">Criar Venda</Link>
            </li>
            <li>
              <Link to="/criarhistoricodevenda" className="paginainicial"> Criar Historico de Produto
              </Link>
            </li>
            {/* <li>
              <Link to="/atualizarfornecedor" className="paginainicial">Atualizar Fornecedor</Link>
            </li> */}
          </ul>
        </nav>
        <Routes>
          <Route path="/categorias" element={<Categorias />} />
          <Route path="/fornecedores" element={<Fornecedores />} />
          <Route path="/produtos" element={<Produtos />} />
          <Route path="/vendas" element={<Vendas />} />
          <Route path="/historico-produto" element={<HistoricoProduto />} />
          <Route path="/criarcategoria" element={<CriarCategoria />} />
          <Route path="/criarfornecedor" element={<CriarFornecedor />} />
          <Route path="/criarproduto" element={<CriarProduto />} />
          <Route path="/criarvenda" element={<CriarVenda />} />
          <Route path="/criarhistoricodevenda" element={<CriarHistoricoProduto />} />
          <Route path="/atualizarhistoricodevenda/:id" element={<AtualizarHistoricoProduto />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;