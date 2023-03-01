import { RefObject, useContext, useEffect, useRef, useState } from 'react';
import { AddProdToPlanContext } from '../../../../../contexts/ClubDashboard/AddProdToPlanContext/AddProdToPlanContext';
import { ClubNavigationContext, InfoContext } from '../../../../../contexts/ClubDashboard/ClubDashboardContext';
import observeRefsWidth from '../../../../UI-Components/Slider/utils/observeRefsWidth';
import Slider from '../../../../UI-Components/Slider';
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
            <Slider
                sliderClassName={styles.cardsWrapper}
                wrapperRef={cardsWrapperRef}
                infoList={productsInfo}
                cardRefWidth={cardRefWidth}
                cardsWrapperRefWidth={cardsWrapperRefWidth}
                cardsWrapperPosition={cardsWrapperPosition}
                movesIterations={movesIterations}
                maxMovesIterations={maxMovesIterations}
                setMovesIterations={setMovesIterations}
                setMaxMovesIterations={setMaxMovesIterations}
                setCardsWrapperPosition={setCardsWrapperPosition}
            >
                {productsInfo &&
                    <>
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
                    </>
                }
            </Slider>
        </section>
    )
}