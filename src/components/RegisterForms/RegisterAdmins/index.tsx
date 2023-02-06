import { FormEvent, useState } from 'react';
import { Row, Col, Button, Form } from 'react-bootstrap';
import { useRouter } from 'next/router';
import axios from 'axios'

export function RegisterFormAdmin({clubProvider}: any) {
    
    const router = useRouter()

    const [isChecked, setIsChecked] = useState(false)

    const clubProviderId = clubProvider.id
    const clubProviderName = clubProvider.name

    async function RegisterAdminSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const {
            firstNameAdmin, lastNameAdmin,
            occupationAdmin, birthDateAdmin,
            emailAdmin, passwordAdmin,
        } = event.target as HTMLFormElement;

        if (
            !firstNameAdmin.value || !lastNameAdmin.value ||
            !occupationAdmin.value || !birthDateAdmin.value ||
            !emailAdmin.value || !passwordAdmin.value
        ) {
            alert('Campos Faltando')
            return
        }

        const data = {
            "name": `${firstNameAdmin.value} ${lastNameAdmin.value} `,
            "occupation": occupationAdmin.value,
            "birthDate": birthDateAdmin.value,
            "email": emailAdmin.value,
            "password": passwordAdmin.value
        }

        try {
            await axios.post(`/api/club_providers/id/${clubProviderId}/admins`, data)

            router.push(`/club_providers/${clubProviderName}/dashboard`)
        }
        catch (err: any) {
            console.log(err.response.data.message)
        }
    }

    return (
        <Form
            name="regiterFormSubscriber"
            onSubmit={(e) => RegisterAdminSubmit(e)}
            className="p-4 py-4"
        >
            <Row>
                <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Label>Nome</Form.Label>
                        <Form.Control
                            name="firstNameAdmin"
                            type="text"
                            placeholder="Nome"
                            maxLength={14}
                            minLength={2}
                        />
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Label>Sobrenome</Form.Label>
                        <Form.Control
                            name="lastNameAdmin"
                            type="text"
                            placeholder="Sobrenome"
                            maxLength={14}
                            minLength={2}
                        />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group className="mb-3">
                        <Form.Label>Ocupação</Form.Label>
                        <Form.Control
                            name="occupationAdmin"
                            type="text"
                            placeholder="Ocupação"
                        />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3">
                        <Form.Label>Data Nascimento</Form.Label>
                        <Form.Control name="birthDateAdmin" type="date" placeholder="Data de Nascimento" />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control name="emailAdmin" type="email" placeholder="Email" />
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Label>Senha</Form.Label>
                        <Form.Control name="passwordAdmin" type="password" placeholder="Senha" />
                    </Form.Group>
                </Col>
            </Row>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check
                    onChange={() => setIsChecked(!isChecked)}
                    type="checkbox" label="Aceito os termos e compromissos" />
            </Form.Group>
            <Button variant="primary" type="submit" disabled={isChecked ? false : true}>
                Registrar
            </Button>
        </Form>
    )
}
