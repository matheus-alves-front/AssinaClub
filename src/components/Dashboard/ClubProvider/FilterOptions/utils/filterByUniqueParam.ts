import { SetStateAction } from "react"
import { Plan } from "../../../../../@types/PlansTypes"
import { Product } from "../../../../../@types/ProductTypes"
import { Subscriber } from "../../../../../@types/SubscriberTypes"

export default function filterByUniqueParam(
    whatToFilter: string | null,
    optionSelected: string | null,
    originalSubscribersInfo: Subscriber[],
    originalPlansInfo: Plan[],
    originalProductsInfo: Product[],
    setSubscribersInfo: (value: SetStateAction<Subscriber[]>) => void,
    setPlansInfo: (value: SetStateAction<Plan[]>) => void,
    setProductsInfo: (value: SetStateAction<Product[]>) => void,
    inputValue: string    
) {
    switch (whatToFilter) {
        case "Assinantes":
            const filteredSubscribers = originalSubscribersInfo.filter(option => {
                if (!inputValue) return true
                if (optionSelected === "Nome") return option.name.includes(inputValue)
                if (optionSelected === "Email") return option.email.includes(inputValue)
                if (optionSelected === "CPF") return option.cpf.includes(inputValue)
            })
            setSubscribersInfo(filteredSubscribers)
            break;

        case "Planos":
            const filteredPlans = originalPlansInfo.filter(option => {
                if (!inputValue) return true
                if (optionSelected === 'nº de Assinantes') return option.subscriberIds.length === Number(inputValue)
                if (optionSelected === "Preço") return option.price === Number(inputValue)
                if (optionSelected === "Frequência") return option.deliveryFrequency === Number(inputValue)
            })
            setPlansInfo(filteredPlans)
            break;

        case "Produtos":
            const filteredProducts = originalProductsInfo.filter(option => {
                if (!inputValue) return true
                if (optionSelected === 'Nome') return option.name.includes(inputValue)
                if (optionSelected === "Valor") return option.value === Number(inputValue)
                if (optionSelected === "SKU") return option.sku.includes(inputValue)
            })
            setProductsInfo(filteredProducts)
            break;

        default:
            break;
    }
}
