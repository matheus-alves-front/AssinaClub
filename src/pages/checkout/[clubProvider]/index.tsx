export function Checkout() {
  return (
    <>
    {/* {typeOfUser == 'subscriber' ? (
      <>
        {userData?.clubProviderIds?.includes(clubProviderId) ? (
          <>
            {userData?.planIds.includes(String(plan.id)) ?
              <Button 
                className="m-2"
                variant="danger"
                onClick={() => handleAssignature(plan.clubProviderId, plan.id, true)}
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
            onClick={() => handleAssignature(plan.clubProviderId, plan.id, false)}
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
    } */}
      checkout
    </>
  )
}