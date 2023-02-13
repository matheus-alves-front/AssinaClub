import { useRouter } from 'next/router';
import { Admin } from '../../../../@types/AdminsClubProviderTypes';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { AdminOption } from './AdminOption';
import { useContext } from 'react';
import { ClubAdminContext } from '../../../../contexts/ClubDashboardContext';

export function AdminLoginModal() {

    const router = useRouter()

    const {
        adminIsDefined, 
        setAdminIsDefined,
        clubProviderAdmins
    } = useContext(ClubAdminContext) 

    const admins = clubProviderAdmins.data
    const thereAreAdmins = admins.length > 0

    return (
        <Modal
            show={!adminIsDefined}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    {thereAreAdmins ? "Escolha um administrador:" : "Não encontramos administradores..."}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {thereAreAdmins && admins.map((admin, i) => (
                    <AdminOption key={i} admin={admin} setAdminIsDefined={setAdminIsDefined} />
                ))}
                {!thereAreAdmins &&
                    <>
                        <p>Para acessar o clubProvider registre um administrador.</p>
                    </>
                }
            </Modal.Body>
            <div className="w-100 d-flex gap-2 justify-content-end p-3">
                <Button variant="outline-dark">
                    Voltar
                </Button>
                <Button variant="dark" onClick={() => {
                    router.push('/register/admin')
                }}>
                    Criar Administrador
                </Button>
            </div>
        </Modal>
    );
}