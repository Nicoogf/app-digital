import { ConnectDB } from "@/libs/mongo";
import User from "@/models/Users";
import { messages } from "@/utils/messajes";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export async function POST( request ) {
    try {
        await ConnectDB()
        const {username , password , confirmPassword } = await request.json()
        
        if(!username || !password || !confirmPassword){
            return NextResponse.json({
                message: messages.error.faltanCredenciales
            },{
                status:400
            })
        }

        if(password !== confirmPassword){
            return NextResponse.json({
                message: messages.error.noMatch
            },{
                status:400
            })
        }
        
        const userFound =  await User.findOne({username})

        if(userFound){
            return NextResponse.json({
                message: messages.error.yaExiste
            },{
                status:400
            })
        }

        const hashPassword = await bcrypt.hash(password , 10 )

        const newUser = new User({
            username,
            password: hashPassword
        })

        const{password: userPassword, ...rest} = newUser._doc

        await newUser.save()

        const token = jwt.sign({data: rest}, "secreto" ,{
            expiresIn: 86400
        })

        const response = NextResponse.json({
            newUser: rest ,
            message: messages.success.registroFinalizado
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