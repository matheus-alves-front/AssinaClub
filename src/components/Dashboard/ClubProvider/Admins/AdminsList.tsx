import { Button, Col, Container, Row } from "react-bootstrap"
import { DivisionLineWithoutMargin } from "../../../Divisions/DivisionLine"
import styles from "../../../../styles/pages/clubDashboard.module.scss"
import { useContext } from "react"
import { AdminDashboardContext } from "../../../../contexts/ClubDashboard/AdminDashboardContext"
import { AdminCard } from "./AdminCard"
import { defaultAdminsCardUpperText } from "../Views/utils/adminsCardTexts"

type AdminsListType = {
    changeAdminsCardUpperText: any //! Corrigir
    selectAdminToEdit: any //! Corrigir
}

export function AdminsList({
    changeAdminsCardUpperText,
    selectAdminToEdit
}: AdminsListType) {

    const {
        adminsToShow, setAdminsToShow,
        editAdminMode, setEditAdminMode,
        isFirstRender, adminsCardUpperText,
        changingadminsCardUpperText, currentAdmin,
        clubProviderAdmins
    } = useContext(AdminDashboardContext)

    return (
        <Container
            className={`p-0 bg-white w-50 min-vw-75 rounded-3 border border-2 shadow ${styles.tran4}`}
            style={{
                minWidth: "600px",
                maxWidth: "800px",
                height: adminsToShow.length === 1 ? "30vh" : "75vh",
                overflowY: "auto",
                margin: adminsToShow.length === 1 ? "30px auto" : ""

            }}
        >
            <Row className="p-0 m-0 position-relative">
                <Col>
                    <h2
                        className={`fs-3 pt-4 ps-3 ${changingadminsCardUpperText ? styles.easeGo : (!isFirstRender ? styles.easeCome : "")}`}
                    >
                        {adminsCardUpperText}
                    </h2>
                </Col>
                <Col
                    lg="auto"
                    className="d-flex align-items-center justify-content-center p-0 m-0 me-4"
                >
                    <Button
                        variant="dark"
                        type="submit"
                        className={`align-middle ${!editAdminMode ? "visually-hidden" : ""}`}
                        style={{ height: "50%" }}
                        onClick={() => {
                            setEditAdminMode(false)
                            setAdminsToShow(clubProviderAdmins.data)
                            if (adminsCardUpperText !== defaultAdminsCardUpperText) {
                                changeAdminsCardUpperText(defaultAdminsCardUpperText)
                            }
                        }}
                    >
                        Cancelar Edição
                    </Button>
                    <Button
                        variant="outline-dark"
                        type="submit"
                        className={`${editAdminMode ? "visually-hidden" : ""}`}
                        style={{ height: "50%" }}
                        onClick={() => {
                            setEditAdminMode(true)
                        }}
                    >
                        Editar Administrador
                    </Button>
                </Col>
            </Row>

            <DivisionLineWithoutMargin />

            {clubProviderAdmins ? (
                adminsToShow.map((admin, index) => {

                    if (admin.id === currentAdmin?.id) return

                    return (
                        <div key={index}>
                            <div
                                onClick={() => {
                                    if (editAdminMode && adminsToShow.length !== 1) {
                                        selectAdminToEdit(admin)
                                    }
                                }}
                            >
                                <AdminCard
                                    admin={admin}
                                    editAdminMode={editAdminMode}
                                    adminsToShow={adminsToShow}
                                />
                            </div>
                            {index !== adminsToShow.length - 1 && <DivisionLineWithoutMargin />}
                        </div>
                    )
                })
            ) : <></>}
        </Container>
    )
}