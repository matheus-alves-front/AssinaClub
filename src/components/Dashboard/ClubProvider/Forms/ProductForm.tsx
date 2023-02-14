import { useContext } from "react"
import { Button, Col, Form, Row } from "react-bootstrap"
import { ClubDashboardUpdateContext} from "../../../../contexts/ClubDashboard/ClubDashboardContext"
import { ProductRegisterContext } from "../../../../contexts/ClubDashboard/ProductRegisterContext/ProductRegisterContext"
import { ClubDashboardGlobalContext } from "../../../../contexts/ClubDashboard/ClubDashboardGlobalContext"
import { RegisterProduct } from "../Registers/Products/utils/RegisterProduct"

export function ProductForm() {

    const {
        clubProviderInfo,
    } = useContext(ClubDashboardGlobalContext)

    const {
        setUpdateProducts
    } = useContext(ClubDashboardUpdateContext)

    const {
        showAddPlanModal,
        setShowAddPlanModal,
    } = useContext(ProductRegisterContext)

    return (
        <Form
            onSubmit={(e) => {
                RegisterProduct(e, clubProviderInfo?.id, setUpdateProducts)
                setShowAddPlanModal(true)
            }}
        >
            <Row>
                <Col md={12}>
                    <Form.Group className="mb-2">
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
            <Row
                className={`mt-3 d-flex ${showAddPlanModal ? "justify-content-end" : "justify-content-between"}`}
            >
                <Col md="auto">
                    <Button
                        variant="outline-dark"
                        className={showAddPlanModal ? "visually-hidden p-2" : "p-2"}
                        onClick={() => {
                            setShowAddPlanModal(true)
                        }}
                    >
                        Adicionar Produto ao Plano
                    </Button>
                </Col>
                <Col md="auto">
                    <Button
                        variant="dark"
                        type="submit"
                        className="p-2"
                    >
                        Registrar Produto
                    </Button>
                </Col>
            </Row>
        </Form>
    )
}