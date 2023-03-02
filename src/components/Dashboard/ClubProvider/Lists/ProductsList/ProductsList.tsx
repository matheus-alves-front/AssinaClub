import { RefObject, useContext, useEffect, useRef, useState } from 'react';
import { AddProdToPlanContext } from '../../../../../contexts/ClubDashboard/AddProdToPlanContext/AddProdToPlanContext';
import { ClubNavigationContext, InfoContext } from '../../../../../contexts/ClubDashboard/ClubDashboardContext';
import observeRefsWidth from '../../../../UI-Components/Slider/utils/observeRefsWidth';
import Slider from '../../../../UI-Components/Slider';
import ProductCard from '../Cards/ProductCard/ProductCard';
import styles from "./styles.module.scss"

export function ProductsList() {

    const { productsInfo } = useContext(InfoContext)

    const { focusMode, setFocusMode } = useContext(ClubNavigationContext)

    const { setSelectedProductInAddPlan } = useContext(AddProdToPlanContext)

    const cardRef = useRef() as RefObject<HTMLDivElement>;
    const [cardRefWidth, setcardRefWidth] = useState<number>(0)

    const cardsWrapperRef = useRef() as RefObject<HTMLDivElement>;
    const [cardsWrapperRefWidth, setcardsWrapperRefWidth] = useState<number>(0)

    useEffect(() => {
        observeRefsWidth(cardRef, setcardRefWidth)
        observeRefsWidth(cardsWrapperRef, setcardsWrapperRefWidth)
    }, []);

    return (
        <section className={focusMode === 'products' ? styles.listWrapperFocused : styles.listWrapper}>
            <Slider
                sliderClassName={styles.cardsWrapper}
                wrapperRef={cardsWrapperRef}
                infoList={productsInfo}
                cardRefWidth={cardRefWidth}
                cardsWrapperRefWidth={cardsWrapperRefWidth}
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