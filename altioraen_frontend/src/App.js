import { Container, Nav, Navbar } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Client from "./Components/Client";
import Order from "./Components/Order";

function App() {
  return (
    <>
    <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">AlioraCorp - Evaluación</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Clientes</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container className="mt-4">
        <Routes>
          <Route path="/" element={<Client />} />
          <Route path="/client/order" element={<Order />} />
        </Routes>
        <ToastContainer />
      </Container>
      </>
  );
}

export default App;
