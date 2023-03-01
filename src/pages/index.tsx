import Link from "next/link";
import styles from "/src/styles/pages/index.module.scss"

export default function Home() {
  return (
    <>
      <section className={styles.container}>
        <h1>Assina<span>Club</span></h1>
        <h2> <span>Vamos lá,</span> o que deseja?</h2>

        <div className={styles.subscriberSection}>
          <div className={styles.card}>
            <h3>Seja Assinante</h3>
            <p>
             Aqui você encontra o clube de assinatura com a sua cara.
            </p>
            <Link href={"/login/subscriber"}>
              <button>
                Sou Assinante
              </button>
            </Link>

          </div>
        </div>

        <div className={styles.clubProviderSection}>
          <div className={styles.card}>
            <h3>Crie um Clube</h3>
            <p>
              é dono de um Clube ou quer criar um?
              Tenha acesso a milhares de clientes interessados em seus serviços.
            </p>
            <Link href={"/login/club_provider"}>
              <button>
                Sou Um Clube
              </button>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

// pega o usuário no banco getUsers() pelo lado do server, 
// export const getStaticProps: GetStaticProps<{ users: User[] }> = async() => {
//   const users = await getUsers()
//   console.log(users)
    
//   return {
//     props: {
//       users,
//     },
//     revalidate: 5
//   }
// }
