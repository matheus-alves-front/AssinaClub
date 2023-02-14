import { Spinner } from "react-bootstrap";

export function LoaderSpinner() {
  return (
    <section className='w-100 position-relative' style={{'height': '80vh'}}>
      <Spinner className='position-absolute top-50 start-50' animation="border" />
    </section>
  )
}