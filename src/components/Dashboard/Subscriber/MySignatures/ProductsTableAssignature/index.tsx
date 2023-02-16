
import { useState } from 'react';
import { Accordion, Button, Modal } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { Product } from '../../../../../@types/ProductTypes';

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
      <section>
          <p>
            <strong>Produtos à receber:</strong>
            <Button 
              className='text-decoration-none text-info' 
              variant='link'
              onClick={() => setIsProductDetailsModal(true)}
            >
              Ver Detalhes
            </Button>
          </p>
          <Table hover responsive>
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
          </Table>
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