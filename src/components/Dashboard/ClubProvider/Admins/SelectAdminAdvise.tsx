import { useContext } from "react";
import { Col } from "react-bootstrap";
import { AdminDashboardContext } from "../../../../contexts/ClubDashboard/AdminDashboardContext";
import styles from "../../../../styles/pages/clubDashboard.module.scss"
import {RotatingSquare} from "react-loader-spinner"

export function SelectAdminAdvise() {

    const {
        adminsToShow, editAdminMode
    } = useContext(AdminDashboardContext)

    return (
        <Col
            className={`d-flex flex-column align-items-center position-absolute bg-secondary-subtle p-2 top-50 rounded-4 shadow border border-secondary ${styles.tran4} ${editAdminMode && adminsToShow.length !== 1 ? styles.easeCome : "visually-hidden"}`}
            style={{
                width: "12%",
                minWidth: "195px",
                transform: "translate(100%, -50%)",
            }}
        >
            <p className="text-center fw-light fs-5 m-1">
                Selecione o Administrador que deseja editar
            </p>
            <RotatingSquare
                height="60"
                width="60"
                color="#000000"
                ariaLabel="rotating-square-loading"
            />
        </Col>
    )
}