import { useEffect, useState } from "react";

import { RegisterStepsContextTypes } from "../../@types/ContextTypes";
import { RegisterStepsContext } from "../../contexts/RegisterStepsContext";

import { RegisterFormClubProvider } from "../../components/RegisterForms";
import { RegisterFormProducts } from "../../components/RegisterForms/RegisterProducts";
import RegisterFormPlans from "../../components/RegisterForms/RegisterPlans";

import { IoCheckmarkDoneSharp } from 'react-icons/io5'
import styles from "../../styles/pages/register.module.scss"

export default function RegisterClubProvider() {
  const [registerStepsContext, setRegisterStepsContext] = useState<RegisterStepsContextTypes>({
    steps: 1,
    data: {},
    products: [],
    plans: []
  })

  function stepBack() {
    if (registerStepsContext.steps > 2) {
      setRegisterStepsContext({
        ...registerStepsContext,
        steps: registerStepsContext.steps - 1 
      })
    }
  }

  return (
    <RegisterStepsContext.Provider value={{registerStepsContext, setRegisterStepsContext}}>
      <section className={styles.containerClubProvider}>
        <div className={styles.registerInformation}>
          <h3>
            Passo <span>{registerStepsContext.steps}</span>
          </h3>
          {registerStepsContext?.steps === 1 && 
            <p>Insira os dados iniciais para criar seu Clube de Assinaturas</p>
          }
          {registerStepsContext?.steps === 2 && 
            <p>Adicione no mínimo 3 Produtos que seu clube irá fornecer em seus planos</p>
          }
          {registerStepsContext?.steps >= 3 && 
            <p>Crie seus planos e em seguida adicione no minimo 2 produtos aos seus planos</p>
          }
          <button
            className={styles.stepBack}
            onClick={() => stepBack()}
          >
            Voltar
          </button>
        </div>
        <div className={styles.containerForm}>
          <div className={styles.stepsContainer}>
            <div className={styles.clubRegisterSteps}>
              <div className={registerStepsContext?.steps > 1 ? styles.registerStepDone : styles.registerStep}>
                <span>{registerStepsContext?.steps > 1 ? <IoCheckmarkDoneSharp /> : 1}  </span>
                <progress value={registerStepsContext?.steps > 1 ? 100 : 0} key={1} />
              </div>
              <div className={registerStepsContext?.steps > 2 ? styles.registerStepDone : styles.registerStep }>
                <span>{registerStepsContext?.steps > 2 ? <IoCheckmarkDoneSharp /> : 2}</span>
                <progress value={registerStepsContext?.steps > 2 ? 100 : 0} key={2} />
              </div>
              <div className={registerStepsContext?.steps > 3 ? styles.registerStepDone : styles.registerStep }>
                <span>{registerStepsContext?.steps > 3 ? <IoCheckmarkDoneSharp /> : 3}</span>
                <progress value={registerStepsContext?.steps > 3 ? 100 : 0} key={3} />
              </div>
              <div className={registerStepsContext?.steps > 3 ? styles.lastStepDone : styles.lastStep }>
                <span><IoCheckmarkDoneSharp /></span>
              </div>
            </div>
          </div>
          {registerStepsContext?.steps === 1 && (
            <RegisterFormClubProvider />
          )}
          {registerStepsContext?.steps === 2 && (
            <RegisterFormProducts />
          )}
          {registerStepsContext?.steps >= 3 && (
            <RegisterFormPlans />
          )}
        </div>
      </section>
    </RegisterStepsContext.Provider>
  )
}