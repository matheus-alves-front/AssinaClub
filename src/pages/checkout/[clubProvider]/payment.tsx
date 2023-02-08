import { GetServerSideProps } from "next"
import { getServerSession } from "next-auth/next"
import { GetSessionParams } from "next-auth/react"
import { useRouter } from "next/router"
import { Button, Container, Row } from "react-bootstrap"
import { Subscriber } from "../../../@types/SubscriberTypes"
import { handleAssignature } from "../../../utils/handleAssignature"
import { authOptions } from "../../api/auth/[...nextauth]"

type CheckoutProps = {
  clubAssignatureId: string
  clubProvider: string
  planId: string
  planName: string
}

export default function Checkout({
  userData,
  typeOfUser
}: GetSubscriberData) {
  const router = useRouter()

  const {
    clubProvider,
    clubAssignatureId,
    planId,
    planName
  } = router.query as CheckoutProps

  const userId = String(userData?.id)

  return (
    <Container>
      <Row>
        <hgroup>
          <h1>{clubProvider}</h1>
          <h6>Formulário de Assinatura <small>{planName}</small></h6>
        </hgroup>


        {typeOfUser == 'subscriber' ? (
          <>
            {userData?.clubProviderIds?.includes(clubAssignatureId) ? (
              <>
                {userData?.planIds.includes(String(planId)) ?
                  <Button 
                    className="m-2"
                    variant="danger"
                    onClick={() => handleAssignature(clubAssignatureId, planId, true, userId)}
                  >
                    Cancelar Assinatura
                  </Button>
                : 
                <p className="text-center text-danger">Você já é assinante desse clube</p>
                }
              </>
            )
            : 
              <Button 
                onClick={() => handleAssignature(clubAssignatureId, planId, false, userId)}
                variant="success" 
                className="m-2"
              >
                Assinar
              </Button>
            }
          </>
        )
          :
          ''
        }
      </Row>
    </Container>
  )
}

interface GetSubscriberData extends GetSessionParams {
  userData?: Subscriber
  typeOfUser: string
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions) as GetSubscriberData 
  const { userData, typeOfUser } = session
  
  return {
      props: {
          userData,
          typeOfUser
      }
  }
}