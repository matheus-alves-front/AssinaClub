import { FormEvent, useContext } from "react"
import { Button, Form, Row } from "react-bootstrap"
import { updateAdmin } from "../../components/Dashboard/ClubProvider/Views/utils/updateAdmin"
import { AdminDashboardContext } from "./AdminDashboardContext"

export function UpdateAdminForm() {

    const {
        adminsToShow, setAdminsToShow,
        setEditAdminMode, editMyProfileMode,
        setEditMyProfileMode,
        currentAdmin, setCurrentAdmin
    } = useContext(AdminDashboardContext)

    async function submitUpdateAdmin(event: FormEvent<HTMLFormElement>) {
        if (editMyProfileMode) {
            const status = await updateAdmin(event, currentAdmin.clubProviderId, currentAdmin, setAdminsToShow, currentAdmin, setCurrentAdmin, editMyProfileMode)
            if (status === 200) setEditMyProfileMode(false)
            return
        }

        const status = await updateAdmin(event, currentAdmin.clubProviderId, adminsToShow[0], setAdminsToShow, currentAdmin, setCurrentAdmin, editMyProfileMode)
        if (status === 200) setEditAdminMode(false)
    }

    return (
        <Form
            className={`mx-auto my-5`}
            style={{
                width: "50%",
                minWidth: "600px",
                maxWidth: "750px",
            }}
            onSubmit={(e) => {
                submitUpdateAdmin(e)
            }}
        >
            <Row >
                <Form.Group className="mb-3 w-50">
                    <Form.Label>Alterar nome:</Form.Label>
                    <Form.Control
                        name="firstNameAdmin"
                        type="text"
                        placeholder="Nome"
                        maxLength={14}
                        minLength={2}
                    />
                </Form.Group>
                <Form.Group className="mb-3 w-50">
                    <Form.Label>Sobrenome</Form.Label>
                    <Form.Control
                        name="lastNameAdmin"
                        type="text"
                        placeholder="Sobrenome"
                        maxLength={14}
                        minLength={2}
                    />
                </Form.Group>
            </Row>
            <Row >
                <Form.Group className="mb-3">
                    <Form.Label>Alterar ocupação:</Form.Label>
                    <Form.Control
                        type="text"
                        name="occupationAdmin"
                        placeholder="Ocupação"
                    />
                </Form.Group>
            </Row>
            <Row >
                <Form.Group className="mb-3">
                    <Form.Label>Alterar data de nascimento:</Form.Label>
                    <Form.Control
                        name="birthDateAdmin"
                        type="date"
                    />
                </Form.Group>
            </Row>
            <Row >
                <Form.Group className="mb-3">
                    <Form.Label>Alterar email:</Form.Label>
                    <Form.Control
                        type="text"
                        name="emailAdmin"
                        placeholder="Email"
                    />
                </Form.Group>
            </Row>
            <Row
                className={`mt-3 d-flex`}
            >
                <Button
                    variant="outline-dark"
                    type="submit"
                >
                    Alterar Informações do Administrador
                </Button>
            </Row>
        </Form>
    )
}