import { Container, Navbar, Offcanvas } from "react-bootstrap";

export function Header() {
  return (
    <Navbar bg="light">
      <Container>
        <Navbar.Brand href="/">AssinaClub</Navbar.Brand>

        <Navbar.Toggle aria-controls="offcanvasNavbar">clica</Navbar.Toggle>

        <Navbar.Offcanvas>
          <Offcanvas.Header>
            <Offcanvas.Title>Olá, Nome</Offcanvas.Title>
          </Offcanvas.Header>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  )
}