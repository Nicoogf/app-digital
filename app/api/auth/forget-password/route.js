import { ConnectDB } from "@/libs/mongo";
import User from "@/models/Users";
import { messages } from "@/utils/messajes";
import { NextResponse } from "next/server";
import { Resend } from "resend"
import jwt from "jsonwebtoken"

const resend = new Resend("re_UEc8m6Zb_GQqhmN4WLxCnsxfToYCrPJFS")

export async function POST( request )  {

  try {
    const body = await request.json()
    const { username } = body 
    console.log(username) 

    await ConnectDB()

    const userFind = await User.findOne({username})

    if(!userFind){
        return NextResponse.json({ message : messages.error.usuarioNoRegistrado},{status:400})
    }

    const tokenData = {
        username : userFind.username,
        userId : userFind._id
    }

    const token = jwt.sign( {data:tokenData } , "secreto" ,{
        expiresIn: 86400
    })

    const forgetURL = `http://localhost:3000/forget-password?token=${token}`

    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: "nicolasgfalabella@gmail.com" ,
        subject: "Cambio de contraseña",
        html: `<a href="${forgetURL}"> Cambiar contraseña </a>`
    })

    return NextResponse.json({
        message: messages.success.succesEmail
    },{
        status:200
    })

  } catch (error) {
    console.log(error)
    return NextResponse.json({
        message: messages.error.defaultError
    },{
        status : 400
    })
  }
}