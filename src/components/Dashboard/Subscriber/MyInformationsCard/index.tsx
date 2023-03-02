import { DashboardType } from "../../../../pages/subscriber/dashboard"
import { CardBox } from "../../../UI-Components/CardBox"

import styles from './myInformationsCard.module.scss'

export function MyInformationsCard({subscriberData}: DashboardType) {
  return (
    <CardBox title="Suas informações:">
      <form 
        name="editFormSubscriber" 
        className={styles.form}
      >
        <fieldset disabled>
          <div className={styles.cardCol}>
            <label>Nome</label>
            <input 
              name="firstNameSubscriber" 
              type="text" 
              placeholder="Nome"
              maxLength={14}
              minLength={2} 
              defaultValue={subscriberData?.name}
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
              defaultValue={subscriberData?.name}
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
            />
          </div>
        </fieldset>
      </form>
  </CardBox>
  )
}