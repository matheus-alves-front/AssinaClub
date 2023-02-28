import { DivisionColumn } from "../../../Divisions/DivisionColumn";
import { DivisionLine } from "../../../Divisions/DivisionLine";
import { ClubRegisterNavigation } from "../Navigations/ClubRegisterNavigation/ClubRegisterNavigation";
import { MyNavigation } from "../Navigations/MyNavigation/MyNavigation";
import { PlansRegister } from "../Registers/Plans/PlansRegister";
import { ProductsRegister } from "../Registers/Products/ProductsRegister";
import { PlansList } from "../Lists/PlansList/PlansList";
import { ProductsList } from "../Lists/ProductsList/ProductsList";
import { SubscribersList } from "../Lists/SubscriberList/SubscribersList";
import { useContext } from "react";
import { ClubNavigationContext, DeletingPlansContext, InfoContext } from "../../../../contexts/ClubDashboard/ClubDashboardContext";
import styles from "./styles.module.scss"
import { AddProductToPlanForm } from "../Forms/AddProductToPlanForm";

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
                    myNavScreenSelected === "subscribers" && (
                        <div className={styles.wrapper}>
                            <h1>Meus Assinantes</h1>
                            <SubscribersList />
                        </div>
                    )
                }
                {
                    myNavScreenSelected === "plans" &&
                    <PlansList
                        plansInfo={deletingPlans ? plansThatCanBeDeleted : plansInfo}
                    />
                }
                {
                    myNavScreenSelected === "products" &&
                    <ProductsList />
                }
            </section>
            <DivisionLine />
            <section className={styles.lowerSection}>
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
                {
                    clubRegNavScreenSelected === "productToPlan" &&
                    <AddProductToPlanForm />
                }
            </section>
        </>
    )
}