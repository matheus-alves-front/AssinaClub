import { ReactNode, RefObject, useEffect, useRef, useState } from "react"
import SliderButtons from "./SliderButtons"
import observeRefsWidth from "./utils/observeRefsWidth";

import styles from './styles.module.scss'

export type SliderType = {
    sliderClassName: string,
    children: ReactNode,
    infoList: any[],
    cardRefWidth: number
}

export default function Slider(props: SliderType) {

    const cardsWrapperRef = useRef() as RefObject<HTMLDivElement>;
    const [cardsWrapperRefWidth, setcardsWrapperRefWidth] = useState<number>(0)

    useEffect(() => {
        observeRefsWidth(cardsWrapperRef, setcardsWrapperRefWidth)
    }, []);

    const {
        sliderClassName,
        infoList,
        cardRefWidth,
    } = props

    const [cardsWrapperPosition, setCardsWrapperPosition] = useState(0)
    const [movesIterations, setMovesIterations] = useState(0)
    const [maxMovesIterations, setMaxMovesIterations] = useState(0)

    return (
        <>
            <div
                className={`${sliderClassName} ${styles.sliderStyles}`}
            >
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
                    ref={cardsWrapperRef}
                    style={{ transform: `translate(${cardsWrapperPosition}px, 0)` }}
                >
                    {props.children}
                </div>
            </div>
        </>
    )
}