export function sortListByOption( //! Corrigir tipagem
    option: string,
    plansInfo: any,
    setPlansInfo: any,
    productsInfo: any,
    setProductsInfo: any,
    subscribersInfo: any,
    setSubscribersInfo: any,
) {
    const plansCopy = [...plansInfo] as any[]
    const productsCopy = [...productsInfo] as any[]
    const subscribersCopy = [...subscribersInfo] as any[]

    //! Corrigir tipagem
    function sortByParam(param: any, copy: any[], setCopy: any) {
        if (param === "subscriberIds") {
            copy.sort((a, b) => {
                if (a[param].length > b[param].length) return 1
                if (a[param].length < b[param].length) return -1
                return 0
            })
            return setCopy(copy)
        }
        copy.sort((a, b) => {
            if (a[param] > b[param]) return 1
            if (a[param] < b[param]) return -1
            return 0
        })
        setCopy(copy)
    }

    switch (option) {

        //! Plans Filter Options
        case 'Título':
            sortByParam("title", plansCopy, setPlansInfo)
            break;
        case 'Preço':
            sortByParam("price", plansCopy, setPlansInfo)
            break;
        case 'Frequência':
            sortByParam("deliveryFrequency", plansCopy, setPlansInfo)
            break;
        case 'nº de Assinantes':
            sortByParam("subscriberIds", plansCopy, setPlansInfo)
            break;

        //! Products Filter Options
        case 'Valor':
            sortByParam("value", productsCopy, setProductsInfo)
            break;
        case 'Nome':
            sortByParam("name", productsCopy, setProductsInfo)
            break;
        case 'SKU':
            sortByParam("sku", productsCopy, setProductsInfo)
            break;

        //! Subscribers Filter Options
        case 'Email':
            sortByParam("email", subscribersCopy, setSubscribersInfo)
            break;
        case 'CPF':
            sortByParam("cpf", subscribersCopy, setSubscribersInfo)
            break;

        default:
            break;
    }
}