import { ReactNode, RefObject, useState } from "react"
import SliderButtons from "./SliderButtons"

export type SliderType = {
    sliderClassName: string,
    children: ReactNode,
    wrapperRef: RefObject<HTMLDivElement>,
    infoList: any[],
    cardRefWidth: number,
    cardsWrapperRefWidth: number
}

export default function Slider(props: SliderType) {

    const {
        sliderClassName,
        wrapperRef,
        infoList,
        cardRefWidth,
        cardsWrapperRefWidth
    } = props

    const [cardsWrapperPosition, setCardsWrapperPosition] = useState(0)
    const [movesIterations, setMovesIterations] = useState(0)
    const [maxMovesIterations, setMaxMovesIterations] = useState(0)

    return (
        <>
            <SliderButtons
                infoList={infoList}
                cardRefWidth={cardRefWidth}
                cardsWrapperRefWidth={cardsWrapperRefWidth}
                cardsWrapperPosition={cardsWrapperPosition}
                movesIterations={movesIterations}
                setMovesIterations={setMovesIterations}
                maxMovesIterations={maxMovesIterations}
                setMaxMovesIterations={setMaxMovesIterations}
                setCardsWrapperPosition={setCardsWrapperPosition}
            />
            <div
                className={sliderClassName}
                ref={wrapperRef}
                style={{ transform: `translate(${cardsWrapperPosition}px, 0)` }}
            >
                {props.children}
            </div>
        </>
    )
}