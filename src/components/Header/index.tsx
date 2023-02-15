import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { Button, Container, Navbar, Offcanvas } from "react-bootstrap";
import { IoMenu } from "react-icons/io5"
import { GetSessionParams, signOut, useSession } from "next-auth/react";
import { Subscriber } from "../../@types/SubscriberTypes";
import { ClubDashboardGlobalContext } from "../../contexts/ClubDashboard/ClubDashboardGlobalContext";
import { Admin } from "../../@types/AdminsClubProviderTypes";
import { ClubProvider } from "../../@types/ClubProviderTypes";
import { DivisionLineWithoutMargin } from "../Divisions/DivisionLine";
import { ADMIN_HEADER_OPTIONS, SUBSCRIBER_HEADER_OPTIONS } from "./utils/headerOptions";
import styles from "../../styles/components/header.module.scss"

interface GetData extends GetSessionParams {
  data: {
    userData?: Subscriber | Admin | ClubProvider
    typeOfUser?: string
  }
}

export function Header() {
  const session = useSession() as GetData

  let [userData, setUserData] = useState<any>(undefined)
  let [typeOfUser, setTypeOfUser] = useState<string | undefined>(undefined)

  useEffect(() => {
    if (session.data) {
      const data = session.data.userData
      setUserData(data)
      setTypeOfUser(session.data.typeOfUser)      
    }
  }, [session])

  const { clubProviderInfo } = useContext(ClubDashboardGlobalContext)

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
            <Offcanvas.Header className="d-flex flex-column align-items-start">
              {userData && (typeOfUser !== 'subscriber' && (
                <Offcanvas.Title className="mb-3 fw-normal">
                  {userData.clubName ? userData.clubName : clubProviderInfo?.clubName}
                </Offcanvas.Title>
              ))}
              <Offcanvas.Title className={typeOfUser === "subscriber" ? "fw-normal" : "fw-lighter"}>
                Olá, {userData ? userData?.name : 'Faça Login'}
              </Offcanvas.Title>
            </Offcanvas.Header>

            <DivisionLineWithoutMargin />

            <Offcanvas.Body className="d-flex flex-column gap-2">
              {session.data ?
                (
                  <>
                    {
                      typeOfUser === "subscriber" &&
                      SUBSCRIBER_HEADER_OPTIONS.map(({ text, path }, index) => (
                        <Link
                          key={index}
                          href={path}
                          className={`${styles.headerOption}`}
                        >
                          {text}
                        </Link>)
                      )
                    }
                    {
                      typeOfUser === "admin" &&
                      ADMIN_HEADER_OPTIONS.map(({ text, path }, index) => {

                        if(text === "Home" ) path += `${clubProviderInfo?.id}/dashboard`
                        if(text === "Administradores" ) path += `${clubProviderInfo?.id}/dashboard/admins`

                        return (
                          <Link
                            key={index}
                            href={path}
                            className={`${styles.headerOption}`}
                          >
                            {text}
                          </Link>
                        )
                      })
                    }
                    <Button
                      className="mt-auto"
                      variant="outline-danger"
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