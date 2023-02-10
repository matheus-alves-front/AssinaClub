import { SetStateAction } from "react"
import { Button, Col, Form, Row } from "react-bootstrap"
import { ClubProvider } from "../../../../../@types/ClubProviderTypes"
import { RegisterPlan } from "./utils/RegisterPlan"

type PlansRegisterProps = {
    clubProviderInfo: ClubProvider | null
    setUpdatePlans: (value: SetStateAction<boolean>) => void
}

export function PlansRegister({ clubProviderInfo, setUpdatePlans }: PlansRegisterProps) {
    return (
        <>
            <Form onSubmit={(e) => {
                RegisterPlan(e, clubProviderInfo?.id)
                setTimeout(() => { //! Corrigir essa gambiarra
                    setUpdatePlans(true)
                }, 500)
            }}
            >
                <Form.Group className="mb-2">
                    <Form.Label>Nome do Plano</Form.Label>
                    <Form.Control name="planTitle" type="text" />
                </Form.Group>
                <Form.Group className="mb-2">
                    <Form.Label>Descrição</Form.Label>
                    <Form.Control name="planDescription" as="textarea" />
                </Form.Group>
                <Row>
                    <Col>
                        <Form.Group className="mb-2">
                            <Form.Label>Preço</Form.Label>
                            <Form.Control name="planPrice" type="number" />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-2">
                            <Form.Label>Frequencia</Form.Label>
                            <Form.Control name="planFrequency" type="number" />
                            <Form.Text className="text-muted">
                                De x em x meses
                            </Form.Text>
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="my-1 justify-content-end">
                    <Col md={5}>
                        <Button
                            variant="dark"
                            type="submit"
                            className="w-100 p-2 mt-4"
                        >
                            Registrar Plano
                        </Button>
                    </Col>
                </Row>
            </Form>
        </>
    )
}