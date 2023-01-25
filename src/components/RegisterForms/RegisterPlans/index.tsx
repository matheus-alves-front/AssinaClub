import { Button, Card, Col, Form, Modal, Row } from "react-bootstrap"
import { FormEvent, useContext, useEffect, useLayoutEffect, useState } from "react"
import axios from "axios"
import { RegisterStepsContext } from "../../../contexts/RegisterStepsContext"
import { Plan } from "../../../@types/PlansTypes"
import { BsFillArrowRightSquareFill, BsFillTrashFill } from "react-icons/bs"
import { Product } from "../../../@types/ProductTypes"
import { getPlans } from "../../../prisma/plans"

export default function RegisterFormPlans() {
  const { 
    registerStepsContext,
    setRegisterStepsContext
  }: any = useContext(RegisterStepsContext)
  const clubProviderId = registerStepsContext?.data.id 

  const [isAddProduct, setIsAddProduct] = useState(false)
  
  function handleModal() {
    setIsAddProduct(!isAddProduct)
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

    const data = {
      "title": PlanTitle.value,
      "description": PlanDescription.value,
      "price": Number(PlanPrice.value),
      "deliveryFrequency": Number(PlanFrequency.value)
    }

    try {
      const postPlans = await axios.post(`/api/club_providers/id/${clubProviderId}/plans`, data)
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

  async function AddProductToPlan(planId: string | string[], productId: string | string[], index: number) {
    const addProductToPlan = {
      "productId": productId
    }

    try {
      await axios.put(`/api/club_providers/id/${clubProviderId}/plans/${planId}`, addProductToPlan)
    }
    catch(err) {
      console.log(err)
    }

    const plansUpdated = [...registerStepsContext.plans]
    plansUpdated[index]?.productId.push(productId)

    setRegisterStepsContext({
      ...registerStepsContext,
      plans: plansUpdated
    })
  }

  async function RemoveProductToPlan(planId: string | string[], productId: string | string[], index: number) {
    const addProductToPlan = {
      "productId": productId,
      "removeProduct": true
    }

    try {
      await axios.put(`/api/club_providers/id/${clubProviderId}/plans/${planId}`, addProductToPlan)
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
    <>
      <Col className="p-3">
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
                  De 2 em 2 meses
                </Form.Text>
              </Form.Group>
            </Col>
          </Row>
          <Button variant="success" className="w-100 mt-2" type="submit">Criar Plano</Button>
        </Form>
      </Col>
      <Col>
        {registerStepsContext.plans.map((plan: Plan, index: number) => (
          <section key={index}>
            <Card className="p-2 m-2">
              <Card.Title>{plan.title}</Card.Title>
              <Card.Subtitle>Preço: R${plan.price}</Card.Subtitle>
              <Button onClick={() => handleModal()} variant="primary">Adicionar Produtos Ao Plano</Button>
            </Card>
            <Modal show={isAddProduct} onHide={handleModal}>
              <Modal.Header closeButton>
                <Modal.Title>Editar Produtos: </Modal.Title>
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
          </section>
        ))}
      </Col>
      
    </>
  )
}