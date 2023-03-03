import { FormEvent } from "react";
import router from "next/router";
import axios from "axios";

import { DashboardType } from "../../../../pages/subscriber/dashboard";
import { CardBox } from "../../../UI-Components/CardBox";

import styles from '../MyInformationsCard/myInformationsCard.module.scss'

export function ChangeAccount({subscriberData}: DashboardType) {
  const firstName = subscriberData?.name.split(" ")[0]
  const lastName = subscriberData?.name.split(' ').slice(1).join(' ')

  async function changeSubscriberInformationSubmit(event: FormEvent<HTMLFormElement>) {
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
      // "password": passwordSubscriber.value
    }
    
    try {
      await axios.put(`/api/subscribers/${subscriberData?.id}`, data)
      
      router.reload()
    }
    catch(err: any) {
      alert(err.response.data.message)
      console.log(err.response.data.message)
    }
  }


  return (
    <CardBox title="Suas informações:">
      <form 
        name="editFormSubscriber" 
        className={styles.form}
        onSubmit={(e) => changeSubscriberInformationSubmit(e)}
      >
        <fieldset>
          <div className={styles.cardCol}>
            <label>Nome</label>
            <input 
              name="firstNameSubscriber" 
              type="text" 
              placeholder="Nome"
              maxLength={14}
              minLength={2} 
              defaultValue={firstName}
            />
          </div>
          <div className={styles.cardCol}>
            <label>Sobrenome</label>
            <input 
              name="lastNameSubscriber" 
              type="text" 
              placeholder="Sobrenome" 
              maxLength={14}
              minLength={2} 
              defaultValue={lastName}
            />
          </div>
          <div className={styles.cardCol}>
            <label>CPF</label>
            <input 
              name="cpfSubscriber" 
              type="text" 
              placeholder="CPF"
              maxLength={11}
              minLength={11}  
              defaultValue={subscriberData?.cpf}
              disabled
            />
          </div>
          <div className={styles.cardCol}>
            <label>Data Nascimento</label>
            <input 
              defaultValue={subscriberData?.birthDate} 
              name="birthDateSubscriber" 
              type="date" 
              placeholder="Data de Nascimento" 
            />
          </div>
          <div className={styles.cardCol}>
            <label>Email</label>
            <input 
              defaultValue={subscriberData?.email} 
              name="emailSubscriber" 
              type="email" 
              placeholder="Email" 
            />
          </div>
          <div className={styles.cardCol}>
            <label>Senha</label>
            <input 
              defaultValue={subscriberData?.password} 
              name="passwordSubscriber" 
              type="password" 
              placeholder="Senha" 
              disabled
            />
          </div>
        </fieldset>
        <button 
          type="submit" 
          className={styles.submitChangeAccount}
        >
          Salvar
        </button>
      </form>
  </CardBox>
  )
}