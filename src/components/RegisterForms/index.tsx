import { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react';
import {
  Row,
  Col, 
  Button,
  Form,
  FloatingLabel
} from 'react-bootstrap';
import axios from 'axios'
import { RegisterStepsContext } from '../../contexts/RegisterStepsContext';

export function RegisterFormSubscriber() {
  const [isChecked, setIsChecked] = useState(false)

  function RegisterSubscriberSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const form = event.target as HTMLFormElement;

    const {
      firstNameSubscriber,
      lastNameSubscriber,
      cpfSubscriber,
      birthDateSubscriber,
      emailSubscriber,
      passwordSubscriber,
    } = form

    const data = {
      "name": `${firstNameSubscriber.value} ${lastNameSubscriber.value} `,
      "cpf": cpfSubscriber.value,
      "birthDate": birthDateSubscriber.value,
      "email": emailSubscriber.value,
      "password": passwordSubscriber.value
    }

    axios.post('/api/subscribers', data).then(response => console.log("response", response))
  }

  return (
    <Form 
      name="regiterFormSubscriber" 
      onSubmit={(e) => RegisterSubscriberSubmit(e)}
    >
      <Row>
        <Col>
          <Form.Group className="mb-3">
            <Form.Label>Nome</Form.Label>
            <Form.Control name="firstNameSubscriber" type="text" placeholder="Nome" />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3">
            <Form.Label>Sobrenome</Form.Label>
            <Form.Control name="lastNameSubscriber" type="text" placeholder="Sobrenome" />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Group className="mb-3">
            <Form.Label>CPF</Form.Label>
            <Form.Control name="cpfSubscriber" type="text" placeholder="CPF" />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3">
            <Form.Label>Data Nascimento</Form.Label>
            <Form.Control name="birthDateSubscriber" type="date" placeholder="Data de Nascimento" />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control name="emailSubscriber" type="email" placeholder="Email" />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3">
            <Form.Label>Senha</Form.Label>
            <Form.Control name="passwordSubscriber" type="password" placeholder="Senha" />
          </Form.Group>
        </Col>
      </Row>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check
          onChange={() => setIsChecked(!isChecked)}
          type="checkbox" label="Aceito os termos e compromissos" />
      </Form.Group>
      <Button variant="primary" type="submit" disabled={isChecked ? false : true}>
        Registrar
      </Button>
    </Form>
  )
}

export function RegisterFormClubProvider() {
  const [typeOfPerson, setTypeOfPersons] = useState("CNPJ")
  
  const { 
    registerStepsContext,
    setRegisterStepsContext
  }: any = useContext(RegisterStepsContext)

  function whichTypeOfPerson(e: ChangeEvent<HTMLInputElement>) {
    const typeOfPersons = {
      cpf: "CPF",
      cnpj: "CNPJ"
    }

    if (e.target.checked) {
      setTypeOfPersons(typeOfPersons.cnpj)

      return
    }

    setTypeOfPersons(typeOfPersons.cpf)
  }

  async function RegisterClubProviderSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const form = event.target as HTMLFormElement;

    const {
      clubProviderName,
      clubProviderHostName,
      clubProviderCpf,
      clubProviderCnpj,
      clubProviderEmail,
      clubProviderPassword,
      clubProviderDescription
    } = form

    const data = {
      "clubName": clubProviderName.value,
      "hostName": clubProviderHostName.value,
      "cpf": typeOfPerson === "CPF" ? clubProviderCpf.value : '',
      "cnpj": typeOfPerson === "CNPJ" ? clubProviderCnpj.value : '',
      "email": clubProviderEmail.value,
      "password": clubProviderPassword.value,
      "description": clubProviderDescription.value
    }

    const postClubProvider = await axios.post('/api/club_providers', data)

    const clubProviderData = postClubProvider.data.data

    setRegisterStepsContext({
      ...registerStepsContext,
      steps: 2,
      data: clubProviderData
    })
  }

  return (
    <Form 
        name="formClubProvider" 
        onSubmit={(e) => RegisterClubProviderSubmit(e)}
        className="py-5 px-3"
      >
        <Row className='mb-1'>
          <Col>
            <Form.Group>
              <Form.Label>Nome do Clube</Form.Label>
              <Form.Control name="clubProviderName" type="text" placeholder="Ex: Clube Ciclistas" />
            </Form.Group>
          </Col>

          <Col>
            <Form.Group>
              <Form.Label>Nome do Host</Form.Label>
              <Form.Control name="clubProviderHostName" type="text" placeholder="Digite seu nome..." />
              <Form.Text className="text-muted">
                Nome do proprietário do Clube
              </Form.Text>
            </Form.Group>
          </Col>
        </Row>

        <Form.Group>
          <FloatingLabel
            controlId="floatingTextarea"
            label="Descrição ClubProvider"
            className="mb-3"
          >
            <Form.Control 
              name="clubProviderDescription"
              style={{ height: '100px' }} 
              as="textarea" 
              placeholder="Leave a comment here" 
            />
          </FloatingLabel>
        </Form.Group>

        <Row>
          <Col md={2}>
            <Form.Group>
              <Form.Check 
                type="switch"
                id="custom-switch"
                onChange={(e) => whichTypeOfPerson(e)}
                label={typeOfPerson}
                className="my-1"
              />
            </Form.Group>
          </Col>

          <Col md={10}>
            {typeOfPerson === "CPF" 
            ?
              <Form.Group className="mb-3">
                <Form.Control name="clubProviderCpf" type="text" placeholder="CPF" />
              </Form.Group>
            :
              <Form.Group className="mb-3">
                <Form.Control name="clubProviderCnpj" type="text" placeholder="CNPJ" />
              </Form.Group>
            }
          </Col>
        </Row>


        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control name="clubProviderEmail" type="email" placeholder="Email" />
              <Form.Text className="text-muted">
                Lembre que Email e senha são suas credenciais de Login
              </Form.Text>
            </Form.Group>
          </Col>

          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Senha</Form.Label>
              <Form.Control name="clubProviderPassword" type="password" placeholder="Senha" />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Concordo com os Tesmos de Serviço" />
        </Form.Group>

        <Button className='w-100 py-2 mt-3' variant="primary" type="submit">
          Registrar
        </Button>
      </Form>
  )
}
