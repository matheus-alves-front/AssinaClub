import { useContext } from 'react'
import { Product } from '../../../../../../@types/ProductTypes'
import { InfoContext } from '../../../../../../contexts/ClubDashboard/ClubDashboardContext'
import styles from '../styles.module.scss'

type ProductCardType = {
    product: Product | null
}

export default function ProductCard({
    product,
}: ProductCardType) {

    const {
        plansInfo
    } = useContext(InfoContext)

    if(!product) return <></>

    return (
        <div className={styles.prodCard}>
            <img src='' alt='' />
            <p>{product.name}</p>
            <p>{product.description}</p>
            <p>{"R$ " + product.value.toFixed(2)}</p>
            <p>{product.sku}</p>
            <p>
                Planos: {plansInfo.filter(option => (
                    product.plansId.includes(String(option.id))
                )).map(plan => plan.title).join(", ")}
            </p>
            <p>

                Opções adicionais:
                {/* {product?.additionalOptions?.map(option => option.title).join(", ")} */}
            </p>
        </div>
    )
}