import { useEffect, useState } from "react"
import { GetServerSideProps } from "next"
import { GetSessionParams } from "next-auth/react"
import { getServerSession } from "next-auth"
import { authOptions } from "../../../api/auth/[...nextauth]"
import { getClubProviderByName } from "../../../../prisma/clubProviders"

import { Admin } from "../../../../@types/AdminsClubProviderTypes"
import { ClubProvider } from "../../../../@types/ClubProviderTypes";
import { Subscriber } from "../../../../@types/SubscriberTypes"
import { Plan } from "../../../../@types/PlansTypes"
import { Product } from "../../../../@types/ProductTypes"

import { handlePlansInfo } from "../../../../utils/ClubDashboard/plansInfo";
import { handleProductsInfo } from "../../../../utils/ClubDashboard/productsInfo";
import { getClubProviderInfo } from "../../../../utils/ClubDashboard/getClubProviderInfo";

import { AdminLoginModal } from "../../../../components/Dashboard/ClubProvider/Admins/AdminLoginModal"
import { SubscribersTable } from "../../../../components/Dashboard/ClubProvider/Tables/SubscribersTable"
import { PlansTable } from "../../../../components/Dashboard/ClubProvider/Tables/PlansTable"
import { ProductsTable } from "../../../../components/Dashboard/ClubProvider/Tables/ProductsTable"
import { DivisionLine } from "../../../../components/Divisions/DivisionLine"
import { ProductsRegister } from "../../../../components/Dashboard/ClubProvider/Registers/Products/ProductsRegister"
import { MyNavigation } from "../../../../components/Dashboard/ClubProvider/Navigations/MyNavigation";
import { ClubRegisterNavigation } from "../../../../components/Dashboard/ClubProvider/Navigations/ClubRegisterNavigation";
import { PlansRegister } from "../../../../components/Dashboard/ClubProvider/Registers/Plans/PlansRegister";
import { DivisionColumn } from "../../../../components/Divisions/DivisionColumn";

import { Col, Container, Row } from "react-bootstrap";
import styles from "../../../../styles/pages/clubDashboard.module.scss"
import { DeletingPlansContext, ClubNavigationContext, ClubAdminContext, InfoContext, ClubDashboardUpdateContext } from "../../../../contexts/ClubDashboard/ClubDashboardContext"
import { clubRegNavDefaultActiveKey, myNavDefaultActiveKey } from "../../../../utils/ClubDashboard/navDefaultKeys"

type ClubProviderDashboardProps = {
    clubProviderAdmins: {
        data: Admin[]
    }
    userData: ClubProvider | Admin
    typeOfUser: string
}

