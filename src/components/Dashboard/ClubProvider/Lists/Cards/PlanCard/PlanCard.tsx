import { Plan } from "../../../../../../@types/PlansTypes"
import styles from "../../styles.module.scss"

type PlanCardType = {
    plan: Plan
}

export default function PlanCard({
    plan
}: PlanCardType) {

    return (
        <div className={styles.card}>
            <img src='#' alt='' />
            <p>{plan.title}</p>
            <p>Descrição: {plan.description}</p>
            <p>nº de Assinantes: {plan.subscriberIds.length}</p>
            <p>{"R$ " + plan.price.toFixed(2)}</p>
            <p>Frequência: {plan.deliveryFrequency}</p>
        </div>
    )
}