import { useContext, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Router } from "next/router";
import { Button, Container, Navbar, Offcanvas } from "react-bootstrap";

import { AuthContext } from "../../contexts/AuthContext";
import { IoMenu } from "react-icons/io5"
import { Subscriber } from "../../@types/SubscriberTypes";
import { ClubProvider } from "../../@types/ClubProviderTypes";

export function Header() {
  const {
    isAuthenticated,
    userInformation,
    typeOfPerson,
    signOut
  } = useContext(AuthContext)

  Router.events.on("routeChangeComplete", (url) => {
    setIsLoggedIn(isAuthenticated)
  })

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const userInformationRef = useRef<Subscriber | ClubProvider | null>(null)
  const [isOffcanvas, setIsOffcanvas] = useState(false)

  useEffect(() => {
    setIsLoggedIn(isAuthenticated)
    userInformationRef.current = userInformation || null
  }, [isAuthenticated])

  const handleCloseOffcanvas = () => setIsOffcanvas(false)

  return (
    <>
      <Navbar className="shadow-sm mb-5">
        <Container className="position-relative py-2">
          <Navbar.Brand className="d-block" href="/">AssinaClub</Navbar.Brand>
          <Navbar.Toggle 
            className="d-block position-absolute top-50 start-100 translate-middle border-0" 
            onClick={() => setIsOffcanvas(!isOffcanvas)}
          >
            <IoMenu fontSize={50} />  
          </Navbar.Toggle>
          <Offcanvas show={isOffcanvas} onHide={handleCloseOffcanvas}>
            <Offcanvas.Header>
              <Offcanvas.Title>
                Olá, {isLoggedIn ? ((userInformationRef.current as Subscriber)?.name || (userInformationRef.current as ClubProvider)?.clubName) : 'Faça Login'}
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body className="d-flex flex-column gap-2">
            {isLoggedIn ? 
              (
                <>
                  <Link href={'/'}>Home</Link>
                  <Link href={`/login/${typeOfPerson}`}>Fazer Login</Link>
                  <Link href={`/${typeOfPerson}/clubs_board`}>Ver todos os Clubes</Link>
                  <Button 
                    className="mt-auto" 
                    variant="danger"
                    onClick={() => signOut()}
                  >Sair da Conta</Button>
                </>
              )
            : 
              <>
                <Link href={'/login/subscriber'}>Fazer Login</Link>
                <Link className="mt-auto" href={'/login/club_provider'}>Sou Administrador de um Clube</Link>
              </>
            }
            </Offcanvas.Body>
          </Offcanvas>
        </Container>
      </Navbar>
    </>
  )
}