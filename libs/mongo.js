import mongoose, { connect } from "mongoose";

export async function ConnectDB() {
 try {
    await connect("mongodb://localhost:27017/intento-loguin")
    console.log("Conexion exitosa")
 } catch (error) {
    console.log(error)
 }
}