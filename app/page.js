'use client'
import { Form } from "@/components/Form";

export default function LoguinPage() {
  return (
    <main className="">
     <Form onSumbit={()=>{}} 
     title="Iniciar Secion"
     description="Formulacion para iniciar secion">
      <div className="flex flex-col gap-y-4"> 
      <Form.Input label="Usuario" name="name" placeholder="Ingresar Usuario" type="text"/>
      <Form.Input label="Contraseña" name="password" placeholder="Ingresar Contraseña" type="password"/>
      </div>
      
      <Form.Footer description="Te olvidaste tu contraseña" link="/forget-password" textLink="Recuperar contraseña"/>
      <Form.Footer description="No cuentes cuenta?" link="/register" textLink="Crea una"/>
      <Form.SubmitButton buttonText="Ingresar" />

     </Form>
    </main>
  );
}
