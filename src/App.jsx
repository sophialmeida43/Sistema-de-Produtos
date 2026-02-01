import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";

import Cadastro from "./pages/Cadastro";
import Produtos from "./pages/Produtos";
import Orcamento from "./pages/Orcamento";
import Sobre from "./pages/Sobre";

function App() {
  return (
    <BrowserRouter>
      {/* NAVBAR – só design */}
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand>Sistema de Produtos</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/cadastro">Cadastro</Nav.Link>
              <Nav.Link as={Link} to="/">Produtos</Nav.Link>
              <Nav.Link as={Link} to="/orcamento">Orçamento</Nav.Link>
              <Nav.Link as={Link} to="/sobre">Sobre</Nav.Link>
            </Nav>

          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* ROTAS – NÃO MUDEI NADA */}
      <Routes>
        <Route path="/" element={<Produtos />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/orcamento" element={<Orcamento />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
