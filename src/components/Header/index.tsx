import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { Router } from "next/router";
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

interface GeneralUser extends Subscriber, Admin { }

export function Header() {
  const session = useSession() as GetData

  let [userData, setUserData] = useState<Subscriber | Admin | ClubProvider | undefined>(undefined)
  let [typeOfUser, setTypeOfUser] = useState<string | undefined>(undefined)
  let [generalUser, setGeneralUser] = useState<GeneralUser | undefined>(undefined)
  let [clubProvider, setClubProvider] = useState<ClubProvider | undefined>(undefined)

  useEffect(() => {

    if (session.data) {
      const data = session.data.userData
      setUserData(data)
      setTypeOfUser(session.data.typeOfUser)
      setGeneralUser(data as GeneralUser)
      setClubProvider(data as ClubProvider)
    }
  }, [session])

  const { clubProviderInfo, setShowOnlyAdminsInDashboard } = useContext(ClubDashboardGlobalContext)

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
              {clubProviderInfo && (typeOfUser !== 'subscriber' && (
                <Offcanvas.Title className="mb-3 fw-normal">
                  {clubProviderInfo.clubName}
                </Offcanvas.Title>
              ))}
              <Offcanvas.Title className={typeOfUser === "subscriber" ? "fw-normal" : "fw-lighter"}>
                Olá, {userData ? generalUser?.name : 'Faça Login'}
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
                        if (path) {
                          return (
                            <Link
                              key={index}
                              href={path}
                              className={`${styles.headerOption}`}
                            >
                              {text}
                            </Link>
                          )
                        } else {
                          return (
                            // this options will not reload the page
                            <a
                              key={index}
                              className={`${styles.headerOption}`}
                              onClick={() => {
                                setShowOnlyAdminsInDashboard(true)
                                setIsOffcanvas(!isOffcanvas)
                              }}
                            >
                              {text}
                            </a>
                          )
                        }
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