import { Container } from "react-bootstrap";
import { FiEdit } from "react-icons/fi";
import { IoCloseCircleOutline } from "react-icons/io5";
import styles from "../../../../styles/pages/clubDashboard.module.scss"
import { Admin } from "../../../../@types/AdminsClubProviderTypes";

type AdminCardType = {
    admin: Admin
    editAdminMode: boolean
    adminsToShow: Admin[]
}

export function AdminCard({ admin, editAdminMode, adminsToShow }: AdminCardType) {

    return (
        <>
            <Container className={`p-4 d-flex align-items-center w-100 ${styles.tran2} ${editAdminMode && adminsToShow.length !== 1 ? styles.selectedAdmin : ""}`}>
                <div className="w-75 d-flex flex-column gap-3">
                    <p className="m-0"> <strong>Nome:</strong> {admin.name}</p>
                    <p className="m-0"><strong>Ocupação:</strong> {admin.occupation}</p>
                    <p className="m-0"><strong>Data de nascimento:</strong>  {admin.birthDate}</p>
                    <p className="m-0"><strong>Email:</strong> {admin.email}</p>
                </div>
                <figure className={`w-25 position-relative d-flex justify-content-center ${styles.tran2}`}>
                    <img
                        className={`rounded-circle bg-white ${styles.tran2}`}
                        style={{
                            width: "65%"
                        }}
                        src="https://www.freeiconspng.com/uploads/profile-icon-9.png"
                        // {admin.image}
                        alt=""
                    />
                    <FiEdit className={styles.editAdminImage} />
                    <IoCloseCircleOutline className={styles.deleteAdminImage} />
                </figure>
            </Container>
        </>
    )
}