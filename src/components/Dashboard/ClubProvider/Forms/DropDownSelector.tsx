import { SetStateAction } from "react"
import { Dropdown, DropdownButton } from "react-bootstrap"
import { Plan } from "../../../../@types/PlansTypes"
import { Product } from "../../../../@types/ProductTypes"

type DropDownSelectorProps = {
    selectedInfoInAddPlan: Product | Plan | null
    infoType: string
    selectedInfo: any[] //! Corrigir
    setSelectedInfoInAddPlan: any //! Corrigir
}

export function DropDownSelector({
    selectedInfoInAddPlan,
    infoType,
    selectedInfo,
    setSelectedInfoInAddPlan
}: DropDownSelectorProps) {

    const plan = selectedInfoInAddPlan as Plan
    const product = selectedInfoInAddPlan as Product

    return (
        <>
            <DropdownButton
                variant="outline-dark"
                title={
                    selectedInfoInAddPlan ?
                        (infoType === 'plan' ?
                            `${plan.title}` :
                            `${product.name}`)
                        :
                        "Selecionar"
                }
                className="my-2"
                style={{ width: '250px' }}
            >
                {
                    selectedInfo ? (
                        selectedInfo.map((item, index) => {

                            return (
                                <Dropdown.Item
                                    key={index}
                                    eventKey={index}
                                    onClick={() => {
                                        if (infoType === 'plan') {
                                            return setSelectedInfoInAddPlan(item)
                                        }
                                        setSelectedInfoInAddPlan(item)
                                    }}
                                >
                                    {(infoType === 'plan' ? item.title : item.name)}
                                </Dropdown.Item>
                            )
                        })
                    ) : ''
                }
            </DropdownButton>
        </>
    )
}