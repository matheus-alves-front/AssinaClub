import { DivisionColumn } from "../../../Divisions/DivisionColumn";
import { DivisionLine } from "../../../Divisions/DivisionLine";
import { ClubRegisterNavigation } from "../Navigations/ClubRegisterNavigation/ClubRegisterNavigation";
import { MyNavigation } from "../Navigations/MyNavigation/MyNavigation";
import { PlansRegister } from "../Registers/Plans/PlansRegister";
import { ProductsRegister } from "../Registers/Products/ProductsRegister";
import { PlansTable } from "../Lists/PlansTable";
import { ProductsTable } from "../Lists/ProductsTable";
import { SubscribersTable } from "../Lists/SubscriberList/SubscribersTable";
import { useContext } from "react";
import { ClubNavigationContext, DeletingPlansContext, InfoContext } from "../../../../contexts/ClubDashboard/ClubDashboardContext";
import styles from "./styles.module.scss"

export function DefaultClubDashboardView() {

    const { myNavScreenSelected, clubRegNavScreenSelected } = useContext(ClubNavigationContext)

    const { deletingPlans, plansThatCanBeDeleted, } = useContext(DeletingPlansContext)

    const { plansInfo } = useContext(InfoContext)

    return (
        <>
            <section className={styles.upperSection}>
                <MyNavigation />
                <DivisionColumn />
                {
                    myNavScreenSelected === "subscribers" &&
                    <SubscribersTable />
                }
                {
                    myNavScreenSelected === "plans" &&
                    (
                        !deletingPlans ? (
                            <PlansTable
                                plansInfo={plansInfo}
                            />
                        ) : (
                            <PlansTable
                                plansInfo={plansThatCanBeDeleted}
                            />
                        )
                    )
                }
            </section>
            {
                myNavScreenSelected === "products" &&
                <ProductsTable />
            }
            <DivisionLine />
            <ClubRegisterNavigation />
            <DivisionColumn />
            {
                clubRegNavScreenSelected === "products" &&
                <ProductsRegister />
            }
            {
                clubRegNavScreenSelected === "plans" &&
                <PlansRegister />
            }
        </>
    )
}