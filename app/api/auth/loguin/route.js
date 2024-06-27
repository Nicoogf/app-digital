import { ConnectDB } from "@/libs/mongo";
import User from "@/models/Users";
import { messages } from "@/utils/messajes";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs" ;
import jwt from "jsonwebtoken"

export async function POST(request) {
    
    try {
        await ConnectDB()
        const body = await request.json()
        const {username , password } = body 

        if(!username || !password ){
            return NextResponse.json({
                message: messages.error.faltanCredenciales
            },{
                status:400
            })
        }

       const userFound = await User.findOne({username})

       if( !userFound ){
        return NextResponse.json({
            message : messages.error.usuarioNoRegistrado
        })
       }

       const isMatch =  await bcrypt.compare( password , userFound.password )

       if(!isMatch){
        return NextResponse.json({
            message: messages.error.credencialesIncorrectas
        },{
            status:400
        })
       }

       const { password : userPass , ...rest} = userFound._doc ;

       const token = jwt.sign({data: rest}, "secreto" ,{
        expiresIn: 86400
       })

       
       const response = NextResponse.json({
        newUser: rest ,
        message: messages.success.logueoFinzalizado
    },{
        status : 200
    })

    response.cookies.set("auth_cookie" , token ,{
        secure: process.env.NODE_ENV === "production",
        sameSite:"strict",
        maxAge : 86400 ,
        path:"/"
    })

    return response
    

    } catch (error) {
        console.log(error)
        return NextResponse.json({message: messages.error.defaultError})
    }
}