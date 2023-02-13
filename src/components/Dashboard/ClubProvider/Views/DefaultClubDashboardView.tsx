import { Col, Container, Row } from "react-bootstrap";
import { DivisionColumn } from "../../../Divisions/DivisionColumn";
import { DivisionLine } from "../../../Divisions/DivisionLine";
import { ClubRegisterNavigation } from "../Navigations/ClubRegisterNavigation";
import { MyNavigation } from "../Navigations/MyNavigation";
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
            <Row className="p-4 w-100">
                <Col md={2} className="d-flex justify-content-center">
                    <MyNavigation />
                </Col>
                <Col md="auto">
                    <DivisionColumn />
                </Col>
                <Col>
                    {myNavScreenSelected === "subscribers" &&
                        <Container className={`${styles.easeCome}`}>
                            <SubscribersTable />
                        </Container>
                    }
                    {myNavScreenSelected === "plans" &&
                        (
                            !deletingPlans ? (
                                <Container className={`${styles.easeCome}`}>
                                    <PlansTable
                                        plansInfo={plansInfo}
                                    />
                                </Container>
                            ) : (
                                <Container className={`${styles.easeCome}`}>
                                    <PlansTable
                                        plansInfo={plansThatCanBeDeleted}
                                    />
                                </Container>
                            )
                        )
                    }
                    {myNavScreenSelected === "products" &&
                        <Container className={`${styles.easeCome}`}>
                            <ProductsTable />
                        </Container>
                    }
                </Col>
            </Row>
            <Row className="w-100">
                <DivisionLine />
            </Row>
            <Row className="p-4 w-100">
                <Col md={2} className="d-flex justify-content-center">
                    <ClubRegisterNavigation />
                </Col>
                <Col md="auto">
                    <DivisionColumn />
                </Col>
                <Col md="auto" className="mx-auto">
                    {clubRegNavScreenSelected === "products" &&
                        <Container className={`${styles.easeCome}`}>
                            <ProductsRegister />
                        </Container>
                    }
                    {clubRegNavScreenSelected === "plans" &&
                        <Container className={`${styles.easeCome}`}>
                            <PlansRegister />
                        </Container>
                    }
                </Col>
            </Row>
        </>
    )
}