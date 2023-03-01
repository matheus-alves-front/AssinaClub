import { SetStateAction } from "react"
import { Plan } from "../../@types/PlansTypes"
import { Product } from "../../@types/ProductTypes"

export default function handleSliderMove(
    direction: string,
    infoList: Plan[] | Product[],
    cardRefWidth: number,
    cardsWrapperRefWidth: number,
    cardsWrapperPosition: number,
    movesIterations: number,
    setMovesIterations: (value: SetStateAction<number>) => void,
    setMaxIterations: (value: SetStateAction<number>) => void,
    setCardsWrapperPosition: (value: SetStateAction<number>) => void,
) {

    const cardsGap = 40
    const step = Math.floor(cardsWrapperRefWidth / cardRefWidth) * (cardRefWidth + cardsGap)

    const maxIterationsUpdated = Math.ceil((((infoList.length * (cardRefWidth + cardsGap)) - cardsWrapperRefWidth - cardsGap) / step))

    setMaxIterations(maxIterationsUpdated)

    if (direction === 'left') {
        if (movesIterations > 0) {
            setMovesIterations(movesIterations - 1)
            setCardsWrapperPosition(cardsWrapperPosition + step)
        }
    }
    else {
        if (movesIterations < maxIterationsUpdated) {
            setMovesIterations(movesIterations + 1)
            setCardsWrapperPosition(cardsWrapperPosition - step)
        }
    }
}