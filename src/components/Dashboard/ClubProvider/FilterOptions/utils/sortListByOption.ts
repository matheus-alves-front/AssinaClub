import { MouseEvent, SetStateAction } from "react"
import { Plan } from "../../../../../@types/PlansTypes"
import { Product } from "../../../../../@types/ProductTypes"
import { Subscriber } from "../../../../../@types/SubscriberTypes"

export function sortListByOption(
    event: MouseEvent,
    option: string,
    plansInfo: Plan[],
    setPlansInfo: (value: SetStateAction<Plan[]>) => void,
    productsInfo: Product[],
    setProductsInfo: (value: SetStateAction<Product[]>) => void,
    subscribersInfo: Subscriber[],
    setSubscribersInfo: (value: SetStateAction<Subscriber[]>) => void,
    listOrder: string,
) {

    event.stopPropagation()

    const plansCopy = [...plansInfo] as Plan[]
    const productsCopy = [...productsInfo] as Product[]
    const subscribersCopy = [...subscribersInfo] as Subscriber[]

    type Copy = Plan | Product | Subscriber

    function sortByParam(
        param: keyof Copy,
        copy: Copy[],
        setCopy: any
    ) {

        if (param === "subscriberIds" as keyof Copy) {

            copy.sort((a: Copy, b: Copy) => {
                if (a[param].length > b[param].length) return (listOrder === "descendant" ? -1 : 1)
                if (a[param].length < b[param].length) return (listOrder === "descendant" ? 1 : -1)
                return 0
            })

            return setCopy(copy)
        }
        
        copy.sort((a: Copy, b: Copy) => {
            if (a[param] > b[param]) return (listOrder === "descendant" ? -1 : 1)
            if (a[param] < b[param]) return (listOrder === "descendant" ? 1 : -1)
            return 0
        })

        setCopy(copy)
    }

    switch (option) {

        //* Plans Filter Options
        case 'Título':
            sortByParam("title" as keyof Copy, plansCopy, setPlansInfo)
            break;
        case 'Preço':
            sortByParam("price" as keyof Copy, plansCopy, setPlansInfo)
            break;
        case 'Frequência':
            sortByParam("deliveryFrequency" as keyof Copy, plansCopy, setPlansInfo)
            break;
        case 'nº de Assinantes':
            sortByParam("subscriberIds" as keyof Copy, plansCopy, setPlansInfo)
            break;

        //* Products Filter Options
        case 'Valor':
            sortByParam("value" as keyof Copy, productsCopy, setProductsInfo)
            break;
        case 'Nome':
            sortByParam("name" as keyof Copy, productsCopy, setProductsInfo)
            break;
        case 'SKU':
            sortByParam("sku" as keyof Copy, productsCopy, setProductsInfo)
            break;

        //* Subscribers Filter Options
        case 'Assinantes':
            sortByParam("name" as keyof Copy, subscribersCopy, setSubscribersInfo)
            break;
        case 'Email':
            sortByParam("email" as keyof Copy, subscribersCopy, setSubscribersInfo)
            break;
        case 'CPF':
            sortByParam("cpf" as keyof Copy, subscribersCopy, setSubscribersInfo)
            break;

        default:
            break;
    }
}