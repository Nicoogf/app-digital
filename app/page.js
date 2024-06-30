'use client'
import { Form } from "@/components/Form";

export default function LoguinPage() {
  return (
    <main className="">
     <Form onSumbit={()=>{}}>
      <Form.input title ="loguin" label="label" name="name" placeholder="name..." type="text"/>
      <Form.Footer description="Te olvidaste tu contraseña" link="/forget-password" textLink="Recuperar contraseña"/>
      <Form.Footer description="No cuentes cuenta?" link="/register" textLink="Crea una"/>

     </Form>
    </main>
  );
}
