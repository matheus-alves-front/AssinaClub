import { RefObject, useContext, useEffect, useRef, useState } from 'react';
import { AddProdToPlanContext } from '../../../../../contexts/ClubDashboard/AddProdToPlanContext/AddProdToPlanContext';
import { ClubNavigationContext, InfoContext } from '../../../../../contexts/ClubDashboard/ClubDashboardContext';
import observeRefsWidth from '../../../../../utils/slider/observeRefsWidth';
import SliderButtons from '../../../../Slider/SliderButtons/SliderButtons';
import ProductCard from '../Cards/ProductCard/ProductCard';
import styles from "./styles.module.scss"

export function ProductsList() {

    const {
        productsInfo
    } = useContext(InfoContext)

    const {
        focusMode,
        setFocusMode
    } = useContext(ClubNavigationContext)

    const {
        setSelectedProductInAddPlan
    } = useContext(AddProdToPlanContext)


    //* Variables used in the slider
    const [cardsWrapperPosition, setCardsWrapperPosition] = useState(0)
    const [movesIterations, setMovesIterations] = useState(0)
    const [maxMovesIterations, setMaxMovesIterations] = useState(0)

    const cardRef = useRef() as RefObject<HTMLDivElement>;
    const [cardRefWidth, setcardRefWidth] = useState<number>(0)

    const cardsWrapperRef = useRef() as RefObject<HTMLDivElement>;
    const [cardsWrapperRefWidth, setcardsWrapperRefWidth] = useState<number>(0)

    useEffect(() => {
        observeRefsWidth(cardRef, setcardRefWidth)
        observeRefsWidth(cardsWrapperRef, setcardsWrapperRefWidth)
    }, []);

    return (
        <section className={
            (focusMode === 'products' ? styles.listWrapperFocused : (
                (movesIterations === maxMovesIterations) && (movesIterations !== 0)) ?
                styles.listWrapperEnd : (
                    movesIterations === 0 ? styles.listWrapperBegin : styles.listWrapper
                )
            )
        }>
            <SliderButtons
                infoList={productsInfo}
                cardRefWidth={cardRefWidth}
                cardsWrapperRefWidth={cardsWrapperRefWidth}
                cardsWrapperPosition={cardsWrapperPosition}
                movesIterations={movesIterations}
                setMovesIterations={setMovesIterations}
                maxMovesIterations={maxMovesIterations}
                setMaxMovesIterations={setMaxMovesIterations}
                setCardsWrapperPosition={setCardsWrapperPosition}
            />
            {
                productsInfo &&
                (
                    <div
                        className={styles.cardsWrapper}
                        ref={cardsWrapperRef}
                        style={{ transform: `translate(${cardsWrapperPosition}px, 0)` }}
                    >
                        {productsInfo.map((product, index) => {

                            return (
                                <div
                                    onClick={() => {
                                        if (focusMode === 'products') {
                                            setSelectedProductInAddPlan(product)
                                            setFocusMode(null)
                                        }
                                    }}
                                    key={index}
                                    ref={cardRef}
                                    className={styles.prodCard}
                                >
                                    <ProductCard product={product} />
                                </div>
                            )
                        })}
                    </div>
                )
            }
        </section>
    )
}