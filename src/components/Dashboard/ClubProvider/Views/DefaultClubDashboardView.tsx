import { Col, Container, Row } from "react-bootstrap";
import { DivisionColumn } from "../../../Divisions/DivisionColumn";
import { DivisionLine } from "../../../Divisions/DivisionLine";
import { ClubRegisterNavigation } from "../Navigations/ClubRegisterNavigation/ClubRegisterNavigation";
import { MyNavigation } from "../Navigations/MyNavigation/MyNavigation";
import { PlansRegister } from "../Registers/Plans/PlansRegister";
import { ProductsRegister } from "../Registers/Products/ProductsRegister";
import { PlansTable } from "../Tables/PlansTable";
import { ProductsTable } from "../Tables/ProductsTable";
import { SubscribersTable } from "../Tables/SubscribersTable";
import styles from "../../../../styles/pages/clubDashboard.module.scss"
import { useContext } from "react";
import { ClubNavigationContext, DeletingPlansContext, InfoContext } from "../../../../contexts/ClubDashboard/ClubDashboardContext";

export function DefaultClubDashboardView() {

    const { myNavScreenSelected, clubRegNavScreenSelected } = useContext(ClubNavigationContext)

    const { deletingPlans, plansThatCanBeDeleted, } = useContext(DeletingPlansContext)

    const { plansInfo } = useContext(InfoContext)

    return (
        <>
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