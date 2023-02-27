import { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios'

import { RegisterStepsContext } from '../../contexts/RegisterStepsContext';

import { IoAdd } from 'react-icons/io5'
import styles from './registerForm.module.scss'

export function RegisterFormSubscriber() {
  const [isChecked, setIsChecked] = useState(false)

  const router = useRouter()

  async function RegisterSubscriberSubmit(event: FormEvent<HTMLFormElement>) {
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

    if (
      !firstNameSubscriber.value || 
      !lastNameSubscriber.value || 
      !cpfSubscriber.value || 
      !birthDateSubscriber.value || 
      !emailSubscriber.value || 
      !passwordSubscriber.value
    ) {
      alert('Campos Faltando')

      return
    }

    const data = {
      "name": `${firstNameSubscriber.value} ${lastNameSubscriber.value} `,
      "cpf": cpfSubscriber.value,
      "birthDate": birthDateSubscriber.value,
      "email": emailSubscriber.value,
      "password": passwordSubscriber.value
    }
    
    try {
      await axios.post(`/api/subscribers`, data)
      
      router.push('/login/subscriber')
    }
    catch(err: any) {
      console.log(err.response.data.message)
    }
  }

  return (
    <form 
      name="regiterFormSubscriber" 
      onSubmit={(e) => RegisterSubscriberSubmit(e)}
      className={styles.formSubscriber}
    >
      <label className={styles.inputFile}>
        <input type="file" />
        <div className={styles.addPicture}>
          <IoAdd />
          Adicionar Foto
        </div>
      </label>
      <input 
        name="firstNameSubscriber" 
        type="text" 
        placeholder="Nome"
        maxLength={14}
        minLength={2} 
      />
      <input 
        name="lastNameSubscriber" 
        type="text" 
        placeholder="Sobrenome" 
        maxLength={14}
        minLength={2} 
      />
      <input 
        name="cpfSubscriber" 
        type="text" 
        placeholder="CPF"
        maxLength={11}
        minLength={11}  
      />
      <input 
        name="birthDateSubscriber" 
        type="date" 
        placeholder="Data de Nascimento" 
      />
      <input 
        name="emailSubscriber" 
        type="email" 
        placeholder="Email" 
      />
      <input 
        name="passwordSubscriber" 
        type="password" 
        placeholder="Senha" 
      />
      <label>
        <input
          onChange={() => setIsChecked(!isChecked)}
          type="checkbox"  
        />
        Aceito os termos e compromissos
      </label>
          
      <button type="submit" disabled={isChecked ? false : true}>
        Registrar
      </button>
    </form>
  )
}

export function RegisterFormClubProvider() {
  const [typeOfPerson, setTypeOfPersons] = useState("CPF")
  const [isCheckedInput, setIsCheckedInput] = useState(false)
  
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

    if (
      !clubProviderName.value || 
      !clubProviderHostName.value ||
      !clubProviderEmail.value || 
      !clubProviderPassword.value || 
      !clubProviderDescription.value 
      ) {
      alert('Campos Faltando')

      return
    }

    if (typeOfPerson === "CPF" && !clubProviderCpf.value || typeOfPerson === "CNPJ" && !clubProviderCnpj.value) {
      alert('Adicione um CNPJ ou um CPF para cadastrar')

      return
    }

    const data = {
      "clubName": clubProviderName.value,
      "hostName": clubProviderHostName.value,
      "cpf": typeOfPerson === "CPF" ? clubProviderCpf.value : '',
      "cnpj": typeOfPerson === "CNPJ" ? clubProviderCnpj.value : '',
      "email": clubProviderEmail.value,
      "password": clubProviderPassword.value,
      "description": clubProviderDescription.value
    }

    try {
      const postClubProvider = await axios.post(`/api/club_providers`, data)
      const clubProviderData = postClubProvider.data.data
    
      setRegisterStepsContext({
        ...registerStepsContext,
        steps: 2,
        data: clubProviderData
      })
    }
    catch(err: any) {
      alert(err.response.data.message)
    }
  }

  return (
    <>
      <form 
        name="formClubProvider" 
        className={styles.formClubProvider}
        onSubmit={(e) => RegisterClubProviderSubmit(e)}
      >
        <input name="clubProviderName" type="text" placeholder="Nome do seu Clube" /> 
        <input name="clubProviderHostName" type="text" placeholder="Nome do proprietário do Clube" />
        <textarea 
          name="clubProviderDescription"
          style={{ height: '100px' }} 
          placeholder="Descreva seu clube para seus assinantes" 
        ></textarea>
        {/* <input
          type="switch"
          id="custom-switch"
          onChange={(e) => whichTypeOfPerson(e)}
          className="my-1"
        /> */}
        {typeOfPerson === "CPF" 
        ?
          <input name="clubProviderCpf" type="text" placeholder="CPF" maxLength={11} /> 
        :
          <input name="clubProviderCnpj" type="text" placeholder="CNPJ" />
        }     
        <label htmlFor='clubProviderPassword'>
          Lembre que Email e senha são suas credenciais de Login
        </label>      
        <input name="clubProviderEmail" type="email" placeholder="Email" />
        <input name="clubProviderPassword" type="password" placeholder="Senha" />
        <label htmlFor='checkbox'>
          Li e concordo com os termos de serviços
        </label>   
        <input onChange={(e) => setIsCheckedInput(e.target.checked)} type="checkbox" />
        <button className='w-100 py-2 mt-3' type="submit" disabled={!isCheckedInput}>
          Registrar
        </button>
      </form>
    </>
  )
}