export default function ClubProvidersDashboard({ clubProviderAdmins, userData, typeOfUser }: ClubProviderDashboardProps) {

    const [myNavScreenSelected, setMyNavScreenSelected] = useState(myNavDefaultActiveKey)
    const [clubRegNavScreenSelected, setClubRegNavScreenSelected] = useState(clubRegNavDefaultActiveKey)

    const [canDisplayModal, setCanDisplayModal] = useState(false)
    const [adminIsDefined, setAdminIsDefined] = useState(false)

    const [clubProviderInfo, setClubProviderInfo] = useState<ClubProvider | null>(null)
    const [subscribersInfo, setSubscribersInfo] = useState<Subscriber[]>([])
    const [plansInfo, setPlansInfo] = useState<Plan[]>([])
    const [productsInfo, setProductsInfo] = useState<Product[]>([])

    const [updateProducts, setUpdateProducts] = useState(false)
    const [updatePlans, setUpdatePlans] = useState(false)
    
    const [deletingPlans, setDeletingPlans] = useState(false)
    const [plansThatCanBeDeleted, setPlansThatCanBeDeleted] = useState<Plan[]>([])

    function deletePlans(plansInfo: Plan[]) {
        const filteredPlans = [...plansInfo].filter(plan => plan.subscriberIds.length === 0)
        setPlansThatCanBeDeleted(filteredPlans)
        setDeletingPlans(true)
    }

    useEffect(() => {
        setCanDisplayModal(true)

        if (typeOfUser === "admin") {
            setCanDisplayModal(false)
            getClubProviderInfo(userData, setClubProviderInfo, setSubscribersInfo, typeOfUser)
        }
    }, [])

    useEffect(() => {
        if (subscribersInfo === null || clubProviderInfo === null) return
        handlePlansInfo(subscribersInfo, setPlansInfo, clubProviderInfo, setPlansThatCanBeDeleted)
        handleProductsInfo({ setProductsInfo, clubProviderInfo })
    }, [subscribersInfo])

    useEffect(() => {
        if (updateProducts) {
            handleProductsInfo({ setProductsInfo, clubProviderInfo })
            setUpdateProducts(false)
        }
    }, [updateProducts])

    useEffect(() => {
        if (updatePlans) {
            if (subscribersInfo === null || clubProviderInfo === null) return
            handlePlansInfo(subscribersInfo, setPlansInfo, clubProviderInfo, setPlansThatCanBeDeleted)
            setUpdatePlans(false)
        }
    }, [updatePlans])

    useEffect(() => {
        if (adminIsDefined) {
            getClubProviderInfo(userData, setClubProviderInfo, setSubscribersInfo, typeOfUser)
        }
    }, [adminIsDefined])

    return (
        <DeletingPlansContext.Provider value={{
            deletePlans, 
            deletingPlans, setDeletingPlans,
            plansThatCanBeDeleted, setPlansThatCanBeDeleted
        }}>
            <ClubNavigationContext.Provider value={{
                myNavScreenSelected, setMyNavScreenSelected,
                clubRegNavScreenSelected, setClubRegNavScreenSelected
            }}>
                <ClubAdminContext.Provider value={{
                    adminIsDefined, setAdminIsDefined, clubProviderAdmins
                }}>
                    <InfoContext.Provider value={{
                        clubProviderInfo,
                        subscribersInfo, setSubscribersInfo,
                        plansInfo, setPlansInfo,
                        productsInfo, setProductsInfo
                    }}>
                        <ClubDashboardUpdateContext.Provider value={{
                            setUpdateProducts, setUpdatePlans
                        }}>

                            <main>
                                {canDisplayModal && <AdminLoginModal />}

                                {(!canDisplayModal || adminIsDefined) &&
                                    <>
                                        <Row className="p-4 w-100">
                                            <Col md={2} className="d-flex justify-content-center">
                                                <MyNavigation/>
                                            </Col>
                                            <Col md="auto">
                                                <DivisionColumn />
                                            </Col>
                                            <Col>
                                                {myNavScreenSelected === "subscribers" &&
                                                    <Container className={`${styles.easeCome}`}>
                                                        <SubscribersTable/>
                                                    </Container>
                                                }
                                                {myNavScreenSelected === "plans" &&
                                                    (
                                                        !deletingPlans ? (
                                                            <Container className={`${styles.easeCome}`}>
                                                                <PlansTable
                                                                    plansInfo={plansInfo}
                                                                />
                                                            </Container>
                                                        ) : (
                                                            <Container className={`${styles.easeCome}`}>
                                                                <PlansTable
                                                                    plansInfo={plansThatCanBeDeleted}
                                                                />
                                                            </Container>
                                                        )
                                                    )
                                                }
                                                {myNavScreenSelected === "products" &&
                                                    <Container className={`${styles.easeCome}`}>
                                                        <ProductsTable/>
                                                    </Container>
                                                }
                                            </Col>
                                        </Row>
                                        <Row className="w-100">
                                            <DivisionLine />
                                        </Row>
                                        <Row className="p-4 w-100">
                                            <Col md={2} className="d-flex justify-content-center">
                                                <ClubRegisterNavigation />
                                            </Col>
                                            <Col md="auto">
                                                <DivisionColumn />
                                            </Col>
                                            <Col md="auto" className="mx-auto">
                                                {clubRegNavScreenSelected === "products" &&
                                                    <Container className={`${styles.easeCome}`}>
                                                        <ProductsRegister/>
                                                    </Container>
                                                }
                                                {clubRegNavScreenSelected === "plans" &&
                                                    <Container className={`${styles.easeCome}`}>
                                                        <PlansRegister/>
                                                    </Container>
                                                }
                                            </Col>
                                        </Row>
                                    </>
                                }
                            </main >
                        </ClubDashboardUpdateContext.Provider>
                    </InfoContext.Provider>
                </ClubAdminContext.Provider>
            </ClubNavigationContext.Provider>
        </DeletingPlansContext.Provider>
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
