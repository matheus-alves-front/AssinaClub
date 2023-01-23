import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import { Button, Col, Form, Row, Toast, ToastContainer } from "react-bootstrap";
import { Product } from "../../../@types/ProductTypes";
import { useRouter } from "next/router";
import Link from "next/link";

export function RegisterFormProducts() {
  const [isProductRegistered, setIsProductRegistered] = useState(false)
  const [productRegistered, setProductRegistered] = useState<Product>()

  const router = useRouter()

  const {clubProviderId} = router.query

  console.log(clubProviderId)

  function alertProductRegistered() {
    setIsProductRegistered(true)

    setTimeout(() => {
      setIsProductRegistered(false)
    }, 5000)
  }

  function RegisterProducts(event: FormEvent<HTMLFormElement>, clubProviderId: string | string[] | undefined) {
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

    axios.post(`/api/club_providers/id/${clubProviderId}/products`, data).then(response => {
      alertProductRegistered()
      setProductRegistered(response.data.data)
      form.reset()
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
        <Link href={`/register/${clubProviderId}/plans`}>
          <Button variant="success" className="w-100 my-3">Criar Planos</Button>
        </Link>
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