import axios from "axios";
import { FormEvent, useContext, useState } from "react";
import { Button, Card, Col, Form, Modal, Row, Toast } from "react-bootstrap";

import { Product } from "../../../@types/ProductTypes";
import { RegisterStepsContext } from "../../../contexts/RegisterStepsContext";

import { BsFillTrashFill } from "react-icons/bs";

import styles from '../registerForm.module.scss'


export function RegisterFormProducts() {
  const [isProductRegistered, setIsProductRegistered] = useState(false)
  const [productRegistered, setProductRegistered] = useState<Product>()
  const [isEditModal, setIsEditModal] = useState(false)

  function handleModal() {
    setIsEditModal(!isEditModal)
  }

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

    if (!productName.value || !productDescription.value || !productSku.value || !productValue.value) {
      alert('Campo Faltando')

      return
    }

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

  async function DeleteProduct(productId: string | string[], index: number) {
    try {
      await axios.delete(`/api/club_providers/id/${clubProviderId}/products/${productId}`)
    }
    catch(err) {
      console.log(err)
    }

    const productsUpdated = [...registerStepsContext.products]
    productsUpdated.splice(index, 1)

    setRegisterStepsContext({
      ...registerStepsContext,
      products: productsUpdated
    })
  }

  return (
    <>
      <form className={styles.formClubProvider} onSubmit={(e) => RegisterProducts(e, clubProviderId)}>
        <input 
          type="text" 
          name="productName" 
          placeholder="Nome do Produto"
        />
        <fieldset>
          <label>
            SKU: identificador único do produto
          </label>
          <input type="text" name="productSku" placeholder="nome-do-produto ou 1,2,3,4..." />
        </fieldset>
        <textarea name="productDescription" placeholder="Descrição" rows={3} />
        <label>Valor: O valor é uma média para controle de gastos em seu dashboard</label>
        <input 
          type="number" 
          min="0.00" 
          max="10000.00" 
          name="productValue" 
          placeholder="R$" 
        />
        <button type="submit" className="w-100 p-2 mt-4">Registrar Produto</button>
      </form>
      <section className={styles.nextStepSection}>
        <button  
          className="w-100 p-2 mt-4"
          onClick={() => handleModal()}
        >Editar Produtos Cadastrados</button>
        <button 
          className={styles.nextStepButton}
          onClick={() => goToNextStepRegister()}
          disabled={registerStepsContext.products.length < 3 ? true : false}
        >
          Criar Planos
        </button>
      </section>
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
      <Modal show={isEditModal} onHide={handleModal}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Produtos: </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {registerStepsContext.products.length == 0 && 'Você não tem produtos'}
          {registerStepsContext.products.map((product: Product, index: number) => (
            <Card className="my-1 p-2 position-relative" key={index}>
              <Card.Title>{product.name}</Card.Title>
              <Card.Subtitle>
                {product.description}
              </Card.Subtitle>
              <span>Valor: R${product.value}</span>
              <Button
                onClick={() => DeleteProduct(product.id, index)}
                variant="danger position-absolute top-50 end-0 me-2 translate-middle-y"
              >
                <BsFillTrashFill />
              </Button>
            </Card>
          ))}
        </Modal.Body>
      </Modal>
    </>
  )
}