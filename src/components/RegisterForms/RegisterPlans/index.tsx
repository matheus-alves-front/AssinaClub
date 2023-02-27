import { FormEvent, useContext, useEffect, useLayoutEffect, useState } from "react"
import Link from "next/link"
import axios from "axios"

import { Product } from "../../../@types/ProductTypes"
import { Plan } from "../../../@types/PlansTypes"
import { RegisterStepsContext } from "../../../contexts/RegisterStepsContext"

import { Button, Card, Col, Form, Modal, Row } from "react-bootstrap"
import { BsFillArrowRightSquareFill, BsFillTrashFill } from "react-icons/bs"
import styles from './registerPlans.module.scss'

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
      await axios.put(`/api/club_providers/id/${clubProviderId}/plans/${planId}`, addProductToPlan)
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
    <section className={styles.registerPlansSection}>
      <div className={styles.registerCol}>
        <section className={styles.plansRegisteredContainer} style={{overflowY: 'auto', overflowX: 'hidden', maxHeight: '75vh'}}>
        {!registerStepsContext.plans.length && (
          <h5>Não existem Planos</h5> 
        )}
        {registerStepsContext.plans.map((plan: Plan, index: number) => (
            <div className={styles.plansRegistered} key={index}>
              <header>
                <h5>{plan.title}</h5>
                <h6>Preço: R${plan.price}</h6>
              </header>
              <p className="mb-0">De {plan.deliveryFrequency} em {plan.deliveryFrequency} meses</p>
              <details className="p-1">
                <summary>Descrição</summary>
                <p>
                  {plan.description}
                </p>
              </details>
              <footer className="border-0 bg-transparent p-0 d-flex justify-content-between">
                <button 
                  onClick={() => handleModal(index)} 
                  className={styles.addProductToPlan}
                >
                  Adicionar Produtos Ao Plano
                </button>
                <button
                  className={styles.removeProductToPlan}
                  onClick={() => RemovePlans(clubProviderId, plan.id, index)}
                >
                  <BsFillTrashFill
                    fontSize={20} 
                    cursor={'pointer'}
                    className=""
                    />
                </button>
              </footer>
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
            </div>
        ))}
        </section> 
      </div>
      <div className={styles.registerCol}>
        <form 
          onSubmit={(e) => RegisterPlans(e, clubProviderId)}
          className={styles.formClubProvider}
        >
            <input 
              name="PlanTitle" 
              type="text"
              placeholder="Nome do Plano" 
            />
            <fieldset>
              <label>
                Preço
              </label>
              <input 
                name="PlanPrice" 
                type="number" 
                placeholder="R$00,00"
              />
            </fieldset>
            <fieldset>
              <label>
                Frequencia de x em x meses
              </label>
              <input 
                name="PlanFrequency" 
                type="number" 
                defaultValue={1}
                min={1}
                max={3}
              />
            </fieldset>
            <textarea 
              name="PlanDescription" 
              placeholder="Descreva os Benefícios do seu plano" 
              rows={5}
            />
          <button  
            className="w-100" 
            type="submit"
          >
            Criar Plano
          </button>
        </form>
        <button
          className="w-100 text-white"
          disabled={registerStepsContext?.plans[0] && registerStepsContext?.plans[0].productId.length < 2 ? true : false}
        >
          <Link href={'/login/club_provider'}>
            Ir para Seu ambiente
          </Link>
        </button>
      </div>
    </section>
  )
}