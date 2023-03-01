import { SetStateAction } from "react"
import { Plan } from "../../../../@types/PlansTypes"
import { Product } from "../../../../@types/ProductTypes"

export type SliderButtonsType = {
    infoList: Plan[] | Product[],
    cardRefWidth: number,
    cardsWrapperRefWidth: number,
    cardsWrapperPosition: number,
    movesIterations: number,
    maxMovesIterations: number,
    setMovesIterations: (value: SetStateAction<number>) => void,
    setMaxMovesIterations: (value: SetStateAction<number>) => void,
    setCardsWrapperPosition: (value: SetStateAction<number>) => void,
}

export type SliderArgumentsType = [
    Plan[] | Product[],
    number,
    number,
    number,
    number,
    (value: SetStateAction<number>) => void,
    (value: SetStateAction<number>) => void,
    (value: SetStateAction<number>) => void,
]