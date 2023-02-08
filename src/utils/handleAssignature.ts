export async function handleAssignature(
  clubAssinatureId: string, 
  planId: string | string[], 
  isCancel: boolean,
  userId: string
) {
  const data = {
    isPaid: true,
    clubAssinatureId,
    planIds: planId,
    unsubscribe: isCancel
  }

  try {
    const response = await fetch(`/api/subscribers/${userId}/signatures`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error('Falha ao criar assinatura');
    }
    const result = await response.json();

    if (result) {
      alert(!isCancel ? 'Assinatura efetuada' : 'Assinatura cancelada')
    }
  } catch(err) {
    alert(err)
  }

  location.reload();
}
