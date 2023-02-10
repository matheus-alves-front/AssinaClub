import { Dropdown, DropdownButton } from "react-bootstrap"

type DropDownSelectorProps = {
    selectedInfoInAddPlan: any
    infoType: string
    selectedInfo: any
    setSelectedInfoInAddPlan: any
}

export function DropDownSelector({
    selectedInfoInAddPlan,
    infoType,
    selectedInfo,
    setSelectedInfoInAddPlan
}: DropDownSelectorProps) { //! Corrigir tipagem

    return (
        <>
            <DropdownButton
                // autoClose={false}
                variant="outline-dark"
                title={
                    selectedInfoInAddPlan ?
                        (infoType === 'plan' ?
                            `${selectedInfoInAddPlan.title}` :
                            `${selectedInfoInAddPlan.name}`)
                        :
                        "Selecionar"
                }
                className="my-2"
                style={{ width: '250px' }}
            >
                {selectedInfo.map((item, index) => (
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
                        {infoType === 'plan' ? item.title : item.name}
                    </Dropdown.Item>
                ))}
            </DropdownButton>
        </>
    )
}