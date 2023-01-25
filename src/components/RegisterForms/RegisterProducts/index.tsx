import axios from "axios";
import { FormEvent, useContext, useState } from "react";
import { Button, Col, Form, Row, Toast } from "react-bootstrap";
import { Product } from "../../../@types/ProductTypes";
import { RegisterStepsContext } from "../../../contexts/RegisterStepsContext";

export function RegisterFormProducts() {
  const [isProductRegistered, setIsProductRegistered] = useState(false)
  const [productRegistered, setProductRegistered] = useState<Product>()

  const { 
    registerStepsContext,
    setRegisterStepsContext
  }: any = useContext(RegisterStepsContext)

  const clubProviderId = registerStepsContext?.data.id 

  function alertProductRegistered() {
    setIsProductRegistered(true)

    setTimeout(() => {
      setIsProductRegistered(false)
    }, 5000)
  }

  function goToNextStepRegister() {
    setRegisterStepsContext({
      ...registerStepsContext,
      steps: 3
    })
  }

  async function RegisterProducts(event: FormEvent<HTMLFormElement>, clubProviderId: string | string[] | undefined) {
    event.preventDefault()

    const form = event.target as HTMLFormElement;

    const {
      productName,
      productDescription,
      productSku,
      productValue
    } = form

    const data = {
      "name": productName.value,
      "description": productDescription.value,
      "sku": productSku.value,
      "value": Number(productValue.value)
    }

    const postProduct = await axios.post(`/api/club_providers/id/${clubProviderId}/products`, data)

    form.reset()
    
    const products = postProduct.data.data

    setProductRegistered(products)
    alertProductRegistered()

    setRegisterStepsContext({
      ...registerStepsContext,
      products: [...registerStepsContext.products, products]
    })
  }

  return (
    <>
      <Form className="p-3" onSubmit={(e) => RegisterProducts(e, clubProviderId)}>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Nome do Produto</Form.Label>
              <Form.Control type="text" name="productName" />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Descrição</Form.Label>
              <Form.Control type="text" name="productDescription" />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Sku:</Form.Label>
              <Form.Control type="text" name="productSku" />
              <Form.Text className="text-muted">
                sku é o identificador único do produto
              </Form.Text>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Valor:</Form.Label>
              <Form.Control type="number" min="0.00" max="10000.00" name="productValue" />
              <Form.Text className="text-muted">
                O valor é uma média para controle de gastos em seu dashboard
              </Form.Text>
            </Form.Group>
          </Col>
        </Row>
        <Button type="submit" className="w-100 py-2 mt-4">Registrar Produto</Button>
        <Button 
          variant="success" 
          className="w-100 my-3"
          onClick={() => goToNextStepRegister()}
        >
          Criar Planos
        </Button>
      </Form>
      <Toast className="fixed-bottom m-2" show={isProductRegistered} >
        <Toast.Header>
          <strong className="me-auto">Produto Adicionado</strong>
          <small>sku: {productRegistered?.sku}</small>
        </Toast.Header>
        <Toast.Body>
          <p>nome: {productRegistered?.name}</p>
          <p>valor: {productRegistered?.value}</p>
          <p>descrição: {productRegistered?.description}</p>
        </Toast.Body>
      </Toast>
    </>
  )
}