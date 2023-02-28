import { useContext } from 'react';
import { ClubNavigationContext } from '../../../../../contexts/ClubDashboard/ClubDashboardContext';
import styles from './styles.module.scss'

export function ClubRegisterNavigation() {

    const {
        clubRegNavScreenSelected,
        setClubRegNavScreenSelected
    } = useContext(ClubNavigationContext)

    return (
        <section
            className={styles.navContainer}
        >
            <button
                className={styles.darkButton}
                onClick={() => {
                    setClubRegNavScreenSelected("products")
                }}
            >
                Registrar Produtos
            </button>
            <button
                className={styles.darkButton}
                onClick={() => {
                    setClubRegNavScreenSelected("plans")
                }}
            >
                Registrar Planos
            </button>
            <button
                className={styles.darkButton}
                onClick={() => {
                    setClubRegNavScreenSelected("productToPlan")
                }}
            >
                Registrar Produto ao Plano
            </button>
        </section>
    )
}