import { useState } from "react";
import Link from "next/link";
import { Router } from "next/router";
import { Button, Container, Navbar, Offcanvas } from "react-bootstrap";

import { IoMenu } from "react-icons/io5"
import { GetSessionParams, signOut, useSession } from "next-auth/react";
import { Subscriber } from "../../@types/SubscriberTypes";

interface GetSubscriberData extends GetSessionParams {
  data: {
    userData?: Subscriber
  }
}

export function Header() {
  const session = useSession() as GetSubscriberData
  let userData
  if (session.data) {
    userData = session?.data.userData
  }

  const [isOffcanvas, setIsOffcanvas] = useState(false)

  const handleCloseOffcanvas = () => setIsOffcanvas(false)

  return (
    <>
      <Navbar className="shadow-sm mb-4">
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
                Olá, {userData ? userData?.name : 'Faça Login'}
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body className="d-flex flex-column gap-2">
            {session.data ? 
              (
                <>
                  <Link href={`/subscriber/dashboard`}>Ver Perfil</Link>
                  <Link href={`/club_providers/clubs_board`}>Ver todos os Clubes</Link>
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
                <Link className="mt-auto text-warning" href={'/login/club_provider'}>Sou Administrador de um Clube</Link>
              </>
            }
            </Offcanvas.Body>
          </Offcanvas>
        </Container>
      </Navbar>
    </>
  )
}