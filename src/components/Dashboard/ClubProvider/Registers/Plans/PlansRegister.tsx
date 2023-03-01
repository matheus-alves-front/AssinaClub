import { useContext, useState } from "react"
import { ClubDashboardUpdateContext } from "../../../../../contexts/ClubDashboard/ClubDashboardContext"
import { ClubDashboardGlobalContext } from "../../../../../contexts/ClubDashboard/ClubDashboardGlobalContext"
import { registerPlan } from "./utils/registerPlan"
import styles from "./styles.module.scss"

export function PlansRegister() {

    const {
        clubProviderInfo
    } = useContext(ClubDashboardGlobalContext)

    const {
        setUpdatePlans
    } = useContext(ClubDashboardUpdateContext)

    const [inputName, setInputName] = useState("")
    const [inputDescription, setInputDescription] = useState("")
    const [inputPrice, setInputPrice] = useState("")
    const [inputFrequency, setInputFrequency] = useState("")

    return (
        <div className={styles.registerWrapper}>
            <form
                className={styles.formWrapper}
                onSubmit={(event) => {
                    registerPlan(
                        event,
                        clubProviderInfo?.id,
                        setUpdatePlans,
                        { inputName, inputDescription, inputPrice, inputFrequency }
                    )
                }}
            >
                <p>Nome do Plano</p>
                <input
                    className={styles.planInput}
                    value={inputName}
                    type="text"
                    onChange={(e) => setInputName(e.currentTarget.value)}
                />
                <p>Descrição</p>
                <input
                    className={styles.planInput}
                    value={inputDescription}
                    type="text"
                    onChange={(e) => setInputDescription(e.currentTarget.value)}
                />
                <p>Preço</p>
                <input
                    className={styles.planInput}
                    value={inputPrice}
                    type="number"
                    onChange={(e) => setInputPrice(e.currentTarget.value)}
                />
                <p>Frequencia</p>
                <input
                    className={styles.planInput}
                    value={inputFrequency}
                    type="number"
                    onChange={(e) => setInputFrequency(e.currentTarget.value)}
                />
                <p className={styles.smallObs}>
                    De x em x meses
                </p>
                <div
                    className={styles.buttonsWrapper}
                >
                    <button
                        type="submit"
                        className={styles.darkButton}
                    >
                        Registrar Plano
                    </button>
                </div>
            </form>
        </div>
    )
}