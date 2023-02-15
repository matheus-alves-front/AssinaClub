import { useContext } from "react"
import { Button, Col, Row } from "react-bootstrap"
import { AdminDashboardContext } from "../../../../contexts/ClubDashboard/AdminDashboardContext"
import { defaultMyProfileCardUpperText, fillFormCardUpperText } from "../Views/utils/adminsCardTexts"
import styles from "../../../../styles/pages/clubDashboard.module.scss"
import { DivisionLineWithoutMargin } from "../../../Divisions/DivisionLine"
import { AdminCard } from "./AdminCard"

export function AdminMyProfileCard({changeMyProfileCardUpperText} : any) {

    const {
        editMyProfileMode,
        setEditMyProfileMode,
        currentAdmin, myProfileCardUpperText , 
        changingmyProfileCardUpperText
    } = useContext(AdminDashboardContext)

    return (
        <>
            <Row className="p-0 m-0">
                <Col >
                    <h2
                        className={`fs-3 pt-4 ps-3 ${changingmyProfileCardUpperText ? styles.easeGo : styles.easeCome}`}
                    >
                        {myProfileCardUpperText}
                    </h2>
                </Col>
                <Col
                    lg="auto"
                    className="d-flex align-items-center p-0 m-0 me-4"
                >
                    <Button
                        variant={editMyProfileMode ? "dark" : "outline-dark"}
                        style={{ height: "50%" }}
                        onClick={() => {
                            if (editMyProfileMode) {
                                setEditMyProfileMode(false)
                                if (myProfileCardUpperText !== defaultMyProfileCardUpperText) {
                                    changeMyProfileCardUpperText(defaultMyProfileCardUpperText)
                                }
                            } else {
                                setEditMyProfileMode(true)
                                changeMyProfileCardUpperText(fillFormCardUpperText)
                            }
                        }}
                    >
                        {editMyProfileMode ? "Cancelar Edição" : "Editar meu Perfil"}
                    </Button>
                </Col>
            </Row>
            <DivisionLineWithoutMargin />
            <AdminCard
                admin={currentAdmin}
                editAdminMode={false}
                adminsToShow={[]}
            />
        </>
    )
}