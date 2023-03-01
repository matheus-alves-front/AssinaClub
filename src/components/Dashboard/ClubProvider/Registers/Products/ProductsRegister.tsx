import styles from "./styles.module.scss"
import { useContext, useState } from "react"
import { ClubDashboardUpdateContext } from "../../../../../contexts/ClubDashboard/ClubDashboardContext"
import { ClubDashboardGlobalContext } from "../../../../../contexts/ClubDashboard/ClubDashboardGlobalContext"
import { registerProduct } from "./utils/registerProduct"

export function ProductsRegister() {

    const {
        clubProviderInfo,
    } = useContext(ClubDashboardGlobalContext)

    const {
        setUpdateProducts
    } = useContext(ClubDashboardUpdateContext)

    const [inputName, setInputName] = useState("")
    const [inputDescription, setInputDescription] = useState("")
    const [inputSKU, setInputSKU] = useState("")
    const [inputValue, setInputValue] = useState("")

    return (
        <section className={styles.registerWrapper}>
            <form
                className={styles.formWrapper}
                onSubmit={(event) => {
                    registerProduct(
                        event,
                        clubProviderInfo?.id,
                        setUpdateProducts,
                        { inputName, inputDescription, inputSKU, inputValue }
                    )
                }}
            >
                <p>Nome do Produto:</p>
                <input
                    type="text"
                    className={styles.prodInput}
                    value={inputName}
                    onChange={(e) => setInputName(e.currentTarget.value)}
                />

                <p>Descrição:</p>
                <input
                    type="text"
                    className={styles.prodInput}
                    value={inputDescription}
                    onChange={(e) => setInputDescription(e.currentTarget.value)}
                />

                <p>Sku:</p>
                <input
                    type="text"
                    className={styles.prodInput}
                    value={inputSKU}
                    onChange={(e) => setInputSKU(e.currentTarget.value)}
                />
                <p className={styles.smallObs}>
                    Sku é o identificador único do produto
                </p>

                <p>Valor:</p>
                <input
                    type="number"
                    className={styles.prodInput}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.currentTarget.value)}
                />
                <p className={styles.smallObs}>
                    O valor é uma média para controle de gastos em seu dashboard
                </p>

                <div className={styles.buttonsWrapper}>
                    <button
                        className={styles.darkButton}
                        type="submit"
                    >
                        Registrar Produto
                    </button>
                </div>
            </form>
        </section>
    )
}