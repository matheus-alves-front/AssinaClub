import { useState } from "react"
import { Col, Container, Row } from "react-bootstrap"
import { Admin } from "../../../../../@types/AdminsClubProviderTypes"
import { ClubProvider } from "../../../../../@types/ClubProviderTypes"
import { defaultAdminsCardUpperText, defaultMyProfileCardUpperText, fillFormCardUpperText } from "../../../../../components/Dashboard/ClubProvider/Views/utils/adminsCardTexts"
import { AdminDashboardContext } from "../../../../../contexts/ClubDashboard/AdminDashboardContext"
import styles from "../../../../../styles/pages/clubDashboard.module.scss"
import { SelectAdminAdvise } from "../../../../../components/Dashboard/ClubProvider/Admins/SelectAdminAdvise"
import { AdminsList } from "../../../../../components/Dashboard/ClubProvider/Admins/AdminsList"
import { UpdateAdminForm } from "../../../../../contexts/ClubDashboard/UpdateAdminForm"
import { GetServerSideProps } from "next"
import { getServerSession } from "next-auth"
import { authOptions } from "../../../../api/auth/[...nextauth]"
import { GetSessionParams } from "next-auth/react"
import { AdminToken } from ".."
import { getClubProviderByName } from "../../../../../prisma/clubProviders"
import { AdminMyProfileCard } from "../../../../../components/Dashboard/ClubProvider/Admins/AdminMyProfileCard"

type AdminClubDashBoardViewType = {
    userData: Admin | ClubProvider
    clubProviderAdmins: {
        data: Admin[]
    }
}

export default function AdminClubDashBoardView({ userData, clubProviderAdmins }: AdminClubDashBoardViewType) {

    const [currentAdmin, setCurrentAdmin] = useState(userData as Admin)
    const [editAdminMode, setEditAdminMode] = useState(false)
    const [editMyProfileMode, setEditMyProfileMode] = useState(false)
    const [adminsToShow, setAdminsToShow] = useState(clubProviderAdmins.data)
    const [adminsCardUpperText, setAdminsCardUpperText] = useState(defaultAdminsCardUpperText)
    const [changingadminsCardUpperText, setChangingadminsCardUpperText] = useState(false)
    const [myProfileCardUpperText, setMyProfileCardUpperText] = useState(defaultMyProfileCardUpperText)
    const [changingmyProfileCardUpperText, setChangingMyProfileCardUpperText] = useState(false)
    const [isFirstRender, setIsFirstRender] = useState(true)

    function selectAdminToEdit(admin: Admin) {
        setAdminsToShow([admin])
        if (isFirstRender) setIsFirstRender(false)
        changeAdminsCardUpperText(fillFormCardUpperText)
    }

    function changeAdminsCardUpperText(text: string) {
        setChangingadminsCardUpperText(true)
        setTimeout(() => {
            setAdminsCardUpperText(text)
            setChangingadminsCardUpperText(false)
        }, 300)
    }

    function changeMyProfileCardUpperText(text: string) {
        setChangingMyProfileCardUpperText(true)
        setTimeout(() => {
            setMyProfileCardUpperText(text)
            setChangingMyProfileCardUpperText(false)
        }, 150)
    }

    return (
        <AdminDashboardContext.Provider value={{
            adminsToShow, setAdminsToShow, editAdminMode, setEditAdminMode, isFirstRender, setIsFirstRender, adminsCardUpperText, setAdminsCardUpperText, changingadminsCardUpperText, setEditMyProfileMode, setChangingadminsCardUpperText, currentAdmin, clubProviderAdmins, editMyProfileMode, setCurrentAdmin,
            myProfileCardUpperText, changingmyProfileCardUpperText
        }}>
            <Row className={`p-0 m-0 ${styles.tran2} overflow-hidden position-relative`}
                style={{
                    maxHeight: "85vh",
                    maxWidth: "100vw",
                    zIndex: "0"
                }}>
                <SelectAdminAdvise />
                <Col
                    lg={editAdminMode ? 12 : 6}
                    className={` 
                        ${styles.tran6} 
                        m-0 ${adminsToShow.length === 1 ? "p-2" : "p-5"} 
                        ${!editAdminMode ? "border-end border-secondary-subtle border-2" : ""}
                    `}
                >
                    <AdminsList
                        changeAdminsCardUpperText={changeAdminsCardUpperText}
                        selectAdminToEdit={selectAdminToEdit}
                    />
                    <Container className={editAdminMode && adminsToShow.length === 1 ? "" : "visually-hidden"}>
                        <UpdateAdminForm />
                    </Container>
                </Col>

                <Col lg={6} className={`p-5 m-0 ${editAdminMode ? "visually-hidden" : styles.fadeInRight} `}>
                    <Row className="p-0 m-0">
                        <Container
                            className={`p-0 bg-white w-50 min-vw-75 rounded-3 border border-2 shadow`}
                            style={{    
                                minWidth: "600px",
                                maxWidth: "750px",
                                height: "40%",
                                overflowY: "auto"
                            }}
                        >
                            <AdminMyProfileCard
                                changeMyProfileCardUpperText={changeMyProfileCardUpperText}
                            />
                        </Container>
                    </Row>
                    <Row className="p-0 m-0">
                        <Container className={editMyProfileMode ? styles.easeCome : "visually-hidden"}>
                            <UpdateAdminForm />
                        </Container>
                    </Row>
                </Col>
            </Row>
        </AdminDashboardContext.Provider>
    )
}

export interface GetAdminData extends GetSessionParams {
    userData?: AdminToken
    typeOfUser: string
}

export const getServerSideProps: GetServerSideProps = async (context) => {

    const session = await getServerSession(context.req, context.res, authOptions) as GetAdminData

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