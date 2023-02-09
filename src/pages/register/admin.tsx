import { Card, Col, Container, Row } from "react-bootstrap";
import styles from "../../styles/pages/register.module.scss"
import Link from "next/link";
import { GetSessionParams, useSession } from "next-auth/react";
import { GetClubProviderData } from "../login/club_provider";
import { RegisterFormAdmin } from "../../components/RegisterForms/RegisterAdmins";
import { GetServerSideProps } from "next";
import { authOptions } from "../api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import { Subscriber } from "@prisma/client";

export default function RegisterAdmin({userData}: any) {
    const { id, clubName } = userData 

    return (
        <Container className={styles.containerSubscriber}>
            <Card className="w-100">
                <Row className="m-auto w-100">
                    <Col md={4} className="p-0">
                        <div
                            className={`${styles.registerInformation} h-100 w-100 rounded p-3 d-flex flex-column text-start`}
                        >
                            <h3 className="text-white my-3">
                                Faça seu Cadastro!
                            </h3>
                            <p className="text-white">Lembre-se de conferir todos os seus dados antes de se Registrar</p>
                        </div>
                    </Col>
                    <Col>
                        <RegisterFormAdmin clubProvider={{id, name: clubName}}/>
                    </Col>
                </Row>
            </Card>
        </Container>
    )
}

export interface GetSubscriberData extends GetSessionParams {
    userData?: Subscriber
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getServerSession(context.req, context.res, authOptions) as GetSubscriberData 
    const { userData } = session
    
    return {
        props: {
            userData
        }
    }
}