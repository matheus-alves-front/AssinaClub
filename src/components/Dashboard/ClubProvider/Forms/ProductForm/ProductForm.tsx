import { useContext, useState } from "react"
import { ClubDashboardUpdateContext } from "../../../../../contexts/ClubDashboard/ClubDashboardContext"
import { ProductRegisterContext } from "../../../../../contexts/ClubDashboard/ProductRegisterContext/ProductRegisterContext"
import { ClubDashboardGlobalContext } from "../../../../../contexts/ClubDashboard/ClubDashboardGlobalContext"
import { RegisterProduct } from "../../Registers/Products/utils/RegisterProduct"
import styles from "./styles.module.scss"

export function ProductForm() {

    const {
        clubProviderInfo,
    } = useContext(ClubDashboardGlobalContext)

    const {
        setUpdateProducts
    } = useContext(ClubDashboardUpdateContext)

    const {
        setShowAddPlanModal,
    } = useContext(ProductRegisterContext)

    const [inputName, setInputName] = useState("")
    const [inputDescription, setInputDescription] = useState("")
    const [inputSKU, setInputSKU] = useState("")
    const [inputValue, setInputValue] = useState("")

    return (
        <form
            className={styles.formWrapper}
            onSubmit={(e) => {
                RegisterProduct(e, clubProviderInfo?.id, setUpdateProducts)
                setShowAddPlanModal(true)
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
    )
}