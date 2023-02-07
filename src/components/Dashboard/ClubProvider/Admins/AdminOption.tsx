import { FormEvent, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Admin } from '../../../../@types/AdminsClubProviderTypes';

import {
    Button,
    Form,
    Card
} from 'react-bootstrap';
import axios from 'axios';
import { signIn } from 'next-auth/react';



type ClubProviderAdminType = {
    admin: Admin
    setAdminIsDefined: any //! Corrigir tipagem
}

export function AdminOption({ admin, setAdminIsDefined }: ClubProviderAdminType) {

    const [canOpenLoginInputs, setCanOpenLoginInputs] = useState(false)

    function handleClick() {
        setCanOpenLoginInputs(!canOpenLoginInputs)
    }

    async function LoginSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const {
            email,
            password,
        } = event.target as HTMLFormElement

        const data = {
            "email": email.value,
            "password": password.value,
            "typeOfUser": "admin"
        }

        try {
            const loginPost = await axios.post('/api/login', data)

            const { token } = loginPost.data.data

            await signIn('GeneralLogin', {
                email: email.value,
                token,
                typeOfUser: 'admin',
                redirect: false
            })

            setAdminIsDefined(true)
        }
        catch (err: any) {
            alert(String(err.response.data.message))
        }
    }

    return (
        <>
            <Card className='m-4 d-flex justify-content-center' onClick={handleClick} >
                <Row >
                    <Col lg={10}>
                        <Card.Body>
                            <Card.Title>{admin?.name}</Card.Title>
                            <Card.Text>
                                {admin.occupation}
                            </Card.Text>
                        </Card.Body>
                    </Col>
                    <Col >
                        <Card.Img variant="top" src="data:," />
                    </Col>
                </Row>
                {canOpenLoginInputs && (
                    <Form
                        name="formAdmins"
                        className="mx-auto mb-4 mx-4"
                        onSubmit={(e) => LoginSubmit(e)}
                        onClick={(e) => { e.stopPropagation() }}
                    >
                        <Form.Group className="mb-2">
                            <Form.Label>Email</Form.Label>
                            <Form.Control name="email" type="email" placeholder="Email" className='w-100' />
                            <Form.Text className="text-muted">
                                Nunca compartilhe suas credenciais.
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-4">
                            <Form.Label>Senha</Form.Label>
                            <Form.Control name="password" type="password" placeholder="Senha" className='w-100' />
                        </Form.Group>
                        <Button className="w-100" variant="dark" type="submit">
                            Fazer Login
                        </Button>
                    </Form>
                )}
            </Card>
        </>
    );
}