import { messages } from "@/utils/messajes";
import { headers } from "next/headers";
const { NextResponse } = require("next/server");
import jwt from "jsonwebtoken"
import { ConnectDB } from "@/libs/mongo";
import User from "@/models/Users";

export async function GET(){
    try {
        const headerList = headers()
        const token =  headerList.get("token")

        if(!token) {
            return NextResponse.json({
                messge: messages.error.noAutorizado
            },{
                status: 400
            })
        }

        try {
            const isTokenValid = jwt.verify( token ,"secreto" )
            const {data} = isTokenValid

            await ConnectDB()
            const userFind = await User.findOne(data._id)

            if(!userFind){
                return NextResponse.json({
                    message : messages.error.usuarioNoRegistrado
                },{
                    status: 400
                })
            }

            return NextResponse.json({
                isAuthorized : true,
                message : messages.success.successLoguin
            },{
                status:200
            })

        } catch (error) {
            return NextResponse.json({
                message : messages.error.invalidToken
            })
        }

    } catch (error) {
        console.log(error)
        return NextResponse.json({           
            message : messages.error.defaultError
        })
    }
}