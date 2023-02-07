import { Button, Col, Form, Row } from "react-bootstrap";
import { RegisterProduct } from "./utils/RegisterProduct";

export function ProductsRegister({ clubProviderInfo, setUpdateProducts }: any) {
    return (
        <>
            <Form
                onSubmit={(e) => {
                    RegisterProduct(e, clubProviderInfo?.id)
                    setTimeout(() => { //! Corrigir essa gambiarra
                        setUpdateProducts(true)
                    }, 500)
                }}
            >
                <Row>
                    <Col md={12}>
                        <Form.Group>
                            <Form.Label>Nome do Produto</Form.Label>
                            <Form.Control
                                type="text"
                                name="productName"
                            />
                        </Form.Group>
                    </Col>
                    <Col className="my-1" md={12}>
                        <Form.Group>
                            <Form.Label>Descrição</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="productDescription"
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="my-1">
                    <Col className="my-1" md={6}>
                        <Form.Group>
                            <Form.Label>Sku:</Form.Label>
                            <Form.Control
                                type="text"
                                name="productSku"
                            />
                            <Form.Text className="text-muted">
                                Sku é o identificador único do produto
                            </Form.Text>
                        </Form.Group>
                    </Col>
                    <Col className="my-1" md={6}>
                        <Form.Group>
                            <Form.Label>Valor:</Form.Label>
                            <Form.Control
                                type="number"
                                min="0.00"
                                max="10000.00"
                                name="productValue"
                            />
                            <Form.Text className="text-muted">
                                O valor é uma média para controle de gastos em seu dashboard
                            </Form.Text>
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="my-1 justify-content-end">
                    <Col md={5}>
                        <Button
                            type="submit"
                            className="w-100 p-2 mt-4"
                        >
                            Registrar Produto
                        </Button>
                    </Col>
                </Row>
            </Form>
        </>
    )
}