import { RefObject, useContext, useEffect, useRef, useState } from 'react';
import { AddProdToPlanContext } from '../../../../../contexts/ClubDashboard/AddProdToPlanContext/AddProdToPlanContext';
import { ClubNavigationContext, InfoContext } from '../../../../../contexts/ClubDashboard/ClubDashboardContext';
import ProductCard from '../Cards/ProductCard/ProductCard';
import styles from "./styles.module.scss"

export function ProductsList() {

    const {
        plansInfo,
        productsInfo
    } = useContext(InfoContext)

    const {
        focusMode,
        setFocusMode
    } = useContext(ClubNavigationContext)

    const {
        setSelectedProductInAddPlan
    } = useContext(AddProdToPlanContext)

    const [productsXPosition, setProductsXPosition] = useState(0)
    const [productsXMove, setProductsXMove] = useState(0)
    const [maxProductsXMove, setMaxProductsXMove] = useState(0)

    const cardRef = useRef() as RefObject<HTMLDivElement>;
    const [cardRefWidth, setcardRefWidth] = useState<number>(0)

    const cardsWrapperRef = useRef() as RefObject<HTMLDivElement>;
    const [cardsWrapperRefWidth, setcardsWrapperRefWidth] = useState<number>(0)

    useEffect(() => {
        const resizeObserver = new ResizeObserver(entries => {
            setcardsWrapperRefWidth(entries[0].contentRect.width);
        });

        if (cardsWrapperRef.current) resizeObserver.observe(cardsWrapperRef.current);

        return () => {
            resizeObserver.disconnect();
        };
    }, []);

    useEffect(() => {
        const resizeObserver = new ResizeObserver(entries => {
            setcardRefWidth(entries[0].contentRect.width);
        });

        if (cardRef.current) resizeObserver.observe(cardRef.current);

        return () => {
            resizeObserver.disconnect();
        };
    }, []);

    function handleMove(direction: string) {

        const maxProductsXMoveUpdated = Math.ceil((((productsInfo.length * (cardRefWidth + 40)) - cardsWrapperRefWidth) / 500))

        setMaxProductsXMove(maxProductsXMoveUpdated)

        if (direction === 'left') {
            if (productsXMove > 0) {
                setProductsXMove(productsXMove - 1)
                setProductsXPosition(productsXPosition + 500)
            }
        }
        else {
            if (productsXMove < maxProductsXMoveUpdated) {
                setProductsXPosition(productsXPosition - 500)
                setProductsXMove(productsXMove + 1)
            }
        }
    }

    return (
        <section className={
            (focusMode === 'products' ? styles.listWrapperFocused : (
                (productsXMove === maxProductsXMove) && (productsXMove !== 0)) ?
                styles.listWrapperEnd : (
                    productsXMove === 0 ? styles.listWrapperBegin : styles.listWrapper
                )
            )
        }>
            {
                (productsXMove !== 0) &&
                <button
                    className={styles.sideButtonLeft}
                    onClick={() => {
                        handleMove('left')
                    }}
                >
                    <div />
                </button>
            }
            {
                (productsXMove !== maxProductsXMove || (productsXMove === 0 && maxProductsXMove === 0)) &&
                <button
                    className={styles.sideButtonRight}
                    onClick={() => {
                        handleMove('right')
                    }}
                >
                    <div />
                </button>
            }
            {
                productsInfo &&
                (
                    <div
                        className={styles.cardsWrapper}
                        ref={cardsWrapperRef}
                        style={{ transform: `translate(${productsXPosition}px, 0)` }}
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