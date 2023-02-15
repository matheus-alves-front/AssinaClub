import { Button, Card, Col, Form, Modal, Row } from "react-bootstrap"
import { FormEvent, useContext, useEffect, useLayoutEffect, useState } from "react"
import axios from "axios"
import { RegisterStepsContext } from "../../../contexts/RegisterStepsContext"
import { Plan } from "../../../@types/PlansTypes"
import { BsFillArrowRightSquareFill, BsFillTrashFill } from "react-icons/bs"
import { Product } from "../../../@types/ProductTypes"
import { getPlans } from "../../../prisma/plans"
import Link from "next/link"

export default function RegisterFormPlans() {
  const { 
    registerStepsContext,
    setRegisterStepsContext
  }: any = useContext(RegisterStepsContext)
  const clubProviderId = registerStepsContext?.data.id 

  const [isAddProduct, setIsAddProduct] = useState(false)
  const [modalPlanIndex, setModalPlanIndex] = useState(0)
  
  function handleModal(index: number) {
    setIsAddProduct(!isAddProduct)
    setModalPlanIndex(index)
  }

  async function RegisterPlans(event: FormEvent<HTMLFormElement>, clubProviderId: string | string[] | undefined) {
    event.preventDefault()

    const form = event.target as HTMLFormElement;

    const {
      PlanTitle,
      PlanDescription,
      PlanPrice,
      PlanFrequency
    } = form

    if(!PlanTitle.value || !PlanDescription.value || !PlanPrice.value || !PlanFrequency.value) {
      alert("Campos Faltando")

      return
    }

    const data = {
      "title": PlanTitle.value,
      "description": PlanDescription.value,
      "price": Number(PlanPrice.value),
      "deliveryFrequency": Number(PlanFrequency.value)
    }

    try {
      const postPlans = await axios.post(`${process.env.BASE_URL}/api/club_providers/id/${clubProviderId}/plans`, data)
      const plan = postPlans.data.data
      
      setRegisterStepsContext({
        ...registerStepsContext,
        plans: [...registerStepsContext.plans, plan]
      })
    }
    catch(err) {
      console.log(err)
    }

  }

  async function RemovePlans(clubProviderId: string | string[] | undefined, planId: string | string[] | undefined, index: number) {
    try {
      await axios.delete(`/api/club_providers/id/${clubProviderId}/plans/${planId}`)
      const plansUpdated = [...registerStepsContext.plans]
      plansUpdated.splice(index, 1)
      
      setRegisterStepsContext({
        ...registerStepsContext,
        plans: plansUpdated
      })
    }
    catch(err) {
      console.log(err)
    }
  }

  async function AddProductToPlan(planId: string | string[], productId: string | string[], index: number) {
    const addProductToPlan = {
      "productId": productId
    }

    try {
      await axios.put(`${process.env.BASE_URL}/api/club_providers/id/${clubProviderId}/plans/${planId}`, addProductToPlan)
    }
    catch(err) {
      console.log(err)
    }

    const plansUpdated = [...registerStepsContext.plans]
    plansUpdated[index]?.productId.push(productId)

    setRegisterStepsContext({
      ...registerStepsContext,
      steps: 4,
      plans: plansUpdated
    })
  }

  async function RemoveProductToPlan(planId: string | string[], productId: string | string[], index: number) {
    const addProductToPlan = {
      "productId": productId,
      "removeProduct": true
    }

    try {
      await axios.put(`${process.env.BASE_URL}/api/club_providers/id/${clubProviderId}/plans/${planId}`, addProductToPlan)
    }
    catch(err) {
      console.log(err)
    }

    const plansUpdated = [...registerStepsContext.plans]
    const indexProducts = plansUpdated[index]?.productId.indexOf(productId)
    plansUpdated[index]?.productId.splice(indexProducts, 1)

    setRegisterStepsContext({
      ...registerStepsContext,
      plans: plansUpdated
    })
  }
  
  return(
    <Row>
      <Col className="my-2" xxl={6}>
        <Form onSubmit={(e) => RegisterPlans(e, clubProviderId)}>
          <Form.Group className="mb-2">
            <Form.Label>Nome do Plano</Form.Label>
            <Form.Control name="PlanTitle" type="text" />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Descrição</Form.Label>
            <Form.Control name="PlanDescription" as="textarea" />
          </Form.Group>
          <Row>
            <Col>
              <Form.Group className="mb-2">
                <Form.Label>Preço</Form.Label>
                <Form.Control name="PlanPrice" type="number" />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-2">
                <Form.Label>Frequencia</Form.Label>
                <Form.Control name="PlanFrequency" type="number" />
                <Form.Text className="text-muted">
                  De x em x meses
                </Form.Text>
              </Form.Group>
            </Col>
          </Row>
          <Row className="gap-2">
            <Col md={8} xxl={12}>
              <Button 
                variant="primary" 
                className="w-100" 
                type="submit"
              >
                Criar Plano
              </Button>
            </Col>
            <Col>
                <Button
                  variant="success"
                  className="w-100 text-white"
                  disabled={registerStepsContext?.plans[0] && registerStepsContext?.plans[0].productId.length < 2 ? true : false}
                >
                <Link href={'/login/club_provider'}>
                  Ir para Seu ambiente
                </Link>
                </Button>
            </Col>

          </Row>
        </Form>
      </Col>
      <Col xxl={6}>
        <section className="d-block w-100" style={{overflowY: 'auto', overflowX: 'hidden', maxHeight: '75vh'}}>
        {!registerStepsContext.plans.length && (
          <Card className="p-2 my-2">
            <Card.Text>Não existem Planos</Card.Text>
          </Card>
        )}
        {registerStepsContext.plans.map((plan: Plan, index: number) => (
            <Card className="p-2 my-2" key={index}>
              <Card.Title>{plan.title}</Card.Title>
              <Card.Subtitle>Preço: R${plan.price}</Card.Subtitle>
              <Card.Body className="p-1">
                <Card.Text className="mb-0">De {plan.deliveryFrequency} em {plan.deliveryFrequency} meses</Card.Text>
                <Card.Text>
                  <strong>Descrição</strong>
                  {plan.description}
                </Card.Text>
              </Card.Body>
              <Card.Footer className="border-0 bg-transparent p-0 d-flex justify-content-between">
                <Button 
                  onClick={() => handleModal(index)} 
                  variant="info"
                  className="text-white"
                >
                  Adicionar Produtos Ao Plano
                </Button>
                <Button
                  className="rounded-pill"
                  variant="danger"
                  onClick={() => RemovePlans(clubProviderId, plan.id, index)}
                >
                  <BsFillTrashFill
                    fontSize={20} 
                    cursor={'pointer'}
                    className=""
                    />
                </Button>
              </Card.Footer>
              {modalPlanIndex == index ?
                <Modal show={isAddProduct} onHide={() => handleModal(index)} key={index}>
                  <Modal.Header closeButton>
                    <Modal.Title>Editar Produtos ao Plano {plan.title} </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    {registerStepsContext.products.length == 0 && 'Você não tem produtos'}
                    {registerStepsContext.products.map((product: Product, indexProduct: number) => {
                      return (
                        <Card className="my-1 p-2 position-relative" key={indexProduct}>
                          <Card.Title>{product.name}</Card.Title>
                          <Card.Subtitle>
                            {product.description}
                          </Card.Subtitle>
                          <span>Valor: R${product.value}</span>

                          
                          
                          {!plan.productId.includes(String(product.id)) ? 
                            <BsFillArrowRightSquareFill
                              fontSize={40} 
                              cursor={'pointer'}
                              onClick={() => AddProductToPlan(plan.id, product.id, index)}
                              className="position-absolute top-50 end-0 me-2 translate-middle-y text-success"
                            />
                          :
                            <BsFillTrashFill
                              fontSize={40} 
                              cursor={'pointer'}
                              onClick={() => RemoveProductToPlan(plan.id, product.id, index)}
                              className="position-absolute top-50 end-0 me-2 translate-middle-y text-success"
                              />
                          }
                        </Card>
                      )
                    })}
                  </Modal.Body>
                </Modal>
              : ''}
            </Card>
        ))}
        </section> 
      </Col>
    </Row>
  )
}