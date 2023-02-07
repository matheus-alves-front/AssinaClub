import { useEffect, useState } from "react"
import { GetServerSideProps } from "next"
import { getClubProviderByName } from "../../../../prisma/clubProviders"
import { Admin } from "../../../../@types/AdminsClubProviderTypes"
import { AdminLoginModal } from "../../../../components/Dashboard/ClubProvider/Admins/AdminLoginModal"
import { getServerSession } from "next-auth"
import { authOptions } from "../../../api/auth/[...nextauth]"
import { GetSessionParams } from "next-auth/react"
import axios from "axios"
import { SubscribersTable } from "../../../../components/Dashboard/ClubProvider/SubscribersTable"
import { PlansTable } from "../../../../components/Dashboard/ClubProvider/PlansTable"
import { ProductsTable } from "../../../../components/Dashboard/ClubProvider/ProductsTable"
import Nav from 'react-bootstrap/Nav';
import styles from "../../../../styles/pages/clubDashboard.module.scss"
import { Col, Row } from "react-bootstrap"

type ClubProviderHomeProps = {
    clubProviderAdmins: {
        data: Admin[]
    }
    userData: any //! Corrigir tipagem
}

export default function ClubProvidersHome({ clubProviderAdmins, userData }: ClubProviderHomeProps) {

    const defaultActiveKey = "subscribers"
    const [screenSelected, setScreenSelected] = useState(defaultActiveKey)
    const [canDisplayModal, setCanDisplayModal] = useState(false)
    const [adminIsDefined, setAdminIsDefined] = useState(false)
    const [clubProviderInfo, setClubProviderInfo] = useState(null)
    const [subscribersInfo, setSubscribersInfo] = useState(null)

    useEffect(() => {
        setCanDisplayModal(true)
        lookForAdmin(userData)
    }, [])

    useEffect(() => {
        if (adminIsDefined) getClubProviderInfo()
    }, [adminIsDefined])

    async function getClubProviderInfo() {
        try {
            const response = await axios.get(`http://localhost:3000/api/club_providers/${userData.id}`)
            const clubProvider = response.data.data
            setClubProviderInfo(clubProvider)
            getSubscribersInfo(clubProvider.id)
        } catch (err) {
            console.log(err)
            alert("Algo deu errado!")
        }
    }

    async function getSubscribersInfo(clubProviderId: any) { //! Corrigir tipagem
        const response = await axios.get(`http://localhost:3000/api/subscribers?clubProviderId=${clubProviderId}`)
        const subscribers = response.data.data
        setSubscribersInfo(subscribers)
    }

    function lookForAdmin(userData: any) { //! Corrigir tipagem
        if (userData.occupation !== undefined) setCanDisplayModal(false)
    }

    function handleSelect(eventKey: any) {
        setScreenSelected(eventKey)
    }

    return (
        <>
            {canDisplayModal &&
                <AdminLoginModal
                    adminIsDefined={adminIsDefined}
                    setAdminIsDefined={setAdminIsDefined}
                    clubProviderAdmins={clubProviderAdmins}

                />
            }
            {(!canDisplayModal || adminIsDefined) &&
                <Row>
                    <Col md={2} className="ms-3">
                        <Nav
                            variant="pills"
                            defaultActiveKey={defaultActiveKey}
                            onSelect={handleSelect}
                            className="d-flex flex-column"
                        >
                            <Nav.Item>
                                <Nav.Link
                                    eventKey="subscribers"
                                    className={`text-center ${screenSelected === "subscribers" ? "text-white" : ""}`}
                                >
                                    Meus Assinantes
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link
                                    eventKey="plans"
                                    className={`text-center ${screenSelected === "plans" ? "text-white" : ""}`}
                                >
                                    Meus Planos
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link
                                    eventKey="products"
                                    className={`text-center ${screenSelected === "products" ? "text-white" : ""}`}
                                >
                                    Meus Produtos
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col>
                        {screenSelected === "subscribers" &&
                            <div className={`${styles.easeCome}`}>
                                <SubscribersTable
                                    subscribersInfo={subscribersInfo}
                                    clubProviderInfo={clubProviderInfo}
                                />
                            </div>
                        }
                        {screenSelected === "plans" &&
                            <div className={`${styles.easeCome}`}>
                                <PlansTable
                                    subscribersInfo={subscribersInfo}
                                    clubProviderInfo={clubProviderInfo}
                                />
                            </div>}
                        {screenSelected === "products" &&
                            <div className={`${styles.easeCome}`}>
                                <ProductsTable
                                    subscribersInfo={subscribersInfo}
                                    clubProviderInfo={clubProviderInfo}
                                />
                            </div>
                        }
                    </Col>
                </Row>
            }
        </>
    )
}

export interface GetClubProviderData extends GetSessionParams {
    userData?: any
}

export const getServerSideProps: GetServerSideProps = async (context) => {

    const { userData } = await getServerSession(context.req, context.res, authOptions) as GetClubProviderData

    const { host } = context.req.headers
    const clubProviderName = String(context?.params?.clubProvider)

    const clubProvider = await getClubProviderByName(clubProviderName)

    const fetchClubProviderAdmins = await fetch(`http://${host}/api/club_providers/id/${clubProvider?.id}/admins/`)

    const clubProviderAdmins = await fetchClubProviderAdmins.json()

    return {
        props: {
            clubProviderAdmins,
            userData
        }
    }
}
