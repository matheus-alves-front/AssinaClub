import { useContext, useEffect, useRef, useState } from "react";
import { GetSessionParams, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";

import { ClubDashboardGlobalContext } from "../../contexts/ClubDashboard/ClubDashboardGlobalContext";

import { Subscriber } from "../../@types/SubscriberTypes";
import { Admin } from "../../@types/AdminsClubProviderTypes";
import { ClubProvider } from "../../@types/ClubProviderTypes";

import { ADMIN_HEADER_OPTIONS, SUBSCRIBER_HEADER_OPTIONS } from "./utils/headerOptions";

import { DivisionLineWithoutMargin } from "../Divisions/DivisionLine";
import { IoMenu, IoClose } from "react-icons/io5"

import styles from "./header.module.scss"

interface GetData extends GetSessionParams {
  data: {
    userData?: Subscriber | Admin | ClubProvider
    typeOfUser?: string
  }
}

export function Header() {
  const session = useSession() as GetData
  const router = useRouter()

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

  const handleCloseOffcanvas = () => setIsMenuSidebar(false)
  
  useEffect(() => {
    router.events.on('routeChangeComplete', handleCloseOffcanvas);

    return () => {
      router.events.off('routeChangeComplete', handleCloseOffcanvas);
    };
  })

  const loginDropdownRef = useRef(null)
  const [isLoginDropdown, setIsLoginDropdown] = useState(false)
  const [isMenuSidebar, setIsMenuSidebar] = useState(false)

  return (
    <>
      <header className={`${styles.header} ${isMenuSidebar ? 'active' : ''}`}>
        <div className={styles.container}>
          <Link href="/" className={styles.logo}>
              AssinaClub
          </Link>
          <nav className="position-relative py-2">
            <Link 
              href={'/club_providers/clubs_board'}
              className="fw-bold"
            >
                Clubes
            </Link>

            {!userData ? 
              <div 
                id="login-header-dropdown" 
                title="Login"
                className={styles.loginSection}
              >
                <button
                  onClick={() => setIsLoginDropdown(!isLoginDropdown)}
                >Login</button>
                {isLoginDropdown ?
                  <div 
                    className={styles.dropdown}
                    ref={loginDropdownRef}
                  >
                    <Link href="/login/subscriber">Sou Assinante</Link>
                    <Link href="/login/club_provider">Sou Clube</Link>
                  </div>
                :
                ''
                }
              </div>
            : 
              <button
                className={styles.menuToggle}
                onClick={() => setIsMenuSidebar(!isMenuSidebar)}
              >
                <IoMenu fontSize={50} />
              </button>
            }


            {isMenuSidebar ? 
              <aside className={styles.sidebarMenu}>
                <header>
                  {userData && (typeOfUser !== 'subscriber' && (
                    <h5 className={styles.adminName}>
                      {userData.clubName ? userData.clubName : clubProviderInfo?.clubName}
                    </h5>
                  ))}
                  <h4>
                    Olá, {userData ? userData?.name : 'Faça Login'}
                  </h4>
                  <button 
                    className={styles.closeMenu}
                    onClick={() => setIsMenuSidebar(!isMenuSidebar)}
                  >
                    <IoClose />
                  </button>
                </header>

                <DivisionLineWithoutMargin />

                <section className={styles.menuContent}>
                  {session.data ?
                    (
                      <>
                        {
                          typeOfUser === "subscriber" &&
                          SUBSCRIBER_HEADER_OPTIONS.map(({ text, path }, index) => (
                            <Link
                              key={index}
                              href={path}
                              className={styles.headerOption}
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
                                className={styles.headerOption}
                              >
                                {text}
                              </Link>
                            )
                          })
                        }
                        <button
                          className={styles.signOut}
                          onClick={() => signOut()}
                        >Sair da Conta</button>
                      </>
                    )
                    :
                    <>
                      <Link 
                        className={styles.headerOption}
                        href={'/login/subscriber'}
                      >Fazer Login</Link>
                      <Link 
                        className={styles.headerOptionSignInClubProvider}
                        href={'/login/club_provider'}
                      >Sou Administrador de um Clube</Link>
                    </>
                  }
                </section>
              </aside>
            : ''}
          </nav>

        </div>
      </header>
    </>
  )
}