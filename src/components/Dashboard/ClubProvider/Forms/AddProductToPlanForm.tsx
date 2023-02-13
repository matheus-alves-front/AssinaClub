import { useContext } from "react"
import { Button, CloseButton, Col, Container, Form, Row } from "react-bootstrap"
import { ClubDashboardUpdateContext, InfoContext } from "../../../../contexts/ClubDashboard/ClubDashboardContext"
import { ProductRegisterContext } from "../../../../contexts/ClubDashboard/ProductRegisterContext/ProductRegisterContext"
import { DivisionLine, DivisionLineWithoutMargin } from "../../../Divisions/DivisionLine"
import { addProductToPlan } from "../Registers/Products/utils/addProductToPlan"
import { DropDownSelector } from "./DropDownSelector"

export function AddProductToPlanForm() {

    const {
        setShowAddPlanModal,
        selectedPlanInAddPlan, 
        setSelectedPlanInAddPlan,
        selectedProductInAddPlan, 
        setSelectedProductInAddPlan,
    } = useContext(ProductRegisterContext)

    const {
        clubProviderInfo,
        plansInfo,
        productsInfo
    } = useContext(InfoContext)

    const {
        setUpdateProducts
    } = useContext(ClubDashboardUpdateContext)

    return (
        <>
            <div
                className=" border border-secondary-subtle shadow p-4 bg-white rounded position-relative"
            >
                <CloseButton
                    className="position-absolute top-0 end-0 me-3 mt-3"
                    onClick={() => {
                        setShowAddPlanModal(false)
                        setSelectedPlanInAddPlan(null)
                        setSelectedProductInAddPlan(null)
                    }}
                />
                <Form
                >
                    <Row>
                        <Col md={12}>
                            <Form.Group>
                                <Form.Label>Selecione um Plano</Form.Label>
                                <div className="d-flex">
                                    <DropDownSelector
                                        selectedInfoInAddPlan={selectedPlanInAddPlan}
                                        infoType="plan"
                                        selectedInfo={plansInfo}
                                        setSelectedInfoInAddPlan={setSelectedPlanInAddPlan}
                                    />
                                    {selectedPlanInAddPlan && (
                                        <section className="d-flex flex-column ms-3 p-2 border border-secondary-subtle">
                                            <Container className="d-flex">
                                                <p>
                                                    {selectedPlanInAddPlan?.title}
                                                </p>
                                                <strong className="mx-5">
                                                    {`R$${selectedPlanInAddPlan.price.toFixed(2)}`}
                                                </strong>
                                                <p className="text-center">
                                                    {`${selectedPlanInAddPlan.deliveryFrequency} em ${selectedPlanInAddPlan.deliveryFrequency} meses`}
                                                </p>
                                            </Container>
                                            <DivisionLineWithoutMargin />
                                            <Container>
                                                <p
                                                    className="fw-lighter mt-3"
                                                    style={{ fontSize: "14px" }}
                                                >
                                                    {selectedPlanInAddPlan.description}
                                                </p>
                                            </Container>
                                        </section>
                                    )}
                                </div>
                            </Form.Group>
                        </Col>
                        <Col className="mt-4 mb-2" md={12}>
                            <Form.Group>
                                <Form.Label>Selecione um Produto</Form.Label>
                                <div className="d-flex">
                                    <DropDownSelector
                                        selectedInfoInAddPlan={selectedProductInAddPlan}
                                        infoType="product"
                                        selectedInfo={productsInfo}
                                        setSelectedInfoInAddPlan={setSelectedProductInAddPlan}
                                    />
                                    {selectedProductInAddPlan && (
                                        <section className="d-flex flex-column p-2 border border-secondary-subtle">
                                            <Container className="d-flex">
                                                <p>
                                                    {selectedProductInAddPlan?.name}
                                                </p>
                                                <strong className="mx-5">
                                                    {`R$${selectedProductInAddPlan.value.toFixed(2)}`}
                                                </strong>
                                                <p className="text-center">
                                                    {/* Realizar lógica para pegar título da opção */}
                                                    {"Nenhuma opção"} 
                                                </p>
                                            </Container>
                                            <DivisionLine />
                                            <Container>
                                                <p
                                                    className="fw-lighter"
                                                    style={{ fontSize: "14px" }}
                                                >
                                                    {selectedProductInAddPlan.description}
                                                </p>
                                            </Container>
                                        </section>
                                    )}
                                </div>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="my-1 justify-content-end">
                        <Col md={12}>
                            <Button
                                onClick={(e) => {

                                    if(
                                        !selectedPlanInAddPlan || 
                                        !selectedProductInAddPlan ||
                                        !clubProviderInfo
                                    ) return 

                                    addProductToPlan(
                                        e,
                                        selectedPlanInAddPlan.id,
                                        selectedProductInAddPlan.id,
                                        clubProviderInfo.id,
                                        setUpdateProducts,
                                        setShowAddPlanModal,
                                        setSelectedPlanInAddPlan,
                                        setSelectedProductInAddPlan
                                    )
                                }}
                                variant="dark"
                                type="submit"
                                className="w-100 mt-4 p-2"
                                disabled={!(selectedProductInAddPlan !== null && selectedPlanInAddPlan !== null)}
                            >
                                Registrar Produto ao Plano
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </div>
        </>
    )
}