import { useEffect, useState } from "react"
import { GetServerSideProps } from "next"
import { GetSessionParams } from "next-auth/react"
import { getServerSession } from "next-auth"
import { Col, Container, Row } from "react-bootstrap";
import axios from "axios"
import { getClubProviderByName } from "../../../../prisma/clubProviders"
import { Admin } from "../../../../@types/AdminsClubProviderTypes"
import { AdminLoginModal } from "../../../../components/Dashboard/ClubProvider/Admins/AdminLoginModal"
import { authOptions } from "../../../api/auth/[...nextauth]"
import { SubscribersTable } from "../../../../components/Dashboard/ClubProvider/Tables/SubscribersTable"
import { PlansTable } from "../../../../components/Dashboard/ClubProvider/Tables/PlansTable"
import { ProductsTable } from "../../../../components/Dashboard/ClubProvider/Tables/ProductsTable"
import styles from "../../../../styles/pages/clubDashboard.module.scss"
import { DivisionLine } from "../../../../components/Divisions/DivisionLine"
import { ProductsRegister } from "../../../../components/Dashboard/ClubProvider/Registers/Products/ProductsRegister"
import { MyNavigation } from "../../../../components/Dashboard/ClubProvider/Navigations/MyNavigation";
import { ClubRegisterNavigation } from "../../../../components/Dashboard/ClubProvider/Navigations/ClubRegisterNavigation";
import { PlansRegister } from "../../../../components/Dashboard/ClubProvider/Registers/Plans/PlansRegister";
import { DivisionColumn } from "../../../../components/Divisions/DivisionColumn";

type ClubProviderDashboardProps = {
    clubProviderAdmins: {
        data: Admin[]
    }
    userData: any //! Corrigir tipagem
}

export default function ClubProvidersDashboard({ clubProviderAdmins, userData }: ClubProviderDashboardProps) {

    const myNavDefaultActiveKey = "subscribers"
    const clubRegNavDefaultActiveKey = "products"

    const [myNavScreenSelected, setMyNavScreenSelected] = useState(myNavDefaultActiveKey)
    const [clubRegNavScreenSelected, setClubRegNavScreenSelected] = useState(clubRegNavDefaultActiveKey)

    const [canDisplayModal, setCanDisplayModal] = useState(false)
    const [adminIsDefined, setAdminIsDefined] = useState(false)

    const [clubProviderInfo, setClubProviderInfo] = useState<any>(null) //! Corrigir tipagem
    const [subscribersInfo, setSubscribersInfo] = useState(null)

    const [updateProducts, setUpdateProducts] = useState(false)
    const [updatePlans, setUpdatePlans] = useState(false)

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

    return (
        <main>
            {canDisplayModal &&
                <AdminLoginModal
                    adminIsDefined={adminIsDefined}
                    setAdminIsDefined={setAdminIsDefined}
                    clubProviderAdmins={clubProviderAdmins}

                />
            }
            {(!canDisplayModal || adminIsDefined) &&
                <>
                    <Row className="p-4 w-100">
                        <Col md="auto" className="d-flex justify-content-start">
                            <MyNavigation
                                myNavDefaultActiveKey={myNavDefaultActiveKey}
                                myNavScreenSelected={myNavScreenSelected}
                                setMyNavScreenSelected={setMyNavScreenSelected}
                            />
                        </Col>
                        <Col md="auto">
                            <DivisionColumn />
                        </Col>
                        <Col>
                            {myNavScreenSelected === "subscribers" &&
                                <Container className={`${styles.easeCome}`}>
                                    <SubscribersTable
                                        subscribersInfo={subscribersInfo}
                                        clubProviderInfo={clubProviderInfo}
                                    />
                                </Container>
                            }
                            {myNavScreenSelected === "plans" &&
                                <Container className={`${styles.easeCome}`}>
                                    <PlansTable
                                        subscribersInfo={subscribersInfo}
                                        clubProviderInfo={clubProviderInfo}
                                        updatePlans={updatePlans}
                                        setUpdatePlans={setUpdatePlans}
                                    />
                                </Container>}
                            {myNavScreenSelected === "products" &&
                                <Container className={`${styles.easeCome}`}>
                                    <ProductsTable
                                        subscribersInfo={subscribersInfo}
                                        clubProviderInfo={clubProviderInfo}
                                        updateProducts={updateProducts}
                                        setUpdateProducts={setUpdateProducts}
                                    />
                                </Container>
                            }
                        </Col>
                    </Row>
                    <Row className="w-100">
                        <DivisionLine />
                    </Row>
                    <Row className="p-4 w-100">
                        <Col md="auto" className="d-flex justify-content-start">
                            <ClubRegisterNavigation
                                clubRegNavDefaultActiveKey={clubRegNavDefaultActiveKey}
                                clubRegNavScreenSelected={clubRegNavScreenSelected}
                                setClubRegNavScreenSelected={setClubRegNavScreenSelected}
                            />
                        </Col>
                        <Col md="auto">
                            <DivisionColumn />
                        </Col>
                        <Col md={5}>
                            {clubRegNavScreenSelected === "products" &&
                                <Container className={`${styles.easeCome}`}>
                                    <ProductsRegister
                                        clubProviderInfo={clubProviderInfo}
                                        setUpdateProducts={setUpdateProducts}
                                    />
                                </Container>
                            }
                            {clubRegNavScreenSelected === "plans" &&
                                <Container className={`${styles.easeCome}`}>
                                    <PlansRegister
                                        clubProviderInfo={clubProviderInfo}
                                        setUpdatePlans={setUpdatePlans}
                                    />
                                </Container>
                            }
                        </Col>
                    </Row>
                </>
            }
        </main>
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
