import { useEffect, useState } from "react"
import { GetServerSideProps } from "next"
import { GetSessionParams } from "next-auth/react"
import { getServerSession } from "next-auth"
import { Col, Container, Row } from "react-bootstrap";
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
import { handlePlansInfo } from "../../../../utils/ClubDashboard/plansInfo";
import { handleProductsInfo } from "../../../../utils/ClubDashboard/productsInfo";
import { getClubProviderInfo } from "../../../../utils/ClubDashboard/getClubProviderInfo";
import { ClubProvider } from "../../../../@types/ClubProviderTypes";

type ClubProviderDashboardProps = {
    clubProviderAdmins: {
        data: Admin[]
    }
    userData: ClubProvider
    typeOfUser: string
}

export default function ClubProvidersDashboard({ clubProviderAdmins, userData, typeOfUser }: ClubProviderDashboardProps) {
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

    const [deletingPlans, setDeletingPlans] = useState(false)

    const [plansInfo, setPlansInfo] = useState<any[]>([]) //! Corrigir tipagem
    const [productsInfo, setProductsInfo] = useState<any[]>([]) //! Corrigir tipagem

    const [plansThatCanBeDeleted, setPlansThatCanBeDeleted] = useState<any>([]) //! Corrigir tipagem

    useEffect(() => {
        handlePlansInfo(subscribersInfo, setPlansInfo, clubProviderInfo, setPlansThatCanBeDeleted)
        handleProductsInfo(setProductsInfo, clubProviderInfo)
    }, [subscribersInfo])

    useEffect(() => {
        if (updateProducts) {
            handleProductsInfo(setProductsInfo, clubProviderInfo)
            setUpdateProducts(false)
        }
    }, [updateProducts])

    useEffect(() => {
        if (updatePlans) {
            handlePlansInfo(subscribersInfo, setPlansInfo, clubProviderInfo, setPlansThatCanBeDeleted)
            setUpdatePlans(false)
        }
    }, [updatePlans])

    useEffect(() => {
        setCanDisplayModal(true)
        lookForAdmin(userData)

        if (typeOfUser === "admin") {
            getClubProviderInfo(userData, setClubProviderInfo, setSubscribersInfo, typeOfUser)
        }
    }, [])

    useEffect(() => {
        if (adminIsDefined) {
            getClubProviderInfo(userData, setClubProviderInfo, setSubscribersInfo, typeOfUser)
        }
    }, [adminIsDefined])

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
                        <Col md={2} className="d-flex justify-content-center">
                            <MyNavigation
                                myNavDefaultActiveKey={myNavDefaultActiveKey}
                                myNavScreenSelected={myNavScreenSelected}
                                setMyNavScreenSelected={setMyNavScreenSelected}
                                plansInfo={plansInfo}
                                setPlansInfo={setPlansInfo}
                                productsInfo={productsInfo}
                                setProductsInfo={setProductsInfo}
                                subscribersInfo={subscribersInfo}
                                setSubscribersInfo={setSubscribersInfo}
                                setDeletingPlans={setDeletingPlans}
                                deletingPlans={deletingPlans}
                                setPlansThatCanBeDeleted={setPlansThatCanBeDeleted}

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
                                        plansInfo={plansInfo}
                                    />
                                </Container>
                            }
                            {myNavScreenSelected === "plans" &&
                                (
                                    !deletingPlans ? (
                                        <Container className={`${styles.easeCome}`}>
                                            <PlansTable
                                                plansInfo={plansInfo}
                                                deletingPlans={deletingPlans}
                                                clubProviderInfo={clubProviderInfo}
                                                setUpdatePlans={setUpdatePlans}
                                            />
                                        </Container>
                                    ) : (
                                        <Container className={`${styles.easeCome}`}>
                                            <PlansTable
                                                plansInfo={plansThatCanBeDeleted}
                                                deletingPlans={deletingPlans}
                                                clubProviderInfo={clubProviderInfo}
                                                setUpdatePlans={setUpdatePlans}
                                            />
                                        </Container>
                                    )
                                )
                            }
                            {myNavScreenSelected === "products" &&
                                <Container className={`${styles.easeCome}`}>
                                    <ProductsTable
                                        plansInfo={plansInfo}
                                        productsInfo={productsInfo}
                                    />
                                </Container>
                            }
                        </Col>
                    </Row>
                    <Row className="w-100">
                        <DivisionLine />
                    </Row>
                    <Row className="p-4 w-100">
                        <Col md={2} className="d-flex justify-content-center">
                            <ClubRegisterNavigation
                                clubRegNavDefaultActiveKey={clubRegNavDefaultActiveKey}
                                clubRegNavScreenSelected={clubRegNavScreenSelected}
                                setClubRegNavScreenSelected={setClubRegNavScreenSelected}
                            />
                        </Col>
                        <Col md="auto">
                            <DivisionColumn />
                        </Col>
                        <Col md="auto" className="mx-auto">
                            {clubRegNavScreenSelected === "products" &&
                                <Container className={`${styles.easeCome}`}>
                                    <ProductsRegister
                                        clubProviderInfo={clubProviderInfo}
                                        setUpdateProducts={setUpdateProducts}
                                        plansInfo={plansInfo}
                                        productsInfo={productsInfo}
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
        </main >
    )
}

export interface GetClubProviderData extends GetSessionParams {
    userData?: ClubProvider
    typeOfUser: string
}

export const getServerSideProps: GetServerSideProps = async (context) => {

    const session = await getServerSession(context.req, context.res, authOptions) as GetClubProviderData

    if (!session) {
        return {
            redirect: {
                destination: '/login/club_provider',
                permanent: false
            }
        }
    }

    const userData = session?.userData
    const typeOfUser = session?.typeOfUser

    const { host } = context.req.headers
    const clubProviderName = String(context?.params?.clubProvider)

    const clubProvider = await getClubProviderByName(clubProviderName)

    const fetchClubProviderAdmins = await fetch(`http://${host}/api/club_providers/id/${clubProvider?.id}/admins/`)

    const clubProviderAdmins = await fetchClubProviderAdmins.json()

    return {
        props: {
            clubProviderAdmins,
            userData,
            typeOfUser
        }
    }
}
