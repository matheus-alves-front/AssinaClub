import { Badge, Card, Col, Container, Row } from "react-bootstrap";
import styles from "../../styles/pages/register.module.scss"
import { RegisterFormSubscriber } from "../../components/RegisterForms";
import Link from "next/link";

export default function RegisterSubscriber() {
  return (
    <section className={styles.containerSubscriber}>
      <div 
        className={styles.registerInformation}
      >
        <h3 className="text-white my-3">
          Faça seu Cadastro!
        </h3>
        <p className="text-white">Lembre-se de conferir todos os seus dados antes de se Registrar</p>
        <span className="mt-auto text-white">
          Já tem uma conta? 
          <Link
            className="text-info" 
            href={'/login/subscriber'}
          > Faça Login!</Link>
        </span>
      </div>
      <div className={styles.containerForm}>
        <RegisterFormSubscriber />
      </div>
    </section>
  )
}