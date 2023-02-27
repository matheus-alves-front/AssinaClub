import { useContext, useEffect, useState } from "react"
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
import { DeletingPlansContext, ClubNavigationContext, ClubAdminContext, InfoContext, ClubDashboardUpdateContext } from "../../../../contexts/ClubDashboard/ClubDashboardContext"
import { clubRegNavDefaultActiveKey, myNavDefaultActiveKey } from "../../../../utils/ClubDashboard/navDefaultKeys"
import { ClubDashboardGlobalContext } from "../../../../contexts/ClubDashboard/ClubDashboardGlobalContext"
import { DefaultClubDashboardView } from "../../../../components/Dashboard/ClubProvider/Views/DefaultClubDashboardView"

type ClubProviderDashboardProps = {
    clubProviderAdmins: {
        data: Admin[]
    }
    userData: ClubProvider | Admin
    typeOfUser: string
}

export default function ClubProvidersDashboard({ clubProviderAdmins, userData, typeOfUser }: ClubProviderDashboardProps) {

    const {
        clubProviderInfo,
        setClubProviderInfo,
        showOnlyAdminsInDashboard
    } = useContext(ClubDashboardGlobalContext)

    const [myNavScreenSelected, setMyNavScreenSelected] = useState(myNavDefaultActiveKey)
    const [clubRegNavScreenSelected, setClubRegNavScreenSelected] = useState(clubRegNavDefaultActiveKey)

    const [canDisplayModal, setCanDisplayModal] = useState(false)
    const [adminIsDefined, setAdminIsDefined] = useState(false)

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
            deletePlans, deletingPlans, setDeletingPlans,
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
                        subscribersInfo, setSubscribersInfo,
                        plansInfo, setPlansInfo,
                        productsInfo, setProductsInfo
                    }}>
                        <ClubDashboardUpdateContext.Provider value={{
                            setUpdateProducts, setUpdatePlans
                        }}>
                            <main className={!showOnlyAdminsInDashboard ? "my-5" : ""}>
                                {canDisplayModal && <AdminLoginModal />}

                                {(!canDisplayModal || adminIsDefined) &&
                                    (
                                        <DefaultClubDashboardView />
                                    )
                                }
                            </main>
                        </ClubDashboardUpdateContext.Provider>
                    </InfoContext.Provider>
                </ClubAdminContext.Provider>
            </ClubNavigationContext.Provider>
        </DeletingPlansContext.Provider>
    )
}

export interface AdminToken extends Admin {
    clubName: string
}

export interface GetClubProviderData extends GetSessionParams {
    userData?: ClubProvider | AdminToken
    typeOfUser: string
}

export const getServerSideProps: GetServerSideProps = async (context) => {

    const session = await getServerSession(context.req, context.res, authOptions) as GetClubProviderData

    const userData = session?.userData
    const typeOfUser = session?.typeOfUser

    const { host } = context.req.headers

    if (!session) {
        return {
            redirect: {
                destination: '/login/club_provider',
                permanent: false
            }
        }
    }

    if (typeOfUser === "subscriber") {
        return {
            redirect: {
                destination: '/login/subscriber',
                permanent: false
            }
        }
    }

    const clubProviderName = typeOfUser === "clubProvider" ? String(context?.params?.clubProvider) : String(userData?.clubName)

    const clubProvider = await getClubProviderByName(clubProviderName)

    const fetchClubProviderAdmins = await fetch(`${process.env.BASE_URL}/api/club_providers/id/${clubProvider?.id}/admins/`)

    const clubProviderAdmins = await fetchClubProviderAdmins.json()

    return {
        props: {
            clubProviderAdmins,
            userData,
            typeOfUser
        }
    }
}
