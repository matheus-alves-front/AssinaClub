import { ReactNode, RefObject, SetStateAction } from "react"
import SliderButtons from "./SliderButtons"

export type SliderType = {
    sliderClassName: string,
    children: ReactNode,
    wrapperRef: RefObject<HTMLDivElement>,
    infoList: any[],
    cardRefWidth: number,
    cardsWrapperRefWidth: number,
    cardsWrapperPosition: number,
    movesIterations: number,
    maxMovesIterations: number,
    setMovesIterations: (value: SetStateAction<number>) => void,
    setMaxMovesIterations: (value: SetStateAction<number>) => void,
    setCardsWrapperPosition: (value: SetStateAction<number>) => void    
}

export default function Slider(props: SliderType) {

    const {
        sliderClassName,
        wrapperRef,
        infoList,
        cardRefWidth,
        cardsWrapperRefWidth,
        cardsWrapperPosition,
        movesIterations,
        maxMovesIterations,
        setMovesIterations,
        setMaxMovesIterations,
        setCardsWrapperPosition,
    } = props

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