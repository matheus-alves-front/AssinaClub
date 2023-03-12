
import { useState } from 'react';
import { Accordion, Button, Modal } from 'react-bootstrap';
import { Product } from '../../../../../@types/ProductTypes';

import styles from './productsTableAssinature.module.scss'

type ProductsTableMySignatures = {
  productsInfo: Product[]
  clubName: string
}
export function ProductsTableAssignature({productsInfo, clubName}: ProductsTableMySignatures) {
  const [isProductDetailsModal, setIsProductDetailsModal] = useState(false)

  const PRODUCTS_PROPERTIES = [
    'Nome',
    'Opções adicionais'
  ]

  return (
    <>
      <section className={styles.productPlansDetails}>
        <span>
          <strong>Produtos à receber:</strong>
          <button 
            className='text-decoration-none text-info'
            onClick={() => setIsProductDetailsModal(true)}
          >
            Ver Detalhes
          </button>
        </span>
          <table>
            <thead>
                <tr>
                    {PRODUCTS_PROPERTIES.map((property, i) => <th key={i}>{property}</th>)}
                </tr>
            </thead>
            <tbody>
                {productsInfo ?
                    (<>
                        {productsInfo.map((product, index) => (
                          <tr key={index}>
                            <td>{product.name}</td>
                            <td>{"Nenhum Adicional"}</td>
                          </tr>
                        ))}
                    </>)
                    :
                    <></>
                  }
            </tbody>
        </table>
      </section>
      <Modal show={isProductDetailsModal} onHide={() => setIsProductDetailsModal(false)}>
        <Modal.Header closeButton>
          <strong>
            Você receberá na próxima entrega de {clubName}:
          </strong>
        </Modal.Header>
        <Modal.Body>
        <Accordion defaultActiveKey="0" flush>
          {productsInfo ?
            (<>
                {productsInfo.map((product, index) => (
                  <Accordion.Item key={index} eventKey={product.name}>
                    <Accordion.Header className='mb-0'>{product.name}</Accordion.Header>
                    <Accordion.Body>
                      <p>{product.description}</p>
                      <p><small>{"Nenhum Adicional"}</small></p>
                    </Accordion.Body>
                  </Accordion.Item>
                ))}
            </>)
            :
            <></>
          }
        </Accordion>
        </Modal.Body>
      </Modal>
    </>
  )
}