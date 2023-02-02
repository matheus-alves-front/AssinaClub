import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { Router } from "next/router";
import { Button, Container, Navbar, Offcanvas } from "react-bootstrap";

import { AuthContext } from "../../contexts/AuthContext";
import { IoMenu } from "react-icons/io5"

export function Header() {
  const {
    isAuthenticated
  } = useContext(AuthContext)

  const [isLoggedIn, setIsLoggedIn] = useState(false)

  Router.events.on("routeChangeComplete", (url) => {
    setIsLoggedIn(isAuthenticated)
  })

  return (
    <Navbar className="shadow-sm mb-5">
      <Container className="position-relative py-2">
        <Navbar.Brand className="d-block" href="/">AssinaClub</Navbar.Brand>
        {isLoggedIn
        ? (
          <Navbar.Toggle 
            className="d-block position-absolute top-50 start-100 translate-middle border-0" 
            aria-controls="offcanvasNavbar"
          >
            <IoMenu fontSize={50} />  
          </Navbar.Toggle>
          )
        :
          (
          <Link href={'/login/subscriber'} className="position-absolute top-50 start-100 translate-middle">
            <Button variant={'primary'}>
              Entrar
            </Button>
          </Link>
          )  
        }

        <Navbar.Offcanvas>
          <Offcanvas.Header>
            <Offcanvas.Title>Olá, Nome</Offcanvas.Title>
          </Offcanvas.Header>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  )
}